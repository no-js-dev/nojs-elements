/**
 * NoJS Elements v1.22.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
(()=>{var A={dragging:null,selected:new Map,placeholder:null},Ke=new Map;function nr(){A.dragging=null,A.selected.clear(),A.placeholder&&(A.placeholder.remove(),A.placeholder=null),Ke.clear()}function we(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function G(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function de(t,e){t.__nojsElBoundCtx=e}function or(t){t.__nojsElOwnCtx=!0}function At(t){return t.__nojsElOwnCtx===!0}function ie(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Qe(t,e){let r=G(t,"removeCoreDirective");typeof r=="function"?r(e):(G(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function le(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Xe(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Xe(r):e++}return e}function Ze(t,e,r,n){let o=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(o.length===0)return 0;for(let i=0;i<o.length;i++){let s=(o[i].style&&o[i].style.display==="contents"&&o[i].firstElementChild||o[i]).getBoundingClientRect();if(n==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(n==="grid"){let a=s.left+s.width/2,f=s.top+s.height/2;if(r<f&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return o.length}function ar(t,e,r,n){ee();let o;if(r==="auto"){if(o=document.createElement("div"),o.className=n||"nojs-drop-placeholder",A.dragging&&A.dragging.sourceEl){let s=(A.dragging.sourceEl.firstElementChild||A.dragging.sourceEl).getBoundingClientRect();s.height>0&&(o.style.height=s.height+"px"),s.width>0&&(o.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(o=document.createElement("div"),o.style.display="contents",o.className=n||"nojs-drop-placeholder",o.appendChild(c.content.cloneNode(!0))):(o=document.createElement("div"),o.className=n||"nojs-drop-placeholder")}o.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(o):t.insertBefore(o,i[e]),A.placeholder=o}function ee(){A.placeholder&&(A.placeholder.remove(),A.placeholder=null)}function ve(t,e){return!e||e==="*"?!0:e.split(",").map(n=>n.trim()).includes(t)}function ci(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let n=t.style&&t.style.display==="contents"&&t.firstElementChild||t,o=n.getBoundingClientRect(),i=o.width,c=o.height,s=getComputedStyle(n),a=Math.min(e,3);for(let g=a-1;g>=0;g--){let m=document.createElement("div"),u=g*4;if(m.style.cssText="position:absolute;top:"+u+"px;left:"+u+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",g===0){let d=n.cloneNode(!0);for(;d.firstChild;)m.appendChild(d.firstChild);m.style.background=s.backgroundColor||"#fff",m.style.border=s.border,m.style.padding=s.padding,m.style.fontSize=s.fontSize,m.style.color=s.color,m.style.fontFamily=s.fontFamily}else m.style.background=s.backgroundColor||"#fff",m.style.border=s.border||"1px solid #ddd";r.appendChild(m)}let f=document.createElement("div");return f.textContent=e,f.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(f),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var re=null;function di(){return re&&re.isConnected?re:typeof document>"u"||!document.body?null:(re=document.createElement("div"),re.setAttribute("aria-live","assertive"),re.setAttribute("aria-atomic","true"),re.setAttribute("role","status"),re.className="nojs-dnd-live-region",re.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(re),re)}function ce(t){let e=di();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function cr(t){if(ie(t)){t.directive("drag",{priority:15,init(e,r){we(),ir(e,ui(e,r))}});return}Qe(t,"drag"),t.directive("drag",{priority:15,init(e,r,n){we(),ir(e,li(t,e,n))}})}function li(t,e,r){let n=t.findContext(e);de(e,n);let o=e.getAttribute("drag-disabled");return{ctx:n,value:()=>t.evaluate(r,n),disabled:()=>o?t.evaluate(o,n):!1,watchDisabled:i=>le(e,n.$watch(i)),onDispose:i=>le(e,i)}}function ui(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function ir(t,e){let r=t.getAttribute("drag-type")||"default",n=t.getAttribute("drag-effect")||"move",o=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),c=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),a=t.getAttribute("drag-class")||"nojs-dragging",f=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let g=!0;if(o){let l=b=>{g=!!b.target.closest(o)};t.addEventListener("mousedown",l),e.onDispose(()=>t.removeEventListener("mousedown",l))}let m=l=>{if(o&&!g){l.preventDefault();return}if(s&&e.disabled()){l.preventDefault();return}let b=e.value(),v=t.getAttribute("drag-group"),p=b;if(v&&A.selected.has(v)){let x=A.selected.get(v);x.size>0&&[...x].some(E=>E.el===t)&&(p=[...x].map(E=>E.item))}if(A.dragging={item:p,type:r,effect:n,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},l.dataTransfer){if(l.dataTransfer.effectAllowed=n,l.dataTransfer.setData("text/plain",""),Array.isArray(p)&&p.length>1&&l.dataTransfer.setDragImage){let x=ci(t,p.length);document.body.appendChild(x);let y=t.getBoundingClientRect();l.dataTransfer.setDragImage(x,y.width/2,y.height/2),requestAnimationFrame(()=>x.remove())}else if(i&&l.dataTransfer.setDragImage)if(i==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[y,E]=c.split(",").map(Number);l.dataTransfer.setDragImage(x,y||0,E||0),requestAnimationFrame(()=>x.remove())}else{let x=t.querySelector(i);if(x){let[y,E]=c.split(",").map(Number);f&&x.classList.add(f),l.dataTransfer.setDragImage(x,y||0,E||0)}}}if(a.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),Array.isArray(p)&&v&&A.selected.has(v))for(let x of A.selected.get(v))x.el!==t&&a.split(/\s+/).filter(Boolean).forEach(y=>x.el.classList.add(y));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:p,index:A.dragging.sourceIndex,el:t}}))},u=()=>{a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b));let l=t.getAttribute("drag-group");if(l&&A.selected.has(l))for(let b of A.selected.get(l))a.split(/\s+/).filter(Boolean).forEach(v=>b.el.classList.remove(v));if(f&&i&&i!=="none"){let b=t.querySelector(i);b&&b.classList.remove(f)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:A.dragging?.item,index:A.dragging?.sourceIndex,dropped:A.dragging===null}})),A.dragging=null,ee()};if(t.addEventListener("dragstart",m),t.addEventListener("dragend",u),e.onDispose(()=>{t.removeEventListener("dragstart",m),t.removeEventListener("dragend",u)}),s){let l=function(){let b=!!e.disabled();t.draggable=!b,b?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(l)}let d=l=>{if(A.dragging&&!A.dragging.sourceEl.isConnected&&(A.dragging=null),l.key===" "&&!A.dragging){l.preventDefault();let b=e.value();A.dragging={item:b,type:r,effect:n,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},a.split(/\s+/).filter(Boolean).forEach(p=>t.classList.add(p));let v=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${v}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:t}}))}else l.key==="Escape"&&A.dragging&&A.dragging.sourceEl===t&&(l.preventDefault(),a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),ce("Drag cancelled."),A.dragging=null,ee())};t.addEventListener("keydown",d),e.onDispose(()=>t.removeEventListener("keydown",d))}function dr(t){if(ie(t)){t.directive("drop",{priority:15,init(e,r){we(),sr(e,pi(e,r)),mi(e,r)}});return}Qe(t,"drop"),t.directive("drop",{priority:15,init(e,r,n){we(),sr(e,fi(t,e,n))}})}function fi(t,e,r){let n=t.findContext(e);de(e,n);let o=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>o?t.evaluate(o,n):!1,max:()=>i?t.evaluate(i,n):void 0,run(c){let s=G(t,"execStatement");typeof s=="function"?s(r,n,c):(G(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:c=>le(e,c)}}function pi(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function mi(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",n=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(o=>t.classList.remove(o)),n.split(/\s+/).filter(Boolean).forEach(o=>t.classList.remove(o)),A.placeholder&&t.contains(A.placeholder)&&ee()})}function sr(t,e){let r=t.getAttribute("drop-accept")||"default",n=t.getAttribute("drop-effect")||"move",o=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",c=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),a=t.getAttribute("drop-sort"),f=t.getAttribute("drop-placeholder"),g=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",n);let m=0,u=p=>{if(!A.dragging||c&&e.disabled())return;let h=ve(A.dragging.type,r),x=!0;if(s){let y=e.max(),E=Xe(t);typeof y=="number"&&E>=y&&(x=!1)}if(!h||!x){i.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),o.split(/\s+/).filter(Boolean).forEach(y=>t.classList.remove(y)),ee();return}if(i.split(/\s+/).filter(Boolean).forEach(y=>t.classList.remove(y)),p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect=n),a){let y=Ze(t,p.clientX,p.clientY,a);f&&ar(t,y,f,g),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:A.dragging.item,index:y}}))}},d=p=>{if(!A.dragging||c&&e.disabled())return;let h=ve(A.dragging.type,r),x=!0;if(s){let y=e.max(),E=Xe(t);typeof y=="number"&&E>=y&&(x=!1)}h&&x&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect=n)),m++,m===1&&(h&&x?(o.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:A.dragging.item,type:A.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)))},l=p=>{A.dragging&&(m--,m<=0&&(m=0,o.split(/\s+/).filter(Boolean).forEach(h=>t.classList.remove(h)),i.split(/\s+/).filter(Boolean).forEach(h=>t.classList.remove(h)),ee(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:A.dragging.item}}))))},b=p=>{if(p.preventDefault(),p.stopPropagation(),m=0,!A.dragging||c&&e.disabled()||!ve(A.dragging.type,r))return;if(s){let S=e.max(),k=Xe(t);if(typeof S=="number"&&k>=S)return}let h=A.dragging.item,x=A.dragging.type,y=A.dragging.effect,E=0;a&&(E=Ze(t,p.clientX,p.clientY,a)),o.split(/\s+/).filter(Boolean).forEach(S=>t.classList.remove(S)),i.split(/\s+/).filter(Boolean).forEach(S=>t.classList.remove(S)),ee();let L={$drag:h,$dragType:x,$dragEffect:y,$dropIndex:E,$source:{list:A.dragging.sourceList,index:A.dragging.sourceIndex,el:A.dragging.sourceEl},$target:{list:null,index:E,el:t},$el:t};e.run(L),A.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:h,index:E,source:L.$source,target:L.$target,effect:y}}))},v=p=>{A.dragging&&(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),b(p))};t.addEventListener("dragover",u),t.addEventListener("dragenter",d),t.addEventListener("dragleave",l),t.addEventListener("drop",b),t.addEventListener("keydown",v),e.onDispose(()=>{t.removeEventListener("dragover",u),t.removeEventListener("dragenter",d),t.removeEventListener("dragleave",l),t.removeEventListener("drop",b),t.removeEventListener("keydown",v)})}function lr(t){Qe(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,n){we();let o=t.findContext(e);de(e,o);let i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",f=e.getAttribute("drag-type")||"__draglist_"+n,g=e.getAttribute("drop-accept")||f,m=e.hasAttribute("drag-list-copy"),u=e.hasAttribute("drag-list-remove"),d=e.getAttribute("drag-disabled"),l=e.getAttribute("drop-disabled"),b=e.getAttribute("drop-max"),v=e.getAttribute("drop-placeholder"),p=e.getAttribute("drop-placeholder-class"),h=e.getAttribute("drag-class")||"nojs-dragging",x=e.getAttribute("drop-class")||"nojs-drag-over",y=e.getAttribute("drop-reject-class")||"nojs-drop-reject",E=e.getAttribute("drop-settle-class")||"nojs-drop-settle",L=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",m?"copy":"move");let S={listPath:n,ctx:o,el:e};Ke.set(e,S),le(e,()=>Ke.delete(e));let k=0,j=null;function _(){let D=t.resolve(n,o);if(!Array.isArray(D))return;if(D===j&&D.length>0&&e.children.length>0){for(let K of e.children)K.__ctx&&K.__ctx.$notify&&K.__ctx.$notify();return}j=D;let M=i?document.getElementById(i):null;if(!M)return;let F=G(t,"disposeChildren");typeof F=="function"&&F(e),e.innerHTML="";let R=D.length;D.forEach((K,Q)=>{let se={[s]:K,$index:Q,$count:R,$first:Q===0,$last:Q===R-1,$even:Q%2===0,$odd:Q%2!==0},Re=t.createContext(se,o),xt=M.content.cloneNode(!0),B=document.createElement("div");B.style.display="contents",B.__ctx=Re,B.appendChild(xt),e.appendChild(B);let P=B.firstElementChild||B;P.draggable=!0,P.setAttribute("role","option"),P.setAttribute("aria-roledescription","draggable item"),P.getAttribute("tabindex")||P.setAttribute("tabindex","0");let ae=V=>{if(d&&t.evaluate(d,o)){V.preventDefault();return}A.dragging={item:K,type:f,effect:m?"copy":"move",sourceEl:B,sourceCtx:Re,sourceList:D,sourceIndex:Q,listDirective:{el:e,listPath:n,ctx:o,keyProp:c,copyMode:m,removeMode:u}},V.dataTransfer&&(V.dataTransfer.effectAllowed=m?"copy":"move",V.dataTransfer.setData("text/plain","")),h.split(/\s+/).filter(Boolean).forEach(he=>P.classList.add(he));let X=P.getAttribute("aria-label")||P.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${X}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:K,index:Q,el:P}}))},be=()=>{h.split(/\s+/).filter(Boolean).forEach(V=>P.classList.remove(V)),A.dragging&&A.dragging.sourceEl===B&&(A.dragging=null),ee()};B.addEventListener("dragstart",ae),B.addEventListener("dragend",be);let Ye=V=>{if(V.key===" "&&!A.dragging){V.preventDefault(),V.stopPropagation(),A.dragging={item:K,type:f,effect:m?"copy":"move",sourceEl:B,sourceCtx:Re,sourceList:D,sourceIndex:Q,listDirective:{el:e,listPath:n,ctx:o,keyProp:c,copyMode:m,removeMode:u}},h.split(/\s+/).filter(Boolean).forEach(he=>P.classList.add(he));let X=P.getAttribute("aria-label")||P.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${X}. Use arrow keys to reorder.`)}else if(V.key==="Escape"&&A.dragging){V.preventDefault(),V.stopPropagation();let X=e.querySelector(`.${h.split(/\s+/)[0]}`)||P;h.split(/\s+/).filter(Boolean).forEach(he=>X.classList.remove(he)),ce("Reorder cancelled."),A.dragging=null,ee()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&A.dragging&&A.dragging.sourceEl===B){V.preventDefault();let X=B.nextElementSibling;if(X){(X.firstElementChild||X).focus();let Fe=[...e.children].filter(_t=>!_t.classList.contains("nojs-drop-placeholder")),Et=Fe.indexOf(X)+1;ce(`Moved to position ${Et} of ${Fe.length}.`)}}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&A.dragging&&A.dragging.sourceEl===B){V.preventDefault();let X=B.previousElementSibling;if(X){(X.firstElementChild||X).focus();let Fe=[...e.children].filter(_t=>!_t.classList.contains("nojs-drop-placeholder")),Et=Fe.indexOf(X)+1;ce(`Moved to position ${Et} of ${Fe.length}.`)}}};B.addEventListener("keydown",Ye),B.__disposers=B.__disposers||[],B.__disposers.push(()=>B.removeEventListener("dragstart",ae),()=>B.removeEventListener("dragend",be),()=>B.removeEventListener("keydown",Ye)),t.processTree(B)});let $=D.length===0;L.split(/\s+/).filter(Boolean).forEach(K=>e.classList.toggle(K,$))}let w=D=>{if(!A.dragging||l&&t.evaluate(l,o))return;let M=ve(A.dragging.type,g),F=!0;if(b){let $=t.evaluate(b,o),K=t.resolve(n,o);typeof $=="number"&&Array.isArray(K)&&K.length>=$&&(F=!1)}if(!M||!F){y.split(/\s+/).filter(Boolean).forEach($=>e.classList.add($)),x.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),ee();return}y.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect=m?"copy":"move");let R=Ze(e,D.clientX,D.clientY,a);v&&ar(e,R,v,p)},C=D=>{if(!A.dragging||l&&t.evaluate(l,o))return;let M=ve(A.dragging.type,g),F=!0;if(b){let R=t.evaluate(b,o),$=t.resolve(n,o);typeof R=="number"&&Array.isArray($)&&$.length>=R&&(F=!1)}M&&F&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect=m?"copy":"move")),k++,k===1&&(M&&F?(x.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:A.dragging.item,type:A.dragging.type}}))):y.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)))},O=()=>{A.dragging&&(k--,k<=0&&(k=0,x.split(/\s+/).filter(Boolean).forEach(D=>e.classList.remove(D)),y.split(/\s+/).filter(Boolean).forEach(D=>e.classList.remove(D)),ee(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:A.dragging?.item}}))))},Y=D=>{if(D.preventDefault(),D.stopPropagation(),k=0,!A.dragging||l&&t.evaluate(l,o)||!ve(A.dragging.type,g))return;if(b){let B=t.evaluate(b,o),P=t.resolve(n,o);if(typeof B=="number"&&Array.isArray(P)&&P.length>=B)return}let M=A.dragging.item,F=A.dragging.listDirective,R=A.dragging.sourceIndex,$=Ze(e,D.clientX,D.clientY,a);x.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),y.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),ee();let K=t.resolve(n,o);if(!Array.isArray(K))return;let Q=F&&F.el===e;if(Q&&R===$){A.dragging=null;return}if(Q&&R+1===$){A.dragging=null;return}let se=[...K];if(Q){let[B]=se.splice(R,1),P=R<$?$-1:$;se.splice(P,0,B),o.$set(n,se),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:se,item:M,from:R,to:P}}))}else{let B=m&&typeof M=="object"?{...M}:M;if(se.splice($,0,B),o.$set(n,se),F&&!F.copyMode&&(u||F.removeMode)){let P=t.resolve(F.listPath,F.ctx);if(Array.isArray(P)&&R!=null){let ae=P.filter((be,Ye)=>Ye!==R);F.ctx.$set(F.listPath,ae),F.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ae,item:M,index:R}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:se,item:M,from:R,fromList:F?t.resolve(F.listPath,F.ctx):null}}))}let Re=A.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||A.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",xt=Q&&R<$?$:$+1;ce(`Dropped ${Re} at position ${xt}.`),requestAnimationFrame(()=>{let P=[...e.children][Q&&R<$?$-1:$];if(P){let ae=P.firstElementChild||P;E.split(/\s+/).filter(Boolean).forEach(be=>ae.classList.add(be)),ae.addEventListener("animationend",()=>{E.split(/\s+/).filter(Boolean).forEach(be=>ae.classList.remove(be))},{once:!0})}}),A.dragging=null},q=D=>{if(A.dragging&&ve(A.dragging.type,g)&&(D.key==="Enter"||D.key===" ")){D.preventDefault();let M=e.querySelector(":focus");if(M){let R=(M.style?.display==="contents"&&M.firstElementChild||M).getBoundingClientRect(),$={preventDefault(){},stopPropagation(){},clientX:R.left+R.width/2,clientY:R.top+R.height+1,dataTransfer:null};Y($)}}};e.addEventListener("dragover",w),e.addEventListener("dragenter",C),e.addEventListener("dragleave",O),e.addEventListener("drop",Y),e.addEventListener("keydown",q),le(e,()=>{e.removeEventListener("dragover",w),e.removeEventListener("dragenter",C),e.removeEventListener("dragleave",O),e.removeEventListener("drop",Y),e.removeEventListener("keydown",q)});let $e=o.$watch(_);le(e,$e),_()}})}function ur(t){Qe(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let n=t.findContext(e);de(e,n);let o=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!o){(G(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}A.selected.has(o)||A.selected.set(o,new Set);let c=A.selected.get(o),s=f=>{let g=e.getAttribute("drag"),u={item:g?t.evaluate(g,n):null,el:e,ctx:n};if(f.ctrlKey||f.metaKey){let d=[...c].find(l=>l.el===e);d?(c.delete(d),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.remove(l))):(c.add(u),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l)))}else{for(let d of c)i.split(/\s+/).filter(Boolean).forEach(l=>d.el.classList.remove(l));c.clear(),c.add(u),i.split(/\s+/).filter(Boolean).forEach(d=>e.classList.add(d))}};e.addEventListener("click",s),le(e,()=>{e.removeEventListener("click",s);let f=[...c].find(g=>g.el===e);f&&c.delete(f)});let a=f=>{if(f.key==="Escape"){for(let g of c)i.split(/\s+/).filter(Boolean).forEach(m=>g.el.classList.remove(m));c.clear()}};window.addEventListener("keydown",a),le(e,()=>window.removeEventListener("keydown",a))}})}var fr=["drag","drop"];function wt(t,e={}){cr(t),dr(t),!ie(t)&&(lr(t),ur(t))}function pr(){nr()}var Lt=Object.freeze([Object.freeze(["valueMissing","required"]),Object.freeze(["typeMismatch",null]),Object.freeze(["tooShort","minlength"]),Object.freeze(["tooLong","maxlength"]),Object.freeze(["patternMismatch","pattern"]),Object.freeze(["rangeUnderflow","min"]),Object.freeze(["rangeOverflow","max"]),Object.freeze(["stepMismatch","step"])]),et=Object.freeze(Lt.map(([t])=>t)),gr=Object.freeze(["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"]),Pe=Object.freeze({required:"Required",email:"Invalid email",url:"Invalid URL",min:t=>`Minimum value is ${t}`,max:t=>`Maximum value is ${t}`}),La=Object.freeze({valueMissing:"Please fill out this field.",typeMismatch:{email:"Please enter an email address.",url:"Please enter a URL.",number:"Please enter a number."},tooShort:(t,e)=>`Please lengthen this text to ${t} characters or more (you are currently using ${e} characters).`,tooLong:(t,e)=>`Please shorten this text to ${t} characters or less (you are currently using ${e} characters).`,patternMismatch:"Please match the requested format.",rangeUnderflow:t=>`Value must be greater than or equal to ${t}.`,rangeOverflow:t=>`Value must be less than or equal to ${t}.`,stepMismatch:"Please enter a valid value."}),gi=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,br=new Set(["url","min","max"]),bi=Object.freeze(["input","focusout"]);function kt(t){return t==null||String(t).trim()===""}function hi(t){return t!=null&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function vi(t){return t.kind!==void 0?t.kind:t.type==="checkbox"||t.type==="radio"?t.type:null}function yi(t,e){return(e.validateEmpty!=null?e.validateEmpty:t&&t.validateEmpty)==="skip"}function hr(t,e){return e.validateOn?e.validateOn.split(/\s+/):t&&t.validateOn?t.validateOn.split(/\s+/):bi.slice()}function xi(t){return typeof t.perField=="boolean"?t.perField?"field":"form":t.validateOn!=null||t.fields.some(e=>e.validateOn!=null)?"field":"form"}function vr(t){return t.split("|").map(e=>e.trim()).map(e=>{let[r,...n]=e.split(":");return{name:r,args:n}})}function yr(t){return(typeof t=="function"?t():t)||{}}function Ct(t,e,r){let n=t(...e);return r&&hi(n)&&r(),n}function xr(t,e,r,n,o,i){switch(t){case"required":return kt(r)?Pe.required:null;case"email":return r&&!gi.test(r)?Pe.email:null;case"url":try{new URL(r)}catch{return Pe.url}return null;case"min":return Number(r)<Number(e[0])?Pe.min(e[0]):null;case"max":return Number(r)>Number(e[0])?Pe.max(e[0]):null;case"custom":if(e[0]&&n[e[0]]){let c=Ct(n[e[0]],[r,i],o);if(c!==!0&&c)return c}return null;default:return null}}function Ei(t,e,r,n,o={},i){let c=yr(o),s=[],a=new Set,f=r.value,g=kt(f)&&yi(t,e);if(e.rules)for(let{name:u,args:d}of vr(e.rules)){let l=i?()=>i(u):void 0,b=c[u];if(!b&&g&&br.has(u))continue;let v=b?Ct(b,[f,...d,n],l):xr(u,d,f,c,l,n),p=v!==!0&&v?v:null;p&&(s.push({rule:u,message:p}),a.add(u))}let m=r.native;if(m&&m.flags&&m.flags.length)for(let[u,d]of Lt){if(!m.flags.includes(u))continue;let l=d||e.type;a.has(l)||(s.push({rule:l,message:m.message}),a.add(l))}return s}function _i(t,e,r){let n=t.messages?t.messages[String(e).toLowerCase()]:null;if(n)return n;let o=t.error;return o&&!o.startsWith("#")?o:r}function Ai(t,e){let r=t.messages?t.messages[String(e).toLowerCase()]:null;if(r&&r.startsWith("#"))return r;let n=t.error;return n&&n.startsWith("#")?n:null}function mr(t){let e=gr.indexOf(t);return e===-1?999:e}function wi(t,e){if(!t.length)return null;let r=[...t].sort((n,o)=>mr(n.rule)-mr(o.rule))[0];return{rule:r.rule,message:_i(e,r.rule,r.message)}}function Er(t,e,r,n=!1,o={},i){let c=n&&kt(t),s=yr(o);for(let{name:a,args:f}of vr(e)){let g=i?()=>i(a):void 0,m=s[a];if(m){let u=Ct(m,[t,...f,r],g);if(u!==!0&&u)return u}else{if(c&&br.has(a))continue;let u=xr(a,f,t,s,g,r);if(u)return u}}return null}function St(){return{touched:[],dirty:[],formTouched:!1,formDirty:!1,submitting:!1}}function _r(t){let e=t||{},r=Array.isArray(e.touched)?e.touched:[],n=Array.isArray(e.dirty)?e.dirty:[];return{touched:r,dirty:n,formTouched:typeof e.formTouched=="boolean"?e.formTouched:r.length>0,formDirty:typeof e.formDirty=="boolean"?e.formDirty:n.length>0,submitting:!!e.submitting}}function Ar(t,e){return e&&!t.includes(e)?[...t,e]:t}function Je(t,e){return{...t,touched:Ar(t.touched,e),formTouched:!0}}function jt(t,e){return{...t,dirty:Ar(t.dirty,e),formDirty:!0}}function tt(t,e,r){let n=_r(e),{trigger:o,field:i}=r;switch(o){case"submit":return t.fields.reduce((a,f)=>Je(a,f.name),{...n,formTouched:!0});case"submitting":return{...n,submitting:!0};case"endSubmit":return{...n,submitting:!1};case"reset":return St();case"init":return n}if(xi(t)==="form")return o==="input"||o==="change"?jt(n,i):o==="focusout"?Je(n,i):n;let c=t.fields.find(a=>a.name===i);if(!i||!c&&!r.triggers)return n;let s=r.triggers||hr(t,c);if(o==="input")return jt(n,i);if(o==="focusout"){if(s.includes("blur")||s.includes("focusout")){let a=Je(n,i);return s.includes("blur")?jt(a,i):a}return Je(n,i)}return n}function ji(t,e){let r={};return t.fields.forEach((n,o)=>{let i=wr(e,o,n),c=vi(n);c==="checkbox"?r[n.name]=!!i.checked:c==="radio"?i.checked?r[n.name]=i.value:n.name in r||(r[n.name]=""):r[n.name]=i.value}),r}function wr(t,e,r){return(Array.isArray(t)?t[e]:t&&t[r.name])||{value:""}}function Li(t){return typeof t.validateIf=="function"?!!t.validateIf():t.validateIf===void 0?!0:!!t.validateIf}function ki(t,e,r,n){if(e.validateOn==null&&t.validateOn==null)return r||n;let o=hr(t,e),i=o.includes("input"),c=o.includes("blur")||o.includes("focusout")||o.includes("submit");return i&&n||c&&r}function jr(t,e,r,n={},o={}){let i=_r(r),c=new Set(i.touched),s=new Set(i.dirty),a=ji(t,e),f={},g={},m=[],u={},d=[],l={valid:!0,firstError:null,errorCount:0};return t.fields.forEach((b,v)=>{let p=wr(e,v,b),h=c.has(b.name),x=s.has(b.name),y=b.errorClass||t.errorClass||null,E={};if(Li(p)){let S=wi(Ei(t,b,p,a,n,w=>d.push({code:"VALIDATE_ASYNC_UNSUPPORTED",field:b.name,rule:w})),b),k=!S,j=ki(t,b,h,x);k||(l.valid=!1),!k&&j&&(f[b.name]=S.message,l.errorCount++,l.firstError||(l.firstError=S.message));let _={valid:k,dirty:x,touched:h,error:S?S.message:null,value:a[b.name]};g[b.name]=_,Object.assign(E,{name:b.name,excluded:!1,invalid:!k,shown:!k&&j,error:S,errorClass:y,template:S&&j?Ai(b,S.rule):null,as:b.as||null,entry:_})}else{let L={valid:!0,dirty:x,touched:h,error:null,value:a[b.name]};g[b.name]=L,Object.assign(E,{name:b.name,excluded:!0,invalid:!1,shown:!1,error:null,errorClass:y,template:null,as:b.as||null,entry:L})}E.as&&(u[E.as]=E.entry),m.push(E),o.onField&&o.onField(v,E)}),{form:{valid:l.valid,dirty:i.formDirty,touched:i.formTouched,submitting:i.submitting,pending:!1,errors:f,values:a,firstError:l.firstError,errorCount:l.errorCount,fields:g},display:m,aliases:u,warnings:d}}function Lr(t){return!!t.valid&&!t.pending}function kr(t){return!!t.valid&&!t.pending&&!t.submitting}function ze(t,e,r=!1){let n=t.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let o of n)if(o.getAttribute("auto-disable")!=="off"){if(o.hasAttribute("disabled")&&o.getAttribute("disabled")!==""){let i=o.getAttribute("disabled");if(i!=="disabled"&&i!=="true"&&i!=="false")continue}(!r||o.disabled!==!e)&&(o.disabled=!e),o.__autoDisabled=!0}}var Ci=Object.freeze(["focusout"]);function ue(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ir,Br,nt,je,Tt,Cr,rt,Ht,Dt,It,Bt=null;function Si(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function Sr(){return G(Ir,"validators")||{}}function Ti(t){return(t.hasAttribute("validate-empty")?t.getAttribute("validate-empty"):t.closest("form[validate]")?.getAttribute("validate-empty"))==="skip"}function Di(t){let e={};for(let{name:r,value:n}of t.attributes)r.startsWith("error-")&&(e[r.slice(6)]=n);return e}function Ii(t){return{name:t.name,type:(t.getAttribute("type")||"text").toLowerCase(),kind:t.type==="checkbox"||t.type==="radio"?t.type:null,rules:t.getAttribute("validate"),error:t.getAttribute("error"),messages:Di(t),validateOn:t.getAttribute("validate-on"),validateEmpty:t.getAttribute("validate-empty"),errorClass:t.getAttribute("error-class"),as:t.getAttribute("as")}}function Bi(t,e,r,n){return{validateOn:t.getAttribute("validate-on"),validateEmpty:t.getAttribute("validate-empty"),errorClass:r,perField:n,fields:e.map(Ii)}}function Hi(t){let e=t.validity;return!e||e.valid?null:{flags:et.filter(r=>e[r]),message:t.validationMessage}}function Oi(t,e){return{get value(){return t.value},get checked(){return t.checked},get native(){return Hi(t)},validateIf:()=>Or(t,e)}}function Hr(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Mi(t,e,r,n,o){let i=Hr(n);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;Ht(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.setAttribute("aria-live","polite"),a.__errorTemplateFor=n;let f=nt({$error:e,$rule:r,err:{message:e}},o);a.__ctx=f,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Si(a),Tt(a)}function $i(t){let e=Hr(t);e&&(Ht(e),e.remove())}function Or(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Br(r,e)}catch{return!0}}function Ri(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let n=e?e.getAttribute("validate-on"):null;return n?n.split(/\s+/):["input","focusout"]}function Tr(t){return t.hasAttribute("model")?t.tagName==="SELECT"||t.type==="checkbox"||t.type==="radio"?"change":"input":null}function Dr(t,e){return()=>{let r=t.getAttribute("model"),n=t.__gatedDirs&&t.__gatedDirs.some(o=>o.name==="model");if(r&&!n&&It&&(t.type!=="radio"||t.checked)){let o=t.type==="checkbox"?t.checked:t.value;It(`${r} = __val`,je(t),{__val:o})}e()}}function Fi(t){if(t.__ctx)return t.__ctx;let e=null;for(let n=t.parentElement;n;n=n.parentElement)if(n.__ctx){if(!At(n))return je(t);e=n.__ctx;break}let r=nt({},e);return t.__ctx=r,r}var Pi=/^\(\)\s*=>\s*[\w$]+\.removeEventListener\(\s*(["'])submit\1\s*,\s*[\w$]+\s*\)$/;function zi(t){let e=t&&t.fields;if(!e)return!1;let r=e.__nojsStubProbe;return!!r&&Object.isFrozen(r)}function Mr(t){if(!Bt||t.__nojsElBoundCtx!==void 0)return!1;let e=t;for(;e&&!e.__ctx;)e=e.parentElement;if(!e||e!==t&&At(e))return!1;if(t.tagName==="FORM"||t.closest("form")){let r=t.__disposers||[],n=r.length-1;for(;n>=0&&!Pi.test(Function.prototype.toString.call(r[n]).trim());)n--;if(n<0)return!1;r.splice(n,1)[0]()}if(t.tagName!=="FORM"&&!t.closest("form[validate]")){let r=je(t);zi(r.$form)&&delete r.$form}try{Bt(t,"validate",t.getAttribute("validate"))}catch(r){Dt(`directive "validate" init error on <${t.tagName.toLowerCase()}>:`,r)}return!0}function $r(t){Ir=t,Br=t.evaluate,nt=t.createContext,je=t.findContext,Tt=t.processTree,Cr=G(t,"cloneTemplate")||(()=>null),rt=G(t,"disposeChildren")||(()=>{}),Ht=G(t,"disposeTree")||rt,Dt=G(t,"warn")||console.warn,It=G(t,"execStatement");let e=G(t,"removeCoreDirective");typeof e=="function"?e("validate"):Dt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.');let r={priority:30,init(n,o,i){if(n.tagName==="FORM"){let l=function(){s&&typeof s.$notify=="function"&&s.$notify();let _=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT);for(;_.nextNode();){let C=_.currentNode.__ctx;C&&C!==s&&typeof C.$notify=="function"&&C.$notify()}},b=function(){return n.querySelectorAll("input, textarea, select")},v=function(){return[...b()].filter(_=>_.name)},p=function(_=v()){return Bi(n,_,a,m)},h=function(_,w,C){u=tt(p(),u,{trigger:_,field:w,triggers:C})},x=function(){let _=v(),{form:w}=jr(p(_),_.map(C=>Oi(C,s)),u,Sr,{onField:(C,O)=>y(_[C],O)});d.valid=w.valid,d.dirty=w.dirty,d.touched=w.touched,d.submitting=w.submitting,d.errors=w.errors,d.values=w.values,d.fields=w.fields,d.firstError=w.firstError,d.errorCount=w.errorCount,d.pending=w.pending,s.$set("$form",{...d}),l(),E(n)},y=function(_,w){if(w.shown?_.setAttribute("aria-invalid","true"):_.removeAttribute("aria-invalid"),w.errorClass){let C=w.errorClass.split(/\s+/);w.shown?_.classList.add(...C):_.classList.remove(...C)}w.template?Mi(w.template,w.error.message,w.error.rule,_,s):$i(_),w.as&&s.$set(w.as,w.entry)},E=function(_){ze(_,kr(d))},S=function(_,w,C){_.addEventListener(w,C),ue(n,()=>_.removeEventListener(w,C))},k=function(_){if(!_.name)return;let w=Ri(_,n),C=Tr(_);(q=>{if(C==="change"){S(_,"input",Dr(_,q));return}S(_,"input",q),C&&L.push([_,"input",q])})(()=>{h("input",_.name,w),x()});let Y=()=>{h("focusout",_.name,Ci),x()};w.includes("blur")?S(_,"focusout",()=>{Y(),h("input",_.name,w),x()}):S(_,"focusout",Y),w.includes("submit")&&S(_,"focusout",Y)},s=Fi(n);de(n,s),n.setAttribute("novalidate","");let a=n.getAttribute("error-class"),f=n.hasAttribute("validate-on"),g=[...b()].some(_=>_.hasAttribute("validate-on")),m=f||g,u=St(),d={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u=tt(p(),u,{trigger:"reset"}),d.dirty=!1,d.touched=!1,d.pending=!1,d.submitting=!1,n.reset(),x()},endSubmit:()=>{u=tt(p(),u,{trigger:"endSubmit"}),d.submitting=!1,x()}};s.$set("$form",d);let L=[];if(m){for(let _ of b())k(_);if(L.length){let _=!1;ue(n,()=>{_=!0}),queueMicrotask(()=>{if(!_){for(let[w,C,O]of L)w.removeEventListener(C,O),w.addEventListener(C,O);L.length=0}})}}else{let _=O=>{h(O.type==="change"?"change":"input",O.target&&O.target.name),x()},w=O=>{O.target&&Tr(O.target)==="change"?Dr(O.target,()=>_(O))():_(O)};n.addEventListener("input",w),ue(n,()=>n.removeEventListener("input",w)),n.addEventListener("change",_),ue(n,()=>n.removeEventListener("change",_));let C=O=>{h("focusout",O.target&&O.target.name),x()};n.addEventListener("focusout",C),ue(n,()=>n.removeEventListener("focusout",C))}let j=_=>{if(h("submit"),x(),!Lr(d)){_.preventDefault(),_.stopImmediatePropagation();return}h("submitting"),d.submitting=!0,E(n),s.$set("$form",{...d}),l()};n.addEventListener("submit",j,!0),ue(n,()=>n.removeEventListener("submit",j,!0)),n.__nojsResetSubmitting=()=>{h("endSubmit"),d.submitting=!1,x()},ue(n,()=>{delete n.__nojsResetSubmitting}),requestAnimationFrame(x);return}let c=je(n);if(de(n,c),i&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT")){let s=!!n.closest("form[validate]"),a=s?null:n.getAttribute("error"),f=()=>{if(s&&!Or(n,je(n))){n.removeAttribute("aria-invalid");return}let g=Er(n.value,i,{},Ti(n),Sr);if(g?n.setAttribute("aria-invalid","true"):n.removeAttribute("aria-invalid"),g&&a){let m=n.nextElementSibling?.__validationError?n.nextElementSibling:null;m||(m=document.createElement("div"),m.__validationError=!0,m.style.display="contents",n.parentNode.insertBefore(m,n.nextSibling));let u=Cr(a);if(u){let d=nt({err:{message:g}},c);rt(m),m.innerHTML="",m.__ctx=d,m.appendChild(u),Tt(m)}}else{let m=n.nextElementSibling?.__validationError?n.nextElementSibling:null;m&&(rt(m),m.innerHTML="")}};n.addEventListener("input",f),ue(n,()=>n.removeEventListener("input",f))}}};Bt=r.init,t.directive("validate",r)}var Rr=300,Fr="data-nj-validate",ot="data-nj-form-state",qi="data-nj-validate-init",Ot="data-nj-validate-pending",Pr="input, textarea, select";function zr(t){return[...t.querySelectorAll(Pr)].filter(e=>e.name&&(e.type||"").toLowerCase()!=="file")}function Vi(t){let e={},r={};for(let n of zr(t)){n.type==="checkbox"?e[n.name]=n.checked:n.type==="radio"?n.checked?e[n.name]=n.value:n.name in e||(e[n.name]=""):e[n.name]=n.value;let o=n.validity;if(o&&!o.valid&&!(n.name in r)){let i=et.filter(c=>o[c]);i.length&&(r[n.name]={flags:i,message:n.validationMessage})}}return{values:e,native:r}}function Mt(t,e){let r=e.value(t,ot);return r&&typeof r=="object"?r:null}function Ni(t,e){let r=t.getAttribute(Fr);if(!r){e.warn("form[validate] has no validate action: the site was built without a validation engine; the server refuses its submits.");return}t.setAttribute("novalidate","");let n=t.ownerDocument.defaultView,o=[...t.querySelectorAll(Pr)],i=t.hasAttribute("validate-on")||o.some(y=>y.hasAttribute("validate-on")),c=()=>new Set(zr(t).map(y=>y.name)),s=null,a=null,f=!1,g=!1,m=Mt(t,e)?.reset??0;function u(){if(s!==null||f){ze(t,!0,!0);return}let y=Mt(t,e);y&&ze(t,!!y.valid&&!y.pending&&!y.submitting,!0)}function d(){let y=Mt(t,e);y&&typeof y.reset=="number"&&y.reset>m&&(m=y.reset,t.reset()),u()}function l(y,E){let{values:L,native:S}=Vi(t),k={trigger:y};E&&c().has(E)&&(k.field=E),k.values=L,Object.keys(S).length&&(k.native=S),f=!0,t.setAttribute(Ot,""),e.exec(r,k)}function b(){if(s===null)return;n.clearTimeout(s),s=null;let y=a;a=null,l(y.trigger,y.field)}function v(y,E){s!==null&&a.field!==E&&b(),s!==null&&n.clearTimeout(s),a={trigger:y,field:E},s=n.setTimeout(()=>{s=null;let L=a;a=null,l(L.trigger,L.field)},Rr),u()}function p(y,E){b(),l(y,E),u()}function h(y,E,L,S=!1){y.addEventListener(E,L,S),e.onDispose(t,()=>y.removeEventListener(E,L,S))}if(!i)h(t,"input",y=>v("input",y.target&&y.target.name)),h(t,"change",y=>v("change",y.target&&y.target.name)),h(t,"focusout",y=>p("focusout",y.target&&y.target.name));else for(let y of o)y.name&&(h(y,"input",()=>v("input",y.name)),h(y,"focusout",()=>p("focusout",y.name)));h(n,"submit",y=>{y.target===t&&b()},!0);let x=new n.MutationObserver(y=>{g||(f&&!t.hasAttribute(Ot)&&(f=!1),y.some(E=>E.attributeName===ot)?d():u())});x.observe(t,{attributes:!0,subtree:!0,attributeFilter:[Ot,ot,"disabled"]}),e.watch(t,ot,d),e.onDispose(t,()=>{g=!0,x.disconnect(),s!==null&&n.clearTimeout(s),s=null}),u(),t.hasAttribute(qi)&&queueMicrotask(()=>{g||p("init")})}function Ui(t,e){let r=t.getAttribute(Fr);if(!r)return;let n=t.ownerDocument.defaultView,o=null,i=()=>{o!==null&&n.clearTimeout(o),o=n.setTimeout(()=>{o=null,e.exec(r,{trigger:"input",value:t.value})},Rr)};t.addEventListener("input",i),e.onDispose(t,()=>{t.removeEventListener("input",i),o!==null&&n.clearTimeout(o)})}function qr(t){t.directive("validate",{priority:30,init(e,r){if(e.tagName==="FORM"){Ni(e,r);return}e.closest("form[validate]")||(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT")&&Ui(e,r)}})}function $t(t,e={}){if(ie(t)){qr(t);return}$r(t)}function Vr(){}var Le=new Map,J=new Map;function Nr(){let t=Array.from(Le.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let n of r)try{n()}catch{}e.__disposers=[]}}for(let e of J.values())clearTimeout(e);J.clear();for(let e of Le.values())e.remove();Le.clear()}function Ur(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Gi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var it=8;function Wr(t,e,r){let n=e.getBoundingClientRect(),o=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=n.bottom+it,a=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,a=n.left-o.width-it;break;case"right":s=n.top+(n.height-o.height)/2,a=n.right+it;break;default:s=n.top-o.height-it,a=n.left+(n.width-o.width)/2;break}a<4&&(a=4),a+o.width>i-4&&(a=i-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Wi=0;function Yi(t,e,r){document.body.appendChild(e),Wr(e,t,r),e.setAttribute("aria-hidden","false")}function Gr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Ki(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Yr(t){t.directive("tooltip",{priority:20,init(e,r,n){Ur();let o=n;if(!o){Ki(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),f=a?t.findContext(e):null,g=()=>{if(!a||!f)return!1;try{return!!t.evaluate(a,f)}catch{return!1}},m=`nojs-tooltip-${++Wi}`,u=document.createElement("div");u.className="nojs-tooltip",u.setAttribute("role","tooltip"),u.setAttribute("id",m),u.setAttribute("aria-hidden","true"),u.textContent=o,e.setAttribute("aria-describedby",m),Le.set(e,u);let d=!1,l=0,b=()=>{!d||!e.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!d||!e.isConnected)&&Wr(u,e,i)}))},v=()=>{window.addEventListener("scroll",b,!0),window.addEventListener("resize",b)},p=()=>{window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),l&&(cancelAnimationFrame(l),l=0)},h=()=>{d||(Yi(e,u,i),d=!0,v())},x=()=>{if(!d){Gr(e,u);return}p(),Gr(e,u),d=!1},y=()=>{if(g())return;J.has(e)&&clearTimeout(J.get(e));let C=setTimeout(()=>{J.delete(e),!g()&&e.isConnected&&h()},s);J.set(e,C)},E=()=>{J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),x()},L=()=>y(),S=()=>E(),k=()=>y(),j=()=>E(),_=C=>{C.key==="Escape"&&u.getAttribute("aria-hidden")==="false"&&E()};e.addEventListener("mouseenter",L),e.addEventListener("mouseleave",S),e.addEventListener("focusin",k),e.addEventListener("focusout",j),e.addEventListener("keydown",_);let w=null;if(a&&f&&typeof f.$watch=="function"){let C=()=>{d&&g()&&x()};w=f.$watch(C)}Gi(e,()=>{e.removeEventListener("mouseenter",L),e.removeEventListener("mouseleave",S),e.removeEventListener("focusin",k),e.removeEventListener("focusout",j),e.removeEventListener("keydown",_),w&&(w(),w=null),p(),J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),d=!1,u.remove(),Le.delete(e)})}})}function Kr(t,e={}){Yr(t)}function Xr(){Nr()}var W=new Map;function Zr(){W.clear()}function st(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function Rt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ke(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function Pt(t){try{return t.matches(":popover-open")}catch{return!1}}var fe=8;function at(t,e,r){let n=e.getBoundingClientRect(),o=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=n.top-o.height-fe,a=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,a=n.left-o.width-fe;break;case"right":s=n.top+(n.height-o.height)/2,a=n.right+fe;break;default:s=n.bottom+fe,a=n.left+(n.width-o.width)/2;break}r==="bottom"&&s+o.height>c&&(s=n.top-o.height-fe),r==="top"&&s<0&&(s=n.bottom+fe),r==="right"&&a+o.width>i&&(a=n.left-o.width-fe),r==="left"&&a<0&&(a=n.right+fe),a<4&&(a=4),a+o.width>i-4&&(a=i-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function Ft(t,e){t._untrack&&t._untrack();let r=0,n=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(!Pt(c)){i();return}at(c,e,t.position)},o=()=>{r||(r=requestAnimationFrame(n))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o),t._untrack=null};return window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),t._untrack=i,i}function ye(t){t&&t._untrack&&t._untrack()}function Qr(t){t.directive("popover",{priority:20,init(r,n,o){st();let i=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!W.has(i))W.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=W.get(i);a.popoverEl=r,a.position=c}let s=a=>{let f=W.get(i);if(!f)return;let g=a.newState==="open";f.open=g;for(let m of f.triggerEls)m.setAttribute("aria-expanded",String(g));g||(r.style.visibility="",ye(f))};r.addEventListener("toggle",s),Rt(r,()=>{r.removeEventListener("toggle",s);let a=W.get(i);a&&(ye(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&W.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,n,o){st();let i=o;if(!i){let a=r.closest("[use]")||r.parentElement,f=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(f&&(i=f.getAttribute("data-popover-id")||f.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),W.has(i)||W.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),W.get(i).triggerEls.add(r);let c=a=>{let f=W.get(i);if(!f||!f.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(ke(f.popoverEl)){f.popoverEl.style.visibility="hidden";try{f.popoverEl.togglePopover(),Pt(f.popoverEl)?(at(f.popoverEl,r,f.position),Ft(f,r)):ye(f)}finally{f.popoverEl.style.visibility=""}}};r.addEventListener("click",c);let s=a=>{let f=W.get(i);a.key==="Escape"&&f?.open&&(ke(f.popoverEl,"hidePopover")&&f.popoverEl.hidePopover(),ye(f),r.focus())};document.addEventListener("keydown",s),Rt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=W.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(ye(a),W.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){st();let n=()=>{let o=r.closest(".nojs-popover");!o||!ke(o,"hidePopover")||o.hidePopover()};r.addEventListener("click",n),Rt(r,()=>r.removeEventListener("click",n))}});let e=(r,n)=>e.open(r,n);e.open=(r,n)=>{let o=W.get(r);if(!o||!o.popoverEl||!ke(o.popoverEl,"showPopover"))return!1;o.popoverEl.style.visibility="hidden";try{o.popoverEl.showPopover();let i=n||[...o.triggerEls][0];i&&(at(o.popoverEl,i,o.position),Ft(o,i))}catch{return!1}finally{o.popoverEl.style.visibility=""}return!0},e.close=r=>{let n=W.get(r);if(!n||!n.popoverEl||!ke(n.popoverEl,"hidePopover"))return!1;try{n.popoverEl.hidePopover()}catch{}return ye(n),!0},e.toggle=(r,n)=>{let o=W.get(r);if(!o||!o.popoverEl||!ke(o.popoverEl))return!1;o.popoverEl.style.visibility="hidden";try{o.popoverEl.togglePopover();let i=n||[...o.triggerEls][0];i&&Pt(o.popoverEl)?(at(o.popoverEl,i,o.position),Ft(o,i)):ye(o)}finally{o.popoverEl.style.visibility=""}return!0},t.popover=e}function Jr(t,e={}){Qr(t)}function en(){Zr()}var N=[],ne=new Map,Xi=1e4;function tn(){return Xi+N.length}function rn(){N.length=0,ne.clear()}function Ce(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Zi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var on='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',zt=new WeakMap;function Qi(t){let e=r=>{if(r.key!=="Tab")return;let n=[...t.querySelectorAll(on)].filter(c=>c.offsetParent!==null);if(n.length===0){r.preventDefault();return}let o=n[0],i=n[n.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),o.focus())};t.addEventListener("keydown",e),zt.set(t,e)}function nn(t){let e=zt.get(t);e&&(t.removeEventListener("keydown",e),zt.delete(t))}var qe=new WeakMap;function sn(t){t.directive("modal",{priority:10,init(r,n,o){Ce();let i=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),g=u=>{u.target===r&&s!=="false"&&f!=="false"&&Se(r,i)};r.addEventListener("click",g),ne.set(i,r);let m=u=>{if(u.newState==="open"){if(r.style.zIndex=String(tn()),a&&a.split(/\s+/).filter(Boolean).forEach(d=>r.classList.add(d)),requestAnimationFrame(()=>{if(!r.isConnected||!N.some(l=>l.el===r))return;let d=r.querySelector(on);d?d.focus():r.focus()}),Qi(r),f!=="false"){let d=l=>{l.key==="Escape"&&(l.stopPropagation(),Se(r,i))};r.addEventListener("keydown",d),qe.set(r,d)}}else if(u.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(b=>r.classList.remove(b)),nn(r);let d=qe.get(r);d&&(r.removeEventListener("keydown",d),qe.delete(r));let l=N.findIndex(b=>b.el===r);if(l===-1&&(l=N.findIndex(b=>b.id===i)),l!==-1){let b=N[l];N.splice(l,1),b.triggerEl&&requestAnimationFrame(()=>{b.triggerEl.focus()})}}};r.addEventListener("toggle",m),Zi(r,()=>{r.removeEventListener("click",g),r.removeEventListener("toggle",m),nn(r);let u=qe.get(r);u&&(r.removeEventListener("keydown",u),qe.delete(r)),ne.delete(i);let d=N.findIndex(l=>l.el===r);d===-1&&(d=N.findIndex(l=>l.id===i)),d!==-1&&N.splice(d,1)})}});let e=r=>e.open(r);e.open=r=>{let n=ne.get(r);if(!n)return!1;try{n.showPopover()}catch{return!1}return N.some(o=>o.id===r)||N.push({id:r,el:n,triggerEl:null}),!0},e.close=r=>{let n=ne.get(r);return n?(Se(n,r),!0):!1},e.closeAll=()=>{for(let r=N.length-1;r>=0;r--)Se(N[r].el,N[r].id)},t.modal=e}function Se(t,e){try{t.hidePopover()}catch{}}function an(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ji(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function cn(t){t.directive("modal-open",{priority:10,init(e,r,n){Ce();let o=n;if(!o){let m=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(m&&(o=m.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let g=ne.get(o)||Ji(o);if(!g){console.warn(`[modal-open] modal "${o}" not found`);return}let m=N.some(u=>u.id===o);g.id&&e.setAttribute("aria-controls",g.id);try{g.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`);return}m||N.push({id:o,el:g,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,f=()=>{let g=ne.get(o);return g?(a=g,s=m=>{m.newState==="closed"&&e.setAttribute("aria-expanded","false")},g.addEventListener("toggle",s),!0):!1};if(!f()){let g=requestAnimationFrame(f);an(e,()=>cancelAnimationFrame(g))}e.addEventListener("click",i),an(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function es(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function dn(t){t.directive("modal-close",{priority:10,init(e,r,n){Ce();let o=()=>{let i,c;if(n){if(c=n,i=ne.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Se(i,c)};e.addEventListener("click",o),es(e,()=>{e.removeEventListener("click",o)})}})}function ln(t,e={}){sn(t),cn(t),dn(t)}function un(){rn()}var te={openMenus:new Map},z={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function fn(){te.openMenus.clear(),z.installed=!1,z.instanceCount=0,z.outsideClickHandler=null,z.escHandler=null}function Te(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var ts=0;function rs(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ns(){z.installed||(z.outsideClickHandler=t=>{let e=[...te.openMenus.entries()];for(let[r,{toggle:n,wrapper:o}]of e)if(!o.contains(t.target)){if(r.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}te.openMenus.delete(r)}},z.escHandler=t=>{if(t.key!=="Escape")return;let e=[...te.openMenus.entries()];for(let[r,{toggle:n}]of e){if(r.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}n.focus()}te.openMenus.clear()},document.addEventListener("click",z.outsideClickHandler,!0),document.addEventListener("keydown",z.escHandler),z.installed=!0)}function Vt(){z.installed&&(document.removeEventListener("click",z.outsideClickHandler,!0),document.removeEventListener("keydown",z.escHandler),z.outsideClickHandler=null,z.escHandler=null,z.installed=!1)}function pn(t,e,r){let n=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,f,g;switch(n){case"top":f=i.top-c.height,g=i.left;break;case"left":f=i.top,g=i.left-c.width;break;case"right":f=i.top,g=i.right;break;default:f=i.bottom,g=i.left}n==="bottom"||n==="top"?o==="end"&&(g=i.right-c.width):o==="end"&&(f=i.bottom-c.height),n==="bottom"&&f+c.height>s&&i.top-c.height>0?f=i.top-c.height:n==="top"&&f<0&&i.bottom+c.height<=s&&(f=i.bottom),g<4&&(g=4),g+c.width>a-4&&(g=a-c.width-4),t.style.top=`${f}px`,t.style.left=`${g}px`}function Nt(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function qt(t){let e=Nt(t);e.length&&e[0].focus()}function mn(t){let e=Nt(t);e.length&&e[e.length-1].focus()}function gn(t){t.directive("dropdown",{priority:15,init(r){Te()}}),t.directive("dropdown-toggle",{priority:15,init(r){Te();let n=r.closest("[dropdown]");if(!n)return;let o=n.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${ts++}`),r.setAttribute("aria-controls",o.id);let i=!1,c=typeof o.showPopover=="function"&&typeof o.hidePopover=="function";function s(){if(o.setAttribute("data-open",""),c&&!i)try{o.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),pn(o,r,n),te.openMenus.set(o,{toggle:r,wrapper:n})}function a(){if(c&&i){i=!1;try{o.hidePopover()}catch{}}o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),te.openMenus.delete(o)}function f(){return r.getAttribute("aria-expanded")==="true"}let g=b=>{b.newState==="closed"&&f()&&a()};o.addEventListener("toggle",g);let m=b=>{b.preventDefault(),b.stopPropagation(),f()?a():s()};r.addEventListener("click",m),z.instanceCount++,ns();let u=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),qt(o);break;case"ArrowDown":b.preventDefault(),s(),qt(o);break;case"ArrowUp":b.preventDefault(),s(),mn(o);break}};r.addEventListener("keydown",u);let d=b=>{if(!(!f()||Nt(o).find(h=>h===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),qt(o);break;case"ArrowUp":b.preventDefault(),mn(o);break}};o.addEventListener("keydown",d);let l=()=>{f()&&pn(o,r,n)};window.addEventListener("scroll",l,!0),window.addEventListener("resize",l),rs(r,()=>{r.removeEventListener("click",m),r.removeEventListener("keydown",u),o.removeEventListener("keydown",d),o.removeEventListener("toggle",g),window.removeEventListener("scroll",l,!0),window.removeEventListener("resize",l),te.openMenus.delete(o),z.instanceCount--,z.instanceCount<=0&&(z.instanceCount=0,Vt())})}}),t.directive("dropdown-menu",{priority:15,init(r){Te(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function bn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function os(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Ut(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),te.openMenus.has(t)&&te.openMenus.delete(t)}function hn(t){t.directive("dropdown-item",{priority:15,init(e){Te();let r=e.closest("[dropdown-menu]"),n=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let o=c=>{if(!r)return;let s=os(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),Ut(r,n),n){let f=n.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{Ut(r,n);break}}};e.addEventListener("keydown",o),bn(e,()=>e.removeEventListener("keydown",o));let i=()=>{if(Ut(r,n),n){let c=n.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),bn(e,()=>e.removeEventListener("click",i))}})}function vn(t,e={}){gn(t),hn(t)}function yn(){Vt(),fn()}var oe=new Map,De=new Set,xn=0;function En(){return++xn}function _n(){for(let t of De)clearTimeout(t);De.clear();for(let t of oe.values())t.remove();oe.clear(),xn=0}function An(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Gt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var is=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Wt(){return oe.size>0?oe.values().next().value:ss("top-right")}function ss(t){if(oe.has(t))return oe.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),oe.set(t,e),e}function as(t){return t.startsWith("top")}function Yt(t,e,r,n,o){let i=En(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),o){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>ct(s)),s.appendChild(f)}if(as(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),n>0){let f=setTimeout(()=>{De.delete(f),s.isConnected&&ct(s)},n);De.add(f),s._toastTimerId=f}return s}function ct(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),De.delete(t._toastTimerId)),t.remove())}function wn(t){An(),t.directive("toast-container",{priority:10,init(r,n,o){let i=o&&is.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),oe.set(i,r),Gt(r,()=>{oe.get(i)===r&&oe.delete(i)})}}),t.directive("toast",{priority:10,init(r,n,o){if(!o)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let b=Wt();Yt(b,o,i,s,a)};r.addEventListener("click",l),Gt(r,()=>r.removeEventListener("click",l));return}let g=t.findContext(r);if(!g||typeof g.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let m;function u(){let l=t.evaluate(o,g);if(l&&l!==m){let b=typeof l=="string"?l:String(l),v=Wt();Yt(v,b,i,s,a),m=l}else m=l}let d=g.$watch(u);Gt(r,d)}});let e=(r,n="info",o=3e3)=>{if(typeof document>"u")return;let i=!0,c=Wt();return Yt(c,String(r),n,o,i)};e.dismiss=r=>{let n=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),o=document.querySelector(`[data-toast-id="${n}"]`);o&&ct(o)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>ct(r))},t.toast=e,t.global("toast",e)}function jn(t,e={}){wn(t)}function Ln(){_n()}var xe={containers:new Map};function kn(){xe.containers.clear()}function Cn(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function cs(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ds=0;function Sn(t){return`${t}-${++ds}`}function Ve(t,e,r=!1){let n=xe.containers.get(t);if(!n)return;let{tabs:o,panels:i}=n;if(!(e<0||e>=o.length)&&!(!r&&o[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<o.length;c++)o[c].setAttribute("aria-selected","false"),o[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;o[e].setAttribute("aria-selected","true"),o[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,n.activeIndex=e}}function Ne(t,e,r){let n=t.length,o=e;for(let i=0;i<n;i++)if(o=(o+r+n)%n,t[o].getAttribute("aria-disabled")!=="true")return o;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Tn(t){t.directive("tabs",{priority:10,init(e,r,n){Cn();let o=[],i=[];for(let p of Array.from(e.children))p.hasAttribute("tab")?o.push(p):p.hasAttribute("panel")&&i.push(p);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==i.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(o.length,i.length);for(let p=0;p<a;p++){let h=o[p],x=i[p],y=h.id||Sn("nojs-tab"),E=x.id||Sn("nojs-panel");h.id=y,x.id=E,h.setAttribute("role","tab"),h.setAttribute("aria-selected","false"),h.setAttribute("aria-controls",E),h.setAttribute("tabindex","-1"),h.classList.add("nojs-tab"),x.setAttribute("role","tabpanel"),x.setAttribute("aria-labelledby",y),x.setAttribute("tabindex","0"),x.setAttribute("aria-hidden","true"),x.inert=!0,x.classList.add("nojs-panel"),s.appendChild(h)}for(let p=a;p<i.length;p++){let h=i[p];h.setAttribute("role","tabpanel"),h.setAttribute("aria-hidden","true"),h.inert=!0,h.classList.add("nojs-panel")}let f=i[0];f?e.insertBefore(s,f):e.appendChild(s),xe.containers.set(e,{tabs:o.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let g=t.findContext(e),m=[],u=(p,h)=>{let x=!1;try{x=!!t.evaluate(h,g)}catch{x=!1}x?p.setAttribute("aria-disabled","true"):p.removeAttribute("aria-disabled")};for(let p=0;p<a;p++){let h=o[p],x=h.getAttribute("tab-disabled");if(x&&(u(h,x),g&&typeof g.$watch=="function")){let y=g.$watch(()=>u(h,x));m.push(y)}}let d=0;if(n&&n.trim()!==""){let p=parseInt(n,10);!isNaN(p)&&p>=0&&p<a&&(d=p)}let l=o.slice(0,a);if(o[d]?.getAttribute("aria-disabled")==="true"){let p=Ne(l,d,1);p!==-1?(d=p,Ve(e,d)):Ve(e,d,!0)}else Ve(e,d);let b=p=>{let h=xe.containers.get(e);if(!h)return;let x=p.target;if(x.getAttribute("role")!=="tab")return;let{tabs:y}=h,E=y.indexOf(x);if(E===-1)return;let L=-1;switch(p.key){case"ArrowRight":case"ArrowDown":L=Ne(y,E,1);break;case"ArrowLeft":case"ArrowUp":L=Ne(y,E,-1);break;case"Home":L=Ne(y,y.length-1,1);break;case"End":L=Ne(y,0,-1);break;case"Tab":return;default:return}L!==-1&&L!==E&&(p.preventDefault(),Ve(e,L),y[L].focus())};s.addEventListener("keydown",b);let v=p=>{let h=p.target.closest("[role='tab']");if(!h)return;let x=xe.containers.get(e);if(!x)return;let y=x.tabs.indexOf(h);y!==-1&&h.getAttribute("aria-disabled")!=="true"&&(Ve(e,y),h.focus())};s.addEventListener("click",v),cs(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",v);for(let p of m)p&&p();m.length=0,xe.containers.delete(e)})}})}function Dn(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function In(t){t.directive("panel",{priority:11,init(){}})}function Bn(t,e={}){Tn(t),Dn(t),In(t)}function Hn(){kn()}var H={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function On(){H.branches.clear(),H.selectedItem=null,H.typeahead="",H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null)}function Ie(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function Be(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Mn(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n;for(;n=r.nextNode();)e.push(n);return e}function $n(t){return t.closest('[role="tree"]')}function ls(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let n=e.previousElementSibling;if(n?.matches?.('[role="treeitem"]'))return n}return t.parentElement?.closest('[role="treeitem"]')||null}function us(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(n=>n.remove()),(e.textContent||"").trim().toLowerCase()}function Kt(t){let e=H.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),H.selectedItem=t}function Rn(t){let e=H.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function fs(t){let e=H.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function ps(t){let e=H.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Fn(t,e){let r=$n(e);if(!r)return;let n=Mn(r),o=n.indexOf(e);if(o<0)return;let i=H.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)fs(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&Ee(s,n)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)ps(e);else{let s=ls(e);s&&Ee(s,Mn(r))}break;case"ArrowDown":t.preventDefault(),o<n.length-1&&Ee(n[o+1],n);break;case"ArrowUp":t.preventDefault(),o>0&&Ee(n[o-1],n);break;case"Enter":case" ":t.preventDefault(),Kt(e),c&&Rn(e);break;case"Home":t.preventDefault(),n.length>0&&Ee(n[0],n);break;case"End":t.preventDefault(),n.length>0&&Ee(n[n.length-1],n);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),H.typeahead+=t.key.toLowerCase(),H.typeaheadTimer&&clearTimeout(H.typeaheadTimer),H.typeaheadTimer=setTimeout(()=>{H.typeahead="",H.typeaheadTimer=null},500);let s=o+1;for(let a=0;a<n.length;a++){let f=(s+a)%n.length;if(us(n[f]).startsWith(H.typeahead)){Ee(n[f],n);break}}}break}}function Pn(t){t.directive("tree",{priority:15,init(e){Ie(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function zn(t){t.directive("branch",{priority:16,init(e,r,n){Ie();let o=n==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(o));let i=$n(e);if(i){let f=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",f?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let f=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);f?(H.branches.set(e,{expanded:o,subtreeEl:f}),f.setAttribute("aria-hidden",String(!o))):H.branches.set(e,{expanded:o,subtreeEl:null})});let s=f=>{f.target.closest?.('[role="treeitem"]')===e&&(f.stopPropagation(),Kt(e),Rn(e))};e.addEventListener("click",s),Be(e,()=>e.removeEventListener("click",s));let a=f=>{Fn(f,e)};e.addEventListener("keydown",a),Be(e,()=>e.removeEventListener("keydown",a)),Be(e,()=>{c=!0,H.branches.delete(e),H.selectedItem===e&&(H.selectedItem=null),H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null,H.typeahead="")})}})}function Ee(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function qn(t){t.directive("subtree",{priority:16,init(e){Ie(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let n of e.children)if(n.tagName==="LI"&&!n.querySelector("[branch], .nojs-branch")){n.setAttribute("role","treeitem"),n.setAttribute("tabindex","-1"),n.classList.add("nojs-tree-leaf");let o=c=>{c.stopPropagation(),Kt(n)};n.addEventListener("click",o),Be(n,()=>n.removeEventListener("click",o));let i=c=>{Fn(c,n)};n.addEventListener("keydown",i),Be(n,()=>n.removeEventListener("keydown",i)),Be(n,()=>{H.selectedItem===n&&(H.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let n=H.branches.get(r);n?(e.setAttribute("aria-hidden",String(!n.expanded)),n.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Vn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Xt(t){return t.closest('[role="treeitem"]')}function ms(t){return t.closest('[role="tree"]')}function gs(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function bs(t){return gs(t).indexOf(t)}function hs(t,e,r){let n=t.getBoundingClientRect(),o=e-n.top,i=n.height;return r==="reparent"?"on":r==="reorder"?o<i/2?"before":"after":o<i*.25?"before":o>i*.75?"after":"on"}function Nn(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var I={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function He(){I.indicator&&(I.indicator.remove(),I.indicator=null)}function Ue(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function vs(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function ys(t,e){He();let r=vs(),n=t.getBoundingClientRect(),o=ms(t);if(!o)return;let i=o.getBoundingClientRect();r.style.position="absolute",r.style.left=n.left-i.left+"px",r.style.width=n.width+"px",e==="before"?r.style.top=n.top-i.top-1+"px":r.style.top=n.bottom-i.top-1+"px",getComputedStyle(o).position==="static"&&(o.style.position="relative"),o.appendChild(r),I.indicator=r}function Un(t){t.directive("tree-drag-mode",{priority:15,init(e,r,n){if(Ie(),n!=="reparent"&&n!=="reorder"&&n!=="both")return;let o=0,i=u=>{let d=Xt(u.target);if(d&&e.contains(d)){if(d.hasAttribute("tree-drag-disabled")){u.preventDefault();return}I.dragging={el:d,treeRoot:e},u.dataTransfer&&(u.dataTransfer.effectAllowed="move",u.dataTransfer.setData("text/plain","")),d.classList.add("nojs-dragging"),d.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:d}}))}},c=u=>{if(!I.dragging||I.dragging.treeRoot!==e)return;let d=Xt(u.target);if(!d||!e.contains(d)||d===I.dragging.el||Nn(d,I.dragging.el))return;u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move");let l=hs(d,u.clientY,n);(I.currentTarget!==d||I.currentPosition!==l)&&(Ue(e),He(),I.currentTarget=d,I.currentPosition=l,l==="on"?d.classList.add("nojs-tree-drag-over"):ys(d,l))},s=u=>{I.dragging&&I.dragging.treeRoot===e&&(o++,c(u))},a=u=>{I.dragging&&(o--,o<=0&&(o=0,Ue(e),He(),I.currentTarget=null,I.currentPosition=null))},f=u=>{if(u.preventDefault(),u.stopPropagation(),o=0,!I.dragging||I.dragging.treeRoot!==e)return;let d=I.dragging.el,l=I.currentTarget,b=I.currentPosition;if(Ue(e),He(),!l||!b){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(l===d||Nn(l,d)){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="on"){let v=l.querySelector(':scope > [role="group"]');v||(v=l.nextElementSibling?.matches?.('[role="group"]')?l.nextElementSibling:null),v?v.setAttribute("aria-hidden","false"):(v=document.createElement("ul"),v.setAttribute("role","group"),v.setAttribute("subtree",""),v.classList.add("nojs-subtree","nojs-tree"),v.setAttribute("aria-hidden","false"),l.appendChild(v));let p=H.branches.get(l);p&&(p.expanded=!0,p.subtreeEl=v,l.setAttribute("aria-expanded","true")),v.appendChild(d),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:d,newParent:l}}))}else{let v=l.parentElement;if(!v){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="before")v.insertBefore(d,l);else{let h=l.nextElementSibling,x=h?.matches?.('[role="group"]')?h.nextElementSibling:h;x?v.insertBefore(d,x):v.appendChild(d)}let p=bs(d);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:d,newIndex:p}}))}I.dragging=null,I.currentTarget=null,I.currentPosition=null},g=u=>{let d=Xt(u.target),l=I.dragging?.el||(d?.classList.contains("nojs-dragging")?d:null);d&&d.classList.remove("nojs-dragging"),Ue(e),He(),o=0,l&&l.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:l}})),I.dragging=null,I.currentTarget=null,I.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",f),e.addEventListener("dragend",g),Vn(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",f),e.removeEventListener("dragend",g),Ue(e),He()}),xs(e);let m=new MutationObserver(u=>{for(let d of u){if(d.type==="attributes"){d.target.getAttribute("role")==="treeitem"&&dt(d.target);continue}for(let l of d.addedNodes){if(l.nodeType!==1)continue;l.getAttribute("role")==="treeitem"&&dt(l);let b=l.querySelectorAll?.('[role="treeitem"]');if(b)for(let v of b)dt(v)}}});m.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["role"]}),Vn(e,()=>m.disconnect())}})}function dt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function xs(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)dt(r)}function Gn(t,e={}){Pn(t),zn(t),qn(t),Un(t)}function Wn(){On()}var lt=new Map;function Yn(){lt.clear()}function ut(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Es(t){let e=t.getAttribute("data-nj-form-state");if(!e)return null;try{let r=JSON.parse(e);return r&&typeof r=="object"?!!r.valid:null}catch{return null}}function Kn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;if(typeof e!="function"){let i=Es(r);return i===null?!0:i}let o=e(r)?.$form;return o?!!o.valid:!0}function Xn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Zn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Ge(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function _s(t,e){for(let n=e;n;n=n.parentElement)if(n.__ctx)return t.findContext(e);let r=t.createContext({},null);return e.__ctx=r,or(e),r}function Qn(t){t.directive("stepper",{priority:14,init(e,r,n){ut();let o=Array.from(e.querySelectorAll("[step]"));if(!o.length){console.warn("[stepper] No [step] children found.");return}let i=_s(t,e),c=n&&parseInt(n,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",f=e.getAttribute("stepper-nav")!=="false",g=e.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(c,o.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",g),e.classList.add("nojs-stepper");let u=null,d=[];if(a){u=document.createElement("div"),u.className="nojs-stepper-indicator",u.setAttribute("role","tablist"),u.setAttribute("aria-label","Progress"),o.forEach((j,_)=>{if(_>0){let q=document.createElement("div");q.className="nojs-stepper-separator",q.setAttribute("aria-hidden","true"),u.appendChild(q)}let w=document.createElement("button");w.type="button",w.className="nojs-stepper-indicator-item",w.setAttribute("role","tab"),w.setAttribute("aria-selected",_===m?"true":"false");let C=j.getAttribute("step-label")||`Step ${_+1}`,O=document.createElement("span");O.textContent=C,w.appendChild(O),w.setAttribute("aria-label",C);let Y=`nojs-stepper-tab-${As++}`;if(w.id=Y,s==="free"){w.setAttribute("data-clickable","");let q=()=>E(_);w.addEventListener("click",q),Ge(e,()=>w.removeEventListener("click",q))}else w.setAttribute("tabindex","-1");u.appendChild(w),d.push(w)});let k=j=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(j.key))return;j.preventDefault();let _=m;j.key==="ArrowRight"?_=Math.min(m+1,o.length-1):j.key==="ArrowLeft"?_=Math.max(m-1,0):j.key==="Home"?_=0:j.key==="End"&&(_=o.length-1),s==="free"?(E(_),d[_]?.focus()):d[m]?.focus()};u.addEventListener("keydown",k),Ge(e,()=>u.removeEventListener("keydown",k)),e.insertBefore(u,e.firstChild)}let l=null,b=null,v=null;if(f){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-prev",b.textContent="Previous";let k=()=>y();b.addEventListener("click",k),Ge(e,()=>b.removeEventListener("click",k)),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-next",v.textContent="Next";let j=()=>x();v.addEventListener("click",j),Ge(e,()=>v.removeEventListener("click",j)),l.appendChild(b),l.appendChild(v),e.appendChild(l)}function p(k){let j=o[k];if(!j)return!0;if(!Kn(j,t.findContext)){let C=j.querySelector("form[validate]");return C&&(Xn(C),d[k]&&d[k].classList.add("nojs-step-invalid"),Zn(e,j,C)),!1}d[k]&&d[k].classList.remove("nojs-step-invalid");let _=j.querySelectorAll("[required]");for(let C of _)if(typeof C.checkValidity=="function"&&!C.checkValidity())return C.reportValidity(),!1;let w=j.getAttribute("step-validate");if(w)try{if(!t.evaluate(w,i))return!1}catch(C){return console.warn(`[stepper] step-validate error: ${C.message}`),!1}return!0}function h(k){if(o.forEach((j,_)=>{let w=_===m;j.setAttribute("aria-hidden",w?"false":"true"),w?(j.removeAttribute("inert"),j.setAttribute("aria-current","step")):(j.setAttribute("inert",""),j.removeAttribute("aria-current"))}),d.length&&d.forEach((j,_)=>{j.setAttribute("aria-selected",_===m?"true":"false"),_<m?j.setAttribute("data-completed",""):j.removeAttribute("data-completed"),j.setAttribute("tabindex",_===m?"0":"-1");let w=o[_];w.id&&(j.setAttribute("aria-controls",w.id),w.setAttribute("aria-labelledby",j.id))}),b&&(b.disabled=m===0),v&&(v.textContent=m===o.length-1?"Finish":"Next"),!k){let j=o[m];j&&requestAnimationFrame(()=>j.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!k,detail:{current:m,total:o.length}}))}function x(){return m>=o.length-1?(s==="linear"&&!p(m)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:m,total:o.length}})),!1):s==="linear"&&!p(m)?!1:(m++,h(),S(),!0)}function y(){return m<=0?!1:(m--,h(),S(),!0)}function E(k){if(k<0||k>=o.length||k===m)return!1;if(s==="linear"&&k>m){for(let j=m;j<k;j++)if(m=j,h(),!p(j))return S(),!1}return m=k,h(),S(),!0}let L={get current(){return m},get total(){return o.length},next:x,prev:y,goTo:E,get isFirst(){return m===0},get isLast(){return m===o.length-1}};function S(){i.$stepper=L}S(),lt.set(e,{get current(){return m},steps:o,mode:s,indicatorEl:u,navEl:l}),h(!0),Ge(e,()=>{lt.delete(e),u&&u.parentNode&&u.remove(),l&&l.parentNode&&l.remove(),delete i.$stepper})}})}var As=0;var ws=0;function Jn(t){t.directive("step",{priority:13,init(e,r,n){ut(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${ws++}`),e.setAttribute("tabindex","0")}})}function eo(t,e={}){Jn(t),Qn(t)}function to(){Yn()}function ro(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function no(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function oo(t){t.directive("skeleton",{priority:10,init(e,r,n){ro();let o=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function f(p){g();for(let h=0;h<p;h++){let x=document.createElement("div");x.className="nojs-skeleton-line",e.appendChild(x),a.push(x)}}function g(){for(let p of a)p.parentNode===e&&e.removeChild(p);a=[]}function m(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let p=s+(String(s).match(/\d$/)?"px":"");e.style.width=p,e.style.height=p}if(c){let p=parseInt(c,10);p>0&&f(p)}e.setAttribute("aria-busy","true")}let u=null;function d(){u&&u(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let p=!1,h=null,x=()=>{p||(p=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",x),h!==null&&clearTimeout(h),u=null)};e.addEventListener("transitionend",x),h=setTimeout(x,0),u=()=>{e.removeEventListener("transitionend",x),h!==null&&clearTimeout(h),p=!0,u=null}}let l=!1;function b(){let p=!!t.evaluate(n,o);p&&!l?(l=!0,m()):!p&&l&&(l=!1,d())}b();let v=o.$watch(b);no(e,v),no(e,()=>{u&&u(),l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function io(t,e={}){oo(t)}var _e=new Map,U=new Map,T={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function so(){_e.clear(),U.clear(),T.active=!1,T.splitEl=null,T.gutterEl=null,T.prevPane=null,T.nextPane=null,T.direction=null,T.startPos=0,T.startPrevSize=0,T.startNextSize=0,T.containerSize=0}function ft(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function js(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ao(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,n=r&&(e==="horizontal"?r.width:r.height);return n||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function co(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function Ls(t,e){let n=(_e.get(t)?.gutters||[]).reduce((o,i)=>o+Z(i,e),0);return Z(t,e)-n}function ks(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function We(t,e){let r=U.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function pt(t,e,r,n){let o=Z(e,n),i=Z(r,n),c=U.get(e),s=U.get(r);t.setAttribute("aria-valuenow",Math.round(o)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(o+i-(s?.min||0)))}function Zt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=_e.get(t);if(!r)return;let n=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(n))}catch{}}function Cs(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let n=JSON.parse(r),o=_e.get(t);return!o||n.length!==o.panes.length?!1:(n.forEach((i,c)=>{i&&(o.panes[c].style.flexBasis=i,o.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function Ss(t,e,r,n,o){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),o!==6&&i.style.setProperty("--nojs-gutter-size",`${o}px`);let c=d=>{if(d.button!==0)return;d.preventDefault();let l=Ls(t,e);T.active=!0,T.splitEl=t,T.gutterEl=i,T.prevPane=r,T.nextPane=n,T.direction=e,T.startPos=d[ao(e)],T.startPrevSize=Z(r,e),T.startNextSize=Z(n,e),T.containerSize=l,T.sign=co(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(d.pointerId)},s=d=>{if(!T.active||T.gutterEl!==i)return;let l=(d[ao(T.direction)]-T.startPos)*(T.sign||1),b=We(T.startPrevSize+l,T.prevPane),v=We(T.startNextSize-l,T.nextPane),p=T.startPrevSize+T.startNextSize;b+v!==p&&(b!==T.startPrevSize+l?v=p-b:b=p-v),T.prevPane.style.flexBasis=`${b}px`,T.prevPane.style.flexGrow="0",T.nextPane.style.flexBasis=`${v}px`,T.nextPane.style.flexGrow="0",pt(i,T.prevPane,T.nextPane,T.direction)},a=()=>{!T.active||T.gutterEl!==i||(T.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Zt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:n}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let f=10,g=d=>{let l=e==="horizontal",b=co(t,e),v=0;if(l&&d.key==="ArrowRight"||!l&&d.key==="ArrowDown")v=f*b;else if(l&&d.key==="ArrowLeft"||!l&&d.key==="ArrowUp")v=-f*b;else if(d.key==="Home")v=(U.get(r)?.min||0)-Z(r,e);else if(d.key==="End"){let L=U.get(n);v=Z(r,e)+Z(n,e)-(L?.min||0)-Z(r,e)}else return;d.preventDefault();let p=Z(r,e),h=Z(n,e),x=p+h,y=We(p+v,r),E=We(x-y,n);y=x-E,y=We(y,r),E=x-y,r.style.flexBasis=`${y}px`,r.style.flexGrow="0",n.style.flexBasis=`${E}px`,n.style.flexGrow="0",pt(i,r,n,e),Zt(t)};i.addEventListener("keydown",g);let m=()=>{let d=U.get(r),l=U.get(n),b=d?.collapsible?r:l?.collapsible?n:null;if(!b)return;let v=U.get(b);if(!v)return;let p=b===r?n:r,h=Z(r,e)+Z(n,e);if(v.collapsed){v.collapsed=!1,b.removeAttribute("data-collapsed");let x=v.preCollapseSize||`${Math.round(h/2)}px`,y=ks(x,h)??h/2,E=Math.min(y,h);b.style.flexBasis=`${E}px`,b.style.flexGrow="0",p.style.flexBasis=`${h-E}px`,p.style.flexGrow="0"}else v.preCollapseSize=b.style.flexBasis||`${Z(b,e)}px`,v.collapsed=!0,b.setAttribute("data-collapsed","true"),b.style.flexBasis="0px",b.style.flexGrow="0",p.style.flexBasis=`${h}px`,p.style.flexGrow="0";pt(i,r,n,e),Zt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:b,collapsed:v.collapsed}}))};return i.addEventListener("dblclick",m),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",g),i.removeEventListener("dblclick",m)}}}function lo(t){t.directive("split",{priority:14,init(e,r,n){ft();let o=(n||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",o);let c=Array.from(e.children).filter(g=>g.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(g=>{U.get(g)||U.set(g,{size:g.getAttribute("pane")||null,min:parseInt(g.getAttribute("pane-min"),10)||0,max:parseInt(g.getAttribute("pane-max"),10)||1/0,collapsible:g.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let g=0;g<c.length-1;g++){let{gutter:m,cleanup:u}=Ss(e,o,c[g],c[g+1],i);c[g].after(m),s.push(m),a.push(u)}_e.set(e,{direction:o,gutterSize:i,panes:c,gutters:s}),Cs(e)||c.forEach(g=>{let u=U.get(g)?.size;u?(g.style.flexBasis=u,g.style.flexGrow="0"):(g.style.flexGrow="1",g.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((g,m)=>{pt(g,c[m],c[m+1],o)})}),js(e,()=>{a.forEach(g=>g()),s.forEach(g=>g.remove()),_e.delete(e),c.forEach(g=>U.delete(g)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Ts(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function uo(t){t.directive("pane",{priority:15,init(e,r,n){ft(),e.classList.add("nojs-pane"),U.has(e)||U.set(e,{size:n||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=U.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";o.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${o.max}px`),Ts(e,()=>{e.classList.remove("nojs-pane"),U.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function fo(t,e={}){lo(t),uo(t)}function po(){so()}var pe={sorts:new Map};function mo(){pe.sorts.clear()}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Ds(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Is(t,e){let r=t.querySelector("tbody");if(!r)return null;let n=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!n)return null;let o=n.getAttribute("each")||n.getAttribute("foreach")||n.getAttribute("for");if(!o)return null;let i=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Bs(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function go(t,e,r){let n=e.split("."),o=t;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function bo(t,e){let r=Number.isNaN(t),n=Number.isNaN(e);return r&&n?0:r?1:n||t<e?-1:t>e?1:0}function vo(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return bo(Number(t),Number(e));case"date":return bo(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Hs(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function yo(t){t.directive("sortable",{priority:10,init(e){Ae(),e.classList.add("nojs-sortable")}})}function xo(t){t.directive("sort",{priority:11,init(e,r,n){Ae();let o=n;if(!o)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;pe.sorts.has(s)||pe.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(pe.sorts.get(s).column||ho(e,s,o,i,c,t));let a=()=>{let g=pe.sorts.get(s),m;g.column!==o?m="asc":g.direction==="asc"?m="desc":g.direction==="desc"?m=null:m="asc",ho(e,s,o,i,m,t)},f=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),a())};e.addEventListener("click",a),e.addEventListener("keydown",f),Ds(e,()=>{e.removeEventListener("click",a),e.removeEventListener("keydown",f),s&&!s.isConnected&&(pe.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function ho(t,e,r,n,o,i){let c=pe.sorts.get(e);Hs(e),o?(t.setAttribute("data-sort-dir",o),t.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),c.column=r,c.direction=o):(c.column=null,c.direction=null);let s=Is(e,i);if(s){let a=i.findContext(e),f=a?Bs(a,s.arrayPath):null;if(Array.isArray(f)){if(!o){let m=e._nojsOriginalOrder;if(m){let u=new Set(f),d=m.filter(l=>u.has(l));for(let l of f)m.includes(l)||d.push(l);go(a,s.arrayPath,d)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...f]);let g=[...f].sort((m,u)=>{let d=m!=null?m[r]:null,l=u!=null?u[r]:null,b=vo(d,l,n);return o==="desc"?-b:b});go(a,s.arrayPath,g);return}}Os(e,t,r,n,o)}function Os(t,e,r,n,o){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let f=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...f]),!o){let u=document.createDocumentFragment();for(let d of t._nojsOriginalRows)u.appendChild(d);i.appendChild(u);return}let g=u=>{let d=u.replace(/[^0-9.\-]/g,"");return d===""||d==="-"?NaN:parseFloat(d)};f.sort((u,d)=>{let l=u.children[a]?.textContent?.trim()||"",b=d.children[a]?.textContent?.trim()||"",v=vo(n==="number"?g(l):l,n==="number"?g(b):b,n);return o==="desc"?-v:v});let m=document.createDocumentFragment();for(let u of f)m.appendChild(u);i.appendChild(m)}function Eo(t){t.directive("fixed-header",{priority:10,init(e){Ae(),e.classList.add("nojs-fixed-header")}})}function _o(t){t.directive("fixed-col",{priority:10,init(e){Ae(),e.classList.add("nojs-fixed-col")}})}function Qt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ao(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let n=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!n)return null;let o=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return o?{iteratorVar:o[1],arrayPath:o[2].trim(),eachEl:r}:null}function wo(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function jo(t,e,r){let n=e.split("."),o=t;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function Lo(t){t.directive("table-reorder",{priority:15,init(e){if(Ae(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let n=t.findContext(e),o=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,f=null;function g(){let v=r.querySelectorAll(":scope > tr");for(let p=0;p<v.length;p++){let h=v[p];if(h._nojsReorderSetup)continue;h._nojsReorderSetup=!0,h.draggable=!0,h.setAttribute("aria-roledescription","draggable row");let x=!0;if(o){let j=_=>{x=!!_.target.closest(o)};h.addEventListener("mousedown",j),Qt(h,()=>h.removeEventListener("mousedown",j))}let y=j=>{if(o&&!x){j.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(h),a=h,j.dataTransfer&&(j.dataTransfer.effectAllowed="move",j.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(w=>h.classList.add(w))},E=j=>{if(a==null)return;j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let _=h.getBoundingClientRect(),w=_.top+_.height/2,O=[...r.querySelectorAll(":scope > tr")].indexOf(h);m(),O!==s&&(j.clientY<w?h.classList.add("nojs-reorder-insert-before"):h.classList.add("nojs-reorder-insert-after"),f=h)},L=()=>{h.classList.remove("nojs-reorder-insert-before"),h.classList.remove("nojs-reorder-insert-after"),f===h&&(f=null)},S=j=>{if(j.preventDefault(),j.stopPropagation(),a==null||s==null)return;let _=[...r.querySelectorAll(":scope > tr")],w=h.getBoundingClientRect(),C=w.top+w.height/2,O=_.indexOf(h);j.clientY>=C&&O++;let Y=s;if(Y===O||Y+1===O){u();return}let q=Y<O?O-1:O,$e=Ao(e);if($e&&n){let D=wo(n,$e.arrayPath);if(Array.isArray(D)){let M=[...D],[F]=M.splice(Y,1);M.splice(q,0,F),jo(n,$e.arrayPath,M),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...M]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:Y,to:q,item:F}}))}}else{let D=a,M=_[q];D&&M&&(Y<q?r.insertBefore(D,M.nextSibling):r.insertBefore(D,M),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:Y,to:q,item:null}})))}u()},k=()=>{u()};h.addEventListener("dragstart",y),h.addEventListener("dragover",E),h.addEventListener("dragenter",E),h.addEventListener("dragleave",L),h.addEventListener("drop",S),h.addEventListener("dragend",k),Qt(h,()=>{h.removeEventListener("dragstart",y),h.removeEventListener("dragover",E),h.removeEventListener("dragenter",E),h.removeEventListener("dragleave",L),h.removeEventListener("drop",S),h.removeEventListener("dragend",k),h._nojsReorderSetup=!1})}}function m(){f&&(f.classList.remove("nojs-reorder-insert-before"),f.classList.remove("nojs-reorder-insert-after"),f=null)}function u(){a&&i.split(/\s+/).filter(Boolean).forEach(p=>a.classList.remove(p)),m(),s=null,a=null;let v=r.querySelectorAll(":scope > tr");for(let p of v)p.classList.remove("nojs-reorder-insert-before"),p.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(h=>p.classList.remove(h))}let d=v=>{a!=null&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"))},l=v=>{if(a==null||v.target!==r)return;v.preventDefault(),v.stopPropagation();let p=s,x=[...r.querySelectorAll(":scope > tr")].length-1;if(p===x){u();return}let y=Ao(e);if(y&&n){let E=wo(n,y.arrayPath);if(Array.isArray(E)){let L=[...E],[S]=L.splice(p,1);L.push(S),jo(n,y.arrayPath,L),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...L]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:p,to:L.length-1,item:S}}))}}u()};r.addEventListener("dragover",d),r.addEventListener("dragenter",d),r.addEventListener("drop",l);let b=new MutationObserver(()=>{g()});b.observe(r,{childList:!0}),g(),Qt(e,()=>{b.disconnect(),r.removeEventListener("dragover",d),r.removeEventListener("dragenter",d),r.removeEventListener("drop",l),u()})}})}function ko(t,e={}){yo(t),xo(t),Eo(t),_o(t),Lo(t)}function Co(){mo()}var me={containers:new Map};function So(){for(let[,t]of me.containers)typeof t.unsub=="function"&&t.unsub();me.containers.clear()}function To(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Do(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ms(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function $s(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Io(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let n=document.createElement("ol");n.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let f=document.createElement("span");f.setAttribute("aria-current","page"),f.textContent=c.label,s.appendChild(f)}else{let f=document.createElement("a");f.href=c.href,f.textContent=c.label,s.appendChild(f)}n.appendChild(s)}t.appendChild(n);let o=me.containers.get(t);o&&(o.crumbs=e)}function Rs(t){let e=[],r=Array.from(t.children);for(let n of r){if(n.tagName==="OL"&&n.classList.contains("nojs-breadcrumb"))continue;let o=Ms(n);if(!o)continue;let i=n.getAttribute("href")||"#";e.push({label:o,href:i})}return e}function Fs(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),n=[{label:"Home",href:"/"}],o="";for(let i=0;i<r.length;i++){o+="/"+r[i];let c=$s(r[i].replace(/[-_]/g," "));n.push({label:c,href:o})}return n}function Bo(t){t.directive("breadcrumb",{priority:15,init(e,r,n){To(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let o=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!o&&i;if(me.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,f=a?a.path:"/",g=Fs(f);Io(e,g)};if(s(),typeof i.on=="function"){let a=i.on(s),f=me.containers.get(e);f&&(f.unsub=a),Do(e,()=>{typeof a=="function"&&a();let g=me.containers.get(e);g&&(g.unsub=null)})}}else{let s=Rs(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");Io(e,s)}Do(e,()=>{me.containers.delete(e)})}})}function Ho(t,e={}){Bo(t)}function Oo(){So()}var mt={containers:new Map};function Mo(){mt.containers.clear()}function $o(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Ps(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var gt=null;function zs(){return gt!==null||(gt=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),gt}function Ro(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let n=Array.from(t.children),o=!1;for(let i of n){if(i===e){o=!0;continue}o&&r.appendChild(i)}return t.appendChild(r),r}function qs(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let n=()=>{e.style.height="",e.removeEventListener("transitionend",n)};e.addEventListener("transitionend",n)})}function Po(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let n=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",n)};e.addEventListener("transitionend",n)})}function Fo(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");Po(t,r)}else t.open=!1}function bt(t,e,r,n){let o=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:n}});t.dispatchEvent(o)}function Oe(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function zo(t){t.directive("accordion",{priority:10,init(e,r,n){$o();let o=(n||"").trim().toLowerCase()==="multi"?"multi":"single",i=!zs();e.setAttribute("role","group");let c=Oe(e);if(c.length===0)return;if(i)for(let u of c)Ro(u);let s=[],a=new MutationObserver(u=>{for(let d of u)for(let l of d.addedNodes)l.nodeType!==1||l.tagName!=="DETAILS"||l.parentElement===e&&g(l)});a.observe(e,{childList:!0});let f=0,g=u=>{i&&Ro(u);let d=u.querySelector(":scope > summary");if(d){let v=`nojs-accordion-panel-${Date.now()}-${f++}`,p=u.querySelector(":scope > .nojs-accordion-content");p?(p.id=p.id||v,p.setAttribute("role","region"),v=p.id):(u.id||(u.id=v),v=u.id),d.setAttribute("aria-expanded",u.open?"true":"false"),d.setAttribute("aria-controls",v)}let l=v=>{let p=Oe(e),h=p.indexOf(u),x=u.querySelector(":scope > summary");if(x&&x.setAttribute("aria-expanded",u.open?"true":"false"),u.open){if(o==="single")for(let y of p)y!==u&&y.open&&Fo(y,i);bt(e,u,!0,h)}else bt(e,u,!1,h)},b=null;if(i){let v=u.querySelector(":scope > summary");v&&(b=p=>{p.preventDefault();let h=u.querySelector(":scope > .nojs-accordion-content");if(u.open)Po(u,h),v.setAttribute("aria-expanded","false"),bt(e,u,!1,Oe(e).indexOf(u));else{if(o==="single"){let x=Oe(e);for(let y of x)if(y!==u&&y.open){Fo(y,!0);let E=y.querySelector(":scope > summary");E&&E.setAttribute("aria-expanded","false")}}qs(u,h),v.setAttribute("aria-expanded","true"),bt(e,u,!0,Oe(e).indexOf(u))}},v.addEventListener("click",b))}u.addEventListener("toggle",l),s.push({details:u,toggleHandler:l,clickHandler:b})};for(let u of c)g(u);let m=u=>{let d=u.target;if(d.tagName!=="SUMMARY")return;let l=d.parentElement;if(!l||l.parentElement!==e)return;let v=Oe(e).map(x=>x.querySelector(":scope > summary")).filter(Boolean),p=v.indexOf(d);if(p===-1)return;let h=-1;switch(u.key){case"ArrowDown":case"ArrowRight":h=(p+1)%v.length;break;case"ArrowUp":case"ArrowLeft":h=(p-1+v.length)%v.length;break;case"Home":h=0;break;case"End":h=v.length-1;break;default:return}h!==-1&&h!==p&&(u.preventDefault(),v[h].focus())};e.addEventListener("keydown",m),mt.containers.set(e,{mode:o,listeners:s,observer:a}),Ps(e,()=>{e.removeEventListener("keydown",m),a.disconnect();for(let u of s)if(u.details.removeEventListener("toggle",u.toggleHandler),u.clickHandler){let d=u.details.querySelector(":scope > summary");d&&d.removeEventListener("click",u.clickHandler)}s.length=0,mt.containers.delete(e)})}})}function qo(t,e={}){zo(t)}function Vo(){Mo()}var Me=new Map;function No(){let t=Array.from(Me.keys());for(let e of t){let r=Me.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[n,o]of r.renderedNodes){if(o.__disposers){for(let i of o.__disposers)try{i()}catch{}o.__disposers=null}o.parentNode&&o.remove()}r.renderedNodes.clear()}r.disposed=!0}}Me.clear()}function Uo(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Vs(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ns(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let n=Us(e.getAttribute(r));if(n)return{eachEl:e,...n}}return null}function Us(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Gs(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function Go(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let n=document.createElement("td"),o=e==="table"?t:t.closest("table"),i=o?o.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;n.setAttribute("colspan",String(c)),n.style.padding="0",n.style.border="none",r.appendChild(n)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function ht(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Ws(t,e){return t*e}function Yo(t){let e=t.totalItems,r=new Array(e+1),n=t.estimatedHeight||50;r[0]=0;for(let o=1;o<=e;o++)r[o]=r[o-1]+(t.heights[o-1]||n);t.prefixSums=r}function Ko(t,e){let r=0,n=t.length-2;for(;r<=n;){let o=r+n>>>1;t[o]<=e?r=o+1:n=o-1}return Math.max(0,n)}function Wo(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++)e+=t.heights[n]||r;return e}function vt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,n=t.estimatedHeight||50;for(let o=0;o<e;o++)r+=t.heights[o]||n;return r}function Ys(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return Ko(t.prefixSums,e);let r=0,n=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++){let i=t.heights[o]||n;if(r+i>e)return o;r+=i}return Math.max(0,t.totalItems-1)}function Ks(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return Ko(t.prefixSums,e+r);let n=e+r,o=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(o+=t.heights[c]||i,o>=n)return c;return t.totalItems-1}function Xs(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let n,o;return t.itemHeight!=="auto"?(n=Math.floor(e/t.itemHeight),o=Math.ceil((e+r)/t.itemHeight)-1):(n=Ys(t,e),o=Ks(t,e,r)),n=Math.max(0,n-t.buffer),o=Math.min(t.totalItems-1,o+t.buffer),{start:n,end:o}}function Jt(t,e){if(t.disposed)return;let r=t.container,n=r,o=n.scrollTop,i=n.clientHeight,{start:c,end:s}=Xs(t,o,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=vt(t,c),f=t.itemHeight!=="auto"?Ws(t.totalItems,t.itemHeight):Wo(t),g=s>=0?vt(t,s+1):0,m=Math.max(0,f-g);ht(t.spacerTop,a),ht(t.spacerBottom,m);let u=new Set;for(let l=c;l<=s;l++)u.add(l);for(let[l,b]of t.renderedNodes)u.has(l)||(b.remove(),t.renderedNodes.delete(l));let d=[];for(let l=c;l<=s;l++){if(t.renderedNodes.has(l))continue;let b=t.dataArray[l];if(b===void 0)continue;let v=t.template.cloneNode(!0),p={};p[t.iteratorVar]=b,p.$index=l,p.$count=t.totalItems,p.$first=l===0,p.$last=l===t.totalItems-1,p.$even=l%2===0,p.$odd=l%2!==0,v.setAttribute("role","option"),v.setAttribute("aria-setsize",String(t.totalItems)),v.setAttribute("aria-posinset",String(l+1)),v.setAttribute("tabindex","-1"),v.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(p)),v.__declared=!1,d.push({index:l,node:v}),t.renderedNodes.set(l,v)}if(d.length>0){d.sort((l,b)=>l.index-b.index);for(let{index:l,node:b}of d){let v=null;for(let[p,h]of t.renderedNodes)p>l&&h.parentNode===r&&(!v||p<Zs(v,t))&&(v=h);v||(v=t.spacerBottom),r.insertBefore(b,v);try{e.processTree&&e.processTree(b)}catch{}}}if(t.itemHeight==="auto"){let l=!1;for(let[b,v]of t.renderedNodes){let p=v.offsetHeight||v.getBoundingClientRect().height;p>0&&t.heights[b]!==p&&(t.heights[b]=p,l=!0)}if(l){Yo(t);let b=Wo(t),v=vt(t,c),p=s>=0?vt(t,s+1):0,h=Math.max(0,b-p);ht(t.spacerTop,v),ht(t.spacerBottom,h)}}}function Zs(t,e){for(let[r,n]of e.renderedNodes)if(n===t)return r;return 1/0}function Qs(t,e,r){if(t.disposed)return;let n=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&Yo(t);for(let[o,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=n,Jt(t,r)}function Xo(t){t.directive("virtual",{priority:10,init(e,r,n){Uo(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let o=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=o==="auto"?"auto":parseInt(o,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=Ns(e),f=null;if(a)f=a.eachEl;else for(let E of e.children)if(!E.classList.contains("nojs-virtual-spacer")){f=E;break}if(!f){console.warn("[virtual] No child template found.");return}let g=f.cloneNode(!0);for(g.removeAttribute("each"),g.removeAttribute("foreach"),g.removeAttribute("for"),g.__declared=!1,g.__disposers=null,g.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let m=Go(e),u=Go(e);e.appendChild(m),e.appendChild(u);let d={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:g,spacerTop:m,spacerBottom:u,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};Me.set(e,d);let l=E=>{let L=[...e.querySelectorAll('[role="option"]')];if(!L.length)return;let S=e.querySelector('[role="option"]:focus'),k=S?L.indexOf(S):-1,j=-1;switch(E.key){case"ArrowDown":E.preventDefault(),j=k<L.length-1?k+1:k;break;case"ArrowUp":E.preventDefault(),j=k>0?k-1:0;break;case"Home":E.preventDefault(),j=0;break;case"End":E.preventDefault(),j=L.length-1;break;default:return}j>=0&&j<L.length&&L[j].focus()};e.addEventListener("keydown",l);let b=null,v=()=>{b||(b=requestAnimationFrame(()=>{b=null,Jt(d,t)}))};if(d.scrollHandler=v,e.addEventListener("scroll",v,{passive:!0}),typeof ResizeObserver<"u"){let E=new ResizeObserver(()=>{d.dirty=!0,Jt(d,t)});E.observe(e),d.resizeObserver=E}let p=null,h=-1,x=null,y=()=>{if(!d.disposed){if(d.arrayPath){let E=t.findContext?t.findContext(e):null;if(E){let L=Gs(E,d.arrayPath);Array.isArray(L)&&(L!==p||L.length!==h)&&(p=L,h=L.length,Qs(d,L,t))}}x=setTimeout(y,100)}};x=setTimeout(y,100),Vs(e,()=>{d.disposed=!0,b&&(cancelAnimationFrame(b),b=null),x&&(clearTimeout(x),x=null),e.removeEventListener("scroll",v),e.removeEventListener("keydown",l),d.resizeObserver&&(d.resizeObserver.disconnect(),d.resizeObserver=null);for(let[E,L]of d.renderedNodes){if(L.__disposers){for(let S of L.__disposers)try{S()}catch{}L.__disposers=null}L.remove()}d.renderedNodes.clear(),d.spacerTop&&d.spacerTop.parentNode&&d.spacerTop.remove(),d.spacerBottom&&d.spacerBottom.parentNode&&d.spacerBottom.remove(),Me.delete(e)})}})}function Zo(t,e={}){Xo(t)}function Qo(){No()}var ge=new Map,yt=new Map;function Jo(){for(let[t,e]of ge){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let n=r.el&&r.el.__disposers;if(n){for(let o of n)try{o()}catch{}r.el.__disposers=[]}}}ge.clear(),yt.clear()}function ei(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function Js(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ea(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function ta(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function ra(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function na(){return document.documentElement}function oa(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function ti(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function er(t){let e=ge.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,n=e.threshold,o=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let m of a)m.isIntersecting?o.add(m.target.id):o.delete(m.target.id);let f=null,g=1/0;for(let m of o){let u=document.getElementById(m);if(!u)continue;let d=u.getBoundingClientRect();d.top<g&&(g=d.top,f=m)}for(let m of e.spyEntries)ti(m.el);if(f){for(let m of e.spyEntries)if(m.targetId===f){oa(m.el),e.activeEl=m.el;break}}else e.activeEl=null},{rootMargin:i,threshold:n}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let f=document.getElementById(a.targetId);f&&(c.observe(f),s.add(a.targetId))}e.observer=c}function ia(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function ri(t){t.directive("spy",{priority:20,init(e,r,n){ei();let o=ea(e);if(!o){e.tagName!=="A"&&ia(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=ta(e),c=ra(e),s=na();ge.has(s)||ge.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=ge.get(s),f={el:e,targetId:o};a.spyEntries.push(f),yt.set(e,s),er(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{er(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),Js(e,()=>{let g=a.spyEntries.indexOf(f);g!==-1&&a.spyEntries.splice(g,1),yt.delete(e),ti(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),ge.delete(s)):er(s)})}})}function ni(t,e={}){ri(t)}function oi(){Jo()}var tr="it is a DOM element; client mechanics never send DOM nodes",ii={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:tr},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:tr},fixed:{list:null}},$el:{unavailable:tr}}}};var aa="[validate],[drag],[drop],[drag-list],[drag-multiple]";function si(t){if(typeof document>"u")return;let e=document.querySelectorAll(aa);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;if(r.hasAttribute("validate")&&r.__nojsElBoundCtx===void 0){if(Mr(r))continue;da(t,r)}let n=G(t,"disposeTree");typeof n=="function"?n(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let o=t.findContext?t.findContext(r):null;o&&delete o.$form,t.processTree(r)}}var ca="[if],[else-if],[else],[switch],[each],[foreach],[for]";function da(t,e){if(!e.querySelector(ca))return;(G(t,"warn")||console.warn)("[nojs-elements] loaded after core processed this <"+e.tagName.toLowerCase()+" validate>: content of an if/each inside it may be lost. Load the Elements script before DOMContentLoaded, or put `state` on the form or an element above it.")}var ai=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],la=["drag-list","drag-multiple",...ai].filter(t=>!fr.includes(t));function ua(t,e){wt(t,e),$t(t,e);for(let r of la)t.directive(r,{priority:30,init(n,o){o.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}var fa={name:"nojs-elements",contract:{directives:{...ii},validation:{api:1,engine:"./validate-engine.mjs"}},install(t,e={}){if(ie(t)){ua(t,e);return}wt(t,e),$t(t,e),Kr(t,e),Jr(t,e),ln(t,e),vn(t,e),jn(t,e),Bn(t,e),Gn(t,e),eo(t,e),io(t,e),fo(t,e),ko(t,e),Ho(t,e),qo(t,e),Zo(t,e),ni(t,e),si(t)},init(t){if(ie(t)||(si(t),typeof document>"u"||!document.body))return;let e=ai.map(n=>`[${n}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let n of r)n.__declared&&!n.__disposers&&!n.__ctx&&(n.__declared=!1);try{t.processTree(document.body)}catch(n){t.internals?.warn?.("nojs-elements init re-process error:",n.message)}},dispose(t){pr(),Vr(),Xr(),en(),un(),yn(),Ln(),Hn(),Wn(),to(),po(),Co(),Oo(),Vo(),Qo(),oi()}},rr=fa;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(rr),t=!0,!0):!1};window.NoJSElements=rr;let t=!1;if(!e()){let r=0,n=100,o=setInterval(()=>{(e()||++r>=n)&&clearInterval(o)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(o)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
