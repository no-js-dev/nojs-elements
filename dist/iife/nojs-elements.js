/**
 * NoJS Elements v1.13.3 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
(()=>{var E={dragging:null,selected:new Map,placeholder:null},Fe=new Map;function vt(){E.dragging=null,E.selected.clear(),E.placeholder&&(E.placeholder.remove(),E.placeholder=null),Fe.clear()}function $e(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Me(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Re(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Re(r):e++}return e}function qe(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function yt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",E.dragging&&E.dragging.sourceEl){let s=(E.dragging.sourceEl.firstElementChild||E.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),E.placeholder=n}function re(){E.placeholder&&(E.placeholder.remove(),E.placeholder=null)}function pe(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function Cn(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let u=a-1;u>=0;u--){let l=document.createElement("div"),m=u*4;if(l.style.cssText="position:absolute;top:"+m+"px;left:"+m+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",u===0){let f=o.cloneNode(!0);for(;f.firstChild;)l.appendChild(f.firstChild);l.style.background=s.backgroundColor||"#fff",l.style.border=s.border,l.style.padding=s.padding,l.style.fontSize=s.fontSize,l.style.color=s.color,l.style.fontFamily=s.fontFamily}else l.style.background=s.backgroundColor||"#fff",l.style.border=s.border||"1px solid #ddd";r.appendChild(l)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}function xt(t){Me(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){$e();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",c=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),a=e.getAttribute("drag-image"),d=e.getAttribute("drag-image-offset")||"0,0",u=e.getAttribute("drag-disabled"),l=e.getAttribute("drag-class")||"nojs-dragging",m=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let f=!0;if(s){let p=b=>{f=!!b.target.closest(s)};e.addEventListener("mousedown",p),ae(e,()=>e.removeEventListener("mousedown",p))}let g=p=>{if(s&&!f){p.preventDefault();return}if(u&&t.evaluate(u,n)){p.preventDefault();return}let b=t.evaluate(o,n),A=e.getAttribute("drag-group"),h=b;if(A&&E.selected.has(A)){let x=E.selected.get(A);x.size>0&&[...x].some(L=>L.el===e)&&(h=[...x].map(L=>L.item))}if(E.dragging={item:h,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},p.dataTransfer){if(p.dataTransfer.effectAllowed=c,p.dataTransfer.setData("text/plain",""),Array.isArray(h)&&h.length>1&&p.dataTransfer.setDragImage){let x=Cn(e,h.length);document.body.appendChild(x);let _=e.getBoundingClientRect();p.dataTransfer.setDragImage(x,_.width/2,_.height/2),requestAnimationFrame(()=>x.remove())}else if(a&&p.dataTransfer.setDragImage)if(a==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[_,L]=d.split(",").map(Number);p.dataTransfer.setDragImage(x,_||0,L||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(a);if(x){let[_,L]=d.split(",").map(Number);m&&x.classList.add(m),p.dataTransfer.setDragImage(x,_||0,L||0)}}}if(l.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(h)&&A&&E.selected.has(A))for(let x of E.selected.get(A))x.el!==e&&l.split(/\s+/).filter(Boolean).forEach(_=>x.el.classList.add(_));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:h,index:E.dragging.sourceIndex,el:e}}))},v=()=>{l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let p=e.getAttribute("drag-group");if(p&&E.selected.has(p))for(let b of E.selected.get(p))l.split(/\s+/).filter(Boolean).forEach(A=>b.el.classList.remove(A));if(e.setAttribute("aria-grabbed","false"),m&&a&&a!=="none"){let b=e.querySelector(a);b&&b.classList.remove(m)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:E.dragging?.item,index:E.dragging?.sourceIndex,dropped:E.dragging===null}})),E.dragging=null,re()};if(e.addEventListener("dragstart",g),e.addEventListener("dragend",v),ae(e,()=>{e.removeEventListener("dragstart",g),e.removeEventListener("dragend",v)}),u){let p=function(){let A=!!t.evaluate(u,n);e.draggable=!A,A?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},b=n.$watch(p);ae(e,b)}let y=p=>{if(E.dragging&&!E.dragging.sourceEl.isConnected&&(E.dragging=null),p.key===" "&&!E.dragging){p.preventDefault();let b=t.evaluate(o,n);E.dragging={item:b,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},l.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else p.key==="Escape"&&E.dragging&&E.dragging.sourceEl===e&&(p.preventDefault(),l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),e.setAttribute("aria-grabbed","false"),E.dragging=null,re())};e.addEventListener("keydown",y),ae(e,()=>e.removeEventListener("keydown",y))}})}function Et(t){Me(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){$e();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",c=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",a=e.getAttribute("drop-reject-class")||"nojs-drop-reject",d=e.getAttribute("drop-disabled"),u=e.getAttribute("drop-max"),l=e.getAttribute("drop-sort"),m=e.getAttribute("drop-placeholder"),f=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",c);let g=0,v=h=>{if(!E.dragging||d&&t.evaluate(d,n))return;let x=pe(E.dragging.type,i),_=!0;if(u){let L=t.evaluate(u,n),k=Re(e);typeof L=="number"&&k>=L&&(_=!1)}if(!x||!_){a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),re();return}if(a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect=c),l){let L=qe(e,h.clientX,h.clientY,l);m&&yt(e,L,m,f),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:E.dragging.item,index:L}}))}},y=h=>{if(E.dragging&&!(d&&t.evaluate(d,n))&&(g++,g===1)){let x=pe(E.dragging.type,i),_=!0;if(u){let L=t.evaluate(u,n),k=Re(e);typeof L=="number"&&k>=L&&(_=!1)}x&&_?(s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L))}},p=h=>{E.dragging&&(g--,g<=0&&(g=0,s.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),a.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging.item}}))))},b=h=>{if(h.preventDefault(),h.stopPropagation(),g=0,!E.dragging||d&&t.evaluate(d,n)||!pe(E.dragging.type,i))return;if(u){let w=t.evaluate(u,n),B=Re(e);if(typeof w=="number"&&B>=w)return}let x=E.dragging.item,_=E.dragging.type,L=E.dragging.effect,k=0;l&&(k=qe(e,h.clientX,h.clientY,l)),s.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),a.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),re();let j={$drag:x,$dragType:_,$dragEffect:L,$dropIndex:k,$source:{list:E.dragging.sourceList,index:E.dragging.sourceIndex,el:E.dragging.sourceEl},$target:{list:null,index:k,el:e},$el:e},S=X(t,"execStatement");typeof S=="function"?S(o,n,j):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),E.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:x,index:k,source:j.$source,target:j.$target,effect:L}}))},A=h=>{E.dragging&&(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b(h))};e.addEventListener("dragover",v),e.addEventListener("dragenter",y),e.addEventListener("dragleave",p),e.addEventListener("drop",b),e.addEventListener("keydown",A),ae(e,()=>{e.removeEventListener("dragover",v),e.removeEventListener("dragenter",y),e.removeEventListener("dragleave",p),e.removeEventListener("drop",b),e.removeEventListener("keydown",A)})}})}function wt(t){Me(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){$e();let n=t.findContext(e),i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,u=e.getAttribute("drop-accept")||d,l=e.hasAttribute("drag-list-copy"),m=e.hasAttribute("drag-list-remove"),f=e.getAttribute("drag-disabled"),g=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),y=e.getAttribute("drop-placeholder"),p=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",A=e.getAttribute("drop-class")||"nojs-drag-over",h=e.getAttribute("drop-reject-class")||"nojs-drop-reject",x=e.getAttribute("drop-settle-class")||"nojs-drop-settle",_=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",l?"copy":"move");let L={listPath:o,ctx:n,el:e};Fe.set(e,L),ae(e,()=>Fe.delete(e));let k=0,j=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===j&&T.length>0&&e.children.length>0){for(let O of e.children)O.__ctx&&O.__ctx.$notify&&O.__ctx.$notify();return}j=T;let F=i?document.getElementById(i):null;if(!F)return;let q=X(t,"disposeChildren");typeof q=="function"&&q(e),e.innerHTML="";let P=T.length;T.forEach((O,z)=>{let ee={[s]:O,$index:z,$count:P,$first:z===0,$last:z===P-1,$even:z%2===0,$odd:z%2!==0},U=t.createContext(ee,n),Q=F.content.cloneNode(!0),$=document.createElement("div");$.style.display="contents",$.__ctx=U,$.appendChild(Q),e.appendChild($);let Y=$.firstElementChild||$;Y.draggable=!0,Y.setAttribute("role","option"),Y.setAttribute("aria-grabbed","false"),Y.getAttribute("tabindex")||Y.setAttribute("tabindex","0");let Pe=V=>{if(f&&t.evaluate(f,n)){V.preventDefault();return}E.dragging={item:O,type:d,effect:l?"copy":"move",sourceEl:$,sourceCtx:U,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:l,removeMode:m}},V.dataTransfer&&(V.dataTransfer.effectAllowed=l?"copy":"move",V.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:O,index:z,el:Y}}))},bt=()=>{b.split(/\s+/).filter(Boolean).forEach(V=>Y.classList.remove(V)),Y.setAttribute("aria-grabbed","false"),E.dragging&&E.dragging.sourceEl===$&&(E.dragging=null),re()};$.addEventListener("dragstart",Pe),$.addEventListener("dragend",bt);let ht=V=>{if(V.key===" "&&!E.dragging)V.preventDefault(),V.stopPropagation(),E.dragging={item:O,type:d,effect:l?"copy":"move",sourceEl:$,sourceCtx:U,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:l,removeMode:m}},b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true");else if(V.key==="Escape"&&E.dragging){V.preventDefault(),V.stopPropagation();let J=e.querySelector('[aria-grabbed="true"]')||Y;b.split(/\s+/).filter(Boolean).forEach(Ne=>J.classList.remove(Ne)),J.setAttribute("aria-grabbed","false"),E.dragging=null,re()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&E.dragging&&E.dragging.sourceEl===$){V.preventDefault();let J=$.nextElementSibling;J&&(J.firstElementChild||J).focus()}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&E.dragging&&E.dragging.sourceEl===$){V.preventDefault();let J=$.previousElementSibling;J&&(J.firstElementChild||J).focus()}};$.addEventListener("keydown",ht),$.__disposers=$.__disposers||[],$.__disposers.push(()=>$.removeEventListener("dragstart",Pe),()=>$.removeEventListener("dragend",bt),()=>$.removeEventListener("keydown",ht)),t.processTree($)});let R=T.length===0;_.split(/\s+/).filter(Boolean).forEach(O=>e.classList.toggle(O,R))}let w=T=>{if(!E.dragging||g&&t.evaluate(g,n))return;let F=pe(E.dragging.type,u),q=!0;if(v){let R=t.evaluate(v,n),O=t.resolve(o,n);typeof R=="number"&&Array.isArray(O)&&O.length>=R&&(q=!1)}if(!F||!q){h.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),A.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),re();return}h.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=l?"copy":"move");let P=qe(e,T.clientX,T.clientY,a);y&&yt(e,P,y,p)},B=T=>{if(E.dragging&&!(g&&t.evaluate(g,n))&&(k++,k===1)){let F=pe(E.dragging.type,u),q=!0;if(v){let P=t.evaluate(v,n),R=t.resolve(o,n);typeof P=="number"&&Array.isArray(R)&&R.length>=P&&(q=!1)}F&&q?(A.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):h.split(/\s+/).filter(Boolean).forEach(P=>e.classList.add(P))}},H=()=>{E.dragging&&(k--,k<=0&&(k=0,A.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),h.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging?.item}}))))},N=T=>{if(T.preventDefault(),T.stopPropagation(),k=0,!E.dragging||g&&t.evaluate(g,n)||!pe(E.dragging.type,u))return;if(v){let U=t.evaluate(v,n),Q=t.resolve(o,n);if(typeof U=="number"&&Array.isArray(Q)&&Q.length>=U)return}let F=E.dragging.item,q=E.dragging.listDirective,P=E.dragging.sourceIndex,R=qe(e,T.clientX,T.clientY,a);A.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),h.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),re();let O=t.resolve(o,n);if(!Array.isArray(O))return;let z=q&&q.el===e;if(z&&P===R){E.dragging=null;return}if(z&&P+1===R){E.dragging=null;return}let ee=[...O];if(z){let[U]=ee.splice(P,1),Q=P<R?R-1:R;ee.splice(Q,0,U),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:F,from:P,to:Q}}))}else{let U=l&&typeof F=="object"?{...F}:F;if(ee.splice(R,0,U),n.$set(o,ee),q&&!q.copyMode&&(m||q.removeMode)){let Q=t.resolve(q.listPath,q.ctx);if(Array.isArray(Q)&&P!=null){let $=Q.filter((Y,Pe)=>Pe!==P);q.ctx.$set(q.listPath,$),q.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:$,item:F,index:P}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:F,from:P,fromList:q?t.resolve(q.listPath,q.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][z&&P<R?R-1:R];if(Q){let $=Q.firstElementChild||Q;x.split(/\s+/).filter(Boolean).forEach(Y=>$.classList.add(Y)),$.addEventListener("animationend",()=>{x.split(/\s+/).filter(Boolean).forEach(Y=>$.classList.remove(Y))},{once:!0})}}),E.dragging=null},M=T=>{if(E.dragging&&pe(E.dragging.type,u)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let F=e.querySelector(":focus");if(F){let P=(F.style?.display==="contents"&&F.firstElementChild||F).getBoundingClientRect(),R={preventDefault(){},stopPropagation(){},clientX:P.left+P.width/2,clientY:P.top+P.height+1,dataTransfer:null};N(R)}}};e.addEventListener("dragover",w),e.addEventListener("dragenter",B),e.addEventListener("dragleave",H),e.addEventListener("drop",N),e.addEventListener("keydown",M),ae(e,()=>{e.removeEventListener("dragover",w),e.removeEventListener("dragenter",B),e.removeEventListener("dragleave",H),e.removeEventListener("drop",N),e.removeEventListener("keydown",M)});let se=n.$watch(S);ae(e,se),S()}})}function At(t){Me(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}E.selected.has(n)||E.selected.set(n,new Set);let c=E.selected.get(n),s=d=>{let u=e.getAttribute("drag"),m={item:u?t.evaluate(u,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let f=[...c].find(g=>g.el===e);f?(c.delete(f),i.split(/\s+/).filter(Boolean).forEach(g=>e.classList.remove(g))):(c.add(m),i.split(/\s+/).filter(Boolean).forEach(g=>e.classList.add(g)))}else{for(let f of c)i.split(/\s+/).filter(Boolean).forEach(g=>f.el.classList.remove(g));c.clear(),c.add(m),i.split(/\s+/).filter(Boolean).forEach(f=>e.classList.add(f))}};e.addEventListener("click",s),ae(e,()=>{e.removeEventListener("click",s);let d=[...c].find(u=>u.el===e);d&&c.delete(d)});let a=d=>{if(d.key==="Escape"){for(let u of c)i.split(/\s+/).filter(Boolean).forEach(l=>u.el.classList.remove(l));c.clear()}};window.addEventListener("keydown",a),ae(e,()=>window.removeEventListener("keydown",a))}})}function _t(t,e={}){xt(t),Et(t),wt(t),At(t)}function Lt(){vt()}var jt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],Ze=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var fe,Dt,He,Qe,Je,kt,ze,et,Ct;function Sn(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function Tn(t){return(t.getAttribute("type")||"text").toLowerCase()}function Dn(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(s=>s.trim());for(let s of c){let[a,...d]=s.split(":"),u=fe[a];if(u){let l=u(t.value,...d,e);l!==!0&&l&&(r.push({rule:a,message:l}),o.add(a))}else{let l=t.value,m=null;switch(a){case"required":(l==null||String(l).trim()==="")&&(m="Required");break;case"email":l&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)&&(m="Invalid email");break;case"url":try{new URL(l)}catch{m="Invalid URL"}break;case"min":Number(l)<Number(d[0])&&(m=`Minimum value is ${d[0]}`);break;case"max":Number(l)>Number(d[0])&&(m=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&fe[d[0]]){let f=fe[d[0]](l,e);f!==!0&&f&&(m=f)}break}m&&(r.push({rule:a,message:m}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[c,s]of jt)if(i[c]){let a=s||Tn(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function In(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Bn(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=Ze.indexOf(n.rule),s=Ze.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:In(e,o.rule,o.message)}}function It(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Pn(t,e,r,o,n){let i=It(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;et(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.__errorTemplateFor=o;let d=He({$error:e,$rule:r},n);a.__ctx=d,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Sn(a),Je(a)}function St(t){let e=It(t);e&&(et(e),e.remove())}function Fn(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Dt(r,e)}catch{return!0}}function Tt(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function $n(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),s=fe[i];if(s){let a=s(t,...c,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&fe[c[0]]){let a=fe[c[0]](t,r);if(a!==!0&&a)return a}break}}return null}function Rn(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return Qe(t);let e=He({},null);return t.__ctx=e,e}function Bt(t){fe=X(t,"validators")||{},Dt=t.evaluate,He=t.createContext,Qe=t.findContext,Je=t.processTree,kt=X(t,"cloneTemplate")||(()=>null),ze=X(t,"disposeChildren")||(()=>{}),et=X(t,"disposeTree")||ze,Ct=X(t,"warn")||console.warn;let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):Ct('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let m=function(){c&&typeof c.$notify=="function"&&c.$notify();let h=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;h.nextNode();){let _=h.currentNode.__ctx;_&&_!==c&&typeof _.$notify=="function"&&_.$notify()}},f=function(){return r.querySelectorAll("input, textarea, select")},g=function(){let h={},x={},_={},L=!0,k=null,j=0,S=!1;for(let w of f())w.name&&(w.type==="checkbox"?x[w.name]=w.checked:w.type==="radio"?w.checked?x[w.name]=w.value:w.name in x||(x[w.name]=""):x[w.name]=w.value);for(let w of f()){if(!w.name)continue;let B=a.has(w.name),H=d.has(w.name);if(!Fn(w,c)){_[w.name]={valid:!0,dirty:H,touched:B,error:null,value:x[w.name]};continue}let N=Dn(w,x),M=Bn(N,w),se=!M,T=Tt(w,r),F=T.includes("input"),q=T.includes("blur")||T.includes("focusout")||T.includes("submit"),P;!w.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?P=B||H:P=F&&H||q&&B,se||(L=!1),!se&&P&&(h[w.name]=M.message,j++,k||(k=M.message)),_[w.name]={valid:se,dirty:H,touched:B,error:M?M.message:null,value:x[w.name]};let R=w.getAttribute("error-class")||s;if(R){let z=R.split(/\s+/);!se&&P?w.classList.add(...z):w.classList.remove(...z)}if(M&&P){let z=w.getAttribute(`error-${M.rule}`),ee=w.getAttribute("error"),U=(z&&z.startsWith("#")?z:null)||(ee&&ee.startsWith("#")?ee:null);U?Pn(U,M.message,M.rule,w,c):St(w)}else St(w);let O=w.getAttribute("as");O&&c.$set(O,_[w.name])}u.size>0&&(S=!0),l.valid=L,l.errors=h,l.values=x,l.fields=_,l.firstError=k,l.errorCount=j,l.pending=S,c.$set("$form",{...l}),m(),v(r)},v=function(h){let x=l.valid&&!l.pending&&!l.submitting,_=h.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of _){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let k=L.getAttribute("disabled");if(k!=="disabled"&&k!=="true"&&k!=="false")continue}L.disabled=!x,L.__autoDisabled=!0}},y=function(h){if(!h.name)return;let x=Tt(h,r),_=()=>{d.add(h.name),l.dirty=!0,g()},L=()=>{a.add(h.name),l.touched=!0,g()};if(x.includes("input"))h.addEventListener("input",_),ne(r,()=>h.removeEventListener("input",_));else{let k=()=>{d.add(h.name),l.dirty=!0,g()};h.addEventListener("input",k),ne(r,()=>h.removeEventListener("input",k))}if(x.includes("blur")||x.includes("focusout")){let k=()=>{L(),x.includes("blur")&&_()};h.addEventListener("focusout",k),ne(r,()=>h.removeEventListener("focusout",k))}else h.addEventListener("focusout",L),ne(r,()=>h.removeEventListener("focusout",L));x.includes("submit")&&(h.addEventListener("focusout",L),ne(r,()=>h.removeEventListener("focusout",L)))},c=Rn(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,d=new Set,u=new Map,l={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{l.dirty=!1,l.touched=!1,l.pending=!1,l.submitting=!1,a.clear(),d.clear(),r.reset(),g()},endSubmit:()=>{l.submitting=!1,g()}};c.$set("$form",l);let p=r.hasAttribute("validate-on"),b=[...f()].some(h=>h.hasAttribute("validate-on"));if(!p&&!b){let h=_=>{let L=_.target;L&&L.name&&d.add(L.name),l.dirty=!0,g()};r.addEventListener("input",h),ne(r,()=>r.removeEventListener("input",h)),r.addEventListener("change",h),ne(r,()=>r.removeEventListener("change",h));let x=_=>{_.target&&_.target.name&&a.add(_.target.name),l.touched=!0,g()};r.addEventListener("focusout",x),ne(r,()=>r.removeEventListener("focusout",x))}else for(let h of f())y(h);let A=h=>{for(let x of f())x.name&&a.add(x.name);if(l.touched=!0,g(),!l.valid||l.pending){h.preventDefault(),h.stopImmediatePropagation();return}l.submitting=!0,v(r),c.$set("$form",{...l}),m()};r.addEventListener("submit",A,!0),ne(r,()=>r.removeEventListener("submit",A,!0)),r.__nojsResetSubmitting=()=>{l.submitting=!1,g()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(g);return}let i=Qe(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),s=()=>{let a=$n(r.value,n,{});if(a&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let u=kt(c);if(u){let l=He({err:{message:a}},i);ze(d),d.innerHTML="",d.__ctx=l,d.appendChild(u),Je(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(ze(d),d.innerHTML="")}};r.addEventListener("input",s),ne(r,()=>r.removeEventListener("input",s))}}})}function Pt(t,e={}){Bt(t)}function Ft(){}var ye=new Map,te=new Map;function $t(){let t=Array.from(ye.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of te.values())clearTimeout(e);te.clear();for(let e of ye.values())e.remove();ye.clear()}function Rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function qn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Oe=8;function Mt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+Oe,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-Oe;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+Oe;break;default:s=o.top-n.height-Oe,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Mn=0;function zn(t,e,r){document.body.appendChild(e),Mt(e,t,r),e.setAttribute("aria-hidden","false")}function qt(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Hn(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function zt(t){t.directive("tooltip",{priority:20,init(e,r,o){Rt();let n=o;if(!n){Hn(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),d=a?t.findContext(e):null,u=()=>{if(!a||!d)return!1;try{return!!t.evaluate(a,d)}catch{return!1}},l=`nojs-tooltip-${++Mn}`,m=document.createElement("div");m.className="nojs-tooltip",m.setAttribute("role","tooltip"),m.setAttribute("id",l),m.setAttribute("aria-hidden","true"),m.textContent=n,e.setAttribute("aria-describedby",l),ye.set(e,m);let f=!1,g=0,v=()=>{!f||!e.isConnected||g||(g=requestAnimationFrame(()=>{g=0,!(!f||!e.isConnected)&&Mt(m,e,i)}))},y=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},p=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),g&&(cancelAnimationFrame(g),g=0)},b=()=>{f||(zn(e,m,i),f=!0,y())},A=()=>{if(!f){qt(e,m);return}p(),qt(e,m),f=!1},h=()=>{if(u())return;te.has(e)&&clearTimeout(te.get(e));let B=setTimeout(()=>{te.delete(e),!u()&&e.isConnected&&b()},s);te.set(e,B)},x=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),A()},_=()=>h(),L=()=>x(),k=()=>h(),j=()=>x(),S=B=>{B.key==="Escape"&&m.getAttribute("aria-hidden")==="false"&&x()};e.addEventListener("mouseenter",_),e.addEventListener("mouseleave",L),e.addEventListener("focusin",k),e.addEventListener("focusout",j),e.addEventListener("keydown",S);let w=null;if(a&&d&&typeof d.$watch=="function"){let B=()=>{f&&u()&&A()};w=d.$watch(B)}qn(e,()=>{e.removeEventListener("mouseenter",_),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",k),e.removeEventListener("focusout",j),e.removeEventListener("keydown",S),w&&(w(),w=null),p(),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),f=!1,m.remove(),ye.delete(e)})}})}function Ht(t,e={}){zt(t)}function Ot(){$t()}var K=new Map;function Vt(){K.clear()}function Ve(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function tt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function xe(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var ce=8;function We(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-ce,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-ce;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+ce;break;default:s=o.bottom+ce,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-ce),r==="top"&&s<0&&(s=o.bottom+ce),r==="right"&&a+n.width>i&&(a=o.left-n.width-ce),r==="left"&&a<0&&(a=o.right+ce),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function rt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(typeof c.matches=="function"&&!c.matches(":popover-open")){i();return}We(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function ge(t){t&&t._untrack&&t._untrack()}function Wt(t){t.directive("popover",{priority:20,init(r,o,n){Ve();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!K.has(i))K.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=K.get(i);a.popoverEl=r,a.position=c}let s=a=>{let d=K.get(i);if(!d)return;let u=a.newState==="open";d.open=u;for(let l of d.triggerEls)l.setAttribute("aria-expanded",String(u));u||ge(d)};r.addEventListener("toggle",s),tt(r,()=>{r.removeEventListener("toggle",s);let a=K.get(i);a&&(ge(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&K.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){Ve();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,d=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),K.has(i)||K.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),K.get(i).triggerEls.add(r);let c=a=>{let d=K.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}xe(d.popoverEl)&&(d.popoverEl.togglePopover(),requestAnimationFrame(()=>{d.popoverEl.matches(":popover-open")?(We(d.popoverEl,r,d.position),rt(d,r)):ge(d)}))};r.addEventListener("click",c);let s=a=>{let d=K.get(i);a.key==="Escape"&&d?.open&&(xe(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),ge(d),r.focus())};document.addEventListener("keydown",s),tt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=K.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(ge(a),K.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){Ve();let o=()=>{let n=r.closest(".nojs-popover");!n||!xe(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),tt(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!xe(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{We(n.popoverEl,i,n.position),rt(n,i)}),!0},e.close=r=>{let o=K.get(r);if(!o||!o.popoverEl||!xe(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return ge(o),!0},e.toggle=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!xe(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{We(n.popoverEl,i,n.position),rt(n,i)}):ge(n),!0},t.popover=e}function Gt(t,e={}){Wt(t)}function Ut(){Vt()}var W=[],oe=new Map,On=1e4;function Yt(){return On+W.length}function Kt(){W.length=0,oe.clear()}function Ee(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Vn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Nt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',nt=new WeakMap;function Wn(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(Nt)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),nt.set(t,e)}function Xt(t){let e=nt.get(t);e&&(t.removeEventListener("keydown",e),nt.delete(t))}var Ce=new WeakMap;function Zt(t){t.directive("modal",{priority:10,init(r,o,n){Ee();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),u=m=>{m.target===r&&s!=="false"&&d!=="false"&&we(r,i)};r.addEventListener("click",u),oe.set(i,r);let l=m=>{if(m.newState==="open"){if(r.style.zIndex=String(Yt()),a&&a.split(/\s+/).filter(Boolean).forEach(f=>r.classList.add(f)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(g=>g.el===r))return;let f=r.querySelector(Nt);f?f.focus():r.focus()}),Wn(r),d!=="false"){let f=g=>{g.key==="Escape"&&(g.stopPropagation(),we(r,i))};r.addEventListener("keydown",f),Ce.set(r,f)}}else if(m.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),Xt(r);let f=Ce.get(r);f&&(r.removeEventListener("keydown",f),Ce.delete(r));let g=W.findIndex(v=>v.el===r);if(g===-1&&(g=W.findIndex(v=>v.id===i)),g!==-1){let v=W[g];W.splice(g,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",l),Vn(r,()=>{r.removeEventListener("click",u),r.removeEventListener("toggle",l),Xt(r);let m=Ce.get(r);m&&(r.removeEventListener("keydown",m),Ce.delete(r)),oe.delete(i);let f=W.findIndex(g=>g.el===r);f===-1&&(f=W.findIndex(g=>g.id===i)),f!==-1&&W.splice(f,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=oe.get(r);return o?(we(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)we(W[r].el,W[r].id)},t.modal=e}function we(t,e){try{t.hidePopover()}catch{}}function Qt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Gn(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function Jt(t){t.directive("modal-open",{priority:10,init(e,r,o){Ee();let n=o;if(!n){let l=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(l&&(n=l.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let u=oe.get(n)||Gn(n);if(!u){console.warn(`[modal-open] modal "${n}" not found`);return}let l=W.some(m=>m.id===n);u.id&&e.setAttribute("aria-controls",u.id);try{u.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}l||W.push({id:n,el:u,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,d=()=>{let u=oe.get(n);return u?(a=u,s=l=>{l.newState==="closed"&&e.setAttribute("aria-expanded","false")},u.addEventListener("toggle",s),!0):!1};if(!d()){let u=requestAnimationFrame(d);Qt(e,()=>cancelAnimationFrame(u))}e.addEventListener("click",i),Qt(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function Un(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function er(t){t.directive("modal-close",{priority:10,init(e,r,o){Ee();let n=()=>{let i,c;if(o){if(c=o,i=oe.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}we(i,c)};e.addEventListener("click",n),Un(e,()=>{e.removeEventListener("click",n)})}})}function tr(t,e={}){Zt(t),Jt(t),er(t)}function rr(){Kt()}var de={openMenus:new Map};function nr(){de.openMenus.clear()}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var Yn=0;function Kn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function or(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,d,u;switch(o){case"top":d=i.top-c.height,u=i.left;break;case"left":d=i.top,u=i.left-c.width;break;case"right":d=i.top,u=i.right;break;default:d=i.bottom,u=i.left}o==="bottom"||o==="top"?n==="end"&&(u=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>s&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=s&&(d=i.bottom),u<4&&(u=4),u+c.width>a-4&&(u=a-c.width-4),t.style.top=`${d}px`,t.style.left=`${u}px`}function it(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function ot(t){let e=it(t);e.length&&e[0].focus()}function ir(t){let e=it(t);e.length&&e[e.length-1].focus()}function sr(t){t.directive("dropdown",{priority:15,init(r){Ae()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ae();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Yn++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),or(n,r,o),de.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),de.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let u=p=>{p.newState==="closed"&&d()&&a()};n.addEventListener("toggle",u);let l=p=>{p.preventDefault(),p.stopPropagation(),d()?a():s()};r.addEventListener("click",l);let m=p=>{d()&&!o.contains(p.target)&&a()};document.addEventListener("click",m,!0);let f=p=>{p.key==="Escape"&&d()&&(a(),r.focus())};document.addEventListener("keydown",f);let g=p=>{switch(p.key){case"Enter":case" ":p.preventDefault(),s(),ot(n);break;case"ArrowDown":p.preventDefault(),s(),ot(n);break;case"ArrowUp":p.preventDefault(),s(),ir(n);break}};r.addEventListener("keydown",g);let v=p=>{if(!(!d()||it(n).find(h=>h===document.activeElement)))switch(p.key){case"ArrowDown":p.preventDefault(),ot(n);break;case"ArrowUp":p.preventDefault(),ir(n);break}};n.addEventListener("keydown",v);let y=()=>{d()&&or(n,r,o)};window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),Kn(r,()=>{r.removeEventListener("click",l),r.removeEventListener("keydown",g),n.removeEventListener("keydown",v),n.removeEventListener("toggle",u),document.removeEventListener("click",m,!0),document.removeEventListener("keydown",f),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),de.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){Ae(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function ar(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Xn(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function st(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),de.openMenus.has(t)&&de.openMenus.delete(t)}function cr(t){t.directive("dropdown-item",{priority:15,init(e){Ae();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=Xn(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),st(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{st(r,o);break}}};e.addEventListener("keydown",n),ar(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(st(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),ar(e,()=>e.removeEventListener("click",i))}})}function dr(t,e={}){sr(t),cr(t)}function lr(){nr()}var ie=new Map,_e=new Set,ur=0;function pr(){return++ur}function fr(){for(let t of _e)clearTimeout(t);_e.clear();for(let t of ie.values())t.remove();ie.clear(),ur=0}function gr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function at(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Nn=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function ct(){return ie.size>0?ie.values().next().value:Zn("top-right")}function Zn(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function Qn(t){return t.startsWith("top")}function dt(t,e,r,o,n){let i=pr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>Ge(s)),s.appendChild(d)}if(Qn(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let d=setTimeout(()=>{_e.delete(d),s.isConnected&&Ge(s)},o);_e.add(d),s._toastTimerId=d}return s}function Ge(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),_e.delete(t._toastTimerId)),t.remove())}function mr(t){gr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&Nn.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),at(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let g=()=>{let v=ct();dt(v,n,i,s,a)};r.addEventListener("click",g),at(r,()=>r.removeEventListener("click",g));return}let u=t.findContext(r);if(!u||typeof u.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let l;function m(){let g=t.evaluate(n,u);if(g&&g!==l){let v=typeof g=="string"?g:String(g),y=ct();dt(y,v,i,s,a),l=g}else l=g}let f=u.$watch(m);at(r,f)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=ct();return dt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&Ge(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Ge(r))},t.toast=e}function br(t,e={}){mr(t)}function hr(){fr()}var me={containers:new Map};function vr(){me.containers.clear()}function yr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function Jn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var eo=0;function xr(t){return`${t}-${++eo}`}function Se(t,e,r=!1){let o=me.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Te(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Er(t){t.directive("tabs",{priority:10,init(e,r,o){yr();let n=[],i=[];for(let p of Array.from(e.children))p.hasAttribute("tab")?n.push(p):p.hasAttribute("panel")&&i.push(p);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let p=0;p<a;p++){let b=n[p],A=i[p],h=b.id||xr("nojs-tab"),x=A.id||xr("nojs-panel");b.id=h,A.id=x,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",x),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),A.setAttribute("role","tabpanel"),A.setAttribute("aria-labelledby",h),A.setAttribute("tabindex","0"),A.setAttribute("aria-hidden","true"),A.inert=!0,A.classList.add("nojs-panel"),s.appendChild(b)}for(let p=a;p<i.length;p++){let b=i[p];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),me.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let u=t.findContext(e),l=[],m=(p,b)=>{let A=!1;try{A=!!t.evaluate(b,u)}catch{A=!1}A?p.setAttribute("aria-disabled","true"):p.removeAttribute("aria-disabled")};for(let p=0;p<a;p++){let b=n[p],A=b.getAttribute("tab-disabled");if(A&&(m(b,A),u&&typeof u.$watch=="function")){let h=u.$watch(()=>m(b,A));l.push(h)}}let f=0;if(o&&o.trim()!==""){let p=parseInt(o,10);!isNaN(p)&&p>=0&&p<a&&(f=p)}let g=n.slice(0,a);if(n[f]?.getAttribute("aria-disabled")==="true"){let p=Te(g,f,1);p!==-1?(f=p,Se(e,f)):Se(e,f,!0)}else Se(e,f);let v=p=>{let b=me.containers.get(e);if(!b)return;let A=p.target;if(A.getAttribute("role")!=="tab")return;let{tabs:h}=b,x=h.indexOf(A);if(x===-1)return;let _=-1;switch(p.key){case"ArrowRight":case"ArrowDown":_=Te(h,x,1);break;case"ArrowLeft":case"ArrowUp":_=Te(h,x,-1);break;case"Home":_=Te(h,h.length-1,1);break;case"End":_=Te(h,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==x&&(p.preventDefault(),Se(e,_),h[_].focus())};s.addEventListener("keydown",v);let y=p=>{let b=p.target.closest("[role='tab']");if(!b)return;let A=me.containers.get(e);if(!A)return;let h=A.tabs.indexOf(b);h!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Se(e,h),b.focus())};s.addEventListener("click",y),Jn(e,()=>{s.removeEventListener("keydown",v),s.removeEventListener("click",y);for(let p of l)p&&p();l.length=0,me.containers.delete(e)})}})}function wr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Ar(t){t.directive("panel",{priority:11,init(){}})}function _r(t,e={}){Er(t),wr(t),Ar(t)}function Lr(){vr()}var I={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function jr(){I.branches.clear(),I.selectedItem=null,I.typeahead="",I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null)}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function je(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function kr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Cr(t){return t.closest('[role="tree"]')}function to(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function ro(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function lt(t){let e=I.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),I.selectedItem=t}function Sr(t){let e=I.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function no(t){let e=I.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function oo(t){let e=I.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Tr(t,e){let r=Cr(e);if(!r)return;let o=kr(r),n=o.indexOf(e);if(n<0)return;let i=I.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)no(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&be(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)oo(e);else{let s=to(e);s&&be(s,kr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&be(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&be(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),lt(e),c&&Sr(e);break;case"Home":t.preventDefault(),o.length>0&&be(o[0],o);break;case"End":t.preventDefault(),o.length>0&&be(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),I.typeahead+=t.key.toLowerCase(),I.typeaheadTimer&&clearTimeout(I.typeaheadTimer),I.typeaheadTimer=setTimeout(()=>{I.typeahead="",I.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let d=(s+a)%o.length;if(ro(o[d]).startsWith(I.typeahead)){be(o[d],o);break}}}break}}function Dr(t){t.directive("tree",{priority:15,init(e){Le(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Ir(t){t.directive("branch",{priority:16,init(e,r,o){Le();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Cr(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(I.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):I.branches.set(e,{expanded:n,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),lt(e),Sr(e))};e.addEventListener("click",s),je(e,()=>e.removeEventListener("click",s));let a=d=>{Tr(d,e)};e.addEventListener("keydown",a),je(e,()=>e.removeEventListener("keydown",a)),je(e,()=>{c=!0,I.branches.delete(e),I.selectedItem===e&&(I.selectedItem=null),I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null,I.typeahead="")})}})}function be(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Br(t){t.directive("subtree",{priority:16,init(e){Le(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),lt(o)};o.addEventListener("click",n),je(o,()=>o.removeEventListener("click",n));let i=c=>{Tr(c,o)};o.addEventListener("keydown",i),je(o,()=>o.removeEventListener("keydown",i)),je(o,()=>{I.selectedItem===o&&(I.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=I.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Pr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ut(t){return t.closest('[role="treeitem"]')}function io(t){return t.closest('[role="tree"]')}function so(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function ao(t){return so(t).indexOf(t)}function co(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Fr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function ke(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function De(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function lo(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function uo(t,e){ke();let r=lo(),o=t.getBoundingClientRect(),n=io(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function $r(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(Le(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=m=>{let f=ut(m.target);if(f&&e.contains(f)){if(f.hasAttribute("tree-drag-disabled")){m.preventDefault();return}D.dragging={el:f,treeRoot:e},m.dataTransfer&&(m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain","")),f.classList.add("nojs-dragging"),f.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:f}}))}},c=m=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let f=ut(m.target);if(!f||!e.contains(f)||f===D.dragging.el||Fr(f,D.dragging.el))return;m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let g=co(f,m.clientY,o);(D.currentTarget!==f||D.currentPosition!==g)&&(De(e),ke(),D.currentTarget=f,D.currentPosition=g,g==="on"?f.classList.add("nojs-tree-drag-over"):uo(f,g))},s=m=>{D.dragging&&D.dragging.treeRoot===e&&n++},a=m=>{D.dragging&&(n--,n<=0&&(n=0,De(e),ke(),D.currentTarget=null,D.currentPosition=null))},d=m=>{if(m.preventDefault(),m.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let f=D.dragging.el,g=D.currentTarget,v=D.currentPosition;if(De(e),ke(),!g||!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(g===f||Fr(g,f)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="on"){let y=g.querySelector(':scope > [role="group"]');y||(y=g.nextElementSibling?.matches?.('[role="group"]')?g.nextElementSibling:null),y?y.setAttribute("aria-hidden","false"):(y=document.createElement("ul"),y.setAttribute("role","group"),y.setAttribute("subtree",""),y.classList.add("nojs-subtree","nojs-tree"),y.setAttribute("aria-hidden","false"),g.appendChild(y));let p=I.branches.get(g);p&&(p.expanded=!0,p.subtreeEl=y,g.setAttribute("aria-expanded","true")),y.appendChild(f),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:f,newParent:g}}))}else{let y=g.parentElement;if(!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="before")y.insertBefore(f,g);else{let b=g.nextElementSibling,A=b?.matches?.('[role="group"]')?b.nextElementSibling:b;A?y.insertBefore(f,A):y.appendChild(f)}let p=ao(f);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:f,newIndex:p}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},u=m=>{let f=ut(m.target);f&&f.classList.remove("nojs-dragging"),De(e),ke(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",d),e.addEventListener("dragend",u),Pr(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",d),e.removeEventListener("dragend",u),De(e),ke()}),po(e);let l=new MutationObserver(m=>{for(let f of m)for(let g of f.addedNodes){if(g.nodeType!==1)continue;g.getAttribute("role")==="treeitem"&&pt(g);let v=g.querySelectorAll?.('[role="treeitem"]');if(v)for(let y of v)pt(y)}});l.observe(e,{childList:!0,subtree:!0}),Pr(e,()=>l.disconnect())}})}function pt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function po(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)pt(r)}function Rr(t,e={}){Dr(t),Ir(t),Br(t),$r(t)}function qr(){jr()}var Ue=new Map;function Mr(){Ue.clear()}function Ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function zr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function Hr(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Or(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Ie(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Vr(t){t.directive("stepper",{priority:14,init(e,r,o){Ye();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",u=e.getAttribute("aria-label")||"Stepper",l=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",u),e.classList.add("nojs-stepper");let m=null,f=[];if(a){m=document.createElement("div"),m.className="nojs-stepper-indicator",m.setAttribute("role","tablist"),m.setAttribute("aria-label","Progress"),i.forEach((j,S)=>{if(S>0){let M=document.createElement("div");M.className="nojs-stepper-separator",M.setAttribute("aria-hidden","true"),m.appendChild(M)}let w=document.createElement("button");w.type="button",w.className="nojs-stepper-indicator-item",w.setAttribute("role","tab"),w.setAttribute("aria-selected",S===l?"true":"false");let B=j.getAttribute("step-label")||`Step ${S+1}`,H=document.createElement("span");H.textContent=B,w.appendChild(H),w.setAttribute("aria-label",B);let N=`nojs-stepper-tab-${fo++}`;if(w.id=N,s==="free"){w.setAttribute("data-clickable","");let M=()=>x(S);w.addEventListener("click",M),Ie(e,()=>w.removeEventListener("click",M))}else w.setAttribute("tabindex","-1");m.appendChild(w),f.push(w)});let k=j=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(j.key))return;j.preventDefault();let S=l;j.key==="ArrowRight"?S=Math.min(l+1,i.length-1):j.key==="ArrowLeft"?S=Math.max(l-1,0):j.key==="Home"?S=0:j.key==="End"&&(S=i.length-1),s==="free"?(x(S),f[S]?.focus()):f[l]?.focus()};m.addEventListener("keydown",k),Ie(e,()=>m.removeEventListener("keydown",k)),e.insertBefore(m,e.firstChild)}let g=null,v=null,y=null;if(d){g=document.createElement("div"),g.className="nojs-stepper-nav",g.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let k=()=>h();v.addEventListener("click",k),Ie(e,()=>v.removeEventListener("click",k)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let j=()=>A();y.addEventListener("click",j),Ie(e,()=>y.removeEventListener("click",j)),g.appendChild(v),g.appendChild(y),e.appendChild(g)}function p(k){let j=i[k];if(!j)return!0;if(!zr(j,t.findContext)){let B=j.querySelector("form[validate]");return B&&(Hr(B),f[k]&&f[k].classList.add("nojs-step-invalid"),Or(e,j,B)),!1}f[k]&&f[k].classList.remove("nojs-step-invalid");let S=j.querySelectorAll("[required]");for(let B of S)if(typeof B.checkValidity=="function"&&!B.checkValidity())return B.reportValidity(),!1;let w=j.getAttribute("step-validate");if(w)try{if(!t.evaluate(w,n))return!1}catch(B){return console.warn(`[stepper] step-validate error: ${B.message}`),!1}return!0}function b(k){i.forEach((j,S)=>{let w=S===l;j.setAttribute("aria-hidden",w?"false":"true"),w?(j.removeAttribute("inert"),j.setAttribute("aria-current","step")):(j.setAttribute("inert",""),j.removeAttribute("aria-current"))}),f.length&&f.forEach((j,S)=>{j.setAttribute("aria-selected",S===l?"true":"false"),S<l?j.setAttribute("data-completed",""):j.removeAttribute("data-completed"),j.setAttribute("tabindex",S===l?"0":"-1");let w=i[S];w.id&&(j.setAttribute("aria-controls",w.id),w.setAttribute("aria-labelledby",j.id))}),v&&(v.disabled=l===0),y&&(y.textContent=l===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!k,detail:{current:l,total:i.length}}))}function A(){return l>=i.length-1?(s==="linear"&&!p(l)||e.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:l,total:i.length}})),!1):s==="linear"&&!p(l)?!1:(l++,b(),L(),!0)}function h(){return l<=0?!1:(l--,b(),L(),!0)}function x(k){if(k<0||k>=i.length||k===l)return!1;if(s==="linear"&&k>l){for(let j=l;j<k;j++)if(l=j,b(),!p(j))return L(),!1}return l=k,b(),L(),!0}let _={get current(){return l},get total(){return i.length},next:A,prev:h,goTo:x,get isFirst(){return l===0},get isLast(){return l===i.length-1}};function L(){n.$stepper=_}L(),Ue.set(e,{get current(){return l},steps:i,mode:s,indicatorEl:m,navEl:g}),b(!0),Ie(e,()=>{Ue.delete(e),m&&m.parentNode&&m.remove(),g&&g.parentNode&&g.remove(),delete n.$stepper})}})}var fo=0;var go=0;function Wr(t){t.directive("step",{priority:13,init(e,r,o){Ye(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${go++}`),e.setAttribute("tabindex","0")}})}function Gr(t,e={}){Wr(t),Vr(t)}function Ur(){Mr()}function Yr(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Kr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Xr(t){t.directive("skeleton",{priority:10,init(e,r,o){Yr();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function d(p){u();for(let b=0;b<p;b++){let A=document.createElement("div");A.className="nojs-skeleton-line",e.appendChild(A),a.push(A)}}function u(){for(let p of a)p.parentNode===e&&e.removeChild(p);a=[]}function l(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let p=s+(String(s).match(/\d$/)?"px":"");e.style.width=p,e.style.height=p}if(c){let p=parseInt(c,10);p>0&&d(p)}e.setAttribute("aria-busy","true")}let m=null;function f(){m&&m(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),u(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let p=!1,b=null,A=()=>{p||(p=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",A),b!==null&&clearTimeout(b),m=null)};e.addEventListener("transitionend",A),b=setTimeout(A,0),m=()=>{e.removeEventListener("transitionend",A),b!==null&&clearTimeout(b),p=!0,m=null}}let g=!1;function v(){let p=!!t.evaluate(o,n);p&&!g?(g=!0,l()):!p&&g&&(g=!1,f())}v();let y=n.$watch(v);Kr(e,y),Kr(e,()=>{m&&m(),g&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),u(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function Nr(t,e={}){Xr(t)}var he=new Map,G=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Zr(){he.clear(),G.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function mo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qr(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function Jr(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function bo(t,e){let o=(he.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function ho(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Be(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Xe(t,e,r,o){let n=Z(e,o),i=Z(r,o),c=G.get(e),s=G.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function ft(t){let e=t.getAttribute("split-persist");if(!e)return;let r=he.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function vo(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=he.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function yo(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=f=>{if(f.button!==0)return;f.preventDefault();let g=bo(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=f[Qr(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=g,C.sign=Jr(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(f.pointerId)},s=f=>{if(!C.active||C.gutterEl!==i)return;let g=(f[Qr(C.direction)]-C.startPos)*(C.sign||1),v=Be(C.startPrevSize+g,C.prevPane),y=Be(C.startNextSize-g,C.nextPane),p=C.startPrevSize+C.startNextSize;v+y!==p&&(v!==C.startPrevSize+g?y=p-v:v=p-y),C.prevPane.style.flexBasis=`${v}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${y}px`,C.nextPane.style.flexGrow="0",Xe(i,C.prevPane,C.nextPane,C.direction)},a=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",ft(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let d=10,u=f=>{let g=e==="horizontal",v=Jr(t,e),y=0;if(g&&f.key==="ArrowRight"||!g&&f.key==="ArrowDown")y=d*v;else if(g&&f.key==="ArrowLeft"||!g&&f.key==="ArrowUp")y=-d*v;else if(f.key==="Home")y=(G.get(r)?.min||0)-Z(r,e);else if(f.key==="End"){let _=G.get(o);y=Z(r,e)+Z(o,e)-(_?.min||0)-Z(r,e)}else return;f.preventDefault();let p=Z(r,e),b=Z(o,e),A=p+b,h=Be(p+y,r),x=Be(A-h,o);h=A-x,h=Be(h,r),x=A-h,r.style.flexBasis=`${h}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Xe(i,r,o,e),ft(t)};i.addEventListener("keydown",u);let l=()=>{let f=G.get(r),g=G.get(o),v=f?.collapsible?r:g?.collapsible?o:null;if(!v)return;let y=G.get(v);if(!y)return;let p=v===r?o:r,b=Z(r,e)+Z(o,e);if(y.collapsed){y.collapsed=!1,v.removeAttribute("data-collapsed");let A=y.preCollapseSize||`${Math.round(b/2)}px`,h=ho(A,b)??b/2,x=Math.min(h,b);v.style.flexBasis=`${x}px`,v.style.flexGrow="0",p.style.flexBasis=`${b-x}px`,p.style.flexGrow="0"}else y.preCollapseSize=v.style.flexBasis||`${Z(v,e)}px`,y.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",p.style.flexBasis=`${b}px`,p.style.flexGrow="0";Xe(i,r,o,e),ft(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",l),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",u),i.removeEventListener("dblclick",l)}}}function en(t){t.directive("split",{priority:14,init(e,r,o){Ke();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(u=>u.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(u=>{G.get(u)||G.set(u,{size:u.getAttribute("pane")||null,min:parseInt(u.getAttribute("pane-min"),10)||0,max:parseInt(u.getAttribute("pane-max"),10)||1/0,collapsible:u.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let u=0;u<c.length-1;u++){let{gutter:l,cleanup:m}=yo(e,n,c[u],c[u+1],i);c[u].after(l),s.push(l),a.push(m)}he.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),vo(e)||c.forEach(u=>{let m=G.get(u)?.size;m?(u.style.flexBasis=m,u.style.flexGrow="0"):(u.style.flexGrow="1",u.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((u,l)=>{Xe(u,c[l],c[l+1],n)})}),mo(e,()=>{a.forEach(u=>u()),s.forEach(u=>u.remove()),he.delete(e),c.forEach(u=>G.delete(u)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function xo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function tn(t){t.directive("pane",{priority:15,init(e,r,o){Ke(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),xo(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function rn(t,e={}){en(t),tn(t)}function nn(){Zr()}var le={sorts:new Map};function on(){le.sorts.clear()}function ve(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Eo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function wo(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?o=r:o=r.querySelector("[each]")||r.querySelector("[foreach]"),!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Ao(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function sn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function an(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function dn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return an(Number(t),Number(e));case"date":return an(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function _o(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function ln(t){t.directive("sortable",{priority:10,init(e){ve(),e.classList.add("nojs-sortable")}})}function un(t){t.directive("sort",{priority:11,init(e,r,o){ve();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;le.sorts.has(s)||le.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(le.sorts.get(s).column||cn(e,s,n,i,c,t));let a=()=>{let d=le.sorts.get(s),u;d.column!==n?u="asc":d.direction==="asc"?u="desc":d.direction==="desc"?u=null:u="asc",cn(e,s,n,i,u,t)};e.addEventListener("click",a),Eo(e,()=>{e.removeEventListener("click",a),s&&!s.isConnected&&(le.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function cn(t,e,r,o,n,i){let c=le.sorts.get(e);_o(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=wo(e,i);if(s){let a=i.findContext(e),d=a?Ao(a,s.arrayPath):null;if(Array.isArray(d)){if(!n){let l=e._nojsOriginalOrder;if(l){let m=new Set(d),f=l.filter(g=>m.has(g));for(let g of d)l.includes(g)||f.push(g);sn(a,s.arrayPath,f)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let u=[...d].sort((l,m)=>{let f=l!=null?l[r]:null,g=m!=null?m[r]:null,v=dn(f,g,o);return n==="desc"?-v:v});sn(a,s.arrayPath,u);return}}Lo(e,t,r,o,n)}function Lo(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let m=document.createDocumentFragment();for(let f of t._nojsOriginalRows)m.appendChild(f);i.appendChild(m);return}let u=m=>{let f=m.replace(/[^0-9.\-]/g,"");return f===""||f==="-"?NaN:parseFloat(f)};d.sort((m,f)=>{let g=m.children[a]?.textContent?.trim()||"",v=f.children[a]?.textContent?.trim()||"",y=dn(o==="number"?u(g):g,o==="number"?u(v):v,o);return n==="desc"?-y:y});let l=document.createDocumentFragment();for(let m of d)l.appendChild(m);i.appendChild(l)}function pn(t){t.directive("fixed-header",{priority:10,init(e){ve(),e.classList.add("nojs-fixed-header")}})}function fn(t){t.directive("fixed-col",{priority:10,init(e){ve(),e.classList.add("nojs-fixed-col")}})}function gt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function gn(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function mn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function bn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function hn(t){t.directive("table-reorder",{priority:15,init(e){if(ve(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,d=null;function u(){let y=r.querySelectorAll(":scope > tr");for(let p=0;p<y.length;p++){let b=y[p];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let A=!0;if(n){let j=S=>{A=!!S.target.closest(n)};b.addEventListener("mousedown",j),gt(b,()=>b.removeEventListener("mousedown",j))}let h=j=>{if(n&&!A){j.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(b),a=b,j.dataTransfer&&(j.dataTransfer.effectAllowed="move",j.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(w=>b.classList.add(w)),b.setAttribute("aria-grabbed","true")},x=j=>{if(a==null)return;j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),w=S.top+S.height/2,H=[...r.querySelectorAll(":scope > tr")].indexOf(b);l(),H!==s&&(j.clientY<w?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),d=b)},_=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),d===b&&(d=null)},L=j=>{if(j.preventDefault(),j.stopPropagation(),a==null||s==null)return;let S=[...r.querySelectorAll(":scope > tr")],w=b.getBoundingClientRect(),B=w.top+w.height/2,H=S.indexOf(b);j.clientY>=B&&H++;let N=s;if(N===H||N+1===H){m();return}let M=N<H?H-1:H,se=gn(e);if(se&&o){let T=mn(o,se.arrayPath);if(Array.isArray(T)){let F=[...T],[q]=F.splice(N,1);F.splice(M,0,q),bn(o,se.arrayPath,F),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...F]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:N,to:M,item:q}}))}}else{let T=a,F=S[M];T&&F&&(N<M?r.insertBefore(T,F.nextSibling):r.insertBefore(T,F),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:N,to:M,item:null}})))}m()},k=()=>{m()};b.addEventListener("dragstart",h),b.addEventListener("dragover",x),b.addEventListener("dragleave",_),b.addEventListener("drop",L),b.addEventListener("dragend",k),gt(b,()=>{b.removeEventListener("dragstart",h),b.removeEventListener("dragover",x),b.removeEventListener("dragleave",_),b.removeEventListener("drop",L),b.removeEventListener("dragend",k),b._nojsReorderSetup=!1})}}function l(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function m(){a&&(i.split(/\s+/).filter(Boolean).forEach(p=>a.classList.remove(p)),a.setAttribute("aria-grabbed","false")),l(),s=null,a=null;let y=r.querySelectorAll(":scope > tr");for(let p of y)p.classList.remove("nojs-reorder-insert-before"),p.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(b=>p.classList.remove(b))}let f=y=>{a!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},g=y=>{if(a==null||y.target!==r)return;y.preventDefault(),y.stopPropagation();let p=s,A=[...r.querySelectorAll(":scope > tr")].length-1;if(p===A){m();return}let h=gn(e);if(h&&o){let x=mn(o,h.arrayPath);if(Array.isArray(x)){let _=[...x],[L]=_.splice(p,1);_.push(L),bn(o,h.arrayPath,_),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[..._]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:p,to:_.length-1,item:L}}))}}m()};r.addEventListener("dragover",f),r.addEventListener("drop",g);let v=new MutationObserver(()=>{u()});v.observe(r,{childList:!0}),u(),gt(e,()=>{v.disconnect(),r.removeEventListener("dragover",f),r.removeEventListener("drop",g),m()})}})}function vn(t,e={}){ln(t),un(t),pn(t),fn(t),hn(t)}function yn(){on()}var ue={containers:new Map};function xn(){for(let[,t]of ue.containers)typeof t.unsub=="function"&&t.unsub();ue.containers.clear()}function En(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function wn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function jo(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function ko(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function An(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=c.label,s.appendChild(d)}else{let d=document.createElement("a");d.href=c.href,d.textContent=c.label,s.appendChild(d)}o.appendChild(s)}t.appendChild(o);let n=ue.containers.get(t);n&&(n.crumbs=e)}function Co(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=jo(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function So(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=ko(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function _n(t){t.directive("breadcrumb",{priority:15,init(e,r,o){En(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(ue.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,d=a?a.path:"/",u=So(d);An(e,u)};if(s(),typeof i.on=="function"){let a=i.on(s),d=ue.containers.get(e);d&&(d.unsub=a),wn(e,()=>{typeof a=="function"&&a();let u=ue.containers.get(e);u&&(u.unsub=null)})}}else{let s=Co(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");An(e,s)}wn(e,()=>{ue.containers.delete(e)})}})}function Ln(t,e={}){_n(t)}function jn(){xn()}var To="[validate],[drag],[drop],[drag-list],[drag-multiple]";function kn(t){if(typeof document>"u")return;let e=document.querySelectorAll(To);for(let r of e){if(!r.__declared)continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Do=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb"],Io={name:"nojs-elements",install(t,e={}){_t(t,e),Pt(t,e),Ht(t,e),Gt(t,e),tr(t,e),dr(t,e),br(t,e),_r(t,e),Rr(t,e),Gr(t,e),Nr(t,e),rn(t,e),vn(t,e),Ln(t,e),kn(t)},init(t){if(kn(t),typeof document>"u"||!document.body)return;let e=Do.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Lt(),Ft(),Ot(),Ut(),rr(),lr(),hr(),Lr(),qr(),Ur(),nn(),yn(),jn()}},mt=Io;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(mt),t=!0,!0):!1};window.NoJSElements=mt;let t=!1;if(!e()){let r=0,o=100,n=setInterval(()=>{(e()||++r>=o)&&clearInterval(n)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(n)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
