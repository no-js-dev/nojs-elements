/**
 * NoJS Elements v1.13.3 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
(()=>{var E={dragging:null,selected:new Map,placeholder:null},Pe=new Map;function xt(){E.dragging=null,E.selected.clear(),E.placeholder&&(E.placeholder.remove(),E.placeholder=null),Pe.clear()}function Re(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function qe(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $e(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=$e(r):e++}return e}function Me(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let a=s.left+s.width/2;if(e<a)return i}else if(o==="grid"){let a=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<a||r<s.top+s.height&&e<a)return i}else{let a=s.top+s.height/2;if(r<a)return i}}return n.length}function Et(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",E.dragging&&E.dragging.sourceEl){let s=(E.dragging.sourceEl.firstElementChild||E.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),E.placeholder=n}function re(){E.placeholder&&(E.placeholder.remove(),E.placeholder=null)}function pe(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function Sn(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,s=getComputedStyle(o),a=Math.min(e,3);for(let u=a-1;u>=0;u--){let l=document.createElement("div"),m=u*4;if(l.style.cssText="position:absolute;top:"+m+"px;left:"+m+"px;width:"+i+"px;height:"+c+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",u===0){let p=o.cloneNode(!0);for(;p.firstChild;)l.appendChild(p.firstChild);l.style.background=s.backgroundColor||"#fff",l.style.border=s.border,l.style.padding=s.padding,l.style.fontSize=s.fontSize,l.style.color=s.color,l.style.fontFamily=s.fontFamily}else l.style.background=s.backgroundColor||"#fff",l.style.border=s.border||"1px solid #ddd";r.appendChild(l)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(a-1)*4+"px",r.style.height=c+(a-1)*4+"px",r}function wt(t){qe(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Re();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",c=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),a=e.getAttribute("drag-image"),d=e.getAttribute("drag-image-offset")||"0,0",u=e.getAttribute("drag-disabled"),l=e.getAttribute("drag-class")||"nojs-dragging",m=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let p=!0;if(s){let f=b=>{p=!!b.target.closest(s)};e.addEventListener("mousedown",f),ae(e,()=>e.removeEventListener("mousedown",f))}let g=f=>{if(s&&!p){f.preventDefault();return}if(u&&t.evaluate(u,n)){f.preventDefault();return}let b=t.evaluate(o,n),A=e.getAttribute("drag-group"),h=b;if(A&&E.selected.has(A)){let x=E.selected.get(A);x.size>0&&[...x].some(L=>L.el===e)&&(h=[...x].map(L=>L.item))}if(E.dragging={item:h,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},f.dataTransfer){if(f.dataTransfer.effectAllowed=c,f.dataTransfer.setData("text/plain",""),Array.isArray(h)&&h.length>1&&f.dataTransfer.setDragImage){let x=Sn(e,h.length);document.body.appendChild(x);let _=e.getBoundingClientRect();f.dataTransfer.setDragImage(x,_.width/2,_.height/2),requestAnimationFrame(()=>x.remove())}else if(a&&f.dataTransfer.setDragImage)if(a==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[_,L]=d.split(",").map(Number);f.dataTransfer.setDragImage(x,_||0,L||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(a);if(x){let[_,L]=d.split(",").map(Number);m&&x.classList.add(m),f.dataTransfer.setDragImage(x,_||0,L||0)}}}if(l.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(h)&&A&&E.selected.has(A))for(let x of E.selected.get(A))x.el!==e&&l.split(/\s+/).filter(Boolean).forEach(_=>x.el.classList.add(_));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:h,index:E.dragging.sourceIndex,el:e}}))},v=()=>{l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let f=e.getAttribute("drag-group");if(f&&E.selected.has(f))for(let b of E.selected.get(f))l.split(/\s+/).filter(Boolean).forEach(A=>b.el.classList.remove(A));if(e.setAttribute("aria-grabbed","false"),m&&a&&a!=="none"){let b=e.querySelector(a);b&&b.classList.remove(m)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:E.dragging?.item,index:E.dragging?.sourceIndex,dropped:E.dragging===null}})),E.dragging=null,re()};if(e.addEventListener("dragstart",g),e.addEventListener("dragend",v),ae(e,()=>{e.removeEventListener("dragstart",g),e.removeEventListener("dragend",v)}),u){let f=function(){let A=!!t.evaluate(u,n);e.draggable=!A,A?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},b=n.$watch(f);ae(e,b)}let y=f=>{if(E.dragging&&!E.dragging.sourceEl.isConnected&&(E.dragging=null),f.key===" "&&!E.dragging){f.preventDefault();let b=t.evaluate(o,n);E.dragging={item:b,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},l.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else f.key==="Escape"&&E.dragging&&E.dragging.sourceEl===e&&(f.preventDefault(),l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),e.setAttribute("aria-grabbed","false"),E.dragging=null,re())};e.addEventListener("keydown",y),ae(e,()=>e.removeEventListener("keydown",y))}})}function At(t){qe(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Re();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",c=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",a=e.getAttribute("drop-reject-class")||"nojs-drop-reject",d=e.getAttribute("drop-disabled"),u=e.getAttribute("drop-max"),l=e.getAttribute("drop-sort"),m=e.getAttribute("drop-placeholder"),p=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",c);let g=0,v=h=>{if(!E.dragging||d&&t.evaluate(d,n))return;let x=pe(E.dragging.type,i),_=!0;if(u){let L=t.evaluate(u,n),j=$e(e);typeof L=="number"&&j>=L&&(_=!1)}if(!x||!_){a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),re();return}if(a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect=c),l){let L=Me(e,h.clientX,h.clientY,l);m&&Et(e,L,m,p),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:E.dragging.item,index:L}}))}},y=h=>{if(E.dragging&&!(d&&t.evaluate(d,n))&&(g++,g===1)){let x=pe(E.dragging.type,i),_=!0;if(u){let L=t.evaluate(u,n),j=$e(e);typeof L=="number"&&j>=L&&(_=!1)}x&&_?(s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L))}},f=h=>{E.dragging&&(g--,g<=0&&(g=0,s.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),a.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging.item}}))))},b=h=>{if(h.preventDefault(),h.stopPropagation(),g=0,!E.dragging||d&&t.evaluate(d,n)||!pe(E.dragging.type,i))return;if(u){let w=t.evaluate(u,n),B=$e(e);if(typeof w=="number"&&B>=w)return}let x=E.dragging.item,_=E.dragging.type,L=E.dragging.effect,j=0;l&&(j=Me(e,h.clientX,h.clientY,l)),s.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),a.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),re();let k={$drag:x,$dragType:_,$dragEffect:L,$dropIndex:j,$source:{list:E.dragging.sourceList,index:E.dragging.sourceIndex,el:E.dragging.sourceEl},$target:{list:null,index:j,el:e},$el:e},S=X(t,"execStatement");typeof S=="function"?S(o,n,k):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),E.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:x,index:j,source:k.$source,target:k.$target,effect:L}}))},A=h=>{E.dragging&&(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b(h))};e.addEventListener("dragover",v),e.addEventListener("dragenter",y),e.addEventListener("dragleave",f),e.addEventListener("drop",b),e.addEventListener("keydown",A),ae(e,()=>{e.removeEventListener("dragover",v),e.removeEventListener("dragenter",y),e.removeEventListener("dragleave",f),e.removeEventListener("drop",b),e.removeEventListener("keydown",A)})}})}function _t(t){qe(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Re();let n=t.findContext(e),i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",a=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,u=e.getAttribute("drop-accept")||d,l=e.hasAttribute("drag-list-copy"),m=e.hasAttribute("drag-list-remove"),p=e.getAttribute("drag-disabled"),g=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),y=e.getAttribute("drop-placeholder"),f=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",A=e.getAttribute("drop-class")||"nojs-drag-over",h=e.getAttribute("drop-reject-class")||"nojs-drop-reject",x=e.getAttribute("drop-settle-class")||"nojs-drop-settle",_=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",l?"copy":"move");let L={listPath:o,ctx:n,el:e};Pe.set(e,L),ae(e,()=>Pe.delete(e));let j=0,k=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===k&&T.length>0&&e.children.length>0){for(let O of e.children)O.__ctx&&O.__ctx.$notify&&O.__ctx.$notify();return}k=T;let P=i?document.getElementById(i):null;if(!P)return;let M=X(t,"disposeChildren");typeof M=="function"&&M(e),e.innerHTML="";let F=T.length;T.forEach((O,z)=>{let ee={[s]:O,$index:z,$count:F,$first:z===0,$last:z===F-1,$even:z%2===0,$odd:z%2!==0},U=t.createContext(ee,n),Q=P.content.cloneNode(!0),R=document.createElement("div");R.style.display="contents",R.__ctx=U,R.appendChild(Q),e.appendChild(R);let Y=R.firstElementChild||R;Y.draggable=!0,Y.setAttribute("role","option"),Y.setAttribute("aria-grabbed","false"),Y.getAttribute("tabindex")||Y.setAttribute("tabindex","0");let Fe=V=>{if(p&&t.evaluate(p,n)){V.preventDefault();return}E.dragging={item:O,type:d,effect:l?"copy":"move",sourceEl:R,sourceCtx:U,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:l,removeMode:m}},V.dataTransfer&&(V.dataTransfer.effectAllowed=l?"copy":"move",V.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:O,index:z,el:Y}}))},vt=()=>{b.split(/\s+/).filter(Boolean).forEach(V=>Y.classList.remove(V)),Y.setAttribute("aria-grabbed","false"),E.dragging&&E.dragging.sourceEl===R&&(E.dragging=null),re()};R.addEventListener("dragstart",Fe),R.addEventListener("dragend",vt);let yt=V=>{if(V.key===" "&&!E.dragging)V.preventDefault(),V.stopPropagation(),E.dragging={item:O,type:d,effect:l?"copy":"move",sourceEl:R,sourceCtx:U,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:l,removeMode:m}},b.split(/\s+/).filter(Boolean).forEach(J=>Y.classList.add(J)),Y.setAttribute("aria-grabbed","true");else if(V.key==="Escape"&&E.dragging){V.preventDefault(),V.stopPropagation();let J=e.querySelector('[aria-grabbed="true"]')||Y;b.split(/\s+/).filter(Boolean).forEach(Ze=>J.classList.remove(Ze)),J.setAttribute("aria-grabbed","false"),E.dragging=null,re()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&E.dragging&&E.dragging.sourceEl===R){V.preventDefault();let J=R.nextElementSibling;J&&(J.firstElementChild||J).focus()}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&E.dragging&&E.dragging.sourceEl===R){V.preventDefault();let J=R.previousElementSibling;J&&(J.firstElementChild||J).focus()}};R.addEventListener("keydown",yt),R.__disposers=R.__disposers||[],R.__disposers.push(()=>R.removeEventListener("dragstart",Fe),()=>R.removeEventListener("dragend",vt),()=>R.removeEventListener("keydown",yt)),t.processTree(R)});let $=T.length===0;_.split(/\s+/).filter(Boolean).forEach(O=>e.classList.toggle(O,$))}let w=T=>{if(!E.dragging||g&&t.evaluate(g,n))return;let P=pe(E.dragging.type,u),M=!0;if(v){let $=t.evaluate(v,n),O=t.resolve(o,n);typeof $=="number"&&Array.isArray(O)&&O.length>=$&&(M=!1)}if(!P||!M){h.split(/\s+/).filter(Boolean).forEach($=>e.classList.add($)),A.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),re();return}h.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=l?"copy":"move");let F=Me(e,T.clientX,T.clientY,a);y&&Et(e,F,y,f)},B=T=>{if(E.dragging&&!(g&&t.evaluate(g,n))&&(j++,j===1)){let P=pe(E.dragging.type,u),M=!0;if(v){let F=t.evaluate(v,n),$=t.resolve(o,n);typeof F=="number"&&Array.isArray($)&&$.length>=F&&(M=!1)}P&&M?(A.split(/\s+/).filter(Boolean).forEach(F=>e.classList.add(F)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):h.split(/\s+/).filter(Boolean).forEach(F=>e.classList.add(F))}},H=()=>{E.dragging&&(j--,j<=0&&(j=0,A.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),h.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging?.item}}))))},N=T=>{if(T.preventDefault(),T.stopPropagation(),j=0,!E.dragging||g&&t.evaluate(g,n)||!pe(E.dragging.type,u))return;if(v){let U=t.evaluate(v,n),Q=t.resolve(o,n);if(typeof U=="number"&&Array.isArray(Q)&&Q.length>=U)return}let P=E.dragging.item,M=E.dragging.listDirective,F=E.dragging.sourceIndex,$=Me(e,T.clientX,T.clientY,a);A.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),h.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),re();let O=t.resolve(o,n);if(!Array.isArray(O))return;let z=M&&M.el===e;if(z&&F===$){E.dragging=null;return}if(z&&F+1===$){E.dragging=null;return}let ee=[...O];if(z){let[U]=ee.splice(F,1),Q=F<$?$-1:$;ee.splice(Q,0,U),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:P,from:F,to:Q}}))}else{let U=l&&typeof P=="object"?{...P}:P;if(ee.splice($,0,U),n.$set(o,ee),M&&!M.copyMode&&(m||M.removeMode)){let Q=t.resolve(M.listPath,M.ctx);if(Array.isArray(Q)&&F!=null){let R=Q.filter((Y,Fe)=>Fe!==F);M.ctx.$set(M.listPath,R),M.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:R,item:P,index:F}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:P,from:F,fromList:M?t.resolve(M.listPath,M.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][z&&F<$?$-1:$];if(Q){let R=Q.firstElementChild||Q;x.split(/\s+/).filter(Boolean).forEach(Y=>R.classList.add(Y)),R.addEventListener("animationend",()=>{x.split(/\s+/).filter(Boolean).forEach(Y=>R.classList.remove(Y))},{once:!0})}}),E.dragging=null},q=T=>{if(E.dragging&&pe(E.dragging.type,u)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let P=e.querySelector(":focus");if(P){let F=(P.style?.display==="contents"&&P.firstElementChild||P).getBoundingClientRect(),$={preventDefault(){},stopPropagation(){},clientX:F.left+F.width/2,clientY:F.top+F.height+1,dataTransfer:null};N($)}}};e.addEventListener("dragover",w),e.addEventListener("dragenter",B),e.addEventListener("dragleave",H),e.addEventListener("drop",N),e.addEventListener("keydown",q),ae(e,()=>{e.removeEventListener("dragover",w),e.removeEventListener("dragenter",B),e.removeEventListener("dragleave",H),e.removeEventListener("drop",N),e.removeEventListener("keydown",q)});let se=n.$watch(S);ae(e,se),S()}})}function Lt(t){qe(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}E.selected.has(n)||E.selected.set(n,new Set);let c=E.selected.get(n),s=d=>{let u=e.getAttribute("drag"),m={item:u?t.evaluate(u,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let p=[...c].find(g=>g.el===e);p?(c.delete(p),i.split(/\s+/).filter(Boolean).forEach(g=>e.classList.remove(g))):(c.add(m),i.split(/\s+/).filter(Boolean).forEach(g=>e.classList.add(g)))}else{for(let p of c)i.split(/\s+/).filter(Boolean).forEach(g=>p.el.classList.remove(g));c.clear(),c.add(m),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p))}};e.addEventListener("click",s),ae(e,()=>{e.removeEventListener("click",s);let d=[...c].find(u=>u.el===e);d&&c.delete(d)});let a=d=>{if(d.key==="Escape"){for(let u of c)i.split(/\s+/).filter(Boolean).forEach(l=>u.el.classList.remove(l));c.clear()}};window.addEventListener("keydown",a),ae(e,()=>window.removeEventListener("keydown",a))}})}function kt(t,e={}){wt(t),At(t),_t(t),Lt(t)}function jt(){xt()}var Ct=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],Qe=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var fe,Bt,He,Je,et,St,ze,tt,Tt;function Tn(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function Dn(t){return(t.getAttribute("type")||"text").toLowerCase()}function In(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(s=>s.trim());for(let s of c){let[a,...d]=s.split(":"),u=fe[a];if(u){let l=u(t.value,...d,e);l!==!0&&l&&(r.push({rule:a,message:l}),o.add(a))}else{let l=t.value,m=null;switch(a){case"required":(l==null||String(l).trim()==="")&&(m="Required");break;case"email":l&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)&&(m="Invalid email");break;case"url":try{new URL(l)}catch{m="Invalid URL"}break;case"min":Number(l)<Number(d[0])&&(m=`Minimum value is ${d[0]}`);break;case"max":Number(l)>Number(d[0])&&(m=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&fe[d[0]]){let p=fe[d[0]](l,e);p!==!0&&p&&(m=p)}break}m&&(r.push({rule:a,message:m}),o.add(a))}}}let i=t.validity;if(i&&!i.valid){for(let[c,s]of Ct)if(i[c]){let a=s||Dn(t);o.has(a)||(r.push({rule:a,message:t.validationMessage}),o.add(a))}}return r}function Bn(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function Fn(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=Qe.indexOf(n.rule),s=Qe.indexOf(i.rule);return(c===-1?999:c)-(s===-1?999:s)})[0];return{rule:o.rule,message:Bn(e,o.rule,o.message)}}function Ft(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Pn(t,e,r,o,n){let i=Ft(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;tt(i),i.remove()}let c=document.querySelector(t);if(!c)return;let s=c.content.cloneNode(!0),a=document.createElement("div");a.style.display="contents",a.__errorTemplateFor=o;let d=He({$error:e,$rule:r},n);a.__ctx=d,a.appendChild(s),c.parentNode.insertBefore(a,c.nextSibling),Tn(a),et(a)}function Dt(t){let e=Ft(t);e&&(tt(e),e.remove())}function Rn(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Bt(r,e)}catch{return!0}}function It(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function $n(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),s=fe[i];if(s){let a=s(t,...c,r);if(a!==!0&&a)return a}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&fe[c[0]]){let a=fe[c[0]](t,r);if(a!==!0&&a)return a}break}}return null}function Mn(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return Je(t);let e=He({},null);return t.__ctx=e,e}function Pt(t){fe=X(t,"validators")||{},Bt=t.evaluate,He=t.createContext,Je=t.findContext,et=t.processTree,St=X(t,"cloneTemplate")||(()=>null),ze=X(t,"disposeChildren")||(()=>{}),tt=X(t,"disposeTree")||ze,Tt=X(t,"warn")||console.warn;let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):Tt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let m=function(){c&&typeof c.$notify=="function"&&c.$notify();let h=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;h.nextNode();){let _=h.currentNode.__ctx;_&&_!==c&&typeof _.$notify=="function"&&_.$notify()}},p=function(){return r.querySelectorAll("input, textarea, select")},g=function(){let h={},x={},_={},L=!0,j=null,k=0,S=!1;for(let w of p())w.name&&(w.type==="checkbox"?x[w.name]=w.checked:w.type==="radio"?w.checked?x[w.name]=w.value:w.name in x||(x[w.name]=""):x[w.name]=w.value);for(let w of p()){if(!w.name)continue;let B=a.has(w.name),H=d.has(w.name);if(!Rn(w,c)){_[w.name]={valid:!0,dirty:H,touched:B,error:null,value:x[w.name]};continue}let N=In(w,x),q=Fn(N,w),se=!q,T=It(w,r),P=T.includes("input"),M=T.includes("blur")||T.includes("focusout")||T.includes("submit"),F;!w.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?F=B||H:F=P&&H||M&&B,se||(L=!1),!se&&F&&(h[w.name]=q.message,k++,j||(j=q.message)),_[w.name]={valid:se,dirty:H,touched:B,error:q?q.message:null,value:x[w.name]};let $=w.getAttribute("error-class")||s;if($){let z=$.split(/\s+/);!se&&F?w.classList.add(...z):w.classList.remove(...z)}if(q&&F){let z=w.getAttribute(`error-${q.rule}`),ee=w.getAttribute("error"),U=(z&&z.startsWith("#")?z:null)||(ee&&ee.startsWith("#")?ee:null);U?Pn(U,q.message,q.rule,w,c):Dt(w)}else Dt(w);let O=w.getAttribute("as");O&&c.$set(O,_[w.name])}u.size>0&&(S=!0),l.valid=L,l.errors=h,l.values=x,l.fields=_,l.firstError=j,l.errorCount=k,l.pending=S,c.$set("$form",{...l}),m(),v(r)},v=function(h){let x=l.valid&&!l.pending&&!l.submitting,_=h.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of _){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let j=L.getAttribute("disabled");if(j!=="disabled"&&j!=="true"&&j!=="false")continue}L.disabled=!x,L.__autoDisabled=!0}},y=function(h){if(!h.name)return;let x=It(h,r),_=()=>{d.add(h.name),l.dirty=!0,g()},L=()=>{a.add(h.name),l.touched=!0,g()};if(x.includes("input"))h.addEventListener("input",_),ne(r,()=>h.removeEventListener("input",_));else{let j=()=>{d.add(h.name),l.dirty=!0,g()};h.addEventListener("input",j),ne(r,()=>h.removeEventListener("input",j))}if(x.includes("blur")||x.includes("focusout")){let j=()=>{L(),x.includes("blur")&&_()};h.addEventListener("focusout",j),ne(r,()=>h.removeEventListener("focusout",j))}else h.addEventListener("focusout",L),ne(r,()=>h.removeEventListener("focusout",L));x.includes("submit")&&(h.addEventListener("focusout",L),ne(r,()=>h.removeEventListener("focusout",L)))},c=Mn(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),a=new Set,d=new Set,u=new Map,l={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{l.dirty=!1,l.touched=!1,l.pending=!1,l.submitting=!1,a.clear(),d.clear(),r.reset(),g()},endSubmit:()=>{l.submitting=!1,g()}};c.$set("$form",l);let f=r.hasAttribute("validate-on"),b=[...p()].some(h=>h.hasAttribute("validate-on"));if(!f&&!b){let h=_=>{let L=_.target;L&&L.name&&d.add(L.name),l.dirty=!0,g()};r.addEventListener("input",h),ne(r,()=>r.removeEventListener("input",h)),r.addEventListener("change",h),ne(r,()=>r.removeEventListener("change",h));let x=_=>{_.target&&_.target.name&&a.add(_.target.name),l.touched=!0,g()};r.addEventListener("focusout",x),ne(r,()=>r.removeEventListener("focusout",x))}else for(let h of p())y(h);let A=h=>{for(let x of p())x.name&&a.add(x.name);if(l.touched=!0,g(),!l.valid||l.pending){h.preventDefault(),h.stopImmediatePropagation();return}l.submitting=!0,v(r),c.$set("$form",{...l}),m()};r.addEventListener("submit",A,!0),ne(r,()=>r.removeEventListener("submit",A,!0)),r.__nojsResetSubmitting=()=>{l.submitting=!1,g()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(g);return}let i=Je(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),s=()=>{let a=$n(r.value,n,{});if(a&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let u=St(c);if(u){let l=He({err:{message:a}},i);ze(d),d.innerHTML="",d.__ctx=l,d.appendChild(u),et(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(ze(d),d.innerHTML="")}};r.addEventListener("input",s),ne(r,()=>r.removeEventListener("input",s))}}})}function Rt(t,e={}){Pt(t)}function $t(){}var ye=new Map,te=new Map;function Mt(){let t=Array.from(ye.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of te.values())clearTimeout(e);te.clear();for(let e of ye.values())e.remove();ye.clear()}function qt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function qn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Oe=8;function Ht(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=o.bottom+Oe,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-Oe;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+Oe;break;default:s=o.top-n.height-Oe,a=o.left+(o.width-n.width)/2;break}a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}var zn=0;function Hn(t,e,r){document.body.appendChild(e),Ht(e,t,r),e.setAttribute("aria-hidden","false")}function zt(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function On(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Ot(t){t.directive("tooltip",{priority:20,init(e,r,o){qt();let n=o;if(!n){On(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=e.getAttribute("tooltip-disabled"),d=a?t.findContext(e):null,u=()=>{if(!a||!d)return!1;try{return!!t.evaluate(a,d)}catch{return!1}},l=`nojs-tooltip-${++zn}`,m=document.createElement("div");m.className="nojs-tooltip",m.setAttribute("role","tooltip"),m.setAttribute("id",l),m.setAttribute("aria-hidden","true"),m.textContent=n,e.setAttribute("aria-describedby",l),ye.set(e,m);let p=!1,g=0,v=()=>{!p||!e.isConnected||g||(g=requestAnimationFrame(()=>{g=0,!(!p||!e.isConnected)&&Ht(m,e,i)}))},y=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},f=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),g&&(cancelAnimationFrame(g),g=0)},b=()=>{p||(Hn(e,m,i),p=!0,y())},A=()=>{if(!p){zt(e,m);return}f(),zt(e,m),p=!1},h=()=>{if(u())return;te.has(e)&&clearTimeout(te.get(e));let B=setTimeout(()=>{te.delete(e),!u()&&e.isConnected&&b()},s);te.set(e,B)},x=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),A()},_=()=>h(),L=()=>x(),j=()=>h(),k=()=>x(),S=B=>{B.key==="Escape"&&m.getAttribute("aria-hidden")==="false"&&x()};e.addEventListener("mouseenter",_),e.addEventListener("mouseleave",L),e.addEventListener("focusin",j),e.addEventListener("focusout",k),e.addEventListener("keydown",S);let w=null;if(a&&d&&typeof d.$watch=="function"){let B=()=>{p&&u()&&A()};w=d.$watch(B)}qn(e,()=>{e.removeEventListener("mouseenter",_),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",j),e.removeEventListener("focusout",k),e.removeEventListener("keydown",S),w&&(w(),w=null),f(),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),p=!1,m.remove(),ye.delete(e)})}})}function Vt(t,e={}){Ot(t)}function Wt(){Mt()}var K=new Map;function Gt(){K.clear()}function Ve(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function rt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function xe(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var ce=8;function We(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=o.top-n.height-ce,a=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,a=o.left-n.width-ce;break;case"right":s=o.top+(o.height-n.height)/2,a=o.right+ce;break;default:s=o.bottom+ce,a=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>c&&(s=o.top-n.height-ce),r==="top"&&s<0&&(s=o.bottom+ce),r==="right"&&a+n.width>i&&(a=o.left-n.width-ce),r==="left"&&a<0&&(a=o.right+ce),a<4&&(a=4),a+n.width>i-4&&(a=i-n.width-4),s<4&&(s=4),s+n.height>c-4&&(s=c-n.height-4),t.style.top=`${s}px`,t.style.left=`${a}px`}function nt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(typeof c.matches=="function"&&!c.matches(":popover-open")){i();return}We(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function ge(t){t&&t._untrack&&t._untrack()}function Ut(t){t.directive("popover",{priority:20,init(r,o,n){Ve();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!K.has(i))K.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=K.get(i);a.popoverEl=r,a.position=c}let s=a=>{let d=K.get(i);if(!d)return;let u=a.newState==="open";d.open=u;for(let l of d.triggerEls)l.setAttribute("aria-expanded",String(u));u||ge(d)};r.addEventListener("toggle",s),rt(r,()=>{r.removeEventListener("toggle",s);let a=K.get(i);a&&(ge(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&K.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){Ve();let i=n;if(!i){let a=r.closest("[use]")||r.parentElement,d=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),K.has(i)||K.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),K.get(i).triggerEls.add(r);let c=a=>{let d=K.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}xe(d.popoverEl)&&(d.popoverEl.togglePopover(),requestAnimationFrame(()=>{d.popoverEl.matches(":popover-open")?(We(d.popoverEl,r,d.position),nt(d,r)):ge(d)}))};r.addEventListener("click",c);let s=a=>{let d=K.get(i);a.key==="Escape"&&d?.open&&(xe(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),ge(d),r.focus())};document.addEventListener("keydown",s),rt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=K.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(ge(a),K.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){Ve();let o=()=>{let n=r.closest(".nojs-popover");!n||!xe(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),rt(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!xe(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{We(n.popoverEl,i,n.position),nt(n,i)}),!0},e.close=r=>{let o=K.get(r);if(!o||!o.popoverEl||!xe(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return ge(o),!0},e.toggle=(r,o)=>{let n=K.get(r);if(!n||!n.popoverEl||!xe(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{We(n.popoverEl,i,n.position),nt(n,i)}):ge(n),!0},t.popover=e}function Yt(t,e={}){Ut(t)}function Kt(){Gt()}var W=[],oe=new Map,Vn=1e4;function Xt(){return Vn+W.length}function Nt(){W.length=0,oe.clear()}function Ee(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Wn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Qt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',ot=new WeakMap;function Gn(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(Qt)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),ot.set(t,e)}function Zt(t){let e=ot.get(t);e&&(t.removeEventListener("keydown",e),ot.delete(t))}var Ce=new WeakMap;function Jt(t){t.directive("modal",{priority:10,init(r,o,n){Ee();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),u=m=>{m.target===r&&s!=="false"&&d!=="false"&&we(r,i)};r.addEventListener("click",u),oe.set(i,r);let l=m=>{if(m.newState==="open"){if(r.style.zIndex=String(Xt()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(g=>g.el===r))return;let p=r.querySelector(Qt);p?p.focus():r.focus()}),Gn(r),d!=="false"){let p=g=>{g.key==="Escape"&&(g.stopPropagation(),we(r,i))};r.addEventListener("keydown",p),Ce.set(r,p)}}else if(m.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),Zt(r);let p=Ce.get(r);p&&(r.removeEventListener("keydown",p),Ce.delete(r));let g=W.findIndex(v=>v.el===r);if(g===-1&&(g=W.findIndex(v=>v.id===i)),g!==-1){let v=W[g];W.splice(g,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",l),Wn(r,()=>{r.removeEventListener("click",u),r.removeEventListener("toggle",l),Zt(r);let m=Ce.get(r);m&&(r.removeEventListener("keydown",m),Ce.delete(r)),oe.delete(i);let p=W.findIndex(g=>g.el===r);p===-1&&(p=W.findIndex(g=>g.id===i)),p!==-1&&W.splice(p,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=oe.get(r);return o?(we(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)we(W[r].el,W[r].id)},t.modal=e}function we(t,e){try{t.hidePopover()}catch{}}function er(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Un(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function tr(t){t.directive("modal-open",{priority:10,init(e,r,o){Ee();let n=o;if(!n){let l=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(l&&(n=l.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let u=oe.get(n)||Un(n);if(!u){console.warn(`[modal-open] modal "${n}" not found`);return}let l=W.some(m=>m.id===n);u.id&&e.setAttribute("aria-controls",u.id);try{u.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}l||W.push({id:n,el:u,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},s=null,a=null,d=()=>{let u=oe.get(n);return u?(a=u,s=l=>{l.newState==="closed"&&e.setAttribute("aria-expanded","false")},u.addEventListener("toggle",s),!0):!1};if(!d()){let u=requestAnimationFrame(d);er(e,()=>cancelAnimationFrame(u))}e.addEventListener("click",i),er(e,()=>{e.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function Yn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function rr(t){t.directive("modal-close",{priority:10,init(e,r,o){Ee();let n=()=>{let i,c;if(o){if(c=o,i=oe.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}we(i,c)};e.addEventListener("click",n),Yn(e,()=>{e.removeEventListener("click",n)})}})}function nr(t,e={}){Jt(t),tr(t),rr(t)}function or(){Nt()}var de={openMenus:new Map};function ir(){de.openMenus.clear()}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var Kn=0;function Xn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function sr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,d,u;switch(o){case"top":d=i.top-c.height,u=i.left;break;case"left":d=i.top,u=i.left-c.width;break;case"right":d=i.top,u=i.right;break;default:d=i.bottom,u=i.left}o==="bottom"||o==="top"?n==="end"&&(u=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>s&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=s&&(d=i.bottom),u<4&&(u=4),u+c.width>a-4&&(u=a-c.width-4),t.style.top=`${d}px`,t.style.left=`${u}px`}function st(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function it(t){let e=st(t);e.length&&e[0].focus()}function ar(t){let e=st(t);e.length&&e[e.length-1].focus()}function cr(t){t.directive("dropdown",{priority:15,init(r){Ae()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ae();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Kn++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),sr(n,r,o),de.openMenus.set(n,{toggle:r,wrapper:o})}function a(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),de.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let u=f=>{f.newState==="closed"&&d()&&a()};n.addEventListener("toggle",u);let l=f=>{f.preventDefault(),f.stopPropagation(),d()?a():s()};r.addEventListener("click",l);let m=f=>{d()&&!o.contains(f.target)&&a()};document.addEventListener("click",m,!0);let p=f=>{f.key==="Escape"&&d()&&(a(),r.focus())};document.addEventListener("keydown",p);let g=f=>{switch(f.key){case"Enter":case" ":f.preventDefault(),s(),it(n);break;case"ArrowDown":f.preventDefault(),s(),it(n);break;case"ArrowUp":f.preventDefault(),s(),ar(n);break}};r.addEventListener("keydown",g);let v=f=>{if(!(!d()||st(n).find(h=>h===document.activeElement)))switch(f.key){case"ArrowDown":f.preventDefault(),it(n);break;case"ArrowUp":f.preventDefault(),ar(n);break}};n.addEventListener("keydown",v);let y=()=>{d()&&sr(n,r,o)};window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),Xn(r,()=>{r.removeEventListener("click",l),r.removeEventListener("keydown",g),n.removeEventListener("keydown",v),n.removeEventListener("toggle",u),document.removeEventListener("click",m,!0),document.removeEventListener("keydown",p),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),de.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){Ae(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function dr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Nn(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function at(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),de.openMenus.has(t)&&de.openMenus.delete(t)}function lr(t){t.directive("dropdown-item",{priority:15,init(e){Ae();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let s=Nn(r),a=s.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),at(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{at(r,o);break}}};e.addEventListener("keydown",n),dr(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(at(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),dr(e,()=>e.removeEventListener("click",i))}})}function ur(t,e={}){cr(t),lr(t)}function pr(){ir()}var ie=new Map,_e=new Set,fr=0;function gr(){return++fr}function mr(){for(let t of _e)clearTimeout(t);_e.clear();for(let t of ie.values())t.remove();ie.clear(),fr=0}function br(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function ct(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Zn=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function dt(){return ie.size>0?ie.values().next().value:Qn("top-right")}function Qn(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function Jn(t){return t.startsWith("top")}function lt(t,e,r,o,n){let i=gr(),c=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=e,s.appendChild(a),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>Ge(s)),s.appendChild(d)}if(Jn(c)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let d=setTimeout(()=>{_e.delete(d),s.isConnected&&Ge(s)},o);_e.add(d),s._toastTimerId=d}return s}function Ge(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),_e.delete(t._toastTimerId)),t.remove())}function hr(t){br(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&Zn.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),ct(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let g=()=>{let v=dt();lt(v,n,i,s,a)};r.addEventListener("click",g),ct(r,()=>r.removeEventListener("click",g));return}let u=t.findContext(r);if(!u||typeof u.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let l;function m(){let g=t.evaluate(n,u);if(g&&g!==l){let v=typeof g=="string"?g:String(g),y=dt();lt(y,v,i,s,a),l=g}else l=g}let p=u.$watch(m);ct(r,p)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=dt();return lt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&Ge(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Ge(r))},t.toast=e}function vr(t,e={}){hr(t)}function yr(){mr()}var me={containers:new Map};function xr(){me.containers.clear()}function Er(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function eo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var to=0;function wr(t){return`${t}-${++to}`}function Se(t,e,r=!1){let o=me.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Te(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Ar(t){t.directive("tabs",{priority:10,init(e,r,o){Er();let n=[],i=[];for(let f of Array.from(e.children))f.hasAttribute("tab")?n.push(f):f.hasAttribute("panel")&&i.push(f);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(n.length,i.length);for(let f=0;f<a;f++){let b=n[f],A=i[f],h=b.id||wr("nojs-tab"),x=A.id||wr("nojs-panel");b.id=h,A.id=x,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",x),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),A.setAttribute("role","tabpanel"),A.setAttribute("aria-labelledby",h),A.setAttribute("tabindex","0"),A.setAttribute("aria-hidden","true"),A.inert=!0,A.classList.add("nojs-panel"),s.appendChild(b)}for(let f=a;f<i.length;f++){let b=i[f];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),me.containers.set(e,{tabs:n.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let u=t.findContext(e),l=[],m=(f,b)=>{let A=!1;try{A=!!t.evaluate(b,u)}catch{A=!1}A?f.setAttribute("aria-disabled","true"):f.removeAttribute("aria-disabled")};for(let f=0;f<a;f++){let b=n[f],A=b.getAttribute("tab-disabled");if(A&&(m(b,A),u&&typeof u.$watch=="function")){let h=u.$watch(()=>m(b,A));l.push(h)}}let p=0;if(o&&o.trim()!==""){let f=parseInt(o,10);!isNaN(f)&&f>=0&&f<a&&(p=f)}let g=n.slice(0,a);if(n[p]?.getAttribute("aria-disabled")==="true"){let f=Te(g,p,1);f!==-1?(p=f,Se(e,p)):Se(e,p,!0)}else Se(e,p);let v=f=>{let b=me.containers.get(e);if(!b)return;let A=f.target;if(A.getAttribute("role")!=="tab")return;let{tabs:h}=b,x=h.indexOf(A);if(x===-1)return;let _=-1;switch(f.key){case"ArrowRight":case"ArrowDown":_=Te(h,x,1);break;case"ArrowLeft":case"ArrowUp":_=Te(h,x,-1);break;case"Home":_=Te(h,h.length-1,1);break;case"End":_=Te(h,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==x&&(f.preventDefault(),Se(e,_),h[_].focus())};s.addEventListener("keydown",v);let y=f=>{let b=f.target.closest("[role='tab']");if(!b)return;let A=me.containers.get(e);if(!A)return;let h=A.tabs.indexOf(b);h!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Se(e,h),b.focus())};s.addEventListener("click",y),eo(e,()=>{s.removeEventListener("keydown",v),s.removeEventListener("click",y);for(let f of l)f&&f();l.length=0,me.containers.delete(e)})}})}function _r(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Lr(t){t.directive("panel",{priority:11,init(){}})}function kr(t,e={}){Ar(t),_r(t),Lr(t)}function jr(){xr()}var I={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Cr(){I.branches.clear(),I.selectedItem=null,I.typeahead="",I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null)}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function ke(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Sr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Tr(t){return t.closest('[role="tree"]')}function ro(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function no(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function ut(t){let e=I.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),I.selectedItem=t}function Dr(t){let e=I.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function oo(t){let e=I.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function io(t){let e=I.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Ir(t,e){let r=Tr(e);if(!r)return;let o=Sr(r),n=o.indexOf(e);if(n<0)return;let i=I.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)oo(e);else if(c&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&be(s,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)io(e);else{let s=ro(e);s&&be(s,Sr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&be(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&be(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),ut(e),c&&Dr(e);break;case"Home":t.preventDefault(),o.length>0&&be(o[0],o);break;case"End":t.preventDefault(),o.length>0&&be(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),I.typeahead+=t.key.toLowerCase(),I.typeaheadTimer&&clearTimeout(I.typeaheadTimer),I.typeaheadTimer=setTimeout(()=>{I.typeahead="",I.typeaheadTimer=null},500);let s=n+1;for(let a=0;a<o.length;a++){let d=(s+a)%o.length;if(no(o[d]).startsWith(I.typeahead)){be(o[d],o);break}}}break}}function Br(t){t.directive("tree",{priority:15,init(e){Le(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Fr(t){t.directive("branch",{priority:16,init(e,r,o){Le();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Tr(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(I.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):I.branches.set(e,{expanded:n,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),ut(e),Dr(e))};e.addEventListener("click",s),ke(e,()=>e.removeEventListener("click",s));let a=d=>{Ir(d,e)};e.addEventListener("keydown",a),ke(e,()=>e.removeEventListener("keydown",a)),ke(e,()=>{c=!0,I.branches.delete(e),I.selectedItem===e&&(I.selectedItem=null),I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null,I.typeahead="")})}})}function be(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Pr(t){t.directive("subtree",{priority:16,init(e){Le(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),ut(o)};o.addEventListener("click",n),ke(o,()=>o.removeEventListener("click",n));let i=c=>{Ir(c,o)};o.addEventListener("keydown",i),ke(o,()=>o.removeEventListener("keydown",i)),ke(o,()=>{I.selectedItem===o&&(I.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=I.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Rr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function pt(t){return t.closest('[role="treeitem"]')}function so(t){return t.closest('[role="tree"]')}function ao(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function co(t){return ao(t).indexOf(t)}function lo(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function $r(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function je(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function De(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function uo(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function po(t,e){je();let r=uo(),o=t.getBoundingClientRect(),n=so(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function Mr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(Le(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=m=>{let p=pt(m.target);if(p&&e.contains(p)){if(p.hasAttribute("tree-drag-disabled")){m.preventDefault();return}D.dragging={el:p,treeRoot:e},m.dataTransfer&&(m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain","")),p.classList.add("nojs-dragging"),p.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:p}}))}},c=m=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let p=pt(m.target);if(!p||!e.contains(p)||p===D.dragging.el||$r(p,D.dragging.el))return;m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let g=lo(p,m.clientY,o);(D.currentTarget!==p||D.currentPosition!==g)&&(De(e),je(),D.currentTarget=p,D.currentPosition=g,g==="on"?p.classList.add("nojs-tree-drag-over"):po(p,g))},s=m=>{D.dragging&&D.dragging.treeRoot===e&&n++},a=m=>{D.dragging&&(n--,n<=0&&(n=0,De(e),je(),D.currentTarget=null,D.currentPosition=null))},d=m=>{if(m.preventDefault(),m.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let p=D.dragging.el,g=D.currentTarget,v=D.currentPosition;if(De(e),je(),!g||!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(g===p||$r(g,p)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="on"){let y=g.querySelector(':scope > [role="group"]');y||(y=g.nextElementSibling?.matches?.('[role="group"]')?g.nextElementSibling:null),y?y.setAttribute("aria-hidden","false"):(y=document.createElement("ul"),y.setAttribute("role","group"),y.setAttribute("subtree",""),y.classList.add("nojs-subtree","nojs-tree"),y.setAttribute("aria-hidden","false"),g.appendChild(y));let f=I.branches.get(g);f&&(f.expanded=!0,f.subtreeEl=y,g.setAttribute("aria-expanded","true")),y.appendChild(p),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:p,newParent:g}}))}else{let y=g.parentElement;if(!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="before")y.insertBefore(p,g);else{let b=g.nextElementSibling,A=b?.matches?.('[role="group"]')?b.nextElementSibling:b;A?y.insertBefore(p,A):y.appendChild(p)}let f=co(p);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:p,newIndex:f}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},u=m=>{let p=pt(m.target);p&&p.classList.remove("nojs-dragging"),De(e),je(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",s),e.addEventListener("dragleave",a),e.addEventListener("drop",d),e.addEventListener("dragend",u),Rr(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",a),e.removeEventListener("drop",d),e.removeEventListener("dragend",u),De(e),je()}),fo(e);let l=new MutationObserver(m=>{for(let p of m)for(let g of p.addedNodes){if(g.nodeType!==1)continue;g.getAttribute("role")==="treeitem"&&ft(g);let v=g.querySelectorAll?.('[role="treeitem"]');if(v)for(let y of v)ft(y)}});l.observe(e,{childList:!0,subtree:!0}),Rr(e,()=>l.disconnect())}})}function ft(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function fo(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)ft(r)}function qr(t,e={}){Br(t),Fr(t),Pr(t),Mr(t)}function zr(){Cr()}var Ue=new Map;function Hr(){Ue.clear()}function Ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Or(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function Vr(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Wr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Ie(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Gr(t){t.directive("stepper",{priority:14,init(e,r,o){Ye();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",a=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",u=e.getAttribute("aria-label")||"Stepper",l=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",u),e.classList.add("nojs-stepper");let m=null,p=[];if(a){m=document.createElement("div"),m.className="nojs-stepper-indicator",m.setAttribute("role","tablist"),m.setAttribute("aria-label","Progress"),i.forEach((k,S)=>{if(S>0){let q=document.createElement("div");q.className="nojs-stepper-separator",q.setAttribute("aria-hidden","true"),m.appendChild(q)}let w=document.createElement("button");w.type="button",w.className="nojs-stepper-indicator-item",w.setAttribute("role","tab"),w.setAttribute("aria-selected",S===l?"true":"false");let B=k.getAttribute("step-label")||`Step ${S+1}`,H=document.createElement("span");H.textContent=B,w.appendChild(H),w.setAttribute("aria-label",B);let N=`nojs-stepper-tab-${go++}`;if(w.id=N,s==="free"){w.setAttribute("data-clickable","");let q=()=>x(S);w.addEventListener("click",q),Ie(e,()=>w.removeEventListener("click",q))}else w.setAttribute("tabindex","-1");m.appendChild(w),p.push(w)});let j=k=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(k.key))return;k.preventDefault();let S=l;k.key==="ArrowRight"?S=Math.min(l+1,i.length-1):k.key==="ArrowLeft"?S=Math.max(l-1,0):k.key==="Home"?S=0:k.key==="End"&&(S=i.length-1),s==="free"?(x(S),p[S]?.focus()):p[l]?.focus()};m.addEventListener("keydown",j),Ie(e,()=>m.removeEventListener("keydown",j)),e.insertBefore(m,e.firstChild)}let g=null,v=null,y=null;if(d){g=document.createElement("div"),g.className="nojs-stepper-nav",g.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let j=()=>h();v.addEventListener("click",j),Ie(e,()=>v.removeEventListener("click",j)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let k=()=>A();y.addEventListener("click",k),Ie(e,()=>y.removeEventListener("click",k)),g.appendChild(v),g.appendChild(y),e.appendChild(g)}function f(j){let k=i[j];if(!k)return!0;if(!Or(k,t.findContext)){let B=k.querySelector("form[validate]");return B&&(Vr(B),p[j]&&p[j].classList.add("nojs-step-invalid"),Wr(e,k,B)),!1}p[j]&&p[j].classList.remove("nojs-step-invalid");let S=k.querySelectorAll("[required]");for(let B of S)if(typeof B.checkValidity=="function"&&!B.checkValidity())return B.reportValidity(),!1;let w=k.getAttribute("step-validate");if(w)try{if(!t.evaluate(w,n))return!1}catch(B){return console.warn(`[stepper] step-validate error: ${B.message}`),!1}return!0}function b(j){i.forEach((k,S)=>{let w=S===l;k.setAttribute("aria-hidden",w?"false":"true"),w?(k.removeAttribute("inert"),k.setAttribute("aria-current","step")):(k.setAttribute("inert",""),k.removeAttribute("aria-current"))}),p.length&&p.forEach((k,S)=>{k.setAttribute("aria-selected",S===l?"true":"false"),S<l?k.setAttribute("data-completed",""):k.removeAttribute("data-completed"),k.setAttribute("tabindex",S===l?"0":"-1");let w=i[S];w.id&&(k.setAttribute("aria-controls",w.id),w.setAttribute("aria-labelledby",k.id))}),v&&(v.disabled=l===0),y&&(y.textContent=l===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!j,detail:{current:l,total:i.length}}))}function A(){return l>=i.length-1?(s==="linear"&&!f(l)||e.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:l,total:i.length}})),!1):s==="linear"&&!f(l)?!1:(l++,b(),L(),!0)}function h(){return l<=0?!1:(l--,b(),L(),!0)}function x(j){if(j<0||j>=i.length||j===l)return!1;if(s==="linear"&&j>l){for(let k=l;k<j;k++)if(l=k,b(),!f(k))return L(),!1}return l=j,b(),L(),!0}let _={get current(){return l},get total(){return i.length},next:A,prev:h,goTo:x,get isFirst(){return l===0},get isLast(){return l===i.length-1}};function L(){n.$stepper=_}L(),Ue.set(e,{get current(){return l},steps:i,mode:s,indicatorEl:m,navEl:g}),b(!0),Ie(e,()=>{Ue.delete(e),m&&m.parentNode&&m.remove(),g&&g.parentNode&&g.remove(),delete n.$stepper})}})}var go=0;var mo=0;function Ur(t){t.directive("step",{priority:13,init(e,r,o){Ye(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${mo++}`),e.setAttribute("tabindex","0")}})}function Yr(t,e={}){Ur(t),Gr(t)}function Kr(){Hr()}function Xr(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Nr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Zr(t){t.directive("skeleton",{priority:10,init(e,r,o){Xr();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),a=[];function d(f){u();for(let b=0;b<f;b++){let A=document.createElement("div");A.className="nojs-skeleton-line",e.appendChild(A),a.push(A)}}function u(){for(let f of a)f.parentNode===e&&e.removeChild(f);a=[]}function l(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let f=s+(String(s).match(/\d$/)?"px":"");e.style.width=f,e.style.height=f}if(c){let f=parseInt(c,10);f>0&&d(f)}e.setAttribute("aria-busy","true")}let m=null;function p(){m&&m(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),u(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let f=!1,b=null,A=()=>{f||(f=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",A),b!==null&&clearTimeout(b),m=null)};e.addEventListener("transitionend",A),b=setTimeout(A,0),m=()=>{e.removeEventListener("transitionend",A),b!==null&&clearTimeout(b),f=!0,m=null}}let g=!1;function v(){let f=!!t.evaluate(o,n);f&&!g?(g=!0,l()):!f&&g&&(g=!1,p())}v();let y=n.$watch(v);Nr(e,y),Nr(e,()=>{m&&m(),g&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),u(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function Qr(t,e={}){Zr(t)}var he=new Map,G=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Jr(){he.clear(),G.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function bo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function en(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function tn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function ho(t,e){let o=(he.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function vo(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Be(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Xe(t,e,r,o){let n=Z(e,o),i=Z(r,o),c=G.get(e),s=G.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function gt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=he.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function yo(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=he.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function xo(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=p=>{if(p.button!==0)return;p.preventDefault();let g=ho(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=p[en(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=g,C.sign=tn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(p.pointerId)},s=p=>{if(!C.active||C.gutterEl!==i)return;let g=(p[en(C.direction)]-C.startPos)*(C.sign||1),v=Be(C.startPrevSize+g,C.prevPane),y=Be(C.startNextSize-g,C.nextPane),f=C.startPrevSize+C.startNextSize;v+y!==f&&(v!==C.startPrevSize+g?y=f-v:v=f-y),C.prevPane.style.flexBasis=`${v}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${y}px`,C.nextPane.style.flexGrow="0",Xe(i,C.prevPane,C.nextPane,C.direction)},a=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",gt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let d=10,u=p=>{let g=e==="horizontal",v=tn(t,e),y=0;if(g&&p.key==="ArrowRight"||!g&&p.key==="ArrowDown")y=d*v;else if(g&&p.key==="ArrowLeft"||!g&&p.key==="ArrowUp")y=-d*v;else if(p.key==="Home")y=(G.get(r)?.min||0)-Z(r,e);else if(p.key==="End"){let _=G.get(o);y=Z(r,e)+Z(o,e)-(_?.min||0)-Z(r,e)}else return;p.preventDefault();let f=Z(r,e),b=Z(o,e),A=f+b,h=Be(f+y,r),x=Be(A-h,o);h=A-x,h=Be(h,r),x=A-h,r.style.flexBasis=`${h}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Xe(i,r,o,e),gt(t)};i.addEventListener("keydown",u);let l=()=>{let p=G.get(r),g=G.get(o),v=p?.collapsible?r:g?.collapsible?o:null;if(!v)return;let y=G.get(v);if(!y)return;let f=v===r?o:r,b=Z(r,e)+Z(o,e);if(y.collapsed){y.collapsed=!1,v.removeAttribute("data-collapsed");let A=y.preCollapseSize||`${Math.round(b/2)}px`,h=vo(A,b)??b/2,x=Math.min(h,b);v.style.flexBasis=`${x}px`,v.style.flexGrow="0",f.style.flexBasis=`${b-x}px`,f.style.flexGrow="0"}else y.preCollapseSize=v.style.flexBasis||`${Z(v,e)}px`,y.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",f.style.flexBasis=`${b}px`,f.style.flexGrow="0";Xe(i,r,o,e),gt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",l),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",u),i.removeEventListener("dblclick",l)}}}function rn(t){t.directive("split",{priority:14,init(e,r,o){Ke();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(u=>u.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(u=>{G.get(u)||G.set(u,{size:u.getAttribute("pane")||null,min:parseInt(u.getAttribute("pane-min"),10)||0,max:parseInt(u.getAttribute("pane-max"),10)||1/0,collapsible:u.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let u=0;u<c.length-1;u++){let{gutter:l,cleanup:m}=xo(e,n,c[u],c[u+1],i);c[u].after(l),s.push(l),a.push(m)}he.set(e,{direction:n,gutterSize:i,panes:c,gutters:s}),yo(e)||c.forEach(u=>{let m=G.get(u)?.size;m?(u.style.flexBasis=m,u.style.flexGrow="0"):(u.style.flexGrow="1",u.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((u,l)=>{Xe(u,c[l],c[l+1],n)})}),bo(e,()=>{a.forEach(u=>u()),s.forEach(u=>u.remove()),he.delete(e),c.forEach(u=>G.delete(u)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Eo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function nn(t){t.directive("pane",{priority:15,init(e,r,o){Ke(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Eo(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function on(t,e={}){rn(t),nn(t)}function sn(){Jr()}var le={sorts:new Map};function an(){le.sorts.clear()}function ve(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function wo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ao(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?o=r:o=r.querySelector("[each]")||r.querySelector("[foreach]"),!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function _o(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function cn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function dn(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function un(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return dn(Number(t),Number(e));case"date":return dn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Lo(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function pn(t){t.directive("sortable",{priority:10,init(e){ve(),e.classList.add("nojs-sortable")}})}function fn(t){t.directive("sort",{priority:11,init(e,r,o){ve();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;le.sorts.has(s)||le.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(le.sorts.get(s).column||ln(e,s,n,i,c,t));let a=()=>{let d=le.sorts.get(s),u;d.column!==n?u="asc":d.direction==="asc"?u="desc":d.direction==="desc"?u=null:u="asc",ln(e,s,n,i,u,t)};e.addEventListener("click",a),wo(e,()=>{e.removeEventListener("click",a),s&&!s.isConnected&&(le.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function ln(t,e,r,o,n,i){let c=le.sorts.get(e);Lo(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let s=Ao(e,i);if(s){let a=i.findContext(e),d=a?_o(a,s.arrayPath):null;if(Array.isArray(d)){if(!n){let l=e._nojsOriginalOrder;if(l){let m=new Set(d),p=l.filter(g=>m.has(g));for(let g of d)l.includes(g)||p.push(g);cn(a,s.arrayPath,p)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let u=[...d].sort((l,m)=>{let p=l!=null?l[r]:null,g=m!=null?m[r]:null,v=un(p,g,o);return n==="desc"?-v:v});cn(a,s.arrayPath,u);return}}ko(e,t,r,o,n)}function ko(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let a=[...e.closest("tr").children].indexOf(e);if(a<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let m=document.createDocumentFragment();for(let p of t._nojsOriginalRows)m.appendChild(p);i.appendChild(m);return}let u=m=>{let p=m.replace(/[^0-9.\-]/g,"");return p===""||p==="-"?NaN:parseFloat(p)};d.sort((m,p)=>{let g=m.children[a]?.textContent?.trim()||"",v=p.children[a]?.textContent?.trim()||"",y=un(o==="number"?u(g):g,o==="number"?u(v):v,o);return n==="desc"?-y:y});let l=document.createDocumentFragment();for(let m of d)l.appendChild(m);i.appendChild(l)}function gn(t){t.directive("fixed-header",{priority:10,init(e){ve(),e.classList.add("nojs-fixed-header")}})}function mn(t){t.directive("fixed-col",{priority:10,init(e){ve(),e.classList.add("nojs-fixed-col")}})}function mt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function bn(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function hn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function vn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function yn(t){t.directive("table-reorder",{priority:15,init(e){if(ve(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,a=null,d=null;function u(){let y=r.querySelectorAll(":scope > tr");for(let f=0;f<y.length;f++){let b=y[f];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let A=!0;if(n){let k=S=>{A=!!S.target.closest(n)};b.addEventListener("mousedown",k),mt(b,()=>b.removeEventListener("mousedown",k))}let h=k=>{if(n&&!A){k.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(b),a=b,k.dataTransfer&&(k.dataTransfer.effectAllowed="move",k.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(w=>b.classList.add(w)),b.setAttribute("aria-grabbed","true")},x=k=>{if(a==null)return;k.preventDefault(),k.dataTransfer&&(k.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),w=S.top+S.height/2,H=[...r.querySelectorAll(":scope > tr")].indexOf(b);l(),H!==s&&(k.clientY<w?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),d=b)},_=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),d===b&&(d=null)},L=k=>{if(k.preventDefault(),k.stopPropagation(),a==null||s==null)return;let S=[...r.querySelectorAll(":scope > tr")],w=b.getBoundingClientRect(),B=w.top+w.height/2,H=S.indexOf(b);k.clientY>=B&&H++;let N=s;if(N===H||N+1===H){m();return}let q=N<H?H-1:H,se=bn(e);if(se&&o){let T=hn(o,se.arrayPath);if(Array.isArray(T)){let P=[...T],[M]=P.splice(N,1);P.splice(q,0,M),vn(o,se.arrayPath,P),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...P]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:N,to:q,item:M}}))}}else{let T=a,P=S[q];T&&P&&(N<q?r.insertBefore(T,P.nextSibling):r.insertBefore(T,P),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:N,to:q,item:null}})))}m()},j=()=>{m()};b.addEventListener("dragstart",h),b.addEventListener("dragover",x),b.addEventListener("dragleave",_),b.addEventListener("drop",L),b.addEventListener("dragend",j),mt(b,()=>{b.removeEventListener("dragstart",h),b.removeEventListener("dragover",x),b.removeEventListener("dragleave",_),b.removeEventListener("drop",L),b.removeEventListener("dragend",j),b._nojsReorderSetup=!1})}}function l(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function m(){a&&(i.split(/\s+/).filter(Boolean).forEach(f=>a.classList.remove(f)),a.setAttribute("aria-grabbed","false")),l(),s=null,a=null;let y=r.querySelectorAll(":scope > tr");for(let f of y)f.classList.remove("nojs-reorder-insert-before"),f.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(b=>f.classList.remove(b))}let p=y=>{a!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},g=y=>{if(a==null||y.target!==r)return;y.preventDefault(),y.stopPropagation();let f=s,A=[...r.querySelectorAll(":scope > tr")].length-1;if(f===A){m();return}let h=bn(e);if(h&&o){let x=hn(o,h.arrayPath);if(Array.isArray(x)){let _=[...x],[L]=_.splice(f,1);_.push(L),vn(o,h.arrayPath,_),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[..._]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:f,to:_.length-1,item:L}}))}}m()};r.addEventListener("dragover",p),r.addEventListener("drop",g);let v=new MutationObserver(()=>{u()});v.observe(r,{childList:!0}),u(),mt(e,()=>{v.disconnect(),r.removeEventListener("dragover",p),r.removeEventListener("drop",g),m()})}})}function xn(t,e={}){pn(t),fn(t),gn(t),mn(t),yn(t)}function En(){an()}var ue=new Map,Ne=new Map;function wn(){for(let[t,e]of ue){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}ue.clear(),Ne.clear()}function An(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function jo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Co(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function So(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function To(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function Do(){return document.documentElement}function Io(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function _n(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function bt(t){let e=ue.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(a=>{for(let l of a)l.isIntersecting?n.add(l.target.id):n.delete(l.target.id);let d=null,u=1/0;for(let l of n){let m=document.getElementById(l);if(!m)continue;let p=m.getBoundingClientRect();p.top<u&&(u=p.top,d=l)}for(let l of e.spyEntries)_n(l.el);if(d){for(let l of e.spyEntries)if(l.targetId===d){Io(l.el),e.activeEl=l.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),s=new Set;for(let a of e.spyEntries){if(s.has(a.targetId))continue;let d=document.getElementById(a.targetId);d&&(c.observe(d),s.add(a.targetId))}e.observer=c}function Bo(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Ln(t){t.directive("spy",{priority:20,init(e,r,o){An();let n=Co(e);if(!n){e.tagName!=="A"&&Bo(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=So(e),c=To(e),s=Do();ue.has(s)||ue.set(s,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let a=ue.get(s),d={el:e,targetId:n};a.spyEntries.push(d),Ne.set(e,s),bt(s);let u=null;typeof MutationObserver<"u"&&(u=new MutationObserver(()=>{document.getElementById(n)&&a.observer&&bt(s)}),u.observe(document.body,{childList:!0,subtree:!0})),jo(e,()=>{let l=a.spyEntries.indexOf(d);l!==-1&&a.spyEntries.splice(l,1),Ne.delete(e),_n(e),u&&(u.disconnect(),u=null),a.spyEntries.length===0?(a.observer&&(a.observer.disconnect(),a.observer=null),ue.delete(s)):bt(s)})}})}function kn(t,e={}){Ln(t)}function jn(){wn()}var Fo="[validate],[drag],[drop],[drag-list],[drag-multiple]";function Cn(t){if(typeof document>"u")return;let e=document.querySelectorAll(Fo);for(let r of e){if(!r.__declared)continue;let o=X(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Po=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","spy","spy-offset","spy-threshold"],Ro={name:"nojs-elements",install(t,e={}){kt(t,e),Rt(t,e),Vt(t,e),Yt(t,e),nr(t,e),ur(t,e),vr(t,e),kr(t,e),qr(t,e),Yr(t,e),Qr(t,e),on(t,e),xn(t,e),kn(t,e),Cn(t)},init(t){if(Cn(t),typeof document>"u"||!document.body)return;let e=Po.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){jt(),$t(),Wt(),Kt(),or(),pr(),yr(),jr(),zr(),Kr(),sn(),En(),jn()}},ht=Ro;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(ht),t=!0,!0):!1};window.NoJSElements=ht;let t=!1;if(!e()){let r=0,o=100,n=setInterval(()=>{(e()||++r>=o)&&clearInterval(n)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(n)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
