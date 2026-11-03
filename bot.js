"use strict";
/* Asistente guiado: no usa IA ni claves. Reúne los datos y arma el mensaje de WhatsApp. */
(function(){
const FLUJO={
 inicio:{t:"Hola, soy el asistente de GCC Ingeniería. ¿Qué necesitas?",o:[["Tasar una propiedad","tas"],["Cálculo o informe estructural","ing"],["Inspección de obra","ito"],["Pagar una cotización","pag"],["Tengo una pregunta","faq"]]},
 tas:{t:"¿Para qué necesitas la tasación?",g:"Servicio: Tasación. Motivo",o:["Compra o venta","Crédito","Herencia o partición","Juicio","Otro"],s:"prop"},
 prop:{t:"¿Qué tipo de propiedad es?",g:"Propiedad",o:["Casa o departamento","Terreno urbano","Parcela o predio rural","Local, oficina o bodega"],s:"comuna"},
 ing:{t:"¿Qué necesitas?",g:"Servicio: Ingeniería",o:["Cálculo de vivienda","Regularizar ampliación","Galpón o plataforma","Informe de estabilidad","Revisión de proyecto"],s:"comuna"},
 ito:{t:"¿Qué tipo de obra es?",g:"Servicio: ITO. Obra",o:["Vivienda","Edificación","Obra civil","Otra"],s:"comuna"},
 comuna:{t:"¿En qué comuna está?",g:"Comuna",in:1,s:"nombre"},
 nombre:{t:"¿Cuál es tu nombre?",g:"Nombre",in:1,s:"fin"},
 faq:{t:"Elige tu pregunta.",o:[["¿Cuánto cuesta?","f1"],["¿Dónde atienden?","f2"],["¿Quién firma?","f3"],["¿Qué antecedentes necesito?","f4"]]},
 f1:{t:"Cada valor depende del encargo. Germán te cotiza por WhatsApp según la propiedad, la superficie y la ubicación."},
 f2:{t:"Concepción, Coronel, Lota, Talcahuano, San Pedro de la Paz, Arauco y provincia de Biobío. Otras zonas se coordinan."},
 f3:{t:"Germán Candia Castro, ingeniero civil UCSC, tasador MINVU N°919 y consultor MOP 3ª Categoría."},
 f4:{t:"Para tasar: dirección o rol de la propiedad. Para calcular: planos de arquitectura y mecánica de suelos si existe."}
};
document.body.insertAdjacentHTML("beforeend",`<aside class="flotas" aria-label="Contacto rápido"><a class="flota wa" href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hola Germán, vi su página y quiero cotizar.")}">WhatsApp</a><button class="flota as" id="botAbrir" type="button" aria-expanded="false" aria-controls="bot">Asistente</button></aside>
<section class="bot" id="bot" hidden aria-label="Asistente"><header><span><b>Asistente GCC</b><small>Respuestas automáticas</small></span><button class="x" id="botCerrar" type="button">Cerrar</button></header><div class="log" id="botLog" aria-live="polite"></div><div class="ops" id="botOps"></div><form id="botF" hidden><input id="botIn" aria-label="Tu respuesta" autocomplete="off"><button class="btn sen" type="submit">Enviar</button></form></section>`);
const L=document.getElementById("botLog"),O=document.getElementById("botOps"),F=document.getElementById("botF"),I=document.getElementById("botIn"),B=document.getElementById("bot");
let datos=[],actual="inicio";
const dice=(t,c)=>{const d=document.createElement("div");d.className="m "+c;d.textContent=t;L.appendChild(d);L.scrollTop=L.scrollHeight};
const op=(t,f,c)=>{const b=document.createElement("button");b.type="button";b.className="op "+(c||"");b.textContent=t;b.onclick=f;O.appendChild(b)};
function ir(k){actual=k;O.innerHTML="";F.hidden=true;
 if(k==="fin")return fin();
 if(k==="pag"){dice("Puedes pagar con el número de tu cotización.","b");op("Ir a pagar",()=>{B.hidden=true;location.href="index.html#pagar"});op("Volver al inicio",rein,"sec");return}
 const n=FLUJO[k];dice(n.t,"b");
 if(n.in){F.hidden=false;I.value="";I.focus();return}
 if(!n.o){op("Hablar con Germán",()=>wa("Hola Germán, tengo una consulta."));op("Otra pregunta",()=>ir("faq"),"sec");return}
 n.o.forEach(x=>{const[e,d]=Array.isArray(x)?x:[x,null];op(e,()=>{dice(e,"u");if(n.g)datos.push(n.g+": "+e);ir(d||n.s)})});
}
function fin(){const m="Hola Germán, quiero cotizar.\n"+datos.join("\n");dice("Listo. Revisa tu mensaje y envíalo por WhatsApp.","b");dice(m,"r");op("Enviar por WhatsApp",()=>wa(m));op("Empezar de nuevo",rein,"sec")}
function rein(){datos=[];L.innerHTML="";ir("inicio")}
F.addEventListener("submit",e=>{e.preventDefault();const v=I.value.trim();if(!v)return;dice(v,"u");const n=FLUJO[actual];datos.push(n.g+": "+v);ir(n.s)});
const A=document.getElementById("botAbrir");
const cierra=()=>{if(B.hidden)return;B.hidden=true;A.setAttribute("aria-expanded","false");A.focus()};
A.onclick=()=>{B.hidden=false;A.setAttribute("aria-expanded","true");if(!L.children.length)ir("inicio");document.getElementById("botCerrar").focus()};
document.getElementById("botCerrar").onclick=cierra;
document.addEventListener("keydown",e=>{if(e.key==="Escape")cierra()});
if(document.getElementById("abrirBot"))document.getElementById("abrirBot").onclick=()=>document.getElementById("botAbrir").click();
})();
