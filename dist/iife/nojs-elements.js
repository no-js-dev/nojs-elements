/**
 * NoJS Elements v1.13.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
(()=>{var x={dragging:null,selected:new Map,placeholder:null},Ce=new Map;function lt(){x.dragging=null,x.selected.clear(),x.placeholder&&(x.placeholder.remove(),x.placeholder=null),Ce.clear()}function Se(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function X(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Ie(t,e){let r=X(t,"removeCoreDirective");typeof r=="function"?r(e):(X(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function se(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Te(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Te(r):e++}return e}function De(t,e,r,i){let n=[...t.children].filter(o=>!o.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let o=0;o<n.length;o++){let s=(n[o].style&&n[o].style.display==="contents"&&n[o].firstElementChild||n[o]).getBoundingClientRect();if(i==="horizontal"){let c=s.left+s.width/2;if(e<c)return o}else if(i==="grid"){let c=s.left+s.width/2,p=s.top+s.height/2;if(r<p&&e<c||r<s.top+s.height&&e<c)return o}else{let c=s.top+s.height/2;if(r<c)return o}}return n.length}function ut(t,e,r,i){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=i||"nojs-drop-placeholder",x.dragging&&x.dragging.sourceEl){let s=(x.dragging.sourceEl.firstElementChild||x.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let l=document.getElementById(r.startsWith("#")?r.slice(1):r);l&&l.content?(n=document.createElement("div"),n.style.display="contents",n.className=i||"nojs-drop-placeholder",n.appendChild(l.content.cloneNode(!0))):(n=document.createElement("div"),n.className=i||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let o=[...t.children].filter(l=>!l.classList.contains("nojs-drop-placeholder"));e>=o.length?t.appendChild(n):t.insertBefore(n,o[e]),x.placeholder=n}function re(){x.placeholder&&(x.placeholder.remove(),x.placeholder=null)}function de(t,e){return!e||e==="*"?!0:e.split(",").map(i=>i.trim()).includes(t)}function on(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let i=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=i.getBoundingClientRect(),o=n.width,l=n.height,s=getComputedStyle(i),c=Math.min(e,3);for(let f=c-1;f>=0;f--){let u=document.createElement("div"),m=f*4;u.style.cssText="position:absolute;top:"+m+"px;left:"+m+"px;width:"+o+"px;height:"+l+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",f===0?(u.innerHTML=i.innerHTML,u.style.background=s.backgroundColor||"#fff",u.style.border=s.border,u.style.padding=s.padding,u.style.fontSize=s.fontSize,u.style.color=s.color,u.style.fontFamily=s.fontFamily):(u.style.background=s.backgroundColor||"#fff",u.style.border=s.border||"1px solid #ddd"),r.appendChild(u)}let p=document.createElement("div");return p.textContent=e,p.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(p),r.style.width=o+(c-1)*4+"px",r.style.height=l+(c-1)*4+"px",r}function pt(t){Ie(t,"drag"),t.directive("drag",{priority:15,init(e,r,i){Se();let n=t.findContext(e),o=e.getAttribute("drag-type")||"default",l=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),c=e.getAttribute("drag-image"),p=e.getAttribute("drag-image-offset")||"0,0",f=e.getAttribute("drag-disabled"),u=e.getAttribute("drag-class")||"nojs-dragging",m=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let d=!0;if(s){let v=h=>{d=!!h.target.closest(s)};e.addEventListener("mousedown",v),se(e,()=>e.removeEventListener("mousedown",v))}let a=v=>{if(s&&!d){v.preventDefault();return}if(f&&t.evaluate(f,n)){v.preventDefault();return}let h=t.evaluate(i,n),_=e.getAttribute("drag-group"),y=h;if(_&&x.selected.has(_)){let E=x.selected.get(_);E.size>0&&[...E].some(A=>A.el===e)&&(y=[...E].map(A=>A.item))}if(x.dragging={item:y,type:o,effect:l,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},v.dataTransfer){if(v.dataTransfer.effectAllowed=l,v.dataTransfer.setData("text/plain",""),Array.isArray(y)&&y.length>1&&v.dataTransfer.setDragImage){let E=on(e,y.length);document.body.appendChild(E);let k=e.getBoundingClientRect();v.dataTransfer.setDragImage(E,k.width/2,k.height/2),requestAnimationFrame(()=>E.remove())}else if(c&&v.dataTransfer.setDragImage)if(c==="none"){let E=document.createElement("div");E.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(E);let[k,A]=p.split(",").map(Number);v.dataTransfer.setDragImage(E,k||0,A||0),requestAnimationFrame(()=>E.remove())}else{let E=e.querySelector(c);if(E){let[k,A]=p.split(",").map(Number);m&&E.classList.add(m),v.dataTransfer.setDragImage(E,k||0,A||0)}}}if(u.split(/\s+/).filter(Boolean).forEach(E=>e.classList.add(E)),Array.isArray(y)&&_&&x.selected.has(_))for(let E of x.selected.get(_))E.el!==e&&u.split(/\s+/).filter(Boolean).forEach(k=>E.el.classList.add(k));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:y,index:x.dragging.sourceIndex,el:e}}))},g=()=>{u.split(/\s+/).filter(Boolean).forEach(h=>e.classList.remove(h));let v=e.getAttribute("drag-group");if(v&&x.selected.has(v))for(let h of x.selected.get(v))u.split(/\s+/).filter(Boolean).forEach(_=>h.el.classList.remove(_));if(e.setAttribute("aria-grabbed","false"),m&&c&&c!=="none"){let h=e.querySelector(c);h&&h.classList.remove(m)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:x.dragging?.item,index:x.dragging?.sourceIndex,dropped:x.dragging===null}})),x.dragging=null,re()};if(e.addEventListener("dragstart",a),e.addEventListener("dragend",g),se(e,()=>{e.removeEventListener("dragstart",a),e.removeEventListener("dragend",g)}),f){let v=function(){let _=!!t.evaluate(f,n);e.draggable=!_,_?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},h=n.$watch(v);se(e,h)}let b=v=>{if(x.dragging&&!x.dragging.sourceEl.isConnected&&(x.dragging=null),v.key===" "&&!x.dragging){v.preventDefault();let h=t.evaluate(i,n);x.dragging={item:h,type:o,effect:l,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},u.split(/\s+/).filter(Boolean).forEach(_=>e.classList.add(_)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:h,index:null,el:e}}))}else v.key==="Escape"&&x.dragging&&x.dragging.sourceEl===e&&(v.preventDefault(),u.split(/\s+/).filter(Boolean).forEach(h=>e.classList.remove(h)),e.setAttribute("aria-grabbed","false"),x.dragging=null,re())};e.addEventListener("keydown",b),se(e,()=>e.removeEventListener("keydown",b))}})}function ft(t){Ie(t,"drop"),t.directive("drop",{priority:15,init(e,r,i){Se();let n=t.findContext(e),o=e.getAttribute("drop-accept")||"default",l=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",c=e.getAttribute("drop-reject-class")||"nojs-drop-reject",p=e.getAttribute("drop-disabled"),f=e.getAttribute("drop-max"),u=e.getAttribute("drop-sort"),m=e.getAttribute("drop-placeholder"),d=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",l);let a=0,g=y=>{if(!x.dragging||p&&t.evaluate(p,n))return;let E=de(x.dragging.type,o),k=!0;if(f){let A=t.evaluate(f,n),w=Te(e);typeof A=="number"&&w>=A&&(k=!1)}if(!E||!k){c.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),s.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),re();return}if(c.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect=l),u){let A=De(e,y.clientX,y.clientY,u);m&&ut(e,A,m,d),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:x.dragging.item,index:A}}))}},b=y=>{if(x.dragging&&!(p&&t.evaluate(p,n))&&(a++,a===1)){let E=de(x.dragging.type,o),k=!0;if(f){let A=t.evaluate(f,n),w=Te(e);typeof A=="number"&&w>=A&&(k=!1)}E&&k?(s.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:x.dragging.item,type:x.dragging.type}}))):c.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A))}},v=y=>{x.dragging&&(a--,a<=0&&(a=0,s.split(/\s+/).filter(Boolean).forEach(E=>e.classList.remove(E)),c.split(/\s+/).filter(Boolean).forEach(E=>e.classList.remove(E)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:x.dragging.item}}))))},h=y=>{if(y.preventDefault(),y.stopPropagation(),a=0,!x.dragging||p&&t.evaluate(p,n)||!de(x.dragging.type,o))return;if(f){let L=t.evaluate(f,n),P=Te(e);if(typeof L=="number"&&P>=L)return}let E=x.dragging.item,k=x.dragging.type,A=x.dragging.effect,w=0;u&&(w=De(e,y.clientX,y.clientY,u)),s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),c.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),re();let j={$drag:E,$dragType:k,$dragEffect:A,$dropIndex:w,$source:{list:x.dragging.sourceList,index:x.dragging.sourceIndex,el:x.dragging.sourceEl},$target:{list:null,index:w,el:e},$el:e},D=X(t,"execStatement");typeof D=="function"?D(i,n,j):(X(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),x.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:E,index:w,source:j.$source,target:j.$target,effect:A}}))},_=y=>{x.dragging&&(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),h(y))};e.addEventListener("dragover",g),e.addEventListener("dragenter",b),e.addEventListener("dragleave",v),e.addEventListener("drop",h),e.addEventListener("keydown",_),se(e,()=>{e.removeEventListener("dragover",g),e.removeEventListener("dragenter",b),e.removeEventListener("dragleave",v),e.removeEventListener("drop",h),e.removeEventListener("keydown",_)})}})}function gt(t){Ie(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,i){Se();let n=t.findContext(e),o=e.getAttribute("template"),l=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",c=e.getAttribute("drop-sort")||"vertical",p=e.getAttribute("drag-type")||"__draglist_"+i,f=e.getAttribute("drop-accept")||p,u=e.hasAttribute("drag-list-copy"),m=e.hasAttribute("drag-list-remove"),d=e.getAttribute("drag-disabled"),a=e.getAttribute("drop-disabled"),g=e.getAttribute("drop-max"),b=e.getAttribute("drop-placeholder"),v=e.getAttribute("drop-placeholder-class"),h=e.getAttribute("drag-class")||"nojs-dragging",_=e.getAttribute("drop-class")||"nojs-drag-over",y=e.getAttribute("drop-reject-class")||"nojs-drop-reject",E=e.getAttribute("drop-settle-class")||"nojs-drop-settle",k=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",u?"copy":"move");let A={listPath:i,ctx:n,el:e};Ce.set(e,A),se(e,()=>Ce.delete(e));let w=0,j=null;function D(){let S=t.resolve(i,n);if(!Array.isArray(S))return;if(S===j&&S.length>0&&e.children.length>0){for(let M of e.children)M.__ctx&&M.__ctx.$notify&&M.__ctx.$notify();return}j=S;let B=o?document.getElementById(o):null;if(!B)return;let R=X(t,"disposeChildren");typeof R=="function"&&R(e),e.innerHTML="";let I=S.length;S.forEach((M,q)=>{let ee={[s]:M,$index:q,$count:I,$first:q===0,$last:q===I-1,$even:q%2===0,$odd:q%2!==0},G=t.createContext(ee,n),Q=B.content.cloneNode(!0),F=document.createElement("div");F.style.display="contents",F.__ctx=G,F.appendChild(Q),e.appendChild(F);let Y=F.firstElementChild||F;Y.draggable=!0,Y.setAttribute("role","option"),Y.setAttribute("aria-grabbed","false"),Y.getAttribute("tabindex")||Y.setAttribute("tabindex","0");let ke=z=>{if(d&&t.evaluate(d,n)){z.preventDefault();return}x.dragging={item:M,type:p,effect:u?"copy":"move",sourceEl:F,sourceCtx:G,sourceList:S,sourceIndex:q,listDirective:{el:e,listPath:i,ctx:n,keyProp:l,copyMode:u,removeMode:m}},z.dataTransfer&&(z.dataTransfer.effectAllowed=u?"copy":"move",z.dataTransfer.setData("text/plain","")),h.split(/\s+/).filter(Boolean).forEach(N=>Y.classList.add(N)),Y.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:M,index:q,el:Y}}))},dt=()=>{h.split(/\s+/).filter(Boolean).forEach(z=>Y.classList.remove(z)),Y.setAttribute("aria-grabbed","false"),x.dragging&&x.dragging.sourceEl===F&&(x.dragging=null),re()};F.addEventListener("dragstart",ke),F.addEventListener("dragend",dt);let ct=z=>{if(z.key===" "&&!x.dragging)z.preventDefault(),z.stopPropagation(),x.dragging={item:M,type:p,effect:u?"copy":"move",sourceEl:F,sourceCtx:G,sourceList:S,sourceIndex:q,listDirective:{el:e,listPath:i,ctx:n,keyProp:l,copyMode:u,removeMode:m}},h.split(/\s+/).filter(Boolean).forEach(N=>Y.classList.add(N)),Y.setAttribute("aria-grabbed","true");else if(z.key==="Escape"&&x.dragging){z.preventDefault(),z.stopPropagation();let N=e.querySelector('[aria-grabbed="true"]')||Y;h.split(/\s+/).filter(Boolean).forEach(Oe=>N.classList.remove(Oe)),N.setAttribute("aria-grabbed","false"),x.dragging=null,re()}else if((z.key==="ArrowDown"||z.key==="ArrowRight")&&x.dragging&&x.dragging.sourceEl===F){z.preventDefault();let N=F.nextElementSibling;N&&(N.firstElementChild||N).focus()}else if((z.key==="ArrowUp"||z.key==="ArrowLeft")&&x.dragging&&x.dragging.sourceEl===F){z.preventDefault();let N=F.previousElementSibling;N&&(N.firstElementChild||N).focus()}};F.addEventListener("keydown",ct),F.__disposers=F.__disposers||[],F.__disposers.push(()=>F.removeEventListener("dragstart",ke),()=>F.removeEventListener("dragend",dt),()=>F.removeEventListener("keydown",ct)),t.processTree(F)});let $=S.length===0;k.split(/\s+/).filter(Boolean).forEach(M=>e.classList.toggle(M,$))}let L=S=>{if(!x.dragging||a&&t.evaluate(a,n))return;let B=de(x.dragging.type,f),R=!0;if(g){let $=t.evaluate(g,n),M=t.resolve(i,n);typeof $=="number"&&Array.isArray(M)&&M.length>=$&&(R=!1)}if(!B||!R){y.split(/\s+/).filter(Boolean).forEach($=>e.classList.add($)),_.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),re();return}y.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect=u?"copy":"move");let I=De(e,S.clientX,S.clientY,c);b&&ut(e,I,b,v)},P=S=>{if(x.dragging&&!(a&&t.evaluate(a,n))&&(w++,w===1)){let B=de(x.dragging.type,f),R=!0;if(g){let I=t.evaluate(g,n),$=t.resolve(i,n);typeof I=="number"&&Array.isArray($)&&$.length>=I&&(R=!1)}B&&R?(_.split(/\s+/).filter(Boolean).forEach(I=>e.classList.add(I)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:x.dragging.item,type:x.dragging.type}}))):y.split(/\s+/).filter(Boolean).forEach(I=>e.classList.add(I))}},V=()=>{x.dragging&&(w--,w<=0&&(w=0,_.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),y.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:x.dragging?.item}}))))},U=S=>{if(S.preventDefault(),S.stopPropagation(),w=0,!x.dragging||a&&t.evaluate(a,n)||!de(x.dragging.type,f))return;if(g){let G=t.evaluate(g,n),Q=t.resolve(i,n);if(typeof G=="number"&&Array.isArray(Q)&&Q.length>=G)return}let B=x.dragging.item,R=x.dragging.listDirective,I=x.dragging.sourceIndex,$=De(e,S.clientX,S.clientY,c);_.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),y.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),re();let M=t.resolve(i,n);if(!Array.isArray(M))return;let q=R&&R.el===e;if(q&&I===$){x.dragging=null;return}if(q&&I+1===$){x.dragging=null;return}let ee=[...M];if(q){let[G]=ee.splice(I,1),Q=I<$?$-1:$;ee.splice(Q,0,G),n.$set(i,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:B,from:I,to:Q}}))}else{let G=u&&typeof B=="object"?{...B}:B;if(ee.splice($,0,G),n.$set(i,ee),R&&!R.copyMode&&(m||R.removeMode)){let Q=t.resolve(R.listPath,R.ctx);if(Array.isArray(Q)&&I!=null){let F=Q.filter((Y,ke)=>ke!==I);R.ctx.$set(R.listPath,F),R.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:F,item:B,index:I}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:B,from:I,fromList:R?t.resolve(R.listPath,R.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][q&&I<$?$-1:$];if(Q){let F=Q.firstElementChild||Q;E.split(/\s+/).filter(Boolean).forEach(Y=>F.classList.add(Y)),F.addEventListener("animationend",()=>{E.split(/\s+/).filter(Boolean).forEach(Y=>F.classList.remove(Y))},{once:!0})}}),x.dragging=null},W=S=>{if(x.dragging&&de(x.dragging.type,f)&&(S.key==="Enter"||S.key===" ")){S.preventDefault();let B=e.querySelector(":focus");if(B){let I=(B.style?.display==="contents"&&B.firstElementChild||B).getBoundingClientRect(),$={preventDefault(){},stopPropagation(){},clientX:I.left+I.width/2,clientY:I.top+I.height+1,dataTransfer:null};U($)}}};e.addEventListener("dragover",L),e.addEventListener("dragenter",P),e.addEventListener("dragleave",V),e.addEventListener("drop",U),e.addEventListener("keydown",W),se(e,()=>{e.removeEventListener("dragover",L),e.removeEventListener("dragenter",P),e.removeEventListener("dragleave",V),e.removeEventListener("drop",U),e.removeEventListener("keydown",W)});let ie=n.$watch(D);se(e,ie),D()}})}function mt(t){Ie(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let i=t.findContext(e),n=e.getAttribute("drag-group"),o=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(X(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}x.selected.has(n)||x.selected.set(n,new Set);let l=x.selected.get(n),s=p=>{let f=e.getAttribute("drag"),m={item:f?t.evaluate(f,i):null,el:e,ctx:i};if(p.ctrlKey||p.metaKey){let d=[...l].find(a=>a.el===e);d?(l.delete(d),o.split(/\s+/).filter(Boolean).forEach(a=>e.classList.remove(a))):(l.add(m),o.split(/\s+/).filter(Boolean).forEach(a=>e.classList.add(a)))}else{for(let d of l)o.split(/\s+/).filter(Boolean).forEach(a=>d.el.classList.remove(a));l.clear(),l.add(m),o.split(/\s+/).filter(Boolean).forEach(d=>e.classList.add(d))}};e.addEventListener("click",s),se(e,()=>{e.removeEventListener("click",s);let p=[...l].find(f=>f.el===e);p&&l.delete(p)});let c=p=>{if(p.key==="Escape"){for(let f of l)o.split(/\s+/).filter(Boolean).forEach(u=>f.el.classList.remove(u));l.clear()}};window.addEventListener("keydown",c),se(e,()=>window.removeEventListener("keydown",c))}})}function bt(t,e={}){pt(t),ft(t),gt(t),mt(t)}function ht(){lt()}var vt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],Ve=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ce,At,Be,yt,Ge,xt,We,Et;function sn(t){return(t.getAttribute("type")||"text").toLowerCase()}function an(t,e){let r=[],i=new Set,n=t.getAttribute("validate");if(n){let l=n.split("|").map(s=>s.trim());for(let s of l){let[c,...p]=s.split(":"),f=ce[c];if(f){let u=f(t.value,...p,e);u!==!0&&u&&(r.push({rule:c,message:u}),i.add(c))}else{let u=t.value,m=null;switch(c){case"required":(u==null||String(u).trim()==="")&&(m="Required");break;case"email":u&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)&&(m="Invalid email");break;case"url":try{new URL(u)}catch{m="Invalid URL"}break;case"min":Number(u)<Number(p[0])&&(m=`Minimum value is ${p[0]}`);break;case"max":Number(u)>Number(p[0])&&(m=`Maximum value is ${p[0]}`);break;case"custom":if(p[0]&&ce[p[0]]){let d=ce[p[0]](u,e);d!==!0&&d&&(m=d)}break}m&&(r.push({rule:c,message:m}),i.add(c))}}}let o=t.validity;if(o&&!o.valid){for(let[l,s]of vt)if(o[l]){let c=s||sn(t);i.has(c)||(r.push({rule:c,message:t.validationMessage}),i.add(c))}}return r}function dn(t,e,r){let i=t.getAttribute(`error-${e}`);if(i)return i;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function cn(t,e){if(!t.length)return null;let i=[...t].sort((n,o)=>{let l=Ve.indexOf(n.rule),s=Ve.indexOf(o.rule);return(l===-1?999:l)-(s===-1?999:s)})[0];return{rule:i.rule,message:dn(e,i.rule,i.message)}}function ln(t,e,r,i,n){Ye(i);let o=document.querySelector(t);if(!o)return;let l=o.content.cloneNode(!0),s=document.createElement("div");s.style.display="contents",s.__errorTemplateFor=i;let c=Be({$error:e,$rule:r},n);s.__ctx=c,s.appendChild(l),o.parentNode.insertBefore(s,o.nextSibling),Ge(s)}function Ye(t){let e=document.querySelectorAll('div[style="display: contents;"]');for(let r of e)r.__errorTemplateFor===t&&r.remove()}function un(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!At(r,e)}catch{return!0}}function wt(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let i=e?e.getAttribute("validate-on"):null;return i?i.split(/\s+/):["input","focusout"]}function pn(t,e,r){let i=e.split("|").map(n=>n.trim());for(let n of i){let[o,...l]=n.split(":"),s=ce[o];if(s){let c=s(t,...l,r);if(c!==!0&&c)return c}else switch(o){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(l[0]))return`Minimum value is ${l[0]}`;break;case"max":if(Number(t)>Number(l[0]))return`Maximum value is ${l[0]}`;break;case"custom":if(l[0]&&ce[l[0]]){let c=ce[l[0]](t,r);if(c!==!0&&c)return c}break}}return null}function _t(t){ce=X(t,"validators")||{},At=t.evaluate,Be=t.createContext,yt=t.findContext,Ge=t.processTree,xt=X(t,"cloneTemplate")||(()=>null),We=X(t,"disposeChildren")||(()=>{}),Et=X(t,"warn")||console.warn;let e=X(t,"removeCoreDirective");typeof e=="function"?e("validate"):Et('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,i,n){let o=yt(r);if(r.tagName==="FORM"){let m=function(){o&&typeof o.$notify=="function"&&o.$notify();let y=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;y.nextNode();){let k=y.currentNode.__ctx;k&&k!==o&&typeof k.$notify=="function"&&k.$notify()}},d=function(){return r.querySelectorAll("input, textarea, select")},a=function(){let y={},E={},k={},A=!0,w=null,j=0,D=!1;for(let L of d())L.name&&(L.type==="checkbox"?E[L.name]=L.checked:L.type==="radio"?L.checked?E[L.name]=L.value:L.name in E||(E[L.name]=""):E[L.name]=L.value);for(let L of d()){if(!L.name)continue;let P=c.has(L.name),V=p.has(L.name);if(!un(L,o)){k[L.name]={valid:!0,dirty:V,touched:P,error:null,value:E[L.name]};continue}let U=an(L,E),W=cn(U,L),ie=!W,S=wt(L,r),B=S.includes("input"),R=S.includes("blur")||S.includes("focusout")||S.includes("submit"),I;!L.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?I=P||V:I=B&&V||R&&P,ie||(A=!1),!ie&&I&&(y[L.name]=W.message,j++,w||(w=W.message)),k[L.name]={valid:ie,dirty:V,touched:P,error:W?W.message:null,value:E[L.name]};let $=L.getAttribute("error-class")||s;if($){let q=$.split(/\s+/);!ie&&I?L.classList.add(...q):L.classList.remove(...q)}if(W&&I){let q=L.getAttribute(`error-${W.rule}`),ee=L.getAttribute("error"),G=(q&&q.startsWith("#")?q:null)||(ee&&ee.startsWith("#")?ee:null);G?ln(G,W.message,W.rule,L,o):Ye(L)}else Ye(L);let M=L.getAttribute("as");M&&o.$set(M,k[L.name])}f.size>0&&(D=!0),u.valid=A,u.errors=y,u.values=E,u.fields=k,u.firstError=w,u.errorCount=j,u.pending=D,o.$set("$form",{...u}),m(),g(r,A&&!D)},g=function(y,E){let k=y.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let A of k){if(A.hasAttribute("disabled")&&A.getAttribute("disabled")!==""){let w=A.getAttribute("disabled");if(w!=="disabled"&&w!=="true"&&w!=="false")continue}A.disabled=!E,A.__autoDisabled=!0}},b=function(y){if(!y.name)return;let E=wt(y,r),k=()=>{p.add(y.name),u.dirty=!0,a()},A=()=>{c.add(y.name),u.touched=!0,a()};if(E.includes("input"))y.addEventListener("input",k),ae(r,()=>y.removeEventListener("input",k));else{let w=()=>{p.add(y.name),u.dirty=!0,a()};y.addEventListener("input",w),ae(r,()=>y.removeEventListener("input",w))}if(E.includes("blur")||E.includes("focusout")){let w=()=>{A(),E.includes("blur")&&k()};y.addEventListener("focusout",w),ae(r,()=>y.removeEventListener("focusout",w))}else y.addEventListener("focusout",A),ae(r,()=>y.removeEventListener("focusout",A));E.includes("submit")&&(y.addEventListener("focusout",A),ae(r,()=>y.removeEventListener("focusout",A)))};r.setAttribute("novalidate","");let l=!1;for(let y=r;y;y=y.parentElement)if(y.__ctx){l=!0;break}l||(o=r.__ctx||Be({},null),r.__ctx=o);let s=r.getAttribute("error-class"),c=new Set,p=new Set,f=new Map,u={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u.dirty=!1,u.touched=!1,u.pending=!1,c.clear(),p.clear(),r.reset(),a()}};o.$set("$form",u);let v=r.hasAttribute("validate-on"),h=[...d()].some(y=>y.hasAttribute("validate-on"));if(!v&&!h){let y=k=>{let A=k.target;A&&A.name&&p.add(A.name),u.dirty=!0,a()};r.addEventListener("input",y),ae(r,()=>r.removeEventListener("input",y)),r.addEventListener("change",y),ae(r,()=>r.removeEventListener("change",y));let E=k=>{k.target&&k.target.name&&c.add(k.target.name),u.touched=!0,a()};r.addEventListener("focusout",E),ae(r,()=>r.removeEventListener("focusout",E))}else for(let y of d())b(y);let _=y=>{u.submitting=!0;for(let E of d())E.name&&c.add(E.name);u.touched=!0,a(),o.$set("$form",{...u}),m(),requestAnimationFrame(()=>{u.submitting=!1,o.$set("$form",{...u}),m()})};r.addEventListener("submit",_),ae(r,()=>r.removeEventListener("submit",_)),requestAnimationFrame(a);return}if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let l=r.getAttribute("error"),s=()=>{let c=pn(r.value,n,{});if(c&&l){let p=r.nextElementSibling?.__validationError?r.nextElementSibling:null;p||(p=document.createElement("div"),p.__validationError=!0,p.style.display="contents",r.parentNode.insertBefore(p,r.nextSibling));let f=xt(l);if(f){let u=Be({err:{message:c}},o);We(p),p.innerHTML="",p.__ctx=u,p.appendChild(f),Ge(p)}}else{let p=r.nextElementSibling?.__validationError?r.nextElementSibling:null;p&&(We(p),p.innerHTML="")}};r.addEventListener("input",s),ae(r,()=>r.removeEventListener("input",s))}}})}function Lt(t,e={}){_t(t)}function jt(){}var we=new Map,te=new Map;function kt(){for(let t of te.values())clearTimeout(t);te.clear();for(let t of we.values())t.remove();we.clear()}function Ct(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function fn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Fe=8;function gn(t,e,r){let i=e.getBoundingClientRect(),n=t.getBoundingClientRect(),o=window.innerWidth,l=window.innerHeight,s,c;switch(r){case"bottom":s=i.bottom+Fe,c=i.left+(i.width-n.width)/2;break;case"left":s=i.top+(i.height-n.height)/2,c=i.left-n.width-Fe;break;case"right":s=i.top+(i.height-n.height)/2,c=i.right+Fe;break;default:s=i.top-n.height-Fe,c=i.left+(i.width-n.width)/2;break}c<4&&(c=4),c+n.width>o-4&&(c=o-n.width-4),s<4&&(s=4),s+n.height>l-4&&(s=l-n.height-4),t.style.top=`${s}px`,t.style.left=`${c}px`}var mn=0;function bn(t,e,r){document.body.appendChild(e),gn(e,t,r),e.setAttribute("aria-hidden","false")}function hn(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function St(t){t.directive("tooltip",{priority:20,init(e,r,i){Ct();let n=i;if(!n){console.warn("[tooltip] attribute value (tooltip text) is required.");return}let o=e.getAttribute("tooltip-position")||"top",l=parseInt(e.getAttribute("tooltip-delay"),10)||300,s=e.getAttribute("tooltip-disabled"),c=s?t.findContext(e):null,p=`nojs-tooltip-${++mn}`,f=document.createElement("div");f.className="nojs-tooltip",f.setAttribute("role","tooltip"),f.setAttribute("id",p),f.setAttribute("aria-hidden","true"),f.textContent=n,e.setAttribute("aria-describedby",p),we.set(e,f);let u=()=>{if(s&&c&&t.evaluate(s,c))return;te.has(e)&&clearTimeout(te.get(e));let h=setTimeout(()=>{te.delete(e),!(s&&c&&t.evaluate(s,c))&&bn(e,f,o)},l);te.set(e,h)},m=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),hn(e,f)},d=()=>u(),a=()=>m(),g=()=>u(),b=()=>m(),v=h=>{h.key==="Escape"&&f.getAttribute("aria-hidden")==="false"&&m()};e.addEventListener("mouseenter",d),e.addEventListener("mouseleave",a),e.addEventListener("focusin",g),e.addEventListener("focusout",b),e.addEventListener("keydown",v),fn(e,()=>{e.removeEventListener("mouseenter",d),e.removeEventListener("mouseleave",a),e.removeEventListener("focusin",g),e.removeEventListener("focusout",b),e.removeEventListener("keydown",v),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),f.remove(),we.delete(e)})}})}function Tt(t,e={}){St(t)}function Dt(){kt()}var K=new Map;function It(){K.clear()}function $e(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function Ue(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ge=8;function Ke(t,e,r){let i=e.getBoundingClientRect(),n=t.getBoundingClientRect(),o=window.innerWidth,l=window.innerHeight,s,c;switch(r){case"top":s=i.top-n.height-ge,c=i.left+(i.width-n.width)/2;break;case"left":s=i.top+(i.height-n.height)/2,c=i.left-n.width-ge;break;case"right":s=i.top+(i.height-n.height)/2,c=i.right+ge;break;default:s=i.bottom+ge,c=i.left+(i.width-n.width)/2;break}r==="bottom"&&s+n.height>l&&(s=i.top-n.height-ge),r==="top"&&s<0&&(s=i.bottom+ge),c<4&&(c=4),c+n.width>o-4&&(c=o-n.width-4),s<4&&(s=4),s+n.height>l-4&&(s=l-n.height-4),t.style.top=`${s}px`,t.style.left=`${c}px`}function Bt(t){t.directive("popover",{priority:20,init(r,i,n){$e();let o=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",o),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let l=r.getAttribute("popover-position")||"bottom";if(!K.has(o))K.set(o,{popoverEl:r,triggerEls:new Set,position:l,open:!1});else{let c=K.get(o);c.popoverEl=r,c.position=l}let s=c=>{let p=K.get(o);if(!p)return;let f=c.newState==="open";p.open=f;for(let u of p.triggerEls)u.setAttribute("aria-expanded",String(f))};r.addEventListener("toggle",s),Ue(r,()=>{r.removeEventListener("toggle",s),K.delete(o)})}}),t.directive("popover-trigger",{priority:20,init(r,i,n){$e();let o=n;if(!o){let p=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(p&&(o=p.getAttribute("data-popover-id")),!o){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",o),K.has(o)||K.set(o,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),K.get(o).triggerEls.add(r);let l=c=>{let p=K.get(o);if(!p||!p.popoverEl){console.warn(`[popover-trigger] no popover found with id "${o}".`);return}p.popoverEl.togglePopover(),requestAnimationFrame(()=>{p.popoverEl.matches(":popover-open")&&Ke(p.popoverEl,r,p.position)})};r.addEventListener("click",l);let s=c=>{let p=K.get(o);c.key==="Escape"&&p?.open&&(p.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),Ue(r,()=>{r.removeEventListener("click",l),document.removeEventListener("keydown",s);let c=K.get(o);c&&c.triggerEls.delete(r)})}}),t.directive("popover-dismiss",{priority:20,init(r){$e();let i=()=>{let n=r.closest(".nojs-popover");n&&n.hidePopover()};r.addEventListener("click",i),Ue(r,()=>r.removeEventListener("click",i))}});let e=(r,i)=>e.open(r,i);e.open=(r,i)=>{let n=K.get(r);if(!n||!n.popoverEl)return!1;try{n.popoverEl.showPopover()}catch{return!1}let o=i||[...n.triggerEls][0];return o&&requestAnimationFrame(()=>Ke(n.popoverEl,o,n.position)),!0},e.close=r=>{let i=K.get(r);if(!i||!i.popoverEl)return!1;try{i.popoverEl.hidePopover()}catch{}return!0},e.toggle=(r,i)=>{let n=K.get(r);if(!n||!n.popoverEl)return!1;n.popoverEl.togglePopover();let o=i||[...n.triggerEls][0];return o&&n.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>Ke(n.popoverEl,o,n.position)),!0},t.popover=e}function Ft(t,e={}){Bt(t)}function $t(){It()}var J=[],ne=new Map,vn=1e4;function Rt(){return vn+J.length}function Ht(){J.length=0,ne.clear()}function me(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function yn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var qt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',Xe=new WeakMap;function xn(t){let e=r=>{if(r.key!=="Tab")return;let i=[...t.querySelectorAll(qt)].filter(l=>l.offsetParent!==null);if(i.length===0){r.preventDefault();return}let n=i[0],o=i[i.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),o.focus()):document.activeElement===o&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),Xe.set(t,e)}function Pt(t){let e=Xe.get(t);e&&(t.removeEventListener("keydown",e),Xe.delete(t))}var Ae=new WeakMap;function Mt(t){t.directive("modal",{priority:10,init(r,i,n){me();let o=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${o}`,r.setAttribute("data-modal-id",o),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let l=r.querySelector("h1, h2, h3, h4, h5, h6");l&&(l.id||(l.id=`nojs-modal-heading-${o}`),r.setAttribute("aria-labelledby",l.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let c=r.getAttribute("modal-class"),p=r.getAttribute("modal-escape"),f=m=>{m.target===r&&s!=="false"&&p!=="false"&&be(r,o)};r.addEventListener("click",f),ne.set(o,r);let u=m=>{if(m.newState==="open"){if(r.style.zIndex=String(Rt()),c&&c.split(/\s+/).filter(Boolean).forEach(d=>r.classList.add(d)),requestAnimationFrame(()=>{let d=r.querySelector(qt);d?d.focus():r.focus()}),xn(r),p!=="false"){let d=a=>{a.key==="Escape"&&(a.stopPropagation(),be(r,o))};r.addEventListener("keydown",d),Ae.set(r,d)}}else if(m.newState==="closed"){c&&c.split(/\s+/).filter(Boolean).forEach(g=>r.classList.remove(g)),Pt(r);let d=Ae.get(r);d&&(r.removeEventListener("keydown",d),Ae.delete(r));let a=J.findIndex(g=>g.id===o);if(a!==-1){let g=J[a];J.splice(a,1),g.triggerEl&&requestAnimationFrame(()=>{g.triggerEl.focus()})}}};r.addEventListener("toggle",u),yn(r,()=>{r.removeEventListener("click",f),r.removeEventListener("toggle",u),Pt(r);let m=Ae.get(r);m&&(r.removeEventListener("keydown",m),Ae.delete(r)),ne.delete(o);let d=J.findIndex(a=>a.id===o);d!==-1&&J.splice(d,1)})}});let e=r=>e.open(r);e.open=r=>{let i=ne.get(r);if(!i)return!1;J.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},e.close=r=>{let i=ne.get(r);return i?(be(i,r),!0):!1},e.closeAll=()=>{for(let r=J.length-1;r>=0;r--)be(J[r].el,J[r].id)},t.modal=e}function be(t,e){try{t.hidePopover()}catch{}}function En(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function zt(t){t.directive("modal-open",{priority:10,init(e,r,i){me();let n=i;if(!n){let u=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(u&&(n=u.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let o=()=>{let f=ne.get(n)||document.querySelector(`[data-modal-id="${n}"]`);if(!f){console.warn(`[modal-open] modal "${n}" not found`);return}J.push({id:n,el:f,triggerEl:e}),e.setAttribute("aria-expanded","true"),f.id&&e.setAttribute("aria-controls",f.id);try{f.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`)}},l=()=>{e.setAttribute("aria-expanded","false")},s=null,c=null;requestAnimationFrame(()=>{let f=ne.get(n);f&&(c=f,s=u=>{u.newState==="closed"&&e.setAttribute("aria-expanded","false")},f.addEventListener("toggle",s))}),e.addEventListener("click",o),En(e,()=>{e.removeEventListener("click",o),c&&s&&c.removeEventListener("toggle",s)})}})}function wn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ot(t){t.directive("modal-close",{priority:10,init(e,r,i){me();let n=()=>{let o,l;if(i){if(l=i,o=ne.get(l),!o){console.warn(`[modal-close] modal "${l}" not found`);return}}else{if(o=e.closest("[modal]"),!o){console.warn("[modal-close] no parent modal found");return}l=o.getAttribute("modal")}be(o,l)};e.addEventListener("click",n),wn(e,()=>{e.removeEventListener("click",n)})}})}function Vt(t,e={}){Mt(t),zt(t),Ot(t)}function Wt(){Ht()}var _e={openMenus:new Map};function Gt(){_e.openMenus.clear()}function he(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}function An(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Yt(t,e,r){let i=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let o=e.getBoundingClientRect(),l=t.getBoundingClientRect(),s=window.innerHeight,c=window.innerWidth,p,f;switch(i){case"top":p=o.top-l.height,f=o.left;break;case"left":p=o.top,f=o.left-l.width;break;case"right":p=o.top,f=o.right;break;default:p=o.bottom,f=o.left}i==="bottom"||i==="top"?n==="end"&&(f=o.right-l.width):n==="end"&&(p=o.bottom-l.height),i==="bottom"&&p+l.height>s&&o.top-l.height>0?p=o.top-l.height:i==="top"&&p<0&&o.bottom+l.height<=s&&(p=o.bottom),f<4&&(f=4),f+l.width>c-4&&(f=c-l.width-4),t.style.top=`${p}px`,t.style.left=`${f}px`}function Qe(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Ze(t){let e=Qe(t);e.length&&e[0].focus()}function Ut(t){let e=Qe(t);e.length&&e[e.length-1].focus()}function Kt(t){t.directive("dropdown",{priority:15,init(r){he()}}),t.directive("dropdown-toggle",{priority:15,init(r){he();let i=r.closest("[dropdown]");if(!i)return;let n=i.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Math.random().toString(36).slice(2,7)}`),r.setAttribute("aria-controls",n.id);function o(){n.setAttribute("data-open",""),n.showPopover&&n.showPopover(),r.setAttribute("aria-expanded","true"),Yt(n,r,i),_e.openMenus.set(n,{toggle:r,wrapper:i})}function l(){n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),_e.openMenus.delete(n)}function s(){return r.getAttribute("aria-expanded")==="true"}let c=g=>{g.newState==="closed"&&s()&&l()};n.addEventListener("toggle",c);let p=g=>{g.preventDefault(),g.stopPropagation(),s()?l():o()};r.addEventListener("click",p);let f=g=>{s()&&!i.contains(g.target)&&l()};document.addEventListener("click",f,!0);let u=g=>{g.key==="Escape"&&s()&&(l(),r.focus())};document.addEventListener("keydown",u);let m=g=>{switch(g.key){case"Enter":case" ":g.preventDefault(),o(),Ze(n);break;case"ArrowDown":g.preventDefault(),o(),Ze(n);break;case"ArrowUp":g.preventDefault(),o(),Ut(n);break}};r.addEventListener("keydown",m);let d=g=>{if(!(!s()||Qe(n).find(h=>h===document.activeElement)))switch(g.key){case"ArrowDown":g.preventDefault(),Ze(n);break;case"ArrowUp":g.preventDefault(),Ut(n);break}};n.addEventListener("keydown",d);let a=()=>{s()&&Yt(n,r,i)};window.addEventListener("scroll",a,!0),window.addEventListener("resize",a),An(r,()=>{r.removeEventListener("click",p),r.removeEventListener("keydown",m),n.removeEventListener("keydown",d),n.removeEventListener("toggle",c),document.removeEventListener("click",f,!0),document.removeEventListener("keydown",u),window.removeEventListener("scroll",a,!0),window.removeEventListener("resize",a),_e.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){he(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let i=document.getElementById(r);if(!i)return!1;let o=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!o||o.getAttribute("aria-expanded")==="true"?!1:(o.click(),!0)},e.close=r=>{let i=document.getElementById(r);if(!i)return!1;let o=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!o||o.getAttribute("aria-expanded")!=="true"?!1:(o.click(),!0)},t.dropdown=e}function Xt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function _n(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Zt(t){t.directive("dropdown-item",{priority:15,init(e){he();let r=e.closest("[dropdown-menu]"),i=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=l=>{if(!r)return;let s=_n(r),c=s.indexOf(e);switch(l.key){case"ArrowDown":{l.preventDefault(),(c+1<s.length?s[c+1]:s[0]).focus();break}case"ArrowUp":{l.preventDefault(),(c-1>=0?s[c-1]:s[s.length-1]).focus();break}case"Home":{l.preventDefault(),s.length&&s[0].focus();break}case"End":{l.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{l.preventDefault(),e.click();break}case"Escape":{if(l.preventDefault(),r)try{r.hidePopover()}catch{}if(i){let p=i.querySelector("[dropdown-toggle]");p&&p.focus()}break}case"Tab":{if(r)try{r.hidePopover()}catch{}break}}};e.addEventListener("keydown",n),Xt(e,()=>e.removeEventListener("keydown",n));let o=()=>{if(r)try{r.hidePopover()}catch{}if(i){let l=i.querySelector("[dropdown-toggle]");l&&l.focus()}};e.addEventListener("click",o),Xt(e,()=>e.removeEventListener("click",o))}})}function Qt(t,e={}){Kt(t),Zt(t)}function Nt(){Gt()}var oe=new Map,ve=new Set,Jt=0;function er(){return++Jt}function tr(){for(let t of ve)clearTimeout(t);ve.clear();for(let t of oe.values())t.remove();oe.clear(),Jt=0}function rr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ln=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Je(){return oe.size>0?oe.values().next().value:jn("top-right")}function jn(t){if(oe.has(t))return oe.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),oe.set(t,e),e}function kn(t){return t.startsWith("top")}function et(t,e,r,i,n){let o=er(),l=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",o),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let c=document.createElement("span");if(c.textContent=e,s.appendChild(c),n){let p=document.createElement("button");p.type="button",p.classList.add("nojs-toast-dismiss"),p.setAttribute("aria-label","Dismiss"),p.textContent="\xD7",p.addEventListener("click",()=>Re(s)),s.appendChild(p)}if(kn(l)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),i>0){let p=setTimeout(()=>{ve.delete(p),Re(s)},i);ve.add(p),s._toastTimerId=p}return s}function Re(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),ve.delete(t._toastTimerId)),t.remove())}function nr(t){rr(),t.directive("toast-container",{priority:10,init(r,i,n){let o=n&&Ln.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",o),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),oe.set(o,r),Ne(r,()=>{oe.get(o)===r&&oe.delete(o)})}}),t.directive("toast",{priority:10,init(r,i,n){if(!n)return;let o=r.getAttribute("toast-type")||"info",l=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let d=()=>{let a=Je();et(a,n,o,l,s)};r.addEventListener("click",d),Ne(r,()=>r.removeEventListener("click",d));return}let p=t.findContext(r),f;function u(){let d=t.evaluate(n,p);if(d&&d!==f){let a=typeof d=="string"?d:String(d),g=Je();et(g,a,o,l,s)}f=d}let m=p.$watch(u);Ne(r,m)}});let e=(r,i="info",n=3e3)=>{if(typeof document>"u")return;let o=!0,l=Je();return et(l,String(r),i,n,o)};e.dismiss=r=>{let i=document.querySelector(`[data-toast-id="${r}"]`);i&&Re(i)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Re(r))},t.toast=e}function or(t,e={}){nr(t)}function ir(){tr()}var le={containers:new Map};function sr(){le.containers.clear()}function ar(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function Cn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Sn=0;function dr(t){return`${t}-${++Sn}`}function tt(t,e){let r=le.containers.get(t);if(!r)return;let{tabs:i,panels:n}=r;if(!(e<0||e>=i.length)&&i[e].getAttribute("aria-disabled")!=="true"){for(let o=0;o<i.length;o++)i[o].setAttribute("aria-selected","false"),i[o].setAttribute("tabindex","-1"),n[o].setAttribute("aria-hidden","true"),n[o].inert=!0;i[e].setAttribute("aria-selected","true"),i[e].setAttribute("tabindex","0"),n[e].setAttribute("aria-hidden","false"),n[e].inert=!1,r.activeIndex=e}}function Le(t,e,r){let i=t.length,n=e;for(let o=0;o<i;o++)if(n=(n+r+i)%i,t[n].getAttribute("aria-disabled")!=="true")return n;return e}function cr(t){t.directive("tabs",{priority:10,init(e,r,i){ar();let n=[],o=[];for(let a of Array.from(e.children))a.hasAttribute("tab")?n.push(a):a.hasAttribute("panel")&&o.push(a);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==o.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+o.length+" panels.");let l=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",l),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let c=Math.min(n.length,o.length);for(let a=0;a<c;a++){let g=n[a],b=o[a],v=g.id||dr("nojs-tab"),h=b.id||dr("nojs-panel");g.id=v,b.id=h,g.setAttribute("role","tab"),g.setAttribute("aria-selected","false"),g.setAttribute("aria-controls",h),g.setAttribute("tabindex","-1"),g.classList.add("nojs-tab"),b.setAttribute("role","tabpanel"),b.setAttribute("aria-labelledby",v),b.setAttribute("tabindex","0"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel"),s.appendChild(g)}let p=o[0];p?e.insertBefore(s,p):e.appendChild(s),le.containers.set(e,{tabs:n.slice(0,c),panels:o.slice(0,c),activeIndex:-1});let f=t.findContext(e);for(let a=0;a<c;a++){let g=n[a].getAttribute("tab-disabled");g&&t.evaluate(g,f)&&n[a].setAttribute("aria-disabled","true")}let u=0;if(i&&i.trim()!==""){let a=parseInt(i,10);!isNaN(a)&&a>=0&&a<c&&(u=a)}n[u]?.getAttribute("aria-disabled")==="true"&&(u=Le(n.slice(0,c),u,1)),tt(e,u);let m=a=>{let g=le.containers.get(e);if(!g)return;let b=a.target;if(b.getAttribute("role")!=="tab")return;let{tabs:v}=g,h=v.indexOf(b);if(h===-1)return;let _=-1;switch(a.key){case"ArrowRight":case"ArrowDown":_=Le(v,h,1);break;case"ArrowLeft":case"ArrowUp":_=Le(v,h,-1);break;case"Home":_=Le(v,v.length-1,1);break;case"End":_=Le(v,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==h&&(a.preventDefault(),tt(e,_),v[_].focus())};s.addEventListener("keydown",m);let d=a=>{let g=a.target.closest("[role='tab']");if(!g)return;let b=le.containers.get(e);if(!b)return;let v=b.tabs.indexOf(g);v!==-1&&(tt(e,v),g.focus())};s.addEventListener("click",d),Cn(e,()=>{s.removeEventListener("keydown",m),s.removeEventListener("click",d),le.containers.delete(e)})}})}function lr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function ur(t){t.directive("panel",{priority:11,init(){}})}function pr(t,e={}){cr(t),lr(t),ur(t)}function fr(){sr()}var H={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function gr(){H.branches.clear(),H.selectedItem=null,H.typeahead="",H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null)}function ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function rt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function mr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)e.push(i);return e}function br(t){return t.closest('[role="tree"]')}function Tn(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(e.textContent||"").trim().toLowerCase()}function hr(t){t.directive("tree",{priority:15,init(e){ye(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function vr(t){t.directive("branch",{priority:16,init(e,r,i){ye();let n=i==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let o=br(e);if(o){let d=o.querySelector('[role="treeitem"]');e.setAttribute("tabindex",d===e?"0":"-1")}else e.setAttribute("tabindex","0");let l=!1;queueMicrotask(()=>{if(l)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(H.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):H.branches.set(e,{expanded:n,subtreeEl:null})});function s(d){let a=H.selectedItem;a&&a!==d&&(a.classList.remove("nojs-branch-selected"),a.setAttribute("aria-selected","false")),d.classList.add("nojs-branch-selected"),d.setAttribute("aria-selected","true"),H.selectedItem=d}function c(d){let a=H.branches.get(d);!a||!a.subtreeEl||(a.expanded=!a.expanded,d.setAttribute("aria-expanded",String(a.expanded)),a.subtreeEl.setAttribute("aria-hidden",String(!a.expanded)))}function p(d){let a=H.branches.get(d);!a||!a.subtreeEl||a.expanded||(a.expanded=!0,d.setAttribute("aria-expanded","true"),a.subtreeEl.setAttribute("aria-hidden","false"))}function f(d){let a=H.branches.get(d);!a||!a.subtreeEl||!a.expanded||(a.expanded=!1,d.setAttribute("aria-expanded","false"),a.subtreeEl.setAttribute("aria-hidden","true"))}let u=d=>{d.target!==e&&!e.contains(d.target)||(d.stopPropagation(),s(e),c(e))};e.addEventListener("click",u),rt(e,()=>e.removeEventListener("click",u));let m=d=>{let a=br(e);if(!a)return;let g=mr(a),b=g.indexOf(e),v=H.branches.get(e),h=v&&v.subtreeEl;switch(d.key){case"ArrowRight":if(d.preventDefault(),h&&!v.expanded)p(e);else if(h&&v.expanded){let _=v.subtreeEl.querySelector('[role="treeitem"]');_&&ue(_,g)}break;case"ArrowLeft":if(d.preventDefault(),h&&v.expanded)f(e);else{let _=e.parentElement?.closest('[role="treeitem"]');_&&ue(_,mr(a))}break;case"ArrowDown":d.preventDefault(),b<g.length-1&&ue(g[b+1],g);break;case"ArrowUp":d.preventDefault(),b>0&&ue(g[b-1],g);break;case"Enter":case" ":d.preventDefault(),s(e),c(e);break;case"Home":d.preventDefault(),g.length>0&&ue(g[0],g);break;case"End":d.preventDefault(),g.length>0&&ue(g[g.length-1],g);break;default:if(d.key.length===1&&!d.ctrlKey&&!d.altKey&&!d.metaKey){d.preventDefault(),H.typeahead+=d.key.toLowerCase(),H.typeaheadTimer&&clearTimeout(H.typeaheadTimer),H.typeaheadTimer=setTimeout(()=>{H.typeahead="",H.typeaheadTimer=null},500);let _=b+1;for(let y=0;y<g.length;y++){let E=(_+y)%g.length;if(Tn(g[E]).startsWith(H.typeahead)){ue(g[E],g);break}}}break}};e.addEventListener("keydown",m),rt(e,()=>e.removeEventListener("keydown",m)),rt(e,()=>{l=!0,H.branches.delete(e),H.selectedItem===e&&(H.selectedItem=null)})}})}function ue(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function yr(t){t.directive("subtree",{priority:16,init(e){ye(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let i of e.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let i=H.branches.get(r);i?(e.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function xr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function nt(t){return t.closest('[role="treeitem"]')}function Dn(t){return t.closest('[role="tree"]')}function In(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Bn(t){return In(t).indexOf(t)}function Fn(t,e,r){let i=t.getBoundingClientRect(),n=e-i.top,o=i.height;return r==="reparent"?"on":r==="reorder"?n<o/2?"before":"after":n<o*.25?"before":n>o*.75?"after":"on"}function Er(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var T={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function xe(){T.indicator&&(T.indicator.remove(),T.indicator=null)}function je(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function $n(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function Rn(t,e){xe();let r=$n(),i=t.getBoundingClientRect(),n=Dn(t);if(!n)return;let o=n.getBoundingClientRect();r.style.position="absolute",r.style.left=i.left-o.left+"px",r.style.width=i.width+"px",e==="before"?r.style.top=i.top-o.top-1+"px":r.style.top=i.bottom-o.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),T.indicator=r}function wr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,i){if(ye(),i!=="reparent"&&i!=="reorder"&&i!=="both")return;let n=0,o=m=>{let d=nt(m.target);if(d&&e.contains(d)){if(d.hasAttribute("tree-drag-disabled")){m.preventDefault();return}T.dragging={el:d,treeRoot:e},m.dataTransfer&&(m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain","")),d.classList.add("nojs-dragging"),d.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:d}}))}},l=m=>{if(!T.dragging||T.dragging.treeRoot!==e)return;let d=nt(m.target);if(!d||!e.contains(d)||d===T.dragging.el||Er(d,T.dragging.el))return;m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let a=Fn(d,m.clientY,i);(T.currentTarget!==d||T.currentPosition!==a)&&(je(e),xe(),T.currentTarget=d,T.currentPosition=a,a==="on"?d.classList.add("nojs-tree-drag-over"):Rn(d,a))},s=m=>{T.dragging&&T.dragging.treeRoot===e&&n++},c=m=>{T.dragging&&(n--,n<=0&&(n=0,je(e),xe(),T.currentTarget=null,T.currentPosition=null))},p=m=>{if(m.preventDefault(),m.stopPropagation(),n=0,!T.dragging||T.dragging.treeRoot!==e)return;let d=T.dragging.el,a=T.currentTarget,g=T.currentPosition;if(je(e),xe(),!a||!g){T.dragging=null,T.currentTarget=null,T.currentPosition=null;return}if(a===d||Er(a,d)){T.dragging=null,T.currentTarget=null,T.currentPosition=null;return}if(g==="on"){let b=a.querySelector(':scope > [role="group"]');b||(b=a.nextElementSibling?.matches?.('[role="group"]')?a.nextElementSibling:null),b?b.setAttribute("aria-hidden","false"):(b=document.createElement("ul"),b.setAttribute("role","group"),b.setAttribute("subtree",""),b.classList.add("nojs-subtree","nojs-tree"),b.setAttribute("aria-hidden","false"),a.appendChild(b));let v=H.branches.get(a);v&&(v.expanded=!0,v.subtreeEl=b,a.setAttribute("aria-expanded","true")),b.appendChild(d),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:d,newParent:a}}))}else{let b=a.parentElement;if(!b){T.dragging=null,T.currentTarget=null,T.currentPosition=null;return}if(g==="before")b.insertBefore(d,a);else{let h=a.nextElementSibling,_=h?.matches?.('[role="group"]')?h.nextElementSibling:h;_?b.insertBefore(d,_):b.appendChild(d)}let v=Bn(d);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:d,newIndex:v}}))}T.dragging=null,T.currentTarget=null,T.currentPosition=null},f=m=>{let d=nt(m.target);d&&d.classList.remove("nojs-dragging"),je(e),xe(),n=0,T.dragging&&T.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:T.dragging.el}})),T.dragging=null,T.currentTarget=null,T.currentPosition=null};e.addEventListener("dragstart",o),e.addEventListener("dragover",l),e.addEventListener("dragenter",s),e.addEventListener("dragleave",c),e.addEventListener("drop",p),e.addEventListener("dragend",f),xr(e,()=>{e.removeEventListener("dragstart",o),e.removeEventListener("dragover",l),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",c),e.removeEventListener("drop",p),e.removeEventListener("dragend",f),je(e),xe()}),Hn(e);let u=new MutationObserver(m=>{for(let d of m)for(let a of d.addedNodes){if(a.nodeType!==1)continue;a.getAttribute("role")==="treeitem"&&ot(a);let g=a.querySelectorAll?.('[role="treeitem"]');if(g)for(let b of g)ot(b)}});u.observe(e,{childList:!0,subtree:!0}),xr(e,()=>u.disconnect())}})}function ot(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function Hn(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)ot(r)}function Ar(t,e={}){hr(t),vr(t),yr(t),wr(t)}function _r(){gr()}var He=new Map;function Lr(){He.clear()}function Pe(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function jr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function kr(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Cr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Pn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Sr(t){t.directive("stepper",{priority:14,init(e,r,i){Pe();let n=t.findContext(e),o=Array.from(e.querySelectorAll("[step]"));if(!o.length){console.warn("[stepper] No [step] children found.");return}let l=i&&parseInt(i,10)||0,s=e.getAttribute("stepper-mode")||"linear",c=e.getAttribute("stepper-indicator")!=="false",p=e.getAttribute("stepper-nav")!=="false",f=e.getAttribute("aria-label")||"Stepper",u=Math.max(0,Math.min(l,o.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",f),e.classList.add("nojs-stepper");let m=null,d=[];c&&(m=document.createElement("div"),m.className="nojs-stepper-indicator",m.setAttribute("role","tablist"),m.setAttribute("aria-label","Progress"),o.forEach((w,j)=>{if(j>0){let U=document.createElement("div");U.className="nojs-stepper-separator",U.setAttribute("aria-hidden","true"),m.appendChild(U)}let D=document.createElement("button");D.type="button",D.className="nojs-stepper-indicator-item",D.setAttribute("role","tab"),D.setAttribute("aria-selected",j===u?"true":"false");let L=w.getAttribute("step-label")||`Step ${j+1}`,P=document.createElement("span");P.textContent=L,D.appendChild(P),D.setAttribute("aria-label",L);let V=`nojs-stepper-tab-${qn++}`;D.id=V,s==="free"?(D.setAttribute("data-clickable",""),D.addEventListener("click",()=>E(j))):D.setAttribute("tabindex","-1"),m.appendChild(D),d.push(D)}),m.addEventListener("keydown",w=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(w.key))return;w.preventDefault();let j=u;w.key==="ArrowRight"?j=Math.min(u+1,o.length-1):w.key==="ArrowLeft"?j=Math.max(u-1,0):w.key==="Home"?j=0:w.key==="End"&&(j=o.length-1),s==="free"&&E(j),d[j]?.focus()}),e.insertBefore(m,e.firstChild));let a=null,g=null,b=null;p&&(a=document.createElement("div"),a.className="nojs-stepper-nav",a.setAttribute("aria-hidden","true"),g=document.createElement("button"),g.type="button",g.className="nojs-stepper-prev",g.textContent="Previous",g.addEventListener("click",()=>y()),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-next",b.textContent="Next",b.addEventListener("click",()=>_()),a.appendChild(g),a.appendChild(b),e.appendChild(a));function v(w){let j=o[w];if(!j)return!0;if(!jr(j,t.findContext)){let P=j.querySelector("form[validate]");return P&&(kr(P),d[w]&&d[w].classList.add("nojs-step-invalid"),Cr(e,j,P)),!1}d[w]&&d[w].classList.remove("nojs-step-invalid");let D=j.querySelectorAll("[required]");for(let P of D)if(typeof P.checkValidity=="function"&&!P.checkValidity())return P.reportValidity(),!1;let L=j.getAttribute("step-validate");if(L)try{if(!t.evaluate(L,n))return!1}catch(P){return console.warn(`[stepper] step-validate error: ${P.message}`),!1}return!0}function h(){o.forEach((w,j)=>{let D=j===u;w.setAttribute("aria-hidden",D?"false":"true"),D?(w.removeAttribute("inert"),w.setAttribute("aria-current","step")):(w.setAttribute("inert",""),w.removeAttribute("aria-current"))}),d.length&&d.forEach((w,j)=>{w.setAttribute("aria-selected",j===u?"true":"false"),j<u?w.setAttribute("data-completed",""):w.removeAttribute("data-completed"),w.setAttribute("tabindex",j===u?"0":"-1");let D=o[j];D.id&&(w.setAttribute("aria-controls",D.id),D.setAttribute("aria-labelledby",w.id))}),g&&(g.disabled=u===0),b&&(b.textContent=u===o.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:u,total:o.length}}))}function _(){return u>=o.length-1||s==="linear"&&!v(u)?!1:(u++,h(),A(),!0)}function y(){return u<=0?!1:(u--,h(),A(),!0)}function E(w){if(w<0||w>=o.length||w===u)return!1;if(s==="linear"&&w>u){for(let j=u;j<w;j++)if(!v(j))return!1}return u=w,h(),A(),!0}let k={get current(){return u},get total(){return o.length},next:_,prev:y,goTo:E,get isFirst(){return u===0},get isLast(){return u===o.length-1}};function A(){n.$stepper=k}A(),He.set(e,{current:u,steps:o,mode:s,indicatorEl:m,navEl:a}),h(),Pn(e,()=>{He.delete(e),m&&m.parentNode&&m.remove(),a&&a.parentNode&&a.remove(),delete n.$stepper})}})}var qn=0;var Mn=0;function Tr(t){t.directive("step",{priority:13,init(e,r,i){Pe(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Mn++}`),e.setAttribute("tabindex","0")}})}function Dr(t,e={}){Tr(t),Sr(t)}function Ir(){Lr()}function Br(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Fr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $r(t){t.directive("skeleton",{priority:10,init(e,r,i){Br();let n=t.findContext(e),o=e.getAttribute("skeleton-type")||"text",l=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),c=[];function p(b){f();for(let v=0;v<b;v++){let h=document.createElement("div");h.className="nojs-skeleton-line",e.appendChild(h),c.push(h)}}function f(){for(let b of c)b.parentNode===e&&e.removeChild(b);c=[]}function u(){if(e.classList.add("nojs-skeleton"),o==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(o==="circle"||o==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");e.style.width=b,e.style.height=b}if(l){let b=parseInt(l,10);b>0&&p(b)}e.setAttribute("aria-busy","true")}function m(){e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),f(),s&&(o==="circle"||o==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let b=!1,v=()=>{b||(b=!0,e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",v))};e.addEventListener("transitionend",v),setTimeout(v,500)}let d=!1;function a(){let b=!!t.evaluate(i,n);b&&!d?(d=!0,u()):!b&&d&&(d=!1,m())}a();let g=n.$watch(a);Fr(e,g),Fr(e,()=>{d&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),f(),s&&(o==="circle"||o==="rect")&&(e.style.width="",e.style.height=""))})}})}function Rr(t,e={}){$r(t)}var pe=new Map,O=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Hr(){pe.clear(),O.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function qe(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function zn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Pr(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){return e==="horizontal"?t.offsetWidth:t.offsetHeight}function On(t,e){let i=(pe.get(t)?.gutters||[]).reduce((n,o)=>n+Z(o,e),0);return Z(t,e)-i}function Me(t,e){let r=O.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function ze(t,e,r,i){let n=Z(e,i),o=Z(r,i),l=O.get(e),s=O.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",l?.min||0),t.setAttribute("aria-valuemax",Math.round(n+o-(s?.min||0)))}function it(t){let e=t.getAttribute("split-persist");if(!e)return;let r=pe.get(t);if(!r)return;let i=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(i))}catch{}}function Vn(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let i=JSON.parse(r),n=pe.get(t);return!n||i.length!==n.panes.length?!1:(i.forEach((o,l)=>{o&&(n.panes[l].style.flexBasis=o,n.panes[l].style.flexGrow="0")}),!0)}catch{return!1}}function Wn(t,e,r,i,n){let o=document.createElement("div");o.className="nojs-gutter",o.setAttribute("role","separator"),o.setAttribute("tabindex","0"),o.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),o.setAttribute("aria-label","Resize"),n!==6&&o.style.setProperty("--nojs-gutter-size",`${n}px`);let l=d=>{if(d.button!==0)return;d.preventDefault();let a=On(t,e);C.active=!0,C.splitEl=t,C.gutterEl=o,C.prevPane=r,C.nextPane=i,C.direction=e,C.startPos=d[Pr(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(i,e),C.containerSize=a,document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",o.setPointerCapture(d.pointerId)},s=d=>{if(!C.active||C.gutterEl!==o)return;let a=d[Pr(C.direction)]-C.startPos,g=Me(C.startPrevSize+a,C.prevPane),b=Me(C.startNextSize-a,C.nextPane),v=C.startPrevSize+C.startNextSize;g+b!==v&&(g!==C.startPrevSize+a?b=v-g:g=v-b),C.prevPane.style.flexBasis=`${g}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${b}px`,C.nextPane.style.flexGrow="0",ze(o,C.prevPane,C.nextPane,C.direction)},c=()=>{!C.active||C.gutterEl!==o||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",it(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};o.addEventListener("pointerdown",l),o.addEventListener("pointermove",s),o.addEventListener("pointerup",c),o.addEventListener("pointercancel",c);let p=10,f=d=>{let a=e==="horizontal",g=0;if(a&&d.key==="ArrowRight"||!a&&d.key==="ArrowDown")g=p;else if(a&&d.key==="ArrowLeft"||!a&&d.key==="ArrowUp")g=-p;else if(d.key==="Home")g=(O.get(r)?.min||0)-Z(r,e);else if(d.key==="End"){let E=O.get(i);g=Z(r,e)+Z(i,e)-(E?.min||0)-Z(r,e)}else return;d.preventDefault();let b=Z(r,e),v=Z(i,e),h=b+v,_=Me(b+g,r),y=Me(h-_,i);_=h-y,r.style.flexBasis=`${_}px`,r.style.flexGrow="0",i.style.flexBasis=`${y}px`,i.style.flexGrow="0",ze(o,r,i,e),it(t)};o.addEventListener("keydown",f);let u=()=>{let d=O.get(r),a=O.get(i),g=d?.collapsible?r:a?.collapsible?i:null;if(!g)return;let b=O.get(g);if(!b)return;let v=g===r?i:r,h=Z(r,e)+Z(i,e);if(b.collapsed){b.collapsed=!1,g.removeAttribute("data-collapsed");let _=b.preCollapseSize||`${Math.round(h/2)}px`;g.style.flexBasis=_,g.style.flexGrow="0",v.style.flexBasis=`${h-parseFloat(_)}px`,v.style.flexGrow="0"}else b.preCollapseSize=g.style.flexBasis||`${Z(g,e)}px`,b.collapsed=!0,g.setAttribute("data-collapsed","true"),g.style.flexBasis="0px",g.style.flexGrow="0",v.style.flexBasis=`${h}px`,v.style.flexGrow="0";ze(o,r,i,e),it(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:g,collapsed:b.collapsed}}))};return o.addEventListener("dblclick",u),{gutter:o,cleanup:()=>{o.removeEventListener("pointerdown",l),o.removeEventListener("pointermove",s),o.removeEventListener("pointerup",c),o.removeEventListener("pointercancel",c),o.removeEventListener("keydown",f),o.removeEventListener("dblclick",u)}}}function qr(t){t.directive("split",{priority:14,init(e,r,i){qe();let n=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",o=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let l=Array.from(e.children).filter(f=>f.hasAttribute("pane"));if(l.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${l.length}.`);return}l.forEach(f=>{O.get(f)||O.set(f,{size:f.getAttribute("pane")||null,min:parseInt(f.getAttribute("pane-min"),10)||0,max:parseInt(f.getAttribute("pane-max"),10)||1/0,collapsible:f.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],c=[];for(let f=0;f<l.length-1;f++){let{gutter:u,cleanup:m}=Wn(e,n,l[f],l[f+1],o);l[f].after(u),s.push(u),c.push(m)}pe.set(e,{direction:n,gutterSize:o,panes:l,gutters:s}),Vn(e)||l.forEach(f=>{let m=O.get(f)?.size;m?(f.style.flexBasis=m,f.style.flexGrow="0"):(f.style.flexGrow="1",f.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((f,u)=>{ze(f,l[u],l[u+1],n)})}),zn(e,()=>{c.forEach(f=>f()),s.forEach(f=>f.remove()),pe.delete(e),l.forEach(f=>O.delete(f)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Gn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Mr(t){t.directive("pane",{priority:15,init(e,r,i){qe(),e.classList.add("nojs-pane"),O.has(e)||O.set(e,{size:i||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=O.get(e),o=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${o==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${o==="width"?"Width":"Height"}`]=`${n.max}px`),Gn(e,()=>{e.classList.remove("nojs-pane"),O.delete(e),e.style.removeProperty("minWidth"),e.style.removeProperty("minHeight"),e.style.removeProperty("maxWidth"),e.style.removeProperty("maxHeight"),e.style.removeProperty("flexBasis"),e.style.removeProperty("flexGrow")})}})}function zr(t,e={}){qr(t),Mr(t)}function Or(){Hr()}var Ee={sorts:new Map};function Vr(){Ee.sorts.clear()}function fe(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Yn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Un(t,e){let r=t.querySelector("tbody");if(!r)return null;let i=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?i=r:i=r.querySelector("[each]")||r.querySelector("[foreach]"),!i)return null;let n=i.getAttribute("each")||i.getAttribute("foreach");if(!n)return null;let o=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return o?{iteratorVar:o[1],arrayPath:o[2].trim()}:null}function Kn(t,e){let r=e.split("."),i=t;for(let n of r){if(i==null)return;i=i[n]}return i}function Wr(t,e,r){let i=e.split("."),n=t;for(let o=0;o<i.length-1;o++){if(n[i[o]]==null)return;n=n[i[o]]}n[i[i.length-1]]=r}function Yr(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return Number(t)-Number(e);case"date":return new Date(t).getTime()-new Date(e).getTime();default:return String(t).localeCompare(String(e))}}function Xn(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Ur(t){t.directive("sortable",{priority:10,init(e){fe(),e.classList.add("nojs-sortable")}})}function Kr(t){t.directive("sort",{priority:11,init(e,r,i){fe();let n=i;if(!n)return;let o=e.getAttribute("sort-type")||"string",l=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;Ee.sorts.has(s)||Ee.sorts.set(s,{column:null,direction:null}),(l==="asc"||l==="desc")&&Gr(e,s,n,o,l,t);let c=()=>{let p=Ee.sorts.get(s),f;p.column!==n?f="asc":p.direction==="asc"?f="desc":p.direction==="desc"?f=null:f="asc",Gr(e,s,n,o,f,t)};e.addEventListener("click",c),Yn(e,()=>{e.removeEventListener("click",c),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function Gr(t,e,r,i,n,o){let l=Ee.sorts.get(e);Xn(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),l.column=r,l.direction=n):(l.column=null,l.direction=null);let s=Un(e,o);if(s){let c=o.findContext(e),p=c?Kn(c,s.arrayPath):null;if(Array.isArray(p)){if(!n){let u=e._nojsOriginalOrder;if(u){let m=new Set(p),d=u.filter(a=>m.has(a));for(let a of p)u.includes(a)||d.push(a);Wr(c,s.arrayPath,d)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...p]);let f=[...p].sort((u,m)=>{let d=u!=null?u[r]:null,a=m!=null?m[r]:null,g=Yr(d,a,i);return n==="desc"?-g:g});Wr(c,s.arrayPath,f);return}}Zn(e,t,r,i,n)}function Zn(t,e,r,i,n){let o=t.querySelector("tbody");if(!o)return;let c=[...e.closest("tr").children].indexOf(e);if(c<0)return;let p=[...o.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...p]),!n){let u=document.createDocumentFragment();for(let m of t._nojsOriginalRows)u.appendChild(m);o.appendChild(u);return}p.sort((u,m)=>{let d=u.children[c]?.textContent?.trim()||"",a=m.children[c]?.textContent?.trim()||"",g=Yr(i==="number"?parseFloat(d.replace(/[^0-9.\-]/g,""))||0:d,i==="number"?parseFloat(a.replace(/[^0-9.\-]/g,""))||0:a,i);return n==="desc"?-g:g});let f=document.createDocumentFragment();for(let u of p)f.appendChild(u);o.appendChild(f)}function Xr(t){t.directive("fixed-header",{priority:10,init(e){fe(),e.classList.add("nojs-fixed-header")}})}function Zr(t){t.directive("fixed-col",{priority:10,init(e){fe(),e.classList.add("nojs-fixed-col")}})}function st(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qr(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let i=r.getAttribute("each")||r.getAttribute("foreach");if(!i)return null;let n=i.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function Nr(t,e){let r=e.split("."),i=t;for(let n of r){if(i==null)return;i=i[n]}return i}function Jr(t,e,r){let i=e.split("."),n=t;for(let o=0;o<i.length-1;o++){if(n[i[o]]==null)return;n=n[i[o]]}n[i[i.length-1]]=r}function en(t){t.directive("table-reorder",{priority:15,init(e){if(fe(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let i=t.findContext(e),n=e.getAttribute("table-reorder-handle"),o=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",l=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,c=null,p=null;function f(){let b=r.querySelectorAll(":scope > tr");for(let v=0;v<b.length;v++){let h=b[v];if(h._nojsReorderSetup)continue;h._nojsReorderSetup=!0,h.draggable=!0,h.setAttribute("aria-grabbed","false");let _=!0;if(n){let j=D=>{_=!!D.target.closest(n)};h.addEventListener("mousedown",j),st(h,()=>h.removeEventListener("mousedown",j))}let y=j=>{if(n&&!_){j.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(h),c=h,j.dataTransfer&&(j.dataTransfer.effectAllowed="move",j.dataTransfer.setData("text/plain","")),o.split(/\s+/).filter(Boolean).forEach(L=>h.classList.add(L)),h.setAttribute("aria-grabbed","true")},E=j=>{if(c==null)return;j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let D=h.getBoundingClientRect(),L=D.top+D.height/2,V=[...r.querySelectorAll(":scope > tr")].indexOf(h);u(),V!==s&&(j.clientY<L?h.classList.add("nojs-reorder-insert-before"):h.classList.add("nojs-reorder-insert-after"),p=h)},k=()=>{h.classList.remove("nojs-reorder-insert-before"),h.classList.remove("nojs-reorder-insert-after"),p===h&&(p=null)},A=j=>{if(j.preventDefault(),j.stopPropagation(),c==null||s==null)return;let D=[...r.querySelectorAll(":scope > tr")],L=h.getBoundingClientRect(),P=L.top+L.height/2,V=D.indexOf(h);j.clientY>=P&&V++;let U=s;if(U===V||U+1===V){m();return}let W=U<V?V-1:V,ie=Qr(e);if(ie&&i){let S=Nr(i,ie.arrayPath);if(Array.isArray(S)){let B=[...S],[R]=B.splice(U,1);B.splice(W,0,R),Jr(i,ie.arrayPath,B),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...B]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:U,to:W,item:R}}))}}else{let S=c,B=D[W];S&&B&&(U<W?r.insertBefore(S,B.nextSibling):r.insertBefore(S,B),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:U,to:W,item:null}})))}m()},w=()=>{m()};h.addEventListener("dragstart",y),h.addEventListener("dragover",E),h.addEventListener("dragleave",k),h.addEventListener("drop",A),h.addEventListener("dragend",w),st(h,()=>{h.removeEventListener("dragstart",y),h.removeEventListener("dragover",E),h.removeEventListener("dragleave",k),h.removeEventListener("drop",A),h.removeEventListener("dragend",w),h._nojsReorderSetup=!1})}}function u(){p&&(p.classList.remove("nojs-reorder-insert-before"),p.classList.remove("nojs-reorder-insert-after"),p=null)}function m(){c&&(o.split(/\s+/).filter(Boolean).forEach(v=>c.classList.remove(v)),c.setAttribute("aria-grabbed","false")),u(),s=null,c=null;let b=r.querySelectorAll(":scope > tr");for(let v of b)v.classList.remove("nojs-reorder-insert-before"),v.classList.remove("nojs-reorder-insert-after"),l.split(/\s+/).filter(Boolean).forEach(h=>v.classList.remove(h))}let d=b=>{c!=null&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"))},a=b=>{if(c==null||b.target!==r)return;b.preventDefault(),b.stopPropagation();let v=s,_=[...r.querySelectorAll(":scope > tr")].length-1;if(v===_){m();return}let y=Qr(e);if(y&&i){let E=Nr(i,y.arrayPath);if(Array.isArray(E)){let k=[...E],[A]=k.splice(v,1);k.push(A),Jr(i,y.arrayPath,k),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...k]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:v,to:k.length-1,item:A}}))}}m()};r.addEventListener("dragover",d),r.addEventListener("drop",a);let g=new MutationObserver(()=>{f()});g.observe(r,{childList:!0}),f(),st(e,()=>{g.disconnect(),r.removeEventListener("dragover",d),r.removeEventListener("drop",a),m()})}})}function tn(t,e={}){Ur(t),Kr(t),Xr(t),Zr(t),en(t)}function rn(){Vr()}var Qn="[validate],[drag],[drop],[drag-list],[drag-multiple]";function nn(t){if(typeof document>"u")return;let e=document.querySelectorAll(Qn);for(let r of e){if(!r.__declared)continue;let i=X(t,"disposeTree");typeof i=="function"?i(r):(r.__disposers&&(r.__disposers.forEach(o=>o()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Nn={name:"nojs-elements",install(t,e={}){bt(t,e),Lt(t,e),Tt(t,e),Ft(t,e),Vt(t,e),Qt(t,e),or(t,e),pr(t,e),Ar(t,e),Dr(t,e),Rr(t,e),zr(t,e),tn(t,e),nn(t)},init(t){nn(t)},dispose(t){ht(),jt(),Dt(),$t(),Wt(),Nt(),ir(),fr(),_r(),Ir(),Or(),rn()}},at=Nn;typeof window<"u"&&(window.NoJSElements=at,window.NoJS&&typeof window.NoJS.use=="function"&&window.NoJS.use(at));})();
//# sourceMappingURL=nojs-elements.js.map
