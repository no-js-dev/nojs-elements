/**
 * NoJS Elements v1.13.3 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
(()=>{var E={dragging:null,selected:new Map,placeholder:null},Pe=new Map;function ht(){E.dragging=null,E.selected.clear(),E.placeholder&&(E.placeholder.remove(),E.placeholder=null),Pe.clear()}function Fe(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function qe(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $e(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=$e(r):e++}return e}function Re(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,c=s.top+s.height/2;if(r<c&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function vt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",E.dragging&&E.dragging.sourceEl){let s=(E.dragging.sourceEl.firstElementChild||E.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let d=document.getElementById(r.startsWith("#")?r.slice(1):r);d&&d.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(d.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(d=>!d.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),E.placeholder=n}function re(){E.placeholder&&(E.placeholder.remove(),E.placeholder=null)}function ue(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function xn(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,d=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let f=a-1;f>=0;f--){let l=document.createElement("div"),m=f*4;if(l.style.cssText="position:absolute;top:"+m+"px;left:"+m+"px;width:"+i+"px;height:"+d+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",f===0){let p=o.cloneNode(!0);for(;p.firstChild;)l.appendChild(p.firstChild);l.style.background=s.backgroundColor||"#fff",l.style.border=s.border,l.style.padding=s.padding,l.style.fontSize=s.fontSize,l.style.color=s.color,l.style.fontFamily=s.fontFamily}else l.style.background=s.backgroundColor||"#fff",l.style.border=s.border||"1px solid #ddd";r.appendChild(l)}let c=document.createElement("div");return c.textContent=e,c.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(c),r.style.width=i+(a-1)*4+"px",r.style.height=d+(a-1)*4+"px",r}function yt(t){qe(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",d=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),a=e.getAttribute("drag-image"),c=e.getAttribute("drag-image-offset")||"0,0",f=e.getAttribute("drag-disabled"),l=e.getAttribute("drag-class")||"nojs-dragging",m=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let p=!0;if(s){let u=b=>{p=!!b.target.closest(s)};e.addEventListener("mousedown",u),ae(e,()=>e.removeEventListener("mousedown",u))}let g=u=>{if(s&&!p){u.preventDefault();return}if(f&&t.evaluate(f,n)){u.preventDefault();return}let b=t.evaluate(o,n),A=e.getAttribute("drag-group"),h=b;if(A&&E.selected.has(A)){let x=E.selected.get(A);x.size>0&&[...x].some(k=>k.el===e)&&(h=[...x].map(k=>k.item))}if(E.dragging={item:h,type:i,effect:d,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},u.dataTransfer){if(u.dataTransfer.effectAllowed=d,u.dataTransfer.setData("text/plain",""),Array.isArray(h)&&h.length>1&&u.dataTransfer.setDragImage){let x=xn(e,h.length);document.body.appendChild(x);let _=e.getBoundingClientRect();u.dataTransfer.setDragImage(x,_.width/2,_.height/2),requestAnimationFrame(()=>x.remove())}else if(a&&u.dataTransfer.setDragImage)if(a==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[_,k]=c.split(",").map(Number);u.dataTransfer.setDragImage(x,_||0,k||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(a);if(x){let[_,k]=c.split(",").map(Number);m&&x.classList.add(m),u.dataTransfer.setDragImage(x,_||0,k||0)}}}if(l.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(h)&&A&&E.selected.has(A))for(let x of E.selected.get(A))x.el!==e&&l.split(/\s+/).filter(Boolean).forEach(_=>x.el.classList.add(_));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:h,index:E.dragging.sourceIndex,el:e}}))},v=()=>{l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let u=e.getAttribute("drag-group");if(u&&E.selected.has(u))for(let b of E.selected.get(u))l.split(/\s+/).filter(Boolean).forEach(A=>b.el.classList.remove(A));if(e.setAttribute("aria-grabbed","false"),m&&a&&a!=="none"){let b=e.querySelector(a);b&&b.classList.remove(m)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:E.dragging?.item,index:E.dragging?.sourceIndex,dropped:E.dragging===null}})),E.dragging=null,re()};if(e.addEventListener("dragstart",g),e.addEventListener("dragend",v),ae(e,()=>{e.removeEventListener("dragstart",g),e.removeEventListener("dragend",v)}),f){let u=function(){let A=!!t.evaluate(f,n);e.draggable=!A,A?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},b=n.$watch(u);ae(e,b)}let y=u=>{if(E.dragging&&!E.dragging.sourceEl.isConnected&&(E.dragging=null),u.key===" "&&!E.dragging){u.preventDefault();let b=t.evaluate(o,n);E.dragging={item:b,type:i,effect:d,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},l.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else u.key==="Escape"&&E.dragging&&E.dragging.sourceEl===e&&(u.preventDefault(),l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),e.setAttribute("aria-grabbed","false"),E.dragging=null,re())};e.addEventListener("keydown",y),ae(e,()=>e.removeEventListener("keydown",y))}})}function xt(t){qe(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",d=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",a=e.getAttribute("drop-reject-class")||"nojs-drop-reject",c=e.getAttribute("drop-disabled"),f=e.getAttribute("drop-max"),l=e.getAttribute("drop-sort"),m=e.getAttribute("drop-placeholder"),p=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",d);let g=0,v=h=>{if(!E.dragging||c&&t.evaluate(c,n))return;let x=ue(E.dragging.type,i),_=!0;if(f){let k=t.evaluate(f,n),j=$e(e);typeof k=="number"&&j>=k&&(_=!1)}if(!x||!_){a.split(/\s+/).filter(Boolean).forEach(k=>e.classList.add(k)),s.split(/\s+/).filter(Boolean).forEach(k=>e.classList.remove(k)),re();return}if(a.split(/\s+/).filter(Boolean).forEach(k=>e.classList.remove(k)),h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect=d),l){let k=Re(e,h.clientX,h.clientY,l);m&&vt(e,k,m,p),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:E.dragging.item,index:k}}))}},y=h=>{if(E.dragging&&!(c&&t.evaluate(c,n))&&(g++,g===1)){let x=ue(E.dragging.type,i),_=!0;if(f){let k=t.evaluate(f,n),j=$e(e);typeof k=="number"&&j>=k&&(_=!1)}x&&_?(s.split(/\s+/).filter(Boolean).forEach(k=>e.classList.add(k)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):a.split(/\s+/).filter(Boolean).forEach(k=>e.classList.add(k))}},u=h=>{E.dragging&&(g--,g<=0&&(g=0,s.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),a.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging.item}}))))},b=h=>{if(h.preventDefault(),h.stopPropagation(),g=0,!E.dragging||c&&t.evaluate(c,n)||!ue(E.dragging.type,i))return;if(f){let w=t.evaluate(f,n),B=$e(e);if(typeof w=="number"&&B>=w)return}let x=E.dragging.item,_=E.dragging.type,k=E.dragging.effect,j=0;l&&(j=Re(e,h.clientX,h.clientY,l)),s.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),a.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),re();let L={$drag:x,$dragType:_,$dragEffect:k,$dropIndex:j,$source:{list:E.dragging.sourceList,index:E.dragging.sourceIndex,el:E.dragging.sourceEl},$target:{list:null,index:j,el:e},$el:e},S=X(t,"execStatement");typeof S=="function"?S(o,n,L):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),E.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:x,index:j,source:L.$source,target:L.$target,effect:k}}))},A=h=>{E.dragging&&(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b(h))};e.addEventListener("dragover",v),e.addEventListener("dragenter",y),e.addEventListener("dragleave",u),e.addEventListener("drop",b),e.addEventListener("keydown",A),ae(e,()=>{e.removeEventListener("dragover",v),e.removeEventListener("dragenter",y),e.removeEventListener("dragleave",u),e.removeEventListener("drop",b),e.removeEventListener("keydown",A)})}})}function Et(t){qe(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("template"),d=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",c=e.getAttribute("drag-type")||"__draglist_"+o,f=e.getAttribute("drop-accept")||c,l=e.hasAttribute("drag-list-copy"),m=e.hasAttribute("drag-list-remove"),p=e.getAttribute("drag-disabled"),g=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),y=e.getAttribute("drop-placeholder"),u=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",A=e.getAttribute("drop-class")||"nojs-drag-over",h=e.getAttribute("drop-reject-class")||"nojs-drop-reject",x=e.getAttribute("drop-settle-class")||"nojs-drop-settle",_=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",l?"copy":"move");let k={listPath:o,ctx:n,el:e};Pe.set(e,k),ae(e,()=>Pe.delete(e));let j=0,L=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===L&&T.length>0&&e.children.length>0){for(let O of e.children)O.__ctx&&O.__ctx.$notify&&O.__ctx.$notify();return}L=T;let F=i?document.getElementById(i):null;if(!F)return;let q=X(t,"disposeChildren");typeof q=="function"&&q(e),e.innerHTML="";let P=T.length;T.forEach((O,z)=>{let ee={[s]:O,$index:z,$count:P,$first:z===0,$last:z===P-1,$even:z%2===0,$odd:z%2!==0},U=t.createContext(ee,n),Q=F.content.cloneNode(!0),$=document.createElement("div");$.style.display="contents",$.__ctx=U,$.appendChild(Q),e.appendChild($);let Y=$.firstElementChild||$;Y.draggable=!0,Y.setAttribute("role","option"),Y.setAttribute("aria-grabbed","false"),Y.getAttribute("tabindex")||Y.setAttribute("tabindex","0");let Be=V=>{if(p&&t.evaluate(p,n)){V.preventDefault();return}E.dragging={item:O,type:c,effect:l?"copy":"move",sourceEl:$,sourceCtx:U,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:d,copyMode:l,removeMode:m}},V.dataTransfer&&(V.dataTransfer.effectAllowed=l?"copy":"move",V.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:O,index:z,el:Y}}))},mt=()=>{b.split(/\s+/).filter(Boolean).forEach(V=>Y.classList.remove(V)),Y.setAttribute("aria-grabbed","false"),E.dragging&&E.dragging.sourceEl===$&&(E.dragging=null),re()};$.addEventListener("dragstart",Be),$.addEventListener("dragend",mt);let bt=V=>{if(V.key===" "&&!E.dragging)V.preventDefault(),V.stopPropagation(),E.dragging={item:O,type:c,effect:l?"copy":"move",sourceEl:$,sourceCtx:U,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:d,copyMode:l,removeMode:m}},b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true");else if(V.key==="Escape"&&E.dragging){V.preventDefault(),V.stopPropagation();let J=e.querySelector('[aria-grabbed="true"]')||Y;b.split(/\s+/).filter(Boolean).forEach(Xe=>J.classList.remove(Xe)),J.setAttribute("aria-grabbed","false"),E.dragging=null,re()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&E.dragging&&E.dragging.sourceEl===$){V.preventDefault();let J=$.nextElementSibling;J&&(J.firstElementChild||J).focus()}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&E.dragging&&E.dragging.sourceEl===$){V.preventDefault();let J=$.previousElementSibling;J&&(J.firstElementChild||J).focus()}};$.addEventListener("keydown",bt),$.__disposers=$.__disposers||[],$.__disposers.push(()=>$.removeEventListener("dragstart",Be),()=>$.removeEventListener("dragend",mt),()=>$.removeEventListener("keydown",bt)),t.processTree($)});let R=T.length===0;_.split(/\s+/).filter(Boolean).forEach(O=>e.classList.toggle(O,R))}let w=T=>{if(!E.dragging||g&&t.evaluate(g,n))return;let F=ue(E.dragging.type,f),q=!0;if(v){let R=t.evaluate(v,n),O=t.resolve(o,n);typeof R=="number"&&Array.isArray(O)&&O.length>=R&&(q=!1)}if(!F||!q){h.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),A.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),re();return}h.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=l?"copy":"move");let P=Re(e,T.clientX,T.clientY,a);y&&vt(e,P,y,u)},B=T=>{if(E.dragging&&!(g&&t.evaluate(g,n))&&(j++,j===1)){let F=ue(E.dragging.type,f),q=!0;if(v){let P=t.evaluate(v,n),R=t.resolve(o,n);typeof P=="number"&&Array.isArray(R)&&R.length>=P&&(q=!1)}F&&q?(A.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):h.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P))}},H=()=>{E.dragging&&(j--,j<=0&&(j=0,A.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),h.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging?.item}}))))},N=T=>{if(T.preventDefault(),T.stopPropagation(),j=0,!E.dragging||g&&t.evaluate(g,n)||!ue(E.dragging.type,f))return;if(v){let U=t.evaluate(v,n),Q=t.resolve(o,n);if(typeof U=="number"&&Array.isArray(Q)&&Q.length>=U)return}let F=E.dragging.item,q=E.dragging.listDirective,P=E.dragging.sourceIndex,R=Re(e,T.clientX,T.clientY,a);A.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),h.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),re();let O=t.resolve(o,n);if(!Array.isArray(O))return;let z=q&&q.el===e;if(z&&P===R){E.dragging=null;return}if(z&&P+1===R){E.dragging=null;return}let ee=[...O];if(z){let[U]=ee.splice(P,1),Q=P<R?R-1:R;ee.splice(Q,0,U),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:F,from:P,to:Q}}))}else{let U=l&&typeof F=="object"?{...F}:F;if(ee.splice(R,0,U),n.$set(o,ee),q&&!q.copyMode&&(m||q.removeMode)){let Q=t.resolve(q.listPath,q.ctx);if(Array.isArray(Q)&&P!=null){let $=Q.filter((Y,Be)=>Be!==P);q.ctx.$set(q.listPath,$),q.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:$,item:F,index:P}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:F,from:P,fromList:q?t.resolve(q.listPath,q.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][z&&P<R?R-1:R];if(Q){let $=Q.firstElementChild||Q;x.split(/\s+/).filter(Boolean).forEach(Y=>$.classList.add(Y)),$.addEventListener("animationend",()=>{x.split(/\s+/).filter(Boolean).forEach(Y=>$.classList.remove(Y))},{once:!0})}}),E.dragging=null},M=T=>{if(E.dragging&&ue(E.dragging.type,f)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let F=e.querySelector(":focus");if(F){let P=(F.style?.display==="contents"&&F.firstElementChild||F).getBoundingClientRect(),R={preventDefault(){},stopPropagation(){},clientX:P.left+P.width/2,clientY:P.top+P.height+1,dataTransfer:null};N(R)}}};e.addEventListener("dragover",w),e.addEventListener("dragenter",B),e.addEventListener("dragleave",H),e.addEventListener("drop",N),e.addEventListener("keydown",M),ae(e,()=>{e.removeEventListener("dragover",w),e.removeEventListener("dragenter",B),e.removeEventListener("dragleave",H),e.removeEventListener("drop",N),e.removeEventListener("keydown",M)});let se=n.$watch(S);ae(e,se),S()}})}function wt(t){qe(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}E.selected.has(n)||E.selected.set(n,new Set);let d=E.selected.get(n),s=c=>{let f=e.getAttribute("drag"),m={item:f?t.evaluate(f,o):null,el:e,ctx:o};if(c.ctrlKey||c.metaKey){let p=[...d].find(g=>g.el===e);p?(d.delete(p),i.split(/\s+/).filter(Boolean).forEach(g=>e.classList.remove(g))):(d.add(m),i.split(/\s+/).filter(Boolean).forEach(g=>e.classList.add(g)))}else{for(let p of d)i.split(/\s+/).filter(Boolean).forEach(g=>p.el.classList.remove(g));d.clear(),d.add(m),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p))}};e.addEventListener("click",s),ae(e,()=>{e.removeEventListener("click",s);let c=[...d].find(f=>f.el===e);c&&d.delete(c)});let a=c=>{if(c.key==="Escape"){for(let f of d)i.split(/\s+/).filter(Boolean).forEach(l=>f.el.classList.remove(l));d.clear()}};window.addEventListener("keydown",a),ae(e,()=>window.removeEventListener("keydown",a))}})}function At(t,e={}){yt(t),xt(t),Et(t),wt(t)}function _t(){ht()}var kt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],Ne=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var pe,Tt,ze,Ze,Qe,Lt,Me,Je,jt;function En(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function wn(t){return(t.getAttribute("type")||"text").toLowerCase()}function An(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let d=n.split("|").map(s=>s.trim());for(let s of d){let[a,...c]=s.split(":"),f=pe[a];if(f){let l=f(t.value,...c,e);l!==!0&&l&&(r.push({rule:a,message:l}),o.add(a))}else{let l=t.value,m=null;switch(a){case"required":(l==null||String(l).trim()==="")&&(m="Required");break;case"email":l&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)&&(m="Invalid email");break;case"url":try{new URL(l)}catch{m="Invalid URL"}break;case"min":Number(l)<Number(c[0])&&(m=`Minimum value is ${c[0]}`);break;case"max":Number(l)>Number(c[0])&&(m=`Maximum value is ${c[0]}`);break;case"custom":if(c[0]&&pe[c[0]]){let p=pe[c[0]](l,e);p!==!0&&p&&(m=p)}break}m&&(r.push({rule:a,message:m}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[d,s]of kt)if(i[d]){let a=s||wn(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function _n(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function kn(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let d=Ne.indexOf(n.rule),s=Ne.indexOf(i.rule);return(d===-1?999:d)-(s===-1?999:s)})[0];return{rule:o.rule,message:_n(e,o.rule,o.message)}}function Dt(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Ln(t,e,r,o,n){let i=Dt(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;Je(i),i.remove()}let d=document.querySelector(t);if(!d)return;let s=d.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.__errorTemplateFor=o;let c=ze({$error:e,$rule:r},n);a.__ctx=c,a.appendChild(s),d.parentNode.insertBefore(a,d.nextSibling),En(a),Qe(a)}function Ct(t){let e=Dt(t);e&&(Je(e),e.remove())}function jn(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Tt(r,e)}catch{return!0}}function St(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function Cn(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...d]=n.split(":"),s=pe[i];if(s){let a=s(t,...d,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(d[0]))return`Minimum value is ${d[0]}`;break;case"max":if(Number(t)>Number(d[0]))return`Maximum value is ${d[0]}`;break;case"custom":if(d[0]&&pe[d[0]]){let a=pe[d[0]](t,r);if(a!==!0&&a)return a}break}}return null}function Sn(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return Ze(t);let e=ze({},null);return t.__ctx=e,e}function It(t){pe=X(t,"validators")||{},Tt=t.evaluate,ze=t.createContext,Ze=t.findContext,Qe=t.processTree,Lt=X(t,"cloneTemplate")||(()=>null),Me=X(t,"disposeChildren")||(()=>{}),Je=X(t,"disposeTree")||Me,jt=X(t,"warn")||console.warn;let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):jt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let m=function(){d&&typeof d.$notify=="function"&&d.$notify();let h=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;h.nextNode();){let _=h.currentNode.__ctx;_&&_!==d&&typeof _.$notify=="function"&&_.$notify()}},p=function(){return r.querySelectorAll("input, textarea, select")},g=function(){let h={},x={},_={},k=!0,j=null,L=0,S=!1;for(let w of p())w.name&&(w.type==="checkbox"?x[w.name]=w.checked:w.type==="radio"?w.checked?x[w.name]=w.value:w.name in x||(x[w.name]=""):x[w.name]=w.value);for(let w of p()){if(!w.name)continue;let B=a.has(w.name),H=c.has(w.name);if(!jn(w,d)){_[w.name]={valid:!0,dirty:H,touched:B,error:null,value:x[w.name]};continue}let N=An(w,x),M=kn(N,w),se=!M,T=St(w,r),F=T.includes("input"),q=T.includes("blur")||T.includes("focusout")||T.includes("submit"),P;!w.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?P=B||H:P=F&&H||q&&B,se||(k=!1),!se&&P&&(h[w.name]=M.message,L++,j||(j=M.message)),_[w.name]={valid:se,dirty:H,touched:B,error:M?M.message:null,value:x[w.name]};let R=w.getAttribute("error-class")||s;if(R){let z=R.split(/\s+/);!se&&P?w.classList.add(...z):w.classList.remove(...z)}if(M&&P){let z=w.getAttribute(`error-${M.rule}`),ee=w.getAttribute("error"),U=(z&&z.startsWith("#")?z:null)||(ee&&ee.startsWith("#")?ee:null);U?Ln(U,M.message,M.rule,w,d):Ct(w)}else Ct(w);let O=w.getAttribute("as");O&&d.$set(O,_[w.name])}f.size>0&&(S=!0),l.valid=k,l.errors=h,l.values=x,l.fields=_,l.firstError=j,l.errorCount=L,l.pending=S,d.$set("$form",{...l}),m(),v(r)},v=function(h){let x=l.valid&&!l.pending&&!l.submitting,_=h.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let k of _){if(k.hasAttribute("disabled")&&k.getAttribute("disabled")!==""){let j=k.getAttribute("disabled");if(j!=="disabled"&&j!=="true"&&j!=="false")continue}k.disabled=!x,k.__autoDisabled=!0}},y=function(h){if(!h.name)return;let x=St(h,r),_=()=>{c.add(h.name),l.dirty=!0,g()},k=()=>{a.add(h.name),l.touched=!0,g()};if(x.includes("input"))h.addEventListener("input",_),ne(r,()=>h.removeEventListener("input",_));else{let j=()=>{c.add(h.name),l.dirty=!0,g()};h.addEventListener("input",j),ne(r,()=>h.removeEventListener("input",j))}if(x.includes("blur")||x.includes("focusout")){let j=()=>{k(),x.includes("blur")&&_()};h.addEventListener("focusout",j),ne(r,()=>h.removeEventListener("focusout",j))}else h.addEventListener("focusout",k),ne(r,()=>h.removeEventListener("focusout",k));x.includes("submit")&&(h.addEventListener("focusout",k),ne(r,()=>h.removeEventListener("focusout",k)))},d=Sn(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,c=new Set,f=new Map,l={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{l.dirty=!1,l.touched=!1,l.pending=!1,l.submitting=!1,a.clear(),c.clear(),r.reset(),g()},endSubmit:()=>{l.submitting=!1,g()}};d.$set("$form",l);let u=r.hasAttribute("validate-on"),b=[...p()].some(h=>h.hasAttribute("validate-on"));if(!u&&!b){let h=_=>{let k=_.target;k&&k.name&&c.add(k.name),l.dirty=!0,g()};r.addEventListener("input",h),ne(r,()=>r.removeEventListener("input",h)),r.addEventListener("change",h),ne(r,()=>r.removeEventListener("change",h));let x=_=>{_.target&&_.target.name&&a.add(_.target.name),l.touched=!0,g()};r.addEventListener("focusout",x),ne(r,()=>r.removeEventListener("focusout",x))}else for(let h of p())y(h);let A=h=>{for(let x of p())x.name&&a.add(x.name);if(l.touched=!0,g(),!l.valid||l.pending){h.preventDefault(),h.stopImmediatePropagation();return}l.submitting=!0,v(r),d.$set("$form",{...l}),m()};r.addEventListener("submit",A,!0),ne(r,()=>r.removeEventListener("submit",A,!0)),r.__nojsResetSubmitting=()=>{l.submitting=!1,g()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(g);return}let i=Ze(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let d=r.getAttribute("error"),s=()=>{let a=Cn(r.value,n,{});if(a&&d){let c=r.nextElementSibling?.__validationError?r.nextElementSibling:null;c||(c=document.createElement("div"),c.__validationError=!0,c.style.display="contents",r.parentNode.insertBefore(c,r.nextSibling));let f=Lt(d);if(f){let l=ze({err:{message:a}},i);Me(c),c.innerHTML="",c.__ctx=l,c.appendChild(f),Qe(c)}}else{let c=r.nextElementSibling?.__validationError?r.nextElementSibling:null;c&&(Me(c),c.innerHTML="")}};r.addEventListener("input",s),ne(r,()=>r.removeEventListener("input",s))}}})}function Bt(t,e={}){It(t)}function Pt(){}var ve=new Map,te=new Map;function Ft(){let t=Array.from(ve.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of te.values())clearTimeout(e);te.clear();for(let e of ve.values())e.remove();ve.clear()}function $t(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Tn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var He=8;function qt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,d=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+He,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-He;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+He;break;default:s=o.top-n.height-He,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>d-4&&(s=d-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Dn=0;function In(t,e,r){document.body.appendChild(e),qt(e,t,r),e.setAttribute("aria-hidden","false")}function Rt(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Bn(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Mt(t){t.directive("tooltip",{priority:20,init(e,r,o){$t();let n=o;if(!n){Bn(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",d=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(d)?300:d,a=e.getAttribute("tooltip-disabled"),c=a?t.findContext(e):null,f=()=>{if(!a||!c)return!1;try{return!!t.evaluate(a,c)}catch{return!1}},l=`nojs-tooltip-${++Dn}`,m=document.createElement("div");m.className="nojs-tooltip",m.setAttribute("role","tooltip"),m.setAttribute("id",l),m.setAttribute("aria-hidden","true"),m.textContent=n,e.setAttribute("aria-describedby",l),ve.set(e,m);let p=!1,g=0,v=()=>{!p||!e.isConnected||g||(g=requestAnimationFrame(()=>{g=0,!(!p||!e.isConnected)&&qt(m,e,i)}))},y=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},u=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),g&&(cancelAnimationFrame(g),g=0)},b=()=>{p||(In(e,m,i),p=!0,y())},A=()=>{if(!p){Rt(e,m);return}u(),Rt(e,m),p=!1},h=()=>{if(f())return;te.has(e)&&clearTimeout(te.get(e));let B=setTimeout(()=>{te.delete(e),!f()&&e.isConnected&&b()},s);te.set(e,B)},x=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),A()},_=()=>h(),k=()=>x(),j=()=>h(),L=()=>x(),S=B=>{B.key==="Escape"&&m.getAttribute("aria-hidden")==="false"&&x()};e.addEventListener("mouseenter",_),e.addEventListener("mouseleave",k),e.addEventListener("focusin",j),e.addEventListener("focusout",L),e.addEventListener("keydown",S);let w=null;if(a&&c&&typeof c.$watch=="function"){let B=()=>{p&&f()&&A()};w=c.$watch(B)}Tn(e,()=>{e.removeEventListener("mouseenter",_),e.removeEventListener("mouseleave",k),e.removeEventListener("focusin",j),e.removeEventListener("focusout",L),e.removeEventListener("keydown",S),w&&(w(),w=null),u(),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),p=!1,m.remove(),ve.delete(e)})}})}function zt(t,e={}){Mt(t)}function Ht(){Ft()}var K=new Map;function Ot(){K.clear()}function Oe(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
.nojs-popover {
  position: fixed;
  z-index: 9998;
  margin: 0;
  border: 1px solid #E2E8F0;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
  max-width: 20rem;
}
.nojs-popover:popover-open {
  display: block;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function et(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ye(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var de=8;function Ve(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,d=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-de,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-de;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+de;break;default:s=o.bottom+de,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>d&&(s=o.top-n.height-de),r==="top"&&s<0&&(s=o.bottom+de),r==="right"&&a+n.width>i&&(a=o.left-n.width-de),r==="left"&&a<0&&(a=o.right+de),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>d-4&&(s=d-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function tt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let d=t.popoverEl;if(!d||!d.isConnected){i();return}if(typeof d.matches=="function"&&!d.matches(":popover-open")){i();return}Ve(d,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function fe(t){t&&t._untrack&&t._untrack()}function Vt(t){t.directive("popover",{priority:20,init(r,o,n){Oe();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let d=r.getAttribute("popover-position")||"bottom";if(!K.has(i))K.set(i,{popoverEl:r,triggerEls:new Set,position:d,open:!1,_untrack:null});else{let a=K.get(i);a.popoverEl=r,a.position=d}let s=a=>{let c=K.get(i);if(!c)return;let f=a.newState==="open";c.open=f;for(let l of c.triggerEls)l.setAttribute("aria-expanded",String(f));f||fe(c)};r.addEventListener("toggle",s),et(r,()=>{r.removeEventListener("toggle",s);let a=K.get(i);a&&(fe(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&K.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){Oe();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,c=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(c&&(i=c.getAttribute("data-popover-id")||c.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),K.has(i)||K.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),K.get(i).triggerEls.add(r);let d=a=>{let c=K.get(i);if(!c||!c.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}ye(c.popoverEl)&&(c.popoverEl.togglePopover(),requestAnimationFrame(()=>{c.popoverEl.matches(":popover-open")?(Ve(c.popoverEl,r,c.position),tt(c,r)):fe(c)}))};r.addEventListener("click",d);let s=a=>{let c=K.get(i);a.key==="Escape"&&c?.open&&(ye(c.popoverEl,"hidePopover")&&c.popoverEl.hidePopover(),fe(c),r.focus())};document.addEventListener("keydown",s),et(r,()=>{r.removeEventListener("click",d),document.removeEventListener("keydown",s);let a=K.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(fe(a),K.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){Oe();let o=()=>{let n=r.closest(".nojs-popover");!n||!ye(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),et(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!ye(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{Ve(n.popoverEl,i,n.position),tt(n,i)}),!0},e.close=r=>{let o=K.get(r);if(!o||!o.popoverEl||!ye(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return fe(o),!0},e.toggle=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!ye(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{Ve(n.popoverEl,i,n.position),tt(n,i)}):fe(n),!0},t.popover=e}function Wt(t,e={}){Vt(t)}function Gt(){Ot()}var W=[],oe=new Map,Pn=1e4;function Ut(){return Pn+W.length}function Yt(){W.length=0,oe.clear()}function xe(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Fn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Xt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',rt=new WeakMap;function $n(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(Xt)].filter(d=>d.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),rt.set(t,e)}function Kt(t){let e=rt.get(t);e&&(t.removeEventListener("keydown",e),rt.delete(t))}var je=new WeakMap;function Nt(t){t.directive("modal",{priority:10,init(r,o,n){xe();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let d=r.querySelector("h1, h2, h3, h4, h5, h6");d&&(d.id||(d.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",d.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),c=r.getAttribute("modal-escape"),f=m=>{m.target===r&&s!=="false"&&c!=="false"&&Ee(r,i)};r.addEventListener("click",f),oe.set(i,r);let l=m=>{if(m.newState==="open"){if(r.style.zIndex=String(Ut()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(g=>g.el===r))return;let p=r.querySelector(Xt);p?p.focus():r.focus()}),$n(r),c!=="false"){let p=g=>{g.key==="Escape"&&(g.stopPropagation(),Ee(r,i))};r.addEventListener("keydown",p),je.set(r,p)}}else if(m.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),Kt(r);let p=je.get(r);p&&(r.removeEventListener("keydown",p),je.delete(r));let g=W.findIndex(v=>v.el===r);if(g===-1&&(g=W.findIndex(v=>v.id===i)),g!==-1){let v=W[g];W.splice(g,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",l),Fn(r,()=>{r.removeEventListener("click",f),r.removeEventListener("toggle",l),Kt(r);let m=je.get(r);m&&(r.removeEventListener("keydown",m),je.delete(r)),oe.delete(i);let p=W.findIndex(g=>g.el===r);p===-1&&(p=W.findIndex(g=>g.id===i)),p!==-1&&W.splice(p,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=oe.get(r);return o?(Ee(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)Ee(W[r].el,W[r].id)},t.modal=e}function Ee(t,e){try{t.hidePopover()}catch{}}function Zt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Rn(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function Qt(t){t.directive("modal-open",{priority:10,init(e,r,o){xe();let n=o;if(!n){let l=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(l&&(n=l.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let f=oe.get(n)||Rn(n);if(!f){console.warn(`[modal-open] modal "${n}" not found`);return}let l=W.some(m=>m.id===n);f.id&&e.setAttribute("aria-controls",f.id);try{f.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}l||W.push({id:n,el:f,triggerEl:e}),e.setAttribute("aria-expanded","true")},d=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,c=()=>{let f=oe.get(n);return f?(a=f,s=l=>{l.newState==="closed"&&e.setAttribute("aria-expanded","false")},f.addEventListener("toggle",s),!0):!1};if(!c()){let f=requestAnimationFrame(c);Zt(e,()=>cancelAnimationFrame(f))}e.addEventListener("click",i),Zt(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function qn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Jt(t){t.directive("modal-close",{priority:10,init(e,r,o){xe();let n=()=>{let i,d;if(o){if(d=o,i=oe.get(d),!i){console.warn(`[modal-close] modal "${d}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}d=i.getAttribute("modal")}Ee(i,d)};e.addEventListener("click",n),qn(e,()=>{e.removeEventListener("click",n)})}})}function er(t,e={}){Nt(t),Qt(t),Jt(t)}function tr(){Yt()}var ce={openMenus:new Map};function rr(){ce.openMenus.clear()}function we(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
.nojs-dropdown-menu {
  position: fixed;
  z-index: 9999;
  margin: 0;
  min-width: max-content;
  list-style: none;
  padding: 0.3rem 0;
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var Mn=0;function zn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function nr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),d=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,c,f;switch(o){case"top":c=i.top-d.height,f=i.left;break;case"left":c=i.top,f=i.left-d.width;break;case"right":c=i.top,f=i.right;break;default:c=i.bottom,f=i.left}o==="bottom"||o==="top"?n==="end"&&(f=i.right-d.width):n==="end"&&(c=i.bottom-d.height),o==="bottom"&&c+d.height>s&&i.top-d.height>0?c=i.top-d.height:o==="top"&&c<0&&i.bottom+d.height<=s&&(c=i.bottom),f<4&&(f=4),f+d.width>a-4&&(f=a-d.width-4),t.style.top=`${c}px`,t.style.left=`${f}px`}function ot(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function nt(t){let e=ot(t);e.length&&e[0].focus()}function or(t){let e=ot(t);e.length&&e[e.length-1].focus()}function ir(t){t.directive("dropdown",{priority:15,init(r){we()}}),t.directive("dropdown-toggle",{priority:15,init(r){we();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Mn++}`),r.setAttribute("aria-controls",n.id);let i=!1,d=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),d&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),nr(n,r,o),ce.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(d&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ce.openMenus.delete(n)}function c(){return r.getAttribute("aria-expanded")==="true"}let f=u=>{u.newState==="closed"&&c()&&a()};n.addEventListener("toggle",f);let l=u=>{u.preventDefault(),u.stopPropagation(),c()?a():s()};r.addEventListener("click",l);let m=u=>{c()&&!o.contains(u.target)&&a()};document.addEventListener("click",m,!0);let p=u=>{u.key==="Escape"&&c()&&(a(),r.focus())};document.addEventListener("keydown",p);let g=u=>{switch(u.key){case"Enter":case" ":u.preventDefault(),s(),nt(n);break;case"ArrowDown":u.preventDefault(),s(),nt(n);break;case"ArrowUp":u.preventDefault(),s(),or(n);break}};r.addEventListener("keydown",g);let v=u=>{if(!(!c()||ot(n).find(h=>h===document.activeElement)))switch(u.key){case"ArrowDown":u.preventDefault(),nt(n);break;case"ArrowUp":u.preventDefault(),or(n);break}};n.addEventListener("keydown",v);let y=()=>{c()&&nr(n,r,o)};window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),zn(r,()=>{r.removeEventListener("click",l),r.removeEventListener("keydown",g),n.removeEventListener("keydown",v),n.removeEventListener("toggle",f),document.removeEventListener("click",m,!0),document.removeEventListener("keydown",p),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),ce.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){we(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function sr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Hn(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function it(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ce.openMenus.has(t)&&ce.openMenus.delete(t)}function ar(t){t.directive("dropdown-item",{priority:15,init(e){we();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=d=>{if(!r)return;let s=Hn(r),a=s.indexOf(e);switch(d.key){case"ArrowDown":{d.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{d.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{d.preventDefault(),s.length&&s[0].focus();break}case"End":{d.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{d.preventDefault(),e.click();break}case"Escape":{if(d.preventDefault(),it(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}break}case"Tab":{it(r,o);break}}};e.addEventListener("keydown",n),sr(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(it(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}};e.addEventListener("click",i),sr(e,()=>e.removeEventListener("click",i))}})}function dr(t,e={}){ir(t),ar(t)}function cr(){rr()}var ie=new Map,Ae=new Set,lr=0;function ur(){return++lr}function pr(){for(let t of Ae)clearTimeout(t);Ae.clear();for(let t of ie.values())t.remove();ie.clear(),lr=0}function fr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function st(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var On=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function at(){return ie.size>0?ie.values().next().value:Vn("top-right")}function Vn(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function Wn(t){return t.startsWith("top")}function dt(t,e,r,o,n){let i=ur(),d=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let c=document.createElement("button");c.type="button",c.classList.add("nojs-toast-dismiss"),c.setAttribute("aria-label","Dismiss"),c.textContent="\xD7",c.addEventListener("click",()=>We(s)),s.appendChild(c)}if(Wn(d)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let c=setTimeout(()=>{Ae.delete(c),s.isConnected&&We(s)},o);Ae.add(c),s._toastTimerId=c}return s}function We(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Ae.delete(t._toastTimerId)),t.remove())}function gr(t){fr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&On.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),st(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",d=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(d)?3e3:d,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let g=()=>{let v=at();dt(v,n,i,s,a)};r.addEventListener("click",g),st(r,()=>r.removeEventListener("click",g));return}let f=t.findContext(r);if(!f||typeof f.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let l;function m(){let g=t.evaluate(n,f);if(g&&g!==l){let v=typeof g=="string"?g:String(g),y=at();dt(y,v,i,s,a),l=g}else l=g}let p=f.$watch(m);st(r,p)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,d=at();return dt(d,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&We(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>We(r))},t.toast=e}function mr(t,e={}){gr(t)}function br(){pr()}var ge={containers:new Map};function hr(){ge.containers.clear()}function vr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function Gn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Un=0;function yr(t){return`${t}-${++Un}`}function Ce(t,e,r=!1){let o=ge.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let d=0;d<n.length;d++)n[d].setAttribute("aria-selected","false"),n[d].setAttribute("tabindex","-1"),i[d].setAttribute("aria-hidden","true"),i[d].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Se(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function xr(t){t.directive("tabs",{priority:10,init(e,r,o){vr();let n=[],i=[];for(let u of Array.from(e.children))u.hasAttribute("tab")?n.push(u):u.hasAttribute("panel")&&i.push(u);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let d=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",d),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let u=0;u<a;u++){let b=n[u],A=i[u],h=b.id||yr("nojs-tab"),x=A.id||yr("nojs-panel");b.id=h,A.id=x,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",x),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),A.setAttribute("role","tabpanel"),A.setAttribute("aria-labelledby",h),A.setAttribute("tabindex","0"),A.setAttribute("aria-hidden","true"),A.inert=!0,A.classList.add("nojs-panel"),s.appendChild(b)}for(let u=a;u<i.length;u++){let b=i[u];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let c=i[0];c?e.insertBefore(s,c):e.appendChild(s),ge.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let f=t.findContext(e),l=[],m=(u,b)=>{let A=!1;try{A=!!t.evaluate(b,f)}catch{A=!1}A?u.setAttribute("aria-disabled","true"):u.removeAttribute("aria-disabled")};for(let u=0;u<a;u++){let b=n[u],A=b.getAttribute("tab-disabled");if(A&&(m(b,A),f&&typeof f.$watch=="function")){let h=f.$watch(()=>m(b,A));l.push(h)}}let p=0;if(o&&o.trim()!==""){let u=parseInt(o,10);!isNaN(u)&&u>=0&&u<a&&(p=u)}let g=n.slice(0,a);if(n[p]?.getAttribute("aria-disabled")==="true"){let u=Se(g,p,1);u!==-1?(p=u,Ce(e,p)):Ce(e,p,!0)}else Ce(e,p);let v=u=>{let b=ge.containers.get(e);if(!b)return;let A=u.target;if(A.getAttribute("role")!=="tab")return;let{tabs:h}=b,x=h.indexOf(A);if(x===-1)return;let _=-1;switch(u.key){case"ArrowRight":case"ArrowDown":_=Se(h,x,1);break;case"ArrowLeft":case"ArrowUp":_=Se(h,x,-1);break;case"Home":_=Se(h,h.length-1,1);break;case"End":_=Se(h,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==x&&(u.preventDefault(),Ce(e,_),h[_].focus())};s.addEventListener("keydown",v);let y=u=>{let b=u.target.closest("[role='tab']");if(!b)return;let A=ge.containers.get(e);if(!A)return;let h=A.tabs.indexOf(b);h!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Ce(e,h),b.focus())};s.addEventListener("click",y),Gn(e,()=>{s.removeEventListener("keydown",v),s.removeEventListener("click",y);for(let u of l)u&&u();l.length=0,ge.containers.delete(e)})}})}function Er(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function wr(t){t.directive("panel",{priority:11,init(){}})}function Ar(t,e={}){xr(t),Er(t),wr(t)}function _r(){hr()}var I={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function kr(){I.branches.clear(),I.selectedItem=null,I.typeahead="",I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null)}function _e(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function ke(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Lr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function jr(t){return t.closest('[role="tree"]')}function Yn(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function Kn(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function ct(t){let e=I.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),I.selectedItem=t}function Cr(t){let e=I.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function Xn(t){let e=I.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function Nn(t){let e=I.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Sr(t,e){let r=jr(e);if(!r)return;let o=Lr(r),n=o.indexOf(e);if(n<0)return;let i=I.branches.get(e),d=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),d&&!i.expanded)Xn(e);else if(d&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&me(s,o)}break;case"ArrowLeft":if(t.preventDefault(),d&&i.expanded)Nn(e);else{let s=Yn(e);s&&me(s,Lr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&me(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&me(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),ct(e),d&&Cr(e);break;case"Home":t.preventDefault(),o.length>0&&me(o[0],o);break;case"End":t.preventDefault(),o.length>0&&me(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),I.typeahead+=t.key.toLowerCase(),I.typeaheadTimer&&clearTimeout(I.typeaheadTimer),I.typeaheadTimer=setTimeout(()=>{I.typeahead="",I.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let c=(s+a)%o.length;if(Kn(o[c]).startsWith(I.typeahead)){me(o[c],o);break}}}break}}function Tr(t){t.directive("tree",{priority:15,init(e){_e(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Dr(t){t.directive("branch",{priority:16,init(e,r,o){_e();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=jr(e);if(i){let c=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",c?"-1":"0")}else e.setAttribute("tabindex","0");let d=!1;queueMicrotask(()=>{if(d)return;let c=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);c?(I.branches.set(e,{expanded:n,subtreeEl:c}),c.setAttribute("aria-hidden",String(!n))):I.branches.set(e,{expanded:n,subtreeEl:null})});let s=c=>{c.target.closest?.('[role="treeitem"]')===e&&(c.stopPropagation(),ct(e),Cr(e))};e.addEventListener("click",s),ke(e,()=>e.removeEventListener("click",s));let a=c=>{Sr(c,e)};e.addEventListener("keydown",a),ke(e,()=>e.removeEventListener("keydown",a)),ke(e,()=>{d=!0,I.branches.delete(e),I.selectedItem===e&&(I.selectedItem=null),I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null,I.typeahead="")})}})}function me(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Ir(t){t.directive("subtree",{priority:16,init(e){_e(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=d=>{d.stopPropagation(),ct(o)};o.addEventListener("click",n),ke(o,()=>o.removeEventListener("click",n));let i=d=>{Sr(d,o)};o.addEventListener("keydown",i),ke(o,()=>o.removeEventListener("keydown",i)),ke(o,()=>{I.selectedItem===o&&(I.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=I.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Br(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function lt(t){return t.closest('[role="treeitem"]')}function Zn(t){return t.closest('[role="tree"]')}function Qn(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Jn(t){return Qn(t).indexOf(t)}function eo(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Pr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Le(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function Te(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function to(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function ro(t,e){Le();let r=to(),o=t.getBoundingClientRect(),n=Zn(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function Fr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(_e(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=m=>{let p=lt(m.target);if(p&&e.contains(p)){if(p.hasAttribute("tree-drag-disabled")){m.preventDefault();return}D.dragging={el:p,treeRoot:e},m.dataTransfer&&(m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain","")),p.classList.add("nojs-dragging"),p.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:p}}))}},d=m=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let p=lt(m.target);if(!p||!e.contains(p)||p===D.dragging.el||Pr(p,D.dragging.el))return;m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let g=eo(p,m.clientY,o);(D.currentTarget!==p||D.currentPosition!==g)&&(Te(e),Le(),D.currentTarget=p,D.currentPosition=g,g==="on"?p.classList.add("nojs-tree-drag-over"):ro(p,g))},s=m=>{D.dragging&&D.dragging.treeRoot===e&&n++},a=m=>{D.dragging&&(n--,n<=0&&(n=0,Te(e),Le(),D.currentTarget=null,D.currentPosition=null))},c=m=>{if(m.preventDefault(),m.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let p=D.dragging.el,g=D.currentTarget,v=D.currentPosition;if(Te(e),Le(),!g||!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(g===p||Pr(g,p)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="on"){let y=g.querySelector(':scope > [role="group"]');y||(y=g.nextElementSibling?.matches?.('[role="group"]')?g.nextElementSibling:null),y?y.setAttribute("aria-hidden","false"):(y=document.createElement("ul"),y.setAttribute("role","group"),y.setAttribute("subtree",""),y.classList.add("nojs-subtree","nojs-tree"),y.setAttribute("aria-hidden","false"),g.appendChild(y));let u=I.branches.get(g);u&&(u.expanded=!0,u.subtreeEl=y,g.setAttribute("aria-expanded","true")),y.appendChild(p),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:p,newParent:g}}))}else{let y=g.parentElement;if(!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="before")y.insertBefore(p,g);else{let b=g.nextElementSibling,A=b?.matches?.('[role="group"]')?b.nextElementSibling:b;A?y.insertBefore(p,A):y.appendChild(p)}let u=Jn(p);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:p,newIndex:u}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},f=m=>{let p=lt(m.target);p&&p.classList.remove("nojs-dragging"),Te(e),Le(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",d),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",c),e.addEventListener("dragend",f),Br(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",d),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",c),e.removeEventListener("dragend",f),Te(e),Le()}),no(e);let l=new MutationObserver(m=>{for(let p of m)for(let g of p.addedNodes){if(g.nodeType!==1)continue;g.getAttribute("role")==="treeitem"&&ut(g);let v=g.querySelectorAll?.('[role="treeitem"]');if(v)for(let y of v)ut(y)}});l.observe(e,{childList:!0,subtree:!0}),Br(e,()=>l.disconnect())}})}function ut(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function no(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)ut(r)}function $r(t,e={}){Tr(t),Dr(t),Ir(t),Fr(t)}function Rr(){kr()}var Ge=new Map;function qr(){Ge.clear()}function Ue(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Mr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function zr(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Hr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function De(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Or(t){t.directive("stepper",{priority:14,init(e,r,o){Ue();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let d=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",c=e.getAttribute("stepper-nav")!=="false",f=e.getAttribute("aria-label")||"Stepper",l=Math.max(0,Math.min(d,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",f),e.classList.add("nojs-stepper");let m=null,p=[];if(a){m=document.createElement("div"),m.className="nojs-stepper-indicator",m.setAttribute("role","tablist"),m.setAttribute("aria-label","Progress"),i.forEach((L,S)=>{if(S>0){let M=document.createElement("div");M.className="nojs-stepper-separator",M.setAttribute("aria-hidden","true"),m.appendChild(M)}let w=document.createElement("button");w.type="button",w.className="nojs-stepper-indicator-item",w.setAttribute("role","tab"),w.setAttribute("aria-selected",S===l?"true":"false");let B=L.getAttribute("step-label")||`Step ${S+1}`,H=document.createElement("span");H.textContent=B,w.appendChild(H),w.setAttribute("aria-label",B);let N=`nojs-stepper-tab-${oo++}`;if(w.id=N,s==="free"){w.setAttribute("data-clickable","");let M=()=>x(S);w.addEventListener("click",M),De(e,()=>w.removeEventListener("click",M))}else w.setAttribute("tabindex","-1");m.appendChild(w),p.push(w)});let j=L=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(L.key))return;L.preventDefault();let S=l;L.key==="ArrowRight"?S=Math.min(l+1,i.length-1):L.key==="ArrowLeft"?S=Math.max(l-1,0):L.key==="Home"?S=0:L.key==="End"&&(S=i.length-1),s==="free"?(x(S),p[S]?.focus()):p[l]?.focus()};m.addEventListener("keydown",j),De(e,()=>m.removeEventListener("keydown",j)),e.insertBefore(m,e.firstChild)}let g=null,v=null,y=null;if(c){g=document.createElement("div"),g.className="nojs-stepper-nav",g.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let j=()=>h();v.addEventListener("click",j),De(e,()=>v.removeEventListener("click",j)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let L=()=>A();y.addEventListener("click",L),De(e,()=>y.removeEventListener("click",L)),g.appendChild(v),g.appendChild(y),e.appendChild(g)}function u(j){let L=i[j];if(!L)return!0;if(!Mr(L,t.findContext)){let B=L.querySelector("form[validate]");return B&&(zr(B),p[j]&&p[j].classList.add("nojs-step-invalid"),Hr(e,L,B)),!1}p[j]&&p[j].classList.remove("nojs-step-invalid");let S=L.querySelectorAll("[required]");for(let B of S)if(typeof B.checkValidity=="function"&&!B.checkValidity())return B.reportValidity(),!1;let w=L.getAttribute("step-validate");if(w)try{if(!t.evaluate(w,n))return!1}catch(B){return console.warn(`[stepper] step-validate error: ${B.message}`),!1}return!0}function b(j){i.forEach((L,S)=>{let w=S===l;L.setAttribute("aria-hidden",w?"false":"true"),w?(L.removeAttribute("inert"),L.setAttribute("aria-current","step")):(L.setAttribute("inert",""),L.removeAttribute("aria-current"))}),p.length&&p.forEach((L,S)=>{L.setAttribute("aria-selected",S===l?"true":"false"),S<l?L.setAttribute("data-completed",""):L.removeAttribute("data-completed"),L.setAttribute("tabindex",S===l?"0":"-1");let w=i[S];w.id&&(L.setAttribute("aria-controls",w.id),w.setAttribute("aria-labelledby",L.id))}),v&&(v.disabled=l===0),y&&(y.textContent=l===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!j,detail:{current:l,total:i.length}}))}function A(){return l>=i.length-1?(s==="linear"&&!u(l)||e.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:l,total:i.length}})),!1):s==="linear"&&!u(l)?!1:(l++,b(),k(),!0)}function h(){return l<=0?!1:(l--,b(),k(),!0)}function x(j){if(j<0||j>=i.length||j===l)return!1;if(s==="linear"&&j>l){for(let L=l;L<j;L++)if(l=L,b(),!u(L))return k(),!1}return l=j,b(),k(),!0}let _={get current(){return l},get total(){return i.length},next:A,prev:h,goTo:x,get isFirst(){return l===0},get isLast(){return l===i.length-1}};function k(){n.$stepper=_}k(),Ge.set(e,{get current(){return l},steps:i,mode:s,indicatorEl:m,navEl:g}),b(!0),De(e,()=>{Ge.delete(e),m&&m.parentNode&&m.remove(),g&&g.parentNode&&g.remove(),delete n.$stepper})}})}var oo=0;var io=0;function Vr(t){t.directive("step",{priority:13,init(e,r,o){Ue(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${io++}`),e.setAttribute("tabindex","0")}})}function Wr(t,e={}){Vr(t),Or(t)}function Gr(){qr()}function Ur(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Yr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Kr(t){t.directive("skeleton",{priority:10,init(e,r,o){Ur();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",d=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function c(u){f();for(let b=0;b<u;b++){let A=document.createElement("div");A.className="nojs-skeleton-line",e.appendChild(A),a.push(A)}}function f(){for(let u of a)u.parentNode===e&&e.removeChild(u);a=[]}function l(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let u=s+(String(s).match(/\d$/)?"px":"");e.style.width=u,e.style.height=u}if(d){let u=parseInt(d,10);u>0&&c(u)}e.setAttribute("aria-busy","true")}let m=null;function p(){m&&m(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let u=!1,b=null,A=()=>{u||(u=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",A),b!==null&&clearTimeout(b),m=null)};e.addEventListener("transitionend",A),b=setTimeout(A,0),m=()=>{e.removeEventListener("transitionend",A),b!==null&&clearTimeout(b),u=!0,m=null}}let g=!1;function v(){let u=!!t.evaluate(o,n);u&&!g?(g=!0,l()):!u&&g&&(g=!1,p())}v();let y=n.$watch(v);Yr(e,y),Yr(e,()=>{m&&m(),g&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function Xr(t,e={}){Kr(t)}var be=new Map,G=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Nr(){be.clear(),G.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function so(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Zr(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function Qr(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function ao(t,e){let o=(be.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function co(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Ie(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Ke(t,e,r,o){let n=Z(e,o),i=Z(r,o),d=G.get(e),s=G.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",d?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function pt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=be.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function lo(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=be.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,d)=>{i&&(n.panes[d].style.flexBasis=i,n.panes[d].style.flexGrow="0")}),!0)}catch{return!1}}function uo(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let d=p=>{if(p.button!==0)return;p.preventDefault();let g=ao(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=p[Zr(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=g,C.sign=Qr(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(p.pointerId)},s=p=>{if(!C.active||C.gutterEl!==i)return;let g=(p[Zr(C.direction)]-C.startPos)*(C.sign||1),v=Ie(C.startPrevSize+g,C.prevPane),y=Ie(C.startNextSize-g,C.nextPane),u=C.startPrevSize+C.startNextSize;v+y!==u&&(v!==C.startPrevSize+g?y=u-v:v=u-y),C.prevPane.style.flexBasis=`${v}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${y}px`,C.nextPane.style.flexGrow="0",Ke(i,C.prevPane,C.nextPane,C.direction)},a=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",pt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",d),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let c=10,f=p=>{let g=e==="horizontal",v=Qr(t,e),y=0;if(g&&p.key==="ArrowRight"||!g&&p.key==="ArrowDown")y=c*v;else if(g&&p.key==="ArrowLeft"||!g&&p.key==="ArrowUp")y=-c*v;else if(p.key==="Home")y=(G.get(r)?.min||0)-Z(r,e);else if(p.key==="End"){let _=G.get(o);y=Z(r,e)+Z(o,e)-(_?.min||0)-Z(r,e)}else return;p.preventDefault();let u=Z(r,e),b=Z(o,e),A=u+b,h=Ie(u+y,r),x=Ie(A-h,o);h=A-x,h=Ie(h,r),x=A-h,r.style.flexBasis=`${h}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Ke(i,r,o,e),pt(t)};i.addEventListener("keydown",f);let l=()=>{let p=G.get(r),g=G.get(o),v=p?.collapsible?r:g?.collapsible?o:null;if(!v)return;let y=G.get(v);if(!y)return;let u=v===r?o:r,b=Z(r,e)+Z(o,e);if(y.collapsed){y.collapsed=!1,v.removeAttribute("data-collapsed");let A=y.preCollapseSize||`${Math.round(b/2)}px`,h=co(A,b)??b/2,x=Math.min(h,b);v.style.flexBasis=`${x}px`,v.style.flexGrow="0",u.style.flexBasis=`${b-x}px`,u.style.flexGrow="0"}else y.preCollapseSize=v.style.flexBasis||`${Z(v,e)}px`,y.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",u.style.flexBasis=`${b}px`,u.style.flexGrow="0";Ke(i,r,o,e),pt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",l),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",d),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",f),i.removeEventListener("dblclick",l)}}}function Jr(t){t.directive("split",{priority:14,init(e,r,o){Ye();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let d=Array.from(e.children).filter(f=>f.hasAttribute("pane"));if(d.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${d.length}.`);return}d.forEach(f=>{G.get(f)||G.set(f,{size:f.getAttribute("pane")||null,min:parseInt(f.getAttribute("pane-min"),10)||0,max:parseInt(f.getAttribute("pane-max"),10)||1/0,collapsible:f.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let f=0;f<d.length-1;f++){let{gutter:l,cleanup:m}=uo(e,n,d[f],d[f+1],i);d[f].after(l),s.push(l),a.push(m)}be.set(e,{direction:n,gutterSize:i,panes:d,gutters:s}),lo(e)||d.forEach(f=>{let m=G.get(f)?.size;m?(f.style.flexBasis=m,f.style.flexGrow="0"):(f.style.flexGrow="1",f.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((f,l)=>{Ke(f,d[l],d[l+1],n)})}),so(e,()=>{a.forEach(f=>f()),s.forEach(f=>f.remove()),be.delete(e),d.forEach(f=>G.delete(f)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function po(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function en(t){t.directive("pane",{priority:15,init(e,r,o){Ye(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),po(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function tn(t,e={}){Jr(t),en(t)}function rn(){Nr()}var le={sorts:new Map};function nn(){le.sorts.clear()}function he(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function fo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function go(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?o=r:o=r.querySelector("[each]")||r.querySelector("[foreach]"),!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function mo(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function on(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function sn(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function dn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return sn(Number(t),Number(e));case"date":return sn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function bo(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function cn(t){t.directive("sortable",{priority:10,init(e){he(),e.classList.add("nojs-sortable")}})}function ln(t){t.directive("sort",{priority:11,init(e,r,o){he();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",d=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;le.sorts.has(s)||le.sorts.set(s,{column:null,direction:null}),(d==="asc"||d==="desc")&&(le.sorts.get(s).column||an(e,s,n,i,d,t));let a=()=>{let c=le.sorts.get(s),f;c.column!==n?f="asc":c.direction==="asc"?f="desc":c.direction==="desc"?f=null:f="asc",an(e,s,n,i,f,t)};e.addEventListener("click",a),fo(e,()=>{e.removeEventListener("click",a),s&&!s.isConnected&&(le.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function an(t,e,r,o,n,i){let d=le.sorts.get(e);bo(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),d.column=r,d.direction=n):(d.column=null,d.direction=null);let s=go(e,i);if(s){let a=i.findContext(e),c=a?mo(a,s.arrayPath):null;if(Array.isArray(c)){if(!n){let l=e._nojsOriginalOrder;if(l){let m=new Set(c),p=l.filter(g=>m.has(g));for(let g of c)l.includes(g)||p.push(g);on(a,s.arrayPath,p)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...c]);let f=[...c].sort((l,m)=>{let p=l!=null?l[r]:null,g=m!=null?m[r]:null,v=dn(p,g,o);return n==="desc"?-v:v});on(a,s.arrayPath,f);return}}ho(e,t,r,o,n)}function ho(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let c=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...c]),!n){let m=document.createDocumentFragment();for(let p of t._nojsOriginalRows)m.appendChild(p);i.appendChild(m);return}let f=m=>{let p=m.replace(/[^0-9.\-]/g,"");return p===""||p==="-"?NaN:parseFloat(p)};c.sort((m,p)=>{let g=m.children[a]?.textContent?.trim()||"",v=p.children[a]?.textContent?.trim()||"",y=dn(o==="number"?f(g):g,o==="number"?f(v):v,o);return n==="desc"?-y:y});let l=document.createDocumentFragment();for(let m of c)l.appendChild(m);i.appendChild(l)}function un(t){t.directive("fixed-header",{priority:10,init(e){he(),e.classList.add("nojs-fixed-header")}})}function pn(t){t.directive("fixed-col",{priority:10,init(e){he(),e.classList.add("nojs-fixed-col")}})}function ft(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function fn(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function gn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function mn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function bn(t){t.directive("table-reorder",{priority:15,init(e){if(he(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",d=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,c=null;function f(){let y=r.querySelectorAll(":scope > tr");for(let u=0;u<y.length;u++){let b=y[u];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let A=!0;if(n){let L=S=>{A=!!S.target.closest(n)};b.addEventListener("mousedown",L),ft(b,()=>b.removeEventListener("mousedown",L))}let h=L=>{if(n&&!A){L.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(b),a=b,L.dataTransfer&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(w=>b.classList.add(w)),b.setAttribute("aria-grabbed","true")},x=L=>{if(a==null)return;L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),w=S.top+S.height/2,H=[...r.querySelectorAll(":scope > tr")].indexOf(b);l(),H!==s&&(L.clientY<w?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),c=b)},_=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),c===b&&(c=null)},k=L=>{if(L.preventDefault(),L.stopPropagation(),a==null||s==null)return;let S=[...r.querySelectorAll(":scope > tr")],w=b.getBoundingClientRect(),B=w.top+w.height/2,H=S.indexOf(b);L.clientY>=B&&H++;let N=s;if(N===H||N+1===H){m();return}let M=N<H?H-1:H,se=fn(e);if(se&&o){let T=gn(o,se.arrayPath);if(Array.isArray(T)){let F=[...T],[q]=F.splice(N,1);F.splice(M,0,q),mn(o,se.arrayPath,F),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...F]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:N,to:M,item:q}}))}}else{let T=a,F=S[M];T&&F&&(N<M?r.insertBefore(T,F.nextSibling):r.insertBefore(T,F),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:N,to:M,item:null}})))}m()},j=()=>{m()};b.addEventListener("dragstart",h),b.addEventListener("dragover",x),b.addEventListener("dragleave",_),b.addEventListener("drop",k),b.addEventListener("dragend",j),ft(b,()=>{b.removeEventListener("dragstart",h),b.removeEventListener("dragover",x),b.removeEventListener("dragleave",_),b.removeEventListener("drop",k),b.removeEventListener("dragend",j),b._nojsReorderSetup=!1})}}function l(){c&&(c.classList.remove("nojs-reorder-insert-before"),c.classList.remove("nojs-reorder-insert-after"),c=null)}function m(){a&&(i.split(/\s+/).filter(Boolean).forEach(u=>a.classList.remove(u)),a.setAttribute("aria-grabbed","false")),l(),s=null,a=null;let y=r.querySelectorAll(":scope > tr");for(let u of y)u.classList.remove("nojs-reorder-insert-before"),u.classList.remove("nojs-reorder-insert-after"),d.split(/\s+/).filter(Boolean).forEach(b=>u.classList.remove(b))}let p=y=>{a!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},g=y=>{if(a==null||y.target!==r)return;y.preventDefault(),y.stopPropagation();let u=s,A=[...r.querySelectorAll(":scope > tr")].length-1;if(u===A){m();return}let h=fn(e);if(h&&o){let x=gn(o,h.arrayPath);if(Array.isArray(x)){let _=[...x],[k]=_.splice(u,1);_.push(k),mn(o,h.arrayPath,_),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[..._]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:u,to:_.length-1,item:k}}))}}m()};r.addEventListener("dragover",p),r.addEventListener("drop",g);let v=new MutationObserver(()=>{f()});v.observe(r,{childList:!0}),f(),ft(e,()=>{v.disconnect(),r.removeEventListener("dragover",p),r.removeEventListener("drop",g),m()})}})}function hn(t,e={}){cn(t),ln(t),un(t),pn(t),bn(t)}function vn(){nn()}var vo="[validate],[drag],[drop],[drag-list],[drag-multiple]";function yn(t){if(typeof document>"u")return;let e=document.querySelectorAll(vo);for(let r of e){if(!r.__declared)continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var yo=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col"],xo={name:"nojs-elements",install(t,e={}){At(t,e),Bt(t,e),zt(t,e),Wt(t,e),er(t,e),dr(t,e),mr(t,e),Ar(t,e),$r(t,e),Wr(t,e),Xr(t,e),tn(t,e),hn(t,e),yn(t)},init(t){if(yn(t),typeof document>"u"||!document.body)return;let e=yo.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){_t(),Pt(),Ht(),Gt(),tr(),cr(),br(),_r(),Rr(),Gr(),rn(),vn()}},gt=xo;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(gt),t=!0,!0):!1};window.NoJSElements=gt;let t=!1;if(!e()){let r=0,o=100,n=setInterval(()=>{(e()||++r>=o)&&clearInterval(n)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(n)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
