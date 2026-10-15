/**
 * NoJS Elements v1.22.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
var bt=Object.defineProperty;var jo=Object.getOwnPropertyDescriptor;var Lo=Object.getOwnPropertyNames;var ko=Object.prototype.hasOwnProperty;var Co=(t,e)=>{for(var r in e)bt(t,r,{get:e[r],enumerable:!0})},So=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Lo(e))!ko.call(t,n)&&n!==r&&bt(t,n,{get:()=>e[n],enumerable:!(o=jo(e,n))||o.enumerable});return t};var Do=t=>So(bt({},"__esModule",{value:!0}),t);var ls={};Co(ls,{default:()=>ds});module.exports=Do(ls);var _={dragging:null,selected:new Map,placeholder:null},Ue=new Map;function Ft(){_.dragging=null,_.selected.clear(),_.placeholder&&(_.placeholder.remove(),_.placeholder=null),Ue.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Me(t,e){t.__nojsElBoundCtx=e}function ue(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Xe(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function pe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ye(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ye(r):e++}return e}function Ke(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function Wt(t,e,r,o){te();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",_.dragging&&_.dragging.sourceEl){let s=(_.dragging.sourceEl.firstElementChild||_.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),_.placeholder=n}function te(){_.placeholder&&(_.placeholder.remove(),_.placeholder=null)}function ye(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function To(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let g=a-1;g>=0;g--){let u=document.createElement("div"),f=g*4;if(u.style.cssText="position:absolute;top:"+f+"px;left:"+f+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",g===0){let p=o.cloneNode(!0);for(;p.firstChild;)u.appendChild(p.firstChild);u.style.background=s.backgroundColor||"#fff",u.style.border=s.border,u.style.padding=s.padding,u.style.fontSize=s.fontSize,u.style.color=s.color,u.style.fontFamily=s.fontFamily}else u.style.background=s.backgroundColor||"#fff",u.style.border=s.border||"1px solid #ddd";r.appendChild(u)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var oe=null;function Io(){return oe&&oe.isConnected?oe:typeof document>"u"||!document.body?null:(oe=document.createElement("div"),oe.setAttribute("aria-live","assertive"),oe.setAttribute("aria-atomic","true"),oe.setAttribute("role","status"),oe.className="nojs-dnd-live-region",oe.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(oe),oe)}function de(t){let e=Io();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Nt(t){if(ue(t)){t.directive("drag",{priority:15,init(e,r){Le(),Ot(e,Ho(e,r))}});return}Xe(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Le(),Ot(e,Bo(t,e,o))}})}function Bo(t,e,r){let o=t.findContext(e);Me(e,o);let n=e.getAttribute("drag-disabled");return{ctx:o,value:()=>t.evaluate(r,o),disabled:()=>n?t.evaluate(n,o):!1,watchDisabled:i=>pe(e,o.$watch(i)),onDispose:i=>pe(e,i)}}function Ho(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function Ot(t,e){let r=t.getAttribute("drag-type")||"default",o=t.getAttribute("drag-effect")||"move",n=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),c=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),a=t.getAttribute("drag-class")||"nojs-dragging",d=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let g=!0;if(n){let l=b=>{g=!!b.target.closest(n)};t.addEventListener("mousedown",l),e.onDispose(()=>t.removeEventListener("mousedown",l))}let u=l=>{if(n&&!g){l.preventDefault();return}if(s&&e.disabled()){l.preventDefault();return}let b=e.value(),v=t.getAttribute("drag-group"),m=b;if(v&&_.selected.has(v)){let x=_.selected.get(v);x.size>0&&[...x].some(E=>E.el===t)&&(m=[...x].map(E=>E.item))}if(_.dragging={item:m,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},l.dataTransfer){if(l.dataTransfer.effectAllowed=o,l.dataTransfer.setData("text/plain",""),Array.isArray(m)&&m.length>1&&l.dataTransfer.setDragImage){let x=To(t,m.length);document.body.appendChild(x);let y=t.getBoundingClientRect();l.dataTransfer.setDragImage(x,y.width/2,y.height/2),requestAnimationFrame(()=>x.remove())}else if(i&&l.dataTransfer.setDragImage)if(i==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[y,E]=c.split(",").map(Number);l.dataTransfer.setDragImage(x,y||0,E||0),requestAnimationFrame(()=>x.remove())}else{let x=t.querySelector(i);if(x){let[y,E]=c.split(",").map(Number);d&&x.classList.add(d),l.dataTransfer.setDragImage(x,y||0,E||0)}}}if(a.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),Array.isArray(m)&&v&&_.selected.has(v))for(let x of _.selected.get(v))x.el!==t&&a.split(/\s+/).filter(Boolean).forEach(y=>x.el.classList.add(y));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:m,index:_.dragging.sourceIndex,el:t}}))},f=()=>{a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b));let l=t.getAttribute("drag-group");if(l&&_.selected.has(l))for(let b of _.selected.get(l))a.split(/\s+/).filter(Boolean).forEach(v=>b.el.classList.remove(v));if(d&&i&&i!=="none"){let b=t.querySelector(i);b&&b.classList.remove(d)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:_.dragging?.item,index:_.dragging?.sourceIndex,dropped:_.dragging===null}})),_.dragging=null,te()};if(t.addEventListener("dragstart",u),t.addEventListener("dragend",f),e.onDispose(()=>{t.removeEventListener("dragstart",u),t.removeEventListener("dragend",f)}),s){let l=function(){let b=!!e.disabled();t.draggable=!b,b?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(l)}let p=l=>{if(_.dragging&&!_.dragging.sourceEl.isConnected&&(_.dragging=null),l.key===" "&&!_.dragging){l.preventDefault();let b=e.value();_.dragging={item:b,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},a.split(/\s+/).filter(Boolean).forEach(m=>t.classList.add(m));let v=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${v}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:t}}))}else l.key==="Escape"&&_.dragging&&_.dragging.sourceEl===t&&(l.preventDefault(),a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),de("Drag cancelled."),_.dragging=null,te())};t.addEventListener("keydown",p),e.onDispose(()=>t.removeEventListener("keydown",p))}function Gt(t){if(ue(t)){t.directive("drop",{priority:15,init(e,r){Le(),Vt(e,qo(e,r)),Po(e,r)}});return}Xe(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Le(),Vt(e,$o(t,e,o))}})}function $o(t,e,r){let o=t.findContext(e);Me(e,o);let n=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>n?t.evaluate(n,o):!1,max:()=>i?t.evaluate(i,o):void 0,run(c){let s=K(t,"execStatement");typeof s=="function"?s(r,o,c):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:c=>pe(e,c)}}function qo(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function Po(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",o=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),o.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),_.placeholder&&t.contains(_.placeholder)&&te()})}function Vt(t,e){let r=t.getAttribute("drop-accept")||"default",o=t.getAttribute("drop-effect")||"move",n=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",c=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),a=t.getAttribute("drop-sort"),d=t.getAttribute("drop-placeholder"),g=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",o);let u=0,f=m=>{if(!_.dragging||c&&e.disabled())return;let h=ye(_.dragging.type,r),x=!0;if(s){let y=e.max(),E=Ye(t);typeof y=="number"&&E>=y&&(x=!1)}if(!h||!x){i.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),n.split(/\s+/).filter(Boolean).forEach(y=>t.classList.remove(y)),te();return}if(i.split(/\s+/).filter(Boolean).forEach(y=>t.classList.remove(y)),m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect=o),a){let y=Ke(t,m.clientX,m.clientY,a);d&&Wt(t,y,d,g),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:_.dragging.item,index:y}}))}},p=m=>{if(_.dragging&&!(c&&e.disabled())&&(u++,u===1)){let h=ye(_.dragging.type,r),x=!0;if(s){let y=e.max(),E=Ye(t);typeof y=="number"&&E>=y&&(x=!1)}h&&x?(n.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y))}},l=m=>{_.dragging&&(u--,u<=0&&(u=0,n.split(/\s+/).filter(Boolean).forEach(h=>t.classList.remove(h)),i.split(/\s+/).filter(Boolean).forEach(h=>t.classList.remove(h)),te(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging.item}}))))},b=m=>{if(m.preventDefault(),m.stopPropagation(),u=0,!_.dragging||c&&e.disabled()||!ye(_.dragging.type,r))return;if(s){let k=e.max(),L=Ye(t);if(typeof k=="number"&&L>=k)return}let h=_.dragging.item,x=_.dragging.type,y=_.dragging.effect,E=0;a&&(E=Ke(t,m.clientX,m.clientY,a)),n.split(/\s+/).filter(Boolean).forEach(k=>t.classList.remove(k)),i.split(/\s+/).filter(Boolean).forEach(k=>t.classList.remove(k)),te();let j={$drag:h,$dragType:x,$dragEffect:y,$dropIndex:E,$source:{list:_.dragging.sourceList,index:_.dragging.sourceIndex,el:_.dragging.sourceEl},$target:{list:null,index:E,el:t},$el:t};e.run(j),_.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:h,index:E,source:j.$source,target:j.$target,effect:y}}))},v=m=>{_.dragging&&(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),b(m))};t.addEventListener("dragover",f),t.addEventListener("dragenter",p),t.addEventListener("dragleave",l),t.addEventListener("drop",b),t.addEventListener("keydown",v),e.onDispose(()=>{t.removeEventListener("dragover",f),t.removeEventListener("dragenter",p),t.removeEventListener("dragleave",l),t.removeEventListener("drop",b),t.removeEventListener("keydown",v)})}function Ut(t){Xe(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Le();let n=t.findContext(e);Me(e,n);let i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,g=e.getAttribute("drop-accept")||d,u=e.hasAttribute("drag-list-copy"),f=e.hasAttribute("drag-list-remove"),p=e.getAttribute("drag-disabled"),l=e.getAttribute("drop-disabled"),b=e.getAttribute("drop-max"),v=e.getAttribute("drop-placeholder"),m=e.getAttribute("drop-placeholder-class"),h=e.getAttribute("drag-class")||"nojs-dragging",x=e.getAttribute("drop-class")||"nojs-drag-over",y=e.getAttribute("drop-reject-class")||"nojs-drop-reject",E=e.getAttribute("drop-settle-class")||"nojs-drop-settle",j=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",u?"copy":"move");let k={listPath:o,ctx:n,el:e};Ue.set(e,k),pe(e,()=>Ue.delete(e));let L=0,w=null;function T(){let S=t.resolve(o,n);if(!Array.isArray(S))return;if(S===w&&S.length>0&&e.children.length>0){for(let W of e.children)W.__ctx&&W.__ctx.$notify&&W.__ctx.$notify();return}w=S;let P=i?document.getElementById(i):null;if(!P)return;let R=K(t,"disposeChildren");typeof R=="function"&&R(e),e.innerHTML="";let I=S.length;S.forEach((W,F)=>{let J={[s]:W,$index:F,$count:I,$first:F===0,$last:F===I-1,$even:F%2===0,$odd:F%2!==0},le=t.createContext(J,n),ft=P.content.cloneNode(!0),B=document.createElement("div");B.style.display="contents",B.__ctx=le,B.appendChild(ft),e.appendChild(B);let M=B.firstElementChild||B;M.draggable=!0,M.setAttribute("role","option"),M.setAttribute("aria-roledescription","draggable item"),M.getAttribute("tabindex")||M.setAttribute("tabindex","0");let ce=N=>{if(p&&t.evaluate(p,n)){N.preventDefault();return}_.dragging={item:W,type:d,effect:u?"copy":"move",sourceEl:B,sourceCtx:le,sourceList:S,sourceIndex:F,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:u,removeMode:f}},N.dataTransfer&&(N.dataTransfer.effectAllowed=u?"copy":"move",N.dataTransfer.setData("text/plain","")),h.split(/\s+/).filter(Boolean).forEach(ve=>M.classList.add(ve));let Z=M.getAttribute("aria-label")||M.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${Z}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:W,index:F,el:M}}))},he=()=>{h.split(/\s+/).filter(Boolean).forEach(N=>M.classList.remove(N)),_.dragging&&_.dragging.sourceEl===B&&(_.dragging=null),te()};B.addEventListener("dragstart",ce),B.addEventListener("dragend",he);let Ge=N=>{if(N.key===" "&&!_.dragging){N.preventDefault(),N.stopPropagation(),_.dragging={item:W,type:d,effect:u?"copy":"move",sourceEl:B,sourceCtx:le,sourceList:S,sourceIndex:F,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:u,removeMode:f}},h.split(/\s+/).filter(Boolean).forEach(ve=>M.classList.add(ve));let Z=M.getAttribute("aria-label")||M.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${Z}. Use arrow keys to reorder.`)}else if(N.key==="Escape"&&_.dragging){N.preventDefault(),N.stopPropagation();let Z=e.querySelector(`.${h.split(/\s+/)[0]}`)||M;h.split(/\s+/).filter(Boolean).forEach(ve=>Z.classList.remove(ve)),de("Reorder cancelled."),_.dragging=null,te()}else if((N.key==="ArrowDown"||N.key==="ArrowRight")&&_.dragging&&_.dragging.sourceEl===B){N.preventDefault();let Z=B.nextElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Re=[...e.children].filter(gt=>!gt.classList.contains("nojs-drop-placeholder")),mt=Re.indexOf(Z)+1;de(`Moved to position ${mt} of ${Re.length}.`)}}else if((N.key==="ArrowUp"||N.key==="ArrowLeft")&&_.dragging&&_.dragging.sourceEl===B){N.preventDefault();let Z=B.previousElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Re=[...e.children].filter(gt=>!gt.classList.contains("nojs-drop-placeholder")),mt=Re.indexOf(Z)+1;de(`Moved to position ${mt} of ${Re.length}.`)}}};B.addEventListener("keydown",Ge),B.__disposers=B.__disposers||[],B.__disposers.push(()=>B.removeEventListener("dragstart",ce),()=>B.removeEventListener("dragend",he),()=>B.removeEventListener("keydown",Ge)),t.processTree(B)});let $=S.length===0;j.split(/\s+/).filter(Boolean).forEach(W=>e.classList.toggle(W,$))}let A=S=>{if(!_.dragging||l&&t.evaluate(l,n))return;let P=ye(_.dragging.type,g),R=!0;if(b){let $=t.evaluate(b,n),W=t.resolve(o,n);typeof $=="number"&&Array.isArray(W)&&W.length>=$&&(R=!1)}if(!P||!R){y.split(/\s+/).filter(Boolean).forEach($=>e.classList.add($)),x.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),te();return}y.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect=u?"copy":"move");let I=Ke(e,S.clientX,S.clientY,a);v&&Wt(e,I,v,m)},q=S=>{if(_.dragging&&!(l&&t.evaluate(l,n))&&(L++,L===1)){let P=ye(_.dragging.type,g),R=!0;if(b){let I=t.evaluate(b,n),$=t.resolve(o,n);typeof I=="number"&&Array.isArray($)&&$.length>=I&&(R=!1)}P&&R?(x.split(/\s+/).filter(Boolean).forEach(I=>e.classList.add(I)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):y.split(/\s+/).filter(Boolean).forEach(I=>e.classList.add(I))}},V=()=>{_.dragging&&(L--,L<=0&&(L=0,x.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),y.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),te(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging?.item}}))))},X=S=>{if(S.preventDefault(),S.stopPropagation(),L=0,!_.dragging||l&&t.evaluate(l,n)||!ye(_.dragging.type,g))return;if(b){let B=t.evaluate(b,n),M=t.resolve(o,n);if(typeof B=="number"&&Array.isArray(M)&&M.length>=B)return}let P=_.dragging.item,R=_.dragging.listDirective,I=_.dragging.sourceIndex,$=Ke(e,S.clientX,S.clientY,a);x.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),y.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),te();let W=t.resolve(o,n);if(!Array.isArray(W))return;let F=R&&R.el===e;if(F&&I===$){_.dragging=null;return}if(F&&I+1===$){_.dragging=null;return}let J=[...W];if(F){let[B]=J.splice(I,1),M=I<$?$-1:$;J.splice(M,0,B),n.$set(o,J),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:J,item:P,from:I,to:M}}))}else{let B=u&&typeof P=="object"?{...P}:P;if(J.splice($,0,B),n.$set(o,J),R&&!R.copyMode&&(f||R.removeMode)){let M=t.resolve(R.listPath,R.ctx);if(Array.isArray(M)&&I!=null){let ce=M.filter((he,Ge)=>Ge!==I);R.ctx.$set(R.listPath,ce),R.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ce,item:P,index:I}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:J,item:P,from:I,fromList:R?t.resolve(R.listPath,R.ctx):null}}))}let le=_.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||_.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",ft=F&&I<$?$:$+1;de(`Dropped ${le} at position ${ft}.`),requestAnimationFrame(()=>{let M=[...e.children][F&&I<$?$-1:$];if(M){let ce=M.firstElementChild||M;E.split(/\s+/).filter(Boolean).forEach(he=>ce.classList.add(he)),ce.addEventListener("animationend",()=>{E.split(/\s+/).filter(Boolean).forEach(he=>ce.classList.remove(he))},{once:!0})}}),_.dragging=null},z=S=>{if(_.dragging&&ye(_.dragging.type,g)&&(S.key==="Enter"||S.key===" ")){S.preventDefault();let P=e.querySelector(":focus");if(P){let I=(P.style?.display==="contents"&&P.firstElementChild||P).getBoundingClientRect(),$={preventDefault(){},stopPropagation(){},clientX:I.left+I.width/2,clientY:I.top+I.height+1,dataTransfer:null};X($)}}};e.addEventListener("dragover",A),e.addEventListener("dragenter",q),e.addEventListener("dragleave",V),e.addEventListener("drop",X),e.addEventListener("keydown",z),pe(e,()=>{e.removeEventListener("dragover",A),e.removeEventListener("dragenter",q),e.removeEventListener("dragleave",V),e.removeEventListener("drop",X),e.removeEventListener("keydown",z)});let ne=n.$watch(T);pe(e,ne),T()}})}function Yt(t){Xe(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e);Me(e,o);let n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}_.selected.has(n)||_.selected.set(n,new Set);let c=_.selected.get(n),s=d=>{let g=e.getAttribute("drag"),f={item:g?t.evaluate(g,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let p=[...c].find(l=>l.el===e);p?(c.delete(p),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.remove(l))):(c.add(f),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l)))}else{for(let p of c)i.split(/\s+/).filter(Boolean).forEach(l=>p.el.classList.remove(l));c.clear(),c.add(f),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p))}};e.addEventListener("click",s),pe(e,()=>{e.removeEventListener("click",s);let d=[...c].find(g=>g.el===e);d&&c.delete(d)});let a=d=>{if(d.key==="Escape"){for(let g of c)i.split(/\s+/).filter(Boolean).forEach(u=>g.el.classList.remove(u));c.clear()}};window.addEventListener("keydown",a),pe(e,()=>window.removeEventListener("keydown",a))}})}var Kt=["drag","drop"];function ht(t,e={}){Nt(t),Gt(t),!ue(t)&&(Ut(t),Yt(t))}function Xt(){Ft()}var Zt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],vt=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ie(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var xe,rr,Qe,yt,xt,Qt,Ze,Et,Jt;function Ro(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function Mo(t){return(t.getAttribute("type")||"text").toLowerCase()}function zo(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(s=>s.trim());for(let s of c){let[a,...d]=s.split(":"),g=xe[a];if(g){let u=g(t.value,...d,e);u!==!0&&u&&(r.push({rule:a,message:u}),o.add(a))}else{let u=t.value,f=null;switch(a){case"required":(u==null||String(u).trim()==="")&&(f="Required");break;case"email":u&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)&&(f="Invalid email");break;case"url":try{new URL(u)}catch{f="Invalid URL"}break;case"min":Number(u)<Number(d[0])&&(f=`Minimum value is ${d[0]}`);break;case"max":Number(u)>Number(d[0])&&(f=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&xe[d[0]]){let p=xe[d[0]](u,e);p!==!0&&p&&(f=p)}break}f&&(r.push({rule:a,message:f}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[c,s]of Zt)if(i[c]){let a=s||Mo(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function Fo(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Oo(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=vt.indexOf(n.rule),s=vt.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:Fo(e,o.rule,o.message)}}function nr(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Vo(t,e,r,o,n){let i=nr(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;Et(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.setAttribute("aria-live","polite"),a.__errorTemplateFor=o;let d=Qe({$error:e,$rule:r},n);a.__ctx=d,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Ro(a),xt(a)}function er(t){let e=nr(t);e&&(Et(e),e.remove())}function Wo(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!rr(r,e)}catch{return!0}}function tr(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function No(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),s=xe[i];if(s){let a=s(t,...c,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&xe[c[0]]){let a=xe[c[0]](t,r);if(a!==!0&&a)return a}break}}return null}function Go(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return yt(t);let e=Qe({},null);return t.__ctx=e,e}function or(t){xe=K(t,"validators")||{},rr=t.evaluate,Qe=t.createContext,yt=t.findContext,xt=t.processTree,Qt=K(t,"cloneTemplate")||(()=>null),Ze=K(t,"disposeChildren")||(()=>{}),Et=K(t,"disposeTree")||Ze,Jt=K(t,"warn")||console.warn;let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):Jt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let f=function(){c&&typeof c.$notify=="function"&&c.$notify();let y=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;y.nextNode();){let j=y.currentNode.__ctx;j&&j!==c&&typeof j.$notify=="function"&&j.$notify()}},p=function(){return r.querySelectorAll("input, textarea, select")},l=function(){let y={},E={},j={},k=!0,L=null,w=0,T=!1;for(let A of p())A.name&&(A.type==="checkbox"?E[A.name]=A.checked:A.type==="radio"?A.checked?E[A.name]=A.value:A.name in E||(E[A.name]=""):E[A.name]=A.value);for(let A of p()){if(!A.name)continue;let q=a.has(A.name),V=d.has(A.name);if(!Wo(A,c)){j[A.name]={valid:!0,dirty:V,touched:q,error:null,value:E[A.name]};continue}let X=zo(A,E),z=Oo(X,A),ne=!z,S=tr(A,r),P=S.includes("input"),R=S.includes("blur")||S.includes("focusout")||S.includes("submit"),I;!A.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?I=q||V:I=P&&V||R&&q,ne||(k=!1),!ne&&I&&(y[A.name]=z.message,w++,L||(L=z.message)),j[A.name]={valid:ne,dirty:V,touched:q,error:z?z.message:null,value:E[A.name]},!ne&&I?A.setAttribute("aria-invalid","true"):A.removeAttribute("aria-invalid");let $=A.getAttribute("error-class")||s;if($){let F=$.split(/\s+/);!ne&&I?A.classList.add(...F):A.classList.remove(...F)}if(z&&I){let F=A.getAttribute(`error-${z.rule}`),J=A.getAttribute("error"),le=(F&&F.startsWith("#")?F:null)||(J&&J.startsWith("#")?J:null);le?Vo(le,z.message,z.rule,A,c):er(A)}else er(A);let W=A.getAttribute("as");W&&c.$set(W,j[A.name])}g.size>0&&(T=!0),u.valid=k,u.errors=y,u.values=E,u.fields=j,u.firstError=L,u.errorCount=w,u.pending=T,c.$set("$form",{...u}),f(),b(r)},b=function(y){let E=u.valid&&!u.pending&&!u.submitting,j=y.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let k of j){if(k.hasAttribute("disabled")&&k.getAttribute("disabled")!==""){let L=k.getAttribute("disabled");if(L!=="disabled"&&L!=="true"&&L!=="false")continue}k.disabled=!E,k.__autoDisabled=!0}},v=function(y){if(!y.name)return;let E=tr(y,r),j=()=>{d.add(y.name),u.dirty=!0,l()},k=()=>{a.add(y.name),u.touched=!0,l()};if(E.includes("input"))y.addEventListener("input",j),ie(r,()=>y.removeEventListener("input",j));else{let L=()=>{d.add(y.name),u.dirty=!0,l()};y.addEventListener("input",L),ie(r,()=>y.removeEventListener("input",L))}if(E.includes("blur")||E.includes("focusout")){let L=()=>{k(),E.includes("blur")&&j()};y.addEventListener("focusout",L),ie(r,()=>y.removeEventListener("focusout",L))}else y.addEventListener("focusout",k),ie(r,()=>y.removeEventListener("focusout",k));E.includes("submit")&&(y.addEventListener("focusout",k),ie(r,()=>y.removeEventListener("focusout",k)))},c=Go(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,d=new Set,g=new Map,u={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u.dirty=!1,u.touched=!1,u.pending=!1,u.submitting=!1,a.clear(),d.clear(),r.reset(),l()},endSubmit:()=>{u.submitting=!1,l()}};c.$set("$form",u);let m=r.hasAttribute("validate-on"),h=[...p()].some(y=>y.hasAttribute("validate-on"));if(!m&&!h){let y=j=>{let k=j.target;k&&k.name&&d.add(k.name),u.dirty=!0,l()};r.addEventListener("input",y),ie(r,()=>r.removeEventListener("input",y)),r.addEventListener("change",y),ie(r,()=>r.removeEventListener("change",y));let E=j=>{j.target&&j.target.name&&a.add(j.target.name),u.touched=!0,l()};r.addEventListener("focusout",E),ie(r,()=>r.removeEventListener("focusout",E))}else for(let y of p())v(y);let x=y=>{for(let E of p())E.name&&a.add(E.name);if(u.touched=!0,l(),!u.valid||u.pending){y.preventDefault(),y.stopImmediatePropagation();return}u.submitting=!0,b(r),c.$set("$form",{...u}),f()};r.addEventListener("submit",x,!0),ie(r,()=>r.removeEventListener("submit",x,!0)),r.__nojsResetSubmitting=()=>{u.submitting=!1,l()},ie(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(l);return}let i=yt(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),s=()=>{let a=No(r.value,n,{});if(a?r.setAttribute("aria-invalid","true"):r.removeAttribute("aria-invalid"),a&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let g=Qt(c);if(g){let u=Qe({err:{message:a}},i);Ze(d),d.innerHTML="",d.__ctx=u,d.appendChild(g),xt(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(Ze(d),d.innerHTML="")}};r.addEventListener("input",s),ie(r,()=>r.removeEventListener("input",s))}}})}function ir(t,e={}){or(t)}function sr(){}var ke=new Map,ee=new Map;function ar(){let t=Array.from(ke.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of ee.values())clearTimeout(e);ee.clear();for(let e of ke.values())e.remove();ke.clear()}function cr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Uo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Je=8;function lr(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+Je,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-Je;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+Je;break;default:s=o.top-n.height-Je,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Yo=0;function Ko(t,e,r){document.body.appendChild(e),lr(e,t,r),e.setAttribute("aria-hidden","false")}function dr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Xo(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function ur(t){t.directive("tooltip",{priority:20,init(e,r,o){cr();let n=o;if(!n){Xo(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),d=a?t.findContext(e):null,g=()=>{if(!a||!d)return!1;try{return!!t.evaluate(a,d)}catch{return!1}},u=`nojs-tooltip-${++Yo}`,f=document.createElement("div");f.className="nojs-tooltip",f.setAttribute("role","tooltip"),f.setAttribute("id",u),f.setAttribute("aria-hidden","true"),f.textContent=n,e.setAttribute("aria-describedby",u),ke.set(e,f);let p=!1,l=0,b=()=>{!p||!e.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!p||!e.isConnected)&&lr(f,e,i)}))},v=()=>{window.addEventListener("scroll",b,!0),window.addEventListener("resize",b)},m=()=>{window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),l&&(cancelAnimationFrame(l),l=0)},h=()=>{p||(Ko(e,f,i),p=!0,v())},x=()=>{if(!p){dr(e,f);return}m(),dr(e,f),p=!1},y=()=>{if(g())return;ee.has(e)&&clearTimeout(ee.get(e));let q=setTimeout(()=>{ee.delete(e),!g()&&e.isConnected&&h()},s);ee.set(e,q)},E=()=>{ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),x()},j=()=>y(),k=()=>E(),L=()=>y(),w=()=>E(),T=q=>{q.key==="Escape"&&f.getAttribute("aria-hidden")==="false"&&E()};e.addEventListener("mouseenter",j),e.addEventListener("mouseleave",k),e.addEventListener("focusin",L),e.addEventListener("focusout",w),e.addEventListener("keydown",T);let A=null;if(a&&d&&typeof d.$watch=="function"){let q=()=>{p&&g()&&x()};A=d.$watch(q)}Uo(e,()=>{e.removeEventListener("mouseenter",j),e.removeEventListener("mouseleave",k),e.removeEventListener("focusin",L),e.removeEventListener("focusout",w),e.removeEventListener("keydown",T),A&&(A(),A=null),m(),ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),p=!1,f.remove(),ke.delete(e)})}})}function pr(t,e={}){ur(t)}function fr(){ar()}var Y=new Map;function mr(){Y.clear()}function et(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function _t(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ce(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function wt(t){try{return t.matches(":popover-open")}catch{return!1}}var fe=8;function tt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-fe,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-fe;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+fe;break;default:s=o.bottom+fe,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-fe),r==="top"&&s<0&&(s=o.bottom+fe),r==="right"&&a+n.width>i&&(a=o.left-n.width-fe),r==="left"&&a<0&&(a=o.right+fe),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function At(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(!wt(c)){i();return}tt(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function Ee(t){t&&t._untrack&&t._untrack()}function gr(t){t.directive("popover",{priority:20,init(r,o,n){et();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=Y.get(i);a.popoverEl=r,a.position=c}let s=a=>{let d=Y.get(i);if(!d)return;let g=a.newState==="open";d.open=g;for(let u of d.triggerEls)u.setAttribute("aria-expanded",String(g));g||(r.style.visibility="",Ee(d))};r.addEventListener("toggle",s),_t(r,()=>{r.removeEventListener("toggle",s);let a=Y.get(i);a&&(Ee(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){et();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,d=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let c=a=>{let d=Y.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(Ce(d.popoverEl)){d.popoverEl.style.visibility="hidden";try{d.popoverEl.togglePopover(),wt(d.popoverEl)?(tt(d.popoverEl,r,d.position),At(d,r)):Ee(d)}finally{d.popoverEl.style.visibility=""}}};r.addEventListener("click",c);let s=a=>{let d=Y.get(i);a.key==="Escape"&&d?.open&&(Ce(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),Ee(d),r.focus())};document.addEventListener("keydown",s),_t(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=Y.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(Ee(a),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){et();let o=()=>{let n=r.closest(".nojs-popover");!n||!Ce(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),_t(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Ce(n.popoverEl,"showPopover"))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.showPopover();let i=o||[...n.triggerEls][0];i&&(tt(n.popoverEl,i,n.position),At(n,i))}catch{return!1}finally{n.popoverEl.style.visibility=""}return!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!Ce(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return Ee(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Ce(n.popoverEl))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];i&&wt(n.popoverEl)?(tt(n.popoverEl,i,n.position),At(n,i)):Ee(n)}finally{n.popoverEl.style.visibility=""}return!0},t.popover=e}function br(t,e={}){gr(t)}function hr(){mr()}var G=[],se=new Map,Zo=1e4;function vr(){return Zo+G.length}function yr(){G.length=0,se.clear()}function Se(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Qo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Er='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',jt=new WeakMap;function Jo(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(Er)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),jt.set(t,e)}function xr(t){let e=jt.get(t);e&&(t.removeEventListener("keydown",e),jt.delete(t))}var ze=new WeakMap;function _r(t){t.directive("modal",{priority:10,init(r,o,n){Se();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),g=f=>{f.target===r&&s!=="false"&&d!=="false"&&De(r,i)};r.addEventListener("click",g),se.set(i,r);let u=f=>{if(f.newState==="open"){if(r.style.zIndex=String(vr()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{if(!r.isConnected||!G.some(l=>l.el===r))return;let p=r.querySelector(Er);p?p.focus():r.focus()}),Jo(r),d!=="false"){let p=l=>{l.key==="Escape"&&(l.stopPropagation(),De(r,i))};r.addEventListener("keydown",p),ze.set(r,p)}}else if(f.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(b=>r.classList.remove(b)),xr(r);let p=ze.get(r);p&&(r.removeEventListener("keydown",p),ze.delete(r));let l=G.findIndex(b=>b.el===r);if(l===-1&&(l=G.findIndex(b=>b.id===i)),l!==-1){let b=G[l];G.splice(l,1),b.triggerEl&&requestAnimationFrame(()=>{b.triggerEl.focus()})}}};r.addEventListener("toggle",u),Qo(r,()=>{r.removeEventListener("click",g),r.removeEventListener("toggle",u),xr(r);let f=ze.get(r);f&&(r.removeEventListener("keydown",f),ze.delete(r)),se.delete(i);let p=G.findIndex(l=>l.el===r);p===-1&&(p=G.findIndex(l=>l.id===i)),p!==-1&&G.splice(p,1)})}});let e=r=>e.open(r);e.open=r=>{let o=se.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return G.some(n=>n.id===r)||G.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=se.get(r);return o?(De(o,r),!0):!1},e.closeAll=()=>{for(let r=G.length-1;r>=0;r--)De(G[r].el,G[r].id)},t.modal=e}function De(t,e){try{t.hidePopover()}catch{}}function Ar(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ei(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function wr(t){t.directive("modal-open",{priority:10,init(e,r,o){Se();let n=o;if(!n){let u=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(u&&(n=u.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let g=se.get(n)||ei(n);if(!g){console.warn(`[modal-open] modal "${n}" not found`);return}let u=G.some(f=>f.id===n);g.id&&e.setAttribute("aria-controls",g.id);try{g.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}u||G.push({id:n,el:g,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,d=()=>{let g=se.get(n);return g?(a=g,s=u=>{u.newState==="closed"&&e.setAttribute("aria-expanded","false")},g.addEventListener("toggle",s),!0):!1};if(!d()){let g=requestAnimationFrame(d);Ar(e,()=>cancelAnimationFrame(g))}e.addEventListener("click",i),Ar(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function ti(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function jr(t){t.directive("modal-close",{priority:10,init(e,r,o){Se();let n=()=>{let i,c;if(o){if(c=o,i=se.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}De(i,c)};e.addEventListener("click",n),ti(e,()=>{e.removeEventListener("click",n)})}})}function Lr(t,e={}){_r(t),wr(t),jr(t)}function kr(){yr()}var re={openMenus:new Map},O={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function Cr(){re.openMenus.clear(),O.installed=!1,O.instanceCount=0,O.outsideClickHandler=null,O.escHandler=null}function Te(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var ri=0;function ni(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function oi(){O.installed||(O.outsideClickHandler=t=>{let e=[...re.openMenus.entries()];for(let[r,{toggle:o,wrapper:n}]of e)if(!n.contains(t.target)){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}re.openMenus.delete(r)}},O.escHandler=t=>{if(t.key!=="Escape")return;let e=[...re.openMenus.entries()];for(let[r,{toggle:o}]of e){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}o.focus()}re.openMenus.clear()},document.addEventListener("click",O.outsideClickHandler,!0),document.addEventListener("keydown",O.escHandler),O.installed=!0)}function kt(){O.installed&&(document.removeEventListener("click",O.outsideClickHandler,!0),document.removeEventListener("keydown",O.escHandler),O.outsideClickHandler=null,O.escHandler=null,O.installed=!1)}function Sr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,d,g;switch(o){case"top":d=i.top-c.height,g=i.left;break;case"left":d=i.top,g=i.left-c.width;break;case"right":d=i.top,g=i.right;break;default:d=i.bottom,g=i.left}o==="bottom"||o==="top"?n==="end"&&(g=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>s&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=s&&(d=i.bottom),g<4&&(g=4),g+c.width>a-4&&(g=a-c.width-4),t.style.top=`${d}px`,t.style.left=`${g}px`}function Ct(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Lt(t){let e=Ct(t);e.length&&e[0].focus()}function Dr(t){let e=Ct(t);e.length&&e[e.length-1].focus()}function Tr(t){t.directive("dropdown",{priority:15,init(r){Te()}}),t.directive("dropdown-toggle",{priority:15,init(r){Te();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${ri++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Sr(n,r,o),re.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),re.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let g=b=>{b.newState==="closed"&&d()&&a()};n.addEventListener("toggle",g);let u=b=>{b.preventDefault(),b.stopPropagation(),d()?a():s()};r.addEventListener("click",u),O.instanceCount++,oi();let f=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),Lt(n);break;case"ArrowDown":b.preventDefault(),s(),Lt(n);break;case"ArrowUp":b.preventDefault(),s(),Dr(n);break}};r.addEventListener("keydown",f);let p=b=>{if(!(!d()||Ct(n).find(h=>h===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),Lt(n);break;case"ArrowUp":b.preventDefault(),Dr(n);break}};n.addEventListener("keydown",p);let l=()=>{d()&&Sr(n,r,o)};window.addEventListener("scroll",l,!0),window.addEventListener("resize",l),ni(r,()=>{r.removeEventListener("click",u),r.removeEventListener("keydown",f),n.removeEventListener("keydown",p),n.removeEventListener("toggle",g),window.removeEventListener("scroll",l,!0),window.removeEventListener("resize",l),re.openMenus.delete(n),O.instanceCount--,O.instanceCount<=0&&(O.instanceCount=0,kt())})}}),t.directive("dropdown-menu",{priority:15,init(r){Te(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function Ir(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ii(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function St(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),re.openMenus.has(t)&&re.openMenus.delete(t)}function Br(t){t.directive("dropdown-item",{priority:15,init(e){Te();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=ii(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),St(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{St(r,o);break}}};e.addEventListener("keydown",n),Ir(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(St(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),Ir(e,()=>e.removeEventListener("click",i))}})}function Hr(t,e={}){Tr(t),Br(t)}function $r(){kt(),Cr()}var ae=new Map,Ie=new Set,qr=0;function Pr(){return++qr}function Rr(){for(let t of Ie)clearTimeout(t);Ie.clear();for(let t of ae.values())t.remove();ae.clear(),qr=0}function Mr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Dt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var si=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Tt(){return ae.size>0?ae.values().next().value:ai("top-right")}function ai(t){if(ae.has(t))return ae.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ae.set(t,e),e}function ci(t){return t.startsWith("top")}function It(t,e,r,o,n){let i=Pr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>rt(s)),s.appendChild(d)}if(ci(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let d=setTimeout(()=>{Ie.delete(d),s.isConnected&&rt(s)},o);Ie.add(d),s._toastTimerId=d}return s}function rt(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Ie.delete(t._toastTimerId)),t.remove())}function zr(t){Mr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&si.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ae.set(i,r),Dt(r,()=>{ae.get(i)===r&&ae.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let b=Tt();It(b,n,i,s,a)};r.addEventListener("click",l),Dt(r,()=>r.removeEventListener("click",l));return}let g=t.findContext(r);if(!g||typeof g.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let u;function f(){let l=t.evaluate(n,g);if(l&&l!==u){let b=typeof l=="string"?l:String(l),v=Tt();It(v,b,i,s,a),u=l}else u=l}let p=g.$watch(f);Dt(r,p)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=Tt();return It(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&rt(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>rt(r))},t.toast=e,t.global("toast",e)}function Fr(t,e={}){zr(t)}function Or(){Rr()}var _e={containers:new Map};function Vr(){_e.containers.clear()}function Wr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function di(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var li=0;function Nr(t){return`${t}-${++li}`}function Fe(t,e,r=!1){let o=_e.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Oe(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Gr(t){t.directive("tabs",{priority:10,init(e,r,o){Wr();let n=[],i=[];for(let m of Array.from(e.children))m.hasAttribute("tab")?n.push(m):m.hasAttribute("panel")&&i.push(m);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let m=0;m<a;m++){let h=n[m],x=i[m],y=h.id||Nr("nojs-tab"),E=x.id||Nr("nojs-panel");h.id=y,x.id=E,h.setAttribute("role","tab"),h.setAttribute("aria-selected","false"),h.setAttribute("aria-controls",E),h.setAttribute("tabindex","-1"),h.classList.add("nojs-tab"),x.setAttribute("role","tabpanel"),x.setAttribute("aria-labelledby",y),x.setAttribute("tabindex","0"),x.setAttribute("aria-hidden","true"),x.inert=!0,x.classList.add("nojs-panel"),s.appendChild(h)}for(let m=a;m<i.length;m++){let h=i[m];h.setAttribute("role","tabpanel"),h.setAttribute("aria-hidden","true"),h.inert=!0,h.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),_e.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let g=t.findContext(e),u=[],f=(m,h)=>{let x=!1;try{x=!!t.evaluate(h,g)}catch{x=!1}x?m.setAttribute("aria-disabled","true"):m.removeAttribute("aria-disabled")};for(let m=0;m<a;m++){let h=n[m],x=h.getAttribute("tab-disabled");if(x&&(f(h,x),g&&typeof g.$watch=="function")){let y=g.$watch(()=>f(h,x));u.push(y)}}let p=0;if(o&&o.trim()!==""){let m=parseInt(o,10);!isNaN(m)&&m>=0&&m<a&&(p=m)}let l=n.slice(0,a);if(n[p]?.getAttribute("aria-disabled")==="true"){let m=Oe(l,p,1);m!==-1?(p=m,Fe(e,p)):Fe(e,p,!0)}else Fe(e,p);let b=m=>{let h=_e.containers.get(e);if(!h)return;let x=m.target;if(x.getAttribute("role")!=="tab")return;let{tabs:y}=h,E=y.indexOf(x);if(E===-1)return;let j=-1;switch(m.key){case"ArrowRight":case"ArrowDown":j=Oe(y,E,1);break;case"ArrowLeft":case"ArrowUp":j=Oe(y,E,-1);break;case"Home":j=Oe(y,y.length-1,1);break;case"End":j=Oe(y,0,-1);break;case"Tab":return;default:return}j!==-1&&j!==E&&(m.preventDefault(),Fe(e,j),y[j].focus())};s.addEventListener("keydown",b);let v=m=>{let h=m.target.closest("[role='tab']");if(!h)return;let x=_e.containers.get(e);if(!x)return;let y=x.tabs.indexOf(h);y!==-1&&h.getAttribute("aria-disabled")!=="true"&&(Fe(e,y),h.focus())};s.addEventListener("click",v),di(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",v);for(let m of u)m&&m();u.length=0,_e.containers.delete(e)})}})}function Ur(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Yr(t){t.directive("panel",{priority:11,init(){}})}function Kr(t,e={}){Gr(t),Ur(t),Yr(t)}function Xr(){Vr()}var H={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Zr(){H.branches.clear(),H.selectedItem=null,H.typeahead="",H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null)}function Be(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function He(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Jr(t){return t.closest('[role="tree"]')}function ui(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function pi(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function Bt(t){let e=H.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),H.selectedItem=t}function en(t){let e=H.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function fi(t){let e=H.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function mi(t){let e=H.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function tn(t,e){let r=Jr(e);if(!r)return;let o=Qr(r),n=o.indexOf(e);if(n<0)return;let i=H.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)fi(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&Ae(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)mi(e);else{let s=ui(e);s&&Ae(s,Qr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&Ae(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&Ae(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),Bt(e),c&&en(e);break;case"Home":t.preventDefault(),o.length>0&&Ae(o[0],o);break;case"End":t.preventDefault(),o.length>0&&Ae(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),H.typeahead+=t.key.toLowerCase(),H.typeaheadTimer&&clearTimeout(H.typeaheadTimer),H.typeaheadTimer=setTimeout(()=>{H.typeahead="",H.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let d=(s+a)%o.length;if(pi(o[d]).startsWith(H.typeahead)){Ae(o[d],o);break}}}break}}function rn(t){t.directive("tree",{priority:15,init(e){Be(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function nn(t){t.directive("branch",{priority:16,init(e,r,o){Be();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Jr(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(H.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):H.branches.set(e,{expanded:n,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),Bt(e),en(e))};e.addEventListener("click",s),He(e,()=>e.removeEventListener("click",s));let a=d=>{tn(d,e)};e.addEventListener("keydown",a),He(e,()=>e.removeEventListener("keydown",a)),He(e,()=>{c=!0,H.branches.delete(e),H.selectedItem===e&&(H.selectedItem=null),H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null,H.typeahead="")})}})}function Ae(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function on(t){t.directive("subtree",{priority:16,init(e){Be(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),Bt(o)};o.addEventListener("click",n),He(o,()=>o.removeEventListener("click",n));let i=c=>{tn(c,o)};o.addEventListener("keydown",i),He(o,()=>o.removeEventListener("keydown",i)),He(o,()=>{H.selectedItem===o&&(H.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=H.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function sn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ht(t){return t.closest('[role="treeitem"]')}function gi(t){return t.closest('[role="tree"]')}function bi(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function hi(t){return bi(t).indexOf(t)}function vi(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function an(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function $e(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function Ve(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function yi(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function xi(t,e){$e();let r=yi(),o=t.getBoundingClientRect(),n=gi(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function cn(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(Be(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=f=>{let p=Ht(f.target);if(p&&e.contains(p)){if(p.hasAttribute("tree-drag-disabled")){f.preventDefault();return}D.dragging={el:p,treeRoot:e},f.dataTransfer&&(f.dataTransfer.effectAllowed="move",f.dataTransfer.setData("text/plain","")),p.classList.add("nojs-dragging"),p.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:p}}))}},c=f=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let p=Ht(f.target);if(!p||!e.contains(p)||p===D.dragging.el||an(p,D.dragging.el))return;f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move");let l=vi(p,f.clientY,o);(D.currentTarget!==p||D.currentPosition!==l)&&(Ve(e),$e(),D.currentTarget=p,D.currentPosition=l,l==="on"?p.classList.add("nojs-tree-drag-over"):xi(p,l))},s=f=>{D.dragging&&D.dragging.treeRoot===e&&n++},a=f=>{D.dragging&&(n--,n<=0&&(n=0,Ve(e),$e(),D.currentTarget=null,D.currentPosition=null))},d=f=>{if(f.preventDefault(),f.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let p=D.dragging.el,l=D.currentTarget,b=D.currentPosition;if(Ve(e),$e(),!l||!b){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(l===p||an(l,p)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(b==="on"){let v=l.querySelector(':scope > [role="group"]');v||(v=l.nextElementSibling?.matches?.('[role="group"]')?l.nextElementSibling:null),v?v.setAttribute("aria-hidden","false"):(v=document.createElement("ul"),v.setAttribute("role","group"),v.setAttribute("subtree",""),v.classList.add("nojs-subtree","nojs-tree"),v.setAttribute("aria-hidden","false"),l.appendChild(v));let m=H.branches.get(l);m&&(m.expanded=!0,m.subtreeEl=v,l.setAttribute("aria-expanded","true")),v.appendChild(p),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:p,newParent:l}}))}else{let v=l.parentElement;if(!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(b==="before")v.insertBefore(p,l);else{let h=l.nextElementSibling,x=h?.matches?.('[role="group"]')?h.nextElementSibling:h;x?v.insertBefore(p,x):v.appendChild(p)}let m=hi(p);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:p,newIndex:m}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},g=f=>{let p=Ht(f.target);p&&p.classList.remove("nojs-dragging"),Ve(e),$e(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",d),e.addEventListener("dragend",g),sn(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",d),e.removeEventListener("dragend",g),Ve(e),$e()}),Ei(e);let u=new MutationObserver(f=>{for(let p of f)for(let l of p.addedNodes){if(l.nodeType!==1)continue;l.getAttribute("role")==="treeitem"&&$t(l);let b=l.querySelectorAll?.('[role="treeitem"]');if(b)for(let v of b)$t(v)}});u.observe(e,{childList:!0,subtree:!0}),sn(e,()=>u.disconnect())}})}function $t(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function Ei(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)$t(r)}function dn(t,e={}){rn(t),nn(t),on(t),cn(t)}function ln(){Zr()}var nt=new Map;function un(){nt.clear()}function ot(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function pn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function fn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function mn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function We(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function gn(t){t.directive("stepper",{priority:14,init(e,r,o){ot();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",g=e.getAttribute("aria-label")||"Stepper",u=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",g),e.classList.add("nojs-stepper");let f=null,p=[];if(a){f=document.createElement("div"),f.className="nojs-stepper-indicator",f.setAttribute("role","tablist"),f.setAttribute("aria-label","Progress"),i.forEach((w,T)=>{if(T>0){let z=document.createElement("div");z.className="nojs-stepper-separator",z.setAttribute("aria-hidden","true"),f.appendChild(z)}let A=document.createElement("button");A.type="button",A.className="nojs-stepper-indicator-item",A.setAttribute("role","tab"),A.setAttribute("aria-selected",T===u?"true":"false");let q=w.getAttribute("step-label")||`Step ${T+1}`,V=document.createElement("span");V.textContent=q,A.appendChild(V),A.setAttribute("aria-label",q);let X=`nojs-stepper-tab-${_i++}`;if(A.id=X,s==="free"){A.setAttribute("data-clickable","");let z=()=>E(T);A.addEventListener("click",z),We(e,()=>A.removeEventListener("click",z))}else A.setAttribute("tabindex","-1");f.appendChild(A),p.push(A)});let L=w=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(w.key))return;w.preventDefault();let T=u;w.key==="ArrowRight"?T=Math.min(u+1,i.length-1):w.key==="ArrowLeft"?T=Math.max(u-1,0):w.key==="Home"?T=0:w.key==="End"&&(T=i.length-1),s==="free"?(E(T),p[T]?.focus()):p[u]?.focus()};f.addEventListener("keydown",L),We(e,()=>f.removeEventListener("keydown",L)),e.insertBefore(f,e.firstChild)}let l=null,b=null,v=null;if(d){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-prev",b.textContent="Previous";let L=()=>y();b.addEventListener("click",L),We(e,()=>b.removeEventListener("click",L)),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-next",v.textContent="Next";let w=()=>x();v.addEventListener("click",w),We(e,()=>v.removeEventListener("click",w)),l.appendChild(b),l.appendChild(v),e.appendChild(l)}function m(L){let w=i[L];if(!w)return!0;if(!pn(w,t.findContext)){let q=w.querySelector("form[validate]");return q&&(fn(q),p[L]&&p[L].classList.add("nojs-step-invalid"),mn(e,w,q)),!1}p[L]&&p[L].classList.remove("nojs-step-invalid");let T=w.querySelectorAll("[required]");for(let q of T)if(typeof q.checkValidity=="function"&&!q.checkValidity())return q.reportValidity(),!1;let A=w.getAttribute("step-validate");if(A)try{if(!t.evaluate(A,n))return!1}catch(q){return console.warn(`[stepper] step-validate error: ${q.message}`),!1}return!0}function h(L){if(i.forEach((w,T)=>{let A=T===u;w.setAttribute("aria-hidden",A?"false":"true"),A?(w.removeAttribute("inert"),w.setAttribute("aria-current","step")):(w.setAttribute("inert",""),w.removeAttribute("aria-current"))}),p.length&&p.forEach((w,T)=>{w.setAttribute("aria-selected",T===u?"true":"false"),T<u?w.setAttribute("data-completed",""):w.removeAttribute("data-completed"),w.setAttribute("tabindex",T===u?"0":"-1");let A=i[T];A.id&&(w.setAttribute("aria-controls",A.id),A.setAttribute("aria-labelledby",w.id))}),b&&(b.disabled=u===0),v&&(v.textContent=u===i.length-1?"Finish":"Next"),!L){let w=i[u];w&&requestAnimationFrame(()=>w.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!L,detail:{current:u,total:i.length}}))}function x(){return u>=i.length-1?(s==="linear"&&!m(u)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:u,total:i.length}})),!1):s==="linear"&&!m(u)?!1:(u++,h(),k(),!0)}function y(){return u<=0?!1:(u--,h(),k(),!0)}function E(L){if(L<0||L>=i.length||L===u)return!1;if(s==="linear"&&L>u){for(let w=u;w<L;w++)if(u=w,h(),!m(w))return k(),!1}return u=L,h(),k(),!0}let j={get current(){return u},get total(){return i.length},next:x,prev:y,goTo:E,get isFirst(){return u===0},get isLast(){return u===i.length-1}};function k(){n.$stepper=j}k(),nt.set(e,{get current(){return u},steps:i,mode:s,indicatorEl:f,navEl:l}),h(!0),We(e,()=>{nt.delete(e),f&&f.parentNode&&f.remove(),l&&l.parentNode&&l.remove(),delete n.$stepper})}})}var _i=0;var Ai=0;function bn(t){t.directive("step",{priority:13,init(e,r,o){ot(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Ai++}`),e.setAttribute("tabindex","0")}})}function hn(t,e={}){bn(t),gn(t)}function vn(){un()}function yn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function xn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function En(t){t.directive("skeleton",{priority:10,init(e,r,o){yn();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function d(m){g();for(let h=0;h<m;h++){let x=document.createElement("div");x.className="nojs-skeleton-line",e.appendChild(x),a.push(x)}}function g(){for(let m of a)m.parentNode===e&&e.removeChild(m);a=[]}function u(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let m=s+(String(s).match(/\d$/)?"px":"");e.style.width=m,e.style.height=m}if(c){let m=parseInt(c,10);m>0&&d(m)}e.setAttribute("aria-busy","true")}let f=null;function p(){f&&f(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let m=!1,h=null,x=()=>{m||(m=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",x),h!==null&&clearTimeout(h),f=null)};e.addEventListener("transitionend",x),h=setTimeout(x,0),f=()=>{e.removeEventListener("transitionend",x),h!==null&&clearTimeout(h),m=!0,f=null}}let l=!1;function b(){let m=!!t.evaluate(o,n);m&&!l?(l=!0,u()):!m&&l&&(l=!1,p())}b();let v=n.$watch(b);xn(e,v),xn(e,()=>{f&&f(),l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function _n(t,e={}){En(t)}var we=new Map,U=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function An(){we.clear(),U.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function wi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function wn(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function jn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function ji(t,e){let o=(we.get(t)?.gutters||[]).reduce((n,i)=>n+Q(i,e),0);return Q(t,e)-o}function Li(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Ne(t,e){let r=U.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function st(t,e,r,o){let n=Q(e,o),i=Q(r,o),c=U.get(e),s=U.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function qt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=we.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function ki(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=we.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function Ci(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=p=>{if(p.button!==0)return;p.preventDefault();let l=ji(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=p[wn(e)],C.startPrevSize=Q(r,e),C.startNextSize=Q(o,e),C.containerSize=l,C.sign=jn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(p.pointerId)},s=p=>{if(!C.active||C.gutterEl!==i)return;let l=(p[wn(C.direction)]-C.startPos)*(C.sign||1),b=Ne(C.startPrevSize+l,C.prevPane),v=Ne(C.startNextSize-l,C.nextPane),m=C.startPrevSize+C.startNextSize;b+v!==m&&(b!==C.startPrevSize+l?v=m-b:b=m-v),C.prevPane.style.flexBasis=`${b}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${v}px`,C.nextPane.style.flexGrow="0",st(i,C.prevPane,C.nextPane,C.direction)},a=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",qt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let d=10,g=p=>{let l=e==="horizontal",b=jn(t,e),v=0;if(l&&p.key==="ArrowRight"||!l&&p.key==="ArrowDown")v=d*b;else if(l&&p.key==="ArrowLeft"||!l&&p.key==="ArrowUp")v=-d*b;else if(p.key==="Home")v=(U.get(r)?.min||0)-Q(r,e);else if(p.key==="End"){let j=U.get(o);v=Q(r,e)+Q(o,e)-(j?.min||0)-Q(r,e)}else return;p.preventDefault();let m=Q(r,e),h=Q(o,e),x=m+h,y=Ne(m+v,r),E=Ne(x-y,o);y=x-E,y=Ne(y,r),E=x-y,r.style.flexBasis=`${y}px`,r.style.flexGrow="0",o.style.flexBasis=`${E}px`,o.style.flexGrow="0",st(i,r,o,e),qt(t)};i.addEventListener("keydown",g);let u=()=>{let p=U.get(r),l=U.get(o),b=p?.collapsible?r:l?.collapsible?o:null;if(!b)return;let v=U.get(b);if(!v)return;let m=b===r?o:r,h=Q(r,e)+Q(o,e);if(v.collapsed){v.collapsed=!1,b.removeAttribute("data-collapsed");let x=v.preCollapseSize||`${Math.round(h/2)}px`,y=Li(x,h)??h/2,E=Math.min(y,h);b.style.flexBasis=`${E}px`,b.style.flexGrow="0",m.style.flexBasis=`${h-E}px`,m.style.flexGrow="0"}else v.preCollapseSize=b.style.flexBasis||`${Q(b,e)}px`,v.collapsed=!0,b.setAttribute("data-collapsed","true"),b.style.flexBasis="0px",b.style.flexGrow="0",m.style.flexBasis=`${h}px`,m.style.flexGrow="0";st(i,r,o,e),qt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:b,collapsed:v.collapsed}}))};return i.addEventListener("dblclick",u),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",g),i.removeEventListener("dblclick",u)}}}function Ln(t){t.directive("split",{priority:14,init(e,r,o){it();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(g=>g.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(g=>{U.get(g)||U.set(g,{size:g.getAttribute("pane")||null,min:parseInt(g.getAttribute("pane-min"),10)||0,max:parseInt(g.getAttribute("pane-max"),10)||1/0,collapsible:g.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let g=0;g<c.length-1;g++){let{gutter:u,cleanup:f}=Ci(e,n,c[g],c[g+1],i);c[g].after(u),s.push(u),a.push(f)}we.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),ki(e)||c.forEach(g=>{let f=U.get(g)?.size;f?(g.style.flexBasis=f,g.style.flexGrow="0"):(g.style.flexGrow="1",g.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((g,u)=>{st(g,c[u],c[u+1],n)})}),wi(e,()=>{a.forEach(g=>g()),s.forEach(g=>g.remove()),we.delete(e),c.forEach(g=>U.delete(g)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Si(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function kn(t){t.directive("pane",{priority:15,init(e,r,o){it(),e.classList.add("nojs-pane"),U.has(e)||U.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=U.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Si(e,()=>{e.classList.remove("nojs-pane"),U.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function Cn(t,e={}){Ln(t),kn(t)}function Sn(){An()}var me={sorts:new Map};function Dn(){me.sorts.clear()}function je(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Di(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ti(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Ii(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Tn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function In(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function Hn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return In(Number(t),Number(e));case"date":return In(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Bi(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function $n(t){t.directive("sortable",{priority:10,init(e){je(),e.classList.add("nojs-sortable")}})}function qn(t){t.directive("sort",{priority:11,init(e,r,o){je();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;me.sorts.has(s)||me.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(me.sorts.get(s).column||Bn(e,s,n,i,c,t));let a=()=>{let g=me.sorts.get(s),u;g.column!==n?u="asc":g.direction==="asc"?u="desc":g.direction==="desc"?u=null:u="asc",Bn(e,s,n,i,u,t)},d=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),a())};e.addEventListener("click",a),e.addEventListener("keydown",d),Di(e,()=>{e.removeEventListener("click",a),e.removeEventListener("keydown",d),s&&!s.isConnected&&(me.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Bn(t,e,r,o,n,i){let c=me.sorts.get(e);Bi(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=Ti(e,i);if(s){let a=i.findContext(e),d=a?Ii(a,s.arrayPath):null;if(Array.isArray(d)){if(!n){let u=e._nojsOriginalOrder;if(u){let f=new Set(d),p=u.filter(l=>f.has(l));for(let l of d)u.includes(l)||p.push(l);Tn(a,s.arrayPath,p)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let g=[...d].sort((u,f)=>{let p=u!=null?u[r]:null,l=f!=null?f[r]:null,b=Hn(p,l,o);return n==="desc"?-b:b});Tn(a,s.arrayPath,g);return}}Hi(e,t,r,o,n)}function Hi(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let f=document.createDocumentFragment();for(let p of t._nojsOriginalRows)f.appendChild(p);i.appendChild(f);return}let g=f=>{let p=f.replace(/[^0-9.\-]/g,"");return p===""||p==="-"?NaN:parseFloat(p)};d.sort((f,p)=>{let l=f.children[a]?.textContent?.trim()||"",b=p.children[a]?.textContent?.trim()||"",v=Hn(o==="number"?g(l):l,o==="number"?g(b):b,o);return n==="desc"?-v:v});let u=document.createDocumentFragment();for(let f of d)u.appendChild(f);i.appendChild(u)}function Pn(t){t.directive("fixed-header",{priority:10,init(e){je(),e.classList.add("nojs-fixed-header")}})}function Rn(t){t.directive("fixed-col",{priority:10,init(e){je(),e.classList.add("nojs-fixed-col")}})}function Pt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Mn(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function zn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Fn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function On(t){t.directive("table-reorder",{priority:15,init(e){if(je(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,d=null;function g(){let v=r.querySelectorAll(":scope > tr");for(let m=0;m<v.length;m++){let h=v[m];if(h._nojsReorderSetup)continue;h._nojsReorderSetup=!0,h.draggable=!0,h.setAttribute("aria-roledescription","draggable row");let x=!0;if(n){let w=T=>{x=!!T.target.closest(n)};h.addEventListener("mousedown",w),Pt(h,()=>h.removeEventListener("mousedown",w))}let y=w=>{if(n&&!x){w.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(h),a=h,w.dataTransfer&&(w.dataTransfer.effectAllowed="move",w.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(A=>h.classList.add(A))},E=w=>{if(a==null)return;w.preventDefault(),w.dataTransfer&&(w.dataTransfer.dropEffect="move");let T=h.getBoundingClientRect(),A=T.top+T.height/2,V=[...r.querySelectorAll(":scope > tr")].indexOf(h);u(),V!==s&&(w.clientY<A?h.classList.add("nojs-reorder-insert-before"):h.classList.add("nojs-reorder-insert-after"),d=h)},j=()=>{h.classList.remove("nojs-reorder-insert-before"),h.classList.remove("nojs-reorder-insert-after"),d===h&&(d=null)},k=w=>{if(w.preventDefault(),w.stopPropagation(),a==null||s==null)return;let T=[...r.querySelectorAll(":scope > tr")],A=h.getBoundingClientRect(),q=A.top+A.height/2,V=T.indexOf(h);w.clientY>=q&&V++;let X=s;if(X===V||X+1===V){f();return}let z=X<V?V-1:V,ne=Mn(e);if(ne&&o){let S=zn(o,ne.arrayPath);if(Array.isArray(S)){let P=[...S],[R]=P.splice(X,1);P.splice(z,0,R),Fn(o,ne.arrayPath,P),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...P]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:z,item:R}}))}}else{let S=a,P=T[z];S&&P&&(X<z?r.insertBefore(S,P.nextSibling):r.insertBefore(S,P),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:z,item:null}})))}f()},L=()=>{f()};h.addEventListener("dragstart",y),h.addEventListener("dragover",E),h.addEventListener("dragleave",j),h.addEventListener("drop",k),h.addEventListener("dragend",L),Pt(h,()=>{h.removeEventListener("dragstart",y),h.removeEventListener("dragover",E),h.removeEventListener("dragleave",j),h.removeEventListener("drop",k),h.removeEventListener("dragend",L),h._nojsReorderSetup=!1})}}function u(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function f(){a&&i.split(/\s+/).filter(Boolean).forEach(m=>a.classList.remove(m)),u(),s=null,a=null;let v=r.querySelectorAll(":scope > tr");for(let m of v)m.classList.remove("nojs-reorder-insert-before"),m.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(h=>m.classList.remove(h))}let p=v=>{a!=null&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"))},l=v=>{if(a==null||v.target!==r)return;v.preventDefault(),v.stopPropagation();let m=s,x=[...r.querySelectorAll(":scope > tr")].length-1;if(m===x){f();return}let y=Mn(e);if(y&&o){let E=zn(o,y.arrayPath);if(Array.isArray(E)){let j=[...E],[k]=j.splice(m,1);j.push(k),Fn(o,y.arrayPath,j),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...j]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:m,to:j.length-1,item:k}}))}}f()};r.addEventListener("dragover",p),r.addEventListener("drop",l);let b=new MutationObserver(()=>{g()});b.observe(r,{childList:!0}),g(),Pt(e,()=>{b.disconnect(),r.removeEventListener("dragover",p),r.removeEventListener("drop",l),f()})}})}function Vn(t,e={}){$n(t),qn(t),Pn(t),Rn(t),On(t)}function Wn(){Dn()}var ge={containers:new Map};function Nn(){for(let[,t]of ge.containers)typeof t.unsub=="function"&&t.unsub();ge.containers.clear()}function Gn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Un(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $i(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function qi(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Yn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=c.label,s.appendChild(d)}else{let d=document.createElement("a");d.href=c.href,d.textContent=c.label,s.appendChild(d)}o.appendChild(s)}t.appendChild(o);let n=ge.containers.get(t);n&&(n.crumbs=e)}function Pi(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=$i(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function Ri(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=qi(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function Kn(t){t.directive("breadcrumb",{priority:15,init(e,r,o){Gn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(ge.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,d=a?a.path:"/",g=Ri(d);Yn(e,g)};if(s(),typeof i.on=="function"){let a=i.on(s),d=ge.containers.get(e);d&&(d.unsub=a),Un(e,()=>{typeof a=="function"&&a();let g=ge.containers.get(e);g&&(g.unsub=null)})}}else{let s=Pi(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");Yn(e,s)}Un(e,()=>{ge.containers.delete(e)})}})}function Xn(t,e={}){Kn(t)}function Zn(){Nn()}var at={containers:new Map};function Qn(){at.containers.clear()}function Jn(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Mi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ct=null;function zi(){return ct!==null||(ct=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),ct}function eo(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function Fi(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function ro(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function to(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");ro(t,r)}else t.open=!1}function dt(t,e,r,o){let n=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function qe(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function no(t){t.directive("accordion",{priority:10,init(e,r,o){Jn();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!zi();e.setAttribute("role","group");let c=qe(e);if(c.length===0)return;if(i)for(let f of c)eo(f);let s=[],a=new MutationObserver(f=>{for(let p of f)for(let l of p.addedNodes)l.nodeType!==1||l.tagName!=="DETAILS"||l.parentElement===e&&g(l)});a.observe(e,{childList:!0});let d=0,g=f=>{i&&eo(f);let p=f.querySelector(":scope > summary");if(p){let v=`nojs-accordion-panel-${Date.now()}-${d++}`,m=f.querySelector(":scope > .nojs-accordion-content");m?(m.id=m.id||v,m.setAttribute("role","region"),v=m.id):(f.id||(f.id=v),v=f.id),p.setAttribute("aria-expanded",f.open?"true":"false"),p.setAttribute("aria-controls",v)}let l=v=>{let m=qe(e),h=m.indexOf(f),x=f.querySelector(":scope > summary");if(x&&x.setAttribute("aria-expanded",f.open?"true":"false"),f.open){if(n==="single")for(let y of m)y!==f&&y.open&&to(y,i);dt(e,f,!0,h)}else dt(e,f,!1,h)},b=null;if(i){let v=f.querySelector(":scope > summary");v&&(b=m=>{m.preventDefault();let h=f.querySelector(":scope > .nojs-accordion-content");if(f.open)ro(f,h),v.setAttribute("aria-expanded","false"),dt(e,f,!1,qe(e).indexOf(f));else{if(n==="single"){let x=qe(e);for(let y of x)if(y!==f&&y.open){to(y,!0);let E=y.querySelector(":scope > summary");E&&E.setAttribute("aria-expanded","false")}}Fi(f,h),v.setAttribute("aria-expanded","true"),dt(e,f,!0,qe(e).indexOf(f))}},v.addEventListener("click",b))}f.addEventListener("toggle",l),s.push({details:f,toggleHandler:l,clickHandler:b})};for(let f of c)g(f);let u=f=>{let p=f.target;if(p.tagName!=="SUMMARY")return;let l=p.parentElement;if(!l||l.parentElement!==e)return;let v=qe(e).map(x=>x.querySelector(":scope > summary")).filter(Boolean),m=v.indexOf(p);if(m===-1)return;let h=-1;switch(f.key){case"ArrowDown":case"ArrowRight":h=(m+1)%v.length;break;case"ArrowUp":case"ArrowLeft":h=(m-1+v.length)%v.length;break;case"Home":h=0;break;case"End":h=v.length-1;break;default:return}h!==-1&&h!==m&&(f.preventDefault(),v[h].focus())};e.addEventListener("keydown",u),at.containers.set(e,{mode:n,listeners:s,observer:a}),Mi(e,()=>{e.removeEventListener("keydown",u),a.disconnect();for(let f of s)if(f.details.removeEventListener("toggle",f.toggleHandler),f.clickHandler){let p=f.details.querySelector(":scope > summary");p&&p.removeEventListener("click",f.clickHandler)}s.length=0,at.containers.delete(e)})}})}function oo(t,e={}){no(t)}function io(){Qn()}var Pe=new Map;function so(){let t=Array.from(Pe.keys());for(let e of t){let r=Pe.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}Pe.clear()}function ao(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Oi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Vi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=Wi(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function Wi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Ni(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function co(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function lt(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Gi(t,e){return t*e}function uo(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function po(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function lo(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function ut(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function Ui(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return po(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function Yi(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return po(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function Ki(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=Ui(t,e),n=Yi(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function Rt(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:s}=Ki(t,n,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=ut(t,c),d=t.itemHeight!=="auto"?Gi(t.totalItems,t.itemHeight):lo(t),g=s>=0?ut(t,s+1):0,u=Math.max(0,d-g);lt(t.spacerTop,a),lt(t.spacerBottom,u);let f=new Set;for(let l=c;l<=s;l++)f.add(l);for(let[l,b]of t.renderedNodes)f.has(l)||(b.remove(),t.renderedNodes.delete(l));let p=[];for(let l=c;l<=s;l++){if(t.renderedNodes.has(l))continue;let b=t.dataArray[l];if(b===void 0)continue;let v=t.template.cloneNode(!0),m={};m[t.iteratorVar]=b,m.$index=l,m.$count=t.totalItems,m.$first=l===0,m.$last=l===t.totalItems-1,m.$even=l%2===0,m.$odd=l%2!==0,v.setAttribute("role","option"),v.setAttribute("aria-setsize",String(t.totalItems)),v.setAttribute("aria-posinset",String(l+1)),v.setAttribute("tabindex","-1"),v.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(m)),v.__declared=!1,p.push({index:l,node:v}),t.renderedNodes.set(l,v)}if(p.length>0){p.sort((l,b)=>l.index-b.index);for(let{index:l,node:b}of p){let v=null;for(let[m,h]of t.renderedNodes)m>l&&h.parentNode===r&&(!v||m<Xi(v,t))&&(v=h);v||(v=t.spacerBottom),r.insertBefore(b,v);try{e.processTree&&e.processTree(b)}catch{}}}if(t.itemHeight==="auto"){let l=!1;for(let[b,v]of t.renderedNodes){let m=v.offsetHeight||v.getBoundingClientRect().height;m>0&&t.heights[b]!==m&&(t.heights[b]=m,l=!0)}if(l){uo(t);let b=lo(t),v=ut(t,c),m=s>=0?ut(t,s+1):0,h=Math.max(0,b-m);lt(t.spacerTop,v),lt(t.spacerBottom,h)}}}function Xi(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function Zi(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&uo(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,Rt(t,r)}function fo(t){t.directive("virtual",{priority:10,init(e,r,o){ao(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=Vi(e),d=null;if(a)d=a.eachEl;else for(let E of e.children)if(!E.classList.contains("nojs-virtual-spacer")){d=E;break}if(!d){console.warn("[virtual] No child template found.");return}let g=d.cloneNode(!0);for(g.removeAttribute("each"),g.removeAttribute("foreach"),g.removeAttribute("for"),g.__declared=!1,g.__disposers=null,g.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let u=co(e),f=co(e);e.appendChild(u),e.appendChild(f);let p={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:g,spacerTop:u,spacerBottom:f,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};Pe.set(e,p);let l=E=>{let j=[...e.querySelectorAll('[role="option"]')];if(!j.length)return;let k=e.querySelector('[role="option"]:focus'),L=k?j.indexOf(k):-1,w=-1;switch(E.key){case"ArrowDown":E.preventDefault(),w=L<j.length-1?L+1:L;break;case"ArrowUp":E.preventDefault(),w=L>0?L-1:0;break;case"Home":E.preventDefault(),w=0;break;case"End":E.preventDefault(),w=j.length-1;break;default:return}w>=0&&w<j.length&&j[w].focus()};e.addEventListener("keydown",l);let b=null,v=()=>{b||(b=requestAnimationFrame(()=>{b=null,Rt(p,t)}))};if(p.scrollHandler=v,e.addEventListener("scroll",v,{passive:!0}),typeof ResizeObserver<"u"){let E=new ResizeObserver(()=>{p.dirty=!0,Rt(p,t)});E.observe(e),p.resizeObserver=E}let m=null,h=-1,x=null,y=()=>{if(!p.disposed){if(p.arrayPath){let E=t.findContext?t.findContext(e):null;if(E){let j=Ni(E,p.arrayPath);Array.isArray(j)&&(j!==m||j.length!==h)&&(m=j,h=j.length,Zi(p,j,t))}}x=setTimeout(y,100)}};x=setTimeout(y,100),Oi(e,()=>{p.disposed=!0,b&&(cancelAnimationFrame(b),b=null),x&&(clearTimeout(x),x=null),e.removeEventListener("scroll",v),e.removeEventListener("keydown",l),p.resizeObserver&&(p.resizeObserver.disconnect(),p.resizeObserver=null);for(let[E,j]of p.renderedNodes){if(j.__disposers){for(let k of j.__disposers)try{k()}catch{}j.__disposers=null}j.remove()}p.renderedNodes.clear(),p.spacerTop&&p.spacerTop.parentNode&&p.spacerTop.remove(),p.spacerBottom&&p.spacerBottom.parentNode&&p.spacerBottom.remove(),Pe.delete(e)})}})}function mo(t,e={}){fo(t)}function go(){so()}var be=new Map,pt=new Map;function bo(){for(let[t,e]of be){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}be.clear(),pt.clear()}function ho(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function Qi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ji(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function es(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function ts(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function rs(){return document.documentElement}function ns(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function vo(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function Mt(t){let e=be.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let u of a)u.isIntersecting?n.add(u.target.id):n.delete(u.target.id);let d=null,g=1/0;for(let u of n){let f=document.getElementById(u);if(!f)continue;let p=f.getBoundingClientRect();p.top<g&&(g=p.top,d=u)}for(let u of e.spyEntries)vo(u.el);if(d){for(let u of e.spyEntries)if(u.targetId===d){ns(u.el),e.activeEl=u.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let d=document.getElementById(a.targetId);d&&(c.observe(d),s.add(a.targetId))}e.observer=c}function os(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function yo(t){t.directive("spy",{priority:20,init(e,r,o){ho();let n=Ji(e);if(!n){e.tagName!=="A"&&os(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=es(e),c=ts(e),s=rs();be.has(s)||be.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=be.get(s),d={el:e,targetId:n};a.spyEntries.push(d),pt.set(e,s),Mt(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{Mt(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),Qi(e,()=>{let g=a.spyEntries.indexOf(d);g!==-1&&a.spyEntries.splice(g,1),pt.delete(e),vo(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),be.delete(s)):Mt(s)})}})}function xo(t,e={}){yo(t)}function Eo(){bo()}var zt="it is a DOM element; client mechanics never send DOM nodes",_o={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:zt},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:zt},fixed:{list:null}},$el:{unavailable:zt}}}};var is="[validate],[drag],[drop],[drag-list],[drag-multiple]";function Ao(t){if(typeof document>"u")return;let e=document.querySelectorAll(is);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;let o=K(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var wo=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],ss=["validate","drag-list","drag-multiple",...wo].filter(t=>!Kt.includes(t));function as(t,e){ht(t,e);for(let r of ss)t.directive(r,{priority:30,init(o,n){n.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}var cs={name:"nojs-elements",contract:{directives:{..._o}},install(t,e={}){if(ue(t)){as(t,e);return}ht(t,e),ir(t,e),pr(t,e),br(t,e),Lr(t,e),Hr(t,e),Fr(t,e),Kr(t,e),dn(t,e),hn(t,e),_n(t,e),Cn(t,e),Vn(t,e),Xn(t,e),oo(t,e),mo(t,e),xo(t,e),Ao(t)},init(t){if(ue(t)||(Ao(t),typeof document>"u"||!document.body))return;let e=wo.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Xt(),sr(),fr(),hr(),kr(),$r(),Or(),Xr(),ln(),vn(),Sn(),Wn(),Zn(),io(),go(),Eo()}},ds=cs;
//# sourceMappingURL=nojs-elements.js.map
