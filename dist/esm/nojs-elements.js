/**
 * NoJS Elements v1.23.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
var w={dragging:null,selected:new Map,placeholder:null},Ne=new Map;function Qt(){w.dragging=null,w.selected.clear(),w.placeholder&&(w.placeholder.remove(),w.placeholder=null),Ne.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function Y(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function fe(t,e){t.__nojsElBoundCtx=e}function Jt(t){t.__nojsElOwnCtx=!0}function jt(t){return t.__nojsElOwnCtx===!0}function J(t){return!!(t&&typeof t.hostApi=="number"&&t.hostApi>=1)}function Ze(t,e){let r=Y(t,"removeCoreDirective");typeof r=="function"?r(e):(Y(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function pe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ke(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Ke(r):e++}return e}function Xe(t,e,r,n){let o=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(o.length===0)return 0;for(let i=0;i<o.length;i++){let s=(o[i].style&&o[i].style.display==="contents"&&o[i].firstElementChild||o[i]).getBoundingClientRect();if(n==="horizontal"){let c=s.left+s.width/2;if(e<c)return i}else if(n==="grid"){let c=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<c||r<s.top+s.height&&e<c)return i}else{let c=s.top+s.height/2;if(r<c)return i}}return o.length}function rr(t,e,r,n){re();let o;if(r==="auto"){if(o=document.createElement("div"),o.className=n||"nojs-drop-placeholder",w.dragging&&w.dragging.sourceEl){let s=(w.dragging.sourceEl.firstElementChild||w.dragging.sourceEl).getBoundingClientRect();s.height>0&&(o.style.height=s.height+"px"),s.width>0&&(o.style.width=s.width+"px")}}else{let a=document.getElementById(r.startsWith("#")?r.slice(1):r);a&&a.content?(o=document.createElement("div"),o.style.display="contents",o.className=n||"nojs-drop-placeholder",o.appendChild(a.content.cloneNode(!0))):(o=document.createElement("div"),o.className=n||"nojs-drop-placeholder")}o.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(a=>!a.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(o):t.insertBefore(o,i[e]),w.placeholder=o}function re(){w.placeholder&&(w.placeholder.remove(),w.placeholder=null)}function Ee(t,e){return!e||e==="*"?!0:e.split(",").map(n=>n.trim()).includes(t)}function ti(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let n=t.style&&t.style.display==="contents"&&t.firstElementChild||t,o=n.getBoundingClientRect(),i=o.width,a=o.height,s=getComputedStyle(n),c=Math.min(e,3);for(let m=c-1;m>=0;m--){let p=document.createElement("div"),u=m*4;if(p.style.cssText="position:absolute;top:"+u+"px;left:"+u+"px;width:"+i+"px;height:"+a+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",m===0){let f=n.cloneNode(!0);for(;f.firstChild;)p.appendChild(f.firstChild);p.style.background=s.backgroundColor||"#fff",p.style.border=s.border,p.style.padding=s.padding,p.style.fontSize=s.fontSize,p.style.color=s.color,p.style.fontFamily=s.fontFamily}else p.style.background=s.backgroundColor||"#fff",p.style.border=s.border||"1px solid #ddd";r.appendChild(p)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(c-1)*4+"px",r.style.height=a+(c-1)*4+"px",r}var oe=null;function ri(){return oe&&oe.isConnected?oe:typeof document>"u"||!document.body?null:(oe=document.createElement("div"),oe.setAttribute("aria-live","assertive"),oe.setAttribute("aria-atomic","true"),oe.setAttribute("role","status"),oe.className="nojs-dnd-live-region",oe.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(oe),oe)}function de(t){let e=ri();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function nr(t){if(J(t)){t.directive("drag",{priority:15,init(e,r){Le(),er(e,oi(e,r))}});return}Ze(t,"drag"),t.directive("drag",{priority:15,init(e,r,n){Le(),er(e,ni(t,e,n))}})}function ni(t,e,r){let n=t.findContext(e);fe(e,n);let o=e.getAttribute("drag-disabled");return{ctx:n,value:()=>t.evaluate(r,n),disabled:()=>o?t.evaluate(o,n):!1,watchDisabled:i=>pe(e,n.$watch(i)),onDispose:i=>pe(e,i)}}function oi(t,e){return{ctx:null,value:()=>t.getAttribute("drag"),disabled:()=>e.value(t,"drag-disabled"),watchDisabled:r=>e.watch(t,"drag-disabled",r),onDispose:r=>e.onDispose(t,r)}}function er(t,e){let r=t.getAttribute("drag-type")||"default",n=t.getAttribute("drag-effect")||"move",o=t.getAttribute("drag-handle"),i=t.getAttribute("drag-image"),a=t.getAttribute("drag-image-offset")||"0,0",s=t.getAttribute("drag-disabled"),c=t.getAttribute("drag-class")||"nojs-dragging",d=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-roledescription","draggable item"),t.getAttribute("role")||t.setAttribute("role","button"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let m=!0;if(o){let l=v=>{m=!!v.target.closest(o)};t.addEventListener("mousedown",l),e.onDispose(()=>t.removeEventListener("mousedown",l))}let p=l=>{if(o&&!m){l.preventDefault();return}if(s&&e.disabled()){l.preventDefault();return}let v=e.value(),h=t.getAttribute("drag-group"),g=v;if(h&&w.selected.has(h)){let x=w.selected.get(h);x.size>0&&[...x].some(_=>_.el===t)&&(g=[...x].map(_=>_.item))}if(w.dragging={item:g,type:r,effect:n,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},l.dataTransfer){if(l.dataTransfer.effectAllowed=n,l.dataTransfer.setData("text/plain",""),Array.isArray(g)&&g.length>1&&l.dataTransfer.setDragImage){let x=ti(t,g.length);document.body.appendChild(x);let b=t.getBoundingClientRect();l.dataTransfer.setDragImage(x,b.width/2,b.height/2),requestAnimationFrame(()=>x.remove())}else if(i&&l.dataTransfer.setDragImage)if(i==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[b,_]=a.split(",").map(Number);l.dataTransfer.setDragImage(x,b||0,_||0),requestAnimationFrame(()=>x.remove())}else{let x=t.querySelector(i);if(x){let[b,_]=a.split(",").map(Number);d&&x.classList.add(d),l.dataTransfer.setDragImage(x,b||0,_||0)}}}if(c.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),Array.isArray(g)&&h&&w.selected.has(h))for(let x of w.selected.get(h))x.el!==t&&c.split(/\s+/).filter(Boolean).forEach(b=>x.el.classList.add(b));let y=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${y}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:g,index:w.dragging.sourceIndex,el:t}}))},u=()=>{c.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v));let l=t.getAttribute("drag-group");if(l&&w.selected.has(l))for(let v of w.selected.get(l))c.split(/\s+/).filter(Boolean).forEach(h=>v.el.classList.remove(h));if(d&&i&&i!=="none"){let v=t.querySelector(i);v&&v.classList.remove(d)}t.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:w.dragging?.item,index:w.dragging?.sourceIndex,dropped:w.dragging===null}})),w.dragging=null,re()};if(t.addEventListener("dragstart",p),t.addEventListener("dragend",u),e.onDispose(()=>{t.removeEventListener("dragstart",p),t.removeEventListener("dragend",u)}),s){let l=function(){let v=!!e.disabled();t.draggable=!v,v?t.removeAttribute("aria-roledescription"):t.setAttribute("aria-roledescription","draggable item")};e.watchDisabled(l)}let f=l=>{if(w.dragging&&!w.dragging.sourceEl.isConnected&&(w.dragging=null),l.key===" "&&!w.dragging){l.preventDefault();let v=e.value();w.dragging={item:v,type:r,effect:n,sourceEl:t,sourceCtx:e.ctx,sourceList:null,sourceIndex:null,listDirective:null},c.split(/\s+/).filter(Boolean).forEach(g=>t.classList.add(g));let h=t.getAttribute("aria-label")||t.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${h}. Use arrow keys to move.`),t.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:v,index:null,el:t}}))}else l.key==="Escape"&&w.dragging&&w.dragging.sourceEl===t&&(l.preventDefault(),c.split(/\s+/).filter(Boolean).forEach(v=>t.classList.remove(v)),de("Drag cancelled."),w.dragging=null,re())};t.addEventListener("keydown",f),e.onDispose(()=>t.removeEventListener("keydown",f))}function or(t){if(J(t)){t.directive("drop",{priority:15,init(e,r){Le(),tr(e,si(e,r)),ai(e,r)}});return}Ze(t,"drop"),t.directive("drop",{priority:15,init(e,r,n){Le(),tr(e,ii(t,e,n))}})}function ii(t,e,r){let n=t.findContext(e);fe(e,n);let o=e.getAttribute("drop-disabled"),i=e.getAttribute("drop-max");return{disabled:()=>o?t.evaluate(o,n):!1,max:()=>i?t.evaluate(i,n):void 0,run(a){let s=Y(t,"execStatement");typeof s=="function"?s(r,n,a):(Y(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.")},onDispose:a=>pe(e,a)}}function si(t,e){return{disabled:()=>e.value(t,"drop-disabled"),max:()=>e.value(t,"drop-max"),run(r){e.exec(t.getAttribute("drop"),{$drag:r.$drag,$dragType:r.$dragType,$dragEffect:r.$dragEffect,$dropIndex:r.$dropIndex,$source:{index:r.$source.index},$target:{index:r.$target.index}})},onDispose:r=>e.onDispose(t,r)}}function ai(t,e){t.hasAttribute("drop-disabled")&&e.watch(t,"drop-disabled",()=>{if(!e.value(t,"drop-disabled"))return;let r=t.getAttribute("drop-class")||"nojs-drag-over",n=t.getAttribute("drop-reject-class")||"nojs-drop-reject";r.split(/\s+/).filter(Boolean).forEach(o=>t.classList.remove(o)),n.split(/\s+/).filter(Boolean).forEach(o=>t.classList.remove(o)),w.placeholder&&t.contains(w.placeholder)&&re()})}function tr(t,e){let r=t.getAttribute("drop-accept")||"default",n=t.getAttribute("drop-effect")||"move",o=t.getAttribute("drop-class")||"nojs-drag-over",i=t.getAttribute("drop-reject-class")||"nojs-drop-reject",a=t.getAttribute("drop-disabled"),s=t.getAttribute("drop-max"),c=t.getAttribute("drop-sort"),d=t.getAttribute("drop-placeholder"),m=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",n);let p=0,u=g=>{if(!w.dragging||a&&e.disabled())return;let y=Ee(w.dragging.type,r),x=!0;if(s){let b=e.max(),_=Ke(t);typeof b=="number"&&_>=b&&(x=!1)}if(!y||!x){i.split(/\s+/).filter(Boolean).forEach(b=>t.classList.add(b)),o.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),re();return}if(i.split(/\s+/).filter(Boolean).forEach(b=>t.classList.remove(b)),g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect=n),c){let b=Xe(t,g.clientX,g.clientY,c);d&&rr(t,b,d,m),t.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:w.dragging.item,index:b}}))}},f=g=>{if(!w.dragging||a&&e.disabled())return;let y=Ee(w.dragging.type,r),x=!0;if(s){let b=e.max(),_=Ke(t);typeof b=="number"&&_>=b&&(x=!1)}y&&x&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect=n)),p++,p===1&&(y&&x?(o.split(/\s+/).filter(Boolean).forEach(b=>t.classList.add(b)),t.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:w.dragging.item,type:w.dragging.type}}))):i.split(/\s+/).filter(Boolean).forEach(b=>t.classList.add(b)))},l=g=>{w.dragging&&(p--,p<=0&&(p=0,o.split(/\s+/).filter(Boolean).forEach(y=>t.classList.remove(y)),i.split(/\s+/).filter(Boolean).forEach(y=>t.classList.remove(y)),re(),t.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:w.dragging.item}}))))},v=g=>{if(g.preventDefault(),g.stopPropagation(),p=0,!w.dragging||a&&e.disabled()||!Ee(w.dragging.type,r))return;if(s){let j=e.max(),C=Ke(t);if(typeof j=="number"&&C>=j)return}let y=w.dragging.item,x=w.dragging.type,b=w.dragging.effect,_=0;c&&(_=Xe(t,g.clientX,g.clientY,c)),o.split(/\s+/).filter(Boolean).forEach(j=>t.classList.remove(j)),i.split(/\s+/).filter(Boolean).forEach(j=>t.classList.remove(j)),re();let k={$drag:y,$dragType:x,$dragEffect:b,$dropIndex:_,$source:{list:w.dragging.sourceList,index:w.dragging.sourceIndex,el:w.dragging.sourceEl},$target:{list:null,index:_,el:t},$el:t};e.run(k),w.dragging=null,t.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:y,index:_,source:k.$source,target:k.$target,effect:b}}))},h=g=>{w.dragging&&(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),v(g))};t.addEventListener("dragover",u),t.addEventListener("dragenter",f),t.addEventListener("dragleave",l),t.addEventListener("drop",v),t.addEventListener("keydown",h),e.onDispose(()=>{t.removeEventListener("dragover",u),t.removeEventListener("dragenter",f),t.removeEventListener("dragleave",l),t.removeEventListener("drop",v),t.removeEventListener("keydown",h)})}function ir(t){Ze(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,n){Le();let o=t.findContext(e);fe(e,o);let i=e.getAttribute("template"),a=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",c=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+n,m=e.getAttribute("drop-accept")||d,p=e.hasAttribute("drag-list-copy"),u=e.hasAttribute("drag-list-remove"),f=e.getAttribute("drag-disabled"),l=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),h=e.getAttribute("drop-placeholder"),g=e.getAttribute("drop-placeholder-class"),y=e.getAttribute("drag-class")||"nojs-dragging",x=e.getAttribute("drop-class")||"nojs-drag-over",b=e.getAttribute("drop-reject-class")||"nojs-drop-reject",_=e.getAttribute("drop-settle-class")||"nojs-drop-settle",k=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",p?"copy":"move");let j={listPath:n,ctx:o,el:e};Ne.set(e,j),pe(e,()=>Ne.delete(e));let C=0,L=null;function E(){let B=t.resolve(n,o);if(!Array.isArray(B))return;if(B===L&&B.length>0&&e.children.length>0){for(let K of e.children)K.__ctx&&K.__ctx.$notify&&K.__ctx.$notify();return}L=B;let z=i?document.getElementById(i):null;if(!z)return;let P=Y(t,"disposeChildren");typeof P=="function"&&P(e),e.innerHTML="";let H=B.length;B.forEach((K,Q)=>{let ce={[s]:K,$index:Q,$count:H,$first:Q===0,$last:Q===H-1,$even:Q%2===0,$odd:Q%2!==0},Re=t.createContext(ce,o),At=z.content.cloneNode(!0),$=document.createElement("div");$.style.display="contents",$.__ctx=Re,$.appendChild(At),e.appendChild($);let F=$.firstElementChild||$;F.draggable=!0,F.setAttribute("role","option"),F.setAttribute("aria-roledescription","draggable item"),F.getAttribute("tabindex")||F.setAttribute("tabindex","0");let le=U=>{if(f&&t.evaluate(f,o)){U.preventDefault();return}w.dragging={item:K,type:d,effect:p?"copy":"move",sourceEl:$,sourceCtx:Re,sourceList:B,sourceIndex:Q,listDirective:{el:e,listPath:n,ctx:o,keyProp:a,copyMode:p,removeMode:u}},U.dataTransfer&&(U.dataTransfer.effectAllowed=p?"copy":"move",U.dataTransfer.setData("text/plain","")),y.split(/\s+/).filter(Boolean).forEach(xe=>F.classList.add(xe));let X=F.getAttribute("aria-label")||F.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${X}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:K,index:Q,el:F}}))},ye=()=>{y.split(/\s+/).filter(Boolean).forEach(U=>F.classList.remove(U)),w.dragging&&w.dragging.sourceEl===$&&(w.dragging=null),re()};$.addEventListener("dragstart",le),$.addEventListener("dragend",ye);let Ye=U=>{if(U.key===" "&&!w.dragging){U.preventDefault(),U.stopPropagation(),w.dragging={item:K,type:d,effect:p?"copy":"move",sourceEl:$,sourceCtx:Re,sourceList:B,sourceIndex:Q,listDirective:{el:e,listPath:n,ctx:o,keyProp:a,copyMode:p,removeMode:u}},y.split(/\s+/).filter(Boolean).forEach(xe=>F.classList.add(xe));let X=F.getAttribute("aria-label")||F.textContent?.trim()?.slice(0,50)||"Item";de(`Grabbed ${X}. Use arrow keys to reorder.`)}else if(U.key==="Escape"&&w.dragging){U.preventDefault(),U.stopPropagation();let X=e.querySelector(`.${y.split(/\s+/)[0]}`)||F;y.split(/\s+/).filter(Boolean).forEach(xe=>X.classList.remove(xe)),de("Reorder cancelled."),w.dragging=null,re()}else if((U.key==="ArrowDown"||U.key==="ArrowRight")&&w.dragging&&w.dragging.sourceEl===$){U.preventDefault();let X=$.nextElementSibling;if(X){(X.firstElementChild||X).focus();let Pe=[...e.children].filter(_t=>!_t.classList.contains("nojs-drop-placeholder")),wt=Pe.indexOf(X)+1;de(`Moved to position ${wt} of ${Pe.length}.`)}}else if((U.key==="ArrowUp"||U.key==="ArrowLeft")&&w.dragging&&w.dragging.sourceEl===$){U.preventDefault();let X=$.previousElementSibling;if(X){(X.firstElementChild||X).focus();let Pe=[...e.children].filter(_t=>!_t.classList.contains("nojs-drop-placeholder")),wt=Pe.indexOf(X)+1;de(`Moved to position ${wt} of ${Pe.length}.`)}}};$.addEventListener("keydown",Ye),$.__disposers=$.__disposers||[],$.__disposers.push(()=>$.removeEventListener("dragstart",le),()=>$.removeEventListener("dragend",ye),()=>$.removeEventListener("keydown",Ye)),t.processTree($)});let R=B.length===0;k.split(/\s+/).filter(Boolean).forEach(K=>e.classList.toggle(K,R))}let A=B=>{if(!w.dragging||l&&t.evaluate(l,o))return;let z=Ee(w.dragging.type,m),P=!0;if(v){let R=t.evaluate(v,o),K=t.resolve(n,o);typeof R=="number"&&Array.isArray(K)&&K.length>=R&&(P=!1)}if(!z||!P){b.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),x.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),re();return}b.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect=p?"copy":"move");let H=Xe(e,B.clientX,B.clientY,c);h&&rr(e,H,h,g)},S=B=>{if(!w.dragging||l&&t.evaluate(l,o))return;let z=Ee(w.dragging.type,m),P=!0;if(v){let H=t.evaluate(v,o),R=t.resolve(n,o);typeof H=="number"&&Array.isArray(R)&&R.length>=H&&(P=!1)}z&&P&&(B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect=p?"copy":"move")),C++,C===1&&(z&&P?(x.split(/\s+/).filter(Boolean).forEach(H=>e.classList.add(H)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:w.dragging.item,type:w.dragging.type}}))):b.split(/\s+/).filter(Boolean).forEach(H=>e.classList.add(H)))},O=()=>{w.dragging&&(C--,C<=0&&(C=0,x.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),b.split(/\s+/).filter(Boolean).forEach(B=>e.classList.remove(B)),re(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:w.dragging?.item}}))))},te=B=>{if(B.preventDefault(),B.stopPropagation(),C=0,!w.dragging||l&&t.evaluate(l,o)||!Ee(w.dragging.type,m))return;if(v){let $=t.evaluate(v,o),F=t.resolve(n,o);if(typeof $=="number"&&Array.isArray(F)&&F.length>=$)return}let z=w.dragging.item,P=w.dragging.listDirective,H=w.dragging.sourceIndex,R=Xe(e,B.clientX,B.clientY,c);x.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),b.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),re();let K=t.resolve(n,o);if(!Array.isArray(K))return;let Q=P&&P.el===e;if(Q&&H===R){w.dragging=null;return}if(Q&&H+1===R){w.dragging=null;return}let ce=[...K];if(Q){let[$]=ce.splice(H,1),F=H<R?R-1:R;ce.splice(F,0,$),o.$set(n,ce),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:ce,item:z,from:H,to:F}}))}else{let $=p&&typeof z=="object"?{...z}:z;if(ce.splice(R,0,$),o.$set(n,ce),P&&!P.copyMode&&(u||P.removeMode)){let F=t.resolve(P.listPath,P.ctx);if(Array.isArray(F)&&H!=null){let le=F.filter((ye,Ye)=>Ye!==H);P.ctx.$set(P.listPath,le),P.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:le,item:z,index:H}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:ce,item:z,from:H,fromList:P?t.resolve(P.listPath,P.ctx):null}}))}let Re=w.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||w.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",At=Q&&H<R?R:R+1;de(`Dropped ${Re} at position ${At}.`),requestAnimationFrame(()=>{let F=[...e.children][Q&&H<R?R-1:R];if(F){let le=F.firstElementChild||F;_.split(/\s+/).filter(Boolean).forEach(ye=>le.classList.add(ye)),le.addEventListener("animationend",()=>{_.split(/\s+/).filter(Boolean).forEach(ye=>le.classList.remove(ye))},{once:!0})}}),w.dragging=null},q=B=>{if(w.dragging&&Ee(w.dragging.type,m)&&(B.key==="Enter"||B.key===" ")){B.preventDefault();let z=e.querySelector(":focus");if(z){let H=(z.style?.display==="contents"&&z.firstElementChild||z).getBoundingClientRect(),R={preventDefault(){},stopPropagation(){},clientX:H.left+H.width/2,clientY:H.top+H.height+1,dataTransfer:null};te(R)}}};e.addEventListener("dragover",A),e.addEventListener("dragenter",S),e.addEventListener("dragleave",O),e.addEventListener("drop",te),e.addEventListener("keydown",q),pe(e,()=>{e.removeEventListener("dragover",A),e.removeEventListener("dragenter",S),e.removeEventListener("dragleave",O),e.removeEventListener("drop",te),e.removeEventListener("keydown",q)});let ae=o.$watch(E);pe(e,ae),E()}})}function sr(t){Ze(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let n=t.findContext(e);fe(e,n);let o=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!o){(Y(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}w.selected.has(o)||w.selected.set(o,new Set);let a=w.selected.get(o),s=d=>{let m=e.getAttribute("drag"),u={item:m?t.evaluate(m,n):null,el:e,ctx:n};if(d.ctrlKey||d.metaKey){let f=[...a].find(l=>l.el===e);f?(a.delete(f),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.remove(l))):(a.add(u),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l)))}else{for(let f of a)i.split(/\s+/).filter(Boolean).forEach(l=>f.el.classList.remove(l));a.clear(),a.add(u),i.split(/\s+/).filter(Boolean).forEach(f=>e.classList.add(f))}};e.addEventListener("click",s),pe(e,()=>{e.removeEventListener("click",s);let d=[...a].find(m=>m.el===e);d&&a.delete(d)});let c=d=>{if(d.key==="Escape"){for(let m of a)i.split(/\s+/).filter(Boolean).forEach(p=>m.el.classList.remove(p));a.clear()}};window.addEventListener("keydown",c),pe(e,()=>window.removeEventListener("keydown",c))}})}var ar=["drag","drop"];function Lt(t,e={}){nr(t),or(t),!J(t)&&(ir(t),sr(t))}function cr(){Qt()}var Ct=Object.freeze([Object.freeze(["valueMissing","required"]),Object.freeze(["typeMismatch",null]),Object.freeze(["tooShort","minlength"]),Object.freeze(["tooLong","maxlength"]),Object.freeze(["patternMismatch","pattern"]),Object.freeze(["rangeUnderflow","min"]),Object.freeze(["rangeOverflow","max"]),Object.freeze(["stepMismatch","step"])]),Je=Object.freeze(Ct.map(([t])=>t)),dr=Object.freeze(["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"]),Fe=Object.freeze({required:"Required",email:"Invalid email",url:"Invalid URL",min:t=>`Minimum value is ${t}`,max:t=>`Maximum value is ${t}`}),pa=Object.freeze({valueMissing:"Please fill out this field.",typeMismatch:{email:"Please enter an email address.",url:"Please enter a URL.",number:"Please enter a number."},tooShort:(t,e)=>`Please lengthen this text to ${t} characters or more (you are currently using ${e} characters).`,tooLong:(t,e)=>`Please shorten this text to ${t} characters or less (you are currently using ${e} characters).`,patternMismatch:"Please match the requested format.",rangeUnderflow:t=>`Value must be greater than or equal to ${t}.`,rangeOverflow:t=>`Value must be less than or equal to ${t}.`,stepMismatch:"Please enter a valid value."}),ci=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,ur=new Set(["url","min","max"]),li=Object.freeze(["input","focusout"]);function St(t){return t==null||String(t).trim()===""}function di(t){return t!=null&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function ui(t){return t.kind!==void 0?t.kind:t.type==="checkbox"||t.type==="radio"?t.type:null}function fi(t,e){return(e.validateEmpty!=null?e.validateEmpty:t&&t.validateEmpty)==="skip"}function fr(t,e){return e.validateOn?e.validateOn.split(/\s+/):t&&t.validateOn?t.validateOn.split(/\s+/):li.slice()}function pi(t){return typeof t.perField=="boolean"?t.perField?"field":"form":t.validateOn!=null||t.fields.some(e=>e.validateOn!=null)?"field":"form"}function pr(t){return t.split("|").map(e=>e.trim()).map(e=>{let[r,...n]=e.split(":");return{name:r,args:n}})}function mr(t){return(typeof t=="function"?t():t)||{}}function Tt(t,e,r){let n=t(...e);return r&&di(n)&&r(),n}function gr(t,e,r,n,o,i){switch(t){case"required":return St(r)?Fe.required:null;case"email":return r&&!ci.test(r)?Fe.email:null;case"url":try{new URL(r)}catch{return Fe.url}return null;case"min":return Number(r)<Number(e[0])?Fe.min(e[0]):null;case"max":return Number(r)>Number(e[0])?Fe.max(e[0]):null;case"custom":if(e[0]&&n[e[0]]){let a=Tt(n[e[0]],[r,i],o);if(a!==!0&&a)return a}return null;default:return null}}function mi(t,e,r,n,o={},i){let a=mr(o),s=[],c=new Set,d=r.value,m=St(d)&&fi(t,e);if(e.rules)for(let{name:u,args:f}of pr(e.rules)){let l=i?()=>i(u):void 0,v=a[u];if(!v&&m&&ur.has(u))continue;let h=v?Tt(v,[d,...f,n],l):gr(u,f,d,a,l,n),g=h!==!0&&h?h:null;g&&(s.push({rule:u,message:g}),c.add(u))}let p=r.native;if(p&&p.flags&&p.flags.length)for(let[u,f]of Ct){if(!p.flags.includes(u))continue;let l=f||e.type;c.has(l)||(s.push({rule:l,message:p.message}),c.add(l))}return s}function gi(t,e,r){let n=t.messages?t.messages[String(e).toLowerCase()]:null;if(n)return n;let o=t.error;return o&&!o.startsWith("#")?o:r}function bi(t,e){let r=t.messages?t.messages[String(e).toLowerCase()]:null;if(r&&r.startsWith("#"))return r;let n=t.error;return n&&n.startsWith("#")?n:null}function lr(t){let e=dr.indexOf(t);return e===-1?999:e}function hi(t,e){if(!t.length)return null;let r=[...t].sort((n,o)=>lr(n.rule)-lr(o.rule))[0];return{rule:r.rule,message:gi(e,r.rule,r.message)}}function br(t,e,r,n=!1,o={},i){let a=n&&St(t),s=mr(o);for(let{name:c,args:d}of pr(e)){let m=i?()=>i(c):void 0,p=s[c];if(p){let u=Tt(p,[t,...d,r],m);if(u!==!0&&u)return u}else{if(a&&ur.has(c))continue;let u=gr(c,d,t,s,m,r);if(u)return u}}return null}function Dt(){return{touched:[],dirty:[],formTouched:!1,formDirty:!1,submitting:!1}}function hr(t){let e=t||{},r=Array.isArray(e.touched)?e.touched:[],n=Array.isArray(e.dirty)?e.dirty:[];return{touched:r,dirty:n,formTouched:typeof e.formTouched=="boolean"?e.formTouched:r.length>0,formDirty:typeof e.formDirty=="boolean"?e.formDirty:n.length>0,submitting:!!e.submitting}}function vr(t,e){return e&&!t.includes(e)?[...t,e]:t}function Qe(t,e){return{...t,touched:vr(t.touched,e),formTouched:!0}}function kt(t,e){return{...t,dirty:vr(t.dirty,e),formDirty:!0}}function et(t,e,r){let n=hr(e),{trigger:o,field:i}=r;switch(o){case"submit":return t.fields.reduce((c,d)=>Qe(c,d.name),{...n,formTouched:!0});case"submitting":return{...n,submitting:!0};case"endSubmit":return{...n,submitting:!1};case"reset":return Dt();case"init":return n}if(pi(t)==="form")return o==="input"||o==="change"?kt(n,i):o==="focusout"?Qe(n,i):n;let a=t.fields.find(c=>c.name===i);if(!i||!a&&!r.triggers)return n;let s=r.triggers||fr(t,a);if(o==="input")return kt(n,i);if(o==="focusout"){if(s.includes("blur")||s.includes("focusout")){let c=Qe(n,i);return s.includes("blur")?kt(c,i):c}return Qe(n,i)}return n}function vi(t,e){let r={};return t.fields.forEach((n,o)=>{let i=yr(e,o,n),a=ui(n);a==="checkbox"?r[n.name]=!!i.checked:a==="radio"?i.checked?r[n.name]=i.value:n.name in r||(r[n.name]=""):r[n.name]=i.value}),r}function yr(t,e,r){return(Array.isArray(t)?t[e]:t&&t[r.name])||{value:""}}function yi(t){return typeof t.validateIf=="function"?!!t.validateIf():t.validateIf===void 0?!0:!!t.validateIf}function xi(t,e,r,n){if(e.validateOn==null&&t.validateOn==null)return r||n;let o=fr(t,e),i=o.includes("input"),a=o.includes("blur")||o.includes("focusout")||o.includes("submit");return i&&n||a&&r}function xr(t,e,r,n={},o={}){let i=hr(r),a=new Set(i.touched),s=new Set(i.dirty),c=vi(t,e),d={},m={},p=[],u={},f=[],l={valid:!0,firstError:null,errorCount:0};return t.fields.forEach((v,h)=>{let g=yr(e,h,v),y=a.has(v.name),x=s.has(v.name),b=v.errorClass||t.errorClass||null,_={};if(yi(g)){let j=hi(mi(t,v,g,c,n,A=>f.push({code:"VALIDATE_ASYNC_UNSUPPORTED",field:v.name,rule:A})),v),C=!j,L=xi(t,v,y,x);C||(l.valid=!1),!C&&L&&(d[v.name]=j.message,l.errorCount++,l.firstError||(l.firstError=j.message));let E={valid:C,dirty:x,touched:y,error:j?j.message:null,value:c[v.name]};m[v.name]=E,Object.assign(_,{name:v.name,excluded:!1,invalid:!C,shown:!C&&L,error:j,errorClass:b,template:j&&L?bi(v,j.rule):null,as:v.as||null,entry:E})}else{let k={valid:!0,dirty:x,touched:y,error:null,value:c[v.name]};m[v.name]=k,Object.assign(_,{name:v.name,excluded:!0,invalid:!1,shown:!1,error:null,errorClass:b,template:null,as:v.as||null,entry:k})}_.as&&(u[_.as]=_.entry),p.push(_),o.onField&&o.onField(h,_)}),{form:{valid:l.valid,dirty:i.formDirty,touched:i.formTouched,submitting:i.submitting,pending:!1,errors:d,values:c,firstError:l.firstError,errorCount:l.errorCount,fields:m},display:p,aliases:u,warnings:f}}function Er(t){return!!t.valid&&!t.pending}function Ar(t){return!!t.valid&&!t.pending&&!t.submitting}function ze(t,e,r=!1){let n=t.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let o of n)if(o.getAttribute("auto-disable")!=="off"){if(o.hasAttribute("disabled")&&o.getAttribute("disabled")!==""){let i=o.getAttribute("disabled");if(i!=="disabled"&&i!=="true"&&i!=="false")continue}(!r||o.disabled!==!e)&&(o.disabled=!e),o.__autoDisabled=!0}}var Ei=Object.freeze(["focusout"]);function me(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var kr,Cr,rt,ke,It,wr,tt,$t,Bt,Ht,Ot=null;function Ai(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function _r(){return Y(kr,"validators")||{}}function wi(t){return(t.hasAttribute("validate-empty")?t.getAttribute("validate-empty"):t.closest("form[validate]")?.getAttribute("validate-empty"))==="skip"}function _i(t){let e={};for(let{name:r,value:n}of t.attributes)r.startsWith("error-")&&(e[r.slice(6)]=n);return e}function ji(t){return{name:t.name,type:(t.getAttribute("type")||"text").toLowerCase(),kind:t.type==="checkbox"||t.type==="radio"?t.type:null,rules:t.getAttribute("validate"),error:t.getAttribute("error"),messages:_i(t),validateOn:t.getAttribute("validate-on"),validateEmpty:t.getAttribute("validate-empty"),errorClass:t.getAttribute("error-class"),as:t.getAttribute("as")}}function Li(t,e,r,n){return{validateOn:t.getAttribute("validate-on"),validateEmpty:t.getAttribute("validate-empty"),errorClass:r,perField:n,fields:e.map(ji)}}function ki(t){let e=t.validity;return!e||e.valid?null:{flags:Je.filter(r=>e[r]),message:t.validationMessage}}function Ci(t,e){return{get value(){return t.value},get checked(){return t.checked},get native(){return ki(t)},validateIf:()=>Tr(t,e)}}function Sr(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Si(t,e,r,n,o){let i=Sr(n);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;$t(i),i.remove()}let a=document.querySelector(t);if(!a)return;let s=a.content.cloneNode(!0),c=document.createElement("div");c.style.display="contents",c.setAttribute("aria-live","polite"),c.__errorTemplateFor=n;let d=rt({$error:e,$rule:r,err:{message:e}},o);c.__ctx=d,c.appendChild(s),a.parentNode.insertBefore(c,a.nextSibling),Ai(c),It(c)}function Ti(t){let e=Sr(t);e&&($t(e),e.remove())}function Tr(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Cr(r,e)}catch{return!0}}function Di(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let n=e?e.getAttribute("validate-on"):null;return n?n.split(/\s+/):["input","focusout"]}function jr(t){return t.hasAttribute("model")?t.tagName==="SELECT"||t.type==="checkbox"||t.type==="radio"?"change":"input":null}function Lr(t,e){return()=>{let r=t.getAttribute("model"),n=t.__gatedDirs&&t.__gatedDirs.some(o=>o.name==="model");if(r&&!n&&Ht&&(t.type!=="radio"||t.checked)){let o=t.type==="checkbox"?t.checked:t.value;Ht(`${r} = __val`,ke(t),{__val:o})}e()}}function Ii(t){if(t.__ctx)return t.__ctx;let e=null;for(let n=t.parentElement;n;n=n.parentElement)if(n.__ctx){if(!jt(n))return ke(t);e=n.__ctx;break}let r=rt({},e);return t.__ctx=r,r}var Bi=/^\(\)\s*=>\s*[\w$]+\.removeEventListener\(\s*(["'])submit\1\s*,\s*[\w$]+\s*\)$/;function Hi(t){let e=t&&t.fields;if(!e)return!1;let r=e.__nojsStubProbe;return!!r&&Object.isFrozen(r)}function Dr(t){if(!Ot||t.__nojsElBoundCtx!==void 0)return!1;let e=t;for(;e&&!e.__ctx;)e=e.parentElement;if(!e||e!==t&&jt(e))return!1;if(t.tagName==="FORM"||t.closest("form")){let r=t.__disposers||[],n=r.length-1;for(;n>=0&&!Bi.test(Function.prototype.toString.call(r[n]).trim());)n--;if(n<0)return!1;r.splice(n,1)[0]()}if(t.tagName!=="FORM"&&!t.closest("form[validate]")){let r=ke(t);Hi(r.$form)&&delete r.$form}try{Ot(t,"validate",t.getAttribute("validate"))}catch(r){Bt(`directive "validate" init error on <${t.tagName.toLowerCase()}>:`,r)}return!0}function Ir(t){kr=t,Cr=t.evaluate,rt=t.createContext,ke=t.findContext,It=t.processTree,wr=Y(t,"cloneTemplate")||(()=>null),tt=Y(t,"disposeChildren")||(()=>{}),$t=Y(t,"disposeTree")||tt,Bt=Y(t,"warn")||console.warn,Ht=Y(t,"execStatement");let e=Y(t,"removeCoreDirective");typeof e=="function"?e("validate"):Bt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.');let r={priority:30,init(n,o,i){if(n.tagName==="FORM"){let l=function(){s&&typeof s.$notify=="function"&&s.$notify();let E=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT);for(;E.nextNode();){let S=E.currentNode.__ctx;S&&S!==s&&typeof S.$notify=="function"&&S.$notify()}},v=function(){return n.querySelectorAll("input, textarea, select")},h=function(){return[...v()].filter(E=>E.name)},g=function(E=h()){return Li(n,E,c,p)},y=function(E,A,S){u=et(g(),u,{trigger:E,field:A,triggers:S})},x=function(){let E=h(),{form:A}=xr(g(E),E.map(S=>Ci(S,s)),u,_r,{onField:(S,O)=>b(E[S],O)});f.valid=A.valid,f.dirty=A.dirty,f.touched=A.touched,f.submitting=A.submitting,f.errors=A.errors,f.values=A.values,f.fields=A.fields,f.firstError=A.firstError,f.errorCount=A.errorCount,f.pending=A.pending,s.$set("$form",{...f}),l(),_(n)},b=function(E,A){if(A.shown?E.setAttribute("aria-invalid","true"):E.removeAttribute("aria-invalid"),A.errorClass){let S=A.errorClass.split(/\s+/);A.shown?E.classList.add(...S):E.classList.remove(...S)}A.template?Si(A.template,A.error.message,A.error.rule,E,s):Ti(E),A.as&&s.$set(A.as,A.entry)},_=function(E){ze(E,Ar(f))},j=function(E,A,S){E.addEventListener(A,S),me(n,()=>E.removeEventListener(A,S))},C=function(E){if(!E.name)return;let A=Di(E,n),S=jr(E);(q=>{if(S==="change"){j(E,"input",Lr(E,q));return}j(E,"input",q),S&&k.push([E,"input",q])})(()=>{y("input",E.name,A),x()});let te=()=>{y("focusout",E.name,Ei),x()};A.includes("blur")?j(E,"focusout",()=>{te(),y("input",E.name,A),x()}):j(E,"focusout",te),A.includes("submit")&&j(E,"focusout",te)},s=Ii(n);fe(n,s),n.setAttribute("novalidate","");let c=n.getAttribute("error-class"),d=n.hasAttribute("validate-on"),m=[...v()].some(E=>E.hasAttribute("validate-on")),p=d||m,u=Dt(),f={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u=et(g(),u,{trigger:"reset"}),f.dirty=!1,f.touched=!1,f.pending=!1,f.submitting=!1,n.reset(),x()},endSubmit:()=>{u=et(g(),u,{trigger:"endSubmit"}),f.submitting=!1,x()}};s.$set("$form",f);let k=[];if(p){for(let E of v())C(E);if(k.length){let E=!1;me(n,()=>{E=!0}),queueMicrotask(()=>{if(!E){for(let[A,S,O]of k)A.removeEventListener(S,O),A.addEventListener(S,O);k.length=0}})}}else{let E=O=>{y(O.type==="change"?"change":"input",O.target&&O.target.name),x()},A=O=>{O.target&&jr(O.target)==="change"?Lr(O.target,()=>E(O))():E(O)};n.addEventListener("input",A),me(n,()=>n.removeEventListener("input",A)),n.addEventListener("change",E),me(n,()=>n.removeEventListener("change",E));let S=O=>{y("focusout",O.target&&O.target.name),x()};n.addEventListener("focusout",S),me(n,()=>n.removeEventListener("focusout",S))}let L=E=>{if(y("submit"),x(),!Er(f)){E.preventDefault(),E.stopImmediatePropagation();return}y("submitting"),f.submitting=!0,_(n),s.$set("$form",{...f}),l()};n.addEventListener("submit",L,!0),me(n,()=>n.removeEventListener("submit",L,!0)),n.__nojsResetSubmitting=()=>{y("endSubmit"),f.submitting=!1,x()},me(n,()=>{delete n.__nojsResetSubmitting}),requestAnimationFrame(x);return}let a=ke(n);if(fe(n,a),i&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT")){let s=!!n.closest("form[validate]"),c=s?null:n.getAttribute("error"),d=()=>{if(s&&!Tr(n,ke(n))){n.removeAttribute("aria-invalid");return}let m=br(n.value,i,{},wi(n),_r);if(m?n.setAttribute("aria-invalid","true"):n.removeAttribute("aria-invalid"),m&&c){let p=n.nextElementSibling?.__validationError?n.nextElementSibling:null;p||(p=document.createElement("div"),p.__validationError=!0,p.style.display="contents",n.parentNode.insertBefore(p,n.nextSibling));let u=wr(c);if(u){let f=rt({err:{message:m}},a);tt(p),p.innerHTML="",p.__ctx=f,p.appendChild(u),It(p)}}else{let p=n.nextElementSibling?.__validationError?n.nextElementSibling:null;p&&(tt(p),p.innerHTML="")}};n.addEventListener("input",d),me(n,()=>n.removeEventListener("input",d))}}};Ot=r.init,t.directive("validate",r)}var Br=300,Hr="data-nj-validate",nt="data-nj-form-state",Oi="data-nj-validate-init",Mt="data-nj-validate-pending",Or="input, textarea, select";function $r(t){return[...t.querySelectorAll(Or)].filter(e=>e.name&&(e.type||"").toLowerCase()!=="file")}function $i(t){let e={},r={};for(let n of $r(t)){n.type==="checkbox"?e[n.name]=n.checked:n.type==="radio"?n.checked?e[n.name]=n.value:n.name in e||(e[n.name]=""):e[n.name]=n.value;let o=n.validity;if(o&&!o.valid&&!(n.name in r)){let i=Je.filter(a=>o[a]);i.length&&(r[n.name]={flags:i,message:n.validationMessage})}}return{values:e,native:r}}function Rt(t,e){let r=e.value(t,nt);return r&&typeof r=="object"?r:null}function Mi(t,e){let r=t.getAttribute(Hr);if(!r){e.warn("form[validate] has no validate action: the site was built without a validation engine; the server refuses its submits.");return}t.setAttribute("novalidate","");let n=t.ownerDocument.defaultView,o=[...t.querySelectorAll(Or)],i=t.hasAttribute("validate-on")||o.some(b=>b.hasAttribute("validate-on")),a=()=>new Set($r(t).map(b=>b.name)),s=null,c=null,d=!1,m=!1,p=Rt(t,e)?.reset??0;function u(){if(s!==null||d){ze(t,!0,!0);return}let b=Rt(t,e);b&&ze(t,!!b.valid&&!b.pending&&!b.submitting,!0)}function f(){let b=Rt(t,e);b&&typeof b.reset=="number"&&b.reset>p&&(p=b.reset,t.reset()),u()}function l(b,_){let{values:k,native:j}=$i(t),C={trigger:b};_&&a().has(_)&&(C.field=_),C.values=k,Object.keys(j).length&&(C.native=j),d=!0,t.setAttribute(Mt,""),e.exec(r,C)}function v(){if(s===null)return;n.clearTimeout(s),s=null;let b=c;c=null,l(b.trigger,b.field)}function h(b,_){s!==null&&c.field!==_&&v(),s!==null&&n.clearTimeout(s),c={trigger:b,field:_},s=n.setTimeout(()=>{s=null;let k=c;c=null,l(k.trigger,k.field)},Br),u()}function g(b,_){v(),l(b,_),u()}function y(b,_,k,j=!1){b.addEventListener(_,k,j),e.onDispose(t,()=>b.removeEventListener(_,k,j))}if(!i)y(t,"input",b=>h("input",b.target&&b.target.name)),y(t,"change",b=>h("change",b.target&&b.target.name)),y(t,"focusout",b=>g("focusout",b.target&&b.target.name));else for(let b of o)b.name&&(y(b,"input",()=>h("input",b.name)),y(b,"focusout",()=>g("focusout",b.name)));y(n,"submit",b=>{b.target===t&&v()},!0);let x=new n.MutationObserver(b=>{m||(d&&!t.hasAttribute(Mt)&&(d=!1),b.some(_=>_.attributeName===nt)?f():u())});x.observe(t,{attributes:!0,subtree:!0,attributeFilter:[Mt,nt,"disabled"]}),e.watch(t,nt,f),e.onDispose(t,()=>{m=!0,x.disconnect(),s!==null&&n.clearTimeout(s),s=null}),u(),t.hasAttribute(Oi)&&queueMicrotask(()=>{m||g("init")})}function Ri(t,e){let r=t.getAttribute(Hr);if(!r)return;let n=t.ownerDocument.defaultView,o=null,i=()=>{o!==null&&n.clearTimeout(o),o=n.setTimeout(()=>{o=null,e.exec(r,{trigger:"input",value:t.value})},Br)};t.addEventListener("input",i),e.onDispose(t,()=>{t.removeEventListener("input",i),o!==null&&n.clearTimeout(o)})}function Mr(t){t.directive("validate",{priority:30,init(e,r){if(e.tagName==="FORM"){Mi(e,r);return}e.closest("form[validate]")||(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT")&&Ri(e,r)}})}function Pt(t,e={}){if(J(t)){Mr(t);return}Ir(t)}function Rr(){}var Ce=new Map,ee=new Map;function Pr(){let t=Array.from(Ce.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let n of r)try{n()}catch{}e.__disposers=[]}}for(let e of ee.values())clearTimeout(e);ee.clear();for(let e of Ce.values())e.remove();Ce.clear()}function Fr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function zr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function T(t,e,{priority:r,subtree:n=!1,init:o}){return J(t)?{priority:r,subtree:n,init(i,a){let s=c=>a.onDispose(i,c);o(i,i.getAttribute(e)??"",{host:a,dispose:s,disposeOn:(c,d)=>s(d)})}}:{priority:r,init(i,a,s){o(i,s,{host:null,dispose:c=>zr(i,c),disposeOn:zr})}}}var ot=8;function Vr(t,e,r){let n=e.getBoundingClientRect(),o=t.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight,s,c;switch(r){case"bottom":s=n.bottom+ot,c=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,c=n.left-o.width-ot;break;case"right":s=n.top+(n.height-o.height)/2,c=n.right+ot;break;default:s=n.top-o.height-ot,c=n.left+(n.width-o.width)/2;break}c<4&&(c=4),c+o.width>i-4&&(c=i-o.width-4),s<4&&(s=4),s+o.height>a-4&&(s=a-o.height-4),t.style.top=`${s}px`,t.style.left=`${c}px`}var Pi=0;function Fi(t,e,r){document.body.appendChild(e),Vr(e,t,r),e.setAttribute("aria-hidden","false")}function qr(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function zi(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Ur(t){t.directive("tooltip",T(t,"tooltip",{priority:20,init(e,r,n){Fr();let o=r;if(!o){n.host?n.host.warn("attribute value (tooltip text) is required."):zi(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",a=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(a)?300:a,c=e.getAttribute("tooltip-disabled"),d=c&&!n.host?t.findContext(e):null,m=()=>{if(n.host)return!!n.host.value(e,"tooltip-disabled");if(!c||!d)return!1;try{return!!t.evaluate(c,d)}catch{return!1}},p=`nojs-tooltip-${++Pi}`,u=document.createElement("div");u.className="nojs-tooltip",u.setAttribute("role","tooltip"),u.setAttribute("id",p),u.setAttribute("aria-hidden","true"),u.textContent=o,e.setAttribute("aria-describedby",p),Ce.set(e,u);let f=!1,l=0,v=()=>{!f||!e.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!f||!e.isConnected)&&Vr(u,e,i)}))},h=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},g=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),l&&(cancelAnimationFrame(l),l=0)},y=()=>{f||(Fi(e,u,i),f=!0,h())},x=()=>{if(!f){qr(e,u);return}g(),qr(e,u),f=!1},b=()=>{if(m())return;ee.has(e)&&clearTimeout(ee.get(e));let O=setTimeout(()=>{ee.delete(e),!m()&&e.isConnected&&y()},s);ee.set(e,O)},_=()=>{ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),x()},k=()=>b(),j=()=>_(),C=()=>b(),L=()=>_(),E=O=>{O.key==="Escape"&&u.getAttribute("aria-hidden")==="false"&&_()};e.addEventListener("mouseenter",k),e.addEventListener("mouseleave",j),e.addEventListener("focusin",C),e.addEventListener("focusout",L),e.addEventListener("keydown",E);let A=null,S=()=>{f&&m()&&x()};n.host?A=n.host.watch(e,"tooltip-disabled",S):c&&d&&typeof d.$watch=="function"&&(A=d.$watch(S)),n.dispose(()=>{e.removeEventListener("mouseenter",k),e.removeEventListener("mouseleave",j),e.removeEventListener("focusin",C),e.removeEventListener("focusout",L),e.removeEventListener("keydown",E),A&&(A(),A=null),g(),ee.has(e)&&(clearTimeout(ee.get(e)),ee.delete(e)),f=!1,u.remove(),Ce.delete(e)})}}))}function Gr(t,e={}){Ur(t)}function Wr(){Pr()}var N=new Map;function Yr(){N.clear()}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function Se(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}function zt(t){try{return t.matches(":popover-open")}catch{return!1}}var ge=8;function st(t,e,r){let n=e.getBoundingClientRect(),o=t.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight,s,c;switch(r){case"top":s=n.top-o.height-ge,c=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,c=n.left-o.width-ge;break;case"right":s=n.top+(n.height-o.height)/2,c=n.right+ge;break;default:s=n.bottom+ge,c=n.left+(n.width-o.width)/2;break}r==="bottom"&&s+o.height>a&&(s=n.top-o.height-ge),r==="top"&&s<0&&(s=n.bottom+ge),r==="right"&&c+o.width>i&&(c=n.left-o.width-ge),r==="left"&&c<0&&(c=n.right+ge),c<4&&(c=4),c+o.width>i-4&&(c=i-o.width-4),s<4&&(s=4),s+o.height>a-4&&(s=a-o.height-4),t.style.top=`${s}px`,t.style.left=`${c}px`}function Ft(t,e){t._untrack&&t._untrack();let r=0,n=()=>{r=0;let a=t.popoverEl;if(!a||!a.isConnected){i();return}if(!zt(a)){i();return}st(a,e,t.position)},o=()=>{r||(r=requestAnimationFrame(n))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o),t._untrack=null};return window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),t._untrack=i,i}function Ae(t){t&&t._untrack&&t._untrack()}function Nr(t){t.directive("popover",T(t,"popover",{priority:20,init(r,n,o){it();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.getAttribute("role")||r.setAttribute("role","dialog"),r.classList.add("nojs-popover");let a=r.getAttribute("popover-position")||"bottom";if(!N.has(i))N.set(i,{popoverEl:r,triggerEls:new Set,position:a,open:!1,_untrack:null});else{let c=N.get(i);c.popoverEl=r,c.position=a}let s=c=>{let d=N.get(i);if(!d)return;let m=c.newState==="open";d.open=m;for(let p of d.triggerEls)p.setAttribute("aria-expanded",String(m));m||(r.style.visibility="",Ae(d))};r.addEventListener("toggle",s),o.dispose(()=>{r.removeEventListener("toggle",s);let c=N.get(i);c&&(Ae(c),c.popoverEl===r&&(c.popoverEl=null,c.open=!1),!c.popoverEl&&c.triggerEls.size===0&&N.delete(i))})}})),t.directive("popover-trigger",T(t,"popover-trigger",{priority:20,init(r,n,o){it();let i=n;if(!i){let c=r.closest("[use]")||r.parentElement,d=c?.querySelector("[data-popover-id]")||c?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","dialog"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),N.has(i)||N.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),N.get(i).triggerEls.add(r);let a=c=>{let d=N.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}if(Se(d.popoverEl)){d.popoverEl.style.visibility="hidden";try{d.popoverEl.togglePopover(),zt(d.popoverEl)?(st(d.popoverEl,r,d.position),Ft(d,r)):Ae(d)}finally{d.popoverEl.style.visibility=""}}};r.addEventListener("click",a);let s=c=>{let d=N.get(i);c.key==="Escape"&&d?.open&&(Se(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),Ae(d),r.focus())};document.addEventListener("keydown",s),o.dispose(()=>{r.removeEventListener("click",a),document.removeEventListener("keydown",s);let c=N.get(i);c&&(c.triggerEls.delete(r),!c.popoverEl&&c.triggerEls.size===0&&(Ae(c),N.delete(i)))})}})),t.directive("popover-dismiss",T(t,"popover-dismiss",{priority:20,init(r,n,o){it();let i=()=>{let a=r.closest(".nojs-popover");!a||!Se(a,"hidePopover")||a.hidePopover()};r.addEventListener("click",i),o.dispose(()=>r.removeEventListener("click",i))}}));let e=(r,n)=>e.open(r,n);e.open=(r,n)=>{let o=N.get(r);if(!o||!o.popoverEl||!Se(o.popoverEl,"showPopover"))return!1;o.popoverEl.style.visibility="hidden";try{o.popoverEl.showPopover();let i=n||[...o.triggerEls][0];i&&(st(o.popoverEl,i,o.position),Ft(o,i))}catch{return!1}finally{o.popoverEl.style.visibility=""}return!0},e.close=r=>{let n=N.get(r);if(!n||!n.popoverEl||!Se(n.popoverEl,"hidePopover"))return!1;try{n.popoverEl.hidePopover()}catch{}return Ae(n),!0},e.toggle=(r,n)=>{let o=N.get(r);if(!o||!o.popoverEl||!Se(o.popoverEl))return!1;o.popoverEl.style.visibility="hidden";try{o.popoverEl.togglePopover();let i=n||[...o.triggerEls][0];i&&zt(o.popoverEl)?(st(o.popoverEl,i,o.position),Ft(o,i)):Ae(o)}finally{o.popoverEl.style.visibility=""}return!0},t.popover=e}function Kr(t,e={}){Nr(t)}function Xr(){Yr()}var G=[],ie=new Map,qi=1e4;function Zr(){return qi+G.length}function Qr(){G.length=0,ie.clear()}function Te(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}var en='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',qt=new WeakMap;function Vi(t){let e=r=>{if(r.key!=="Tab")return;let n=[...t.querySelectorAll(en)].filter(a=>a.offsetParent!==null);if(n.length===0){r.preventDefault();return}let o=n[0],i=n[n.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),o.focus())};t.addEventListener("keydown",e),qt.set(t,e)}function Jr(t){let e=qt.get(t);e&&(t.removeEventListener("keydown",e),qt.delete(t))}var qe=new WeakMap;function tn(t){t.directive("modal",T(t,"modal",{priority:10,init(r,n,o){Te();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let a=r.querySelector("h1, h2, h3, h4, h5, h6");a&&(a.id||(a.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",a.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let c=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),m=u=>{u.target===r&&s!=="false"&&d!=="false"&&De(r,i)};r.addEventListener("click",m),ie.set(i,r);let p=u=>{if(u.newState==="open"){if(r.style.zIndex=String(Zr()),c&&c.split(/\s+/).filter(Boolean).forEach(f=>r.classList.add(f)),requestAnimationFrame(()=>{if(!r.isConnected||!G.some(l=>l.el===r))return;let f=r.querySelector(en);f?f.focus():r.focus()}),Vi(r),d!=="false"){let f=l=>{l.key==="Escape"&&(l.stopPropagation(),De(r,i))};r.addEventListener("keydown",f),qe.set(r,f)}}else if(u.newState==="closed"){c&&c.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),Jr(r);let f=qe.get(r);f&&(r.removeEventListener("keydown",f),qe.delete(r));let l=G.findIndex(v=>v.el===r);if(l===-1&&(l=G.findIndex(v=>v.id===i)),l!==-1){let v=G[l];G.splice(l,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",p),o.dispose(()=>{r.removeEventListener("click",m),r.removeEventListener("toggle",p),Jr(r);let u=qe.get(r);u&&(r.removeEventListener("keydown",u),qe.delete(r)),ie.delete(i);let f=G.findIndex(l=>l.el===r);f===-1&&(f=G.findIndex(l=>l.id===i)),f!==-1&&G.splice(f,1)})}}));let e=r=>e.open(r);e.open=r=>{let n=ie.get(r);if(!n)return!1;try{n.showPopover()}catch{return!1}return G.some(o=>o.id===r)||G.push({id:r,el:n,triggerEl:null}),!0},e.close=r=>{let n=ie.get(r);return n?(De(n,r),!0):!1},e.closeAll=()=>{for(let r=G.length-1;r>=0;r--)De(G[r].el,G[r].id)},t.modal=e}function De(t,e){try{t.hidePopover()}catch{}}function Ui(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function rn(t){t.directive("modal-open",T(t,"modal-open",{priority:10,init(e,r,n){Te();let o=r;if(!o){let p=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(p&&(o=p.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let m=ie.get(o)||Ui(o);if(!m){console.warn(`[modal-open] modal "${o}" not found`);return}let p=G.some(u=>u.id===o);m.id&&e.setAttribute("aria-controls",m.id);try{m.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`);return}p||G.push({id:o,el:m,triggerEl:e}),e.setAttribute("aria-expanded","true")},a=()=>{e.setAttribute("aria-expanded","false")},s=null,c=null,d=()=>{let m=ie.get(o);return m?(c=m,s=p=>{p.newState==="closed"&&e.setAttribute("aria-expanded","false")},m.addEventListener("toggle",s),!0):!1};if(!d()){let m=requestAnimationFrame(d);n.dispose(()=>cancelAnimationFrame(m))}e.addEventListener("click",i),n.dispose(()=>{e.removeEventListener("click",i),c&&s&&c.removeEventListener("toggle",s)})}}))}function nn(t){t.directive("modal-close",T(t,"modal-close",{priority:10,init(e,r,n){Te();let o=()=>{let i,a;if(r){if(a=r,i=ie.get(a),!i){console.warn(`[modal-close] modal "${a}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}a=i.getAttribute("modal")}De(i,a)};e.addEventListener("click",o),n.dispose(()=>{e.removeEventListener("click",o)})}}))}function on(t,e={}){tn(t),rn(t),nn(t)}function sn(){Qr()}var ne={openMenus:new Map},V={installed:!1,instanceCount:0,outsideClickHandler:null,escHandler:null};function an(){ne.openMenus.clear(),V.installed=!1,V.instanceCount=0,V.outsideClickHandler=null,V.escHandler=null}function Ie(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var Gi=0;function Wi(){V.installed||(V.outsideClickHandler=t=>{let e=[...ne.openMenus.entries()];for(let[r,{toggle:n,wrapper:o}]of e)if(!o.contains(t.target)){if(r.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}ne.openMenus.delete(r)}},V.escHandler=t=>{if(t.key!=="Escape")return;let e=[...ne.openMenus.entries()];for(let[r,{toggle:n}]of e){if(r.removeAttribute("data-open"),n.setAttribute("aria-expanded","false"),typeof r.hidePopover=="function")try{r.hidePopover()}catch{}n.focus()}ne.openMenus.clear()},document.addEventListener("click",V.outsideClickHandler,!0),document.addEventListener("keydown",V.escHandler),V.installed=!0)}function Ut(){V.installed&&(document.removeEventListener("click",V.outsideClickHandler,!0),document.removeEventListener("keydown",V.escHandler),V.outsideClickHandler=null,V.escHandler=null,V.installed=!1)}function cn(t,e,r){let n=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),s=window.innerHeight,c=window.innerWidth,d,m;switch(n){case"top":d=i.top-a.height,m=i.left;break;case"left":d=i.top,m=i.left-a.width;break;case"right":d=i.top,m=i.right;break;default:d=i.bottom,m=i.left}n==="bottom"||n==="top"?o==="end"&&(m=i.right-a.width):o==="end"&&(d=i.bottom-a.height),n==="bottom"&&d+a.height>s&&i.top-a.height>0?d=i.top-a.height:n==="top"&&d<0&&i.bottom+a.height<=s&&(d=i.bottom),m<4&&(m=4),m+a.width>c-4&&(m=c-a.width-4),t.style.top=`${d}px`,t.style.left=`${m}px`}function Gt(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Vt(t){let e=Gt(t);e.length&&e[0].focus()}function ln(t){let e=Gt(t);e.length&&e[e.length-1].focus()}function dn(t){t.directive("dropdown",T(t,"dropdown",{priority:15,init(r,n,o){Ie()}})),t.directive("dropdown-toggle",T(t,"dropdown-toggle",{priority:15,init(r,n,o){Ie();let i=r.closest("[dropdown]");if(!i)return;let a=i.querySelector("[dropdown-menu]");if(!a)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),a.classList.add("nojs-dropdown-menu"),a.setAttribute("role","menu"),a.setAttribute("popover","auto"),a.id||(a.id=`nojs-dd-menu-${Date.now()}-${Gi++}`),r.setAttribute("aria-controls",a.id);let s=!1,c=typeof a.showPopover=="function"&&typeof a.hidePopover=="function";function d(){if(a.setAttribute("data-open",""),c&&!s)try{a.showPopover(),s=!0}catch{s=!1}r.setAttribute("aria-expanded","true"),cn(a,r,i),ne.openMenus.set(a,{toggle:r,wrapper:i})}function m(){if(c&&s){s=!1;try{a.hidePopover()}catch{}}a.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ne.openMenus.delete(a)}function p(){return r.getAttribute("aria-expanded")==="true"}let u=g=>{g.newState==="closed"&&p()&&m()};a.addEventListener("toggle",u);let f=g=>{g.preventDefault(),g.stopPropagation(),p()?m():d()};r.addEventListener("click",f),V.instanceCount++,Wi();let l=g=>{switch(g.key){case"Enter":case" ":g.preventDefault(),d(),Vt(a);break;case"ArrowDown":g.preventDefault(),d(),Vt(a);break;case"ArrowUp":g.preventDefault(),d(),ln(a);break}};r.addEventListener("keydown",l);let v=g=>{if(!(!p()||Gt(a).find(b=>b===document.activeElement)))switch(g.key){case"ArrowDown":g.preventDefault(),Vt(a);break;case"ArrowUp":g.preventDefault(),ln(a);break}};a.addEventListener("keydown",v);let h=()=>{p()&&cn(a,r,i)};window.addEventListener("scroll",h,!0),window.addEventListener("resize",h),o.dispose(()=>{r.removeEventListener("click",f),r.removeEventListener("keydown",l),a.removeEventListener("keydown",v),a.removeEventListener("toggle",u),window.removeEventListener("scroll",h,!0),window.removeEventListener("resize",h),ne.openMenus.delete(a),V.instanceCount--,V.instanceCount<=0&&(V.instanceCount=0,Ut())})}})),t.directive("dropdown-menu",T(t,"dropdown-menu",{priority:15,init(r,n,o){Ie(),r.hasAttribute("role")||r.setAttribute("role","menu")}}));let e=r=>e.open(r);e.open=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function Yi(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Wt(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ne.openMenus.has(t)&&ne.openMenus.delete(t)}function un(t){t.directive("dropdown-item",T(t,"dropdown-item",{priority:15,init(e,r,n){Ie();let o=e.closest("[dropdown-menu]"),i=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let a=c=>{if(!o)return;let d=Yi(o),m=d.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(m+1<d.length?d[m+1]:d[0]).focus();break}case"ArrowUp":{c.preventDefault(),(m-1>=0?d[m-1]:d[d.length-1]).focus();break}case"Home":{c.preventDefault(),d.length&&d[0].focus();break}case"End":{c.preventDefault(),d.length&&d[d.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),Wt(o,i),i){let p=i.querySelector("[dropdown-toggle]");p&&p.focus()}break}case"Tab":{Wt(o,i);break}}};e.addEventListener("keydown",a),n.dispose(()=>e.removeEventListener("keydown",a));let s=()=>{if(Wt(o,i),i){let c=i.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",s),n.dispose(()=>e.removeEventListener("click",s))}}))}function fn(t,e={}){dn(t),un(t)}function pn(){Ut(),an()}var se=new Map,Be=new Set,mn=0;function gn(){return++mn}function bn(){for(let t of Be)clearTimeout(t);Be.clear();for(let t of se.values())t.remove();se.clear(),mn=0}function hn(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}var Ni=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function at(){return se.size>0?se.values().next().value:Ki("top-right")}function Ki(t){if(se.has(t))return se.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),se.set(t,e),e}function Xi(t){return t.startsWith("top")}function ct(t,e,r,n,o){let i=gn(),a=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let c=document.createElement("span");if(c.textContent=e,s.appendChild(c),o){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>lt(s)),s.appendChild(d)}if(Xi(a)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),n>0){let d=setTimeout(()=>{Be.delete(d),s.isConnected&&lt(s)},n);Be.add(d),s._toastTimerId=d}return s}function lt(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Be.delete(t._toastTimerId)),t.remove())}function Zi(t){try{return JSON.parse(t),!0}catch{return!1}}function vn(t){hn(),t.directive("toast-container",T(t,"toast-container",{priority:10,subtree:!0,init(r,n,o){let i=n&&Ni.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),se.set(i,r),o.dispose(()=>{se.get(i)===r&&se.delete(i)})}})),t.directive("toast",T(t,"toast",{priority:10,init(r,n,o){if(!n)return;let i=r.getAttribute("toast-type")||"info",a=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(a)?3e3:a,c=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||(o.host?!Zi(n):r.hasAttribute("on:click"))){let l=()=>{let v=at();ct(v,n,i,s,c)};r.addEventListener("click",l),o.dispose(()=>r.removeEventListener("click",l));return}if(o.host){let l=o.host.value(r,"toast"),v=r.__nojsToastPrev;if(r.__nojsToastPrev=l,v!==void 0&&l&&l!==v){let h=typeof l=="string"?l:String(l);ct(at(),h,i,s,c)}o.dispose(()=>{r.hasAttribute("toast")||(r.__nojsToastPrev=void 0)});return}let m=t.findContext(r);if(!m||typeof m.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let p;function u(){let l=t.evaluate(n,m);if(l&&l!==p){let v=typeof l=="string"?l:String(l),h=at();ct(h,v,i,s,c),p=l}else p=l}let f=m.$watch(u);o.dispose(f)}}));let e=(r,n="info",o=3e3)=>{if(typeof document>"u")return;let i=!0,a=at();return ct(a,String(r),n,o,i)};e.dismiss=r=>{let n=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),o=document.querySelector(`[data-toast-id="${n}"]`);o&&lt(o)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>lt(r))},t.toast=e,t.global("toast",e)}function yn(t,e={}){vn(t)}function xn(){bn()}var be={containers:new Map};function En(){be.containers.clear()}function An(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}var Qi=0;function wn(t){return`${t}-${++Qi}`}function Ve(t,e,r=!1){let n=be.containers.get(t);if(!n)return;let{tabs:o,panels:i}=n;if(!(e<0||e>=o.length)&&!(!r&&o[e].getAttribute("aria-disabled")==="true")){for(let a=0;a<o.length;a++)o[a].setAttribute("aria-selected","false"),o[a].setAttribute("tabindex","-1"),i[a].setAttribute("aria-hidden","true"),i[a].inert=!0;o[e].setAttribute("aria-selected","true"),o[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,n.activeIndex=e}}function Ue(t,e,r){let n=t.length,o=e;for(let i=0;i<n;i++)if(o=(o+r+n)%n,t[o].getAttribute("aria-disabled")!=="true")return o;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function _n(t){t.directive("tabs",T(t,"tabs",{priority:10,subtree:!0,init(e,r,n){An();let o=[],i=[];for(let g of Array.from(e.children))g.hasAttribute("tab")?o.push(g):g.hasAttribute("panel")&&i.push(g);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==i.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+i.length+" panels.");let a=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",a),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let c=Math.min(o.length,i.length);for(let g=0;g<c;g++){let y=o[g],x=i[g],b=y.id||wn("nojs-tab"),_=x.id||wn("nojs-panel");y.id=b,x.id=_,y.setAttribute("role","tab"),y.setAttribute("aria-selected","false"),y.setAttribute("aria-controls",_),y.setAttribute("tabindex","-1"),y.classList.add("nojs-tab"),x.setAttribute("role","tabpanel"),x.setAttribute("aria-labelledby",b),x.setAttribute("tabindex","0"),x.setAttribute("aria-hidden","true"),x.inert=!0,x.classList.add("nojs-panel"),s.appendChild(y)}for(let g=c;g<i.length;g++){let y=i[g];y.setAttribute("role","tabpanel"),y.setAttribute("aria-hidden","true"),y.inert=!0,y.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),be.containers.set(e,{tabs:o.slice(0,c),panels:i.slice(0,c),activeIndex:-1});let m=n.host?null:t.findContext(e),p=[],u=(g,y)=>{let x=!1;try{x=n.host?!!n.host.value(g,"tab-disabled"):!!t.evaluate(y,m)}catch{x=!1}x?g.setAttribute("aria-disabled","true"):g.removeAttribute("aria-disabled")};for(let g=0;g<c;g++){let y=o[g],x=y.getAttribute("tab-disabled");if(x&&(u(y,x),m&&typeof m.$watch=="function")){let b=m.$watch(()=>u(y,x));p.push(b)}}let f=0;if(r&&r.trim()!==""){let g=parseInt(r,10);!isNaN(g)&&g>=0&&g<c&&(f=g)}n.host&&e.__nojsTabsActive>=0&&e.__nojsTabsActive<c&&(f=e.__nojsTabsActive);let l=o.slice(0,c);if(o[f]?.getAttribute("aria-disabled")==="true"){let g=Ue(l,f,1);g!==-1?(f=g,Ve(e,f)):Ve(e,f,!0)}else Ve(e,f);let v=g=>{let y=be.containers.get(e);if(!y)return;let x=g.target;if(x.getAttribute("role")!=="tab")return;let{tabs:b}=y,_=b.indexOf(x);if(_===-1)return;let k=-1;switch(g.key){case"ArrowRight":case"ArrowDown":k=Ue(b,_,1);break;case"ArrowLeft":case"ArrowUp":k=Ue(b,_,-1);break;case"Home":k=Ue(b,b.length-1,1);break;case"End":k=Ue(b,0,-1);break;case"Tab":return;default:return}k!==-1&&k!==_&&(g.preventDefault(),Ve(e,k),b[k].focus())};s.addEventListener("keydown",v);let h=g=>{let y=g.target.closest("[role='tab']");if(!y)return;let x=be.containers.get(e);if(!x)return;let b=x.tabs.indexOf(y);b!==-1&&y.getAttribute("aria-disabled")!=="true"&&(Ve(e,b),y.focus())};s.addEventListener("click",h),n.dispose(()=>{n.host&&(e.__nojsTabsActive=be.containers.get(e)?.activeIndex??-1),s.removeEventListener("keydown",v),s.removeEventListener("click",h);for(let g of p)g&&g();p.length=0,be.containers.delete(e)})}}))}function jn(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Ln(t){t.directive("panel",{priority:11,init(){}})}function kn(t,e={}){_n(t),jn(t),Ln(t)}function Cn(){En()}var M={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Sn(){M.branches.clear(),M.selectedItem=null,M.typeahead="",M.typeaheadTimer&&(clearTimeout(M.typeaheadTimer),M.typeaheadTimer=null)}function He(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function Tn(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n;for(;n=r.nextNode();)e.push(n);return e}function Dn(t){return t.closest('[role="tree"]')}function Ji(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let n=e.previousElementSibling;if(n?.matches?.('[role="treeitem"]'))return n}return t.parentElement?.closest('[role="treeitem"]')||null}function es(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(n=>n.remove()),(e.textContent||"").trim().toLowerCase()}function Yt(t){let e=M.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),M.selectedItem=t}function In(t){let e=M.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function ts(t){let e=M.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function rs(t){let e=M.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Bn(t,e){let r=Dn(e);if(!r)return;let n=Tn(r),o=n.indexOf(e);if(o<0)return;let i=M.branches.get(e),a=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),a&&!i.expanded)ts(e);else if(a&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&we(s,n)}break;case"ArrowLeft":if(t.preventDefault(),a&&i.expanded)rs(e);else{let s=Ji(e);s&&we(s,Tn(r))}break;case"ArrowDown":t.preventDefault(),o<n.length-1&&we(n[o+1],n);break;case"ArrowUp":t.preventDefault(),o>0&&we(n[o-1],n);break;case"Enter":case" ":t.preventDefault(),Yt(e),a&&In(e);break;case"Home":t.preventDefault(),n.length>0&&we(n[0],n);break;case"End":t.preventDefault(),n.length>0&&we(n[n.length-1],n);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),M.typeahead+=t.key.toLowerCase(),M.typeaheadTimer&&clearTimeout(M.typeaheadTimer),M.typeaheadTimer=setTimeout(()=>{M.typeahead="",M.typeaheadTimer=null},500);let s=o+1;for(let c=0;c<n.length;c++){let d=(s+c)%n.length;if(es(n[d]).startsWith(M.typeahead)){we(n[d],n);break}}}break}}function Hn(t){t.directive("tree",T(t,"tree",{priority:15,subtree:!0,init(e,r,n){He(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}}))}function On(t){t.directive("branch",T(t,"branch",{priority:16,init(e,r,n){He();let o=r==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(o));let i=Dn(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let a=!1;queueMicrotask(()=>{if(a)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(M.branches.set(e,{expanded:o,subtreeEl:d}),d.setAttribute("aria-hidden",String(!o))):M.branches.set(e,{expanded:o,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),Yt(e),In(e))};e.addEventListener("click",s),n.dispose(()=>e.removeEventListener("click",s));let c=d=>{Bn(d,e)};e.addEventListener("keydown",c),n.dispose(()=>e.removeEventListener("keydown",c)),n.dispose(()=>{a=!0,M.branches.delete(e),M.selectedItem===e&&(M.selectedItem=null),M.typeaheadTimer&&(clearTimeout(M.typeaheadTimer),M.typeaheadTimer=null,M.typeahead="")})}}))}function we(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function $n(t){t.directive("subtree",T(t,"subtree",{priority:16,init(e,r,n){He(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let i of e.children)if(i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")){i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf");let a=c=>{c.stopPropagation(),Yt(i)};i.addEventListener("click",a),n.disposeOn(i,()=>i.removeEventListener("click",a));let s=c=>{Bn(c,i)};i.addEventListener("keydown",s),n.disposeOn(i,()=>i.removeEventListener("keydown",s)),n.disposeOn(i,()=>{M.selectedItem===i&&(M.selectedItem=null)})}let o=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(o){let i=M.branches.get(o);i?(e.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}}))}function Nt(t){return t.closest('[role="treeitem"]')}function ns(t){return t.closest('[role="tree"]')}function os(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function is(t){return os(t).indexOf(t)}function ss(t,e,r){let n=t.getBoundingClientRect(),o=e-n.top,i=n.height;return r==="reparent"?"on":r==="reorder"?o<i/2?"before":"after":o<i*.25?"before":o>i*.75?"after":"on"}function Mn(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var I={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Oe(){I.indicator&&(I.indicator.remove(),I.indicator=null)}function Ge(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function as(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function cs(t,e){Oe();let r=as(),n=t.getBoundingClientRect(),o=ns(t);if(!o)return;let i=o.getBoundingClientRect();r.style.position="absolute",r.style.left=n.left-i.left+"px",r.style.width=n.width+"px",e==="before"?r.style.top=n.top-i.top-1+"px":r.style.top=n.bottom-i.top-1+"px",getComputedStyle(o).position==="static"&&(o.style.position="relative"),o.appendChild(r),I.indicator=r}function Rn(t){t.directive("tree-drag-mode",T(t,"tree-drag-mode",{priority:15,subtree:!0,init(e,r,n){if(He(),r!=="reparent"&&r!=="reorder"&&r!=="both")return;let o=0,i=u=>{let f=Nt(u.target);if(f&&e.contains(f)){if(f.hasAttribute("tree-drag-disabled")){u.preventDefault();return}I.dragging={el:f,treeRoot:e},u.dataTransfer&&(u.dataTransfer.effectAllowed="move",u.dataTransfer.setData("text/plain","")),f.classList.add("nojs-dragging"),f.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:f}}))}},a=u=>{if(!I.dragging||I.dragging.treeRoot!==e)return;let f=Nt(u.target);if(!f||!e.contains(f)||f===I.dragging.el||Mn(f,I.dragging.el))return;u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move");let l=ss(f,u.clientY,r);(I.currentTarget!==f||I.currentPosition!==l)&&(Ge(e),Oe(),I.currentTarget=f,I.currentPosition=l,l==="on"?f.classList.add("nojs-tree-drag-over"):cs(f,l))},s=u=>{I.dragging&&I.dragging.treeRoot===e&&(o++,a(u))},c=u=>{I.dragging&&(o--,o<=0&&(o=0,Ge(e),Oe(),I.currentTarget=null,I.currentPosition=null))},d=u=>{if(u.preventDefault(),u.stopPropagation(),o=0,!I.dragging||I.dragging.treeRoot!==e)return;let f=I.dragging.el,l=I.currentTarget,v=I.currentPosition;if(Ge(e),Oe(),!l||!v){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(l===f||Mn(l,f)){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(v==="on"){let h=l.querySelector(':scope > [role="group"]');h||(h=l.nextElementSibling?.matches?.('[role="group"]')?l.nextElementSibling:null),h?h.setAttribute("aria-hidden","false"):(h=document.createElement("ul"),h.setAttribute("role","group"),h.setAttribute("subtree",""),h.classList.add("nojs-subtree","nojs-tree"),h.setAttribute("aria-hidden","false"),l.appendChild(h));let g=M.branches.get(l);g&&(g.expanded=!0,g.subtreeEl=h,l.setAttribute("aria-expanded","true")),h.appendChild(f),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:f,newParent:l}}))}else{let h=l.parentElement;if(!h){I.dragging=null,I.currentTarget=null,I.currentPosition=null;return}if(v==="before")h.insertBefore(f,l);else{let y=l.nextElementSibling,x=y?.matches?.('[role="group"]')?y.nextElementSibling:y;x?h.insertBefore(f,x):h.appendChild(f)}let g=is(f);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:f,newIndex:g}}))}I.dragging=null,I.currentTarget=null,I.currentPosition=null},m=u=>{let f=Nt(u.target),l=I.dragging?.el||(f?.classList.contains("nojs-dragging")?f:null);f&&f.classList.remove("nojs-dragging"),Ge(e),Oe(),o=0,l&&l.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:l}})),I.dragging=null,I.currentTarget=null,I.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",a),e.addEventListener("dragenter",s),e.addEventListener("dragleave",c),e.addEventListener("drop",d),e.addEventListener("dragend",m),n.dispose(()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",a),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",c),e.removeEventListener("drop",d),e.removeEventListener("dragend",m),Ge(e),Oe()}),ls(e);let p=new MutationObserver(u=>{for(let f of u){if(f.type==="attributes"){f.target.getAttribute("role")==="treeitem"&&dt(f.target);continue}for(let l of f.addedNodes){if(l.nodeType!==1)continue;l.getAttribute("role")==="treeitem"&&dt(l);let v=l.querySelectorAll?.('[role="treeitem"]');if(v)for(let h of v)dt(h)}}});p.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["role"]}),n.dispose(()=>p.disconnect())}}))}function dt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function ls(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)dt(r)}function Pn(t,e={}){Hn(t),On(t),$n(t),Rn(t)}function Fn(){Sn()}var ut=new Map;function zn(){ut.clear()}function ft(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function ds(t){let e=t.getAttribute("data-nj-form-state");if(!e)return null;try{let r=JSON.parse(e);return r&&typeof r=="object"?!!r.valid:null}catch{return null}}function qn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;if(typeof e!="function"){let i=ds(r);return i===null?!0:i}let o=e(r)?.$form;return o?!!o.valid:!0}function Vn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Un(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function us(t,e){for(let n=e;n;n=n.parentElement)if(n.__ctx)return t.findContext(e);let r=t.createContext({},null);return e.__ctx=r,Jt(e),r}function Gn(t){t.directive("stepper",T(t,"stepper",{priority:14,subtree:!0,init(e,r,n){ft();let o=Array.from(e.querySelectorAll("[step]"));if(!o.length){console.warn("[stepper] No [step] children found.");return}let i=n.host?null:us(t,e),a=n.host&&e.__nojsStepperCurrent>=0?e.__nojsStepperCurrent:r&&parseInt(r,10)||0,s=e.getAttribute("stepper-mode")||"linear",c=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",m=e.getAttribute("aria-label")||"Stepper",p=Math.max(0,Math.min(a,o.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",m),e.classList.add("nojs-stepper");let u=null,f=[];if(c){u=document.createElement("div"),u.className="nojs-stepper-indicator",u.setAttribute("role","tablist"),u.setAttribute("aria-label","Progress"),o.forEach((L,E)=>{if(E>0){let q=document.createElement("div");q.className="nojs-stepper-separator",q.setAttribute("aria-hidden","true"),u.appendChild(q)}let A=document.createElement("button");A.type="button",A.className="nojs-stepper-indicator-item",A.setAttribute("role","tab"),A.setAttribute("aria-selected",E===p?"true":"false");let S=L.getAttribute("step-label")||`Step ${E+1}`,O=document.createElement("span");O.textContent=S,A.appendChild(O),A.setAttribute("aria-label",S);let te=`nojs-stepper-tab-${fs++}`;if(A.id=te,s==="free"){A.setAttribute("data-clickable","");let q=()=>_(E);A.addEventListener("click",q),n.dispose(()=>A.removeEventListener("click",q))}else A.setAttribute("tabindex","-1");u.appendChild(A),f.push(A)});let C=L=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(L.key))return;L.preventDefault();let E=p;L.key==="ArrowRight"?E=Math.min(p+1,o.length-1):L.key==="ArrowLeft"?E=Math.max(p-1,0):L.key==="Home"?E=0:L.key==="End"&&(E=o.length-1),s==="free"?(_(E),f[E]?.focus()):f[p]?.focus()};u.addEventListener("keydown",C),n.dispose(()=>u.removeEventListener("keydown",C)),e.insertBefore(u,e.firstChild)}let l=null,v=null,h=null;if(d){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let C=()=>b();v.addEventListener("click",C),n.dispose(()=>v.removeEventListener("click",C)),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-next",h.textContent="Next";let L=()=>x();h.addEventListener("click",L),n.dispose(()=>h.removeEventListener("click",L)),l.appendChild(v),l.appendChild(h),e.appendChild(l)}function g(C){let L=o[C];if(!L)return!0;if(!qn(L,n.host?void 0:t.findContext)){let S=L.querySelector("form[validate]");return S&&(Vn(S),f[C]&&f[C].classList.add("nojs-step-invalid"),Un(e,L,S)),!1}f[C]&&f[C].classList.remove("nojs-step-invalid");let E=L.querySelectorAll("[required]");for(let S of E)if(typeof S.checkValidity=="function"&&!S.checkValidity())return S.reportValidity(),!1;let A=L.getAttribute("step-validate");if(A)try{if(!(n.host?n.host.value(L,"step-validate"):t.evaluate(A,i)))return!1}catch(S){return console.warn(`[stepper] step-validate error: ${S.message}`),!1}return!0}function y(C){if(o.forEach((L,E)=>{let A=E===p;L.setAttribute("aria-hidden",A?"false":"true"),A?(L.removeAttribute("inert"),L.setAttribute("aria-current","step")):(L.setAttribute("inert",""),L.removeAttribute("aria-current"))}),f.length&&f.forEach((L,E)=>{L.setAttribute("aria-selected",E===p?"true":"false"),E<p?L.setAttribute("data-completed",""):L.removeAttribute("data-completed"),L.setAttribute("tabindex",E===p?"0":"-1");let A=o[E];A.id&&(L.setAttribute("aria-controls",A.id),A.setAttribute("aria-labelledby",L.id))}),v&&(v.disabled=p===0),h&&(h.textContent=p===o.length-1?"Finish":"Next"),!C){let L=o[p];L&&requestAnimationFrame(()=>L.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!C,detail:{current:p,total:o.length}}))}function x(){return p>=o.length-1?(s==="linear"&&!g(p)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:p,total:o.length}})),!1):s==="linear"&&!g(p)?!1:(p++,y(),j(),!0)}function b(){return p<=0?!1:(p--,y(),j(),!0)}function _(C){if(C<0||C>=o.length||C===p)return!1;if(s==="linear"&&C>p){for(let L=p;L<C;L++)if(p=L,y(),!g(L))return j(),!1}return p=C,y(),j(),!0}let k={get current(){return p},get total(){return o.length},next:x,prev:b,goTo:_,get isFirst(){return p===0},get isLast(){return p===o.length-1}};function j(){n.host?e.__nojsStepperCurrent=p:i.$stepper=k}j(),ut.set(e,{get current(){return p},steps:o,mode:s,indicatorEl:u,navEl:l}),y(!0),n.dispose(()=>{ut.delete(e),u&&u.parentNode&&u.remove(),l&&l.parentNode&&l.remove(),i&&delete i.$stepper})}}))}var fs=0;var ps=0;function Wn(t){t.directive("step",T(t,"step",{priority:13,init(e,r,n){ft(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${ps++}`),e.setAttribute("tabindex","0")}}))}function Yn(t,e={}){Wn(t),Gn(t)}function Nn(){zn()}function Kn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Xn(t){t.directive("skeleton",T(t,"skeleton",{priority:10,subtree:!0,init(e,r,n){Kn();let o=n.host?null:t.findContext(e),i=e.getAttribute("skeleton-type")||"text",a=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),c=[];function d(h){m();for(let g=0;g<h;g++){let y=document.createElement("div");y.className="nojs-skeleton-line",e.appendChild(y),c.push(y)}}function m(){for(let h of c)h.parentNode===e&&e.removeChild(h);c=[]}function p(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let h=s+(String(s).match(/\d$/)?"px":"");e.style.width=h,e.style.height=h}if(a){let h=parseInt(a,10);h>0&&d(h)}e.setAttribute("aria-busy","true")}let u=null;function f(){u&&u(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let h=!1,g=null,y=()=>{h||(h=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",y),g!==null&&clearTimeout(g),u=null)};e.addEventListener("transitionend",y),g=setTimeout(y,0),u=()=>{e.removeEventListener("transitionend",y),g!==null&&clearTimeout(g),h=!0,u=null}}let l=!1;function v(){let h=n.host?!!n.host.value(e,"skeleton"):!!t.evaluate(r,o);h&&!l?(l=!0,p()):!h&&l&&(l=!1,f())}if(v(),!n.host){let h=o.$watch(v);n.dispose(h)}n.dispose(()=>{u&&u(),l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}}))}function Zn(t,e={}){Xn(t)}var _e=new Map,W=new Map,D={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Qn(){_e.clear(),W.clear(),D.active=!1,D.splitEl=null,D.gutterEl=null,D.prevPane=null,D.nextPane=null,D.direction=null,D.startPos=0,D.startPrevSize=0,D.startNextSize=0,D.containerSize=0}function pt(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Jn(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,n=r&&(e==="horizontal"?r.width:r.height);return n||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function eo(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function ms(t,e){let n=(_e.get(t)?.gutters||[]).reduce((o,i)=>o+Z(i,e),0);return Z(t,e)-n}function gs(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function We(t,e){let r=W.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function mt(t,e,r,n){let o=Z(e,n),i=Z(r,n),a=W.get(e),s=W.get(r);t.setAttribute("aria-valuenow",Math.round(o)),t.setAttribute("aria-valuemin",a?.min||0),t.setAttribute("aria-valuemax",Math.round(o+i-(s?.min||0)))}function Kt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=_e.get(t);if(!r)return;let n=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(n))}catch{}}function bs(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let n=JSON.parse(r),o=_e.get(t);return!o||n.length!==o.panes.length?!1:(n.forEach((i,a)=>{i&&(o.panes[a].style.flexBasis=i,o.panes[a].style.flexGrow="0")}),!0)}catch{return!1}}function hs(t,e,r,n,o){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),o!==6&&i.style.setProperty("--nojs-gutter-size",`${o}px`);let a=f=>{if(f.button!==0)return;f.preventDefault();let l=ms(t,e);D.active=!0,D.splitEl=t,D.gutterEl=i,D.prevPane=r,D.nextPane=n,D.direction=e,D.startPos=f[Jn(e)],D.startPrevSize=Z(r,e),D.startNextSize=Z(n,e),D.containerSize=l,D.sign=eo(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(f.pointerId)},s=f=>{if(!D.active||D.gutterEl!==i)return;let l=(f[Jn(D.direction)]-D.startPos)*(D.sign||1),v=We(D.startPrevSize+l,D.prevPane),h=We(D.startNextSize-l,D.nextPane),g=D.startPrevSize+D.startNextSize;v+h!==g&&(v!==D.startPrevSize+l?h=g-v:v=g-h),D.prevPane.style.flexBasis=`${v}px`,D.prevPane.style.flexGrow="0",D.nextPane.style.flexBasis=`${h}px`,D.nextPane.style.flexGrow="0",mt(i,D.prevPane,D.nextPane,D.direction)},c=()=>{!D.active||D.gutterEl!==i||(D.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Kt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:n}})))};i.addEventListener("pointerdown",a),i.addEventListener("pointermove",s),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c);let d=10,m=f=>{let l=e==="horizontal",v=eo(t,e),h=0;if(l&&f.key==="ArrowRight"||!l&&f.key==="ArrowDown")h=d*v;else if(l&&f.key==="ArrowLeft"||!l&&f.key==="ArrowUp")h=-d*v;else if(f.key==="Home")h=(W.get(r)?.min||0)-Z(r,e);else if(f.key==="End"){let k=W.get(n);h=Z(r,e)+Z(n,e)-(k?.min||0)-Z(r,e)}else return;f.preventDefault();let g=Z(r,e),y=Z(n,e),x=g+y,b=We(g+h,r),_=We(x-b,n);b=x-_,b=We(b,r),_=x-b,r.style.flexBasis=`${b}px`,r.style.flexGrow="0",n.style.flexBasis=`${_}px`,n.style.flexGrow="0",mt(i,r,n,e),Kt(t)};i.addEventListener("keydown",m);let p=()=>{let f=W.get(r),l=W.get(n),v=f?.collapsible?r:l?.collapsible?n:null;if(!v)return;let h=W.get(v);if(!h)return;let g=v===r?n:r,y=Z(r,e)+Z(n,e);if(h.collapsed){h.collapsed=!1,v.removeAttribute("data-collapsed");let x=h.preCollapseSize||`${Math.round(y/2)}px`,b=gs(x,y)??y/2,_=Math.min(b,y);v.style.flexBasis=`${_}px`,v.style.flexGrow="0",g.style.flexBasis=`${y-_}px`,g.style.flexGrow="0"}else h.preCollapseSize=v.style.flexBasis||`${Z(v,e)}px`,h.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",g.style.flexBasis=`${y}px`,g.style.flexGrow="0";mt(i,r,n,e),Kt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:h.collapsed}}))};return i.addEventListener("dblclick",p),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",a),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),i.removeEventListener("keydown",m),i.removeEventListener("dblclick",p)}}}function to(t){t.directive("split",T(t,"split",{priority:14,subtree:!0,init(e,r,n){pt();let o=(r||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",o);let a=Array.from(e.children).filter(m=>m.hasAttribute("pane"));if(a.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${a.length}.`);return}a.forEach(m=>{W.get(m)||W.set(m,{size:m.getAttribute("pane")||null,min:parseInt(m.getAttribute("pane-min"),10)||0,max:parseInt(m.getAttribute("pane-max"),10)||1/0,collapsible:m.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],c=[];for(let m=0;m<a.length-1;m++){let{gutter:p,cleanup:u}=hs(e,o,a[m],a[m+1],i);a[m].after(p),s.push(p),c.push(u)}_e.set(e,{direction:o,gutterSize:i,panes:a,gutters:s}),bs(e)||a.forEach(m=>{let u=W.get(m)?.size;u?(m.style.flexBasis=u,m.style.flexGrow="0"):(m.style.flexGrow="1",m.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((m,p)=>{mt(m,a[p],a[p+1],o)})}),n.dispose(()=>{c.forEach(m=>m()),s.forEach(m=>m.remove()),_e.delete(e),a.forEach(m=>W.delete(m)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}}))}function ro(t){t.directive("pane",T(t,"pane",{priority:15,init(e,r,n){pt(),e.classList.add("nojs-pane"),W.has(e)||W.set(e,{size:r||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=W.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";o.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${o.max}px`),n.dispose(()=>{e.classList.remove("nojs-pane"),W.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}}))}function no(t,e={}){to(t),ro(t)}function oo(){Qn()}var ue={sorts:new Map};function io(){ue.sorts.clear()}function je(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function vs(t,e){let r=t.querySelector("tbody");if(!r)return null;let n=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!n)return null;let o=n.getAttribute("each")||n.getAttribute("foreach")||n.getAttribute("for");if(!o)return null;let i=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function ys(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function so(t,e,r){let n=e.split("."),o=t;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function ao(t,e){let r=Number.isNaN(t),n=Number.isNaN(e);return r&&n?0:r?1:n||t<e?-1:t>e?1:0}function lo(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return ao(Number(t),Number(e));case"date":return ao(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function xs(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function uo(t){t.directive("sortable",T(t,"sortable",{priority:10,subtree:!0,init(e,r,n){je(),e.classList.add("nojs-sortable"),n.host&&Es(e)}}))}function fo(t){t.directive("sort",T(t,"sort",{priority:11,init(e,r,n){je();let o=r;if(!o)return;let i=e.getAttribute("sort-type")||"string",a=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let s=e.closest("table");if(!s)return;ue.sorts.has(s)||ue.sorts.set(s,{column:null,direction:null}),(a==="asc"||a==="desc")&&(ue.sorts.get(s).column||co(e,s,o,i,a,n.host?null:t));let c=()=>{let m=ue.sorts.get(s),p;m.column!==o?p="asc":m.direction==="asc"?p="desc":m.direction==="desc"?p=null:p="asc",co(e,s,o,i,p,n.host?null:t)},d=m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),c())};e.addEventListener("click",c),e.addEventListener("keydown",d),n.dispose(()=>{e.removeEventListener("click",c),e.removeEventListener("keydown",d),s&&!s.isConnected&&(ue.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}}))}function co(t,e,r,n,o,i){let a=ue.sorts.get(e);xs(e),o?(t.setAttribute("data-sort-dir",o),t.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),a.column=r,a.direction=o):(a.column=null,a.direction=null);let s=i?vs(e,i):null;if(s){let c=i.findContext(e),d=c?ys(c,s.arrayPath):null;if(Array.isArray(d)){if(!o){let p=e._nojsOriginalOrder;if(p){let u=new Set(d),f=p.filter(l=>u.has(l));for(let l of d)p.includes(l)||f.push(l);so(c,s.arrayPath,f)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let m=[...d].sort((p,u)=>{let f=p!=null?p[r]:null,l=u!=null?u[r]:null,v=lo(f,l,n);return o==="desc"?-v:v});so(c,s.arrayPath,m);return}}po(e,t,r,n,o)}function Es(t){let e=ue.sorts.get(t);if(!e||!e.column||!e.direction)return;let r=Array.from(t.querySelectorAll("th[sort]")).find(n=>n.getAttribute("sort")===e.column);r&&(delete t._nojsOriginalRows,po(t,r,e.column,r.getAttribute("sort-type")||"string",e.direction))}function po(t,e,r,n,o){let i=t.querySelector("tbody");if(!i)return;let c=[...e.closest("tr").children].indexOf(e);if(c<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!o){let u=document.createDocumentFragment();for(let f of t._nojsOriginalRows)u.appendChild(f);i.appendChild(u);return}let m=u=>{let f=u.replace(/[^0-9.\-]/g,"");return f===""||f==="-"?NaN:parseFloat(f)};d.sort((u,f)=>{let l=u.children[c]?.textContent?.trim()||"",v=f.children[c]?.textContent?.trim()||"",h=lo(n==="number"?m(l):l,n==="number"?m(v):v,n);return o==="desc"?-h:h});let p=document.createDocumentFragment();for(let u of d)p.appendChild(u);i.appendChild(p)}function mo(t){t.directive("fixed-header",T(t,"fixed-header",{priority:10,init(e,r,n){je(),e.classList.add("nojs-fixed-header")}}))}function go(t){t.directive("fixed-col",T(t,"fixed-col",{priority:10,init(e,r,n){je(),e.classList.add("nojs-fixed-col")}}))}function bo(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let n=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!n)return null;let o=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return o?{iteratorVar:o[1],arrayPath:o[2].trim(),eachEl:r}:null}function ho(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function vo(t,e,r){let n=e.split("."),o=t;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function yo(t){t.directive("table-reorder",T(t,"table-reorder",{priority:15,subtree:!0,init(e,r,n){if(je(),e.tagName!=="TABLE")return;let o=e.querySelector("tbody");if(!o)return;let i=n.host?null:t.findContext(e),a=e.getAttribute("table-reorder-handle"),s=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",d=null,m=null,p=null;function u(){let y=o.querySelectorAll(":scope > tr");for(let x=0;x<y.length;x++){let b=y[x];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-roledescription","draggable row");let _=!0;if(a){let A=S=>{_=!!S.target.closest(a)};b.addEventListener("mousedown",A),n.disposeOn(b,()=>b.removeEventListener("mousedown",A))}let k=A=>{if(a&&!_){A.preventDefault();return}d=[...o.querySelectorAll(":scope > tr")].indexOf(b),m=b,A.dataTransfer&&(A.dataTransfer.effectAllowed="move",A.dataTransfer.setData("text/plain","")),s.split(/\s+/).filter(Boolean).forEach(O=>b.classList.add(O))},j=A=>{if(m==null)return;A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),O=S.top+S.height/2,q=[...o.querySelectorAll(":scope > tr")].indexOf(b);f(),q!==d&&(A.clientY<O?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),p=b)},C=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),p===b&&(p=null)},L=A=>{if(A.preventDefault(),A.stopPropagation(),m==null||d==null)return;let S=[...o.querySelectorAll(":scope > tr")],O=b.getBoundingClientRect(),te=O.top+O.height/2,q=S.indexOf(b);A.clientY>=te&&q++;let ae=d;if(ae===q||ae+1===q){l();return}let B=ae<q?q-1:q,z=bo(e);if(z&&i){let P=ho(i,z.arrayPath);if(Array.isArray(P)){let H=[...P],[R]=H.splice(ae,1);H.splice(B,0,R),vo(i,z.arrayPath,H),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...H]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:ae,to:B,item:R}}))}}else{let P=m,H=S[B];P&&H&&(ae<B?o.insertBefore(P,H.nextSibling):o.insertBefore(P,H),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:ae,to:B,item:null}})))}l()},E=()=>{l()};b.addEventListener("dragstart",k),b.addEventListener("dragover",j),b.addEventListener("dragenter",j),b.addEventListener("dragleave",C),b.addEventListener("drop",L),b.addEventListener("dragend",E),n.disposeOn(b,()=>{b.removeEventListener("dragstart",k),b.removeEventListener("dragover",j),b.removeEventListener("dragenter",j),b.removeEventListener("dragleave",C),b.removeEventListener("drop",L),b.removeEventListener("dragend",E),b._nojsReorderSetup=!1})}}function f(){p&&(p.classList.remove("nojs-reorder-insert-before"),p.classList.remove("nojs-reorder-insert-after"),p=null)}function l(){m&&s.split(/\s+/).filter(Boolean).forEach(x=>m.classList.remove(x)),f(),d=null,m=null;let y=o.querySelectorAll(":scope > tr");for(let x of y)x.classList.remove("nojs-reorder-insert-before"),x.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(b=>x.classList.remove(b))}let v=y=>{m!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},h=y=>{if(m==null||y.target!==o)return;y.preventDefault(),y.stopPropagation();let x=d,_=[...o.querySelectorAll(":scope > tr")].length-1;if(x===_){l();return}let k=bo(e);if(k&&i){let j=ho(i,k.arrayPath);if(Array.isArray(j)){let C=[...j],[L]=C.splice(x,1);C.push(L),vo(i,k.arrayPath,C),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...C]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:x,to:C.length-1,item:L}}))}}l()};o.addEventListener("dragover",v),o.addEventListener("dragenter",v),o.addEventListener("drop",h);let g=new MutationObserver(()=>{u()});g.observe(o,{childList:!0}),u(),n.dispose(()=>{g.disconnect(),o.removeEventListener("dragover",v),o.removeEventListener("dragenter",v),o.removeEventListener("drop",h),l()})}}))}function xo(t,e={}){uo(t),fo(t),mo(t),go(t),yo(t)}function Eo(){io()}var he={containers:new Map};function Ao(){for(let[,t]of he.containers)typeof t.unsub=="function"&&t.unsub();he.containers.clear()}function wo(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function As(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function ws(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function _o(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let n=document.createElement("ol");n.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let a=e[i],s=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=a.label,s.appendChild(d)}else{let d=document.createElement("a");d.href=a.href,d.textContent=a.label,s.appendChild(d)}n.appendChild(s)}t.appendChild(n);let o=he.containers.get(t);o&&(o.crumbs=e)}function _s(t){let e=[],r=Array.from(t.children);for(let n of r){if(n.tagName==="OL"&&n.classList.contains("nojs-breadcrumb"))continue;let o=As(n);if(!o)continue;let i=n.getAttribute("href")||"#";e.push({label:o,href:i})}return e}function js(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),n=[{label:"Home",href:"/"}],o="";for(let i=0;i<r.length;i++){o+="/"+r[i];let a=ws(r[i].replace(/[-_]/g," "));n.push({label:a,href:o})}return n}function Ls(){return{get current(){return{path:window.location.pathname}},on(t){return document.addEventListener("nojs:navigate",t),()=>document.removeEventListener("nojs:navigate",t)}}}function jo(t){t.directive("breadcrumb",T(t,"breadcrumb",{priority:15,subtree:!0,init(e,r,n){wo(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let o=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=n.host?Ls():t.router,a=!o&&i;if(he.containers.set(e,{unsub:null,crumbs:[]}),a){let s=()=>{let c=i.current,d=c?c.path:"/",m=js(d);_o(e,m)};if(s(),typeof i.on=="function"){let c=i.on(s),d=he.containers.get(e);d&&(d.unsub=c),n.dispose(()=>{typeof c=="function"&&c();let m=he.containers.get(e);m&&(m.unsub=null)})}}else{let s=_s(e);for(let c of Array.from(e.children))c.tagName==="OL"&&c.classList.contains("nojs-breadcrumb")||(c.style.display="none");_o(e,s)}n.dispose(()=>{he.containers.delete(e)})}}))}function Lo(t,e={}){jo(t)}function ko(){Ao()}var gt={containers:new Map};function Co(){gt.containers.clear()}function So(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}var bt=null;function ks(){return bt!==null||(bt=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),bt}function To(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let n=Array.from(t.children),o=!1;for(let i of n){if(i===e){o=!0;continue}o&&r.appendChild(i)}return t.appendChild(r),r}function Cs(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let n=()=>{e.style.height="",e.removeEventListener("transitionend",n)};e.addEventListener("transitionend",n)})}function Io(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let n=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",n)};e.addEventListener("transitionend",n)})}function Do(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");Io(t,r)}else t.open=!1}function ht(t,e,r,n){let o=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:n}});t.dispatchEvent(o)}function $e(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function Bo(t){t.directive("accordion",T(t,"accordion",{priority:10,subtree:!0,init(e,r,n){So();let o=(r||"").trim().toLowerCase()==="multi"?"multi":"single",i=!ks();e.setAttribute("role","group");let a=$e(e);if(a.length===0)return;if(i)for(let u of a)To(u);let s=[],c=new MutationObserver(u=>{for(let f of u)for(let l of f.addedNodes)l.nodeType!==1||l.tagName!=="DETAILS"||l.parentElement===e&&m(l)});c.observe(e,{childList:!0});let d=0,m=u=>{i&&To(u);let f=u.querySelector(":scope > summary");if(f){let h=`nojs-accordion-panel-${Date.now()}-${d++}`,g=u.querySelector(":scope > .nojs-accordion-content");g?(g.id=g.id||h,g.setAttribute("role","region"),h=g.id):(u.id||(u.id=h),h=u.id),f.setAttribute("aria-expanded",u.open?"true":"false"),f.setAttribute("aria-controls",h)}let l=h=>{let g=$e(e),y=g.indexOf(u),x=u.querySelector(":scope > summary");if(x&&x.setAttribute("aria-expanded",u.open?"true":"false"),u.open){if(o==="single")for(let b of g)b!==u&&b.open&&Do(b,i);ht(e,u,!0,y)}else ht(e,u,!1,y)},v=null;if(i){let h=u.querySelector(":scope > summary");h&&(v=g=>{g.preventDefault();let y=u.querySelector(":scope > .nojs-accordion-content");if(u.open)Io(u,y),h.setAttribute("aria-expanded","false"),ht(e,u,!1,$e(e).indexOf(u));else{if(o==="single"){let x=$e(e);for(let b of x)if(b!==u&&b.open){Do(b,!0);let _=b.querySelector(":scope > summary");_&&_.setAttribute("aria-expanded","false")}}Cs(u,y),h.setAttribute("aria-expanded","true"),ht(e,u,!0,$e(e).indexOf(u))}},h.addEventListener("click",v))}u.addEventListener("toggle",l),s.push({details:u,toggleHandler:l,clickHandler:v})};for(let u of a)m(u);let p=u=>{let f=u.target;if(f.tagName!=="SUMMARY")return;let l=f.parentElement;if(!l||l.parentElement!==e)return;let h=$e(e).map(x=>x.querySelector(":scope > summary")).filter(Boolean),g=h.indexOf(f);if(g===-1)return;let y=-1;switch(u.key){case"ArrowDown":case"ArrowRight":y=(g+1)%h.length;break;case"ArrowUp":case"ArrowLeft":y=(g-1+h.length)%h.length;break;case"Home":y=0;break;case"End":y=h.length-1;break;default:return}y!==-1&&y!==g&&(u.preventDefault(),h[y].focus())};e.addEventListener("keydown",p),gt.containers.set(e,{mode:o,listeners:s,observer:c}),n.dispose(()=>{e.removeEventListener("keydown",p),c.disconnect();for(let u of s)if(u.details.removeEventListener("toggle",u.toggleHandler),u.clickHandler){let f=u.details.querySelector(":scope > summary");f&&f.removeEventListener("click",u.clickHandler)}s.length=0,gt.containers.delete(e)})}}))}function Ho(t,e={}){Bo(t)}function Oo(){Co()}var Me=new Map;function $o(){let t=Array.from(Me.keys());for(let e of t){let r=Me.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[n,o]of r.renderedNodes){if(o.__disposers){for(let i of o.__disposers)try{i()}catch{}o.__disposers=null}o.parentNode&&o.remove()}r.renderedNodes.clear()}r.disposed=!0}}Me.clear()}function Mo(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function Ss(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let n=Ts(e.getAttribute(r));if(n)return{eachEl:e,...n}}return null}function Ts(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Ds(t,e){let r=e.split("."),n=t;for(let o of r){if(n==null)return;n=n[o]}return n}function Ro(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let n=document.createElement("td"),o=e==="table"?t:t.closest("table"),i=o?o.querySelector("tr:not(.nojs-virtual-spacer)"):null,a=i?i.children.length:1;n.setAttribute("colspan",String(a)),n.style.padding="0",n.style.border="none",r.appendChild(n)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function vt(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Is(t,e){return t*e}function Fo(t){let e=t.totalItems,r=new Array(e+1),n=t.estimatedHeight||50;r[0]=0;for(let o=1;o<=e;o++)r[o]=r[o-1]+(t.heights[o-1]||n);t.prefixSums=r}function zo(t,e){let r=0,n=t.length-2;for(;r<=n;){let o=r+n>>>1;t[o]<=e?r=o+1:n=o-1}return Math.max(0,n)}function Po(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++)e+=t.heights[n]||r;return e}function yt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,n=t.estimatedHeight||50;for(let o=0;o<e;o++)r+=t.heights[o]||n;return r}function Bs(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return zo(t.prefixSums,e);let r=0,n=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++){let i=t.heights[o]||n;if(r+i>e)return o;r+=i}return Math.max(0,t.totalItems-1)}function Hs(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return zo(t.prefixSums,e+r);let n=e+r,o=0,i=t.estimatedHeight||50;for(let a=0;a<t.totalItems;a++)if(o+=t.heights[a]||i,o>=n)return a;return t.totalItems-1}function Os(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let n,o;return t.itemHeight!=="auto"?(n=Math.floor(e/t.itemHeight),o=Math.ceil((e+r)/t.itemHeight)-1):(n=Bs(t,e),o=Hs(t,e,r)),n=Math.max(0,n-t.buffer),o=Math.min(t.totalItems-1,o+t.buffer),{start:n,end:o}}function xt(t,e){if(t.disposed)return;let r=t.container,n=r,o=n.scrollTop,i=n.clientHeight,{start:a,end:s}=Os(t,o,i);if(a===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=a,t.endIndex=s,t.dirty=!1;let c=yt(t,a),d=t.itemHeight!=="auto"?Is(t.totalItems,t.itemHeight):Po(t),m=s>=0?yt(t,s+1):0,p=Math.max(0,d-m);vt(t.spacerTop,c),vt(t.spacerBottom,p);let u=new Set;for(let l=a;l<=s;l++)u.add(l);for(let[l,v]of t.renderedNodes)u.has(l)||(v.remove(),t.renderedNodes.delete(l));let f=[];for(let l=a;l<=s;l++){if(t.renderedNodes.has(l))continue;let v=t.dataArray[l];if(v===void 0)continue;let h=t.pool?t.pool[l]:t.template.cloneNode(!0),g={};g[t.iteratorVar]=v,g.$index=l,g.$count=t.totalItems,g.$first=l===0,g.$last=l===t.totalItems-1,g.$even=l%2===0,g.$odd=l%2!==0,h.setAttribute("role","option"),h.setAttribute("aria-setsize",String(t.totalItems)),h.setAttribute("aria-posinset",String(l+1)),h.setAttribute("tabindex","-1"),t.pool||(h.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(g)),h.__declared=!1),f.push({index:l,node:h}),t.renderedNodes.set(l,h)}if(f.length>0){f.sort((l,v)=>l.index-v.index);for(let{index:l,node:v}of f){let h=null;for(let[g,y]of t.renderedNodes)g>l&&y.parentNode===r&&(!h||g<$s(h,t))&&(h=y);h||(h=t.spacerBottom),r.insertBefore(v,h);try{!t.pool&&e.processTree&&e.processTree(v)}catch{}}}if(t.itemHeight==="auto"){let l=!1;for(let[v,h]of t.renderedNodes){let g=h.offsetHeight||h.getBoundingClientRect().height;g>0&&t.heights[v]!==g&&(t.heights[v]=g,l=!0)}if(l){Fo(t);let v=Po(t),h=yt(t,a),g=s>=0?yt(t,s+1):0,y=Math.max(0,v-g);vt(t.spacerTop,h),vt(t.spacerBottom,y)}}}function $s(t,e){for(let[r,n]of e.renderedNodes)if(n===t)return r;return 1/0}function Ms(t,e,r){if(t.disposed)return;let n=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&Fo(t);for(let[o,i]of t.renderedNodes){if(i.__disposers){for(let a of i.__disposers)try{a()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=n,xt(t,r)}function qo(t){t.directive("virtual",T(t,"virtual",{priority:10,subtree:!0,init(e,r,n){Mo(),e.setAttribute("data-nojs-virtual",""),e.setAttribute("role","listbox"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let o=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",a=o==="auto"?"auto":parseInt(o,10),s=parseInt(i,10)||5;if(a!=="auto"&&(isNaN(a)||a<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let c=Ss(e),d=null;if(c)d=c.eachEl;else for(let k of e.children)if(!k.classList.contains("nojs-virtual-spacer")){d=k;break}if(!d){console.warn("[virtual] No child template found.");return}let m=d.cloneNode(!0);m.removeAttribute("each"),m.removeAttribute("foreach"),m.removeAttribute("for"),m.__declared=!1,m.__disposers=null,m.__ctx=null,c&&(c.eachEl.removeAttribute("each"),c.eachEl.removeAttribute("foreach"),c.eachEl.removeAttribute("for"));let p=n.host?Array.from(e.children).filter(k=>!k.classList.contains("nojs-virtual-spacer")):null;for(;e.firstChild;)e.removeChild(e.firstChild);let u=Ro(e),f=Ro(e);e.appendChild(u),e.appendChild(f);let l={container:e,itemHeight:a,buffer:s,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:a==="auto"?50:a,startIndex:-1,endIndex:-1,scrollTop:0,template:m,spacerTop:u,spacerBottom:f,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:c?c.iteratorVar:"item",arrayPath:c?c.arrayPath:null,dataArray:p||[],pool:p,dirty:!0,disposed:!1};p&&(l.totalItems=p.length),Me.set(e,l);let v=k=>{let j=[...e.querySelectorAll('[role="option"]')];if(!j.length)return;let C=e.querySelector('[role="option"]:focus'),L=C?j.indexOf(C):-1,E=-1;switch(k.key){case"ArrowDown":k.preventDefault(),E=L<j.length-1?L+1:L;break;case"ArrowUp":k.preventDefault(),E=L>0?L-1:0;break;case"Home":k.preventDefault(),E=0;break;case"End":k.preventDefault(),E=j.length-1;break;default:return}E>=0&&E<j.length&&j[E].focus()};e.addEventListener("keydown",v);let h=null,g=()=>{h||(h=requestAnimationFrame(()=>{h=null,xt(l,t)}))};if(l.scrollHandler=g,e.addEventListener("scroll",g,{passive:!0}),typeof ResizeObserver<"u"){let k=new ResizeObserver(()=>{l.dirty=!0,xt(l,t)});k.observe(e),l.resizeObserver=k}let y=null,x=-1,b=null,_=()=>{if(!l.disposed){if(l.arrayPath){let k=t.findContext?t.findContext(e):null;if(k){let j=Ds(k,l.arrayPath);Array.isArray(j)&&(j!==y||j.length!==x)&&(y=j,x=j.length,Ms(l,j,t))}}b=setTimeout(_,100)}};p?xt(l,t):b=setTimeout(_,100),n.dispose(()=>{l.disposed=!0,h&&(cancelAnimationFrame(h),h=null),b&&(clearTimeout(b),b=null),e.removeEventListener("scroll",g),e.removeEventListener("keydown",v),l.resizeObserver&&(l.resizeObserver.disconnect(),l.resizeObserver=null);for(let[k,j]of l.renderedNodes){if(j.__disposers){for(let C of j.__disposers)try{C()}catch{}j.__disposers=null}j.remove()}l.renderedNodes.clear(),l.spacerTop&&l.spacerTop.parentNode&&l.spacerTop.remove(),l.spacerBottom&&l.spacerBottom.parentNode&&l.spacerBottom.remove(),Me.delete(e)})}}))}function Vo(t,e={}){qo(t)}function Uo(){$o()}var ve=new Map,Et=new Map;function Go(){for(let[t,e]of ve){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let n=r.el&&r.el.__disposers;if(n){for(let o of n)try{o()}catch{}r.el.__disposers=[]}}}ve.clear(),Et.clear()}function Wo(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function Rs(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function Ps(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function Fs(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function zs(){return document.documentElement}function qs(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function Yo(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function Xt(t){let e=ve.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,n=e.threshold,o=new Set,i=`-${r}px 0px 0px 0px`,a=new IntersectionObserver(c=>{for(let p of c)p.isIntersecting?o.add(p.target.id):o.delete(p.target.id);let d=null,m=1/0;for(let p of o){let u=document.getElementById(p);if(!u)continue;let f=u.getBoundingClientRect();f.top<m&&(m=f.top,d=p)}for(let p of e.spyEntries)Yo(p.el);if(d){for(let p of e.spyEntries)if(p.targetId===d){qs(p.el),e.activeEl=p.el;break}}else e.activeEl=null},{rootMargin:i,threshold:n}),s=new Set;for(let c of e.spyEntries){if(s.has(c.targetId))continue;let d=document.getElementById(c.targetId);d&&(a.observe(d),s.add(c.targetId))}e.observer=a}function Vs(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function No(t){t.directive("spy",T(t,"spy",{priority:20,subtree:!0,init(e,r,n){Wo();let o=Rs(e);if(!o){if(e.tagName!=="A"){let m='could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.';n.host?n.host.warn(m):Vs(t,"[spy] "+m)}return}let i=Ps(e),a=Fs(e),s=zs();ve.has(s)||ve.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:a});let c=ve.get(s),d={el:e,targetId:o};c.spyEntries.push(d),Et.set(e,s),Xt(s),!c.mutObserver&&typeof MutationObserver<"u"&&(c.mutObserver=new MutationObserver(()=>{Xt(s)}),c.mutObserver.observe(document.body,{childList:!0,subtree:!0})),n.dispose(()=>{let m=c.spyEntries.indexOf(d);m!==-1&&c.spyEntries.splice(m,1),Et.delete(e),Yo(e),c.spyEntries.length===0?(c.observer&&(c.observer.disconnect(),c.observer=null),c.mutObserver&&(c.mutObserver.disconnect(),c.mutObserver=null),ve.delete(s)):Xt(s)})}}))}function Ko(t,e={}){No(t)}function Xo(){Go()}var Zt="it is a DOM element; client mechanics never send DOM nodes",Zo={drag:{attrs:{drag:{type:"expression",deliver:"sealed"},"drag-disabled":"expression","drag-type":"literal","drag-effect":"literal","drag-handle":"literal","drag-image":"literal","drag-image-offset":"literal","drag-class":"literal","drag-ghost-class":"literal","drag-group":"literal"}},drop:{attrs:{drop:"statement","drop-disabled":"expression","drop-max":"expression","drop-accept":"literal","drop-effect":"literal","drop-class":"literal","drop-reject-class":"literal","drop-sort":"literal","drop-placeholder":"literal","drop-placeholder-class":"literal"},implicit:{$drag:{sealed:!0},$dragType:{schema:{type:"string",maxLength:256}},$dragEffect:{schema:{type:"string",maxLength:32}},$dropIndex:{schema:{type:"integer",minimum:0,maximum:1e6}},$source:{schema:{type:"object",properties:{index:{type:["integer","null"],minimum:0}},required:["index"],additionalProperties:!1},members:{el:Zt},fixed:{list:null}},$target:{schema:{type:"object",properties:{index:{type:"integer",minimum:0}},required:["index"],additionalProperties:!1},members:{el:Zt},fixed:{list:null}},$el:{unavailable:Zt}}}};var Qo={tooltip:{attrs:{"tooltip-disabled":"expression"}},"tab-disabled":{attrs:{"tab-disabled":"expression"}},skeleton:{attrs:{skeleton:"expression"}},step:{attrs:{"step-validate":"expression"}},toast:{attrs:{toast:{type:"expression",literalOn:["button","a","[on:click]"]}}}};var Gs="[validate],[drag],[drop],[drag-list],[drag-multiple]";function Jo(t){if(typeof document>"u")return;let e=document.querySelectorAll(Gs);for(let r of e){if(!r.__declared||r.__nojsElBoundCtx!==void 0&&t.findContext&&r.__nojsElBoundCtx===t.findContext(r))continue;if(r.hasAttribute("validate")&&r.__nojsElBoundCtx===void 0){if(Dr(r))continue;Ys(t,r)}let n=Y(t,"disposeTree");typeof n=="function"?n(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let o=t.findContext?t.findContext(r):null;o&&delete o.$form,t.processTree(r)}}var Ws="[if],[else-if],[else],[switch],[each],[foreach],[for]";function Ys(t,e){if(!e.querySelector(Ws))return;(Y(t,"warn")||console.warn)("[nojs-elements] loaded after core processed this <"+e.tagName.toLowerCase()+" validate>: content of an if/each inside it may be lost. Load the Elements script before DOMContentLoaded, or put `state` on the form or an element above it.")}var Ns=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],Ks=["drag-list","drag-multiple"].filter(t=>!ar.includes(t)),Xs=["modal","dropdown","popover","toast"];function Zs(t){let e=typeof window<"u"?window.NoJS:null;if(!(!e||e===t||!J(e)))for(let r of Xs)t[r]!==void 0&&(e[r]=t[r])}function Qs(t,e){Lt(t,e),Pt(t,e),ei(t,e),Zs(t);for(let r of Ks)t.directive(r,{priority:30,init(n,o){o.warn(`"${r}" is not yet available on NoJS-Server compiled sites (host API migration pending); the element is not initialized.`)}})}function ei(t,e){Gr(t,e),Kr(t,e),on(t,e),fn(t,e),yn(t,e),kn(t,e),Pn(t,e),Yn(t,e),Zn(t,e),no(t,e),xo(t,e),Lo(t,e),Ho(t,e),Vo(t,e),Ko(t,e)}var Js={name:"nojs-elements",contract:{directives:{...Zo,...Qo},validation:{api:1,engine:"./validate-engine.mjs"}},install(t,e={}){if(J(t)){Qs(t,e);return}Lt(t,e),Pt(t,e),ei(t,e),Jo(t)},init(t){if(J(t)||(Jo(t),typeof document>"u"||!document.body))return;let e=Ns.map(n=>`[${n}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let n of r)n.__declared&&!n.__disposers&&!n.__ctx&&(n.__declared=!1);try{t.processTree(document.body)}catch(n){t.internals?.warn?.("nojs-elements init re-process error:",n.message)}},dispose(t){cr(),Rr(),Wr(),Xr(),sn(),pn(),xn(),Cn(),Fn(),Nn(),oo(),Eo(),ko(),Oo(),Uo(),Xo()}},gu=Js;export{gu as default};
//# sourceMappingURL=nojs-elements.js.map
