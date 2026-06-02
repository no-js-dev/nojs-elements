/**
 * NoJS Elements v1.13.1 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
var Xe=Object.defineProperty;var bn=Object.getOwnPropertyDescriptor;var hn=Object.getOwnPropertyNames;var vn=Object.prototype.hasOwnProperty;var yn=(t,e)=>{for(var r in e)Xe(t,r,{get:e[r],enumerable:!0})},xn=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of hn(e))!vn.call(t,n)&&n!==r&&Xe(t,n,{get:()=>e[n],enumerable:!(o=bn(e,n))||o.enumerable});return t};var En=t=>xn(Xe({},"__esModule",{value:!0}),t);var Ao={};yn(Ao,{default:()=>wo});module.exports=En(Ao);var E={dragging:null,selected:new Map,placeholder:null},Be=new Map;function bt(){E.dragging=null,E.selected.clear(),E.placeholder&&(E.placeholder.remove(),E.placeholder=null),Be.clear()}function Fe(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Re(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Pe(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Pe(r):e++}return e}function $e(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,u=s.top+s.height/2;if(r<u&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function ht(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",E.dragging&&E.dragging.sourceEl){let s=(E.dragging.sourceEl.firstElementChild||E.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let d=document.getElementById(r.startsWith("#")?r.slice(1):r);d&&d.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(d.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(d=>!d.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),E.placeholder=n}function re(){E.placeholder&&(E.placeholder.remove(),E.placeholder=null)}function ue(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function wn(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,d=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let g=a-1;g>=0;g--){let p=document.createElement("div"),m=g*4;p.style.cssText="position:absolute;top:"+m+"px;left:"+m+"px;width:"+i+"px;height:"+d+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",g===0?(p.innerHTML=o.innerHTML,p.style.background=s.backgroundColor||"#fff",p.style.border=s.border,p.style.padding=s.padding,p.style.fontSize=s.fontSize,p.style.color=s.color,p.style.fontFamily=s.fontFamily):(p.style.background=s.backgroundColor||"#fff",p.style.border=s.border||"1px solid #ddd"),r.appendChild(p)}let u=document.createElement("div");return u.textContent=e,u.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(u),r.style.width=i+(a-1)*4+"px",r.style.height=d+(a-1)*4+"px",r}function vt(t){Re(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",d=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),a=e.getAttribute("drag-image"),u=e.getAttribute("drag-image-offset")||"0,0",g=e.getAttribute("drag-disabled"),p=e.getAttribute("drag-class")||"nojs-dragging",m=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let c=!0;if(s){let f=b=>{c=!!b.target.closest(s)};e.addEventListener("mousedown",f),ae(e,()=>e.removeEventListener("mousedown",f))}let l=f=>{if(s&&!c){f.preventDefault();return}if(g&&t.evaluate(g,n)){f.preventDefault();return}let b=t.evaluate(o,n),w=e.getAttribute("drag-group"),h=b;if(w&&E.selected.has(w)){let x=E.selected.get(w);x.size>0&&[...x].some(L=>L.el===e)&&(h=[...x].map(L=>L.item))}if(E.dragging={item:h,type:i,effect:d,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},f.dataTransfer){if(f.dataTransfer.effectAllowed=d,f.dataTransfer.setData("text/plain",""),Array.isArray(h)&&h.length>1&&f.dataTransfer.setDragImage){let x=wn(e,h.length);document.body.appendChild(x);let _=e.getBoundingClientRect();f.dataTransfer.setDragImage(x,_.width/2,_.height/2),requestAnimationFrame(()=>x.remove())}else if(a&&f.dataTransfer.setDragImage)if(a==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[_,L]=u.split(",").map(Number);f.dataTransfer.setDragImage(x,_||0,L||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(a);if(x){let[_,L]=u.split(",").map(Number);m&&x.classList.add(m),f.dataTransfer.setDragImage(x,_||0,L||0)}}}if(p.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(h)&&w&&E.selected.has(w))for(let x of E.selected.get(w))x.el!==e&&p.split(/\s+/).filter(Boolean).forEach(_=>x.el.classList.add(_));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:h,index:E.dragging.sourceIndex,el:e}}))},v=()=>{p.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let f=e.getAttribute("drag-group");if(f&&E.selected.has(f))for(let b of E.selected.get(f))p.split(/\s+/).filter(Boolean).forEach(w=>b.el.classList.remove(w));if(e.setAttribute("aria-grabbed","false"),m&&a&&a!=="none"){let b=e.querySelector(a);b&&b.classList.remove(m)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:E.dragging?.item,index:E.dragging?.sourceIndex,dropped:E.dragging===null}})),E.dragging=null,re()};if(e.addEventListener("dragstart",l),e.addEventListener("dragend",v),ae(e,()=>{e.removeEventListener("dragstart",l),e.removeEventListener("dragend",v)}),g){let f=function(){let w=!!t.evaluate(g,n);e.draggable=!w,w?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},b=n.$watch(f);ae(e,b)}let y=f=>{if(E.dragging&&!E.dragging.sourceEl.isConnected&&(E.dragging=null),f.key===" "&&!E.dragging){f.preventDefault();let b=t.evaluate(o,n);E.dragging={item:b,type:i,effect:d,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},p.split(/\s+/).filter(Boolean).forEach(w=>e.classList.add(w)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else f.key==="Escape"&&E.dragging&&E.dragging.sourceEl===e&&(f.preventDefault(),p.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),e.setAttribute("aria-grabbed","false"),E.dragging=null,re())};e.addEventListener("keydown",y),ae(e,()=>e.removeEventListener("keydown",y))}})}function yt(t){Re(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",d=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",a=e.getAttribute("drop-reject-class")||"nojs-drop-reject",u=e.getAttribute("drop-disabled"),g=e.getAttribute("drop-max"),p=e.getAttribute("drop-sort"),m=e.getAttribute("drop-placeholder"),c=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",d);let l=0,v=h=>{if(!E.dragging||u&&t.evaluate(u,n))return;let x=ue(E.dragging.type,i),_=!0;if(g){let L=t.evaluate(g,n),j=Pe(e);typeof L=="number"&&j>=L&&(_=!1)}if(!x||!_){a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),re();return}if(a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect=d),p){let L=$e(e,h.clientX,h.clientY,p);m&&ht(e,L,m,c),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:E.dragging.item,index:L}}))}},y=h=>{if(E.dragging&&!(u&&t.evaluate(u,n))&&(l++,l===1)){let x=ue(E.dragging.type,i),_=!0;if(g){let L=t.evaluate(g,n),j=Pe(e);typeof L=="number"&&j>=L&&(_=!1)}x&&_?(s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L))}},f=h=>{E.dragging&&(l--,l<=0&&(l=0,s.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),a.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging.item}}))))},b=h=>{if(h.preventDefault(),h.stopPropagation(),l=0,!E.dragging||u&&t.evaluate(u,n)||!ue(E.dragging.type,i))return;if(g){let A=t.evaluate(g,n),I=Pe(e);if(typeof A=="number"&&I>=A)return}let x=E.dragging.item,_=E.dragging.type,L=E.dragging.effect,j=0;p&&(j=$e(e,h.clientX,h.clientY,p)),s.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),a.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),re();let k={$drag:x,$dragType:_,$dragEffect:L,$dropIndex:j,$source:{list:E.dragging.sourceList,index:E.dragging.sourceIndex,el:E.dragging.sourceEl},$target:{list:null,index:j,el:e},$el:e},S=X(t,"execStatement");typeof S=="function"?S(o,n,k):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),E.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:x,index:j,source:k.$source,target:k.$target,effect:L}}))},w=h=>{E.dragging&&(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b(h))};e.addEventListener("dragover",v),e.addEventListener("dragenter",y),e.addEventListener("dragleave",f),e.addEventListener("drop",b),e.addEventListener("keydown",w),ae(e,()=>{e.removeEventListener("dragover",v),e.removeEventListener("dragenter",y),e.removeEventListener("dragleave",f),e.removeEventListener("drop",b),e.removeEventListener("keydown",w)})}})}function xt(t){Re(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("template"),d=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",u=e.getAttribute("drag-type")||"__draglist_"+o,g=e.getAttribute("drop-accept")||u,p=e.hasAttribute("drag-list-copy"),m=e.hasAttribute("drag-list-remove"),c=e.getAttribute("drag-disabled"),l=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),y=e.getAttribute("drop-placeholder"),f=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",w=e.getAttribute("drop-class")||"nojs-drag-over",h=e.getAttribute("drop-reject-class")||"nojs-drop-reject",x=e.getAttribute("drop-settle-class")||"nojs-drop-settle",_=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",p?"copy":"move");let L={listPath:o,ctx:n,el:e};Be.set(e,L),ae(e,()=>Be.delete(e));let j=0,k=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===k&&T.length>0&&e.children.length>0){for(let O of e.children)O.__ctx&&O.__ctx.$notify&&O.__ctx.$notify();return}k=T;let P=i?document.getElementById(i):null;if(!P)return;let q=X(t,"disposeChildren");typeof q=="function"&&q(e),e.innerHTML="";let B=T.length;T.forEach((O,M)=>{let ee={[s]:O,$index:M,$count:B,$first:M===0,$last:M===B-1,$even:M%2===0,$odd:M%2!==0},U=t.createContext(ee,n),N=P.content.cloneNode(!0),$=document.createElement("div");$.style.display="contents",$.__ctx=U,$.appendChild(N),e.appendChild($);let Y=$.firstElementChild||$;Y.draggable=!0,Y.setAttribute("role","option"),Y.setAttribute("aria-grabbed","false"),Y.getAttribute("tabindex")||Y.setAttribute("tabindex","0");let Ie=V=>{if(c&&t.evaluate(c,n)){V.preventDefault();return}E.dragging={item:O,type:u,effect:p?"copy":"move",sourceEl:$,sourceCtx:U,sourceList:T,sourceIndex:M,listDirective:{el:e,listPath:o,ctx:n,keyProp:d,copyMode:p,removeMode:m}},V.dataTransfer&&(V.dataTransfer.effectAllowed=p?"copy":"move",V.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:O,index:M,el:Y}}))},gt=()=>{b.split(/\s+/).filter(Boolean).forEach(V=>Y.classList.remove(V)),Y.setAttribute("aria-grabbed","false"),E.dragging&&E.dragging.sourceEl===$&&(E.dragging=null),re()};$.addEventListener("dragstart",Ie),$.addEventListener("dragend",gt);let mt=V=>{if(V.key===" "&&!E.dragging)V.preventDefault(),V.stopPropagation(),E.dragging={item:O,type:u,effect:p?"copy":"move",sourceEl:$,sourceCtx:U,sourceList:T,sourceIndex:M,listDirective:{el:e,listPath:o,ctx:n,keyProp:d,copyMode:p,removeMode:m}},b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true");else if(V.key==="Escape"&&E.dragging){V.preventDefault(),V.stopPropagation();let J=e.querySelector('[aria-grabbed="true"]')||Y;b.split(/\s+/).filter(Boolean).forEach(Ke=>J.classList.remove(Ke)),J.setAttribute("aria-grabbed","false"),E.dragging=null,re()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&E.dragging&&E.dragging.sourceEl===$){V.preventDefault();let J=$.nextElementSibling;J&&(J.firstElementChild||J).focus()}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&E.dragging&&E.dragging.sourceEl===$){V.preventDefault();let J=$.previousElementSibling;J&&(J.firstElementChild||J).focus()}};$.addEventListener("keydown",mt),$.__disposers=$.__disposers||[],$.__disposers.push(()=>$.removeEventListener("dragstart",Ie),()=>$.removeEventListener("dragend",gt),()=>$.removeEventListener("keydown",mt)),t.processTree($)});let R=T.length===0;_.split(/\s+/).filter(Boolean).forEach(O=>e.classList.toggle(O,R))}let A=T=>{if(!E.dragging||l&&t.evaluate(l,n))return;let P=ue(E.dragging.type,g),q=!0;if(v){let R=t.evaluate(v,n),O=t.resolve(o,n);typeof R=="number"&&Array.isArray(O)&&O.length>=R&&(q=!1)}if(!P||!q){h.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),w.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),re();return}h.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=p?"copy":"move");let B=$e(e,T.clientX,T.clientY,a);y&&ht(e,B,y,f)},I=T=>{if(E.dragging&&!(l&&t.evaluate(l,n))&&(j++,j===1)){let P=ue(E.dragging.type,g),q=!0;if(v){let B=t.evaluate(v,n),R=t.resolve(o,n);typeof B=="number"&&Array.isArray(R)&&R.length>=B&&(q=!1)}P&&q?(w.split(/\s+/).filter(Boolean).forEach(B=>e.classList.add(B)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):h.split(/\s+/).filter(Boolean).forEach(B=>e.classList.add(B))}},H=()=>{E.dragging&&(j--,j<=0&&(j=0,w.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),h.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging?.item}}))))},Z=T=>{if(T.preventDefault(),T.stopPropagation(),j=0,!E.dragging||l&&t.evaluate(l,n)||!ue(E.dragging.type,g))return;if(v){let U=t.evaluate(v,n),N=t.resolve(o,n);if(typeof U=="number"&&Array.isArray(N)&&N.length>=U)return}let P=E.dragging.item,q=E.dragging.listDirective,B=E.dragging.sourceIndex,R=$e(e,T.clientX,T.clientY,a);w.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),h.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),re();let O=t.resolve(o,n);if(!Array.isArray(O))return;let M=q&&q.el===e;if(M&&B===R){E.dragging=null;return}if(M&&B+1===R){E.dragging=null;return}let ee=[...O];if(M){let[U]=ee.splice(B,1),N=B<R?R-1:R;ee.splice(N,0,U),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:P,from:B,to:N}}))}else{let U=p&&typeof P=="object"?{...P}:P;if(ee.splice(R,0,U),n.$set(o,ee),q&&!q.copyMode&&(m||q.removeMode)){let N=t.resolve(q.listPath,q.ctx);if(Array.isArray(N)&&B!=null){let $=N.filter((Y,Ie)=>Ie!==B);q.ctx.$set(q.listPath,$),q.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:$,item:P,index:B}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:P,from:B,fromList:q?t.resolve(q.listPath,q.ctx):null}}))}requestAnimationFrame(()=>{let N=[...e.children][M&&B<R?R-1:R];if(N){let $=N.firstElementChild||N;x.split(/\s+/).filter(Boolean).forEach(Y=>$.classList.add(Y)),$.addEventListener("animationend",()=>{x.split(/\s+/).filter(Boolean).forEach(Y=>$.classList.remove(Y))},{once:!0})}}),E.dragging=null},z=T=>{if(E.dragging&&ue(E.dragging.type,g)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let P=e.querySelector(":focus");if(P){let B=(P.style?.display==="contents"&&P.firstElementChild||P).getBoundingClientRect(),R={preventDefault(){},stopPropagation(){},clientX:B.left+B.width/2,clientY:B.top+B.height+1,dataTransfer:null};Z(R)}}};e.addEventListener("dragover",A),e.addEventListener("dragenter",I),e.addEventListener("dragleave",H),e.addEventListener("drop",Z),e.addEventListener("keydown",z),ae(e,()=>{e.removeEventListener("dragover",A),e.removeEventListener("dragenter",I),e.removeEventListener("dragleave",H),e.removeEventListener("drop",Z),e.removeEventListener("keydown",z)});let se=n.$watch(S);ae(e,se),S()}})}function Et(t){Re(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}E.selected.has(n)||E.selected.set(n,new Set);let d=E.selected.get(n),s=u=>{let g=e.getAttribute("drag"),m={item:g?t.evaluate(g,o):null,el:e,ctx:o};if(u.ctrlKey||u.metaKey){let c=[...d].find(l=>l.el===e);c?(d.delete(c),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.remove(l))):(d.add(m),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l)))}else{for(let c of d)i.split(/\s+/).filter(Boolean).forEach(l=>c.el.classList.remove(l));d.clear(),d.add(m),i.split(/\s+/).filter(Boolean).forEach(c=>e.classList.add(c))}};e.addEventListener("click",s),ae(e,()=>{e.removeEventListener("click",s);let u=[...d].find(g=>g.el===e);u&&d.delete(u)});let a=u=>{if(u.key==="Escape"){for(let g of d)i.split(/\s+/).filter(Boolean).forEach(p=>g.el.classList.remove(p));d.clear()}};window.addEventListener("keydown",a),ae(e,()=>window.removeEventListener("keydown",a))}})}function wt(t,e={}){vt(t),yt(t),xt(t),Et(t)}function At(){bt()}var _t=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],Ze=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var pe,St,ze,Qe,Ne,Lt,qe,Je,kt;function An(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function _n(t){return(t.getAttribute("type")||"text").toLowerCase()}function Ln(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let d=n.split("|").map(s=>s.trim());for(let s of d){let[a,...u]=s.split(":"),g=pe[a];if(g){let p=g(t.value,...u,e);p!==!0&&p&&(r.push({rule:a,message:p}),o.add(a))}else{let p=t.value,m=null;switch(a){case"required":(p==null||String(p).trim()==="")&&(m="Required");break;case"email":p&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p)&&(m="Invalid email");break;case"url":try{new URL(p)}catch{m="Invalid URL"}break;case"min":Number(p)<Number(u[0])&&(m=`Minimum value is ${u[0]}`);break;case"max":Number(p)>Number(u[0])&&(m=`Maximum value is ${u[0]}`);break;case"custom":if(u[0]&&pe[u[0]]){let c=pe[u[0]](p,e);c!==!0&&c&&(m=c)}break}m&&(r.push({rule:a,message:m}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[d,s]of _t)if(i[d]){let a=s||_n(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function kn(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function jn(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let d=Ze.indexOf(n.rule),s=Ze.indexOf(i.rule);return(d===-1?999:d)-(s===-1?999:s)})[0];return{rule:o.rule,message:kn(e,o.rule,o.message)}}function Tt(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Cn(t,e,r,o,n){let i=Tt(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;Je(i),i.remove()}let d=document.querySelector(t);if(!d)return;let s=d.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.__errorTemplateFor=o;let u=ze({$error:e,$rule:r},n);a.__ctx=u,a.appendChild(s),d.parentNode.insertBefore(a,d.nextSibling),An(a),Ne(a)}function jt(t){let e=Tt(t);e&&(Je(e),e.remove())}function Sn(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!St(r,e)}catch{return!0}}function Ct(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function Tn(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...d]=n.split(":"),s=pe[i];if(s){let a=s(t,...d,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(d[0]))return`Minimum value is ${d[0]}`;break;case"max":if(Number(t)>Number(d[0]))return`Maximum value is ${d[0]}`;break;case"custom":if(d[0]&&pe[d[0]]){let a=pe[d[0]](t,r);if(a!==!0&&a)return a}break}}return null}function Dn(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return Qe(t);let e=ze({},null);return t.__ctx=e,e}function Dt(t){pe=X(t,"validators")||{},St=t.evaluate,ze=t.createContext,Qe=t.findContext,Ne=t.processTree,Lt=X(t,"cloneTemplate")||(()=>null),qe=X(t,"disposeChildren")||(()=>{}),Je=X(t,"disposeTree")||qe,kt=X(t,"warn")||console.warn;let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):kt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let m=function(){d&&typeof d.$notify=="function"&&d.$notify();let h=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;h.nextNode();){let _=h.currentNode.__ctx;_&&_!==d&&typeof _.$notify=="function"&&_.$notify()}},c=function(){return r.querySelectorAll("input, textarea, select")},l=function(){let h={},x={},_={},L=!0,j=null,k=0,S=!1;for(let A of c())A.name&&(A.type==="checkbox"?x[A.name]=A.checked:A.type==="radio"?A.checked?x[A.name]=A.value:A.name in x||(x[A.name]=""):x[A.name]=A.value);for(let A of c()){if(!A.name)continue;let I=a.has(A.name),H=u.has(A.name);if(!Sn(A,d)){_[A.name]={valid:!0,dirty:H,touched:I,error:null,value:x[A.name]};continue}let Z=Ln(A,x),z=jn(Z,A),se=!z,T=Ct(A,r),P=T.includes("input"),q=T.includes("blur")||T.includes("focusout")||T.includes("submit"),B;!A.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?B=I||H:B=P&&H||q&&I,se||(L=!1),!se&&B&&(h[A.name]=z.message,k++,j||(j=z.message)),_[A.name]={valid:se,dirty:H,touched:I,error:z?z.message:null,value:x[A.name]};let R=A.getAttribute("error-class")||s;if(R){let M=R.split(/\s+/);!se&&B?A.classList.add(...M):A.classList.remove(...M)}if(z&&B){let M=A.getAttribute(`error-${z.rule}`),ee=A.getAttribute("error"),U=(M&&M.startsWith("#")?M:null)||(ee&&ee.startsWith("#")?ee:null);U?Cn(U,z.message,z.rule,A,d):jt(A)}else jt(A);let O=A.getAttribute("as");O&&d.$set(O,_[A.name])}g.size>0&&(S=!0),p.valid=L,p.errors=h,p.values=x,p.fields=_,p.firstError=j,p.errorCount=k,p.pending=S,d.$set("$form",{...p}),m(),v(r)},v=function(h){let x=p.valid&&!p.pending&&!p.submitting,_=h.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of _){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let j=L.getAttribute("disabled");if(j!=="disabled"&&j!=="true"&&j!=="false")continue}L.disabled=!x,L.__autoDisabled=!0}},y=function(h){if(!h.name)return;let x=Ct(h,r),_=()=>{u.add(h.name),p.dirty=!0,l()},L=()=>{a.add(h.name),p.touched=!0,l()};if(x.includes("input"))h.addEventListener("input",_),ne(r,()=>h.removeEventListener("input",_));else{let j=()=>{u.add(h.name),p.dirty=!0,l()};h.addEventListener("input",j),ne(r,()=>h.removeEventListener("input",j))}if(x.includes("blur")||x.includes("focusout")){let j=()=>{L(),x.includes("blur")&&_()};h.addEventListener("focusout",j),ne(r,()=>h.removeEventListener("focusout",j))}else h.addEventListener("focusout",L),ne(r,()=>h.removeEventListener("focusout",L));x.includes("submit")&&(h.addEventListener("focusout",L),ne(r,()=>h.removeEventListener("focusout",L)))},d=Dn(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,u=new Set,g=new Map,p={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{p.dirty=!1,p.touched=!1,p.pending=!1,p.submitting=!1,a.clear(),u.clear(),r.reset(),l()},endSubmit:()=>{p.submitting=!1,l()}};d.$set("$form",p);let f=r.hasAttribute("validate-on"),b=[...c()].some(h=>h.hasAttribute("validate-on"));if(!f&&!b){let h=_=>{let L=_.target;L&&L.name&&u.add(L.name),p.dirty=!0,l()};r.addEventListener("input",h),ne(r,()=>r.removeEventListener("input",h)),r.addEventListener("change",h),ne(r,()=>r.removeEventListener("change",h));let x=_=>{_.target&&_.target.name&&a.add(_.target.name),p.touched=!0,l()};r.addEventListener("focusout",x),ne(r,()=>r.removeEventListener("focusout",x))}else for(let h of c())y(h);let w=h=>{for(let x of c())x.name&&a.add(x.name);if(p.touched=!0,l(),!p.valid||p.pending){h.preventDefault(),h.stopImmediatePropagation();return}p.submitting=!0,v(r),d.$set("$form",{...p}),m()};r.addEventListener("submit",w,!0),ne(r,()=>r.removeEventListener("submit",w,!0)),r.__nojsResetSubmitting=()=>{p.submitting=!1,l()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(l);return}let i=Qe(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let d=r.getAttribute("error"),s=()=>{let a=Tn(r.value,n,{});if(a&&d){let u=r.nextElementSibling?.__validationError?r.nextElementSibling:null;u||(u=document.createElement("div"),u.__validationError=!0,u.style.display="contents",r.parentNode.insertBefore(u,r.nextSibling));let g=Lt(d);if(g){let p=ze({err:{message:a}},i);qe(u),u.innerHTML="",u.__ctx=p,u.appendChild(g),Ne(u)}}else{let u=r.nextElementSibling?.__validationError?r.nextElementSibling:null;u&&(qe(u),u.innerHTML="")}};r.addEventListener("input",s),ne(r,()=>r.removeEventListener("input",s))}}})}function It(t,e={}){Dt(t)}function Bt(){}var ve=new Map,te=new Map;function Ft(){let t=Array.from(ve.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of te.values())clearTimeout(e);te.clear();for(let e of ve.values())e.remove();ve.clear()}function Pt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function In(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Me=8;function Rt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,d=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+Me,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-Me;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+Me;break;default:s=o.top-n.height-Me,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>d-4&&(s=d-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var Bn=0;function Fn(t,e,r){document.body.appendChild(e),Rt(e,t,r),e.setAttribute("aria-hidden","false")}function $t(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Pn(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function qt(t){t.directive("tooltip",{priority:20,init(e,r,o){Pt();let n=o;if(!n){Pn(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",d=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(d)?300:d,a=e.getAttribute("tooltip-disabled"),u=a?t.findContext(e):null,g=()=>{if(!a||!u)return!1;try{return!!t.evaluate(a,u)}catch{return!1}},p=`nojs-tooltip-${++Bn}`,m=document.createElement("div");m.className="nojs-tooltip",m.setAttribute("role","tooltip"),m.setAttribute("id",p),m.setAttribute("aria-hidden","true"),m.textContent=n,e.setAttribute("aria-describedby",p),ve.set(e,m);let c=!1,l=0,v=()=>{!c||!e.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!c||!e.isConnected)&&Rt(m,e,i)}))},y=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},f=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),l&&(cancelAnimationFrame(l),l=0)},b=()=>{c||(Fn(e,m,i),c=!0,y())},w=()=>{if(!c){$t(e,m);return}f(),$t(e,m),c=!1},h=()=>{if(g())return;te.has(e)&&clearTimeout(te.get(e));let I=setTimeout(()=>{te.delete(e),!g()&&e.isConnected&&b()},s);te.set(e,I)},x=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),w()},_=()=>h(),L=()=>x(),j=()=>h(),k=()=>x(),S=I=>{I.key==="Escape"&&m.getAttribute("aria-hidden")==="false"&&x()};e.addEventListener("mouseenter",_),e.addEventListener("mouseleave",L),e.addEventListener("focusin",j),e.addEventListener("focusout",k),e.addEventListener("keydown",S);let A=null;if(a&&u&&typeof u.$watch=="function"){let I=()=>{c&&g()&&w()};A=u.$watch(I)}In(e,()=>{e.removeEventListener("mouseenter",_),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",j),e.removeEventListener("focusout",k),e.removeEventListener("keydown",S),A&&(A(),A=null),f(),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),c=!1,m.remove(),ve.delete(e)})}})}function zt(t,e={}){qt(t)}function Mt(){Ft()}var K=new Map;function Ht(){K.clear()}function He(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function et(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ye(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var de=8;function Oe(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,d=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-de,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-de;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+de;break;default:s=o.bottom+de,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>d&&(s=o.top-n.height-de),r==="top"&&s<0&&(s=o.bottom+de),r==="right"&&a+n.width>i&&(a=o.left-n.width-de),r==="left"&&a<0&&(a=o.right+de),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>d-4&&(s=d-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function tt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let d=t.popoverEl;if(!d||!d.isConnected){i();return}if(typeof d.matches=="function"&&!d.matches(":popover-open")){i();return}Oe(d,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function fe(t){t&&t._untrack&&t._untrack()}function Ot(t){t.directive("popover",{priority:20,init(r,o,n){He();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let d=r.getAttribute("popover-position")||"bottom";if(!K.has(i))K.set(i,{popoverEl:r,triggerEls:new Set,position:d,open:!1,_untrack:null});else{let a=K.get(i);a.popoverEl=r,a.position=d}let s=a=>{let u=K.get(i);if(!u)return;let g=a.newState==="open";u.open=g;for(let p of u.triggerEls)p.setAttribute("aria-expanded",String(g));g||fe(u)};r.addEventListener("toggle",s),et(r,()=>{r.removeEventListener("toggle",s);let a=K.get(i);a&&(fe(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&K.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){He();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,u=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(u&&(i=u.getAttribute("data-popover-id")||u.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),K.has(i)||K.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),K.get(i).triggerEls.add(r);let d=a=>{let u=K.get(i);if(!u||!u.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}ye(u.popoverEl)&&(u.popoverEl.togglePopover(),requestAnimationFrame(()=>{u.popoverEl.matches(":popover-open")?(Oe(u.popoverEl,r,u.position),tt(u,r)):fe(u)}))};r.addEventListener("click",d);let s=a=>{let u=K.get(i);a.key==="Escape"&&u?.open&&(ye(u.popoverEl,"hidePopover")&&u.popoverEl.hidePopover(),fe(u),r.focus())};document.addEventListener("keydown",s),et(r,()=>{r.removeEventListener("click",d),document.removeEventListener("keydown",s);let a=K.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(fe(a),K.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){He();let o=()=>{let n=r.closest(".nojs-popover");!n||!ye(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),et(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!ye(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{Oe(n.popoverEl,i,n.position),tt(n,i)}),!0},e.close=r=>{let o=K.get(r);if(!o||!o.popoverEl||!ye(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return fe(o),!0},e.toggle=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!ye(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{Oe(n.popoverEl,i,n.position),tt(n,i)}):fe(n),!0},t.popover=e}function Vt(t,e={}){Ot(t)}function Wt(){Ht()}var W=[],oe=new Map,$n=1e4;function Gt(){return $n+W.length}function Ut(){W.length=0,oe.clear()}function xe(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Rn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Kt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',rt=new WeakMap;function qn(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(Kt)].filter(d=>d.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),rt.set(t,e)}function Yt(t){let e=rt.get(t);e&&(t.removeEventListener("keydown",e),rt.delete(t))}var ke=new WeakMap;function Xt(t){t.directive("modal",{priority:10,init(r,o,n){xe();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let d=r.querySelector("h1, h2, h3, h4, h5, h6");d&&(d.id||(d.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",d.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),u=r.getAttribute("modal-escape"),g=m=>{m.target===r&&s!=="false"&&u!=="false"&&Ee(r,i)};r.addEventListener("click",g),oe.set(i,r);let p=m=>{if(m.newState==="open"){if(r.style.zIndex=String(Gt()),a&&a.split(/\s+/).filter(Boolean).forEach(c=>r.classList.add(c)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(l=>l.el===r))return;let c=r.querySelector(Kt);c?c.focus():r.focus()}),qn(r),u!=="false"){let c=l=>{l.key==="Escape"&&(l.stopPropagation(),Ee(r,i))};r.addEventListener("keydown",c),ke.set(r,c)}}else if(m.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),Yt(r);let c=ke.get(r);c&&(r.removeEventListener("keydown",c),ke.delete(r));let l=W.findIndex(v=>v.el===r);if(l===-1&&(l=W.findIndex(v=>v.id===i)),l!==-1){let v=W[l];W.splice(l,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",p),Rn(r,()=>{r.removeEventListener("click",g),r.removeEventListener("toggle",p),Yt(r);let m=ke.get(r);m&&(r.removeEventListener("keydown",m),ke.delete(r)),oe.delete(i);let c=W.findIndex(l=>l.el===r);c===-1&&(c=W.findIndex(l=>l.id===i)),c!==-1&&W.splice(c,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=oe.get(r);return o?(Ee(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)Ee(W[r].el,W[r].id)},t.modal=e}function Ee(t,e){try{t.hidePopover()}catch{}}function zn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Mn(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function Zt(t){t.directive("modal-open",{priority:10,init(e,r,o){xe();let n=o;if(!n){let p=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(p&&(n=p.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let g=oe.get(n)||Mn(n);if(!g){console.warn(`[modal-open] modal "${n}" not found`);return}let p=W.some(m=>m.id===n);g.id&&e.setAttribute("aria-controls",g.id);try{g.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}p||W.push({id:n,el:g,triggerEl:e}),e.setAttribute("aria-expanded","true")},d=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null;requestAnimationFrame(()=>{let g=oe.get(n);g&&(a=g,s=p=>{p.newState==="closed"&&e.setAttribute("aria-expanded","false")},g.addEventListener("toggle",s))}),e.addEventListener("click",i),zn(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function Hn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qt(t){t.directive("modal-close",{priority:10,init(e,r,o){xe();let n=()=>{let i,d;if(o){if(d=o,i=oe.get(d),!i){console.warn(`[modal-close] modal "${d}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}d=i.getAttribute("modal")}Ee(i,d)};e.addEventListener("click",n),Hn(e,()=>{e.removeEventListener("click",n)})}})}function Nt(t,e={}){Xt(t),Zt(t),Qt(t)}function Jt(){Ut()}var ce={openMenus:new Map};function er(){ce.openMenus.clear()}function we(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var On=0;function Vn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function tr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),d=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,u,g;switch(o){case"top":u=i.top-d.height,g=i.left;break;case"left":u=i.top,g=i.left-d.width;break;case"right":u=i.top,g=i.right;break;default:u=i.bottom,g=i.left}o==="bottom"||o==="top"?n==="end"&&(g=i.right-d.width):n==="end"&&(u=i.bottom-d.height),o==="bottom"&&u+d.height>s&&i.top-d.height>0?u=i.top-d.height:o==="top"&&u<0&&i.bottom+d.height<=s&&(u=i.bottom),g<4&&(g=4),g+d.width>a-4&&(g=a-d.width-4),t.style.top=`${u}px`,t.style.left=`${g}px`}function ot(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function nt(t){let e=ot(t);e.length&&e[0].focus()}function rr(t){let e=ot(t);e.length&&e[e.length-1].focus()}function nr(t){t.directive("dropdown",{priority:15,init(r){we()}}),t.directive("dropdown-toggle",{priority:15,init(r){we();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${On++}`),r.setAttribute("aria-controls",n.id);let i=!1,d=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),d&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),tr(n,r,o),ce.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(d&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ce.openMenus.delete(n)}function u(){return r.getAttribute("aria-expanded")==="true"}let g=f=>{f.newState==="closed"&&u()&&a()};n.addEventListener("toggle",g);let p=f=>{f.preventDefault(),f.stopPropagation(),u()?a():s()};r.addEventListener("click",p);let m=f=>{u()&&!o.contains(f.target)&&a()};document.addEventListener("click",m,!0);let c=f=>{f.key==="Escape"&&u()&&(a(),r.focus())};document.addEventListener("keydown",c);let l=f=>{switch(f.key){case"Enter":case" ":f.preventDefault(),s(),nt(n);break;case"ArrowDown":f.preventDefault(),s(),nt(n);break;case"ArrowUp":f.preventDefault(),s(),rr(n);break}};r.addEventListener("keydown",l);let v=f=>{if(!(!u()||ot(n).find(h=>h===document.activeElement)))switch(f.key){case"ArrowDown":f.preventDefault(),nt(n);break;case"ArrowUp":f.preventDefault(),rr(n);break}};n.addEventListener("keydown",v);let y=()=>{u()&&tr(n,r,o)};window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),Vn(r,()=>{r.removeEventListener("click",p),r.removeEventListener("keydown",l),n.removeEventListener("keydown",v),n.removeEventListener("toggle",g),document.removeEventListener("click",m,!0),document.removeEventListener("keydown",c),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),ce.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){we(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function or(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Wn(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function it(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ce.openMenus.has(t)&&ce.openMenus.delete(t)}function ir(t){t.directive("dropdown-item",{priority:15,init(e){we();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=d=>{if(!r)return;let s=Wn(r),a=s.indexOf(e);switch(d.key){case"ArrowDown":{d.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{d.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{d.preventDefault(),s.length&&s[0].focus();break}case"End":{d.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{d.preventDefault(),e.click();break}case"Escape":{if(d.preventDefault(),it(r,o),o){let u=o.querySelector("[dropdown-toggle]");u&&u.focus()}break}case"Tab":{it(r,o);break}}};e.addEventListener("keydown",n),or(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(it(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}};e.addEventListener("click",i),or(e,()=>e.removeEventListener("click",i))}})}function sr(t,e={}){nr(t),ir(t)}function ar(){er()}var ie=new Map,Ae=new Set,dr=0;function cr(){return++dr}function lr(){for(let t of Ae)clearTimeout(t);Ae.clear();for(let t of ie.values())t.remove();ie.clear(),dr=0}function ur(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function st(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Gn=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function at(){return ie.size>0?ie.values().next().value:Un("top-right")}function Un(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function Yn(t){return t.startsWith("top")}function dt(t,e,r,o,n){let i=cr(),d=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let u=document.createElement("button");u.type="button",u.classList.add("nojs-toast-dismiss"),u.setAttribute("aria-label","Dismiss"),u.textContent="\xD7",u.addEventListener("click",()=>Ve(s)),s.appendChild(u)}if(Yn(d)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let u=setTimeout(()=>{Ae.delete(u),s.isConnected&&Ve(s)},o);Ae.add(u),s._toastTimerId=u}return s}function Ve(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Ae.delete(t._toastTimerId)),t.remove())}function pr(t){ur(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&Gn.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),st(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",d=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(d)?3e3:d,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let v=at();dt(v,n,i,s,a)};r.addEventListener("click",l),st(r,()=>r.removeEventListener("click",l));return}let g=t.findContext(r),p;function m(){let l=t.evaluate(n,g);if(l&&l!==p){let v=typeof l=="string"?l:String(l),y=at();dt(y,v,i,s,a),p=void 0}else p=l}let c=g.$watch(m);st(r,c)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,d=at();return dt(d,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&Ve(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Ve(r))},t.toast=e}function fr(t,e={}){pr(t)}function gr(){lr()}var ge={containers:new Map};function mr(){ge.containers.clear()}function br(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function Kn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Xn=0;function hr(t){return`${t}-${++Xn}`}function je(t,e,r=!1){let o=ge.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let d=0;d<n.length;d++)n[d].setAttribute("aria-selected","false"),n[d].setAttribute("tabindex","-1"),i[d].setAttribute("aria-hidden","true"),i[d].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Ce(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function vr(t){t.directive("tabs",{priority:10,init(e,r,o){br();let n=[],i=[];for(let f of Array.from(e.children))f.hasAttribute("tab")?n.push(f):f.hasAttribute("panel")&&i.push(f);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let d=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",d),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let f=0;f<a;f++){let b=n[f],w=i[f],h=b.id||hr("nojs-tab"),x=w.id||hr("nojs-panel");b.id=h,w.id=x,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",x),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),w.setAttribute("role","tabpanel"),w.setAttribute("aria-labelledby",h),w.setAttribute("tabindex","0"),w.setAttribute("aria-hidden","true"),w.inert=!0,w.classList.add("nojs-panel"),s.appendChild(b)}for(let f=a;f<i.length;f++){let b=i[f];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let u=i[0];u?e.insertBefore(s,u):e.appendChild(s),ge.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let g=t.findContext(e),p=[],m=(f,b)=>{let w=!1;try{w=!!t.evaluate(b,g)}catch{w=!1}w?f.setAttribute("aria-disabled","true"):f.removeAttribute("aria-disabled")};for(let f=0;f<a;f++){let b=n[f],w=b.getAttribute("tab-disabled");if(w&&(m(b,w),g&&typeof g.$watch=="function")){let h=g.$watch(()=>m(b,w));p.push(h)}}let c=0;if(o&&o.trim()!==""){let f=parseInt(o,10);!isNaN(f)&&f>=0&&f<a&&(c=f)}let l=n.slice(0,a);if(n[c]?.getAttribute("aria-disabled")==="true"){let f=Ce(l,c,1);f!==-1?(c=f,je(e,c)):je(e,c,!0)}else je(e,c);let v=f=>{let b=ge.containers.get(e);if(!b)return;let w=f.target;if(w.getAttribute("role")!=="tab")return;let{tabs:h}=b,x=h.indexOf(w);if(x===-1)return;let _=-1;switch(f.key){case"ArrowRight":case"ArrowDown":_=Ce(h,x,1);break;case"ArrowLeft":case"ArrowUp":_=Ce(h,x,-1);break;case"Home":_=Ce(h,h.length-1,1);break;case"End":_=Ce(h,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==x&&(f.preventDefault(),je(e,_),h[_].focus())};s.addEventListener("keydown",v);let y=f=>{let b=f.target.closest("[role='tab']");if(!b)return;let w=ge.containers.get(e);if(!w)return;let h=w.tabs.indexOf(b);h!==-1&&b.getAttribute("aria-disabled")!=="true"&&(je(e,h),b.focus())};s.addEventListener("click",y),Kn(e,()=>{s.removeEventListener("keydown",v),s.removeEventListener("click",y);for(let f of p)f&&f();p.length=0,ge.containers.delete(e)})}})}function yr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function xr(t){t.directive("panel",{priority:11,init(){}})}function Er(t,e={}){vr(t),yr(t),xr(t)}function wr(){mr()}var F={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Ar(){F.branches.clear(),F.selectedItem=null,F.typeahead="",F.typeaheadTimer&&(clearTimeout(F.typeaheadTimer),F.typeaheadTimer=null)}function _e(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function ct(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function _r(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Lr(t){return t.closest('[role="tree"]')}function Zn(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function Qn(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function kr(t){t.directive("tree",{priority:15,init(e){_e(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function jr(t){t.directive("branch",{priority:16,init(e,r,o){_e();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Lr(e);if(i){let c=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",c?"-1":"0")}else e.setAttribute("tabindex","0");let d=!1;queueMicrotask(()=>{if(d)return;let c=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);c?(F.branches.set(e,{expanded:n,subtreeEl:c}),c.setAttribute("aria-hidden",String(!n))):F.branches.set(e,{expanded:n,subtreeEl:null})});function s(c){let l=F.selectedItem;l&&l!==c&&(l.classList.remove("nojs-branch-selected"),l.setAttribute("aria-selected","false")),c.classList.add("nojs-branch-selected"),c.setAttribute("aria-selected","true"),F.selectedItem=c}function a(c){let l=F.branches.get(c);!l||!l.subtreeEl||(l.expanded=!l.expanded,c.setAttribute("aria-expanded",String(l.expanded)),l.subtreeEl.setAttribute("aria-hidden",String(!l.expanded)))}function u(c){let l=F.branches.get(c);!l||!l.subtreeEl||l.expanded||(l.expanded=!0,c.setAttribute("aria-expanded","true"),l.subtreeEl.setAttribute("aria-hidden","false"))}function g(c){let l=F.branches.get(c);!l||!l.subtreeEl||!l.expanded||(l.expanded=!1,c.setAttribute("aria-expanded","false"),l.subtreeEl.setAttribute("aria-hidden","true"))}let p=c=>{c.target.closest?.('[role="treeitem"]')===e&&(c.stopPropagation(),s(e),a(e))};e.addEventListener("click",p),ct(e,()=>e.removeEventListener("click",p));let m=c=>{let l=Lr(e);if(!l)return;let v=_r(l),y=v.indexOf(e),f=F.branches.get(e),b=f&&f.subtreeEl;switch(c.key){case"ArrowRight":if(c.preventDefault(),b&&!f.expanded)u(e);else if(b&&f.expanded){let w=f.subtreeEl.querySelector('[role="treeitem"]');w&&me(w,v)}break;case"ArrowLeft":if(c.preventDefault(),b&&f.expanded)g(e);else{let w=Zn(e);w&&me(w,_r(l))}break;case"ArrowDown":c.preventDefault(),y<v.length-1&&me(v[y+1],v);break;case"ArrowUp":c.preventDefault(),y>0&&me(v[y-1],v);break;case"Enter":case" ":c.preventDefault(),s(e),a(e);break;case"Home":c.preventDefault(),v.length>0&&me(v[0],v);break;case"End":c.preventDefault(),v.length>0&&me(v[v.length-1],v);break;default:if(c.key.length===1&&!c.ctrlKey&&!c.altKey&&!c.metaKey){c.preventDefault(),F.typeahead+=c.key.toLowerCase(),F.typeaheadTimer&&clearTimeout(F.typeaheadTimer),F.typeaheadTimer=setTimeout(()=>{F.typeahead="",F.typeaheadTimer=null},500);let w=y+1;for(let h=0;h<v.length;h++){let x=(w+h)%v.length;if(Qn(v[x]).startsWith(F.typeahead)){me(v[x],v);break}}}break}};e.addEventListener("keydown",m),ct(e,()=>e.removeEventListener("keydown",m)),ct(e,()=>{d=!0,F.branches.delete(e),F.selectedItem===e&&(F.selectedItem=null),F.typeaheadTimer&&(clearTimeout(F.typeaheadTimer),F.typeaheadTimer=null,F.typeahead="")})}})}function me(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Cr(t){t.directive("subtree",{priority:16,init(e){_e(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")&&(o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf"));let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=F.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Sr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function lt(t){return t.closest('[role="treeitem"]')}function Nn(t){return t.closest('[role="tree"]')}function Jn(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function eo(t){return Jn(t).indexOf(t)}function to(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Tr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Le(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function Se(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function ro(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function no(t,e){Le();let r=ro(),o=t.getBoundingClientRect(),n=Nn(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function Dr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(_e(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=m=>{let c=lt(m.target);if(c&&e.contains(c)){if(c.hasAttribute("tree-drag-disabled")){m.preventDefault();return}D.dragging={el:c,treeRoot:e},m.dataTransfer&&(m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain","")),c.classList.add("nojs-dragging"),c.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:c}}))}},d=m=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let c=lt(m.target);if(!c||!e.contains(c)||c===D.dragging.el||Tr(c,D.dragging.el))return;m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let l=to(c,m.clientY,o);(D.currentTarget!==c||D.currentPosition!==l)&&(Se(e),Le(),D.currentTarget=c,D.currentPosition=l,l==="on"?c.classList.add("nojs-tree-drag-over"):no(c,l))},s=m=>{D.dragging&&D.dragging.treeRoot===e&&n++},a=m=>{D.dragging&&(n--,n<=0&&(n=0,Se(e),Le(),D.currentTarget=null,D.currentPosition=null))},u=m=>{if(m.preventDefault(),m.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let c=D.dragging.el,l=D.currentTarget,v=D.currentPosition;if(Se(e),Le(),!l||!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(l===c||Tr(l,c)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="on"){let y=l.querySelector(':scope > [role="group"]');y||(y=l.nextElementSibling?.matches?.('[role="group"]')?l.nextElementSibling:null),y?y.setAttribute("aria-hidden","false"):(y=document.createElement("ul"),y.setAttribute("role","group"),y.setAttribute("subtree",""),y.classList.add("nojs-subtree","nojs-tree"),y.setAttribute("aria-hidden","false"),l.appendChild(y));let f=F.branches.get(l);f&&(f.expanded=!0,f.subtreeEl=y,l.setAttribute("aria-expanded","true")),y.appendChild(c),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:c,newParent:l}}))}else{let y=l.parentElement;if(!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="before")y.insertBefore(c,l);else{let b=l.nextElementSibling,w=b?.matches?.('[role="group"]')?b.nextElementSibling:b;w?y.insertBefore(c,w):y.appendChild(c)}let f=eo(c);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:c,newIndex:f}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},g=m=>{let c=lt(m.target);c&&c.classList.remove("nojs-dragging"),Se(e),Le(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",d),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",u),e.addEventListener("dragend",g),Sr(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",d),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",u),e.removeEventListener("dragend",g),Se(e),Le()}),oo(e);let p=new MutationObserver(m=>{for(let c of m)for(let l of c.addedNodes){if(l.nodeType!==1)continue;l.getAttribute("role")==="treeitem"&&ut(l);let v=l.querySelectorAll?.('[role="treeitem"]');if(v)for(let y of v)ut(y)}});p.observe(e,{childList:!0,subtree:!0}),Sr(e,()=>p.disconnect())}})}function ut(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function oo(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)ut(r)}function Ir(t,e={}){kr(t),jr(t),Cr(t),Dr(t)}function Br(){Ar()}var We=new Map;function Fr(){We.clear()}function Ge(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Pr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function $r(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Rr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Te(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function qr(t){t.directive("stepper",{priority:14,init(e,r,o){Ge();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let d=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",u=e.getAttribute("stepper-nav")!=="false",g=e.getAttribute("aria-label")||"Stepper",p=Math.max(0,Math.min(d,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",g),e.classList.add("nojs-stepper");let m=null,c=[];if(a){m=document.createElement("div"),m.className="nojs-stepper-indicator",m.setAttribute("role","tablist"),m.setAttribute("aria-label","Progress"),i.forEach((k,S)=>{if(S>0){let z=document.createElement("div");z.className="nojs-stepper-separator",z.setAttribute("aria-hidden","true"),m.appendChild(z)}let A=document.createElement("button");A.type="button",A.className="nojs-stepper-indicator-item",A.setAttribute("role","tab"),A.setAttribute("aria-selected",S===p?"true":"false");let I=k.getAttribute("step-label")||`Step ${S+1}`,H=document.createElement("span");H.textContent=I,A.appendChild(H),A.setAttribute("aria-label",I);let Z=`nojs-stepper-tab-${io++}`;if(A.id=Z,s==="free"){A.setAttribute("data-clickable","");let z=()=>x(S);A.addEventListener("click",z),Te(e,()=>A.removeEventListener("click",z))}else A.setAttribute("tabindex","-1");m.appendChild(A),c.push(A)});let j=k=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(k.key))return;k.preventDefault();let S=p;k.key==="ArrowRight"?S=Math.min(p+1,i.length-1):k.key==="ArrowLeft"?S=Math.max(p-1,0):k.key==="Home"?S=0:k.key==="End"&&(S=i.length-1),s==="free"?(x(S),c[S]?.focus()):c[p]?.focus()};m.addEventListener("keydown",j),Te(e,()=>m.removeEventListener("keydown",j)),e.insertBefore(m,e.firstChild)}let l=null,v=null,y=null;if(u){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let j=()=>h();v.addEventListener("click",j),Te(e,()=>v.removeEventListener("click",j)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let k=()=>w();y.addEventListener("click",k),Te(e,()=>y.removeEventListener("click",k)),l.appendChild(v),l.appendChild(y),e.appendChild(l)}function f(j){let k=i[j];if(!k)return!0;if(!Pr(k,t.findContext)){let I=k.querySelector("form[validate]");return I&&($r(I),c[j]&&c[j].classList.add("nojs-step-invalid"),Rr(e,k,I)),!1}c[j]&&c[j].classList.remove("nojs-step-invalid");let S=k.querySelectorAll("[required]");for(let I of S)if(typeof I.checkValidity=="function"&&!I.checkValidity())return I.reportValidity(),!1;let A=k.getAttribute("step-validate");if(A)try{if(!t.evaluate(A,n))return!1}catch(I){return console.warn(`[stepper] step-validate error: ${I.message}`),!1}return!0}function b(j){i.forEach((k,S)=>{let A=S===p;k.setAttribute("aria-hidden",A?"false":"true"),A?(k.removeAttribute("inert"),k.setAttribute("aria-current","step")):(k.setAttribute("inert",""),k.removeAttribute("aria-current"))}),c.length&&c.forEach((k,S)=>{k.setAttribute("aria-selected",S===p?"true":"false"),S<p?k.setAttribute("data-completed",""):k.removeAttribute("data-completed"),k.setAttribute("tabindex",S===p?"0":"-1");let A=i[S];A.id&&(k.setAttribute("aria-controls",A.id),A.setAttribute("aria-labelledby",k.id))}),v&&(v.disabled=p===0),y&&(y.textContent=p===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!j,detail:{current:p,total:i.length}}))}function w(){return p>=i.length-1?(s==="linear"&&!f(p)||e.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:p,total:i.length}})),!1):s==="linear"&&!f(p)?!1:(p++,b(),L(),!0)}function h(){return p<=0?!1:(p--,b(),L(),!0)}function x(j){if(j<0||j>=i.length||j===p)return!1;if(s==="linear"&&j>p){for(let k=p;k<j;k++)if(p=k,b(),!f(k))return L(),!1}return p=j,b(),L(),!0}let _={get current(){return p},get total(){return i.length},next:w,prev:h,goTo:x,get isFirst(){return p===0},get isLast(){return p===i.length-1}};function L(){n.$stepper=_}L(),We.set(e,{get current(){return p},steps:i,mode:s,indicatorEl:m,navEl:l}),b(!0),Te(e,()=>{We.delete(e),m&&m.parentNode&&m.remove(),l&&l.parentNode&&l.remove(),delete n.$stepper})}})}var io=0;var so=0;function zr(t){t.directive("step",{priority:13,init(e,r,o){Ge(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${so++}`),e.setAttribute("tabindex","0")}})}function Mr(t,e={}){zr(t),qr(t)}function Hr(){Fr()}function Or(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Vr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Wr(t){t.directive("skeleton",{priority:10,init(e,r,o){Or();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",d=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function u(f){g();for(let b=0;b<f;b++){let w=document.createElement("div");w.className="nojs-skeleton-line",e.appendChild(w),a.push(w)}}function g(){for(let f of a)f.parentNode===e&&e.removeChild(f);a=[]}function p(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let f=s+(String(s).match(/\d$/)?"px":"");e.style.width=f,e.style.height=f}if(d){let f=parseInt(d,10);f>0&&u(f)}e.setAttribute("aria-busy","true")}let m=null;function c(){m&&m(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let f=!1,b=null,w=()=>{f||(f=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",w),b!==null&&clearTimeout(b),m=null)};e.addEventListener("transitionend",w),b=setTimeout(w,0),m=()=>{e.removeEventListener("transitionend",w),b!==null&&clearTimeout(b),f=!0,m=null}}let l=!1;function v(){let f=!!t.evaluate(o,n);f&&!l?(l=!0,p()):!f&&l&&(l=!1,c())}v();let y=n.$watch(v);Vr(e,y),Vr(e,()=>{m&&m(),l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),g(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function Gr(t,e={}){Wr(t)}var be=new Map,G=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Ur(){be.clear(),G.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Ue(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function ao(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Yr(t){return t==="horizontal"?"clientX":"clientY"}function Q(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function Kr(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function co(t,e){let o=(be.get(t)?.gutters||[]).reduce((n,i)=>n+Q(i,e),0);return Q(t,e)-o}function lo(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function De(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Ye(t,e,r,o){let n=Q(e,o),i=Q(r,o),d=G.get(e),s=G.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",d?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function pt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=be.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function uo(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=be.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,d)=>{i&&(n.panes[d].style.flexBasis=i,n.panes[d].style.flexGrow="0")}),!0)}catch{return!1}}function po(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let d=c=>{if(c.button!==0)return;c.preventDefault();let l=co(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=c[Yr(e)],C.startPrevSize=Q(r,e),C.startNextSize=Q(o,e),C.containerSize=l,C.sign=Kr(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(c.pointerId)},s=c=>{if(!C.active||C.gutterEl!==i)return;let l=(c[Yr(C.direction)]-C.startPos)*(C.sign||1),v=De(C.startPrevSize+l,C.prevPane),y=De(C.startNextSize-l,C.nextPane),f=C.startPrevSize+C.startNextSize;v+y!==f&&(v!==C.startPrevSize+l?y=f-v:v=f-y),C.prevPane.style.flexBasis=`${v}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${y}px`,C.nextPane.style.flexGrow="0",Ye(i,C.prevPane,C.nextPane,C.direction)},a=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",pt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",d),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let u=10,g=c=>{let l=e==="horizontal",v=Kr(t,e),y=0;if(l&&c.key==="ArrowRight"||!l&&c.key==="ArrowDown")y=u*v;else if(l&&c.key==="ArrowLeft"||!l&&c.key==="ArrowUp")y=-u*v;else if(c.key==="Home")y=(G.get(r)?.min||0)-Q(r,e);else if(c.key==="End"){let _=G.get(o);y=Q(r,e)+Q(o,e)-(_?.min||0)-Q(r,e)}else return;c.preventDefault();let f=Q(r,e),b=Q(o,e),w=f+b,h=De(f+y,r),x=De(w-h,o);h=w-x,h=De(h,r),x=w-h,r.style.flexBasis=`${h}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Ye(i,r,o,e),pt(t)};i.addEventListener("keydown",g);let p=()=>{let c=G.get(r),l=G.get(o),v=c?.collapsible?r:l?.collapsible?o:null;if(!v)return;let y=G.get(v);if(!y)return;let f=v===r?o:r,b=Q(r,e)+Q(o,e);if(y.collapsed){y.collapsed=!1,v.removeAttribute("data-collapsed");let w=y.preCollapseSize||`${Math.round(b/2)}px`,h=lo(w,b)??b/2,x=Math.min(h,b);v.style.flexBasis=`${x}px`,v.style.flexGrow="0",f.style.flexBasis=`${b-x}px`,f.style.flexGrow="0"}else y.preCollapseSize=v.style.flexBasis||`${Q(v,e)}px`,y.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",f.style.flexBasis=`${b}px`,f.style.flexGrow="0";Ye(i,r,o,e),pt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",p),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",d),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",g),i.removeEventListener("dblclick",p)}}}function Xr(t){t.directive("split",{priority:14,init(e,r,o){Ue();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let d=Array.from(e.children).filter(g=>g.hasAttribute("pane"));if(d.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${d.length}.`);return}d.forEach(g=>{G.get(g)||G.set(g,{size:g.getAttribute("pane")||null,min:parseInt(g.getAttribute("pane-min"),10)||0,max:parseInt(g.getAttribute("pane-max"),10)||1/0,collapsible:g.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let g=0;g<d.length-1;g++){let{gutter:p,cleanup:m}=po(e,n,d[g],d[g+1],i);d[g].after(p),s.push(p),a.push(m)}be.set(e,{direction:n,gutterSize:i,panes:d,gutters:s}),uo(e)||d.forEach(g=>{let m=G.get(g)?.size;m?(g.style.flexBasis=m,g.style.flexGrow="0"):(g.style.flexGrow="1",g.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((g,p)=>{Ye(g,d[p],d[p+1],n)})}),ao(e,()=>{a.forEach(g=>g()),s.forEach(g=>g.remove()),be.delete(e),d.forEach(g=>G.delete(g)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function fo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Zr(t){t.directive("pane",{priority:15,init(e,r,o){Ue(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),fo(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function Qr(t,e={}){Xr(t),Zr(t)}function Nr(){Ur()}var le={sorts:new Map};function Jr(){le.sorts.clear()}function he(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function go(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function mo(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?o=r:o=r.querySelector("[each]")||r.querySelector("[foreach]"),!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function bo(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function en(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function tn(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function nn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return tn(Number(t),Number(e));case"date":return tn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function ho(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function on(t){t.directive("sortable",{priority:10,init(e){he(),e.classList.add("nojs-sortable")}})}function sn(t){t.directive("sort",{priority:11,init(e,r,o){he();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",d=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;le.sorts.has(s)||le.sorts.set(s,{column:null,direction:null}),(d==="asc"||d==="desc")&&(le.sorts.get(s).column||rn(e,s,n,i,d,t));let a=()=>{let u=le.sorts.get(s),g;u.column!==n?g="asc":u.direction==="asc"?g="desc":u.direction==="desc"?g=null:g="asc",rn(e,s,n,i,g,t)};e.addEventListener("click",a),go(e,()=>{e.removeEventListener("click",a),s&&!s.isConnected&&(le.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function rn(t,e,r,o,n,i){let d=le.sorts.get(e);ho(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),d.column=r,d.direction=n):(d.column=null,d.direction=null);let s=mo(e,i);if(s){let a=i.findContext(e),u=a?bo(a,s.arrayPath):null;if(Array.isArray(u)){if(!n){let p=e._nojsOriginalOrder;if(p){let m=new Set(u),c=p.filter(l=>m.has(l));for(let l of u)p.includes(l)||c.push(l);en(a,s.arrayPath,c)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...u]);let g=[...u].sort((p,m)=>{let c=p!=null?p[r]:null,l=m!=null?m[r]:null,v=nn(c,l,o);return n==="desc"?-v:v});en(a,s.arrayPath,g);return}}vo(e,t,r,o,n)}function vo(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let u=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...u]),!n){let m=document.createDocumentFragment();for(let c of t._nojsOriginalRows)m.appendChild(c);i.appendChild(m);return}let g=m=>{let c=m.replace(/[^0-9.\-]/g,"");return c===""||c==="-"?NaN:parseFloat(c)};u.sort((m,c)=>{let l=m.children[a]?.textContent?.trim()||"",v=c.children[a]?.textContent?.trim()||"",y=nn(o==="number"?g(l):l,o==="number"?g(v):v,o);return n==="desc"?-y:y});let p=document.createDocumentFragment();for(let m of u)p.appendChild(m);i.appendChild(p)}function an(t){t.directive("fixed-header",{priority:10,init(e){he(),e.classList.add("nojs-fixed-header")}})}function dn(t){t.directive("fixed-col",{priority:10,init(e){he(),e.classList.add("nojs-fixed-col")}})}function ft(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function cn(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function ln(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function un(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function pn(t){t.directive("table-reorder",{priority:15,init(e){if(he(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",d=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,u=null;function g(){let y=r.querySelectorAll(":scope > tr");for(let f=0;f<y.length;f++){let b=y[f];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let w=!0;if(n){let k=S=>{w=!!S.target.closest(n)};b.addEventListener("mousedown",k),ft(b,()=>b.removeEventListener("mousedown",k))}let h=k=>{if(n&&!w){k.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(b),a=b,k.dataTransfer&&(k.dataTransfer.effectAllowed="move",k.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(A=>b.classList.add(A)),b.setAttribute("aria-grabbed","true")},x=k=>{if(a==null)return;k.preventDefault(),k.dataTransfer&&(k.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),A=S.top+S.height/2,H=[...r.querySelectorAll(":scope > tr")].indexOf(b);p(),H!==s&&(k.clientY<A?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),u=b)},_=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),u===b&&(u=null)},L=k=>{if(k.preventDefault(),k.stopPropagation(),a==null||s==null)return;let S=[...r.querySelectorAll(":scope > tr")],A=b.getBoundingClientRect(),I=A.top+A.height/2,H=S.indexOf(b);k.clientY>=I&&H++;let Z=s;if(Z===H||Z+1===H){m();return}let z=Z<H?H-1:H,se=cn(e);if(se&&o){let T=ln(o,se.arrayPath);if(Array.isArray(T)){let P=[...T],[q]=P.splice(Z,1);P.splice(z,0,q),un(o,se.arrayPath,P),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...P]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:Z,to:z,item:q}}))}}else{let T=a,P=S[z];T&&P&&(Z<z?r.insertBefore(T,P.nextSibling):r.insertBefore(T,P),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:Z,to:z,item:null}})))}m()},j=()=>{m()};b.addEventListener("dragstart",h),b.addEventListener("dragover",x),b.addEventListener("dragleave",_),b.addEventListener("drop",L),b.addEventListener("dragend",j),ft(b,()=>{b.removeEventListener("dragstart",h),b.removeEventListener("dragover",x),b.removeEventListener("dragleave",_),b.removeEventListener("drop",L),b.removeEventListener("dragend",j),b._nojsReorderSetup=!1})}}function p(){u&&(u.classList.remove("nojs-reorder-insert-before"),u.classList.remove("nojs-reorder-insert-after"),u=null)}function m(){a&&(i.split(/\s+/).filter(Boolean).forEach(f=>a.classList.remove(f)),a.setAttribute("aria-grabbed","false")),p(),s=null,a=null;let y=r.querySelectorAll(":scope > tr");for(let f of y)f.classList.remove("nojs-reorder-insert-before"),f.classList.remove("nojs-reorder-insert-after"),d.split(/\s+/).filter(Boolean).forEach(b=>f.classList.remove(b))}let c=y=>{a!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},l=y=>{if(a==null||y.target!==r)return;y.preventDefault(),y.stopPropagation();let f=s,w=[...r.querySelectorAll(":scope > tr")].length-1;if(f===w){m();return}let h=cn(e);if(h&&o){let x=ln(o,h.arrayPath);if(Array.isArray(x)){let _=[...x],[L]=_.splice(f,1);_.push(L),un(o,h.arrayPath,_),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[..._]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:f,to:_.length-1,item:L}}))}}m()};r.addEventListener("dragover",c),r.addEventListener("drop",l);let v=new MutationObserver(()=>{g()});v.observe(r,{childList:!0}),g(),ft(e,()=>{v.disconnect(),r.removeEventListener("dragover",c),r.removeEventListener("drop",l),m()})}})}function fn(t,e={}){on(t),sn(t),an(t),dn(t),pn(t)}function gn(){Jr()}var yo="[validate],[drag],[drop],[drag-list],[drag-multiple]";function mn(t){if(typeof document>"u")return;let e=document.querySelectorAll(yo);for(let r of e){if(!r.__declared)continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var xo=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col"],Eo={name:"nojs-elements",install(t,e={}){wt(t,e),It(t,e),zt(t,e),Vt(t,e),Nt(t,e),sr(t,e),fr(t,e),Er(t,e),Ir(t,e),Mr(t,e),Gr(t,e),Qr(t,e),fn(t,e),mn(t)},init(t){if(mn(t),typeof document>"u"||!document.body)return;let e=xo.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){At(),Bt(),Mt(),Wt(),Jt(),ar(),gr(),wr(),Br(),Hr(),Nr(),gn()}},wo=Eo;
//# sourceMappingURL=nojs-elements.js.map
