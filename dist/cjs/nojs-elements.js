/**
 * NoJS Elements v1.13.3 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
var tt=Object.defineProperty;var Hn=Object.getOwnPropertyDescriptor;var Mn=Object.getOwnPropertyNames;var On=Object.prototype.hasOwnProperty;var Vn=(t,e)=>{for(var r in e)tt(t,r,{get:e[r],enumerable:!0})},Wn=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Mn(e))!On.call(t,n)&&n!==r&&tt(t,n,{get:()=>e[n],enumerable:!(o=Hn(e,n))||o.enumerable});return t};var Un=t=>Wn(tt({},"__esModule",{value:!0}),t);var ti={};Vn(ti,{default:()=>ei});module.exports=Un(ti);var E={dragging:null,selected:new Map,placeholder:null},Pe=new Map;function wt(){E.dragging=null,E.selected.clear(),E.placeholder&&(E.placeholder.remove(),E.placeholder=null),Pe.clear()}function Re(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function He(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $e(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=$e(r):e++}return e}function ze(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,l=s.top+s.height/2;if(r<l&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function At(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",E.dragging&&E.dragging.sourceEl){let s=(E.dragging.sourceEl.firstElementChild||E.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),E.placeholder=n}function re(){E.placeholder&&(E.placeholder.remove(),E.placeholder=null)}function pe(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function Gn(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let f=a-1;f>=0;f--){let d=document.createElement("div"),m=f*4;if(d.style.cssText="position:absolute;top:"+m+"px;left:"+m+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",f===0){let p=o.cloneNode(!0);for(;p.firstChild;)d.appendChild(p.firstChild);d.style.background=s.backgroundColor||"#fff",d.style.border=s.border,d.style.padding=s.padding,d.style.fontSize=s.fontSize,d.style.color=s.color,d.style.fontFamily=s.fontFamily}else d.style.background=s.backgroundColor||"#fff",d.style.border=s.border||"1px solid #ddd";r.appendChild(d)}let l=document.createElement("div");return l.textContent=e,l.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(l),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}function _t(t){He(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Re();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",c=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),a=e.getAttribute("drag-image"),l=e.getAttribute("drag-image-offset")||"0,0",f=e.getAttribute("drag-disabled"),d=e.getAttribute("drag-class")||"nojs-dragging",m=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let p=!0;if(s){let u=b=>{p=!!b.target.closest(s)};e.addEventListener("mousedown",u),ae(e,()=>e.removeEventListener("mousedown",u))}let g=u=>{if(s&&!p){u.preventDefault();return}if(f&&t.evaluate(f,n)){u.preventDefault();return}let b=t.evaluate(o,n),A=e.getAttribute("drag-group"),h=b;if(A&&E.selected.has(A)){let x=E.selected.get(A);x.size>0&&[...x].some(k=>k.el===e)&&(h=[...x].map(k=>k.item))}if(E.dragging={item:h,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},u.dataTransfer){if(u.dataTransfer.effectAllowed=c,u.dataTransfer.setData("text/plain",""),Array.isArray(h)&&h.length>1&&u.dataTransfer.setDragImage){let x=Gn(e,h.length);document.body.appendChild(x);let _=e.getBoundingClientRect();u.dataTransfer.setDragImage(x,_.width/2,_.height/2),requestAnimationFrame(()=>x.remove())}else if(a&&u.dataTransfer.setDragImage)if(a==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[_,k]=l.split(",").map(Number);u.dataTransfer.setDragImage(x,_||0,k||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(a);if(x){let[_,k]=l.split(",").map(Number);m&&x.classList.add(m),u.dataTransfer.setDragImage(x,_||0,k||0)}}}if(d.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(h)&&A&&E.selected.has(A))for(let x of E.selected.get(A))x.el!==e&&d.split(/\s+/).filter(Boolean).forEach(_=>x.el.classList.add(_));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:h,index:E.dragging.sourceIndex,el:e}}))},v=()=>{d.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let u=e.getAttribute("drag-group");if(u&&E.selected.has(u))for(let b of E.selected.get(u))d.split(/\s+/).filter(Boolean).forEach(A=>b.el.classList.remove(A));if(e.setAttribute("aria-grabbed","false"),m&&a&&a!=="none"){let b=e.querySelector(a);b&&b.classList.remove(m)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:E.dragging?.item,index:E.dragging?.sourceIndex,dropped:E.dragging===null}})),E.dragging=null,re()};if(e.addEventListener("dragstart",g),e.addEventListener("dragend",v),ae(e,()=>{e.removeEventListener("dragstart",g),e.removeEventListener("dragend",v)}),f){let u=function(){let A=!!t.evaluate(f,n);e.draggable=!A,A?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},b=n.$watch(u);ae(e,b)}let y=u=>{if(E.dragging&&!E.dragging.sourceEl.isConnected&&(E.dragging=null),u.key===" "&&!E.dragging){u.preventDefault();let b=t.evaluate(o,n);E.dragging={item:b,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},d.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else u.key==="Escape"&&E.dragging&&E.dragging.sourceEl===e&&(u.preventDefault(),d.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),e.setAttribute("aria-grabbed","false"),E.dragging=null,re())};e.addEventListener("keydown",y),ae(e,()=>e.removeEventListener("keydown",y))}})}function kt(t){He(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Re();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",c=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",a=e.getAttribute("drop-reject-class")||"nojs-drop-reject",l=e.getAttribute("drop-disabled"),f=e.getAttribute("drop-max"),d=e.getAttribute("drop-sort"),m=e.getAttribute("drop-placeholder"),p=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",c);let g=0,v=h=>{if(!E.dragging||l&&t.evaluate(l,n))return;let x=pe(E.dragging.type,i),_=!0;if(f){let k=t.evaluate(f,n),j=$e(e);typeof k=="number"&&j>=k&&(_=!1)}if(!x||!_){a.split(/\s+/).filter(Boolean).forEach(k=>e.classList.add(k)),s.split(/\s+/).filter(Boolean).forEach(k=>e.classList.remove(k)),re();return}if(a.split(/\s+/).filter(Boolean).forEach(k=>e.classList.remove(k)),h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect=c),d){let k=ze(e,h.clientX,h.clientY,d);m&&At(e,k,m,p),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:E.dragging.item,index:k}}))}},y=h=>{if(E.dragging&&!(l&&t.evaluate(l,n))&&(g++,g===1)){let x=pe(E.dragging.type,i),_=!0;if(f){let k=t.evaluate(f,n),j=$e(e);typeof k=="number"&&j>=k&&(_=!1)}x&&_?(s.split(/\s+/).filter(Boolean).forEach(k=>e.classList.add(k)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):a.split(/\s+/).filter(Boolean).forEach(k=>e.classList.add(k))}},u=h=>{E.dragging&&(g--,g<=0&&(g=0,s.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),a.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging.item}}))))},b=h=>{if(h.preventDefault(),h.stopPropagation(),g=0,!E.dragging||l&&t.evaluate(l,n)||!pe(E.dragging.type,i))return;if(f){let w=t.evaluate(f,n),B=$e(e);if(typeof w=="number"&&B>=w)return}let x=E.dragging.item,_=E.dragging.type,k=E.dragging.effect,j=0;d&&(j=ze(e,h.clientX,h.clientY,d)),s.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),a.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),re();let L={$drag:x,$dragType:_,$dragEffect:k,$dropIndex:j,$source:{list:E.dragging.sourceList,index:E.dragging.sourceIndex,el:E.dragging.sourceEl},$target:{list:null,index:j,el:e},$el:e},S=X(t,"execStatement");typeof S=="function"?S(o,n,L):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),E.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:x,index:j,source:L.$source,target:L.$target,effect:k}}))},A=h=>{E.dragging&&(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b(h))};e.addEventListener("dragover",v),e.addEventListener("dragenter",y),e.addEventListener("dragleave",u),e.addEventListener("drop",b),e.addEventListener("keydown",A),ae(e,()=>{e.removeEventListener("dragover",v),e.removeEventListener("dragenter",y),e.removeEventListener("dragleave",u),e.removeEventListener("drop",b),e.removeEventListener("keydown",A)})}})}function Lt(t){He(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Re();let n=t.findContext(e),i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",l=e.getAttribute("drag-type")||"__draglist_"+o,f=e.getAttribute("drop-accept")||l,d=e.hasAttribute("drag-list-copy"),m=e.hasAttribute("drag-list-remove"),p=e.getAttribute("drag-disabled"),g=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),y=e.getAttribute("drop-placeholder"),u=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",A=e.getAttribute("drop-class")||"nojs-drag-over",h=e.getAttribute("drop-reject-class")||"nojs-drop-reject",x=e.getAttribute("drop-settle-class")||"nojs-drop-settle",_=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",d?"copy":"move");let k={listPath:o,ctx:n,el:e};Pe.set(e,k),ae(e,()=>Pe.delete(e));let j=0,L=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===L&&T.length>0&&e.children.length>0){for(let O of e.children)O.__ctx&&O.__ctx.$notify&&O.__ctx.$notify();return}L=T;let q=i?document.getElementById(i):null;if(!q)return;let $=X(t,"disposeChildren");typeof $=="function"&&$(e),e.innerHTML="";let F=T.length;T.forEach((O,H)=>{let ee={[s]:O,$index:H,$count:F,$first:H===0,$last:H===F-1,$even:H%2===0,$odd:H%2!==0},G=t.createContext(ee,n),Q=q.content.cloneNode(!0),P=document.createElement("div");P.style.display="contents",P.__ctx=G,P.appendChild(Q),e.appendChild(P);let Y=P.firstElementChild||P;Y.draggable=!0,Y.setAttribute("role","option"),Y.setAttribute("aria-grabbed","false"),Y.getAttribute("tabindex")||Y.setAttribute("tabindex","0");let qe=V=>{if(p&&t.evaluate(p,n)){V.preventDefault();return}E.dragging={item:O,type:l,effect:d?"copy":"move",sourceEl:P,sourceCtx:G,sourceList:T,sourceIndex:H,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:d,removeMode:m}},V.dataTransfer&&(V.dataTransfer.effectAllowed=d?"copy":"move",V.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:O,index:H,el:Y}}))},xt=()=>{b.split(/\s+/).filter(Boolean).forEach(V=>Y.classList.remove(V)),Y.setAttribute("aria-grabbed","false"),E.dragging&&E.dragging.sourceEl===P&&(E.dragging=null),re()};P.addEventListener("dragstart",qe),P.addEventListener("dragend",xt);let Et=V=>{if(V.key===" "&&!E.dragging)V.preventDefault(),V.stopPropagation(),E.dragging={item:O,type:l,effect:d?"copy":"move",sourceEl:P,sourceCtx:G,sourceList:T,sourceIndex:H,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:d,removeMode:m}},b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true");else if(V.key==="Escape"&&E.dragging){V.preventDefault(),V.stopPropagation();let J=e.querySelector('[aria-grabbed="true"]')||Y;b.split(/\s+/).filter(Boolean).forEach(et=>J.classList.remove(et)),J.setAttribute("aria-grabbed","false"),E.dragging=null,re()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&E.dragging&&E.dragging.sourceEl===P){V.preventDefault();let J=P.nextElementSibling;J&&(J.firstElementChild||J).focus()}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&E.dragging&&E.dragging.sourceEl===P){V.preventDefault();let J=P.previousElementSibling;J&&(J.firstElementChild||J).focus()}};P.addEventListener("keydown",Et),P.__disposers=P.__disposers||[],P.__disposers.push(()=>P.removeEventListener("dragstart",qe),()=>P.removeEventListener("dragend",xt),()=>P.removeEventListener("keydown",Et)),t.processTree(P)});let R=T.length===0;_.split(/\s+/).filter(Boolean).forEach(O=>e.classList.toggle(O,R))}let w=T=>{if(!E.dragging||g&&t.evaluate(g,n))return;let q=pe(E.dragging.type,f),$=!0;if(v){let R=t.evaluate(v,n),O=t.resolve(o,n);typeof R=="number"&&Array.isArray(O)&&O.length>=R&&($=!1)}if(!q||!$){h.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),A.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),re();return}h.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=d?"copy":"move");let F=ze(e,T.clientX,T.clientY,a);y&&At(e,F,y,u)},B=T=>{if(E.dragging&&!(g&&t.evaluate(g,n))&&(j++,j===1)){let q=pe(E.dragging.type,f),$=!0;if(v){let F=t.evaluate(v,n),R=t.resolve(o,n);typeof F=="number"&&Array.isArray(R)&&R.length>=F&&($=!1)}q&&$?(A.split(/\s+/).filter(Boolean).forEach(F=>e.classList.add(F)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):h.split(/\s+/).filter(Boolean).forEach(F=>e.classList.add(F))}},M=()=>{E.dragging&&(j--,j<=0&&(j=0,A.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),h.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging?.item}}))))},N=T=>{if(T.preventDefault(),T.stopPropagation(),j=0,!E.dragging||g&&t.evaluate(g,n)||!pe(E.dragging.type,f))return;if(v){let G=t.evaluate(v,n),Q=t.resolve(o,n);if(typeof G=="number"&&Array.isArray(Q)&&Q.length>=G)return}let q=E.dragging.item,$=E.dragging.listDirective,F=E.dragging.sourceIndex,R=ze(e,T.clientX,T.clientY,a);A.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),h.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),re();let O=t.resolve(o,n);if(!Array.isArray(O))return;let H=$&&$.el===e;if(H&&F===R){E.dragging=null;return}if(H&&F+1===R){E.dragging=null;return}let ee=[...O];if(H){let[G]=ee.splice(F,1),Q=F<R?R-1:R;ee.splice(Q,0,G),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:q,from:F,to:Q}}))}else{let G=d&&typeof q=="object"?{...q}:q;if(ee.splice(R,0,G),n.$set(o,ee),$&&!$.copyMode&&(m||$.removeMode)){let Q=t.resolve($.listPath,$.ctx);if(Array.isArray(Q)&&F!=null){let P=Q.filter((Y,qe)=>qe!==F);$.ctx.$set($.listPath,P),$.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:P,item:q,index:F}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:q,from:F,fromList:$?t.resolve($.listPath,$.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][H&&F<R?R-1:R];if(Q){let P=Q.firstElementChild||Q;x.split(/\s+/).filter(Boolean).forEach(Y=>P.classList.add(Y)),P.addEventListener("animationend",()=>{x.split(/\s+/).filter(Boolean).forEach(Y=>P.classList.remove(Y))},{once:!0})}}),E.dragging=null},z=T=>{if(E.dragging&&pe(E.dragging.type,f)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let q=e.querySelector(":focus");if(q){let F=(q.style?.display==="contents"&&q.firstElementChild||q).getBoundingClientRect(),R={preventDefault(){},stopPropagation(){},clientX:F.left+F.width/2,clientY:F.top+F.height+1,dataTransfer:null};N(R)}}};e.addEventListener("dragover",w),e.addEventListener("dragenter",B),e.addEventListener("dragleave",M),e.addEventListener("drop",N),e.addEventListener("keydown",z),ae(e,()=>{e.removeEventListener("dragover",w),e.removeEventListener("dragenter",B),e.removeEventListener("dragleave",M),e.removeEventListener("drop",N),e.removeEventListener("keydown",z)});let se=n.$watch(S);ae(e,se),S()}})}function jt(t){He(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}E.selected.has(n)||E.selected.set(n,new Set);let c=E.selected.get(n),s=l=>{let f=e.getAttribute("drag"),m={item:f?t.evaluate(f,o):null,el:e,ctx:o};if(l.ctrlKey||l.metaKey){let p=[...c].find(g=>g.el===e);p?(c.delete(p),i.split(/\s+/).filter(Boolean).forEach(g=>e.classList.remove(g))):(c.add(m),i.split(/\s+/).filter(Boolean).forEach(g=>e.classList.add(g)))}else{for(let p of c)i.split(/\s+/).filter(Boolean).forEach(g=>p.el.classList.remove(g));c.clear(),c.add(m),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p))}};e.addEventListener("click",s),ae(e,()=>{e.removeEventListener("click",s);let l=[...c].find(f=>f.el===e);l&&c.delete(l)});let a=l=>{if(l.key==="Escape"){for(let f of c)i.split(/\s+/).filter(Boolean).forEach(d=>f.el.classList.remove(d));c.clear()}};window.addEventListener("keydown",a),ae(e,()=>window.removeEventListener("keydown",a))}})}function Ct(t,e={}){_t(t),kt(t),Lt(t),jt(t)}function St(){wt()}var Tt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],rt=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var fe,qt,Oe,nt,ot,Dt,Me,it,It;function Yn(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function Kn(t){return(t.getAttribute("type")||"text").toLowerCase()}function Xn(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(s=>s.trim());for(let s of c){let[a,...l]=s.split(":"),f=fe[a];if(f){let d=f(t.value,...l,e);d!==!0&&d&&(r.push({rule:a,message:d}),o.add(a))}else{let d=t.value,m=null;switch(a){case"required":(d==null||String(d).trim()==="")&&(m="Required");break;case"email":d&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d)&&(m="Invalid email");break;case"url":try{new URL(d)}catch{m="Invalid URL"}break;case"min":Number(d)<Number(l[0])&&(m=`Minimum value is ${l[0]}`);break;case"max":Number(d)>Number(l[0])&&(m=`Maximum value is ${l[0]}`);break;case"custom":if(l[0]&&fe[l[0]]){let p=fe[l[0]](d,e);p!==!0&&p&&(m=p)}break}m&&(r.push({rule:a,message:m}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[c,s]of Tt)if(i[c]){let a=s||Kn(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function Nn(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Zn(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=rt.indexOf(n.rule),s=rt.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:Nn(e,o.rule,o.message)}}function Pt(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Qn(t,e,r,o,n){let i=Pt(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;it(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.__errorTemplateFor=o;let l=Oe({$error:e,$rule:r},n);a.__ctx=l,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Yn(a),ot(a)}function Bt(t){let e=Pt(t);e&&(it(e),e.remove())}function Jn(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!qt(r,e)}catch{return!0}}function Ft(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function eo(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),s=fe[i];if(s){let a=s(t,...c,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&fe[c[0]]){let a=fe[c[0]](t,r);if(a!==!0&&a)return a}break}}return null}function to(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return nt(t);let e=Oe({},null);return t.__ctx=e,e}function Rt(t){fe=X(t,"validators")||{},qt=t.evaluate,Oe=t.createContext,nt=t.findContext,ot=t.processTree,Dt=X(t,"cloneTemplate")||(()=>null),Me=X(t,"disposeChildren")||(()=>{}),it=X(t,"disposeTree")||Me,It=X(t,"warn")||console.warn;let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):It('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let m=function(){c&&typeof c.$notify=="function"&&c.$notify();let h=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;h.nextNode();){let _=h.currentNode.__ctx;_&&_!==c&&typeof _.$notify=="function"&&_.$notify()}},p=function(){return r.querySelectorAll("input, textarea, select")},g=function(){let h={},x={},_={},k=!0,j=null,L=0,S=!1;for(let w of p())w.name&&(w.type==="checkbox"?x[w.name]=w.checked:w.type==="radio"?w.checked?x[w.name]=w.value:w.name in x||(x[w.name]=""):x[w.name]=w.value);for(let w of p()){if(!w.name)continue;let B=a.has(w.name),M=l.has(w.name);if(!Jn(w,c)){_[w.name]={valid:!0,dirty:M,touched:B,error:null,value:x[w.name]};continue}let N=Xn(w,x),z=Zn(N,w),se=!z,T=Ft(w,r),q=T.includes("input"),$=T.includes("blur")||T.includes("focusout")||T.includes("submit"),F;!w.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?F=B||M:F=q&&M||$&&B,se||(k=!1),!se&&F&&(h[w.name]=z.message,L++,j||(j=z.message)),_[w.name]={valid:se,dirty:M,touched:B,error:z?z.message:null,value:x[w.name]};let R=w.getAttribute("error-class")||s;if(R){let H=R.split(/\s+/);!se&&F?w.classList.add(...H):w.classList.remove(...H)}if(z&&F){let H=w.getAttribute(`error-${z.rule}`),ee=w.getAttribute("error"),G=(H&&H.startsWith("#")?H:null)||(ee&&ee.startsWith("#")?ee:null);G?Qn(G,z.message,z.rule,w,c):Bt(w)}else Bt(w);let O=w.getAttribute("as");O&&c.$set(O,_[w.name])}f.size>0&&(S=!0),d.valid=k,d.errors=h,d.values=x,d.fields=_,d.firstError=j,d.errorCount=L,d.pending=S,c.$set("$form",{...d}),m(),v(r)},v=function(h){let x=d.valid&&!d.pending&&!d.submitting,_=h.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let k of _){if(k.hasAttribute("disabled")&&k.getAttribute("disabled")!==""){let j=k.getAttribute("disabled");if(j!=="disabled"&&j!=="true"&&j!=="false")continue}k.disabled=!x,k.__autoDisabled=!0}},y=function(h){if(!h.name)return;let x=Ft(h,r),_=()=>{l.add(h.name),d.dirty=!0,g()},k=()=>{a.add(h.name),d.touched=!0,g()};if(x.includes("input"))h.addEventListener("input",_),ne(r,()=>h.removeEventListener("input",_));else{let j=()=>{l.add(h.name),d.dirty=!0,g()};h.addEventListener("input",j),ne(r,()=>h.removeEventListener("input",j))}if(x.includes("blur")||x.includes("focusout")){let j=()=>{k(),x.includes("blur")&&_()};h.addEventListener("focusout",j),ne(r,()=>h.removeEventListener("focusout",j))}else h.addEventListener("focusout",k),ne(r,()=>h.removeEventListener("focusout",k));x.includes("submit")&&(h.addEventListener("focusout",k),ne(r,()=>h.removeEventListener("focusout",k)))},c=to(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,l=new Set,f=new Map,d={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{d.dirty=!1,d.touched=!1,d.pending=!1,d.submitting=!1,a.clear(),l.clear(),r.reset(),g()},endSubmit:()=>{d.submitting=!1,g()}};c.$set("$form",d);let u=r.hasAttribute("validate-on"),b=[...p()].some(h=>h.hasAttribute("validate-on"));if(!u&&!b){let h=_=>{let k=_.target;k&&k.name&&l.add(k.name),d.dirty=!0,g()};r.addEventListener("input",h),ne(r,()=>r.removeEventListener("input",h)),r.addEventListener("change",h),ne(r,()=>r.removeEventListener("change",h));let x=_=>{_.target&&_.target.name&&a.add(_.target.name),d.touched=!0,g()};r.addEventListener("focusout",x),ne(r,()=>r.removeEventListener("focusout",x))}else for(let h of p())y(h);let A=h=>{for(let x of p())x.name&&a.add(x.name);if(d.touched=!0,g(),!d.valid||d.pending){h.preventDefault(),h.stopImmediatePropagation();return}d.submitting=!0,v(r),c.$set("$form",{...d}),m()};r.addEventListener("submit",A,!0),ne(r,()=>r.removeEventListener("submit",A,!0)),r.__nojsResetSubmitting=()=>{d.submitting=!1,g()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(g);return}let i=nt(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),s=()=>{let a=eo(r.value,n,{});if(a&&c){let l=r.nextElementSibling?.__validationError?r.nextElementSibling:null;l||(l=document.createElement("div"),l.__validationError=!0,l.style.display="contents",r.parentNode.insertBefore(l,r.nextSibling));let f=Dt(c);if(f){let d=Oe({err:{message:a}},i);Me(l),l.innerHTML="",l.__ctx=d,l.appendChild(f),ot(l)}}else{let l=r.nextElementSibling?.__validationError?r.nextElementSibling:null;l&&(Me(l),l.innerHTML="")}};r.addEventListener("input",s),ne(r,()=>r.removeEventListener("input",s))}}})}function $t(t,e={}){Rt(t)}function zt(){}var ye=new Map,te=new Map;function Ht(){let t=Array.from(ye.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of te.values())clearTimeout(e);te.clear();for(let e of ye.values())e.remove();ye.clear()}function Mt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function ro(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ve=8;function Vt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+Ve,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-Ve;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+Ve;break;default:s=o.top-n.height-Ve,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var no=0;function oo(t,e,r){document.body.appendChild(e),Vt(e,t,r),e.setAttribute("aria-hidden","false")}function Ot(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function io(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Wt(t){t.directive("tooltip",{priority:20,init(e,r,o){Mt();let n=o;if(!n){io(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),l=a?t.findContext(e):null,f=()=>{if(!a||!l)return!1;try{return!!t.evaluate(a,l)}catch{return!1}},d=`nojs-tooltip-${++no}`,m=document.createElement("div");m.className="nojs-tooltip",m.setAttribute("role","tooltip"),m.setAttribute("id",d),m.setAttribute("aria-hidden","true"),m.textContent=n,e.setAttribute("aria-describedby",d),ye.set(e,m);let p=!1,g=0,v=()=>{!p||!e.isConnected||g||(g=requestAnimationFrame(()=>{g=0,!(!p||!e.isConnected)&&Vt(m,e,i)}))},y=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},u=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),g&&(cancelAnimationFrame(g),g=0)},b=()=>{p||(oo(e,m,i),p=!0,y())},A=()=>{if(!p){Ot(e,m);return}u(),Ot(e,m),p=!1},h=()=>{if(f())return;te.has(e)&&clearTimeout(te.get(e));let B=setTimeout(()=>{te.delete(e),!f()&&e.isConnected&&b()},s);te.set(e,B)},x=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),A()},_=()=>h(),k=()=>x(),j=()=>h(),L=()=>x(),S=B=>{B.key==="Escape"&&m.getAttribute("aria-hidden")==="false"&&x()};e.addEventListener("mouseenter",_),e.addEventListener("mouseleave",k),e.addEventListener("focusin",j),e.addEventListener("focusout",L),e.addEventListener("keydown",S);let w=null;if(a&&l&&typeof l.$watch=="function"){let B=()=>{p&&f()&&A()};w=l.$watch(B)}ro(e,()=>{e.removeEventListener("mouseenter",_),e.removeEventListener("mouseleave",k),e.removeEventListener("focusin",j),e.removeEventListener("focusout",L),e.removeEventListener("keydown",S),w&&(w(),w=null),u(),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),p=!1,m.remove(),ye.delete(e)})}})}function Ut(t,e={}){Wt(t)}function Gt(){Ht()}var K=new Map;function Yt(){K.clear()}function We(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function st(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function xe(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var ce=8;function Ue(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-ce,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-ce;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+ce;break;default:s=o.bottom+ce,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-ce),r==="top"&&s<0&&(s=o.bottom+ce),r==="right"&&a+n.width>i&&(a=o.left-n.width-ce),r==="left"&&a<0&&(a=o.right+ce),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function at(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(typeof c.matches=="function"&&!c.matches(":popover-open")){i();return}Ue(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function ge(t){t&&t._untrack&&t._untrack()}function Kt(t){t.directive("popover",{priority:20,init(r,o,n){We();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!K.has(i))K.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=K.get(i);a.popoverEl=r,a.position=c}let s=a=>{let l=K.get(i);if(!l)return;let f=a.newState==="open";l.open=f;for(let d of l.triggerEls)d.setAttribute("aria-expanded",String(f));f||ge(l)};r.addEventListener("toggle",s),st(r,()=>{r.removeEventListener("toggle",s);let a=K.get(i);a&&(ge(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&K.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){We();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,l=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(l&&(i=l.getAttribute("data-popover-id")||l.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),K.has(i)||K.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),K.get(i).triggerEls.add(r);let c=a=>{let l=K.get(i);if(!l||!l.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}xe(l.popoverEl)&&(l.popoverEl.togglePopover(),requestAnimationFrame(()=>{l.popoverEl.matches(":popover-open")?(Ue(l.popoverEl,r,l.position),at(l,r)):ge(l)}))};r.addEventListener("click",c);let s=a=>{let l=K.get(i);a.key==="Escape"&&l?.open&&(xe(l.popoverEl,"hidePopover")&&l.popoverEl.hidePopover(),ge(l),r.focus())};document.addEventListener("keydown",s),st(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=K.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(ge(a),K.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){We();let o=()=>{let n=r.closest(".nojs-popover");!n||!xe(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),st(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!xe(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{Ue(n.popoverEl,i,n.position),at(n,i)}),!0},e.close=r=>{let o=K.get(r);if(!o||!o.popoverEl||!xe(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return ge(o),!0},e.toggle=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!xe(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{Ue(n.popoverEl,i,n.position),at(n,i)}):ge(n),!0},t.popover=e}function Xt(t,e={}){Kt(t)}function Nt(){Yt()}var W=[],oe=new Map,so=1e4;function Zt(){return so+W.length}function Qt(){W.length=0,oe.clear()}function Ee(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function ao(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var er='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',ct=new WeakMap;function co(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(er)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),ct.set(t,e)}function Jt(t){let e=ct.get(t);e&&(t.removeEventListener("keydown",e),ct.delete(t))}var Se=new WeakMap;function tr(t){t.directive("modal",{priority:10,init(r,o,n){Ee();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),l=r.getAttribute("modal-escape"),f=m=>{m.target===r&&s!=="false"&&l!=="false"&&we(r,i)};r.addEventListener("click",f),oe.set(i,r);let d=m=>{if(m.newState==="open"){if(r.style.zIndex=String(Zt()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(g=>g.el===r))return;let p=r.querySelector(er);p?p.focus():r.focus()}),co(r),l!=="false"){let p=g=>{g.key==="Escape"&&(g.stopPropagation(),we(r,i))};r.addEventListener("keydown",p),Se.set(r,p)}}else if(m.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),Jt(r);let p=Se.get(r);p&&(r.removeEventListener("keydown",p),Se.delete(r));let g=W.findIndex(v=>v.el===r);if(g===-1&&(g=W.findIndex(v=>v.id===i)),g!==-1){let v=W[g];W.splice(g,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",d),ao(r,()=>{r.removeEventListener("click",f),r.removeEventListener("toggle",d),Jt(r);let m=Se.get(r);m&&(r.removeEventListener("keydown",m),Se.delete(r)),oe.delete(i);let p=W.findIndex(g=>g.el===r);p===-1&&(p=W.findIndex(g=>g.id===i)),p!==-1&&W.splice(p,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=oe.get(r);return o?(we(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)we(W[r].el,W[r].id)},t.modal=e}function we(t,e){try{t.hidePopover()}catch{}}function rr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function lo(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function nr(t){t.directive("modal-open",{priority:10,init(e,r,o){Ee();let n=o;if(!n){let d=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(d&&(n=d.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let f=oe.get(n)||lo(n);if(!f){console.warn(`[modal-open] modal "${n}" not found`);return}let d=W.some(m=>m.id===n);f.id&&e.setAttribute("aria-controls",f.id);try{f.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}d||W.push({id:n,el:f,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,l=()=>{let f=oe.get(n);return f?(a=f,s=d=>{d.newState==="closed"&&e.setAttribute("aria-expanded","false")},f.addEventListener("toggle",s),!0):!1};if(!l()){let f=requestAnimationFrame(l);rr(e,()=>cancelAnimationFrame(f))}e.addEventListener("click",i),rr(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function uo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function or(t){t.directive("modal-close",{priority:10,init(e,r,o){Ee();let n=()=>{let i,c;if(o){if(c=o,i=oe.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}we(i,c)};e.addEventListener("click",n),uo(e,()=>{e.removeEventListener("click",n)})}})}function ir(t,e={}){tr(t),nr(t),or(t)}function sr(){Qt()}var de={openMenus:new Map};function ar(){de.openMenus.clear()}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var po=0;function fo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function cr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,l,f;switch(o){case"top":l=i.top-c.height,f=i.left;break;case"left":l=i.top,f=i.left-c.width;break;case"right":l=i.top,f=i.right;break;default:l=i.bottom,f=i.left}o==="bottom"||o==="top"?n==="end"&&(f=i.right-c.width):n==="end"&&(l=i.bottom-c.height),o==="bottom"&&l+c.height>s&&i.top-c.height>0?l=i.top-c.height:o==="top"&&l<0&&i.bottom+c.height<=s&&(l=i.bottom),f<4&&(f=4),f+c.width>a-4&&(f=a-c.width-4),t.style.top=`${l}px`,t.style.left=`${f}px`}function lt(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function dt(t){let e=lt(t);e.length&&e[0].focus()}function dr(t){let e=lt(t);e.length&&e[e.length-1].focus()}function lr(t){t.directive("dropdown",{priority:15,init(r){Ae()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ae();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${po++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),cr(n,r,o),de.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),de.openMenus.delete(n)}function l(){return r.getAttribute("aria-expanded")==="true"}let f=u=>{u.newState==="closed"&&l()&&a()};n.addEventListener("toggle",f);let d=u=>{u.preventDefault(),u.stopPropagation(),l()?a():s()};r.addEventListener("click",d);let m=u=>{l()&&!o.contains(u.target)&&a()};document.addEventListener("click",m,!0);let p=u=>{u.key==="Escape"&&l()&&(a(),r.focus())};document.addEventListener("keydown",p);let g=u=>{switch(u.key){case"Enter":case" ":u.preventDefault(),s(),dt(n);break;case"ArrowDown":u.preventDefault(),s(),dt(n);break;case"ArrowUp":u.preventDefault(),s(),dr(n);break}};r.addEventListener("keydown",g);let v=u=>{if(!(!l()||lt(n).find(h=>h===document.activeElement)))switch(u.key){case"ArrowDown":u.preventDefault(),dt(n);break;case"ArrowUp":u.preventDefault(),dr(n);break}};n.addEventListener("keydown",v);let y=()=>{l()&&cr(n,r,o)};window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),fo(r,()=>{r.removeEventListener("click",d),r.removeEventListener("keydown",g),n.removeEventListener("keydown",v),n.removeEventListener("toggle",f),document.removeEventListener("click",m,!0),document.removeEventListener("keydown",p),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),de.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){Ae(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function ur(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function go(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function ut(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),de.openMenus.has(t)&&de.openMenus.delete(t)}function pr(t){t.directive("dropdown-item",{priority:15,init(e){Ae();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=go(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),ut(r,o),o){let l=o.querySelector("[dropdown-toggle]");l&&l.focus()}break}case"Tab":{ut(r,o);break}}};e.addEventListener("keydown",n),ur(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(ut(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),ur(e,()=>e.removeEventListener("click",i))}})}function fr(t,e={}){lr(t),pr(t)}function gr(){ar()}var ie=new Map,_e=new Set,mr=0;function br(){return++mr}function hr(){for(let t of _e)clearTimeout(t);_e.clear();for(let t of ie.values())t.remove();ie.clear(),mr=0}function vr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function pt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var mo=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function ft(){return ie.size>0?ie.values().next().value:bo("top-right")}function bo(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function ho(t){return t.startsWith("top")}function gt(t,e,r,o,n){let i=br(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let l=document.createElement("button");l.type="button",l.classList.add("nojs-toast-dismiss"),l.setAttribute("aria-label","Dismiss"),l.textContent="\xD7",l.addEventListener("click",()=>Ge(s)),s.appendChild(l)}if(ho(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let l=setTimeout(()=>{_e.delete(l),s.isConnected&&Ge(s)},o);_e.add(l),s._toastTimerId=l}return s}function Ge(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),_e.delete(t._toastTimerId)),t.remove())}function yr(t){vr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&mo.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),pt(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let g=()=>{let v=ft();gt(v,n,i,s,a)};r.addEventListener("click",g),pt(r,()=>r.removeEventListener("click",g));return}let f=t.findContext(r);if(!f||typeof f.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let d;function m(){let g=t.evaluate(n,f);if(g&&g!==d){let v=typeof g=="string"?g:String(g),y=ft();gt(y,v,i,s,a),d=g}else d=g}let p=f.$watch(m);pt(r,p)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=ft();return gt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&Ge(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Ge(r))},t.toast=e}function xr(t,e={}){yr(t)}function Er(){hr()}var me={containers:new Map};function wr(){me.containers.clear()}function Ar(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function vo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var yo=0;function _r(t){return`${t}-${++yo}`}function Te(t,e,r=!1){let o=me.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function De(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function kr(t){t.directive("tabs",{priority:10,init(e,r,o){Ar();let n=[],i=[];for(let u of Array.from(e.children))u.hasAttribute("tab")?n.push(u):u.hasAttribute("panel")&&i.push(u);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let u=0;u<a;u++){let b=n[u],A=i[u],h=b.id||_r("nojs-tab"),x=A.id||_r("nojs-panel");b.id=h,A.id=x,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",x),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),A.setAttribute("role","tabpanel"),A.setAttribute("aria-labelledby",h),A.setAttribute("tabindex","0"),A.setAttribute("aria-hidden","true"),A.inert=!0,A.classList.add("nojs-panel"),s.appendChild(b)}for(let u=a;u<i.length;u++){let b=i[u];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let l=i[0];l?e.insertBefore(s,l):e.appendChild(s),me.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let f=t.findContext(e),d=[],m=(u,b)=>{let A=!1;try{A=!!t.evaluate(b,f)}catch{A=!1}A?u.setAttribute("aria-disabled","true"):u.removeAttribute("aria-disabled")};for(let u=0;u<a;u++){let b=n[u],A=b.getAttribute("tab-disabled");if(A&&(m(b,A),f&&typeof f.$watch=="function")){let h=f.$watch(()=>m(b,A));d.push(h)}}let p=0;if(o&&o.trim()!==""){let u=parseInt(o,10);!isNaN(u)&&u>=0&&u<a&&(p=u)}let g=n.slice(0,a);if(n[p]?.getAttribute("aria-disabled")==="true"){let u=De(g,p,1);u!==-1?(p=u,Te(e,p)):Te(e,p,!0)}else Te(e,p);let v=u=>{let b=me.containers.get(e);if(!b)return;let A=u.target;if(A.getAttribute("role")!=="tab")return;let{tabs:h}=b,x=h.indexOf(A);if(x===-1)return;let _=-1;switch(u.key){case"ArrowRight":case"ArrowDown":_=De(h,x,1);break;case"ArrowLeft":case"ArrowUp":_=De(h,x,-1);break;case"Home":_=De(h,h.length-1,1);break;case"End":_=De(h,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==x&&(u.preventDefault(),Te(e,_),h[_].focus())};s.addEventListener("keydown",v);let y=u=>{let b=u.target.closest("[role='tab']");if(!b)return;let A=me.containers.get(e);if(!A)return;let h=A.tabs.indexOf(b);h!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Te(e,h),b.focus())};s.addEventListener("click",y),vo(e,()=>{s.removeEventListener("keydown",v),s.removeEventListener("click",y);for(let u of d)u&&u();d.length=0,me.containers.delete(e)})}})}function Lr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function jr(t){t.directive("panel",{priority:11,init(){}})}function Cr(t,e={}){kr(t),Lr(t),jr(t)}function Sr(){wr()}var I={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Tr(){I.branches.clear(),I.selectedItem=null,I.typeahead="",I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null)}function ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function Le(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Dr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Ir(t){return t.closest('[role="tree"]')}function xo(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function Eo(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function mt(t){let e=I.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),I.selectedItem=t}function Br(t){let e=I.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function wo(t){let e=I.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function Ao(t){let e=I.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Fr(t,e){let r=Ir(e);if(!r)return;let o=Dr(r),n=o.indexOf(e);if(n<0)return;let i=I.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)wo(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&be(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)Ao(e);else{let s=xo(e);s&&be(s,Dr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&be(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&be(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),mt(e),c&&Br(e);break;case"Home":t.preventDefault(),o.length>0&&be(o[0],o);break;case"End":t.preventDefault(),o.length>0&&be(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),I.typeahead+=t.key.toLowerCase(),I.typeaheadTimer&&clearTimeout(I.typeaheadTimer),I.typeaheadTimer=setTimeout(()=>{I.typeahead="",I.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let l=(s+a)%o.length;if(Eo(o[l]).startsWith(I.typeahead)){be(o[l],o);break}}}break}}function qr(t){t.directive("tree",{priority:15,init(e){ke(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Pr(t){t.directive("branch",{priority:16,init(e,r,o){ke();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Ir(e);if(i){let l=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",l?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let l=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);l?(I.branches.set(e,{expanded:n,subtreeEl:l}),l.setAttribute("aria-hidden",String(!n))):I.branches.set(e,{expanded:n,subtreeEl:null})});let s=l=>{l.target.closest?.('[role="treeitem"]')===e&&(l.stopPropagation(),mt(e),Br(e))};e.addEventListener("click",s),Le(e,()=>e.removeEventListener("click",s));let a=l=>{Fr(l,e)};e.addEventListener("keydown",a),Le(e,()=>e.removeEventListener("keydown",a)),Le(e,()=>{c=!0,I.branches.delete(e),I.selectedItem===e&&(I.selectedItem=null),I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null,I.typeahead="")})}})}function be(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Rr(t){t.directive("subtree",{priority:16,init(e){ke(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),mt(o)};o.addEventListener("click",n),Le(o,()=>o.removeEventListener("click",n));let i=c=>{Fr(c,o)};o.addEventListener("keydown",i),Le(o,()=>o.removeEventListener("keydown",i)),Le(o,()=>{I.selectedItem===o&&(I.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=I.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function $r(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function bt(t){return t.closest('[role="treeitem"]')}function _o(t){return t.closest('[role="tree"]')}function ko(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Lo(t){return ko(t).indexOf(t)}function jo(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function zr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function je(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function Ie(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function Co(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function So(t,e){je();let r=Co(),o=t.getBoundingClientRect(),n=_o(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function Hr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(ke(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=m=>{let p=bt(m.target);if(p&&e.contains(p)){if(p.hasAttribute("tree-drag-disabled")){m.preventDefault();return}D.dragging={el:p,treeRoot:e},m.dataTransfer&&(m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain","")),p.classList.add("nojs-dragging"),p.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:p}}))}},c=m=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let p=bt(m.target);if(!p||!e.contains(p)||p===D.dragging.el||zr(p,D.dragging.el))return;m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let g=jo(p,m.clientY,o);(D.currentTarget!==p||D.currentPosition!==g)&&(Ie(e),je(),D.currentTarget=p,D.currentPosition=g,g==="on"?p.classList.add("nojs-tree-drag-over"):So(p,g))},s=m=>{D.dragging&&D.dragging.treeRoot===e&&n++},a=m=>{D.dragging&&(n--,n<=0&&(n=0,Ie(e),je(),D.currentTarget=null,D.currentPosition=null))},l=m=>{if(m.preventDefault(),m.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let p=D.dragging.el,g=D.currentTarget,v=D.currentPosition;if(Ie(e),je(),!g||!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(g===p||zr(g,p)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="on"){let y=g.querySelector(':scope > [role="group"]');y||(y=g.nextElementSibling?.matches?.('[role="group"]')?g.nextElementSibling:null),y?y.setAttribute("aria-hidden","false"):(y=document.createElement("ul"),y.setAttribute("role","group"),y.setAttribute("subtree",""),y.classList.add("nojs-subtree","nojs-tree"),y.setAttribute("aria-hidden","false"),g.appendChild(y));let u=I.branches.get(g);u&&(u.expanded=!0,u.subtreeEl=y,g.setAttribute("aria-expanded","true")),y.appendChild(p),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:p,newParent:g}}))}else{let y=g.parentElement;if(!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="before")y.insertBefore(p,g);else{let b=g.nextElementSibling,A=b?.matches?.('[role="group"]')?b.nextElementSibling:b;A?y.insertBefore(p,A):y.appendChild(p)}let u=Lo(p);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:p,newIndex:u}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},f=m=>{let p=bt(m.target);p&&p.classList.remove("nojs-dragging"),Ie(e),je(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",l),e.addEventListener("dragend",f),$r(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",l),e.removeEventListener("dragend",f),Ie(e),je()}),To(e);let d=new MutationObserver(m=>{for(let p of m)for(let g of p.addedNodes){if(g.nodeType!==1)continue;g.getAttribute("role")==="treeitem"&&ht(g);let v=g.querySelectorAll?.('[role="treeitem"]');if(v)for(let y of v)ht(y)}});d.observe(e,{childList:!0,subtree:!0}),$r(e,()=>d.disconnect())}})}function ht(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function To(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)ht(r)}function Mr(t,e={}){qr(t),Pr(t),Rr(t),Hr(t)}function Or(){Tr()}var Ye=new Map;function Vr(){Ye.clear()}function Ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Wr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function Ur(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Gr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Be(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Yr(t){t.directive("stepper",{priority:14,init(e,r,o){Ke();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",l=e.getAttribute("stepper-nav")!=="false",f=e.getAttribute("aria-label")||"Stepper",d=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",f),e.classList.add("nojs-stepper");let m=null,p=[];if(a){m=document.createElement("div"),m.className="nojs-stepper-indicator",m.setAttribute("role","tablist"),m.setAttribute("aria-label","Progress"),i.forEach((L,S)=>{if(S>0){let z=document.createElement("div");z.className="nojs-stepper-separator",z.setAttribute("aria-hidden","true"),m.appendChild(z)}let w=document.createElement("button");w.type="button",w.className="nojs-stepper-indicator-item",w.setAttribute("role","tab"),w.setAttribute("aria-selected",S===d?"true":"false");let B=L.getAttribute("step-label")||`Step ${S+1}`,M=document.createElement("span");M.textContent=B,w.appendChild(M),w.setAttribute("aria-label",B);let N=`nojs-stepper-tab-${Do++}`;if(w.id=N,s==="free"){w.setAttribute("data-clickable","");let z=()=>x(S);w.addEventListener("click",z),Be(e,()=>w.removeEventListener("click",z))}else w.setAttribute("tabindex","-1");m.appendChild(w),p.push(w)});let j=L=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(L.key))return;L.preventDefault();let S=d;L.key==="ArrowRight"?S=Math.min(d+1,i.length-1):L.key==="ArrowLeft"?S=Math.max(d-1,0):L.key==="Home"?S=0:L.key==="End"&&(S=i.length-1),s==="free"?(x(S),p[S]?.focus()):p[d]?.focus()};m.addEventListener("keydown",j),Be(e,()=>m.removeEventListener("keydown",j)),e.insertBefore(m,e.firstChild)}let g=null,v=null,y=null;if(l){g=document.createElement("div"),g.className="nojs-stepper-nav",g.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let j=()=>h();v.addEventListener("click",j),Be(e,()=>v.removeEventListener("click",j)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let L=()=>A();y.addEventListener("click",L),Be(e,()=>y.removeEventListener("click",L)),g.appendChild(v),g.appendChild(y),e.appendChild(g)}function u(j){let L=i[j];if(!L)return!0;if(!Wr(L,t.findContext)){let B=L.querySelector("form[validate]");return B&&(Ur(B),p[j]&&p[j].classList.add("nojs-step-invalid"),Gr(e,L,B)),!1}p[j]&&p[j].classList.remove("nojs-step-invalid");let S=L.querySelectorAll("[required]");for(let B of S)if(typeof B.checkValidity=="function"&&!B.checkValidity())return B.reportValidity(),!1;let w=L.getAttribute("step-validate");if(w)try{if(!t.evaluate(w,n))return!1}catch(B){return console.warn(`[stepper] step-validate error: ${B.message}`),!1}return!0}function b(j){i.forEach((L,S)=>{let w=S===d;L.setAttribute("aria-hidden",w?"false":"true"),w?(L.removeAttribute("inert"),L.setAttribute("aria-current","step")):(L.setAttribute("inert",""),L.removeAttribute("aria-current"))}),p.length&&p.forEach((L,S)=>{L.setAttribute("aria-selected",S===d?"true":"false"),S<d?L.setAttribute("data-completed",""):L.removeAttribute("data-completed"),L.setAttribute("tabindex",S===d?"0":"-1");let w=i[S];w.id&&(L.setAttribute("aria-controls",w.id),w.setAttribute("aria-labelledby",L.id))}),v&&(v.disabled=d===0),y&&(y.textContent=d===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!j,detail:{current:d,total:i.length}}))}function A(){return d>=i.length-1?(s==="linear"&&!u(d)||e.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:d,total:i.length}})),!1):s==="linear"&&!u(d)?!1:(d++,b(),k(),!0)}function h(){return d<=0?!1:(d--,b(),k(),!0)}function x(j){if(j<0||j>=i.length||j===d)return!1;if(s==="linear"&&j>d){for(let L=d;L<j;L++)if(d=L,b(),!u(L))return k(),!1}return d=j,b(),k(),!0}let _={get current(){return d},get total(){return i.length},next:A,prev:h,goTo:x,get isFirst(){return d===0},get isLast(){return d===i.length-1}};function k(){n.$stepper=_}k(),Ye.set(e,{get current(){return d},steps:i,mode:s,indicatorEl:m,navEl:g}),b(!0),Be(e,()=>{Ye.delete(e),m&&m.parentNode&&m.remove(),g&&g.parentNode&&g.remove(),delete n.$stepper})}})}var Do=0;var Io=0;function Kr(t){t.directive("step",{priority:13,init(e,r,o){Ke(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Io++}`),e.setAttribute("tabindex","0")}})}function Xr(t,e={}){Kr(t),Yr(t)}function Nr(){Vr()}function Zr(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Qr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Jr(t){t.directive("skeleton",{priority:10,init(e,r,o){Zr();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function l(u){f();for(let b=0;b<u;b++){let A=document.createElement("div");A.className="nojs-skeleton-line",e.appendChild(A),a.push(A)}}function f(){for(let u of a)u.parentNode===e&&e.removeChild(u);a=[]}function d(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let u=s+(String(s).match(/\d$/)?"px":"");e.style.width=u,e.style.height=u}if(c){let u=parseInt(c,10);u>0&&l(u)}e.setAttribute("aria-busy","true")}let m=null;function p(){m&&m(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let u=!1,b=null,A=()=>{u||(u=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",A),b!==null&&clearTimeout(b),m=null)};e.addEventListener("transitionend",A),b=setTimeout(A,0),m=()=>{e.removeEventListener("transitionend",A),b!==null&&clearTimeout(b),u=!0,m=null}}let g=!1;function v(){let u=!!t.evaluate(o,n);u&&!g?(g=!0,d()):!u&&g&&(g=!1,p())}v();let y=n.$watch(v);Qr(e,y),Qr(e,()=>{m&&m(),g&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function en(t,e={}){Jr(t)}var he=new Map,U=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function tn(){he.clear(),U.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Xe(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Bo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function rn(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function nn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function Fo(t,e){let o=(he.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function qo(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Fe(t,e){let r=U.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Ne(t,e,r,o){let n=Z(e,o),i=Z(r,o),c=U.get(e),s=U.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function vt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=he.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function Po(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=he.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function Ro(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=p=>{if(p.button!==0)return;p.preventDefault();let g=Fo(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=p[rn(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=g,C.sign=nn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(p.pointerId)},s=p=>{if(!C.active||C.gutterEl!==i)return;let g=(p[rn(C.direction)]-C.startPos)*(C.sign||1),v=Fe(C.startPrevSize+g,C.prevPane),y=Fe(C.startNextSize-g,C.nextPane),u=C.startPrevSize+C.startNextSize;v+y!==u&&(v!==C.startPrevSize+g?y=u-v:v=u-y),C.prevPane.style.flexBasis=`${v}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${y}px`,C.nextPane.style.flexGrow="0",Ne(i,C.prevPane,C.nextPane,C.direction)},a=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",vt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let l=10,f=p=>{let g=e==="horizontal",v=nn(t,e),y=0;if(g&&p.key==="ArrowRight"||!g&&p.key==="ArrowDown")y=l*v;else if(g&&p.key==="ArrowLeft"||!g&&p.key==="ArrowUp")y=-l*v;else if(p.key==="Home")y=(U.get(r)?.min||0)-Z(r,e);else if(p.key==="End"){let _=U.get(o);y=Z(r,e)+Z(o,e)-(_?.min||0)-Z(r,e)}else return;p.preventDefault();let u=Z(r,e),b=Z(o,e),A=u+b,h=Fe(u+y,r),x=Fe(A-h,o);h=A-x,h=Fe(h,r),x=A-h,r.style.flexBasis=`${h}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Ne(i,r,o,e),vt(t)};i.addEventListener("keydown",f);let d=()=>{let p=U.get(r),g=U.get(o),v=p?.collapsible?r:g?.collapsible?o:null;if(!v)return;let y=U.get(v);if(!y)return;let u=v===r?o:r,b=Z(r,e)+Z(o,e);if(y.collapsed){y.collapsed=!1,v.removeAttribute("data-collapsed");let A=y.preCollapseSize||`${Math.round(b/2)}px`,h=qo(A,b)??b/2,x=Math.min(h,b);v.style.flexBasis=`${x}px`,v.style.flexGrow="0",u.style.flexBasis=`${b-x}px`,u.style.flexGrow="0"}else y.preCollapseSize=v.style.flexBasis||`${Z(v,e)}px`,y.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",u.style.flexBasis=`${b}px`,u.style.flexGrow="0";Ne(i,r,o,e),vt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",d),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",f),i.removeEventListener("dblclick",d)}}}function on(t){t.directive("split",{priority:14,init(e,r,o){Xe();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(f=>f.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(f=>{U.get(f)||U.set(f,{size:f.getAttribute("pane")||null,min:parseInt(f.getAttribute("pane-min"),10)||0,max:parseInt(f.getAttribute("pane-max"),10)||1/0,collapsible:f.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let f=0;f<c.length-1;f++){let{gutter:d,cleanup:m}=Ro(e,n,c[f],c[f+1],i);c[f].after(d),s.push(d),a.push(m)}he.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),Po(e)||c.forEach(f=>{let m=U.get(f)?.size;m?(f.style.flexBasis=m,f.style.flexGrow="0"):(f.style.flexGrow="1",f.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((f,d)=>{Ne(f,c[d],c[d+1],n)})}),Bo(e,()=>{a.forEach(f=>f()),s.forEach(f=>f.remove()),he.delete(e),c.forEach(f=>U.delete(f)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function $o(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function sn(t){t.directive("pane",{priority:15,init(e,r,o){Xe(),e.classList.add("nojs-pane"),U.has(e)||U.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=U.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),$o(e,()=>{e.classList.remove("nojs-pane"),U.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function an(t,e={}){on(t),sn(t)}function cn(){tn()}var le={sorts:new Map};function dn(){le.sorts.clear()}function ve(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function zo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ho(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?o=r:o=r.querySelector("[each]")||r.querySelector("[foreach]"),!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Mo(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function ln(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function un(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function fn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return un(Number(t),Number(e));case"date":return un(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Oo(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function gn(t){t.directive("sortable",{priority:10,init(e){ve(),e.classList.add("nojs-sortable")}})}function mn(t){t.directive("sort",{priority:11,init(e,r,o){ve();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;le.sorts.has(s)||le.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(le.sorts.get(s).column||pn(e,s,n,i,c,t));let a=()=>{let l=le.sorts.get(s),f;l.column!==n?f="asc":l.direction==="asc"?f="desc":l.direction==="desc"?f=null:f="asc",pn(e,s,n,i,f,t)};e.addEventListener("click",a),zo(e,()=>{e.removeEventListener("click",a),s&&!s.isConnected&&(le.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function pn(t,e,r,o,n,i){let c=le.sorts.get(e);Oo(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=Ho(e,i);if(s){let a=i.findContext(e),l=a?Mo(a,s.arrayPath):null;if(Array.isArray(l)){if(!n){let d=e._nojsOriginalOrder;if(d){let m=new Set(l),p=d.filter(g=>m.has(g));for(let g of l)d.includes(g)||p.push(g);ln(a,s.arrayPath,p)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...l]);let f=[...l].sort((d,m)=>{let p=d!=null?d[r]:null,g=m!=null?m[r]:null,v=fn(p,g,o);return n==="desc"?-v:v});ln(a,s.arrayPath,f);return}}Vo(e,t,r,o,n)}function Vo(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let l=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...l]),!n){let m=document.createDocumentFragment();for(let p of t._nojsOriginalRows)m.appendChild(p);i.appendChild(m);return}let f=m=>{let p=m.replace(/[^0-9.\-]/g,"");return p===""||p==="-"?NaN:parseFloat(p)};l.sort((m,p)=>{let g=m.children[a]?.textContent?.trim()||"",v=p.children[a]?.textContent?.trim()||"",y=fn(o==="number"?f(g):g,o==="number"?f(v):v,o);return n==="desc"?-y:y});let d=document.createDocumentFragment();for(let m of l)d.appendChild(m);i.appendChild(d)}function bn(t){t.directive("fixed-header",{priority:10,init(e){ve(),e.classList.add("nojs-fixed-header")}})}function hn(t){t.directive("fixed-col",{priority:10,init(e){ve(),e.classList.add("nojs-fixed-col")}})}function yt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function vn(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function yn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function xn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function En(t){t.directive("table-reorder",{priority:15,init(e){if(ve(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,l=null;function f(){let y=r.querySelectorAll(":scope > tr");for(let u=0;u<y.length;u++){let b=y[u];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let A=!0;if(n){let L=S=>{A=!!S.target.closest(n)};b.addEventListener("mousedown",L),yt(b,()=>b.removeEventListener("mousedown",L))}let h=L=>{if(n&&!A){L.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(b),a=b,L.dataTransfer&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(w=>b.classList.add(w)),b.setAttribute("aria-grabbed","true")},x=L=>{if(a==null)return;L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),w=S.top+S.height/2,M=[...r.querySelectorAll(":scope > tr")].indexOf(b);d(),M!==s&&(L.clientY<w?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),l=b)},_=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),l===b&&(l=null)},k=L=>{if(L.preventDefault(),L.stopPropagation(),a==null||s==null)return;let S=[...r.querySelectorAll(":scope > tr")],w=b.getBoundingClientRect(),B=w.top+w.height/2,M=S.indexOf(b);L.clientY>=B&&M++;let N=s;if(N===M||N+1===M){m();return}let z=N<M?M-1:M,se=vn(e);if(se&&o){let T=yn(o,se.arrayPath);if(Array.isArray(T)){let q=[...T],[$]=q.splice(N,1);q.splice(z,0,$),xn(o,se.arrayPath,q),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...q]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:N,to:z,item:$}}))}}else{let T=a,q=S[z];T&&q&&(N<z?r.insertBefore(T,q.nextSibling):r.insertBefore(T,q),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:N,to:z,item:null}})))}m()},j=()=>{m()};b.addEventListener("dragstart",h),b.addEventListener("dragover",x),b.addEventListener("dragleave",_),b.addEventListener("drop",k),b.addEventListener("dragend",j),yt(b,()=>{b.removeEventListener("dragstart",h),b.removeEventListener("dragover",x),b.removeEventListener("dragleave",_),b.removeEventListener("drop",k),b.removeEventListener("dragend",j),b._nojsReorderSetup=!1})}}function d(){l&&(l.classList.remove("nojs-reorder-insert-before"),l.classList.remove("nojs-reorder-insert-after"),l=null)}function m(){a&&(i.split(/\s+/).filter(Boolean).forEach(u=>a.classList.remove(u)),a.setAttribute("aria-grabbed","false")),d(),s=null,a=null;let y=r.querySelectorAll(":scope > tr");for(let u of y)u.classList.remove("nojs-reorder-insert-before"),u.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(b=>u.classList.remove(b))}let p=y=>{a!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},g=y=>{if(a==null||y.target!==r)return;y.preventDefault(),y.stopPropagation();let u=s,A=[...r.querySelectorAll(":scope > tr")].length-1;if(u===A){m();return}let h=vn(e);if(h&&o){let x=yn(o,h.arrayPath);if(Array.isArray(x)){let _=[...x],[k]=_.splice(u,1);_.push(k),xn(o,h.arrayPath,_),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[..._]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:u,to:_.length-1,item:k}}))}}m()};r.addEventListener("dragover",p),r.addEventListener("drop",g);let v=new MutationObserver(()=>{f()});v.observe(r,{childList:!0}),f(),yt(e,()=>{v.disconnect(),r.removeEventListener("dragover",p),r.removeEventListener("drop",g),m()})}})}function wn(t,e={}){gn(t),mn(t),bn(t),hn(t),En(t)}function An(){dn()}var ue={containers:new Map};function _n(){for(let[,t]of ue.containers)typeof t.unsub=="function"&&t.unsub();ue.containers.clear()}function kn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Ln(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Wo(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function Uo(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function jn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],s=document.createElement("li");if(i===e.length-1){let l=document.createElement("span");l.setAttribute("aria-current","page"),l.textContent=c.label,s.appendChild(l)}else{let l=document.createElement("a");l.href=c.href,l.textContent=c.label,s.appendChild(l)}o.appendChild(s)}t.appendChild(o);let n=ue.containers.get(t);n&&(n.crumbs=e)}function Go(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=Wo(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function Yo(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=Uo(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function Cn(t){t.directive("breadcrumb",{priority:15,init(e,r,o){kn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(ue.containers.set(e,{unsub:null,crumbs:[]}),c){let s=()=>{let a=i.current,l=a?a.path:"/",f=Yo(l);jn(e,f)};if(s(),typeof i.on=="function"){let a=i.on(s),l=ue.containers.get(e);l&&(l.unsub=a),Ln(e,()=>{typeof a=="function"&&a();let f=ue.containers.get(e);f&&(f.unsub=null)})}}else{let s=Go(e);for(let a of Array.from(e.children))a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb")||(a.style.display="none");jn(e,s)}Ln(e,()=>{ue.containers.delete(e)})}})}function Sn(t,e={}){Cn(t)}function Tn(){_n()}var Ze={containers:new Map};function Dn(){Ze.containers.clear()}function In(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function Ko(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Qe=null;function Xo(){return Qe!==null||(Qe=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),Qe}function Bn(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function No(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function qn(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Fn(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");qn(t,r)}else t.open=!1}function Je(t,e,r,o){let n=new CustomEvent("accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function Ce(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function Pn(t){t.directive("accordion",{priority:10,init(e,r,o){In();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!Xo();e.setAttribute("role","group");let c=Ce(e);if(c.length===0)return;if(i)for(let d of c)Bn(d);let s=[],a=new MutationObserver(d=>{for(let m of d)for(let p of m.addedNodes)p.nodeType!==1||p.tagName!=="DETAILS"||p.parentElement===e&&l(p)});a.observe(e,{childList:!0});let l=d=>{i&&Bn(d);let m=g=>{let v=Ce(e),y=v.indexOf(d);if(d.open){if(n==="single")for(let u of v)u!==d&&u.open&&Fn(u,i);Je(e,d,!0,y)}else Je(e,d,!1,y)},p=null;if(i){let g=d.querySelector(":scope > summary");g&&(p=v=>{v.preventDefault();let y=d.querySelector(":scope > .nojs-accordion-content");if(d.open)qn(d,y),Je(e,d,!1,Ce(e).indexOf(d));else{if(n==="single"){let u=Ce(e);for(let b of u)b!==d&&b.open&&Fn(b,!0)}No(d,y),Je(e,d,!0,Ce(e).indexOf(d))}},g.addEventListener("click",p))}d.addEventListener("toggle",m),s.push({details:d,toggleHandler:m,clickHandler:p})};for(let d of c)l(d);let f=d=>{let m=d.target;if(m.tagName!=="SUMMARY")return;let p=m.parentElement;if(!p||p.parentElement!==e)return;let v=Ce(e).map(b=>b.querySelector(":scope > summary")).filter(Boolean),y=v.indexOf(m);if(y===-1)return;let u=-1;switch(d.key){case"ArrowDown":case"ArrowRight":u=(y+1)%v.length;break;case"ArrowUp":case"ArrowLeft":u=(y-1+v.length)%v.length;break;case"Home":u=0;break;case"End":u=v.length-1;break;default:return}u!==-1&&u!==y&&(d.preventDefault(),v[u].focus())};e.addEventListener("keydown",f),Ze.containers.set(e,{mode:n,listeners:s,observer:a}),Ko(e,()=>{e.removeEventListener("keydown",f),a.disconnect();for(let d of s)if(d.details.removeEventListener("toggle",d.toggleHandler),d.clickHandler){let m=d.details.querySelector(":scope > summary");m&&m.removeEventListener("click",d.clickHandler)}s.length=0,Ze.containers.delete(e)})}})}function Rn(t,e={}){Pn(t)}function $n(){Dn()}var Zo="[validate],[drag],[drop],[drag-list],[drag-multiple]";function zn(t){if(typeof document>"u")return;let e=document.querySelectorAll(Zo);for(let r of e){if(!r.__declared)continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Qo=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion"],Jo={name:"nojs-elements",install(t,e={}){Ct(t,e),$t(t,e),Ut(t,e),Xt(t,e),ir(t,e),fr(t,e),xr(t,e),Cr(t,e),Mr(t,e),Xr(t,e),en(t,e),an(t,e),wn(t,e),Sn(t,e),Rn(t,e),zn(t)},init(t){if(zn(t),typeof document>"u"||!document.body)return;let e=Qo.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){St(),zt(),Gt(),Nt(),sr(),gr(),Er(),Sr(),Or(),Nr(),cn(),An(),Tn(),$n()}},ei=Jo;
//# sourceMappingURL=nojs-elements.js.map
