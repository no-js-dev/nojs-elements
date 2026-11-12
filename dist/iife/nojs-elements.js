/**
 * NoJS Elements v1.22.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
(()=>{var _={dragging:null,selected:new Map,placeholder:null},Ye=new Map;function Ut(){_.dragging=null,_.selected.clear(),_.placeholder&&(_.placeholder.remove(),_.placeholder=null),Ye.clear()}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function ue(t,e){t.__nojsElBoundCtx=e}function Wt(t){t.__nojsElOwnCtx=!0}function ht(t){return t.__nojsElOwnCtx===!0}function pe(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Ze(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function fe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ke(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ke(r):e++}return e}function Xe(t,e,r,n){let o=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(o.length===0)return 0;for(let i=0;i<o.length;i++){let s=(o[i].style&&o[i].style.display==="contents"&&o[i].firstElementChild||o[i]).getBoundingClientRect();if(n==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(n==="grid"){let a=s.left+s.width/2,u=s.top+s.height/2;if(r<u&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return o.length}function Kt(t,e,r,n){re();let o;if(r==="auto"){if(o=document.createElement("div"),o.className=n||"nojs-drop-placeholder",_.dragging&&_.dragging.sourceEl){let s=(_.dragging.sourceEl.firstElementChild||_.dragging.sourceEl).getBoundingClientRect();s.height>0&&(o.style.height=s.height+"px"),s.width>0&&(o.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(o=document.createElement("div"),o.style.display="contents",o.className=n||"nojs-drop-placeholder",o.appendChild(c.content.cloneNode(!0))):(o=document.createElement("div"),o.className=n||"nojs-drop-placeholder")}o.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(o):t.insertBefore(o,i[e]),_.placeholder=o}function re(){_.placeholder&&(_.placeholder.remove(),_.placeholder=null)}function Ee(t,e){return!e||e==="*"?!0:e.split(",").map(n=>n.trim()).includes(t)}function Po(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let n=t.style&&t.style.display==="contents"&&t.firstElementChild||t,o=n.getBoundingClientRect(),i=o.width,c=o.height,s=getComputedStyle(n),a=Math.min(e,3);for(let m=a-1;m>=0;m--){let f=document.createElement("div"),l=m*4;if(f.style.cssText="position:absolute;top:"+l+"px;left:"+l+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",m===0){let p=n.cloneNode(!0);for(;p.firstChild;)f.appendChild(p.firstChild);f.style.background=s.backgroundColor||"#fff",f.style.border=s.border,f.style.padding=s.padding,f.style.fontSize=s.fontSize,f.style.color=s.color,f.style.fontFamily=s.fontFamily}else f.style.background=s.backgroundColor||"#fff",f.style.border=s.border||"1px solid #ddd";r.appendChild(f)}let u=document.createElement("div");return u.textContent=e,u.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(u),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var oe=null;function Ro(){return oe&&oe.isConnected?oe:typeof document>"u"||!document.body?null:(oe=document.createElement("div"),oe.setAttribute("aria-live","assertive"),oe.setAttribute("aria-atomic","true"),oe.setAttribute("role","status"),oe.className="nojs-dnd-live-region",oe.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(oe),oe)}function de(t){let e=Ro();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Xt(t){if(pe(t)){t.directive("drag",{priority:15,init(e,r){ke(),Gt(e,Fo(e,r))}});return}Ze(t,"drag"),t.directive("drag",{priority:15,init(e,r,n){ke(),Gt(e,qo(t,e,n))}})}function qo(t,e,r){let n=t.findContext(e);ue(e,n);let o=e.getAttribute("drag-disabled");return{ctx:n,value:()=>t.evaluate(r,n),disabled:()=>o?t.evaluate(o,n):!1,watchDisabled:i=>fe(e,n.$watch(i)),onDispose:i=>fe(e,i)}}function Fo(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function Gt(t,e){let r=t.getAttribute("drag-type")||"default",n=t.getAttribute("drag-effect")||"move",o=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),c=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),a=t.getAttribute("drag-class")||"nojs-dragging",u=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let m=!0;if(o){let d=b=>{m=!!b.target.closest(o)};t.addEventListener("mousedown",d),e.onDispose(()=>t.removeEventListener("mousedown",d))}let f=d=>{if(o&&!m){d.preventDefault();return}if(s&&e.disabled()){d.preventDefault();return}let b=e.value(),v=t.getAttribute("drag-group"),g=b;if(v&&_.selected.has(v)){let y=_.selected.get(v);y.size>0&&[...y].some(A=>A.el===t)&&(g=[...y].map(A=>A.item))}if(_.dragging={item:g,type:r,effect:n,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},d.dataTransfer){if(d.dataTransfer.effectAllowed=n,d.dataTransfer.setData("text/plain",""),Array.isArray(g)&&g.length>1&&d.dataTransfer.setDragImage){let y=Po(t,g.length);document.body.appendChild(y);let E=t.getBoundingClientRect();d.dataTransfer.setDragImage(y,E.width/2,E.height/2),requestAnimationFrame(()=>y.remove())}else if(i&&d.dataTransfer.setDragImage)if(i==="none"){let y=document.createElement("div");y.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(y);let[E,A]=c.split(",").map(Number);d.dataTransfer.setDragImage(y,E||0,A||0),requestAnimationFrame(()=>y.remove())}else{let y=t.querySelector(i);if(y){let[E,A]=c.split(",").map(Number);u&&y.classList.add(u),d.dataTransfer.setDragImage(y,E||0,A||0)}}}if(a.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),Array.isArray(g)&&v&&_.selected.has(v))for(let y of _.selected.get(v))y.el!==t&&a.split(/\s+/).filter(Boolean).forEach(E=>y.el.classList.add(E));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:g,index:_.dragging.sourceIndex,el:t}}))},l=()=>{a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b));let d=t.getAttribute("drag-group");if(d&&_.selected.has(d))for(let b of _.selected.get(d))a.split(/\s+/).filter(Boolean).forEach(v=>b.el.classList.remove(v));if(u&&i&&i!=="none"){let b=t.querySelector(i);b&&b.classList.remove(u)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:_.dragging?.item,index:_.dragging?.sourceIndex,dropped:_.dragging===null}})),_.dragging=null,re()};if(t.addEventListener("dragstart",f),t.addEventListener("dragend",l),e.onDispose(()=>{t.removeEventListener("dragstart",f),t.removeEventListener("dragend",l)}),s){let d=function(){let b=!!e.disabled();t.draggable=!b,b?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(d)}let p=d=>{if(_.dragging&&!_.dragging.sourceEl.isConnected&&(_.dragging=null),d.key===" "&&!_.dragging){d.preventDefault();let b=e.value();_.dragging={item:b,type:r,effect:n,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},a.split(/\s+/).filter(Boolean).forEach(g=>t.classList.add(g));let v=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${v}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:t}}))}else d.key==="Escape"&&_.dragging&&_.dragging.sourceEl===t&&(d.preventDefault(),a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),de("Drag cancelled."),_.dragging=null,re())};t.addEventListener("keydown",p),e.onDispose(()=>t.removeEventListener("keydown",p))}function Zt(t){if(pe(t)){t.directive("drop",{priority:15,init(e,r){ke(),Yt(e,zo(e,r)),Vo(e,r)}});return}Ze(t,"drop"),t.directive("drop",{priority:15,init(e,r,n){ke(),Yt(e,Oo(t,e,n))}})}function Oo(t,e,r){let n=t.findContext(e);ue(e,n);let o=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>o?t.evaluate(o,n):!1,max:()=>i?t.evaluate(i,n):void 0,run(c){let s=K(t,"execStatement");typeof s=="function"?s(r,n,c):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:c=>fe(e,c)}}function zo(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function Vo(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",n=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(o=>t.classList.remove(o)),n.split(/\s+/).filter(Boolean).forEach(o=>t.classList.remove(o)),_.placeholder&&t.contains(_.placeholder)&&re()})}function Yt(t,e){let r=t.getAttribute("drop-accept")||"default",n=t.getAttribute("drop-effect")||"move",o=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",c=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),a=t.getAttribute("drop-sort"),u=t.getAttribute("drop-placeholder"),m=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",n);let f=0,l=g=>{if(!_.dragging||c&&e.disabled())return;let h=Ee(_.dragging.type,r),y=!0;if(s){let E=e.max(),A=Ke(t);typeof E=="number"&&A>=E&&(y=!1)}if(!h||!y){i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E)),o.split(/\s+/).filter(Boolean).forEach(E=>t.classList.remove(E)),re();return}if(i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.remove(E)),g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect=n),a){let E=Xe(t,g.clientX,g.clientY,a);u&&Kt(t,E,u,m),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:_.dragging.item,index:E}}))}},p=g=>{if(!_.dragging||c&&e.disabled())return;let h=Ee(_.dragging.type,r),y=!0;if(s){let E=e.max(),A=Ke(t);typeof E=="number"&&A>=E&&(y=!1)}h&&y&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect=n)),f++,f===1&&(h&&y?(o.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E)))},d=g=>{_.dragging&&(f--,f<=0&&(f=0,o.split(/\s+/).filter(Boolean).forEach(h=>t.classList.remove(h)),i.split(/\s+/).filter(Boolean).forEach(h=>t.classList.remove(h)),re(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging.item}}))))},b=g=>{if(g.preventDefault(),g.stopPropagation(),f=0,!_.dragging||c&&e.disabled()||!Ee(_.dragging.type,r))return;if(s){let j=e.max(),w=Ke(t);if(typeof j=="number"&&w>=j)return}let h=_.dragging.item,y=_.dragging.type,E=_.dragging.effect,A=0;a&&(A=Xe(t,g.clientX,g.clientY,a)),o.split(/\s+/).filter(Boolean).forEach(j=>t.classList.remove(j)),i.split(/\s+/).filter(Boolean).forEach(j=>t.classList.remove(j)),re();let C={$drag:h,$dragType:y,$dragEffect:E,$dropIndex:A,$source:{list:_.dragging.sourceList,index:_.dragging.sourceIndex,el:_.dragging.sourceEl},$target:{list:null,index:A,el:t},$el:t};e.run(C),_.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:h,index:A,source:C.$source,target:C.$target,effect:E}}))},v=g=>{_.dragging&&(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b(g))};t.addEventListener("dragover",l),t.addEventListener("dragenter",p),t.addEventListener("dragleave",d),t.addEventListener("drop",b),t.addEventListener("keydown",v),e.onDispose(()=>{t.removeEventListener("dragover",l),t.removeEventListener("dragenter",p),t.removeEventListener("dragleave",d),t.removeEventListener("drop",b),t.removeEventListener("keydown",v)})}function Qt(t){Ze(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,n){ke();let o=t.findContext(e);ue(e,o);let i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",u=e.getAttribute("drag-type")||"__draglist_"+n,m=e.getAttribute("drop-accept")||u,f=e.hasAttribute("drag-list-copy"),l=e.hasAttribute("drag-list-remove"),p=e.getAttribute("drag-disabled"),d=e.getAttribute("drop-disabled"),b=e.getAttribute("drop-max"),v=e.getAttribute("drop-placeholder"),g=e.getAttribute("drop-placeholder-class"),h=e.getAttribute("drag-class")||"nojs-dragging",y=e.getAttribute("drop-class")||"nojs-drag-over",E=e.getAttribute("drop-reject-class")||"nojs-drop-reject",A=e.getAttribute("drop-settle-class")||"nojs-drop-settle",C=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",f?"copy":"move");let j={listPath:n,ctx:o,el:e};Ye.set(e,j),fe(e,()=>Ye.delete(e));let w=0,x=null;function L(){let I=t.resolve(n,o);if(!Array.isArray(I))return;if(I===x&&I.length>0&&e.children.length>0){for(let Y of e.children)Y.__ctx&&Y.__ctx.$notify&&Y.__ctx.$notify();return}x=I;let B=i?document.getElementById(i):null;if(!B)return;let P=K(t,"disposeChildren");typeof P=="function"&&P(e),e.innerHTML="";let R=I.length;I.forEach((Y,z)=>{let te={[s]:Y,$index:z,$count:R,$first:z===0,$last:z===R-1,$even:z%2===0,$odd:z%2!==0},le=t.createContext(te,o),J=B.content.cloneNode(!0),T=document.createElement("div");T.style.display="contents",T.__ctx=le,T.appendChild(J),e.appendChild(T);let F=T.firstElementChild||T;F.draggable=!0,F.setAttribute("role","option"),F.setAttribute("aria-roledescription","draggable item"),F.getAttribute("tabindex")||F.setAttribute("tabindex","0");let ce=U=>{if(p&&t.evaluate(p,o)){U.preventDefault();return}_.dragging={item:Y,type:u,effect:f?"copy":"move",sourceEl:T,sourceCtx:le,sourceList:I,sourceIndex:z,listDirective:{el:e,listPath:n,ctx:o,keyProp:c,copyMode:f,removeMode:l}},U.dataTransfer&&(U.dataTransfer.effectAllowed=f?"copy":"move",U.dataTransfer.setData("text/plain","")),h.split(/\s+/).filter(Boolean).forEach(xe=>F.classList.add(xe));let Z=F.getAttribute("aria-label")||F.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${Z}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:Y,index:z,el:F}}))},ye=()=>{h.split(/\s+/).filter(Boolean).forEach(U=>F.classList.remove(U)),_.dragging&&_.dragging.sourceEl===T&&(_.dragging=null),re()};T.addEventListener("dragstart",ce),T.addEventListener("dragend",ye);let Ge=U=>{if(U.key===" "&&!_.dragging){U.preventDefault(),U.stopPropagation(),_.dragging={item:Y,type:u,effect:f?"copy":"move",sourceEl:T,sourceCtx:le,sourceList:I,sourceIndex:z,listDirective:{el:e,listPath:n,ctx:o,keyProp:c,copyMode:f,removeMode:l}},h.split(/\s+/).filter(Boolean).forEach(xe=>F.classList.add(xe));let Z=F.getAttribute("aria-label")||F.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${Z}. Use arrow keys to reorder.`)}else if(U.key==="Escape"&&_.dragging){U.preventDefault(),U.stopPropagation();let Z=e.querySelector(`.${h.split(/\s+/)[0]}`)||F;h.split(/\s+/).filter(Boolean).forEach(xe=>Z.classList.remove(xe)),de("Reorder cancelled."),_.dragging=null,re()}else if((U.key==="ArrowDown"||U.key==="ArrowRight")&&_.dragging&&_.dragging.sourceEl===T){U.preventDefault();let Z=T.nextElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Fe=[...e.children].filter(bt=>!bt.classList.contains("nojs-drop-placeholder")),gt=Fe.indexOf(Z)+1;de(`Moved to position ${gt} of ${Fe.length}.`)}}else if((U.key==="ArrowUp"||U.key==="ArrowLeft")&&_.dragging&&_.dragging.sourceEl===T){U.preventDefault();let Z=T.previousElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Fe=[...e.children].filter(bt=>!bt.classList.contains("nojs-drop-placeholder")),gt=Fe.indexOf(Z)+1;de(`Moved to position ${gt} of ${Fe.length}.`)}}};T.addEventListener("keydown",Ge),T.__disposers=T.__disposers||[],T.__disposers.push(()=>T.removeEventListener("dragstart",ce),()=>T.removeEventListener("dragend",ye),()=>T.removeEventListener("keydown",Ge)),t.processTree(T)});let q=I.length===0;C.split(/\s+/).filter(Boolean).forEach(Y=>e.classList.toggle(Y,q))}let S=I=>{if(!_.dragging||d&&t.evaluate(d,o))return;let B=Ee(_.dragging.type,m),P=!0;if(b){let q=t.evaluate(b,o),Y=t.resolve(n,o);typeof q=="number"&&Array.isArray(Y)&&Y.length>=q&&(P=!1)}if(!B||!P){E.split(/\s+/).filter(Boolean).forEach(q=>e.classList.add(q)),y.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),re();return}E.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect=f?"copy":"move");let R=Xe(e,I.clientX,I.clientY,a);v&&Kt(e,R,v,g)},M=I=>{if(!_.dragging||d&&t.evaluate(d,o))return;let B=Ee(_.dragging.type,m),P=!0;if(b){let R=t.evaluate(b,o),q=t.resolve(n,o);typeof R=="number"&&Array.isArray(q)&&q.length>=R&&(P=!1)}B&&P&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect=f?"copy":"move")),w++,w===1&&(B&&P?(y.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):E.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)))},O=()=>{_.dragging&&(w--,w<=0&&(w=0,y.split(/\s+/).filter(Boolean).forEach(I=>e.classList.remove(I)),E.split(/\s+/).filter(Boolean).forEach(I=>e.classList.remove(I)),re(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging?.item}}))))},k=I=>{if(I.preventDefault(),I.stopPropagation(),w=0,!_.dragging||d&&t.evaluate(d,o)||!Ee(_.dragging.type,m))return;if(b){let T=t.evaluate(b,o),F=t.resolve(n,o);if(typeof T=="number"&&Array.isArray(F)&&F.length>=T)return}let B=_.dragging.item,P=_.dragging.listDirective,R=_.dragging.sourceIndex,q=Xe(e,I.clientX,I.clientY,a);y.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),E.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re();let Y=t.resolve(n,o);if(!Array.isArray(Y))return;let z=P&&P.el===e;if(z&&R===q){_.dragging=null;return}if(z&&R+1===q){_.dragging=null;return}let te=[...Y];if(z){let[T]=te.splice(R,1),F=R<q?q-1:q;te.splice(F,0,T),o.$set(n,te),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:te,item:B,from:R,to:F}}))}else{let T=f&&typeof B=="object"?{...B}:B;if(te.splice(q,0,T),o.$set(n,te),P&&!P.copyMode&&(l||P.removeMode)){let F=t.resolve(P.listPath,P.ctx);if(Array.isArray(F)&&R!=null){let ce=F.filter((ye,Ge)=>Ge!==R);P.ctx.$set(P.listPath,ce),P.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ce,item:B,index:R}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:te,item:B,from:R,fromList:P?t.resolve(P.listPath,P.ctx):null}}))}let le=_.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||_.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",J=z&&R<q?q:q+1;de(`Dropped ${le} at position ${J}.`),requestAnimationFrame(()=>{let F=[...e.children][z&&R<q?q-1:q];if(F){let ce=F.firstElementChild||F;A.split(/\s+/).filter(Boolean).forEach(ye=>ce.classList.add(ye)),ce.addEventListener("animationend",()=>{A.split(/\s+/).filter(Boolean).forEach(ye=>ce.classList.remove(ye))},{once:!0})}}),_.dragging=null},N=I=>{if(_.dragging&&Ee(_.dragging.type,m)&&(I.key==="Enter"||I.key===" ")){I.preventDefault();let B=e.querySelector(":focus");if(B){let R=(B.style?.display==="contents"&&B.firstElementChild||B).getBoundingClientRect(),q={preventDefault(){},stopPropagation(){},clientX:R.left+R.width/2,clientY:R.top+R.height+1,dataTransfer:null};k(q)}}};e.addEventListener("dragover",S),e.addEventListener("dragenter",M),e.addEventListener("dragleave",O),e.addEventListener("drop",k),e.addEventListener("keydown",N),fe(e,()=>{e.removeEventListener("dragover",S),e.removeEventListener("dragenter",M),e.removeEventListener("dragleave",O),e.removeEventListener("drop",k),e.removeEventListener("keydown",N)});let ae=o.$watch(L);fe(e,ae),L()}})}function Jt(t){Ze(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let n=t.findContext(e);ue(e,n);let o=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!o){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}_.selected.has(o)||_.selected.set(o,new Set);let c=_.selected.get(o),s=u=>{let m=e.getAttribute("drag"),l={item:m?t.evaluate(m,n):null,el:e,ctx:n};if(u.ctrlKey||u.metaKey){let p=[...c].find(d=>d.el===e);p?(c.delete(p),i.split(/\s+/).filter(Boolean).forEach(d=>e.classList.remove(d))):(c.add(l),i.split(/\s+/).filter(Boolean).forEach(d=>e.classList.add(d)))}else{for(let p of c)i.split(/\s+/).filter(Boolean).forEach(d=>p.el.classList.remove(d));c.clear(),c.add(l),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p))}};e.addEventListener("click",s),fe(e,()=>{e.removeEventListener("click",s);let u=[...c].find(m=>m.el===e);u&&c.delete(u)});let a=u=>{if(u.key==="Escape"){for(let m of c)i.split(/\s+/).filter(Boolean).forEach(f=>m.el.classList.remove(f));c.clear()}};window.addEventListener("keydown",a),fe(e,()=>window.removeEventListener("keydown",a))}})}var er=["drag","drop"];function vt(t,e={}){Xt(t),Zt(t),!pe(t)&&(Qt(t),Jt(t))}function tr(){Ut()}var rr=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],yt=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function me(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var cr,dr,Je,Ce,Et,nr,Qe,jt,_t,wt,At=null;function No(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function lr(){return K(cr,"validators")||{}}function Uo(t){return(t.getAttribute("type")||"text").toLowerCase()}var ur=new Set(["url","min","max"]);function pr(t){return t==null||String(t).trim()===""}function fr(t){return(t.hasAttribute("validate-empty")?t.getAttribute("validate-empty"):t.closest("form[validate]")?.getAttribute("validate-empty"))==="skip"}function Wo(t,e){let r=[],n=new Set,o=pr(t.value)&&fr(t),i=lr(),c=t.getAttribute("validate");if(c){let a=c.split("|").map(u=>u.trim());for(let u of a){let[m,...f]=u.split(":"),l=i[m];if(l){let p=l(t.value,...f,e);p!==!0&&p&&(r.push({rule:m,message:p}),n.add(m))}else{if(o&&ur.has(m))continue;let p=t.value,d=null;switch(m){case"required":(p==null||String(p).trim()==="")&&(d="Required");break;case"email":p&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p)&&(d="Invalid email");break;case"url":try{new URL(p)}catch{d="Invalid URL"}break;case"min":Number(p)<Number(f[0])&&(d=`Minimum value is ${f[0]}`);break;case"max":Number(p)>Number(f[0])&&(d=`Maximum value is ${f[0]}`);break;case"custom":if(f[0]&&i[f[0]]){let b=i[f[0]](p,e);b!==!0&&b&&(d=b)}break}d&&(r.push({rule:m,message:d}),n.add(m))}}}let s=t.validity;if(s&&!s.valid){for(let[a,u]of rr)if(s[a]){let m=u||Uo(t);n.has(m)||(r.push({rule:m,message:t.validationMessage}),n.add(m))}}return r}function Go(t,e,r){let n=t.getAttribute(`error-${e}`);if(n)return n;let o=t.getAttribute("error");return o&&!o.startsWith("#")?o:r}function Yo(t,e){if(!t.length)return null;let n=[...t].sort((o,i)=>{let c=yt.indexOf(o.rule),s=yt.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:n.rule,message:Go(e,n.rule,n.message)}}function mr(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Ko(t,e,r,n,o){let i=mr(n);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;jt(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.setAttribute("aria-live","polite"),a.__errorTemplateFor=n;let u=Je({$error:e,$rule:r,err:{message:e}},o);a.__ctx=u,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),No(a),Et(a)}function xt(t){let e=mr(t);e&&(jt(e),e.remove())}function or(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!dr(r,e)}catch{return!0}}function ir(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let n=e?e.getAttribute("validate-on"):null;return n?n.split(/\s+/):["input","focusout"]}function sr(t){return t.hasAttribute("model")?t.tagName==="SELECT"||t.type==="checkbox"||t.type==="radio"?"change":"input":null}function ar(t,e){return()=>{let r=t.getAttribute("model"),n=t.__gatedDirs&&t.__gatedDirs.some(o=>o.name==="model");if(r&&!n&&wt&&(t.type!=="radio"||t.checked)){let o=t.type==="checkbox"?t.checked:t.value;wt(`${r} = __val`,Ce(t),{__val:o})}e()}}function Xo(t,e,r,n=!1){let o=n&&pr(t),i=lr(),c=e.split("|").map(s=>s.trim());for(let s of c){let[a,...u]=s.split(":"),m=i[a];if(m){let f=m(t,...u,r);if(f!==!0&&f)return f}else{if(o&&ur.has(a))continue;switch(a){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(u[0]))return`Minimum value is ${u[0]}`;break;case"max":if(Number(t)>Number(u[0]))return`Maximum value is ${u[0]}`;break;case"custom":if(u[0]&&i[u[0]]){let f=i[u[0]](t,r);if(f!==!0&&f)return f}break}}}return null}function Zo(t){if(t.__ctx)return t.__ctx;let e=null;for(let n=t.parentElement;n;n=n.parentElement)if(n.__ctx){if(!ht(n))return Ce(t);e=n.__ctx;break}let r=Je({},e);return t.__ctx=r,r}var Qo=/^\(\)\s*=>\s*[\w$]+\.removeEventListener\(\s*(["'])submit\1\s*,\s*[\w$]+\s*\)$/;function Jo(t){let e=t&&t.fields;if(!e)return!1;let r=e.__nojsStubProbe;return!!r&&Object.isFrozen(r)}function gr(t){if(!At||t.__nojsElBoundCtx!==void 0)return!1;let e=t;for(;e&&!e.__ctx;)e=e.parentElement;if(!e||e!==t&&ht(e))return!1;if(t.tagName==="FORM"||t.closest("form")){let r=t.__disposers||[],n=r.length-1;for(;n>=0&&!Qo.test(Function.prototype.toString.call(r[n]).trim());)n--;if(n<0)return!1;r.splice(n,1)[0]()}if(t.tagName!=="FORM"&&!t.closest("form[validate]")){let r=Ce(t);Jo(r.$form)&&delete r.$form}try{At(t,"validate",t.getAttribute("validate"))}catch(r){_t(`directive "validate" init error on <${t.tagName.toLowerCase()}>:`,r)}return!0}function br(t){cr=t,dr=t.evaluate,Je=t.createContext,Ce=t.findContext,Et=t.processTree,nr=K(t,"cloneTemplate")||(()=>null),Qe=K(t,"disposeChildren")||(()=>{}),jt=K(t,"disposeTree")||Qe,_t=K(t,"warn")||console.warn,wt=K(t,"execStatement");let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):_t('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.');let r={priority:30,init(n,o,i){if(n.tagName==="FORM"){let p=function(){s&&typeof s.$notify=="function"&&s.$notify();let j=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT);for(;j.nextNode();){let x=j.currentNode.__ctx;x&&x!==s&&typeof x.$notify=="function"&&x.$notify()}},d=function(){return n.querySelectorAll("input, textarea, select")},b=function(){let j={},w={},x={},L=!0,S=null,M=0,O=!1;for(let k of d())k.name&&(k.type==="checkbox"?w[k.name]=k.checked:k.type==="radio"?k.checked?w[k.name]=k.value:k.name in w||(w[k.name]=""):w[k.name]=k.value);for(let k of d()){if(!k.name)continue;let N=u.has(k.name),ae=m.has(k.name);if(!or(k,s)){x[k.name]={valid:!0,dirty:ae,touched:N,error:null,value:w[k.name]},k.removeAttribute("aria-invalid");let J=k.getAttribute("error-class")||a;J&&k.classList.remove(...J.split(/\s+/)),xt(k);let T=k.getAttribute("as");T&&s.$set(T,x[k.name]);continue}let I=Wo(k,w),B=Yo(I,k),P=!B,R=ir(k,n),q=R.includes("input"),Y=R.includes("blur")||R.includes("focusout")||R.includes("submit"),z;!k.hasAttribute("validate-on")&&!n.hasAttribute("validate-on")?z=N||ae:z=q&&ae||Y&&N,P||(L=!1),!P&&z&&(j[k.name]=B.message,M++,S||(S=B.message)),x[k.name]={valid:P,dirty:ae,touched:N,error:B?B.message:null,value:w[k.name]},!P&&z?k.setAttribute("aria-invalid","true"):k.removeAttribute("aria-invalid");let te=k.getAttribute("error-class")||a;if(te){let J=te.split(/\s+/);!P&&z?k.classList.add(...J):k.classList.remove(...J)}if(B&&z){let J=k.getAttribute(`error-${B.rule}`),T=k.getAttribute("error"),F=(J&&J.startsWith("#")?J:null)||(T&&T.startsWith("#")?T:null);F?Ko(F,B.message,B.rule,k,s):xt(k)}else xt(k);let le=k.getAttribute("as");le&&s.$set(le,x[k.name])}f.size>0&&(O=!0),l.valid=L,l.errors=j,l.values=w,l.fields=x,l.firstError=S,l.errorCount=M,l.pending=O,s.$set("$form",{...l}),p(),v(n)},v=function(j){let w=l.valid&&!l.pending&&!l.submitting,x=j.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of x)if(L.getAttribute("auto-disable")!=="off"){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let S=L.getAttribute("disabled");if(S!=="disabled"&&S!=="true"&&S!=="false")continue}L.disabled=!w,L.__autoDisabled=!0}},h=function(j,w,x){j.addEventListener(w,x),me(n,()=>j.removeEventListener(w,x))},y=function(j){if(!j.name)return;let w=ir(j,n),x=sr(j),L=O=>{if(x==="change"){h(j,"input",ar(j,O));return}h(j,"input",O),x&&g.push([j,"input",O])},S=()=>{m.add(j.name),l.dirty=!0,b()},M=()=>{u.add(j.name),l.touched=!0,b()};w.includes("input")?L(S):L(()=>{m.add(j.name),l.dirty=!0,b()}),w.includes("blur")||w.includes("focusout")?h(j,"focusout",()=>{M(),w.includes("blur")&&S()}):h(j,"focusout",M),w.includes("submit")&&h(j,"focusout",M)},s=Zo(n);ue(n,s),n.setAttribute("novalidate","");let a=n.getAttribute("error-class"),u=new Set,m=new Set,f=new Map,l={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{l.dirty=!1,l.touched=!1,l.pending=!1,l.submitting=!1,u.clear(),m.clear(),n.reset(),b()},endSubmit:()=>{l.submitting=!1,b()}};s.$set("$form",l);let g=[],E=n.hasAttribute("validate-on"),A=[...d()].some(j=>j.hasAttribute("validate-on"));if(!E&&!A){let j=L=>{let S=L.target;S&&S.name&&m.add(S.name),l.dirty=!0,b()},w=L=>{L.target&&sr(L.target)==="change"?ar(L.target,()=>j(L))():j(L)};n.addEventListener("input",w),me(n,()=>n.removeEventListener("input",w)),n.addEventListener("change",j),me(n,()=>n.removeEventListener("change",j));let x=L=>{L.target&&L.target.name&&u.add(L.target.name),l.touched=!0,b()};n.addEventListener("focusout",x),me(n,()=>n.removeEventListener("focusout",x))}else{for(let j of d())y(j);if(g.length){let j=!1;me(n,()=>{j=!0}),queueMicrotask(()=>{if(!j){for(let[w,x,L]of g)w.removeEventListener(x,L),w.addEventListener(x,L);g.length=0}})}}let C=j=>{for(let w of d())w.name&&u.add(w.name);if(l.touched=!0,b(),!l.valid||l.pending){j.preventDefault(),j.stopImmediatePropagation();return}l.submitting=!0,v(n),s.$set("$form",{...l}),p()};n.addEventListener("submit",C,!0),me(n,()=>n.removeEventListener("submit",C,!0)),n.__nojsResetSubmitting=()=>{l.submitting=!1,b()},me(n,()=>{delete n.__nojsResetSubmitting}),requestAnimationFrame(b);return}let c=Ce(n);if(ue(n,c),i&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT")){let s=!!n.closest("form[validate]"),a=s?null:n.getAttribute("error"),u=()=>{if(s&&!or(n,Ce(n))){n.removeAttribute("aria-invalid");return}let m=Xo(n.value,i,{},fr(n));if(m?n.setAttribute("aria-invalid","true"):n.removeAttribute("aria-invalid"),m&&a){let f=n.nextElementSibling?.__validationError?n.nextElementSibling:null;f||(f=document.createElement("div"),f.__validationError=!0,f.style.display="contents",n.parentNode.insertBefore(f,n.nextSibling));let l=nr(a);if(l){let p=Je({err:{message:m}},c);Qe(f),f.innerHTML="",f.__ctx=p,f.appendChild(l),Et(f)}}else{let f=n.nextElementSibling?.__validationError?n.nextElementSibling:null;f&&(Qe(f),f.innerHTML="")}};n.addEventListener("input",u),me(n,()=>n.removeEventListener("input",u))}}};At=r.init,t.directive("validate",r)}function hr(t,e={}){br(t)}function vr(){}var Se=new Map,ee=new Map;function yr(){let t=Array.from(Se.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let n of r)try{n()}catch{}e.__disposers=[]}}for(let e of ee.values())clearTimeout(e);ee.clear();for(let e of Se.values())e.remove();Se.clear()}function xr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function ei(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var et=8;function _r(t,e,r){let n=e.getBoundingClientRect(),o=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=n.bottom+et,a=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,a=n.left-o.width-et;break;case"right":s=n.top+(n.height-o.height)/2,a=n.right+et;break;default:s=n.top-o.height-et,a=n.left+(n.width-o.width)/2;break}a<4&&(a=4),a+o.width>i-4&&(a=i-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var ti=0;function ri(t,e,r){document.body.appendChild(e),_r(e,t,r),e.setAttribute("aria-hidden","false")}function Er(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function ni(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function wr(t){t.directive("tooltip",{priority:20,init(e,r,n){xr();let o=n;if(!o){ni(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),u=a?t.findContext(e):null,m=()=>{if(!a||!u)return!1;try{return!!t.evaluate(a,u)}catch{return!1}},f=`nojs-tooltip-${++ti}`,l=document.createElement("div");l.className="nojs-tooltip",l.setAttribute("role","tooltip"),l.setAttribute("id",f),l.setAttribute("aria-hidden","true"),l.textContent=o,e.setAttribute("aria-describedby",f),Se.set(e,l);let p=!1,d=0,b=()=>{!p||!e.isConnected||d||(d=requestAnimationFrame(()=>{d=0,!(!p||!e.isConnected)&&_r(l,e,i)}))},v=()=>{window.addEventListener("scroll",b,!0),window.addEventListener("resize",b)},g=()=>{window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),d&&(cancelAnimationFrame(d),d=0)},h=()=>{p||(ri(e,l,i),p=!0,v())},y=()=>{if(!p){Er(e,l);return}g(),Er(e,l),p=!1},E=()=>{if(m())return;ee.has(e)&&clearTimeout(ee.get(e));let M=setTimeout(()=>{ee.delete(e),!m()&&e.isConnected&&h()},s);ee.set(e,M)},A=()=>{ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),y()},C=()=>E(),j=()=>A(),w=()=>E(),x=()=>A(),L=M=>{M.key==="Escape"&&l.getAttribute("aria-hidden")==="false"&&A()};e.addEventListener("mouseenter",C),e.addEventListener("mouseleave",j),e.addEventListener("focusin",w),e.addEventListener("focusout",x),e.addEventListener("keydown",L);let S=null;if(a&&u&&typeof u.$watch=="function"){let M=()=>{p&&m()&&y()};S=u.$watch(M)}ei(e,()=>{e.removeEventListener("mouseenter",C),e.removeEventListener("mouseleave",j),e.removeEventListener("focusin",w),e.removeEventListener("focusout",x),e.removeEventListener("keydown",L),S&&(S(),S=null),g(),ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),p=!1,l.remove(),Se.delete(e)})}})}function Ar(t,e={}){wr(t)}function jr(){yr()}var X=new Map;function Lr(){X.clear()}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function Lt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function De(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function Ct(t){try{return t.matches(":popover-open")}catch{return!1}}var ge=8;function rt(t,e,r){let n=e.getBoundingClientRect(),o=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=n.top-o.height-ge,a=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,a=n.left-o.width-ge;break;case"right":s=n.top+(n.height-o.height)/2,a=n.right+ge;break;default:s=n.bottom+ge,a=n.left+(n.width-o.width)/2;break}r==="bottom"&&s+o.height>c&&(s=n.top-o.height-ge),r==="top"&&s<0&&(s=n.bottom+ge),r==="right"&&a+o.width>i&&(a=n.left-o.width-ge),r==="left"&&a<0&&(a=n.right+ge),a<4&&(a=4),a+o.width>i-4&&(a=i-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function kt(t,e){t._untrack&&t._untrack();let r=0,n=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(!Ct(c)){i();return}rt(c,e,t.position)},o=()=>{r||(r=requestAnimationFrame(n))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o),t._untrack=null};return window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),t._untrack=i,i}function _e(t){t&&t._untrack&&t._untrack()}function kr(t){t.directive("popover",{priority:20,init(r,n,o){tt();let i=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!X.has(i))X.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=X.get(i);a.popoverEl=r,a.position=c}let s=a=>{let u=X.get(i);if(!u)return;let m=a.newState==="open";u.open=m;for(let f of u.triggerEls)f.setAttribute("aria-expanded",String(m));m||(r.style.visibility="",_e(u))};r.addEventListener("toggle",s),Lt(r,()=>{r.removeEventListener("toggle",s);let a=X.get(i);a&&(_e(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&X.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,n,o){tt();let i=o;if(!i){let a=r.closest("[use]")||r.parentElement,u=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(u&&(i=u.getAttribute("data-popover-id")||u.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),X.has(i)||X.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),X.get(i).triggerEls.add(r);let c=a=>{let u=X.get(i);if(!u||!u.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(De(u.popoverEl)){u.popoverEl.style.visibility="hidden";try{u.popoverEl.togglePopover(),Ct(u.popoverEl)?(rt(u.popoverEl,r,u.position),kt(u,r)):_e(u)}finally{u.popoverEl.style.visibility=""}}};r.addEventListener("click",c);let s=a=>{let u=X.get(i);a.key==="Escape"&&u?.open&&(De(u.popoverEl,"hidePopover")&&u.popoverEl.hidePopover(),_e(u),r.focus())};document.addEventListener("keydown",s),Lt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=X.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(_e(a),X.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){tt();let n=()=>{let o=r.closest(".nojs-popover");!o||!De(o,"hidePopover")||o.hidePopover()};r.addEventListener("click",n),Lt(r,()=>r.removeEventListener("click",n))}});let e=(r,n)=>e.open(r,n);e.open=(r,n)=>{let o=X.get(r);if(!o||!o.popoverEl||!De(o.popoverEl,"showPopover"))return!1;o.popoverEl.style.visibility="hidden";try{o.popoverEl.showPopover();let i=n||[...o.triggerEls][0];i&&(rt(o.popoverEl,i,o.position),kt(o,i))}catch{return!1}finally{o.popoverEl.style.visibility=""}return!0},e.close=r=>{let n=X.get(r);if(!n||!n.popoverEl||!De(n.popoverEl,"hidePopover"))return!1;try{n.popoverEl.hidePopover()}catch{}return _e(n),!0},e.toggle=(r,n)=>{let o=X.get(r);if(!o||!o.popoverEl||!De(o.popoverEl))return!1;o.popoverEl.style.visibility="hidden";try{o.popoverEl.togglePopover();let i=n||[...o.triggerEls][0];i&&Ct(o.popoverEl)?(rt(o.popoverEl,i,o.position),kt(o,i)):_e(o)}finally{o.popoverEl.style.visibility=""}return!0},t.popover=e}function Cr(t,e={}){kr(t)}function Sr(){Lr()}var W=[],ie=new Map,oi=1e4;function Dr(){return oi+W.length}function Tr(){W.length=0,ie.clear()}function Te(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function ii(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Br='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',St=new WeakMap;function si(t){let e=r=>{if(r.key!=="Tab")return;let n=[...t.querySelectorAll(Br)].filter(c=>c.offsetParent!==null);if(n.length===0){r.preventDefault();return}let o=n[0],i=n[n.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),o.focus())};t.addEventListener("keydown",e),St.set(t,e)}function Ir(t){let e=St.get(t);e&&(t.removeEventListener("keydown",e),St.delete(t))}var Oe=new WeakMap;function Hr(t){t.directive("modal",{priority:10,init(r,n,o){Te();let i=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),u=r.getAttribute("modal-escape"),m=l=>{l.target===r&&s!=="false"&&u!=="false"&&Ie(r,i)};r.addEventListener("click",m),ie.set(i,r);let f=l=>{if(l.newState==="open"){if(r.style.zIndex=String(Dr()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(d=>d.el===r))return;let p=r.querySelector(Br);p?p.focus():r.focus()}),si(r),u!=="false"){let p=d=>{d.key==="Escape"&&(d.stopPropagation(),Ie(r,i))};r.addEventListener("keydown",p),Oe.set(r,p)}}else if(l.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(b=>r.classList.remove(b)),Ir(r);let p=Oe.get(r);p&&(r.removeEventListener("keydown",p),Oe.delete(r));let d=W.findIndex(b=>b.el===r);if(d===-1&&(d=W.findIndex(b=>b.id===i)),d!==-1){let b=W[d];W.splice(d,1),b.triggerEl&&requestAnimationFrame(()=>{b.triggerEl.focus()})}}};r.addEventListener("toggle",f),ii(r,()=>{r.removeEventListener("click",m),r.removeEventListener("toggle",f),Ir(r);let l=Oe.get(r);l&&(r.removeEventListener("keydown",l),Oe.delete(r)),ie.delete(i);let p=W.findIndex(d=>d.el===r);p===-1&&(p=W.findIndex(d=>d.id===i)),p!==-1&&W.splice(p,1)})}});let e=r=>e.open(r);e.open=r=>{let n=ie.get(r);if(!n)return!1;try{n.showPopover()}catch{return!1}return W.some(o=>o.id===r)||W.push({id:r,el:n,triggerEl:null}),!0},e.close=r=>{let n=ie.get(r);return n?(Ie(n,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)Ie(W[r].el,W[r].id)},t.modal=e}function Ie(t,e){try{t.hidePopover()}catch{}}function $r(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ai(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function Mr(t){t.directive("modal-open",{priority:10,init(e,r,n){Te();let o=n;if(!o){let f=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(f&&(o=f.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let m=ie.get(o)||ai(o);if(!m){console.warn(`[modal-open] modal "${o}" not found`);return}let f=W.some(l=>l.id===o);m.id&&e.setAttribute("aria-controls",m.id);try{m.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`);return}f||W.push({id:o,el:m,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,u=()=>{let m=ie.get(o);return m?(a=m,s=f=>{f.newState==="closed"&&e.setAttribute("aria-expanded","false")},m.addEventListener("toggle",s),!0):!1};if(!u()){let m=requestAnimationFrame(u);$r(e,()=>cancelAnimationFrame(m))}e.addEventListener("click",i),$r(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function ci(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Pr(t){t.directive("modal-close",{priority:10,init(e,r,n){Te();let o=()=>{let i,c;if(n){if(c=n,i=ie.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Ie(i,c)};e.addEventListener("click",o),ci(e,()=>{e.removeEventListener("click",o)})}})}function Rr(t,e={}){Hr(t),Mr(t),Pr(t)}function qr(){Tr()}var ne={openMenus:new Map},V={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function Fr(){ne.openMenus.clear(),V.installed=!1,V.instanceCount=0,V.outsideClickHandler=null,V.escHandler=null}function Be(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var di=0;function li(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ui(){V.installed||(V.outsideClickHandler=t=>{let e=[...ne.openMenus.entries()];for(let[r,{toggle:n,wrapper:o}]of e)if(!o.contains(t.target)){if(r.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}ne.openMenus.delete(r)}},V.escHandler=t=>{if(t.key!=="Escape")return;let e=[...ne.openMenus.entries()];for(let[r,{toggle:n}]of e){if(r.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}n.focus()}ne.openMenus.clear()},document.addEventListener("click",V.outsideClickHandler,!0),document.addEventListener("keydown",V.escHandler),V.installed=!0)}function Tt(){V.installed&&(document.removeEventListener("click",V.outsideClickHandler,!0),document.removeEventListener("keydown",V.escHandler),V.outsideClickHandler=null,V.escHandler=null,V.installed=!1)}function Or(t,e,r){let n=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,u,m;switch(n){case"top":u=i.top-c.height,m=i.left;break;case"left":u=i.top,m=i.left-c.width;break;case"right":u=i.top,m=i.right;break;default:u=i.bottom,m=i.left}n==="bottom"||n==="top"?o==="end"&&(m=i.right-c.width):o==="end"&&(u=i.bottom-c.height),n==="bottom"&&u+c.height>s&&i.top-c.height>0?u=i.top-c.height:n==="top"&&u<0&&i.bottom+c.height<=s&&(u=i.bottom),m<4&&(m=4),m+c.width>a-4&&(m=a-c.width-4),t.style.top=`${u}px`,t.style.left=`${m}px`}function It(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Dt(t){let e=It(t);e.length&&e[0].focus()}function zr(t){let e=It(t);e.length&&e[e.length-1].focus()}function Vr(t){t.directive("dropdown",{priority:15,init(r){Be()}}),t.directive("dropdown-toggle",{priority:15,init(r){Be();let n=r.closest("[dropdown]");if(!n)return;let o=n.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${di++}`),r.setAttribute("aria-controls",o.id);let i=!1,c=typeof o.showPopover=="function"&&typeof o.hidePopover=="function";function s(){if(o.setAttribute("data-open",""),c&&!i)try{o.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Or(o,r,n),ne.openMenus.set(o,{toggle:r,wrapper:n})}function a(){if(c&&i){i=!1;try{o.hidePopover()}catch{}}o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ne.openMenus.delete(o)}function u(){return r.getAttribute("aria-expanded")==="true"}let m=b=>{b.newState==="closed"&&u()&&a()};o.addEventListener("toggle",m);let f=b=>{b.preventDefault(),b.stopPropagation(),u()?a():s()};r.addEventListener("click",f),V.instanceCount++,ui();let l=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),Dt(o);break;case"ArrowDown":b.preventDefault(),s(),Dt(o);break;case"ArrowUp":b.preventDefault(),s(),zr(o);break}};r.addEventListener("keydown",l);let p=b=>{if(!(!u()||It(o).find(h=>h===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),Dt(o);break;case"ArrowUp":b.preventDefault(),zr(o);break}};o.addEventListener("keydown",p);let d=()=>{u()&&Or(o,r,n)};window.addEventListener("scroll",d,!0),window.addEventListener("resize",d),li(r,()=>{r.removeEventListener("click",f),r.removeEventListener("keydown",l),o.removeEventListener("keydown",p),o.removeEventListener("toggle",m),window.removeEventListener("scroll",d,!0),window.removeEventListener("resize",d),ne.openMenus.delete(o),V.instanceCount--,V.instanceCount<=0&&(V.instanceCount=0,Tt())})}}),t.directive("dropdown-menu",{priority:15,init(r){Be(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function Nr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function pi(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Bt(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ne.openMenus.has(t)&&ne.openMenus.delete(t)}function Ur(t){t.directive("dropdown-item",{priority:15,init(e){Be();let r=e.closest("[dropdown-menu]"),n=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let o=c=>{if(!r)return;let s=pi(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),Bt(r,n),n){let u=n.querySelector("[dropdown-toggle]");u&&u.focus()}break}case"Tab":{Bt(r,n);break}}};e.addEventListener("keydown",o),Nr(e,()=>e.removeEventListener("keydown",o));let i=()=>{if(Bt(r,n),n){let c=n.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),Nr(e,()=>e.removeEventListener("click",i))}})}function Wr(t,e={}){Vr(t),Ur(t)}function Gr(){Tt(),Fr()}var se=new Map,He=new Set,Yr=0;function Kr(){return++Yr}function Xr(){for(let t of He)clearTimeout(t);He.clear();for(let t of se.values())t.remove();se.clear(),Yr=0}function Zr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Ht(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var fi=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function $t(){return se.size>0?se.values().next().value:mi("top-right")}function mi(t){if(se.has(t))return se.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),se.set(t,e),e}function gi(t){return t.startsWith("top")}function Mt(t,e,r,n,o){let i=Kr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),o){let u=document.createElement("button");u.type="button",u.classList.add("nojs-toast-dismiss"),u.setAttribute("aria-label","Dismiss"),u.textContent="\xD7",u.addEventListener("click",()=>nt(s)),s.appendChild(u)}if(gi(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),n>0){let u=setTimeout(()=>{He.delete(u),s.isConnected&&nt(s)},n);He.add(u),s._toastTimerId=u}return s}function nt(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),He.delete(t._toastTimerId)),t.remove())}function Qr(t){Zr(),t.directive("toast-container",{priority:10,init(r,n,o){let i=o&&fi.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),se.set(i,r),Ht(r,()=>{se.get(i)===r&&se.delete(i)})}}),t.directive("toast",{priority:10,init(r,n,o){if(!o)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let d=()=>{let b=$t();Mt(b,o,i,s,a)};r.addEventListener("click",d),Ht(r,()=>r.removeEventListener("click",d));return}let m=t.findContext(r);if(!m||typeof m.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let f;function l(){let d=t.evaluate(o,m);if(d&&d!==f){let b=typeof d=="string"?d:String(d),v=$t();Mt(v,b,i,s,a),f=d}else f=d}let p=m.$watch(l);Ht(r,p)}});let e=(r,n="info",o=3e3)=>{if(typeof document>"u")return;let i=!0,c=$t();return Mt(c,String(r),n,o,i)};e.dismiss=r=>{let n=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),o=document.querySelector(`[data-toast-id="${n}"]`);o&&nt(o)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>nt(r))},t.toast=e,t.global("toast",e)}function Jr(t,e={}){Qr(t)}function en(){Xr()}var we={containers:new Map};function tn(){we.containers.clear()}function rn(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function bi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var hi=0;function nn(t){return`${t}-${++hi}`}function ze(t,e,r=!1){let n=we.containers.get(t);if(!n)return;let{tabs:o,panels:i}=n;if(!(e<0||e>=o.length)&&!(!r&&o[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<o.length;c++)o[c].setAttribute("aria-selected","false"),o[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;o[e].setAttribute("aria-selected","true"),o[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,n.activeIndex=e}}function Ve(t,e,r){let n=t.length,o=e;for(let i=0;i<n;i++)if(o=(o+r+n)%n,t[o].getAttribute("aria-disabled")!=="true")return o;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function on(t){t.directive("tabs",{priority:10,init(e,r,n){rn();let o=[],i=[];for(let g of Array.from(e.children))g.hasAttribute("tab")?o.push(g):g.hasAttribute("panel")&&i.push(g);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==i.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(o.length,i.length);for(let g=0;g<a;g++){let h=o[g],y=i[g],E=h.id||nn("nojs-tab"),A=y.id||nn("nojs-panel");h.id=E,y.id=A,h.setAttribute("role","tab"),h.setAttribute("aria-selected","false"),h.setAttribute("aria-controls",A),h.setAttribute("tabindex","-1"),h.classList.add("nojs-tab"),y.setAttribute("role","tabpanel"),y.setAttribute("aria-labelledby",E),y.setAttribute("tabindex","0"),y.setAttribute("aria-hidden","true"),y.inert=!0,y.classList.add("nojs-panel"),s.appendChild(h)}for(let g=a;g<i.length;g++){let h=i[g];h.setAttribute("role","tabpanel"),h.setAttribute("aria-hidden","true"),h.inert=!0,h.classList.add("nojs-panel")}let u=i[0];u?e.insertBefore(s,u):e.appendChild(s),we.containers.set(e,{tabs:o.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let m=t.findContext(e),f=[],l=(g,h)=>{let y=!1;try{y=!!t.evaluate(h,m)}catch{y=!1}y?g.setAttribute("aria-disabled","true"):g.removeAttribute("aria-disabled")};for(let g=0;g<a;g++){let h=o[g],y=h.getAttribute("tab-disabled");if(y&&(l(h,y),m&&typeof m.$watch=="function")){let E=m.$watch(()=>l(h,y));f.push(E)}}let p=0;if(n&&n.trim()!==""){let g=parseInt(n,10);!isNaN(g)&&g>=0&&g<a&&(p=g)}let d=o.slice(0,a);if(o[p]?.getAttribute("aria-disabled")==="true"){let g=Ve(d,p,1);g!==-1?(p=g,ze(e,p)):ze(e,p,!0)}else ze(e,p);let b=g=>{let h=we.containers.get(e);if(!h)return;let y=g.target;if(y.getAttribute("role")!=="tab")return;let{tabs:E}=h,A=E.indexOf(y);if(A===-1)return;let C=-1;switch(g.key){case"ArrowRight":case"ArrowDown":C=Ve(E,A,1);break;case"ArrowLeft":case"ArrowUp":C=Ve(E,A,-1);break;case"Home":C=Ve(E,E.length-1,1);break;case"End":C=Ve(E,0,-1);break;case"Tab":return;default:return}C!==-1&&C!==A&&(g.preventDefault(),ze(e,C),E[C].focus())};s.addEventListener("keydown",b);let v=g=>{let h=g.target.closest("[role='tab']");if(!h)return;let y=we.containers.get(e);if(!y)return;let E=y.tabs.indexOf(h);E!==-1&&h.getAttribute("aria-disabled")!=="true"&&(ze(e,E),h.focus())};s.addEventListener("click",v),bi(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",v);for(let g of f)g&&g();f.length=0,we.containers.delete(e)})}})}function sn(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function an(t){t.directive("panel",{priority:11,init(){}})}function cn(t,e={}){on(t),sn(t),an(t)}function dn(){tn()}var $={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function ln(){$.branches.clear(),$.selectedItem=null,$.typeahead="",$.typeaheadTimer&&(clearTimeout($.typeaheadTimer),$.typeaheadTimer=null)}function $e(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function Me(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function un(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n;for(;n=r.nextNode();)e.push(n);return e}function pn(t){return t.closest('[role="tree"]')}function vi(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let n=e.previousElementSibling;if(n?.matches?.('[role="treeitem"]'))return n}return t.parentElement?.closest('[role="treeitem"]')||null}function yi(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(n=>n.remove()),(e.textContent||"").trim().toLowerCase()}function Pt(t){let e=$.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),$.selectedItem=t}function fn(t){let e=$.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function xi(t){let e=$.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function Ei(t){let e=$.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function mn(t,e){let r=pn(e);if(!r)return;let n=un(r),o=n.indexOf(e);if(o<0)return;let i=$.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)xi(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&Ae(s,n)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)Ei(e);else{let s=vi(e);s&&Ae(s,un(r))}break;case"ArrowDown":t.preventDefault(),o<n.length-1&&Ae(n[o+1],n);break;case"ArrowUp":t.preventDefault(),o>0&&Ae(n[o-1],n);break;case"Enter":case" ":t.preventDefault(),Pt(e),c&&fn(e);break;case"Home":t.preventDefault(),n.length>0&&Ae(n[0],n);break;case"End":t.preventDefault(),n.length>0&&Ae(n[n.length-1],n);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),$.typeahead+=t.key.toLowerCase(),$.typeaheadTimer&&clearTimeout($.typeaheadTimer),$.typeaheadTimer=setTimeout(()=>{$.typeahead="",$.typeaheadTimer=null},500);let s=o+1;for(let a=0;a<n.length;a++){let u=(s+a)%n.length;if(yi(n[u]).startsWith($.typeahead)){Ae(n[u],n);break}}}break}}function gn(t){t.directive("tree",{priority:15,init(e){$e(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function bn(t){t.directive("branch",{priority:16,init(e,r,n){$e();let o=n==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(o));let i=pn(e);if(i){let u=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",u?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let u=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);u?($.branches.set(e,{expanded:o,subtreeEl:u}),u.setAttribute("aria-hidden",String(!o))):$.branches.set(e,{expanded:o,subtreeEl:null})});let s=u=>{u.target.closest?.('[role="treeitem"]')===e&&(u.stopPropagation(),Pt(e),fn(e))};e.addEventListener("click",s),Me(e,()=>e.removeEventListener("click",s));let a=u=>{mn(u,e)};e.addEventListener("keydown",a),Me(e,()=>e.removeEventListener("keydown",a)),Me(e,()=>{c=!0,$.branches.delete(e),$.selectedItem===e&&($.selectedItem=null),$.typeaheadTimer&&(clearTimeout($.typeaheadTimer),$.typeaheadTimer=null,$.typeahead="")})}})}function Ae(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function hn(t){t.directive("subtree",{priority:16,init(e){$e(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let n of e.children)if(n.tagName==="LI"&&!n.querySelector("[branch], .nojs-branch")){n.setAttribute("role","treeitem"),n.setAttribute("tabindex","-1"),n.classList.add("nojs-tree-leaf");let o=c=>{c.stopPropagation(),Pt(n)};n.addEventListener("click",o),Me(n,()=>n.removeEventListener("click",o));let i=c=>{mn(c,n)};n.addEventListener("keydown",i),Me(n,()=>n.removeEventListener("keydown",i)),Me(n,()=>{$.selectedItem===n&&($.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let n=$.branches.get(r);n?(e.setAttribute("aria-hidden",String(!n.expanded)),n.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function vn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Rt(t){return t.closest('[role="treeitem"]')}function _i(t){return t.closest('[role="tree"]')}function wi(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Ai(t){return wi(t).indexOf(t)}function ji(t,e,r){let n=t.getBoundingClientRect(),o=e-n.top,i=n.height;return r==="reparent"?"on":r==="reorder"?o<i/2?"before":"after":o<i*.25?"before":o>i*.75?"after":"on"}function yn(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var H={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Pe(){H.indicator&&(H.indicator.remove(),H.indicator=null)}function Ne(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function Li(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function ki(t,e){Pe();let r=Li(),n=t.getBoundingClientRect(),o=_i(t);if(!o)return;let i=o.getBoundingClientRect();r.style.position="absolute",r.style.left=n.left-i.left+"px",r.style.width=n.width+"px",e==="before"?r.style.top=n.top-i.top-1+"px":r.style.top=n.bottom-i.top-1+"px",getComputedStyle(o).position==="static"&&(o.style.position="relative"),o.appendChild(r),H.indicator=r}function xn(t){t.directive("tree-drag-mode",{priority:15,init(e,r,n){if($e(),n!=="reparent"&&n!=="reorder"&&n!=="both")return;let o=0,i=l=>{let p=Rt(l.target);if(p&&e.contains(p)){if(p.hasAttribute("tree-drag-disabled")){l.preventDefault();return}H.dragging={el:p,treeRoot:e},l.dataTransfer&&(l.dataTransfer.effectAllowed="move",l.dataTransfer.setData("text/plain","")),p.classList.add("nojs-dragging"),p.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:p}}))}},c=l=>{if(!H.dragging||H.dragging.treeRoot!==e)return;let p=Rt(l.target);if(!p||!e.contains(p)||p===H.dragging.el||yn(p,H.dragging.el))return;l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move");let d=ji(p,l.clientY,n);(H.currentTarget!==p||H.currentPosition!==d)&&(Ne(e),Pe(),H.currentTarget=p,H.currentPosition=d,d==="on"?p.classList.add("nojs-tree-drag-over"):ki(p,d))},s=l=>{H.dragging&&H.dragging.treeRoot===e&&(o++,c(l))},a=l=>{H.dragging&&(o--,o<=0&&(o=0,Ne(e),Pe(),H.currentTarget=null,H.currentPosition=null))},u=l=>{if(l.preventDefault(),l.stopPropagation(),o=0,!H.dragging||H.dragging.treeRoot!==e)return;let p=H.dragging.el,d=H.currentTarget,b=H.currentPosition;if(Ne(e),Pe(),!d||!b){H.dragging=null,H.currentTarget=null,H.currentPosition=null;return}if(d===p||yn(d,p)){H.dragging=null,H.currentTarget=null,H.currentPosition=null;return}if(b==="on"){let v=d.querySelector(':scope > [role="group"]');v||(v=d.nextElementSibling?.matches?.('[role="group"]')?d.nextElementSibling:null),v?v.setAttribute("aria-hidden","false"):(v=document.createElement("ul"),v.setAttribute("role","group"),v.setAttribute("subtree",""),v.classList.add("nojs-subtree","nojs-tree"),v.setAttribute("aria-hidden","false"),d.appendChild(v));let g=$.branches.get(d);g&&(g.expanded=!0,g.subtreeEl=v,d.setAttribute("aria-expanded","true")),v.appendChild(p),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:p,newParent:d}}))}else{let v=d.parentElement;if(!v){H.dragging=null,H.currentTarget=null,H.currentPosition=null;return}if(b==="before")v.insertBefore(p,d);else{let h=d.nextElementSibling,y=h?.matches?.('[role="group"]')?h.nextElementSibling:h;y?v.insertBefore(p,y):v.appendChild(p)}let g=Ai(p);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:p,newIndex:g}}))}H.dragging=null,H.currentTarget=null,H.currentPosition=null},m=l=>{let p=Rt(l.target),d=H.dragging?.el||(p?.classList.contains("nojs-dragging")?p:null);p&&p.classList.remove("nojs-dragging"),Ne(e),Pe(),o=0,d&&d.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:d}})),H.dragging=null,H.currentTarget=null,H.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",u),e.addEventListener("dragend",m),vn(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",u),e.removeEventListener("dragend",m),Ne(e),Pe()}),Ci(e);let f=new MutationObserver(l=>{for(let p of l){if(p.type==="attributes"){p.target.getAttribute("role")==="treeitem"&&ot(p.target);continue}for(let d of p.addedNodes){if(d.nodeType!==1)continue;d.getAttribute("role")==="treeitem"&&ot(d);let b=d.querySelectorAll?.('[role="treeitem"]');if(b)for(let v of b)ot(v)}}});f.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["role"]}),vn(e,()=>f.disconnect())}})}function ot(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function Ci(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)ot(r)}function En(t,e={}){gn(t),bn(t),hn(t),xn(t)}function _n(){ln()}var it=new Map;function wn(){it.clear()}function st(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function An(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let o=e(r)?.$form;return o?!!o.valid:!0}function jn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Ln(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Ue(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Si(t,e){for(let n=e;n;n=n.parentElement)if(n.__ctx)return t.findContext(e);let r=t.createContext({},null);return e.__ctx=r,Wt(e),r}function kn(t){t.directive("stepper",{priority:14,init(e,r,n){st();let o=Array.from(e.querySelectorAll("[step]"));if(!o.length){console.warn("[stepper] No [step] children found.");return}let i=Si(t,e),c=n&&parseInt(n,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",u=e.getAttribute("stepper-nav")!=="false",m=e.getAttribute("aria-label")||"Stepper",f=Math.max(0,Math.min(c,o.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",m),e.classList.add("nojs-stepper");let l=null,p=[];if(a){l=document.createElement("div"),l.className="nojs-stepper-indicator",l.setAttribute("role","tablist"),l.setAttribute("aria-label","Progress"),o.forEach((x,L)=>{if(L>0){let N=document.createElement("div");N.className="nojs-stepper-separator",N.setAttribute("aria-hidden","true"),l.appendChild(N)}let S=document.createElement("button");S.type="button",S.className="nojs-stepper-indicator-item",S.setAttribute("role","tab"),S.setAttribute("aria-selected",L===f?"true":"false");let M=x.getAttribute("step-label")||`Step ${L+1}`,O=document.createElement("span");O.textContent=M,S.appendChild(O),S.setAttribute("aria-label",M);let k=`nojs-stepper-tab-${Di++}`;if(S.id=k,s==="free"){S.setAttribute("data-clickable","");let N=()=>A(L);S.addEventListener("click",N),Ue(e,()=>S.removeEventListener("click",N))}else S.setAttribute("tabindex","-1");l.appendChild(S),p.push(S)});let w=x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let L=f;x.key==="ArrowRight"?L=Math.min(f+1,o.length-1):x.key==="ArrowLeft"?L=Math.max(f-1,0):x.key==="Home"?L=0:x.key==="End"&&(L=o.length-1),s==="free"?(A(L),p[L]?.focus()):p[f]?.focus()};l.addEventListener("keydown",w),Ue(e,()=>l.removeEventListener("keydown",w)),e.insertBefore(l,e.firstChild)}let d=null,b=null,v=null;if(u){d=document.createElement("div"),d.className="nojs-stepper-nav",d.setAttribute("aria-hidden","true"),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-prev",b.textContent="Previous";let w=()=>E();b.addEventListener("click",w),Ue(e,()=>b.removeEventListener("click",w)),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-next",v.textContent="Next";let x=()=>y();v.addEventListener("click",x),Ue(e,()=>v.removeEventListener("click",x)),d.appendChild(b),d.appendChild(v),e.appendChild(d)}function g(w){let x=o[w];if(!x)return!0;if(!An(x,t.findContext)){let M=x.querySelector("form[validate]");return M&&(jn(M),p[w]&&p[w].classList.add("nojs-step-invalid"),Ln(e,x,M)),!1}p[w]&&p[w].classList.remove("nojs-step-invalid");let L=x.querySelectorAll("[required]");for(let M of L)if(typeof M.checkValidity=="function"&&!M.checkValidity())return M.reportValidity(),!1;let S=x.getAttribute("step-validate");if(S)try{if(!t.evaluate(S,i))return!1}catch(M){return console.warn(`[stepper] step-validate error: ${M.message}`),!1}return!0}function h(w){if(o.forEach((x,L)=>{let S=L===f;x.setAttribute("aria-hidden",S?"false":"true"),S?(x.removeAttribute("inert"),x.setAttribute("aria-current","step")):(x.setAttribute("inert",""),x.removeAttribute("aria-current"))}),p.length&&p.forEach((x,L)=>{x.setAttribute("aria-selected",L===f?"true":"false"),L<f?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",L===f?"0":"-1");let S=o[L];S.id&&(x.setAttribute("aria-controls",S.id),S.setAttribute("aria-labelledby",x.id))}),b&&(b.disabled=f===0),v&&(v.textContent=f===o.length-1?"Finish":"Next"),!w){let x=o[f];x&&requestAnimationFrame(()=>x.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!w,detail:{current:f,total:o.length}}))}function y(){return f>=o.length-1?(s==="linear"&&!g(f)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:f,total:o.length}})),!1):s==="linear"&&!g(f)?!1:(f++,h(),j(),!0)}function E(){return f<=0?!1:(f--,h(),j(),!0)}function A(w){if(w<0||w>=o.length||w===f)return!1;if(s==="linear"&&w>f){for(let x=f;x<w;x++)if(f=x,h(),!g(x))return j(),!1}return f=w,h(),j(),!0}let C={get current(){return f},get total(){return o.length},next:y,prev:E,goTo:A,get isFirst(){return f===0},get isLast(){return f===o.length-1}};function j(){i.$stepper=C}j(),it.set(e,{get current(){return f},steps:o,mode:s,indicatorEl:l,navEl:d}),h(!0),Ue(e,()=>{it.delete(e),l&&l.parentNode&&l.remove(),d&&d.parentNode&&d.remove(),delete i.$stepper})}})}var Di=0;var Ti=0;function Cn(t){t.directive("step",{priority:13,init(e,r,n){st(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Ti++}`),e.setAttribute("tabindex","0")}})}function Sn(t,e={}){Cn(t),kn(t)}function Dn(){wn()}function Tn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function In(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Bn(t){t.directive("skeleton",{priority:10,init(e,r,n){Tn();let o=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function u(g){m();for(let h=0;h<g;h++){let y=document.createElement("div");y.className="nojs-skeleton-line",e.appendChild(y),a.push(y)}}function m(){for(let g of a)g.parentNode===e&&e.removeChild(g);a=[]}function f(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let g=s+(String(s).match(/\d$/)?"px":"");e.style.width=g,e.style.height=g}if(c){let g=parseInt(c,10);g>0&&u(g)}e.setAttribute("aria-busy","true")}let l=null;function p(){l&&l(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let g=!1,h=null,y=()=>{g||(g=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",y),h!==null&&clearTimeout(h),l=null)};e.addEventListener("transitionend",y),h=setTimeout(y,0),l=()=>{e.removeEventListener("transitionend",y),h!==null&&clearTimeout(h),g=!0,l=null}}let d=!1;function b(){let g=!!t.evaluate(n,o);g&&!d?(d=!0,f()):!g&&d&&(d=!1,p())}b();let v=o.$watch(b);In(e,v),In(e,()=>{l&&l(),d&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function Hn(t,e={}){Bn(t)}var je=new Map,G=new Map,D={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function $n(){je.clear(),G.clear(),D.active=!1,D.splitEl=null,D.gutterEl=null,D.prevPane=null,D.nextPane=null,D.direction=null,D.startPos=0,D.startPrevSize=0,D.startNextSize=0,D.containerSize=0}function at(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Ii(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Mn(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,n=r&&(e==="horizontal"?r.width:r.height);return n||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function Pn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function Bi(t,e){let n=(je.get(t)?.gutters||[]).reduce((o,i)=>o+Q(i,e),0);return Q(t,e)-n}function Hi(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function We(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function ct(t,e,r,n){let o=Q(e,n),i=Q(r,n),c=G.get(e),s=G.get(r);t.setAttribute("aria-valuenow",Math.round(o)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(o+i-(s?.min||0)))}function qt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=je.get(t);if(!r)return;let n=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(n))}catch{}}function $i(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let n=JSON.parse(r),o=je.get(t);return!o||n.length!==o.panes.length?!1:(n.forEach((i,c)=>{i&&(o.panes[c].style.flexBasis=i,o.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function Mi(t,e,r,n,o){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),o!==6&&i.style.setProperty("--nojs-gutter-size",`${o}px`);let c=p=>{if(p.button!==0)return;p.preventDefault();let d=Bi(t,e);D.active=!0,D.splitEl=t,D.gutterEl=i,D.prevPane=r,D.nextPane=n,D.direction=e,D.startPos=p[Mn(e)],D.startPrevSize=Q(r,e),D.startNextSize=Q(n,e),D.containerSize=d,D.sign=Pn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(p.pointerId)},s=p=>{if(!D.active||D.gutterEl!==i)return;let d=(p[Mn(D.direction)]-D.startPos)*(D.sign||1),b=We(D.startPrevSize+d,D.prevPane),v=We(D.startNextSize-d,D.nextPane),g=D.startPrevSize+D.startNextSize;b+v!==g&&(b!==D.startPrevSize+d?v=g-b:b=g-v),D.prevPane.style.flexBasis=`${b}px`,D.prevPane.style.flexGrow="0",D.nextPane.style.flexBasis=`${v}px`,D.nextPane.style.flexGrow="0",ct(i,D.prevPane,D.nextPane,D.direction)},a=()=>{!D.active||D.gutterEl!==i||(D.active=!1,document.body.style.cursor="",document.body.style.userSelect="",qt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:n}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let u=10,m=p=>{let d=e==="horizontal",b=Pn(t,e),v=0;if(d&&p.key==="ArrowRight"||!d&&p.key==="ArrowDown")v=u*b;else if(d&&p.key==="ArrowLeft"||!d&&p.key==="ArrowUp")v=-u*b;else if(p.key==="Home")v=(G.get(r)?.min||0)-Q(r,e);else if(p.key==="End"){let C=G.get(n);v=Q(r,e)+Q(n,e)-(C?.min||0)-Q(r,e)}else return;p.preventDefault();let g=Q(r,e),h=Q(n,e),y=g+h,E=We(g+v,r),A=We(y-E,n);E=y-A,E=We(E,r),A=y-E,r.style.flexBasis=`${E}px`,r.style.flexGrow="0",n.style.flexBasis=`${A}px`,n.style.flexGrow="0",ct(i,r,n,e),qt(t)};i.addEventListener("keydown",m);let f=()=>{let p=G.get(r),d=G.get(n),b=p?.collapsible?r:d?.collapsible?n:null;if(!b)return;let v=G.get(b);if(!v)return;let g=b===r?n:r,h=Q(r,e)+Q(n,e);if(v.collapsed){v.collapsed=!1,b.removeAttribute("data-collapsed");let y=v.preCollapseSize||`${Math.round(h/2)}px`,E=Hi(y,h)??h/2,A=Math.min(E,h);b.style.flexBasis=`${A}px`,b.style.flexGrow="0",g.style.flexBasis=`${h-A}px`,g.style.flexGrow="0"}else v.preCollapseSize=b.style.flexBasis||`${Q(b,e)}px`,v.collapsed=!0,b.setAttribute("data-collapsed","true"),b.style.flexBasis="0px",b.style.flexGrow="0",g.style.flexBasis=`${h}px`,g.style.flexGrow="0";ct(i,r,n,e),qt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:b,collapsed:v.collapsed}}))};return i.addEventListener("dblclick",f),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",m),i.removeEventListener("dblclick",f)}}}function Rn(t){t.directive("split",{priority:14,init(e,r,n){at();let o=(n||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",o);let c=Array.from(e.children).filter(m=>m.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(m=>{G.get(m)||G.set(m,{size:m.getAttribute("pane")||null,min:parseInt(m.getAttribute("pane-min"),10)||0,max:parseInt(m.getAttribute("pane-max"),10)||1/0,collapsible:m.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let m=0;m<c.length-1;m++){let{gutter:f,cleanup:l}=Mi(e,o,c[m],c[m+1],i);c[m].after(f),s.push(f),a.push(l)}je.set(e,{direction:o,gutterSize:i,panes:c,gutters:s}),$i(e)||c.forEach(m=>{let l=G.get(m)?.size;l?(m.style.flexBasis=l,m.style.flexGrow="0"):(m.style.flexGrow="1",m.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((m,f)=>{ct(m,c[f],c[f+1],o)})}),Ii(e,()=>{a.forEach(m=>m()),s.forEach(m=>m.remove()),je.delete(e),c.forEach(m=>G.delete(m)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Pi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function qn(t){t.directive("pane",{priority:15,init(e,r,n){at(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:n||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";o.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${o.max}px`),Pi(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function Fn(t,e={}){Rn(t),qn(t)}function On(){$n()}var be={sorts:new Map};function zn(){be.sorts.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Ri(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function qi(t,e){let r=t.querySelector("tbody");if(!r)return null;let n=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!n)return null;let o=n.getAttribute("each")||n.getAttribute("foreach")||n.getAttribute("for");if(!o)return null;let i=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Fi(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function Vn(t,e,r){let n=e.split("."),o=t;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function Nn(t,e){let r=Number.isNaN(t),n=Number.isNaN(e);return r&&n?0:r?1:n||t<e?-1:t>e?1:0}function Wn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return Nn(Number(t),Number(e));case"date":return Nn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Oi(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Gn(t){t.directive("sortable",{priority:10,init(e){Le(),e.classList.add("nojs-sortable")}})}function Yn(t){t.directive("sort",{priority:11,init(e,r,n){Le();let o=n;if(!o)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;be.sorts.has(s)||be.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(be.sorts.get(s).column||Un(e,s,o,i,c,t));let a=()=>{let m=be.sorts.get(s),f;m.column!==o?f="asc":m.direction==="asc"?f="desc":m.direction==="desc"?f=null:f="asc",Un(e,s,o,i,f,t)},u=m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),a())};e.addEventListener("click",a),e.addEventListener("keydown",u),Ri(e,()=>{e.removeEventListener("click",a),e.removeEventListener("keydown",u),s&&!s.isConnected&&(be.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Un(t,e,r,n,o,i){let c=be.sorts.get(e);Oi(e),o?(t.setAttribute("data-sort-dir",o),t.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),c.column=r,c.direction=o):(c.column=null,c.direction=null);let s=qi(e,i);if(s){let a=i.findContext(e),u=a?Fi(a,s.arrayPath):null;if(Array.isArray(u)){if(!o){let f=e._nojsOriginalOrder;if(f){let l=new Set(u),p=f.filter(d=>l.has(d));for(let d of u)f.includes(d)||p.push(d);Vn(a,s.arrayPath,p)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...u]);let m=[...u].sort((f,l)=>{let p=f!=null?f[r]:null,d=l!=null?l[r]:null,b=Wn(p,d,n);return o==="desc"?-b:b});Vn(a,s.arrayPath,m);return}}zi(e,t,r,n,o)}function zi(t,e,r,n,o){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let u=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...u]),!o){let l=document.createDocumentFragment();for(let p of t._nojsOriginalRows)l.appendChild(p);i.appendChild(l);return}let m=l=>{let p=l.replace(/[^0-9.\-]/g,"");return p===""||p==="-"?NaN:parseFloat(p)};u.sort((l,p)=>{let d=l.children[a]?.textContent?.trim()||"",b=p.children[a]?.textContent?.trim()||"",v=Wn(n==="number"?m(d):d,n==="number"?m(b):b,n);return o==="desc"?-v:v});let f=document.createDocumentFragment();for(let l of u)f.appendChild(l);i.appendChild(f)}function Kn(t){t.directive("fixed-header",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-header")}})}function Xn(t){t.directive("fixed-col",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-col")}})}function Ft(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Zn(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let n=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!n)return null;let o=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return o?{iteratorVar:o[1],arrayPath:o[2].trim(),eachEl:r}:null}function Qn(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function Jn(t,e,r){let n=e.split("."),o=t;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function eo(t){t.directive("table-reorder",{priority:15,init(e){if(Le(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let n=t.findContext(e),o=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,u=null;function m(){let v=r.querySelectorAll(":scope > tr");for(let g=0;g<v.length;g++){let h=v[g];if(h._nojsReorderSetup)continue;h._nojsReorderSetup=!0,h.draggable=!0,h.setAttribute("aria-roledescription","draggable row");let y=!0;if(o){let x=L=>{y=!!L.target.closest(o)};h.addEventListener("mousedown",x),Ft(h,()=>h.removeEventListener("mousedown",x))}let E=x=>{if(o&&!y){x.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(h),a=h,x.dataTransfer&&(x.dataTransfer.effectAllowed="move",x.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(S=>h.classList.add(S))},A=x=>{if(a==null)return;x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect="move");let L=h.getBoundingClientRect(),S=L.top+L.height/2,O=[...r.querySelectorAll(":scope > tr")].indexOf(h);f(),O!==s&&(x.clientY<S?h.classList.add("nojs-reorder-insert-before"):h.classList.add("nojs-reorder-insert-after"),u=h)},C=()=>{h.classList.remove("nojs-reorder-insert-before"),h.classList.remove("nojs-reorder-insert-after"),u===h&&(u=null)},j=x=>{if(x.preventDefault(),x.stopPropagation(),a==null||s==null)return;let L=[...r.querySelectorAll(":scope > tr")],S=h.getBoundingClientRect(),M=S.top+S.height/2,O=L.indexOf(h);x.clientY>=M&&O++;let k=s;if(k===O||k+1===O){l();return}let N=k<O?O-1:O,ae=Zn(e);if(ae&&n){let I=Qn(n,ae.arrayPath);if(Array.isArray(I)){let B=[...I],[P]=B.splice(k,1);B.splice(N,0,P),Jn(n,ae.arrayPath,B),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...B]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:k,to:N,item:P}}))}}else{let I=a,B=L[N];I&&B&&(k<N?r.insertBefore(I,B.nextSibling):r.insertBefore(I,B),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:k,to:N,item:null}})))}l()},w=()=>{l()};h.addEventListener("dragstart",E),h.addEventListener("dragover",A),h.addEventListener("dragenter",A),h.addEventListener("dragleave",C),h.addEventListener("drop",j),h.addEventListener("dragend",w),Ft(h,()=>{h.removeEventListener("dragstart",E),h.removeEventListener("dragover",A),h.removeEventListener("dragenter",A),h.removeEventListener("dragleave",C),h.removeEventListener("drop",j),h.removeEventListener("dragend",w),h._nojsReorderSetup=!1})}}function f(){u&&(u.classList.remove("nojs-reorder-insert-before"),u.classList.remove("nojs-reorder-insert-after"),u=null)}function l(){a&&i.split(/\s+/).filter(Boolean).forEach(g=>a.classList.remove(g)),f(),s=null,a=null;let v=r.querySelectorAll(":scope > tr");for(let g of v)g.classList.remove("nojs-reorder-insert-before"),g.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(h=>g.classList.remove(h))}let p=v=>{a!=null&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"))},d=v=>{if(a==null||v.target!==r)return;v.preventDefault(),v.stopPropagation();let g=s,y=[...r.querySelectorAll(":scope > tr")].length-1;if(g===y){l();return}let E=Zn(e);if(E&&n){let A=Qn(n,E.arrayPath);if(Array.isArray(A)){let C=[...A],[j]=C.splice(g,1);C.push(j),Jn(n,E.arrayPath,C),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...C]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:g,to:C.length-1,item:j}}))}}l()};r.addEventListener("dragover",p),r.addEventListener("dragenter",p),r.addEventListener("drop",d);let b=new MutationObserver(()=>{m()});b.observe(r,{childList:!0}),m(),Ft(e,()=>{b.disconnect(),r.removeEventListener("dragover",p),r.removeEventListener("dragenter",p),r.removeEventListener("drop",d),l()})}})}function to(t,e={}){Gn(t),Yn(t),Kn(t),Xn(t),eo(t)}function ro(){zn()}var he={containers:new Map};function no(){for(let[,t]of he.containers)typeof t.unsub=="function"&&t.unsub();he.containers.clear()}function oo(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function io(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Vi(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function Ni(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function so(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let n=document.createElement("ol");n.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let u=document.createElement("span");u.setAttribute("aria-current","page"),u.textContent=c.label,s.appendChild(u)}else{let u=document.createElement("a");u.href=c.href,u.textContent=c.label,s.appendChild(u)}n.appendChild(s)}t.appendChild(n);let o=he.containers.get(t);o&&(o.crumbs=e)}function Ui(t){let e=[],r=Array.from(t.children);for(let n of r){if(n.tagName==="OL"&&n.classList.contains("nojs-breadcrumb"))continue;let o=Vi(n);if(!o)continue;let i=n.getAttribute("href")||"#";e.push({label:o,href:i})}return e}function Wi(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),n=[{label:"Home",href:"/"}],o="";for(let i=0;i<r.length;i++){o+="/"+r[i];let c=Ni(r[i].replace(/[-_]/g," "));n.push({label:c,href:o})}return n}function ao(t){t.directive("breadcrumb",{priority:15,init(e,r,n){oo(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let o=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!o&&i;if(he.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,u=a?a.path:"/",m=Wi(u);so(e,m)};if(s(),typeof i.on=="function"){let a=i.on(s),u=he.containers.get(e);u&&(u.unsub=a),io(e,()=>{typeof a=="function"&&a();let m=he.containers.get(e);m&&(m.unsub=null)})}}else{let s=Ui(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");so(e,s)}io(e,()=>{he.containers.delete(e)})}})}function co(t,e={}){ao(t)}function lo(){no()}var dt={containers:new Map};function uo(){dt.containers.clear()}function po(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Gi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var lt=null;function Yi(){return lt!==null||(lt=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),lt}function fo(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let n=Array.from(t.children),o=!1;for(let i of n){if(i===e){o=!0;continue}o&&r.appendChild(i)}return t.appendChild(r),r}function Ki(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let n=()=>{e.style.height="",e.removeEventListener("transitionend",n)};e.addEventListener("transitionend",n)})}function go(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let n=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",n)};e.addEventListener("transitionend",n)})}function mo(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");go(t,r)}else t.open=!1}function ut(t,e,r,n){let o=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:n}});t.dispatchEvent(o)}function Re(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function bo(t){t.directive("accordion",{priority:10,init(e,r,n){po();let o=(n||"").trim().toLowerCase()==="multi"?"multi":"single",i=!Yi();e.setAttribute("role","group");let c=Re(e);if(c.length===0)return;if(i)for(let l of c)fo(l);let s=[],a=new MutationObserver(l=>{for(let p of l)for(let d of p.addedNodes)d.nodeType!==1||d.tagName!=="DETAILS"||d.parentElement===e&&m(d)});a.observe(e,{childList:!0});let u=0,m=l=>{i&&fo(l);let p=l.querySelector(":scope > summary");if(p){let v=`nojs-accordion-panel-${Date.now()}-${u++}`,g=l.querySelector(":scope > .nojs-accordion-content");g?(g.id=g.id||v,g.setAttribute("role","region"),v=g.id):(l.id||(l.id=v),v=l.id),p.setAttribute("aria-expanded",l.open?"true":"false"),p.setAttribute("aria-controls",v)}let d=v=>{let g=Re(e),h=g.indexOf(l),y=l.querySelector(":scope > summary");if(y&&y.setAttribute("aria-expanded",l.open?"true":"false"),l.open){if(o==="single")for(let E of g)E!==l&&E.open&&mo(E,i);ut(e,l,!0,h)}else ut(e,l,!1,h)},b=null;if(i){let v=l.querySelector(":scope > summary");v&&(b=g=>{g.preventDefault();let h=l.querySelector(":scope > .nojs-accordion-content");if(l.open)go(l,h),v.setAttribute("aria-expanded","false"),ut(e,l,!1,Re(e).indexOf(l));else{if(o==="single"){let y=Re(e);for(let E of y)if(E!==l&&E.open){mo(E,!0);let A=E.querySelector(":scope > summary");A&&A.setAttribute("aria-expanded","false")}}Ki(l,h),v.setAttribute("aria-expanded","true"),ut(e,l,!0,Re(e).indexOf(l))}},v.addEventListener("click",b))}l.addEventListener("toggle",d),s.push({details:l,toggleHandler:d,clickHandler:b})};for(let l of c)m(l);let f=l=>{let p=l.target;if(p.tagName!=="SUMMARY")return;let d=p.parentElement;if(!d||d.parentElement!==e)return;let v=Re(e).map(y=>y.querySelector(":scope > summary")).filter(Boolean),g=v.indexOf(p);if(g===-1)return;let h=-1;switch(l.key){case"ArrowDown":case"ArrowRight":h=(g+1)%v.length;break;case"ArrowUp":case"ArrowLeft":h=(g-1+v.length)%v.length;break;case"Home":h=0;break;case"End":h=v.length-1;break;default:return}h!==-1&&h!==g&&(l.preventDefault(),v[h].focus())};e.addEventListener("keydown",f),dt.containers.set(e,{mode:o,listeners:s,observer:a}),Gi(e,()=>{e.removeEventListener("keydown",f),a.disconnect();for(let l of s)if(l.details.removeEventListener("toggle",l.toggleHandler),l.clickHandler){let p=l.details.querySelector(":scope > summary");p&&p.removeEventListener("click",l.clickHandler)}s.length=0,dt.containers.delete(e)})}})}function ho(t,e={}){bo(t)}function vo(){uo()}var qe=new Map;function yo(){let t=Array.from(qe.keys());for(let e of t){let r=qe.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[n,o]of r.renderedNodes){if(o.__disposers){for(let i of o.__disposers)try{i()}catch{}o.__disposers=null}o.parentNode&&o.remove()}r.renderedNodes.clear()}r.disposed=!0}}qe.clear()}function xo(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Xi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Zi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let n=Qi(e.getAttribute(r));if(n)return{eachEl:e,...n}}return null}function Qi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Ji(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function Eo(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let n=document.createElement("td"),o=e==="table"?t:t.closest("table"),i=o?o.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;n.setAttribute("colspan",String(c)),n.style.padding="0",n.style.border="none",r.appendChild(n)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function pt(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function es(t,e){return t*e}function wo(t){let e=t.totalItems,r=new Array(e+1),n=t.estimatedHeight||50;r[0]=0;for(let o=1;o<=e;o++)r[o]=r[o-1]+(t.heights[o-1]||n);t.prefixSums=r}function Ao(t,e){let r=0,n=t.length-2;for(;r<=n;){let o=r+n>>>1;t[o]<=e?r=o+1:n=o-1}return Math.max(0,n)}function _o(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++)e+=t.heights[n]||r;return e}function ft(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,n=t.estimatedHeight||50;for(let o=0;o<e;o++)r+=t.heights[o]||n;return r}function ts(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return Ao(t.prefixSums,e);let r=0,n=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++){let i=t.heights[o]||n;if(r+i>e)return o;r+=i}return Math.max(0,t.totalItems-1)}function rs(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return Ao(t.prefixSums,e+r);let n=e+r,o=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(o+=t.heights[c]||i,o>=n)return c;return t.totalItems-1}function ns(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let n,o;return t.itemHeight!=="auto"?(n=Math.floor(e/t.itemHeight),o=Math.ceil((e+r)/t.itemHeight)-1):(n=ts(t,e),o=rs(t,e,r)),n=Math.max(0,n-t.buffer),o=Math.min(t.totalItems-1,o+t.buffer),{start:n,end:o}}function Ot(t,e){if(t.disposed)return;let r=t.container,n=r,o=n.scrollTop,i=n.clientHeight,{start:c,end:s}=ns(t,o,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=ft(t,c),u=t.itemHeight!=="auto"?es(t.totalItems,t.itemHeight):_o(t),m=s>=0?ft(t,s+1):0,f=Math.max(0,u-m);pt(t.spacerTop,a),pt(t.spacerBottom,f);let l=new Set;for(let d=c;d<=s;d++)l.add(d);for(let[d,b]of t.renderedNodes)l.has(d)||(b.remove(),t.renderedNodes.delete(d));let p=[];for(let d=c;d<=s;d++){if(t.renderedNodes.has(d))continue;let b=t.dataArray[d];if(b===void 0)continue;let v=t.template.cloneNode(!0),g={};g[t.iteratorVar]=b,g.$index=d,g.$count=t.totalItems,g.$first=d===0,g.$last=d===t.totalItems-1,g.$even=d%2===0,g.$odd=d%2!==0,v.setAttribute("role","option"),v.setAttribute("aria-setsize",String(t.totalItems)),v.setAttribute("aria-posinset",String(d+1)),v.setAttribute("tabindex","-1"),v.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(g)),v.__declared=!1,p.push({index:d,node:v}),t.renderedNodes.set(d,v)}if(p.length>0){p.sort((d,b)=>d.index-b.index);for(let{index:d,node:b}of p){let v=null;for(let[g,h]of t.renderedNodes)g>d&&h.parentNode===r&&(!v||g<os(v,t))&&(v=h);v||(v=t.spacerBottom),r.insertBefore(b,v);try{e.processTree&&e.processTree(b)}catch{}}}if(t.itemHeight==="auto"){let d=!1;for(let[b,v]of t.renderedNodes){let g=v.offsetHeight||v.getBoundingClientRect().height;g>0&&t.heights[b]!==g&&(t.heights[b]=g,d=!0)}if(d){wo(t);let b=_o(t),v=ft(t,c),g=s>=0?ft(t,s+1):0,h=Math.max(0,b-g);pt(t.spacerTop,v),pt(t.spacerBottom,h)}}}function os(t,e){for(let[r,n]of e.renderedNodes)if(n===t)return r;return 1/0}function is(t,e,r){if(t.disposed)return;let n=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&wo(t);for(let[o,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=n,Ot(t,r)}function jo(t){t.directive("virtual",{priority:10,init(e,r,n){xo(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let o=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=o==="auto"?"auto":parseInt(o,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=Zi(e),u=null;if(a)u=a.eachEl;else for(let A of e.children)if(!A.classList.contains("nojs-virtual-spacer")){u=A;break}if(!u){console.warn("[virtual] No child template found.");return}let m=u.cloneNode(!0);for(m.removeAttribute("each"),m.removeAttribute("foreach"),m.removeAttribute("for"),m.__declared=!1,m.__disposers=null,m.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let f=Eo(e),l=Eo(e);e.appendChild(f),e.appendChild(l);let p={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:m,spacerTop:f,spacerBottom:l,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};qe.set(e,p);let d=A=>{let C=[...e.querySelectorAll('[role="option"]')];if(!C.length)return;let j=e.querySelector('[role="option"]:focus'),w=j?C.indexOf(j):-1,x=-1;switch(A.key){case"ArrowDown":A.preventDefault(),x=w<C.length-1?w+1:w;break;case"ArrowUp":A.preventDefault(),x=w>0?w-1:0;break;case"Home":A.preventDefault(),x=0;break;case"End":A.preventDefault(),x=C.length-1;break;default:return}x>=0&&x<C.length&&C[x].focus()};e.addEventListener("keydown",d);let b=null,v=()=>{b||(b=requestAnimationFrame(()=>{b=null,Ot(p,t)}))};if(p.scrollHandler=v,e.addEventListener("scroll",v,{passive:!0}),typeof ResizeObserver<"u"){let A=new ResizeObserver(()=>{p.dirty=!0,Ot(p,t)});A.observe(e),p.resizeObserver=A}let g=null,h=-1,y=null,E=()=>{if(!p.disposed){if(p.arrayPath){let A=t.findContext?t.findContext(e):null;if(A){let C=Ji(A,p.arrayPath);Array.isArray(C)&&(C!==g||C.length!==h)&&(g=C,h=C.length,is(p,C,t))}}y=setTimeout(E,100)}};y=setTimeout(E,100),Xi(e,()=>{p.disposed=!0,b&&(cancelAnimationFrame(b),b=null),y&&(clearTimeout(y),y=null),e.removeEventListener("scroll",v),e.removeEventListener("keydown",d),p.resizeObserver&&(p.resizeObserver.disconnect(),p.resizeObserver=null);for(let[A,C]of p.renderedNodes){if(C.__disposers){for(let j of C.__disposers)try{j()}catch{}C.__disposers=null}C.remove()}p.renderedNodes.clear(),p.spacerTop&&p.spacerTop.parentNode&&p.spacerTop.remove(),p.spacerBottom&&p.spacerBottom.parentNode&&p.spacerBottom.remove(),qe.delete(e)})}})}function Lo(t,e={}){jo(t)}function ko(){yo()}var ve=new Map,mt=new Map;function Co(){for(let[t,e]of ve){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let n=r.el&&r.el.__disposers;if(n){for(let o of n)try{o()}catch{}r.el.__disposers=[]}}}ve.clear(),mt.clear()}function So(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function ss(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function as(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function cs(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function ds(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function ls(){return document.documentElement}function us(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function Do(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function zt(t){let e=ve.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,n=e.threshold,o=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let f of a)f.isIntersecting?o.add(f.target.id):o.delete(f.target.id);let u=null,m=1/0;for(let f of o){let l=document.getElementById(f);if(!l)continue;let p=l.getBoundingClientRect();p.top<m&&(m=p.top,u=f)}for(let f of e.spyEntries)Do(f.el);if(u){for(let f of e.spyEntries)if(f.targetId===u){us(f.el),e.activeEl=f.el;break}}else e.activeEl=null},{rootMargin:i,threshold:n}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let u=document.getElementById(a.targetId);u&&(c.observe(u),s.add(a.targetId))}e.observer=c}function ps(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function To(t){t.directive("spy",{priority:20,init(e,r,n){So();let o=as(e);if(!o){e.tagName!=="A"&&ps(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=cs(e),c=ds(e),s=ls();ve.has(s)||ve.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=ve.get(s),u={el:e,targetId:o};a.spyEntries.push(u),mt.set(e,s),zt(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{zt(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),ss(e,()=>{let m=a.spyEntries.indexOf(u);m!==-1&&a.spyEntries.splice(m,1),mt.delete(e),Do(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),ve.delete(s)):zt(s)})}})}function Io(t,e={}){To(t)}function Bo(){Co()}var Vt="it is a DOM element; client mechanics never send DOM nodes",Ho={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:Vt},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:Vt},fixed:{list:null}},$el:{unavailable:Vt}}}};var fs="[validate],[drag],[drop],[drag-list],[drag-multiple]";function $o(t){if(typeof document>"u")return;let e=document.querySelectorAll(fs);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;if(r.hasAttribute("validate")&&r.__nojsElBoundCtx===void 0){if(gr(r))continue;gs(t,r)}let n=K(t,"disposeTree");typeof n=="function"?n(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let o=t.findContext?t.findContext(r):null;o&&delete o.$form,t.processTree(r)}}var ms="[if],[else-if],[else],[switch],[each],[foreach],[for]";function gs(t,e){if(!e.querySelector(ms))return;(K(t,"warn")||console.warn)("[nojs-elements] loaded after core processed this <"+e.tagName.toLowerCase()+" validate>: content of an if/each inside it may be lost. Load the Elements script before DOMContentLoaded, or put `state` on the form or an element above it.")}var Mo=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],bs=["validate","drag-list","drag-multiple",...Mo].filter(t=>!er.includes(t));function hs(t,e){vt(t,e);for(let r of bs)t.directive(r,{priority:30,init(n,o){o.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}var vs={name:"nojs-elements",contract:{directives:{...Ho}},install(t,e={}){if(pe(t)){hs(t,e);return}vt(t,e),hr(t,e),Ar(t,e),Cr(t,e),Rr(t,e),Wr(t,e),Jr(t,e),cn(t,e),En(t,e),Sn(t,e),Hn(t,e),Fn(t,e),to(t,e),co(t,e),ho(t,e),Lo(t,e),Io(t,e),$o(t)},init(t){if(pe(t)||($o(t),typeof document>"u"||!document.body))return;let e=Mo.map(n=>`[${n}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let n of r)n.__declared&&!n.__disposers&&!n.__ctx&&(n.__declared=!1);try{t.processTree(document.body)}catch(n){t.internals?.warn?.("nojs-elements init re-process error:",n.message)}},dispose(t){tr(),vr(),jr(),Sr(),qr(),Gr(),en(),dn(),_n(),Dn(),On(),ro(),lo(),vo(),ko(),Bo()}},Nt=vs;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(Nt),t=!0,!0):!1};window.NoJSElements=Nt;let t=!1;if(!e()){let r=0,n=100,o=setInterval(()=>{(e()||++r>=n)&&clearInterval(o)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(o)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
