/**
 * NoJS Elements v1.14.1 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
(()=>{var x={dragging:null,selected:new Map,placeholder:null},Ne=new Map;function qt(){x.dragging=null,x.selected.clear(),x.placeholder&&(x.placeholder.remove(),x.placeholder=null),Ne.clear()}function We(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Ye(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ce(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ge(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ge(r):e++}return e}function Ue(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function Mt(t,e,r,o){ne();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",x.dragging&&x.dragging.sourceEl){let s=(x.dragging.sourceEl.firstElementChild||x.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),x.placeholder=n}function ne(){x.placeholder&&(x.placeholder.remove(),x.placeholder=null)}function ve(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function bo(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let m=a-1;m>=0;m--){let p=document.createElement("div"),f=m*4;if(p.style.cssText="position:absolute;top:"+f+"px;left:"+f+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",m===0){let l=o.cloneNode(!0);for(;l.firstChild;)p.appendChild(l.firstChild);p.style.background=s.backgroundColor||"#fff",p.style.border=s.border,p.style.padding=s.padding,p.style.fontSize=s.fontSize,p.style.color=s.color,p.style.fontFamily=s.fontFamily}else p.style.background=s.backgroundColor||"#fff",p.style.border=s.border||"1px solid #ddd";r.appendChild(p)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var re=null;function ho(){return re&&re.isConnected?re:typeof document>"u"||!document.body?null:(re=document.createElement("div"),re.setAttribute("aria-live","assertive"),re.setAttribute("aria-atomic","true"),re.setAttribute("role","status"),re.className="nojs-dnd-live-region",re.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(re),re)}function le(t){let e=ho();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Pt(t){Ye(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){We();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",c=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),a=e.getAttribute("drag-image"),d=e.getAttribute("drag-image-offset")||"0,0",m=e.getAttribute("drag-disabled"),p=e.getAttribute("drag-class")||"nojs-dragging",f=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-roledescription","draggable item"),e.getAttribute("role")||e.setAttribute("role","button"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let l=!0;if(s){let g=b=>{l=!!b.target.closest(s)};e.addEventListener("mousedown",g),ce(e,()=>e.removeEventListener("mousedown",g))}let u=g=>{if(s&&!l){g.preventDefault();return}if(m&&t.evaluate(m,n)){g.preventDefault();return}let b=t.evaluate(o,n),E=e.getAttribute("drag-group"),h=b;if(E&&x.selected.has(E)){let A=x.selected.get(E);A.size>0&&[...A].some(k=>k.el===e)&&(h=[...A].map(k=>k.item))}if(x.dragging={item:h,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},g.dataTransfer){if(g.dataTransfer.effectAllowed=c,g.dataTransfer.setData("text/plain",""),Array.isArray(h)&&h.length>1&&g.dataTransfer.setDragImage){let A=bo(e,h.length);document.body.appendChild(A);let j=e.getBoundingClientRect();g.dataTransfer.setDragImage(A,j.width/2,j.height/2),requestAnimationFrame(()=>A.remove())}else if(a&&g.dataTransfer.setDragImage)if(a==="none"){let A=document.createElement("div");A.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(A);let[j,k]=d.split(",").map(Number);g.dataTransfer.setDragImage(A,j||0,k||0),requestAnimationFrame(()=>A.remove())}else{let A=e.querySelector(a);if(A){let[j,k]=d.split(",").map(Number);f&&A.classList.add(f),g.dataTransfer.setDragImage(A,j||0,k||0)}}}if(p.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),Array.isArray(h)&&E&&x.selected.has(E))for(let A of x.selected.get(E))A.el!==e&&p.split(/\s+/).filter(Boolean).forEach(j=>A.el.classList.add(j));let _=e.getAttribute("aria-label")||e.textContent?.trim()?.slice(0,50)||"Item";le(`Grabbed ${_}. Use arrow keys to move.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:h,index:x.dragging.sourceIndex,el:e}}))},v=()=>{p.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let g=e.getAttribute("drag-group");if(g&&x.selected.has(g))for(let b of x.selected.get(g))p.split(/\s+/).filter(Boolean).forEach(E=>b.el.classList.remove(E));if(f&&a&&a!=="none"){let b=e.querySelector(a);b&&b.classList.remove(f)}e.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:x.dragging?.item,index:x.dragging?.sourceIndex,dropped:x.dragging===null}})),x.dragging=null,ne()};if(e.addEventListener("dragstart",u),e.addEventListener("dragend",v),ce(e,()=>{e.removeEventListener("dragstart",u),e.removeEventListener("dragend",v)}),m){let g=function(){let E=!!t.evaluate(m,n);e.draggable=!E,E?e.removeAttribute("aria-roledescription"):e.setAttribute("aria-roledescription","draggable item")},b=n.$watch(g);ce(e,b)}let y=g=>{if(x.dragging&&!x.dragging.sourceEl.isConnected&&(x.dragging=null),g.key===" "&&!x.dragging){g.preventDefault();let b=t.evaluate(o,n);x.dragging={item:b,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},p.split(/\s+/).filter(Boolean).forEach(h=>e.classList.add(h));let E=e.getAttribute("aria-label")||e.textContent?.trim()?.slice(0,50)||"Item";le(`Grabbed ${E}. Use arrow keys to move.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else g.key==="Escape"&&x.dragging&&x.dragging.sourceEl===e&&(g.preventDefault(),p.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),le("Drag cancelled."),x.dragging=null,ne())};e.addEventListener("keydown",y),ce(e,()=>e.removeEventListener("keydown",y))}})}function Rt(t){Ye(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){We();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",c=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",a=e.getAttribute("drop-reject-class")||"nojs-drop-reject",d=e.getAttribute("drop-disabled"),m=e.getAttribute("drop-max"),p=e.getAttribute("drop-sort"),f=e.getAttribute("drop-placeholder"),l=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",c);let u=0,v=h=>{if(!x.dragging||d&&t.evaluate(d,n))return;let _=ve(x.dragging.type,i),A=!0;if(m){let j=t.evaluate(m,n),k=Ge(e);typeof j=="number"&&k>=j&&(A=!1)}if(!_||!A){a.split(/\s+/).filter(Boolean).forEach(j=>e.classList.add(j)),s.split(/\s+/).filter(Boolean).forEach(j=>e.classList.remove(j)),ne();return}if(a.split(/\s+/).filter(Boolean).forEach(j=>e.classList.remove(j)),h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect=c),p){let j=Ue(e,h.clientX,h.clientY,p);f&&Mt(e,j,f,l),e.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:x.dragging.item,index:j}}))}},y=h=>{if(x.dragging&&!(d&&t.evaluate(d,n))&&(u++,u===1)){let _=ve(x.dragging.type,i),A=!0;if(m){let j=t.evaluate(m,n),k=Ge(e);typeof j=="number"&&k>=j&&(A=!1)}_&&A?(s.split(/\s+/).filter(Boolean).forEach(j=>e.classList.add(j)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:x.dragging.item,type:x.dragging.type}}))):a.split(/\s+/).filter(Boolean).forEach(j=>e.classList.add(j))}},g=h=>{x.dragging&&(u--,u<=0&&(u=0,s.split(/\s+/).filter(Boolean).forEach(_=>e.classList.remove(_)),a.split(/\s+/).filter(Boolean).forEach(_=>e.classList.remove(_)),ne(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:x.dragging.item}}))))},b=h=>{if(h.preventDefault(),h.stopPropagation(),u=0,!x.dragging||d&&t.evaluate(d,n)||!ve(x.dragging.type,i))return;if(m){let w=t.evaluate(m,n),$=Ge(e);if(typeof w=="number"&&$>=w)return}let _=x.dragging.item,A=x.dragging.type,j=x.dragging.effect,k=0;p&&(k=Ue(e,h.clientX,h.clientY,p)),s.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),a.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),ne();let L={$drag:_,$dragType:A,$dragEffect:j,$dropIndex:k,$source:{list:x.dragging.sourceList,index:x.dragging.sourceIndex,el:x.dragging.sourceEl},$target:{list:null,index:k,el:e},$el:e},S=K(t,"execStatement");typeof S=="function"?S(o,n,L):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),x.dragging=null,e.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:_,index:k,source:L.$source,target:L.$target,effect:j}}))},E=h=>{x.dragging&&(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b(h))};e.addEventListener("dragover",v),e.addEventListener("dragenter",y),e.addEventListener("dragleave",g),e.addEventListener("drop",b),e.addEventListener("keydown",E),ce(e,()=>{e.removeEventListener("dragover",v),e.removeEventListener("dragenter",y),e.removeEventListener("dragleave",g),e.removeEventListener("drop",b),e.removeEventListener("keydown",E)})}})}function Ft(t){Ye(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){We();let n=t.findContext(e),i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,m=e.getAttribute("drop-accept")||d,p=e.hasAttribute("drag-list-copy"),f=e.hasAttribute("drag-list-remove"),l=e.getAttribute("drag-disabled"),u=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),y=e.getAttribute("drop-placeholder"),g=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",E=e.getAttribute("drop-class")||"nojs-drag-over",h=e.getAttribute("drop-reject-class")||"nojs-drop-reject",_=e.getAttribute("drop-settle-class")||"nojs-drop-settle",A=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",p?"copy":"move");let j={listPath:o,ctx:n,el:e};Ne.set(e,j),ce(e,()=>Ne.delete(e));let k=0,L=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===L&&T.length>0&&e.children.length>0){for(let N of e.children)N.__ctx&&N.__ctx.$notify&&N.__ctx.$notify();return}L=T;let M=i?document.getElementById(i):null;if(!M)return;let P=K(t,"disposeChildren");typeof P=="function"&&P(e),e.innerHTML="";let B=T.length;T.forEach((N,z)=>{let J={[s]:N,$index:z,$count:B,$first:z===0,$last:z===B-1,$even:z%2===0,$odd:z%2!==0},ue=t.createContext(J,n),ut=M.content.cloneNode(!0),I=document.createElement("div");I.style.display="contents",I.__ctx=ue,I.appendChild(ut),e.appendChild(I);let R=I.firstElementChild||I;R.draggable=!0,R.setAttribute("role","option"),R.setAttribute("aria-roledescription","draggable item"),R.getAttribute("tabindex")||R.setAttribute("tabindex","0");let de=W=>{if(l&&t.evaluate(l,n)){W.preventDefault();return}x.dragging={item:N,type:d,effect:p?"copy":"move",sourceEl:I,sourceCtx:ue,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:p,removeMode:f}},W.dataTransfer&&(W.dataTransfer.effectAllowed=p?"copy":"move",W.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(he=>R.classList.add(he));let Z=R.getAttribute("aria-label")||R.textContent?.trim()?.slice(0,50)||"Item";le(`Grabbed ${Z}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:N,index:z,el:R}}))},be=()=>{b.split(/\s+/).filter(Boolean).forEach(W=>R.classList.remove(W)),x.dragging&&x.dragging.sourceEl===I&&(x.dragging=null),ne()};I.addEventListener("dragstart",de),I.addEventListener("dragend",be);let Ve=W=>{if(W.key===" "&&!x.dragging){W.preventDefault(),W.stopPropagation(),x.dragging={item:N,type:d,effect:p?"copy":"move",sourceEl:I,sourceCtx:ue,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:p,removeMode:f}},b.split(/\s+/).filter(Boolean).forEach(he=>R.classList.add(he));let Z=R.getAttribute("aria-label")||R.textContent?.trim()?.slice(0,50)||"Item";le(`Grabbed ${Z}. Use arrow keys to reorder.`)}else if(W.key==="Escape"&&x.dragging){W.preventDefault(),W.stopPropagation();let Z=e.querySelector(`.${b.split(/\s+/)[0]}`)||R;b.split(/\s+/).filter(Boolean).forEach(he=>Z.classList.remove(he)),le("Reorder cancelled."),x.dragging=null,ne()}else if((W.key==="ArrowDown"||W.key==="ArrowRight")&&x.dragging&&x.dragging.sourceEl===I){W.preventDefault();let Z=I.nextElementSibling;if(Z){(Z.firstElementChild||Z).focus();let qe=[...e.children].filter(ft=>!ft.classList.contains("nojs-drop-placeholder")),pt=qe.indexOf(Z)+1;le(`Moved to position ${pt} of ${qe.length}.`)}}else if((W.key==="ArrowUp"||W.key==="ArrowLeft")&&x.dragging&&x.dragging.sourceEl===I){W.preventDefault();let Z=I.previousElementSibling;if(Z){(Z.firstElementChild||Z).focus();let qe=[...e.children].filter(ft=>!ft.classList.contains("nojs-drop-placeholder")),pt=qe.indexOf(Z)+1;le(`Moved to position ${pt} of ${qe.length}.`)}}};I.addEventListener("keydown",Ve),I.__disposers=I.__disposers||[],I.__disposers.push(()=>I.removeEventListener("dragstart",de),()=>I.removeEventListener("dragend",be),()=>I.removeEventListener("keydown",Ve)),t.processTree(I)});let q=T.length===0;A.split(/\s+/).filter(Boolean).forEach(N=>e.classList.toggle(N,q))}let w=T=>{if(!x.dragging||u&&t.evaluate(u,n))return;let M=ve(x.dragging.type,m),P=!0;if(v){let q=t.evaluate(v,n),N=t.resolve(o,n);typeof q=="number"&&Array.isArray(N)&&N.length>=q&&(P=!1)}if(!M||!P){h.split(/\s+/).filter(Boolean).forEach(q=>e.classList.add(q)),E.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),ne();return}h.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=p?"copy":"move");let B=Ue(e,T.clientX,T.clientY,a);y&&Mt(e,B,y,g)},$=T=>{if(x.dragging&&!(u&&t.evaluate(u,n))&&(k++,k===1)){let M=ve(x.dragging.type,m),P=!0;if(v){let B=t.evaluate(v,n),q=t.resolve(o,n);typeof B=="number"&&Array.isArray(q)&&q.length>=B&&(P=!1)}M&&P?(E.split(/\s+/).filter(Boolean).forEach(B=>e.classList.add(B)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:x.dragging.item,type:x.dragging.type}}))):h.split(/\s+/).filter(Boolean).forEach(B=>e.classList.add(B))}},V=()=>{x.dragging&&(k--,k<=0&&(k=0,E.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),h.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),ne(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:x.dragging?.item}}))))},X=T=>{if(T.preventDefault(),T.stopPropagation(),k=0,!x.dragging||u&&t.evaluate(u,n)||!ve(x.dragging.type,m))return;if(v){let I=t.evaluate(v,n),R=t.resolve(o,n);if(typeof I=="number"&&Array.isArray(R)&&R.length>=I)return}let M=x.dragging.item,P=x.dragging.listDirective,B=x.dragging.sourceIndex,q=Ue(e,T.clientX,T.clientY,a);E.split(/\s+/).filter(Boolean).forEach(I=>e.classList.remove(I)),h.split(/\s+/).filter(Boolean).forEach(I=>e.classList.remove(I)),ne();let N=t.resolve(o,n);if(!Array.isArray(N))return;let z=P&&P.el===e;if(z&&B===q){x.dragging=null;return}if(z&&B+1===q){x.dragging=null;return}let J=[...N];if(z){let[I]=J.splice(B,1),R=B<q?q-1:q;J.splice(R,0,I),n.$set(o,J),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:J,item:M,from:B,to:R}}))}else{let I=p&&typeof M=="object"?{...M}:M;if(J.splice(q,0,I),n.$set(o,J),P&&!P.copyMode&&(f||P.removeMode)){let R=t.resolve(P.listPath,P.ctx);if(Array.isArray(R)&&B!=null){let de=R.filter((be,Ve)=>Ve!==B);P.ctx.$set(P.listPath,de),P.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:de,item:M,index:B}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:J,item:M,from:B,fromList:P?t.resolve(P.listPath,P.ctx):null}}))}let ue=x.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||x.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",ut=z&&B<q?q:q+1;le(`Dropped ${ue} at position ${ut}.`),requestAnimationFrame(()=>{let R=[...e.children][z&&B<q?q-1:q];if(R){let de=R.firstElementChild||R;_.split(/\s+/).filter(Boolean).forEach(be=>de.classList.add(be)),de.addEventListener("animationend",()=>{_.split(/\s+/).filter(Boolean).forEach(be=>de.classList.remove(be))},{once:!0})}}),x.dragging=null},F=T=>{if(x.dragging&&ve(x.dragging.type,m)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let M=e.querySelector(":focus");if(M){let B=(M.style?.display==="contents"&&M.firstElementChild||M).getBoundingClientRect(),q={preventDefault(){},stopPropagation(){},clientX:B.left+B.width/2,clientY:B.top+B.height+1,dataTransfer:null};X(q)}}};e.addEventListener("dragover",w),e.addEventListener("dragenter",$),e.addEventListener("dragleave",V),e.addEventListener("drop",X),e.addEventListener("keydown",F),ce(e,()=>{e.removeEventListener("dragover",w),e.removeEventListener("dragenter",$),e.removeEventListener("dragleave",V),e.removeEventListener("drop",X),e.removeEventListener("keydown",F)});let ae=n.$watch(S);ce(e,ae),S()}})}function zt(t){Ye(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}x.selected.has(n)||x.selected.set(n,new Set);let c=x.selected.get(n),s=d=>{let m=e.getAttribute("drag"),f={item:m?t.evaluate(m,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let l=[...c].find(u=>u.el===e);l?(c.delete(l),i.split(/\s+/).filter(Boolean).forEach(u=>e.classList.remove(u))):(c.add(f),i.split(/\s+/).filter(Boolean).forEach(u=>e.classList.add(u)))}else{for(let l of c)i.split(/\s+/).filter(Boolean).forEach(u=>l.el.classList.remove(u));c.clear(),c.add(f),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l))}};e.addEventListener("click",s),ce(e,()=>{e.removeEventListener("click",s);let d=[...c].find(m=>m.el===e);d&&c.delete(d)});let a=d=>{if(d.key==="Escape"){for(let m of c)i.split(/\s+/).filter(Boolean).forEach(p=>m.el.classList.remove(p));c.clear()}};window.addEventListener("keydown",a),ce(e,()=>window.removeEventListener("keydown",a))}})}function Ot(t,e={}){Pt(t),Rt(t),Ft(t),zt(t)}function Vt(){qt()}var Nt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],mt=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function oe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ye,Kt,Xe,gt,bt,Wt,Ke,ht,Gt;function vo(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function yo(t){return(t.getAttribute("type")||"text").toLowerCase()}function xo(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(s=>s.trim());for(let s of c){let[a,...d]=s.split(":"),m=ye[a];if(m){let p=m(t.value,...d,e);p!==!0&&p&&(r.push({rule:a,message:p}),o.add(a))}else{let p=t.value,f=null;switch(a){case"required":(p==null||String(p).trim()==="")&&(f="Required");break;case"email":p&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p)&&(f="Invalid email");break;case"url":try{new URL(p)}catch{f="Invalid URL"}break;case"min":Number(p)<Number(d[0])&&(f=`Minimum value is ${d[0]}`);break;case"max":Number(p)>Number(d[0])&&(f=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&ye[d[0]]){let l=ye[d[0]](p,e);l!==!0&&l&&(f=l)}break}f&&(r.push({rule:a,message:f}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[c,s]of Nt)if(i[c]){let a=s||yo(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function Eo(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function _o(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=mt.indexOf(n.rule),s=mt.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:Eo(e,o.rule,o.message)}}function Xt(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function wo(t,e,r,o,n){let i=Xt(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;ht(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.__errorTemplateFor=o;let d=Xe({$error:e,$rule:r},n);a.__ctx=d,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),vo(a),bt(a)}function Ut(t){let e=Xt(t);e&&(ht(e),e.remove())}function Ao(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Kt(r,e)}catch{return!0}}function Yt(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function jo(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),s=ye[i];if(s){let a=s(t,...c,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&ye[c[0]]){let a=ye[c[0]](t,r);if(a!==!0&&a)return a}break}}return null}function Lo(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return gt(t);let e=Xe({},null);return t.__ctx=e,e}function Zt(t){ye=K(t,"validators")||{},Kt=t.evaluate,Xe=t.createContext,gt=t.findContext,bt=t.processTree,Wt=K(t,"cloneTemplate")||(()=>null),Ke=K(t,"disposeChildren")||(()=>{}),ht=K(t,"disposeTree")||Ke,Gt=K(t,"warn")||console.warn;let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):Gt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let f=function(){c&&typeof c.$notify=="function"&&c.$notify();let h=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;h.nextNode();){let A=h.currentNode.__ctx;A&&A!==c&&typeof A.$notify=="function"&&A.$notify()}},l=function(){return r.querySelectorAll("input, textarea, select")},u=function(){let h={},_={},A={},j=!0,k=null,L=0,S=!1;for(let w of l())w.name&&(w.type==="checkbox"?_[w.name]=w.checked:w.type==="radio"?w.checked?_[w.name]=w.value:w.name in _||(_[w.name]=""):_[w.name]=w.value);for(let w of l()){if(!w.name)continue;let $=a.has(w.name),V=d.has(w.name);if(!Ao(w,c)){A[w.name]={valid:!0,dirty:V,touched:$,error:null,value:_[w.name]};continue}let X=xo(w,_),F=_o(X,w),ae=!F,T=Yt(w,r),M=T.includes("input"),P=T.includes("blur")||T.includes("focusout")||T.includes("submit"),B;!w.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?B=$||V:B=M&&V||P&&$,ae||(j=!1),!ae&&B&&(h[w.name]=F.message,L++,k||(k=F.message)),A[w.name]={valid:ae,dirty:V,touched:$,error:F?F.message:null,value:_[w.name]};let q=w.getAttribute("error-class")||s;if(q){let z=q.split(/\s+/);!ae&&B?w.classList.add(...z):w.classList.remove(...z)}if(F&&B){let z=w.getAttribute(`error-${F.rule}`),J=w.getAttribute("error"),ue=(z&&z.startsWith("#")?z:null)||(J&&J.startsWith("#")?J:null);ue?wo(ue,F.message,F.rule,w,c):Ut(w)}else Ut(w);let N=w.getAttribute("as");N&&c.$set(N,A[w.name])}m.size>0&&(S=!0),p.valid=j,p.errors=h,p.values=_,p.fields=A,p.firstError=k,p.errorCount=L,p.pending=S,c.$set("$form",{...p}),f(),v(r)},v=function(h){let _=p.valid&&!p.pending&&!p.submitting,A=h.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let j of A){if(j.hasAttribute("disabled")&&j.getAttribute("disabled")!==""){let k=j.getAttribute("disabled");if(k!=="disabled"&&k!=="true"&&k!=="false")continue}j.disabled=!_,j.__autoDisabled=!0}},y=function(h){if(!h.name)return;let _=Yt(h,r),A=()=>{d.add(h.name),p.dirty=!0,u()},j=()=>{a.add(h.name),p.touched=!0,u()};if(_.includes("input"))h.addEventListener("input",A),oe(r,()=>h.removeEventListener("input",A));else{let k=()=>{d.add(h.name),p.dirty=!0,u()};h.addEventListener("input",k),oe(r,()=>h.removeEventListener("input",k))}if(_.includes("blur")||_.includes("focusout")){let k=()=>{j(),_.includes("blur")&&A()};h.addEventListener("focusout",k),oe(r,()=>h.removeEventListener("focusout",k))}else h.addEventListener("focusout",j),oe(r,()=>h.removeEventListener("focusout",j));_.includes("submit")&&(h.addEventListener("focusout",j),oe(r,()=>h.removeEventListener("focusout",j)))},c=Lo(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,d=new Set,m=new Map,p={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{p.dirty=!1,p.touched=!1,p.pending=!1,p.submitting=!1,a.clear(),d.clear(),r.reset(),u()},endSubmit:()=>{p.submitting=!1,u()}};c.$set("$form",p);let g=r.hasAttribute("validate-on"),b=[...l()].some(h=>h.hasAttribute("validate-on"));if(!g&&!b){let h=A=>{let j=A.target;j&&j.name&&d.add(j.name),p.dirty=!0,u()};r.addEventListener("input",h),oe(r,()=>r.removeEventListener("input",h)),r.addEventListener("change",h),oe(r,()=>r.removeEventListener("change",h));let _=A=>{A.target&&A.target.name&&a.add(A.target.name),p.touched=!0,u()};r.addEventListener("focusout",_),oe(r,()=>r.removeEventListener("focusout",_))}else for(let h of l())y(h);let E=h=>{for(let _ of l())_.name&&a.add(_.name);if(p.touched=!0,u(),!p.valid||p.pending){h.preventDefault(),h.stopImmediatePropagation();return}p.submitting=!0,v(r),c.$set("$form",{...p}),f()};r.addEventListener("submit",E,!0),oe(r,()=>r.removeEventListener("submit",E,!0)),r.__nojsResetSubmitting=()=>{p.submitting=!1,u()},oe(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(u);return}let i=gt(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),s=()=>{let a=jo(r.value,n,{});if(a&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let m=Wt(c);if(m){let p=Xe({err:{message:a}},i);Ke(d),d.innerHTML="",d.__ctx=p,d.appendChild(m),bt(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(Ke(d),d.innerHTML="")}};r.addEventListener("input",s),oe(r,()=>r.removeEventListener("input",s))}}})}function Qt(t,e={}){Zt(t)}function Jt(){}var je=new Map,ee=new Map;function er(){let t=Array.from(je.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of ee.values())clearTimeout(e);ee.clear();for(let e of je.values())e.remove();je.clear()}function tr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function ko(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ze=8;function nr(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+Ze,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-Ze;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+Ze;break;default:s=o.top-n.height-Ze,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Co=0;function So(t,e,r){document.body.appendChild(e),nr(e,t,r),e.setAttribute("aria-hidden","false")}function rr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function To(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function or(t){t.directive("tooltip",{priority:20,init(e,r,o){tr();let n=o;if(!n){To(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),d=a?t.findContext(e):null,m=()=>{if(!a||!d)return!1;try{return!!t.evaluate(a,d)}catch{return!1}},p=`nojs-tooltip-${++Co}`,f=document.createElement("div");f.className="nojs-tooltip",f.setAttribute("role","tooltip"),f.setAttribute("id",p),f.setAttribute("aria-hidden","true"),f.textContent=n,e.setAttribute("aria-describedby",p),je.set(e,f);let l=!1,u=0,v=()=>{!l||!e.isConnected||u||(u=requestAnimationFrame(()=>{u=0,!(!l||!e.isConnected)&&nr(f,e,i)}))},y=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},g=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),u&&(cancelAnimationFrame(u),u=0)},b=()=>{l||(So(e,f,i),l=!0,y())},E=()=>{if(!l){rr(e,f);return}g(),rr(e,f),l=!1},h=()=>{if(m())return;ee.has(e)&&clearTimeout(ee.get(e));let $=setTimeout(()=>{ee.delete(e),!m()&&e.isConnected&&b()},s);ee.set(e,$)},_=()=>{ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),E()},A=()=>h(),j=()=>_(),k=()=>h(),L=()=>_(),S=$=>{$.key==="Escape"&&f.getAttribute("aria-hidden")==="false"&&_()};e.addEventListener("mouseenter",A),e.addEventListener("mouseleave",j),e.addEventListener("focusin",k),e.addEventListener("focusout",L),e.addEventListener("keydown",S);let w=null;if(a&&d&&typeof d.$watch=="function"){let $=()=>{l&&m()&&E()};w=d.$watch($)}ko(e,()=>{e.removeEventListener("mouseenter",A),e.removeEventListener("mouseleave",j),e.removeEventListener("focusin",k),e.removeEventListener("focusout",L),e.removeEventListener("keydown",S),w&&(w(),w=null),g(),ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),l=!1,f.remove(),je.delete(e)})}})}function ir(t,e={}){or(t)}function sr(){er()}var Y=new Map;function ar(){Y.clear()}function Qe(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function vt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Le(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var pe=8;function Je(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-pe,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-pe;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+pe;break;default:s=o.bottom+pe,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-pe),r==="top"&&s<0&&(s=o.bottom+pe),r==="right"&&a+n.width>i&&(a=o.left-n.width-pe),r==="left"&&a<0&&(a=o.right+pe),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function yt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(typeof c.matches=="function"&&!c.matches(":popover-open")){i();return}Je(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function xe(t){t&&t._untrack&&t._untrack()}function cr(t){t.directive("popover",{priority:20,init(r,o,n){Qe();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=Y.get(i);a.popoverEl=r,a.position=c}let s=a=>{let d=Y.get(i);if(!d)return;let m=a.newState==="open";d.open=m;for(let p of d.triggerEls)p.setAttribute("aria-expanded",String(m));m||xe(d)};r.addEventListener("toggle",s),vt(r,()=>{r.removeEventListener("toggle",s);let a=Y.get(i);a&&(xe(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){Qe();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,d=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let c=a=>{let d=Y.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}Le(d.popoverEl)&&(d.popoverEl.togglePopover(),requestAnimationFrame(()=>{d.popoverEl.matches(":popover-open")?(Je(d.popoverEl,r,d.position),yt(d,r)):xe(d)}))};r.addEventListener("click",c);let s=a=>{let d=Y.get(i);a.key==="Escape"&&d?.open&&(Le(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),xe(d),r.focus())};document.addEventListener("keydown",s),vt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=Y.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(xe(a),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){Qe();let o=()=>{let n=r.closest(".nojs-popover");!n||!Le(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),vt(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Le(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{Je(n.popoverEl,i,n.position),yt(n,i)}),!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!Le(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return xe(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Le(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{Je(n.popoverEl,i,n.position),yt(n,i)}):xe(n),!0},t.popover=e}function dr(t,e={}){cr(t)}function lr(){ar()}var G=[],ie=new Map,Do=1e4;function ur(){return Do+G.length}function pr(){G.length=0,ie.clear()}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Io(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var mr='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',xt=new WeakMap;function Bo(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(mr)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),xt.set(t,e)}function fr(t){let e=xt.get(t);e&&(t.removeEventListener("keydown",e),xt.delete(t))}var Me=new WeakMap;function gr(t){t.directive("modal",{priority:10,init(r,o,n){ke();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),m=f=>{f.target===r&&s!=="false"&&d!=="false"&&Ce(r,i)};r.addEventListener("click",m),ie.set(i,r);let p=f=>{if(f.newState==="open"){if(r.style.zIndex=String(ur()),a&&a.split(/\s+/).filter(Boolean).forEach(l=>r.classList.add(l)),requestAnimationFrame(()=>{if(!r.isConnected||!G.some(u=>u.el===r))return;let l=r.querySelector(mr);l?l.focus():r.focus()}),Bo(r),d!=="false"){let l=u=>{u.key==="Escape"&&(u.stopPropagation(),Ce(r,i))};r.addEventListener("keydown",l),Me.set(r,l)}}else if(f.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),fr(r);let l=Me.get(r);l&&(r.removeEventListener("keydown",l),Me.delete(r));let u=G.findIndex(v=>v.el===r);if(u===-1&&(u=G.findIndex(v=>v.id===i)),u!==-1){let v=G[u];G.splice(u,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",p),Io(r,()=>{r.removeEventListener("click",m),r.removeEventListener("toggle",p),fr(r);let f=Me.get(r);f&&(r.removeEventListener("keydown",f),Me.delete(r)),ie.delete(i);let l=G.findIndex(u=>u.el===r);l===-1&&(l=G.findIndex(u=>u.id===i)),l!==-1&&G.splice(l,1)})}});let e=r=>e.open(r);e.open=r=>{let o=ie.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return G.some(n=>n.id===r)||G.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=ie.get(r);return o?(Ce(o,r),!0):!1},e.closeAll=()=>{for(let r=G.length-1;r>=0;r--)Ce(G[r].el,G[r].id)},t.modal=e}function Ce(t,e){try{t.hidePopover()}catch{}}function br(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ho(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function hr(t){t.directive("modal-open",{priority:10,init(e,r,o){ke();let n=o;if(!n){let p=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(p&&(n=p.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let m=ie.get(n)||Ho(n);if(!m){console.warn(`[modal-open] modal "${n}" not found`);return}let p=G.some(f=>f.id===n);m.id&&e.setAttribute("aria-controls",m.id);try{m.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}p||G.push({id:n,el:m,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,d=()=>{let m=ie.get(n);return m?(a=m,s=p=>{p.newState==="closed"&&e.setAttribute("aria-expanded","false")},m.addEventListener("toggle",s),!0):!1};if(!d()){let m=requestAnimationFrame(d);br(e,()=>cancelAnimationFrame(m))}e.addEventListener("click",i),br(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function $o(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function vr(t){t.directive("modal-close",{priority:10,init(e,r,o){ke();let n=()=>{let i,c;if(o){if(c=o,i=ie.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Ce(i,c)};e.addEventListener("click",n),$o(e,()=>{e.removeEventListener("click",n)})}})}function yr(t,e={}){gr(t),hr(t),vr(t)}function xr(){pr()}var te={openMenus:new Map},O={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function Er(){te.openMenus.clear(),O.installed=!1,O.instanceCount=0,O.outsideClickHandler=null,O.escHandler=null}function Se(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var qo=0;function Mo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Po(){O.installed||(O.outsideClickHandler=t=>{let e=[...te.openMenus.entries()];for(let[r,{toggle:o,wrapper:n}]of e)if(!n.contains(t.target)){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}te.openMenus.delete(r)}},O.escHandler=t=>{if(t.key!=="Escape")return;let e=[...te.openMenus.entries()];for(let[r,{toggle:o}]of e){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}o.focus()}te.openMenus.clear()},document.addEventListener("click",O.outsideClickHandler,!0),document.addEventListener("keydown",O.escHandler),O.installed=!0)}function _t(){O.installed&&(document.removeEventListener("click",O.outsideClickHandler,!0),document.removeEventListener("keydown",O.escHandler),O.outsideClickHandler=null,O.escHandler=null,O.installed=!1)}function _r(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,d,m;switch(o){case"top":d=i.top-c.height,m=i.left;break;case"left":d=i.top,m=i.left-c.width;break;case"right":d=i.top,m=i.right;break;default:d=i.bottom,m=i.left}o==="bottom"||o==="top"?n==="end"&&(m=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>s&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=s&&(d=i.bottom),m<4&&(m=4),m+c.width>a-4&&(m=a-c.width-4),t.style.top=`${d}px`,t.style.left=`${m}px`}function wt(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Et(t){let e=wt(t);e.length&&e[0].focus()}function wr(t){let e=wt(t);e.length&&e[e.length-1].focus()}function Ar(t){t.directive("dropdown",{priority:15,init(r){Se()}}),t.directive("dropdown-toggle",{priority:15,init(r){Se();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${qo++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),_r(n,r,o),te.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),te.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let m=v=>{v.newState==="closed"&&d()&&a()};n.addEventListener("toggle",m);let p=v=>{v.preventDefault(),v.stopPropagation(),d()?a():s()};r.addEventListener("click",p),O.instanceCount++,Po();let f=v=>{switch(v.key){case"Enter":case" ":v.preventDefault(),s(),Et(n);break;case"ArrowDown":v.preventDefault(),s(),Et(n);break;case"ArrowUp":v.preventDefault(),s(),wr(n);break}};r.addEventListener("keydown",f);let l=v=>{if(!(!d()||wt(n).find(b=>b===document.activeElement)))switch(v.key){case"ArrowDown":v.preventDefault(),Et(n);break;case"ArrowUp":v.preventDefault(),wr(n);break}};n.addEventListener("keydown",l);let u=()=>{d()&&_r(n,r,o)};window.addEventListener("scroll",u,!0),window.addEventListener("resize",u),Mo(r,()=>{r.removeEventListener("click",p),r.removeEventListener("keydown",f),n.removeEventListener("keydown",l),n.removeEventListener("toggle",m),window.removeEventListener("scroll",u,!0),window.removeEventListener("resize",u),te.openMenus.delete(n),O.instanceCount--,O.instanceCount<=0&&(O.instanceCount=0,_t())})}}),t.directive("dropdown-menu",{priority:15,init(r){Se(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function jr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ro(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function At(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),te.openMenus.has(t)&&te.openMenus.delete(t)}function Lr(t){t.directive("dropdown-item",{priority:15,init(e){Se();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=Ro(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),At(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{At(r,o);break}}};e.addEventListener("keydown",n),jr(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(At(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),jr(e,()=>e.removeEventListener("click",i))}})}function kr(t,e={}){Ar(t),Lr(t)}function Cr(){_t(),Er()}var se=new Map,Te=new Set,Sr=0;function Tr(){return++Sr}function Dr(){for(let t of Te)clearTimeout(t);Te.clear();for(let t of se.values())t.remove();se.clear(),Sr=0}function Ir(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function jt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Fo=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Lt(){return se.size>0?se.values().next().value:zo("top-right")}function zo(t){if(se.has(t))return se.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),se.set(t,e),e}function Oo(t){return t.startsWith("top")}function kt(t,e,r,o,n){let i=Tr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>et(s)),s.appendChild(d)}if(Oo(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let d=setTimeout(()=>{Te.delete(d),s.isConnected&&et(s)},o);Te.add(d),s._toastTimerId=d}return s}function et(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Te.delete(t._toastTimerId)),t.remove())}function Br(t){Ir(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&Fo.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),se.set(i,r),jt(r,()=>{se.get(i)===r&&se.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let u=()=>{let v=Lt();kt(v,n,i,s,a)};r.addEventListener("click",u),jt(r,()=>r.removeEventListener("click",u));return}let m=t.findContext(r);if(!m||typeof m.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let p;function f(){let u=t.evaluate(n,m);if(u&&u!==p){let v=typeof u=="string"?u:String(u),y=Lt();kt(y,v,i,s,a),p=u}else p=u}let l=m.$watch(f);jt(r,l)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=Lt();return kt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&et(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>et(r))},t.toast=e,t.global("toast",e)}function Hr(t,e={}){Br(t)}function $r(){Dr()}var Ee={containers:new Map};function qr(){Ee.containers.clear()}function Mr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function Vo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var No=0;function Pr(t){return`${t}-${++No}`}function Pe(t,e,r=!1){let o=Ee.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Re(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Rr(t){t.directive("tabs",{priority:10,init(e,r,o){Mr();let n=[],i=[];for(let g of Array.from(e.children))g.hasAttribute("tab")?n.push(g):g.hasAttribute("panel")&&i.push(g);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let g=0;g<a;g++){let b=n[g],E=i[g],h=b.id||Pr("nojs-tab"),_=E.id||Pr("nojs-panel");b.id=h,E.id=_,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",_),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),E.setAttribute("role","tabpanel"),E.setAttribute("aria-labelledby",h),E.setAttribute("tabindex","0"),E.setAttribute("aria-hidden","true"),E.inert=!0,E.classList.add("nojs-panel"),s.appendChild(b)}for(let g=a;g<i.length;g++){let b=i[g];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),Ee.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let m=t.findContext(e),p=[],f=(g,b)=>{let E=!1;try{E=!!t.evaluate(b,m)}catch{E=!1}E?g.setAttribute("aria-disabled","true"):g.removeAttribute("aria-disabled")};for(let g=0;g<a;g++){let b=n[g],E=b.getAttribute("tab-disabled");if(E&&(f(b,E),m&&typeof m.$watch=="function")){let h=m.$watch(()=>f(b,E));p.push(h)}}let l=0;if(o&&o.trim()!==""){let g=parseInt(o,10);!isNaN(g)&&g>=0&&g<a&&(l=g)}let u=n.slice(0,a);if(n[l]?.getAttribute("aria-disabled")==="true"){let g=Re(u,l,1);g!==-1?(l=g,Pe(e,l)):Pe(e,l,!0)}else Pe(e,l);let v=g=>{let b=Ee.containers.get(e);if(!b)return;let E=g.target;if(E.getAttribute("role")!=="tab")return;let{tabs:h}=b,_=h.indexOf(E);if(_===-1)return;let A=-1;switch(g.key){case"ArrowRight":case"ArrowDown":A=Re(h,_,1);break;case"ArrowLeft":case"ArrowUp":A=Re(h,_,-1);break;case"Home":A=Re(h,h.length-1,1);break;case"End":A=Re(h,0,-1);break;case"Tab":return;default:return}A!==-1&&A!==_&&(g.preventDefault(),Pe(e,A),h[A].focus())};s.addEventListener("keydown",v);let y=g=>{let b=g.target.closest("[role='tab']");if(!b)return;let E=Ee.containers.get(e);if(!E)return;let h=E.tabs.indexOf(b);h!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Pe(e,h),b.focus())};s.addEventListener("click",y),Vo(e,()=>{s.removeEventListener("keydown",v),s.removeEventListener("click",y);for(let g of p)g&&g();p.length=0,Ee.containers.delete(e)})}})}function Fr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function zr(t){t.directive("panel",{priority:11,init(){}})}function Or(t,e={}){Rr(t),Fr(t),zr(t)}function Vr(){qr()}var H={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Nr(){H.branches.clear(),H.selectedItem=null,H.typeahead="",H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null)}function De(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function Ie(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Wr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Gr(t){return t.closest('[role="tree"]')}function Wo(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function Go(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function Ct(t){let e=H.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),H.selectedItem=t}function Ur(t){let e=H.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function Uo(t){let e=H.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function Yo(t){let e=H.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Yr(t,e){let r=Gr(e);if(!r)return;let o=Wr(r),n=o.indexOf(e);if(n<0)return;let i=H.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)Uo(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&_e(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)Yo(e);else{let s=Wo(e);s&&_e(s,Wr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&_e(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&_e(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),Ct(e),c&&Ur(e);break;case"Home":t.preventDefault(),o.length>0&&_e(o[0],o);break;case"End":t.preventDefault(),o.length>0&&_e(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),H.typeahead+=t.key.toLowerCase(),H.typeaheadTimer&&clearTimeout(H.typeaheadTimer),H.typeaheadTimer=setTimeout(()=>{H.typeahead="",H.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let d=(s+a)%o.length;if(Go(o[d]).startsWith(H.typeahead)){_e(o[d],o);break}}}break}}function Kr(t){t.directive("tree",{priority:15,init(e){De(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Xr(t){t.directive("branch",{priority:16,init(e,r,o){De();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Gr(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(H.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):H.branches.set(e,{expanded:n,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),Ct(e),Ur(e))};e.addEventListener("click",s),Ie(e,()=>e.removeEventListener("click",s));let a=d=>{Yr(d,e)};e.addEventListener("keydown",a),Ie(e,()=>e.removeEventListener("keydown",a)),Ie(e,()=>{c=!0,H.branches.delete(e),H.selectedItem===e&&(H.selectedItem=null),H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null,H.typeahead="")})}})}function _e(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Zr(t){t.directive("subtree",{priority:16,init(e){De(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),Ct(o)};o.addEventListener("click",n),Ie(o,()=>o.removeEventListener("click",n));let i=c=>{Yr(c,o)};o.addEventListener("keydown",i),Ie(o,()=>o.removeEventListener("keydown",i)),Ie(o,()=>{H.selectedItem===o&&(H.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=H.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Qr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function St(t){return t.closest('[role="treeitem"]')}function Ko(t){return t.closest('[role="tree"]')}function Xo(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Zo(t){return Xo(t).indexOf(t)}function Qo(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Jr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Be(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function Fe(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function Jo(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function ei(t,e){Be();let r=Jo(),o=t.getBoundingClientRect(),n=Ko(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function en(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(De(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=f=>{let l=St(f.target);if(l&&e.contains(l)){if(l.hasAttribute("tree-drag-disabled")){f.preventDefault();return}D.dragging={el:l,treeRoot:e},f.dataTransfer&&(f.dataTransfer.effectAllowed="move",f.dataTransfer.setData("text/plain","")),l.classList.add("nojs-dragging"),l.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:l}}))}},c=f=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let l=St(f.target);if(!l||!e.contains(l)||l===D.dragging.el||Jr(l,D.dragging.el))return;f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move");let u=Qo(l,f.clientY,o);(D.currentTarget!==l||D.currentPosition!==u)&&(Fe(e),Be(),D.currentTarget=l,D.currentPosition=u,u==="on"?l.classList.add("nojs-tree-drag-over"):ei(l,u))},s=f=>{D.dragging&&D.dragging.treeRoot===e&&n++},a=f=>{D.dragging&&(n--,n<=0&&(n=0,Fe(e),Be(),D.currentTarget=null,D.currentPosition=null))},d=f=>{if(f.preventDefault(),f.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let l=D.dragging.el,u=D.currentTarget,v=D.currentPosition;if(Fe(e),Be(),!u||!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(u===l||Jr(u,l)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="on"){let y=u.querySelector(':scope > [role="group"]');y||(y=u.nextElementSibling?.matches?.('[role="group"]')?u.nextElementSibling:null),y?y.setAttribute("aria-hidden","false"):(y=document.createElement("ul"),y.setAttribute("role","group"),y.setAttribute("subtree",""),y.classList.add("nojs-subtree","nojs-tree"),y.setAttribute("aria-hidden","false"),u.appendChild(y));let g=H.branches.get(u);g&&(g.expanded=!0,g.subtreeEl=y,u.setAttribute("aria-expanded","true")),y.appendChild(l),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:l,newParent:u}}))}else{let y=u.parentElement;if(!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="before")y.insertBefore(l,u);else{let b=u.nextElementSibling,E=b?.matches?.('[role="group"]')?b.nextElementSibling:b;E?y.insertBefore(l,E):y.appendChild(l)}let g=Zo(l);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:l,newIndex:g}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},m=f=>{let l=St(f.target);l&&l.classList.remove("nojs-dragging"),Fe(e),Be(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",d),e.addEventListener("dragend",m),Qr(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",d),e.removeEventListener("dragend",m),Fe(e),Be()}),ti(e);let p=new MutationObserver(f=>{for(let l of f)for(let u of l.addedNodes){if(u.nodeType!==1)continue;u.getAttribute("role")==="treeitem"&&Tt(u);let v=u.querySelectorAll?.('[role="treeitem"]');if(v)for(let y of v)Tt(y)}});p.observe(e,{childList:!0,subtree:!0}),Qr(e,()=>p.disconnect())}})}function Tt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function ti(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)Tt(r)}function tn(t,e={}){Kr(t),Xr(t),Zr(t),en(t)}function rn(){Nr()}var tt=new Map;function nn(){tt.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function on(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function sn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function an(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function ze(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function cn(t){t.directive("stepper",{priority:14,init(e,r,o){rt();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",m=e.getAttribute("aria-label")||"Stepper",p=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",m),e.classList.add("nojs-stepper");let f=null,l=[];if(a){f=document.createElement("div"),f.className="nojs-stepper-indicator",f.setAttribute("role","tablist"),f.setAttribute("aria-label","Progress"),i.forEach((L,S)=>{if(S>0){let F=document.createElement("div");F.className="nojs-stepper-separator",F.setAttribute("aria-hidden","true"),f.appendChild(F)}let w=document.createElement("button");w.type="button",w.className="nojs-stepper-indicator-item",w.setAttribute("role","tab"),w.setAttribute("aria-selected",S===p?"true":"false");let $=L.getAttribute("step-label")||`Step ${S+1}`,V=document.createElement("span");V.textContent=$,w.appendChild(V),w.setAttribute("aria-label",$);let X=`nojs-stepper-tab-${ri++}`;if(w.id=X,s==="free"){w.setAttribute("data-clickable","");let F=()=>_(S);w.addEventListener("click",F),ze(e,()=>w.removeEventListener("click",F))}else w.setAttribute("tabindex","-1");f.appendChild(w),l.push(w)});let k=L=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(L.key))return;L.preventDefault();let S=p;L.key==="ArrowRight"?S=Math.min(p+1,i.length-1):L.key==="ArrowLeft"?S=Math.max(p-1,0):L.key==="Home"?S=0:L.key==="End"&&(S=i.length-1),s==="free"?(_(S),l[S]?.focus()):l[p]?.focus()};f.addEventListener("keydown",k),ze(e,()=>f.removeEventListener("keydown",k)),e.insertBefore(f,e.firstChild)}let u=null,v=null,y=null;if(d){u=document.createElement("div"),u.className="nojs-stepper-nav",u.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let k=()=>h();v.addEventListener("click",k),ze(e,()=>v.removeEventListener("click",k)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let L=()=>E();y.addEventListener("click",L),ze(e,()=>y.removeEventListener("click",L)),u.appendChild(v),u.appendChild(y),e.appendChild(u)}function g(k){let L=i[k];if(!L)return!0;if(!on(L,t.findContext)){let $=L.querySelector("form[validate]");return $&&(sn($),l[k]&&l[k].classList.add("nojs-step-invalid"),an(e,L,$)),!1}l[k]&&l[k].classList.remove("nojs-step-invalid");let S=L.querySelectorAll("[required]");for(let $ of S)if(typeof $.checkValidity=="function"&&!$.checkValidity())return $.reportValidity(),!1;let w=L.getAttribute("step-validate");if(w)try{if(!t.evaluate(w,n))return!1}catch($){return console.warn(`[stepper] step-validate error: ${$.message}`),!1}return!0}function b(k){if(i.forEach((L,S)=>{let w=S===p;L.setAttribute("aria-hidden",w?"false":"true"),w?(L.removeAttribute("inert"),L.setAttribute("aria-current","step")):(L.setAttribute("inert",""),L.removeAttribute("aria-current"))}),l.length&&l.forEach((L,S)=>{L.setAttribute("aria-selected",S===p?"true":"false"),S<p?L.setAttribute("data-completed",""):L.removeAttribute("data-completed"),L.setAttribute("tabindex",S===p?"0":"-1");let w=i[S];w.id&&(L.setAttribute("aria-controls",w.id),w.setAttribute("aria-labelledby",L.id))}),v&&(v.disabled=p===0),y&&(y.textContent=p===i.length-1?"Finish":"Next"),!k){let L=i[p];L&&requestAnimationFrame(()=>L.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!k,detail:{current:p,total:i.length}}))}function E(){return p>=i.length-1?(s==="linear"&&!g(p)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:p,total:i.length}})),!1):s==="linear"&&!g(p)?!1:(p++,b(),j(),!0)}function h(){return p<=0?!1:(p--,b(),j(),!0)}function _(k){if(k<0||k>=i.length||k===p)return!1;if(s==="linear"&&k>p){for(let L=p;L<k;L++)if(p=L,b(),!g(L))return j(),!1}return p=k,b(),j(),!0}let A={get current(){return p},get total(){return i.length},next:E,prev:h,goTo:_,get isFirst(){return p===0},get isLast(){return p===i.length-1}};function j(){n.$stepper=A}j(),tt.set(e,{get current(){return p},steps:i,mode:s,indicatorEl:f,navEl:u}),b(!0),ze(e,()=>{tt.delete(e),f&&f.parentNode&&f.remove(),u&&u.parentNode&&u.remove(),delete n.$stepper})}})}var ri=0;var ni=0;function dn(t){t.directive("step",{priority:13,init(e,r,o){rt(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${ni++}`),e.setAttribute("tabindex","0")}})}function ln(t,e={}){dn(t),cn(t)}function un(){nn()}function pn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function fn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function mn(t){t.directive("skeleton",{priority:10,init(e,r,o){pn();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function d(g){m();for(let b=0;b<g;b++){let E=document.createElement("div");E.className="nojs-skeleton-line",e.appendChild(E),a.push(E)}}function m(){for(let g of a)g.parentNode===e&&e.removeChild(g);a=[]}function p(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let g=s+(String(s).match(/\d$/)?"px":"");e.style.width=g,e.style.height=g}if(c){let g=parseInt(c,10);g>0&&d(g)}e.setAttribute("aria-busy","true")}let f=null;function l(){f&&f(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let g=!1,b=null,E=()=>{g||(g=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",E),b!==null&&clearTimeout(b),f=null)};e.addEventListener("transitionend",E),b=setTimeout(E,0),f=()=>{e.removeEventListener("transitionend",E),b!==null&&clearTimeout(b),g=!0,f=null}}let u=!1;function v(){let g=!!t.evaluate(o,n);g&&!u?(u=!0,p()):!g&&u&&(u=!1,l())}v();let y=n.$watch(v);fn(e,y),fn(e,()=>{f&&f(),u&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function gn(t,e={}){mn(t)}var we=new Map,U=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function bn(){we.clear(),U.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function nt(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function oi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function hn(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function vn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function ii(t,e){let o=(we.get(t)?.gutters||[]).reduce((n,i)=>n+Q(i,e),0);return Q(t,e)-o}function si(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Oe(t,e){let r=U.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function ot(t,e,r,o){let n=Q(e,o),i=Q(r,o),c=U.get(e),s=U.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function Dt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=we.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function ai(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=we.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function ci(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=l=>{if(l.button!==0)return;l.preventDefault();let u=ii(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=l[hn(e)],C.startPrevSize=Q(r,e),C.startNextSize=Q(o,e),C.containerSize=u,C.sign=vn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(l.pointerId)},s=l=>{if(!C.active||C.gutterEl!==i)return;let u=(l[hn(C.direction)]-C.startPos)*(C.sign||1),v=Oe(C.startPrevSize+u,C.prevPane),y=Oe(C.startNextSize-u,C.nextPane),g=C.startPrevSize+C.startNextSize;v+y!==g&&(v!==C.startPrevSize+u?y=g-v:v=g-y),C.prevPane.style.flexBasis=`${v}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${y}px`,C.nextPane.style.flexGrow="0",ot(i,C.prevPane,C.nextPane,C.direction)},a=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Dt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let d=10,m=l=>{let u=e==="horizontal",v=vn(t,e),y=0;if(u&&l.key==="ArrowRight"||!u&&l.key==="ArrowDown")y=d*v;else if(u&&l.key==="ArrowLeft"||!u&&l.key==="ArrowUp")y=-d*v;else if(l.key==="Home")y=(U.get(r)?.min||0)-Q(r,e);else if(l.key==="End"){let A=U.get(o);y=Q(r,e)+Q(o,e)-(A?.min||0)-Q(r,e)}else return;l.preventDefault();let g=Q(r,e),b=Q(o,e),E=g+b,h=Oe(g+y,r),_=Oe(E-h,o);h=E-_,h=Oe(h,r),_=E-h,r.style.flexBasis=`${h}px`,r.style.flexGrow="0",o.style.flexBasis=`${_}px`,o.style.flexGrow="0",ot(i,r,o,e),Dt(t)};i.addEventListener("keydown",m);let p=()=>{let l=U.get(r),u=U.get(o),v=l?.collapsible?r:u?.collapsible?o:null;if(!v)return;let y=U.get(v);if(!y)return;let g=v===r?o:r,b=Q(r,e)+Q(o,e);if(y.collapsed){y.collapsed=!1,v.removeAttribute("data-collapsed");let E=y.preCollapseSize||`${Math.round(b/2)}px`,h=si(E,b)??b/2,_=Math.min(h,b);v.style.flexBasis=`${_}px`,v.style.flexGrow="0",g.style.flexBasis=`${b-_}px`,g.style.flexGrow="0"}else y.preCollapseSize=v.style.flexBasis||`${Q(v,e)}px`,y.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",g.style.flexBasis=`${b}px`,g.style.flexGrow="0";ot(i,r,o,e),Dt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",p),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",m),i.removeEventListener("dblclick",p)}}}function yn(t){t.directive("split",{priority:14,init(e,r,o){nt();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(m=>m.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(m=>{U.get(m)||U.set(m,{size:m.getAttribute("pane")||null,min:parseInt(m.getAttribute("pane-min"),10)||0,max:parseInt(m.getAttribute("pane-max"),10)||1/0,collapsible:m.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let m=0;m<c.length-1;m++){let{gutter:p,cleanup:f}=ci(e,n,c[m],c[m+1],i);c[m].after(p),s.push(p),a.push(f)}we.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),ai(e)||c.forEach(m=>{let f=U.get(m)?.size;f?(m.style.flexBasis=f,m.style.flexGrow="0"):(m.style.flexGrow="1",m.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((m,p)=>{ot(m,c[p],c[p+1],n)})}),oi(e,()=>{a.forEach(m=>m()),s.forEach(m=>m.remove()),we.delete(e),c.forEach(m=>U.delete(m)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function di(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function xn(t){t.directive("pane",{priority:15,init(e,r,o){nt(),e.classList.add("nojs-pane"),U.has(e)||U.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=U.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),di(e,()=>{e.classList.remove("nojs-pane"),U.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function En(t,e={}){yn(t),xn(t)}function _n(){bn()}var fe={sorts:new Map};function wn(){fe.sorts.clear()}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
[table-reorder] tbody tr[aria-grabbed="true"] {
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function li(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ui(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function pi(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function An(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function jn(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function kn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return jn(Number(t),Number(e));case"date":return jn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function fi(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Cn(t){t.directive("sortable",{priority:10,init(e){Ae(),e.classList.add("nojs-sortable")}})}function Sn(t){t.directive("sort",{priority:11,init(e,r,o){Ae();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;fe.sorts.has(s)||fe.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(fe.sorts.get(s).column||Ln(e,s,n,i,c,t));let a=()=>{let d=fe.sorts.get(s),m;d.column!==n?m="asc":d.direction==="asc"?m="desc":d.direction==="desc"?m=null:m="asc",Ln(e,s,n,i,m,t)};e.addEventListener("click",a),li(e,()=>{e.removeEventListener("click",a),s&&!s.isConnected&&(fe.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Ln(t,e,r,o,n,i){let c=fe.sorts.get(e);fi(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=ui(e,i);if(s){let a=i.findContext(e),d=a?pi(a,s.arrayPath):null;if(Array.isArray(d)){if(!n){let p=e._nojsOriginalOrder;if(p){let f=new Set(d),l=p.filter(u=>f.has(u));for(let u of d)p.includes(u)||l.push(u);An(a,s.arrayPath,l)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let m=[...d].sort((p,f)=>{let l=p!=null?p[r]:null,u=f!=null?f[r]:null,v=kn(l,u,o);return n==="desc"?-v:v});An(a,s.arrayPath,m);return}}mi(e,t,r,o,n)}function mi(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let f=document.createDocumentFragment();for(let l of t._nojsOriginalRows)f.appendChild(l);i.appendChild(f);return}let m=f=>{let l=f.replace(/[^0-9.\-]/g,"");return l===""||l==="-"?NaN:parseFloat(l)};d.sort((f,l)=>{let u=f.children[a]?.textContent?.trim()||"",v=l.children[a]?.textContent?.trim()||"",y=kn(o==="number"?m(u):u,o==="number"?m(v):v,o);return n==="desc"?-y:y});let p=document.createDocumentFragment();for(let f of d)p.appendChild(f);i.appendChild(p)}function Tn(t){t.directive("fixed-header",{priority:10,init(e){Ae(),e.classList.add("nojs-fixed-header")}})}function Dn(t){t.directive("fixed-col",{priority:10,init(e){Ae(),e.classList.add("nojs-fixed-col")}})}function It(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function In(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function Bn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Hn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function $n(t){t.directive("table-reorder",{priority:15,init(e){if(Ae(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,d=null;function m(){let y=r.querySelectorAll(":scope > tr");for(let g=0;g<y.length;g++){let b=y[g];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let E=!0;if(n){let L=S=>{E=!!S.target.closest(n)};b.addEventListener("mousedown",L),It(b,()=>b.removeEventListener("mousedown",L))}let h=L=>{if(n&&!E){L.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(b),a=b,L.dataTransfer&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(w=>b.classList.add(w)),b.setAttribute("aria-grabbed","true")},_=L=>{if(a==null)return;L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),w=S.top+S.height/2,V=[...r.querySelectorAll(":scope > tr")].indexOf(b);p(),V!==s&&(L.clientY<w?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),d=b)},A=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),d===b&&(d=null)},j=L=>{if(L.preventDefault(),L.stopPropagation(),a==null||s==null)return;let S=[...r.querySelectorAll(":scope > tr")],w=b.getBoundingClientRect(),$=w.top+w.height/2,V=S.indexOf(b);L.clientY>=$&&V++;let X=s;if(X===V||X+1===V){f();return}let F=X<V?V-1:V,ae=In(e);if(ae&&o){let T=Bn(o,ae.arrayPath);if(Array.isArray(T)){let M=[...T],[P]=M.splice(X,1);M.splice(F,0,P),Hn(o,ae.arrayPath,M),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...M]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:F,item:P}}))}}else{let T=a,M=S[F];T&&M&&(X<F?r.insertBefore(T,M.nextSibling):r.insertBefore(T,M),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:F,item:null}})))}f()},k=()=>{f()};b.addEventListener("dragstart",h),b.addEventListener("dragover",_),b.addEventListener("dragleave",A),b.addEventListener("drop",j),b.addEventListener("dragend",k),It(b,()=>{b.removeEventListener("dragstart",h),b.removeEventListener("dragover",_),b.removeEventListener("dragleave",A),b.removeEventListener("drop",j),b.removeEventListener("dragend",k),b._nojsReorderSetup=!1})}}function p(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function f(){a&&(i.split(/\s+/).filter(Boolean).forEach(g=>a.classList.remove(g)),a.setAttribute("aria-grabbed","false")),p(),s=null,a=null;let y=r.querySelectorAll(":scope > tr");for(let g of y)g.classList.remove("nojs-reorder-insert-before"),g.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(b=>g.classList.remove(b))}let l=y=>{a!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},u=y=>{if(a==null||y.target!==r)return;y.preventDefault(),y.stopPropagation();let g=s,E=[...r.querySelectorAll(":scope > tr")].length-1;if(g===E){f();return}let h=In(e);if(h&&o){let _=Bn(o,h.arrayPath);if(Array.isArray(_)){let A=[..._],[j]=A.splice(g,1);A.push(j),Hn(o,h.arrayPath,A),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...A]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:g,to:A.length-1,item:j}}))}}f()};r.addEventListener("dragover",l),r.addEventListener("drop",u);let v=new MutationObserver(()=>{m()});v.observe(r,{childList:!0}),m(),It(e,()=>{v.disconnect(),r.removeEventListener("dragover",l),r.removeEventListener("drop",u),f()})}})}function qn(t,e={}){Cn(t),Sn(t),Tn(t),Dn(t),$n(t)}function Mn(){wn()}var me={containers:new Map};function Pn(){for(let[,t]of me.containers)typeof t.unsub=="function"&&t.unsub();me.containers.clear()}function Rn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Fn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function gi(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function bi(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function zn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=c.label,s.appendChild(d)}else{let d=document.createElement("a");d.href=c.href,d.textContent=c.label,s.appendChild(d)}o.appendChild(s)}t.appendChild(o);let n=me.containers.get(t);n&&(n.crumbs=e)}function hi(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=gi(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function vi(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=bi(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function On(t){t.directive("breadcrumb",{priority:15,init(e,r,o){Rn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(me.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,d=a?a.path:"/",m=vi(d);zn(e,m)};if(s(),typeof i.on=="function"){let a=i.on(s),d=me.containers.get(e);d&&(d.unsub=a),Fn(e,()=>{typeof a=="function"&&a();let m=me.containers.get(e);m&&(m.unsub=null)})}}else{let s=hi(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");zn(e,s)}Fn(e,()=>{me.containers.delete(e)})}})}function Vn(t,e={}){On(t)}function Nn(){Pn()}var it={containers:new Map};function Wn(){it.containers.clear()}function Gn(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function yi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var st=null;function xi(){return st!==null||(st=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),st}function Un(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function Ei(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Kn(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Yn(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");Kn(t,r)}else t.open=!1}function at(t,e,r,o){let n=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function He(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function Xn(t){t.directive("accordion",{priority:10,init(e,r,o){Gn();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!xi();e.setAttribute("role","group");let c=He(e);if(c.length===0)return;if(i)for(let f of c)Un(f);let s=[],a=new MutationObserver(f=>{for(let l of f)for(let u of l.addedNodes)u.nodeType!==1||u.tagName!=="DETAILS"||u.parentElement===e&&m(u)});a.observe(e,{childList:!0});let d=0,m=f=>{i&&Un(f);let l=f.querySelector(":scope > summary");if(l){let y=`nojs-accordion-panel-${Date.now()}-${d++}`,g=f.querySelector(":scope > .nojs-accordion-content");g?(g.id=g.id||y,g.setAttribute("role","region"),y=g.id):(f.id||(f.id=y),y=f.id),l.setAttribute("aria-expanded",f.open?"true":"false"),l.setAttribute("aria-controls",y)}let u=y=>{let g=He(e),b=g.indexOf(f),E=f.querySelector(":scope > summary");if(E&&E.setAttribute("aria-expanded",f.open?"true":"false"),f.open){if(n==="single")for(let h of g)h!==f&&h.open&&Yn(h,i);at(e,f,!0,b)}else at(e,f,!1,b)},v=null;if(i){let y=f.querySelector(":scope > summary");y&&(v=g=>{g.preventDefault();let b=f.querySelector(":scope > .nojs-accordion-content");if(f.open)Kn(f,b),y.setAttribute("aria-expanded","false"),at(e,f,!1,He(e).indexOf(f));else{if(n==="single"){let E=He(e);for(let h of E)if(h!==f&&h.open){Yn(h,!0);let _=h.querySelector(":scope > summary");_&&_.setAttribute("aria-expanded","false")}}Ei(f,b),y.setAttribute("aria-expanded","true"),at(e,f,!0,He(e).indexOf(f))}},y.addEventListener("click",v))}f.addEventListener("toggle",u),s.push({details:f,toggleHandler:u,clickHandler:v})};for(let f of c)m(f);let p=f=>{let l=f.target;if(l.tagName!=="SUMMARY")return;let u=l.parentElement;if(!u||u.parentElement!==e)return;let y=He(e).map(E=>E.querySelector(":scope > summary")).filter(Boolean),g=y.indexOf(l);if(g===-1)return;let b=-1;switch(f.key){case"ArrowDown":case"ArrowRight":b=(g+1)%y.length;break;case"ArrowUp":case"ArrowLeft":b=(g-1+y.length)%y.length;break;case"Home":b=0;break;case"End":b=y.length-1;break;default:return}b!==-1&&b!==g&&(f.preventDefault(),y[b].focus())};e.addEventListener("keydown",p),it.containers.set(e,{mode:n,listeners:s,observer:a}),yi(e,()=>{e.removeEventListener("keydown",p),a.disconnect();for(let f of s)if(f.details.removeEventListener("toggle",f.toggleHandler),f.clickHandler){let l=f.details.querySelector(":scope > summary");l&&l.removeEventListener("click",f.clickHandler)}s.length=0,it.containers.delete(e)})}})}function Zn(t,e={}){Xn(t)}function Qn(){Wn()}var $e=new Map;function Jn(){let t=Array.from($e.keys());for(let e of t){let r=$e.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}$e.clear()}function eo(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function _i(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function wi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=Ai(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function Ai(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function ji(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function to(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function ct(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Li(t,e){return t*e}function no(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function oo(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function ro(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function dt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function ki(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return oo(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function Ci(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return oo(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function Si(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=ki(t,e),n=Ci(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function Bt(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:s}=Si(t,n,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=dt(t,c),d=t.itemHeight!=="auto"?Li(t.totalItems,t.itemHeight):ro(t),m=s>=0?dt(t,s+1):0,p=Math.max(0,d-m);ct(t.spacerTop,a),ct(t.spacerBottom,p);let f=new Set;for(let u=c;u<=s;u++)f.add(u);for(let[u,v]of t.renderedNodes)f.has(u)||(v.remove(),t.renderedNodes.delete(u));let l=[];for(let u=c;u<=s;u++){if(t.renderedNodes.has(u))continue;let v=t.dataArray[u];if(v===void 0)continue;let y=t.template.cloneNode(!0),g={};g[t.iteratorVar]=v,g.$index=u,g.$count=t.totalItems,g.$first=u===0,g.$last=u===t.totalItems-1,g.$even=u%2===0,g.$odd=u%2!==0,y.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(g)),y.__declared=!1,l.push({index:u,node:y}),t.renderedNodes.set(u,y)}if(l.length>0){l.sort((u,v)=>u.index-v.index);for(let{index:u,node:v}of l){let y=null;for(let[g,b]of t.renderedNodes)g>u&&b.parentNode===r&&(!y||g<Ti(y,t))&&(y=b);y||(y=t.spacerBottom),r.insertBefore(v,y);try{e.processTree&&e.processTree(v)}catch{}}}if(t.itemHeight==="auto"){let u=!1;for(let[v,y]of t.renderedNodes){let g=y.offsetHeight||y.getBoundingClientRect().height;g>0&&t.heights[v]!==g&&(t.heights[v]=g,u=!0)}if(u){no(t);let v=ro(t),y=dt(t,c),g=s>=0?dt(t,s+1):0,b=Math.max(0,v-g);ct(t.spacerTop,y),ct(t.spacerBottom,b)}}}function Ti(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function Di(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&no(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,Bt(t,r)}function io(t){t.directive("virtual",{priority:10,init(e,r,o){eo(),e.setAttribute("data-nojs-virtual","");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=wi(e),d=null;if(a)d=a.eachEl;else for(let h of e.children)if(!h.classList.contains("nojs-virtual-spacer")){d=h;break}if(!d){console.warn("[virtual] No child template found.");return}let m=d.cloneNode(!0);for(m.removeAttribute("each"),m.removeAttribute("foreach"),m.removeAttribute("for"),m.__declared=!1,m.__disposers=null,m.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let p=to(e),f=to(e);e.appendChild(p),e.appendChild(f);let l={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:m,spacerTop:p,spacerBottom:f,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};$e.set(e,l);let u=null,v=()=>{u||(u=requestAnimationFrame(()=>{u=null,Bt(l,t)}))};if(l.scrollHandler=v,e.addEventListener("scroll",v,{passive:!0}),typeof ResizeObserver<"u"){let h=new ResizeObserver(()=>{l.dirty=!0,Bt(l,t)});h.observe(e),l.resizeObserver=h}let y=null,g=-1,b=null,E=()=>{if(!l.disposed){if(l.arrayPath){let h=t.findContext?t.findContext(e):null;if(h){let _=ji(h,l.arrayPath);Array.isArray(_)&&(_!==y||_.length!==g)&&(y=_,g=_.length,Di(l,_,t))}}b=setTimeout(E,100)}};b=setTimeout(E,100),_i(e,()=>{l.disposed=!0,u&&(cancelAnimationFrame(u),u=null),b&&(clearTimeout(b),b=null),e.removeEventListener("scroll",v),l.resizeObserver&&(l.resizeObserver.disconnect(),l.resizeObserver=null);for(let[h,_]of l.renderedNodes){if(_.__disposers){for(let A of _.__disposers)try{A()}catch{}_.__disposers=null}_.remove()}l.renderedNodes.clear(),l.spacerTop&&l.spacerTop.parentNode&&l.spacerTop.remove(),l.spacerBottom&&l.spacerBottom.parentNode&&l.spacerBottom.remove(),$e.delete(e)})}})}function so(t,e={}){io(t)}function ao(){Jn()}var ge=new Map,lt=new Map;function co(){for(let[t,e]of ge){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}ge.clear(),lt.clear()}function lo(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function Ii(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Bi(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function Hi(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function $i(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function qi(){return document.documentElement}function Mi(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function uo(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function Ht(t){let e=ge.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let p of a)p.isIntersecting?n.add(p.target.id):n.delete(p.target.id);let d=null,m=1/0;for(let p of n){let f=document.getElementById(p);if(!f)continue;let l=f.getBoundingClientRect();l.top<m&&(m=l.top,d=p)}for(let p of e.spyEntries)uo(p.el);if(d){for(let p of e.spyEntries)if(p.targetId===d){Mi(p.el),e.activeEl=p.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let d=document.getElementById(a.targetId);d&&(c.observe(d),s.add(a.targetId))}e.observer=c}function Pi(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function po(t){t.directive("spy",{priority:20,init(e,r,o){lo();let n=Bi(e);if(!n){e.tagName!=="A"&&Pi(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=Hi(e),c=$i(e),s=qi();ge.has(s)||ge.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=ge.get(s),d={el:e,targetId:n};a.spyEntries.push(d),lt.set(e,s),Ht(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{Ht(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),Ii(e,()=>{let m=a.spyEntries.indexOf(d);m!==-1&&a.spyEntries.splice(m,1),lt.delete(e),uo(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),ge.delete(s)):Ht(s)})}})}function fo(t,e={}){po(t)}function mo(){co()}var Ri="[validate],[drag],[drop],[drag-list],[drag-multiple]";function go(t){if(typeof document>"u")return;let e=document.querySelectorAll(Ri);for(let r of e){if(!r.__declared)continue;let o=K(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Fi=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],zi={name:"nojs-elements",install(t,e={}){Ot(t,e),Qt(t,e),ir(t,e),dr(t,e),yr(t,e),kr(t,e),Hr(t,e),Or(t,e),tn(t,e),ln(t,e),gn(t,e),En(t,e),qn(t,e),Vn(t,e),Zn(t,e),so(t,e),fo(t,e),go(t)},init(t){if(go(t),typeof document>"u"||!document.body)return;let e=Fi.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Vt(),Jt(),sr(),lr(),xr(),Cr(),$r(),Vr(),rn(),un(),_n(),Mn(),Nn(),Qn(),ao(),mo()}},$t=zi;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use($t),t=!0,!0):!1};window.NoJSElements=$t;let t=!1;if(!e()){let r=0,o=100,n=setInterval(()=>{(e()||++r>=o)&&clearInterval(n)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(n)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
