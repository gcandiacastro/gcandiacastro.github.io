/* Si cambias un precio aquí, cámbialo también en pagos/worker.js */
const CATALOGO = [
  { id:"tasacion-urbana", tipo:"compra", area:"Tasación", nombre:"Tasación de vivienda o terreno urbano", precio:145000,
    detalle:"Visita, comparables de mercado e informe con valor comercial en UF.", incluye:["Una propiedad urbana","Visita en el Gran Concepción","Informe firmado por tasador MINVU N°919"] },
  { id:"estabilidad", tipo:"compra", area:"Estructuras", nombre:"Informe de estabilidad estructural", precio:210000,
    detalle:"Inspección y verificación de una vivienda o ampliación, con conclusiones y recomendaciones.", incluye:["Una vivienda o ampliación","Inspección en terreno","Informe firmado"] },
  { id:"reserva-dom", tipo:"compra", area:"Estructuras", nombre:"Reserva de cálculo para regularización DOM", precio:210000,
    detalle:"Abono inicial para memoria de cálculo y planos de una ampliación menor. El saldo se define al revisar tus planos.", incluye:["Revisión de antecedentes","Cotización final por escrito","Abono descontado del valor total"] },
  { id:"tasacion-especial", tipo:"cotizar", area:"Tasación", nombre:"Tasación rural, comercial o judicial", desde:"Desde 6 UF",
    detalle:"Estudio de mercado e informe según el destino de la propiedad o del encargo." },
  { id:"calculo", tipo:"cotizar", area:"Estructuras", nombre:"Memoria de cálculo y planos de estructura", desde:"Según m²",
    detalle:"Viviendas, galpones, plataformas y estructuras menores. Incluye patrocinio DOM cuando corresponde." },
  { id:"ito", tipo:"cotizar", area:"Inspección", nombre:"Inspección técnica de obra (ITO)", desde:"Según obra",
    detalle:"Control de calidad, revisión de documentación y seguimiento para mandantes privados." },
  { id:"peritaje", tipo:"cotizar", area:"Inspección", nombre:"Peritaje e informe de daños", desde:"Desde 5 UF",
    detalle:"Inspección, registro fotográfico y presupuesto de reparación para seguros o juicios." }
];
