/**
 * NoJS Elements v1.22.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
var _={dragging:null,selected:new Map,placeholder:null},Ye=new Map;function Nt(){_.dragging=null,_.selected.clear(),_.placeholder&&(_.placeholder.remove(),_.placeholder=null),Ye.clear()}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function ue(t,e){t.__nojsElBoundCtx=e}function Ut(t){t.__nojsElOwnCtx=!0}function bt(t){return t.__nojsElOwnCtx===!0}function pe(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Ze(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function fe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ke(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ke(r):e++}return e}function Xe(t,e,r,n){let o=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(o.length===0)return 0;for(let i=0;i<o.length;i++){let s=(o[i].style&&o[i].style.display==="contents"&&o[i].firstElementChild||o[i]).getBoundingClientRect();if(n==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(n==="grid"){let a=s.left+s.width/2,l=s.top+s.height/2;if(r<l&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return o.length}function Yt(t,e,r,n){re();let o;if(r==="auto"){if(o=document.createElement("div"),o.className=n||"nojs-drop-placeholder",_.dragging&&_.dragging.sourceEl){let s=(_.dragging.sourceEl.firstElementChild||_.dragging.sourceEl).getBoundingClientRect();s.height>0&&(o.style.height=s.height+"px"),s.width>0&&(o.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(o=document.createElement("div"),o.style.display="contents",o.className=n||"nojs-drop-placeholder",o.appendChild(c.content.cloneNode(!0))):(o=document.createElement("div"),o.className=n||"nojs-drop-placeholder")}o.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(o):t.insertBefore(o,i[e]),_.placeholder=o}function re(){_.placeholder&&(_.placeholder.remove(),_.placeholder=null)}function Ee(t,e){return!e||e==="*"?!0:e.split(",").map(n=>n.trim()).includes(t)}function Mo(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let n=t.style&&t.style.display==="contents"&&t.firstElementChild||t,o=n.getBoundingClientRect(),i=o.width,c=o.height,s=getComputedStyle(n),a=Math.min(e,3);for(let f=a-1;f>=0;f--){let m=document.createElement("div"),u=f*4;if(m.style.cssText="position:absolute;top:"+u+"px;left:"+u+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",f===0){let p=n.cloneNode(!0);for(;p.firstChild;)m.appendChild(p.firstChild);m.style.background=s.backgroundColor||"#fff",m.style.border=s.border,m.style.padding=s.padding,m.style.fontSize=s.fontSize,m.style.color=s.color,m.style.fontFamily=s.fontFamily}else m.style.background=s.backgroundColor||"#fff",m.style.border=s.border||"1px solid #ddd";r.appendChild(m)}let l=document.createElement("div");return l.textContent=e,l.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(l),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}var oe=null;function Po(){return oe&&oe.isConnected?oe:typeof document>"u"||!document.body?null:(oe=document.createElement("div"),oe.setAttribute("aria-live","assertive"),oe.setAttribute("aria-atomic","true"),oe.setAttribute("role","status"),oe.className="nojs-dnd-live-region",oe.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(oe),oe)}function de(t){let e=Po();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function Kt(t){if(pe(t)){t.directive("drag",{priority:15,init(e,r){ke(),Wt(e,qo(e,r))}});return}Ze(t,"drag"),t.directive("drag",{priority:15,init(e,r,n){ke(),Wt(e,Ro(t,e,n))}})}function Ro(t,e,r){let n=t.findContext(e);ue(e,n);let o=e.getAttribute("drag-disabled");return{ctx:n,value:()=>t.evaluate(r,n),disabled:()=>o?t.evaluate(o,n):!1,watchDisabled:i=>fe(e,n.$watch(i)),onDispose:i=>fe(e,i)}}function qo(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function Wt(t,e){let r=t.getAttribute("drag-type")||"default",n=t.getAttribute("drag-effect")||"move",o=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),c=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),a=t.getAttribute("drag-class")||"nojs-dragging",l=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let f=!0;if(o){let d=b=>{f=!!b.target.closest(o)};t.addEventListener("mousedown",d),e.onDispose(()=>t.removeEventListener("mousedown",d))}let m=d=>{if(o&&!f){d.preventDefault();return}if(s&&e.disabled()){d.preventDefault();return}let b=e.value(),v=t.getAttribute("drag-group"),g=b;if(v&&_.selected.has(v)){let y=_.selected.get(v);y.size>0&&[...y].some(A=>A.el===t)&&(g=[...y].map(A=>A.item))}if(_.dragging={item:g,type:r,effect:n,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},d.dataTransfer){if(d.dataTransfer.effectAllowed=n,d.dataTransfer.setData("text/plain",""),Array.isArray(g)&&g.length>1&&d.dataTransfer.setDragImage){let y=Mo(t,g.length);document.body.appendChild(y);let E=t.getBoundingClientRect();d.dataTransfer.setDragImage(y,E.width/2,E.height/2),requestAnimationFrame(()=>y.remove())}else if(i&&d.dataTransfer.setDragImage)if(i==="none"){let y=document.createElement("div");y.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(y);let[E,A]=c.split(",").map(Number);d.dataTransfer.setDragImage(y,E||0,A||0),requestAnimationFrame(()=>y.remove())}else{let y=t.querySelector(i);if(y){let[E,A]=c.split(",").map(Number);l&&y.classList.add(l),d.dataTransfer.setDragImage(y,E||0,A||0)}}}if(a.split(/\s+/).filter(Boolean).forEach(y=>t.classList.add(y)),Array.isArray(g)&&v&&_.selected.has(v))for(let y of _.selected.get(v))y.el!==t&&a.split(/\s+/).filter(Boolean).forEach(E=>y.el.classList.add(E));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:g,index:_.dragging.sourceIndex,el:t}}))},u=()=>{a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b));let d=t.getAttribute("drag-group");if(d&&_.selected.has(d))for(let b of _.selected.get(d))a.split(/\s+/).filter(Boolean).forEach(v=>b.el.classList.remove(v));if(l&&i&&i!=="none"){let b=t.querySelector(i);b&&b.classList.remove(l)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:_.dragging?.item,index:_.dragging?.sourceIndex,dropped:_.dragging===null}})),_.dragging=null,re()};if(t.addEventListener("dragstart",m),t.addEventListener("dragend",u),e.onDispose(()=>{t.removeEventListener("dragstart",m),t.removeEventListener("dragend",u)}),s){let d=function(){let b=!!e.disabled();t.draggable=!b,b?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(d)}let p=d=>{if(_.dragging&&!_.dragging.sourceEl.isConnected&&(_.dragging=null),d.key===" "&&!_.dragging){d.preventDefault();let b=e.value();_.dragging={item:b,type:r,effect:n,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},a.split(/\s+/).filter(Boolean).forEach(g=>t.classList.add(g));let v=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${v}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:t}}))}else d.key==="Escape"&&_.dragging&&_.dragging.sourceEl===t&&(d.preventDefault(),a.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),de("Drag cancelled."),_.dragging=null,re())};t.addEventListener("keydown",p),e.onDispose(()=>t.removeEventListener("keydown",p))}function Xt(t){if(pe(t)){t.directive("drop",{priority:15,init(e,r){ke(),Gt(e,Oo(e,r)),zo(e,r)}});return}Ze(t,"drop"),t.directive("drop",{priority:15,init(e,r,n){ke(),Gt(e,Fo(t,e,n))}})}function Fo(t,e,r){let n=t.findContext(e);ue(e,n);let o=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>o?t.evaluate(o,n):!1,max:()=>i?t.evaluate(i,n):void 0,run(c){let s=K(t,"execStatement");typeof s=="function"?s(r,n,c):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:c=>fe(e,c)}}function Oo(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function zo(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",n=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(o=>t.classList.remove(o)),n.split(/\s+/).filter(Boolean).forEach(o=>t.classList.remove(o)),_.placeholder&&t.contains(_.placeholder)&&re()})}function Gt(t,e){let r=t.getAttribute("drop-accept")||"default",n=t.getAttribute("drop-effect")||"move",o=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",c=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),a=t.getAttribute("drop-sort"),l=t.getAttribute("drop-placeholder"),f=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",n);let m=0,u=g=>{if(!_.dragging||c&&e.disabled())return;let h=Ee(_.dragging.type,r),y=!0;if(s){let E=e.max(),A=Ke(t);typeof E=="number"&&A>=E&&(y=!1)}if(!h||!y){i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E)),o.split(/\s+/).filter(Boolean).forEach(E=>t.classList.remove(E)),re();return}if(i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.remove(E)),g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect=n),a){let E=Xe(t,g.clientX,g.clientY,a);l&&Yt(t,E,l,f),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:_.dragging.item,index:E}}))}},p=g=>{if(_.dragging&&!(c&&e.disabled())&&(m++,m===1)){let h=Ee(_.dragging.type,r),y=!0;if(s){let E=e.max(),A=Ke(t);typeof E=="number"&&A>=E&&(y=!1)}h&&y?(o.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E))}},d=g=>{_.dragging&&(m--,m<=0&&(m=0,o.split(/\s+/).filter(Boolean).forEach(h=>t.classList.remove(h)),i.split(/\s+/).filter(Boolean).forEach(h=>t.classList.remove(h)),re(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging.item}}))))},b=g=>{if(g.preventDefault(),g.stopPropagation(),m=0,!_.dragging||c&&e.disabled()||!Ee(_.dragging.type,r))return;if(s){let j=e.max(),w=Ke(t);if(typeof j=="number"&&w>=j)return}let h=_.dragging.item,y=_.dragging.type,E=_.dragging.effect,A=0;a&&(A=Xe(t,g.clientX,g.clientY,a)),o.split(/\s+/).filter(Boolean).forEach(j=>t.classList.remove(j)),i.split(/\s+/).filter(Boolean).forEach(j=>t.classList.remove(j)),re();let C={$drag:h,$dragType:y,$dragEffect:E,$dropIndex:A,$source:{list:_.dragging.sourceList,index:_.dragging.sourceIndex,el:_.dragging.sourceEl},$target:{list:null,index:A,el:t},$el:t};e.run(C),_.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:h,index:A,source:C.$source,target:C.$target,effect:E}}))},v=g=>{_.dragging&&(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),b(g))};t.addEventListener("dragover",u),t.addEventListener("dragenter",p),t.addEventListener("dragleave",d),t.addEventListener("drop",b),t.addEventListener("keydown",v),e.onDispose(()=>{t.removeEventListener("dragover",u),t.removeEventListener("dragenter",p),t.removeEventListener("dragleave",d),t.removeEventListener("drop",b),t.removeEventListener("keydown",v)})}function Zt(t){Ze(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,n){ke();let o=t.findContext(e);ue(e,o);let i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",l=e.getAttribute("drag-type")||"__draglist_"+n,f=e.getAttribute("drop-accept")||l,m=e.hasAttribute("drag-list-copy"),u=e.hasAttribute("drag-list-remove"),p=e.getAttribute("drag-disabled"),d=e.getAttribute("drop-disabled"),b=e.getAttribute("drop-max"),v=e.getAttribute("drop-placeholder"),g=e.getAttribute("drop-placeholder-class"),h=e.getAttribute("drag-class")||"nojs-dragging",y=e.getAttribute("drop-class")||"nojs-drag-over",E=e.getAttribute("drop-reject-class")||"nojs-drop-reject",A=e.getAttribute("drop-settle-class")||"nojs-drop-settle",C=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",m?"copy":"move");let j={listPath:n,ctx:o,el:e};Ye.set(e,j),fe(e,()=>Ye.delete(e));let w=0,x=null;function L(){let H=t.resolve(n,o);if(!Array.isArray(H))return;if(H===x&&H.length>0&&e.children.length>0){for(let Y of e.children)Y.__ctx&&Y.__ctx.$notify&&Y.__ctx.$notify();return}x=H;let B=i?document.getElementById(i):null;if(!B)return;let R=K(t,"disposeChildren");typeof R=="function"&&R(e),e.innerHTML="";let P=H.length;H.forEach((Y,z)=>{let te={[s]:Y,$index:z,$count:P,$first:z===0,$last:z===P-1,$even:z%2===0,$odd:z%2!==0},le=t.createContext(te,o),J=B.content.cloneNode(!0),T=document.createElement("div");T.style.display="contents",T.__ctx=le,T.appendChild(J),e.appendChild(T);let F=T.firstElementChild||T;F.draggable=!0,F.setAttribute("role","option"),F.setAttribute("aria-roledescription","draggable item"),F.getAttribute("tabindex")||F.setAttribute("tabindex","0");let ce=U=>{if(p&&t.evaluate(p,o)){U.preventDefault();return}_.dragging={item:Y,type:l,effect:m?"copy":"move",sourceEl:T,sourceCtx:le,sourceList:H,sourceIndex:z,listDirective:{el:e,listPath:n,ctx:o,keyProp:c,copyMode:m,removeMode:u}},U.dataTransfer&&(U.dataTransfer.effectAllowed=m?"copy":"move",U.dataTransfer.setData("text/plain","")),h.split(/\s+/).filter(Boolean).forEach(xe=>F.classList.add(xe));let Z=F.getAttribute("aria-label")||F.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${Z}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:Y,index:z,el:F}}))},ye=()=>{h.split(/\s+/).filter(Boolean).forEach(U=>F.classList.remove(U)),_.dragging&&_.dragging.sourceEl===T&&(_.dragging=null),re()};T.addEventListener("dragstart",ce),T.addEventListener("dragend",ye);let Ge=U=>{if(U.key===" "&&!_.dragging){U.preventDefault(),U.stopPropagation(),_.dragging={item:Y,type:l,effect:m?"copy":"move",sourceEl:T,sourceCtx:le,sourceList:H,sourceIndex:z,listDirective:{el:e,listPath:n,ctx:o,keyProp:c,copyMode:m,removeMode:u}},h.split(/\s+/).filter(Boolean).forEach(xe=>F.classList.add(xe));let Z=F.getAttribute("aria-label")||F.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${Z}. Use arrow keys to reorder.`)}else if(U.key==="Escape"&&_.dragging){U.preventDefault(),U.stopPropagation();let Z=e.querySelector(`.${h.split(/\s+/)[0]}`)||F;h.split(/\s+/).filter(Boolean).forEach(xe=>Z.classList.remove(xe)),de("Reorder cancelled."),_.dragging=null,re()}else if((U.key==="ArrowDown"||U.key==="ArrowRight")&&_.dragging&&_.dragging.sourceEl===T){U.preventDefault();let Z=T.nextElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Fe=[...e.children].filter(gt=>!gt.classList.contains("nojs-drop-placeholder")),mt=Fe.indexOf(Z)+1;de(`Moved to position ${mt} of ${Fe.length}.`)}}else if((U.key==="ArrowUp"||U.key==="ArrowLeft")&&_.dragging&&_.dragging.sourceEl===T){U.preventDefault();let Z=T.previousElementSibling;if(Z){(Z.firstElementChild||Z).focus();let Fe=[...e.children].filter(gt=>!gt.classList.contains("nojs-drop-placeholder")),mt=Fe.indexOf(Z)+1;de(`Moved to position ${mt} of ${Fe.length}.`)}}};T.addEventListener("keydown",Ge),T.__disposers=T.__disposers||[],T.__disposers.push(()=>T.removeEventListener("dragstart",ce),()=>T.removeEventListener("dragend",ye),()=>T.removeEventListener("keydown",Ge)),t.processTree(T)});let q=H.length===0;C.split(/\s+/).filter(Boolean).forEach(Y=>e.classList.toggle(Y,q))}let S=H=>{if(!_.dragging||d&&t.evaluate(d,o))return;let B=Ee(_.dragging.type,f),R=!0;if(b){let q=t.evaluate(b,o),Y=t.resolve(n,o);typeof q=="number"&&Array.isArray(Y)&&Y.length>=q&&(R=!1)}if(!B||!R){E.split(/\s+/).filter(Boolean).forEach(q=>e.classList.add(q)),y.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),re();return}E.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),H.preventDefault(),H.dataTransfer&&(H.dataTransfer.dropEffect=m?"copy":"move");let P=Xe(e,H.clientX,H.clientY,a);v&&Yt(e,P,v,g)},M=H=>{if(_.dragging&&!(d&&t.evaluate(d,o))&&(w++,w===1)){let B=Ee(_.dragging.type,f),R=!0;if(b){let P=t.evaluate(b,o),q=t.resolve(n,o);typeof P=="number"&&Array.isArray(q)&&q.length>=P&&(R=!1)}B&&R?(y.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:_.dragging.item,type:_.dragging.type}}))):E.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P))}},O=()=>{_.dragging&&(w--,w<=0&&(w=0,y.split(/\s+/).filter(Boolean).forEach(H=>e.classList.remove(H)),E.split(/\s+/).filter(Boolean).forEach(H=>e.classList.remove(H)),re(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:_.dragging?.item}}))))},k=H=>{if(H.preventDefault(),H.stopPropagation(),w=0,!_.dragging||d&&t.evaluate(d,o)||!Ee(_.dragging.type,f))return;if(b){let T=t.evaluate(b,o),F=t.resolve(n,o);if(typeof T=="number"&&Array.isArray(F)&&F.length>=T)return}let B=_.dragging.item,R=_.dragging.listDirective,P=_.dragging.sourceIndex,q=Xe(e,H.clientX,H.clientY,a);y.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),E.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re();let Y=t.resolve(n,o);if(!Array.isArray(Y))return;let z=R&&R.el===e;if(z&&P===q){_.dragging=null;return}if(z&&P+1===q){_.dragging=null;return}let te=[...Y];if(z){let[T]=te.splice(P,1),F=P<q?q-1:q;te.splice(F,0,T),o.$set(n,te),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:te,item:B,from:P,to:F}}))}else{let T=m&&typeof B=="object"?{...B}:B;if(te.splice(q,0,T),o.$set(n,te),R&&!R.copyMode&&(u||R.removeMode)){let F=t.resolve(R.listPath,R.ctx);if(Array.isArray(F)&&P!=null){let ce=F.filter((ye,Ge)=>Ge!==P);R.ctx.$set(R.listPath,ce),R.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ce,item:B,index:P}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:te,item:B,from:P,fromList:R?t.resolve(R.listPath,R.ctx):null}}))}let le=_.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||_.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",J=z&&P<q?q:q+1;de(`Dropped ${le} at position ${J}.`),requestAnimationFrame(()=>{let F=[...e.children][z&&P<q?q-1:q];if(F){let ce=F.firstElementChild||F;A.split(/\s+/).filter(Boolean).forEach(ye=>ce.classList.add(ye)),ce.addEventListener("animationend",()=>{A.split(/\s+/).filter(Boolean).forEach(ye=>ce.classList.remove(ye))},{once:!0})}}),_.dragging=null},N=H=>{if(_.dragging&&Ee(_.dragging.type,f)&&(H.key==="Enter"||H.key===" ")){H.preventDefault();let B=e.querySelector(":focus");if(B){let P=(B.style?.display==="contents"&&B.firstElementChild||B).getBoundingClientRect(),q={preventDefault(){},stopPropagation(){},clientX:P.left+P.width/2,clientY:P.top+P.height+1,dataTransfer:null};k(q)}}};e.addEventListener("dragover",S),e.addEventListener("dragenter",M),e.addEventListener("dragleave",O),e.addEventListener("drop",k),e.addEventListener("keydown",N),fe(e,()=>{e.removeEventListener("dragover",S),e.removeEventListener("dragenter",M),e.removeEventListener("dragleave",O),e.removeEventListener("drop",k),e.removeEventListener("keydown",N)});let ae=o.$watch(L);fe(e,ae),L()}})}function Qt(t){Ze(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let n=t.findContext(e);ue(e,n);let o=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!o){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}_.selected.has(o)||_.selected.set(o,new Set);let c=_.selected.get(o),s=l=>{let f=e.getAttribute("drag"),u={item:f?t.evaluate(f,n):null,el:e,ctx:n};if(l.ctrlKey||l.metaKey){let p=[...c].find(d=>d.el===e);p?(c.delete(p),i.split(/\s+/).filter(Boolean).forEach(d=>e.classList.remove(d))):(c.add(u),i.split(/\s+/).filter(Boolean).forEach(d=>e.classList.add(d)))}else{for(let p of c)i.split(/\s+/).filter(Boolean).forEach(d=>p.el.classList.remove(d));c.clear(),c.add(u),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p))}};e.addEventListener("click",s),fe(e,()=>{e.removeEventListener("click",s);let l=[...c].find(f=>f.el===e);l&&c.delete(l)});let a=l=>{if(l.key==="Escape"){for(let f of c)i.split(/\s+/).filter(Boolean).forEach(m=>f.el.classList.remove(m));c.clear()}};window.addEventListener("keydown",a),fe(e,()=>window.removeEventListener("keydown",a))}})}var Jt=["drag","drop"];function ht(t,e={}){Kt(t),Xt(t),!pe(t)&&(Zt(t),Qt(t))}function er(){Nt()}var tr=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],vt=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function me(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ar,cr,Je,Ce,xt,rr,Qe,At,Et,_t,wt=null;function Vo(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function dr(){return K(ar,"validators")||{}}function No(t){return(t.getAttribute("type")||"text").toLowerCase()}var lr=new Set(["url","min","max"]);function ur(t){return t==null||String(t).trim()===""}function pr(t){return(t.hasAttribute("validate-empty")?t.getAttribute("validate-empty"):t.closest("form[validate]")?.getAttribute("validate-empty"))==="skip"}function Uo(t,e){let r=[],n=new Set,o=ur(t.value)&&pr(t),i=dr(),c=t.getAttribute("validate");if(c){let a=c.split("|").map(l=>l.trim());for(let l of a){let[f,...m]=l.split(":"),u=i[f];if(u){let p=u(t.value,...m,e);p!==!0&&p&&(r.push({rule:f,message:p}),n.add(f))}else{if(o&&lr.has(f))continue;let p=t.value,d=null;switch(f){case"required":(p==null||String(p).trim()==="")&&(d="Required");break;case"email":p&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p)&&(d="Invalid email");break;case"url":try{new URL(p)}catch{d="Invalid URL"}break;case"min":Number(p)<Number(m[0])&&(d=`Minimum value is ${m[0]}`);break;case"max":Number(p)>Number(m[0])&&(d=`Maximum value is ${m[0]}`);break;case"custom":if(m[0]&&i[m[0]]){let b=i[m[0]](p,e);b!==!0&&b&&(d=b)}break}d&&(r.push({rule:f,message:d}),n.add(f))}}}let s=t.validity;if(s&&!s.valid){for(let[a,l]of tr)if(s[a]){let f=l||No(t);n.has(f)||(r.push({rule:f,message:t.validationMessage}),n.add(f))}}return r}function Wo(t,e,r){let n=t.getAttribute(`error-${e}`);if(n)return n;let o=t.getAttribute("error");return o&&!o.startsWith("#")?o:r}function Go(t,e){if(!t.length)return null;let n=[...t].sort((o,i)=>{let c=vt.indexOf(o.rule),s=vt.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:n.rule,message:Wo(e,n.rule,n.message)}}function fr(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Yo(t,e,r,n,o){let i=fr(n);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;At(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.setAttribute("aria-live","polite"),a.__errorTemplateFor=n;let l=Je({$error:e,$rule:r,err:{message:e}},o);a.__ctx=l,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Vo(a),xt(a)}function yt(t){let e=fr(t);e&&(At(e),e.remove())}function nr(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!cr(r,e)}catch{return!0}}function or(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let n=e?e.getAttribute("validate-on"):null;return n?n.split(/\s+/):["input","focusout"]}function ir(t){return t.hasAttribute("model")?t.tagName==="SELECT"||t.type==="checkbox"||t.type==="radio"?"change":"input":null}function sr(t,e){return()=>{let r=t.getAttribute("model"),n=t.__gatedDirs&&t.__gatedDirs.some(o=>o.name==="model");if(r&&!n&&_t&&(t.type!=="radio"||t.checked)){let o=t.type==="checkbox"?t.checked:t.value;_t(`${r} = __val`,Ce(t),{__val:o})}e()}}function Ko(t,e,r,n=!1){let o=n&&ur(t),i=dr(),c=e.split("|").map(s=>s.trim());for(let s of c){let[a,...l]=s.split(":"),f=i[a];if(f){let m=f(t,...l,r);if(m!==!0&&m)return m}else{if(o&&lr.has(a))continue;switch(a){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(l[0]))return`Minimum value is ${l[0]}`;break;case"max":if(Number(t)>Number(l[0]))return`Maximum value is ${l[0]}`;break;case"custom":if(l[0]&&i[l[0]]){let m=i[l[0]](t,r);if(m!==!0&&m)return m}break}}}return null}function Xo(t){if(t.__ctx)return t.__ctx;let e=null;for(let n=t.parentElement;n;n=n.parentElement)if(n.__ctx){if(!bt(n))return Ce(t);e=n.__ctx;break}let r=Je({},e);return t.__ctx=r,r}var Zo=/^\(\)\s*=>\s*[\w$]+\.removeEventListener\(\s*(["'])submit\1\s*,\s*[\w$]+\s*\)$/;function Qo(t){let e=t&&t.fields;if(!e)return!1;let r=e.__nojsStubProbe;return!!r&&Object.isFrozen(r)}function mr(t){if(!wt||t.__nojsElBoundCtx!==void 0)return!1;let e=t;for(;e&&!e.__ctx;)e=e.parentElement;if(!e||e!==t&&bt(e))return!1;if(t.tagName==="FORM"||t.closest("form")){let r=t.__disposers||[],n=r.length-1;for(;n>=0&&!Zo.test(Function.prototype.toString.call(r[n]).trim());)n--;if(n<0)return!1;r.splice(n,1)[0]()}if(t.tagName!=="FORM"&&!t.closest("form[validate]")){let r=Ce(t);Qo(r.$form)&&delete r.$form}try{wt(t,"validate",t.getAttribute("validate"))}catch(r){Et(`directive "validate" init error on <${t.tagName.toLowerCase()}>:`,r)}return!0}function gr(t){ar=t,cr=t.evaluate,Je=t.createContext,Ce=t.findContext,xt=t.processTree,rr=K(t,"cloneTemplate")||(()=>null),Qe=K(t,"disposeChildren")||(()=>{}),At=K(t,"disposeTree")||Qe,Et=K(t,"warn")||console.warn,_t=K(t,"execStatement");let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):Et('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.');let r={priority:30,init(n,o,i){if(n.tagName==="FORM"){let p=function(){s&&typeof s.$notify=="function"&&s.$notify();let j=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT);for(;j.nextNode();){let x=j.currentNode.__ctx;x&&x!==s&&typeof x.$notify=="function"&&x.$notify()}},d=function(){return n.querySelectorAll("input, textarea, select")},b=function(){let j={},w={},x={},L=!0,S=null,M=0,O=!1;for(let k of d())k.name&&(k.type==="checkbox"?w[k.name]=k.checked:k.type==="radio"?k.checked?w[k.name]=k.value:k.name in w||(w[k.name]=""):w[k.name]=k.value);for(let k of d()){if(!k.name)continue;let N=l.has(k.name),ae=f.has(k.name);if(!nr(k,s)){x[k.name]={valid:!0,dirty:ae,touched:N,error:null,value:w[k.name]},k.removeAttribute("aria-invalid");let J=k.getAttribute("error-class")||a;J&&k.classList.remove(...J.split(/\s+/)),yt(k);let T=k.getAttribute("as");T&&s.$set(T,x[k.name]);continue}let H=Uo(k,w),B=Go(H,k),R=!B,P=or(k,n),q=P.includes("input"),Y=P.includes("blur")||P.includes("focusout")||P.includes("submit"),z;!k.hasAttribute("validate-on")&&!n.hasAttribute("validate-on")?z=N||ae:z=q&&ae||Y&&N,R||(L=!1),!R&&z&&(j[k.name]=B.message,M++,S||(S=B.message)),x[k.name]={valid:R,dirty:ae,touched:N,error:B?B.message:null,value:w[k.name]},!R&&z?k.setAttribute("aria-invalid","true"):k.removeAttribute("aria-invalid");let te=k.getAttribute("error-class")||a;if(te){let J=te.split(/\s+/);!R&&z?k.classList.add(...J):k.classList.remove(...J)}if(B&&z){let J=k.getAttribute(`error-${B.rule}`),T=k.getAttribute("error"),F=(J&&J.startsWith("#")?J:null)||(T&&T.startsWith("#")?T:null);F?Yo(F,B.message,B.rule,k,s):yt(k)}else yt(k);let le=k.getAttribute("as");le&&s.$set(le,x[k.name])}m.size>0&&(O=!0),u.valid=L,u.errors=j,u.values=w,u.fields=x,u.firstError=S,u.errorCount=M,u.pending=O,s.$set("$form",{...u}),p(),v(n)},v=function(j){let w=u.valid&&!u.pending&&!u.submitting,x=j.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of x)if(L.getAttribute("auto-disable")!=="off"){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let S=L.getAttribute("disabled");if(S!=="disabled"&&S!=="true"&&S!=="false")continue}L.disabled=!w,L.__autoDisabled=!0}},h=function(j,w,x){j.addEventListener(w,x),me(n,()=>j.removeEventListener(w,x))},y=function(j){if(!j.name)return;let w=or(j,n),x=ir(j),L=O=>{if(x==="change"){h(j,"input",sr(j,O));return}h(j,"input",O),x&&g.push([j,"input",O])},S=()=>{f.add(j.name),u.dirty=!0,b()},M=()=>{l.add(j.name),u.touched=!0,b()};w.includes("input")?L(S):L(()=>{f.add(j.name),u.dirty=!0,b()}),w.includes("blur")||w.includes("focusout")?h(j,"focusout",()=>{M(),w.includes("blur")&&S()}):h(j,"focusout",M),w.includes("submit")&&h(j,"focusout",M)},s=Xo(n);ue(n,s),n.setAttribute("novalidate","");let a=n.getAttribute("error-class"),l=new Set,f=new Set,m=new Map,u={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u.dirty=!1,u.touched=!1,u.pending=!1,u.submitting=!1,l.clear(),f.clear(),n.reset(),b()},endSubmit:()=>{u.submitting=!1,b()}};s.$set("$form",u);let g=[],E=n.hasAttribute("validate-on"),A=[...d()].some(j=>j.hasAttribute("validate-on"));if(!E&&!A){let j=L=>{let S=L.target;S&&S.name&&f.add(S.name),u.dirty=!0,b()},w=L=>{L.target&&ir(L.target)==="change"?sr(L.target,()=>j(L))():j(L)};n.addEventListener("input",w),me(n,()=>n.removeEventListener("input",w)),n.addEventListener("change",j),me(n,()=>n.removeEventListener("change",j));let x=L=>{L.target&&L.target.name&&l.add(L.target.name),u.touched=!0,b()};n.addEventListener("focusout",x),me(n,()=>n.removeEventListener("focusout",x))}else{for(let j of d())y(j);if(g.length){let j=!1;me(n,()=>{j=!0}),queueMicrotask(()=>{if(!j){for(let[w,x,L]of g)w.removeEventListener(x,L),w.addEventListener(x,L);g.length=0}})}}let C=j=>{for(let w of d())w.name&&l.add(w.name);if(u.touched=!0,b(),!u.valid||u.pending){j.preventDefault(),j.stopImmediatePropagation();return}u.submitting=!0,v(n),s.$set("$form",{...u}),p()};n.addEventListener("submit",C,!0),me(n,()=>n.removeEventListener("submit",C,!0)),n.__nojsResetSubmitting=()=>{u.submitting=!1,b()},me(n,()=>{delete n.__nojsResetSubmitting}),requestAnimationFrame(b);return}let c=Ce(n);if(ue(n,c),i&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT")){let s=!!n.closest("form[validate]"),a=s?null:n.getAttribute("error"),l=()=>{if(s&&!nr(n,Ce(n))){n.removeAttribute("aria-invalid");return}let f=Ko(n.value,i,{},pr(n));if(f?n.setAttribute("aria-invalid","true"):n.removeAttribute("aria-invalid"),f&&a){let m=n.nextElementSibling?.__validationError?n.nextElementSibling:null;m||(m=document.createElement("div"),m.__validationError=!0,m.style.display="contents",n.parentNode.insertBefore(m,n.nextSibling));let u=rr(a);if(u){let p=Je({err:{message:f}},c);Qe(m),m.innerHTML="",m.__ctx=p,m.appendChild(u),xt(m)}}else{let m=n.nextElementSibling?.__validationError?n.nextElementSibling:null;m&&(Qe(m),m.innerHTML="")}};n.addEventListener("input",l),me(n,()=>n.removeEventListener("input",l))}}};wt=r.init,t.directive("validate",r)}function br(t,e={}){gr(t)}function hr(){}var Se=new Map,ee=new Map;function vr(){let t=Array.from(Se.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let n of r)try{n()}catch{}e.__disposers=[]}}for(let e of ee.values())clearTimeout(e);ee.clear();for(let e of Se.values())e.remove();Se.clear()}function yr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Jo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var et=8;function Er(t,e,r){let n=e.getBoundingClientRect(),o=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=n.bottom+et,a=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,a=n.left-o.width-et;break;case"right":s=n.top+(n.height-o.height)/2,a=n.right+et;break;default:s=n.top-o.height-et,a=n.left+(n.width-o.width)/2;break}a<4&&(a=4),a+o.width>i-4&&(a=i-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var ei=0;function ti(t,e,r){document.body.appendChild(e),Er(e,t,r),e.setAttribute("aria-hidden","false")}function xr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function ri(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function _r(t){t.directive("tooltip",{priority:20,init(e,r,n){yr();let o=n;if(!o){ri(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),l=a?t.findContext(e):null,f=()=>{if(!a||!l)return!1;try{return!!t.evaluate(a,l)}catch{return!1}},m=`nojs-tooltip-${++ei}`,u=document.createElement("div");u.className="nojs-tooltip",u.setAttribute("role","tooltip"),u.setAttribute("id",m),u.setAttribute("aria-hidden","true"),u.textContent=o,e.setAttribute("aria-describedby",m),Se.set(e,u);let p=!1,d=0,b=()=>{!p||!e.isConnected||d||(d=requestAnimationFrame(()=>{d=0,!(!p||!e.isConnected)&&Er(u,e,i)}))},v=()=>{window.addEventListener("scroll",b,!0),window.addEventListener("resize",b)},g=()=>{window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),d&&(cancelAnimationFrame(d),d=0)},h=()=>{p||(ti(e,u,i),p=!0,v())},y=()=>{if(!p){xr(e,u);return}g(),xr(e,u),p=!1},E=()=>{if(f())return;ee.has(e)&&clearTimeout(ee.get(e));let M=setTimeout(()=>{ee.delete(e),!f()&&e.isConnected&&h()},s);ee.set(e,M)},A=()=>{ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),y()},C=()=>E(),j=()=>A(),w=()=>E(),x=()=>A(),L=M=>{M.key==="Escape"&&u.getAttribute("aria-hidden")==="false"&&A()};e.addEventListener("mouseenter",C),e.addEventListener("mouseleave",j),e.addEventListener("focusin",w),e.addEventListener("focusout",x),e.addEventListener("keydown",L);let S=null;if(a&&l&&typeof l.$watch=="function"){let M=()=>{p&&f()&&y()};S=l.$watch(M)}Jo(e,()=>{e.removeEventListener("mouseenter",C),e.removeEventListener("mouseleave",j),e.removeEventListener("focusin",w),e.removeEventListener("focusout",x),e.removeEventListener("keydown",L),S&&(S(),S=null),g(),ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),p=!1,u.remove(),Se.delete(e)})}})}function wr(t,e={}){_r(t)}function Ar(){vr()}var X=new Map;function jr(){X.clear()}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function jt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function De(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function kt(t){try{return t.matches(":popover-open")}catch{return!1}}var ge=8;function rt(t,e,r){let n=e.getBoundingClientRect(),o=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=n.top-o.height-ge,a=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,a=n.left-o.width-ge;break;case"right":s=n.top+(n.height-o.height)/2,a=n.right+ge;break;default:s=n.bottom+ge,a=n.left+(n.width-o.width)/2;break}r==="bottom"&&s+o.height>c&&(s=n.top-o.height-ge),r==="top"&&s<0&&(s=n.bottom+ge),r==="right"&&a+o.width>i&&(a=n.left-o.width-ge),r==="left"&&a<0&&(a=n.right+ge),a<4&&(a=4),a+o.width>i-4&&(a=i-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function Lt(t,e){t._untrack&&t._untrack();let r=0,n=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(!kt(c)){i();return}rt(c,e,t.position)},o=()=>{r||(r=requestAnimationFrame(n))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o),t._untrack=null};return window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),t._untrack=i,i}function _e(t){t&&t._untrack&&t._untrack()}function Lr(t){t.directive("popover",{priority:20,init(r,n,o){tt();let i=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!X.has(i))X.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=X.get(i);a.popoverEl=r,a.position=c}let s=a=>{let l=X.get(i);if(!l)return;let f=a.newState==="open";l.open=f;for(let m of l.triggerEls)m.setAttribute("aria-expanded",String(f));f||(r.style.visibility="",_e(l))};r.addEventListener("toggle",s),jt(r,()=>{r.removeEventListener("toggle",s);let a=X.get(i);a&&(_e(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&X.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,n,o){tt();let i=o;if(!i){let a=r.closest("[use]")||r.parentElement,l=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(l&&(i=l.getAttribute("data-popover-id")||l.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),X.has(i)||X.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),X.get(i).triggerEls.add(r);let c=a=>{let l=X.get(i);if(!l||!l.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(De(l.popoverEl)){l.popoverEl.style.visibility="hidden";try{l.popoverEl.togglePopover(),kt(l.popoverEl)?(rt(l.popoverEl,r,l.position),Lt(l,r)):_e(l)}finally{l.popoverEl.style.visibility=""}}};r.addEventListener("click",c);let s=a=>{let l=X.get(i);a.key==="Escape"&&l?.open&&(De(l.popoverEl,"hidePopover")&&l.popoverEl.hidePopover(),_e(l),r.focus())};document.addEventListener("keydown",s),jt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=X.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(_e(a),X.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){tt();let n=()=>{let o=r.closest(".nojs-popover");!o||!De(o,"hidePopover")||o.hidePopover()};r.addEventListener("click",n),jt(r,()=>r.removeEventListener("click",n))}});let e=(r,n)=>e.open(r,n);e.open=(r,n)=>{let o=X.get(r);if(!o||!o.popoverEl||!De(o.popoverEl,"showPopover"))return!1;o.popoverEl.style.visibility="hidden";try{o.popoverEl.showPopover();let i=n||[...o.triggerEls][0];i&&(rt(o.popoverEl,i,o.position),Lt(o,i))}catch{return!1}finally{o.popoverEl.style.visibility=""}return!0},e.close=r=>{let n=X.get(r);if(!n||!n.popoverEl||!De(n.popoverEl,"hidePopover"))return!1;try{n.popoverEl.hidePopover()}catch{}return _e(n),!0},e.toggle=(r,n)=>{let o=X.get(r);if(!o||!o.popoverEl||!De(o.popoverEl))return!1;o.popoverEl.style.visibility="hidden";try{o.popoverEl.togglePopover();let i=n||[...o.triggerEls][0];i&&kt(o.popoverEl)?(rt(o.popoverEl,i,o.position),Lt(o,i)):_e(o)}finally{o.popoverEl.style.visibility=""}return!0},t.popover=e}function kr(t,e={}){Lr(t)}function Cr(){jr()}var W=[],ie=new Map,ni=1e4;function Sr(){return ni+W.length}function Dr(){W.length=0,ie.clear()}function Te(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function oi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ir='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',Ct=new WeakMap;function ii(t){let e=r=>{if(r.key!=="Tab")return;let n=[...t.querySelectorAll(Ir)].filter(c=>c.offsetParent!==null);if(n.length===0){r.preventDefault();return}let o=n[0],i=n[n.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),o.focus())};t.addEventListener("keydown",e),Ct.set(t,e)}function Tr(t){let e=Ct.get(t);e&&(t.removeEventListener("keydown",e),Ct.delete(t))}var Oe=new WeakMap;function Br(t){t.directive("modal",{priority:10,init(r,n,o){Te();let i=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),l=r.getAttribute("modal-escape"),f=u=>{u.target===r&&s!=="false"&&l!=="false"&&Ie(r,i)};r.addEventListener("click",f),ie.set(i,r);let m=u=>{if(u.newState==="open"){if(r.style.zIndex=String(Sr()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(d=>d.el===r))return;let p=r.querySelector(Ir);p?p.focus():r.focus()}),ii(r),l!=="false"){let p=d=>{d.key==="Escape"&&(d.stopPropagation(),Ie(r,i))};r.addEventListener("keydown",p),Oe.set(r,p)}}else if(u.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(b=>r.classList.remove(b)),Tr(r);let p=Oe.get(r);p&&(r.removeEventListener("keydown",p),Oe.delete(r));let d=W.findIndex(b=>b.el===r);if(d===-1&&(d=W.findIndex(b=>b.id===i)),d!==-1){let b=W[d];W.splice(d,1),b.triggerEl&&requestAnimationFrame(()=>{b.triggerEl.focus()})}}};r.addEventListener("toggle",m),oi(r,()=>{r.removeEventListener("click",f),r.removeEventListener("toggle",m),Tr(r);let u=Oe.get(r);u&&(r.removeEventListener("keydown",u),Oe.delete(r)),ie.delete(i);let p=W.findIndex(d=>d.el===r);p===-1&&(p=W.findIndex(d=>d.id===i)),p!==-1&&W.splice(p,1)})}});let e=r=>e.open(r);e.open=r=>{let n=ie.get(r);if(!n)return!1;try{n.showPopover()}catch{return!1}return W.some(o=>o.id===r)||W.push({id:r,el:n,triggerEl:null}),!0},e.close=r=>{let n=ie.get(r);return n?(Ie(n,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)Ie(W[r].el,W[r].id)},t.modal=e}function Ie(t,e){try{t.hidePopover()}catch{}}function Hr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function si(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function $r(t){t.directive("modal-open",{priority:10,init(e,r,n){Te();let o=n;if(!o){let m=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(m&&(o=m.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let f=ie.get(o)||si(o);if(!f){console.warn(`[modal-open] modal "${o}" not found`);return}let m=W.some(u=>u.id===o);f.id&&e.setAttribute("aria-controls",f.id);try{f.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`);return}m||W.push({id:o,el:f,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,l=()=>{let f=ie.get(o);return f?(a=f,s=m=>{m.newState==="closed"&&e.setAttribute("aria-expanded","false")},f.addEventListener("toggle",s),!0):!1};if(!l()){let f=requestAnimationFrame(l);Hr(e,()=>cancelAnimationFrame(f))}e.addEventListener("click",i),Hr(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function ai(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Mr(t){t.directive("modal-close",{priority:10,init(e,r,n){Te();let o=()=>{let i,c;if(n){if(c=n,i=ie.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}Ie(i,c)};e.addEventListener("click",o),ai(e,()=>{e.removeEventListener("click",o)})}})}function Pr(t,e={}){Br(t),$r(t),Mr(t)}function Rr(){Dr()}var ne={openMenus:new Map},V={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function qr(){ne.openMenus.clear(),V.installed=!1,V.instanceCount=0,V.outsideClickHandler=null,V.escHandler=null}function Be(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var ci=0;function di(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function li(){V.installed||(V.outsideClickHandler=t=>{let e=[...ne.openMenus.entries()];for(let[r,{toggle:n,wrapper:o}]of e)if(!o.contains(t.target)){if(r.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}ne.openMenus.delete(r)}},V.escHandler=t=>{if(t.key!=="Escape")return;let e=[...ne.openMenus.entries()];for(let[r,{toggle:n}]of e){if(r.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}n.focus()}ne.openMenus.clear()},document.addEventListener("click",V.outsideClickHandler,!0),document.addEventListener("keydown",V.escHandler),V.installed=!0)}function Dt(){V.installed&&(document.removeEventListener("click",V.outsideClickHandler,!0),document.removeEventListener("keydown",V.escHandler),V.outsideClickHandler=null,V.escHandler=null,V.installed=!1)}function Fr(t,e,r){let n=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,l,f;switch(n){case"top":l=i.top-c.height,f=i.left;break;case"left":l=i.top,f=i.left-c.width;break;case"right":l=i.top,f=i.right;break;default:l=i.bottom,f=i.left}n==="bottom"||n==="top"?o==="end"&&(f=i.right-c.width):o==="end"&&(l=i.bottom-c.height),n==="bottom"&&l+c.height>s&&i.top-c.height>0?l=i.top-c.height:n==="top"&&l<0&&i.bottom+c.height<=s&&(l=i.bottom),f<4&&(f=4),f+c.width>a-4&&(f=a-c.width-4),t.style.top=`${l}px`,t.style.left=`${f}px`}function Tt(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function St(t){let e=Tt(t);e.length&&e[0].focus()}function Or(t){let e=Tt(t);e.length&&e[e.length-1].focus()}function zr(t){t.directive("dropdown",{priority:15,init(r){Be()}}),t.directive("dropdown-toggle",{priority:15,init(r){Be();let n=r.closest("[dropdown]");if(!n)return;let o=n.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${ci++}`),r.setAttribute("aria-controls",o.id);let i=!1,c=typeof o.showPopover=="function"&&typeof o.hidePopover=="function";function s(){if(o.setAttribute("data-open",""),c&&!i)try{o.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Fr(o,r,n),ne.openMenus.set(o,{toggle:r,wrapper:n})}function a(){if(c&&i){i=!1;try{o.hidePopover()}catch{}}o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ne.openMenus.delete(o)}function l(){return r.getAttribute("aria-expanded")==="true"}let f=b=>{b.newState==="closed"&&l()&&a()};o.addEventListener("toggle",f);let m=b=>{b.preventDefault(),b.stopPropagation(),l()?a():s()};r.addEventListener("click",m),V.instanceCount++,li();let u=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),St(o);break;case"ArrowDown":b.preventDefault(),s(),St(o);break;case"ArrowUp":b.preventDefault(),s(),Or(o);break}};r.addEventListener("keydown",u);let p=b=>{if(!(!l()||Tt(o).find(h=>h===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),St(o);break;case"ArrowUp":b.preventDefault(),Or(o);break}};o.addEventListener("keydown",p);let d=()=>{l()&&Fr(o,r,n)};window.addEventListener("scroll",d,!0),window.addEventListener("resize",d),di(r,()=>{r.removeEventListener("click",m),r.removeEventListener("keydown",u),o.removeEventListener("keydown",p),o.removeEventListener("toggle",f),window.removeEventListener("scroll",d,!0),window.removeEventListener("resize",d),ne.openMenus.delete(o),V.instanceCount--,V.instanceCount<=0&&(V.instanceCount=0,Dt())})}}),t.directive("dropdown-menu",{priority:15,init(r){Be(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function Vr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ui(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function It(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ne.openMenus.has(t)&&ne.openMenus.delete(t)}function Nr(t){t.directive("dropdown-item",{priority:15,init(e){Be();let r=e.closest("[dropdown-menu]"),n=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let o=c=>{if(!r)return;let s=ui(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),It(r,n),n){let l=n.querySelector("[dropdown-toggle]");l&&l.focus()}break}case"Tab":{It(r,n);break}}};e.addEventListener("keydown",o),Vr(e,()=>e.removeEventListener("keydown",o));let i=()=>{if(It(r,n),n){let c=n.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),Vr(e,()=>e.removeEventListener("click",i))}})}function Ur(t,e={}){zr(t),Nr(t)}function Wr(){Dt(),qr()}var se=new Map,He=new Set,Gr=0;function Yr(){return++Gr}function Kr(){for(let t of He)clearTimeout(t);He.clear();for(let t of se.values())t.remove();se.clear(),Gr=0}function Xr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Bt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var pi=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Ht(){return se.size>0?se.values().next().value:fi("top-right")}function fi(t){if(se.has(t))return se.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),se.set(t,e),e}function mi(t){return t.startsWith("top")}function $t(t,e,r,n,o){let i=Yr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),o){let l=document.createElement("button");l.type="button",l.classList.add("nojs-toast-dismiss"),l.setAttribute("aria-label","Dismiss"),l.textContent="\xD7",l.addEventListener("click",()=>nt(s)),s.appendChild(l)}if(mi(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),n>0){let l=setTimeout(()=>{He.delete(l),s.isConnected&&nt(s)},n);He.add(l),s._toastTimerId=l}return s}function nt(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),He.delete(t._toastTimerId)),t.remove())}function Zr(t){Xr(),t.directive("toast-container",{priority:10,init(r,n,o){let i=o&&pi.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),se.set(i,r),Bt(r,()=>{se.get(i)===r&&se.delete(i)})}}),t.directive("toast",{priority:10,init(r,n,o){if(!o)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let d=()=>{let b=Ht();$t(b,o,i,s,a)};r.addEventListener("click",d),Bt(r,()=>r.removeEventListener("click",d));return}let f=t.findContext(r);if(!f||typeof f.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let m;function u(){let d=t.evaluate(o,f);if(d&&d!==m){let b=typeof d=="string"?d:String(d),v=Ht();$t(v,b,i,s,a),m=d}else m=d}let p=f.$watch(u);Bt(r,p)}});let e=(r,n="info",o=3e3)=>{if(typeof document>"u")return;let i=!0,c=Ht();return $t(c,String(r),n,o,i)};e.dismiss=r=>{let n=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),o=document.querySelector(`[data-toast-id="${n}"]`);o&&nt(o)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>nt(r))},t.toast=e,t.global("toast",e)}function Qr(t,e={}){Zr(t)}function Jr(){Kr()}var we={containers:new Map};function en(){we.containers.clear()}function tn(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function gi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var bi=0;function rn(t){return`${t}-${++bi}`}function ze(t,e,r=!1){let n=we.containers.get(t);if(!n)return;let{tabs:o,panels:i}=n;if(!(e<0||e>=o.length)&&!(!r&&o[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<o.length;c++)o[c].setAttribute("aria-selected","false"),o[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;o[e].setAttribute("aria-selected","true"),o[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,n.activeIndex=e}}function Ve(t,e,r){let n=t.length,o=e;for(let i=0;i<n;i++)if(o=(o+r+n)%n,t[o].getAttribute("aria-disabled")!=="true")return o;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function nn(t){t.directive("tabs",{priority:10,init(e,r,n){tn();let o=[],i=[];for(let g of Array.from(e.children))g.hasAttribute("tab")?o.push(g):g.hasAttribute("panel")&&i.push(g);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==i.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(o.length,i.length);for(let g=0;g<a;g++){let h=o[g],y=i[g],E=h.id||rn("nojs-tab"),A=y.id||rn("nojs-panel");h.id=E,y.id=A,h.setAttribute("role","tab"),h.setAttribute("aria-selected","false"),h.setAttribute("aria-controls",A),h.setAttribute("tabindex","-1"),h.classList.add("nojs-tab"),y.setAttribute("role","tabpanel"),y.setAttribute("aria-labelledby",E),y.setAttribute("tabindex","0"),y.setAttribute("aria-hidden","true"),y.inert=!0,y.classList.add("nojs-panel"),s.appendChild(h)}for(let g=a;g<i.length;g++){let h=i[g];h.setAttribute("role","tabpanel"),h.setAttribute("aria-hidden","true"),h.inert=!0,h.classList.add("nojs-panel")}let l=i[0];l?e.insertBefore(s,l):e.appendChild(s),we.containers.set(e,{tabs:o.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let f=t.findContext(e),m=[],u=(g,h)=>{let y=!1;try{y=!!t.evaluate(h,f)}catch{y=!1}y?g.setAttribute("aria-disabled","true"):g.removeAttribute("aria-disabled")};for(let g=0;g<a;g++){let h=o[g],y=h.getAttribute("tab-disabled");if(y&&(u(h,y),f&&typeof f.$watch=="function")){let E=f.$watch(()=>u(h,y));m.push(E)}}let p=0;if(n&&n.trim()!==""){let g=parseInt(n,10);!isNaN(g)&&g>=0&&g<a&&(p=g)}let d=o.slice(0,a);if(o[p]?.getAttribute("aria-disabled")==="true"){let g=Ve(d,p,1);g!==-1?(p=g,ze(e,p)):ze(e,p,!0)}else ze(e,p);let b=g=>{let h=we.containers.get(e);if(!h)return;let y=g.target;if(y.getAttribute("role")!=="tab")return;let{tabs:E}=h,A=E.indexOf(y);if(A===-1)return;let C=-1;switch(g.key){case"ArrowRight":case"ArrowDown":C=Ve(E,A,1);break;case"ArrowLeft":case"ArrowUp":C=Ve(E,A,-1);break;case"Home":C=Ve(E,E.length-1,1);break;case"End":C=Ve(E,0,-1);break;case"Tab":return;default:return}C!==-1&&C!==A&&(g.preventDefault(),ze(e,C),E[C].focus())};s.addEventListener("keydown",b);let v=g=>{let h=g.target.closest("[role='tab']");if(!h)return;let y=we.containers.get(e);if(!y)return;let E=y.tabs.indexOf(h);E!==-1&&h.getAttribute("aria-disabled")!=="true"&&(ze(e,E),h.focus())};s.addEventListener("click",v),gi(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",v);for(let g of m)g&&g();m.length=0,we.containers.delete(e)})}})}function on(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function sn(t){t.directive("panel",{priority:11,init(){}})}function an(t,e={}){nn(t),on(t),sn(t)}function cn(){en()}var $={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function dn(){$.branches.clear(),$.selectedItem=null,$.typeahead="",$.typeaheadTimer&&(clearTimeout($.typeaheadTimer),$.typeaheadTimer=null)}function $e(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function Me(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ln(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n;for(;n=r.nextNode();)e.push(n);return e}function un(t){return t.closest('[role="tree"]')}function hi(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let n=e.previousElementSibling;if(n?.matches?.('[role="treeitem"]'))return n}return t.parentElement?.closest('[role="treeitem"]')||null}function vi(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(n=>n.remove()),(e.textContent||"").trim().toLowerCase()}function Mt(t){let e=$.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),$.selectedItem=t}function pn(t){let e=$.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function yi(t){let e=$.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function xi(t){let e=$.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function fn(t,e){let r=un(e);if(!r)return;let n=ln(r),o=n.indexOf(e);if(o<0)return;let i=$.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)yi(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&Ae(s,n)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)xi(e);else{let s=hi(e);s&&Ae(s,ln(r))}break;case"ArrowDown":t.preventDefault(),o<n.length-1&&Ae(n[o+1],n);break;case"ArrowUp":t.preventDefault(),o>0&&Ae(n[o-1],n);break;case"Enter":case" ":t.preventDefault(),Mt(e),c&&pn(e);break;case"Home":t.preventDefault(),n.length>0&&Ae(n[0],n);break;case"End":t.preventDefault(),n.length>0&&Ae(n[n.length-1],n);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),$.typeahead+=t.key.toLowerCase(),$.typeaheadTimer&&clearTimeout($.typeaheadTimer),$.typeaheadTimer=setTimeout(()=>{$.typeahead="",$.typeaheadTimer=null},500);let s=o+1;for(let a=0;a<n.length;a++){let l=(s+a)%n.length;if(vi(n[l]).startsWith($.typeahead)){Ae(n[l],n);break}}}break}}function mn(t){t.directive("tree",{priority:15,init(e){$e(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function gn(t){t.directive("branch",{priority:16,init(e,r,n){$e();let o=n==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(o));let i=un(e);if(i){let l=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",l?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let l=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);l?($.branches.set(e,{expanded:o,subtreeEl:l}),l.setAttribute("aria-hidden",String(!o))):$.branches.set(e,{expanded:o,subtreeEl:null})});let s=l=>{l.target.closest?.('[role="treeitem"]')===e&&(l.stopPropagation(),Mt(e),pn(e))};e.addEventListener("click",s),Me(e,()=>e.removeEventListener("click",s));let a=l=>{fn(l,e)};e.addEventListener("keydown",a),Me(e,()=>e.removeEventListener("keydown",a)),Me(e,()=>{c=!0,$.branches.delete(e),$.selectedItem===e&&($.selectedItem=null),$.typeaheadTimer&&(clearTimeout($.typeaheadTimer),$.typeaheadTimer=null,$.typeahead="")})}})}function Ae(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function bn(t){t.directive("subtree",{priority:16,init(e){$e(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let n of e.children)if(n.tagName==="LI"&&!n.querySelector("[branch], .nojs-branch")){n.setAttribute("role","treeitem"),n.setAttribute("tabindex","-1"),n.classList.add("nojs-tree-leaf");let o=c=>{c.stopPropagation(),Mt(n)};n.addEventListener("click",o),Me(n,()=>n.removeEventListener("click",o));let i=c=>{fn(c,n)};n.addEventListener("keydown",i),Me(n,()=>n.removeEventListener("keydown",i)),Me(n,()=>{$.selectedItem===n&&($.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let n=$.branches.get(r);n?(e.setAttribute("aria-hidden",String(!n.expanded)),n.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function hn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Pt(t){return t.closest('[role="treeitem"]')}function Ei(t){return t.closest('[role="tree"]')}function _i(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function wi(t){return _i(t).indexOf(t)}function Ai(t,e,r){let n=t.getBoundingClientRect(),o=e-n.top,i=n.height;return r==="reparent"?"on":r==="reorder"?o<i/2?"before":"after":o<i*.25?"before":o>i*.75?"after":"on"}function vn(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var I={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Pe(){I.indicator&&(I.indicator.remove(),I.indicator=null)}function Ne(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function ji(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function Li(t,e){Pe();let r=ji(),n=t.getBoundingClientRect(),o=Ei(t);if(!o)return;let i=o.getBoundingClientRect();r.style.position="absolute",r.style.left=n.left-i.left+"px",r.style.width=n.width+"px",e==="before"?r.style.top=n.top-i.top-1+"px":r.style.top=n.bottom-i.top-1+"px",getComputedStyle(o).position==="static"&&(o.style.position="relative"),o.appendChild(r),I.indicator=r}function yn(t){t.directive("tree-drag-mode",{priority:15,init(e,r,n){if($e(),n!=="reparent"&&n!=="reorder"&&n!=="both")return;let o=0,i=u=>{let p=Pt(u.target);if(p&&e.contains(p)){if(p.hasAttribute("tree-drag-disabled")){u.preventDefault();return}I.dragging={el:p,treeRoot:e},u.dataTransfer&&(u.dataTransfer.effectAllowed="move",u.dataTransfer.setData("text/plain","")),p.classList.add("nojs-dragging"),p.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:p}}))}},c=u=>{if(!I.dragging||I.dragging.treeRoot!==e)return;let p=Pt(u.target);if(!p||!e.contains(p)||p===I.dragging.el||vn(p,I.dragging.el))return;u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move");let d=Ai(p,u.clientY,n);(I.currentTarget!==p||I.currentPosition!==d)&&(Ne(e),Pe(),I.currentTarget=p,I.currentPosition=d,d==="on"?p.classList.add("nojs-tree-drag-over"):Li(p,d))},s=u=>{I.dragging&&I.dragging.treeRoot===e&&o++},a=u=>{I.dragging&&(o--,o<=0&&(o=0,Ne(e),Pe(),I.currentTarget=null,I.currentPosition=null))},l=u=>{if(u.preventDefault(),u.stopPropagation(),o=0,!I.dragging||I.dragging.treeRoot!==e)return;let p=I.dragging.el,d=I.currentTarget,b=I.currentPosition;if(Ne(e),Pe(),!d||!b){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(d===p||vn(d,p)){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="on"){let v=d.querySelector(':scope > [role="group"]');v||(v=d.nextElementSibling?.matches?.('[role="group"]')?d.nextElementSibling:null),v?v.setAttribute("aria-hidden","false"):(v=document.createElement("ul"),v.setAttribute("role","group"),v.setAttribute("subtree",""),v.classList.add("nojs-subtree","nojs-tree"),v.setAttribute("aria-hidden","false"),d.appendChild(v));let g=$.branches.get(d);g&&(g.expanded=!0,g.subtreeEl=v,d.setAttribute("aria-expanded","true")),v.appendChild(p),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:p,newParent:d}}))}else{let v=d.parentElement;if(!v){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(b==="before")v.insertBefore(p,d);else{let h=d.nextElementSibling,y=h?.matches?.('[role="group"]')?h.nextElementSibling:h;y?v.insertBefore(p,y):v.appendChild(p)}let g=wi(p);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:p,newIndex:g}}))}I.dragging=null,I.currentTarget=null,I.currentPosition=null},f=u=>{let p=Pt(u.target);p&&p.classList.remove("nojs-dragging"),Ne(e),Pe(),o=0,I.dragging&&I.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:I.dragging.el}})),I.dragging=null,I.currentTarget=null,I.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",l),e.addEventListener("dragend",f),hn(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",l),e.removeEventListener("dragend",f),Ne(e),Pe()}),ki(e);let m=new MutationObserver(u=>{for(let p of u)for(let d of p.addedNodes){if(d.nodeType!==1)continue;d.getAttribute("role")==="treeitem"&&Rt(d);let b=d.querySelectorAll?.('[role="treeitem"]');if(b)for(let v of b)Rt(v)}});m.observe(e,{childList:!0,subtree:!0}),hn(e,()=>m.disconnect())}})}function Rt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function ki(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)Rt(r)}function xn(t,e={}){mn(t),gn(t),bn(t),yn(t)}function En(){dn()}var ot=new Map;function _n(){ot.clear()}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function wn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let o=e(r)?.$form;return o?!!o.valid:!0}function An(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function jn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Ue(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ci(t,e){for(let n=e;n;n=n.parentElement)if(n.__ctx)return t.findContext(e);let r=t.createContext({},null);return e.__ctx=r,Ut(e),r}function Ln(t){t.directive("stepper",{priority:14,init(e,r,n){it();let o=Array.from(e.querySelectorAll("[step]"));if(!o.length){console.warn("[stepper] No [step] children found.");return}let i=Ci(t,e),c=n&&parseInt(n,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",l=e.getAttribute("stepper-nav")!=="false",f=e.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(c,o.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",f),e.classList.add("nojs-stepper");let u=null,p=[];if(a){u=document.createElement("div"),u.className="nojs-stepper-indicator",u.setAttribute("role","tablist"),u.setAttribute("aria-label","Progress"),o.forEach((x,L)=>{if(L>0){let N=document.createElement("div");N.className="nojs-stepper-separator",N.setAttribute("aria-hidden","true"),u.appendChild(N)}let S=document.createElement("button");S.type="button",S.className="nojs-stepper-indicator-item",S.setAttribute("role","tab"),S.setAttribute("aria-selected",L===m?"true":"false");let M=x.getAttribute("step-label")||`Step ${L+1}`,O=document.createElement("span");O.textContent=M,S.appendChild(O),S.setAttribute("aria-label",M);let k=`nojs-stepper-tab-${Si++}`;if(S.id=k,s==="free"){S.setAttribute("data-clickable","");let N=()=>A(L);S.addEventListener("click",N),Ue(e,()=>S.removeEventListener("click",N))}else S.setAttribute("tabindex","-1");u.appendChild(S),p.push(S)});let w=x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let L=m;x.key==="ArrowRight"?L=Math.min(m+1,o.length-1):x.key==="ArrowLeft"?L=Math.max(m-1,0):x.key==="Home"?L=0:x.key==="End"&&(L=o.length-1),s==="free"?(A(L),p[L]?.focus()):p[m]?.focus()};u.addEventListener("keydown",w),Ue(e,()=>u.removeEventListener("keydown",w)),e.insertBefore(u,e.firstChild)}let d=null,b=null,v=null;if(l){d=document.createElement("div"),d.className="nojs-stepper-nav",d.setAttribute("aria-hidden","true"),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-prev",b.textContent="Previous";let w=()=>E();b.addEventListener("click",w),Ue(e,()=>b.removeEventListener("click",w)),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-next",v.textContent="Next";let x=()=>y();v.addEventListener("click",x),Ue(e,()=>v.removeEventListener("click",x)),d.appendChild(b),d.appendChild(v),e.appendChild(d)}function g(w){let x=o[w];if(!x)return!0;if(!wn(x,t.findContext)){let M=x.querySelector("form[validate]");return M&&(An(M),p[w]&&p[w].classList.add("nojs-step-invalid"),jn(e,x,M)),!1}p[w]&&p[w].classList.remove("nojs-step-invalid");let L=x.querySelectorAll("[required]");for(let M of L)if(typeof M.checkValidity=="function"&&!M.checkValidity())return M.reportValidity(),!1;let S=x.getAttribute("step-validate");if(S)try{if(!t.evaluate(S,i))return!1}catch(M){return console.warn(`[stepper] step-validate error: ${M.message}`),!1}return!0}function h(w){if(o.forEach((x,L)=>{let S=L===m;x.setAttribute("aria-hidden",S?"false":"true"),S?(x.removeAttribute("inert"),x.setAttribute("aria-current","step")):(x.setAttribute("inert",""),x.removeAttribute("aria-current"))}),p.length&&p.forEach((x,L)=>{x.setAttribute("aria-selected",L===m?"true":"false"),L<m?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",L===m?"0":"-1");let S=o[L];S.id&&(x.setAttribute("aria-controls",S.id),S.setAttribute("aria-labelledby",x.id))}),b&&(b.disabled=m===0),v&&(v.textContent=m===o.length-1?"Finish":"Next"),!w){let x=o[m];x&&requestAnimationFrame(()=>x.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!w,detail:{current:m,total:o.length}}))}function y(){return m>=o.length-1?(s==="linear"&&!g(m)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:m,total:o.length}})),!1):s==="linear"&&!g(m)?!1:(m++,h(),j(),!0)}function E(){return m<=0?!1:(m--,h(),j(),!0)}function A(w){if(w<0||w>=o.length||w===m)return!1;if(s==="linear"&&w>m){for(let x=m;x<w;x++)if(m=x,h(),!g(x))return j(),!1}return m=w,h(),j(),!0}let C={get current(){return m},get total(){return o.length},next:y,prev:E,goTo:A,get isFirst(){return m===0},get isLast(){return m===o.length-1}};function j(){i.$stepper=C}j(),ot.set(e,{get current(){return m},steps:o,mode:s,indicatorEl:u,navEl:d}),h(!0),Ue(e,()=>{ot.delete(e),u&&u.parentNode&&u.remove(),d&&d.parentNode&&d.remove(),delete i.$stepper})}})}var Si=0;var Di=0;function kn(t){t.directive("step",{priority:13,init(e,r,n){it(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Di++}`),e.setAttribute("tabindex","0")}})}function Cn(t,e={}){kn(t),Ln(t)}function Sn(){_n()}function Dn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Tn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function In(t){t.directive("skeleton",{priority:10,init(e,r,n){Dn();let o=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function l(g){f();for(let h=0;h<g;h++){let y=document.createElement("div");y.className="nojs-skeleton-line",e.appendChild(y),a.push(y)}}function f(){for(let g of a)g.parentNode===e&&e.removeChild(g);a=[]}function m(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let g=s+(String(s).match(/\d$/)?"px":"");e.style.width=g,e.style.height=g}if(c){let g=parseInt(c,10);g>0&&l(g)}e.setAttribute("aria-busy","true")}let u=null;function p(){u&&u(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let g=!1,h=null,y=()=>{g||(g=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",y),h!==null&&clearTimeout(h),u=null)};e.addEventListener("transitionend",y),h=setTimeout(y,0),u=()=>{e.removeEventListener("transitionend",y),h!==null&&clearTimeout(h),g=!0,u=null}}let d=!1;function b(){let g=!!t.evaluate(n,o);g&&!d?(d=!0,m()):!g&&d&&(d=!1,p())}b();let v=o.$watch(b);Tn(e,v),Tn(e,()=>{u&&u(),d&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function Bn(t,e={}){In(t)}var je=new Map,G=new Map,D={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Hn(){je.clear(),G.clear(),D.active=!1,D.splitEl=null,D.gutterEl=null,D.prevPane=null,D.nextPane=null,D.direction=null,D.startPos=0,D.startPrevSize=0,D.startNextSize=0,D.containerSize=0}function st(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Ti(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $n(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,n=r&&(e==="horizontal"?r.width:r.height);return n||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function Mn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function Ii(t,e){let n=(je.get(t)?.gutters||[]).reduce((o,i)=>o+Q(i,e),0);return Q(t,e)-n}function Bi(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function We(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function at(t,e,r,n){let o=Q(e,n),i=Q(r,n),c=G.get(e),s=G.get(r);t.setAttribute("aria-valuenow",Math.round(o)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(o+i-(s?.min||0)))}function qt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=je.get(t);if(!r)return;let n=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(n))}catch{}}function Hi(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let n=JSON.parse(r),o=je.get(t);return!o||n.length!==o.panes.length?!1:(n.forEach((i,c)=>{i&&(o.panes[c].style.flexBasis=i,o.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function $i(t,e,r,n,o){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),o!==6&&i.style.setProperty("--nojs-gutter-size",`${o}px`);let c=p=>{if(p.button!==0)return;p.preventDefault();let d=Ii(t,e);D.active=!0,D.splitEl=t,D.gutterEl=i,D.prevPane=r,D.nextPane=n,D.direction=e,D.startPos=p[$n(e)],D.startPrevSize=Q(r,e),D.startNextSize=Q(n,e),D.containerSize=d,D.sign=Mn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(p.pointerId)},s=p=>{if(!D.active||D.gutterEl!==i)return;let d=(p[$n(D.direction)]-D.startPos)*(D.sign||1),b=We(D.startPrevSize+d,D.prevPane),v=We(D.startNextSize-d,D.nextPane),g=D.startPrevSize+D.startNextSize;b+v!==g&&(b!==D.startPrevSize+d?v=g-b:b=g-v),D.prevPane.style.flexBasis=`${b}px`,D.prevPane.style.flexGrow="0",D.nextPane.style.flexBasis=`${v}px`,D.nextPane.style.flexGrow="0",at(i,D.prevPane,D.nextPane,D.direction)},a=()=>{!D.active||D.gutterEl!==i||(D.active=!1,document.body.style.cursor="",document.body.style.userSelect="",qt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:n}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let l=10,f=p=>{let d=e==="horizontal",b=Mn(t,e),v=0;if(d&&p.key==="ArrowRight"||!d&&p.key==="ArrowDown")v=l*b;else if(d&&p.key==="ArrowLeft"||!d&&p.key==="ArrowUp")v=-l*b;else if(p.key==="Home")v=(G.get(r)?.min||0)-Q(r,e);else if(p.key==="End"){let C=G.get(n);v=Q(r,e)+Q(n,e)-(C?.min||0)-Q(r,e)}else return;p.preventDefault();let g=Q(r,e),h=Q(n,e),y=g+h,E=We(g+v,r),A=We(y-E,n);E=y-A,E=We(E,r),A=y-E,r.style.flexBasis=`${E}px`,r.style.flexGrow="0",n.style.flexBasis=`${A}px`,n.style.flexGrow="0",at(i,r,n,e),qt(t)};i.addEventListener("keydown",f);let m=()=>{let p=G.get(r),d=G.get(n),b=p?.collapsible?r:d?.collapsible?n:null;if(!b)return;let v=G.get(b);if(!v)return;let g=b===r?n:r,h=Q(r,e)+Q(n,e);if(v.collapsed){v.collapsed=!1,b.removeAttribute("data-collapsed");let y=v.preCollapseSize||`${Math.round(h/2)}px`,E=Bi(y,h)??h/2,A=Math.min(E,h);b.style.flexBasis=`${A}px`,b.style.flexGrow="0",g.style.flexBasis=`${h-A}px`,g.style.flexGrow="0"}else v.preCollapseSize=b.style.flexBasis||`${Q(b,e)}px`,v.collapsed=!0,b.setAttribute("data-collapsed","true"),b.style.flexBasis="0px",b.style.flexGrow="0",g.style.flexBasis=`${h}px`,g.style.flexGrow="0";at(i,r,n,e),qt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:b,collapsed:v.collapsed}}))};return i.addEventListener("dblclick",m),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",f),i.removeEventListener("dblclick",m)}}}function Pn(t){t.directive("split",{priority:14,init(e,r,n){st();let o=(n||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",o);let c=Array.from(e.children).filter(f=>f.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(f=>{G.get(f)||G.set(f,{size:f.getAttribute("pane")||null,min:parseInt(f.getAttribute("pane-min"),10)||0,max:parseInt(f.getAttribute("pane-max"),10)||1/0,collapsible:f.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let f=0;f<c.length-1;f++){let{gutter:m,cleanup:u}=$i(e,o,c[f],c[f+1],i);c[f].after(m),s.push(m),a.push(u)}je.set(e,{direction:o,gutterSize:i,panes:c,gutters:s}),Hi(e)||c.forEach(f=>{let u=G.get(f)?.size;u?(f.style.flexBasis=u,f.style.flexGrow="0"):(f.style.flexGrow="1",f.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((f,m)=>{at(f,c[m],c[m+1],o)})}),Ti(e,()=>{a.forEach(f=>f()),s.forEach(f=>f.remove()),je.delete(e),c.forEach(f=>G.delete(f)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Mi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Rn(t){t.directive("pane",{priority:15,init(e,r,n){st(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:n||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";o.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${o.max}px`),Mi(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function qn(t,e={}){Pn(t),Rn(t)}function Fn(){Hn()}var be={sorts:new Map};function On(){be.sorts.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Pi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ri(t,e){let r=t.querySelector("tbody");if(!r)return null;let n=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!n)return null;let o=n.getAttribute("each")||n.getAttribute("foreach")||n.getAttribute("for");if(!o)return null;let i=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function qi(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function zn(t,e,r){let n=e.split("."),o=t;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function Vn(t,e){let r=Number.isNaN(t),n=Number.isNaN(e);return r&&n?0:r?1:n||t<e?-1:t>e?1:0}function Un(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return Vn(Number(t),Number(e));case"date":return Vn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Fi(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Wn(t){t.directive("sortable",{priority:10,init(e){Le(),e.classList.add("nojs-sortable")}})}function Gn(t){t.directive("sort",{priority:11,init(e,r,n){Le();let o=n;if(!o)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;be.sorts.has(s)||be.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(be.sorts.get(s).column||Nn(e,s,o,i,c,t));let a=()=>{let f=be.sorts.get(s),m;f.column!==o?m="asc":f.direction==="asc"?m="desc":f.direction==="desc"?m=null:m="asc",Nn(e,s,o,i,m,t)},l=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),a())};e.addEventListener("click",a),e.addEventListener("keydown",l),Pi(e,()=>{e.removeEventListener("click",a),e.removeEventListener("keydown",l),s&&!s.isConnected&&(be.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Nn(t,e,r,n,o,i){let c=be.sorts.get(e);Fi(e),o?(t.setAttribute("data-sort-dir",o),t.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),c.column=r,c.direction=o):(c.column=null,c.direction=null);let s=Ri(e,i);if(s){let a=i.findContext(e),l=a?qi(a,s.arrayPath):null;if(Array.isArray(l)){if(!o){let m=e._nojsOriginalOrder;if(m){let u=new Set(l),p=m.filter(d=>u.has(d));for(let d of l)m.includes(d)||p.push(d);zn(a,s.arrayPath,p)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...l]);let f=[...l].sort((m,u)=>{let p=m!=null?m[r]:null,d=u!=null?u[r]:null,b=Un(p,d,n);return o==="desc"?-b:b});zn(a,s.arrayPath,f);return}}Oi(e,t,r,n,o)}function Oi(t,e,r,n,o){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let l=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...l]),!o){let u=document.createDocumentFragment();for(let p of t._nojsOriginalRows)u.appendChild(p);i.appendChild(u);return}let f=u=>{let p=u.replace(/[^0-9.\-]/g,"");return p===""||p==="-"?NaN:parseFloat(p)};l.sort((u,p)=>{let d=u.children[a]?.textContent?.trim()||"",b=p.children[a]?.textContent?.trim()||"",v=Un(n==="number"?f(d):d,n==="number"?f(b):b,n);return o==="desc"?-v:v});let m=document.createDocumentFragment();for(let u of l)m.appendChild(u);i.appendChild(m)}function Yn(t){t.directive("fixed-header",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-header")}})}function Kn(t){t.directive("fixed-col",{priority:10,init(e){Le(),e.classList.add("nojs-fixed-col")}})}function Ft(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Xn(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let n=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!n)return null;let o=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return o?{iteratorVar:o[1],arrayPath:o[2].trim(),eachEl:r}:null}function Zn(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function Qn(t,e,r){let n=e.split("."),o=t;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function Jn(t){t.directive("table-reorder",{priority:15,init(e){if(Le(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let n=t.findContext(e),o=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,l=null;function f(){let v=r.querySelectorAll(":scope > tr");for(let g=0;g<v.length;g++){let h=v[g];if(h._nojsReorderSetup)continue;h._nojsReorderSetup=!0,h.draggable=!0,h.setAttribute("aria-roledescription","draggable row");let y=!0;if(o){let x=L=>{y=!!L.target.closest(o)};h.addEventListener("mousedown",x),Ft(h,()=>h.removeEventListener("mousedown",x))}let E=x=>{if(o&&!y){x.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(h),a=h,x.dataTransfer&&(x.dataTransfer.effectAllowed="move",x.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(S=>h.classList.add(S))},A=x=>{if(a==null)return;x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect="move");let L=h.getBoundingClientRect(),S=L.top+L.height/2,O=[...r.querySelectorAll(":scope > tr")].indexOf(h);m(),O!==s&&(x.clientY<S?h.classList.add("nojs-reorder-insert-before"):h.classList.add("nojs-reorder-insert-after"),l=h)},C=()=>{h.classList.remove("nojs-reorder-insert-before"),h.classList.remove("nojs-reorder-insert-after"),l===h&&(l=null)},j=x=>{if(x.preventDefault(),x.stopPropagation(),a==null||s==null)return;let L=[...r.querySelectorAll(":scope > tr")],S=h.getBoundingClientRect(),M=S.top+S.height/2,O=L.indexOf(h);x.clientY>=M&&O++;let k=s;if(k===O||k+1===O){u();return}let N=k<O?O-1:O,ae=Xn(e);if(ae&&n){let H=Zn(n,ae.arrayPath);if(Array.isArray(H)){let B=[...H],[R]=B.splice(k,1);B.splice(N,0,R),Qn(n,ae.arrayPath,B),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...B]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:k,to:N,item:R}}))}}else{let H=a,B=L[N];H&&B&&(k<N?r.insertBefore(H,B.nextSibling):r.insertBefore(H,B),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:k,to:N,item:null}})))}u()},w=()=>{u()};h.addEventListener("dragstart",E),h.addEventListener("dragover",A),h.addEventListener("dragleave",C),h.addEventListener("drop",j),h.addEventListener("dragend",w),Ft(h,()=>{h.removeEventListener("dragstart",E),h.removeEventListener("dragover",A),h.removeEventListener("dragleave",C),h.removeEventListener("drop",j),h.removeEventListener("dragend",w),h._nojsReorderSetup=!1})}}function m(){l&&(l.classList.remove("nojs-reorder-insert-before"),l.classList.remove("nojs-reorder-insert-after"),l=null)}function u(){a&&i.split(/\s+/).filter(Boolean).forEach(g=>a.classList.remove(g)),m(),s=null,a=null;let v=r.querySelectorAll(":scope > tr");for(let g of v)g.classList.remove("nojs-reorder-insert-before"),g.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(h=>g.classList.remove(h))}let p=v=>{a!=null&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"))},d=v=>{if(a==null||v.target!==r)return;v.preventDefault(),v.stopPropagation();let g=s,y=[...r.querySelectorAll(":scope > tr")].length-1;if(g===y){u();return}let E=Xn(e);if(E&&n){let A=Zn(n,E.arrayPath);if(Array.isArray(A)){let C=[...A],[j]=C.splice(g,1);C.push(j),Qn(n,E.arrayPath,C),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...C]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:g,to:C.length-1,item:j}}))}}u()};r.addEventListener("dragover",p),r.addEventListener("drop",d);let b=new MutationObserver(()=>{f()});b.observe(r,{childList:!0}),f(),Ft(e,()=>{b.disconnect(),r.removeEventListener("dragover",p),r.removeEventListener("drop",d),u()})}})}function eo(t,e={}){Wn(t),Gn(t),Yn(t),Kn(t),Jn(t)}function to(){On()}var he={containers:new Map};function ro(){for(let[,t]of he.containers)typeof t.unsub=="function"&&t.unsub();he.containers.clear()}function no(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function oo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function zi(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function Vi(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function io(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let n=document.createElement("ol");n.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let l=document.createElement("span");l.setAttribute("aria-current","page"),l.textContent=c.label,s.appendChild(l)}else{let l=document.createElement("a");l.href=c.href,l.textContent=c.label,s.appendChild(l)}n.appendChild(s)}t.appendChild(n);let o=he.containers.get(t);o&&(o.crumbs=e)}function Ni(t){let e=[],r=Array.from(t.children);for(let n of r){if(n.tagName==="OL"&&n.classList.contains("nojs-breadcrumb"))continue;let o=zi(n);if(!o)continue;let i=n.getAttribute("href")||"#";e.push({label:o,href:i})}return e}function Ui(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),n=[{label:"Home",href:"/"}],o="";for(let i=0;i<r.length;i++){o+="/"+r[i];let c=Vi(r[i].replace(/[-_]/g," "));n.push({label:c,href:o})}return n}function so(t){t.directive("breadcrumb",{priority:15,init(e,r,n){no(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let o=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!o&&i;if(he.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,l=a?a.path:"/",f=Ui(l);io(e,f)};if(s(),typeof i.on=="function"){let a=i.on(s),l=he.containers.get(e);l&&(l.unsub=a),oo(e,()=>{typeof a=="function"&&a();let f=he.containers.get(e);f&&(f.unsub=null)})}}else{let s=Ni(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");io(e,s)}oo(e,()=>{he.containers.delete(e)})}})}function ao(t,e={}){so(t)}function co(){ro()}var ct={containers:new Map};function lo(){ct.containers.clear()}function uo(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Wi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var dt=null;function Gi(){return dt!==null||(dt=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),dt}function po(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let n=Array.from(t.children),o=!1;for(let i of n){if(i===e){o=!0;continue}o&&r.appendChild(i)}return t.appendChild(r),r}function Yi(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let n=()=>{e.style.height="",e.removeEventListener("transitionend",n)};e.addEventListener("transitionend",n)})}function mo(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let n=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",n)};e.addEventListener("transitionend",n)})}function fo(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");mo(t,r)}else t.open=!1}function lt(t,e,r,n){let o=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:n}});t.dispatchEvent(o)}function Re(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function go(t){t.directive("accordion",{priority:10,init(e,r,n){uo();let o=(n||"").trim().toLowerCase()==="multi"?"multi":"single",i=!Gi();e.setAttribute("role","group");let c=Re(e);if(c.length===0)return;if(i)for(let u of c)po(u);let s=[],a=new MutationObserver(u=>{for(let p of u)for(let d of p.addedNodes)d.nodeType!==1||d.tagName!=="DETAILS"||d.parentElement===e&&f(d)});a.observe(e,{childList:!0});let l=0,f=u=>{i&&po(u);let p=u.querySelector(":scope > summary");if(p){let v=`nojs-accordion-panel-${Date.now()}-${l++}`,g=u.querySelector(":scope > .nojs-accordion-content");g?(g.id=g.id||v,g.setAttribute("role","region"),v=g.id):(u.id||(u.id=v),v=u.id),p.setAttribute("aria-expanded",u.open?"true":"false"),p.setAttribute("aria-controls",v)}let d=v=>{let g=Re(e),h=g.indexOf(u),y=u.querySelector(":scope > summary");if(y&&y.setAttribute("aria-expanded",u.open?"true":"false"),u.open){if(o==="single")for(let E of g)E!==u&&E.open&&fo(E,i);lt(e,u,!0,h)}else lt(e,u,!1,h)},b=null;if(i){let v=u.querySelector(":scope > summary");v&&(b=g=>{g.preventDefault();let h=u.querySelector(":scope > .nojs-accordion-content");if(u.open)mo(u,h),v.setAttribute("aria-expanded","false"),lt(e,u,!1,Re(e).indexOf(u));else{if(o==="single"){let y=Re(e);for(let E of y)if(E!==u&&E.open){fo(E,!0);let A=E.querySelector(":scope > summary");A&&A.setAttribute("aria-expanded","false")}}Yi(u,h),v.setAttribute("aria-expanded","true"),lt(e,u,!0,Re(e).indexOf(u))}},v.addEventListener("click",b))}u.addEventListener("toggle",d),s.push({details:u,toggleHandler:d,clickHandler:b})};for(let u of c)f(u);let m=u=>{let p=u.target;if(p.tagName!=="SUMMARY")return;let d=p.parentElement;if(!d||d.parentElement!==e)return;let v=Re(e).map(y=>y.querySelector(":scope > summary")).filter(Boolean),g=v.indexOf(p);if(g===-1)return;let h=-1;switch(u.key){case"ArrowDown":case"ArrowRight":h=(g+1)%v.length;break;case"ArrowUp":case"ArrowLeft":h=(g-1+v.length)%v.length;break;case"Home":h=0;break;case"End":h=v.length-1;break;default:return}h!==-1&&h!==g&&(u.preventDefault(),v[h].focus())};e.addEventListener("keydown",m),ct.containers.set(e,{mode:o,listeners:s,observer:a}),Wi(e,()=>{e.removeEventListener("keydown",m),a.disconnect();for(let u of s)if(u.details.removeEventListener("toggle",u.toggleHandler),u.clickHandler){let p=u.details.querySelector(":scope > summary");p&&p.removeEventListener("click",u.clickHandler)}s.length=0,ct.containers.delete(e)})}})}function bo(t,e={}){go(t)}function ho(){lo()}var qe=new Map;function vo(){let t=Array.from(qe.keys());for(let e of t){let r=qe.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[n,o]of r.renderedNodes){if(o.__disposers){for(let i of o.__disposers)try{i()}catch{}o.__disposers=null}o.parentNode&&o.remove()}r.renderedNodes.clear()}r.disposed=!0}}qe.clear()}function yo(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Ki(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Xi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let n=Zi(e.getAttribute(r));if(n)return{eachEl:e,...n}}return null}function Zi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Qi(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function xo(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let n=document.createElement("td"),o=e==="table"?t:t.closest("table"),i=o?o.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;n.setAttribute("colspan",String(c)),n.style.padding="0",n.style.border="none",r.appendChild(n)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function ut(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Ji(t,e){return t*e}function _o(t){let e=t.totalItems,r=new Array(e+1),n=t.estimatedHeight||50;r[0]=0;for(let o=1;o<=e;o++)r[o]=r[o-1]+(t.heights[o-1]||n);t.prefixSums=r}function wo(t,e){let r=0,n=t.length-2;for(;r<=n;){let o=r+n>>>1;t[o]<=e?r=o+1:n=o-1}return Math.max(0,n)}function Eo(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++)e+=t.heights[n]||r;return e}function pt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,n=t.estimatedHeight||50;for(let o=0;o<e;o++)r+=t.heights[o]||n;return r}function es(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return wo(t.prefixSums,e);let r=0,n=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++){let i=t.heights[o]||n;if(r+i>e)return o;r+=i}return Math.max(0,t.totalItems-1)}function ts(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return wo(t.prefixSums,e+r);let n=e+r,o=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(o+=t.heights[c]||i,o>=n)return c;return t.totalItems-1}function rs(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let n,o;return t.itemHeight!=="auto"?(n=Math.floor(e/t.itemHeight),o=Math.ceil((e+r)/t.itemHeight)-1):(n=es(t,e),o=ts(t,e,r)),n=Math.max(0,n-t.buffer),o=Math.min(t.totalItems-1,o+t.buffer),{start:n,end:o}}function Ot(t,e){if(t.disposed)return;let r=t.container,n=r,o=n.scrollTop,i=n.clientHeight,{start:c,end:s}=rs(t,o,i);if(c===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=s,t.dirty=!1;let a=pt(t,c),l=t.itemHeight!=="auto"?Ji(t.totalItems,t.itemHeight):Eo(t),f=s>=0?pt(t,s+1):0,m=Math.max(0,l-f);ut(t.spacerTop,a),ut(t.spacerBottom,m);let u=new Set;for(let d=c;d<=s;d++)u.add(d);for(let[d,b]of t.renderedNodes)u.has(d)||(b.remove(),t.renderedNodes.delete(d));let p=[];for(let d=c;d<=s;d++){if(t.renderedNodes.has(d))continue;let b=t.dataArray[d];if(b===void 0)continue;let v=t.template.cloneNode(!0),g={};g[t.iteratorVar]=b,g.$index=d,g.$count=t.totalItems,g.$first=d===0,g.$last=d===t.totalItems-1,g.$even=d%2===0,g.$odd=d%2!==0,v.setAttribute("role","option"),v.setAttribute("aria-setsize",String(t.totalItems)),v.setAttribute("aria-posinset",String(d+1)),v.setAttribute("tabindex","-1"),v.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(g)),v.__declared=!1,p.push({index:d,node:v}),t.renderedNodes.set(d,v)}if(p.length>0){p.sort((d,b)=>d.index-b.index);for(let{index:d,node:b}of p){let v=null;for(let[g,h]of t.renderedNodes)g>d&&h.parentNode===r&&(!v||g<ns(v,t))&&(v=h);v||(v=t.spacerBottom),r.insertBefore(b,v);try{e.processTree&&e.processTree(b)}catch{}}}if(t.itemHeight==="auto"){let d=!1;for(let[b,v]of t.renderedNodes){let g=v.offsetHeight||v.getBoundingClientRect().height;g>0&&t.heights[b]!==g&&(t.heights[b]=g,d=!0)}if(d){_o(t);let b=Eo(t),v=pt(t,c),g=s>=0?pt(t,s+1):0,h=Math.max(0,b-g);ut(t.spacerTop,v),ut(t.spacerBottom,h)}}}function ns(t,e){for(let[r,n]of e.renderedNodes)if(n===t)return r;return 1/0}function os(t,e,r){if(t.disposed)return;let n=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&_o(t);for(let[o,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=n,Ot(t,r)}function Ao(t){t.directive("virtual",{priority:10,init(e,r,n){yo(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let o=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=o==="auto"?"auto":parseInt(o,10),s=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let a=Xi(e),l=null;if(a)l=a.eachEl;else for(let A of e.children)if(!A.classList.contains("nojs-virtual-spacer")){l=A;break}if(!l){console.warn("[virtual] No child template found.");return}let f=l.cloneNode(!0);for(f.removeAttribute("each"),f.removeAttribute("foreach"),f.removeAttribute("for"),f.__declared=!1,f.__disposers=null,f.__ctx=null,a&&(a.eachEl.removeAttribute("each"),a.eachEl.removeAttribute("foreach"),a.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let m=xo(e),u=xo(e);e.appendChild(m),e.appendChild(u);let p={container:e,itemHeight:c,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:f,spacerTop:m,spacerBottom:u,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:a?a.iteratorVar:"item",arrayPath:a?a.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};qe.set(e,p);let d=A=>{let C=[...e.querySelectorAll('[role="option"]')];if(!C.length)return;let j=e.querySelector('[role="option"]:focus'),w=j?C.indexOf(j):-1,x=-1;switch(A.key){case"ArrowDown":A.preventDefault(),x=w<C.length-1?w+1:w;break;case"ArrowUp":A.preventDefault(),x=w>0?w-1:0;break;case"Home":A.preventDefault(),x=0;break;case"End":A.preventDefault(),x=C.length-1;break;default:return}x>=0&&x<C.length&&C[x].focus()};e.addEventListener("keydown",d);let b=null,v=()=>{b||(b=requestAnimationFrame(()=>{b=null,Ot(p,t)}))};if(p.scrollHandler=v,e.addEventListener("scroll",v,{passive:!0}),typeof ResizeObserver<"u"){let A=new ResizeObserver(()=>{p.dirty=!0,Ot(p,t)});A.observe(e),p.resizeObserver=A}let g=null,h=-1,y=null,E=()=>{if(!p.disposed){if(p.arrayPath){let A=t.findContext?t.findContext(e):null;if(A){let C=Qi(A,p.arrayPath);Array.isArray(C)&&(C!==g||C.length!==h)&&(g=C,h=C.length,os(p,C,t))}}y=setTimeout(E,100)}};y=setTimeout(E,100),Ki(e,()=>{p.disposed=!0,b&&(cancelAnimationFrame(b),b=null),y&&(clearTimeout(y),y=null),e.removeEventListener("scroll",v),e.removeEventListener("keydown",d),p.resizeObserver&&(p.resizeObserver.disconnect(),p.resizeObserver=null);for(let[A,C]of p.renderedNodes){if(C.__disposers){for(let j of C.__disposers)try{j()}catch{}C.__disposers=null}C.remove()}p.renderedNodes.clear(),p.spacerTop&&p.spacerTop.parentNode&&p.spacerTop.remove(),p.spacerBottom&&p.spacerBottom.parentNode&&p.spacerBottom.remove(),qe.delete(e)})}})}function jo(t,e={}){Ao(t)}function Lo(){vo()}var ve=new Map,ft=new Map;function ko(){for(let[t,e]of ve){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let n=r.el&&r.el.__disposers;if(n){for(let o of n)try{o()}catch{}r.el.__disposers=[]}}}ve.clear(),ft.clear()}function Co(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function is(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ss(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function as(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function cs(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function ds(){return document.documentElement}function ls(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function So(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function zt(t){let e=ve.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,n=e.threshold,o=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let m of a)m.isIntersecting?o.add(m.target.id):o.delete(m.target.id);let l=null,f=1/0;for(let m of o){let u=document.getElementById(m);if(!u)continue;let p=u.getBoundingClientRect();p.top<f&&(f=p.top,l=m)}for(let m of e.spyEntries)So(m.el);if(l){for(let m of e.spyEntries)if(m.targetId===l){ls(m.el),e.activeEl=m.el;break}}else e.activeEl=null},{rootMargin:i,threshold:n}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let l=document.getElementById(a.targetId);l&&(c.observe(l),s.add(a.targetId))}e.observer=c}function us(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Do(t){t.directive("spy",{priority:20,init(e,r,n){Co();let o=ss(e);if(!o){e.tagName!=="A"&&us(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=as(e),c=cs(e),s=ds();ve.has(s)||ve.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=ve.get(s),l={el:e,targetId:o};a.spyEntries.push(l),ft.set(e,s),zt(s),!a.mutObserver&&typeof MutationObserver<"u"&&(a.mutObserver=new MutationObserver(()=>{zt(s)}),a.mutObserver.observe(document.body,{childList:!0,subtree:!0})),is(e,()=>{let f=a.spyEntries.indexOf(l);f!==-1&&a.spyEntries.splice(f,1),ft.delete(e),So(e),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),a.mutObserver&&(a.mutObserver.disconnect(),a.mutObserver=null),ve.delete(s)):zt(s)})}})}function To(t,e={}){Do(t)}function Io(){ko()}var Vt="it is a DOM element; client mechanics never send DOM nodes",Bo={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:Vt},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:Vt},fixed:{list:null}},$el:{unavailable:Vt}}}};var ps="[validate],[drag],[drop],[drag-list],[drag-multiple]";function Ho(t){if(typeof document>"u")return;let e=document.querySelectorAll(ps);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;if(r.hasAttribute("validate")&&r.__nojsElBoundCtx===void 0){if(mr(r))continue;ms(t,r)}let n=K(t,"disposeTree");typeof n=="function"?n(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let o=t.findContext?t.findContext(r):null;o&&delete o.$form,t.processTree(r)}}var fs="[if],[else-if],[else],[switch],[each],[foreach],[for]";function ms(t,e){if(!e.querySelector(fs))return;(K(t,"warn")||console.warn)("[nojs-elements] loaded after core processed this <"+e.tagName.toLowerCase()+" validate>: content of an if/each inside it may be lost. Load the Elements script before DOMContentLoaded, or put `state` on the form or an element above it.")}var $o=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],gs=["validate","drag-list","drag-multiple",...$o].filter(t=>!Jt.includes(t));function bs(t,e){ht(t,e);for(let r of gs)t.directive(r,{priority:30,init(n,o){o.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}var hs={name:"nojs-elements",contract:{directives:{...Bo}},install(t,e={}){if(pe(t)){bs(t,e);return}ht(t,e),br(t,e),wr(t,e),kr(t,e),Pr(t,e),Ur(t,e),Qr(t,e),an(t,e),xn(t,e),Cn(t,e),Bn(t,e),qn(t,e),eo(t,e),ao(t,e),bo(t,e),jo(t,e),To(t,e),Ho(t)},init(t){if(pe(t)||(Ho(t),typeof document>"u"||!document.body))return;let e=$o.map(n=>`[${n}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let n of r)n.__declared&&!n.__disposers&&!n.__ctx&&(n.__declared=!1);try{t.processTree(document.body)}catch(n){t.internals?.warn?.("nojs-elements init re-process error:",n.message)}},dispose(t){er(),hr(),Ar(),Cr(),Rr(),Wr(),Jr(),cn(),En(),Sn(),Fn(),to(),co(),ho(),Lo(),Io()}},Xd=hs;export{Xd as default};
//# sourceMappingURL=nojs-elements.js.map
