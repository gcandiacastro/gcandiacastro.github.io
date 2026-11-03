"use strict";
const $=id=>document.getElementById(id);
const clp=n=>"$"+Math.round(n).toLocaleString("es-CL");
const esc=t=>{const d=document.createElement("div");d.textContent=t;return d.innerHTML};
const wa=t=>{window.location.href="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(t)};
const CLAVE="gcc_solicitud";
function leer(){try{const v=JSON.parse(localStorage.getItem(CLAVE));return Array.isArray(v)?v:[]}catch(e){return[]}}
let carrito=leer();
document.body.insertAdjacentHTML("beforeend",`<div class="velo" id="velo" hidden></div>
<aside class="cajon" id="cajon" hidden role="dialog" aria-modal="true" aria-label="Carrito"><header><h2>Carrito</h2><button class="x" id="cerrar" type="button">Cerrar</button></header><div id="items"></div>
<form id="fpago"><label for="pnom">Nombre<input id="pnom" required autocomplete="name"></label><label for="ptel">Teléfono<input id="ptel" required inputmode="tel" autocomplete="tel"></label><label for="pcor">Correo<input id="pcor" type="email" required autocomplete="email"></label><label for="pcom">Comuna<input id="pcom" required></label><label for="pmsg">Cuéntame más (opcional)<textarea id="pmsg" rows="2"></textarea></label><label class="chk"><input id="pok" type="checkbox" required><span>Acepto los <a href="terminos.html">términos y la política de privacidad</a></span></label><p class="err" id="perr" hidden></p><button class="btn wa" id="pbtn" type="submit">Enviar por WhatsApp</button><p class="nota" id="pnota"></p></form></aside>`);
const hayPago=()=>carrito.some(i=>i.cotizacion);
const soloPago=()=>carrito.length&&carrito.every(i=>i.cotizacion);
function pintar(){
 $("n").textContent=carrito.length;
 $("items").innerHTML=carrito.length?carrito.map((i,k)=>`<div class="item"><strong>${esc(i.nombre)}</strong><span>${i.monto?clp(i.monto):""}</span><button class="x" type="button" data-q="${k}">Quitar</button></div>`).join(""):'<p class="nota">Tu carrito está vacío.</p>';
 const on=!!CONFIG.checkoutUrl&&soloPago();
 $("pbtn").textContent=on?"Pagar en línea":"Enviar por WhatsApp";$("pbtn").className="btn "+(on?"sen":"wa");$("pbtn").disabled=!carrito.length;
 document.querySelectorAll("[data-add]").forEach(b=>{const y=carrito.some(i=>i.id===b.dataset.add);b.textContent=y?"Agregado":"Agregar al carrito";b.classList.toggle("hecho",y)});
 $("pnota").textContent=on?"Te llevaremos a Mercado Pago para completar el pago.":hayPago()&&!soloPago()?"Para pagar con tarjeta, deja solo la cotización en el carrito.":"Te respondo por WhatsApp con el valor y el enlace de pago.";
}
function guardar(){try{localStorage.setItem(CLAVE,JSON.stringify(carrito))}catch(e){}pintar()}
let origen=null;
function abrir(){origen=document.activeElement;$("velo").hidden=false;$("cajon").hidden=false;$("cerrar").focus()}
function cerrar(){if($("cajon").hidden)return;$("velo").hidden=true;$("cajon").hidden=true;if(origen&&origen.focus)origen.focus()}
document.addEventListener("click",e=>{const d=e.target.dataset||{};
 if(d.add){const p=CATALOGO.find(x=>x.id===d.add);if(!carrito.some(i=>i.id===p.id))carrito.push({id:p.id,nombre:p.nombre});guardar();abrir()}
 if(d.q){carrito.splice(+d.q,1);guardar()}});
$("abrir").onclick=abrir;$("cerrar").onclick=cerrar;$("velo").onclick=cerrar;
document.addEventListener("keydown",e=>{if(e.key==="Escape")cerrar()});
const fc=$("fcot");if(fc)fc.addEventListener("submit",e=>{e.preventDefault();
 const n=$("cn").value.trim().toUpperCase(),m=parseInt($("cm").value.replace(/\D/g,""),10);
 if(!(m>=10000&&m<=5000000)){$("cerr").textContent="Escribe un monto entre $10.000 y $5.000.000.";$("cerr").hidden=false;return}
 $("cerr").hidden=true;carrito.push({id:"cotizacion",cotizacion:n,nombre:"Pago cotización "+n,monto:m});e.target.reset();guardar();abrir()});
$("fpago").addEventListener("submit",async e=>{e.preventDefault();if(!carrito.length)return;
 const c={nombre:$("pnom").value.trim(),correo:$("pcor").value.trim(),telefono:$("ptel").value.trim(),comuna:$("pcom").value.trim()};
 if(!(CONFIG.checkoutUrl&&soloPago())){
  wa("Hola Germán, quiero cotizar:\n"+carrito.map(i=>"- "+i.nombre+(i.monto?": "+clp(i.monto):"")).join("\n")+`\nNombre: ${c.nombre}\nTeléfono: ${c.telefono}\nCorreo: ${c.correo}\nComuna: ${c.comuna}`+($("pmsg").value.trim()?"\nDetalle: "+$("pmsg").value.trim():""));return}
 $("pbtn").disabled=true;$("perr").hidden=true;
 try{const r=await fetch(CONFIG.checkoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:carrito.map(i=>({id:i.id,cotizacion:i.cotizacion,monto:i.monto})),cliente:c})});
  const d=await r.json();if(!r.ok||!d.url)throw new Error(d.error||"x");window.location.href=d.url}
 catch(x){$("perr").textContent="No pudimos abrir el pago. Inténtalo de nuevo o escríbeme por WhatsApp.";$("perr").hidden=false;$("pbtn").disabled=false}});
const fk=$("fcon");if(fk)fk.addEventListener("submit",e=>{e.preventDefault();wa(`Hola Germán, soy ${$("cnom").value}.\nComuna: ${$("ccom").value}\n${$("cmsg").value}`)});
if(CONFIG.facebook&&$("fb")){$("fb").href=CONFIG.facebook;$("fb").hidden=false}
const qs=new URLSearchParams(location.search),qn=(qs.get("cot")||"").toUpperCase(),qm=parseInt(qs.get("monto"),10);
if(/^[A-Z0-9-]{4,24}$/.test(qn)&&qm>=10000&&qm<=5000000){carrito=carrito.filter(i=>i.cotizacion!==qn);carrito.push({id:"cotizacion",cotizacion:qn,nombre:"Pago cotización "+qn,monto:qm});guardar();abrir()}
pintar();
