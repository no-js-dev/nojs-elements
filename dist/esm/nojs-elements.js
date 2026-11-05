/**
 * NoJS Elements v1.22.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
var _={dragging:null,selected:new Map,placeholder:null},Ye=new Map;function Ft(){_.dragging=null,_.selected.clear(),_.placeholder&&(_.placeholder.remove(),_.placeholder=null),Ye.clear()}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function ze(t,e){t.__nojsElBoundCtx=e}function de(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Ze(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function le(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ke(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ke(r):e++}return e}function Xe(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function Wt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",_.dragging&&_.dragging.sourceEl){let s=(_.dragging.sourceEl.firstElementChild||_.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),_.placeholder=n}function re(){_.placeholder&&(_.placeholder.remove(),_.placeholder=null)}function xe(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function Co(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let m=a-1;m>=0;m--){let f=document.createElement("div"),p=m*4;if(f.style.cssText="position:absolute;top:"+p+"px;left:"+p+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",m===0){let u=o.cloneNode(!0);for(;u.firstChild;)f.appendChild(u.firstChild);f.style.background=s.backgroundColor||"#fff",f.style.border=s.border,f.style.padding=s.padding,f.style.fontSize=s.fontSize,f.style.color=s.color,f.style.fontFamily=s.fontFamily}else f.style.background=s.backgroundColor||"#fff",f.style.border=s.border||"1px solid #ddd";r.appendChild(f)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var oe=null;function So(){return oe&&oe.isConnected?oe:typeof document>"u"||!document.body?null:(oe=document.createElement("div"),oe.setAttribute("aria-live","assertive"),oe.setAttribute("aria-atomic","true"),oe.setAttribute("role","status"),oe.className="nojs-dnd-live-region",oe.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(oe),oe)}function ce(t){let e=So();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Nt(t){if(de(t)){t.directive("drag",{priority:15,init(e,r){ke(),Ot(e,To(e,r))}});return}Ze(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){ke(),Ot(e,Do(t,e,o))}})}function Do(t,e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drag-disabled");return{ctx:o,value:()=>t.evaluate(r,o),disabled:()=>n?t.evaluate(n,o):!1,watchDisabled:i=>le(e,o.$watch(i)),onDispose:i=>le(e,i)}}function To(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function Ot(t,e){let r=t.getAttribute("drag-type")||"default",o=t.getAttribute("drag-effect")||"move",n=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),c=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),a=t.getAttribute("drag-class")||"nojs-dragging",d=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let m=!0;if(n){let l=b=>{m=!!b.target.closest(n)};t.addEventListener("mousedown",l),e.onDispose(()=>t.removeEventListener("mousedown",l))}let f=l=>{if(n&&!m){l.preventDefault();return}if(s&&e.disabled()){l.preventDefault();return}let b=e.value(),h=t.getAttribute("drag-group"),g=b;if(h&&_.selected.has(h)){let y=_.selected.get(h);y.size>0&&[...y].some(j=>j.el===t)&&(g=[...y].map(j=>j.item))}if(_.dragging={item:g,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},l.dataTransfer){if(l.dataTransfer.effectAllowed=o,l.dataTransfer.setData("text/plain",""),Array.isArray(g)&&g.length>1&&l.dataTransfer.setDragImage){let y=Co(t,g.length);document.body.appendChild(y);let x=t.getBoundingClientRect();l.dataTransfer.setDragImage(y,x.width/2,x.height/2),requestAnimationFrame(()=>y.remove())}else if(i&&l.dataTransfer.setDragImage)if(i==="none"){let y=document.createElement("div");y.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(y);let[x,j]=c.split(",").map(Number);l.dataTransfer.setDragImage(y,x||0,j||0),requestAnimationFrame(()=>y.remove())}else{let y=t.querySelector(i);if(y){let[x,j]=c.split(",").map(Number);d&&y.classList.add(d),l.dataTransfer.setDragImage(y,x||0,j||0)}}}if(a.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),Array.isArray(g)&&h&&_.selected.has(h))for(let y of _.selected.get(h))y.el!==t&&a.split(/\s+/).filter(Boolean).forEach(x=>y.el.classList.add(x));let v=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${v}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:g,index:_.dragging.sourceIndex,el:t}}))},p=()=>{a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b));let l=t.getAttribute("drag-group");if(l&&_.selected.has(l))for(let b of _.selected.get(l))a.split(/\s+/).filter(Boolean).forEach(h=>b.el.classList.remove(h));if(d&&i&&i!=="none"){let b=t.querySelector(i);b&&b.classList.remove(d)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:_.dragging?.item,index:_.dragging?.sourceIndex,dropped:_.dragging===null}})),_.dragging=null,re()};if(t.addEventListener("dragstart",f),t.addEventListener("dragend",p),e.onDispose(()=>{t.removeEventListener("dragstart",f),t.removeEventListener("dragend",p)}),s){let l=function(){let b=!!e.disabled();t.draggable=!b,b?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(l)}let u=l=>{if(_.dragging&&!_.dragging.sourceEl.isConnected&&(_.dragging=null),l.key===" "&&!_.dragging){l.preventDefault();let b=e.value();_.dragging={item:b,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},a.split(/\s+/).filter(Boolean).forEach(g=>t.classList.add(g));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:t}}))}else l.key==="Escape"&&_.dragging&&_.dragging.sourceEl===t&&(l.preventDefault(),a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),ce("Drag cancelled."),_.dragging=null,re())};t.addEventListener("keydown",u),e.onDispose(()=>t.removeEventListener("keydown",u))}function Ut(t){if(de(t)){t.directive("drop",{priority:15,init(e,r){ke(),Vt(e,Bo(e,r)),Ho(e,r)}});return}Ze(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){ke(),Vt(e,Io(t,e,o))}})}function Io(t,e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>n?t.evaluate(n,o):!1,max:()=>i?t.evaluate(i,o):void 0,run(c){let s=X(t,"execStatement");typeof s=="function"?s(r,o,c):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:c=>le(e,c)}}function Bo(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function Ho(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",o=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),o.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),_.placeholder&&t.contains(_.placeholder)&&re()})}function Vt(t,e){let r=t.getAttribute("drop-accept")||"default",o=t.getAttribute("drop-effect")||"move",n=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",c=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),a=t.getAttribute("drop-sort"),d=t.getAttribute("drop-placeholder"),m=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",o);let f=0,p=g=>{if(!_.dragging||c&&e.disabled())return;let v=xe(_.dragging.type,r),y=!0;if(s){let x=e.max(),j=Ke(t);typeof x=="number"&&j>=x&&(y=!1)}if(!v||!y){i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),n.split(/\s+/).filter(Boolean).forEach(x=>t.classList.remove(x)),re();return}if(i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.remove(x)),g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect=o),a){let x=Xe(t,g.clientX,g.clientY,a);d&&Wt(t,x,d,m),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:_.dragging.item,index:x}}))}},u=g=>{if(_.dragging&&!(c&&e.disabled())&&(f++,f===1)){let v=xe(_.dragging.type,r),y=!0;if(s){let x=e.max(),j=Ke(t);typeof x=="number"&&j>=x&&(y=!1)}v&&y?(n.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x))}},l=g=>{_.dragging&&(f--,f<=0&&(f=0,n.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),i.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),re(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging.item}}))))},b=g=>{if(g.preventDefault(),g.stopPropagation(),f=0,!_.dragging||c&&e.disabled()||!xe(_.dragging.type,r))return;if(s){let L=e.max(),w=Ke(t);if(typeof L=="number"&&w>=L)return}let v=_.dragging.item,y=_.dragging.type,x=_.dragging.effect,j=0;a&&(j=Xe(t,g.clientX,g.clientY,a)),n.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),i.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),re();let E={$drag:v,$dragType:y,$dragEffect:x,$dropIndex:j,$source:{list:_.dragging.sourceList,index:_.dragging.sourceIndex,el:_.dragging.sourceEl},$target:{list:null,index:j,el:t},$el:t};e.run(E),_.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:v,index:j,source:E.$source,target:E.$target,effect:x}}))},h=g=>{_.dragging&&(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b(g))};t.addEventListener("dragover",p),t.addEventListener("dragenter",u),t.addEventListener("dragleave",l),t.addEventListener("drop",b),t.addEventListener("keydown",h),e.onDispose(()=>{t.removeEventListener("dragover",p),t.removeEventListener("dragenter",u),t.removeEventListener("dragleave",l),t.removeEventListener("drop",b),t.removeEventListener("keydown",h)})}function Gt(t){Ze(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){ke();let n=t.findContext(e);ze(e,n);let i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,m=e.getAttribute("drop-accept")||d,f=e.hasAttribute("drag-list-copy"),p=e.hasAttribute("drag-list-remove"),u=e.getAttribute("drag-disabled"),l=e.getAttribute("drop-disabled"),b=e.getAttribute("drop-max"),h=e.getAttribute("drop-placeholder"),g=e.getAttribute("drop-placeholder-class"),v=e.getAttribute("drag-class")||"nojs-dragging",y=e.getAttribute("drop-class")||"nojs-drag-over",x=e.getAttribute("drop-reject-class")||"nojs-drop-reject",j=e.getAttribute("drop-settle-class")||"nojs-drop-settle",E=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",f?"copy":"move");let L={listPath:o,ctx:n,el:e};Ye.set(e,L),le(e,()=>Ye.delete(e));let w=0,A=null;function C(){let S=t.resolve(o,n);if(!Array.isArray(S))return;if(S===A&&S.length>0&&e.children.length>0){for(let F of e.children)F.__ctx&&F.__ctx.$notify&&F.__ctx.$notify();return}A=S;let $=i?document.getElementById(i):null;if(!$)return;let M=X(t,"disposeChildren");typeof M=="function"&&M(e),e.innerHTML="";let R=S.length;S.forEach((F,K)=>{let ee={[s]:F,$index:K,$count:R,$first:K===0,$last:K===R-1,$even:K%2===0,$odd:K%2!==0},te=t.createContext(ee,n),he=$.content.cloneNode(!0),B=document.createElement("div");B.style.display="contents",B.__ctx=te,B.appendChild(he),e.appendChild(B);let z=B.firstElementChild||B;z.draggable=!0,z.setAttribute("role","option"),z.setAttribute("aria-roledescription","draggable item"),z.getAttribute("tabindex")||z.setAttribute("tabindex","0");let ae=W=>{if(u&&t.evaluate(u,n)){W.preventDefault();return}_.dragging={item:F,type:d,effect:f?"copy":"move",sourceEl:B,sourceCtx:te,sourceList:S,sourceIndex:K,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:f,removeMode:p}},W.dataTransfer&&(W.dataTransfer.effectAllowed=f?"copy":"move",W.dataTransfer.setData("text/plain","")),v.split(/\s+/).filter(Boolean).forEach(ye=>z.classList.add(ye));let Z=z.getAttribute("aria-label")||z.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${Z}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:F,index:K,el:z}}))},ve=()=>{v.split(/\s+/).filter(Boolean).forEach(W=>z.classList.remove(W)),_.dragging&&_.dragging.sourceEl===B&&(_.dragging=null),re()};B.addEventListener("dragstart",ae),B.addEventListener("dragend",ve);let Ge=W=>{if(W.key===" "&&!_.dragging){W.preventDefault(),W.stopPropagation(),_.dragging={item:F,type:d,effect:f?"copy":"move",sourceEl:B,sourceCtx:te,sourceList:S,sourceIndex:K,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:f,removeMode:p}},v.split(/\s+/).filter(Boolean).forEach(ye=>z.classList.add(ye));let Z=z.getAttribute("aria-label")||z.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${Z}. Use arrow keys to reorder.`)}else if(W.key==="Escape"&&_.dragging){W.preventDefault(),W.stopPropagation();let Z=e.querySelector(`.${v.split(/\s+/)[0]}`)||z;v.split(/\s+/).filter(Boolean).forEach(ye=>Z.classList.remove(ye)),ce("Reorder cancelled."),_.dragging=null,re()}else if((W.key==="ArrowDown"||W.key==="ArrowRight")&&_.dragging&&_.dragging.sourceEl===B){W.preventDefault();let Z=B.nextElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Re=[...e.children].filter(bt=>!bt.classList.contains("nojs-drop-placeholder")),gt=Re.indexOf(Z)+1;ce(`Moved to position ${gt} of ${Re.length}.`)}}else if((W.key==="ArrowUp"||W.key==="ArrowLeft")&&_.dragging&&_.dragging.sourceEl===B){W.preventDefault();let Z=B.previousElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Re=[...e.children].filter(bt=>!bt.classList.contains("nojs-drop-placeholder")),gt=Re.indexOf(Z)+1;ce(`Moved to position ${gt} of ${Re.length}.`)}}};B.addEventListener("keydown",Ge),B.__disposers=B.__disposers||[],B.__disposers.push(()=>B.removeEventListener("dragstart",ae),()=>B.removeEventListener("dragend",ve),()=>B.removeEventListener("keydown",Ge)),t.processTree(B)});let q=S.length===0;E.split(/\s+/).filter(Boolean).forEach(F=>e.classList.toggle(F,q))}let D=S=>{if(!_.dragging||l&&t.evaluate(l,n))return;let $=xe(_.dragging.type,m),M=!0;if(b){let q=t.evaluate(b,n),F=t.resolve(o,n);typeof q=="number"&&Array.isArray(F)&&F.length>=q&&(M=!1)}if(!$||!M){x.split(/\s+/).filter(Boolean).forEach(q=>e.classList.add(q)),y.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),re();return}x.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect=f?"copy":"move");let R=Xe(e,S.clientX,S.clientY,a);h&&Wt(e,R,h,g)},H=S=>{if(_.dragging&&!(l&&t.evaluate(l,n))&&(w++,w===1)){let $=xe(_.dragging.type,m),M=!0;if(b){let R=t.evaluate(b,n),q=t.resolve(o,n);typeof R=="number"&&Array.isArray(q)&&q.length>=R&&(M=!1)}$&&M?(y.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):x.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R))}},k=()=>{_.dragging&&(w--,w<=0&&(w=0,y.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),x.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),re(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging?.item}}))))},G=S=>{if(S.preventDefault(),S.stopPropagation(),w=0,!_.dragging||l&&t.evaluate(l,n)||!xe(_.dragging.type,m))return;if(b){let B=t.evaluate(b,n),z=t.resolve(o,n);if(typeof B=="number"&&Array.isArray(z)&&z.length>=B)return}let $=_.dragging.item,M=_.dragging.listDirective,R=_.dragging.sourceIndex,q=Xe(e,S.clientX,S.clientY,a);y.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),x.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),re();let F=t.resolve(o,n);if(!Array.isArray(F))return;let K=M&&M.el===e;if(K&&R===q){_.dragging=null;return}if(K&&R+1===q){_.dragging=null;return}let ee=[...F];if(K){let[B]=ee.splice(R,1),z=R<q?q-1:q;ee.splice(z,0,B),n.$set(o,ee),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:ee,item:$,from:R,to:z}}))}else{let B=f&&typeof $=="object"?{...$}:$;if(ee.splice(q,0,B),n.$set(o,ee),M&&!M.copyMode&&(p||M.removeMode)){let z=t.resolve(M.listPath,M.ctx);if(Array.isArray(z)&&R!=null){let ae=z.filter((ve,Ge)=>Ge!==R);M.ctx.$set(M.listPath,ae),M.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ae,item:$,index:R}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:ee,item:$,from:R,fromList:M?t.resolve(M.listPath,M.ctx):null}}))}let te=_.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||_.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",he=K&&R<q?q:q+1;ce(`Dropped ${te} at position ${he}.`),requestAnimationFrame(()=>{let z=[...e.children][K&&R<q?q-1:q];if(z){let ae=z.firstElementChild||z;j.split(/\s+/).filter(Boolean).forEach(ve=>ae.classList.add(ve)),ae.addEventListener("animationend",()=>{j.split(/\s+/).filter(Boolean).forEach(ve=>ae.classList.remove(ve))},{once:!0})}}),_.dragging=null},V=S=>{if(_.dragging&&xe(_.dragging.type,m)&&(S.key==="Enter"||S.key===" ")){S.preventDefault();let $=e.querySelector(":focus");if($){let R=($.style?.display==="contents"&&$.firstElementChild||$).getBoundingClientRect(),q={preventDefault(){},stopPropagation(){},clientX:R.left+R.width/2,clientY:R.top+R.height+1,dataTransfer:null};G(q)}}};e.addEventListener("dragover",D),e.addEventListener("dragenter",H),e.addEventListener("dragleave",k),e.addEventListener("drop",G),e.addEventListener("keydown",V),le(e,()=>{e.removeEventListener("dragover",D),e.removeEventListener("dragenter",H),e.removeEventListener("dragleave",k),e.removeEventListener("drop",G),e.removeEventListener("keydown",V)});let be=n.$watch(C);le(e,be),C()}})}function Yt(t){Ze(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e);ze(e,o);let n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}_.selected.has(n)||_.selected.set(n,new Set);let c=_.selected.get(n),s=d=>{let m=e.getAttribute("drag"),p={item:m?t.evaluate(m,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let u=[...c].find(l=>l.el===e);u?(c.delete(u),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.remove(l))):(c.add(p),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l)))}else{for(let u of c)i.split(/\s+/).filter(Boolean).forEach(l=>u.el.classList.remove(l));c.clear(),c.add(p),i.split(/\s+/).filter(Boolean).forEach(u=>e.classList.add(u))}};e.addEventListener("click",s),le(e,()=>{e.removeEventListener("click",s);let d=[...c].find(m=>m.el===e);d&&c.delete(d)});let a=d=>{if(d.key==="Escape"){for(let m of c)i.split(/\s+/).filter(Boolean).forEach(f=>m.el.classList.remove(f));c.clear()}};window.addEventListener("keydown",a),le(e,()=>window.removeEventListener("keydown",a))}})}var Kt=["drag","drop"];function ht(t,e={}){Nt(t),Ut(t),!de(t)&&(Gt(t),Yt(t))}function Xt(){Ft()}var Zt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],vt=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ue(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ee,rr,Je,et,yt,Qt,Qe,Et,Jt,xt;function $o(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function Po(t){return(t.getAttribute("type")||"text").toLowerCase()}var nr=new Set(["url","min","max"]);function or(t){return t==null||String(t).trim()===""}function ir(t){return(t.hasAttribute("validate-empty")?t.getAttribute("validate-empty"):t.closest("form[validate]")?.getAttribute("validate-empty"))==="skip"}function qo(t,e){let r=[],o=new Set,n=or(t.value)&&ir(t),i=t.getAttribute("validate");if(i){let s=i.split("|").map(a=>a.trim());for(let a of s){let[d,...m]=a.split(":"),f=Ee[d];if(f){let p=f(t.value,...m,e);p!==!0&&p&&(r.push({rule:d,message:p}),o.add(d))}else{if(n&&nr.has(d))continue;let p=t.value,u=null;switch(d){case"required":(p==null||String(p).trim()==="")&&(u="Required");break;case"email":p&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p)&&(u="Invalid email");break;case"url":try{new URL(p)}catch{u="Invalid URL"}break;case"min":Number(p)<Number(m[0])&&(u=`Minimum value is ${m[0]}`);break;case"max":Number(p)>Number(m[0])&&(u=`Maximum value is ${m[0]}`);break;case"custom":if(m[0]&&Ee[m[0]]){let l=Ee[m[0]](p,e);l!==!0&&l&&(u=l)}break}u&&(r.push({rule:d,message:u}),o.add(d))}}}let c=t.validity;if(c&&!c.valid){for(let[s,a]of Zt)if(c[s]){let d=a||Po(t);o.has(d)||(r.push({rule:d,message:t.validationMessage}),o.add(d))}}return r}function Mo(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Ro(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=vt.indexOf(n.rule),s=vt.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:Mo(e,o.rule,o.message)}}function sr(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function zo(t,e,r,o,n){let i=sr(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;Et(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.setAttribute("aria-live","polite"),a.__errorTemplateFor=o;let d=Je({$error:e,$rule:r,err:{message:e}},n);a.__ctx=d,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),$o(a),yt(a)}function er(t){let e=sr(t);e&&(Et(e),e.remove())}function Fo(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!rr(r,e)}catch{return!0}}function tr(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function Oo(t){return t.hasAttribute("model")?t.tagName==="SELECT"||t.type==="checkbox"||t.type==="radio"?"change":"input":null}function Vo(t,e){return()=>{let r=t.getAttribute("model"),o=t.__gatedDirs&&t.__gatedDirs.some(n=>n.name==="model");if(r&&!o&&xt&&(t.type!=="radio"||t.checked)){let n=t.type==="checkbox"?t.checked:t.value;xt(`${r} = __val`,et(t),{__val:n})}e()}}function Wo(t,e,r,o=!1){let n=o&&or(t),i=e.split("|").map(c=>c.trim());for(let c of i){let[s,...a]=c.split(":"),d=Ee[s];if(d){let m=d(t,...a,r);if(m!==!0&&m)return m}else{if(n&&nr.has(s))continue;switch(s){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(a[0]))return`Minimum value is ${a[0]}`;break;case"max":if(Number(t)>Number(a[0]))return`Maximum value is ${a[0]}`;break;case"custom":if(a[0]&&Ee[a[0]]){let m=Ee[a[0]](t,r);if(m!==!0&&m)return m}break}}}return null}function No(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return et(t);let e=Je({},null);return t.__ctx=e,e}function ar(t){Ee=X(t,"validators")||{},rr=t.evaluate,Je=t.createContext,et=t.findContext,yt=t.processTree,Qt=X(t,"cloneTemplate")||(()=>null),Qe=X(t,"disposeChildren")||(()=>{}),Et=X(t,"disposeTree")||Qe,Jt=X(t,"warn")||console.warn,xt=X(t,"execStatement");let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):Jt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let p=function(){c&&typeof c.$notify=="function"&&c.$notify();let E=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;E.nextNode();){let w=E.currentNode.__ctx;w&&w!==c&&typeof w.$notify=="function"&&w.$notify()}},u=function(){return r.querySelectorAll("input, textarea, select")},l=function(){let E={},L={},w={},A=!0,C=null,D=0,H=!1;for(let k of u())k.name&&(k.type==="checkbox"?L[k.name]=k.checked:k.type==="radio"?k.checked?L[k.name]=k.value:k.name in L||(L[k.name]=""):L[k.name]=k.value);for(let k of u()){if(!k.name)continue;let G=a.has(k.name),V=d.has(k.name);if(!Fo(k,c)){w[k.name]={valid:!0,dirty:V,touched:G,error:null,value:L[k.name]};continue}let be=qo(k,L),S=Ro(be,k),$=!S,M=tr(k,r),R=M.includes("input"),q=M.includes("blur")||M.includes("focusout")||M.includes("submit"),F;!k.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?F=G||V:F=R&&V||q&&G,$||(A=!1),!$&&F&&(E[k.name]=S.message,D++,C||(C=S.message)),w[k.name]={valid:$,dirty:V,touched:G,error:S?S.message:null,value:L[k.name]},!$&&F?k.setAttribute("aria-invalid","true"):k.removeAttribute("aria-invalid");let K=k.getAttribute("error-class")||s;if(K){let te=K.split(/\s+/);!$&&F?k.classList.add(...te):k.classList.remove(...te)}if(S&&F){let te=k.getAttribute(`error-${S.rule}`),he=k.getAttribute("error"),B=(te&&te.startsWith("#")?te:null)||(he&&he.startsWith("#")?he:null);B?zo(B,S.message,S.rule,k,c):er(k)}else er(k);let ee=k.getAttribute("as");ee&&c.$set(ee,w[k.name])}m.size>0&&(H=!0),f.valid=A,f.errors=E,f.values=L,f.fields=w,f.firstError=C,f.errorCount=D,f.pending=H,c.$set("$form",{...f}),p(),b(r)},b=function(E){let L=f.valid&&!f.pending&&!f.submitting,w=E.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let A of w){if(A.hasAttribute("disabled")&&A.getAttribute("disabled")!==""){let C=A.getAttribute("disabled");if(C!=="disabled"&&C!=="true"&&C!=="false")continue}A.disabled=!L,A.__autoDisabled=!0}},g=function(E,L,w){E.addEventListener(L,w),ue(r,()=>E.removeEventListener(L,w))},v=function(E){if(!E.name)return;let L=tr(E,r),w=Oo(E),A=H=>{if(w==="change"){g(E,"input",Vo(E,H));return}g(E,"input",H),w&&h.push([E,"input",H])},C=()=>{d.add(E.name),f.dirty=!0,l()},D=()=>{a.add(E.name),f.touched=!0,l()};L.includes("input")?A(C):A(()=>{d.add(E.name),f.dirty=!0,l()}),L.includes("blur")||L.includes("focusout")?g(E,"focusout",()=>{D(),L.includes("blur")&&C()}):g(E,"focusout",D),L.includes("submit")&&g(E,"focusout",D)},c=No(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,d=new Set,m=new Map,f={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{f.dirty=!1,f.touched=!1,f.pending=!1,f.submitting=!1,a.clear(),d.clear(),r.reset(),l()},endSubmit:()=>{f.submitting=!1,l()}};c.$set("$form",f);let h=[],y=r.hasAttribute("validate-on"),x=[...u()].some(E=>E.hasAttribute("validate-on"));if(!y&&!x){let E=w=>{let A=w.target;A&&A.name&&d.add(A.name),f.dirty=!0,l()};r.addEventListener("input",E),ue(r,()=>r.removeEventListener("input",E)),r.addEventListener("change",E),ue(r,()=>r.removeEventListener("change",E));let L=w=>{w.target&&w.target.name&&a.add(w.target.name),f.touched=!0,l()};r.addEventListener("focusout",L),ue(r,()=>r.removeEventListener("focusout",L))}else{for(let E of u())v(E);if(h.length){let E=!1;ue(r,()=>{E=!0}),queueMicrotask(()=>{if(!E){for(let[L,w,A]of h)L.removeEventListener(w,A),L.addEventListener(w,A);h.length=0}})}}let j=E=>{for(let L of u())L.name&&a.add(L.name);if(f.touched=!0,l(),!f.valid||f.pending){E.preventDefault(),E.stopImmediatePropagation();return}f.submitting=!0,b(r),c.$set("$form",{...f}),p()};r.addEventListener("submit",j,!0),ue(r,()=>r.removeEventListener("submit",j,!0)),r.__nojsResetSubmitting=()=>{f.submitting=!1,l()},ue(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(l);return}let i=et(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.closest("form[validate]")?null:r.getAttribute("error"),s=()=>{let a=Wo(r.value,n,{},ir(r));if(a?r.setAttribute("aria-invalid","true"):r.removeAttribute("aria-invalid"),a&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let m=Qt(c);if(m){let f=Je({err:{message:a}},i);Qe(d),d.innerHTML="",d.__ctx=f,d.appendChild(m),yt(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(Qe(d),d.innerHTML="")}};r.addEventListener("input",s),ue(r,()=>r.removeEventListener("input",s))}}})}function cr(t,e={}){ar(t)}function dr(){}var Ce=new Map,J=new Map;function lr(){let t=Array.from(Ce.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of J.values())clearTimeout(e);J.clear();for(let e of Ce.values())e.remove();Ce.clear()}function ur(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Uo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var tt=8;function fr(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+tt,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-tt;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+tt;break;default:s=o.top-n.height-tt,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Go=0;function Yo(t,e,r){document.body.appendChild(e),fr(e,t,r),e.setAttribute("aria-hidden","false")}function pr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Ko(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function mr(t){t.directive("tooltip",{priority:20,init(e,r,o){ur();let n=o;if(!n){Ko(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),d=a?t.findContext(e):null,m=()=>{if(!a||!d)return!1;try{return!!t.evaluate(a,d)}catch{return!1}},f=`nojs-tooltip-${++Go}`,p=document.createElement("div");p.className="nojs-tooltip",p.setAttribute("role","tooltip"),p.setAttribute("id",f),p.setAttribute("aria-hidden","true"),p.textContent=n,e.setAttribute("aria-describedby",f),Ce.set(e,p);let u=!1,l=0,b=()=>{!u||!e.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!u||!e.isConnected)&&fr(p,e,i)}))},h=()=>{window.addEventListener("scroll",b,!0),window.addEventListener("resize",b)},g=()=>{window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),l&&(cancelAnimationFrame(l),l=0)},v=()=>{u||(Yo(e,p,i),u=!0,h())},y=()=>{if(!u){pr(e,p);return}g(),pr(e,p),u=!1},x=()=>{if(m())return;J.has(e)&&clearTimeout(J.get(e));let H=setTimeout(()=>{J.delete(e),!m()&&e.isConnected&&v()},s);J.set(e,H)},j=()=>{J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),y()},E=()=>x(),L=()=>j(),w=()=>x(),A=()=>j(),C=H=>{H.key==="Escape"&&p.getAttribute("aria-hidden")==="false"&&j()};e.addEventListener("mouseenter",E),e.addEventListener("mouseleave",L),e.addEventListener("focusin",w),e.addEventListener("focusout",A),e.addEventListener("keydown",C);let D=null;if(a&&d&&typeof d.$watch=="function"){let H=()=>{u&&m()&&y()};D=d.$watch(H)}Uo(e,()=>{e.removeEventListener("mouseenter",E),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",w),e.removeEventListener("focusout",A),e.removeEventListener("keydown",C),D&&(D(),D=null),g(),J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),u=!1,p.remove(),Ce.delete(e)})}})}function gr(t,e={}){mr(t)}function br(){lr()}var Y=new Map;function hr(){Y.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function _t(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Se(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function wt(t){try{return t.matches(":popover-open")}catch{return!1}}var pe=8;function nt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-pe,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-pe;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+pe;break;default:s=o.bottom+pe,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-pe),r==="top"&&s<0&&(s=o.bottom+pe),r==="right"&&a+n.width>i&&(a=o.left-n.width-pe),r==="left"&&a<0&&(a=o.right+pe),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function At(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(!wt(c)){i();return}nt(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function _e(t){t&&t._untrack&&t._untrack()}function vr(t){t.directive("popover",{priority:20,init(r,o,n){rt();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=Y.get(i);a.popoverEl=r,a.position=c}let s=a=>{let d=Y.get(i);if(!d)return;let m=a.newState==="open";d.open=m;for(let f of d.triggerEls)f.setAttribute("aria-expanded",String(m));m||(r.style.visibility="",_e(d))};r.addEventListener("toggle",s),_t(r,()=>{r.removeEventListener("toggle",s);let a=Y.get(i);a&&(_e(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){rt();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,d=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let c=a=>{let d=Y.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(Se(d.popoverEl)){d.popoverEl.style.visibility="hidden";try{d.popoverEl.togglePopover(),wt(d.popoverEl)?(nt(d.popoverEl,r,d.position),At(d,r)):_e(d)}finally{d.popoverEl.style.visibility=""}}};r.addEventListener("click",c);let s=a=>{let d=Y.get(i);a.key==="Escape"&&d?.open&&(Se(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),_e(d),r.focus())};document.addEventListener("keydown",s),_t(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=Y.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(_e(a),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){rt();let o=()=>{let n=r.closest(".nojs-popover");!n||!Se(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),_t(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl,"showPopover"))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.showPopover();let i=o||[...n.triggerEls][0];i&&(nt(n.popoverEl,i,n.position),At(n,i))}catch{return!1}finally{n.popoverEl.style.visibility=""}return!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!Se(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return _e(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];i&&wt(n.popoverEl)?(nt(n.popoverEl,i,n.position),At(n,i)):_e(n)}finally{n.popoverEl.style.visibility=""}return!0},t.popover=e}function yr(t,e={}){vr(t)}function xr(){hr()}var N=[],ie=new Map,Xo=1e4;function Er(){return Xo+N.length}function _r(){N.length=0,ie.clear()}function De(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Zo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var wr='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',jt=new WeakMap;function Qo(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(wr)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),jt.set(t,e)}function Ar(t){let e=jt.get(t);e&&(t.removeEventListener("keydown",e),jt.delete(t))}var Fe=new WeakMap;function jr(t){t.directive("modal",{priority:10,init(r,o,n){De();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),m=p=>{p.target===r&&s!=="false"&&d!=="false"&&Te(r,i)};r.addEventListener("click",m),ie.set(i,r);let f=p=>{if(p.newState==="open"){if(r.style.zIndex=String(Er()),a&&a.split(/\s+/).filter(Boolean).forEach(u=>r.classList.add(u)),requestAnimationFrame(()=>{if(!r.isConnected||!N.some(l=>l.el===r))return;let u=r.querySelector(wr);u?u.focus():r.focus()}),Qo(r),d!=="false"){let u=l=>{l.key==="Escape"&&(l.stopPropagation(),Te(r,i))};r.addEventListener("keydown",u),Fe.set(r,u)}}else if(p.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(b=>r.classList.remove(b)),Ar(r);let u=Fe.get(r);u&&(r.removeEventListener("keydown",u),Fe.delete(r));let l=N.findIndex(b=>b.el===r);if(l===-1&&(l=N.findIndex(b=>b.id===i)),l!==-1){let b=N[l];N.splice(l,1),b.triggerEl&&requestAnimationFrame(()=>{b.triggerEl.focus()})}}};r.addEventListener("toggle",f),Zo(r,()=>{r.removeEventListener("click",m),r.removeEventListener("toggle",f),Ar(r);let p=Fe.get(r);p&&(r.removeEventListener("keydown",p),Fe.delete(r)),ie.delete(i);let u=N.findIndex(l=>l.el===r);u===-1&&(u=N.findIndex(l=>l.id===i)),u!==-1&&N.splice(u,1)})}});let e=r=>e.open(r);e.open=r=>{let o=ie.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return N.some(n=>n.id===r)||N.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=ie.get(r);return o?(Te(o,r),!0):!1},e.closeAll=()=>{for(let r=N.length-1;r>=0;r--)Te(N[r].el,N[r].id)},t.modal=e}function Te(t,e){try{t.hidePopover()}catch{}}function Lr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Jo(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function kr(t){t.directive("modal-open",{priority:10,init(e,r,o){De();let n=o;if(!n){let f=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(f&&(n=f.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let m=ie.get(n)||Jo(n);if(!m){console.warn(`[modal-open] modal "${n}" not found`);return}let f=N.some(p=>p.id===n);m.id&&e.setAttribute("aria-controls",m.id);try{m.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}f||N.push({id:n,el:m,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,d=()=>{let m=ie.get(n);return m?(a=m,s=f=>{f.newState==="closed"&&e.setAttribute("aria-expanded","false")},m.addEventListener("toggle",s),!0):!1};if(!d()){let m=requestAnimationFrame(d);Lr(e,()=>cancelAnimationFrame(m))}e.addEventListener("click",i),Lr(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function ei(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Cr(t){t.directive("modal-close",{priority:10,init(e,r,o){De();let n=()=>{let i,c;if(o){if(c=o,i=ie.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Te(i,c)};e.addEventListener("click",n),ei(e,()=>{e.removeEventListener("click",n)})}})}function Sr(t,e={}){jr(t),kr(t),Cr(t)}function Dr(){_r()}var ne={openMenus:new Map},O={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function Tr(){ne.openMenus.clear(),O.installed=!1,O.instanceCount=0,O.outsideClickHandler=null,O.escHandler=null}function Ie(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var ti=0;function ri(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ni(){O.installed||(O.outsideClickHandler=t=>{let e=[...ne.openMenus.entries()];for(let[r,{toggle:o,wrapper:n}]of e)if(!n.contains(t.target)){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}ne.openMenus.delete(r)}},O.escHandler=t=>{if(t.key!=="Escape")return;let e=[...ne.openMenus.entries()];for(let[r,{toggle:o}]of e){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}o.focus()}ne.openMenus.clear()},document.addEventListener("click",O.outsideClickHandler,!0),document.addEventListener("keydown",O.escHandler),O.installed=!0)}function kt(){O.installed&&(document.removeEventListener("click",O.outsideClickHandler,!0),document.removeEventListener("keydown",O.escHandler),O.outsideClickHandler=null,O.escHandler=null,O.installed=!1)}function Ir(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,d,m;switch(o){case"top":d=i.top-c.height,m=i.left;break;case"left":d=i.top,m=i.left-c.width;break;case"right":d=i.top,m=i.right;break;default:d=i.bottom,m=i.left}o==="bottom"||o==="top"?n==="end"&&(m=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>s&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=s&&(d=i.bottom),m<4&&(m=4),m+c.width>a-4&&(m=a-c.width-4),t.style.top=`${d}px`,t.style.left=`${m}px`}function Ct(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Lt(t){let e=Ct(t);e.length&&e[0].focus()}function Br(t){let e=Ct(t);e.length&&e[e.length-1].focus()}function Hr(t){t.directive("dropdown",{priority:15,init(r){Ie()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ie();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${ti++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Ir(n,r,o),ne.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ne.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let m=b=>{b.newState==="closed"&&d()&&a()};n.addEventListener("toggle",m);let f=b=>{b.preventDefault(),b.stopPropagation(),d()?a():s()};r.addEventListener("click",f),O.instanceCount++,ni();let p=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),Lt(n);break;case"ArrowDown":b.preventDefault(),s(),Lt(n);break;case"ArrowUp":b.preventDefault(),s(),Br(n);break}};r.addEventListener("keydown",p);let u=b=>{if(!(!d()||Ct(n).find(v=>v===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),Lt(n);break;case"ArrowUp":b.preventDefault(),Br(n);break}};n.addEventListener("keydown",u);let l=()=>{d()&&Ir(n,r,o)};window.addEventListener("scroll",l,!0),window.addEventListener("resize",l),ri(r,()=>{r.removeEventListener("click",f),r.removeEventListener("keydown",p),n.removeEventListener("keydown",u),n.removeEventListener("toggle",m),window.removeEventListener("scroll",l,!0),window.removeEventListener("resize",l),ne.openMenus.delete(n),O.instanceCount--,O.instanceCount<=0&&(O.instanceCount=0,kt())})}}),t.directive("dropdown-menu",{priority:15,init(r){Ie(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function $r(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function oi(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function St(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ne.openMenus.has(t)&&ne.openMenus.delete(t)}function Pr(t){t.directive("dropdown-item",{priority:15,init(e){Ie();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=oi(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),St(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{St(r,o);break}}};e.addEventListener("keydown",n),$r(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(St(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),$r(e,()=>e.removeEventListener("click",i))}})}function qr(t,e={}){Hr(t),Pr(t)}function Mr(){kt(),Tr()}var se=new Map,Be=new Set,Rr=0;function zr(){return++Rr}function Fr(){for(let t of Be)clearTimeout(t);Be.clear();for(let t of se.values())t.remove();se.clear(),Rr=0}function Or(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Dt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ii=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Tt(){return se.size>0?se.values().next().value:si("top-right")}function si(t){if(se.has(t))return se.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),se.set(t,e),e}function ai(t){return t.startsWith("top")}function It(t,e,r,o,n){let i=zr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>ot(s)),s.appendChild(d)}if(ai(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let d=setTimeout(()=>{Be.delete(d),s.isConnected&&ot(s)},o);Be.add(d),s._toastTimerId=d}return s}function ot(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Be.delete(t._toastTimerId)),t.remove())}function Vr(t){Or(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&ii.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),se.set(i,r),Dt(r,()=>{se.get(i)===r&&se.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let b=Tt();It(b,n,i,s,a)};r.addEventListener("click",l),Dt(r,()=>r.removeEventListener("click",l));return}let m=t.findContext(r);if(!m||typeof m.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let f;function p(){let l=t.evaluate(n,m);if(l&&l!==f){let b=typeof l=="string"?l:String(l),h=Tt();It(h,b,i,s,a),f=l}else f=l}let u=m.$watch(p);Dt(r,u)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=Tt();return It(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&ot(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>ot(r))},t.toast=e,t.global("toast",e)}function Wr(t,e={}){Vr(t)}function Nr(){Fr()}var Ae={containers:new Map};function Ur(){Ae.containers.clear()}function Gr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function ci(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var di=0;function Yr(t){return`${t}-${++di}`}function Oe(t,e,r=!1){let o=Ae.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Ve(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Kr(t){t.directive("tabs",{priority:10,init(e,r,o){Gr();let n=[],i=[];for(let g of Array.from(e.children))g.hasAttribute("tab")?n.push(g):g.hasAttribute("panel")&&i.push(g);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let g=0;g<a;g++){let v=n[g],y=i[g],x=v.id||Yr("nojs-tab"),j=y.id||Yr("nojs-panel");v.id=x,y.id=j,v.setAttribute("role","tab"),v.setAttribute("aria-selected","false"),v.setAttribute("aria-controls",j),v.setAttribute("tabindex","-1"),v.classList.add("nojs-tab"),y.setAttribute("role","tabpanel"),y.setAttribute("aria-labelledby",x),y.setAttribute("tabindex","0"),y.setAttribute("aria-hidden","true"),y.inert=!0,y.classList.add("nojs-panel"),s.appendChild(v)}for(let g=a;g<i.length;g++){let v=i[g];v.setAttribute("role","tabpanel"),v.setAttribute("aria-hidden","true"),v.inert=!0,v.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),Ae.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let m=t.findContext(e),f=[],p=(g,v)=>{let y=!1;try{y=!!t.evaluate(v,m)}catch{y=!1}y?g.setAttribute("aria-disabled","true"):g.removeAttribute("aria-disabled")};for(let g=0;g<a;g++){let v=n[g],y=v.getAttribute("tab-disabled");if(y&&(p(v,y),m&&typeof m.$watch=="function")){let x=m.$watch(()=>p(v,y));f.push(x)}}let u=0;if(o&&o.trim()!==""){let g=parseInt(o,10);!isNaN(g)&&g>=0&&g<a&&(u=g)}let l=n.slice(0,a);if(n[u]?.getAttribute("aria-disabled")==="true"){let g=Ve(l,u,1);g!==-1?(u=g,Oe(e,u)):Oe(e,u,!0)}else Oe(e,u);let b=g=>{let v=Ae.containers.get(e);if(!v)return;let y=g.target;if(y.getAttribute("role")!=="tab")return;let{tabs:x}=v,j=x.indexOf(y);if(j===-1)return;let E=-1;switch(g.key){case"ArrowRight":case"ArrowDown":E=Ve(x,j,1);break;case"ArrowLeft":case"ArrowUp":E=Ve(x,j,-1);break;case"Home":E=Ve(x,x.length-1,1);break;case"End":E=Ve(x,0,-1);break;case"Tab":return;default:return}E!==-1&&E!==j&&(g.preventDefault(),Oe(e,E),x[E].focus())};s.addEventListener("keydown",b);let h=g=>{let v=g.target.closest("[role='tab']");if(!v)return;let y=Ae.containers.get(e);if(!y)return;let x=y.tabs.indexOf(v);x!==-1&&v.getAttribute("aria-disabled")!=="true"&&(Oe(e,x),v.focus())};s.addEventListener("click",h),ci(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",h);for(let g of f)g&&g();f.length=0,Ae.containers.delete(e)})}})}function Xr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Zr(t){t.directive("panel",{priority:11,init(){}})}function Qr(t,e={}){Kr(t),Xr(t),Zr(t)}function Jr(){Ur()}var P={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function en(){P.branches.clear(),P.selectedItem=null,P.typeahead="",P.typeaheadTimer&&(clearTimeout(P.typeaheadTimer),P.typeaheadTimer=null)}function He(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function $e(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function tn(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function rn(t){return t.closest('[role="tree"]')}function li(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function ui(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function Bt(t){let e=P.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),P.selectedItem=t}function nn(t){let e=P.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function pi(t){let e=P.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function fi(t){let e=P.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function on(t,e){let r=rn(e);if(!r)return;let o=tn(r),n=o.indexOf(e);if(n<0)return;let i=P.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)pi(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&we(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)fi(e);else{let s=li(e);s&&we(s,tn(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&we(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&we(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),Bt(e),c&&nn(e);break;case"Home":t.preventDefault(),o.length>0&&we(o[0],o);break;case"End":t.preventDefault(),o.length>0&&we(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),P.typeahead+=t.key.toLowerCase(),P.typeaheadTimer&&clearTimeout(P.typeaheadTimer),P.typeaheadTimer=setTimeout(()=>{P.typeahead="",P.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let d=(s+a)%o.length;if(ui(o[d]).startsWith(P.typeahead)){we(o[d],o);break}}}break}}function sn(t){t.directive("tree",{priority:15,init(e){He(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function an(t){t.directive("branch",{priority:16,init(e,r,o){He();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=rn(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(P.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):P.branches.set(e,{expanded:n,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),Bt(e),nn(e))};e.addEventListener("click",s),$e(e,()=>e.removeEventListener("click",s));let a=d=>{on(d,e)};e.addEventListener("keydown",a),$e(e,()=>e.removeEventListener("keydown",a)),$e(e,()=>{c=!0,P.branches.delete(e),P.selectedItem===e&&(P.selectedItem=null),P.typeaheadTimer&&(clearTimeout(P.typeaheadTimer),P.typeaheadTimer=null,P.typeahead="")})}})}function we(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function cn(t){t.directive("subtree",{priority:16,init(e){He(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),Bt(o)};o.addEventListener("click",n),$e(o,()=>o.removeEventListener("click",n));let i=c=>{on(c,o)};o.addEventListener("keydown",i),$e(o,()=>o.removeEventListener("keydown",i)),$e(o,()=>{P.selectedItem===o&&(P.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=P.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function dn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ht(t){return t.closest('[role="treeitem"]')}function mi(t){return t.closest('[role="tree"]')}function gi(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function bi(t){return gi(t).indexOf(t)}function hi(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function ln(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var I={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Pe(){I.indicator&&(I.indicator.remove(),I.indicator=null)}function We(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function vi(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function yi(t,e){Pe();let r=vi(),o=t.getBoundingClientRect(),n=mi(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),I.indicator=r}function un(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(He(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=p=>{let u=Ht(p.target);if(u&&e.contains(u)){if(u.hasAttribute("tree-drag-disabled")){p.preventDefault();return}I.dragging={el:u,treeRoot:e},p.dataTransfer&&(p.dataTransfer.effectAllowed="move",p.dataTransfer.setData("text/plain","")),u.classList.add("nojs-dragging"),u.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:u}}))}},c=p=>{if(!I.dragging||I.dragging.treeRoot!==e)return;let u=Ht(p.target);if(!u||!e.contains(u)||u===I.dragging.el||ln(u,I.dragging.el))return;p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move");let l=hi(u,p.clientY,o);(I.currentTarget!==u||I.currentPosition!==l)&&(We(e),Pe(),I.currentTarget=u,I.currentPosition=l,l==="on"?u.classList.add("nojs-tree-drag-over"):yi(u,l))},s=p=>{I.dragging&&I.dragging.treeRoot===e&&n++},a=p=>{I.dragging&&(n--,n<=0&&(n=0,We(e),Pe(),I.currentTarget=null,I.currentPosition=null))},d=p=>{if(p.preventDefault(),p.stopPropagation(),n=0,!I.dragging||I.dragging.treeRoot!==e)return;let u=I.dragging.el,l=I.currentTarget,b=I.currentPosition;if(We(e),Pe(),!l||!b){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(l===u||ln(l,u)){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="on"){let h=l.querySelector(':scope > [role="group"]');h||(h=l.nextElementSibling?.matches?.('[role="group"]')?l.nextElementSibling:null),h?h.setAttribute("aria-hidden","false"):(h=document.createElement("ul"),h.setAttribute("role","group"),h.setAttribute("subtree",""),h.classList.add("nojs-subtree","nojs-tree"),h.setAttribute("aria-hidden","false"),l.appendChild(h));let g=P.branches.get(l);g&&(g.expanded=!0,g.subtreeEl=h,l.setAttribute("aria-expanded","true")),h.appendChild(u),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:u,newParent:l}}))}else{let h=l.parentElement;if(!h){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="before")h.insertBefore(u,l);else{let v=l.nextElementSibling,y=v?.matches?.('[role="group"]')?v.nextElementSibling:v;y?h.insertBefore(u,y):h.appendChild(u)}let g=bi(u);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:u,newIndex:g}}))}I.dragging=null,I.currentTarget=null,I.currentPosition=null},m=p=>{let u=Ht(p.target);u&&u.classList.remove("nojs-dragging"),We(e),Pe(),n=0,I.dragging&&I.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:I.dragging.el}})),I.dragging=null,I.currentTarget=null,I.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",d),e.addEventListener("dragend",m),dn(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",d),e.removeEventListener("dragend",m),We(e),Pe()}),xi(e);let f=new MutationObserver(p=>{for(let u of p)for(let l of u.addedNodes){if(l.nodeType!==1)continue;l.getAttribute("role")==="treeitem"&&$t(l);let b=l.querySelectorAll?.('[role="treeitem"]');if(b)for(let h of b)$t(h)}});f.observe(e,{childList:!0,subtree:!0}),dn(e,()=>f.disconnect())}})}function $t(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function xi(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)$t(r)}function pn(t,e={}){sn(t),an(t),cn(t),un(t)}function fn(){en()}var it=new Map;function mn(){it.clear()}function st(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function gn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function bn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function hn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function vn(t){t.directive("stepper",{priority:14,init(e,r,o){st();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",m=e.getAttribute("aria-label")||"Stepper",f=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",m),e.classList.add("nojs-stepper");let p=null,u=[];if(a){p=document.createElement("div"),p.className="nojs-stepper-indicator",p.setAttribute("role","tablist"),p.setAttribute("aria-label","Progress"),i.forEach((A,C)=>{if(C>0){let V=document.createElement("div");V.className="nojs-stepper-separator",V.setAttribute("aria-hidden","true"),p.appendChild(V)}let D=document.createElement("button");D.type="button",D.className="nojs-stepper-indicator-item",D.setAttribute("role","tab"),D.setAttribute("aria-selected",C===f?"true":"false");let H=A.getAttribute("step-label")||`Step ${C+1}`,k=document.createElement("span");k.textContent=H,D.appendChild(k),D.setAttribute("aria-label",H);let G=`nojs-stepper-tab-${Ei++}`;if(D.id=G,s==="free"){D.setAttribute("data-clickable","");let V=()=>j(C);D.addEventListener("click",V),Ne(e,()=>D.removeEventListener("click",V))}else D.setAttribute("tabindex","-1");p.appendChild(D),u.push(D)});let w=A=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(A.key))return;A.preventDefault();let C=f;A.key==="ArrowRight"?C=Math.min(f+1,i.length-1):A.key==="ArrowLeft"?C=Math.max(f-1,0):A.key==="Home"?C=0:A.key==="End"&&(C=i.length-1),s==="free"?(j(C),u[C]?.focus()):u[f]?.focus()};p.addEventListener("keydown",w),Ne(e,()=>p.removeEventListener("keydown",w)),e.insertBefore(p,e.firstChild)}let l=null,b=null,h=null;if(d){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-prev",b.textContent="Previous";let w=()=>x();b.addEventListener("click",w),Ne(e,()=>b.removeEventListener("click",w)),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-next",h.textContent="Next";let A=()=>y();h.addEventListener("click",A),Ne(e,()=>h.removeEventListener("click",A)),l.appendChild(b),l.appendChild(h),e.appendChild(l)}function g(w){let A=i[w];if(!A)return!0;if(!gn(A,t.findContext)){let H=A.querySelector("form[validate]");return H&&(bn(H),u[w]&&u[w].classList.add("nojs-step-invalid"),hn(e,A,H)),!1}u[w]&&u[w].classList.remove("nojs-step-invalid");let C=A.querySelectorAll("[required]");for(let H of C)if(typeof H.checkValidity=="function"&&!H.checkValidity())return H.reportValidity(),!1;let D=A.getAttribute("step-validate");if(D)try{if(!t.evaluate(D,n))return!1}catch(H){return console.warn(`[stepper] step-validate error: ${H.message}`),!1}return!0}function v(w){if(i.forEach((A,C)=>{let D=C===f;A.setAttribute("aria-hidden",D?"false":"true"),D?(A.removeAttribute("inert"),A.setAttribute("aria-current","step")):(A.setAttribute("inert",""),A.removeAttribute("aria-current"))}),u.length&&u.forEach((A,C)=>{A.setAttribute("aria-selected",C===f?"true":"false"),C<f?A.setAttribute("data-completed",""):A.removeAttribute("data-completed"),A.setAttribute("tabindex",C===f?"0":"-1");let D=i[C];D.id&&(A.setAttribute("aria-controls",D.id),D.setAttribute("aria-labelledby",A.id))}),b&&(b.disabled=f===0),h&&(h.textContent=f===i.length-1?"Finish":"Next"),!w){let A=i[f];A&&requestAnimationFrame(()=>A.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!w,detail:{current:f,total:i.length}}))}function y(){return f>=i.length-1?(s==="linear"&&!g(f)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:f,total:i.length}})),!1):s==="linear"&&!g(f)?!1:(f++,v(),L(),!0)}function x(){return f<=0?!1:(f--,v(),L(),!0)}function j(w){if(w<0||w>=i.length||w===f)return!1;if(s==="linear"&&w>f){for(let A=f;A<w;A++)if(f=A,v(),!g(A))return L(),!1}return f=w,v(),L(),!0}let E={get current(){return f},get total(){return i.length},next:y,prev:x,goTo:j,get isFirst(){return f===0},get isLast(){return f===i.length-1}};function L(){n.$stepper=E}L(),it.set(e,{get current(){return f},steps:i,mode:s,indicatorEl:p,navEl:l}),v(!0),Ne(e,()=>{it.delete(e),p&&p.parentNode&&p.remove(),l&&l.parentNode&&l.remove(),delete n.$stepper})}})}var Ei=0;var _i=0;function yn(t){t.directive("step",{priority:13,init(e,r,o){st(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${_i++}`),e.setAttribute("tabindex","0")}})}function xn(t,e={}){yn(t),vn(t)}function En(){mn()}function _n(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function An(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function wn(t){t.directive("skeleton",{priority:10,init(e,r,o){_n();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function d(g){m();for(let v=0;v<g;v++){let y=document.createElement("div");y.className="nojs-skeleton-line",e.appendChild(y),a.push(y)}}function m(){for(let g of a)g.parentNode===e&&e.removeChild(g);a=[]}function f(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let g=s+(String(s).match(/\d$/)?"px":"");e.style.width=g,e.style.height=g}if(c){let g=parseInt(c,10);g>0&&d(g)}e.setAttribute("aria-busy","true")}let p=null;function u(){p&&p(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let g=!1,v=null,y=()=>{g||(g=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",y),v!==null&&clearTimeout(v),p=null)};e.addEventListener("transitionend",y),v=setTimeout(y,0),p=()=>{e.removeEventListener("transitionend",y),v!==null&&clearTimeout(v),g=!0,p=null}}let l=!1;function b(){let g=!!t.evaluate(o,n);g&&!l?(l=!0,f()):!g&&l&&(l=!1,u())}b();let h=n.$watch(b);An(e,h),An(e,()=>{p&&p(),l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function jn(t,e={}){wn(t)}var je=new Map,U=new Map,T={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Ln(){je.clear(),U.clear(),T.active=!1,T.splitEl=null,T.gutterEl=null,T.prevPane=null,T.nextPane=null,T.direction=null,T.startPos=0,T.startPrevSize=0,T.startNextSize=0,T.containerSize=0}function at(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Ai(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function kn(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function Cn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function wi(t,e){let o=(je.get(t)?.gutters||[]).reduce((n,i)=>n+Q(i,e),0);return Q(t,e)-o}function ji(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Ue(t,e){let r=U.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function ct(t,e,r,o){let n=Q(e,o),i=Q(r,o),c=U.get(e),s=U.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function Pt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=je.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function Li(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=je.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function ki(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=u=>{if(u.button!==0)return;u.preventDefault();let l=wi(t,e);T.active=!0,T.splitEl=t,T.gutterEl=i,T.prevPane=r,T.nextPane=o,T.direction=e,T.startPos=u[kn(e)],T.startPrevSize=Q(r,e),T.startNextSize=Q(o,e),T.containerSize=l,T.sign=Cn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(u.pointerId)},s=u=>{if(!T.active||T.gutterEl!==i)return;let l=(u[kn(T.direction)]-T.startPos)*(T.sign||1),b=Ue(T.startPrevSize+l,T.prevPane),h=Ue(T.startNextSize-l,T.nextPane),g=T.startPrevSize+T.startNextSize;b+h!==g&&(b!==T.startPrevSize+l?h=g-b:b=g-h),T.prevPane.style.flexBasis=`${b}px`,T.prevPane.style.flexGrow="0",T.nextPane.style.flexBasis=`${h}px`,T.nextPane.style.flexGrow="0",ct(i,T.prevPane,T.nextPane,T.direction)},a=()=>{!T.active||T.gutterEl!==i||(T.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Pt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let d=10,m=u=>{let l=e==="horizontal",b=Cn(t,e),h=0;if(l&&u.key==="ArrowRight"||!l&&u.key==="ArrowDown")h=d*b;else if(l&&u.key==="ArrowLeft"||!l&&u.key==="ArrowUp")h=-d*b;else if(u.key==="Home")h=(U.get(r)?.min||0)-Q(r,e);else if(u.key==="End"){let E=U.get(o);h=Q(r,e)+Q(o,e)-(E?.min||0)-Q(r,e)}else return;u.preventDefault();let g=Q(r,e),v=Q(o,e),y=g+v,x=Ue(g+h,r),j=Ue(y-x,o);x=y-j,x=Ue(x,r),j=y-x,r.style.flexBasis=`${x}px`,r.style.flexGrow="0",o.style.flexBasis=`${j}px`,o.style.flexGrow="0",ct(i,r,o,e),Pt(t)};i.addEventListener("keydown",m);let f=()=>{let u=U.get(r),l=U.get(o),b=u?.collapsible?r:l?.collapsible?o:null;if(!b)return;let h=U.get(b);if(!h)return;let g=b===r?o:r,v=Q(r,e)+Q(o,e);if(h.collapsed){h.collapsed=!1,b.removeAttribute("data-collapsed");let y=h.preCollapseSize||`${Math.round(v/2)}px`,x=ji(y,v)??v/2,j=Math.min(x,v);b.style.flexBasis=`${j}px`,b.style.flexGrow="0",g.style.flexBasis=`${v-j}px`,g.style.flexGrow="0"}else h.preCollapseSize=b.style.flexBasis||`${Q(b,e)}px`,h.collapsed=!0,b.setAttribute("data-collapsed","true"),b.style.flexBasis="0px",b.style.flexGrow="0",g.style.flexBasis=`${v}px`,g.style.flexGrow="0";ct(i,r,o,e),Pt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:b,collapsed:h.collapsed}}))};return i.addEventListener("dblclick",f),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",m),i.removeEventListener("dblclick",f)}}}function Sn(t){t.directive("split",{priority:14,init(e,r,o){at();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(m=>m.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(m=>{U.get(m)||U.set(m,{size:m.getAttribute("pane")||null,min:parseInt(m.getAttribute("pane-min"),10)||0,max:parseInt(m.getAttribute("pane-max"),10)||1/0,collapsible:m.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let m=0;m<c.length-1;m++){let{gutter:f,cleanup:p}=ki(e,n,c[m],c[m+1],i);c[m].after(f),s.push(f),a.push(p)}je.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),Li(e)||c.forEach(m=>{let p=U.get(m)?.size;p?(m.style.flexBasis=p,m.style.flexGrow="0"):(m.style.flexGrow="1",m.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((m,f)=>{ct(m,c[f],c[f+1],n)})}),Ai(e,()=>{a.forEach(m=>m()),s.forEach(m=>m.remove()),je.delete(e),c.forEach(m=>U.delete(m)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Ci(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Dn(t){t.directive("pane",{priority:15,init(e,r,o){at(),e.classList.add("nojs-pane"),U.has(e)||U.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=U.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Ci(e,()=>{e.classList.remove("nojs-pane"),U.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function Tn(t,e={}){Sn(t),Dn(t)}function In(){Ln()}var fe={sorts:new Map};function Bn(){fe.sorts.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Si(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Di(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Ti(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Hn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function $n(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function qn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return $n(Number(t),Number(e));case"date":return $n(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Ii(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Mn(t){t.directive("sortable",{priority:10,init(e){Le(),e.classList.add("nojs-sortable")}})}function Rn(t){t.directive("sort",{priority:11,init(e,r,o){Le();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;fe.sorts.has(s)||fe.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(fe.sorts.get(s).column||Pn(e,s,n,i,c,t));let a=()=>{let m=fe.sorts.get(s),f;m.column!==n?f="asc":m.direction==="asc"?f="desc":m.direction==="desc"?f=null:f="asc",Pn(e,s,n,i,f,t)},d=m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),a())};e.addEventListener("click",a),e.addEventListener("keydown",d),Si(e,()=>{e.removeEventListener("click",a),e.removeEventListener("keydown",d),s&&!s.isConnected&&(fe.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Pn(t,e,r,o,n,i){let c=fe.sorts.get(e);Ii(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=Di(e,i);if(s){let a=i.findContext(e),d=a?Ti(a,s.arrayPath):null;if(Array.isArray(d)){if(!n){let f=e._nojsOriginalOrder;if(f){let p=new Set(d),u=f.filter(l=>p.has(l));for(let l of d)f.includes(l)||u.push(l);Hn(a,s.arrayPath,u)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let m=[...d].sort((f,p)=>{let u=f!=null?f[r]:null,l=p!=null?p[r]:null,b=qn(u,l,o);return n==="desc"?-b:b});Hn(a,s.arrayPath,m);return}}Bi(e,t,r,o,n)}function Bi(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let p=document.createDocumentFragment();for(let u of t._nojsOriginalRows)p.appendChild(u);i.appendChild(p);return}let m=p=>{let u=p.replace(/[^0-9.\-]/g,"");return u===""||u==="-"?NaN:parseFloat(u)};d.sort((p,u)=>{let l=p.children[a]?.textContent?.trim()||"",b=u.children[a]?.textContent?.trim()||"",h=qn(o==="number"?m(l):l,o==="number"?m(b):b,o);return n==="desc"?-h:h});let f=document.createDocumentFragment();for(let p of d)f.appendChild(p);i.appendChild(f)}function zn(t){t.directive("fixed-header",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-header")}})}function Fn(t){t.directive("fixed-col",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-col")}})}function qt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function On(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function Vn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Wn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function Nn(t){t.directive("table-reorder",{priority:15,init(e){if(Le(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,d=null;function m(){let h=r.querySelectorAll(":scope > tr");for(let g=0;g<h.length;g++){let v=h[g];if(v._nojsReorderSetup)continue;v._nojsReorderSetup=!0,v.draggable=!0,v.setAttribute("aria-roledescription","draggable row");let y=!0;if(n){let A=C=>{y=!!C.target.closest(n)};v.addEventListener("mousedown",A),qt(v,()=>v.removeEventListener("mousedown",A))}let x=A=>{if(n&&!y){A.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(v),a=v,A.dataTransfer&&(A.dataTransfer.effectAllowed="move",A.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(D=>v.classList.add(D))},j=A=>{if(a==null)return;A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="move");let C=v.getBoundingClientRect(),D=C.top+C.height/2,k=[...r.querySelectorAll(":scope > tr")].indexOf(v);f(),k!==s&&(A.clientY<D?v.classList.add("nojs-reorder-insert-before"):v.classList.add("nojs-reorder-insert-after"),d=v)},E=()=>{v.classList.remove("nojs-reorder-insert-before"),v.classList.remove("nojs-reorder-insert-after"),d===v&&(d=null)},L=A=>{if(A.preventDefault(),A.stopPropagation(),a==null||s==null)return;let C=[...r.querySelectorAll(":scope > tr")],D=v.getBoundingClientRect(),H=D.top+D.height/2,k=C.indexOf(v);A.clientY>=H&&k++;let G=s;if(G===k||G+1===k){p();return}let V=G<k?k-1:k,be=On(e);if(be&&o){let S=Vn(o,be.arrayPath);if(Array.isArray(S)){let $=[...S],[M]=$.splice(G,1);$.splice(V,0,M),Wn(o,be.arrayPath,$),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...$]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:G,to:V,item:M}}))}}else{let S=a,$=C[V];S&&$&&(G<V?r.insertBefore(S,$.nextSibling):r.insertBefore(S,$),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:G,to:V,item:null}})))}p()},w=()=>{p()};v.addEventListener("dragstart",x),v.addEventListener("dragover",j),v.addEventListener("dragleave",E),v.addEventListener("drop",L),v.addEventListener("dragend",w),qt(v,()=>{v.removeEventListener("dragstart",x),v.removeEventListener("dragover",j),v.removeEventListener("dragleave",E),v.removeEventListener("drop",L),v.removeEventListener("dragend",w),v._nojsReorderSetup=!1})}}function f(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function p(){a&&i.split(/\s+/).filter(Boolean).forEach(g=>a.classList.remove(g)),f(),s=null,a=null;let h=r.querySelectorAll(":scope > tr");for(let g of h)g.classList.remove("nojs-reorder-insert-before"),g.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(v=>g.classList.remove(v))}let u=h=>{a!=null&&(h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect="move"))},l=h=>{if(a==null||h.target!==r)return;h.preventDefault(),h.stopPropagation();let g=s,y=[...r.querySelectorAll(":scope > tr")].length-1;if(g===y){p();return}let x=On(e);if(x&&o){let j=Vn(o,x.arrayPath);if(Array.isArray(j)){let E=[...j],[L]=E.splice(g,1);E.push(L),Wn(o,x.arrayPath,E),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...E]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:g,to:E.length-1,item:L}}))}}p()};r.addEventListener("dragover",u),r.addEventListener("drop",l);let b=new MutationObserver(()=>{m()});b.observe(r,{childList:!0}),m(),qt(e,()=>{b.disconnect(),r.removeEventListener("dragover",u),r.removeEventListener("drop",l),p()})}})}function Un(t,e={}){Mn(t),Rn(t),zn(t),Fn(t),Nn(t)}function Gn(){Bn()}var me={containers:new Map};function Yn(){for(let[,t]of me.containers)typeof t.unsub=="function"&&t.unsub();me.containers.clear()}function Kn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Xn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Hi(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function $i(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Zn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=c.label,s.appendChild(d)}else{let d=document.createElement("a");d.href=c.href,d.textContent=c.label,s.appendChild(d)}o.appendChild(s)}t.appendChild(o);let n=me.containers.get(t);n&&(n.crumbs=e)}function Pi(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=Hi(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function qi(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=$i(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function Qn(t){t.directive("breadcrumb",{priority:15,init(e,r,o){Kn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(me.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,d=a?a.path:"/",m=qi(d);Zn(e,m)};if(s(),typeof i.on=="function"){let a=i.on(s),d=me.containers.get(e);d&&(d.unsub=a),Xn(e,()=>{typeof a=="function"&&a();let m=me.containers.get(e);m&&(m.unsub=null)})}}else{let s=Pi(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");Zn(e,s)}Xn(e,()=>{me.containers.delete(e)})}})}function Jn(t,e={}){Qn(t)}function eo(){Yn()}var dt={containers:new Map};function to(){dt.containers.clear()}function ro(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Mi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var lt=null;function Ri(){return lt!==null||(lt=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),lt}function no(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function zi(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function io(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function oo(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");io(t,r)}else t.open=!1}function ut(t,e,r,o){let n=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function qe(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function so(t){t.directive("accordion",{priority:10,init(e,r,o){ro();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!Ri();e.setAttribute("role","group");let c=qe(e);if(c.length===0)return;if(i)for(let p of c)no(p);let s=[],a=new MutationObserver(p=>{for(let u of p)for(let l of u.addedNodes)l.nodeType!==1||l.tagName!=="DETAILS"||l.parentElement===e&&m(l)});a.observe(e,{childList:!0});let d=0,m=p=>{i&&no(p);let u=p.querySelector(":scope > summary");if(u){let h=`nojs-accordion-panel-${Date.now()}-${d++}`,g=p.querySelector(":scope > .nojs-accordion-content");g?(g.id=g.id||h,g.setAttribute("role","region"),h=g.id):(p.id||(p.id=h),h=p.id),u.setAttribute("aria-expanded",p.open?"true":"false"),u.setAttribute("aria-controls",h)}let l=h=>{let g=qe(e),v=g.indexOf(p),y=p.querySelector(":scope > summary");if(y&&y.setAttribute("aria-expanded",p.open?"true":"false"),p.open){if(n==="single")for(let x of g)x!==p&&x.open&&oo(x,i);ut(e,p,!0,v)}else ut(e,p,!1,v)},b=null;if(i){let h=p.querySelector(":scope > summary");h&&(b=g=>{g.preventDefault();let v=p.querySelector(":scope > .nojs-accordion-content");if(p.open)io(p,v),h.setAttribute("aria-expanded","false"),ut(e,p,!1,qe(e).indexOf(p));else{if(n==="single"){let y=qe(e);for(let x of y)if(x!==p&&x.open){oo(x,!0);let j=x.querySelector(":scope > summary");j&&j.setAttribute("aria-expanded","false")}}zi(p,v),h.setAttribute("aria-expanded","true"),ut(e,p,!0,qe(e).indexOf(p))}},h.addEventListener("click",b))}p.addEventListener("toggle",l),s.push({details:p,toggleHandler:l,clickHandler:b})};for(let p of c)m(p);let f=p=>{let u=p.target;if(u.tagName!=="SUMMARY")return;let l=u.parentElement;if(!l||l.parentElement!==e)return;let h=qe(e).map(y=>y.querySelector(":scope > summary")).filter(Boolean),g=h.indexOf(u);if(g===-1)return;let v=-1;switch(p.key){case"ArrowDown":case"ArrowRight":v=(g+1)%h.length;break;case"ArrowUp":case"ArrowLeft":v=(g-1+h.length)%h.length;break;case"Home":v=0;break;case"End":v=h.length-1;break;default:return}v!==-1&&v!==g&&(p.preventDefault(),h[v].focus())};e.addEventListener("keydown",f),dt.containers.set(e,{mode:n,listeners:s,observer:a}),Mi(e,()=>{e.removeEventListener("keydown",f),a.disconnect();for(let p of s)if(p.details.removeEventListener("toggle",p.toggleHandler),p.clickHandler){let u=p.details.querySelector(":scope > summary");u&&u.removeEventListener("click",p.clickHandler)}s.length=0,dt.containers.delete(e)})}})}function ao(t,e={}){so(t)}function co(){to()}var Me=new Map;function lo(){let t=Array.from(Me.keys());for(let e of t){let r=Me.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}Me.clear()}function uo(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Fi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Oi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=Vi(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function Vi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Wi(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function po(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function pt(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Ni(t,e){return t*e}function mo(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function go(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function fo(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function ft(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function Ui(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return go(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function Gi(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return go(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function Yi(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=Ui(t,e),n=Gi(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function Mt(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:s}=Yi(t,n,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=ft(t,c),d=t.itemHeight!=="auto"?Ni(t.totalItems,t.itemHeight):fo(t),m=s>=0?ft(t,s+1):0,f=Math.max(0,d-m);pt(t.spacerTop,a),pt(t.spacerBottom,f);let p=new Set;for(let l=c;l<=s;l++)p.add(l);for(let[l,b]of t.renderedNodes)p.has(l)||(b.remove(),t.renderedNodes.delete(l));let u=[];for(let l=c;l<=s;l++){if(t.renderedNodes.has(l))continue;let b=t.dataArray[l];if(b===void 0)continue;let h=t.template.cloneNode(!0),g={};g[t.iteratorVar]=b,g.$index=l,g.$count=t.totalItems,g.$first=l===0,g.$last=l===t.totalItems-1,g.$even=l%2===0,g.$odd=l%2!==0,h.setAttribute("role","option"),h.setAttribute("aria-setsize",String(t.totalItems)),h.setAttribute("aria-posinset",String(l+1)),h.setAttribute("tabindex","-1"),h.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(g)),h.__declared=!1,u.push({index:l,node:h}),t.renderedNodes.set(l,h)}if(u.length>0){u.sort((l,b)=>l.index-b.index);for(let{index:l,node:b}of u){let h=null;for(let[g,v]of t.renderedNodes)g>l&&v.parentNode===r&&(!h||g<Ki(h,t))&&(h=v);h||(h=t.spacerBottom),r.insertBefore(b,h);try{e.processTree&&e.processTree(b)}catch{}}}if(t.itemHeight==="auto"){let l=!1;for(let[b,h]of t.renderedNodes){let g=h.offsetHeight||h.getBoundingClientRect().height;g>0&&t.heights[b]!==g&&(t.heights[b]=g,l=!0)}if(l){mo(t);let b=fo(t),h=ft(t,c),g=s>=0?ft(t,s+1):0,v=Math.max(0,b-g);pt(t.spacerTop,h),pt(t.spacerBottom,v)}}}function Ki(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function Xi(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&mo(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,Mt(t,r)}function bo(t){t.directive("virtual",{priority:10,init(e,r,o){uo(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=Oi(e),d=null;if(a)d=a.eachEl;else for(let j of e.children)if(!j.classList.contains("nojs-virtual-spacer")){d=j;break}if(!d){console.warn("[virtual] No child template found.");return}let m=d.cloneNode(!0);for(m.removeAttribute("each"),m.removeAttribute("foreach"),m.removeAttribute("for"),m.__declared=!1,m.__disposers=null,m.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let f=po(e),p=po(e);e.appendChild(f),e.appendChild(p);let u={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:m,spacerTop:f,spacerBottom:p,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};Me.set(e,u);let l=j=>{let E=[...e.querySelectorAll('[role="option"]')];if(!E.length)return;let L=e.querySelector('[role="option"]:focus'),w=L?E.indexOf(L):-1,A=-1;switch(j.key){case"ArrowDown":j.preventDefault(),A=w<E.length-1?w+1:w;break;case"ArrowUp":j.preventDefault(),A=w>0?w-1:0;break;case"Home":j.preventDefault(),A=0;break;case"End":j.preventDefault(),A=E.length-1;break;default:return}A>=0&&A<E.length&&E[A].focus()};e.addEventListener("keydown",l);let b=null,h=()=>{b||(b=requestAnimationFrame(()=>{b=null,Mt(u,t)}))};if(u.scrollHandler=h,e.addEventListener("scroll",h,{passive:!0}),typeof ResizeObserver<"u"){let j=new ResizeObserver(()=>{u.dirty=!0,Mt(u,t)});j.observe(e),u.resizeObserver=j}let g=null,v=-1,y=null,x=()=>{if(!u.disposed){if(u.arrayPath){let j=t.findContext?t.findContext(e):null;if(j){let E=Wi(j,u.arrayPath);Array.isArray(E)&&(E!==g||E.length!==v)&&(g=E,v=E.length,Xi(u,E,t))}}y=setTimeout(x,100)}};y=setTimeout(x,100),Fi(e,()=>{u.disposed=!0,b&&(cancelAnimationFrame(b),b=null),y&&(clearTimeout(y),y=null),e.removeEventListener("scroll",h),e.removeEventListener("keydown",l),u.resizeObserver&&(u.resizeObserver.disconnect(),u.resizeObserver=null);for(let[j,E]of u.renderedNodes){if(E.__disposers){for(let L of E.__disposers)try{L()}catch{}E.__disposers=null}E.remove()}u.renderedNodes.clear(),u.spacerTop&&u.spacerTop.parentNode&&u.spacerTop.remove(),u.spacerBottom&&u.spacerBottom.parentNode&&u.spacerBottom.remove(),Me.delete(e)})}})}function ho(t,e={}){bo(t)}function vo(){lo()}var ge=new Map,mt=new Map;function yo(){for(let[t,e]of ge){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}ge.clear(),mt.clear()}function xo(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function Zi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qi(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function Ji(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function es(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function ts(){return document.documentElement}function rs(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function Eo(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function Rt(t){let e=ge.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let f of a)f.isIntersecting?n.add(f.target.id):n.delete(f.target.id);let d=null,m=1/0;for(let f of n){let p=document.getElementById(f);if(!p)continue;let u=p.getBoundingClientRect();u.top<m&&(m=u.top,d=f)}for(let f of e.spyEntries)Eo(f.el);if(d){for(let f of e.spyEntries)if(f.targetId===d){rs(f.el),e.activeEl=f.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let d=document.getElementById(a.targetId);d&&(c.observe(d),s.add(a.targetId))}e.observer=c}function ns(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function _o(t){t.directive("spy",{priority:20,init(e,r,o){xo();let n=Qi(e);if(!n){e.tagName!=="A"&&ns(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=Ji(e),c=es(e),s=ts();ge.has(s)||ge.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=ge.get(s),d={el:e,targetId:n};a.spyEntries.push(d),mt.set(e,s),Rt(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{Rt(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),Zi(e,()=>{let m=a.spyEntries.indexOf(d);m!==-1&&a.spyEntries.splice(m,1),mt.delete(e),Eo(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),ge.delete(s)):Rt(s)})}})}function Ao(t,e={}){_o(t)}function wo(){yo()}var zt="it is a DOM element; client mechanics never send DOM nodes",jo={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:zt},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:zt},fixed:{list:null}},$el:{unavailable:zt}}}};var os="[validate],[drag],[drop],[drag-list],[drag-multiple]";function Lo(t){if(typeof document>"u")return;let e=document.querySelectorAll(os);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var ko=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],is=["validate","drag-list","drag-multiple",...ko].filter(t=>!Kt.includes(t));function ss(t,e){ht(t,e);for(let r of is)t.directive(r,{priority:30,init(o,n){n.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}var as={name:"nojs-elements",contract:{directives:{...jo}},install(t,e={}){if(de(t)){ss(t,e);return}ht(t,e),cr(t,e),gr(t,e),yr(t,e),Sr(t,e),qr(t,e),Wr(t,e),Qr(t,e),pn(t,e),xn(t,e),jn(t,e),Tn(t,e),Un(t,e),Jn(t,e),ao(t,e),ho(t,e),Ao(t,e),Lo(t)},init(t){if(de(t)||(Lo(t),typeof document>"u"||!document.body))return;let e=ko.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Xt(),dr(),br(),xr(),Dr(),Mr(),Nr(),Jr(),fn(),En(),In(),Gn(),eo(),co(),vo(),wo()}},Md=as;export{Md as default};
//# sourceMappingURL=nojs-elements.js.map
