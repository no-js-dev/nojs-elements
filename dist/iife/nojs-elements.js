/**
 * NoJS Elements v1.22.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
(()=>{var A={dragging:null,selected:new Map,placeholder:null},Ye=new Map;function Ot(){A.dragging=null,A.selected.clear(),A.placeholder&&(A.placeholder.remove(),A.placeholder=null),Ye.clear()}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function le(t,e){t.__nojsElBoundCtx=e}function Vt(t){t.__nojsElOwnCtx=!0}function Nt(t){return t.__nojsElOwnCtx===!0}function ue(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Ze(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function pe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ke(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ke(r):e++}return e}function Xe(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,l=s.top+s.height/2;if(r<l&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function Gt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",A.dragging&&A.dragging.sourceEl){let s=(A.dragging.sourceEl.firstElementChild||A.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),A.placeholder=n}function re(){A.placeholder&&(A.placeholder.remove(),A.placeholder=null)}function Ee(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function $o(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let f=a-1;f>=0;f--){let p=document.createElement("div"),m=f*4;if(p.style.cssText="position:absolute;top:"+m+"px;left:"+m+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",f===0){let u=o.cloneNode(!0);for(;u.firstChild;)p.appendChild(u.firstChild);p.style.background=s.backgroundColor||"#fff",p.style.border=s.border,p.style.padding=s.padding,p.style.fontSize=s.fontSize,p.style.color=s.color,p.style.fontFamily=s.fontFamily}else p.style.background=s.backgroundColor||"#fff",p.style.border=s.border||"1px solid #ddd";r.appendChild(p)}let l=document.createElement("div");return l.textContent=e,l.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(l),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var oe=null;function Mo(){return oe&&oe.isConnected?oe:typeof document>"u"||!document.body?null:(oe=document.createElement("div"),oe.setAttribute("aria-live","assertive"),oe.setAttribute("aria-atomic","true"),oe.setAttribute("role","status"),oe.className="nojs-dnd-live-region",oe.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(oe),oe)}function de(t){let e=Mo();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Yt(t){if(ue(t)){t.directive("drag",{priority:15,init(e,r){ke(),Wt(e,qo(e,r))}});return}Ze(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){ke(),Wt(e,Po(t,e,o))}})}function Po(t,e,r){let o=t.findContext(e);le(e,o);let n=e.getAttribute("drag-disabled");return{ctx:o,value:()=>t.evaluate(r,o),disabled:()=>n?t.evaluate(n,o):!1,watchDisabled:i=>pe(e,o.$watch(i)),onDispose:i=>pe(e,i)}}function qo(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function Wt(t,e){let r=t.getAttribute("drag-type")||"default",o=t.getAttribute("drag-effect")||"move",n=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),c=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),a=t.getAttribute("drag-class")||"nojs-dragging",l=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let f=!0;if(n){let d=b=>{f=!!b.target.closest(n)};t.addEventListener("mousedown",d),e.onDispose(()=>t.removeEventListener("mousedown",d))}let p=d=>{if(n&&!f){d.preventDefault();return}if(s&&e.disabled()){d.preventDefault();return}let b=e.value(),h=t.getAttribute("drag-group"),g=b;if(h&&A.selected.has(h)){let y=A.selected.get(h);y.size>0&&[...y].some(w=>w.el===t)&&(g=[...y].map(w=>w.item))}if(A.dragging={item:g,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},d.dataTransfer){if(d.dataTransfer.effectAllowed=o,d.dataTransfer.setData("text/plain",""),Array.isArray(g)&&g.length>1&&d.dataTransfer.setDragImage){let y=$o(t,g.length);document.body.appendChild(y);let E=t.getBoundingClientRect();d.dataTransfer.setDragImage(y,E.width/2,E.height/2),requestAnimationFrame(()=>y.remove())}else if(i&&d.dataTransfer.setDragImage)if(i==="none"){let y=document.createElement("div");y.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(y);let[E,w]=c.split(",").map(Number);d.dataTransfer.setDragImage(y,E||0,w||0),requestAnimationFrame(()=>y.remove())}else{let y=t.querySelector(i);if(y){let[E,w]=c.split(",").map(Number);l&&y.classList.add(l),d.dataTransfer.setDragImage(y,E||0,w||0)}}}if(a.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),Array.isArray(g)&&h&&A.selected.has(h))for(let y of A.selected.get(h))y.el!==t&&a.split(/\s+/).filter(Boolean).forEach(E=>y.el.classList.add(E));let v=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${v}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:g,index:A.dragging.sourceIndex,el:t}}))},m=()=>{a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b));let d=t.getAttribute("drag-group");if(d&&A.selected.has(d))for(let b of A.selected.get(d))a.split(/\s+/).filter(Boolean).forEach(h=>b.el.classList.remove(h));if(l&&i&&i!=="none"){let b=t.querySelector(i);b&&b.classList.remove(l)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:A.dragging?.item,index:A.dragging?.sourceIndex,dropped:A.dragging===null}})),A.dragging=null,re()};if(t.addEventListener("dragstart",p),t.addEventListener("dragend",m),e.onDispose(()=>{t.removeEventListener("dragstart",p),t.removeEventListener("dragend",m)}),s){let d=function(){let b=!!e.disabled();t.draggable=!b,b?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(d)}let u=d=>{if(A.dragging&&!A.dragging.sourceEl.isConnected&&(A.dragging=null),d.key===" "&&!A.dragging){d.preventDefault();let b=e.value();A.dragging={item:b,type:r,effect:o,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},a.split(/\s+/).filter(Boolean).forEach(g=>t.classList.add(g));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:t}}))}else d.key==="Escape"&&A.dragging&&A.dragging.sourceEl===t&&(d.preventDefault(),a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),de("Drag cancelled."),A.dragging=null,re())};t.addEventListener("keydown",u),e.onDispose(()=>t.removeEventListener("keydown",u))}function Kt(t){if(ue(t)){t.directive("drop",{priority:15,init(e,r){ke(),Ut(e,Fo(e,r)),zo(e,r)}});return}Ze(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){ke(),Ut(e,Ro(t,e,o))}})}function Ro(t,e,r){let o=t.findContext(e);le(e,o);let n=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>n?t.evaluate(n,o):!1,max:()=>i?t.evaluate(i,o):void 0,run(c){let s=X(t,"execStatement");typeof s=="function"?s(r,o,c):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:c=>pe(e,c)}}function Fo(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function zo(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",o=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),o.split(/\s+/).filter(Boolean).forEach(n=>t.classList.remove(n)),A.placeholder&&t.contains(A.placeholder)&&re()})}function Ut(t,e){let r=t.getAttribute("drop-accept")||"default",o=t.getAttribute("drop-effect")||"move",n=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",c=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),a=t.getAttribute("drop-sort"),l=t.getAttribute("drop-placeholder"),f=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",o);let p=0,m=g=>{if(!A.dragging||c&&e.disabled())return;let v=Ee(A.dragging.type,r),y=!0;if(s){let E=e.max(),w=Ke(t);typeof E=="number"&&w>=E&&(y=!1)}if(!v||!y){i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E)),n.split(/\s+/).filter(Boolean).forEach(E=>t.classList.remove(E)),re();return}if(i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.remove(E)),g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect=o),a){let E=Xe(t,g.clientX,g.clientY,a);l&&Gt(t,E,l,f),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:A.dragging.item,index:E}}))}},u=g=>{if(A.dragging&&!(c&&e.disabled())&&(p++,p===1)){let v=Ee(A.dragging.type,r),y=!0;if(s){let E=e.max(),w=Ke(t);typeof E=="number"&&w>=E&&(y=!1)}v&&y?(n.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:A.dragging.item,type:A.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E))}},d=g=>{A.dragging&&(p--,p<=0&&(p=0,n.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),i.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),re(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:A.dragging.item}}))))},b=g=>{if(g.preventDefault(),g.stopPropagation(),p=0,!A.dragging||c&&e.disabled()||!Ee(A.dragging.type,r))return;if(s){let L=e.max(),j=Ke(t);if(typeof L=="number"&&j>=L)return}let v=A.dragging.item,y=A.dragging.type,E=A.dragging.effect,w=0;a&&(w=Xe(t,g.clientX,g.clientY,a)),n.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),i.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),re();let _={$drag:v,$dragType:y,$dragEffect:E,$dropIndex:w,$source:{list:A.dragging.sourceList,index:A.dragging.sourceIndex,el:A.dragging.sourceEl},$target:{list:null,index:w,el:t},$el:t};e.run(_),A.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:v,index:w,source:_.$source,target:_.$target,effect:E}}))},h=g=>{A.dragging&&(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b(g))};t.addEventListener("dragover",m),t.addEventListener("dragenter",u),t.addEventListener("dragleave",d),t.addEventListener("drop",b),t.addEventListener("keydown",h),e.onDispose(()=>{t.removeEventListener("dragover",m),t.removeEventListener("dragenter",u),t.removeEventListener("dragleave",d),t.removeEventListener("drop",b),t.removeEventListener("keydown",h)})}function Xt(t){Ze(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){ke();let n=t.findContext(e);le(e,n);let i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",l=e.getAttribute("drag-type")||"__draglist_"+o,f=e.getAttribute("drop-accept")||l,p=e.hasAttribute("drag-list-copy"),m=e.hasAttribute("drag-list-remove"),u=e.getAttribute("drag-disabled"),d=e.getAttribute("drop-disabled"),b=e.getAttribute("drop-max"),h=e.getAttribute("drop-placeholder"),g=e.getAttribute("drop-placeholder-class"),v=e.getAttribute("drag-class")||"nojs-dragging",y=e.getAttribute("drop-class")||"nojs-drag-over",E=e.getAttribute("drop-reject-class")||"nojs-drop-reject",w=e.getAttribute("drop-settle-class")||"nojs-drop-settle",_=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",p?"copy":"move");let L={listPath:o,ctx:n,el:e};Ye.set(e,L),pe(e,()=>Ye.delete(e));let j=0,x=null;function C(){let S=t.resolve(o,n);if(!Array.isArray(S))return;if(S===x&&S.length>0&&e.children.length>0){for(let z of e.children)z.__ctx&&z.__ctx.$notify&&z.__ctx.$notify();return}x=S;let $=i?document.getElementById(i):null;if(!$)return;let q=X(t,"disposeChildren");typeof q=="function"&&q(e),e.innerHTML="";let R=S.length;S.forEach((z,K)=>{let te={[s]:z,$index:K,$count:R,$first:K===0,$last:K===R-1,$even:K%2===0,$odd:K%2!==0},Z=t.createContext(te,n),ae=$.content.cloneNode(!0),B=document.createElement("div");B.style.display="contents",B.__ctx=Z,B.appendChild(ae),e.appendChild(B);let F=B.firstElementChild||B;F.draggable=!0,F.setAttribute("role","option"),F.setAttribute("aria-roledescription","draggable item"),F.getAttribute("tabindex")||F.setAttribute("tabindex","0");let ce=N=>{if(u&&t.evaluate(u,n)){N.preventDefault();return}A.dragging={item:z,type:l,effect:p?"copy":"move",sourceEl:B,sourceCtx:Z,sourceList:S,sourceIndex:K,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:p,removeMode:m}},N.dataTransfer&&(N.dataTransfer.effectAllowed=p?"copy":"move",N.dataTransfer.setData("text/plain","")),v.split(/\s+/).filter(Boolean).forEach(xe=>F.classList.add(xe));let Q=F.getAttribute("aria-label")||F.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${Q}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:z,index:K,el:F}}))},ye=()=>{v.split(/\s+/).filter(Boolean).forEach(N=>F.classList.remove(N)),A.dragging&&A.dragging.sourceEl===B&&(A.dragging=null),re()};B.addEventListener("dragstart",ce),B.addEventListener("dragend",ye);let Ge=N=>{if(N.key===" "&&!A.dragging){N.preventDefault(),N.stopPropagation(),A.dragging={item:z,type:l,effect:p?"copy":"move",sourceEl:B,sourceCtx:Z,sourceList:S,sourceIndex:K,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:p,removeMode:m}},v.split(/\s+/).filter(Boolean).forEach(xe=>F.classList.add(xe));let Q=F.getAttribute("aria-label")||F.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${Q}. Use arrow keys to reorder.`)}else if(N.key==="Escape"&&A.dragging){N.preventDefault(),N.stopPropagation();let Q=e.querySelector(`.${v.split(/\s+/)[0]}`)||F;v.split(/\s+/).filter(Boolean).forEach(xe=>Q.classList.remove(xe)),de("Reorder cancelled."),A.dragging=null,re()}else if((N.key==="ArrowDown"||N.key==="ArrowRight")&&A.dragging&&A.dragging.sourceEl===B){N.preventDefault();let Q=B.nextElementSibling;if(Q){(Q.firstElementChild||Q).focus();let Re=[...e.children].filter(gt=>!gt.classList.contains("nojs-drop-placeholder")),mt=Re.indexOf(Q)+1;de(`Moved to position ${mt} of ${Re.length}.`)}}else if((N.key==="ArrowUp"||N.key==="ArrowLeft")&&A.dragging&&A.dragging.sourceEl===B){N.preventDefault();let Q=B.previousElementSibling;if(Q){(Q.firstElementChild||Q).focus();let Re=[...e.children].filter(gt=>!gt.classList.contains("nojs-drop-placeholder")),mt=Re.indexOf(Q)+1;de(`Moved to position ${mt} of ${Re.length}.`)}}};B.addEventListener("keydown",Ge),B.__disposers=B.__disposers||[],B.__disposers.push(()=>B.removeEventListener("dragstart",ce),()=>B.removeEventListener("dragend",ye),()=>B.removeEventListener("keydown",Ge)),t.processTree(B)});let P=S.length===0;_.split(/\s+/).filter(Boolean).forEach(z=>e.classList.toggle(z,P))}let D=S=>{if(!A.dragging||d&&t.evaluate(d,n))return;let $=Ee(A.dragging.type,f),q=!0;if(b){let P=t.evaluate(b,n),z=t.resolve(o,n);typeof P=="number"&&Array.isArray(z)&&z.length>=P&&(q=!1)}if(!$||!q){E.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P)),y.split(/\s+/).filter(Boolean).forEach(P=>e.classList.remove(P)),re();return}E.split(/\s+/).filter(Boolean).forEach(P=>e.classList.remove(P)),S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect=p?"copy":"move");let R=Xe(e,S.clientX,S.clientY,a);h&&Gt(e,R,h,g)},H=S=>{if(A.dragging&&!(d&&t.evaluate(d,n))&&(j++,j===1)){let $=Ee(A.dragging.type,f),q=!0;if(b){let R=t.evaluate(b,n),P=t.resolve(o,n);typeof R=="number"&&Array.isArray(P)&&P.length>=R&&(q=!1)}$&&q?(y.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:A.dragging.item,type:A.dragging.type}}))):E.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R))}},k=()=>{A.dragging&&(j--,j<=0&&(j=0,y.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),E.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),re(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:A.dragging?.item}}))))},G=S=>{if(S.preventDefault(),S.stopPropagation(),j=0,!A.dragging||d&&t.evaluate(d,n)||!Ee(A.dragging.type,f))return;if(b){let B=t.evaluate(b,n),F=t.resolve(o,n);if(typeof B=="number"&&Array.isArray(F)&&F.length>=B)return}let $=A.dragging.item,q=A.dragging.listDirective,R=A.dragging.sourceIndex,P=Xe(e,S.clientX,S.clientY,a);y.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),E.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),re();let z=t.resolve(o,n);if(!Array.isArray(z))return;let K=q&&q.el===e;if(K&&R===P){A.dragging=null;return}if(K&&R+1===P){A.dragging=null;return}let te=[...z];if(K){let[B]=te.splice(R,1),F=R<P?P-1:P;te.splice(F,0,B),n.$set(o,te),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:te,item:$,from:R,to:F}}))}else{let B=p&&typeof $=="object"?{...$}:$;if(te.splice(P,0,B),n.$set(o,te),q&&!q.copyMode&&(m||q.removeMode)){let F=t.resolve(q.listPath,q.ctx);if(Array.isArray(F)&&R!=null){let ce=F.filter((ye,Ge)=>Ge!==R);q.ctx.$set(q.listPath,ce),q.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ce,item:$,index:R}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:te,item:$,from:R,fromList:q?t.resolve(q.listPath,q.ctx):null}}))}let Z=A.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||A.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",ae=K&&R<P?P:P+1;de(`Dropped ${Z} at position ${ae}.`),requestAnimationFrame(()=>{let F=[...e.children][K&&R<P?P-1:P];if(F){let ce=F.firstElementChild||F;w.split(/\s+/).filter(Boolean).forEach(ye=>ce.classList.add(ye)),ce.addEventListener("animationend",()=>{w.split(/\s+/).filter(Boolean).forEach(ye=>ce.classList.remove(ye))},{once:!0})}}),A.dragging=null},V=S=>{if(A.dragging&&Ee(A.dragging.type,f)&&(S.key==="Enter"||S.key===" ")){S.preventDefault();let $=e.querySelector(":focus");if($){let R=($.style?.display==="contents"&&$.firstElementChild||$).getBoundingClientRect(),P={preventDefault(){},stopPropagation(){},clientX:R.left+R.width/2,clientY:R.top+R.height+1,dataTransfer:null};G(P)}}};e.addEventListener("dragover",D),e.addEventListener("dragenter",H),e.addEventListener("dragleave",k),e.addEventListener("drop",G),e.addEventListener("keydown",V),pe(e,()=>{e.removeEventListener("dragover",D),e.removeEventListener("dragenter",H),e.removeEventListener("dragleave",k),e.removeEventListener("drop",G),e.removeEventListener("keydown",V)});let ve=n.$watch(C);pe(e,ve),C()}})}function Zt(t){Ze(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e);le(e,o);let n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}A.selected.has(n)||A.selected.set(n,new Set);let c=A.selected.get(n),s=l=>{let f=e.getAttribute("drag"),m={item:f?t.evaluate(f,o):null,el:e,ctx:o};if(l.ctrlKey||l.metaKey){let u=[...c].find(d=>d.el===e);u?(c.delete(u),i.split(/\s+/).filter(Boolean).forEach(d=>e.classList.remove(d))):(c.add(m),i.split(/\s+/).filter(Boolean).forEach(d=>e.classList.add(d)))}else{for(let u of c)i.split(/\s+/).filter(Boolean).forEach(d=>u.el.classList.remove(d));c.clear(),c.add(m),i.split(/\s+/).filter(Boolean).forEach(u=>e.classList.add(u))}};e.addEventListener("click",s),pe(e,()=>{e.removeEventListener("click",s);let l=[...c].find(f=>f.el===e);l&&c.delete(l)});let a=l=>{if(l.key==="Escape"){for(let f of c)i.split(/\s+/).filter(Boolean).forEach(p=>f.el.classList.remove(p));c.clear()}};window.addEventListener("keydown",a),pe(e,()=>window.removeEventListener("keydown",a))}})}var Qt=["drag","drop"];function bt(t,e={}){Yt(t),Kt(t),!ue(t)&&(Xt(t),Zt(t))}function Jt(){Ot()}var er=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],ht=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function fe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ar,cr,Je,Fe,yt,tr,Qe,Et,rr,xt;function Oo(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function dr(){return X(ar,"validators")||{}}function Vo(t){return(t.getAttribute("type")||"text").toLowerCase()}var lr=new Set(["url","min","max"]);function ur(t){return t==null||String(t).trim()===""}function pr(t){return(t.hasAttribute("validate-empty")?t.getAttribute("validate-empty"):t.closest("form[validate]")?.getAttribute("validate-empty"))==="skip"}function No(t,e){let r=[],o=new Set,n=ur(t.value)&&pr(t),i=dr(),c=t.getAttribute("validate");if(c){let a=c.split("|").map(l=>l.trim());for(let l of a){let[f,...p]=l.split(":"),m=i[f];if(m){let u=m(t.value,...p,e);u!==!0&&u&&(r.push({rule:f,message:u}),o.add(f))}else{if(n&&lr.has(f))continue;let u=t.value,d=null;switch(f){case"required":(u==null||String(u).trim()==="")&&(d="Required");break;case"email":u&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)&&(d="Invalid email");break;case"url":try{new URL(u)}catch{d="Invalid URL"}break;case"min":Number(u)<Number(p[0])&&(d=`Minimum value is ${p[0]}`);break;case"max":Number(u)>Number(p[0])&&(d=`Maximum value is ${p[0]}`);break;case"custom":if(p[0]&&i[p[0]]){let b=i[p[0]](u,e);b!==!0&&b&&(d=b)}break}d&&(r.push({rule:f,message:d}),o.add(f))}}}let s=t.validity;if(s&&!s.valid){for(let[a,l]of er)if(s[a]){let f=l||Vo(t);o.has(f)||(r.push({rule:f,message:t.validationMessage}),o.add(f))}}return r}function Wo(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Uo(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=ht.indexOf(n.rule),s=ht.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:Wo(e,o.rule,o.message)}}function fr(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Go(t,e,r,o,n){let i=fr(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;Et(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.setAttribute("aria-live","polite"),a.__errorTemplateFor=o;let l=Je({$error:e,$rule:r,err:{message:e}},n);a.__ctx=l,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Oo(a),yt(a)}function vt(t){let e=fr(t);e&&(Et(e),e.remove())}function nr(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!cr(r,e)}catch{return!0}}function or(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function ir(t){return t.hasAttribute("model")?t.tagName==="SELECT"||t.type==="checkbox"||t.type==="radio"?"change":"input":null}function sr(t,e){return()=>{let r=t.getAttribute("model"),o=t.__gatedDirs&&t.__gatedDirs.some(n=>n.name==="model");if(r&&!o&&xt&&(t.type!=="radio"||t.checked)){let n=t.type==="checkbox"?t.checked:t.value;xt(`${r} = __val`,Fe(t),{__val:n})}e()}}function Yo(t,e,r,o=!1){let n=o&&ur(t),i=dr(),c=e.split("|").map(s=>s.trim());for(let s of c){let[a,...l]=s.split(":"),f=i[a];if(f){let p=f(t,...l,r);if(p!==!0&&p)return p}else{if(n&&lr.has(a))continue;switch(a){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(l[0]))return`Minimum value is ${l[0]}`;break;case"max":if(Number(t)>Number(l[0]))return`Maximum value is ${l[0]}`;break;case"custom":if(l[0]&&i[l[0]]){let p=i[l[0]](t,r);if(p!==!0&&p)return p}break}}}return null}function Ko(t){if(t.__ctx)return t.__ctx;let e=null;for(let o=t.parentElement;o;o=o.parentElement)if(o.__ctx){if(!Nt(o))return Fe(t);e=o.__ctx;break}let r=Je({},e);return t.__ctx=r,r}function mr(t){ar=t,cr=t.evaluate,Je=t.createContext,Fe=t.findContext,yt=t.processTree,tr=X(t,"cloneTemplate")||(()=>null),Qe=X(t,"disposeChildren")||(()=>{}),Et=X(t,"disposeTree")||Qe,rr=X(t,"warn")||console.warn,xt=X(t,"execStatement");let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):rr('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let m=function(){c&&typeof c.$notify=="function"&&c.$notify();let _=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;_.nextNode();){let j=_.currentNode.__ctx;j&&j!==c&&typeof j.$notify=="function"&&j.$notify()}},u=function(){return r.querySelectorAll("input, textarea, select")},d=function(){let _={},L={},j={},x=!0,C=null,D=0,H=!1;for(let k of u())k.name&&(k.type==="checkbox"?L[k.name]=k.checked:k.type==="radio"?k.checked?L[k.name]=k.value:k.name in L||(L[k.name]=""):L[k.name]=k.value);for(let k of u()){if(!k.name)continue;let G=a.has(k.name),V=l.has(k.name);if(!nr(k,c)){j[k.name]={valid:!0,dirty:V,touched:G,error:null,value:L[k.name]},k.removeAttribute("aria-invalid");let Z=k.getAttribute("error-class")||s;Z&&k.classList.remove(...Z.split(/\s+/)),vt(k);let ae=k.getAttribute("as");ae&&c.$set(ae,j[k.name]);continue}let ve=No(k,L),S=Uo(ve,k),$=!S,q=or(k,r),R=q.includes("input"),P=q.includes("blur")||q.includes("focusout")||q.includes("submit"),z;!k.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?z=G||V:z=R&&V||P&&G,$||(x=!1),!$&&z&&(_[k.name]=S.message,D++,C||(C=S.message)),j[k.name]={valid:$,dirty:V,touched:G,error:S?S.message:null,value:L[k.name]},!$&&z?k.setAttribute("aria-invalid","true"):k.removeAttribute("aria-invalid");let K=k.getAttribute("error-class")||s;if(K){let Z=K.split(/\s+/);!$&&z?k.classList.add(...Z):k.classList.remove(...Z)}if(S&&z){let Z=k.getAttribute(`error-${S.rule}`),ae=k.getAttribute("error"),B=(Z&&Z.startsWith("#")?Z:null)||(ae&&ae.startsWith("#")?ae:null);B?Go(B,S.message,S.rule,k,c):vt(k)}else vt(k);let te=k.getAttribute("as");te&&c.$set(te,j[k.name])}f.size>0&&(H=!0),p.valid=x,p.errors=_,p.values=L,p.fields=j,p.firstError=C,p.errorCount=D,p.pending=H,c.$set("$form",{...p}),m(),b(r)},b=function(_){let L=p.valid&&!p.pending&&!p.submitting,j=_.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let x of j)if(x.getAttribute("auto-disable")!=="off"){if(x.hasAttribute("disabled")&&x.getAttribute("disabled")!==""){let C=x.getAttribute("disabled");if(C!=="disabled"&&C!=="true"&&C!=="false")continue}x.disabled=!L,x.__autoDisabled=!0}},g=function(_,L,j){_.addEventListener(L,j),fe(r,()=>_.removeEventListener(L,j))},v=function(_){if(!_.name)return;let L=or(_,r),j=ir(_),x=H=>{if(j==="change"){g(_,"input",sr(_,H));return}g(_,"input",H),j&&h.push([_,"input",H])},C=()=>{l.add(_.name),p.dirty=!0,d()},D=()=>{a.add(_.name),p.touched=!0,d()};L.includes("input")?x(C):x(()=>{l.add(_.name),p.dirty=!0,d()}),L.includes("blur")||L.includes("focusout")?g(_,"focusout",()=>{D(),L.includes("blur")&&C()}):g(_,"focusout",D),L.includes("submit")&&g(_,"focusout",D)},c=Ko(r);le(r,c),r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,l=new Set,f=new Map,p={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{p.dirty=!1,p.touched=!1,p.pending=!1,p.submitting=!1,a.clear(),l.clear(),r.reset(),d()},endSubmit:()=>{p.submitting=!1,d()}};c.$set("$form",p);let h=[],y=r.hasAttribute("validate-on"),E=[...u()].some(_=>_.hasAttribute("validate-on"));if(!y&&!E){let _=x=>{let C=x.target;C&&C.name&&l.add(C.name),p.dirty=!0,d()},L=x=>{x.target&&ir(x.target)==="change"?sr(x.target,()=>_(x))():_(x)};r.addEventListener("input",L),fe(r,()=>r.removeEventListener("input",L)),r.addEventListener("change",_),fe(r,()=>r.removeEventListener("change",_));let j=x=>{x.target&&x.target.name&&a.add(x.target.name),p.touched=!0,d()};r.addEventListener("focusout",j),fe(r,()=>r.removeEventListener("focusout",j))}else{for(let _ of u())v(_);if(h.length){let _=!1;fe(r,()=>{_=!0}),queueMicrotask(()=>{if(!_){for(let[L,j,x]of h)L.removeEventListener(j,x),L.addEventListener(j,x);h.length=0}})}}let w=_=>{for(let L of u())L.name&&a.add(L.name);if(p.touched=!0,d(),!p.valid||p.pending){_.preventDefault(),_.stopImmediatePropagation();return}p.submitting=!0,b(r),c.$set("$form",{...p}),m()};r.addEventListener("submit",w,!0),fe(r,()=>r.removeEventListener("submit",w,!0)),r.__nojsResetSubmitting=()=>{p.submitting=!1,d()},fe(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(d);return}let i=Fe(r);if(le(r,i),n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=!!r.closest("form[validate]"),s=c?null:r.getAttribute("error"),a=()=>{if(c&&!nr(r,Fe(r))){r.removeAttribute("aria-invalid");return}let l=Yo(r.value,n,{},pr(r));if(l?r.setAttribute("aria-invalid","true"):r.removeAttribute("aria-invalid"),l&&s){let f=r.nextElementSibling?.__validationError?r.nextElementSibling:null;f||(f=document.createElement("div"),f.__validationError=!0,f.style.display="contents",r.parentNode.insertBefore(f,r.nextSibling));let p=tr(s);if(p){let m=Je({err:{message:l}},i);Qe(f),f.innerHTML="",f.__ctx=m,f.appendChild(p),yt(f)}}else{let f=r.nextElementSibling?.__validationError?r.nextElementSibling:null;f&&(Qe(f),f.innerHTML="")}};r.addEventListener("input",a),fe(r,()=>r.removeEventListener("input",a))}}})}function gr(t,e={}){mr(t)}function br(){}var Ce=new Map,ee=new Map;function hr(){let t=Array.from(Ce.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of ee.values())clearTimeout(e);ee.clear();for(let e of Ce.values())e.remove();Ce.clear()}function vr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Xo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var et=8;function xr(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+et,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-et;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+et;break;default:s=o.top-n.height-et,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Zo=0;function Qo(t,e,r){document.body.appendChild(e),xr(e,t,r),e.setAttribute("aria-hidden","false")}function yr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Jo(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Er(t){t.directive("tooltip",{priority:20,init(e,r,o){vr();let n=o;if(!n){Jo(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),l=a?t.findContext(e):null,f=()=>{if(!a||!l)return!1;try{return!!t.evaluate(a,l)}catch{return!1}},p=`nojs-tooltip-${++Zo}`,m=document.createElement("div");m.className="nojs-tooltip",m.setAttribute("role","tooltip"),m.setAttribute("id",p),m.setAttribute("aria-hidden","true"),m.textContent=n,e.setAttribute("aria-describedby",p),Ce.set(e,m);let u=!1,d=0,b=()=>{!u||!e.isConnected||d||(d=requestAnimationFrame(()=>{d=0,!(!u||!e.isConnected)&&xr(m,e,i)}))},h=()=>{window.addEventListener("scroll",b,!0),window.addEventListener("resize",b)},g=()=>{window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),d&&(cancelAnimationFrame(d),d=0)},v=()=>{u||(Qo(e,m,i),u=!0,h())},y=()=>{if(!u){yr(e,m);return}g(),yr(e,m),u=!1},E=()=>{if(f())return;ee.has(e)&&clearTimeout(ee.get(e));let H=setTimeout(()=>{ee.delete(e),!f()&&e.isConnected&&v()},s);ee.set(e,H)},w=()=>{ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),y()},_=()=>E(),L=()=>w(),j=()=>E(),x=()=>w(),C=H=>{H.key==="Escape"&&m.getAttribute("aria-hidden")==="false"&&w()};e.addEventListener("mouseenter",_),e.addEventListener("mouseleave",L),e.addEventListener("focusin",j),e.addEventListener("focusout",x),e.addEventListener("keydown",C);let D=null;if(a&&l&&typeof l.$watch=="function"){let H=()=>{u&&f()&&y()};D=l.$watch(H)}Xo(e,()=>{e.removeEventListener("mouseenter",_),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",j),e.removeEventListener("focusout",x),e.removeEventListener("keydown",C),D&&(D(),D=null),g(),ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),u=!1,m.remove(),Ce.delete(e)})}})}function _r(t,e={}){Er(t)}function Ar(){hr()}var Y=new Map;function wr(){Y.clear()}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function _t(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Se(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function wt(t){try{return t.matches(":popover-open")}catch{return!1}}var me=8;function rt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-me,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-me;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+me;break;default:s=o.bottom+me,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-me),r==="top"&&s<0&&(s=o.bottom+me),r==="right"&&a+n.width>i&&(a=o.left-n.width-me),r==="left"&&a<0&&(a=o.right+me),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function At(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(!wt(c)){i();return}rt(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function _e(t){t&&t._untrack&&t._untrack()}function jr(t){t.directive("popover",{priority:20,init(r,o,n){tt();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=Y.get(i);a.popoverEl=r,a.position=c}let s=a=>{let l=Y.get(i);if(!l)return;let f=a.newState==="open";l.open=f;for(let p of l.triggerEls)p.setAttribute("aria-expanded",String(f));f||(r.style.visibility="",_e(l))};r.addEventListener("toggle",s),_t(r,()=>{r.removeEventListener("toggle",s);let a=Y.get(i);a&&(_e(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){tt();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,l=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(l&&(i=l.getAttribute("data-popover-id")||l.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let c=a=>{let l=Y.get(i);if(!l||!l.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(Se(l.popoverEl)){l.popoverEl.style.visibility="hidden";try{l.popoverEl.togglePopover(),wt(l.popoverEl)?(rt(l.popoverEl,r,l.position),At(l,r)):_e(l)}finally{l.popoverEl.style.visibility=""}}};r.addEventListener("click",c);let s=a=>{let l=Y.get(i);a.key==="Escape"&&l?.open&&(Se(l.popoverEl,"hidePopover")&&l.popoverEl.hidePopover(),_e(l),r.focus())};document.addEventListener("keydown",s),_t(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=Y.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(_e(a),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){tt();let o=()=>{let n=r.closest(".nojs-popover");!n||!Se(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),_t(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl,"showPopover"))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.showPopover();let i=o||[...n.triggerEls][0];i&&(rt(n.popoverEl,i,n.position),At(n,i))}catch{return!1}finally{n.popoverEl.style.visibility=""}return!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!Se(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return _e(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl))return!1;n.popoverEl.style.visibility="hidden";try{n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];i&&wt(n.popoverEl)?(rt(n.popoverEl,i,n.position),At(n,i)):_e(n)}finally{n.popoverEl.style.visibility=""}return!0},t.popover=e}function Lr(t,e={}){jr(t)}function kr(){wr()}var W=[],ie=new Map,ei=1e4;function Cr(){return ei+W.length}function Sr(){W.length=0,ie.clear()}function De(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function ti(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Tr='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',jt=new WeakMap;function ri(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(Tr)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),jt.set(t,e)}function Dr(t){let e=jt.get(t);e&&(t.removeEventListener("keydown",e),jt.delete(t))}var ze=new WeakMap;function Ir(t){t.directive("modal",{priority:10,init(r,o,n){De();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),l=r.getAttribute("modal-escape"),f=m=>{m.target===r&&s!=="false"&&l!=="false"&&Te(r,i)};r.addEventListener("click",f),ie.set(i,r);let p=m=>{if(m.newState==="open"){if(r.style.zIndex=String(Cr()),a&&a.split(/\s+/).filter(Boolean).forEach(u=>r.classList.add(u)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(d=>d.el===r))return;let u=r.querySelector(Tr);u?u.focus():r.focus()}),ri(r),l!=="false"){let u=d=>{d.key==="Escape"&&(d.stopPropagation(),Te(r,i))};r.addEventListener("keydown",u),ze.set(r,u)}}else if(m.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(b=>r.classList.remove(b)),Dr(r);let u=ze.get(r);u&&(r.removeEventListener("keydown",u),ze.delete(r));let d=W.findIndex(b=>b.el===r);if(d===-1&&(d=W.findIndex(b=>b.id===i)),d!==-1){let b=W[d];W.splice(d,1),b.triggerEl&&requestAnimationFrame(()=>{b.triggerEl.focus()})}}};r.addEventListener("toggle",p),ti(r,()=>{r.removeEventListener("click",f),r.removeEventListener("toggle",p),Dr(r);let m=ze.get(r);m&&(r.removeEventListener("keydown",m),ze.delete(r)),ie.delete(i);let u=W.findIndex(d=>d.el===r);u===-1&&(u=W.findIndex(d=>d.id===i)),u!==-1&&W.splice(u,1)})}});let e=r=>e.open(r);e.open=r=>{let o=ie.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=ie.get(r);return o?(Te(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)Te(W[r].el,W[r].id)},t.modal=e}function Te(t,e){try{t.hidePopover()}catch{}}function Br(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ni(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function Hr(t){t.directive("modal-open",{priority:10,init(e,r,o){De();let n=o;if(!n){let p=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(p&&(n=p.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let f=ie.get(n)||ni(n);if(!f){console.warn(`[modal-open] modal "${n}" not found`);return}let p=W.some(m=>m.id===n);f.id&&e.setAttribute("aria-controls",f.id);try{f.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}p||W.push({id:n,el:f,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,l=()=>{let f=ie.get(n);return f?(a=f,s=p=>{p.newState==="closed"&&e.setAttribute("aria-expanded","false")},f.addEventListener("toggle",s),!0):!1};if(!l()){let f=requestAnimationFrame(l);Br(e,()=>cancelAnimationFrame(f))}e.addEventListener("click",i),Br(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function oi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $r(t){t.directive("modal-close",{priority:10,init(e,r,o){De();let n=()=>{let i,c;if(o){if(c=o,i=ie.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Te(i,c)};e.addEventListener("click",n),oi(e,()=>{e.removeEventListener("click",n)})}})}function Mr(t,e={}){Ir(t),Hr(t),$r(t)}function Pr(){Sr()}var ne={openMenus:new Map},O={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function qr(){ne.openMenus.clear(),O.installed=!1,O.instanceCount=0,O.outsideClickHandler=null,O.escHandler=null}function Ie(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var ii=0;function si(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ai(){O.installed||(O.outsideClickHandler=t=>{let e=[...ne.openMenus.entries()];for(let[r,{toggle:o,wrapper:n}]of e)if(!n.contains(t.target)){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}ne.openMenus.delete(r)}},O.escHandler=t=>{if(t.key!=="Escape")return;let e=[...ne.openMenus.entries()];for(let[r,{toggle:o}]of e){if(r.removeAttribute("data-open"),o.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}o.focus()}ne.openMenus.clear()},document.addEventListener("click",O.outsideClickHandler,!0),document.addEventListener("keydown",O.escHandler),O.installed=!0)}function kt(){O.installed&&(document.removeEventListener("click",O.outsideClickHandler,!0),document.removeEventListener("keydown",O.escHandler),O.outsideClickHandler=null,O.escHandler=null,O.installed=!1)}function Rr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,l,f;switch(o){case"top":l=i.top-c.height,f=i.left;break;case"left":l=i.top,f=i.left-c.width;break;case"right":l=i.top,f=i.right;break;default:l=i.bottom,f=i.left}o==="bottom"||o==="top"?n==="end"&&(f=i.right-c.width):n==="end"&&(l=i.bottom-c.height),o==="bottom"&&l+c.height>s&&i.top-c.height>0?l=i.top-c.height:o==="top"&&l<0&&i.bottom+c.height<=s&&(l=i.bottom),f<4&&(f=4),f+c.width>a-4&&(f=a-c.width-4),t.style.top=`${l}px`,t.style.left=`${f}px`}function Ct(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Lt(t){let e=Ct(t);e.length&&e[0].focus()}function Fr(t){let e=Ct(t);e.length&&e[e.length-1].focus()}function zr(t){t.directive("dropdown",{priority:15,init(r){Ie()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ie();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${ii++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Rr(n,r,o),ne.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ne.openMenus.delete(n)}function l(){return r.getAttribute("aria-expanded")==="true"}let f=b=>{b.newState==="closed"&&l()&&a()};n.addEventListener("toggle",f);let p=b=>{b.preventDefault(),b.stopPropagation(),l()?a():s()};r.addEventListener("click",p),O.instanceCount++,ai();let m=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),Lt(n);break;case"ArrowDown":b.preventDefault(),s(),Lt(n);break;case"ArrowUp":b.preventDefault(),s(),Fr(n);break}};r.addEventListener("keydown",m);let u=b=>{if(!(!l()||Ct(n).find(v=>v===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),Lt(n);break;case"ArrowUp":b.preventDefault(),Fr(n);break}};n.addEventListener("keydown",u);let d=()=>{l()&&Rr(n,r,o)};window.addEventListener("scroll",d,!0),window.addEventListener("resize",d),si(r,()=>{r.removeEventListener("click",p),r.removeEventListener("keydown",m),n.removeEventListener("keydown",u),n.removeEventListener("toggle",f),window.removeEventListener("scroll",d,!0),window.removeEventListener("resize",d),ne.openMenus.delete(n),O.instanceCount--,O.instanceCount<=0&&(O.instanceCount=0,kt())})}}),t.directive("dropdown-menu",{priority:15,init(r){Ie(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function Or(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ci(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function St(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ne.openMenus.has(t)&&ne.openMenus.delete(t)}function Vr(t){t.directive("dropdown-item",{priority:15,init(e){Ie();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=ci(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),St(r,o),o){let l=o.querySelector("[dropdown-toggle]");l&&l.focus()}break}case"Tab":{St(r,o);break}}};e.addEventListener("keydown",n),Or(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(St(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),Or(e,()=>e.removeEventListener("click",i))}})}function Nr(t,e={}){zr(t),Vr(t)}function Wr(){kt(),qr()}var se=new Map,Be=new Set,Ur=0;function Gr(){return++Ur}function Yr(){for(let t of Be)clearTimeout(t);Be.clear();for(let t of se.values())t.remove();se.clear(),Ur=0}function Kr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Dt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var di=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Tt(){return se.size>0?se.values().next().value:li("top-right")}function li(t){if(se.has(t))return se.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),se.set(t,e),e}function ui(t){return t.startsWith("top")}function It(t,e,r,o,n){let i=Gr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let l=document.createElement("button");l.type="button",l.classList.add("nojs-toast-dismiss"),l.setAttribute("aria-label","Dismiss"),l.textContent="\xD7",l.addEventListener("click",()=>nt(s)),s.appendChild(l)}if(ui(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let l=setTimeout(()=>{Be.delete(l),s.isConnected&&nt(s)},o);Be.add(l),s._toastTimerId=l}return s}function nt(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Be.delete(t._toastTimerId)),t.remove())}function Xr(t){Kr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&di.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),se.set(i,r),Dt(r,()=>{se.get(i)===r&&se.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let d=()=>{let b=Tt();It(b,n,i,s,a)};r.addEventListener("click",d),Dt(r,()=>r.removeEventListener("click",d));return}let f=t.findContext(r);if(!f||typeof f.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let p;function m(){let d=t.evaluate(n,f);if(d&&d!==p){let b=typeof d=="string"?d:String(d),h=Tt();It(h,b,i,s,a),p=d}else p=d}let u=f.$watch(m);Dt(r,u)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=Tt();return It(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&nt(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>nt(r))},t.toast=e,t.global("toast",e)}function Zr(t,e={}){Xr(t)}function Qr(){Yr()}var Ae={containers:new Map};function Jr(){Ae.containers.clear()}function en(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function pi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var fi=0;function tn(t){return`${t}-${++fi}`}function Oe(t,e,r=!1){let o=Ae.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Ve(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function rn(t){t.directive("tabs",{priority:10,init(e,r,o){en();let n=[],i=[];for(let g of Array.from(e.children))g.hasAttribute("tab")?n.push(g):g.hasAttribute("panel")&&i.push(g);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let g=0;g<a;g++){let v=n[g],y=i[g],E=v.id||tn("nojs-tab"),w=y.id||tn("nojs-panel");v.id=E,y.id=w,v.setAttribute("role","tab"),v.setAttribute("aria-selected","false"),v.setAttribute("aria-controls",w),v.setAttribute("tabindex","-1"),v.classList.add("nojs-tab"),y.setAttribute("role","tabpanel"),y.setAttribute("aria-labelledby",E),y.setAttribute("tabindex","0"),y.setAttribute("aria-hidden","true"),y.inert=!0,y.classList.add("nojs-panel"),s.appendChild(v)}for(let g=a;g<i.length;g++){let v=i[g];v.setAttribute("role","tabpanel"),v.setAttribute("aria-hidden","true"),v.inert=!0,v.classList.add("nojs-panel")}let l=i[0];l?e.insertBefore(s,l):e.appendChild(s),Ae.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let f=t.findContext(e),p=[],m=(g,v)=>{let y=!1;try{y=!!t.evaluate(v,f)}catch{y=!1}y?g.setAttribute("aria-disabled","true"):g.removeAttribute("aria-disabled")};for(let g=0;g<a;g++){let v=n[g],y=v.getAttribute("tab-disabled");if(y&&(m(v,y),f&&typeof f.$watch=="function")){let E=f.$watch(()=>m(v,y));p.push(E)}}let u=0;if(o&&o.trim()!==""){let g=parseInt(o,10);!isNaN(g)&&g>=0&&g<a&&(u=g)}let d=n.slice(0,a);if(n[u]?.getAttribute("aria-disabled")==="true"){let g=Ve(d,u,1);g!==-1?(u=g,Oe(e,u)):Oe(e,u,!0)}else Oe(e,u);let b=g=>{let v=Ae.containers.get(e);if(!v)return;let y=g.target;if(y.getAttribute("role")!=="tab")return;let{tabs:E}=v,w=E.indexOf(y);if(w===-1)return;let _=-1;switch(g.key){case"ArrowRight":case"ArrowDown":_=Ve(E,w,1);break;case"ArrowLeft":case"ArrowUp":_=Ve(E,w,-1);break;case"Home":_=Ve(E,E.length-1,1);break;case"End":_=Ve(E,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==w&&(g.preventDefault(),Oe(e,_),E[_].focus())};s.addEventListener("keydown",b);let h=g=>{let v=g.target.closest("[role='tab']");if(!v)return;let y=Ae.containers.get(e);if(!y)return;let E=y.tabs.indexOf(v);E!==-1&&v.getAttribute("aria-disabled")!=="true"&&(Oe(e,E),v.focus())};s.addEventListener("click",h),pi(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",h);for(let g of p)g&&g();p.length=0,Ae.containers.delete(e)})}})}function nn(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function on(t){t.directive("panel",{priority:11,init(){}})}function sn(t,e={}){rn(t),nn(t),on(t)}function an(){Jr()}var M={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function cn(){M.branches.clear(),M.selectedItem=null,M.typeahead="",M.typeaheadTimer&&(clearTimeout(M.typeaheadTimer),M.typeaheadTimer=null)}function He(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function $e(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function dn(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function ln(t){return t.closest('[role="tree"]')}function mi(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function gi(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function Bt(t){let e=M.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),M.selectedItem=t}function un(t){let e=M.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function bi(t){let e=M.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function hi(t){let e=M.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function pn(t,e){let r=ln(e);if(!r)return;let o=dn(r),n=o.indexOf(e);if(n<0)return;let i=M.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)bi(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&we(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)hi(e);else{let s=mi(e);s&&we(s,dn(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&we(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&we(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),Bt(e),c&&un(e);break;case"Home":t.preventDefault(),o.length>0&&we(o[0],o);break;case"End":t.preventDefault(),o.length>0&&we(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),M.typeahead+=t.key.toLowerCase(),M.typeaheadTimer&&clearTimeout(M.typeaheadTimer),M.typeaheadTimer=setTimeout(()=>{M.typeahead="",M.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let l=(s+a)%o.length;if(gi(o[l]).startsWith(M.typeahead)){we(o[l],o);break}}}break}}function fn(t){t.directive("tree",{priority:15,init(e){He(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function mn(t){t.directive("branch",{priority:16,init(e,r,o){He();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=ln(e);if(i){let l=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",l?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let l=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);l?(M.branches.set(e,{expanded:n,subtreeEl:l}),l.setAttribute("aria-hidden",String(!n))):M.branches.set(e,{expanded:n,subtreeEl:null})});let s=l=>{l.target.closest?.('[role="treeitem"]')===e&&(l.stopPropagation(),Bt(e),un(e))};e.addEventListener("click",s),$e(e,()=>e.removeEventListener("click",s));let a=l=>{pn(l,e)};e.addEventListener("keydown",a),$e(e,()=>e.removeEventListener("keydown",a)),$e(e,()=>{c=!0,M.branches.delete(e),M.selectedItem===e&&(M.selectedItem=null),M.typeaheadTimer&&(clearTimeout(M.typeaheadTimer),M.typeaheadTimer=null,M.typeahead="")})}})}function we(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function gn(t){t.directive("subtree",{priority:16,init(e){He(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),Bt(o)};o.addEventListener("click",n),$e(o,()=>o.removeEventListener("click",n));let i=c=>{pn(c,o)};o.addEventListener("keydown",i),$e(o,()=>o.removeEventListener("keydown",i)),$e(o,()=>{M.selectedItem===o&&(M.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=M.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function bn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ht(t){return t.closest('[role="treeitem"]')}function vi(t){return t.closest('[role="tree"]')}function yi(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function xi(t){return yi(t).indexOf(t)}function Ei(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function hn(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var I={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Me(){I.indicator&&(I.indicator.remove(),I.indicator=null)}function Ne(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function _i(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function Ai(t,e){Me();let r=_i(),o=t.getBoundingClientRect(),n=vi(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),I.indicator=r}function vn(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(He(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=m=>{let u=Ht(m.target);if(u&&e.contains(u)){if(u.hasAttribute("tree-drag-disabled")){m.preventDefault();return}I.dragging={el:u,treeRoot:e},m.dataTransfer&&(m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain","")),u.classList.add("nojs-dragging"),u.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:u}}))}},c=m=>{if(!I.dragging||I.dragging.treeRoot!==e)return;let u=Ht(m.target);if(!u||!e.contains(u)||u===I.dragging.el||hn(u,I.dragging.el))return;m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let d=Ei(u,m.clientY,o);(I.currentTarget!==u||I.currentPosition!==d)&&(Ne(e),Me(),I.currentTarget=u,I.currentPosition=d,d==="on"?u.classList.add("nojs-tree-drag-over"):Ai(u,d))},s=m=>{I.dragging&&I.dragging.treeRoot===e&&n++},a=m=>{I.dragging&&(n--,n<=0&&(n=0,Ne(e),Me(),I.currentTarget=null,I.currentPosition=null))},l=m=>{if(m.preventDefault(),m.stopPropagation(),n=0,!I.dragging||I.dragging.treeRoot!==e)return;let u=I.dragging.el,d=I.currentTarget,b=I.currentPosition;if(Ne(e),Me(),!d||!b){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(d===u||hn(d,u)){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="on"){let h=d.querySelector(':scope > [role="group"]');h||(h=d.nextElementSibling?.matches?.('[role="group"]')?d.nextElementSibling:null),h?h.setAttribute("aria-hidden","false"):(h=document.createElement("ul"),h.setAttribute("role","group"),h.setAttribute("subtree",""),h.classList.add("nojs-subtree","nojs-tree"),h.setAttribute("aria-hidden","false"),d.appendChild(h));let g=M.branches.get(d);g&&(g.expanded=!0,g.subtreeEl=h,d.setAttribute("aria-expanded","true")),h.appendChild(u),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:u,newParent:d}}))}else{let h=d.parentElement;if(!h){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="before")h.insertBefore(u,d);else{let v=d.nextElementSibling,y=v?.matches?.('[role="group"]')?v.nextElementSibling:v;y?h.insertBefore(u,y):h.appendChild(u)}let g=xi(u);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:u,newIndex:g}}))}I.dragging=null,I.currentTarget=null,I.currentPosition=null},f=m=>{let u=Ht(m.target);u&&u.classList.remove("nojs-dragging"),Ne(e),Me(),n=0,I.dragging&&I.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:I.dragging.el}})),I.dragging=null,I.currentTarget=null,I.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",l),e.addEventListener("dragend",f),bn(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",l),e.removeEventListener("dragend",f),Ne(e),Me()}),wi(e);let p=new MutationObserver(m=>{for(let u of m)for(let d of u.addedNodes){if(d.nodeType!==1)continue;d.getAttribute("role")==="treeitem"&&$t(d);let b=d.querySelectorAll?.('[role="treeitem"]');if(b)for(let h of b)$t(h)}});p.observe(e,{childList:!0,subtree:!0}),bn(e,()=>p.disconnect())}})}function $t(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function wi(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)$t(r)}function yn(t,e={}){fn(t),mn(t),gn(t),vn(t)}function xn(){cn()}var ot=new Map;function En(){ot.clear()}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function _n(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function An(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function wn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function We(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ji(t,e){for(let o=e;o;o=o.parentElement)if(o.__ctx)return t.findContext(e);let r=t.createContext({},null);return e.__ctx=r,Vt(e),r}function jn(t){t.directive("stepper",{priority:14,init(e,r,o){it();let n=Array.from(e.querySelectorAll("[step]"));if(!n.length){console.warn("[stepper] No [step] children found.");return}let i=ji(t,e),c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",l=e.getAttribute("stepper-nav")!=="false",f=e.getAttribute("aria-label")||"Stepper",p=Math.max(0,Math.min(c,n.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",f),e.classList.add("nojs-stepper");let m=null,u=[];if(a){m=document.createElement("div"),m.className="nojs-stepper-indicator",m.setAttribute("role","tablist"),m.setAttribute("aria-label","Progress"),n.forEach((x,C)=>{if(C>0){let V=document.createElement("div");V.className="nojs-stepper-separator",V.setAttribute("aria-hidden","true"),m.appendChild(V)}let D=document.createElement("button");D.type="button",D.className="nojs-stepper-indicator-item",D.setAttribute("role","tab"),D.setAttribute("aria-selected",C===p?"true":"false");let H=x.getAttribute("step-label")||`Step ${C+1}`,k=document.createElement("span");k.textContent=H,D.appendChild(k),D.setAttribute("aria-label",H);let G=`nojs-stepper-tab-${Li++}`;if(D.id=G,s==="free"){D.setAttribute("data-clickable","");let V=()=>w(C);D.addEventListener("click",V),We(e,()=>D.removeEventListener("click",V))}else D.setAttribute("tabindex","-1");m.appendChild(D),u.push(D)});let j=x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let C=p;x.key==="ArrowRight"?C=Math.min(p+1,n.length-1):x.key==="ArrowLeft"?C=Math.max(p-1,0):x.key==="Home"?C=0:x.key==="End"&&(C=n.length-1),s==="free"?(w(C),u[C]?.focus()):u[p]?.focus()};m.addEventListener("keydown",j),We(e,()=>m.removeEventListener("keydown",j)),e.insertBefore(m,e.firstChild)}let d=null,b=null,h=null;if(l){d=document.createElement("div"),d.className="nojs-stepper-nav",d.setAttribute("aria-hidden","true"),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-prev",b.textContent="Previous";let j=()=>E();b.addEventListener("click",j),We(e,()=>b.removeEventListener("click",j)),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-next",h.textContent="Next";let x=()=>y();h.addEventListener("click",x),We(e,()=>h.removeEventListener("click",x)),d.appendChild(b),d.appendChild(h),e.appendChild(d)}function g(j){let x=n[j];if(!x)return!0;if(!_n(x,t.findContext)){let H=x.querySelector("form[validate]");return H&&(An(H),u[j]&&u[j].classList.add("nojs-step-invalid"),wn(e,x,H)),!1}u[j]&&u[j].classList.remove("nojs-step-invalid");let C=x.querySelectorAll("[required]");for(let H of C)if(typeof H.checkValidity=="function"&&!H.checkValidity())return H.reportValidity(),!1;let D=x.getAttribute("step-validate");if(D)try{if(!t.evaluate(D,i))return!1}catch(H){return console.warn(`[stepper] step-validate error: ${H.message}`),!1}return!0}function v(j){if(n.forEach((x,C)=>{let D=C===p;x.setAttribute("aria-hidden",D?"false":"true"),D?(x.removeAttribute("inert"),x.setAttribute("aria-current","step")):(x.setAttribute("inert",""),x.removeAttribute("aria-current"))}),u.length&&u.forEach((x,C)=>{x.setAttribute("aria-selected",C===p?"true":"false"),C<p?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",C===p?"0":"-1");let D=n[C];D.id&&(x.setAttribute("aria-controls",D.id),D.setAttribute("aria-labelledby",x.id))}),b&&(b.disabled=p===0),h&&(h.textContent=p===n.length-1?"Finish":"Next"),!j){let x=n[p];x&&requestAnimationFrame(()=>x.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!j,detail:{current:p,total:n.length}}))}function y(){return p>=n.length-1?(s==="linear"&&!g(p)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:p,total:n.length}})),!1):s==="linear"&&!g(p)?!1:(p++,v(),L(),!0)}function E(){return p<=0?!1:(p--,v(),L(),!0)}function w(j){if(j<0||j>=n.length||j===p)return!1;if(s==="linear"&&j>p){for(let x=p;x<j;x++)if(p=x,v(),!g(x))return L(),!1}return p=j,v(),L(),!0}let _={get current(){return p},get total(){return n.length},next:y,prev:E,goTo:w,get isFirst(){return p===0},get isLast(){return p===n.length-1}};function L(){i.$stepper=_}L(),ot.set(e,{get current(){return p},steps:n,mode:s,indicatorEl:m,navEl:d}),v(!0),We(e,()=>{ot.delete(e),m&&m.parentNode&&m.remove(),d&&d.parentNode&&d.remove(),delete i.$stepper})}})}var Li=0;var ki=0;function Ln(t){t.directive("step",{priority:13,init(e,r,o){it(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${ki++}`),e.setAttribute("tabindex","0")}})}function kn(t,e={}){Ln(t),jn(t)}function Cn(){En()}function Sn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Dn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Tn(t){t.directive("skeleton",{priority:10,init(e,r,o){Sn();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function l(g){f();for(let v=0;v<g;v++){let y=document.createElement("div");y.className="nojs-skeleton-line",e.appendChild(y),a.push(y)}}function f(){for(let g of a)g.parentNode===e&&e.removeChild(g);a=[]}function p(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let g=s+(String(s).match(/\d$/)?"px":"");e.style.width=g,e.style.height=g}if(c){let g=parseInt(c,10);g>0&&l(g)}e.setAttribute("aria-busy","true")}let m=null;function u(){m&&m(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let g=!1,v=null,y=()=>{g||(g=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",y),v!==null&&clearTimeout(v),m=null)};e.addEventListener("transitionend",y),v=setTimeout(y,0),m=()=>{e.removeEventListener("transitionend",y),v!==null&&clearTimeout(v),g=!0,m=null}}let d=!1;function b(){let g=!!t.evaluate(o,n);g&&!d?(d=!0,p()):!g&&d&&(d=!1,u())}b();let h=n.$watch(b);Dn(e,h),Dn(e,()=>{m&&m(),d&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function In(t,e={}){Tn(t)}var je=new Map,U=new Map,T={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Bn(){je.clear(),U.clear(),T.active=!1,T.splitEl=null,T.gutterEl=null,T.prevPane=null,T.nextPane=null,T.direction=null,T.startPos=0,T.startPrevSize=0,T.startNextSize=0,T.containerSize=0}function st(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Ci(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Hn(t){return t==="horizontal"?"clientX":"clientY"}function J(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function $n(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function Si(t,e){let o=(je.get(t)?.gutters||[]).reduce((n,i)=>n+J(i,e),0);return J(t,e)-o}function Di(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Ue(t,e){let r=U.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function at(t,e,r,o){let n=J(e,o),i=J(r,o),c=U.get(e),s=U.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function Mt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=je.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function Ti(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=je.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function Ii(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=u=>{if(u.button!==0)return;u.preventDefault();let d=Si(t,e);T.active=!0,T.splitEl=t,T.gutterEl=i,T.prevPane=r,T.nextPane=o,T.direction=e,T.startPos=u[Hn(e)],T.startPrevSize=J(r,e),T.startNextSize=J(o,e),T.containerSize=d,T.sign=$n(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(u.pointerId)},s=u=>{if(!T.active||T.gutterEl!==i)return;let d=(u[Hn(T.direction)]-T.startPos)*(T.sign||1),b=Ue(T.startPrevSize+d,T.prevPane),h=Ue(T.startNextSize-d,T.nextPane),g=T.startPrevSize+T.startNextSize;b+h!==g&&(b!==T.startPrevSize+d?h=g-b:b=g-h),T.prevPane.style.flexBasis=`${b}px`,T.prevPane.style.flexGrow="0",T.nextPane.style.flexBasis=`${h}px`,T.nextPane.style.flexGrow="0",at(i,T.prevPane,T.nextPane,T.direction)},a=()=>{!T.active||T.gutterEl!==i||(T.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Mt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let l=10,f=u=>{let d=e==="horizontal",b=$n(t,e),h=0;if(d&&u.key==="ArrowRight"||!d&&u.key==="ArrowDown")h=l*b;else if(d&&u.key==="ArrowLeft"||!d&&u.key==="ArrowUp")h=-l*b;else if(u.key==="Home")h=(U.get(r)?.min||0)-J(r,e);else if(u.key==="End"){let _=U.get(o);h=J(r,e)+J(o,e)-(_?.min||0)-J(r,e)}else return;u.preventDefault();let g=J(r,e),v=J(o,e),y=g+v,E=Ue(g+h,r),w=Ue(y-E,o);E=y-w,E=Ue(E,r),w=y-E,r.style.flexBasis=`${E}px`,r.style.flexGrow="0",o.style.flexBasis=`${w}px`,o.style.flexGrow="0",at(i,r,o,e),Mt(t)};i.addEventListener("keydown",f);let p=()=>{let u=U.get(r),d=U.get(o),b=u?.collapsible?r:d?.collapsible?o:null;if(!b)return;let h=U.get(b);if(!h)return;let g=b===r?o:r,v=J(r,e)+J(o,e);if(h.collapsed){h.collapsed=!1,b.removeAttribute("data-collapsed");let y=h.preCollapseSize||`${Math.round(v/2)}px`,E=Di(y,v)??v/2,w=Math.min(E,v);b.style.flexBasis=`${w}px`,b.style.flexGrow="0",g.style.flexBasis=`${v-w}px`,g.style.flexGrow="0"}else h.preCollapseSize=b.style.flexBasis||`${J(b,e)}px`,h.collapsed=!0,b.setAttribute("data-collapsed","true"),b.style.flexBasis="0px",b.style.flexGrow="0",g.style.flexBasis=`${v}px`,g.style.flexGrow="0";at(i,r,o,e),Mt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:b,collapsed:h.collapsed}}))};return i.addEventListener("dblclick",p),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",f),i.removeEventListener("dblclick",p)}}}function Mn(t){t.directive("split",{priority:14,init(e,r,o){st();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(f=>f.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(f=>{U.get(f)||U.set(f,{size:f.getAttribute("pane")||null,min:parseInt(f.getAttribute("pane-min"),10)||0,max:parseInt(f.getAttribute("pane-max"),10)||1/0,collapsible:f.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let f=0;f<c.length-1;f++){let{gutter:p,cleanup:m}=Ii(e,n,c[f],c[f+1],i);c[f].after(p),s.push(p),a.push(m)}je.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),Ti(e)||c.forEach(f=>{let m=U.get(f)?.size;m?(f.style.flexBasis=m,f.style.flexGrow="0"):(f.style.flexGrow="1",f.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((f,p)=>{at(f,c[p],c[p+1],n)})}),Ci(e,()=>{a.forEach(f=>f()),s.forEach(f=>f.remove()),je.delete(e),c.forEach(f=>U.delete(f)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Bi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Pn(t){t.directive("pane",{priority:15,init(e,r,o){st(),e.classList.add("nojs-pane"),U.has(e)||U.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=U.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Bi(e,()=>{e.classList.remove("nojs-pane"),U.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function qn(t,e={}){Mn(t),Pn(t)}function Rn(){Bn()}var ge={sorts:new Map};function Fn(){ge.sorts.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Hi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $i(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Mi(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function zn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function On(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function Nn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return On(Number(t),Number(e));case"date":return On(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Pi(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Wn(t){t.directive("sortable",{priority:10,init(e){Le(),e.classList.add("nojs-sortable")}})}function Un(t){t.directive("sort",{priority:11,init(e,r,o){Le();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;ge.sorts.has(s)||ge.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(ge.sorts.get(s).column||Vn(e,s,n,i,c,t));let a=()=>{let f=ge.sorts.get(s),p;f.column!==n?p="asc":f.direction==="asc"?p="desc":f.direction==="desc"?p=null:p="asc",Vn(e,s,n,i,p,t)},l=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),a())};e.addEventListener("click",a),e.addEventListener("keydown",l),Hi(e,()=>{e.removeEventListener("click",a),e.removeEventListener("keydown",l),s&&!s.isConnected&&(ge.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Vn(t,e,r,o,n,i){let c=ge.sorts.get(e);Pi(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=$i(e,i);if(s){let a=i.findContext(e),l=a?Mi(a,s.arrayPath):null;if(Array.isArray(l)){if(!n){let p=e._nojsOriginalOrder;if(p){let m=new Set(l),u=p.filter(d=>m.has(d));for(let d of l)p.includes(d)||u.push(d);zn(a,s.arrayPath,u)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...l]);let f=[...l].sort((p,m)=>{let u=p!=null?p[r]:null,d=m!=null?m[r]:null,b=Nn(u,d,o);return n==="desc"?-b:b});zn(a,s.arrayPath,f);return}}qi(e,t,r,o,n)}function qi(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let l=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...l]),!n){let m=document.createDocumentFragment();for(let u of t._nojsOriginalRows)m.appendChild(u);i.appendChild(m);return}let f=m=>{let u=m.replace(/[^0-9.\-]/g,"");return u===""||u==="-"?NaN:parseFloat(u)};l.sort((m,u)=>{let d=m.children[a]?.textContent?.trim()||"",b=u.children[a]?.textContent?.trim()||"",h=Nn(o==="number"?f(d):d,o==="number"?f(b):b,o);return n==="desc"?-h:h});let p=document.createDocumentFragment();for(let m of l)p.appendChild(m);i.appendChild(p)}function Gn(t){t.directive("fixed-header",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-header")}})}function Yn(t){t.directive("fixed-col",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-col")}})}function Pt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Kn(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function Xn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Zn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function Qn(t){t.directive("table-reorder",{priority:15,init(e){if(Le(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,l=null;function f(){let h=r.querySelectorAll(":scope > tr");for(let g=0;g<h.length;g++){let v=h[g];if(v._nojsReorderSetup)continue;v._nojsReorderSetup=!0,v.draggable=!0,v.setAttribute("aria-roledescription","draggable row");let y=!0;if(n){let x=C=>{y=!!C.target.closest(n)};v.addEventListener("mousedown",x),Pt(v,()=>v.removeEventListener("mousedown",x))}let E=x=>{if(n&&!y){x.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(v),a=v,x.dataTransfer&&(x.dataTransfer.effectAllowed="move",x.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(D=>v.classList.add(D))},w=x=>{if(a==null)return;x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect="move");let C=v.getBoundingClientRect(),D=C.top+C.height/2,k=[...r.querySelectorAll(":scope > tr")].indexOf(v);p(),k!==s&&(x.clientY<D?v.classList.add("nojs-reorder-insert-before"):v.classList.add("nojs-reorder-insert-after"),l=v)},_=()=>{v.classList.remove("nojs-reorder-insert-before"),v.classList.remove("nojs-reorder-insert-after"),l===v&&(l=null)},L=x=>{if(x.preventDefault(),x.stopPropagation(),a==null||s==null)return;let C=[...r.querySelectorAll(":scope > tr")],D=v.getBoundingClientRect(),H=D.top+D.height/2,k=C.indexOf(v);x.clientY>=H&&k++;let G=s;if(G===k||G+1===k){m();return}let V=G<k?k-1:k,ve=Kn(e);if(ve&&o){let S=Xn(o,ve.arrayPath);if(Array.isArray(S)){let $=[...S],[q]=$.splice(G,1);$.splice(V,0,q),Zn(o,ve.arrayPath,$),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...$]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:G,to:V,item:q}}))}}else{let S=a,$=C[V];S&&$&&(G<V?r.insertBefore(S,$.nextSibling):r.insertBefore(S,$),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:G,to:V,item:null}})))}m()},j=()=>{m()};v.addEventListener("dragstart",E),v.addEventListener("dragover",w),v.addEventListener("dragleave",_),v.addEventListener("drop",L),v.addEventListener("dragend",j),Pt(v,()=>{v.removeEventListener("dragstart",E),v.removeEventListener("dragover",w),v.removeEventListener("dragleave",_),v.removeEventListener("drop",L),v.removeEventListener("dragend",j),v._nojsReorderSetup=!1})}}function p(){l&&(l.classList.remove("nojs-reorder-insert-before"),l.classList.remove("nojs-reorder-insert-after"),l=null)}function m(){a&&i.split(/\s+/).filter(Boolean).forEach(g=>a.classList.remove(g)),p(),s=null,a=null;let h=r.querySelectorAll(":scope > tr");for(let g of h)g.classList.remove("nojs-reorder-insert-before"),g.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(v=>g.classList.remove(v))}let u=h=>{a!=null&&(h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect="move"))},d=h=>{if(a==null||h.target!==r)return;h.preventDefault(),h.stopPropagation();let g=s,y=[...r.querySelectorAll(":scope > tr")].length-1;if(g===y){m();return}let E=Kn(e);if(E&&o){let w=Xn(o,E.arrayPath);if(Array.isArray(w)){let _=[...w],[L]=_.splice(g,1);_.push(L),Zn(o,E.arrayPath,_),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[..._]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:g,to:_.length-1,item:L}}))}}m()};r.addEventListener("dragover",u),r.addEventListener("drop",d);let b=new MutationObserver(()=>{f()});b.observe(r,{childList:!0}),f(),Pt(e,()=>{b.disconnect(),r.removeEventListener("dragover",u),r.removeEventListener("drop",d),m()})}})}function Jn(t,e={}){Wn(t),Un(t),Gn(t),Yn(t),Qn(t)}function eo(){Fn()}var be={containers:new Map};function to(){for(let[,t]of be.containers)typeof t.unsub=="function"&&t.unsub();be.containers.clear()}function ro(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function no(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ri(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function Fi(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function oo(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let l=document.createElement("span");l.setAttribute("aria-current","page"),l.textContent=c.label,s.appendChild(l)}else{let l=document.createElement("a");l.href=c.href,l.textContent=c.label,s.appendChild(l)}o.appendChild(s)}t.appendChild(o);let n=be.containers.get(t);n&&(n.crumbs=e)}function zi(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=Ri(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function Oi(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=Fi(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function io(t){t.directive("breadcrumb",{priority:15,init(e,r,o){ro(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(be.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,l=a?a.path:"/",f=Oi(l);oo(e,f)};if(s(),typeof i.on=="function"){let a=i.on(s),l=be.containers.get(e);l&&(l.unsub=a),no(e,()=>{typeof a=="function"&&a();let f=be.containers.get(e);f&&(f.unsub=null)})}}else{let s=zi(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");oo(e,s)}no(e,()=>{be.containers.delete(e)})}})}function so(t,e={}){io(t)}function ao(){to()}var ct={containers:new Map};function co(){ct.containers.clear()}function lo(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Vi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var dt=null;function Ni(){return dt!==null||(dt=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),dt}function uo(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function Wi(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function fo(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function po(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");fo(t,r)}else t.open=!1}function lt(t,e,r,o){let n=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function Pe(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function mo(t){t.directive("accordion",{priority:10,init(e,r,o){lo();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!Ni();e.setAttribute("role","group");let c=Pe(e);if(c.length===0)return;if(i)for(let m of c)uo(m);let s=[],a=new MutationObserver(m=>{for(let u of m)for(let d of u.addedNodes)d.nodeType!==1||d.tagName!=="DETAILS"||d.parentElement===e&&f(d)});a.observe(e,{childList:!0});let l=0,f=m=>{i&&uo(m);let u=m.querySelector(":scope > summary");if(u){let h=`nojs-accordion-panel-${Date.now()}-${l++}`,g=m.querySelector(":scope > .nojs-accordion-content");g?(g.id=g.id||h,g.setAttribute("role","region"),h=g.id):(m.id||(m.id=h),h=m.id),u.setAttribute("aria-expanded",m.open?"true":"false"),u.setAttribute("aria-controls",h)}let d=h=>{let g=Pe(e),v=g.indexOf(m),y=m.querySelector(":scope > summary");if(y&&y.setAttribute("aria-expanded",m.open?"true":"false"),m.open){if(n==="single")for(let E of g)E!==m&&E.open&&po(E,i);lt(e,m,!0,v)}else lt(e,m,!1,v)},b=null;if(i){let h=m.querySelector(":scope > summary");h&&(b=g=>{g.preventDefault();let v=m.querySelector(":scope > .nojs-accordion-content");if(m.open)fo(m,v),h.setAttribute("aria-expanded","false"),lt(e,m,!1,Pe(e).indexOf(m));else{if(n==="single"){let y=Pe(e);for(let E of y)if(E!==m&&E.open){po(E,!0);let w=E.querySelector(":scope > summary");w&&w.setAttribute("aria-expanded","false")}}Wi(m,v),h.setAttribute("aria-expanded","true"),lt(e,m,!0,Pe(e).indexOf(m))}},h.addEventListener("click",b))}m.addEventListener("toggle",d),s.push({details:m,toggleHandler:d,clickHandler:b})};for(let m of c)f(m);let p=m=>{let u=m.target;if(u.tagName!=="SUMMARY")return;let d=u.parentElement;if(!d||d.parentElement!==e)return;let h=Pe(e).map(y=>y.querySelector(":scope > summary")).filter(Boolean),g=h.indexOf(u);if(g===-1)return;let v=-1;switch(m.key){case"ArrowDown":case"ArrowRight":v=(g+1)%h.length;break;case"ArrowUp":case"ArrowLeft":v=(g-1+h.length)%h.length;break;case"Home":v=0;break;case"End":v=h.length-1;break;default:return}v!==-1&&v!==g&&(m.preventDefault(),h[v].focus())};e.addEventListener("keydown",p),ct.containers.set(e,{mode:n,listeners:s,observer:a}),Vi(e,()=>{e.removeEventListener("keydown",p),a.disconnect();for(let m of s)if(m.details.removeEventListener("toggle",m.toggleHandler),m.clickHandler){let u=m.details.querySelector(":scope > summary");u&&u.removeEventListener("click",m.clickHandler)}s.length=0,ct.containers.delete(e)})}})}function go(t,e={}){mo(t)}function bo(){co()}var qe=new Map;function ho(){let t=Array.from(qe.keys());for(let e of t){let r=qe.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}qe.clear()}function vo(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Ui(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Gi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=Yi(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function Yi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Ki(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function yo(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function ut(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Xi(t,e){return t*e}function Eo(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function _o(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function xo(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function pt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function Zi(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return _o(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function Qi(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return _o(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function Ji(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=Zi(t,e),n=Qi(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function qt(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:s}=Ji(t,n,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=pt(t,c),l=t.itemHeight!=="auto"?Xi(t.totalItems,t.itemHeight):xo(t),f=s>=0?pt(t,s+1):0,p=Math.max(0,l-f);ut(t.spacerTop,a),ut(t.spacerBottom,p);let m=new Set;for(let d=c;d<=s;d++)m.add(d);for(let[d,b]of t.renderedNodes)m.has(d)||(b.remove(),t.renderedNodes.delete(d));let u=[];for(let d=c;d<=s;d++){if(t.renderedNodes.has(d))continue;let b=t.dataArray[d];if(b===void 0)continue;let h=t.template.cloneNode(!0),g={};g[t.iteratorVar]=b,g.$index=d,g.$count=t.totalItems,g.$first=d===0,g.$last=d===t.totalItems-1,g.$even=d%2===0,g.$odd=d%2!==0,h.setAttribute("role","option"),h.setAttribute("aria-setsize",String(t.totalItems)),h.setAttribute("aria-posinset",String(d+1)),h.setAttribute("tabindex","-1"),h.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(g)),h.__declared=!1,u.push({index:d,node:h}),t.renderedNodes.set(d,h)}if(u.length>0){u.sort((d,b)=>d.index-b.index);for(let{index:d,node:b}of u){let h=null;for(let[g,v]of t.renderedNodes)g>d&&v.parentNode===r&&(!h||g<es(h,t))&&(h=v);h||(h=t.spacerBottom),r.insertBefore(b,h);try{e.processTree&&e.processTree(b)}catch{}}}if(t.itemHeight==="auto"){let d=!1;for(let[b,h]of t.renderedNodes){let g=h.offsetHeight||h.getBoundingClientRect().height;g>0&&t.heights[b]!==g&&(t.heights[b]=g,d=!0)}if(d){Eo(t);let b=xo(t),h=pt(t,c),g=s>=0?pt(t,s+1):0,v=Math.max(0,b-g);ut(t.spacerTop,h),ut(t.spacerBottom,v)}}}function es(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function ts(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&Eo(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,qt(t,r)}function Ao(t){t.directive("virtual",{priority:10,init(e,r,o){vo(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=Gi(e),l=null;if(a)l=a.eachEl;else for(let w of e.children)if(!w.classList.contains("nojs-virtual-spacer")){l=w;break}if(!l){console.warn("[virtual] No child template found.");return}let f=l.cloneNode(!0);for(f.removeAttribute("each"),f.removeAttribute("foreach"),f.removeAttribute("for"),f.__declared=!1,f.__disposers=null,f.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let p=yo(e),m=yo(e);e.appendChild(p),e.appendChild(m);let u={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:f,spacerTop:p,spacerBottom:m,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};qe.set(e,u);let d=w=>{let _=[...e.querySelectorAll('[role="option"]')];if(!_.length)return;let L=e.querySelector('[role="option"]:focus'),j=L?_.indexOf(L):-1,x=-1;switch(w.key){case"ArrowDown":w.preventDefault(),x=j<_.length-1?j+1:j;break;case"ArrowUp":w.preventDefault(),x=j>0?j-1:0;break;case"Home":w.preventDefault(),x=0;break;case"End":w.preventDefault(),x=_.length-1;break;default:return}x>=0&&x<_.length&&_[x].focus()};e.addEventListener("keydown",d);let b=null,h=()=>{b||(b=requestAnimationFrame(()=>{b=null,qt(u,t)}))};if(u.scrollHandler=h,e.addEventListener("scroll",h,{passive:!0}),typeof ResizeObserver<"u"){let w=new ResizeObserver(()=>{u.dirty=!0,qt(u,t)});w.observe(e),u.resizeObserver=w}let g=null,v=-1,y=null,E=()=>{if(!u.disposed){if(u.arrayPath){let w=t.findContext?t.findContext(e):null;if(w){let _=Ki(w,u.arrayPath);Array.isArray(_)&&(_!==g||_.length!==v)&&(g=_,v=_.length,ts(u,_,t))}}y=setTimeout(E,100)}};y=setTimeout(E,100),Ui(e,()=>{u.disposed=!0,b&&(cancelAnimationFrame(b),b=null),y&&(clearTimeout(y),y=null),e.removeEventListener("scroll",h),e.removeEventListener("keydown",d),u.resizeObserver&&(u.resizeObserver.disconnect(),u.resizeObserver=null);for(let[w,_]of u.renderedNodes){if(_.__disposers){for(let L of _.__disposers)try{L()}catch{}_.__disposers=null}_.remove()}u.renderedNodes.clear(),u.spacerTop&&u.spacerTop.parentNode&&u.spacerTop.remove(),u.spacerBottom&&u.spacerBottom.parentNode&&u.spacerBottom.remove(),qe.delete(e)})}})}function wo(t,e={}){Ao(t)}function jo(){ho()}var he=new Map,ft=new Map;function Lo(){for(let[t,e]of he){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}he.clear(),ft.clear()}function ko(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function rs(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ns(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function os(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function is(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function ss(){return document.documentElement}function as(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function Co(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function Rt(t){let e=he.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let p of a)p.isIntersecting?n.add(p.target.id):n.delete(p.target.id);let l=null,f=1/0;for(let p of n){let m=document.getElementById(p);if(!m)continue;let u=m.getBoundingClientRect();u.top<f&&(f=u.top,l=p)}for(let p of e.spyEntries)Co(p.el);if(l){for(let p of e.spyEntries)if(p.targetId===l){as(p.el),e.activeEl=p.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let l=document.getElementById(a.targetId);l&&(c.observe(l),s.add(a.targetId))}e.observer=c}function cs(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function So(t){t.directive("spy",{priority:20,init(e,r,o){ko();let n=ns(e);if(!n){e.tagName!=="A"&&cs(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=os(e),c=is(e),s=ss();he.has(s)||he.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=he.get(s),l={el:e,targetId:n};a.spyEntries.push(l),ft.set(e,s),Rt(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{Rt(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),rs(e,()=>{let f=a.spyEntries.indexOf(l);f!==-1&&a.spyEntries.splice(f,1),ft.delete(e),Co(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),he.delete(s)):Rt(s)})}})}function Do(t,e={}){So(t)}function To(){Lo()}var Ft="it is a DOM element; client mechanics never send DOM nodes",Io={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:Ft},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:Ft},fixed:{list:null}},$el:{unavailable:Ft}}}};var ds="[validate],[drag],[drop],[drag-list],[drag-multiple]";function Bo(t){if(typeof document>"u")return;let e=document.querySelectorAll(ds);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Ho=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],ls=["validate","drag-list","drag-multiple",...Ho].filter(t=>!Qt.includes(t));function us(t,e){bt(t,e);for(let r of ls)t.directive(r,{priority:30,init(o,n){n.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}var ps={name:"nojs-elements",contract:{directives:{...Io}},install(t,e={}){if(ue(t)){us(t,e);return}bt(t,e),gr(t,e),_r(t,e),Lr(t,e),Mr(t,e),Nr(t,e),Zr(t,e),sn(t,e),yn(t,e),kn(t,e),In(t,e),qn(t,e),Jn(t,e),so(t,e),go(t,e),wo(t,e),Do(t,e),Bo(t)},init(t){if(ue(t)||(Bo(t),typeof document>"u"||!document.body))return;let e=Ho.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Jt(),br(),Ar(),kr(),Pr(),Wr(),Qr(),an(),xn(),Cn(),Rn(),eo(),ao(),bo(),jo(),To()}},zt=ps;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(zt),t=!0,!0):!1};window.NoJSElements=zt;let t=!1;if(!e()){let r=0,o=100,n=setInterval(()=>{(e()||++r>=o)&&clearInterval(n)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(n)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
