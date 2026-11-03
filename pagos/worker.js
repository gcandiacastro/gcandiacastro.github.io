/* Pieza de cobro para Cloudflare Workers.
   Secreto requerido: MP_ACCESS_TOKEN. Variable: SITIO (ej. https://gccingenieria.cl) */
const PRECIOS = {
  "tasacion-urbana": ["Tasación de vivienda o terreno urbano", 145000],
  "estabilidad": ["Informe de estabilidad estructural", 210000],
  "reserva-dom": ["Reserva de cálculo para regularización DOM", 210000]
};
const MIN = 10000, MAX = 5000000;
function resp(obj, status, origen) {
  return new Response(JSON.stringify(obj), { status, headers: {
    "Content-Type": "application/json", "Access-Control-Allow-Origin": origen,
    "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
}
export function armarItems(lista) {
  if (!Array.isArray(lista) || !lista.length || lista.length > 10) throw new Error("Carrito inválido");
  return lista.map(i => {
    if (i.id === "cotizacion") {
      const n = String(i.cotizacion || ""), m = Number(i.monto);
      if (!/^[A-Z0-9-]{4,24}$/.test(n) || !Number.isInteger(m) || m < MIN || m > MAX) throw new Error("Cotización inválida");
      return { id: "cotizacion", title: "Cotización " + n, quantity: 1, unit_price: m, currency_id: "CLP" };
    }
    const p = PRECIOS[i.id], c = Number(i.cant);
    if (!p || !Number.isInteger(c) || c < 1 || c > 5) throw new Error("Servicio inválido");
    return { id: i.id, title: p[0], quantity: c, unit_price: p[1], currency_id: "CLP" };
  });
}
export default {
  async fetch(req, env) {
    const sitio = env.SITIO, origen = req.headers.get("Origin") || "";
    if (req.method === "OPTIONS") return resp({}, 200, sitio);
    if (req.method !== "POST") return resp({ error: "Método no permitido" }, 405, sitio);
    if (origen !== sitio) return resp({ error: "Origen no permitido" }, 403, sitio);
    try {
      const b = await req.json(), c = b.cliente || {};
      if (!/^\S+@\S+\.\S+$/.test(c.correo || "") || !c.nombre || !c.telefono) throw new Error("Faltan tus datos");
      const ref = "GCC-" + Date.now().toString(36).toUpperCase();
      const r = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: { Authorization: "Bearer " + env.MP_ACCESS_TOKEN, "Content-Type": "application/json", "X-Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({
          items: armarItems(b.items),
          payer: { name: String(c.nombre).slice(0, 80), email: c.correo },
          external_reference: ref,
          metadata: { telefono: String(c.telefono).slice(0, 30), comuna: String(c.comuna || "").slice(0, 60) },
          statement_descriptor: "GCC INGENIERIA",
          back_urls: { success: sitio + "/gracias.html", pending: sitio + "/gracias.html", failure: sitio + "/gracias.html" },
          auto_return: "approved"
        })
      });
      const d = await r.json();
      if (!r.ok || !d.init_point) return resp({ error: "Mercado Pago rechazó la solicitud" }, 502, sitio);
      return resp({ url: d.init_point }, 200, sitio);
    } catch (e) { return resp({ error: e.message }, 400, sitio); }
  }
};
