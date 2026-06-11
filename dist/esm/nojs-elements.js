/**
 * NoJS Elements v1.14.1 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
var E={dragging:null,selected:new Map,placeholder:null},Fe=new Map;function Ct(){E.dragging=null,E.selected.clear(),E.placeholder&&(E.placeholder.remove(),E.placeholder=null),Fe.clear()}function Me(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Oe(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Pe(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Pe(r):e++}return e}function $e(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let a=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let s=a.left+a.width/2;if(e<s)return i}else if(o==="grid"){let s=a.left+a.width/2,l=a.top+a.height/2;if(r<l&&e<s||r<a.top+a.height&&e<s)return i}else{let s=a.top+a.height/2;if(r<s)return i}}return n.length}function St(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",E.dragging&&E.dragging.sourceEl){let a=(E.dragging.sourceEl.firstElementChild||E.dragging.sourceEl).getBoundingClientRect();a.height>0&&(n.style.height=a.height+"px"),a.width>0&&(n.style.width=a.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),E.placeholder=n}function re(){E.placeholder&&(E.placeholder.remove(),E.placeholder=null)}function fe(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function ao(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,a=getComputedStyle(o),s=Math.min(e,3);for(let m=s-1;m>=0;m--){let d=document.createElement("div"),g=m*4;if(d.style.cssText="position:absolute;top:"+g+"px;left:"+g+"px;width:"+i+"px;height:"+c+"px;border-radius:"+a.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",m===0){let u=o.cloneNode(!0);for(;u.firstChild;)d.appendChild(u.firstChild);d.style.background=a.backgroundColor||"#fff",d.style.border=a.border,d.style.padding=a.padding,d.style.fontSize=a.fontSize,d.style.color=a.color,d.style.fontFamily=a.fontFamily}else d.style.background=a.backgroundColor||"#fff",d.style.border=a.border||"1px solid #ddd";r.appendChild(d)}let l=document.createElement("div");return l.textContent=e,l.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(l),r.style.width=i+(s-1)*4+"px",r.style.height=c+(s-1)*4+"px",r}function Tt(t){Oe(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Me();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",c=e.getAttribute("drag-effect")||"move",a=e.getAttribute("drag-handle"),s=e.getAttribute("drag-image"),l=e.getAttribute("drag-image-offset")||"0,0",m=e.getAttribute("drag-disabled"),d=e.getAttribute("drag-class")||"nojs-dragging",g=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let u=!0;if(a){let p=b=>{u=!!b.target.closest(a)};e.addEventListener("mousedown",p),ae(e,()=>e.removeEventListener("mousedown",p))}let f=p=>{if(a&&!u){p.preventDefault();return}if(m&&t.evaluate(m,n)){p.preventDefault();return}let b=t.evaluate(o,n),w=e.getAttribute("drag-group"),y=b;if(w&&E.selected.has(w)){let x=E.selected.get(w);x.size>0&&[...x].some(L=>L.el===e)&&(y=[...x].map(L=>L.item))}if(E.dragging={item:y,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},p.dataTransfer){if(p.dataTransfer.effectAllowed=c,p.dataTransfer.setData("text/plain",""),Array.isArray(y)&&y.length>1&&p.dataTransfer.setDragImage){let x=ao(e,y.length);document.body.appendChild(x);let A=e.getBoundingClientRect();p.dataTransfer.setDragImage(x,A.width/2,A.height/2),requestAnimationFrame(()=>x.remove())}else if(s&&p.dataTransfer.setDragImage)if(s==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[A,L]=l.split(",").map(Number);p.dataTransfer.setDragImage(x,A||0,L||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(s);if(x){let[A,L]=l.split(",").map(Number);g&&x.classList.add(g),p.dataTransfer.setDragImage(x,A||0,L||0)}}}if(d.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(y)&&w&&E.selected.has(w))for(let x of E.selected.get(w))x.el!==e&&d.split(/\s+/).filter(Boolean).forEach(A=>x.el.classList.add(A));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:y,index:E.dragging.sourceIndex,el:e}}))},h=()=>{d.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let p=e.getAttribute("drag-group");if(p&&E.selected.has(p))for(let b of E.selected.get(p))d.split(/\s+/).filter(Boolean).forEach(w=>b.el.classList.remove(w));if(e.setAttribute("aria-grabbed","false"),g&&s&&s!=="none"){let b=e.querySelector(s);b&&b.classList.remove(g)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:E.dragging?.item,index:E.dragging?.sourceIndex,dropped:E.dragging===null}})),E.dragging=null,re()};if(e.addEventListener("dragstart",f),e.addEventListener("dragend",h),ae(e,()=>{e.removeEventListener("dragstart",f),e.removeEventListener("dragend",h)}),m){let p=function(){let w=!!t.evaluate(m,n);e.draggable=!w,w?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},b=n.$watch(p);ae(e,b)}let v=p=>{if(E.dragging&&!E.dragging.sourceEl.isConnected&&(E.dragging=null),p.key===" "&&!E.dragging){p.preventDefault();let b=t.evaluate(o,n);E.dragging={item:b,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},d.split(/\s+/).filter(Boolean).forEach(w=>e.classList.add(w)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else p.key==="Escape"&&E.dragging&&E.dragging.sourceEl===e&&(p.preventDefault(),d.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),e.setAttribute("aria-grabbed","false"),E.dragging=null,re())};e.addEventListener("keydown",v),ae(e,()=>e.removeEventListener("keydown",v))}})}function Dt(t){Oe(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Me();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",c=e.getAttribute("drop-effect")||"move",a=e.getAttribute("drop-class")||"nojs-drag-over",s=e.getAttribute("drop-reject-class")||"nojs-drop-reject",l=e.getAttribute("drop-disabled"),m=e.getAttribute("drop-max"),d=e.getAttribute("drop-sort"),g=e.getAttribute("drop-placeholder"),u=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",c);let f=0,h=y=>{if(!E.dragging||l&&t.evaluate(l,n))return;let x=fe(E.dragging.type,i),A=!0;if(m){let L=t.evaluate(m,n),k=Pe(e);typeof L=="number"&&k>=L&&(A=!1)}if(!x||!A){s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),re();return}if(s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect=c),d){let L=$e(e,y.clientX,y.clientY,d);g&&St(e,L,g,u),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:E.dragging.item,index:L}}))}},v=y=>{if(E.dragging&&!(l&&t.evaluate(l,n))&&(f++,f===1)){let x=fe(E.dragging.type,i),A=!0;if(m){let L=t.evaluate(m,n),k=Pe(e);typeof L=="number"&&k>=L&&(A=!1)}x&&A?(a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L))}},p=y=>{E.dragging&&(f--,f<=0&&(f=0,a.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),s.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging.item}}))))},b=y=>{if(y.preventDefault(),y.stopPropagation(),f=0,!E.dragging||l&&t.evaluate(l,n)||!fe(E.dragging.type,i))return;if(m){let _=t.evaluate(m,n),B=Pe(e);if(typeof _=="number"&&B>=_)return}let x=E.dragging.item,A=E.dragging.type,L=E.dragging.effect,k=0;d&&(k=$e(e,y.clientX,y.clientY,d)),a.split(/\s+/).filter(Boolean).forEach(_=>e.classList.remove(_)),s.split(/\s+/).filter(Boolean).forEach(_=>e.classList.remove(_)),re();let j={$drag:x,$dragType:A,$dragEffect:L,$dropIndex:k,$source:{list:E.dragging.sourceList,index:E.dragging.sourceIndex,el:E.dragging.sourceEl},$target:{list:null,index:k,el:e},$el:e},S=K(t,"execStatement");typeof S=="function"?S(o,n,j):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),E.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:x,index:k,source:j.$source,target:j.$target,effect:L}}))},w=y=>{E.dragging&&(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),b(y))};e.addEventListener("dragover",h),e.addEventListener("dragenter",v),e.addEventListener("dragleave",p),e.addEventListener("drop",b),e.addEventListener("keydown",w),ae(e,()=>{e.removeEventListener("dragover",h),e.removeEventListener("dragenter",v),e.removeEventListener("dragleave",p),e.removeEventListener("drop",b),e.removeEventListener("keydown",w)})}})}function It(t){Oe(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Me();let n=t.findContext(e),i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),a=e.getAttribute("drag-list-item")||"item",s=e.getAttribute("drop-sort")||"vertical",l=e.getAttribute("drag-type")||"__draglist_"+o,m=e.getAttribute("drop-accept")||l,d=e.hasAttribute("drag-list-copy"),g=e.hasAttribute("drag-list-remove"),u=e.getAttribute("drag-disabled"),f=e.getAttribute("drop-disabled"),h=e.getAttribute("drop-max"),v=e.getAttribute("drop-placeholder"),p=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",w=e.getAttribute("drop-class")||"nojs-drag-over",y=e.getAttribute("drop-reject-class")||"nojs-drop-reject",x=e.getAttribute("drop-settle-class")||"nojs-drop-settle",A=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",d?"copy":"move");let L={listPath:o,ctx:n,el:e};Fe.set(e,L),ae(e,()=>Fe.delete(e));let k=0,j=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===j&&T.length>0&&e.children.length>0){for(let O of e.children)O.__ctx&&O.__ctx.$notify&&O.__ctx.$notify();return}j=T;let q=i?document.getElementById(i):null;if(!q)return;let F=K(t,"disposeChildren");typeof F=="function"&&F(e),e.innerHTML="";let H=T.length;T.forEach((O,P)=>{let ee={[a]:O,$index:P,$count:H,$first:P===0,$last:P===H-1,$even:P%2===0,$odd:P%2!==0},G=t.createContext(ee,n),Q=q.content.cloneNode(!0),R=document.createElement("div");R.style.display="contents",R.__ctx=G,R.appendChild(Q),e.appendChild(R);let U=R.firstElementChild||R;U.draggable=!0,U.setAttribute("role","option"),U.setAttribute("aria-grabbed","false"),U.getAttribute("tabindex")||U.setAttribute("tabindex","0");let ze=V=>{if(u&&t.evaluate(u,n)){V.preventDefault();return}E.dragging={item:O,type:l,effect:d?"copy":"move",sourceEl:R,sourceCtx:G,sourceList:T,sourceIndex:P,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:d,removeMode:g}},V.dataTransfer&&(V.dataTransfer.effectAllowed=d?"copy":"move",V.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(J=>U.classList.add(J)),U.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:O,index:P,el:U}}))},jt=()=>{b.split(/\s+/).filter(Boolean).forEach(V=>U.classList.remove(V)),U.setAttribute("aria-grabbed","false"),E.dragging&&E.dragging.sourceEl===R&&(E.dragging=null),re()};R.addEventListener("dragstart",ze),R.addEventListener("dragend",jt);let kt=V=>{if(V.key===" "&&!E.dragging)V.preventDefault(),V.stopPropagation(),E.dragging={item:O,type:l,effect:d?"copy":"move",sourceEl:R,sourceCtx:G,sourceList:T,sourceIndex:P,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:d,removeMode:g}},b.split(/\s+/).filter(Boolean).forEach(J=>U.classList.add(J)),U.setAttribute("aria-grabbed","true");else if(V.key==="Escape"&&E.dragging){V.preventDefault(),V.stopPropagation();let J=e.querySelector('[aria-grabbed="true"]')||U;b.split(/\s+/).filter(Boolean).forEach(it=>J.classList.remove(it)),J.setAttribute("aria-grabbed","false"),E.dragging=null,re()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&E.dragging&&E.dragging.sourceEl===R){V.preventDefault();let J=R.nextElementSibling;J&&(J.firstElementChild||J).focus()}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&E.dragging&&E.dragging.sourceEl===R){V.preventDefault();let J=R.previousElementSibling;J&&(J.firstElementChild||J).focus()}};R.addEventListener("keydown",kt),R.__disposers=R.__disposers||[],R.__disposers.push(()=>R.removeEventListener("dragstart",ze),()=>R.removeEventListener("dragend",jt),()=>R.removeEventListener("keydown",kt)),t.processTree(R)});let z=T.length===0;A.split(/\s+/).filter(Boolean).forEach(O=>e.classList.toggle(O,z))}let _=T=>{if(!E.dragging||f&&t.evaluate(f,n))return;let q=fe(E.dragging.type,m),F=!0;if(h){let z=t.evaluate(h,n),O=t.resolve(o,n);typeof z=="number"&&Array.isArray(O)&&O.length>=z&&(F=!1)}if(!q||!F){y.split(/\s+/).filter(Boolean).forEach(z=>e.classList.add(z)),w.split(/\s+/).filter(Boolean).forEach(z=>e.classList.remove(z)),re();return}y.split(/\s+/).filter(Boolean).forEach(z=>e.classList.remove(z)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=d?"copy":"move");let H=$e(e,T.clientX,T.clientY,s);v&&St(e,H,v,p)},B=T=>{if(E.dragging&&!(f&&t.evaluate(f,n))&&(k++,k===1)){let q=fe(E.dragging.type,m),F=!0;if(h){let H=t.evaluate(h,n),z=t.resolve(o,n);typeof H=="number"&&Array.isArray(z)&&z.length>=H&&(F=!1)}q&&F?(w.split(/\s+/).filter(Boolean).forEach(H=>e.classList.add(H)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):y.split(/\s+/).filter(Boolean).forEach(H=>e.classList.add(H))}},$=()=>{E.dragging&&(k--,k<=0&&(k=0,w.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),y.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging?.item}}))))},X=T=>{if(T.preventDefault(),T.stopPropagation(),k=0,!E.dragging||f&&t.evaluate(f,n)||!fe(E.dragging.type,m))return;if(h){let G=t.evaluate(h,n),Q=t.resolve(o,n);if(typeof G=="number"&&Array.isArray(Q)&&Q.length>=G)return}let q=E.dragging.item,F=E.dragging.listDirective,H=E.dragging.sourceIndex,z=$e(e,T.clientX,T.clientY,s);w.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),y.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),re();let O=t.resolve(o,n);if(!Array.isArray(O))return;let P=F&&F.el===e;if(P&&H===z){E.dragging=null;return}if(P&&H+1===z){E.dragging=null;return}let ee=[...O];if(P){let[G]=ee.splice(H,1),Q=H<z?z-1:z;ee.splice(Q,0,G),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:q,from:H,to:Q}}))}else{let G=d&&typeof q=="object"?{...q}:q;if(ee.splice(z,0,G),n.$set(o,ee),F&&!F.copyMode&&(g||F.removeMode)){let Q=t.resolve(F.listPath,F.ctx);if(Array.isArray(Q)&&H!=null){let R=Q.filter((U,ze)=>ze!==H);F.ctx.$set(F.listPath,R),F.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:R,item:q,index:H}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:q,from:H,fromList:F?t.resolve(F.listPath,F.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][P&&H<z?z-1:z];if(Q){let R=Q.firstElementChild||Q;x.split(/\s+/).filter(Boolean).forEach(U=>R.classList.add(U)),R.addEventListener("animationend",()=>{x.split(/\s+/).filter(Boolean).forEach(U=>R.classList.remove(U))},{once:!0})}}),E.dragging=null},M=T=>{if(E.dragging&&fe(E.dragging.type,m)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let q=e.querySelector(":focus");if(q){let H=(q.style?.display==="contents"&&q.firstElementChild||q).getBoundingClientRect(),z={preventDefault(){},stopPropagation(){},clientX:H.left+H.width/2,clientY:H.top+H.height+1,dataTransfer:null};X(z)}}};e.addEventListener("dragover",_),e.addEventListener("dragenter",B),e.addEventListener("dragleave",$),e.addEventListener("drop",X),e.addEventListener("keydown",M),ae(e,()=>{e.removeEventListener("dragover",_),e.removeEventListener("dragenter",B),e.removeEventListener("dragleave",$),e.removeEventListener("drop",X),e.removeEventListener("keydown",M)});let se=n.$watch(S);ae(e,se),S()}})}function Bt(t){Oe(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}E.selected.has(n)||E.selected.set(n,new Set);let c=E.selected.get(n),a=l=>{let m=e.getAttribute("drag"),g={item:m?t.evaluate(m,o):null,el:e,ctx:o};if(l.ctrlKey||l.metaKey){let u=[...c].find(f=>f.el===e);u?(c.delete(u),i.split(/\s+/).filter(Boolean).forEach(f=>e.classList.remove(f))):(c.add(g),i.split(/\s+/).filter(Boolean).forEach(f=>e.classList.add(f)))}else{for(let u of c)i.split(/\s+/).filter(Boolean).forEach(f=>u.el.classList.remove(f));c.clear(),c.add(g),i.split(/\s+/).filter(Boolean).forEach(u=>e.classList.add(u))}};e.addEventListener("click",a),ae(e,()=>{e.removeEventListener("click",a);let l=[...c].find(m=>m.el===e);l&&c.delete(l)});let s=l=>{if(l.key==="Escape"){for(let m of c)i.split(/\s+/).filter(Boolean).forEach(d=>m.el.classList.remove(d));c.clear()}};window.addEventListener("keydown",s),ae(e,()=>window.removeEventListener("keydown",s))}})}function Ht(t,e={}){Tt(t),Dt(t),It(t),Bt(t)}function qt(){Ct()}var Rt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],st=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var me,$t,Ne,at,ct,zt,Ve,dt,Ft;function co(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function lo(t){return(t.getAttribute("type")||"text").toLowerCase()}function uo(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(a=>a.trim());for(let a of c){let[s,...l]=a.split(":"),m=me[s];if(m){let d=m(t.value,...l,e);d!==!0&&d&&(r.push({rule:s,message:d}),o.add(s))}else{let d=t.value,g=null;switch(s){case"required":(d==null||String(d).trim()==="")&&(g="Required");break;case"email":d&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d)&&(g="Invalid email");break;case"url":try{new URL(d)}catch{g="Invalid URL"}break;case"min":Number(d)<Number(l[0])&&(g=`Minimum value is ${l[0]}`);break;case"max":Number(d)>Number(l[0])&&(g=`Maximum value is ${l[0]}`);break;case"custom":if(l[0]&&me[l[0]]){let u=me[l[0]](d,e);u!==!0&&u&&(g=u)}break}g&&(r.push({rule:s,message:g}),o.add(s))}}}let i=t.validity;if(i&&!i.valid){for(let[c,a]of Rt)if(i[c]){let s=a||lo(t);o.has(s)||(r.push({rule:s,message:t.validationMessage}),o.add(s))}}return r}function po(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function fo(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=st.indexOf(n.rule),a=st.indexOf(i.rule);return(c===-1?999:c)-(a===-1?999:a)})[0];return{rule:o.rule,message:po(e,o.rule,o.message)}}function Ot(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function mo(t,e,r,o,n){let i=Ot(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;dt(i),i.remove()}let c=document.querySelector(t);if(!c)return;let a=c.content.cloneNode(!0),s=document.createElement("div");s.style.display="contents",s.__errorTemplateFor=o;let l=Ne({$error:e,$rule:r},n);s.__ctx=l,s.appendChild(a),c.parentNode.insertBefore(s,c.nextSibling),co(s),ct(s)}function Mt(t){let e=Ot(t);e&&(dt(e),e.remove())}function go(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!$t(r,e)}catch{return!0}}function Pt(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function bo(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),a=me[i];if(a){let s=a(t,...c,r);if(s!==!0&&s)return s}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&me[c[0]]){let s=me[c[0]](t,r);if(s!==!0&&s)return s}break}}return null}function ho(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return at(t);let e=Ne({},null);return t.__ctx=e,e}function Vt(t){me=K(t,"validators")||{},$t=t.evaluate,Ne=t.createContext,at=t.findContext,ct=t.processTree,zt=K(t,"cloneTemplate")||(()=>null),Ve=K(t,"disposeChildren")||(()=>{}),dt=K(t,"disposeTree")||Ve,Ft=K(t,"warn")||console.warn;let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):Ft('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let g=function(){c&&typeof c.$notify=="function"&&c.$notify();let y=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;y.nextNode();){let A=y.currentNode.__ctx;A&&A!==c&&typeof A.$notify=="function"&&A.$notify()}},u=function(){return r.querySelectorAll("input, textarea, select")},f=function(){let y={},x={},A={},L=!0,k=null,j=0,S=!1;for(let _ of u())_.name&&(_.type==="checkbox"?x[_.name]=_.checked:_.type==="radio"?_.checked?x[_.name]=_.value:_.name in x||(x[_.name]=""):x[_.name]=_.value);for(let _ of u()){if(!_.name)continue;let B=s.has(_.name),$=l.has(_.name);if(!go(_,c)){A[_.name]={valid:!0,dirty:$,touched:B,error:null,value:x[_.name]};continue}let X=uo(_,x),M=fo(X,_),se=!M,T=Pt(_,r),q=T.includes("input"),F=T.includes("blur")||T.includes("focusout")||T.includes("submit"),H;!_.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?H=B||$:H=q&&$||F&&B,se||(L=!1),!se&&H&&(y[_.name]=M.message,j++,k||(k=M.message)),A[_.name]={valid:se,dirty:$,touched:B,error:M?M.message:null,value:x[_.name]};let z=_.getAttribute("error-class")||a;if(z){let P=z.split(/\s+/);!se&&H?_.classList.add(...P):_.classList.remove(...P)}if(M&&H){let P=_.getAttribute(`error-${M.rule}`),ee=_.getAttribute("error"),G=(P&&P.startsWith("#")?P:null)||(ee&&ee.startsWith("#")?ee:null);G?mo(G,M.message,M.rule,_,c):Mt(_)}else Mt(_);let O=_.getAttribute("as");O&&c.$set(O,A[_.name])}m.size>0&&(S=!0),d.valid=L,d.errors=y,d.values=x,d.fields=A,d.firstError=k,d.errorCount=j,d.pending=S,c.$set("$form",{...d}),g(),h(r)},h=function(y){let x=d.valid&&!d.pending&&!d.submitting,A=y.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of A){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let k=L.getAttribute("disabled");if(k!=="disabled"&&k!=="true"&&k!=="false")continue}L.disabled=!x,L.__autoDisabled=!0}},v=function(y){if(!y.name)return;let x=Pt(y,r),A=()=>{l.add(y.name),d.dirty=!0,f()},L=()=>{s.add(y.name),d.touched=!0,f()};if(x.includes("input"))y.addEventListener("input",A),ne(r,()=>y.removeEventListener("input",A));else{let k=()=>{l.add(y.name),d.dirty=!0,f()};y.addEventListener("input",k),ne(r,()=>y.removeEventListener("input",k))}if(x.includes("blur")||x.includes("focusout")){let k=()=>{L(),x.includes("blur")&&A()};y.addEventListener("focusout",k),ne(r,()=>y.removeEventListener("focusout",k))}else y.addEventListener("focusout",L),ne(r,()=>y.removeEventListener("focusout",L));x.includes("submit")&&(y.addEventListener("focusout",L),ne(r,()=>y.removeEventListener("focusout",L)))},c=ho(r);r.setAttribute("novalidate","");let a=r.getAttribute("error-class"),s=new Set,l=new Set,m=new Map,d={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{d.dirty=!1,d.touched=!1,d.pending=!1,d.submitting=!1,s.clear(),l.clear(),r.reset(),f()},endSubmit:()=>{d.submitting=!1,f()}};c.$set("$form",d);let p=r.hasAttribute("validate-on"),b=[...u()].some(y=>y.hasAttribute("validate-on"));if(!p&&!b){let y=A=>{let L=A.target;L&&L.name&&l.add(L.name),d.dirty=!0,f()};r.addEventListener("input",y),ne(r,()=>r.removeEventListener("input",y)),r.addEventListener("change",y),ne(r,()=>r.removeEventListener("change",y));let x=A=>{A.target&&A.target.name&&s.add(A.target.name),d.touched=!0,f()};r.addEventListener("focusout",x),ne(r,()=>r.removeEventListener("focusout",x))}else for(let y of u())v(y);let w=y=>{for(let x of u())x.name&&s.add(x.name);if(d.touched=!0,f(),!d.valid||d.pending){y.preventDefault(),y.stopImmediatePropagation();return}d.submitting=!0,h(r),c.$set("$form",{...d}),g()};r.addEventListener("submit",w,!0),ne(r,()=>r.removeEventListener("submit",w,!0)),r.__nojsResetSubmitting=()=>{d.submitting=!1,f()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(f);return}let i=at(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),a=()=>{let s=bo(r.value,n,{});if(s&&c){let l=r.nextElementSibling?.__validationError?r.nextElementSibling:null;l||(l=document.createElement("div"),l.__validationError=!0,l.style.display="contents",r.parentNode.insertBefore(l,r.nextSibling));let m=zt(c);if(m){let d=Ne({err:{message:s}},i);Ve(l),l.innerHTML="",l.__ctx=d,l.appendChild(m),ct(l)}}else{let l=r.nextElementSibling?.__validationError?r.nextElementSibling:null;l&&(Ve(l),l.innerHTML="")}};r.addEventListener("input",a),ne(r,()=>r.removeEventListener("input",a))}}})}function Nt(t,e={}){Vt(t)}function Wt(){}var xe=new Map,te=new Map;function Gt(){let t=Array.from(xe.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of te.values())clearTimeout(e);te.clear();for(let e of xe.values())e.remove();xe.clear()}function Ut(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function vo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var We=8;function Kt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,a,s;switch(r){case"bottom":a=o.bottom+We,s=o.left+(o.width-n.width)/2;break;case"left":a=o.top+(o.height-n.height)/2,s=o.left-n.width-We;break;case"right":a=o.top+(o.height-n.height)/2,s=o.right+We;break;default:a=o.top-n.height-We,s=o.left+(o.width-n.width)/2;break}s<4&&(s=4),s+n.width>i-4&&(s=i-n.width-4),a<4&&(a=4),a+n.height>c-4&&(a=c-n.height-4),t.style.top=`${a}px`,t.style.left=`${s}px`}var yo=0;function xo(t,e,r){document.body.appendChild(e),Kt(e,t,r),e.setAttribute("aria-hidden","false")}function Yt(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Eo(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Xt(t){t.directive("tooltip",{priority:20,init(e,r,o){Ut();let n=o;if(!n){Eo(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),a=Number.isNaN(c)?300:c,s=e.getAttribute("tooltip-disabled"),l=s?t.findContext(e):null,m=()=>{if(!s||!l)return!1;try{return!!t.evaluate(s,l)}catch{return!1}},d=`nojs-tooltip-${++yo}`,g=document.createElement("div");g.className="nojs-tooltip",g.setAttribute("role","tooltip"),g.setAttribute("id",d),g.setAttribute("aria-hidden","true"),g.textContent=n,e.setAttribute("aria-describedby",d),xe.set(e,g);let u=!1,f=0,h=()=>{!u||!e.isConnected||f||(f=requestAnimationFrame(()=>{f=0,!(!u||!e.isConnected)&&Kt(g,e,i)}))},v=()=>{window.addEventListener("scroll",h,!0),window.addEventListener("resize",h)},p=()=>{window.removeEventListener("scroll",h,!0),window.removeEventListener("resize",h),f&&(cancelAnimationFrame(f),f=0)},b=()=>{u||(xo(e,g,i),u=!0,v())},w=()=>{if(!u){Yt(e,g);return}p(),Yt(e,g),u=!1},y=()=>{if(m())return;te.has(e)&&clearTimeout(te.get(e));let B=setTimeout(()=>{te.delete(e),!m()&&e.isConnected&&b()},a);te.set(e,B)},x=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),w()},A=()=>y(),L=()=>x(),k=()=>y(),j=()=>x(),S=B=>{B.key==="Escape"&&g.getAttribute("aria-hidden")==="false"&&x()};e.addEventListener("mouseenter",A),e.addEventListener("mouseleave",L),e.addEventListener("focusin",k),e.addEventListener("focusout",j),e.addEventListener("keydown",S);let _=null;if(s&&l&&typeof l.$watch=="function"){let B=()=>{u&&m()&&w()};_=l.$watch(B)}vo(e,()=>{e.removeEventListener("mouseenter",A),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",k),e.removeEventListener("focusout",j),e.removeEventListener("keydown",S),_&&(_(),_=null),p(),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),u=!1,g.remove(),xe.delete(e)})}})}function Zt(t,e={}){Xt(t)}function Qt(){Gt()}var Y=new Map;function Jt(){Y.clear()}function Ge(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function lt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ee(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var ce=8;function Ue(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,a,s;switch(r){case"top":a=o.top-n.height-ce,s=o.left+(o.width-n.width)/2;break;case"left":a=o.top+(o.height-n.height)/2,s=o.left-n.width-ce;break;case"right":a=o.top+(o.height-n.height)/2,s=o.right+ce;break;default:a=o.bottom+ce,s=o.left+(o.width-n.width)/2;break}r==="bottom"&&a+n.height>c&&(a=o.top-n.height-ce),r==="top"&&a<0&&(a=o.bottom+ce),r==="right"&&s+n.width>i&&(s=o.left-n.width-ce),r==="left"&&s<0&&(s=o.right+ce),s<4&&(s=4),s+n.width>i-4&&(s=i-n.width-4),a<4&&(a=4),a+n.height>c-4&&(a=c-n.height-4),t.style.top=`${a}px`,t.style.left=`${s}px`}function ut(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(typeof c.matches=="function"&&!c.matches(":popover-open")){i();return}Ue(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function ge(t){t&&t._untrack&&t._untrack()}function er(t){t.directive("popover",{priority:20,init(r,o,n){Ge();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let s=Y.get(i);s.popoverEl=r,s.position=c}let a=s=>{let l=Y.get(i);if(!l)return;let m=s.newState==="open";l.open=m;for(let d of l.triggerEls)d.setAttribute("aria-expanded",String(m));m||ge(l)};r.addEventListener("toggle",a),lt(r,()=>{r.removeEventListener("toggle",a);let s=Y.get(i);s&&(ge(s),s.popoverEl===r&&(s.popoverEl=null,s.open=!1),!s.popoverEl&&s.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){Ge();let i=n;if(!i){let s=r.closest("[use]")||r.parentElement,l=s?.querySelector("[data-popover-id]")||s?.querySelector("[popover]");if(l&&(i=l.getAttribute("data-popover-id")||l.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let c=s=>{let l=Y.get(i);if(!l||!l.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}Ee(l.popoverEl)&&(l.popoverEl.togglePopover(),requestAnimationFrame(()=>{l.popoverEl.matches(":popover-open")?(Ue(l.popoverEl,r,l.position),ut(l,r)):ge(l)}))};r.addEventListener("click",c);let a=s=>{let l=Y.get(i);s.key==="Escape"&&l?.open&&(Ee(l.popoverEl,"hidePopover")&&l.popoverEl.hidePopover(),ge(l),r.focus())};document.addEventListener("keydown",a),lt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",a);let s=Y.get(i);s&&(s.triggerEls.delete(r),!s.popoverEl&&s.triggerEls.size===0&&(ge(s),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){Ge();let o=()=>{let n=r.closest(".nojs-popover");!n||!Ee(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),lt(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Ee(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{Ue(n.popoverEl,i,n.position),ut(n,i)}),!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!Ee(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return ge(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!Ee(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{Ue(n.popoverEl,i,n.position),ut(n,i)}):ge(n),!0},t.popover=e}function tr(t,e={}){er(t)}function rr(){Jt()}var N=[],oe=new Map,_o=1e4;function nr(){return _o+N.length}function or(){N.length=0,oe.clear()}function _e(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function wo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var sr='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',pt=new WeakMap;function Ao(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(sr)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),pt.set(t,e)}function ir(t){let e=pt.get(t);e&&(t.removeEventListener("keydown",e),pt.delete(t))}var De=new WeakMap;function ar(t){t.directive("modal",{priority:10,init(r,o,n){_e();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let a=r.getAttribute("modal-backdrop");a==="false"&&r.setAttribute("data-nojs-no-backdrop","");let s=r.getAttribute("modal-class"),l=r.getAttribute("modal-escape"),m=g=>{g.target===r&&a!=="false"&&l!=="false"&&we(r,i)};r.addEventListener("click",m),oe.set(i,r);let d=g=>{if(g.newState==="open"){if(r.style.zIndex=String(nr()),s&&s.split(/\s+/).filter(Boolean).forEach(u=>r.classList.add(u)),requestAnimationFrame(()=>{if(!r.isConnected||!N.some(f=>f.el===r))return;let u=r.querySelector(sr);u?u.focus():r.focus()}),Ao(r),l!=="false"){let u=f=>{f.key==="Escape"&&(f.stopPropagation(),we(r,i))};r.addEventListener("keydown",u),De.set(r,u)}}else if(g.newState==="closed"){s&&s.split(/\s+/).filter(Boolean).forEach(h=>r.classList.remove(h)),ir(r);let u=De.get(r);u&&(r.removeEventListener("keydown",u),De.delete(r));let f=N.findIndex(h=>h.el===r);if(f===-1&&(f=N.findIndex(h=>h.id===i)),f!==-1){let h=N[f];N.splice(f,1),h.triggerEl&&requestAnimationFrame(()=>{h.triggerEl.focus()})}}};r.addEventListener("toggle",d),wo(r,()=>{r.removeEventListener("click",m),r.removeEventListener("toggle",d),ir(r);let g=De.get(r);g&&(r.removeEventListener("keydown",g),De.delete(r)),oe.delete(i);let u=N.findIndex(f=>f.el===r);u===-1&&(u=N.findIndex(f=>f.id===i)),u!==-1&&N.splice(u,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return N.some(n=>n.id===r)||N.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=oe.get(r);return o?(we(o,r),!0):!1},e.closeAll=()=>{for(let r=N.length-1;r>=0;r--)we(N[r].el,N[r].id)},t.modal=e}function we(t,e){try{t.hidePopover()}catch{}}function cr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Lo(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function dr(t){t.directive("modal-open",{priority:10,init(e,r,o){_e();let n=o;if(!n){let d=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(d&&(n=d.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let m=oe.get(n)||Lo(n);if(!m){console.warn(`[modal-open] modal "${n}" not found`);return}let d=N.some(g=>g.id===n);m.id&&e.setAttribute("aria-controls",m.id);try{m.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}d||N.push({id:n,el:m,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},a=null,s=null,l=()=>{let m=oe.get(n);return m?(s=m,a=d=>{d.newState==="closed"&&e.setAttribute("aria-expanded","false")},m.addEventListener("toggle",a),!0):!1};if(!l()){let m=requestAnimationFrame(l);cr(e,()=>cancelAnimationFrame(m))}e.addEventListener("click",i),cr(e,()=>{e.removeEventListener("click",i),s&&a&&s.removeEventListener("toggle",a)})}})}function jo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function lr(t){t.directive("modal-close",{priority:10,init(e,r,o){_e();let n=()=>{let i,c;if(o){if(c=o,i=oe.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}we(i,c)};e.addEventListener("click",n),jo(e,()=>{e.removeEventListener("click",n)})}})}function ur(t,e={}){ar(t),dr(t),lr(t)}function pr(){or()}var de={openMenus:new Map};function fr(){de.openMenus.clear()}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var ko=0;function Co(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function mr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),a=window.innerHeight,s=window.innerWidth,l,m;switch(o){case"top":l=i.top-c.height,m=i.left;break;case"left":l=i.top,m=i.left-c.width;break;case"right":l=i.top,m=i.right;break;default:l=i.bottom,m=i.left}o==="bottom"||o==="top"?n==="end"&&(m=i.right-c.width):n==="end"&&(l=i.bottom-c.height),o==="bottom"&&l+c.height>a&&i.top-c.height>0?l=i.top-c.height:o==="top"&&l<0&&i.bottom+c.height<=a&&(l=i.bottom),m<4&&(m=4),m+c.width>s-4&&(m=s-c.width-4),t.style.top=`${l}px`,t.style.left=`${m}px`}function mt(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function ft(t){let e=mt(t);e.length&&e[0].focus()}function gr(t){let e=mt(t);e.length&&e[e.length-1].focus()}function br(t){t.directive("dropdown",{priority:15,init(r){Ae()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ae();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${ko++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function a(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),mr(n,r,o),de.openMenus.set(n,{toggle:r,wrapper:o})}function s(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),de.openMenus.delete(n)}function l(){return r.getAttribute("aria-expanded")==="true"}let m=p=>{p.newState==="closed"&&l()&&s()};n.addEventListener("toggle",m);let d=p=>{p.preventDefault(),p.stopPropagation(),l()?s():a()};r.addEventListener("click",d);let g=p=>{l()&&!o.contains(p.target)&&s()};document.addEventListener("click",g,!0);let u=p=>{p.key==="Escape"&&l()&&(s(),r.focus())};document.addEventListener("keydown",u);let f=p=>{switch(p.key){case"Enter":case" ":p.preventDefault(),a(),ft(n);break;case"ArrowDown":p.preventDefault(),a(),ft(n);break;case"ArrowUp":p.preventDefault(),a(),gr(n);break}};r.addEventListener("keydown",f);let h=p=>{if(!(!l()||mt(n).find(y=>y===document.activeElement)))switch(p.key){case"ArrowDown":p.preventDefault(),ft(n);break;case"ArrowUp":p.preventDefault(),gr(n);break}};n.addEventListener("keydown",h);let v=()=>{l()&&mr(n,r,o)};window.addEventListener("scroll",v,!0),window.addEventListener("resize",v),Co(r,()=>{r.removeEventListener("click",d),r.removeEventListener("keydown",f),n.removeEventListener("keydown",h),n.removeEventListener("toggle",m),document.removeEventListener("click",g,!0),document.removeEventListener("keydown",u),window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),de.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){Ae(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function hr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function So(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function gt(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),de.openMenus.has(t)&&de.openMenus.delete(t)}function vr(t){t.directive("dropdown-item",{priority:15,init(e){Ae();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let a=So(r),s=a.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(s+1<a.length?a[s+1]:a[0]).focus();break}case"ArrowUp":{c.preventDefault(),(s-1>=0?a[s-1]:a[a.length-1]).focus();break}case"Home":{c.preventDefault(),a.length&&a[0].focus();break}case"End":{c.preventDefault(),a.length&&a[a.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),gt(r,o),o){let l=o.querySelector("[dropdown-toggle]");l&&l.focus()}break}case"Tab":{gt(r,o);break}}};e.addEventListener("keydown",n),hr(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(gt(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),hr(e,()=>e.removeEventListener("click",i))}})}function yr(t,e={}){br(t),vr(t)}function xr(){fr()}var ie=new Map,Le=new Set,Er=0;function _r(){return++Er}function wr(){for(let t of Le)clearTimeout(t);Le.clear();for(let t of ie.values())t.remove();ie.clear(),Er=0}function Ar(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function bt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var To=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function ht(){return ie.size>0?ie.values().next().value:Do("top-right")}function Do(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function Io(t){return t.startsWith("top")}function vt(t,e,r,o,n){let i=_r(),c=t.getAttribute("data-position")||"top-right",a=document.createElement("div");a.classList.add("nojs-toast"),a.setAttribute("data-toast-id",i),a.setAttribute("data-type",r),r==="error"&&a.setAttribute("aria-live","assertive");let s=document.createElement("span");if(s.textContent=e,a.appendChild(s),n){let l=document.createElement("button");l.type="button",l.classList.add("nojs-toast-dismiss"),l.setAttribute("aria-label","Dismiss"),l.textContent="\xD7",l.addEventListener("click",()=>Ye(a)),a.appendChild(l)}if(Io(c)&&t.firstChild?t.insertBefore(a,t.firstChild):t.appendChild(a),o>0){let l=setTimeout(()=>{Le.delete(l),a.isConnected&&Ye(a)},o);Le.add(l),a._toastTimerId=l}return a}function Ye(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Le.delete(t._toastTimerId)),t.remove())}function Lr(t){Ar(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&To.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),bt(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),a=Number.isNaN(c)?3e3:c,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let f=()=>{let h=ht();vt(h,n,i,a,s)};r.addEventListener("click",f),bt(r,()=>r.removeEventListener("click",f));return}let m=t.findContext(r);if(!m||typeof m.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let d;function g(){let f=t.evaluate(n,m);if(f&&f!==d){let h=typeof f=="string"?f:String(f),v=ht();vt(v,h,i,a,s),d=f}else d=f}let u=m.$watch(g);bt(r,u)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=ht();return vt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&Ye(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Ye(r))},t.toast=e,t.global("toast",e)}function jr(t,e={}){Lr(t)}function kr(){wr()}var be={containers:new Map};function Cr(){be.containers.clear()}function Sr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function Bo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ho=0;function Tr(t){return`${t}-${++Ho}`}function Ie(t,e,r=!1){let o=be.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Be(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Dr(t){t.directive("tabs",{priority:10,init(e,r,o){Sr();let n=[],i=[];for(let p of Array.from(e.children))p.hasAttribute("tab")?n.push(p):p.hasAttribute("panel")&&i.push(p);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let a=document.createElement("div");a.setAttribute("role","tablist"),a.classList.add("nojs-tablist");let s=Math.min(n.length,i.length);for(let p=0;p<s;p++){let b=n[p],w=i[p],y=b.id||Tr("nojs-tab"),x=w.id||Tr("nojs-panel");b.id=y,w.id=x,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",x),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),w.setAttribute("role","tabpanel"),w.setAttribute("aria-labelledby",y),w.setAttribute("tabindex","0"),w.setAttribute("aria-hidden","true"),w.inert=!0,w.classList.add("nojs-panel"),a.appendChild(b)}for(let p=s;p<i.length;p++){let b=i[p];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let l=i[0];l?e.insertBefore(a,l):e.appendChild(a),be.containers.set(e,{tabs:n.slice(0,s),panels:i.slice(0,s),activeIndex:-1});let m=t.findContext(e),d=[],g=(p,b)=>{let w=!1;try{w=!!t.evaluate(b,m)}catch{w=!1}w?p.setAttribute("aria-disabled","true"):p.removeAttribute("aria-disabled")};for(let p=0;p<s;p++){let b=n[p],w=b.getAttribute("tab-disabled");if(w&&(g(b,w),m&&typeof m.$watch=="function")){let y=m.$watch(()=>g(b,w));d.push(y)}}let u=0;if(o&&o.trim()!==""){let p=parseInt(o,10);!isNaN(p)&&p>=0&&p<s&&(u=p)}let f=n.slice(0,s);if(n[u]?.getAttribute("aria-disabled")==="true"){let p=Be(f,u,1);p!==-1?(u=p,Ie(e,u)):Ie(e,u,!0)}else Ie(e,u);let h=p=>{let b=be.containers.get(e);if(!b)return;let w=p.target;if(w.getAttribute("role")!=="tab")return;let{tabs:y}=b,x=y.indexOf(w);if(x===-1)return;let A=-1;switch(p.key){case"ArrowRight":case"ArrowDown":A=Be(y,x,1);break;case"ArrowLeft":case"ArrowUp":A=Be(y,x,-1);break;case"Home":A=Be(y,y.length-1,1);break;case"End":A=Be(y,0,-1);break;case"Tab":return;default:return}A!==-1&&A!==x&&(p.preventDefault(),Ie(e,A),y[A].focus())};a.addEventListener("keydown",h);let v=p=>{let b=p.target.closest("[role='tab']");if(!b)return;let w=be.containers.get(e);if(!w)return;let y=w.tabs.indexOf(b);y!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Ie(e,y),b.focus())};a.addEventListener("click",v),Bo(e,()=>{a.removeEventListener("keydown",h),a.removeEventListener("click",v);for(let p of d)p&&p();d.length=0,be.containers.delete(e)})}})}function Ir(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Br(t){t.directive("panel",{priority:11,init(){}})}function Hr(t,e={}){Dr(t),Ir(t),Br(t)}function qr(){Cr()}var I={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Rr(){I.branches.clear(),I.selectedItem=null,I.typeahead="",I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null)}function je(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function ke(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function zr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Fr(t){return t.closest('[role="tree"]')}function qo(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function Ro(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function yt(t){let e=I.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),I.selectedItem=t}function Mr(t){let e=I.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function zo(t){let e=I.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function Fo(t){let e=I.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Pr(t,e){let r=Fr(e);if(!r)return;let o=zr(r),n=o.indexOf(e);if(n<0)return;let i=I.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)zo(e);else if(c&&i.expanded){let a=i.subtreeEl.querySelector('[role="treeitem"]');a&&he(a,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)Fo(e);else{let a=qo(e);a&&he(a,zr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&he(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&he(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),yt(e),c&&Mr(e);break;case"Home":t.preventDefault(),o.length>0&&he(o[0],o);break;case"End":t.preventDefault(),o.length>0&&he(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),I.typeahead+=t.key.toLowerCase(),I.typeaheadTimer&&clearTimeout(I.typeaheadTimer),I.typeaheadTimer=setTimeout(()=>{I.typeahead="",I.typeaheadTimer=null},500);let a=n+1;for(let s=0;s<o.length;s++){let l=(a+s)%o.length;if(Ro(o[l]).startsWith(I.typeahead)){he(o[l],o);break}}}break}}function $r(t){t.directive("tree",{priority:15,init(e){je(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Or(t){t.directive("branch",{priority:16,init(e,r,o){je();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Fr(e);if(i){let l=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",l?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let l=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);l?(I.branches.set(e,{expanded:n,subtreeEl:l}),l.setAttribute("aria-hidden",String(!n))):I.branches.set(e,{expanded:n,subtreeEl:null})});let a=l=>{l.target.closest?.('[role="treeitem"]')===e&&(l.stopPropagation(),yt(e),Mr(e))};e.addEventListener("click",a),ke(e,()=>e.removeEventListener("click",a));let s=l=>{Pr(l,e)};e.addEventListener("keydown",s),ke(e,()=>e.removeEventListener("keydown",s)),ke(e,()=>{c=!0,I.branches.delete(e),I.selectedItem===e&&(I.selectedItem=null),I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null,I.typeahead="")})}})}function he(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Vr(t){t.directive("subtree",{priority:16,init(e){je(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),yt(o)};o.addEventListener("click",n),ke(o,()=>o.removeEventListener("click",n));let i=c=>{Pr(c,o)};o.addEventListener("keydown",i),ke(o,()=>o.removeEventListener("keydown",i)),ke(o,()=>{I.selectedItem===o&&(I.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=I.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Nr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function xt(t){return t.closest('[role="treeitem"]')}function Mo(t){return t.closest('[role="tree"]')}function Po(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function $o(t){return Po(t).indexOf(t)}function Oo(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Wr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Ce(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function He(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function Vo(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function No(t,e){Ce();let r=Vo(),o=t.getBoundingClientRect(),n=Mo(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function Gr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(je(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=g=>{let u=xt(g.target);if(u&&e.contains(u)){if(u.hasAttribute("tree-drag-disabled")){g.preventDefault();return}D.dragging={el:u,treeRoot:e},g.dataTransfer&&(g.dataTransfer.effectAllowed="move",g.dataTransfer.setData("text/plain","")),u.classList.add("nojs-dragging"),u.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:u}}))}},c=g=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let u=xt(g.target);if(!u||!e.contains(u)||u===D.dragging.el||Wr(u,D.dragging.el))return;g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move");let f=Oo(u,g.clientY,o);(D.currentTarget!==u||D.currentPosition!==f)&&(He(e),Ce(),D.currentTarget=u,D.currentPosition=f,f==="on"?u.classList.add("nojs-tree-drag-over"):No(u,f))},a=g=>{D.dragging&&D.dragging.treeRoot===e&&n++},s=g=>{D.dragging&&(n--,n<=0&&(n=0,He(e),Ce(),D.currentTarget=null,D.currentPosition=null))},l=g=>{if(g.preventDefault(),g.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let u=D.dragging.el,f=D.currentTarget,h=D.currentPosition;if(He(e),Ce(),!f||!h){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(f===u||Wr(f,u)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(h==="on"){let v=f.querySelector(':scope > [role="group"]');v||(v=f.nextElementSibling?.matches?.('[role="group"]')?f.nextElementSibling:null),v?v.setAttribute("aria-hidden","false"):(v=document.createElement("ul"),v.setAttribute("role","group"),v.setAttribute("subtree",""),v.classList.add("nojs-subtree","nojs-tree"),v.setAttribute("aria-hidden","false"),f.appendChild(v));let p=I.branches.get(f);p&&(p.expanded=!0,p.subtreeEl=v,f.setAttribute("aria-expanded","true")),v.appendChild(u),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:u,newParent:f}}))}else{let v=f.parentElement;if(!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(h==="before")v.insertBefore(u,f);else{let b=f.nextElementSibling,w=b?.matches?.('[role="group"]')?b.nextElementSibling:b;w?v.insertBefore(u,w):v.appendChild(u)}let p=$o(u);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:u,newIndex:p}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},m=g=>{let u=xt(g.target);u&&u.classList.remove("nojs-dragging"),He(e),Ce(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",a),e.addEventListener("dragleave",s),e.addEventListener("drop",l),e.addEventListener("dragend",m),Nr(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",a),e.removeEventListener("dragleave",s),e.removeEventListener("drop",l),e.removeEventListener("dragend",m),He(e),Ce()}),Wo(e);let d=new MutationObserver(g=>{for(let u of g)for(let f of u.addedNodes){if(f.nodeType!==1)continue;f.getAttribute("role")==="treeitem"&&Et(f);let h=f.querySelectorAll?.('[role="treeitem"]');if(h)for(let v of h)Et(v)}});d.observe(e,{childList:!0,subtree:!0}),Nr(e,()=>d.disconnect())}})}function Et(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function Wo(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)Et(r)}function Ur(t,e={}){$r(t),Or(t),Vr(t),Gr(t)}function Yr(){Rr()}var Ke=new Map;function Kr(){Ke.clear()}function Xe(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Xr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function Zr(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Qr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function qe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Jr(t){t.directive("stepper",{priority:14,init(e,r,o){Xe();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,a=e.getAttribute("stepper-mode")||"linear",s=e.getAttribute("stepper-indicator")!=="false",l=e.getAttribute("stepper-nav")!=="false",m=e.getAttribute("aria-label")||"Stepper",d=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",m),e.classList.add("nojs-stepper");let g=null,u=[];if(s){g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),i.forEach((j,S)=>{if(S>0){let M=document.createElement("div");M.className="nojs-stepper-separator",M.setAttribute("aria-hidden","true"),g.appendChild(M)}let _=document.createElement("button");_.type="button",_.className="nojs-stepper-indicator-item",_.setAttribute("role","tab"),_.setAttribute("aria-selected",S===d?"true":"false");let B=j.getAttribute("step-label")||`Step ${S+1}`,$=document.createElement("span");$.textContent=B,_.appendChild($),_.setAttribute("aria-label",B);let X=`nojs-stepper-tab-${Go++}`;if(_.id=X,a==="free"){_.setAttribute("data-clickable","");let M=()=>x(S);_.addEventListener("click",M),qe(e,()=>_.removeEventListener("click",M))}else _.setAttribute("tabindex","-1");g.appendChild(_),u.push(_)});let k=j=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(j.key))return;j.preventDefault();let S=d;j.key==="ArrowRight"?S=Math.min(d+1,i.length-1):j.key==="ArrowLeft"?S=Math.max(d-1,0):j.key==="Home"?S=0:j.key==="End"&&(S=i.length-1),a==="free"?(x(S),u[S]?.focus()):u[d]?.focus()};g.addEventListener("keydown",k),qe(e,()=>g.removeEventListener("keydown",k)),e.insertBefore(g,e.firstChild)}let f=null,h=null,v=null;if(l){f=document.createElement("div"),f.className="nojs-stepper-nav",f.setAttribute("aria-hidden","true"),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-prev",h.textContent="Previous";let k=()=>y();h.addEventListener("click",k),qe(e,()=>h.removeEventListener("click",k)),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-next",v.textContent="Next";let j=()=>w();v.addEventListener("click",j),qe(e,()=>v.removeEventListener("click",j)),f.appendChild(h),f.appendChild(v),e.appendChild(f)}function p(k){let j=i[k];if(!j)return!0;if(!Xr(j,t.findContext)){let B=j.querySelector("form[validate]");return B&&(Zr(B),u[k]&&u[k].classList.add("nojs-step-invalid"),Qr(e,j,B)),!1}u[k]&&u[k].classList.remove("nojs-step-invalid");let S=j.querySelectorAll("[required]");for(let B of S)if(typeof B.checkValidity=="function"&&!B.checkValidity())return B.reportValidity(),!1;let _=j.getAttribute("step-validate");if(_)try{if(!t.evaluate(_,n))return!1}catch(B){return console.warn(`[stepper] step-validate error: ${B.message}`),!1}return!0}function b(k){i.forEach((j,S)=>{let _=S===d;j.setAttribute("aria-hidden",_?"false":"true"),_?(j.removeAttribute("inert"),j.setAttribute("aria-current","step")):(j.setAttribute("inert",""),j.removeAttribute("aria-current"))}),u.length&&u.forEach((j,S)=>{j.setAttribute("aria-selected",S===d?"true":"false"),S<d?j.setAttribute("data-completed",""):j.removeAttribute("data-completed"),j.setAttribute("tabindex",S===d?"0":"-1");let _=i[S];_.id&&(j.setAttribute("aria-controls",_.id),_.setAttribute("aria-labelledby",j.id))}),h&&(h.disabled=d===0),v&&(v.textContent=d===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!k,detail:{current:d,total:i.length}}))}function w(){return d>=i.length-1?(a==="linear"&&!p(d)||e.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:d,total:i.length}})),!1):a==="linear"&&!p(d)?!1:(d++,b(),L(),!0)}function y(){return d<=0?!1:(d--,b(),L(),!0)}function x(k){if(k<0||k>=i.length||k===d)return!1;if(a==="linear"&&k>d){for(let j=d;j<k;j++)if(d=j,b(),!p(j))return L(),!1}return d=k,b(),L(),!0}let A={get current(){return d},get total(){return i.length},next:w,prev:y,goTo:x,get isFirst(){return d===0},get isLast(){return d===i.length-1}};function L(){n.$stepper=A}L(),Ke.set(e,{get current(){return d},steps:i,mode:a,indicatorEl:g,navEl:f}),b(!0),qe(e,()=>{Ke.delete(e),g&&g.parentNode&&g.remove(),f&&f.parentNode&&f.remove(),delete n.$stepper})}})}var Go=0;var Uo=0;function en(t){t.directive("step",{priority:13,init(e,r,o){Xe(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Uo++}`),e.setAttribute("tabindex","0")}})}function tn(t,e={}){en(t),Jr(t)}function rn(){Kr()}function nn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function on(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function sn(t){t.directive("skeleton",{priority:10,init(e,r,o){nn();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),a=e.getAttribute("skeleton-size"),s=[];function l(p){m();for(let b=0;b<p;b++){let w=document.createElement("div");w.className="nojs-skeleton-line",e.appendChild(w),s.push(w)}}function m(){for(let p of s)p.parentNode===e&&e.removeChild(p);s=[]}function d(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),a&&(i==="circle"||i==="rect")){let p=a+(String(a).match(/\d$/)?"px":"");e.style.width=p,e.style.height=p}if(c){let p=parseInt(c,10);p>0&&l(p)}e.setAttribute("aria-busy","true")}let g=null;function u(){g&&g(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),m(),a&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let p=!1,b=null,w=()=>{p||(p=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",w),b!==null&&clearTimeout(b),g=null)};e.addEventListener("transitionend",w),b=setTimeout(w,0),g=()=>{e.removeEventListener("transitionend",w),b!==null&&clearTimeout(b),p=!0,g=null}}let f=!1;function h(){let p=!!t.evaluate(o,n);p&&!f?(f=!0,d()):!p&&f&&(f=!1,u())}h();let v=n.$watch(h);on(e,v),on(e,()=>{g&&g(),f&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),m(),a&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function an(t,e={}){sn(t)}var ve=new Map,W=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function cn(){ve.clear(),W.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Ze(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Yo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function dn(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function ln(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function Ko(t,e){let o=(ve.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function Xo(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Re(t,e){let r=W.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Qe(t,e,r,o){let n=Z(e,o),i=Z(r,o),c=W.get(e),a=W.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(a?.min||0)))}function _t(t){let e=t.getAttribute("split-persist");if(!e)return;let r=ve.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function Zo(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=ve.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function Qo(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=u=>{if(u.button!==0)return;u.preventDefault();let f=Ko(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=u[dn(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=f,C.sign=ln(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(u.pointerId)},a=u=>{if(!C.active||C.gutterEl!==i)return;let f=(u[dn(C.direction)]-C.startPos)*(C.sign||1),h=Re(C.startPrevSize+f,C.prevPane),v=Re(C.startNextSize-f,C.nextPane),p=C.startPrevSize+C.startNextSize;h+v!==p&&(h!==C.startPrevSize+f?v=p-h:h=p-v),C.prevPane.style.flexBasis=`${h}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${v}px`,C.nextPane.style.flexGrow="0",Qe(i,C.prevPane,C.nextPane,C.direction)},s=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",_t(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",a),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s);let l=10,m=u=>{let f=e==="horizontal",h=ln(t,e),v=0;if(f&&u.key==="ArrowRight"||!f&&u.key==="ArrowDown")v=l*h;else if(f&&u.key==="ArrowLeft"||!f&&u.key==="ArrowUp")v=-l*h;else if(u.key==="Home")v=(W.get(r)?.min||0)-Z(r,e);else if(u.key==="End"){let A=W.get(o);v=Z(r,e)+Z(o,e)-(A?.min||0)-Z(r,e)}else return;u.preventDefault();let p=Z(r,e),b=Z(o,e),w=p+b,y=Re(p+v,r),x=Re(w-y,o);y=w-x,y=Re(y,r),x=w-y,r.style.flexBasis=`${y}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Qe(i,r,o,e),_t(t)};i.addEventListener("keydown",m);let d=()=>{let u=W.get(r),f=W.get(o),h=u?.collapsible?r:f?.collapsible?o:null;if(!h)return;let v=W.get(h);if(!v)return;let p=h===r?o:r,b=Z(r,e)+Z(o,e);if(v.collapsed){v.collapsed=!1,h.removeAttribute("data-collapsed");let w=v.preCollapseSize||`${Math.round(b/2)}px`,y=Xo(w,b)??b/2,x=Math.min(y,b);h.style.flexBasis=`${x}px`,h.style.flexGrow="0",p.style.flexBasis=`${b-x}px`,p.style.flexGrow="0"}else v.preCollapseSize=h.style.flexBasis||`${Z(h,e)}px`,v.collapsed=!0,h.setAttribute("data-collapsed","true"),h.style.flexBasis="0px",h.style.flexGrow="0",p.style.flexBasis=`${b}px`,p.style.flexGrow="0";Qe(i,r,o,e),_t(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:h,collapsed:v.collapsed}}))};return i.addEventListener("dblclick",d),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",a),i.removeEventListener("pointerup",s),i.removeEventListener("pointercancel",s),i.removeEventListener("keydown",m),i.removeEventListener("dblclick",d)}}}function un(t){t.directive("split",{priority:14,init(e,r,o){Ze();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(m=>m.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(m=>{W.get(m)||W.set(m,{size:m.getAttribute("pane")||null,min:parseInt(m.getAttribute("pane-min"),10)||0,max:parseInt(m.getAttribute("pane-max"),10)||1/0,collapsible:m.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let a=[],s=[];for(let m=0;m<c.length-1;m++){let{gutter:d,cleanup:g}=Qo(e,n,c[m],c[m+1],i);c[m].after(d),a.push(d),s.push(g)}ve.set(e,{direction:n,gutterSize:i,panes:c,gutters:a}),Zo(e)||c.forEach(m=>{let g=W.get(m)?.size;g?(m.style.flexBasis=g,m.style.flexGrow="0"):(m.style.flexGrow="1",m.style.flexBasis="0")}),requestAnimationFrame(()=>{a.forEach((m,d)=>{Qe(m,c[d],c[d+1],n)})}),Yo(e,()=>{s.forEach(m=>m()),a.forEach(m=>m.remove()),ve.delete(e),c.forEach(m=>W.delete(m)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Jo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function pn(t){t.directive("pane",{priority:15,init(e,r,o){Ze(),e.classList.add("nojs-pane"),W.has(e)||W.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=W.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Jo(e,()=>{e.classList.remove("nojs-pane"),W.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function fn(t,e={}){un(t),pn(t)}function mn(){cn()}var le={sorts:new Map};function gn(){le.sorts.clear()}function ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function ei(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ti(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function ri(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function bn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function hn(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function yn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return hn(Number(t),Number(e));case"date":return hn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function ni(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function xn(t){t.directive("sortable",{priority:10,init(e){ye(),e.classList.add("nojs-sortable")}})}function En(t){t.directive("sort",{priority:11,init(e,r,o){ye();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let a=e.closest("table");if(!a)return;le.sorts.has(a)||le.sorts.set(a,{column:null,direction:null}),(c==="asc"||c==="desc")&&(le.sorts.get(a).column||vn(e,a,n,i,c,t));let s=()=>{let l=le.sorts.get(a),m;l.column!==n?m="asc":l.direction==="asc"?m="desc":l.direction==="desc"?m=null:m="asc",vn(e,a,n,i,m,t)};e.addEventListener("click",s),ei(e,()=>{e.removeEventListener("click",s),a&&!a.isConnected&&(le.sorts.delete(a),delete a._nojsOriginalOrder,delete a._nojsOriginalRows)})}})}function vn(t,e,r,o,n,i){let c=le.sorts.get(e);ni(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let a=ti(e,i);if(a){let s=i.findContext(e),l=s?ri(s,a.arrayPath):null;if(Array.isArray(l)){if(!n){let d=e._nojsOriginalOrder;if(d){let g=new Set(l),u=d.filter(f=>g.has(f));for(let f of l)d.includes(f)||u.push(f);bn(s,a.arrayPath,u)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...l]);let m=[...l].sort((d,g)=>{let u=d!=null?d[r]:null,f=g!=null?g[r]:null,h=yn(u,f,o);return n==="desc"?-h:h});bn(s,a.arrayPath,m);return}}oi(e,t,r,o,n)}function oi(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let s=[...e.closest("tr").children].indexOf(e);if(s<0)return;let l=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...l]),!n){let g=document.createDocumentFragment();for(let u of t._nojsOriginalRows)g.appendChild(u);i.appendChild(g);return}let m=g=>{let u=g.replace(/[^0-9.\-]/g,"");return u===""||u==="-"?NaN:parseFloat(u)};l.sort((g,u)=>{let f=g.children[s]?.textContent?.trim()||"",h=u.children[s]?.textContent?.trim()||"",v=yn(o==="number"?m(f):f,o==="number"?m(h):h,o);return n==="desc"?-v:v});let d=document.createDocumentFragment();for(let g of l)d.appendChild(g);i.appendChild(d)}function _n(t){t.directive("fixed-header",{priority:10,init(e){ye(),e.classList.add("nojs-fixed-header")}})}function wn(t){t.directive("fixed-col",{priority:10,init(e){ye(),e.classList.add("nojs-fixed-col")}})}function wt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function An(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function Ln(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function jn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function kn(t){t.directive("table-reorder",{priority:15,init(e){if(ye(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",a=null,s=null,l=null;function m(){let v=r.querySelectorAll(":scope > tr");for(let p=0;p<v.length;p++){let b=v[p];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let w=!0;if(n){let j=S=>{w=!!S.target.closest(n)};b.addEventListener("mousedown",j),wt(b,()=>b.removeEventListener("mousedown",j))}let y=j=>{if(n&&!w){j.preventDefault();return}a=[...r.querySelectorAll(":scope > tr")].indexOf(b),s=b,j.dataTransfer&&(j.dataTransfer.effectAllowed="move",j.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(_=>b.classList.add(_)),b.setAttribute("aria-grabbed","true")},x=j=>{if(s==null)return;j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),_=S.top+S.height/2,$=[...r.querySelectorAll(":scope > tr")].indexOf(b);d(),$!==a&&(j.clientY<_?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),l=b)},A=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),l===b&&(l=null)},L=j=>{if(j.preventDefault(),j.stopPropagation(),s==null||a==null)return;let S=[...r.querySelectorAll(":scope > tr")],_=b.getBoundingClientRect(),B=_.top+_.height/2,$=S.indexOf(b);j.clientY>=B&&$++;let X=a;if(X===$||X+1===$){g();return}let M=X<$?$-1:$,se=An(e);if(se&&o){let T=Ln(o,se.arrayPath);if(Array.isArray(T)){let q=[...T],[F]=q.splice(X,1);q.splice(M,0,F),jn(o,se.arrayPath,q),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...q]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:M,item:F}}))}}else{let T=s,q=S[M];T&&q&&(X<M?r.insertBefore(T,q.nextSibling):r.insertBefore(T,q),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:M,item:null}})))}g()},k=()=>{g()};b.addEventListener("dragstart",y),b.addEventListener("dragover",x),b.addEventListener("dragleave",A),b.addEventListener("drop",L),b.addEventListener("dragend",k),wt(b,()=>{b.removeEventListener("dragstart",y),b.removeEventListener("dragover",x),b.removeEventListener("dragleave",A),b.removeEventListener("drop",L),b.removeEventListener("dragend",k),b._nojsReorderSetup=!1})}}function d(){l&&(l.classList.remove("nojs-reorder-insert-before"),l.classList.remove("nojs-reorder-insert-after"),l=null)}function g(){s&&(i.split(/\s+/).filter(Boolean).forEach(p=>s.classList.remove(p)),s.setAttribute("aria-grabbed","false")),d(),a=null,s=null;let v=r.querySelectorAll(":scope > tr");for(let p of v)p.classList.remove("nojs-reorder-insert-before"),p.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(b=>p.classList.remove(b))}let u=v=>{s!=null&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"))},f=v=>{if(s==null||v.target!==r)return;v.preventDefault(),v.stopPropagation();let p=a,w=[...r.querySelectorAll(":scope > tr")].length-1;if(p===w){g();return}let y=An(e);if(y&&o){let x=Ln(o,y.arrayPath);if(Array.isArray(x)){let A=[...x],[L]=A.splice(p,1);A.push(L),jn(o,y.arrayPath,A),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...A]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:p,to:A.length-1,item:L}}))}}g()};r.addEventListener("dragover",u),r.addEventListener("drop",f);let h=new MutationObserver(()=>{m()});h.observe(r,{childList:!0}),m(),wt(e,()=>{h.disconnect(),r.removeEventListener("dragover",u),r.removeEventListener("drop",f),g()})}})}function Cn(t,e={}){xn(t),En(t),_n(t),wn(t),kn(t)}function Sn(){gn()}var ue={containers:new Map};function Tn(){for(let[,t]of ue.containers)typeof t.unsub=="function"&&t.unsub();ue.containers.clear()}function Dn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function In(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ii(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function si(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Bn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],a=document.createElement("li");if(i===e.length-1){let l=document.createElement("span");l.setAttribute("aria-current","page"),l.textContent=c.label,a.appendChild(l)}else{let l=document.createElement("a");l.href=c.href,l.textContent=c.label,a.appendChild(l)}o.appendChild(a)}t.appendChild(o);let n=ue.containers.get(t);n&&(n.crumbs=e)}function ai(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=ii(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function ci(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=si(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function Hn(t){t.directive("breadcrumb",{priority:15,init(e,r,o){Dn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(a=>!(a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(ue.containers.set(e,{unsub:null,crumbs:[]}),c){let a=()=>{let s=i.current,l=s?s.path:"/",m=ci(l);Bn(e,m)};if(a(),typeof i.on=="function"){let s=i.on(a),l=ue.containers.get(e);l&&(l.unsub=s),In(e,()=>{typeof s=="function"&&s();let m=ue.containers.get(e);m&&(m.unsub=null)})}}else{let a=ai(e);for(let s of Array.from(e.children))s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb")||(s.style.display="none");Bn(e,a)}In(e,()=>{ue.containers.delete(e)})}})}function qn(t,e={}){Hn(t)}function Rn(){Tn()}var Je={containers:new Map};function zn(){Je.containers.clear()}function Fn(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function di(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var et=null;function li(){return et!==null||(et=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),et}function Mn(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function ui(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function $n(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Pn(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");$n(t,r)}else t.open=!1}function tt(t,e,r,o){let n=new CustomEvent("accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function Se(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function On(t){t.directive("accordion",{priority:10,init(e,r,o){Fn();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!li();e.setAttribute("role","group");let c=Se(e);if(c.length===0)return;if(i)for(let d of c)Mn(d);let a=[],s=new MutationObserver(d=>{for(let g of d)for(let u of g.addedNodes)u.nodeType!==1||u.tagName!=="DETAILS"||u.parentElement===e&&l(u)});s.observe(e,{childList:!0});let l=d=>{i&&Mn(d);let g=f=>{let h=Se(e),v=h.indexOf(d);if(d.open){if(n==="single")for(let p of h)p!==d&&p.open&&Pn(p,i);tt(e,d,!0,v)}else tt(e,d,!1,v)},u=null;if(i){let f=d.querySelector(":scope > summary");f&&(u=h=>{h.preventDefault();let v=d.querySelector(":scope > .nojs-accordion-content");if(d.open)$n(d,v),tt(e,d,!1,Se(e).indexOf(d));else{if(n==="single"){let p=Se(e);for(let b of p)b!==d&&b.open&&Pn(b,!0)}ui(d,v),tt(e,d,!0,Se(e).indexOf(d))}},f.addEventListener("click",u))}d.addEventListener("toggle",g),a.push({details:d,toggleHandler:g,clickHandler:u})};for(let d of c)l(d);let m=d=>{let g=d.target;if(g.tagName!=="SUMMARY")return;let u=g.parentElement;if(!u||u.parentElement!==e)return;let h=Se(e).map(b=>b.querySelector(":scope > summary")).filter(Boolean),v=h.indexOf(g);if(v===-1)return;let p=-1;switch(d.key){case"ArrowDown":case"ArrowRight":p=(v+1)%h.length;break;case"ArrowUp":case"ArrowLeft":p=(v-1+h.length)%h.length;break;case"Home":p=0;break;case"End":p=h.length-1;break;default:return}p!==-1&&p!==v&&(d.preventDefault(),h[p].focus())};e.addEventListener("keydown",m),Je.containers.set(e,{mode:n,listeners:a,observer:s}),di(e,()=>{e.removeEventListener("keydown",m),s.disconnect();for(let d of a)if(d.details.removeEventListener("toggle",d.toggleHandler),d.clickHandler){let g=d.details.querySelector(":scope > summary");g&&g.removeEventListener("click",d.clickHandler)}a.length=0,Je.containers.delete(e)})}})}function Vn(t,e={}){On(t)}function Nn(){zn()}var Te=new Map;function Wn(){let t=Array.from(Te.keys());for(let e of t){let r=Te.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}Te.clear()}function Gn(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function pi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function fi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=mi(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function mi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function gi(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Un(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function rt(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function bi(t,e){return t*e}function Kn(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function Xn(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function Yn(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function nt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function hi(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return Xn(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function vi(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return Xn(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function yi(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=hi(t,e),n=vi(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function At(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:a}=yi(t,n,i);if(c===t.startIndex&&a===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=a,t.dirty=!1;let s=nt(t,c),l=t.itemHeight!=="auto"?bi(t.totalItems,t.itemHeight):Yn(t),m=a>=0?nt(t,a+1):0,d=Math.max(0,l-m);rt(t.spacerTop,s),rt(t.spacerBottom,d);let g=new Set;for(let f=c;f<=a;f++)g.add(f);for(let[f,h]of t.renderedNodes)g.has(f)||(h.remove(),t.renderedNodes.delete(f));let u=[];for(let f=c;f<=a;f++){if(t.renderedNodes.has(f))continue;let h=t.dataArray[f];if(h===void 0)continue;let v=t.template.cloneNode(!0),p={};p[t.iteratorVar]=h,p.$index=f,p.$count=t.totalItems,p.$first=f===0,p.$last=f===t.totalItems-1,p.$even=f%2===0,p.$odd=f%2!==0,v.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(p)),v.__declared=!1,u.push({index:f,node:v}),t.renderedNodes.set(f,v)}if(u.length>0){u.sort((f,h)=>f.index-h.index);for(let{index:f,node:h}of u){let v=null;for(let[p,b]of t.renderedNodes)p>f&&b.parentNode===r&&(!v||p<xi(v,t))&&(v=b);v||(v=t.spacerBottom),r.insertBefore(h,v);try{e.processTree&&e.processTree(h)}catch{}}}if(t.itemHeight==="auto"){let f=!1;for(let[h,v]of t.renderedNodes){let p=v.offsetHeight||v.getBoundingClientRect().height;p>0&&t.heights[h]!==p&&(t.heights[h]=p,f=!0)}if(f){Kn(t);let h=Yn(t),v=nt(t,c),p=a>=0?nt(t,a+1):0,b=Math.max(0,h-p);rt(t.spacerTop,v),rt(t.spacerBottom,b)}}}function xi(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function Ei(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&Kn(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,At(t,r)}function Zn(t){t.directive("virtual",{priority:10,init(e,r,o){Gn(),e.setAttribute("data-nojs-virtual","");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),a=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let s=fi(e),l=null;if(s)l=s.eachEl;else for(let y of e.children)if(!y.classList.contains("nojs-virtual-spacer")){l=y;break}if(!l){console.warn("[virtual] No child template found.");return}let m=l.cloneNode(!0);for(m.removeAttribute("each"),m.removeAttribute("foreach"),m.removeAttribute("for"),m.__declared=!1,m.__disposers=null,m.__ctx=null,s&&(s.eachEl.removeAttribute("each"),s.eachEl.removeAttribute("foreach"),s.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let d=Un(e),g=Un(e);e.appendChild(d),e.appendChild(g);let u={container:e,itemHeight:c,buffer:a,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:m,spacerTop:d,spacerBottom:g,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:s?s.iteratorVar:"item",arrayPath:s?s.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};Te.set(e,u);let f=null,h=()=>{f||(f=requestAnimationFrame(()=>{f=null,At(u,t)}))};if(u.scrollHandler=h,e.addEventListener("scroll",h,{passive:!0}),typeof ResizeObserver<"u"){let y=new ResizeObserver(()=>{u.dirty=!0,At(u,t)});y.observe(e),u.resizeObserver=y}let v=null,p=-1,b=null,w=()=>{if(!u.disposed){if(u.arrayPath){let y=t.findContext?t.findContext(e):null;if(y){let x=gi(y,u.arrayPath);Array.isArray(x)&&(x!==v||x.length!==p)&&(v=x,p=x.length,Ei(u,x,t))}}b=setTimeout(w,100)}};b=setTimeout(w,100),pi(e,()=>{u.disposed=!0,f&&(cancelAnimationFrame(f),f=null),b&&(clearTimeout(b),b=null),e.removeEventListener("scroll",h),u.resizeObserver&&(u.resizeObserver.disconnect(),u.resizeObserver=null);for(let[y,x]of u.renderedNodes){if(x.__disposers){for(let A of x.__disposers)try{A()}catch{}x.__disposers=null}x.remove()}u.renderedNodes.clear(),u.spacerTop&&u.spacerTop.parentNode&&u.spacerTop.remove(),u.spacerBottom&&u.spacerBottom.parentNode&&u.spacerBottom.remove(),Te.delete(e)})}})}function Qn(t,e={}){Zn(t)}function Jn(){Wn()}var pe=new Map,ot=new Map;function eo(){for(let[t,e]of pe){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}pe.clear(),ot.clear()}function to(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function _i(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function wi(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function Ai(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function Li(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function ji(){return document.documentElement}function ki(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function ro(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function Lt(t){let e=pe.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(s=>{for(let d of s)d.isIntersecting?n.add(d.target.id):n.delete(d.target.id);let l=null,m=1/0;for(let d of n){let g=document.getElementById(d);if(!g)continue;let u=g.getBoundingClientRect();u.top<m&&(m=u.top,l=d)}for(let d of e.spyEntries)ro(d.el);if(l){for(let d of e.spyEntries)if(d.targetId===l){ki(d.el),e.activeEl=d.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),a=new Set;for(let s of e.spyEntries){if(a.has(s.targetId))continue;let l=document.getElementById(s.targetId);l&&(c.observe(l),a.add(s.targetId))}e.observer=c}function Ci(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function no(t){t.directive("spy",{priority:20,init(e,r,o){to();let n=wi(e);if(!n){e.tagName!=="A"&&Ci(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=Ai(e),c=Li(e),a=ji();pe.has(a)||pe.set(a,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let s=pe.get(a),l={el:e,targetId:n};s.spyEntries.push(l),ot.set(e,a),Lt(a),!s.mutObserver&&typeof MutationObserver<"u"&&(s.mutObserver=new MutationObserver(()=>{Lt(a)}),s.mutObserver.observe(document.body,{childList:!0,subtree:!0})),_i(e,()=>{let m=s.spyEntries.indexOf(l);m!==-1&&s.spyEntries.splice(m,1),ot.delete(e),ro(e),s.spyEntries.length===0?(s.observer&&(s.observer.disconnect(),s.observer=null),s.mutObserver&&(s.mutObserver.disconnect(),s.mutObserver=null),pe.delete(a)):Lt(a)})}})}function oo(t,e={}){no(t)}function io(){eo()}var Si="[validate],[drag],[drop],[drag-list],[drag-multiple]";function so(t){if(typeof document>"u")return;let e=document.querySelectorAll(Si);for(let r of e){if(!r.__declared)continue;let o=K(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Ti=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],Di={name:"nojs-elements",install(t,e={}){Ht(t,e),Nt(t,e),Zt(t,e),tr(t,e),ur(t,e),yr(t,e),jr(t,e),Hr(t,e),Ur(t,e),tn(t,e),an(t,e),fn(t,e),Cn(t,e),qn(t,e),Vn(t,e),Qn(t,e),oo(t,e),so(t)},init(t){if(so(t),typeof document>"u"||!document.body)return;let e=Ti.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){qt(),Wt(),Qt(),rr(),pr(),xr(),kr(),qr(),Yr(),rn(),mn(),Sn(),Rn(),Nn(),Jn(),io()}},td=Di;export{td as default};
//# sourceMappingURL=nojs-elements.js.map
