/**
 * NoJS Elements v1.22.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
var ht=Object.defineProperty;var Lo=Object.getOwnPropertyDescriptor;var ko=Object.getOwnPropertyNames;var Co=Object.prototype.hasOwnProperty;var So=(t,e)=>{for(var r in e)ht(t,r,{get:e[r],enumerable:!0})},Do=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ko(e))!Co.call(t,n)&&n!==r&&ht(t,n,{get:()=>e[n],enumerable:!(o=Lo(e,n))||o.enumerable});return t};var To=t=>Do(ht({},"__esModule",{value:!0}),t);var fs={};So(fs,{default:()=>ps});module.exports=To(fs);var _={dragging:null,selected:new Map,placeholder:null},Ye=new Map;function Ot(){_.dragging=null,_.selected.clear(),_.placeholder&&(_.placeholder.remove(),_.placeholder=null),Ye.clear()}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function ze(t,e){t.__nojsElBoundCtx=e}function de(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Ze(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function le(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ke(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ke(r):e++}return e}function Xe(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function Nt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",_.dragging&&_.dragging.sourceEl){let s=(_.dragging.sourceEl.firstElementChild||_.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),_.placeholder=n}function re(){_.placeholder&&(_.placeholder.remove(),_.placeholder=null)}function xe(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function Io(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let g=a-1;g>=0;g--){let u=document.createElement("div"),f=g*4;if(u.style.cssText="position:absolute;top:"+f+"px;left:"+f+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",g===0){let p=o.cloneNode(!0);for(;p.firstChild;)u.appendChild(p.firstChild);u.style.background=s.backgroundColor||"#fff",u.style.border=s.border,u.style.padding=s.padding,u.style.fontSize=s.fontSize,u.style.color=s.color,u.style.fontFamily=s.fontFamily}else u.style.background=s.backgroundColor||"#fff",u.style.border=s.border||"1px solid #ddd";r.appendChild(u)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var oe=null;function Bo(){return oe&&oe.isConnected?oe:typeof document>"u"||!document.body?null:(oe=document.createElement("div"),oe.setAttribute("aria-live","assertive"),oe.setAttribute("aria-atomic","true"),oe.setAttribute("role","status"),oe.className="nojs-dnd-live-region",oe.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(oe),oe)}function ce(t){let e=Bo();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Gt(t){if(de(t)){t.directive("drag",{priority:15,init(e,r){ke(),Vt(e,$o(e,r))}});return}Ze(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){ke(),Vt(e,Ho(t,e,o))}})}function Ho(t,e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drag-disabled");return{ctx:o,value:()=>t.evaluate(r,o),disabled:()=>n?t.evaluate(n,o):!1,watchDisabled:i=>le(e,o.$watch(i)),onDispose:i=>le(e,i)}}function $o(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function Vt(t,e){let r=t.getAttribute("drag-type")||"default",o=t.getAttribute("drag-effect")||"move",n=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),c=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),a=t.getAttribute("drag-class")||"nojs-dragging",d=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let g=!0;if(n){let l=b=>{g=!!b.target.closest(n)};t.addEventListener("mousedown",l),e.onDispose(()=>t.removeEventListener("mousedown",l))}let u=l=>{if(n&&!g){l.preventDefault();return}if(s&&e.disabled()){l.preventDefault();return}let b=e.value(),h=t.getAttribute("drag-group"),m=b;if(h&&_.selected.has(h)){let y=_.selected.get(h);y.size>0&&[...y].some(j=>j.el===t)&&(m=[...y].map(j=>j.item))}if(_.dragging={item:m,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},l.dataTransfer){if(l.dataTransfer.effectAllowed=o,l.dataTransfer.setData("text/plain",""),Array.isArray(m)&&m.length>1&&l.dataTransfer.setDragImage){let y=Io(t,m.length);document.body.appendChild(y);let x=t.getBoundingClientRect();l.dataTransfer.setDragImage(y,x.width/2,x.height/2),requestAnimationFrame(()=>y.remove())}else if(i&&l.dataTransfer.setDragImage)if(i==="none"){let y=document.createElement("div");y.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(y);let[x,j]=c.split(",").map(Number);l.dataTransfer.setDragImage(y,x||0,j||0),requestAnimationFrame(()=>y.remove())}else{let y=t.querySelector(i);if(y){let[x,j]=c.split(",").map(Number);d&&y.classList.add(d),l.dataTransfer.setDragImage(y,x||0,j||0)}}}if(a.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),Array.isArray(m)&&h&&_.selected.has(h))for(let y of _.selected.get(h))y.el!==t&&a.split(/\s+/).filter(Boolean).forEach(x=>y.el.classList.add(x));let v=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${v}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:m,index:_.dragging.sourceIndex,el:t}}))},f=()=>{a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b));let l=t.getAttribute("drag-group");if(l&&_.selected.has(l))for(let b of _.selected.get(l))a.split(/\s+/).filter(Boolean).forEach(h=>b.el.classList.remove(h));if(d&&i&&i!=="none"){let b=t.querySelector(i);b&&b.classList.remove(d)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:_.dragging?.item,index:_.dragging?.sourceIndex,dropped:_.dragging===null}})),_.dragging=null,re()};if(t.addEventListener("dragstart",u),t.addEventListener("dragend",f),e.onDispose(()=>{t.removeEventListener("dragstart",u),t.removeEventListener("dragend",f)}),s){let l=function(){let b=!!e.disabled();t.draggable=!b,b?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(l)}let p=l=>{if(_.dragging&&!_.dragging.sourceEl.isConnected&&(_.dragging=null),l.key===" "&&!_.dragging){l.preventDefault();let b=e.value();_.dragging={item:b,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},a.split(/\s+/).filter(Boolean).forEach(m=>t.classList.add(m));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:t}}))}else l.key==="Escape"&&_.dragging&&_.dragging.sourceEl===t&&(l.preventDefault(),a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),ce("Drag cancelled."),_.dragging=null,re())};t.addEventListener("keydown",p),e.onDispose(()=>t.removeEventListener("keydown",p))}function Ut(t){if(de(t)){t.directive("drop",{priority:15,init(e,r){ke(),Wt(e,Mo(e,r)),Po(e,r)}});return}Ze(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){ke(),Wt(e,qo(t,e,o))}})}function qo(t,e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>n?t.evaluate(n,o):!1,max:()=>i?t.evaluate(i,o):void 0,run(c){let s=X(t,"execStatement");typeof s=="function"?s(r,o,c):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:c=>le(e,c)}}function Mo(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function Po(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",o=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),o.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),_.placeholder&&t.contains(_.placeholder)&&re()})}function Wt(t,e){let r=t.getAttribute("drop-accept")||"default",o=t.getAttribute("drop-effect")||"move",n=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",c=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),a=t.getAttribute("drop-sort"),d=t.getAttribute("drop-placeholder"),g=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",o);let u=0,f=m=>{if(!_.dragging||c&&e.disabled())return;let v=xe(_.dragging.type,r),y=!0;if(s){let x=e.max(),j=Ke(t);typeof x=="number"&&j>=x&&(y=!1)}if(!v||!y){i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),n.split(/\s+/).filter(Boolean).forEach(x=>t.classList.remove(x)),re();return}if(i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.remove(x)),m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect=o),a){let x=Xe(t,m.clientX,m.clientY,a);d&&Nt(t,x,d,g),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:_.dragging.item,index:x}}))}},p=m=>{if(_.dragging&&!(c&&e.disabled())&&(u++,u===1)){let v=xe(_.dragging.type,r),y=!0;if(s){let x=e.max(),j=Ke(t);typeof x=="number"&&j>=x&&(y=!1)}v&&y?(n.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x))}},l=m=>{_.dragging&&(u--,u<=0&&(u=0,n.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),i.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),re(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging.item}}))))},b=m=>{if(m.preventDefault(),m.stopPropagation(),u=0,!_.dragging||c&&e.disabled()||!xe(_.dragging.type,r))return;if(s){let L=e.max(),w=Ke(t);if(typeof L=="number"&&w>=L)return}let v=_.dragging.item,y=_.dragging.type,x=_.dragging.effect,j=0;a&&(j=Xe(t,m.clientX,m.clientY,a)),n.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),i.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),re();let E={$drag:v,$dragType:y,$dragEffect:x,$dropIndex:j,$source:{list:_.dragging.sourceList,index:_.dragging.sourceIndex,el:_.dragging.sourceEl},$target:{list:null,index:j,el:t},$el:t};e.run(E),_.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:v,index:j,source:E.$source,target:E.$target,effect:x}}))},h=m=>{_.dragging&&(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),b(m))};t.addEventListener("dragover",f),t.addEventListener("dragenter",p),t.addEventListener("dragleave",l),t.addEventListener("drop",b),t.addEventListener("keydown",h),e.onDispose(()=>{t.removeEventListener("dragover",f),t.removeEventListener("dragenter",p),t.removeEventListener("dragleave",l),t.removeEventListener("drop",b),t.removeEventListener("keydown",h)})}function Yt(t){Ze(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){ke();let n=t.findContext(e);ze(e,n);let i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,g=e.getAttribute("drop-accept")||d,u=e.hasAttribute("drag-list-copy"),f=e.hasAttribute("drag-list-remove"),p=e.getAttribute("drag-disabled"),l=e.getAttribute("drop-disabled"),b=e.getAttribute("drop-max"),h=e.getAttribute("drop-placeholder"),m=e.getAttribute("drop-placeholder-class"),v=e.getAttribute("drag-class")||"nojs-dragging",y=e.getAttribute("drop-class")||"nojs-drag-over",x=e.getAttribute("drop-reject-class")||"nojs-drop-reject",j=e.getAttribute("drop-settle-class")||"nojs-drop-settle",E=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",u?"copy":"move");let L={listPath:o,ctx:n,el:e};Ye.set(e,L),le(e,()=>Ye.delete(e));let w=0,A=null;function C(){let S=t.resolve(o,n);if(!Array.isArray(S))return;if(S===A&&S.length>0&&e.children.length>0){for(let F of e.children)F.__ctx&&F.__ctx.$notify&&F.__ctx.$notify();return}A=S;let $=i?document.getElementById(i):null;if(!$)return;let P=X(t,"disposeChildren");typeof P=="function"&&P(e),e.innerHTML="";let R=S.length;S.forEach((F,K)=>{let ee={[s]:F,$index:K,$count:R,$first:K===0,$last:K===R-1,$even:K%2===0,$odd:K%2!==0},te=t.createContext(ee,n),he=$.content.cloneNode(!0),B=document.createElement("div");B.style.display="contents",B.__ctx=te,B.appendChild(he),e.appendChild(B);let z=B.firstElementChild||B;z.draggable=!0,z.setAttribute("role","option"),z.setAttribute("aria-roledescription","draggable item"),z.getAttribute("tabindex")||z.setAttribute("tabindex","0");let ae=W=>{if(p&&t.evaluate(p,n)){W.preventDefault();return}_.dragging={item:F,type:d,effect:u?"copy":"move",sourceEl:B,sourceCtx:te,sourceList:S,sourceIndex:K,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:u,removeMode:f}},W.dataTransfer&&(W.dataTransfer.effectAllowed=u?"copy":"move",W.dataTransfer.setData("text/plain","")),v.split(/\s+/).filter(Boolean).forEach(ye=>z.classList.add(ye));let Z=z.getAttribute("aria-label")||z.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${Z}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:F,index:K,el:z}}))},ve=()=>{v.split(/\s+/).filter(Boolean).forEach(W=>z.classList.remove(W)),_.dragging&&_.dragging.sourceEl===B&&(_.dragging=null),re()};B.addEventListener("dragstart",ae),B.addEventListener("dragend",ve);let Ue=W=>{if(W.key===" "&&!_.dragging){W.preventDefault(),W.stopPropagation(),_.dragging={item:F,type:d,effect:u?"copy":"move",sourceEl:B,sourceCtx:te,sourceList:S,sourceIndex:K,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:u,removeMode:f}},v.split(/\s+/).filter(Boolean).forEach(ye=>z.classList.add(ye));let Z=z.getAttribute("aria-label")||z.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${Z}. Use arrow keys to reorder.`)}else if(W.key==="Escape"&&_.dragging){W.preventDefault(),W.stopPropagation();let Z=e.querySelector(`.${v.split(/\s+/)[0]}`)||z;v.split(/\s+/).filter(Boolean).forEach(ye=>Z.classList.remove(ye)),ce("Reorder cancelled."),_.dragging=null,re()}else if((W.key==="ArrowDown"||W.key==="ArrowRight")&&_.dragging&&_.dragging.sourceEl===B){W.preventDefault();let Z=B.nextElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Re=[...e.children].filter(bt=>!bt.classList.contains("nojs-drop-placeholder")),gt=Re.indexOf(Z)+1;ce(`Moved to position ${gt} of ${Re.length}.`)}}else if((W.key==="ArrowUp"||W.key==="ArrowLeft")&&_.dragging&&_.dragging.sourceEl===B){W.preventDefault();let Z=B.previousElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Re=[...e.children].filter(bt=>!bt.classList.contains("nojs-drop-placeholder")),gt=Re.indexOf(Z)+1;ce(`Moved to position ${gt} of ${Re.length}.`)}}};B.addEventListener("keydown",Ue),B.__disposers=B.__disposers||[],B.__disposers.push(()=>B.removeEventListener("dragstart",ae),()=>B.removeEventListener("dragend",ve),()=>B.removeEventListener("keydown",Ue)),t.processTree(B)});let M=S.length===0;E.split(/\s+/).filter(Boolean).forEach(F=>e.classList.toggle(F,M))}let D=S=>{if(!_.dragging||l&&t.evaluate(l,n))return;let $=xe(_.dragging.type,g),P=!0;if(b){let M=t.evaluate(b,n),F=t.resolve(o,n);typeof M=="number"&&Array.isArray(F)&&F.length>=M&&(P=!1)}if(!$||!P){x.split(/\s+/).filter(Boolean).forEach(M=>e.classList.add(M)),y.split(/\s+/).filter(Boolean).forEach(M=>e.classList.remove(M)),re();return}x.split(/\s+/).filter(Boolean).forEach(M=>e.classList.remove(M)),S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect=u?"copy":"move");let R=Xe(e,S.clientX,S.clientY,a);h&&Nt(e,R,h,m)},H=S=>{if(_.dragging&&!(l&&t.evaluate(l,n))&&(w++,w===1)){let $=xe(_.dragging.type,g),P=!0;if(b){let R=t.evaluate(b,n),M=t.resolve(o,n);typeof R=="number"&&Array.isArray(M)&&M.length>=R&&(P=!1)}$&&P?(y.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):x.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R))}},k=()=>{_.dragging&&(w--,w<=0&&(w=0,y.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),x.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),re(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging?.item}}))))},U=S=>{if(S.preventDefault(),S.stopPropagation(),w=0,!_.dragging||l&&t.evaluate(l,n)||!xe(_.dragging.type,g))return;if(b){let B=t.evaluate(b,n),z=t.resolve(o,n);if(typeof B=="number"&&Array.isArray(z)&&z.length>=B)return}let $=_.dragging.item,P=_.dragging.listDirective,R=_.dragging.sourceIndex,M=Xe(e,S.clientX,S.clientY,a);y.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),x.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),re();let F=t.resolve(o,n);if(!Array.isArray(F))return;let K=P&&P.el===e;if(K&&R===M){_.dragging=null;return}if(K&&R+1===M){_.dragging=null;return}let ee=[...F];if(K){let[B]=ee.splice(R,1),z=R<M?M-1:M;ee.splice(z,0,B),n.$set(o,ee),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:ee,item:$,from:R,to:z}}))}else{let B=u&&typeof $=="object"?{...$}:$;if(ee.splice(M,0,B),n.$set(o,ee),P&&!P.copyMode&&(f||P.removeMode)){let z=t.resolve(P.listPath,P.ctx);if(Array.isArray(z)&&R!=null){let ae=z.filter((ve,Ue)=>Ue!==R);P.ctx.$set(P.listPath,ae),P.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ae,item:$,index:R}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:ee,item:$,from:R,fromList:P?t.resolve(P.listPath,P.ctx):null}}))}let te=_.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||_.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",he=K&&R<M?M:M+1;ce(`Dropped ${te} at position ${he}.`),requestAnimationFrame(()=>{let z=[...e.children][K&&R<M?M-1:M];if(z){let ae=z.firstElementChild||z;j.split(/\s+/).filter(Boolean).forEach(ve=>ae.classList.add(ve)),ae.addEventListener("animationend",()=>{j.split(/\s+/).filter(Boolean).forEach(ve=>ae.classList.remove(ve))},{once:!0})}}),_.dragging=null},V=S=>{if(_.dragging&&xe(_.dragging.type,g)&&(S.key==="Enter"||S.key===" ")){S.preventDefault();let $=e.querySelector(":focus");if($){let R=($.style?.display==="contents"&&$.firstElementChild||$).getBoundingClientRect(),M={preventDefault(){},stopPropagation(){},clientX:R.left+R.width/2,clientY:R.top+R.height+1,dataTransfer:null};U(M)}}};e.addEventListener("dragover",D),e.addEventListener("dragenter",H),e.addEventListener("dragleave",k),e.addEventListener("drop",U),e.addEventListener("keydown",V),le(e,()=>{e.removeEventListener("dragover",D),e.removeEventListener("dragenter",H),e.removeEventListener("dragleave",k),e.removeEventListener("drop",U),e.removeEventListener("keydown",V)});let be=n.$watch(C);le(e,be),C()}})}function Kt(t){Ze(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}_.selected.has(n)||_.selected.set(n,new Set);let c=_.selected.get(n),s=d=>{let g=e.getAttribute("drag"),f={item:g?t.evaluate(g,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let p=[...c].find(l=>l.el===e);p?(c.delete(p),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.remove(l))):(c.add(f),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l)))}else{for(let p of c)i.split(/\s+/).filter(Boolean).forEach(l=>p.el.classList.remove(l));c.clear(),c.add(f),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p))}};e.addEventListener("click",s),le(e,()=>{e.removeEventListener("click",s);let d=[...c].find(g=>g.el===e);d&&c.delete(d)});let a=d=>{if(d.key==="Escape"){for(let g of c)i.split(/\s+/).filter(Boolean).forEach(u=>g.el.classList.remove(u));c.clear()}};window.addEventListener("keydown",a),le(e,()=>window.removeEventListener("keydown",a))}})}var Xt=["drag","drop"];function vt(t,e={}){Gt(t),Ut(t),!de(t)&&(Yt(t),Kt(t))}function Zt(){Ot()}var Qt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],yt=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ue(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ee,nr,Je,et,xt,Jt,Qe,_t,er,Et;function Ro(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function zo(t){return(t.getAttribute("type")||"text").toLowerCase()}function Fo(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(s=>s.trim());for(let s of c){let[a,...d]=s.split(":"),g=Ee[a];if(g){let u=g(t.value,...d,e);u!==!0&&u&&(r.push({rule:a,message:u}),o.add(a))}else{let u=t.value,f=null;switch(a){case"required":(u==null||String(u).trim()==="")&&(f="Required");break;case"email":u&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)&&(f="Invalid email");break;case"url":try{new URL(u)}catch{f="Invalid URL"}break;case"min":Number(u)<Number(d[0])&&(f=`Minimum value is ${d[0]}`);break;case"max":Number(u)>Number(d[0])&&(f=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&Ee[d[0]]){let p=Ee[d[0]](u,e);p!==!0&&p&&(f=p)}break}f&&(r.push({rule:a,message:f}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[c,s]of Qt)if(i[c]){let a=s||zo(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function Oo(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Vo(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=yt.indexOf(n.rule),s=yt.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:Oo(e,o.rule,o.message)}}function or(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Wo(t,e,r,o,n){let i=or(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;_t(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.setAttribute("aria-live","polite"),a.__errorTemplateFor=o;let d=Je({$error:e,$rule:r},n);a.__ctx=d,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Ro(a),xt(a)}function tr(t){let e=or(t);e&&(_t(e),e.remove())}function No(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!nr(r,e)}catch{return!0}}function rr(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function Go(t){return t.hasAttribute("model")?t.tagName==="SELECT"||t.type==="checkbox"||t.type==="radio"?"change":"input":null}function Uo(t,e){return()=>{let r=t.getAttribute("model"),o=t.__gatedDirs&&t.__gatedDirs.some(n=>n.name==="model");if(r&&!o&&Et&&(t.type!=="radio"||t.checked)){let n=t.type==="checkbox"?t.checked:t.value;Et(`${r} = __val`,et(t),{__val:n})}e()}}function Yo(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),s=Ee[i];if(s){let a=s(t,...c,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&Ee[c[0]]){let a=Ee[c[0]](t,r);if(a!==!0&&a)return a}break}}return null}function Ko(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return et(t);let e=Je({},null);return t.__ctx=e,e}function ir(t){Ee=X(t,"validators")||{},nr=t.evaluate,Je=t.createContext,et=t.findContext,xt=t.processTree,Jt=X(t,"cloneTemplate")||(()=>null),Qe=X(t,"disposeChildren")||(()=>{}),_t=X(t,"disposeTree")||Qe,er=X(t,"warn")||console.warn,Et=X(t,"execStatement");let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):er('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let f=function(){c&&typeof c.$notify=="function"&&c.$notify();let E=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;E.nextNode();){let w=E.currentNode.__ctx;w&&w!==c&&typeof w.$notify=="function"&&w.$notify()}},p=function(){return r.querySelectorAll("input, textarea, select")},l=function(){let E={},L={},w={},A=!0,C=null,D=0,H=!1;for(let k of p())k.name&&(k.type==="checkbox"?L[k.name]=k.checked:k.type==="radio"?k.checked?L[k.name]=k.value:k.name in L||(L[k.name]=""):L[k.name]=k.value);for(let k of p()){if(!k.name)continue;let U=a.has(k.name),V=d.has(k.name);if(!No(k,c)){w[k.name]={valid:!0,dirty:V,touched:U,error:null,value:L[k.name]};continue}let be=Fo(k,L),S=Vo(be,k),$=!S,P=rr(k,r),R=P.includes("input"),M=P.includes("blur")||P.includes("focusout")||P.includes("submit"),F;!k.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?F=U||V:F=R&&V||M&&U,$||(A=!1),!$&&F&&(E[k.name]=S.message,D++,C||(C=S.message)),w[k.name]={valid:$,dirty:V,touched:U,error:S?S.message:null,value:L[k.name]},!$&&F?k.setAttribute("aria-invalid","true"):k.removeAttribute("aria-invalid");let K=k.getAttribute("error-class")||s;if(K){let te=K.split(/\s+/);!$&&F?k.classList.add(...te):k.classList.remove(...te)}if(S&&F){let te=k.getAttribute(`error-${S.rule}`),he=k.getAttribute("error"),B=(te&&te.startsWith("#")?te:null)||(he&&he.startsWith("#")?he:null);B?Wo(B,S.message,S.rule,k,c):tr(k)}else tr(k);let ee=k.getAttribute("as");ee&&c.$set(ee,w[k.name])}g.size>0&&(H=!0),u.valid=A,u.errors=E,u.values=L,u.fields=w,u.firstError=C,u.errorCount=D,u.pending=H,c.$set("$form",{...u}),f(),b(r)},b=function(E){let L=u.valid&&!u.pending&&!u.submitting,w=E.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let A of w){if(A.hasAttribute("disabled")&&A.getAttribute("disabled")!==""){let C=A.getAttribute("disabled");if(C!=="disabled"&&C!=="true"&&C!=="false")continue}A.disabled=!L,A.__autoDisabled=!0}},m=function(E,L,w){E.addEventListener(L,w),ue(r,()=>E.removeEventListener(L,w))},v=function(E){if(!E.name)return;let L=rr(E,r),w=Go(E),A=H=>{if(w==="change"){m(E,"input",Uo(E,H));return}m(E,"input",H),w&&h.push([E,"input",H])},C=()=>{d.add(E.name),u.dirty=!0,l()},D=()=>{a.add(E.name),u.touched=!0,l()};L.includes("input")?A(C):A(()=>{d.add(E.name),u.dirty=!0,l()}),L.includes("blur")||L.includes("focusout")?m(E,"focusout",()=>{D(),L.includes("blur")&&C()}):m(E,"focusout",D),L.includes("submit")&&m(E,"focusout",D)},c=Ko(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,d=new Set,g=new Map,u={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u.dirty=!1,u.touched=!1,u.pending=!1,u.submitting=!1,a.clear(),d.clear(),r.reset(),l()},endSubmit:()=>{u.submitting=!1,l()}};c.$set("$form",u);let h=[],y=r.hasAttribute("validate-on"),x=[...p()].some(E=>E.hasAttribute("validate-on"));if(!y&&!x){let E=w=>{let A=w.target;A&&A.name&&d.add(A.name),u.dirty=!0,l()};r.addEventListener("input",E),ue(r,()=>r.removeEventListener("input",E)),r.addEventListener("change",E),ue(r,()=>r.removeEventListener("change",E));let L=w=>{w.target&&w.target.name&&a.add(w.target.name),u.touched=!0,l()};r.addEventListener("focusout",L),ue(r,()=>r.removeEventListener("focusout",L))}else{for(let E of p())v(E);if(h.length){let E=!1;ue(r,()=>{E=!0}),queueMicrotask(()=>{if(!E){for(let[L,w,A]of h)L.removeEventListener(w,A),L.addEventListener(w,A);h.length=0}})}}let j=E=>{for(let L of p())L.name&&a.add(L.name);if(u.touched=!0,l(),!u.valid||u.pending){E.preventDefault(),E.stopImmediatePropagation();return}u.submitting=!0,b(r),c.$set("$form",{...u}),f()};r.addEventListener("submit",j,!0),ue(r,()=>r.removeEventListener("submit",j,!0)),r.__nojsResetSubmitting=()=>{u.submitting=!1,l()},ue(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(l);return}let i=et(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),s=()=>{let a=Yo(r.value,n,{});if(a?r.setAttribute("aria-invalid","true"):r.removeAttribute("aria-invalid"),a&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let g=Jt(c);if(g){let u=Je({err:{message:a}},i);Qe(d),d.innerHTML="",d.__ctx=u,d.appendChild(g),xt(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(Qe(d),d.innerHTML="")}};r.addEventListener("input",s),ue(r,()=>r.removeEventListener("input",s))}}})}function sr(t,e={}){ir(t)}function ar(){}var Ce=new Map,J=new Map;function cr(){let t=Array.from(Ce.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of J.values())clearTimeout(e);J.clear();for(let e of Ce.values())e.remove();Ce.clear()}function dr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Xo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var tt=8;function ur(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+tt,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-tt;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+tt;break;default:s=o.top-n.height-tt,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Zo=0;function Qo(t,e,r){document.body.appendChild(e),ur(e,t,r),e.setAttribute("aria-hidden","false")}function lr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Jo(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function pr(t){t.directive("tooltip",{priority:20,init(e,r,o){dr();let n=o;if(!n){Jo(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),d=a?t.findContext(e):null,g=()=>{if(!a||!d)return!1;try{return!!t.evaluate(a,d)}catch{return!1}},u=`nojs-tooltip-${++Zo}`,f=document.createElement("div");f.className="nojs-tooltip",f.setAttribute("role","tooltip"),f.setAttribute("id",u),f.setAttribute("aria-hidden","true"),f.textContent=n,e.setAttribute("aria-describedby",u),Ce.set(e,f);let p=!1,l=0,b=()=>{!p||!e.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!p||!e.isConnected)&&ur(f,e,i)}))},h=()=>{window.addEventListener("scroll",b,!0),window.addEventListener("resize",b)},m=()=>{window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),l&&(cancelAnimationFrame(l),l=0)},v=()=>{p||(Qo(e,f,i),p=!0,h())},y=()=>{if(!p){lr(e,f);return}m(),lr(e,f),p=!1},x=()=>{if(g())return;J.has(e)&&clearTimeout(J.get(e));let H=setTimeout(()=>{J.delete(e),!g()&&e.isConnected&&v()},s);J.set(e,H)},j=()=>{J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),y()},E=()=>x(),L=()=>j(),w=()=>x(),A=()=>j(),C=H=>{H.key==="Escape"&&f.getAttribute("aria-hidden")==="false"&&j()};e.addEventListener("mouseenter",E),e.addEventListener("mouseleave",L),e.addEventListener("focusin",w),e.addEventListener("focusout",A),e.addEventListener("keydown",C);let D=null;if(a&&d&&typeof d.$watch=="function"){let H=()=>{p&&g()&&y()};D=d.$watch(H)}Xo(e,()=>{e.removeEventListener("mouseenter",E),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",w),e.removeEventListener("focusout",A),e.removeEventListener("keydown",C),D&&(D(),D=null),m(),J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),p=!1,f.remove(),Ce.delete(e)})}})}function fr(t,e={}){pr(t)}function mr(){cr()}var Y=new Map;function gr(){Y.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function At(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Se(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function jt(t){try{return t.matches(":popover-open")}catch{return!1}}var pe=8;function nt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-pe,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-pe;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+pe;break;default:s=o.bottom+pe,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-pe),r==="top"&&s<0&&(s=o.bottom+pe),r==="right"&&a+n.width>i&&(a=o.left-n.width-pe),r==="left"&&a<0&&(a=o.right+pe),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function wt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(!jt(c)){i();return}nt(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function _e(t){t&&t._untrack&&t._untrack()}function br(t){t.directive("popover",{priority:20,init(r,o,n){rt();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=Y.get(i);a.popoverEl=r,a.position=c}let s=a=>{let d=Y.get(i);if(!d)return;let g=a.newState==="open";d.open=g;for(let u of d.triggerEls)u.setAttribute("aria-expanded",String(g));g||(r.style.visibility="",_e(d))};r.addEventListener("toggle",s),At(r,()=>{r.removeEventListener("toggle",s);let a=Y.get(i);a&&(_e(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){rt();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,d=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let c=a=>{let d=Y.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(Se(d.popoverEl)){d.popoverEl.style.visibility="hidden";try{d.popoverEl.togglePopover(),jt(d.popoverEl)?(nt(d.popoverEl,r,d.position),wt(d,r)):_e(d)}finally{d.popoverEl.style.visibility=""}}};r.addEventListener("click",c);let s=a=>{let d=Y.get(i);a.key==="Escape"&&d?.open&&(Se(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),_e(d),r.focus())};document.addEventListener("keydown",s),At(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=Y.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(_e(a),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){rt();let o=()=>{let n=r.closest(".nojs-popover");!n||!Se(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),At(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl,"showPopover"))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.showPopover();let i=o||[...n.triggerEls][0];i&&(nt(n.popoverEl,i,n.position),wt(n,i))}catch{return!1}finally{n.popoverEl.style.visibility=""}return!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!Se(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return _e(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];i&&jt(n.popoverEl)?(nt(n.popoverEl,i,n.position),wt(n,i)):_e(n)}finally{n.popoverEl.style.visibility=""}return!0},t.popover=e}function hr(t,e={}){br(t)}function vr(){gr()}var N=[],ie=new Map,ei=1e4;function yr(){return ei+N.length}function xr(){N.length=0,ie.clear()}function De(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function ti(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var _r='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',Lt=new WeakMap;function ri(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(_r)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),Lt.set(t,e)}function Er(t){let e=Lt.get(t);e&&(t.removeEventListener("keydown",e),Lt.delete(t))}var Fe=new WeakMap;function Ar(t){t.directive("modal",{priority:10,init(r,o,n){De();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),g=f=>{f.target===r&&s!=="false"&&d!=="false"&&Te(r,i)};r.addEventListener("click",g),ie.set(i,r);let u=f=>{if(f.newState==="open"){if(r.style.zIndex=String(yr()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{if(!r.isConnected||!N.some(l=>l.el===r))return;let p=r.querySelector(_r);p?p.focus():r.focus()}),ri(r),d!=="false"){let p=l=>{l.key==="Escape"&&(l.stopPropagation(),Te(r,i))};r.addEventListener("keydown",p),Fe.set(r,p)}}else if(f.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(b=>r.classList.remove(b)),Er(r);let p=Fe.get(r);p&&(r.removeEventListener("keydown",p),Fe.delete(r));let l=N.findIndex(b=>b.el===r);if(l===-1&&(l=N.findIndex(b=>b.id===i)),l!==-1){let b=N[l];N.splice(l,1),b.triggerEl&&requestAnimationFrame(()=>{b.triggerEl.focus()})}}};r.addEventListener("toggle",u),ti(r,()=>{r.removeEventListener("click",g),r.removeEventListener("toggle",u),Er(r);let f=Fe.get(r);f&&(r.removeEventListener("keydown",f),Fe.delete(r)),ie.delete(i);let p=N.findIndex(l=>l.el===r);p===-1&&(p=N.findIndex(l=>l.id===i)),p!==-1&&N.splice(p,1)})}});let e=r=>e.open(r);e.open=r=>{let o=ie.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return N.some(n=>n.id===r)||N.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=ie.get(r);return o?(Te(o,r),!0):!1},e.closeAll=()=>{for(let r=N.length-1;r>=0;r--)Te(N[r].el,N[r].id)},t.modal=e}function Te(t,e){try{t.hidePopover()}catch{}}function wr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ni(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function jr(t){t.directive("modal-open",{priority:10,init(e,r,o){De();let n=o;if(!n){let u=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(u&&(n=u.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let g=ie.get(n)||ni(n);if(!g){console.warn(`[modal-open] modal "${n}" not found`);return}let u=N.some(f=>f.id===n);g.id&&e.setAttribute("aria-controls",g.id);try{g.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}u||N.push({id:n,el:g,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,d=()=>{let g=ie.get(n);return g?(a=g,s=u=>{u.newState==="closed"&&e.setAttribute("aria-expanded","false")},g.addEventListener("toggle",s),!0):!1};if(!d()){let g=requestAnimationFrame(d);wr(e,()=>cancelAnimationFrame(g))}e.addEventListener("click",i),wr(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function oi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Lr(t){t.directive("modal-close",{priority:10,init(e,r,o){De();let n=()=>{let i,c;if(o){if(c=o,i=ie.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Te(i,c)};e.addEventListener("click",n),oi(e,()=>{e.removeEventListener("click",n)})}})}function kr(t,e={}){Ar(t),jr(t),Lr(t)}function Cr(){xr()}var ne={openMenus:new Map},O={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function Sr(){ne.openMenus.clear(),O.installed=!1,O.instanceCount=0,O.outsideClickHandler=null,O.escHandler=null}function Ie(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var ii=0;function si(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ai(){O.installed||(O.outsideClickHandler=t=>{let e=[...ne.openMenus.entries()];for(let[r,{toggle:o,wrapper:n}]of e)if(!n.contains(t.target)){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}ne.openMenus.delete(r)}},O.escHandler=t=>{if(t.key!=="Escape")return;let e=[...ne.openMenus.entries()];for(let[r,{toggle:o}]of e){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}o.focus()}ne.openMenus.clear()},document.addEventListener("click",O.outsideClickHandler,!0),document.addEventListener("keydown",O.escHandler),O.installed=!0)}function Ct(){O.installed&&(document.removeEventListener("click",O.outsideClickHandler,!0),document.removeEventListener("keydown",O.escHandler),O.outsideClickHandler=null,O.escHandler=null,O.installed=!1)}function Dr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,d,g;switch(o){case"top":d=i.top-c.height,g=i.left;break;case"left":d=i.top,g=i.left-c.width;break;case"right":d=i.top,g=i.right;break;default:d=i.bottom,g=i.left}o==="bottom"||o==="top"?n==="end"&&(g=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>s&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=s&&(d=i.bottom),g<4&&(g=4),g+c.width>a-4&&(g=a-c.width-4),t.style.top=`${d}px`,t.style.left=`${g}px`}function St(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function kt(t){let e=St(t);e.length&&e[0].focus()}function Tr(t){let e=St(t);e.length&&e[e.length-1].focus()}function Ir(t){t.directive("dropdown",{priority:15,init(r){Ie()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ie();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${ii++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Dr(n,r,o),ne.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ne.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let g=b=>{b.newState==="closed"&&d()&&a()};n.addEventListener("toggle",g);let u=b=>{b.preventDefault(),b.stopPropagation(),d()?a():s()};r.addEventListener("click",u),O.instanceCount++,ai();let f=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),kt(n);break;case"ArrowDown":b.preventDefault(),s(),kt(n);break;case"ArrowUp":b.preventDefault(),s(),Tr(n);break}};r.addEventListener("keydown",f);let p=b=>{if(!(!d()||St(n).find(v=>v===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),kt(n);break;case"ArrowUp":b.preventDefault(),Tr(n);break}};n.addEventListener("keydown",p);let l=()=>{d()&&Dr(n,r,o)};window.addEventListener("scroll",l,!0),window.addEventListener("resize",l),si(r,()=>{r.removeEventListener("click",u),r.removeEventListener("keydown",f),n.removeEventListener("keydown",p),n.removeEventListener("toggle",g),window.removeEventListener("scroll",l,!0),window.removeEventListener("resize",l),ne.openMenus.delete(n),O.instanceCount--,O.instanceCount<=0&&(O.instanceCount=0,Ct())})}}),t.directive("dropdown-menu",{priority:15,init(r){Ie(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function Br(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ci(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Dt(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ne.openMenus.has(t)&&ne.openMenus.delete(t)}function Hr(t){t.directive("dropdown-item",{priority:15,init(e){Ie();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=ci(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),Dt(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{Dt(r,o);break}}};e.addEventListener("keydown",n),Br(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(Dt(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),Br(e,()=>e.removeEventListener("click",i))}})}function $r(t,e={}){Ir(t),Hr(t)}function qr(){Ct(),Sr()}var se=new Map,Be=new Set,Mr=0;function Pr(){return++Mr}function Rr(){for(let t of Be)clearTimeout(t);Be.clear();for(let t of se.values())t.remove();se.clear(),Mr=0}function zr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Tt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var di=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function It(){return se.size>0?se.values().next().value:li("top-right")}function li(t){if(se.has(t))return se.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),se.set(t,e),e}function ui(t){return t.startsWith("top")}function Bt(t,e,r,o,n){let i=Pr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>ot(s)),s.appendChild(d)}if(ui(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let d=setTimeout(()=>{Be.delete(d),s.isConnected&&ot(s)},o);Be.add(d),s._toastTimerId=d}return s}function ot(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Be.delete(t._toastTimerId)),t.remove())}function Fr(t){zr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&di.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),se.set(i,r),Tt(r,()=>{se.get(i)===r&&se.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let b=It();Bt(b,n,i,s,a)};r.addEventListener("click",l),Tt(r,()=>r.removeEventListener("click",l));return}let g=t.findContext(r);if(!g||typeof g.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let u;function f(){let l=t.evaluate(n,g);if(l&&l!==u){let b=typeof l=="string"?l:String(l),h=It();Bt(h,b,i,s,a),u=l}else u=l}let p=g.$watch(f);Tt(r,p)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=It();return Bt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&ot(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>ot(r))},t.toast=e,t.global("toast",e)}function Or(t,e={}){Fr(t)}function Vr(){Rr()}var Ae={containers:new Map};function Wr(){Ae.containers.clear()}function Nr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function pi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var fi=0;function Gr(t){return`${t}-${++fi}`}function Oe(t,e,r=!1){let o=Ae.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Ve(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Ur(t){t.directive("tabs",{priority:10,init(e,r,o){Nr();let n=[],i=[];for(let m of Array.from(e.children))m.hasAttribute("tab")?n.push(m):m.hasAttribute("panel")&&i.push(m);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let m=0;m<a;m++){let v=n[m],y=i[m],x=v.id||Gr("nojs-tab"),j=y.id||Gr("nojs-panel");v.id=x,y.id=j,v.setAttribute("role","tab"),v.setAttribute("aria-selected","false"),v.setAttribute("aria-controls",j),v.setAttribute("tabindex","-1"),v.classList.add("nojs-tab"),y.setAttribute("role","tabpanel"),y.setAttribute("aria-labelledby",x),y.setAttribute("tabindex","0"),y.setAttribute("aria-hidden","true"),y.inert=!0,y.classList.add("nojs-panel"),s.appendChild(v)}for(let m=a;m<i.length;m++){let v=i[m];v.setAttribute("role","tabpanel"),v.setAttribute("aria-hidden","true"),v.inert=!0,v.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),Ae.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let g=t.findContext(e),u=[],f=(m,v)=>{let y=!1;try{y=!!t.evaluate(v,g)}catch{y=!1}y?m.setAttribute("aria-disabled","true"):m.removeAttribute("aria-disabled")};for(let m=0;m<a;m++){let v=n[m],y=v.getAttribute("tab-disabled");if(y&&(f(v,y),g&&typeof g.$watch=="function")){let x=g.$watch(()=>f(v,y));u.push(x)}}let p=0;if(o&&o.trim()!==""){let m=parseInt(o,10);!isNaN(m)&&m>=0&&m<a&&(p=m)}let l=n.slice(0,a);if(n[p]?.getAttribute("aria-disabled")==="true"){let m=Ve(l,p,1);m!==-1?(p=m,Oe(e,p)):Oe(e,p,!0)}else Oe(e,p);let b=m=>{let v=Ae.containers.get(e);if(!v)return;let y=m.target;if(y.getAttribute("role")!=="tab")return;let{tabs:x}=v,j=x.indexOf(y);if(j===-1)return;let E=-1;switch(m.key){case"ArrowRight":case"ArrowDown":E=Ve(x,j,1);break;case"ArrowLeft":case"ArrowUp":E=Ve(x,j,-1);break;case"Home":E=Ve(x,x.length-1,1);break;case"End":E=Ve(x,0,-1);break;case"Tab":return;default:return}E!==-1&&E!==j&&(m.preventDefault(),Oe(e,E),x[E].focus())};s.addEventListener("keydown",b);let h=m=>{let v=m.target.closest("[role='tab']");if(!v)return;let y=Ae.containers.get(e);if(!y)return;let x=y.tabs.indexOf(v);x!==-1&&v.getAttribute("aria-disabled")!=="true"&&(Oe(e,x),v.focus())};s.addEventListener("click",h),pi(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",h);for(let m of u)m&&m();u.length=0,Ae.containers.delete(e)})}})}function Yr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Kr(t){t.directive("panel",{priority:11,init(){}})}function Xr(t,e={}){Ur(t),Yr(t),Kr(t)}function Zr(){Wr()}var q={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Qr(){q.branches.clear(),q.selectedItem=null,q.typeahead="",q.typeaheadTimer&&(clearTimeout(q.typeaheadTimer),q.typeaheadTimer=null)}function He(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function $e(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Jr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function en(t){return t.closest('[role="tree"]')}function mi(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function gi(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function Ht(t){let e=q.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),q.selectedItem=t}function tn(t){let e=q.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function bi(t){let e=q.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function hi(t){let e=q.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function rn(t,e){let r=en(e);if(!r)return;let o=Jr(r),n=o.indexOf(e);if(n<0)return;let i=q.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)bi(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&we(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)hi(e);else{let s=mi(e);s&&we(s,Jr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&we(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&we(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),Ht(e),c&&tn(e);break;case"Home":t.preventDefault(),o.length>0&&we(o[0],o);break;case"End":t.preventDefault(),o.length>0&&we(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),q.typeahead+=t.key.toLowerCase(),q.typeaheadTimer&&clearTimeout(q.typeaheadTimer),q.typeaheadTimer=setTimeout(()=>{q.typeahead="",q.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let d=(s+a)%o.length;if(gi(o[d]).startsWith(q.typeahead)){we(o[d],o);break}}}break}}function nn(t){t.directive("tree",{priority:15,init(e){He(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function on(t){t.directive("branch",{priority:16,init(e,r,o){He();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=en(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(q.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):q.branches.set(e,{expanded:n,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),Ht(e),tn(e))};e.addEventListener("click",s),$e(e,()=>e.removeEventListener("click",s));let a=d=>{rn(d,e)};e.addEventListener("keydown",a),$e(e,()=>e.removeEventListener("keydown",a)),$e(e,()=>{c=!0,q.branches.delete(e),q.selectedItem===e&&(q.selectedItem=null),q.typeaheadTimer&&(clearTimeout(q.typeaheadTimer),q.typeaheadTimer=null,q.typeahead="")})}})}function we(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function sn(t){t.directive("subtree",{priority:16,init(e){He(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),Ht(o)};o.addEventListener("click",n),$e(o,()=>o.removeEventListener("click",n));let i=c=>{rn(c,o)};o.addEventListener("keydown",i),$e(o,()=>o.removeEventListener("keydown",i)),$e(o,()=>{q.selectedItem===o&&(q.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=q.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function an(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $t(t){return t.closest('[role="treeitem"]')}function vi(t){return t.closest('[role="tree"]')}function yi(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function xi(t){return yi(t).indexOf(t)}function Ei(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function cn(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var I={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function qe(){I.indicator&&(I.indicator.remove(),I.indicator=null)}function We(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function _i(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function Ai(t,e){qe();let r=_i(),o=t.getBoundingClientRect(),n=vi(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),I.indicator=r}function dn(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(He(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=f=>{let p=$t(f.target);if(p&&e.contains(p)){if(p.hasAttribute("tree-drag-disabled")){f.preventDefault();return}I.dragging={el:p,treeRoot:e},f.dataTransfer&&(f.dataTransfer.effectAllowed="move",f.dataTransfer.setData("text/plain","")),p.classList.add("nojs-dragging"),p.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:p}}))}},c=f=>{if(!I.dragging||I.dragging.treeRoot!==e)return;let p=$t(f.target);if(!p||!e.contains(p)||p===I.dragging.el||cn(p,I.dragging.el))return;f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move");let l=Ei(p,f.clientY,o);(I.currentTarget!==p||I.currentPosition!==l)&&(We(e),qe(),I.currentTarget=p,I.currentPosition=l,l==="on"?p.classList.add("nojs-tree-drag-over"):Ai(p,l))},s=f=>{I.dragging&&I.dragging.treeRoot===e&&n++},a=f=>{I.dragging&&(n--,n<=0&&(n=0,We(e),qe(),I.currentTarget=null,I.currentPosition=null))},d=f=>{if(f.preventDefault(),f.stopPropagation(),n=0,!I.dragging||I.dragging.treeRoot!==e)return;let p=I.dragging.el,l=I.currentTarget,b=I.currentPosition;if(We(e),qe(),!l||!b){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(l===p||cn(l,p)){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="on"){let h=l.querySelector(':scope > [role="group"]');h||(h=l.nextElementSibling?.matches?.('[role="group"]')?l.nextElementSibling:null),h?h.setAttribute("aria-hidden","false"):(h=document.createElement("ul"),h.setAttribute("role","group"),h.setAttribute("subtree",""),h.classList.add("nojs-subtree","nojs-tree"),h.setAttribute("aria-hidden","false"),l.appendChild(h));let m=q.branches.get(l);m&&(m.expanded=!0,m.subtreeEl=h,l.setAttribute("aria-expanded","true")),h.appendChild(p),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:p,newParent:l}}))}else{let h=l.parentElement;if(!h){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="before")h.insertBefore(p,l);else{let v=l.nextElementSibling,y=v?.matches?.('[role="group"]')?v.nextElementSibling:v;y?h.insertBefore(p,y):h.appendChild(p)}let m=xi(p);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:p,newIndex:m}}))}I.dragging=null,I.currentTarget=null,I.currentPosition=null},g=f=>{let p=$t(f.target);p&&p.classList.remove("nojs-dragging"),We(e),qe(),n=0,I.dragging&&I.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:I.dragging.el}})),I.dragging=null,I.currentTarget=null,I.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",d),e.addEventListener("dragend",g),an(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",d),e.removeEventListener("dragend",g),We(e),qe()}),wi(e);let u=new MutationObserver(f=>{for(let p of f)for(let l of p.addedNodes){if(l.nodeType!==1)continue;l.getAttribute("role")==="treeitem"&&qt(l);let b=l.querySelectorAll?.('[role="treeitem"]');if(b)for(let h of b)qt(h)}});u.observe(e,{childList:!0,subtree:!0}),an(e,()=>u.disconnect())}})}function qt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function wi(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)qt(r)}function ln(t,e={}){nn(t),on(t),sn(t),dn(t)}function un(){Qr()}var it=new Map;function pn(){it.clear()}function st(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function fn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function mn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function gn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function bn(t){t.directive("stepper",{priority:14,init(e,r,o){st();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",g=e.getAttribute("aria-label")||"Stepper",u=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",g),e.classList.add("nojs-stepper");let f=null,p=[];if(a){f=document.createElement("div"),f.className="nojs-stepper-indicator",f.setAttribute("role","tablist"),f.setAttribute("aria-label","Progress"),i.forEach((A,C)=>{if(C>0){let V=document.createElement("div");V.className="nojs-stepper-separator",V.setAttribute("aria-hidden","true"),f.appendChild(V)}let D=document.createElement("button");D.type="button",D.className="nojs-stepper-indicator-item",D.setAttribute("role","tab"),D.setAttribute("aria-selected",C===u?"true":"false");let H=A.getAttribute("step-label")||`Step ${C+1}`,k=document.createElement("span");k.textContent=H,D.appendChild(k),D.setAttribute("aria-label",H);let U=`nojs-stepper-tab-${ji++}`;if(D.id=U,s==="free"){D.setAttribute("data-clickable","");let V=()=>j(C);D.addEventListener("click",V),Ne(e,()=>D.removeEventListener("click",V))}else D.setAttribute("tabindex","-1");f.appendChild(D),p.push(D)});let w=A=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(A.key))return;A.preventDefault();let C=u;A.key==="ArrowRight"?C=Math.min(u+1,i.length-1):A.key==="ArrowLeft"?C=Math.max(u-1,0):A.key==="Home"?C=0:A.key==="End"&&(C=i.length-1),s==="free"?(j(C),p[C]?.focus()):p[u]?.focus()};f.addEventListener("keydown",w),Ne(e,()=>f.removeEventListener("keydown",w)),e.insertBefore(f,e.firstChild)}let l=null,b=null,h=null;if(d){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-prev",b.textContent="Previous";let w=()=>x();b.addEventListener("click",w),Ne(e,()=>b.removeEventListener("click",w)),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-next",h.textContent="Next";let A=()=>y();h.addEventListener("click",A),Ne(e,()=>h.removeEventListener("click",A)),l.appendChild(b),l.appendChild(h),e.appendChild(l)}function m(w){let A=i[w];if(!A)return!0;if(!fn(A,t.findContext)){let H=A.querySelector("form[validate]");return H&&(mn(H),p[w]&&p[w].classList.add("nojs-step-invalid"),gn(e,A,H)),!1}p[w]&&p[w].classList.remove("nojs-step-invalid");let C=A.querySelectorAll("[required]");for(let H of C)if(typeof H.checkValidity=="function"&&!H.checkValidity())return H.reportValidity(),!1;let D=A.getAttribute("step-validate");if(D)try{if(!t.evaluate(D,n))return!1}catch(H){return console.warn(`[stepper] step-validate error: ${H.message}`),!1}return!0}function v(w){if(i.forEach((A,C)=>{let D=C===u;A.setAttribute("aria-hidden",D?"false":"true"),D?(A.removeAttribute("inert"),A.setAttribute("aria-current","step")):(A.setAttribute("inert",""),A.removeAttribute("aria-current"))}),p.length&&p.forEach((A,C)=>{A.setAttribute("aria-selected",C===u?"true":"false"),C<u?A.setAttribute("data-completed",""):A.removeAttribute("data-completed"),A.setAttribute("tabindex",C===u?"0":"-1");let D=i[C];D.id&&(A.setAttribute("aria-controls",D.id),D.setAttribute("aria-labelledby",A.id))}),b&&(b.disabled=u===0),h&&(h.textContent=u===i.length-1?"Finish":"Next"),!w){let A=i[u];A&&requestAnimationFrame(()=>A.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!w,detail:{current:u,total:i.length}}))}function y(){return u>=i.length-1?(s==="linear"&&!m(u)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:u,total:i.length}})),!1):s==="linear"&&!m(u)?!1:(u++,v(),L(),!0)}function x(){return u<=0?!1:(u--,v(),L(),!0)}function j(w){if(w<0||w>=i.length||w===u)return!1;if(s==="linear"&&w>u){for(let A=u;A<w;A++)if(u=A,v(),!m(A))return L(),!1}return u=w,v(),L(),!0}let E={get current(){return u},get total(){return i.length},next:y,prev:x,goTo:j,get isFirst(){return u===0},get isLast(){return u===i.length-1}};function L(){n.$stepper=E}L(),it.set(e,{get current(){return u},steps:i,mode:s,indicatorEl:f,navEl:l}),v(!0),Ne(e,()=>{it.delete(e),f&&f.parentNode&&f.remove(),l&&l.parentNode&&l.remove(),delete n.$stepper})}})}var ji=0;var Li=0;function hn(t){t.directive("step",{priority:13,init(e,r,o){st(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Li++}`),e.setAttribute("tabindex","0")}})}function vn(t,e={}){hn(t),bn(t)}function yn(){pn()}function xn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function En(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function _n(t){t.directive("skeleton",{priority:10,init(e,r,o){xn();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function d(m){g();for(let v=0;v<m;v++){let y=document.createElement("div");y.className="nojs-skeleton-line",e.appendChild(y),a.push(y)}}function g(){for(let m of a)m.parentNode===e&&e.removeChild(m);a=[]}function u(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let m=s+(String(s).match(/\d$/)?"px":"");e.style.width=m,e.style.height=m}if(c){let m=parseInt(c,10);m>0&&d(m)}e.setAttribute("aria-busy","true")}let f=null;function p(){f&&f(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let m=!1,v=null,y=()=>{m||(m=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",y),v!==null&&clearTimeout(v),f=null)};e.addEventListener("transitionend",y),v=setTimeout(y,0),f=()=>{e.removeEventListener("transitionend",y),v!==null&&clearTimeout(v),m=!0,f=null}}let l=!1;function b(){let m=!!t.evaluate(o,n);m&&!l?(l=!0,u()):!m&&l&&(l=!1,p())}b();let h=n.$watch(b);En(e,h),En(e,()=>{f&&f(),l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function An(t,e={}){_n(t)}var je=new Map,G=new Map,T={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function wn(){je.clear(),G.clear(),T.active=!1,T.splitEl=null,T.gutterEl=null,T.prevPane=null,T.nextPane=null,T.direction=null,T.startPos=0,T.startPrevSize=0,T.startNextSize=0,T.containerSize=0}function at(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function ki(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function jn(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function Ln(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function Ci(t,e){let o=(je.get(t)?.gutters||[]).reduce((n,i)=>n+Q(i,e),0);return Q(t,e)-o}function Si(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Ge(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function ct(t,e,r,o){let n=Q(e,o),i=Q(r,o),c=G.get(e),s=G.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function Mt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=je.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function Di(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=je.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function Ti(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=p=>{if(p.button!==0)return;p.preventDefault();let l=Ci(t,e);T.active=!0,T.splitEl=t,T.gutterEl=i,T.prevPane=r,T.nextPane=o,T.direction=e,T.startPos=p[jn(e)],T.startPrevSize=Q(r,e),T.startNextSize=Q(o,e),T.containerSize=l,T.sign=Ln(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(p.pointerId)},s=p=>{if(!T.active||T.gutterEl!==i)return;let l=(p[jn(T.direction)]-T.startPos)*(T.sign||1),b=Ge(T.startPrevSize+l,T.prevPane),h=Ge(T.startNextSize-l,T.nextPane),m=T.startPrevSize+T.startNextSize;b+h!==m&&(b!==T.startPrevSize+l?h=m-b:b=m-h),T.prevPane.style.flexBasis=`${b}px`,T.prevPane.style.flexGrow="0",T.nextPane.style.flexBasis=`${h}px`,T.nextPane.style.flexGrow="0",ct(i,T.prevPane,T.nextPane,T.direction)},a=()=>{!T.active||T.gutterEl!==i||(T.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Mt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let d=10,g=p=>{let l=e==="horizontal",b=Ln(t,e),h=0;if(l&&p.key==="ArrowRight"||!l&&p.key==="ArrowDown")h=d*b;else if(l&&p.key==="ArrowLeft"||!l&&p.key==="ArrowUp")h=-d*b;else if(p.key==="Home")h=(G.get(r)?.min||0)-Q(r,e);else if(p.key==="End"){let E=G.get(o);h=Q(r,e)+Q(o,e)-(E?.min||0)-Q(r,e)}else return;p.preventDefault();let m=Q(r,e),v=Q(o,e),y=m+v,x=Ge(m+h,r),j=Ge(y-x,o);x=y-j,x=Ge(x,r),j=y-x,r.style.flexBasis=`${x}px`,r.style.flexGrow="0",o.style.flexBasis=`${j}px`,o.style.flexGrow="0",ct(i,r,o,e),Mt(t)};i.addEventListener("keydown",g);let u=()=>{let p=G.get(r),l=G.get(o),b=p?.collapsible?r:l?.collapsible?o:null;if(!b)return;let h=G.get(b);if(!h)return;let m=b===r?o:r,v=Q(r,e)+Q(o,e);if(h.collapsed){h.collapsed=!1,b.removeAttribute("data-collapsed");let y=h.preCollapseSize||`${Math.round(v/2)}px`,x=Si(y,v)??v/2,j=Math.min(x,v);b.style.flexBasis=`${j}px`,b.style.flexGrow="0",m.style.flexBasis=`${v-j}px`,m.style.flexGrow="0"}else h.preCollapseSize=b.style.flexBasis||`${Q(b,e)}px`,h.collapsed=!0,b.setAttribute("data-collapsed","true"),b.style.flexBasis="0px",b.style.flexGrow="0",m.style.flexBasis=`${v}px`,m.style.flexGrow="0";ct(i,r,o,e),Mt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:b,collapsed:h.collapsed}}))};return i.addEventListener("dblclick",u),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",g),i.removeEventListener("dblclick",u)}}}function kn(t){t.directive("split",{priority:14,init(e,r,o){at();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(g=>g.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(g=>{G.get(g)||G.set(g,{size:g.getAttribute("pane")||null,min:parseInt(g.getAttribute("pane-min"),10)||0,max:parseInt(g.getAttribute("pane-max"),10)||1/0,collapsible:g.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let g=0;g<c.length-1;g++){let{gutter:u,cleanup:f}=Ti(e,n,c[g],c[g+1],i);c[g].after(u),s.push(u),a.push(f)}je.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),Di(e)||c.forEach(g=>{let f=G.get(g)?.size;f?(g.style.flexBasis=f,g.style.flexGrow="0"):(g.style.flexGrow="1",g.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((g,u)=>{ct(g,c[u],c[u+1],n)})}),ki(e,()=>{a.forEach(g=>g()),s.forEach(g=>g.remove()),je.delete(e),c.forEach(g=>G.delete(g)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Ii(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Cn(t){t.directive("pane",{priority:15,init(e,r,o){at(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Ii(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function Sn(t,e={}){kn(t),Cn(t)}function Dn(){wn()}var fe={sorts:new Map};function Tn(){fe.sorts.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Bi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Hi(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function $i(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function In(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function Bn(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function $n(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return Bn(Number(t),Number(e));case"date":return Bn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function qi(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function qn(t){t.directive("sortable",{priority:10,init(e){Le(),e.classList.add("nojs-sortable")}})}function Mn(t){t.directive("sort",{priority:11,init(e,r,o){Le();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;fe.sorts.has(s)||fe.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(fe.sorts.get(s).column||Hn(e,s,n,i,c,t));let a=()=>{let g=fe.sorts.get(s),u;g.column!==n?u="asc":g.direction==="asc"?u="desc":g.direction==="desc"?u=null:u="asc",Hn(e,s,n,i,u,t)},d=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),a())};e.addEventListener("click",a),e.addEventListener("keydown",d),Bi(e,()=>{e.removeEventListener("click",a),e.removeEventListener("keydown",d),s&&!s.isConnected&&(fe.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Hn(t,e,r,o,n,i){let c=fe.sorts.get(e);qi(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=Hi(e,i);if(s){let a=i.findContext(e),d=a?$i(a,s.arrayPath):null;if(Array.isArray(d)){if(!n){let u=e._nojsOriginalOrder;if(u){let f=new Set(d),p=u.filter(l=>f.has(l));for(let l of d)u.includes(l)||p.push(l);In(a,s.arrayPath,p)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let g=[...d].sort((u,f)=>{let p=u!=null?u[r]:null,l=f!=null?f[r]:null,b=$n(p,l,o);return n==="desc"?-b:b});In(a,s.arrayPath,g);return}}Mi(e,t,r,o,n)}function Mi(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let f=document.createDocumentFragment();for(let p of t._nojsOriginalRows)f.appendChild(p);i.appendChild(f);return}let g=f=>{let p=f.replace(/[^0-9.\-]/g,"");return p===""||p==="-"?NaN:parseFloat(p)};d.sort((f,p)=>{let l=f.children[a]?.textContent?.trim()||"",b=p.children[a]?.textContent?.trim()||"",h=$n(o==="number"?g(l):l,o==="number"?g(b):b,o);return n==="desc"?-h:h});let u=document.createDocumentFragment();for(let f of d)u.appendChild(f);i.appendChild(u)}function Pn(t){t.directive("fixed-header",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-header")}})}function Rn(t){t.directive("fixed-col",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-col")}})}function Pt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function zn(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function Fn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function On(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function Vn(t){t.directive("table-reorder",{priority:15,init(e){if(Le(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,d=null;function g(){let h=r.querySelectorAll(":scope > tr");for(let m=0;m<h.length;m++){let v=h[m];if(v._nojsReorderSetup)continue;v._nojsReorderSetup=!0,v.draggable=!0,v.setAttribute("aria-roledescription","draggable row");let y=!0;if(n){let A=C=>{y=!!C.target.closest(n)};v.addEventListener("mousedown",A),Pt(v,()=>v.removeEventListener("mousedown",A))}let x=A=>{if(n&&!y){A.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(v),a=v,A.dataTransfer&&(A.dataTransfer.effectAllowed="move",A.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(D=>v.classList.add(D))},j=A=>{if(a==null)return;A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="move");let C=v.getBoundingClientRect(),D=C.top+C.height/2,k=[...r.querySelectorAll(":scope > tr")].indexOf(v);u(),k!==s&&(A.clientY<D?v.classList.add("nojs-reorder-insert-before"):v.classList.add("nojs-reorder-insert-after"),d=v)},E=()=>{v.classList.remove("nojs-reorder-insert-before"),v.classList.remove("nojs-reorder-insert-after"),d===v&&(d=null)},L=A=>{if(A.preventDefault(),A.stopPropagation(),a==null||s==null)return;let C=[...r.querySelectorAll(":scope > tr")],D=v.getBoundingClientRect(),H=D.top+D.height/2,k=C.indexOf(v);A.clientY>=H&&k++;let U=s;if(U===k||U+1===k){f();return}let V=U<k?k-1:k,be=zn(e);if(be&&o){let S=Fn(o,be.arrayPath);if(Array.isArray(S)){let $=[...S],[P]=$.splice(U,1);$.splice(V,0,P),On(o,be.arrayPath,$),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...$]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:U,to:V,item:P}}))}}else{let S=a,$=C[V];S&&$&&(U<V?r.insertBefore(S,$.nextSibling):r.insertBefore(S,$),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:U,to:V,item:null}})))}f()},w=()=>{f()};v.addEventListener("dragstart",x),v.addEventListener("dragover",j),v.addEventListener("dragleave",E),v.addEventListener("drop",L),v.addEventListener("dragend",w),Pt(v,()=>{v.removeEventListener("dragstart",x),v.removeEventListener("dragover",j),v.removeEventListener("dragleave",E),v.removeEventListener("drop",L),v.removeEventListener("dragend",w),v._nojsReorderSetup=!1})}}function u(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function f(){a&&i.split(/\s+/).filter(Boolean).forEach(m=>a.classList.remove(m)),u(),s=null,a=null;let h=r.querySelectorAll(":scope > tr");for(let m of h)m.classList.remove("nojs-reorder-insert-before"),m.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(v=>m.classList.remove(v))}let p=h=>{a!=null&&(h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect="move"))},l=h=>{if(a==null||h.target!==r)return;h.preventDefault(),h.stopPropagation();let m=s,y=[...r.querySelectorAll(":scope > tr")].length-1;if(m===y){f();return}let x=zn(e);if(x&&o){let j=Fn(o,x.arrayPath);if(Array.isArray(j)){let E=[...j],[L]=E.splice(m,1);E.push(L),On(o,x.arrayPath,E),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...E]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:m,to:E.length-1,item:L}}))}}f()};r.addEventListener("dragover",p),r.addEventListener("drop",l);let b=new MutationObserver(()=>{g()});b.observe(r,{childList:!0}),g(),Pt(e,()=>{b.disconnect(),r.removeEventListener("dragover",p),r.removeEventListener("drop",l),f()})}})}function Wn(t,e={}){qn(t),Mn(t),Pn(t),Rn(t),Vn(t)}function Nn(){Tn()}var me={containers:new Map};function Gn(){for(let[,t]of me.containers)typeof t.unsub=="function"&&t.unsub();me.containers.clear()}function Un(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Yn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Pi(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function Ri(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Kn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=c.label,s.appendChild(d)}else{let d=document.createElement("a");d.href=c.href,d.textContent=c.label,s.appendChild(d)}o.appendChild(s)}t.appendChild(o);let n=me.containers.get(t);n&&(n.crumbs=e)}function zi(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=Pi(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function Fi(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=Ri(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function Xn(t){t.directive("breadcrumb",{priority:15,init(e,r,o){Un(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(me.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,d=a?a.path:"/",g=Fi(d);Kn(e,g)};if(s(),typeof i.on=="function"){let a=i.on(s),d=me.containers.get(e);d&&(d.unsub=a),Yn(e,()=>{typeof a=="function"&&a();let g=me.containers.get(e);g&&(g.unsub=null)})}}else{let s=zi(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");Kn(e,s)}Yn(e,()=>{me.containers.delete(e)})}})}function Zn(t,e={}){Xn(t)}function Qn(){Gn()}var dt={containers:new Map};function Jn(){dt.containers.clear()}function eo(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Oi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var lt=null;function Vi(){return lt!==null||(lt=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),lt}function to(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function Wi(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function no(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function ro(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");no(t,r)}else t.open=!1}function ut(t,e,r,o){let n=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function Me(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function oo(t){t.directive("accordion",{priority:10,init(e,r,o){eo();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!Vi();e.setAttribute("role","group");let c=Me(e);if(c.length===0)return;if(i)for(let f of c)to(f);let s=[],a=new MutationObserver(f=>{for(let p of f)for(let l of p.addedNodes)l.nodeType!==1||l.tagName!=="DETAILS"||l.parentElement===e&&g(l)});a.observe(e,{childList:!0});let d=0,g=f=>{i&&to(f);let p=f.querySelector(":scope > summary");if(p){let h=`nojs-accordion-panel-${Date.now()}-${d++}`,m=f.querySelector(":scope > .nojs-accordion-content");m?(m.id=m.id||h,m.setAttribute("role","region"),h=m.id):(f.id||(f.id=h),h=f.id),p.setAttribute("aria-expanded",f.open?"true":"false"),p.setAttribute("aria-controls",h)}let l=h=>{let m=Me(e),v=m.indexOf(f),y=f.querySelector(":scope > summary");if(y&&y.setAttribute("aria-expanded",f.open?"true":"false"),f.open){if(n==="single")for(let x of m)x!==f&&x.open&&ro(x,i);ut(e,f,!0,v)}else ut(e,f,!1,v)},b=null;if(i){let h=f.querySelector(":scope > summary");h&&(b=m=>{m.preventDefault();let v=f.querySelector(":scope > .nojs-accordion-content");if(f.open)no(f,v),h.setAttribute("aria-expanded","false"),ut(e,f,!1,Me(e).indexOf(f));else{if(n==="single"){let y=Me(e);for(let x of y)if(x!==f&&x.open){ro(x,!0);let j=x.querySelector(":scope > summary");j&&j.setAttribute("aria-expanded","false")}}Wi(f,v),h.setAttribute("aria-expanded","true"),ut(e,f,!0,Me(e).indexOf(f))}},h.addEventListener("click",b))}f.addEventListener("toggle",l),s.push({details:f,toggleHandler:l,clickHandler:b})};for(let f of c)g(f);let u=f=>{let p=f.target;if(p.tagName!=="SUMMARY")return;let l=p.parentElement;if(!l||l.parentElement!==e)return;let h=Me(e).map(y=>y.querySelector(":scope > summary")).filter(Boolean),m=h.indexOf(p);if(m===-1)return;let v=-1;switch(f.key){case"ArrowDown":case"ArrowRight":v=(m+1)%h.length;break;case"ArrowUp":case"ArrowLeft":v=(m-1+h.length)%h.length;break;case"Home":v=0;break;case"End":v=h.length-1;break;default:return}v!==-1&&v!==m&&(f.preventDefault(),h[v].focus())};e.addEventListener("keydown",u),dt.containers.set(e,{mode:n,listeners:s,observer:a}),Oi(e,()=>{e.removeEventListener("keydown",u),a.disconnect();for(let f of s)if(f.details.removeEventListener("toggle",f.toggleHandler),f.clickHandler){let p=f.details.querySelector(":scope > summary");p&&p.removeEventListener("click",f.clickHandler)}s.length=0,dt.containers.delete(e)})}})}function io(t,e={}){oo(t)}function so(){Jn()}var Pe=new Map;function ao(){let t=Array.from(Pe.keys());for(let e of t){let r=Pe.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}Pe.clear()}function co(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Ni(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Gi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=Ui(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function Ui(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Yi(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function lo(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function pt(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Ki(t,e){return t*e}function po(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function fo(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function uo(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function ft(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function Xi(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return fo(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function Zi(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return fo(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function Qi(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=Xi(t,e),n=Zi(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function Rt(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:s}=Qi(t,n,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=ft(t,c),d=t.itemHeight!=="auto"?Ki(t.totalItems,t.itemHeight):uo(t),g=s>=0?ft(t,s+1):0,u=Math.max(0,d-g);pt(t.spacerTop,a),pt(t.spacerBottom,u);let f=new Set;for(let l=c;l<=s;l++)f.add(l);for(let[l,b]of t.renderedNodes)f.has(l)||(b.remove(),t.renderedNodes.delete(l));let p=[];for(let l=c;l<=s;l++){if(t.renderedNodes.has(l))continue;let b=t.dataArray[l];if(b===void 0)continue;let h=t.template.cloneNode(!0),m={};m[t.iteratorVar]=b,m.$index=l,m.$count=t.totalItems,m.$first=l===0,m.$last=l===t.totalItems-1,m.$even=l%2===0,m.$odd=l%2!==0,h.setAttribute("role","option"),h.setAttribute("aria-setsize",String(t.totalItems)),h.setAttribute("aria-posinset",String(l+1)),h.setAttribute("tabindex","-1"),h.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(m)),h.__declared=!1,p.push({index:l,node:h}),t.renderedNodes.set(l,h)}if(p.length>0){p.sort((l,b)=>l.index-b.index);for(let{index:l,node:b}of p){let h=null;for(let[m,v]of t.renderedNodes)m>l&&v.parentNode===r&&(!h||m<Ji(h,t))&&(h=v);h||(h=t.spacerBottom),r.insertBefore(b,h);try{e.processTree&&e.processTree(b)}catch{}}}if(t.itemHeight==="auto"){let l=!1;for(let[b,h]of t.renderedNodes){let m=h.offsetHeight||h.getBoundingClientRect().height;m>0&&t.heights[b]!==m&&(t.heights[b]=m,l=!0)}if(l){po(t);let b=uo(t),h=ft(t,c),m=s>=0?ft(t,s+1):0,v=Math.max(0,b-m);pt(t.spacerTop,h),pt(t.spacerBottom,v)}}}function Ji(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function es(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&po(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,Rt(t,r)}function mo(t){t.directive("virtual",{priority:10,init(e,r,o){co(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=Gi(e),d=null;if(a)d=a.eachEl;else for(let j of e.children)if(!j.classList.contains("nojs-virtual-spacer")){d=j;break}if(!d){console.warn("[virtual] No child template found.");return}let g=d.cloneNode(!0);for(g.removeAttribute("each"),g.removeAttribute("foreach"),g.removeAttribute("for"),g.__declared=!1,g.__disposers=null,g.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let u=lo(e),f=lo(e);e.appendChild(u),e.appendChild(f);let p={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:g,spacerTop:u,spacerBottom:f,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};Pe.set(e,p);let l=j=>{let E=[...e.querySelectorAll('[role="option"]')];if(!E.length)return;let L=e.querySelector('[role="option"]:focus'),w=L?E.indexOf(L):-1,A=-1;switch(j.key){case"ArrowDown":j.preventDefault(),A=w<E.length-1?w+1:w;break;case"ArrowUp":j.preventDefault(),A=w>0?w-1:0;break;case"Home":j.preventDefault(),A=0;break;case"End":j.preventDefault(),A=E.length-1;break;default:return}A>=0&&A<E.length&&E[A].focus()};e.addEventListener("keydown",l);let b=null,h=()=>{b||(b=requestAnimationFrame(()=>{b=null,Rt(p,t)}))};if(p.scrollHandler=h,e.addEventListener("scroll",h,{passive:!0}),typeof ResizeObserver<"u"){let j=new ResizeObserver(()=>{p.dirty=!0,Rt(p,t)});j.observe(e),p.resizeObserver=j}let m=null,v=-1,y=null,x=()=>{if(!p.disposed){if(p.arrayPath){let j=t.findContext?t.findContext(e):null;if(j){let E=Yi(j,p.arrayPath);Array.isArray(E)&&(E!==m||E.length!==v)&&(m=E,v=E.length,es(p,E,t))}}y=setTimeout(x,100)}};y=setTimeout(x,100),Ni(e,()=>{p.disposed=!0,b&&(cancelAnimationFrame(b),b=null),y&&(clearTimeout(y),y=null),e.removeEventListener("scroll",h),e.removeEventListener("keydown",l),p.resizeObserver&&(p.resizeObserver.disconnect(),p.resizeObserver=null);for(let[j,E]of p.renderedNodes){if(E.__disposers){for(let L of E.__disposers)try{L()}catch{}E.__disposers=null}E.remove()}p.renderedNodes.clear(),p.spacerTop&&p.spacerTop.parentNode&&p.spacerTop.remove(),p.spacerBottom&&p.spacerBottom.parentNode&&p.spacerBottom.remove(),Pe.delete(e)})}})}function go(t,e={}){mo(t)}function bo(){ao()}var ge=new Map,mt=new Map;function ho(){for(let[t,e]of ge){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}ge.clear(),mt.clear()}function vo(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function ts(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function rs(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function ns(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function os(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function is(){return document.documentElement}function ss(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function yo(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function zt(t){let e=ge.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let u of a)u.isIntersecting?n.add(u.target.id):n.delete(u.target.id);let d=null,g=1/0;for(let u of n){let f=document.getElementById(u);if(!f)continue;let p=f.getBoundingClientRect();p.top<g&&(g=p.top,d=u)}for(let u of e.spyEntries)yo(u.el);if(d){for(let u of e.spyEntries)if(u.targetId===d){ss(u.el),e.activeEl=u.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let d=document.getElementById(a.targetId);d&&(c.observe(d),s.add(a.targetId))}e.observer=c}function as(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function xo(t){t.directive("spy",{priority:20,init(e,r,o){vo();let n=rs(e);if(!n){e.tagName!=="A"&&as(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=ns(e),c=os(e),s=is();ge.has(s)||ge.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=ge.get(s),d={el:e,targetId:n};a.spyEntries.push(d),mt.set(e,s),zt(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{zt(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),ts(e,()=>{let g=a.spyEntries.indexOf(d);g!==-1&&a.spyEntries.splice(g,1),mt.delete(e),yo(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),ge.delete(s)):zt(s)})}})}function Eo(t,e={}){xo(t)}function _o(){ho()}var Ft="it is a DOM element; client mechanics never send DOM nodes",Ao={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:Ft},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:Ft},fixed:{list:null}},$el:{unavailable:Ft}}}};var cs="[validate],[drag],[drop],[drag-list],[drag-multiple]";function wo(t){if(typeof document>"u")return;let e=document.querySelectorAll(cs);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var jo=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],ds=["validate","drag-list","drag-multiple",...jo].filter(t=>!Xt.includes(t));function ls(t,e){vt(t,e);for(let r of ds)t.directive(r,{priority:30,init(o,n){n.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}var us={name:"nojs-elements",contract:{directives:{...Ao}},install(t,e={}){if(de(t)){ls(t,e);return}vt(t,e),sr(t,e),fr(t,e),hr(t,e),kr(t,e),$r(t,e),Or(t,e),Xr(t,e),ln(t,e),vn(t,e),An(t,e),Sn(t,e),Wn(t,e),Zn(t,e),io(t,e),go(t,e),Eo(t,e),wo(t)},init(t){if(de(t)||(wo(t),typeof document>"u"||!document.body))return;let e=jo.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Zt(),ar(),mr(),vr(),Cr(),qr(),Vr(),Zr(),un(),yn(),Dn(),Nn(),Qn(),so(),bo(),_o()}},ps=us;
//# sourceMappingURL=nojs-elements.js.map
