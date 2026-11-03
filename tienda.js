"use strict";
const $=id=>document.getElementById(id);
const clp=n=>"$"+Math.round(n).toLocaleString("es-CL");
const CLAVE="gcc_carrito";
function leer(){try{const v=JSON.parse(localStorage.getItem(CLAVE));return Array.isArray(v)?v:[]}catch(e){return[]}}
let carrito=leer();
function guardar(){try{localStorage.setItem(CLAVE,JSON.stringify(carrito))}catch(e){}pintar()}
function agregar(id){const p=CATALOGO.find(x=>x.id===id),i=carrito.find(x=>x.id===id);if(i)i.cant++;else carrito.push({id,nombre:p.nombre,precio:p.precio,cant:1});guardar();abrir()}
function abrir(){$("velo").hidden=false;$("cajon").hidden=false}
function cerrar(){$("velo").hidden=true;$("cajon").hidden=true}
function total(){return carrito.reduce((s,i)=>s+i.precio*i.cant,0)}
function esc(t){const d=document.createElement("div");d.textContent=t;return d.innerHTML}
function pintar(){
 $("n").textContent=carrito.reduce((s,i)=>s+i.cant,0);$("tot").textContent=clp(total());
 $("items").innerHTML=carrito.length?carrito.map((i,k)=>`<div class="item"><strong>${esc(i.nombre)}</strong><span>${clp(i.precio*i.cant)}</span><div class="cant">${i.cotizacion?"":`<button type="button" aria-label="Quitar uno" data-m="${k}">−</button>${i.cant}<button type="button" aria-label="Agregar uno" data-p="${k}">+</button>`}</div><button class="x" type="button" data-q="${k}">Quitar</button></div>`).join(""):'<p class="nota">Tu carrito está vacío.</p>';
 const online=!!CONFIG.checkoutUrl;
 $("pbtn").textContent=online?"Pagar en línea":"Enviar pedido por WhatsApp";
 $("pnota").textContent=online?"Te llevaremos a Mercado Pago para completar el pago.":"Te respondo por WhatsApp con el medio de pago.";
 $("pbtn").disabled=!carrito.length;
}
$("pack").innerHTML=CATALOGO.filter(p=>p.tipo==="compra").map(p=>`<article class="prod"><span class="rot">${p.area}</span><h3>${p.nombre}</h3><p>${p.detalle}</p><ul>${p.incluye.map(x=>`<li>${x}</li>`).join("")}</ul><div class="precio">${clp(p.precio)}<small>≈ ${(p.precio/CONFIG.ufReferencia).toFixed(1).replace(".",",")} UF · valor bruto</small></div><button class="btn" type="button" data-add="${p.id}">Agregar al carrito</button></article>`).join("");
$("lista").innerHTML=CATALOGO.filter(p=>p.tipo==="cotizar").map(p=>`<div class="fila"><span class="rot">${p.area}</span><div><h3>${p.nombre}</h3><p>${p.detalle}</p></div><span class="desde">${p.desde}</span><a href="#contacto" data-cot="${p.nombre}">Cotizar</a></div>`).join("");
$("cser").innerHTML=CATALOGO.map(p=>`<option>${p.nombre}</option>`).join("");
document.addEventListener("click",e=>{const d=e.target.dataset||{};
 if(d.add)agregar(d.add);
 if(d.cot)$("cser").value=d.cot;
 if(d.p){carrito[+d.p].cant++;guardar()}
 if(d.m){const i=carrito[+d.m];if(--i.cant<1)carrito.splice(+d.m,1);guardar()}
 if(d.q){carrito.splice(+d.q,1);guardar()}});
$("abrir").onclick=abrir;$("cerrar").onclick=cerrar;$("velo").onclick=cerrar;
document.addEventListener("keydown",e=>{if(e.key==="Escape")cerrar()});
$("fcot").addEventListener("submit",e=>{e.preventDefault();
 const n=$("cn").value.trim().toUpperCase(),m=parseInt($("cm").value.replace(/\D/g,""),10);
 if(!(m>=10000&&m<=5000000)){$("cerr").textContent="Escribe un monto entre $10.000 y $5.000.000.";$("cerr").hidden=false;return}
 $("cerr").hidden=true;carrito.push({id:"cotizacion",cotizacion:n,nombre:"Cotización "+n,precio:m,cant:1});e.target.reset();guardar();abrir()});
$("fcon").addEventListener("submit",e=>{e.preventDefault();
 const t=`Hola Germán, soy ${$("cnom").value}.\nServicio: ${$("cser").value}\nComuna: ${$("ccom").value}\n${$("cmsg").value}`;
 window.location.href="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(t)});
$("fpago").addEventListener("submit",async e=>{e.preventDefault();if(!carrito.length)return;
 const c={nombre:$("pnom").value.trim(),correo:$("pcor").value.trim(),telefono:$("ptel").value.trim(),comuna:$("pcom").value.trim()};
 if(!CONFIG.checkoutUrl){
  const t="Hola Germán, quiero contratar:\n"+carrito.map(i=>`- ${i.nombre} x${i.cant}: ${clp(i.precio*i.cant)}`).join("\n")+`\nTotal: ${clp(total())}\nNombre: ${c.nombre}\nCorreo: ${c.correo}\nTeléfono: ${c.telefono}\nComuna: ${c.comuna}`;
  window.location.href="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(t);return}
 $("pbtn").disabled=true;$("perr").hidden=true;
 try{const r=await fetch(CONFIG.checkoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:carrito.map(i=>({id:i.id,cant:i.cant,cotizacion:i.cotizacion,monto:i.cotizacion?i.precio:undefined})),cliente:c})});
  const d=await r.json();if(!r.ok||!d.url)throw new Error(d.error||"x");
  window.location.href=d.url}
 catch(x){$("perr").textContent="No pudimos abrir el pago. Inténtalo de nuevo o escríbeme por WhatsApp.";$("perr").hidden=false;$("pbtn").disabled=false}});
if(new URLSearchParams(location.search).get("vaciar")){carrito=[];guardar()}
pintar();
