const CASA='<path d="M50 125V70l70-45 70 45v55z"/>';
const DIB={
diseno:'<path d="M30 20h180v110H30z"/><path d="M30 42h180M60 20v110"/><path class="ac" d="M85 62h95v48H85zM85 86h40M125 62v48"/><path d="M85 120h95M85 116v8M180 116v8"/>',
sanitaria:'<path d="M15 45h210"/><path d="M15 45q30-10 60 0t60 0 60 0 30-4" stroke-dasharray="4 5"/><path d="M95 45v70h50V45"/><path class="ac" stroke-width="5" d="M15 105h80M145 112h80"/><path class="ac" d="M40 94l12 11-12 11M178 101l12 11-12 11"/>',
urbanizacion:'<path d="M15 60h210M15 92h210M90 15v120M155 15v120" stroke-width="3"/><path d="M28 18h50v30H28zM103 18h40v30h-40zM168 18h50v30h-50zM28 104h50v30H28zM168 104h50v30h-50z"/><path class="ac" stroke-dasharray="8 6" d="M15 76h210M122 15v120"/>',
habitabilidad:CASA+'<path d="M80 125V95h24v30"/><path class="ac" stroke-width="4" d="M122 88l14 14 26-30"/>',
visita:'<path d="M35 125h170"/><path d="M50 125V85l40-26 40 26v40z"/><path class="ac" stroke-width="3" d="M170 100s-30-26-30-50a30 30 0 0160 0c0 24-30 50-30 50z"/><circle class="ac" cx="170" cy="50" r="10" stroke-width="3"/>',
calculo:'<path d="M45 125V30h150v95M45 62h150M45 94h150M120 30v95"/><path d="M45 125h150" stroke-width="4"/><path class="ac" d="M20 62h20M14 94h26M28 30h12M36 57l5 5-5 5M34 89l6 5-6 5"/><circle cx="45" cy="16" r="8"/><circle cx="120" cy="16" r="8"/><circle cx="195" cy="16" r="8"/>',
dom:'<path d="M30 125V75l55-35 55 35v50z"/><path d="M72 125V95h26v30"/><path class="ac" stroke-dasharray="7 5" d="M140 125h75V80h-75"/><path class="ac" d="M178 92v22M167 103h22"/>',
galpon:'<path d="M30 125V60l90-35 90 35v65"/><path d="M30 60h180M60 49v11M90 37v23M120 25v35M150 37v23M180 49v11M30 60l30-11M60 60l30-23M90 60l30-35M150 60l-30-35M180 60l-30-23M210 60l-30-11"/><path class="ac" d="M15 125h210" stroke-width="4"/>',
estabilidad:CASA+'<path class="ac" stroke-width="3" d="M120 45l-8 16 12 9-11 15 10 10-7 20"/><path d="M80 125V98h20v27M140 88h26v18h-26z"/>',
ito:'<path d="M70 30h100v100H70z"/><path d="M98 22h44v16H98z"/><path class="ac" stroke-width="3" d="M84 58l6 6 11-11M84 84l6 6 11-11M84 110l6 6 11-11"/><path d="M112 60h44M112 86h44M112 112h44"/>',
revision:'<path d="M55 20h90l30 30v85H55z"/><path d="M145 20v30h30M72 62h60M72 80h44M72 98h36"/><circle class="ac" cx="150" cy="105" r="24" stroke-width="3"/><path class="ac" stroke-width="4" d="M168 123l24 22"/>',
vivienda:CASA+'<path d="M80 125V95h24v30M132 85h34v22h-34z"/><path class="ac" d="M30 138h180M30 133v10M210 133v10"/><circle class="ac" cx="196" cy="34" r="20" stroke-width="3"/><text class="tx" x="196" y="40" text-anchor="middle">UF</text>',
rural:'<path d="M10 118q50-40 105-14t115-20"/><path d="M150 96V68l24-16 24 16v22"/><path d="M15 138h210M35 122v24M75 122v24M115 122v24M155 122v24M195 122v24"/><circle class="ac" cx="50" cy="42" r="16" stroke-width="3"/>',
comercial:'<path d="M45 130V30h150v100"/><path d="M45 62h150"/><path class="ac" d="M35 62l14-32M205 62l-14-32"/><path d="M65 130V82h46v48M130 82h45v28h-45z"/><path d="M78 16h84"/>',
judicial:'<path d="M120 24v100M80 130h80M60 44h120"/><path class="ac" d="M60 44L38 92h44zM180 44l-22 48h44z"/><path class="ac" d="M38 92q22 20 44 0M158 92q22 20 44 0"/>',
danos:'<path d="M40 80l80-52 80 52"/><path d="M60 72v58h120V72"/><path class="ac" stroke-width="3" d="M125 45l-10 18 14 8-9 18"/><path class="ac" d="M70 112h28v18H70zM78 112l4-7h12l2 7"/>',
peritaje:'<path d="M40 130V45h110v85"/><path d="M40 72h110M40 100h110M78 45v27M112 72v28M78 100v30"/><circle class="ac" cx="150" cy="82" r="34" stroke-width="3"/><path class="ac" stroke-width="4" d="M175 106l30 30"/><path class="ac" d="M140 66l10 12-8 10 12 12"/>'
};
function dib(k){return `<svg class="dib" viewBox="0 0 240 150" aria-hidden="true">${DIB[k]}</svg>`}
