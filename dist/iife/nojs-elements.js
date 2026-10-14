/**
 * NoJS Elements v1.21.1 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
(()=>{var _={dragging:null,selected:new Map,placeholder:null},Ye=new Map;function Ft(){_.dragging=null,_.selected.clear(),_.placeholder&&(_.placeholder.remove(),_.placeholder=null),Ye.clear()}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function ze(t,e){t.__nojsElBoundCtx=e}function de(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Ze(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function le(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ke(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ke(r):e++}return e}function Xe(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function Nt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",_.dragging&&_.dragging.sourceEl){let s=(_.dragging.sourceEl.firstElementChild||_.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),_.placeholder=n}function re(){_.placeholder&&(_.placeholder.remove(),_.placeholder=null)}function xe(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function jo(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let g=a-1;g>=0;g--){let u=document.createElement("div"),f=g*4;if(u.style.cssText="position:absolute;top:"+f+"px;left:"+f+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",g===0){let p=o.cloneNode(!0);for(;p.firstChild;)u.appendChild(p.firstChild);u.style.background=s.backgroundColor||"#fff",u.style.border=s.border,u.style.padding=s.padding,u.style.fontSize=s.fontSize,u.style.color=s.color,u.style.fontFamily=s.fontFamily}else u.style.background=s.backgroundColor||"#fff",u.style.border=s.border||"1px solid #ddd";r.appendChild(u)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var oe=null;function Lo(){return oe&&oe.isConnected?oe:typeof document>"u"||!document.body?null:(oe=document.createElement("div"),oe.setAttribute("aria-live","assertive"),oe.setAttribute("aria-atomic","true"),oe.setAttribute("role","status"),oe.className="nojs-dnd-live-region",oe.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(oe),oe)}function ce(t){let e=Lo();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Wt(t){if(de(t)){t.directive("drag",{priority:15,init(e,r){ke(),Ot(e,Co(e,r))}});return}Ze(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){ke(),Ot(e,ko(t,e,o))}})}function ko(t,e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drag-disabled");return{ctx:o,value:()=>t.evaluate(r,o),disabled:()=>n?t.evaluate(n,o):!1,watchDisabled:i=>le(e,o.$watch(i)),onDispose:i=>le(e,i)}}function Co(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function Ot(t,e){let r=t.getAttribute("drag-type")||"default",o=t.getAttribute("drag-effect")||"move",n=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),c=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),a=t.getAttribute("drag-class")||"nojs-dragging",d=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let g=!0;if(n){let l=b=>{g=!!b.target.closest(n)};t.addEventListener("mousedown",l),e.onDispose(()=>t.removeEventListener("mousedown",l))}let u=l=>{if(n&&!g){l.preventDefault();return}if(s&&e.disabled()){l.preventDefault();return}let b=e.value(),h=t.getAttribute("drag-group"),m=b;if(h&&_.selected.has(h)){let y=_.selected.get(h);y.size>0&&[...y].some(j=>j.el===t)&&(m=[...y].map(j=>j.item))}if(_.dragging={item:m,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},l.dataTransfer){if(l.dataTransfer.effectAllowed=o,l.dataTransfer.setData("text/plain",""),Array.isArray(m)&&m.length>1&&l.dataTransfer.setDragImage){let y=jo(t,m.length);document.body.appendChild(y);let x=t.getBoundingClientRect();l.dataTransfer.setDragImage(y,x.width/2,x.height/2),requestAnimationFrame(()=>y.remove())}else if(i&&l.dataTransfer.setDragImage)if(i==="none"){let y=document.createElement("div");y.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(y);let[x,j]=c.split(",").map(Number);l.dataTransfer.setDragImage(y,x||0,j||0),requestAnimationFrame(()=>y.remove())}else{let y=t.querySelector(i);if(y){let[x,j]=c.split(",").map(Number);d&&y.classList.add(d),l.dataTransfer.setDragImage(y,x||0,j||0)}}}if(a.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),Array.isArray(m)&&h&&_.selected.has(h))for(let y of _.selected.get(h))y.el!==t&&a.split(/\s+/).filter(Boolean).forEach(x=>y.el.classList.add(x));let v=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${v}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:m,index:_.dragging.sourceIndex,el:t}}))},f=()=>{a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b));let l=t.getAttribute("drag-group");if(l&&_.selected.has(l))for(let b of _.selected.get(l))a.split(/\s+/).filter(Boolean).forEach(h=>b.el.classList.remove(h));if(d&&i&&i!=="none"){let b=t.querySelector(i);b&&b.classList.remove(d)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:_.dragging?.item,index:_.dragging?.sourceIndex,dropped:_.dragging===null}})),_.dragging=null,re()};if(t.addEventListener("dragstart",u),t.addEventListener("dragend",f),e.onDispose(()=>{t.removeEventListener("dragstart",u),t.removeEventListener("dragend",f)}),s){let l=function(){let b=!!e.disabled();t.draggable=!b,b?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(l)}let p=l=>{if(_.dragging&&!_.dragging.sourceEl.isConnected&&(_.dragging=null),l.key===" "&&!_.dragging){l.preventDefault();let b=e.value();_.dragging={item:b,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},a.split(/\s+/).filter(Boolean).forEach(m=>t.classList.add(m));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:t}}))}else l.key==="Escape"&&_.dragging&&_.dragging.sourceEl===t&&(l.preventDefault(),a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),ce("Drag cancelled."),_.dragging=null,re())};t.addEventListener("keydown",p),e.onDispose(()=>t.removeEventListener("keydown",p))}function Gt(t){if(de(t)){t.directive("drop",{priority:15,init(e,r){ke(),Vt(e,Do(e,r)),To(e,r)}});return}Ze(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){ke(),Vt(e,So(t,e,o))}})}function So(t,e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>n?t.evaluate(n,o):!1,max:()=>i?t.evaluate(i,o):void 0,run(c){let s=X(t,"execStatement");typeof s=="function"?s(r,o,c):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:c=>le(e,c)}}function Do(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function To(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",o=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),o.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),_.placeholder&&t.contains(_.placeholder)&&re()})}function Vt(t,e){let r=t.getAttribute("drop-accept")||"default",o=t.getAttribute("drop-effect")||"move",n=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",c=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),a=t.getAttribute("drop-sort"),d=t.getAttribute("drop-placeholder"),g=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",o);let u=0,f=m=>{if(!_.dragging||c&&e.disabled())return;let v=xe(_.dragging.type,r),y=!0;if(s){let x=e.max(),j=Ke(t);typeof x=="number"&&j>=x&&(y=!1)}if(!v||!y){i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),n.split(/\s+/).filter(Boolean).forEach(x=>t.classList.remove(x)),re();return}if(i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.remove(x)),m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect=o),a){let x=Xe(t,m.clientX,m.clientY,a);d&&Nt(t,x,d,g),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:_.dragging.item,index:x}}))}},p=m=>{if(_.dragging&&!(c&&e.disabled())&&(u++,u===1)){let v=xe(_.dragging.type,r),y=!0;if(s){let x=e.max(),j=Ke(t);typeof x=="number"&&j>=x&&(y=!1)}v&&y?(n.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x))}},l=m=>{_.dragging&&(u--,u<=0&&(u=0,n.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),i.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),re(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging.item}}))))},b=m=>{if(m.preventDefault(),m.stopPropagation(),u=0,!_.dragging||c&&e.disabled()||!xe(_.dragging.type,r))return;if(s){let L=e.max(),A=Ke(t);if(typeof L=="number"&&A>=L)return}let v=_.dragging.item,y=_.dragging.type,x=_.dragging.effect,j=0;a&&(j=Xe(t,m.clientX,m.clientY,a)),n.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),i.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),re();let w={$drag:v,$dragType:y,$dragEffect:x,$dropIndex:j,$source:{list:_.dragging.sourceList,index:_.dragging.sourceIndex,el:_.dragging.sourceEl},$target:{list:null,index:j,el:t},$el:t};e.run(w),_.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:v,index:j,source:w.$source,target:w.$target,effect:x}}))},h=m=>{_.dragging&&(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),b(m))};t.addEventListener("dragover",f),t.addEventListener("dragenter",p),t.addEventListener("dragleave",l),t.addEventListener("drop",b),t.addEventListener("keydown",h),e.onDispose(()=>{t.removeEventListener("dragover",f),t.removeEventListener("dragenter",p),t.removeEventListener("dragleave",l),t.removeEventListener("drop",b),t.removeEventListener("keydown",h)})}function Ut(t){Ze(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){ke();let n=t.findContext(e);ze(e,n);let i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,g=e.getAttribute("drop-accept")||d,u=e.hasAttribute("drag-list-copy"),f=e.hasAttribute("drag-list-remove"),p=e.getAttribute("drag-disabled"),l=e.getAttribute("drop-disabled"),b=e.getAttribute("drop-max"),h=e.getAttribute("drop-placeholder"),m=e.getAttribute("drop-placeholder-class"),v=e.getAttribute("drag-class")||"nojs-dragging",y=e.getAttribute("drop-class")||"nojs-drag-over",x=e.getAttribute("drop-reject-class")||"nojs-drop-reject",j=e.getAttribute("drop-settle-class")||"nojs-drop-settle",w=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",u?"copy":"move");let L={listPath:o,ctx:n,el:e};Ye.set(e,L),le(e,()=>Ye.delete(e));let A=0,E=null;function S(){let C=t.resolve(o,n);if(!Array.isArray(C))return;if(C===E&&C.length>0&&e.children.length>0){for(let F of e.children)F.__ctx&&F.__ctx.$notify&&F.__ctx.$notify();return}E=C;let H=i?document.getElementById(i):null;if(!H)return;let q=X(t,"disposeChildren");typeof q=="function"&&q(e),e.innerHTML="";let P=C.length;C.forEach((F,K)=>{let ee={[s]:F,$index:K,$count:P,$first:K===0,$last:K===P-1,$even:K%2===0,$odd:K%2!==0},te=t.createContext(ee,n),he=H.content.cloneNode(!0),B=document.createElement("div");B.style.display="contents",B.__ctx=te,B.appendChild(he),e.appendChild(B);let z=B.firstElementChild||B;z.draggable=!0,z.setAttribute("role","option"),z.setAttribute("aria-roledescription","draggable item"),z.getAttribute("tabindex")||z.setAttribute("tabindex","0");let ae=N=>{if(p&&t.evaluate(p,n)){N.preventDefault();return}_.dragging={item:F,type:d,effect:u?"copy":"move",sourceEl:B,sourceCtx:te,sourceList:C,sourceIndex:K,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:u,removeMode:f}},N.dataTransfer&&(N.dataTransfer.effectAllowed=u?"copy":"move",N.dataTransfer.setData("text/plain","")),v.split(/\s+/).filter(Boolean).forEach(ye=>z.classList.add(ye));let Z=z.getAttribute("aria-label")||z.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${Z}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:F,index:K,el:z}}))},ve=()=>{v.split(/\s+/).filter(Boolean).forEach(N=>z.classList.remove(N)),_.dragging&&_.dragging.sourceEl===B&&(_.dragging=null),re()};B.addEventListener("dragstart",ae),B.addEventListener("dragend",ve);let Ue=N=>{if(N.key===" "&&!_.dragging){N.preventDefault(),N.stopPropagation(),_.dragging={item:F,type:d,effect:u?"copy":"move",sourceEl:B,sourceCtx:te,sourceList:C,sourceIndex:K,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:u,removeMode:f}},v.split(/\s+/).filter(Boolean).forEach(ye=>z.classList.add(ye));let Z=z.getAttribute("aria-label")||z.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${Z}. Use arrow keys to reorder.`)}else if(N.key==="Escape"&&_.dragging){N.preventDefault(),N.stopPropagation();let Z=e.querySelector(`.${v.split(/\s+/)[0]}`)||z;v.split(/\s+/).filter(Boolean).forEach(ye=>Z.classList.remove(ye)),ce("Reorder cancelled."),_.dragging=null,re()}else if((N.key==="ArrowDown"||N.key==="ArrowRight")&&_.dragging&&_.dragging.sourceEl===B){N.preventDefault();let Z=B.nextElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Re=[...e.children].filter(gt=>!gt.classList.contains("nojs-drop-placeholder")),mt=Re.indexOf(Z)+1;ce(`Moved to position ${mt} of ${Re.length}.`)}}else if((N.key==="ArrowUp"||N.key==="ArrowLeft")&&_.dragging&&_.dragging.sourceEl===B){N.preventDefault();let Z=B.previousElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Re=[...e.children].filter(gt=>!gt.classList.contains("nojs-drop-placeholder")),mt=Re.indexOf(Z)+1;ce(`Moved to position ${mt} of ${Re.length}.`)}}};B.addEventListener("keydown",Ue),B.__disposers=B.__disposers||[],B.__disposers.push(()=>B.removeEventListener("dragstart",ae),()=>B.removeEventListener("dragend",ve),()=>B.removeEventListener("keydown",Ue)),t.processTree(B)});let M=C.length===0;w.split(/\s+/).filter(Boolean).forEach(F=>e.classList.toggle(F,M))}let T=C=>{if(!_.dragging||l&&t.evaluate(l,n))return;let H=xe(_.dragging.type,g),q=!0;if(b){let M=t.evaluate(b,n),F=t.resolve(o,n);typeof M=="number"&&Array.isArray(F)&&F.length>=M&&(q=!1)}if(!H||!q){x.split(/\s+/).filter(Boolean).forEach(M=>e.classList.add(M)),y.split(/\s+/).filter(Boolean).forEach(M=>e.classList.remove(M)),re();return}x.split(/\s+/).filter(Boolean).forEach(M=>e.classList.remove(M)),C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect=u?"copy":"move");let P=Xe(e,C.clientX,C.clientY,a);h&&Nt(e,P,h,m)},R=C=>{if(_.dragging&&!(l&&t.evaluate(l,n))&&(A++,A===1)){let H=xe(_.dragging.type,g),q=!0;if(b){let P=t.evaluate(b,n),M=t.resolve(o,n);typeof P=="number"&&Array.isArray(M)&&M.length>=P&&(q=!1)}H&&q?(y.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):x.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P))}},k=()=>{_.dragging&&(A--,A<=0&&(A=0,y.split(/\s+/).filter(Boolean).forEach(C=>e.classList.remove(C)),x.split(/\s+/).filter(Boolean).forEach(C=>e.classList.remove(C)),re(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging?.item}}))))},U=C=>{if(C.preventDefault(),C.stopPropagation(),A=0,!_.dragging||l&&t.evaluate(l,n)||!xe(_.dragging.type,g))return;if(b){let B=t.evaluate(b,n),z=t.resolve(o,n);if(typeof B=="number"&&Array.isArray(z)&&z.length>=B)return}let H=_.dragging.item,q=_.dragging.listDirective,P=_.dragging.sourceIndex,M=Xe(e,C.clientX,C.clientY,a);y.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),x.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),re();let F=t.resolve(o,n);if(!Array.isArray(F))return;let K=q&&q.el===e;if(K&&P===M){_.dragging=null;return}if(K&&P+1===M){_.dragging=null;return}let ee=[...F];if(K){let[B]=ee.splice(P,1),z=P<M?M-1:M;ee.splice(z,0,B),n.$set(o,ee),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:ee,item:H,from:P,to:z}}))}else{let B=u&&typeof H=="object"?{...H}:H;if(ee.splice(M,0,B),n.$set(o,ee),q&&!q.copyMode&&(f||q.removeMode)){let z=t.resolve(q.listPath,q.ctx);if(Array.isArray(z)&&P!=null){let ae=z.filter((ve,Ue)=>Ue!==P);q.ctx.$set(q.listPath,ae),q.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ae,item:H,index:P}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:ee,item:H,from:P,fromList:q?t.resolve(q.listPath,q.ctx):null}}))}let te=_.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||_.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",he=K&&P<M?M:M+1;ce(`Dropped ${te} at position ${he}.`),requestAnimationFrame(()=>{let z=[...e.children][K&&P<M?M-1:M];if(z){let ae=z.firstElementChild||z;j.split(/\s+/).filter(Boolean).forEach(ve=>ae.classList.add(ve)),ae.addEventListener("animationend",()=>{j.split(/\s+/).filter(Boolean).forEach(ve=>ae.classList.remove(ve))},{once:!0})}}),_.dragging=null},V=C=>{if(_.dragging&&xe(_.dragging.type,g)&&(C.key==="Enter"||C.key===" ")){C.preventDefault();let H=e.querySelector(":focus");if(H){let P=(H.style?.display==="contents"&&H.firstElementChild||H).getBoundingClientRect(),M={preventDefault(){},stopPropagation(){},clientX:P.left+P.width/2,clientY:P.top+P.height+1,dataTransfer:null};U(M)}}};e.addEventListener("dragover",T),e.addEventListener("dragenter",R),e.addEventListener("dragleave",k),e.addEventListener("drop",U),e.addEventListener("keydown",V),le(e,()=>{e.removeEventListener("dragover",T),e.removeEventListener("dragenter",R),e.removeEventListener("dragleave",k),e.removeEventListener("drop",U),e.removeEventListener("keydown",V)});let be=n.$watch(S);le(e,be),S()}})}function Yt(t){Ze(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}_.selected.has(n)||_.selected.set(n,new Set);let c=_.selected.get(n),s=d=>{let g=e.getAttribute("drag"),f={item:g?t.evaluate(g,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let p=[...c].find(l=>l.el===e);p?(c.delete(p),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.remove(l))):(c.add(f),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l)))}else{for(let p of c)i.split(/\s+/).filter(Boolean).forEach(l=>p.el.classList.remove(l));c.clear(),c.add(f),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p))}};e.addEventListener("click",s),le(e,()=>{e.removeEventListener("click",s);let d=[...c].find(g=>g.el===e);d&&c.delete(d)});let a=d=>{if(d.key==="Escape"){for(let g of c)i.split(/\s+/).filter(Boolean).forEach(u=>g.el.classList.remove(u));c.clear()}};window.addEventListener("keydown",a),le(e,()=>window.removeEventListener("keydown",a))}})}var Kt=["drag","drop"];function bt(t,e={}){Wt(t),Gt(t),!de(t)&&(Ut(t),Yt(t))}function Xt(){Ft()}var Zt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],ht=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ue(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ee,rr,Je,vt,yt,Qt,Qe,xt,Jt;function Io(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function Bo(t){return(t.getAttribute("type")||"text").toLowerCase()}function Ho(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(s=>s.trim());for(let s of c){let[a,...d]=s.split(":"),g=Ee[a];if(g){let u=g(t.value,...d,e);u!==!0&&u&&(r.push({rule:a,message:u}),o.add(a))}else{let u=t.value,f=null;switch(a){case"required":(u==null||String(u).trim()==="")&&(f="Required");break;case"email":u&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)&&(f="Invalid email");break;case"url":try{new URL(u)}catch{f="Invalid URL"}break;case"min":Number(u)<Number(d[0])&&(f=`Minimum value is ${d[0]}`);break;case"max":Number(u)>Number(d[0])&&(f=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&Ee[d[0]]){let p=Ee[d[0]](u,e);p!==!0&&p&&(f=p)}break}f&&(r.push({rule:a,message:f}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[c,s]of Zt)if(i[c]){let a=s||Bo(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function $o(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Mo(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=ht.indexOf(n.rule),s=ht.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:$o(e,o.rule,o.message)}}function nr(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function qo(t,e,r,o,n){let i=nr(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;xt(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.setAttribute("aria-live","polite"),a.__errorTemplateFor=o;let d=Je({$error:e,$rule:r},n);a.__ctx=d,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Io(a),yt(a)}function er(t){let e=nr(t);e&&(xt(e),e.remove())}function Po(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!rr(r,e)}catch{return!0}}function tr(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function Ro(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),s=Ee[i];if(s){let a=s(t,...c,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&Ee[c[0]]){let a=Ee[c[0]](t,r);if(a!==!0&&a)return a}break}}return null}function zo(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return vt(t);let e=Je({},null);return t.__ctx=e,e}function or(t){Ee=X(t,"validators")||{},rr=t.evaluate,Je=t.createContext,vt=t.findContext,yt=t.processTree,Qt=X(t,"cloneTemplate")||(()=>null),Qe=X(t,"disposeChildren")||(()=>{}),xt=X(t,"disposeTree")||Qe,Jt=X(t,"warn")||console.warn;let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):Jt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let f=function(){c&&typeof c.$notify=="function"&&c.$notify();let w=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;w.nextNode();){let A=w.currentNode.__ctx;A&&A!==c&&typeof A.$notify=="function"&&A.$notify()}},p=function(){return r.querySelectorAll("input, textarea, select")},l=function(){let w={},L={},A={},E=!0,S=null,T=0,R=!1;for(let k of p())k.name&&(k.type==="checkbox"?L[k.name]=k.checked:k.type==="radio"?k.checked?L[k.name]=k.value:k.name in L||(L[k.name]=""):L[k.name]=k.value);for(let k of p()){if(!k.name)continue;let U=a.has(k.name),V=d.has(k.name);if(!Po(k,c)){A[k.name]={valid:!0,dirty:V,touched:U,error:null,value:L[k.name]};continue}let be=Ho(k,L),C=Mo(be,k),H=!C,q=tr(k,r),P=q.includes("input"),M=q.includes("blur")||q.includes("focusout")||q.includes("submit"),F;!k.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?F=U||V:F=P&&V||M&&U,H||(E=!1),!H&&F&&(w[k.name]=C.message,T++,S||(S=C.message)),A[k.name]={valid:H,dirty:V,touched:U,error:C?C.message:null,value:L[k.name]},!H&&F?k.setAttribute("aria-invalid","true"):k.removeAttribute("aria-invalid");let K=k.getAttribute("error-class")||s;if(K){let te=K.split(/\s+/);!H&&F?k.classList.add(...te):k.classList.remove(...te)}if(C&&F){let te=k.getAttribute(`error-${C.rule}`),he=k.getAttribute("error"),B=(te&&te.startsWith("#")?te:null)||(he&&he.startsWith("#")?he:null);B?qo(B,C.message,C.rule,k,c):er(k)}else er(k);let ee=k.getAttribute("as");ee&&c.$set(ee,A[k.name])}g.size>0&&(R=!0),u.valid=E,u.errors=w,u.values=L,u.fields=A,u.firstError=S,u.errorCount=T,u.pending=R,c.$set("$form",{...u}),f(),b(r)},b=function(w){let L=u.valid&&!u.pending&&!u.submitting,A=w.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let E of A){if(E.hasAttribute("disabled")&&E.getAttribute("disabled")!==""){let S=E.getAttribute("disabled");if(S!=="disabled"&&S!=="true"&&S!=="false")continue}E.disabled=!L,E.__autoDisabled=!0}},m=function(w,L,A){w.addEventListener(L,A),h.push([w,L,A]),ue(r,()=>w.removeEventListener(L,A))},v=function(w){if(!w.name)return;let L=tr(w,r),A=()=>{d.add(w.name),u.dirty=!0,l()},E=()=>{a.add(w.name),u.touched=!0,l()};L.includes("input")?m(w,"input",A):m(w,"input",()=>{d.add(w.name),u.dirty=!0,l()}),L.includes("blur")||L.includes("focusout")?m(w,"focusout",()=>{E(),L.includes("blur")&&A()}):m(w,"focusout",E),L.includes("submit")&&m(w,"focusout",E)},c=zo(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,d=new Set,g=new Map,u={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u.dirty=!1,u.touched=!1,u.pending=!1,u.submitting=!1,a.clear(),d.clear(),r.reset(),l()},endSubmit:()=>{u.submitting=!1,l()}};c.$set("$form",u);let h=[],y=r.hasAttribute("validate-on"),x=[...p()].some(w=>w.hasAttribute("validate-on"));if(!y&&!x){let w=A=>{let E=A.target;E&&E.name&&d.add(E.name),u.dirty=!0,l()};r.addEventListener("input",w),ue(r,()=>r.removeEventListener("input",w)),r.addEventListener("change",w),ue(r,()=>r.removeEventListener("change",w));let L=A=>{A.target&&A.target.name&&a.add(A.target.name),u.touched=!0,l()};r.addEventListener("focusout",L),ue(r,()=>r.removeEventListener("focusout",L))}else{for(let L of p())v(L);let w=!1;ue(r,()=>{w=!0}),queueMicrotask(()=>{if(!w)for(let[L,A,E]of h)L.removeEventListener(A,E),L.addEventListener(A,E)})}let j=w=>{for(let L of p())L.name&&a.add(L.name);if(u.touched=!0,l(),!u.valid||u.pending){w.preventDefault(),w.stopImmediatePropagation();return}u.submitting=!0,b(r),c.$set("$form",{...u}),f()};r.addEventListener("submit",j,!0),ue(r,()=>r.removeEventListener("submit",j,!0)),r.__nojsResetSubmitting=()=>{u.submitting=!1,l()},ue(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(l);return}let i=vt(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),s=()=>{let a=Ro(r.value,n,{});if(a?r.setAttribute("aria-invalid","true"):r.removeAttribute("aria-invalid"),a&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let g=Qt(c);if(g){let u=Je({err:{message:a}},i);Qe(d),d.innerHTML="",d.__ctx=u,d.appendChild(g),yt(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(Qe(d),d.innerHTML="")}};r.addEventListener("input",s),ue(r,()=>r.removeEventListener("input",s))}}})}function ir(t,e={}){or(t)}function sr(){}var Ce=new Map,J=new Map;function ar(){let t=Array.from(Ce.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of J.values())clearTimeout(e);J.clear();for(let e of Ce.values())e.remove();Ce.clear()}function cr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Fo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var et=8;function lr(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+et,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-et;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+et;break;default:s=o.top-n.height-et,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Oo=0;function Vo(t,e,r){document.body.appendChild(e),lr(e,t,r),e.setAttribute("aria-hidden","false")}function dr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function No(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function ur(t){t.directive("tooltip",{priority:20,init(e,r,o){cr();let n=o;if(!n){No(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),d=a?t.findContext(e):null,g=()=>{if(!a||!d)return!1;try{return!!t.evaluate(a,d)}catch{return!1}},u=`nojs-tooltip-${++Oo}`,f=document.createElement("div");f.className="nojs-tooltip",f.setAttribute("role","tooltip"),f.setAttribute("id",u),f.setAttribute("aria-hidden","true"),f.textContent=n,e.setAttribute("aria-describedby",u),Ce.set(e,f);let p=!1,l=0,b=()=>{!p||!e.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!p||!e.isConnected)&&lr(f,e,i)}))},h=()=>{window.addEventListener("scroll",b,!0),window.addEventListener("resize",b)},m=()=>{window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),l&&(cancelAnimationFrame(l),l=0)},v=()=>{p||(Vo(e,f,i),p=!0,h())},y=()=>{if(!p){dr(e,f);return}m(),dr(e,f),p=!1},x=()=>{if(g())return;J.has(e)&&clearTimeout(J.get(e));let R=setTimeout(()=>{J.delete(e),!g()&&e.isConnected&&v()},s);J.set(e,R)},j=()=>{J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),y()},w=()=>x(),L=()=>j(),A=()=>x(),E=()=>j(),S=R=>{R.key==="Escape"&&f.getAttribute("aria-hidden")==="false"&&j()};e.addEventListener("mouseenter",w),e.addEventListener("mouseleave",L),e.addEventListener("focusin",A),e.addEventListener("focusout",E),e.addEventListener("keydown",S);let T=null;if(a&&d&&typeof d.$watch=="function"){let R=()=>{p&&g()&&y()};T=d.$watch(R)}Fo(e,()=>{e.removeEventListener("mouseenter",w),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",A),e.removeEventListener("focusout",E),e.removeEventListener("keydown",S),T&&(T(),T=null),m(),J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),p=!1,f.remove(),Ce.delete(e)})}})}function pr(t,e={}){ur(t)}function fr(){ar()}var Y=new Map;function mr(){Y.clear()}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function Et(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Se(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function wt(t){try{return t.matches(":popover-open")}catch{return!1}}var pe=8;function rt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-pe,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-pe;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+pe;break;default:s=o.bottom+pe,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-pe),r==="top"&&s<0&&(s=o.bottom+pe),r==="right"&&a+n.width>i&&(a=o.left-n.width-pe),r==="left"&&a<0&&(a=o.right+pe),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function _t(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(!wt(c)){i();return}rt(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function _e(t){t&&t._untrack&&t._untrack()}function gr(t){t.directive("popover",{priority:20,init(r,o,n){tt();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=Y.get(i);a.popoverEl=r,a.position=c}let s=a=>{let d=Y.get(i);if(!d)return;let g=a.newState==="open";d.open=g;for(let u of d.triggerEls)u.setAttribute("aria-expanded",String(g));g||(r.style.visibility="",_e(d))};r.addEventListener("toggle",s),Et(r,()=>{r.removeEventListener("toggle",s);let a=Y.get(i);a&&(_e(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){tt();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,d=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let c=a=>{let d=Y.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(Se(d.popoverEl)){d.popoverEl.style.visibility="hidden";try{d.popoverEl.togglePopover(),wt(d.popoverEl)?(rt(d.popoverEl,r,d.position),_t(d,r)):_e(d)}finally{d.popoverEl.style.visibility=""}}};r.addEventListener("click",c);let s=a=>{let d=Y.get(i);a.key==="Escape"&&d?.open&&(Se(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),_e(d),r.focus())};document.addEventListener("keydown",s),Et(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=Y.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(_e(a),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){tt();let o=()=>{let n=r.closest(".nojs-popover");!n||!Se(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),Et(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl,"showPopover"))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.showPopover();let i=o||[...n.triggerEls][0];i&&(rt(n.popoverEl,i,n.position),_t(n,i))}catch{return!1}finally{n.popoverEl.style.visibility=""}return!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!Se(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return _e(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];i&&wt(n.popoverEl)?(rt(n.popoverEl,i,n.position),_t(n,i)):_e(n)}finally{n.popoverEl.style.visibility=""}return!0},t.popover=e}function br(t,e={}){gr(t)}function hr(){mr()}var W=[],ie=new Map,Wo=1e4;function vr(){return Wo+W.length}function yr(){W.length=0,ie.clear()}function De(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Go(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Er='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',At=new WeakMap;function Uo(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(Er)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),At.set(t,e)}function xr(t){let e=At.get(t);e&&(t.removeEventListener("keydown",e),At.delete(t))}var Fe=new WeakMap;function _r(t){t.directive("modal",{priority:10,init(r,o,n){De();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),g=f=>{f.target===r&&s!=="false"&&d!=="false"&&Te(r,i)};r.addEventListener("click",g),ie.set(i,r);let u=f=>{if(f.newState==="open"){if(r.style.zIndex=String(vr()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(l=>l.el===r))return;let p=r.querySelector(Er);p?p.focus():r.focus()}),Uo(r),d!=="false"){let p=l=>{l.key==="Escape"&&(l.stopPropagation(),Te(r,i))};r.addEventListener("keydown",p),Fe.set(r,p)}}else if(f.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(b=>r.classList.remove(b)),xr(r);let p=Fe.get(r);p&&(r.removeEventListener("keydown",p),Fe.delete(r));let l=W.findIndex(b=>b.el===r);if(l===-1&&(l=W.findIndex(b=>b.id===i)),l!==-1){let b=W[l];W.splice(l,1),b.triggerEl&&requestAnimationFrame(()=>{b.triggerEl.focus()})}}};r.addEventListener("toggle",u),Go(r,()=>{r.removeEventListener("click",g),r.removeEventListener("toggle",u),xr(r);let f=Fe.get(r);f&&(r.removeEventListener("keydown",f),Fe.delete(r)),ie.delete(i);let p=W.findIndex(l=>l.el===r);p===-1&&(p=W.findIndex(l=>l.id===i)),p!==-1&&W.splice(p,1)})}});let e=r=>e.open(r);e.open=r=>{let o=ie.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=ie.get(r);return o?(Te(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)Te(W[r].el,W[r].id)},t.modal=e}function Te(t,e){try{t.hidePopover()}catch{}}function wr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Yo(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function Ar(t){t.directive("modal-open",{priority:10,init(e,r,o){De();let n=o;if(!n){let u=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(u&&(n=u.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let g=ie.get(n)||Yo(n);if(!g){console.warn(`[modal-open] modal "${n}" not found`);return}let u=W.some(f=>f.id===n);g.id&&e.setAttribute("aria-controls",g.id);try{g.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}u||W.push({id:n,el:g,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,d=()=>{let g=ie.get(n);return g?(a=g,s=u=>{u.newState==="closed"&&e.setAttribute("aria-expanded","false")},g.addEventListener("toggle",s),!0):!1};if(!d()){let g=requestAnimationFrame(d);wr(e,()=>cancelAnimationFrame(g))}e.addEventListener("click",i),wr(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function Ko(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function jr(t){t.directive("modal-close",{priority:10,init(e,r,o){De();let n=()=>{let i,c;if(o){if(c=o,i=ie.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Te(i,c)};e.addEventListener("click",n),Ko(e,()=>{e.removeEventListener("click",n)})}})}function Lr(t,e={}){_r(t),Ar(t),jr(t)}function kr(){yr()}var ne={openMenus:new Map},O={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function Cr(){ne.openMenus.clear(),O.installed=!1,O.instanceCount=0,O.outsideClickHandler=null,O.escHandler=null}function Ie(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var Xo=0;function Zo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qo(){O.installed||(O.outsideClickHandler=t=>{let e=[...ne.openMenus.entries()];for(let[r,{toggle:o,wrapper:n}]of e)if(!n.contains(t.target)){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}ne.openMenus.delete(r)}},O.escHandler=t=>{if(t.key!=="Escape")return;let e=[...ne.openMenus.entries()];for(let[r,{toggle:o}]of e){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}o.focus()}ne.openMenus.clear()},document.addEventListener("click",O.outsideClickHandler,!0),document.addEventListener("keydown",O.escHandler),O.installed=!0)}function Lt(){O.installed&&(document.removeEventListener("click",O.outsideClickHandler,!0),document.removeEventListener("keydown",O.escHandler),O.outsideClickHandler=null,O.escHandler=null,O.installed=!1)}function Sr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,d,g;switch(o){case"top":d=i.top-c.height,g=i.left;break;case"left":d=i.top,g=i.left-c.width;break;case"right":d=i.top,g=i.right;break;default:d=i.bottom,g=i.left}o==="bottom"||o==="top"?n==="end"&&(g=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>s&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=s&&(d=i.bottom),g<4&&(g=4),g+c.width>a-4&&(g=a-c.width-4),t.style.top=`${d}px`,t.style.left=`${g}px`}function kt(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function jt(t){let e=kt(t);e.length&&e[0].focus()}function Dr(t){let e=kt(t);e.length&&e[e.length-1].focus()}function Tr(t){t.directive("dropdown",{priority:15,init(r){Ie()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ie();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Xo++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Sr(n,r,o),ne.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ne.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let g=b=>{b.newState==="closed"&&d()&&a()};n.addEventListener("toggle",g);let u=b=>{b.preventDefault(),b.stopPropagation(),d()?a():s()};r.addEventListener("click",u),O.instanceCount++,Qo();let f=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),jt(n);break;case"ArrowDown":b.preventDefault(),s(),jt(n);break;case"ArrowUp":b.preventDefault(),s(),Dr(n);break}};r.addEventListener("keydown",f);let p=b=>{if(!(!d()||kt(n).find(v=>v===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),jt(n);break;case"ArrowUp":b.preventDefault(),Dr(n);break}};n.addEventListener("keydown",p);let l=()=>{d()&&Sr(n,r,o)};window.addEventListener("scroll",l,!0),window.addEventListener("resize",l),Zo(r,()=>{r.removeEventListener("click",u),r.removeEventListener("keydown",f),n.removeEventListener("keydown",p),n.removeEventListener("toggle",g),window.removeEventListener("scroll",l,!0),window.removeEventListener("resize",l),ne.openMenus.delete(n),O.instanceCount--,O.instanceCount<=0&&(O.instanceCount=0,Lt())})}}),t.directive("dropdown-menu",{priority:15,init(r){Ie(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function Ir(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Jo(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Ct(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ne.openMenus.has(t)&&ne.openMenus.delete(t)}function Br(t){t.directive("dropdown-item",{priority:15,init(e){Ie();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=Jo(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),Ct(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{Ct(r,o);break}}};e.addEventListener("keydown",n),Ir(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(Ct(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),Ir(e,()=>e.removeEventListener("click",i))}})}function Hr(t,e={}){Tr(t),Br(t)}function $r(){Lt(),Cr()}var se=new Map,Be=new Set,Mr=0;function qr(){return++Mr}function Pr(){for(let t of Be)clearTimeout(t);Be.clear();for(let t of se.values())t.remove();se.clear(),Mr=0}function Rr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function St(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ei=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Dt(){return se.size>0?se.values().next().value:ti("top-right")}function ti(t){if(se.has(t))return se.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),se.set(t,e),e}function ri(t){return t.startsWith("top")}function Tt(t,e,r,o,n){let i=qr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>nt(s)),s.appendChild(d)}if(ri(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let d=setTimeout(()=>{Be.delete(d),s.isConnected&&nt(s)},o);Be.add(d),s._toastTimerId=d}return s}function nt(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Be.delete(t._toastTimerId)),t.remove())}function zr(t){Rr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&ei.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),se.set(i,r),St(r,()=>{se.get(i)===r&&se.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let b=Dt();Tt(b,n,i,s,a)};r.addEventListener("click",l),St(r,()=>r.removeEventListener("click",l));return}let g=t.findContext(r);if(!g||typeof g.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let u;function f(){let l=t.evaluate(n,g);if(l&&l!==u){let b=typeof l=="string"?l:String(l),h=Dt();Tt(h,b,i,s,a),u=l}else u=l}let p=g.$watch(f);St(r,p)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=Dt();return Tt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&nt(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>nt(r))},t.toast=e,t.global("toast",e)}function Fr(t,e={}){zr(t)}function Or(){Pr()}var we={containers:new Map};function Vr(){we.containers.clear()}function Nr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function ni(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var oi=0;function Wr(t){return`${t}-${++oi}`}function Oe(t,e,r=!1){let o=we.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Ve(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Gr(t){t.directive("tabs",{priority:10,init(e,r,o){Nr();let n=[],i=[];for(let m of Array.from(e.children))m.hasAttribute("tab")?n.push(m):m.hasAttribute("panel")&&i.push(m);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let m=0;m<a;m++){let v=n[m],y=i[m],x=v.id||Wr("nojs-tab"),j=y.id||Wr("nojs-panel");v.id=x,y.id=j,v.setAttribute("role","tab"),v.setAttribute("aria-selected","false"),v.setAttribute("aria-controls",j),v.setAttribute("tabindex","-1"),v.classList.add("nojs-tab"),y.setAttribute("role","tabpanel"),y.setAttribute("aria-labelledby",x),y.setAttribute("tabindex","0"),y.setAttribute("aria-hidden","true"),y.inert=!0,y.classList.add("nojs-panel"),s.appendChild(v)}for(let m=a;m<i.length;m++){let v=i[m];v.setAttribute("role","tabpanel"),v.setAttribute("aria-hidden","true"),v.inert=!0,v.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),we.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let g=t.findContext(e),u=[],f=(m,v)=>{let y=!1;try{y=!!t.evaluate(v,g)}catch{y=!1}y?m.setAttribute("aria-disabled","true"):m.removeAttribute("aria-disabled")};for(let m=0;m<a;m++){let v=n[m],y=v.getAttribute("tab-disabled");if(y&&(f(v,y),g&&typeof g.$watch=="function")){let x=g.$watch(()=>f(v,y));u.push(x)}}let p=0;if(o&&o.trim()!==""){let m=parseInt(o,10);!isNaN(m)&&m>=0&&m<a&&(p=m)}let l=n.slice(0,a);if(n[p]?.getAttribute("aria-disabled")==="true"){let m=Ve(l,p,1);m!==-1?(p=m,Oe(e,p)):Oe(e,p,!0)}else Oe(e,p);let b=m=>{let v=we.containers.get(e);if(!v)return;let y=m.target;if(y.getAttribute("role")!=="tab")return;let{tabs:x}=v,j=x.indexOf(y);if(j===-1)return;let w=-1;switch(m.key){case"ArrowRight":case"ArrowDown":w=Ve(x,j,1);break;case"ArrowLeft":case"ArrowUp":w=Ve(x,j,-1);break;case"Home":w=Ve(x,x.length-1,1);break;case"End":w=Ve(x,0,-1);break;case"Tab":return;default:return}w!==-1&&w!==j&&(m.preventDefault(),Oe(e,w),x[w].focus())};s.addEventListener("keydown",b);let h=m=>{let v=m.target.closest("[role='tab']");if(!v)return;let y=we.containers.get(e);if(!y)return;let x=y.tabs.indexOf(v);x!==-1&&v.getAttribute("aria-disabled")!=="true"&&(Oe(e,x),v.focus())};s.addEventListener("click",h),ni(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",h);for(let m of u)m&&m();u.length=0,we.containers.delete(e)})}})}function Ur(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Yr(t){t.directive("panel",{priority:11,init(){}})}function Kr(t,e={}){Gr(t),Ur(t),Yr(t)}function Xr(){Vr()}var $={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Zr(){$.branches.clear(),$.selectedItem=null,$.typeahead="",$.typeaheadTimer&&(clearTimeout($.typeaheadTimer),$.typeaheadTimer=null)}function He(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function $e(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Jr(t){return t.closest('[role="tree"]')}function ii(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function si(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function It(t){let e=$.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),$.selectedItem=t}function en(t){let e=$.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function ai(t){let e=$.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function ci(t){let e=$.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function tn(t,e){let r=Jr(e);if(!r)return;let o=Qr(r),n=o.indexOf(e);if(n<0)return;let i=$.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)ai(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&Ae(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)ci(e);else{let s=ii(e);s&&Ae(s,Qr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&Ae(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&Ae(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),It(e),c&&en(e);break;case"Home":t.preventDefault(),o.length>0&&Ae(o[0],o);break;case"End":t.preventDefault(),o.length>0&&Ae(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),$.typeahead+=t.key.toLowerCase(),$.typeaheadTimer&&clearTimeout($.typeaheadTimer),$.typeaheadTimer=setTimeout(()=>{$.typeahead="",$.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let d=(s+a)%o.length;if(si(o[d]).startsWith($.typeahead)){Ae(o[d],o);break}}}break}}function rn(t){t.directive("tree",{priority:15,init(e){He(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function nn(t){t.directive("branch",{priority:16,init(e,r,o){He();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Jr(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?($.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):$.branches.set(e,{expanded:n,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),It(e),en(e))};e.addEventListener("click",s),$e(e,()=>e.removeEventListener("click",s));let a=d=>{tn(d,e)};e.addEventListener("keydown",a),$e(e,()=>e.removeEventListener("keydown",a)),$e(e,()=>{c=!0,$.branches.delete(e),$.selectedItem===e&&($.selectedItem=null),$.typeaheadTimer&&(clearTimeout($.typeaheadTimer),$.typeaheadTimer=null,$.typeahead="")})}})}function Ae(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function on(t){t.directive("subtree",{priority:16,init(e){He(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),It(o)};o.addEventListener("click",n),$e(o,()=>o.removeEventListener("click",n));let i=c=>{tn(c,o)};o.addEventListener("keydown",i),$e(o,()=>o.removeEventListener("keydown",i)),$e(o,()=>{$.selectedItem===o&&($.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=$.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function sn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Bt(t){return t.closest('[role="treeitem"]')}function di(t){return t.closest('[role="tree"]')}function li(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function ui(t){return li(t).indexOf(t)}function pi(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function an(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var I={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Me(){I.indicator&&(I.indicator.remove(),I.indicator=null)}function Ne(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function fi(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function mi(t,e){Me();let r=fi(),o=t.getBoundingClientRect(),n=di(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),I.indicator=r}function cn(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(He(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=f=>{let p=Bt(f.target);if(p&&e.contains(p)){if(p.hasAttribute("tree-drag-disabled")){f.preventDefault();return}I.dragging={el:p,treeRoot:e},f.dataTransfer&&(f.dataTransfer.effectAllowed="move",f.dataTransfer.setData("text/plain","")),p.classList.add("nojs-dragging"),p.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:p}}))}},c=f=>{if(!I.dragging||I.dragging.treeRoot!==e)return;let p=Bt(f.target);if(!p||!e.contains(p)||p===I.dragging.el||an(p,I.dragging.el))return;f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move");let l=pi(p,f.clientY,o);(I.currentTarget!==p||I.currentPosition!==l)&&(Ne(e),Me(),I.currentTarget=p,I.currentPosition=l,l==="on"?p.classList.add("nojs-tree-drag-over"):mi(p,l))},s=f=>{I.dragging&&I.dragging.treeRoot===e&&n++},a=f=>{I.dragging&&(n--,n<=0&&(n=0,Ne(e),Me(),I.currentTarget=null,I.currentPosition=null))},d=f=>{if(f.preventDefault(),f.stopPropagation(),n=0,!I.dragging||I.dragging.treeRoot!==e)return;let p=I.dragging.el,l=I.currentTarget,b=I.currentPosition;if(Ne(e),Me(),!l||!b){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(l===p||an(l,p)){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="on"){let h=l.querySelector(':scope > [role="group"]');h||(h=l.nextElementSibling?.matches?.('[role="group"]')?l.nextElementSibling:null),h?h.setAttribute("aria-hidden","false"):(h=document.createElement("ul"),h.setAttribute("role","group"),h.setAttribute("subtree",""),h.classList.add("nojs-subtree","nojs-tree"),h.setAttribute("aria-hidden","false"),l.appendChild(h));let m=$.branches.get(l);m&&(m.expanded=!0,m.subtreeEl=h,l.setAttribute("aria-expanded","true")),h.appendChild(p),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:p,newParent:l}}))}else{let h=l.parentElement;if(!h){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="before")h.insertBefore(p,l);else{let v=l.nextElementSibling,y=v?.matches?.('[role="group"]')?v.nextElementSibling:v;y?h.insertBefore(p,y):h.appendChild(p)}let m=ui(p);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:p,newIndex:m}}))}I.dragging=null,I.currentTarget=null,I.currentPosition=null},g=f=>{let p=Bt(f.target);p&&p.classList.remove("nojs-dragging"),Ne(e),Me(),n=0,I.dragging&&I.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:I.dragging.el}})),I.dragging=null,I.currentTarget=null,I.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",d),e.addEventListener("dragend",g),sn(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",d),e.removeEventListener("dragend",g),Ne(e),Me()}),gi(e);let u=new MutationObserver(f=>{for(let p of f)for(let l of p.addedNodes){if(l.nodeType!==1)continue;l.getAttribute("role")==="treeitem"&&Ht(l);let b=l.querySelectorAll?.('[role="treeitem"]');if(b)for(let h of b)Ht(h)}});u.observe(e,{childList:!0,subtree:!0}),sn(e,()=>u.disconnect())}})}function Ht(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function gi(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)Ht(r)}function dn(t,e={}){rn(t),nn(t),on(t),cn(t)}function ln(){Zr()}var ot=new Map;function un(){ot.clear()}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function pn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function fn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function mn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function We(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function gn(t){t.directive("stepper",{priority:14,init(e,r,o){it();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",g=e.getAttribute("aria-label")||"Stepper",u=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",g),e.classList.add("nojs-stepper");let f=null,p=[];if(a){f=document.createElement("div"),f.className="nojs-stepper-indicator",f.setAttribute("role","tablist"),f.setAttribute("aria-label","Progress"),i.forEach((E,S)=>{if(S>0){let V=document.createElement("div");V.className="nojs-stepper-separator",V.setAttribute("aria-hidden","true"),f.appendChild(V)}let T=document.createElement("button");T.type="button",T.className="nojs-stepper-indicator-item",T.setAttribute("role","tab"),T.setAttribute("aria-selected",S===u?"true":"false");let R=E.getAttribute("step-label")||`Step ${S+1}`,k=document.createElement("span");k.textContent=R,T.appendChild(k),T.setAttribute("aria-label",R);let U=`nojs-stepper-tab-${bi++}`;if(T.id=U,s==="free"){T.setAttribute("data-clickable","");let V=()=>j(S);T.addEventListener("click",V),We(e,()=>T.removeEventListener("click",V))}else T.setAttribute("tabindex","-1");f.appendChild(T),p.push(T)});let A=E=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(E.key))return;E.preventDefault();let S=u;E.key==="ArrowRight"?S=Math.min(u+1,i.length-1):E.key==="ArrowLeft"?S=Math.max(u-1,0):E.key==="Home"?S=0:E.key==="End"&&(S=i.length-1),s==="free"?(j(S),p[S]?.focus()):p[u]?.focus()};f.addEventListener("keydown",A),We(e,()=>f.removeEventListener("keydown",A)),e.insertBefore(f,e.firstChild)}let l=null,b=null,h=null;if(d){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-prev",b.textContent="Previous";let A=()=>x();b.addEventListener("click",A),We(e,()=>b.removeEventListener("click",A)),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-next",h.textContent="Next";let E=()=>y();h.addEventListener("click",E),We(e,()=>h.removeEventListener("click",E)),l.appendChild(b),l.appendChild(h),e.appendChild(l)}function m(A){let E=i[A];if(!E)return!0;if(!pn(E,t.findContext)){let R=E.querySelector("form[validate]");return R&&(fn(R),p[A]&&p[A].classList.add("nojs-step-invalid"),mn(e,E,R)),!1}p[A]&&p[A].classList.remove("nojs-step-invalid");let S=E.querySelectorAll("[required]");for(let R of S)if(typeof R.checkValidity=="function"&&!R.checkValidity())return R.reportValidity(),!1;let T=E.getAttribute("step-validate");if(T)try{if(!t.evaluate(T,n))return!1}catch(R){return console.warn(`[stepper] step-validate error: ${R.message}`),!1}return!0}function v(A){if(i.forEach((E,S)=>{let T=S===u;E.setAttribute("aria-hidden",T?"false":"true"),T?(E.removeAttribute("inert"),E.setAttribute("aria-current","step")):(E.setAttribute("inert",""),E.removeAttribute("aria-current"))}),p.length&&p.forEach((E,S)=>{E.setAttribute("aria-selected",S===u?"true":"false"),S<u?E.setAttribute("data-completed",""):E.removeAttribute("data-completed"),E.setAttribute("tabindex",S===u?"0":"-1");let T=i[S];T.id&&(E.setAttribute("aria-controls",T.id),T.setAttribute("aria-labelledby",E.id))}),b&&(b.disabled=u===0),h&&(h.textContent=u===i.length-1?"Finish":"Next"),!A){let E=i[u];E&&requestAnimationFrame(()=>E.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!A,detail:{current:u,total:i.length}}))}function y(){return u>=i.length-1?(s==="linear"&&!m(u)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:u,total:i.length}})),!1):s==="linear"&&!m(u)?!1:(u++,v(),L(),!0)}function x(){return u<=0?!1:(u--,v(),L(),!0)}function j(A){if(A<0||A>=i.length||A===u)return!1;if(s==="linear"&&A>u){for(let E=u;E<A;E++)if(u=E,v(),!m(E))return L(),!1}return u=A,v(),L(),!0}let w={get current(){return u},get total(){return i.length},next:y,prev:x,goTo:j,get isFirst(){return u===0},get isLast(){return u===i.length-1}};function L(){n.$stepper=w}L(),ot.set(e,{get current(){return u},steps:i,mode:s,indicatorEl:f,navEl:l}),v(!0),We(e,()=>{ot.delete(e),f&&f.parentNode&&f.remove(),l&&l.parentNode&&l.remove(),delete n.$stepper})}})}var bi=0;var hi=0;function bn(t){t.directive("step",{priority:13,init(e,r,o){it(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${hi++}`),e.setAttribute("tabindex","0")}})}function hn(t,e={}){bn(t),gn(t)}function vn(){un()}function yn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function xn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function En(t){t.directive("skeleton",{priority:10,init(e,r,o){yn();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function d(m){g();for(let v=0;v<m;v++){let y=document.createElement("div");y.className="nojs-skeleton-line",e.appendChild(y),a.push(y)}}function g(){for(let m of a)m.parentNode===e&&e.removeChild(m);a=[]}function u(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let m=s+(String(s).match(/\d$/)?"px":"");e.style.width=m,e.style.height=m}if(c){let m=parseInt(c,10);m>0&&d(m)}e.setAttribute("aria-busy","true")}let f=null;function p(){f&&f(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let m=!1,v=null,y=()=>{m||(m=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",y),v!==null&&clearTimeout(v),f=null)};e.addEventListener("transitionend",y),v=setTimeout(y,0),f=()=>{e.removeEventListener("transitionend",y),v!==null&&clearTimeout(v),m=!0,f=null}}let l=!1;function b(){let m=!!t.evaluate(o,n);m&&!l?(l=!0,u()):!m&&l&&(l=!1,p())}b();let h=n.$watch(b);xn(e,h),xn(e,()=>{f&&f(),l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function _n(t,e={}){En(t)}var je=new Map,G=new Map,D={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function wn(){je.clear(),G.clear(),D.active=!1,D.splitEl=null,D.gutterEl=null,D.prevPane=null,D.nextPane=null,D.direction=null,D.startPos=0,D.startPrevSize=0,D.startNextSize=0,D.containerSize=0}function st(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function vi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function An(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function jn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function yi(t,e){let o=(je.get(t)?.gutters||[]).reduce((n,i)=>n+Q(i,e),0);return Q(t,e)-o}function xi(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Ge(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function at(t,e,r,o){let n=Q(e,o),i=Q(r,o),c=G.get(e),s=G.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function $t(t){let e=t.getAttribute("split-persist");if(!e)return;let r=je.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function Ei(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=je.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function _i(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=p=>{if(p.button!==0)return;p.preventDefault();let l=yi(t,e);D.active=!0,D.splitEl=t,D.gutterEl=i,D.prevPane=r,D.nextPane=o,D.direction=e,D.startPos=p[An(e)],D.startPrevSize=Q(r,e),D.startNextSize=Q(o,e),D.containerSize=l,D.sign=jn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(p.pointerId)},s=p=>{if(!D.active||D.gutterEl!==i)return;let l=(p[An(D.direction)]-D.startPos)*(D.sign||1),b=Ge(D.startPrevSize+l,D.prevPane),h=Ge(D.startNextSize-l,D.nextPane),m=D.startPrevSize+D.startNextSize;b+h!==m&&(b!==D.startPrevSize+l?h=m-b:b=m-h),D.prevPane.style.flexBasis=`${b}px`,D.prevPane.style.flexGrow="0",D.nextPane.style.flexBasis=`${h}px`,D.nextPane.style.flexGrow="0",at(i,D.prevPane,D.nextPane,D.direction)},a=()=>{!D.active||D.gutterEl!==i||(D.active=!1,document.body.style.cursor="",document.body.style.userSelect="",$t(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let d=10,g=p=>{let l=e==="horizontal",b=jn(t,e),h=0;if(l&&p.key==="ArrowRight"||!l&&p.key==="ArrowDown")h=d*b;else if(l&&p.key==="ArrowLeft"||!l&&p.key==="ArrowUp")h=-d*b;else if(p.key==="Home")h=(G.get(r)?.min||0)-Q(r,e);else if(p.key==="End"){let w=G.get(o);h=Q(r,e)+Q(o,e)-(w?.min||0)-Q(r,e)}else return;p.preventDefault();let m=Q(r,e),v=Q(o,e),y=m+v,x=Ge(m+h,r),j=Ge(y-x,o);x=y-j,x=Ge(x,r),j=y-x,r.style.flexBasis=`${x}px`,r.style.flexGrow="0",o.style.flexBasis=`${j}px`,o.style.flexGrow="0",at(i,r,o,e),$t(t)};i.addEventListener("keydown",g);let u=()=>{let p=G.get(r),l=G.get(o),b=p?.collapsible?r:l?.collapsible?o:null;if(!b)return;let h=G.get(b);if(!h)return;let m=b===r?o:r,v=Q(r,e)+Q(o,e);if(h.collapsed){h.collapsed=!1,b.removeAttribute("data-collapsed");let y=h.preCollapseSize||`${Math.round(v/2)}px`,x=xi(y,v)??v/2,j=Math.min(x,v);b.style.flexBasis=`${j}px`,b.style.flexGrow="0",m.style.flexBasis=`${v-j}px`,m.style.flexGrow="0"}else h.preCollapseSize=b.style.flexBasis||`${Q(b,e)}px`,h.collapsed=!0,b.setAttribute("data-collapsed","true"),b.style.flexBasis="0px",b.style.flexGrow="0",m.style.flexBasis=`${v}px`,m.style.flexGrow="0";at(i,r,o,e),$t(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:b,collapsed:h.collapsed}}))};return i.addEventListener("dblclick",u),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",g),i.removeEventListener("dblclick",u)}}}function Ln(t){t.directive("split",{priority:14,init(e,r,o){st();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(g=>g.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(g=>{G.get(g)||G.set(g,{size:g.getAttribute("pane")||null,min:parseInt(g.getAttribute("pane-min"),10)||0,max:parseInt(g.getAttribute("pane-max"),10)||1/0,collapsible:g.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let g=0;g<c.length-1;g++){let{gutter:u,cleanup:f}=_i(e,n,c[g],c[g+1],i);c[g].after(u),s.push(u),a.push(f)}je.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),Ei(e)||c.forEach(g=>{let f=G.get(g)?.size;f?(g.style.flexBasis=f,g.style.flexGrow="0"):(g.style.flexGrow="1",g.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((g,u)=>{at(g,c[u],c[u+1],n)})}),vi(e,()=>{a.forEach(g=>g()),s.forEach(g=>g.remove()),je.delete(e),c.forEach(g=>G.delete(g)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function wi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function kn(t){t.directive("pane",{priority:15,init(e,r,o){st(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),wi(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function Cn(t,e={}){Ln(t),kn(t)}function Sn(){wn()}var fe={sorts:new Map};function Dn(){fe.sorts.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Ai(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ji(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Li(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Tn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function In(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function Hn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return In(Number(t),Number(e));case"date":return In(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function ki(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function $n(t){t.directive("sortable",{priority:10,init(e){Le(),e.classList.add("nojs-sortable")}})}function Mn(t){t.directive("sort",{priority:11,init(e,r,o){Le();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;fe.sorts.has(s)||fe.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(fe.sorts.get(s).column||Bn(e,s,n,i,c,t));let a=()=>{let g=fe.sorts.get(s),u;g.column!==n?u="asc":g.direction==="asc"?u="desc":g.direction==="desc"?u=null:u="asc",Bn(e,s,n,i,u,t)},d=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),a())};e.addEventListener("click",a),e.addEventListener("keydown",d),Ai(e,()=>{e.removeEventListener("click",a),e.removeEventListener("keydown",d),s&&!s.isConnected&&(fe.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Bn(t,e,r,o,n,i){let c=fe.sorts.get(e);ki(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=ji(e,i);if(s){let a=i.findContext(e),d=a?Li(a,s.arrayPath):null;if(Array.isArray(d)){if(!n){let u=e._nojsOriginalOrder;if(u){let f=new Set(d),p=u.filter(l=>f.has(l));for(let l of d)u.includes(l)||p.push(l);Tn(a,s.arrayPath,p)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let g=[...d].sort((u,f)=>{let p=u!=null?u[r]:null,l=f!=null?f[r]:null,b=Hn(p,l,o);return n==="desc"?-b:b});Tn(a,s.arrayPath,g);return}}Ci(e,t,r,o,n)}function Ci(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let f=document.createDocumentFragment();for(let p of t._nojsOriginalRows)f.appendChild(p);i.appendChild(f);return}let g=f=>{let p=f.replace(/[^0-9.\-]/g,"");return p===""||p==="-"?NaN:parseFloat(p)};d.sort((f,p)=>{let l=f.children[a]?.textContent?.trim()||"",b=p.children[a]?.textContent?.trim()||"",h=Hn(o==="number"?g(l):l,o==="number"?g(b):b,o);return n==="desc"?-h:h});let u=document.createDocumentFragment();for(let f of d)u.appendChild(f);i.appendChild(u)}function qn(t){t.directive("fixed-header",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-header")}})}function Pn(t){t.directive("fixed-col",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-col")}})}function Mt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Rn(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function zn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Fn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function On(t){t.directive("table-reorder",{priority:15,init(e){if(Le(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,d=null;function g(){let h=r.querySelectorAll(":scope > tr");for(let m=0;m<h.length;m++){let v=h[m];if(v._nojsReorderSetup)continue;v._nojsReorderSetup=!0,v.draggable=!0,v.setAttribute("aria-roledescription","draggable row");let y=!0;if(n){let E=S=>{y=!!S.target.closest(n)};v.addEventListener("mousedown",E),Mt(v,()=>v.removeEventListener("mousedown",E))}let x=E=>{if(n&&!y){E.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(v),a=v,E.dataTransfer&&(E.dataTransfer.effectAllowed="move",E.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(T=>v.classList.add(T))},j=E=>{if(a==null)return;E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let S=v.getBoundingClientRect(),T=S.top+S.height/2,k=[...r.querySelectorAll(":scope > tr")].indexOf(v);u(),k!==s&&(E.clientY<T?v.classList.add("nojs-reorder-insert-before"):v.classList.add("nojs-reorder-insert-after"),d=v)},w=()=>{v.classList.remove("nojs-reorder-insert-before"),v.classList.remove("nojs-reorder-insert-after"),d===v&&(d=null)},L=E=>{if(E.preventDefault(),E.stopPropagation(),a==null||s==null)return;let S=[...r.querySelectorAll(":scope > tr")],T=v.getBoundingClientRect(),R=T.top+T.height/2,k=S.indexOf(v);E.clientY>=R&&k++;let U=s;if(U===k||U+1===k){f();return}let V=U<k?k-1:k,be=Rn(e);if(be&&o){let C=zn(o,be.arrayPath);if(Array.isArray(C)){let H=[...C],[q]=H.splice(U,1);H.splice(V,0,q),Fn(o,be.arrayPath,H),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...H]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:U,to:V,item:q}}))}}else{let C=a,H=S[V];C&&H&&(U<V?r.insertBefore(C,H.nextSibling):r.insertBefore(C,H),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:U,to:V,item:null}})))}f()},A=()=>{f()};v.addEventListener("dragstart",x),v.addEventListener("dragover",j),v.addEventListener("dragleave",w),v.addEventListener("drop",L),v.addEventListener("dragend",A),Mt(v,()=>{v.removeEventListener("dragstart",x),v.removeEventListener("dragover",j),v.removeEventListener("dragleave",w),v.removeEventListener("drop",L),v.removeEventListener("dragend",A),v._nojsReorderSetup=!1})}}function u(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function f(){a&&i.split(/\s+/).filter(Boolean).forEach(m=>a.classList.remove(m)),u(),s=null,a=null;let h=r.querySelectorAll(":scope > tr");for(let m of h)m.classList.remove("nojs-reorder-insert-before"),m.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(v=>m.classList.remove(v))}let p=h=>{a!=null&&(h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect="move"))},l=h=>{if(a==null||h.target!==r)return;h.preventDefault(),h.stopPropagation();let m=s,y=[...r.querySelectorAll(":scope > tr")].length-1;if(m===y){f();return}let x=Rn(e);if(x&&o){let j=zn(o,x.arrayPath);if(Array.isArray(j)){let w=[...j],[L]=w.splice(m,1);w.push(L),Fn(o,x.arrayPath,w),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...w]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:m,to:w.length-1,item:L}}))}}f()};r.addEventListener("dragover",p),r.addEventListener("drop",l);let b=new MutationObserver(()=>{g()});b.observe(r,{childList:!0}),g(),Mt(e,()=>{b.disconnect(),r.removeEventListener("dragover",p),r.removeEventListener("drop",l),f()})}})}function Vn(t,e={}){$n(t),Mn(t),qn(t),Pn(t),On(t)}function Nn(){Dn()}var me={containers:new Map};function Wn(){for(let[,t]of me.containers)typeof t.unsub=="function"&&t.unsub();me.containers.clear()}function Gn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Un(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Si(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function Di(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Yn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=c.label,s.appendChild(d)}else{let d=document.createElement("a");d.href=c.href,d.textContent=c.label,s.appendChild(d)}o.appendChild(s)}t.appendChild(o);let n=me.containers.get(t);n&&(n.crumbs=e)}function Ti(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=Si(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function Ii(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=Di(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function Kn(t){t.directive("breadcrumb",{priority:15,init(e,r,o){Gn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(me.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,d=a?a.path:"/",g=Ii(d);Yn(e,g)};if(s(),typeof i.on=="function"){let a=i.on(s),d=me.containers.get(e);d&&(d.unsub=a),Un(e,()=>{typeof a=="function"&&a();let g=me.containers.get(e);g&&(g.unsub=null)})}}else{let s=Ti(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");Yn(e,s)}Un(e,()=>{me.containers.delete(e)})}})}function Xn(t,e={}){Kn(t)}function Zn(){Wn()}var ct={containers:new Map};function Qn(){ct.containers.clear()}function Jn(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Bi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var dt=null;function Hi(){return dt!==null||(dt=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),dt}function eo(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function $i(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function ro(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function to(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");ro(t,r)}else t.open=!1}function lt(t,e,r,o){let n=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function qe(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function no(t){t.directive("accordion",{priority:10,init(e,r,o){Jn();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!Hi();e.setAttribute("role","group");let c=qe(e);if(c.length===0)return;if(i)for(let f of c)eo(f);let s=[],a=new MutationObserver(f=>{for(let p of f)for(let l of p.addedNodes)l.nodeType!==1||l.tagName!=="DETAILS"||l.parentElement===e&&g(l)});a.observe(e,{childList:!0});let d=0,g=f=>{i&&eo(f);let p=f.querySelector(":scope > summary");if(p){let h=`nojs-accordion-panel-${Date.now()}-${d++}`,m=f.querySelector(":scope > .nojs-accordion-content");m?(m.id=m.id||h,m.setAttribute("role","region"),h=m.id):(f.id||(f.id=h),h=f.id),p.setAttribute("aria-expanded",f.open?"true":"false"),p.setAttribute("aria-controls",h)}let l=h=>{let m=qe(e),v=m.indexOf(f),y=f.querySelector(":scope > summary");if(y&&y.setAttribute("aria-expanded",f.open?"true":"false"),f.open){if(n==="single")for(let x of m)x!==f&&x.open&&to(x,i);lt(e,f,!0,v)}else lt(e,f,!1,v)},b=null;if(i){let h=f.querySelector(":scope > summary");h&&(b=m=>{m.preventDefault();let v=f.querySelector(":scope > .nojs-accordion-content");if(f.open)ro(f,v),h.setAttribute("aria-expanded","false"),lt(e,f,!1,qe(e).indexOf(f));else{if(n==="single"){let y=qe(e);for(let x of y)if(x!==f&&x.open){to(x,!0);let j=x.querySelector(":scope > summary");j&&j.setAttribute("aria-expanded","false")}}$i(f,v),h.setAttribute("aria-expanded","true"),lt(e,f,!0,qe(e).indexOf(f))}},h.addEventListener("click",b))}f.addEventListener("toggle",l),s.push({details:f,toggleHandler:l,clickHandler:b})};for(let f of c)g(f);let u=f=>{let p=f.target;if(p.tagName!=="SUMMARY")return;let l=p.parentElement;if(!l||l.parentElement!==e)return;let h=qe(e).map(y=>y.querySelector(":scope > summary")).filter(Boolean),m=h.indexOf(p);if(m===-1)return;let v=-1;switch(f.key){case"ArrowDown":case"ArrowRight":v=(m+1)%h.length;break;case"ArrowUp":case"ArrowLeft":v=(m-1+h.length)%h.length;break;case"Home":v=0;break;case"End":v=h.length-1;break;default:return}v!==-1&&v!==m&&(f.preventDefault(),h[v].focus())};e.addEventListener("keydown",u),ct.containers.set(e,{mode:n,listeners:s,observer:a}),Bi(e,()=>{e.removeEventListener("keydown",u),a.disconnect();for(let f of s)if(f.details.removeEventListener("toggle",f.toggleHandler),f.clickHandler){let p=f.details.querySelector(":scope > summary");p&&p.removeEventListener("click",f.clickHandler)}s.length=0,ct.containers.delete(e)})}})}function oo(t,e={}){no(t)}function io(){Qn()}var Pe=new Map;function so(){let t=Array.from(Pe.keys());for(let e of t){let r=Pe.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}Pe.clear()}function ao(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Mi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function qi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=Pi(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function Pi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Ri(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function co(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function ut(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function zi(t,e){return t*e}function uo(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function po(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function lo(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function pt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function Fi(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return po(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function Oi(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return po(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function Vi(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=Fi(t,e),n=Oi(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function qt(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:s}=Vi(t,n,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=pt(t,c),d=t.itemHeight!=="auto"?zi(t.totalItems,t.itemHeight):lo(t),g=s>=0?pt(t,s+1):0,u=Math.max(0,d-g);ut(t.spacerTop,a),ut(t.spacerBottom,u);let f=new Set;for(let l=c;l<=s;l++)f.add(l);for(let[l,b]of t.renderedNodes)f.has(l)||(b.remove(),t.renderedNodes.delete(l));let p=[];for(let l=c;l<=s;l++){if(t.renderedNodes.has(l))continue;let b=t.dataArray[l];if(b===void 0)continue;let h=t.template.cloneNode(!0),m={};m[t.iteratorVar]=b,m.$index=l,m.$count=t.totalItems,m.$first=l===0,m.$last=l===t.totalItems-1,m.$even=l%2===0,m.$odd=l%2!==0,h.setAttribute("role","option"),h.setAttribute("aria-setsize",String(t.totalItems)),h.setAttribute("aria-posinset",String(l+1)),h.setAttribute("tabindex","-1"),h.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(m)),h.__declared=!1,p.push({index:l,node:h}),t.renderedNodes.set(l,h)}if(p.length>0){p.sort((l,b)=>l.index-b.index);for(let{index:l,node:b}of p){let h=null;for(let[m,v]of t.renderedNodes)m>l&&v.parentNode===r&&(!h||m<Ni(h,t))&&(h=v);h||(h=t.spacerBottom),r.insertBefore(b,h);try{e.processTree&&e.processTree(b)}catch{}}}if(t.itemHeight==="auto"){let l=!1;for(let[b,h]of t.renderedNodes){let m=h.offsetHeight||h.getBoundingClientRect().height;m>0&&t.heights[b]!==m&&(t.heights[b]=m,l=!0)}if(l){uo(t);let b=lo(t),h=pt(t,c),m=s>=0?pt(t,s+1):0,v=Math.max(0,b-m);ut(t.spacerTop,h),ut(t.spacerBottom,v)}}}function Ni(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function Wi(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&uo(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,qt(t,r)}function fo(t){t.directive("virtual",{priority:10,init(e,r,o){ao(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=qi(e),d=null;if(a)d=a.eachEl;else for(let j of e.children)if(!j.classList.contains("nojs-virtual-spacer")){d=j;break}if(!d){console.warn("[virtual] No child template found.");return}let g=d.cloneNode(!0);for(g.removeAttribute("each"),g.removeAttribute("foreach"),g.removeAttribute("for"),g.__declared=!1,g.__disposers=null,g.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let u=co(e),f=co(e);e.appendChild(u),e.appendChild(f);let p={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:g,spacerTop:u,spacerBottom:f,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};Pe.set(e,p);let l=j=>{let w=[...e.querySelectorAll('[role="option"]')];if(!w.length)return;let L=e.querySelector('[role="option"]:focus'),A=L?w.indexOf(L):-1,E=-1;switch(j.key){case"ArrowDown":j.preventDefault(),E=A<w.length-1?A+1:A;break;case"ArrowUp":j.preventDefault(),E=A>0?A-1:0;break;case"Home":j.preventDefault(),E=0;break;case"End":j.preventDefault(),E=w.length-1;break;default:return}E>=0&&E<w.length&&w[E].focus()};e.addEventListener("keydown",l);let b=null,h=()=>{b||(b=requestAnimationFrame(()=>{b=null,qt(p,t)}))};if(p.scrollHandler=h,e.addEventListener("scroll",h,{passive:!0}),typeof ResizeObserver<"u"){let j=new ResizeObserver(()=>{p.dirty=!0,qt(p,t)});j.observe(e),p.resizeObserver=j}let m=null,v=-1,y=null,x=()=>{if(!p.disposed){if(p.arrayPath){let j=t.findContext?t.findContext(e):null;if(j){let w=Ri(j,p.arrayPath);Array.isArray(w)&&(w!==m||w.length!==v)&&(m=w,v=w.length,Wi(p,w,t))}}y=setTimeout(x,100)}};y=setTimeout(x,100),Mi(e,()=>{p.disposed=!0,b&&(cancelAnimationFrame(b),b=null),y&&(clearTimeout(y),y=null),e.removeEventListener("scroll",h),e.removeEventListener("keydown",l),p.resizeObserver&&(p.resizeObserver.disconnect(),p.resizeObserver=null);for(let[j,w]of p.renderedNodes){if(w.__disposers){for(let L of w.__disposers)try{L()}catch{}w.__disposers=null}w.remove()}p.renderedNodes.clear(),p.spacerTop&&p.spacerTop.parentNode&&p.spacerTop.remove(),p.spacerBottom&&p.spacerBottom.parentNode&&p.spacerBottom.remove(),Pe.delete(e)})}})}function mo(t,e={}){fo(t)}function go(){so()}var ge=new Map,ft=new Map;function bo(){for(let[t,e]of ge){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}ge.clear(),ft.clear()}function ho(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function Gi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ui(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function Yi(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function Ki(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function Xi(){return document.documentElement}function Zi(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function vo(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function Pt(t){let e=ge.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let u of a)u.isIntersecting?n.add(u.target.id):n.delete(u.target.id);let d=null,g=1/0;for(let u of n){let f=document.getElementById(u);if(!f)continue;let p=f.getBoundingClientRect();p.top<g&&(g=p.top,d=u)}for(let u of e.spyEntries)vo(u.el);if(d){for(let u of e.spyEntries)if(u.targetId===d){Zi(u.el),e.activeEl=u.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let d=document.getElementById(a.targetId);d&&(c.observe(d),s.add(a.targetId))}e.observer=c}function Qi(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function yo(t){t.directive("spy",{priority:20,init(e,r,o){ho();let n=Ui(e);if(!n){e.tagName!=="A"&&Qi(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=Yi(e),c=Ki(e),s=Xi();ge.has(s)||ge.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=ge.get(s),d={el:e,targetId:n};a.spyEntries.push(d),ft.set(e,s),Pt(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{Pt(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),Gi(e,()=>{let g=a.spyEntries.indexOf(d);g!==-1&&a.spyEntries.splice(g,1),ft.delete(e),vo(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),ge.delete(s)):Pt(s)})}})}function xo(t,e={}){yo(t)}function Eo(){bo()}var Rt="it is a DOM element; client mechanics never send DOM nodes",_o={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:Rt},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:Rt},fixed:{list:null}},$el:{unavailable:Rt}}}};var Ji="[validate],[drag],[drop],[drag-list],[drag-multiple]";function wo(t){if(typeof document>"u")return;let e=document.querySelectorAll(Ji);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Ao=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],es=["validate","drag-list","drag-multiple",...Ao].filter(t=>!Kt.includes(t));function ts(t,e){bt(t,e);for(let r of es)t.directive(r,{priority:30,init(o,n){n.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}var rs={name:"nojs-elements",contract:{directives:{..._o}},install(t,e={}){if(de(t)){ts(t,e);return}bt(t,e),ir(t,e),pr(t,e),br(t,e),Lr(t,e),Hr(t,e),Fr(t,e),Kr(t,e),dn(t,e),hn(t,e),_n(t,e),Cn(t,e),Vn(t,e),Xn(t,e),oo(t,e),mo(t,e),xo(t,e),wo(t)},init(t){if(de(t)||(wo(t),typeof document>"u"||!document.body))return;let e=Ao.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Xt(),sr(),fr(),hr(),kr(),$r(),Or(),Xr(),ln(),vn(),Sn(),Nn(),Zn(),io(),go(),Eo()}},zt=rs;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(zt),t=!0,!0):!1};window.NoJSElements=zt;let t=!1;if(!e()){let r=0,o=100,n=setInterval(()=>{(e()||++r>=o)&&clearInterval(n)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(n)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
