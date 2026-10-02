const svg=document.getElementById('d'),NS='http://www.w3.org/2000/svg';
function el(t,a,p,x){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||svg).appendChild(e);if(x)e.textContent=x;return e}
PARTS.forEach(p=>{el('rect',{x:p.x,y:p.y,width:p.w,height:p.h,rx:6,class:'blk'});el('text',{x:p.x+p.w/2,y:p.y-10,class:'ttl','text-anchor':'middle'},0,p.t);
 p.pins.forEach(([x,y,l,s])=>{el('circle',{cx:x,cy:y,r:4,class:'pin'});el('text',{x:s=='r'?x-10:x+10,y:y+4,class:'pl','text-anchor':s=='r'?'end':'start'},0,l)})});
const gs={};
NETS.forEach(n=>{const g=el('g',{class:'net'});gs[n.id]=g;
 n.w.forEach(w=>el('polyline',{points:w.join(' '),stroke:n.c,class:'wire'},g));
 (n.dots||[]).forEach(([x,y])=>el('circle',{cx:x,cy:y,r:5,fill:n.c},g));
 g.onclick=()=>sel(n.id)});
el('rect',{x:200,y:170,width:60,height:20,class:'res'});el('text',{x:230,y:162,class:'pl','text-anchor':'middle'},0,'R1 10k');
el('rect',{x:290,y:230,width:20,height:60,class:'res'});el('text',{x:318,y:264,class:'pl'},0,'R2 20k');
el('text',{x:136,y:154,class:'pl no','text-anchor':'end'},0,'✕');
let cur=null;
function sel(id){cur=cur==id?null:id;for(const k in gs)gs[k].classList.toggle('dim',!!cur&&k!=cur);
 document.querySelectorAll('#nt tr[data-n]').forEach(r=>r.classList.toggle('on',r.dataset.n==cur))}
const tb=document.getElementById('nt');
NETS.forEach(n=>{const r=tb.insertRow();r.dataset.n=n.id;r.onclick=()=>sel(n.id);
 r.innerHTML=`<td><i style="background:${n.c}"></i>${n.id}</td><td>${n.d}</td><td>${n.links.join('<br>')}</td>`});
const cl=document.getElementById('cl');let st={};
try{st=JSON.parse(localStorage.getItem('chk')||'{}')}catch(e){}
CHECK.forEach((t,i)=>{const li=document.createElement('li');
 li.innerHTML=`<label><input type="checkbox" ${st[i]?'checked':''}> ${t}</label>`;
 li.querySelector('input').onchange=e=>{st[i]=e.target.checked;try{localStorage.setItem('chk',JSON.stringify(st))}catch(x){}};cl.appendChild(li)});
const bm=document.getElementById('bom');BOM.forEach(r=>{bm.insertRow().innerHTML=r.map(c=>`<td>${c}</td>`).join('')});
const q=id=>document.getElementById(id);
function calc(){const a=+q('r1').value,b=+q('r2').value,v=+q('vao').value,o=v*b/(a+b);
 q('out').textContent=o.toFixed(2)+' V';const m=q('msg');
 m.textContent=o>3.2?'Çox yüksəkdir: A0 3,2V-dan yuxarıda doyur. R2-ni azalt.':'A0 üçün təhlükəsiz aralıqdadır.';m.className=o>3.2?'bad':'ok'}
['r1','r2','vao'].forEach(i=>q(i).oninput=calc);calc();
