/**
 * NoJS Elements v1.15.2 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
var w={dragging:null,selected:new Map,placeholder:null},Ne=new Map;function $t(){w.dragging=null,w.selected.clear(),w.placeholder&&(w.placeholder.remove(),w.placeholder=null),Ne.clear()}function We(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
.nojs-dragging {
  opacity: 0.5;
  cursor: grabbing !important;
}
.nojs-drag-over {
  outline: 2px dashed #3b82f6;
  outline-offset: -2px;
}
.nojs-drop-placeholder {
  border: 2px dashed #3b82f6;
  border-radius: 6px;
  background: color-mix(in srgb, #3b82f6 6%, transparent);
  box-sizing: border-box;
  min-height: 2.5rem;
  transition: all 0.15s ease;
  pointer-events: none;
}
.nojs-drop-reject {
  outline: 2px dashed #ef4444;
  outline-offset: -2px;
  background: color-mix(in srgb, #ef4444 4%, transparent);
}
.nojs-selected {
  outline: 2px solid #3b82f6;
  outline-offset: 1px;
}
[drag-axis="x"] { touch-action: pan-y; }
[drag-axis="y"] { touch-action: pan-x; }
@keyframes nojs-drop-settle {
  from { transform: scale(1.05); opacity: 0.8; }
  to   { transform: scale(1);    opacity: 1; }
}
.nojs-drop-settle {
  animation: nojs-drop-settle 0.2s ease-out;
}
.nojs-drag-list-empty {
  min-height: 3rem;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Ye(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ce(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ue(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ue(r):e++}return e}function Ge(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let a=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let s=a.left+a.width/2;if(e<s)return i}else if(o==="grid"){let s=a.left+a.width/2,d=a.top+a.height/2;if(r<d&&e<s||r<a.top+a.height&&e<s)return i}else{let s=a.top+a.height/2;if(r<s)return i}}return n.length}function qt(t,e,r,o){oe();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",w.dragging&&w.dragging.sourceEl){let a=(w.dragging.sourceEl.firstElementChild||w.dragging.sourceEl).getBoundingClientRect();a.height>0&&(n.style.height=a.height+"px"),a.width>0&&(n.style.width=a.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),w.placeholder=n}function oe(){w.placeholder&&(w.placeholder.remove(),w.placeholder=null)}function ve(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function go(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,a=getComputedStyle(o),s=Math.min(e,3);for(let m=s-1;m>=0;m--){let l=document.createElement("div"),f=m*4;if(l.style.cssText="position:absolute;top:"+f+"px;left:"+f+"px;width:"+i+"px;height:"+c+"px;border-radius:"+a.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",m===0){let u=o.cloneNode(!0);for(;u.firstChild;)l.appendChild(u.firstChild);l.style.background=a.backgroundColor||"#fff",l.style.border=a.border,l.style.padding=a.padding,l.style.fontSize=a.fontSize,l.style.color=a.color,l.style.fontFamily=a.fontFamily}else l.style.background=a.backgroundColor||"#fff",l.style.border=a.border||"1px solid #ddd";r.appendChild(l)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(s-1)*4+"px",r.style.height=c+(s-1)*4+"px",r}var ne=null;function bo(){return ne&&ne.isConnected?ne:typeof document>"u"||!document.body?null:(ne=document.createElement("div"),ne.setAttribute("aria-live","assertive"),ne.setAttribute("aria-atomic","true"),ne.setAttribute("role","status"),ne.className="nojs-dnd-live-region",ne.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(ne),ne)}function le(t){let e=bo();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Mt(t){Ye(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){We();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",c=e.getAttribute("drag-effect")||"move",a=e.getAttribute("drag-handle"),s=e.getAttribute("drag-image"),d=e.getAttribute("drag-image-offset")||"0,0",m=e.getAttribute("drag-disabled"),l=e.getAttribute("drag-class")||"nojs-dragging",f=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-roledescription","draggable item"),e.getAttribute("role")||e.setAttribute("role","button"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let u=!0;if(a){let g=b=>{u=!!b.target.closest(a)};e.addEventListener("mousedown",g),ce(e,()=>e.removeEventListener("mousedown",g))}let p=g=>{if(a&&!u){g.preventDefault();return}if(m&&t.evaluate(m,n)){g.preventDefault();return}let b=t.evaluate(o,n),E=e.getAttribute("drag-group"),y=b;if(E&&w.selected.has(E)){let x=w.selected.get(E);x.size>0&&[...x].some(k=>k.el===e)&&(y=[...x].map(k=>k.item))}if(w.dragging={item:y,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},g.dataTransfer){if(g.dataTransfer.effectAllowed=c,g.dataTransfer.setData("text/plain",""),Array.isArray(y)&&y.length>1&&g.dataTransfer.setDragImage){let x=go(e,y.length);document.body.appendChild(x);let L=e.getBoundingClientRect();g.dataTransfer.setDragImage(x,L.width/2,L.height/2),requestAnimationFrame(()=>x.remove())}else if(s&&g.dataTransfer.setDragImage)if(s==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[L,k]=d.split(",").map(Number);g.dataTransfer.setDragImage(x,L||0,k||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(s);if(x){let[L,k]=d.split(",").map(Number);f&&x.classList.add(f),g.dataTransfer.setDragImage(x,L||0,k||0)}}}if(l.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(y)&&E&&w.selected.has(E))for(let x of w.selected.get(E))x.el!==e&&l.split(/\s+/).filter(Boolean).forEach(L=>x.el.classList.add(L));let A=e.getAttribute("aria-label")||e.textContent?.trim()?.slice(0,50)||"Item";le(`Grabbed ${A}. Use arrow keys to move.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:y,index:w.dragging.sourceIndex,el:e}}))},v=()=>{l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let g=e.getAttribute("drag-group");if(g&&w.selected.has(g))for(let b of w.selected.get(g))l.split(/\s+/).filter(Boolean).forEach(E=>b.el.classList.remove(E));if(f&&s&&s!=="none"){let b=e.querySelector(s);b&&b.classList.remove(f)}e.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:w.dragging?.item,index:w.dragging?.sourceIndex,dropped:w.dragging===null}})),w.dragging=null,oe()};if(e.addEventListener("dragstart",p),e.addEventListener("dragend",v),ce(e,()=>{e.removeEventListener("dragstart",p),e.removeEventListener("dragend",v)}),m){let g=function(){let E=!!t.evaluate(m,n);e.draggable=!E,E?e.removeAttribute("aria-roledescription"):e.setAttribute("aria-roledescription","draggable item")},b=n.$watch(g);ce(e,b)}let h=g=>{if(w.dragging&&!w.dragging.sourceEl.isConnected&&(w.dragging=null),g.key===" "&&!w.dragging){g.preventDefault();let b=t.evaluate(o,n);w.dragging={item:b,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},l.split(/\s+/).filter(Boolean).forEach(y=>e.classList.add(y));let E=e.getAttribute("aria-label")||e.textContent?.trim()?.slice(0,50)||"Item";le(`Grabbed ${E}. Use arrow keys to move.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else g.key==="Escape"&&w.dragging&&w.dragging.sourceEl===e&&(g.preventDefault(),l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),le("Drag cancelled."),w.dragging=null,oe())};e.addEventListener("keydown",h),ce(e,()=>e.removeEventListener("keydown",h))}})}function Pt(t){Ye(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){We();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",c=e.getAttribute("drop-effect")||"move",a=e.getAttribute("drop-class")||"nojs-drag-over",s=e.getAttribute("drop-reject-class")||"nojs-drop-reject",d=e.getAttribute("drop-disabled"),m=e.getAttribute("drop-max"),l=e.getAttribute("drop-sort"),f=e.getAttribute("drop-placeholder"),u=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",c);let p=0,v=y=>{if(!w.dragging||d&&t.evaluate(d,n))return;let A=ve(w.dragging.type,i),x=!0;if(m){let L=t.evaluate(m,n),k=Ue(e);typeof L=="number"&&k>=L&&(x=!1)}if(!A||!x){s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),oe();return}if(s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect=c),l){let L=Ge(e,y.clientX,y.clientY,l);f&&qt(e,L,f,u),e.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:w.dragging.item,index:L}}))}},h=y=>{if(w.dragging&&!(d&&t.evaluate(d,n))&&(p++,p===1)){let A=ve(w.dragging.type,i),x=!0;if(m){let L=t.evaluate(m,n),k=Ue(e);typeof L=="number"&&k>=L&&(x=!1)}A&&x?(a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:w.dragging.item,type:w.dragging.type}}))):s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L))}},g=y=>{w.dragging&&(p--,p<=0&&(p=0,a.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),s.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),oe(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:w.dragging.item}}))))},b=y=>{if(y.preventDefault(),y.stopPropagation(),p=0,!w.dragging||d&&t.evaluate(d,n)||!ve(w.dragging.type,i))return;if(m){let _=t.evaluate(m,n),$=Ue(e);if(typeof _=="number"&&$>=_)return}let A=w.dragging.item,x=w.dragging.type,L=w.dragging.effect,k=0;l&&(k=Ge(e,y.clientX,y.clientY,l)),a.split(/\s+/).filter(Boolean).forEach(_=>e.classList.remove(_)),s.split(/\s+/).filter(Boolean).forEach(_=>e.classList.remove(_)),oe();let j={$drag:A,$dragType:x,$dragEffect:L,$dropIndex:k,$source:{list:w.dragging.sourceList,index:w.dragging.sourceIndex,el:w.dragging.sourceEl},$target:{list:null,index:k,el:e},$el:e},S=K(t,"execStatement");typeof S=="function"?S(o,n,j):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),w.dragging=null,e.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:A,index:k,source:j.$source,target:j.$target,effect:L}}))},E=y=>{w.dragging&&(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),b(y))};e.addEventListener("dragover",v),e.addEventListener("dragenter",h),e.addEventListener("dragleave",g),e.addEventListener("drop",b),e.addEventListener("keydown",E),ce(e,()=>{e.removeEventListener("dragover",v),e.removeEventListener("dragenter",h),e.removeEventListener("dragleave",g),e.removeEventListener("drop",b),e.removeEventListener("keydown",E)})}})}function Rt(t){Ye(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){We();let n=t.findContext(e),i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),a=e.getAttribute("drag-list-item")||"item",s=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,m=e.getAttribute("drop-accept")||d,l=e.hasAttribute("drag-list-copy"),f=e.hasAttribute("drag-list-remove"),u=e.getAttribute("drag-disabled"),p=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),h=e.getAttribute("drop-placeholder"),g=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",E=e.getAttribute("drop-class")||"nojs-drag-over",y=e.getAttribute("drop-reject-class")||"nojs-drop-reject",A=e.getAttribute("drop-settle-class")||"nojs-drop-settle",x=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",l?"copy":"move");let L={listPath:o,ctx:n,el:e};Ne.set(e,L),ce(e,()=>Ne.delete(e));let k=0,j=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===j&&T.length>0&&e.children.length>0){for(let N of e.children)N.__ctx&&N.__ctx.$notify&&N.__ctx.$notify();return}j=T;let M=i?document.getElementById(i):null;if(!M)return;let P=K(t,"disposeChildren");typeof P=="function"&&P(e),e.innerHTML="";let I=T.length;T.forEach((N,z)=>{let J={[a]:N,$index:z,$count:I,$first:z===0,$last:z===I-1,$even:z%2===0,$odd:z%2!==0},ue=t.createContext(J,n),ut=M.content.cloneNode(!0),H=document.createElement("div");H.style.display="contents",H.__ctx=ue,H.appendChild(ut),e.appendChild(H);let R=H.firstElementChild||H;R.draggable=!0,R.setAttribute("role","option"),R.setAttribute("aria-roledescription","draggable item"),R.getAttribute("tabindex")||R.setAttribute("tabindex","0");let de=W=>{if(u&&t.evaluate(u,n)){W.preventDefault();return}w.dragging={item:N,type:d,effect:l?"copy":"move",sourceEl:H,sourceCtx:ue,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:l,removeMode:f}},W.dataTransfer&&(W.dataTransfer.effectAllowed=l?"copy":"move",W.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(he=>R.classList.add(he));let Z=R.getAttribute("aria-label")||R.textContent?.trim()?.slice(0,50)||"Item";le(`Grabbed ${Z}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:N,index:z,el:R}}))},be=()=>{b.split(/\s+/).filter(Boolean).forEach(W=>R.classList.remove(W)),w.dragging&&w.dragging.sourceEl===H&&(w.dragging=null),oe()};H.addEventListener("dragstart",de),H.addEventListener("dragend",be);let Ve=W=>{if(W.key===" "&&!w.dragging){W.preventDefault(),W.stopPropagation(),w.dragging={item:N,type:d,effect:l?"copy":"move",sourceEl:H,sourceCtx:ue,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:l,removeMode:f}},b.split(/\s+/).filter(Boolean).forEach(he=>R.classList.add(he));let Z=R.getAttribute("aria-label")||R.textContent?.trim()?.slice(0,50)||"Item";le(`Grabbed ${Z}. Use arrow keys to reorder.`)}else if(W.key==="Escape"&&w.dragging){W.preventDefault(),W.stopPropagation();let Z=e.querySelector(`.${b.split(/\s+/)[0]}`)||R;b.split(/\s+/).filter(Boolean).forEach(he=>Z.classList.remove(he)),le("Reorder cancelled."),w.dragging=null,oe()}else if((W.key==="ArrowDown"||W.key==="ArrowRight")&&w.dragging&&w.dragging.sourceEl===H){W.preventDefault();let Z=H.nextElementSibling;if(Z){(Z.firstElementChild||Z).focus();let qe=[...e.children].filter(ft=>!ft.classList.contains("nojs-drop-placeholder")),pt=qe.indexOf(Z)+1;le(`Moved to position ${pt} of ${qe.length}.`)}}else if((W.key==="ArrowUp"||W.key==="ArrowLeft")&&w.dragging&&w.dragging.sourceEl===H){W.preventDefault();let Z=H.previousElementSibling;if(Z){(Z.firstElementChild||Z).focus();let qe=[...e.children].filter(ft=>!ft.classList.contains("nojs-drop-placeholder")),pt=qe.indexOf(Z)+1;le(`Moved to position ${pt} of ${qe.length}.`)}}};H.addEventListener("keydown",Ve),H.__disposers=H.__disposers||[],H.__disposers.push(()=>H.removeEventListener("dragstart",de),()=>H.removeEventListener("dragend",be),()=>H.removeEventListener("keydown",Ve)),t.processTree(H)});let q=T.length===0;x.split(/\s+/).filter(Boolean).forEach(N=>e.classList.toggle(N,q))}let _=T=>{if(!w.dragging||p&&t.evaluate(p,n))return;let M=ve(w.dragging.type,m),P=!0;if(v){let q=t.evaluate(v,n),N=t.resolve(o,n);typeof q=="number"&&Array.isArray(N)&&N.length>=q&&(P=!1)}if(!M||!P){y.split(/\s+/).filter(Boolean).forEach(q=>e.classList.add(q)),E.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),oe();return}y.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=l?"copy":"move");let I=Ge(e,T.clientX,T.clientY,s);h&&qt(e,I,h,g)},$=T=>{if(w.dragging&&!(p&&t.evaluate(p,n))&&(k++,k===1)){let M=ve(w.dragging.type,m),P=!0;if(v){let I=t.evaluate(v,n),q=t.resolve(o,n);typeof I=="number"&&Array.isArray(q)&&q.length>=I&&(P=!1)}M&&P?(E.split(/\s+/).filter(Boolean).forEach(I=>e.classList.add(I)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:w.dragging.item,type:w.dragging.type}}))):y.split(/\s+/).filter(Boolean).forEach(I=>e.classList.add(I))}},V=()=>{w.dragging&&(k--,k<=0&&(k=0,E.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),y.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),oe(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:w.dragging?.item}}))))},X=T=>{if(T.preventDefault(),T.stopPropagation(),k=0,!w.dragging||p&&t.evaluate(p,n)||!ve(w.dragging.type,m))return;if(v){let H=t.evaluate(v,n),R=t.resolve(o,n);if(typeof H=="number"&&Array.isArray(R)&&R.length>=H)return}let M=w.dragging.item,P=w.dragging.listDirective,I=w.dragging.sourceIndex,q=Ge(e,T.clientX,T.clientY,s);E.split(/\s+/).filter(Boolean).forEach(H=>e.classList.remove(H)),y.split(/\s+/).filter(Boolean).forEach(H=>e.classList.remove(H)),oe();let N=t.resolve(o,n);if(!Array.isArray(N))return;let z=P&&P.el===e;if(z&&I===q){w.dragging=null;return}if(z&&I+1===q){w.dragging=null;return}let J=[...N];if(z){let[H]=J.splice(I,1),R=I<q?q-1:q;J.splice(R,0,H),n.$set(o,J),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:J,item:M,from:I,to:R}}))}else{let H=l&&typeof M=="object"?{...M}:M;if(J.splice(q,0,H),n.$set(o,J),P&&!P.copyMode&&(f||P.removeMode)){let R=t.resolve(P.listPath,P.ctx);if(Array.isArray(R)&&I!=null){let de=R.filter((be,Ve)=>Ve!==I);P.ctx.$set(P.listPath,de),P.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:de,item:M,index:I}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:J,item:M,from:I,fromList:P?t.resolve(P.listPath,P.ctx):null}}))}let ue=w.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||w.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",ut=z&&I<q?q:q+1;le(`Dropped ${ue} at position ${ut}.`),requestAnimationFrame(()=>{let R=[...e.children][z&&I<q?q-1:q];if(R){let de=R.firstElementChild||R;A.split(/\s+/).filter(Boolean).forEach(be=>de.classList.add(be)),de.addEventListener("animationend",()=>{A.split(/\s+/).filter(Boolean).forEach(be=>de.classList.remove(be))},{once:!0})}}),w.dragging=null},F=T=>{if(w.dragging&&ve(w.dragging.type,m)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let M=e.querySelector(":focus");if(M){let I=(M.style?.display==="contents"&&M.firstElementChild||M).getBoundingClientRect(),q={preventDefault(){},stopPropagation(){},clientX:I.left+I.width/2,clientY:I.top+I.height+1,dataTransfer:null};X(q)}}};e.addEventListener("dragover",_),e.addEventListener("dragenter",$),e.addEventListener("dragleave",V),e.addEventListener("drop",X),e.addEventListener("keydown",F),ce(e,()=>{e.removeEventListener("dragover",_),e.removeEventListener("dragenter",$),e.removeEventListener("dragleave",V),e.removeEventListener("drop",X),e.removeEventListener("keydown",F)});let re=n.$watch(S);ce(e,re),S()}})}function Ft(t){Ye(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}w.selected.has(n)||w.selected.set(n,new Set);let c=w.selected.get(n),a=d=>{let m=e.getAttribute("drag"),f={item:m?t.evaluate(m,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let u=[...c].find(p=>p.el===e);u?(c.delete(u),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.remove(p))):(c.add(f),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p)))}else{for(let u of c)i.split(/\s+/).filter(Boolean).forEach(p=>u.el.classList.remove(p));c.clear(),c.add(f),i.split(/\s+/).filter(Boolean).forEach(u=>e.classList.add(u))}};e.addEventListener("click",a),ce(e,()=>{e.removeEventListener("click",a);let d=[...c].find(m=>m.el===e);d&&c.delete(d)});let s=d=>{if(d.key==="Escape"){for(let m of c)i.split(/\s+/).filter(Boolean).forEach(l=>m.el.classList.remove(l));c.clear()}};window.addEventListener("keydown",s),ce(e,()=>window.removeEventListener("keydown",s))}})}function zt(t,e={}){Mt(t),Pt(t),Rt(t),Ft(t)}function Ot(){$t()}var Vt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],mt=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ie(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ye,Yt,Xe,gt,bt,Nt,Ke,ht,Wt;function ho(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function vo(t){return(t.getAttribute("type")||"text").toLowerCase()}function yo(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(a=>a.trim());for(let a of c){let[s,...d]=a.split(":"),m=ye[s];if(m){let l=m(t.value,...d,e);l!==!0&&l&&(r.push({rule:s,message:l}),o.add(s))}else{let l=t.value,f=null;switch(s){case"required":(l==null||String(l).trim()==="")&&(f="Required");break;case"email":l&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)&&(f="Invalid email");break;case"url":try{new URL(l)}catch{f="Invalid URL"}break;case"min":Number(l)<Number(d[0])&&(f=`Minimum value is ${d[0]}`);break;case"max":Number(l)>Number(d[0])&&(f=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&ye[d[0]]){let u=ye[d[0]](l,e);u!==!0&&u&&(f=u)}break}f&&(r.push({rule:s,message:f}),o.add(s))}}}let i=t.validity;if(i&&!i.valid){for(let[c,a]of Vt)if(i[c]){let s=a||vo(t);o.has(s)||(r.push({rule:s,message:t.validationMessage}),o.add(s))}}return r}function xo(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Eo(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=mt.indexOf(n.rule),a=mt.indexOf(i.rule);return(c===-1?999:c)-(a===-1?999:a)})[0];return{rule:o.rule,message:xo(e,o.rule,o.message)}}function Kt(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Ao(t,e,r,o,n){let i=Kt(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;ht(i),i.remove()}let c=document.querySelector(t);if(!c)return;let a=c.content.cloneNode(!0),s=document.createElement("div");s.style.display="contents",s.setAttribute("aria-live","polite"),s.__errorTemplateFor=o;let d=Xe({$error:e,$rule:r},n);s.__ctx=d,s.appendChild(a),c.parentNode.insertBefore(s,c.nextSibling),ho(s),bt(s)}function Ut(t){let e=Kt(t);e&&(ht(e),e.remove())}function wo(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Yt(r,e)}catch{return!0}}function Gt(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function _o(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),a=ye[i];if(a){let s=a(t,...c,r);if(s!==!0&&s)return s}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&ye[c[0]]){let s=ye[c[0]](t,r);if(s!==!0&&s)return s}break}}return null}function jo(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return gt(t);let e=Xe({},null);return t.__ctx=e,e}function Xt(t){ye=K(t,"validators")||{},Yt=t.evaluate,Xe=t.createContext,gt=t.findContext,bt=t.processTree,Nt=K(t,"cloneTemplate")||(()=>null),Ke=K(t,"disposeChildren")||(()=>{}),ht=K(t,"disposeTree")||Ke,Wt=K(t,"warn")||console.warn;let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):Wt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let f=function(){c&&typeof c.$notify=="function"&&c.$notify();let y=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;y.nextNode();){let x=y.currentNode.__ctx;x&&x!==c&&typeof x.$notify=="function"&&x.$notify()}},u=function(){return r.querySelectorAll("input, textarea, select")},p=function(){let y={},A={},x={},L=!0,k=null,j=0,S=!1;for(let _ of u())_.name&&(_.type==="checkbox"?A[_.name]=_.checked:_.type==="radio"?_.checked?A[_.name]=_.value:_.name in A||(A[_.name]=""):A[_.name]=_.value);for(let _ of u()){if(!_.name)continue;let $=s.has(_.name),V=d.has(_.name);if(!wo(_,c)){x[_.name]={valid:!0,dirty:V,touched:$,error:null,value:A[_.name]};continue}let X=yo(_,A),F=Eo(X,_),re=!F,T=Gt(_,r),M=T.includes("input"),P=T.includes("blur")||T.includes("focusout")||T.includes("submit"),I;!_.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?I=$||V:I=M&&V||P&&$,re||(L=!1),!re&&I&&(y[_.name]=F.message,j++,k||(k=F.message)),x[_.name]={valid:re,dirty:V,touched:$,error:F?F.message:null,value:A[_.name]},!re&&I?_.setAttribute("aria-invalid","true"):_.removeAttribute("aria-invalid");let q=_.getAttribute("error-class")||a;if(q){let z=q.split(/\s+/);!re&&I?_.classList.add(...z):_.classList.remove(...z)}if(F&&I){let z=_.getAttribute(`error-${F.rule}`),J=_.getAttribute("error"),ue=(z&&z.startsWith("#")?z:null)||(J&&J.startsWith("#")?J:null);ue?Ao(ue,F.message,F.rule,_,c):Ut(_)}else Ut(_);let N=_.getAttribute("as");N&&c.$set(N,x[_.name])}m.size>0&&(S=!0),l.valid=L,l.errors=y,l.values=A,l.fields=x,l.firstError=k,l.errorCount=j,l.pending=S,c.$set("$form",{...l}),f(),v(r)},v=function(y){let A=l.valid&&!l.pending&&!l.submitting,x=y.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of x){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let k=L.getAttribute("disabled");if(k!=="disabled"&&k!=="true"&&k!=="false")continue}L.disabled=!A,L.__autoDisabled=!0}},h=function(y){if(!y.name)return;let A=Gt(y,r),x=()=>{d.add(y.name),l.dirty=!0,p()},L=()=>{s.add(y.name),l.touched=!0,p()};if(A.includes("input"))y.addEventListener("input",x),ie(r,()=>y.removeEventListener("input",x));else{let k=()=>{d.add(y.name),l.dirty=!0,p()};y.addEventListener("input",k),ie(r,()=>y.removeEventListener("input",k))}if(A.includes("blur")||A.includes("focusout")){let k=()=>{L(),A.includes("blur")&&x()};y.addEventListener("focusout",k),ie(r,()=>y.removeEventListener("focusout",k))}else y.addEventListener("focusout",L),ie(r,()=>y.removeEventListener("focusout",L));A.includes("submit")&&(y.addEventListener("focusout",L),ie(r,()=>y.removeEventListener("focusout",L)))},c=jo(r);r.setAttribute("novalidate","");let a=r.getAttribute("error-class"),s=new Set,d=new Set,m=new Map,l={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{l.dirty=!1,l.touched=!1,l.pending=!1,l.submitting=!1,s.clear(),d.clear(),r.reset(),p()},endSubmit:()=>{l.submitting=!1,p()}};c.$set("$form",l);let g=r.hasAttribute("validate-on"),b=[...u()].some(y=>y.hasAttribute("validate-on"));if(!g&&!b){let y=x=>{let L=x.target;L&&L.name&&d.add(L.name),l.dirty=!0,p()};r.addEventListener("input",y),ie(r,()=>r.removeEventListener("input",y)),r.addEventListener("change",y),ie(r,()=>r.removeEventListener("change",y));let A=x=>{x.target&&x.target.name&&s.add(x.target.name),l.touched=!0,p()};r.addEventListener("focusout",A),ie(r,()=>r.removeEventListener("focusout",A))}else for(let y of u())h(y);let E=y=>{for(let A of u())A.name&&s.add(A.name);if(l.touched=!0,p(),!l.valid||l.pending){y.preventDefault(),y.stopImmediatePropagation();return}l.submitting=!0,v(r),c.$set("$form",{...l}),f()};r.addEventListener("submit",E,!0),ie(r,()=>r.removeEventListener("submit",E,!0)),r.__nojsResetSubmitting=()=>{l.submitting=!1,p()},ie(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(p);return}let i=gt(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),a=()=>{let s=_o(r.value,n,{});if(s?r.setAttribute("aria-invalid","true"):r.removeAttribute("aria-invalid"),s&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let m=Nt(c);if(m){let l=Xe({err:{message:s}},i);Ke(d),d.innerHTML="",d.__ctx=l,d.appendChild(m),bt(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(Ke(d),d.innerHTML="")}};r.addEventListener("input",a),ie(r,()=>r.removeEventListener("input",a))}}})}function Zt(t,e={}){Xt(t)}function Qt(){}var je=new Map,ee=new Map;function Jt(){let t=Array.from(je.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of ee.values())clearTimeout(e);ee.clear();for(let e of je.values())e.remove();je.clear()}function er(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
.nojs-tooltip {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  max-width: 18rem;
  padding: 0.45rem 0.75rem;
  background: #1E293B;
  color: #F1F5F9;
  font-size: 0.8rem;
  line-height: 1.4;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(2px);
}
.nojs-tooltip[aria-hidden="false"] {
  opacity: 1;
  transform: translateY(0);
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Lo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ze=8;function rr(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,a,s;switch(r){case"bottom":a=o.bottom+Ze,s=o.left+(o.width-n.width)/2;break;case"left":a=o.top+(o.height-n.height)/2,s=o.left-n.width-Ze;break;case"right":a=o.top+(o.height-n.height)/2,s=o.right+Ze;break;default:a=o.top-n.height-Ze,s=o.left+(o.width-n.width)/2;break}s<4&&(s=4),s+n.width>i-4&&(s=i-n.width-4),a<4&&(a=4),a+n.height>c-4&&(a=c-n.height-4),t.style.top=`${a}px`,t.style.left=`${s}px`}var ko=0;function Co(t,e,r){document.body.appendChild(e),rr(e,t,r),e.setAttribute("aria-hidden","false")}function tr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function So(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function nr(t){t.directive("tooltip",{priority:20,init(e,r,o){er();let n=o;if(!n){So(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),a=Number.isNaN(c)?300:c,s=e.getAttribute("tooltip-disabled"),d=s?t.findContext(e):null,m=()=>{if(!s||!d)return!1;try{return!!t.evaluate(s,d)}catch{return!1}},l=`nojs-tooltip-${++ko}`,f=document.createElement("div");f.className="nojs-tooltip",f.setAttribute("role","tooltip"),f.setAttribute("id",l),f.setAttribute("aria-hidden","true"),f.textContent=n,e.setAttribute("aria-describedby",l),je.set(e,f);let u=!1,p=0,v=()=>{!u||!e.isConnected||p||(p=requestAnimationFrame(()=>{p=0,!(!u||!e.isConnected)&&rr(f,e,i)}))},h=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},g=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),p&&(cancelAnimationFrame(p),p=0)},b=()=>{u||(Co(e,f,i),u=!0,h())},E=()=>{if(!u){tr(e,f);return}g(),tr(e,f),u=!1},y=()=>{if(m())return;ee.has(e)&&clearTimeout(ee.get(e));let $=setTimeout(()=>{ee.delete(e),!m()&&e.isConnected&&b()},a);ee.set(e,$)},A=()=>{ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),E()},x=()=>y(),L=()=>A(),k=()=>y(),j=()=>A(),S=$=>{$.key==="Escape"&&f.getAttribute("aria-hidden")==="false"&&A()};e.addEventListener("mouseenter",x),e.addEventListener("mouseleave",L),e.addEventListener("focusin",k),e.addEventListener("focusout",j),e.addEventListener("keydown",S);let _=null;if(s&&d&&typeof d.$watch=="function"){let $=()=>{u&&m()&&E()};_=d.$watch($)}Lo(e,()=>{e.removeEventListener("mouseenter",x),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",k),e.removeEventListener("focusout",j),e.removeEventListener("keydown",S),_&&(_(),_=null),g(),ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),u=!1,f.remove(),je.delete(e)})}})}function or(t,e={}){nr(t)}function ir(){Jt()}var Y=new Map;function sr(){Y.clear()}function Qe(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
.nojs-popover {
  position: fixed;
  z-index: 9998;
  margin: 0;
  border: 1px solid #E2E8F0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
  max-width: 20rem;
}
.nojs-popover:popover-open {
  display: block;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function vt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Le(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var pe=8;function Je(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,a,s;switch(r){case"top":a=o.top-n.height-pe,s=o.left+(o.width-n.width)/2;break;case"left":a=o.top+(o.height-n.height)/2,s=o.left-n.width-pe;break;case"right":a=o.top+(o.height-n.height)/2,s=o.right+pe;break;default:a=o.bottom+pe,s=o.left+(o.width-n.width)/2;break}r==="bottom"&&a+n.height>c&&(a=o.top-n.height-pe),r==="top"&&a<0&&(a=o.bottom+pe),r==="right"&&s+n.width>i&&(s=o.left-n.width-pe),r==="left"&&s<0&&(s=o.right+pe),s<4&&(s=4),s+n.width>i-4&&(s=i-n.width-4),a<4&&(a=4),a+n.height>c-4&&(a=c-n.height-4),t.style.top=`${a}px`,t.style.left=`${s}px`}function yt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(typeof c.matches=="function"&&!c.matches(":popover-open")){i();return}Je(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function xe(t){t&&t._untrack&&t._untrack()}function ar(t){t.directive("popover",{priority:20,init(r,o,n){Qe();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let s=Y.get(i);s.popoverEl=r,s.position=c}let a=s=>{let d=Y.get(i);if(!d)return;let m=s.newState==="open";d.open=m;for(let l of d.triggerEls)l.setAttribute("aria-expanded",String(m));m||xe(d)};r.addEventListener("toggle",a),vt(r,()=>{r.removeEventListener("toggle",a);let s=Y.get(i);s&&(xe(s),s.popoverEl===r&&(s.popoverEl=null,s.open=!1),!s.popoverEl&&s.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){Qe();let i=n;if(!i){let s=r.closest("[use]")||r.parentElement,d=s?.querySelector("[data-popover-id]")||s?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let c=s=>{let d=Y.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}Le(d.popoverEl)&&(d.popoverEl.togglePopover(),requestAnimationFrame(()=>{d.popoverEl.matches(":popover-open")?(Je(d.popoverEl,r,d.position),yt(d,r)):xe(d)}))};r.addEventListener("click",c);let a=s=>{let d=Y.get(i);s.key==="Escape"&&d?.open&&(Le(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),xe(d),r.focus())};document.addEventListener("keydown",a),vt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",a);let s=Y.get(i);s&&(s.triggerEls.delete(r),!s.popoverEl&&s.triggerEls.size===0&&(xe(s),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){Qe();let o=()=>{let n=r.closest(".nojs-popover");!n||!Le(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),vt(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Le(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{Je(n.popoverEl,i,n.position),yt(n,i)}),!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!Le(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return xe(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Le(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{Je(n.popoverEl,i,n.position),yt(n,i)}):xe(n),!0},t.popover=e}function cr(t,e={}){ar(t)}function dr(){sr()}var U=[],se=new Map,To=1e4;function lr(){return To+U.length}function ur(){U.length=0,se.clear()}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
.nojs-modal {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  margin: 0;
  border: none;
  padding: 0;
  max-width: 100dvw;
  max-height: 100dvh;
  background: transparent;
}
.nojs-modal:popover-open {
  display: flex !important;
  inset: 0 !important;
  margin: 0 !important;
  width: 100dvw !important;
  height: 100dvh !important;
}
.nojs-modal::backdrop {
  background: rgb(0 0 0 / 0.5);
}
.nojs-modal[data-nojs-no-backdrop]::backdrop {
  background: transparent;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Do(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var fr='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',xt=new WeakMap;function Io(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(fr)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),xt.set(t,e)}function pr(t){let e=xt.get(t);e&&(t.removeEventListener("keydown",e),xt.delete(t))}var Me=new WeakMap;function mr(t){t.directive("modal",{priority:10,init(r,o,n){ke();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let a=r.getAttribute("modal-backdrop");a==="false"&&r.setAttribute("data-nojs-no-backdrop","");let s=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),m=f=>{f.target===r&&a!=="false"&&d!=="false"&&Ce(r,i)};r.addEventListener("click",m),se.set(i,r);let l=f=>{if(f.newState==="open"){if(r.style.zIndex=String(lr()),s&&s.split(/\s+/).filter(Boolean).forEach(u=>r.classList.add(u)),requestAnimationFrame(()=>{if(!r.isConnected||!U.some(p=>p.el===r))return;let u=r.querySelector(fr);u?u.focus():r.focus()}),Io(r),d!=="false"){let u=p=>{p.key==="Escape"&&(p.stopPropagation(),Ce(r,i))};r.addEventListener("keydown",u),Me.set(r,u)}}else if(f.newState==="closed"){s&&s.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),pr(r);let u=Me.get(r);u&&(r.removeEventListener("keydown",u),Me.delete(r));let p=U.findIndex(v=>v.el===r);if(p===-1&&(p=U.findIndex(v=>v.id===i)),p!==-1){let v=U[p];U.splice(p,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",l),Do(r,()=>{r.removeEventListener("click",m),r.removeEventListener("toggle",l),pr(r);let f=Me.get(r);f&&(r.removeEventListener("keydown",f),Me.delete(r)),se.delete(i);let u=U.findIndex(p=>p.el===r);u===-1&&(u=U.findIndex(p=>p.id===i)),u!==-1&&U.splice(u,1)})}});let e=r=>e.open(r);e.open=r=>{let o=se.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return U.some(n=>n.id===r)||U.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=se.get(r);return o?(Ce(o,r),!0):!1},e.closeAll=()=>{for(let r=U.length-1;r>=0;r--)Ce(U[r].el,U[r].id)},t.modal=e}function Ce(t,e){try{t.hidePopover()}catch{}}function gr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ho(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function br(t){t.directive("modal-open",{priority:10,init(e,r,o){ke();let n=o;if(!n){let l=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(l&&(n=l.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let m=se.get(n)||Ho(n);if(!m){console.warn(`[modal-open] modal "${n}" not found`);return}let l=U.some(f=>f.id===n);m.id&&e.setAttribute("aria-controls",m.id);try{m.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}l||U.push({id:n,el:m,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},a=null,s=null,d=()=>{let m=se.get(n);return m?(s=m,a=l=>{l.newState==="closed"&&e.setAttribute("aria-expanded","false")},m.addEventListener("toggle",a),!0):!1};if(!d()){let m=requestAnimationFrame(d);gr(e,()=>cancelAnimationFrame(m))}e.addEventListener("click",i),gr(e,()=>{e.removeEventListener("click",i),s&&a&&s.removeEventListener("toggle",a)})}})}function Bo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function hr(t){t.directive("modal-close",{priority:10,init(e,r,o){ke();let n=()=>{let i,c;if(o){if(c=o,i=se.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Ce(i,c)};e.addEventListener("click",n),Bo(e,()=>{e.removeEventListener("click",n)})}})}function vr(t,e={}){mr(t),br(t),hr(t)}function yr(){ur()}var te={openMenus:new Map},O={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function xr(){te.openMenus.clear(),O.installed=!1,O.instanceCount=0,O.outsideClickHandler=null,O.escHandler=null}function Se(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
.nojs-dropdown-menu {
  position: fixed;
  z-index: 9999;
  margin: 0;
  min-width: max-content;
  list-style: none;
  padding: 0;
  background: #fff;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06);
  display: none;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}
.nojs-dropdown-menu[data-open] {
  display: block;
}
.nojs-dropdown-item {
  display: block;
  width: 100%;
  padding: 0.45rem 0.875rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  color: #334155;
  text-decoration: none;
  transition: background 0.1s;
}
.nojs-dropdown-item:hover,
.nojs-dropdown-item:focus {
  background: #F1F5F9;
  outline: none;
}
.nojs-dropdown-item[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.4;
}
.nojs-dropdown-item:focus-visible {
  outline: 2px solid #0EA5E9;
  outline-offset: -2px;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var $o=0;function qo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Mo(){O.installed||(O.outsideClickHandler=t=>{let e=[...te.openMenus.entries()];for(let[r,{toggle:o,wrapper:n}]of e)if(!n.contains(t.target)){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}te.openMenus.delete(r)}},O.escHandler=t=>{if(t.key!=="Escape")return;let e=[...te.openMenus.entries()];for(let[r,{toggle:o}]of e){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}o.focus()}te.openMenus.clear()},document.addEventListener("click",O.outsideClickHandler,!0),document.addEventListener("keydown",O.escHandler),O.installed=!0)}function At(){O.installed&&(document.removeEventListener("click",O.outsideClickHandler,!0),document.removeEventListener("keydown",O.escHandler),O.outsideClickHandler=null,O.escHandler=null,O.installed=!1)}function Er(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),a=window.innerHeight,s=window.innerWidth,d,m;switch(o){case"top":d=i.top-c.height,m=i.left;break;case"left":d=i.top,m=i.left-c.width;break;case"right":d=i.top,m=i.right;break;default:d=i.bottom,m=i.left}o==="bottom"||o==="top"?n==="end"&&(m=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>a&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=a&&(d=i.bottom),m<4&&(m=4),m+c.width>s-4&&(m=s-c.width-4),t.style.top=`${d}px`,t.style.left=`${m}px`}function wt(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Et(t){let e=wt(t);e.length&&e[0].focus()}function Ar(t){let e=wt(t);e.length&&e[e.length-1].focus()}function wr(t){t.directive("dropdown",{priority:15,init(r){Se()}}),t.directive("dropdown-toggle",{priority:15,init(r){Se();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${$o++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function a(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Er(n,r,o),te.openMenus.set(n,{toggle:r,wrapper:o})}function s(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),te.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let m=v=>{v.newState==="closed"&&d()&&s()};n.addEventListener("toggle",m);let l=v=>{v.preventDefault(),v.stopPropagation(),d()?s():a()};r.addEventListener("click",l),O.instanceCount++,Mo();let f=v=>{switch(v.key){case"Enter":case" ":v.preventDefault(),a(),Et(n);break;case"ArrowDown":v.preventDefault(),a(),Et(n);break;case"ArrowUp":v.preventDefault(),a(),Ar(n);break}};r.addEventListener("keydown",f);let u=v=>{if(!(!d()||wt(n).find(b=>b===document.activeElement)))switch(v.key){case"ArrowDown":v.preventDefault(),Et(n);break;case"ArrowUp":v.preventDefault(),Ar(n);break}};n.addEventListener("keydown",u);let p=()=>{d()&&Er(n,r,o)};window.addEventListener("scroll",p,!0),window.addEventListener("resize",p),qo(r,()=>{r.removeEventListener("click",l),r.removeEventListener("keydown",f),n.removeEventListener("keydown",u),n.removeEventListener("toggle",m),window.removeEventListener("scroll",p,!0),window.removeEventListener("resize",p),te.openMenus.delete(n),O.instanceCount--,O.instanceCount<=0&&(O.instanceCount=0,At())})}}),t.directive("dropdown-menu",{priority:15,init(r){Se(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function _r(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Po(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function _t(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),te.openMenus.has(t)&&te.openMenus.delete(t)}function jr(t){t.directive("dropdown-item",{priority:15,init(e){Se();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let a=Po(r),s=a.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(s+1<a.length?a[s+1]:a[0]).focus();break}case"ArrowUp":{c.preventDefault(),(s-1>=0?a[s-1]:a[a.length-1]).focus();break}case"Home":{c.preventDefault(),a.length&&a[0].focus();break}case"End":{c.preventDefault(),a.length&&a[a.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),_t(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{_t(r,o);break}}};e.addEventListener("keydown",n),_r(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(_t(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),_r(e,()=>e.removeEventListener("click",i))}})}function Lr(t,e={}){wr(t),jr(t)}function kr(){At(),xr()}var ae=new Map,Te=new Set,Cr=0;function Sr(){return++Cr}function Tr(){for(let t of Te)clearTimeout(t);Te.clear();for(let t of ae.values())t.remove();ae.clear(),Cr=0}function Dr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
.nojs-toast-container {
  position: fixed;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  pointer-events: none;
  max-width: min(24rem, calc(100vw - 2rem));
}
.nojs-toast-container[data-position="top-right"] { top: 0; right: 0; }
.nojs-toast-container[data-position="top-left"] { top: 0; left: 0; }
.nojs-toast-container[data-position="bottom-right"] { bottom: 0; right: 0; }
.nojs-toast-container[data-position="bottom-left"] { bottom: 0; left: 0; }
.nojs-toast-container[data-position="top-center"] { top: 0; left: 50%; transform: translateX(-50%); }
.nojs-toast-container[data-position="bottom-center"] { bottom: 0; left: 50%; transform: translateX(-50%); }
.nojs-toast {
  pointer-events: auto;
  margin: 0;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  min-width: 16rem;
  background: #1E293B;
  color: #F8FAFC;
  font-size: 0.9rem;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  opacity: 0;
  animation: nojs-toast-in 0.25s ease forwards;
}
.nojs-toast[data-type="success"] { background: #16A34A; }
.nojs-toast[data-type="error"]   { background: #DC2626; }
.nojs-toast[data-type="warning"] { background: #D97706; color: #0F172A; }
.nojs-toast[data-type="info"]    { background: #0284C7; }
.nojs-toast-dismiss {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.25rem;
  opacity: 0.7;
  line-height: 1;
}
.nojs-toast-dismiss:hover { opacity: 1; }
@keyframes nojs-toast-in {
  from { opacity: 0; transform: translateY(-0.5rem); }
  to   { opacity: 1; transform: translateY(0); }
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function jt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ro=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Lt(){return ae.size>0?ae.values().next().value:Fo("top-right")}function Fo(t){if(ae.has(t))return ae.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ae.set(t,e),e}function zo(t){return t.startsWith("top")}function kt(t,e,r,o,n){let i=Sr(),c=t.getAttribute("data-position")||"top-right",a=document.createElement("div");a.classList.add("nojs-toast"),a.setAttribute("data-toast-id",i),a.setAttribute("data-type",r),r==="error"&&a.setAttribute("aria-live","assertive");let s=document.createElement("span");if(s.textContent=e,a.appendChild(s),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>et(a)),a.appendChild(d)}if(zo(c)&&t.firstChild?t.insertBefore(a,t.firstChild):t.appendChild(a),o>0){let d=setTimeout(()=>{Te.delete(d),a.isConnected&&et(a)},o);Te.add(d),a._toastTimerId=d}return a}function et(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Te.delete(t._toastTimerId)),t.remove())}function Ir(t){Dr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&Ro.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ae.set(i,r),jt(r,()=>{ae.get(i)===r&&ae.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),a=Number.isNaN(c)?3e3:c,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let p=()=>{let v=Lt();kt(v,n,i,a,s)};r.addEventListener("click",p),jt(r,()=>r.removeEventListener("click",p));return}let m=t.findContext(r);if(!m||typeof m.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let l;function f(){let p=t.evaluate(n,m);if(p&&p!==l){let v=typeof p=="string"?p:String(p),h=Lt();kt(h,v,i,a,s),l=p}else l=p}let u=m.$watch(f);jt(r,u)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=Lt();return kt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&et(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>et(r))},t.toast=e,t.global("toast",e)}function Hr(t,e={}){Ir(t)}function Br(){Tr()}var Ee={containers:new Map};function $r(){Ee.containers.clear()}function qr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
.nojs-tabs {
  display: flex;
  flex-direction: column;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}
.nojs-tabs[data-position="left"],
.nojs-tabs[data-position="right"] {
  flex-direction: row;
}
.nojs-tabs[data-position="bottom"] {
  flex-direction: column-reverse;
}
.nojs-tabs[data-position="right"] .nojs-tablist {
  order: 1;
}
.nojs-tablist {
  display: flex;
  gap: 0;
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
  overflow-x: auto;
  scrollbar-width: none;
}
.nojs-tablist::-webkit-scrollbar { display: none; }
.nojs-tabs[data-position="left"] .nojs-tablist,
.nojs-tabs[data-position="right"] .nojs-tablist {
  flex-direction: column;
  border-bottom: none;
  border-right: 1px solid #E2E8F0;
  overflow-x: visible;
}
.nojs-tab {
  padding: 0.6rem 1.1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748B;
  white-space: nowrap;
  transition: color 0.15s, background 0.15s;
  position: relative;
}
.nojs-tab:hover:not([aria-disabled="true"]) {
  color: #334155;
  background: #F1F5F9;
}
.nojs-tab[aria-selected="true"] {
  color: #0EA5E9;
  background: #fff;
}
.nojs-tab[aria-selected="true"]::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #0EA5E9;
}
.nojs-tabs[data-position="left"] .nojs-tab[aria-selected="true"]::after,
.nojs-tabs[data-position="right"] .nojs-tab[aria-selected="true"]::after {
  bottom: auto;
  top: 0;
  left: auto;
  right: 0;
  width: 2px;
  height: 100%;
}
.nojs-tab[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.4;
  color: #94A3B8;
}
.nojs-panel {
  padding: 1.25rem;
}
.nojs-panel[aria-hidden="true"] {
  display: none;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function Oo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Vo=0;function Mr(t){return`${t}-${++Vo}`}function Pe(t,e,r=!1){let o=Ee.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Re(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Pr(t){t.directive("tabs",{priority:10,init(e,r,o){qr();let n=[],i=[];for(let g of Array.from(e.children))g.hasAttribute("tab")?n.push(g):g.hasAttribute("panel")&&i.push(g);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let a=document.createElement("div");a.setAttribute("role","tablist"),a.classList.add("nojs-tablist");let s=Math.min(n.length,i.length);for(let g=0;g<s;g++){let b=n[g],E=i[g],y=b.id||Mr("nojs-tab"),A=E.id||Mr("nojs-panel");b.id=y,E.id=A,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",A),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),E.setAttribute("role","tabpanel"),E.setAttribute("aria-labelledby",y),E.setAttribute("tabindex","0"),E.setAttribute("aria-hidden","true"),E.inert=!0,E.classList.add("nojs-panel"),a.appendChild(b)}for(let g=s;g<i.length;g++){let b=i[g];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(a,d):e.appendChild(a),Ee.containers.set(e,{tabs:n.slice(0,s),panels:i.slice(0,s),activeIndex:-1});let m=t.findContext(e),l=[],f=(g,b)=>{let E=!1;try{E=!!t.evaluate(b,m)}catch{E=!1}E?g.setAttribute("aria-disabled","true"):g.removeAttribute("aria-disabled")};for(let g=0;g<s;g++){let b=n[g],E=b.getAttribute("tab-disabled");if(E&&(f(b,E),m&&typeof m.$watch=="function")){let y=m.$watch(()=>f(b,E));l.push(y)}}let u=0;if(o&&o.trim()!==""){let g=parseInt(o,10);!isNaN(g)&&g>=0&&g<s&&(u=g)}let p=n.slice(0,s);if(n[u]?.getAttribute("aria-disabled")==="true"){let g=Re(p,u,1);g!==-1?(u=g,Pe(e,u)):Pe(e,u,!0)}else Pe(e,u);let v=g=>{let b=Ee.containers.get(e);if(!b)return;let E=g.target;if(E.getAttribute("role")!=="tab")return;let{tabs:y}=b,A=y.indexOf(E);if(A===-1)return;let x=-1;switch(g.key){case"ArrowRight":case"ArrowDown":x=Re(y,A,1);break;case"ArrowLeft":case"ArrowUp":x=Re(y,A,-1);break;case"Home":x=Re(y,y.length-1,1);break;case"End":x=Re(y,0,-1);break;case"Tab":return;default:return}x!==-1&&x!==A&&(g.preventDefault(),Pe(e,x),y[x].focus())};a.addEventListener("keydown",v);let h=g=>{let b=g.target.closest("[role='tab']");if(!b)return;let E=Ee.containers.get(e);if(!E)return;let y=E.tabs.indexOf(b);y!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Pe(e,y),b.focus())};a.addEventListener("click",h),Oo(e,()=>{a.removeEventListener("keydown",v),a.removeEventListener("click",h);for(let g of l)g&&g();l.length=0,Ee.containers.delete(e)})}})}function Rr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Fr(t){t.directive("panel",{priority:11,init(){}})}function zr(t,e={}){Pr(t),Rr(t),Fr(t)}function Or(){$r()}var B={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Vr(){B.branches.clear(),B.selectedItem=null,B.typeahead="",B.typeaheadTimer&&(clearTimeout(B.typeaheadTimer),B.typeaheadTimer=null)}function De(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
.nojs-tree {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.nojs-tree .nojs-tree {
  padding-left: 1.25rem;
}
.nojs-tree li {
  list-style: none;
}
.nojs-branch {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #1E293B;
  font-weight: 500;
  transition: background 0.12s ease;
}
.nojs-branch:hover {
  background: #F1F5F9;
}
.nojs-branch:focus-visible {
  outline: 2px solid #0EA5E9;
  outline-offset: 1px;
}
.nojs-branch[aria-selected="true"],
.nojs-branch-selected {
  background: #F0F9FF;
  color: #0369A1;
}
.nojs-branch::before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #94A3B8;
  margin-right: 0.3rem;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
.nojs-branch[aria-expanded="true"]::before {
  transform: rotate(90deg);
  border-left-color: #0EA5E9;
}
.nojs-tree[data-tree-icon="false"] .nojs-branch::before {
  content: none;
}
.nojs-subtree[aria-hidden="true"] {
  display: none;
}
.nojs-tree-leaf {
  padding: 0.25rem 0.5rem 0.25rem 1.75rem;
  font-size: 0.825rem;
  color: #475569;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.12s ease;
}
.nojs-tree-leaf:hover {
  background: #F1F5F9;
  color: #1E293B;
}
.nojs-tree-leaf:focus-visible {
  outline: 2px solid #0EA5E9;
  outline-offset: 1px;
}
/* \u2500\u2500 DnD integration \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.nojs-tree-drag-over {
  background: #EFF6FF;
  outline: 2px dashed #3B82F6;
  outline-offset: -2px;
  border-radius: 6px;
}
.nojs-tree-drag-indicator {
  height: 2px;
  background: #3B82F6;
  border-radius: 1px;
  pointer-events: none;
  z-index: 10;
}
.nojs-tree-drag-indicator::before {
  content: "";
  position: absolute;
  left: -3px;
  top: -3px;
  width: 8px;
  height: 8px;
  background: #3B82F6;
  border-radius: 50%;
}
[role="treeitem"][draggable="true"] {
  cursor: grab;
}
[role="treeitem"].nojs-dragging {
  opacity: 0.4;
  cursor: grabbing !important;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function Ie(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Nr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Wr(t){return t.closest('[role="tree"]')}function No(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function Wo(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function Ct(t){let e=B.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),B.selectedItem=t}function Ur(t){let e=B.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function Uo(t){let e=B.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function Go(t){let e=B.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Gr(t,e){let r=Wr(e);if(!r)return;let o=Nr(r),n=o.indexOf(e);if(n<0)return;let i=B.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)Uo(e);else if(c&&i.expanded){let a=i.subtreeEl.querySelector('[role="treeitem"]');a&&Ae(a,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)Go(e);else{let a=No(e);a&&Ae(a,Nr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&Ae(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&Ae(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),Ct(e),c&&Ur(e);break;case"Home":t.preventDefault(),o.length>0&&Ae(o[0],o);break;case"End":t.preventDefault(),o.length>0&&Ae(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),B.typeahead+=t.key.toLowerCase(),B.typeaheadTimer&&clearTimeout(B.typeaheadTimer),B.typeaheadTimer=setTimeout(()=>{B.typeahead="",B.typeaheadTimer=null},500);let a=n+1;for(let s=0;s<o.length;s++){let d=(a+s)%o.length;if(Wo(o[d]).startsWith(B.typeahead)){Ae(o[d],o);break}}}break}}function Yr(t){t.directive("tree",{priority:15,init(e){De(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Kr(t){t.directive("branch",{priority:16,init(e,r,o){De();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Wr(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(B.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):B.branches.set(e,{expanded:n,subtreeEl:null})});let a=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),Ct(e),Ur(e))};e.addEventListener("click",a),Ie(e,()=>e.removeEventListener("click",a));let s=d=>{Gr(d,e)};e.addEventListener("keydown",s),Ie(e,()=>e.removeEventListener("keydown",s)),Ie(e,()=>{c=!0,B.branches.delete(e),B.selectedItem===e&&(B.selectedItem=null),B.typeaheadTimer&&(clearTimeout(B.typeaheadTimer),B.typeaheadTimer=null,B.typeahead="")})}})}function Ae(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Xr(t){t.directive("subtree",{priority:16,init(e){De(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),Ct(o)};o.addEventListener("click",n),Ie(o,()=>o.removeEventListener("click",n));let i=c=>{Gr(c,o)};o.addEventListener("keydown",i),Ie(o,()=>o.removeEventListener("keydown",i)),Ie(o,()=>{B.selectedItem===o&&(B.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=B.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Zr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function St(t){return t.closest('[role="treeitem"]')}function Yo(t){return t.closest('[role="tree"]')}function Ko(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Xo(t){return Ko(t).indexOf(t)}function Zo(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Qr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function He(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function Fe(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function Qo(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function Jo(t,e){He();let r=Qo(),o=t.getBoundingClientRect(),n=Yo(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function Jr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(De(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=f=>{let u=St(f.target);if(u&&e.contains(u)){if(u.hasAttribute("tree-drag-disabled")){f.preventDefault();return}D.dragging={el:u,treeRoot:e},f.dataTransfer&&(f.dataTransfer.effectAllowed="move",f.dataTransfer.setData("text/plain","")),u.classList.add("nojs-dragging"),u.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:u}}))}},c=f=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let u=St(f.target);if(!u||!e.contains(u)||u===D.dragging.el||Qr(u,D.dragging.el))return;f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move");let p=Zo(u,f.clientY,o);(D.currentTarget!==u||D.currentPosition!==p)&&(Fe(e),He(),D.currentTarget=u,D.currentPosition=p,p==="on"?u.classList.add("nojs-tree-drag-over"):Jo(u,p))},a=f=>{D.dragging&&D.dragging.treeRoot===e&&n++},s=f=>{D.dragging&&(n--,n<=0&&(n=0,Fe(e),He(),D.currentTarget=null,D.currentPosition=null))},d=f=>{if(f.preventDefault(),f.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let u=D.dragging.el,p=D.currentTarget,v=D.currentPosition;if(Fe(e),He(),!p||!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(p===u||Qr(p,u)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="on"){let h=p.querySelector(':scope > [role="group"]');h||(h=p.nextElementSibling?.matches?.('[role="group"]')?p.nextElementSibling:null),h?h.setAttribute("aria-hidden","false"):(h=document.createElement("ul"),h.setAttribute("role","group"),h.setAttribute("subtree",""),h.classList.add("nojs-subtree","nojs-tree"),h.setAttribute("aria-hidden","false"),p.appendChild(h));let g=B.branches.get(p);g&&(g.expanded=!0,g.subtreeEl=h,p.setAttribute("aria-expanded","true")),h.appendChild(u),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:u,newParent:p}}))}else{let h=p.parentElement;if(!h){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="before")h.insertBefore(u,p);else{let b=p.nextElementSibling,E=b?.matches?.('[role="group"]')?b.nextElementSibling:b;E?h.insertBefore(u,E):h.appendChild(u)}let g=Xo(u);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:u,newIndex:g}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},m=f=>{let u=St(f.target);u&&u.classList.remove("nojs-dragging"),Fe(e),He(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",a),e.addEventListener("dragleave",s),e.addEventListener("drop",d),e.addEventListener("dragend",m),Zr(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",a),e.removeEventListener("dragleave",s),e.removeEventListener("drop",d),e.removeEventListener("dragend",m),Fe(e),He()}),ei(e);let l=new MutationObserver(f=>{for(let u of f)for(let p of u.addedNodes){if(p.nodeType!==1)continue;p.getAttribute("role")==="treeitem"&&Tt(p);let v=p.querySelectorAll?.('[role="treeitem"]');if(v)for(let h of v)Tt(h)}});l.observe(e,{childList:!0,subtree:!0}),Zr(e,()=>l.disconnect())}})}function Tt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function ei(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)Tt(r)}function en(t,e={}){Yr(t),Kr(t),Xr(t),Jr(t)}function tn(){Vr()}var tt=new Map;function rn(){tt.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
.nojs-stepper-indicator {
  display: flex;
  align-items: center;
  gap: 0;
  counter-reset: step;
}
.nojs-stepper-indicator-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  counter-increment: step;
  cursor: default;
  white-space: nowrap;
}
.nojs-stepper-indicator-item[data-clickable] {
  cursor: pointer;
}
.nojs-stepper-indicator-item::before {
  content: counter(step);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid currentColor;
  font-size: 0.875rem;
  flex-shrink: 0;
}
.nojs-stepper-indicator-item[aria-selected="true"] {
  color: #0EA5E9;
  font-weight: 600;
}
.nojs-stepper-indicator-item[aria-selected="true"]::before {
  background: #0EA5E9;
  color: #fff;
  border-color: #0EA5E9;
  font-weight: bold;
  box-shadow: 0 0 0 3px rgba(14,165,233,0.2);
}
.nojs-stepper-indicator-item[data-completed] {
  color: #16A34A;
}
.nojs-stepper-indicator-item[data-completed]::before {
  content: "\\2713";
  background: #16A34A;
  color: #fff;
  border-color: #16A34A;
}
.nojs-stepper-separator {
  flex: 1;
  height: 2px;
  background: currentColor;
  opacity: 0.3;
  margin: 0 0.5rem;
  min-width: 1rem;
}
.nojs-stepper-indicator-item.nojs-step-invalid {
  color: #DC2626;
}
.nojs-stepper-indicator-item.nojs-step-invalid::before {
  border-color: #DC2626;
  box-shadow: 0 0 0 3px rgba(220,38,38,0.2);
}
.nojs-step[aria-hidden="true"] {
  display: none;
}
.nojs-stepper-nav {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function nn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function on(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function sn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function ze(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function an(t){t.directive("stepper",{priority:14,init(e,r,o){rt();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,a=e.getAttribute("stepper-mode")||"linear",s=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",m=e.getAttribute("aria-label")||"Stepper",l=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",m),e.classList.add("nojs-stepper");let f=null,u=[];if(s){f=document.createElement("div"),f.className="nojs-stepper-indicator",f.setAttribute("role","tablist"),f.setAttribute("aria-label","Progress"),i.forEach((j,S)=>{if(S>0){let F=document.createElement("div");F.className="nojs-stepper-separator",F.setAttribute("aria-hidden","true"),f.appendChild(F)}let _=document.createElement("button");_.type="button",_.className="nojs-stepper-indicator-item",_.setAttribute("role","tab"),_.setAttribute("aria-selected",S===l?"true":"false");let $=j.getAttribute("step-label")||`Step ${S+1}`,V=document.createElement("span");V.textContent=$,_.appendChild(V),_.setAttribute("aria-label",$);let X=`nojs-stepper-tab-${ti++}`;if(_.id=X,a==="free"){_.setAttribute("data-clickable","");let F=()=>A(S);_.addEventListener("click",F),ze(e,()=>_.removeEventListener("click",F))}else _.setAttribute("tabindex","-1");f.appendChild(_),u.push(_)});let k=j=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(j.key))return;j.preventDefault();let S=l;j.key==="ArrowRight"?S=Math.min(l+1,i.length-1):j.key==="ArrowLeft"?S=Math.max(l-1,0):j.key==="Home"?S=0:j.key==="End"&&(S=i.length-1),a==="free"?(A(S),u[S]?.focus()):u[l]?.focus()};f.addEventListener("keydown",k),ze(e,()=>f.removeEventListener("keydown",k)),e.insertBefore(f,e.firstChild)}let p=null,v=null,h=null;if(d){p=document.createElement("div"),p.className="nojs-stepper-nav",p.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let k=()=>y();v.addEventListener("click",k),ze(e,()=>v.removeEventListener("click",k)),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-next",h.textContent="Next";let j=()=>E();h.addEventListener("click",j),ze(e,()=>h.removeEventListener("click",j)),p.appendChild(v),p.appendChild(h),e.appendChild(p)}function g(k){let j=i[k];if(!j)return!0;if(!nn(j,t.findContext)){let $=j.querySelector("form[validate]");return $&&(on($),u[k]&&u[k].classList.add("nojs-step-invalid"),sn(e,j,$)),!1}u[k]&&u[k].classList.remove("nojs-step-invalid");let S=j.querySelectorAll("[required]");for(let $ of S)if(typeof $.checkValidity=="function"&&!$.checkValidity())return $.reportValidity(),!1;let _=j.getAttribute("step-validate");if(_)try{if(!t.evaluate(_,n))return!1}catch($){return console.warn(`[stepper] step-validate error: ${$.message}`),!1}return!0}function b(k){if(i.forEach((j,S)=>{let _=S===l;j.setAttribute("aria-hidden",_?"false":"true"),_?(j.removeAttribute("inert"),j.setAttribute("aria-current","step")):(j.setAttribute("inert",""),j.removeAttribute("aria-current"))}),u.length&&u.forEach((j,S)=>{j.setAttribute("aria-selected",S===l?"true":"false"),S<l?j.setAttribute("data-completed",""):j.removeAttribute("data-completed"),j.setAttribute("tabindex",S===l?"0":"-1");let _=i[S];_.id&&(j.setAttribute("aria-controls",_.id),_.setAttribute("aria-labelledby",j.id))}),v&&(v.disabled=l===0),h&&(h.textContent=l===i.length-1?"Finish":"Next"),!k){let j=i[l];j&&requestAnimationFrame(()=>j.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!k,detail:{current:l,total:i.length}}))}function E(){return l>=i.length-1?(a==="linear"&&!g(l)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:l,total:i.length}})),!1):a==="linear"&&!g(l)?!1:(l++,b(),L(),!0)}function y(){return l<=0?!1:(l--,b(),L(),!0)}function A(k){if(k<0||k>=i.length||k===l)return!1;if(a==="linear"&&k>l){for(let j=l;j<k;j++)if(l=j,b(),!g(j))return L(),!1}return l=k,b(),L(),!0}let x={get current(){return l},get total(){return i.length},next:E,prev:y,goTo:A,get isFirst(){return l===0},get isLast(){return l===i.length-1}};function L(){n.$stepper=x}L(),tt.set(e,{get current(){return l},steps:i,mode:a,indicatorEl:f,navEl:p}),b(!0),ze(e,()=>{tt.delete(e),f&&f.parentNode&&f.remove(),p&&p.parentNode&&p.remove(),delete n.$stepper})}})}var ti=0;var ri=0;function cn(t){t.directive("step",{priority:13,init(e,r,o){rt(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${ri++}`),e.setAttribute("tabindex","0")}})}function dn(t,e={}){cn(t),an(t)}function ln(){rn()}function un(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
.nojs-skeleton {
  position: relative;
  overflow: hidden;
  color: transparent !important;
}
.nojs-skeleton > *:not(.nojs-skeleton-line) {
  opacity: 0 !important;
  pointer-events: none !important;
}
.nojs-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg,
    #E2E8F0 25%,
    #F1F5F9 50%,
    #E2E8F0 75%
  );
  background-size: 200% 100%;
  animation: nojs-shimmer 1.5s ease-in-out infinite;
}
@keyframes nojs-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.nojs-skeleton-circle {
  border-radius: 50%;
}
.nojs-skeleton-circle::after {
  border-radius: 50%;
}
.nojs-skeleton-fade {
  transition: opacity 0.3s ease;
}
.nojs-skeleton-line {
  height: 0.75rem;
  margin-bottom: 0.6rem;
  border-radius: 4px;
  background: #E2E8F0;
}
.nojs-skeleton-line:last-child {
  width: 60%;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function pn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function fn(t){t.directive("skeleton",{priority:10,init(e,r,o){un();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),a=e.getAttribute("skeleton-size"),s=[];function d(g){m();for(let b=0;b<g;b++){let E=document.createElement("div");E.className="nojs-skeleton-line",e.appendChild(E),s.push(E)}}function m(){for(let g of s)g.parentNode===e&&e.removeChild(g);s=[]}function l(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),a&&(i==="circle"||i==="rect")){let g=a+(String(a).match(/\d$/)?"px":"");e.style.width=g,e.style.height=g}if(c){let g=parseInt(c,10);g>0&&d(g)}e.setAttribute("aria-busy","true")}let f=null;function u(){f&&f(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),m(),a&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let g=!1,b=null,E=()=>{g||(g=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",E),b!==null&&clearTimeout(b),f=null)};e.addEventListener("transitionend",E),b=setTimeout(E,0),f=()=>{e.removeEventListener("transitionend",E),b!==null&&clearTimeout(b),g=!0,f=null}}let p=!1;function v(){let g=!!t.evaluate(o,n);g&&!p?(p=!0,l()):!g&&p&&(p=!1,u())}v();let h=n.$watch(v);pn(e,h),pn(e,()=>{f&&f(),p&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),m(),a&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function mn(t,e={}){fn(t)}var we=new Map,G=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function gn(){we.clear(),G.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function nt(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
.nojs-split {
  display: flex;
  overflow: hidden;
  height: 100%;
}
.nojs-split[data-direction="vertical"] {
  flex-direction: column;
}
.nojs-pane {
  overflow: auto;
  min-width: 0;
  min-height: 0;
}
.nojs-gutter {
  flex-shrink: 0;
  background: color-mix(in srgb, currentColor 10%, transparent);
  z-index: 1;
}
.nojs-split[data-direction="horizontal"] > .nojs-gutter {
  width: var(--nojs-gutter-size, 6px);
  cursor: col-resize;
}
.nojs-split[data-direction="vertical"] > .nojs-gutter {
  height: var(--nojs-gutter-size, 6px);
  cursor: row-resize;
}
.nojs-gutter:hover,
.nojs-gutter:active {
  background: color-mix(in srgb, currentColor 20%, transparent);
}
.nojs-gutter:focus-visible {
  outline: 2px solid highlight;
  outline-offset: -2px;
}
.nojs-pane[data-collapsed="true"] {
  overflow: hidden;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function ni(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function bn(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function hn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function oi(t,e){let o=(we.get(t)?.gutters||[]).reduce((n,i)=>n+Q(i,e),0);return Q(t,e)-o}function ii(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Oe(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function ot(t,e,r,o){let n=Q(e,o),i=Q(r,o),c=G.get(e),a=G.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(a?.min||0)))}function Dt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=we.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function si(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=we.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function ai(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=u=>{if(u.button!==0)return;u.preventDefault();let p=oi(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=u[bn(e)],C.startPrevSize=Q(r,e),C.startNextSize=Q(o,e),C.containerSize=p,C.sign=hn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(u.pointerId)},a=u=>{if(!C.active||C.gutterEl!==i)return;let p=(u[bn(C.direction)]-C.startPos)*(C.sign||1),v=Oe(C.startPrevSize+p,C.prevPane),h=Oe(C.startNextSize-p,C.nextPane),g=C.startPrevSize+C.startNextSize;v+h!==g&&(v!==C.startPrevSize+p?h=g-v:v=g-h),C.prevPane.style.flexBasis=`${v}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${h}px`,C.nextPane.style.flexGrow="0",ot(i,C.prevPane,C.nextPane,C.direction)},s=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Dt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",a),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s);let d=10,m=u=>{let p=e==="horizontal",v=hn(t,e),h=0;if(p&&u.key==="ArrowRight"||!p&&u.key==="ArrowDown")h=d*v;else if(p&&u.key==="ArrowLeft"||!p&&u.key==="ArrowUp")h=-d*v;else if(u.key==="Home")h=(G.get(r)?.min||0)-Q(r,e);else if(u.key==="End"){let x=G.get(o);h=Q(r,e)+Q(o,e)-(x?.min||0)-Q(r,e)}else return;u.preventDefault();let g=Q(r,e),b=Q(o,e),E=g+b,y=Oe(g+h,r),A=Oe(E-y,o);y=E-A,y=Oe(y,r),A=E-y,r.style.flexBasis=`${y}px`,r.style.flexGrow="0",o.style.flexBasis=`${A}px`,o.style.flexGrow="0",ot(i,r,o,e),Dt(t)};i.addEventListener("keydown",m);let l=()=>{let u=G.get(r),p=G.get(o),v=u?.collapsible?r:p?.collapsible?o:null;if(!v)return;let h=G.get(v);if(!h)return;let g=v===r?o:r,b=Q(r,e)+Q(o,e);if(h.collapsed){h.collapsed=!1,v.removeAttribute("data-collapsed");let E=h.preCollapseSize||`${Math.round(b/2)}px`,y=ii(E,b)??b/2,A=Math.min(y,b);v.style.flexBasis=`${A}px`,v.style.flexGrow="0",g.style.flexBasis=`${b-A}px`,g.style.flexGrow="0"}else h.preCollapseSize=v.style.flexBasis||`${Q(v,e)}px`,h.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",g.style.flexBasis=`${b}px`,g.style.flexGrow="0";ot(i,r,o,e),Dt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:h.collapsed}}))};return i.addEventListener("dblclick",l),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",a),i.removeEventListener("pointerup",s),i.removeEventListener("pointercancel",s),i.removeEventListener("keydown",m),i.removeEventListener("dblclick",l)}}}function vn(t){t.directive("split",{priority:14,init(e,r,o){nt();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(m=>m.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(m=>{G.get(m)||G.set(m,{size:m.getAttribute("pane")||null,min:parseInt(m.getAttribute("pane-min"),10)||0,max:parseInt(m.getAttribute("pane-max"),10)||1/0,collapsible:m.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let a=[],s=[];for(let m=0;m<c.length-1;m++){let{gutter:l,cleanup:f}=ai(e,n,c[m],c[m+1],i);c[m].after(l),a.push(l),s.push(f)}we.set(e,{direction:n,gutterSize:i,panes:c,gutters:a}),si(e)||c.forEach(m=>{let f=G.get(m)?.size;f?(m.style.flexBasis=f,m.style.flexGrow="0"):(m.style.flexGrow="1",m.style.flexBasis="0")}),requestAnimationFrame(()=>{a.forEach((m,l)=>{ot(m,c[l],c[l+1],n)})}),ni(e,()=>{s.forEach(m=>m()),a.forEach(m=>m.remove()),we.delete(e),c.forEach(m=>G.delete(m)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function ci(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function yn(t){t.directive("pane",{priority:15,init(e,r,o){nt(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),ci(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function xn(t,e={}){vn(t),yn(t)}function En(){gn()}var fe={sorts:new Map};function An(){fe.sorts.clear()}function _e(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
.nojs-sortable th[data-sortable] {
  cursor: pointer;
  user-select: none;
}
.nojs-sortable th[data-sortable]::after {
  content: " \u21C5";
  opacity: 0.3;
}
.nojs-sortable th[data-sort-dir="asc"]::after {
  content: " \u25B2";
  opacity: 1;
}
.nojs-sortable th[data-sort-dir="desc"]::after {
  content: " \u25BC";
  opacity: 1;
}
.nojs-fixed-header thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #F8FAFC;
}
.nojs-fixed-col {
  position: sticky;
  left: 0;
  z-index: 1;
}
.nojs-fixed-header .nojs-fixed-col {
  z-index: 3;
}
[table-reorder] tbody tr {
  cursor: grab;
}
[table-reorder] tbody tr.nojs-dragging {
  cursor: grabbing;
}
.nojs-row-dragging {
  opacity: 0.4;
  background: #f1f5f9 !important;
}
.nojs-reorder-insert-before {
  box-shadow: 0 -2px 0 0 #3b82f6;
}
.nojs-reorder-insert-after {
  box-shadow: 0 2px 0 0 #3b82f6;
}
[table-reorder][table-reorder-handle] tbody tr {
  cursor: default;
}
[table-reorder-handle] {
  cursor: grab;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function di(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function li(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function ui(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function wn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function _n(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function Ln(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return _n(Number(t),Number(e));case"date":return _n(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function pi(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function kn(t){t.directive("sortable",{priority:10,init(e){_e(),e.classList.add("nojs-sortable")}})}function Cn(t){t.directive("sort",{priority:11,init(e,r,o){_e();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let a=e.closest("table");if(!a)return;fe.sorts.has(a)||fe.sorts.set(a,{column:null,direction:null}),(c==="asc"||c==="desc")&&(fe.sorts.get(a).column||jn(e,a,n,i,c,t));let s=()=>{let m=fe.sorts.get(a),l;m.column!==n?l="asc":m.direction==="asc"?l="desc":m.direction==="desc"?l=null:l="asc",jn(e,a,n,i,l,t)},d=m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),s())};e.addEventListener("click",s),e.addEventListener("keydown",d),di(e,()=>{e.removeEventListener("click",s),e.removeEventListener("keydown",d),a&&!a.isConnected&&(fe.sorts.delete(a),delete a._nojsOriginalOrder,delete a._nojsOriginalRows)})}})}function jn(t,e,r,o,n,i){let c=fe.sorts.get(e);pi(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let a=li(e,i);if(a){let s=i.findContext(e),d=s?ui(s,a.arrayPath):null;if(Array.isArray(d)){if(!n){let l=e._nojsOriginalOrder;if(l){let f=new Set(d),u=l.filter(p=>f.has(p));for(let p of d)l.includes(p)||u.push(p);wn(s,a.arrayPath,u)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let m=[...d].sort((l,f)=>{let u=l!=null?l[r]:null,p=f!=null?f[r]:null,v=Ln(u,p,o);return n==="desc"?-v:v});wn(s,a.arrayPath,m);return}}fi(e,t,r,o,n)}function fi(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let s=[...e.closest("tr").children].indexOf(e);if(s<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let f=document.createDocumentFragment();for(let u of t._nojsOriginalRows)f.appendChild(u);i.appendChild(f);return}let m=f=>{let u=f.replace(/[^0-9.\-]/g,"");return u===""||u==="-"?NaN:parseFloat(u)};d.sort((f,u)=>{let p=f.children[s]?.textContent?.trim()||"",v=u.children[s]?.textContent?.trim()||"",h=Ln(o==="number"?m(p):p,o==="number"?m(v):v,o);return n==="desc"?-h:h});let l=document.createDocumentFragment();for(let f of d)l.appendChild(f);i.appendChild(l)}function Sn(t){t.directive("fixed-header",{priority:10,init(e){_e(),e.classList.add("nojs-fixed-header")}})}function Tn(t){t.directive("fixed-col",{priority:10,init(e){_e(),e.classList.add("nojs-fixed-col")}})}function It(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Dn(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function In(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Hn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function Bn(t){t.directive("table-reorder",{priority:15,init(e){if(_e(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",a=null,s=null,d=null;function m(){let h=r.querySelectorAll(":scope > tr");for(let g=0;g<h.length;g++){let b=h[g];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-roledescription","draggable row");let E=!0;if(n){let j=S=>{E=!!S.target.closest(n)};b.addEventListener("mousedown",j),It(b,()=>b.removeEventListener("mousedown",j))}let y=j=>{if(n&&!E){j.preventDefault();return}a=[...r.querySelectorAll(":scope > tr")].indexOf(b),s=b,j.dataTransfer&&(j.dataTransfer.effectAllowed="move",j.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(_=>b.classList.add(_))},A=j=>{if(s==null)return;j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),_=S.top+S.height/2,V=[...r.querySelectorAll(":scope > tr")].indexOf(b);l(),V!==a&&(j.clientY<_?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),d=b)},x=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),d===b&&(d=null)},L=j=>{if(j.preventDefault(),j.stopPropagation(),s==null||a==null)return;let S=[...r.querySelectorAll(":scope > tr")],_=b.getBoundingClientRect(),$=_.top+_.height/2,V=S.indexOf(b);j.clientY>=$&&V++;let X=a;if(X===V||X+1===V){f();return}let F=X<V?V-1:V,re=Dn(e);if(re&&o){let T=In(o,re.arrayPath);if(Array.isArray(T)){let M=[...T],[P]=M.splice(X,1);M.splice(F,0,P),Hn(o,re.arrayPath,M),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...M]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:F,item:P}}))}}else{let T=s,M=S[F];T&&M&&(X<F?r.insertBefore(T,M.nextSibling):r.insertBefore(T,M),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:F,item:null}})))}f()},k=()=>{f()};b.addEventListener("dragstart",y),b.addEventListener("dragover",A),b.addEventListener("dragleave",x),b.addEventListener("drop",L),b.addEventListener("dragend",k),It(b,()=>{b.removeEventListener("dragstart",y),b.removeEventListener("dragover",A),b.removeEventListener("dragleave",x),b.removeEventListener("drop",L),b.removeEventListener("dragend",k),b._nojsReorderSetup=!1})}}function l(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function f(){s&&i.split(/\s+/).filter(Boolean).forEach(g=>s.classList.remove(g)),l(),a=null,s=null;let h=r.querySelectorAll(":scope > tr");for(let g of h)g.classList.remove("nojs-reorder-insert-before"),g.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(b=>g.classList.remove(b))}let u=h=>{s!=null&&(h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect="move"))},p=h=>{if(s==null||h.target!==r)return;h.preventDefault(),h.stopPropagation();let g=a,E=[...r.querySelectorAll(":scope > tr")].length-1;if(g===E){f();return}let y=Dn(e);if(y&&o){let A=In(o,y.arrayPath);if(Array.isArray(A)){let x=[...A],[L]=x.splice(g,1);x.push(L),Hn(o,y.arrayPath,x),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...x]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:g,to:x.length-1,item:L}}))}}f()};r.addEventListener("dragover",u),r.addEventListener("drop",p);let v=new MutationObserver(()=>{m()});v.observe(r,{childList:!0}),m(),It(e,()=>{v.disconnect(),r.removeEventListener("dragover",u),r.removeEventListener("drop",p),f()})}})}function $n(t,e={}){kn(t),Cn(t),Sn(t),Tn(t),Bn(t)}function qn(){An()}var me={containers:new Map};function Mn(){for(let[,t]of me.containers)typeof t.unsub=="function"&&t.unsub();me.containers.clear()}function Pn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
.nojs-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--nojs-breadcrumb-gap, 0.5em);
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}
.nojs-breadcrumb li {
  display: flex;
  align-items: center;
  gap: var(--nojs-breadcrumb-gap, 0.5em);
}
.nojs-breadcrumb li + li::before {
  content: var(--nojs-breadcrumb-separator, " / ");
  color: #94A3B8;
  pointer-events: none;
  user-select: none;
}
.nojs-breadcrumb a {
  color: #0EA5E9;
  text-decoration: none;
  transition: color 0.15s;
}
.nojs-breadcrumb a:hover {
  color: #0284C7;
  text-decoration: underline;
}
.nojs-breadcrumb [aria-current="page"] {
  color: var(--nojs-breadcrumb-active-color, inherit);
  font-weight: 500;
  pointer-events: none;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Rn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function mi(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function gi(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Fn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],a=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=c.label,a.appendChild(d)}else{let d=document.createElement("a");d.href=c.href,d.textContent=c.label,a.appendChild(d)}o.appendChild(a)}t.appendChild(o);let n=me.containers.get(t);n&&(n.crumbs=e)}function bi(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=mi(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function hi(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=gi(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function zn(t){t.directive("breadcrumb",{priority:15,init(e,r,o){Pn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(a=>!(a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(me.containers.set(e,{unsub:null,crumbs:[]}),c){let a=()=>{let s=i.current,d=s?s.path:"/",m=hi(d);Fn(e,m)};if(a(),typeof i.on=="function"){let s=i.on(a),d=me.containers.get(e);d&&(d.unsub=s),Rn(e,()=>{typeof s=="function"&&s();let m=me.containers.get(e);m&&(m.unsub=null)})}}else{let a=bi(e);for(let s of Array.from(e.children))s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb")||(s.style.display="none");Fn(e,a)}Rn(e,()=>{me.containers.delete(e)})}})}function On(t,e={}){zn(t)}function Vn(){Mn()}var it={containers:new Map};function Nn(){it.containers.clear()}function Wn(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
[accordion] {
  display: flex;
  flex-direction: column;
  gap: var(--nojs-accordion-gap, 0);
}

/* \u2500\u2500\u2500 CSS-native animation (modern browsers) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@supports (interpolate-size: allow-keywords) {
  [accordion] {
    interpolate-size: allow-keywords;
  }
  [accordion] > details > ::details-content {
    transition:
      block-size var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease),
      content-visibility var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease) allow-discrete;
    block-size: 0;
    overflow: clip;
  }
  [accordion] > details[open] > ::details-content {
    block-size: auto;
  }
}

/* \u2500\u2500\u2500 Fallback animation (older browsers) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@supports not (interpolate-size: allow-keywords) {
  [accordion] > details .nojs-accordion-content {
    overflow: hidden;
    transition: height var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease);
  }
}

/* \u2500\u2500\u2500 Summary reset \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
[accordion] > details > summary {
  cursor: pointer;
  list-style: none;
}
[accordion] > details > summary::-webkit-details-marker {
  display: none;
}
[accordion] > details > summary::marker {
  content: none;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function vi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var st=null;function yi(){return st!==null||(st=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),st}function Un(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function xi(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Yn(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Gn(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");Yn(t,r)}else t.open=!1}function at(t,e,r,o){let n=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function Be(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function Kn(t){t.directive("accordion",{priority:10,init(e,r,o){Wn();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!yi();e.setAttribute("role","group");let c=Be(e);if(c.length===0)return;if(i)for(let f of c)Un(f);let a=[],s=new MutationObserver(f=>{for(let u of f)for(let p of u.addedNodes)p.nodeType!==1||p.tagName!=="DETAILS"||p.parentElement===e&&m(p)});s.observe(e,{childList:!0});let d=0,m=f=>{i&&Un(f);let u=f.querySelector(":scope > summary");if(u){let h=`nojs-accordion-panel-${Date.now()}-${d++}`,g=f.querySelector(":scope > .nojs-accordion-content");g?(g.id=g.id||h,g.setAttribute("role","region"),h=g.id):(f.id||(f.id=h),h=f.id),u.setAttribute("aria-expanded",f.open?"true":"false"),u.setAttribute("aria-controls",h)}let p=h=>{let g=Be(e),b=g.indexOf(f),E=f.querySelector(":scope > summary");if(E&&E.setAttribute("aria-expanded",f.open?"true":"false"),f.open){if(n==="single")for(let y of g)y!==f&&y.open&&Gn(y,i);at(e,f,!0,b)}else at(e,f,!1,b)},v=null;if(i){let h=f.querySelector(":scope > summary");h&&(v=g=>{g.preventDefault();let b=f.querySelector(":scope > .nojs-accordion-content");if(f.open)Yn(f,b),h.setAttribute("aria-expanded","false"),at(e,f,!1,Be(e).indexOf(f));else{if(n==="single"){let E=Be(e);for(let y of E)if(y!==f&&y.open){Gn(y,!0);let A=y.querySelector(":scope > summary");A&&A.setAttribute("aria-expanded","false")}}xi(f,b),h.setAttribute("aria-expanded","true"),at(e,f,!0,Be(e).indexOf(f))}},h.addEventListener("click",v))}f.addEventListener("toggle",p),a.push({details:f,toggleHandler:p,clickHandler:v})};for(let f of c)m(f);let l=f=>{let u=f.target;if(u.tagName!=="SUMMARY")return;let p=u.parentElement;if(!p||p.parentElement!==e)return;let h=Be(e).map(E=>E.querySelector(":scope > summary")).filter(Boolean),g=h.indexOf(u);if(g===-1)return;let b=-1;switch(f.key){case"ArrowDown":case"ArrowRight":b=(g+1)%h.length;break;case"ArrowUp":case"ArrowLeft":b=(g-1+h.length)%h.length;break;case"Home":b=0;break;case"End":b=h.length-1;break;default:return}b!==-1&&b!==g&&(f.preventDefault(),h[b].focus())};e.addEventListener("keydown",l),it.containers.set(e,{mode:n,listeners:a,observer:s}),vi(e,()=>{e.removeEventListener("keydown",l),s.disconnect();for(let f of a)if(f.details.removeEventListener("toggle",f.toggleHandler),f.clickHandler){let u=f.details.querySelector(":scope > summary");u&&u.removeEventListener("click",f.clickHandler)}a.length=0,it.containers.delete(e)})}})}function Xn(t,e={}){Kn(t)}function Zn(){Nn()}var $e=new Map;function Qn(){let t=Array.from($e.keys());for(let e of t){let r=$e.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}$e.clear()}function Jn(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
[data-nojs-virtual] {
  overflow-y: auto;
  position: relative;
  --nojs-virtual-list-height: auto;
}
.nojs-virtual-spacer {
  display: block;
  width: 100%;
  pointer-events: none;
  visibility: hidden;
  margin: 0;
  padding: 0;
  border: none;
  flex-shrink: 0;
}
/* Table-specific spacer: spacer inside tbody must be a <tr> with a <td> */
table[data-nojs-virtual] .nojs-virtual-spacer,
[data-nojs-virtual] tr.nojs-virtual-spacer {
  display: table-row;
}
table[data-nojs-virtual] .nojs-virtual-spacer td,
[data-nojs-virtual] tr.nojs-virtual-spacer td {
  padding: 0;
  border: none;
}
/* DL spacer */
dl[data-nojs-virtual] .nojs-virtual-spacer {
  display: list-item;
  list-style: none;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Ei(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ai(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=wi(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function wi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function _i(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function eo(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function ct(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function ji(t,e){return t*e}function ro(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function no(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function to(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function dt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function Li(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return no(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function ki(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return no(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function Ci(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=Li(t,e),n=ki(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function Ht(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:a}=Ci(t,n,i);if(c===t.startIndex&&a===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=a,t.dirty=!1;let s=dt(t,c),d=t.itemHeight!=="auto"?ji(t.totalItems,t.itemHeight):to(t),m=a>=0?dt(t,a+1):0,l=Math.max(0,d-m);ct(t.spacerTop,s),ct(t.spacerBottom,l);let f=new Set;for(let p=c;p<=a;p++)f.add(p);for(let[p,v]of t.renderedNodes)f.has(p)||(v.remove(),t.renderedNodes.delete(p));let u=[];for(let p=c;p<=a;p++){if(t.renderedNodes.has(p))continue;let v=t.dataArray[p];if(v===void 0)continue;let h=t.template.cloneNode(!0),g={};g[t.iteratorVar]=v,g.$index=p,g.$count=t.totalItems,g.$first=p===0,g.$last=p===t.totalItems-1,g.$even=p%2===0,g.$odd=p%2!==0,h.setAttribute("role","option"),h.setAttribute("aria-setsize",String(t.totalItems)),h.setAttribute("aria-posinset",String(p+1)),h.setAttribute("tabindex","-1"),h.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(g)),h.__declared=!1,u.push({index:p,node:h}),t.renderedNodes.set(p,h)}if(u.length>0){u.sort((p,v)=>p.index-v.index);for(let{index:p,node:v}of u){let h=null;for(let[g,b]of t.renderedNodes)g>p&&b.parentNode===r&&(!h||g<Si(h,t))&&(h=b);h||(h=t.spacerBottom),r.insertBefore(v,h);try{e.processTree&&e.processTree(v)}catch{}}}if(t.itemHeight==="auto"){let p=!1;for(let[v,h]of t.renderedNodes){let g=h.offsetHeight||h.getBoundingClientRect().height;g>0&&t.heights[v]!==g&&(t.heights[v]=g,p=!0)}if(p){ro(t);let v=to(t),h=dt(t,c),g=a>=0?dt(t,a+1):0,b=Math.max(0,v-g);ct(t.spacerTop,h),ct(t.spacerBottom,b)}}}function Si(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function Ti(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&ro(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,Ht(t,r)}function oo(t){t.directive("virtual",{priority:10,init(e,r,o){Jn(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),a=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let s=Ai(e),d=null;if(s)d=s.eachEl;else for(let A of e.children)if(!A.classList.contains("nojs-virtual-spacer")){d=A;break}if(!d){console.warn("[virtual] No child template found.");return}let m=d.cloneNode(!0);for(m.removeAttribute("each"),m.removeAttribute("foreach"),m.removeAttribute("for"),m.__declared=!1,m.__disposers=null,m.__ctx=null,s&&(s.eachEl.removeAttribute("each"),s.eachEl.removeAttribute("foreach"),s.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let l=eo(e),f=eo(e);e.appendChild(l),e.appendChild(f);let u={container:e,itemHeight:c,buffer:a,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:m,spacerTop:l,spacerBottom:f,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:s?s.iteratorVar:"item",arrayPath:s?s.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};$e.set(e,u);let p=A=>{let x=[...e.querySelectorAll('[role="option"]')];if(!x.length)return;let L=e.querySelector('[role="option"]:focus'),k=L?x.indexOf(L):-1,j=-1;switch(A.key){case"ArrowDown":A.preventDefault(),j=k<x.length-1?k+1:k;break;case"ArrowUp":A.preventDefault(),j=k>0?k-1:0;break;case"Home":A.preventDefault(),j=0;break;case"End":A.preventDefault(),j=x.length-1;break;default:return}j>=0&&j<x.length&&x[j].focus()};e.addEventListener("keydown",p);let v=null,h=()=>{v||(v=requestAnimationFrame(()=>{v=null,Ht(u,t)}))};if(u.scrollHandler=h,e.addEventListener("scroll",h,{passive:!0}),typeof ResizeObserver<"u"){let A=new ResizeObserver(()=>{u.dirty=!0,Ht(u,t)});A.observe(e),u.resizeObserver=A}let g=null,b=-1,E=null,y=()=>{if(!u.disposed){if(u.arrayPath){let A=t.findContext?t.findContext(e):null;if(A){let x=_i(A,u.arrayPath);Array.isArray(x)&&(x!==g||x.length!==b)&&(g=x,b=x.length,Ti(u,x,t))}}E=setTimeout(y,100)}};E=setTimeout(y,100),Ei(e,()=>{u.disposed=!0,v&&(cancelAnimationFrame(v),v=null),E&&(clearTimeout(E),E=null),e.removeEventListener("scroll",h),e.removeEventListener("keydown",p),u.resizeObserver&&(u.resizeObserver.disconnect(),u.resizeObserver=null);for(let[A,x]of u.renderedNodes){if(x.__disposers){for(let L of x.__disposers)try{L()}catch{}x.__disposers=null}x.remove()}u.renderedNodes.clear(),u.spacerTop&&u.spacerTop.parentNode&&u.spacerTop.remove(),u.spacerBottom&&u.spacerBottom.parentNode&&u.spacerBottom.remove(),$e.delete(e)})}})}function io(t,e={}){oo(t)}function so(){Qn()}var ge=new Map,lt=new Map;function ao(){for(let[t,e]of ge){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}ge.clear(),lt.clear()}function co(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function Di(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ii(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function Hi(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function Bi(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function $i(){return document.documentElement}function qi(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function lo(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function Bt(t){let e=ge.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(s=>{for(let l of s)l.isIntersecting?n.add(l.target.id):n.delete(l.target.id);let d=null,m=1/0;for(let l of n){let f=document.getElementById(l);if(!f)continue;let u=f.getBoundingClientRect();u.top<m&&(m=u.top,d=l)}for(let l of e.spyEntries)lo(l.el);if(d){for(let l of e.spyEntries)if(l.targetId===d){qi(l.el),e.activeEl=l.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),a=new Set;for(let s of e.spyEntries){if(a.has(s.targetId))continue;let d=document.getElementById(s.targetId);d&&(c.observe(d),a.add(s.targetId))}e.observer=c}function Mi(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function uo(t){t.directive("spy",{priority:20,init(e,r,o){co();let n=Ii(e);if(!n){e.tagName!=="A"&&Mi(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=Hi(e),c=Bi(e),a=$i();ge.has(a)||ge.set(a,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let s=ge.get(a),d={el:e,targetId:n};s.spyEntries.push(d),lt.set(e,a),Bt(a),!s.mutObserver&&typeof MutationObserver<"u"&&(s.mutObserver=new MutationObserver(()=>{Bt(a)}),s.mutObserver.observe(document.body,{childList:!0,subtree:!0})),Di(e,()=>{let m=s.spyEntries.indexOf(d);m!==-1&&s.spyEntries.splice(m,1),lt.delete(e),lo(e),s.spyEntries.length===0?(s.observer&&(s.observer.disconnect(),s.observer=null),s.mutObserver&&(s.mutObserver.disconnect(),s.mutObserver=null),ge.delete(a)):Bt(a)})}})}function po(t,e={}){uo(t)}function fo(){ao()}var Pi="[validate],[drag],[drop],[drag-list],[drag-multiple]";function mo(t){if(typeof document>"u")return;let e=document.querySelectorAll(Pi);for(let r of e){if(!r.__declared)continue;let o=K(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Ri=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],Fi={name:"nojs-elements",install(t,e={}){zt(t,e),Zt(t,e),or(t,e),cr(t,e),vr(t,e),Lr(t,e),Hr(t,e),zr(t,e),en(t,e),dn(t,e),mn(t,e),xn(t,e),$n(t,e),On(t,e),Xn(t,e),io(t,e),po(t,e),mo(t)},init(t){if(mo(t),typeof document>"u"||!document.body)return;let e=Ri.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Ot(),Qt(),ir(),dr(),yr(),kr(),Br(),Or(),tn(),ln(),En(),qn(),Vn(),Zn(),so(),fo()}},ld=Fi;export{ld as default};
//# sourceMappingURL=nojs-elements.js.map
