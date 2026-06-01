/**
 * NoJS Elements v1.13.1 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
(()=>{var y={dragging:null,selected:new Map,placeholder:null},Ce=new Map;function ut(){y.dragging=null,y.selected.clear(),y.placeholder&&(y.placeholder.remove(),y.placeholder=null),Ce.clear()}function Se(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Ie(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Te(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Te(r):e++}return e}function De(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let d=s.left+s.width/2;if(e<d)return i}else if(o==="grid"){let d=s.left+s.width/2,p=s.top+s.height/2;if(r<p&&e<d||r<s.top+s.height&&e<d)return i}else{let d=s.top+s.height/2;if(r<d)return i}}return n.length}function pt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",y.dragging&&y.dragging.sourceEl){let s=(y.dragging.sourceEl.firstElementChild||y.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let a=document.getElementById(r.startsWith("#")?r.slice(1):r);a&&a.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(a.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(a=>!a.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),y.placeholder=n}function re(){y.placeholder&&(y.placeholder.remove(),y.placeholder=null)}function de(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function an(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,a=n.height,s=getComputedStyle(o),d=Math.min(e,3);for(let f=d-1;f>=0;f--){let u=document.createElement("div"),b=f*4;u.style.cssText="position:absolute;top:"+b+"px;left:"+b+"px;width:"+i+"px;height:"+a+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",f===0?(u.innerHTML=o.innerHTML,u.style.background=s.backgroundColor||"#fff",u.style.border=s.border,u.style.padding=s.padding,u.style.fontSize=s.fontSize,u.style.color=s.color,u.style.fontFamily=s.fontFamily):(u.style.background=s.backgroundColor||"#fff",u.style.border=s.border||"1px solid #ddd"),r.appendChild(u)}let p=document.createElement("div");return p.textContent=e,p.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(p),r.style.width=i+(d-1)*4+"px",r.style.height=a+(d-1)*4+"px",r}function ft(t){Ie(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Se();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",a=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),d=e.getAttribute("drag-image"),p=e.getAttribute("drag-image-offset")||"0,0",f=e.getAttribute("drag-disabled"),u=e.getAttribute("drag-class")||"nojs-dragging",b=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let l=!0;if(s){let v=h=>{l=!!h.target.closest(s)};e.addEventListener("mousedown",v),ae(e,()=>e.removeEventListener("mousedown",v))}let c=v=>{if(s&&!l){v.preventDefault();return}if(f&&t.evaluate(f,n)){v.preventDefault();return}let h=t.evaluate(o,n),_=e.getAttribute("drag-group"),x=h;if(_&&y.selected.has(_)){let E=y.selected.get(_);E.size>0&&[...E].some(A=>A.el===e)&&(x=[...E].map(A=>A.item))}if(y.dragging={item:x,type:i,effect:a,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},v.dataTransfer){if(v.dataTransfer.effectAllowed=a,v.dataTransfer.setData("text/plain",""),Array.isArray(x)&&x.length>1&&v.dataTransfer.setDragImage){let E=an(e,x.length);document.body.appendChild(E);let k=e.getBoundingClientRect();v.dataTransfer.setDragImage(E,k.width/2,k.height/2),requestAnimationFrame(()=>E.remove())}else if(d&&v.dataTransfer.setDragImage)if(d==="none"){let E=document.createElement("div");E.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(E);let[k,A]=p.split(",").map(Number);v.dataTransfer.setDragImage(E,k||0,A||0),requestAnimationFrame(()=>E.remove())}else{let E=e.querySelector(d);if(E){let[k,A]=p.split(",").map(Number);b&&E.classList.add(b),v.dataTransfer.setDragImage(E,k||0,A||0)}}}if(u.split(/\s+/).filter(Boolean).forEach(E=>e.classList.add(E)),Array.isArray(x)&&_&&y.selected.has(_))for(let E of y.selected.get(_))E.el!==e&&u.split(/\s+/).filter(Boolean).forEach(k=>E.el.classList.add(k));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:x,index:y.dragging.sourceIndex,el:e}}))},g=()=>{u.split(/\s+/).filter(Boolean).forEach(h=>e.classList.remove(h));let v=e.getAttribute("drag-group");if(v&&y.selected.has(v))for(let h of y.selected.get(v))u.split(/\s+/).filter(Boolean).forEach(_=>h.el.classList.remove(_));if(e.setAttribute("aria-grabbed","false"),b&&d&&d!=="none"){let h=e.querySelector(d);h&&h.classList.remove(b)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:y.dragging?.item,index:y.dragging?.sourceIndex,dropped:y.dragging===null}})),y.dragging=null,re()};if(e.addEventListener("dragstart",c),e.addEventListener("dragend",g),ae(e,()=>{e.removeEventListener("dragstart",c),e.removeEventListener("dragend",g)}),f){let v=function(){let _=!!t.evaluate(f,n);e.draggable=!_,_?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},h=n.$watch(v);ae(e,h)}let m=v=>{if(y.dragging&&!y.dragging.sourceEl.isConnected&&(y.dragging=null),v.key===" "&&!y.dragging){v.preventDefault();let h=t.evaluate(o,n);y.dragging={item:h,type:i,effect:a,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},u.split(/\s+/).filter(Boolean).forEach(_=>e.classList.add(_)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:h,index:null,el:e}}))}else v.key==="Escape"&&y.dragging&&y.dragging.sourceEl===e&&(v.preventDefault(),u.split(/\s+/).filter(Boolean).forEach(h=>e.classList.remove(h)),e.setAttribute("aria-grabbed","false"),y.dragging=null,re())};e.addEventListener("keydown",m),ae(e,()=>e.removeEventListener("keydown",m))}})}function gt(t){Ie(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Se();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",a=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",d=e.getAttribute("drop-reject-class")||"nojs-drop-reject",p=e.getAttribute("drop-disabled"),f=e.getAttribute("drop-max"),u=e.getAttribute("drop-sort"),b=e.getAttribute("drop-placeholder"),l=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",a);let c=0,g=x=>{if(!y.dragging||p&&t.evaluate(p,n))return;let E=de(y.dragging.type,i),k=!0;if(f){let A=t.evaluate(f,n),w=Te(e);typeof A=="number"&&w>=A&&(k=!1)}if(!E||!k){d.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),s.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),re();return}if(d.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect=a),u){let A=De(e,x.clientX,x.clientY,u);b&&pt(e,A,b,l),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:y.dragging.item,index:A}}))}},m=x=>{if(y.dragging&&!(p&&t.evaluate(p,n))&&(c++,c===1)){let E=de(y.dragging.type,i),k=!0;if(f){let A=t.evaluate(f,n),w=Te(e);typeof A=="number"&&w>=A&&(k=!1)}E&&k?(s.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:y.dragging.item,type:y.dragging.type}}))):d.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A))}},v=x=>{y.dragging&&(c--,c<=0&&(c=0,s.split(/\s+/).filter(Boolean).forEach(E=>e.classList.remove(E)),d.split(/\s+/).filter(Boolean).forEach(E=>e.classList.remove(E)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:y.dragging.item}}))))},h=x=>{if(x.preventDefault(),x.stopPropagation(),c=0,!y.dragging||p&&t.evaluate(p,n)||!de(y.dragging.type,i))return;if(f){let j=t.evaluate(f,n),P=Te(e);if(typeof j=="number"&&P>=j)return}let E=y.dragging.item,k=y.dragging.type,A=y.dragging.effect,w=0;u&&(w=De(e,x.clientX,x.clientY,u)),s.split(/\s+/).filter(Boolean).forEach(j=>e.classList.remove(j)),d.split(/\s+/).filter(Boolean).forEach(j=>e.classList.remove(j)),re();let L={$drag:E,$dragType:k,$dragEffect:A,$dropIndex:w,$source:{list:y.dragging.sourceList,index:y.dragging.sourceIndex,el:y.dragging.sourceEl},$target:{list:null,index:w,el:e},$el:e},D=K(t,"execStatement");typeof D=="function"?D(o,n,L):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),y.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:E,index:w,source:L.$source,target:L.$target,effect:A}}))},_=x=>{y.dragging&&(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),h(x))};e.addEventListener("dragover",g),e.addEventListener("dragenter",m),e.addEventListener("dragleave",v),e.addEventListener("drop",h),e.addEventListener("keydown",_),ae(e,()=>{e.removeEventListener("dragover",g),e.removeEventListener("dragenter",m),e.removeEventListener("dragleave",v),e.removeEventListener("drop",h),e.removeEventListener("keydown",_)})}})}function mt(t){Ie(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Se();let n=t.findContext(e),i=e.getAttribute("template"),a=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",d=e.getAttribute("drop-sort")||"vertical",p=e.getAttribute("drag-type")||"__draglist_"+o,f=e.getAttribute("drop-accept")||p,u=e.hasAttribute("drag-list-copy"),b=e.hasAttribute("drag-list-remove"),l=e.getAttribute("drag-disabled"),c=e.getAttribute("drop-disabled"),g=e.getAttribute("drop-max"),m=e.getAttribute("drop-placeholder"),v=e.getAttribute("drop-placeholder-class"),h=e.getAttribute("drag-class")||"nojs-dragging",_=e.getAttribute("drop-class")||"nojs-drag-over",x=e.getAttribute("drop-reject-class")||"nojs-drop-reject",E=e.getAttribute("drop-settle-class")||"nojs-drop-settle",k=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",u?"copy":"move");let A={listPath:o,ctx:n,el:e};Ce.set(e,A),ae(e,()=>Ce.delete(e));let w=0,L=null;function D(){let S=t.resolve(o,n);if(!Array.isArray(S))return;if(S===L&&S.length>0&&e.children.length>0){for(let M of e.children)M.__ctx&&M.__ctx.$notify&&M.__ctx.$notify();return}L=S;let B=i?document.getElementById(i):null;if(!B)return;let $=K(t,"disposeChildren");typeof $=="function"&&$(e),e.innerHTML="";let I=S.length;S.forEach((M,q)=>{let ee={[s]:M,$index:q,$count:I,$first:q===0,$last:q===I-1,$even:q%2===0,$odd:q%2!==0},G=t.createContext(ee,n),Q=B.content.cloneNode(!0),F=document.createElement("div");F.style.display="contents",F.__ctx=G,F.appendChild(Q),e.appendChild(F);let Y=F.firstElementChild||F;Y.draggable=!0,Y.setAttribute("role","option"),Y.setAttribute("aria-grabbed","false"),Y.getAttribute("tabindex")||Y.setAttribute("tabindex","0");let ke=z=>{if(l&&t.evaluate(l,n)){z.preventDefault();return}y.dragging={item:M,type:p,effect:u?"copy":"move",sourceEl:F,sourceCtx:G,sourceList:S,sourceIndex:q,listDirective:{el:e,listPath:o,ctx:n,keyProp:a,copyMode:u,removeMode:b}},z.dataTransfer&&(z.dataTransfer.effectAllowed=u?"copy":"move",z.dataTransfer.setData("text/plain","")),h.split(/\s+/).filter(Boolean).forEach(N=>Y.classList.add(N)),Y.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:M,index:q,el:Y}}))},ct=()=>{h.split(/\s+/).filter(Boolean).forEach(z=>Y.classList.remove(z)),Y.setAttribute("aria-grabbed","false"),y.dragging&&y.dragging.sourceEl===F&&(y.dragging=null),re()};F.addEventListener("dragstart",ke),F.addEventListener("dragend",ct);let lt=z=>{if(z.key===" "&&!y.dragging)z.preventDefault(),z.stopPropagation(),y.dragging={item:M,type:p,effect:u?"copy":"move",sourceEl:F,sourceCtx:G,sourceList:S,sourceIndex:q,listDirective:{el:e,listPath:o,ctx:n,keyProp:a,copyMode:u,removeMode:b}},h.split(/\s+/).filter(Boolean).forEach(N=>Y.classList.add(N)),Y.setAttribute("aria-grabbed","true");else if(z.key==="Escape"&&y.dragging){z.preventDefault(),z.stopPropagation();let N=e.querySelector('[aria-grabbed="true"]')||Y;h.split(/\s+/).filter(Boolean).forEach(Ve=>N.classList.remove(Ve)),N.setAttribute("aria-grabbed","false"),y.dragging=null,re()}else if((z.key==="ArrowDown"||z.key==="ArrowRight")&&y.dragging&&y.dragging.sourceEl===F){z.preventDefault();let N=F.nextElementSibling;N&&(N.firstElementChild||N).focus()}else if((z.key==="ArrowUp"||z.key==="ArrowLeft")&&y.dragging&&y.dragging.sourceEl===F){z.preventDefault();let N=F.previousElementSibling;N&&(N.firstElementChild||N).focus()}};F.addEventListener("keydown",lt),F.__disposers=F.__disposers||[],F.__disposers.push(()=>F.removeEventListener("dragstart",ke),()=>F.removeEventListener("dragend",ct),()=>F.removeEventListener("keydown",lt)),t.processTree(F)});let R=S.length===0;k.split(/\s+/).filter(Boolean).forEach(M=>e.classList.toggle(M,R))}let j=S=>{if(!y.dragging||c&&t.evaluate(c,n))return;let B=de(y.dragging.type,f),$=!0;if(g){let R=t.evaluate(g,n),M=t.resolve(o,n);typeof R=="number"&&Array.isArray(M)&&M.length>=R&&($=!1)}if(!B||!$){x.split(/\s+/).filter(Boolean).forEach(R=>e.classList.add(R)),_.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),re();return}x.split(/\s+/).filter(Boolean).forEach(R=>e.classList.remove(R)),S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect=u?"copy":"move");let I=De(e,S.clientX,S.clientY,d);m&&pt(e,I,m,v)},P=S=>{if(y.dragging&&!(c&&t.evaluate(c,n))&&(w++,w===1)){let B=de(y.dragging.type,f),$=!0;if(g){let I=t.evaluate(g,n),R=t.resolve(o,n);typeof I=="number"&&Array.isArray(R)&&R.length>=I&&($=!1)}B&&$?(_.split(/\s+/).filter(Boolean).forEach(I=>e.classList.add(I)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:y.dragging.item,type:y.dragging.type}}))):x.split(/\s+/).filter(Boolean).forEach(I=>e.classList.add(I))}},V=()=>{y.dragging&&(w--,w<=0&&(w=0,_.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),x.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:y.dragging?.item}}))))},U=S=>{if(S.preventDefault(),S.stopPropagation(),w=0,!y.dragging||c&&t.evaluate(c,n)||!de(y.dragging.type,f))return;if(g){let G=t.evaluate(g,n),Q=t.resolve(o,n);if(typeof G=="number"&&Array.isArray(Q)&&Q.length>=G)return}let B=y.dragging.item,$=y.dragging.listDirective,I=y.dragging.sourceIndex,R=De(e,S.clientX,S.clientY,d);_.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),x.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),re();let M=t.resolve(o,n);if(!Array.isArray(M))return;let q=$&&$.el===e;if(q&&I===R){y.dragging=null;return}if(q&&I+1===R){y.dragging=null;return}let ee=[...M];if(q){let[G]=ee.splice(I,1),Q=I<R?R-1:R;ee.splice(Q,0,G),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:B,from:I,to:Q}}))}else{let G=u&&typeof B=="object"?{...B}:B;if(ee.splice(R,0,G),n.$set(o,ee),$&&!$.copyMode&&(b||$.removeMode)){let Q=t.resolve($.listPath,$.ctx);if(Array.isArray(Q)&&I!=null){let F=Q.filter((Y,ke)=>ke!==I);$.ctx.$set($.listPath,F),$.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:F,item:B,index:I}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:B,from:I,fromList:$?t.resolve($.listPath,$.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][q&&I<R?R-1:R];if(Q){let F=Q.firstElementChild||Q;E.split(/\s+/).filter(Boolean).forEach(Y=>F.classList.add(Y)),F.addEventListener("animationend",()=>{E.split(/\s+/).filter(Boolean).forEach(Y=>F.classList.remove(Y))},{once:!0})}}),y.dragging=null},W=S=>{if(y.dragging&&de(y.dragging.type,f)&&(S.key==="Enter"||S.key===" ")){S.preventDefault();let B=e.querySelector(":focus");if(B){let I=(B.style?.display==="contents"&&B.firstElementChild||B).getBoundingClientRect(),R={preventDefault(){},stopPropagation(){},clientX:I.left+I.width/2,clientY:I.top+I.height+1,dataTransfer:null};U(R)}}};e.addEventListener("dragover",j),e.addEventListener("dragenter",P),e.addEventListener("dragleave",V),e.addEventListener("drop",U),e.addEventListener("keydown",W),ae(e,()=>{e.removeEventListener("dragover",j),e.removeEventListener("dragenter",P),e.removeEventListener("dragleave",V),e.removeEventListener("drop",U),e.removeEventListener("keydown",W)});let se=n.$watch(D);ae(e,se),D()}})}function bt(t){Ie(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}y.selected.has(n)||y.selected.set(n,new Set);let a=y.selected.get(n),s=p=>{let f=e.getAttribute("drag"),b={item:f?t.evaluate(f,o):null,el:e,ctx:o};if(p.ctrlKey||p.metaKey){let l=[...a].find(c=>c.el===e);l?(a.delete(l),i.split(/\s+/).filter(Boolean).forEach(c=>e.classList.remove(c))):(a.add(b),i.split(/\s+/).filter(Boolean).forEach(c=>e.classList.add(c)))}else{for(let l of a)i.split(/\s+/).filter(Boolean).forEach(c=>l.el.classList.remove(c));a.clear(),a.add(b),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l))}};e.addEventListener("click",s),ae(e,()=>{e.removeEventListener("click",s);let p=[...a].find(f=>f.el===e);p&&a.delete(p)});let d=p=>{if(p.key==="Escape"){for(let f of a)i.split(/\s+/).filter(Boolean).forEach(u=>f.el.classList.remove(u));a.clear()}};window.addEventListener("keydown",d),ae(e,()=>window.removeEventListener("keydown",d))}})}function ht(t,e={}){ft(t),gt(t),mt(t),bt(t)}function vt(){ut()}var yt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],We=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ce,_t,Fe,Ge,Ye,xt,Be,Ue,Et;function dn(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function cn(t){return(t.getAttribute("type")||"text").toLowerCase()}function ln(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let a=n.split("|").map(s=>s.trim());for(let s of a){let[d,...p]=s.split(":"),f=ce[d];if(f){let u=f(t.value,...p,e);u!==!0&&u&&(r.push({rule:d,message:u}),o.add(d))}else{let u=t.value,b=null;switch(d){case"required":(u==null||String(u).trim()==="")&&(b="Required");break;case"email":u&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)&&(b="Invalid email");break;case"url":try{new URL(u)}catch{b="Invalid URL"}break;case"min":Number(u)<Number(p[0])&&(b=`Minimum value is ${p[0]}`);break;case"max":Number(u)>Number(p[0])&&(b=`Maximum value is ${p[0]}`);break;case"custom":if(p[0]&&ce[p[0]]){let l=ce[p[0]](u,e);l!==!0&&l&&(b=l)}break}b&&(r.push({rule:d,message:b}),o.add(d))}}}let i=t.validity;if(i&&!i.valid){for(let[a,s]of yt)if(i[a]){let d=s||cn(t);o.has(d)||(r.push({rule:d,message:t.validationMessage}),o.add(d))}}return r}function un(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function pn(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let a=We.indexOf(n.rule),s=We.indexOf(i.rule);return(a===-1?999:a)-(s===-1?999:s)})[0];return{rule:o.rule,message:un(e,o.rule,o.message)}}function jt(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function fn(t,e,r,o,n){let i=jt(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;Ue(i),i.remove()}let a=document.querySelector(t);if(!a)return;let s=a.content.cloneNode(!0),d=document.createElement("div");d.style.display="contents",d.__errorTemplateFor=o;let p=Fe({$error:e,$rule:r},n);d.__ctx=p,d.appendChild(s),a.parentNode.insertBefore(d,a.nextSibling),dn(d),Ye(d)}function wt(t){let e=jt(t);e&&(Ue(e),e.remove())}function gn(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!_t(r,e)}catch{return!0}}function At(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function mn(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...a]=n.split(":"),s=ce[i];if(s){let d=s(t,...a,r);if(d!==!0&&d)return d}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(a[0]))return`Minimum value is ${a[0]}`;break;case"max":if(Number(t)>Number(a[0]))return`Maximum value is ${a[0]}`;break;case"custom":if(a[0]&&ce[a[0]]){let d=ce[a[0]](t,r);if(d!==!0&&d)return d}break}}return null}function bn(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return Ge(t);let e=Fe({},null);return t.__ctx=e,e}function Lt(t){ce=K(t,"validators")||{},_t=t.evaluate,Fe=t.createContext,Ge=t.findContext,Ye=t.processTree,xt=K(t,"cloneTemplate")||(()=>null),Be=K(t,"disposeChildren")||(()=>{}),Ue=K(t,"disposeTree")||Be,Et=K(t,"warn")||console.warn;let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):Et('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let b=function(){a&&typeof a.$notify=="function"&&a.$notify();let x=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;x.nextNode();){let k=x.currentNode.__ctx;k&&k!==a&&typeof k.$notify=="function"&&k.$notify()}},l=function(){return r.querySelectorAll("input, textarea, select")},c=function(){let x={},E={},k={},A=!0,w=null,L=0,D=!1;for(let j of l())j.name&&(j.type==="checkbox"?E[j.name]=j.checked:j.type==="radio"?j.checked?E[j.name]=j.value:j.name in E||(E[j.name]=""):E[j.name]=j.value);for(let j of l()){if(!j.name)continue;let P=d.has(j.name),V=p.has(j.name);if(!gn(j,a)){k[j.name]={valid:!0,dirty:V,touched:P,error:null,value:E[j.name]};continue}let U=ln(j,E),W=pn(U,j),se=!W,S=At(j,r),B=S.includes("input"),$=S.includes("blur")||S.includes("focusout")||S.includes("submit"),I;!j.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?I=P||V:I=B&&V||$&&P,se||(A=!1),!se&&I&&(x[j.name]=W.message,L++,w||(w=W.message)),k[j.name]={valid:se,dirty:V,touched:P,error:W?W.message:null,value:E[j.name]};let R=j.getAttribute("error-class")||s;if(R){let q=R.split(/\s+/);!se&&I?j.classList.add(...q):j.classList.remove(...q)}if(W&&I){let q=j.getAttribute(`error-${W.rule}`),ee=j.getAttribute("error"),G=(q&&q.startsWith("#")?q:null)||(ee&&ee.startsWith("#")?ee:null);G?fn(G,W.message,W.rule,j,a):wt(j)}else wt(j);let M=j.getAttribute("as");M&&a.$set(M,k[j.name])}f.size>0&&(D=!0),u.valid=A,u.errors=x,u.values=E,u.fields=k,u.firstError=w,u.errorCount=L,u.pending=D,a.$set("$form",{...u}),b(),g(r)},g=function(x){let E=u.valid&&!u.pending&&!u.submitting,k=x.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let A of k){if(A.hasAttribute("disabled")&&A.getAttribute("disabled")!==""){let w=A.getAttribute("disabled");if(w!=="disabled"&&w!=="true"&&w!=="false")continue}A.disabled=!E,A.__autoDisabled=!0}},m=function(x){if(!x.name)return;let E=At(x,r),k=()=>{p.add(x.name),u.dirty=!0,c()},A=()=>{d.add(x.name),u.touched=!0,c()};if(E.includes("input"))x.addEventListener("input",k),ne(r,()=>x.removeEventListener("input",k));else{let w=()=>{p.add(x.name),u.dirty=!0,c()};x.addEventListener("input",w),ne(r,()=>x.removeEventListener("input",w))}if(E.includes("blur")||E.includes("focusout")){let w=()=>{A(),E.includes("blur")&&k()};x.addEventListener("focusout",w),ne(r,()=>x.removeEventListener("focusout",w))}else x.addEventListener("focusout",A),ne(r,()=>x.removeEventListener("focusout",A));E.includes("submit")&&(x.addEventListener("focusout",A),ne(r,()=>x.removeEventListener("focusout",A)))},a=bn(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),d=new Set,p=new Set,f=new Map,u={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u.dirty=!1,u.touched=!1,u.pending=!1,u.submitting=!1,d.clear(),p.clear(),r.reset(),c()},endSubmit:()=>{u.submitting=!1,c()}};a.$set("$form",u);let v=r.hasAttribute("validate-on"),h=[...l()].some(x=>x.hasAttribute("validate-on"));if(!v&&!h){let x=k=>{let A=k.target;A&&A.name&&p.add(A.name),u.dirty=!0,c()};r.addEventListener("input",x),ne(r,()=>r.removeEventListener("input",x)),r.addEventListener("change",x),ne(r,()=>r.removeEventListener("change",x));let E=k=>{k.target&&k.target.name&&d.add(k.target.name),u.touched=!0,c()};r.addEventListener("focusout",E),ne(r,()=>r.removeEventListener("focusout",E))}else for(let x of l())m(x);let _=x=>{for(let E of l())E.name&&d.add(E.name);if(u.touched=!0,c(),!u.valid||u.pending){x.preventDefault(),x.stopImmediatePropagation();return}u.submitting=!0,g(r),a.$set("$form",{...u}),b()};r.addEventListener("submit",_,!0),ne(r,()=>r.removeEventListener("submit",_,!0)),r.__nojsResetSubmitting=()=>{u.submitting=!1,c()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(c);return}let i=Ge(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let a=r.getAttribute("error"),s=()=>{let d=mn(r.value,n,{});if(d&&a){let p=r.nextElementSibling?.__validationError?r.nextElementSibling:null;p||(p=document.createElement("div"),p.__validationError=!0,p.style.display="contents",r.parentNode.insertBefore(p,r.nextSibling));let f=xt(a);if(f){let u=Fe({err:{message:d}},i);Be(p),p.innerHTML="",p.__ctx=u,p.appendChild(f),Ye(p)}}else{let p=r.nextElementSibling?.__validationError?r.nextElementSibling:null;p&&(Be(p),p.innerHTML="")}};r.addEventListener("input",s),ne(r,()=>r.removeEventListener("input",s))}}})}function kt(t,e={}){Lt(t)}function Ct(){}var we=new Map,te=new Map;function St(){for(let t of te.values())clearTimeout(t);te.clear();for(let t of we.values())t.remove();we.clear()}function Tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function hn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Re=8;function vn(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight,s,d;switch(r){case"bottom":s=o.bottom+Re,d=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,d=o.left-n.width-Re;break;case"right":s=o.top+(o.height-n.height)/2,d=o.right+Re;break;default:s=o.top-n.height-Re,d=o.left+(o.width-n.width)/2;break}d<4&&(d=4),d+n.width>i-4&&(d=i-n.width-4),s<4&&(s=4),s+n.height>a-4&&(s=a-n.height-4),t.style.top=`${s}px`,t.style.left=`${d}px`}var yn=0;function xn(t,e,r){document.body.appendChild(e),vn(e,t,r),e.setAttribute("aria-hidden","false")}function En(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Dt(t){t.directive("tooltip",{priority:20,init(e,r,o){Tt();let n=o;if(!n){console.warn("[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",a=parseInt(e.getAttribute("tooltip-delay"),10)||300,s=e.getAttribute("tooltip-disabled"),d=s?t.findContext(e):null,p=`nojs-tooltip-${++yn}`,f=document.createElement("div");f.className="nojs-tooltip",f.setAttribute("role","tooltip"),f.setAttribute("id",p),f.setAttribute("aria-hidden","true"),f.textContent=n,e.setAttribute("aria-describedby",p),we.set(e,f);let u=()=>{if(s&&d&&t.evaluate(s,d))return;te.has(e)&&clearTimeout(te.get(e));let h=setTimeout(()=>{te.delete(e),!(s&&d&&t.evaluate(s,d))&&xn(e,f,i)},a);te.set(e,h)},b=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),En(e,f)},l=()=>u(),c=()=>b(),g=()=>u(),m=()=>b(),v=h=>{h.key==="Escape"&&f.getAttribute("aria-hidden")==="false"&&b()};e.addEventListener("mouseenter",l),e.addEventListener("mouseleave",c),e.addEventListener("focusin",g),e.addEventListener("focusout",m),e.addEventListener("keydown",v),hn(e,()=>{e.removeEventListener("mouseenter",l),e.removeEventListener("mouseleave",c),e.removeEventListener("focusin",g),e.removeEventListener("focusout",m),e.removeEventListener("keydown",v),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),f.remove(),we.delete(e)})}})}function It(t,e={}){Dt(t)}function Bt(){St()}var X=new Map;function Ft(){X.clear()}function $e(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function Ke(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ge=8;function Xe(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight,s,d;switch(r){case"top":s=o.top-n.height-ge,d=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,d=o.left-n.width-ge;break;case"right":s=o.top+(o.height-n.height)/2,d=o.right+ge;break;default:s=o.bottom+ge,d=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>a&&(s=o.top-n.height-ge),r==="top"&&s<0&&(s=o.bottom+ge),d<4&&(d=4),d+n.width>i-4&&(d=i-n.width-4),s<4&&(s=4),s+n.height>a-4&&(s=a-n.height-4),t.style.top=`${s}px`,t.style.left=`${d}px`}function Rt(t){t.directive("popover",{priority:20,init(r,o,n){$e();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let a=r.getAttribute("popover-position")||"bottom";if(!X.has(i))X.set(i,{popoverEl:r,triggerEls:new Set,position:a,open:!1});else{let d=X.get(i);d.popoverEl=r,d.position=a}let s=d=>{let p=X.get(i);if(!p)return;let f=d.newState==="open";p.open=f;for(let u of p.triggerEls)u.setAttribute("aria-expanded",String(f))};r.addEventListener("toggle",s),Ke(r,()=>{r.removeEventListener("toggle",s),X.delete(i)})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){$e();let i=n;if(!i){let p=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(p&&(i=p.getAttribute("data-popover-id")),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),X.has(i)||X.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),X.get(i).triggerEls.add(r);let a=d=>{let p=X.get(i);if(!p||!p.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}p.popoverEl.togglePopover(),requestAnimationFrame(()=>{p.popoverEl.matches(":popover-open")&&Xe(p.popoverEl,r,p.position)})};r.addEventListener("click",a);let s=d=>{let p=X.get(i);d.key==="Escape"&&p?.open&&(p.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),Ke(r,()=>{r.removeEventListener("click",a),document.removeEventListener("keydown",s);let d=X.get(i);d&&d.triggerEls.delete(r)})}}),t.directive("popover-dismiss",{priority:20,init(r){$e();let o=()=>{let n=r.closest(".nojs-popover");n&&n.hidePopover()};r.addEventListener("click",o),Ke(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=X.get(r);if(!n||!n.popoverEl)return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>Xe(n.popoverEl,i,n.position)),!0},e.close=r=>{let o=X.get(r);if(!o||!o.popoverEl)return!1;try{o.popoverEl.hidePopover()}catch{}return!0},e.toggle=(r,o)=>{let n=X.get(r);if(!n||!n.popoverEl)return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>Xe(n.popoverEl,i,n.position)),!0},t.popover=e}function $t(t,e={}){Rt(t)}function Ht(){Ft()}var J=[],oe=new Map,wn=1e4;function Pt(){return wn+J.length}function qt(){J.length=0,oe.clear()}function me(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function An(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var zt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',Ze=new WeakMap;function _n(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(zt)].filter(a=>a.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),Ze.set(t,e)}function Mt(t){let e=Ze.get(t);e&&(t.removeEventListener("keydown",e),Ze.delete(t))}var Ae=new WeakMap;function Ot(t){t.directive("modal",{priority:10,init(r,o,n){me();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let a=r.querySelector("h1, h2, h3, h4, h5, h6");a&&(a.id||(a.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",a.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let d=r.getAttribute("modal-class"),p=r.getAttribute("modal-escape"),f=b=>{b.target===r&&s!=="false"&&p!=="false"&&be(r,i)};r.addEventListener("click",f),oe.set(i,r);let u=b=>{if(b.newState==="open"){if(r.style.zIndex=String(Pt()),d&&d.split(/\s+/).filter(Boolean).forEach(l=>r.classList.add(l)),requestAnimationFrame(()=>{let l=r.querySelector(zt);l?l.focus():r.focus()}),_n(r),p!=="false"){let l=c=>{c.key==="Escape"&&(c.stopPropagation(),be(r,i))};r.addEventListener("keydown",l),Ae.set(r,l)}}else if(b.newState==="closed"){d&&d.split(/\s+/).filter(Boolean).forEach(g=>r.classList.remove(g)),Mt(r);let l=Ae.get(r);l&&(r.removeEventListener("keydown",l),Ae.delete(r));let c=J.findIndex(g=>g.id===i);if(c!==-1){let g=J[c];J.splice(c,1),g.triggerEl&&requestAnimationFrame(()=>{g.triggerEl.focus()})}}};r.addEventListener("toggle",u),An(r,()=>{r.removeEventListener("click",f),r.removeEventListener("toggle",u),Mt(r);let b=Ae.get(r);b&&(r.removeEventListener("keydown",b),Ae.delete(r)),oe.delete(i);let l=J.findIndex(c=>c.id===i);l!==-1&&J.splice(l,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;J.push({id:r,el:o,triggerEl:null});try{o.showPopover()}catch{return!1}return!0},e.close=r=>{let o=oe.get(r);return o?(be(o,r),!0):!1},e.closeAll=()=>{for(let r=J.length-1;r>=0;r--)be(J[r].el,J[r].id)},t.modal=e}function be(t,e){try{t.hidePopover()}catch{}}function jn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Vt(t){t.directive("modal-open",{priority:10,init(e,r,o){me();let n=o;if(!n){let u=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(u&&(n=u.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let f=oe.get(n)||document.querySelector(`[data-modal-id="${n}"]`);if(!f){console.warn(`[modal-open] modal "${n}" not found`);return}J.push({id:n,el:f,triggerEl:e}),e.setAttribute("aria-expanded","true"),f.id&&e.setAttribute("aria-controls",f.id);try{f.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`)}},a=()=>{e.setAttribute("aria-expanded","false")},s=null,d=null;requestAnimationFrame(()=>{let f=oe.get(n);f&&(d=f,s=u=>{u.newState==="closed"&&e.setAttribute("aria-expanded","false")},f.addEventListener("toggle",s))}),e.addEventListener("click",i),jn(e,()=>{e.removeEventListener("click",i),d&&s&&d.removeEventListener("toggle",s)})}})}function Ln(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Wt(t){t.directive("modal-close",{priority:10,init(e,r,o){me();let n=()=>{let i,a;if(o){if(a=o,i=oe.get(a),!i){console.warn(`[modal-close] modal "${a}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}a=i.getAttribute("modal")}be(i,a)};e.addEventListener("click",n),Ln(e,()=>{e.removeEventListener("click",n)})}})}function Gt(t,e={}){Ot(t),Vt(t),Wt(t)}function Yt(){qt()}var _e={openMenus:new Map};function Ut(){_e.openMenus.clear()}function he(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}function kn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Kt(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),s=window.innerHeight,d=window.innerWidth,p,f;switch(o){case"top":p=i.top-a.height,f=i.left;break;case"left":p=i.top,f=i.left-a.width;break;case"right":p=i.top,f=i.right;break;default:p=i.bottom,f=i.left}o==="bottom"||o==="top"?n==="end"&&(f=i.right-a.width):n==="end"&&(p=i.bottom-a.height),o==="bottom"&&p+a.height>s&&i.top-a.height>0?p=i.top-a.height:o==="top"&&p<0&&i.bottom+a.height<=s&&(p=i.bottom),f<4&&(f=4),f+a.width>d-4&&(f=d-a.width-4),t.style.top=`${p}px`,t.style.left=`${f}px`}function Ne(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Qe(t){let e=Ne(t);e.length&&e[0].focus()}function Xt(t){let e=Ne(t);e.length&&e[e.length-1].focus()}function Zt(t){t.directive("dropdown",{priority:15,init(r){he()}}),t.directive("dropdown-toggle",{priority:15,init(r){he();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Math.random().toString(36).slice(2,7)}`),r.setAttribute("aria-controls",n.id);function i(){n.setAttribute("data-open",""),n.showPopover&&n.showPopover(),r.setAttribute("aria-expanded","true"),Kt(n,r,o),_e.openMenus.set(n,{toggle:r,wrapper:o})}function a(){n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),_e.openMenus.delete(n)}function s(){return r.getAttribute("aria-expanded")==="true"}let d=g=>{g.newState==="closed"&&s()&&a()};n.addEventListener("toggle",d);let p=g=>{g.preventDefault(),g.stopPropagation(),s()?a():i()};r.addEventListener("click",p);let f=g=>{s()&&!o.contains(g.target)&&a()};document.addEventListener("click",f,!0);let u=g=>{g.key==="Escape"&&s()&&(a(),r.focus())};document.addEventListener("keydown",u);let b=g=>{switch(g.key){case"Enter":case" ":g.preventDefault(),i(),Qe(n);break;case"ArrowDown":g.preventDefault(),i(),Qe(n);break;case"ArrowUp":g.preventDefault(),i(),Xt(n);break}};r.addEventListener("keydown",b);let l=g=>{if(!(!s()||Ne(n).find(h=>h===document.activeElement)))switch(g.key){case"ArrowDown":g.preventDefault(),Qe(n);break;case"ArrowUp":g.preventDefault(),Xt(n);break}};n.addEventListener("keydown",l);let c=()=>{s()&&Kt(n,r,o)};window.addEventListener("scroll",c,!0),window.addEventListener("resize",c),kn(r,()=>{r.removeEventListener("click",p),r.removeEventListener("keydown",b),n.removeEventListener("keydown",l),n.removeEventListener("toggle",d),document.removeEventListener("click",f,!0),document.removeEventListener("keydown",u),window.removeEventListener("scroll",c,!0),window.removeEventListener("resize",c),_e.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){he(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function Qt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Cn(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function Nt(t){t.directive("dropdown-item",{priority:15,init(e){he();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=a=>{if(!r)return;let s=Cn(r),d=s.indexOf(e);switch(a.key){case"ArrowDown":{a.preventDefault(),(d+1<s.length?s[d+1]:s[0]).focus();break}case"ArrowUp":{a.preventDefault(),(d-1>=0?s[d-1]:s[s.length-1]).focus();break}case"Home":{a.preventDefault(),s.length&&s[0].focus();break}case"End":{a.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{a.preventDefault(),e.click();break}case"Escape":{if(a.preventDefault(),r)try{r.hidePopover()}catch{}if(o){let p=o.querySelector("[dropdown-toggle]");p&&p.focus()}break}case"Tab":{if(r)try{r.hidePopover()}catch{}break}}};e.addEventListener("keydown",n),Qt(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(r)try{r.hidePopover()}catch{}if(o){let a=o.querySelector("[dropdown-toggle]");a&&a.focus()}};e.addEventListener("click",i),Qt(e,()=>e.removeEventListener("click",i))}})}function Jt(t,e={}){Zt(t),Nt(t)}function er(){Ut()}var ie=new Map,ve=new Set,tr=0;function rr(){return++tr}function nr(){for(let t of ve)clearTimeout(t);ve.clear();for(let t of ie.values())t.remove();ie.clear(),tr=0}function or(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function Je(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Sn=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function et(){return ie.size>0?ie.values().next().value:Tn("top-right")}function Tn(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function Dn(t){return t.startsWith("top")}function tt(t,e,r,o,n){let i=rr(),a=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let d=document.createElement("span");if(d.textContent=e,s.appendChild(d),n){let p=document.createElement("button");p.type="button",p.classList.add("nojs-toast-dismiss"),p.setAttribute("aria-label","Dismiss"),p.textContent="\xD7",p.addEventListener("click",()=>He(s)),s.appendChild(p)}if(Dn(a)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let p=setTimeout(()=>{ve.delete(p),He(s)},o);ve.add(p),s._toastTimerId=p}return s}function He(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),ve.delete(t._toastTimerId)),t.remove())}function ir(t){or(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&Sn.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),Je(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",a=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let c=et();tt(c,n,i,a,s)};r.addEventListener("click",l),Je(r,()=>r.removeEventListener("click",l));return}let p=t.findContext(r),f;function u(){let l=t.evaluate(n,p);if(l&&l!==f){let c=typeof l=="string"?l:String(l),g=et();tt(g,c,i,a,s)}f=l}let b=p.$watch(u);Je(r,b)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,a=et();return tt(a,String(r),o,n,i)};e.dismiss=r=>{let o=document.querySelector(`[data-toast-id="${r}"]`);o&&He(o)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>He(r))},t.toast=e}function sr(t,e={}){ir(t)}function ar(){nr()}var le={containers:new Map};function dr(){le.containers.clear()}function cr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function In(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Bn=0;function lr(t){return`${t}-${++Bn}`}function rt(t,e){let r=le.containers.get(t);if(!r)return;let{tabs:o,panels:n}=r;if(!(e<0||e>=o.length)&&o[e].getAttribute("aria-disabled")!=="true"){for(let i=0;i<o.length;i++)o[i].setAttribute("aria-selected","false"),o[i].setAttribute("tabindex","-1"),n[i].setAttribute("aria-hidden","true"),n[i].inert=!0;o[e].setAttribute("aria-selected","true"),o[e].setAttribute("tabindex","0"),n[e].setAttribute("aria-hidden","false"),n[e].inert=!1,r.activeIndex=e}}function je(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return e}function ur(t){t.directive("tabs",{priority:10,init(e,r,o){cr();let n=[],i=[];for(let c of Array.from(e.children))c.hasAttribute("tab")?n.push(c):c.hasAttribute("panel")&&i.push(c);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let a=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",a),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let d=Math.min(n.length,i.length);for(let c=0;c<d;c++){let g=n[c],m=i[c],v=g.id||lr("nojs-tab"),h=m.id||lr("nojs-panel");g.id=v,m.id=h,g.setAttribute("role","tab"),g.setAttribute("aria-selected","false"),g.setAttribute("aria-controls",h),g.setAttribute("tabindex","-1"),g.classList.add("nojs-tab"),m.setAttribute("role","tabpanel"),m.setAttribute("aria-labelledby",v),m.setAttribute("tabindex","0"),m.setAttribute("aria-hidden","true"),m.inert=!0,m.classList.add("nojs-panel"),s.appendChild(g)}let p=i[0];p?e.insertBefore(s,p):e.appendChild(s),le.containers.set(e,{tabs:n.slice(0,d),panels:i.slice(0,d),activeIndex:-1});let f=t.findContext(e);for(let c=0;c<d;c++){let g=n[c].getAttribute("tab-disabled");g&&t.evaluate(g,f)&&n[c].setAttribute("aria-disabled","true")}let u=0;if(o&&o.trim()!==""){let c=parseInt(o,10);!isNaN(c)&&c>=0&&c<d&&(u=c)}n[u]?.getAttribute("aria-disabled")==="true"&&(u=je(n.slice(0,d),u,1)),rt(e,u);let b=c=>{let g=le.containers.get(e);if(!g)return;let m=c.target;if(m.getAttribute("role")!=="tab")return;let{tabs:v}=g,h=v.indexOf(m);if(h===-1)return;let _=-1;switch(c.key){case"ArrowRight":case"ArrowDown":_=je(v,h,1);break;case"ArrowLeft":case"ArrowUp":_=je(v,h,-1);break;case"Home":_=je(v,v.length-1,1);break;case"End":_=je(v,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==h&&(c.preventDefault(),rt(e,_),v[_].focus())};s.addEventListener("keydown",b);let l=c=>{let g=c.target.closest("[role='tab']");if(!g)return;let m=le.containers.get(e);if(!m)return;let v=m.tabs.indexOf(g);v!==-1&&(rt(e,v),g.focus())};s.addEventListener("click",l),In(e,()=>{s.removeEventListener("keydown",b),s.removeEventListener("click",l),le.containers.delete(e)})}})}function pr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function fr(t){t.directive("panel",{priority:11,init(){}})}function gr(t,e={}){ur(t),pr(t),fr(t)}function mr(){dr()}var H={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function br(){H.branches.clear(),H.selectedItem=null,H.typeahead="",H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null)}function ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function nt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function hr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function vr(t){return t.closest('[role="tree"]')}function Fn(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function yr(t){t.directive("tree",{priority:15,init(e){ye(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function xr(t){t.directive("branch",{priority:16,init(e,r,o){ye();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=vr(e);if(i){let l=i.querySelector('[role="treeitem"]');e.setAttribute("tabindex",l===e?"0":"-1")}else e.setAttribute("tabindex","0");let a=!1;queueMicrotask(()=>{if(a)return;let l=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);l?(H.branches.set(e,{expanded:n,subtreeEl:l}),l.setAttribute("aria-hidden",String(!n))):H.branches.set(e,{expanded:n,subtreeEl:null})});function s(l){let c=H.selectedItem;c&&c!==l&&(c.classList.remove("nojs-branch-selected"),c.setAttribute("aria-selected","false")),l.classList.add("nojs-branch-selected"),l.setAttribute("aria-selected","true"),H.selectedItem=l}function d(l){let c=H.branches.get(l);!c||!c.subtreeEl||(c.expanded=!c.expanded,l.setAttribute("aria-expanded",String(c.expanded)),c.subtreeEl.setAttribute("aria-hidden",String(!c.expanded)))}function p(l){let c=H.branches.get(l);!c||!c.subtreeEl||c.expanded||(c.expanded=!0,l.setAttribute("aria-expanded","true"),c.subtreeEl.setAttribute("aria-hidden","false"))}function f(l){let c=H.branches.get(l);!c||!c.subtreeEl||!c.expanded||(c.expanded=!1,l.setAttribute("aria-expanded","false"),c.subtreeEl.setAttribute("aria-hidden","true"))}let u=l=>{l.target!==e&&!e.contains(l.target)||(l.stopPropagation(),s(e),d(e))};e.addEventListener("click",u),nt(e,()=>e.removeEventListener("click",u));let b=l=>{let c=vr(e);if(!c)return;let g=hr(c),m=g.indexOf(e),v=H.branches.get(e),h=v&&v.subtreeEl;switch(l.key){case"ArrowRight":if(l.preventDefault(),h&&!v.expanded)p(e);else if(h&&v.expanded){let _=v.subtreeEl.querySelector('[role="treeitem"]');_&&ue(_,g)}break;case"ArrowLeft":if(l.preventDefault(),h&&v.expanded)f(e);else{let _=e.parentElement?.closest('[role="treeitem"]');_&&ue(_,hr(c))}break;case"ArrowDown":l.preventDefault(),m<g.length-1&&ue(g[m+1],g);break;case"ArrowUp":l.preventDefault(),m>0&&ue(g[m-1],g);break;case"Enter":case" ":l.preventDefault(),s(e),d(e);break;case"Home":l.preventDefault(),g.length>0&&ue(g[0],g);break;case"End":l.preventDefault(),g.length>0&&ue(g[g.length-1],g);break;default:if(l.key.length===1&&!l.ctrlKey&&!l.altKey&&!l.metaKey){l.preventDefault(),H.typeahead+=l.key.toLowerCase(),H.typeaheadTimer&&clearTimeout(H.typeaheadTimer),H.typeaheadTimer=setTimeout(()=>{H.typeahead="",H.typeaheadTimer=null},500);let _=m+1;for(let x=0;x<g.length;x++){let E=(_+x)%g.length;if(Fn(g[E]).startsWith(H.typeahead)){ue(g[E],g);break}}}break}};e.addEventListener("keydown",b),nt(e,()=>e.removeEventListener("keydown",b)),nt(e,()=>{a=!0,H.branches.delete(e),H.selectedItem===e&&(H.selectedItem=null)})}})}function ue(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Er(t){t.directive("subtree",{priority:16,init(e){ye(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")&&(o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf"));let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=H.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function wr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ot(t){return t.closest('[role="treeitem"]')}function Rn(t){return t.closest('[role="tree"]')}function $n(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Hn(t){return $n(t).indexOf(t)}function Pn(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Ar(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var T={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function xe(){T.indicator&&(T.indicator.remove(),T.indicator=null)}function Le(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function qn(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function Mn(t,e){xe();let r=qn(),o=t.getBoundingClientRect(),n=Rn(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),T.indicator=r}function _r(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(ye(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=b=>{let l=ot(b.target);if(l&&e.contains(l)){if(l.hasAttribute("tree-drag-disabled")){b.preventDefault();return}T.dragging={el:l,treeRoot:e},b.dataTransfer&&(b.dataTransfer.effectAllowed="move",b.dataTransfer.setData("text/plain","")),l.classList.add("nojs-dragging"),l.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:l}}))}},a=b=>{if(!T.dragging||T.dragging.treeRoot!==e)return;let l=ot(b.target);if(!l||!e.contains(l)||l===T.dragging.el||Ar(l,T.dragging.el))return;b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move");let c=Pn(l,b.clientY,o);(T.currentTarget!==l||T.currentPosition!==c)&&(Le(e),xe(),T.currentTarget=l,T.currentPosition=c,c==="on"?l.classList.add("nojs-tree-drag-over"):Mn(l,c))},s=b=>{T.dragging&&T.dragging.treeRoot===e&&n++},d=b=>{T.dragging&&(n--,n<=0&&(n=0,Le(e),xe(),T.currentTarget=null,T.currentPosition=null))},p=b=>{if(b.preventDefault(),b.stopPropagation(),n=0,!T.dragging||T.dragging.treeRoot!==e)return;let l=T.dragging.el,c=T.currentTarget,g=T.currentPosition;if(Le(e),xe(),!c||!g){T.dragging=null,T.currentTarget=null,T.currentPosition=null;return}if(c===l||Ar(c,l)){T.dragging=null,T.currentTarget=null,T.currentPosition=null;return}if(g==="on"){let m=c.querySelector(':scope > [role="group"]');m||(m=c.nextElementSibling?.matches?.('[role="group"]')?c.nextElementSibling:null),m?m.setAttribute("aria-hidden","false"):(m=document.createElement("ul"),m.setAttribute("role","group"),m.setAttribute("subtree",""),m.classList.add("nojs-subtree","nojs-tree"),m.setAttribute("aria-hidden","false"),c.appendChild(m));let v=H.branches.get(c);v&&(v.expanded=!0,v.subtreeEl=m,c.setAttribute("aria-expanded","true")),m.appendChild(l),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:l,newParent:c}}))}else{let m=c.parentElement;if(!m){T.dragging=null,T.currentTarget=null,T.currentPosition=null;return}if(g==="before")m.insertBefore(l,c);else{let h=c.nextElementSibling,_=h?.matches?.('[role="group"]')?h.nextElementSibling:h;_?m.insertBefore(l,_):m.appendChild(l)}let v=Hn(l);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:l,newIndex:v}}))}T.dragging=null,T.currentTarget=null,T.currentPosition=null},f=b=>{let l=ot(b.target);l&&l.classList.remove("nojs-dragging"),Le(e),xe(),n=0,T.dragging&&T.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:T.dragging.el}})),T.dragging=null,T.currentTarget=null,T.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",a),e.addEventListener("dragenter",s),e.addEventListener("dragleave",d),e.addEventListener("drop",p),e.addEventListener("dragend",f),wr(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",a),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",d),e.removeEventListener("drop",p),e.removeEventListener("dragend",f),Le(e),xe()}),zn(e);let u=new MutationObserver(b=>{for(let l of b)for(let c of l.addedNodes){if(c.nodeType!==1)continue;c.getAttribute("role")==="treeitem"&&it(c);let g=c.querySelectorAll?.('[role="treeitem"]');if(g)for(let m of g)it(m)}});u.observe(e,{childList:!0,subtree:!0}),wr(e,()=>u.disconnect())}})}function it(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function zn(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)it(r)}function jr(t,e={}){yr(t),xr(t),Er(t),_r(t)}function Lr(){br()}var Pe=new Map;function kr(){Pe.clear()}function qe(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Cr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function Sr(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Tr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function On(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Dr(t){t.directive("stepper",{priority:14,init(e,r,o){qe();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let a=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",d=e.getAttribute("stepper-indicator")!=="false",p=e.getAttribute("stepper-nav")!=="false",f=e.getAttribute("aria-label")||"Stepper",u=Math.max(0,Math.min(a,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",f),e.classList.add("nojs-stepper");let b=null,l=[];d&&(b=document.createElement("div"),b.className="nojs-stepper-indicator",b.setAttribute("role","tablist"),b.setAttribute("aria-label","Progress"),i.forEach((w,L)=>{if(L>0){let U=document.createElement("div");U.className="nojs-stepper-separator",U.setAttribute("aria-hidden","true"),b.appendChild(U)}let D=document.createElement("button");D.type="button",D.className="nojs-stepper-indicator-item",D.setAttribute("role","tab"),D.setAttribute("aria-selected",L===u?"true":"false");let j=w.getAttribute("step-label")||`Step ${L+1}`,P=document.createElement("span");P.textContent=j,D.appendChild(P),D.setAttribute("aria-label",j);let V=`nojs-stepper-tab-${Vn++}`;D.id=V,s==="free"?(D.setAttribute("data-clickable",""),D.addEventListener("click",()=>E(L))):D.setAttribute("tabindex","-1"),b.appendChild(D),l.push(D)}),b.addEventListener("keydown",w=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(w.key))return;w.preventDefault();let L=u;w.key==="ArrowRight"?L=Math.min(u+1,i.length-1):w.key==="ArrowLeft"?L=Math.max(u-1,0):w.key==="Home"?L=0:w.key==="End"&&(L=i.length-1),s==="free"&&E(L),l[L]?.focus()}),e.insertBefore(b,e.firstChild));let c=null,g=null,m=null;p&&(c=document.createElement("div"),c.className="nojs-stepper-nav",c.setAttribute("aria-hidden","true"),g=document.createElement("button"),g.type="button",g.className="nojs-stepper-prev",g.textContent="Previous",g.addEventListener("click",()=>x()),m=document.createElement("button"),m.type="button",m.className="nojs-stepper-next",m.textContent="Next",m.addEventListener("click",()=>_()),c.appendChild(g),c.appendChild(m),e.appendChild(c));function v(w){let L=i[w];if(!L)return!0;if(!Cr(L,t.findContext)){let P=L.querySelector("form[validate]");return P&&(Sr(P),l[w]&&l[w].classList.add("nojs-step-invalid"),Tr(e,L,P)),!1}l[w]&&l[w].classList.remove("nojs-step-invalid");let D=L.querySelectorAll("[required]");for(let P of D)if(typeof P.checkValidity=="function"&&!P.checkValidity())return P.reportValidity(),!1;let j=L.getAttribute("step-validate");if(j)try{if(!t.evaluate(j,n))return!1}catch(P){return console.warn(`[stepper] step-validate error: ${P.message}`),!1}return!0}function h(){i.forEach((w,L)=>{let D=L===u;w.setAttribute("aria-hidden",D?"false":"true"),D?(w.removeAttribute("inert"),w.setAttribute("aria-current","step")):(w.setAttribute("inert",""),w.removeAttribute("aria-current"))}),l.length&&l.forEach((w,L)=>{w.setAttribute("aria-selected",L===u?"true":"false"),L<u?w.setAttribute("data-completed",""):w.removeAttribute("data-completed"),w.setAttribute("tabindex",L===u?"0":"-1");let D=i[L];D.id&&(w.setAttribute("aria-controls",D.id),D.setAttribute("aria-labelledby",w.id))}),g&&(g.disabled=u===0),m&&(m.textContent=u===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:u,total:i.length}}))}function _(){return u>=i.length-1||s==="linear"&&!v(u)?!1:(u++,h(),A(),!0)}function x(){return u<=0?!1:(u--,h(),A(),!0)}function E(w){if(w<0||w>=i.length||w===u)return!1;if(s==="linear"&&w>u){for(let L=u;L<w;L++)if(!v(L))return!1}return u=w,h(),A(),!0}let k={get current(){return u},get total(){return i.length},next:_,prev:x,goTo:E,get isFirst(){return u===0},get isLast(){return u===i.length-1}};function A(){n.$stepper=k}A(),Pe.set(e,{current:u,steps:i,mode:s,indicatorEl:b,navEl:c}),h(),On(e,()=>{Pe.delete(e),b&&b.parentNode&&b.remove(),c&&c.parentNode&&c.remove(),delete n.$stepper})}})}var Vn=0;var Wn=0;function Ir(t){t.directive("step",{priority:13,init(e,r,o){qe(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Wn++}`),e.setAttribute("tabindex","0")}})}function Br(t,e={}){Ir(t),Dr(t)}function Fr(){kr()}function Rr(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function $r(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Hr(t){t.directive("skeleton",{priority:10,init(e,r,o){Rr();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",a=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),d=[];function p(m){f();for(let v=0;v<m;v++){let h=document.createElement("div");h.className="nojs-skeleton-line",e.appendChild(h),d.push(h)}}function f(){for(let m of d)m.parentNode===e&&e.removeChild(m);d=[]}function u(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let m=s+(String(s).match(/\d$/)?"px":"");e.style.width=m,e.style.height=m}if(a){let m=parseInt(a,10);m>0&&p(m)}e.setAttribute("aria-busy","true")}function b(){e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let m=!1,v=()=>{m||(m=!0,e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",v))};e.addEventListener("transitionend",v),setTimeout(v,500)}let l=!1;function c(){let m=!!t.evaluate(o,n);m&&!l?(l=!0,u()):!m&&l&&(l=!1,b())}c();let g=n.$watch(c);$r(e,g),$r(e,()=>{l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),f(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function Pr(t,e={}){Hr(t)}var pe=new Map,O=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function qr(){pe.clear(),O.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Me(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Gn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Mr(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){return e==="horizontal"?t.offsetWidth:t.offsetHeight}function Yn(t,e){let o=(pe.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function ze(t,e){let r=O.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Oe(t,e,r,o){let n=Z(e,o),i=Z(r,o),a=O.get(e),s=O.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",a?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function st(t){let e=t.getAttribute("split-persist");if(!e)return;let r=pe.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function Un(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=pe.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,a)=>{i&&(n.panes[a].style.flexBasis=i,n.panes[a].style.flexGrow="0")}),!0)}catch{return!1}}function Kn(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let a=l=>{if(l.button!==0)return;l.preventDefault();let c=Yn(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=l[Mr(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=c,document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(l.pointerId)},s=l=>{if(!C.active||C.gutterEl!==i)return;let c=l[Mr(C.direction)]-C.startPos,g=ze(C.startPrevSize+c,C.prevPane),m=ze(C.startNextSize-c,C.nextPane),v=C.startPrevSize+C.startNextSize;g+m!==v&&(g!==C.startPrevSize+c?m=v-g:g=v-m),C.prevPane.style.flexBasis=`${g}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${m}px`,C.nextPane.style.flexGrow="0",Oe(i,C.prevPane,C.nextPane,C.direction)},d=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",st(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",a),i.addEventListener("pointermove",s),i.addEventListener("pointerup",d),i.addEventListener("pointercancel",d);let p=10,f=l=>{let c=e==="horizontal",g=0;if(c&&l.key==="ArrowRight"||!c&&l.key==="ArrowDown")g=p;else if(c&&l.key==="ArrowLeft"||!c&&l.key==="ArrowUp")g=-p;else if(l.key==="Home")g=(O.get(r)?.min||0)-Z(r,e);else if(l.key==="End"){let E=O.get(o);g=Z(r,e)+Z(o,e)-(E?.min||0)-Z(r,e)}else return;l.preventDefault();let m=Z(r,e),v=Z(o,e),h=m+v,_=ze(m+g,r),x=ze(h-_,o);_=h-x,r.style.flexBasis=`${_}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Oe(i,r,o,e),st(t)};i.addEventListener("keydown",f);let u=()=>{let l=O.get(r),c=O.get(o),g=l?.collapsible?r:c?.collapsible?o:null;if(!g)return;let m=O.get(g);if(!m)return;let v=g===r?o:r,h=Z(r,e)+Z(o,e);if(m.collapsed){m.collapsed=!1,g.removeAttribute("data-collapsed");let _=m.preCollapseSize||`${Math.round(h/2)}px`;g.style.flexBasis=_,g.style.flexGrow="0",v.style.flexBasis=`${h-parseFloat(_)}px`,v.style.flexGrow="0"}else m.preCollapseSize=g.style.flexBasis||`${Z(g,e)}px`,m.collapsed=!0,g.setAttribute("data-collapsed","true"),g.style.flexBasis="0px",g.style.flexGrow="0",v.style.flexBasis=`${h}px`,v.style.flexGrow="0";Oe(i,r,o,e),st(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:g,collapsed:m.collapsed}}))};return i.addEventListener("dblclick",u),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",a),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",d),i.removeEventListener("pointercancel",d),i.removeEventListener("keydown",f),i.removeEventListener("dblclick",u)}}}function zr(t){t.directive("split",{priority:14,init(e,r,o){Me();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let a=Array.from(e.children).filter(f=>f.hasAttribute("pane"));if(a.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${a.length}.`);return}a.forEach(f=>{O.get(f)||O.set(f,{size:f.getAttribute("pane")||null,min:parseInt(f.getAttribute("pane-min"),10)||0,max:parseInt(f.getAttribute("pane-max"),10)||1/0,collapsible:f.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],d=[];for(let f=0;f<a.length-1;f++){let{gutter:u,cleanup:b}=Kn(e,n,a[f],a[f+1],i);a[f].after(u),s.push(u),d.push(b)}pe.set(e,{direction:n,gutterSize:i,panes:a,gutters:s}),Un(e)||a.forEach(f=>{let b=O.get(f)?.size;b?(f.style.flexBasis=b,f.style.flexGrow="0"):(f.style.flexGrow="1",f.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((f,u)=>{Oe(f,a[u],a[u+1],n)})}),Gn(e,()=>{d.forEach(f=>f()),s.forEach(f=>f.remove()),pe.delete(e),a.forEach(f=>O.delete(f)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Xn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Or(t){t.directive("pane",{priority:15,init(e,r,o){Me(),e.classList.add("nojs-pane"),O.has(e)||O.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=O.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Xn(e,()=>{e.classList.remove("nojs-pane"),O.delete(e),e.style.removeProperty("minWidth"),e.style.removeProperty("minHeight"),e.style.removeProperty("maxWidth"),e.style.removeProperty("maxHeight"),e.style.removeProperty("flexBasis"),e.style.removeProperty("flexGrow")})}})}function Vr(t,e={}){zr(t),Or(t)}function Wr(){qr()}var Ee={sorts:new Map};function Gr(){Ee.sorts.clear()}function fe(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Zn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qn(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?o=r:o=r.querySelector("[each]")||r.querySelector("[foreach]"),!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Nn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Yr(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function Kr(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return Number(t)-Number(e);case"date":return new Date(t).getTime()-new Date(e).getTime();default:return String(t).localeCompare(String(e))}}function Jn(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Xr(t){t.directive("sortable",{priority:10,init(e){fe(),e.classList.add("nojs-sortable")}})}function Zr(t){t.directive("sort",{priority:11,init(e,r,o){fe();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",a=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;Ee.sorts.has(s)||Ee.sorts.set(s,{column:null,direction:null}),(a==="asc"||a==="desc")&&Ur(e,s,n,i,a,t);let d=()=>{let p=Ee.sorts.get(s),f;p.column!==n?f="asc":p.direction==="asc"?f="desc":p.direction==="desc"?f=null:f="asc",Ur(e,s,n,i,f,t)};e.addEventListener("click",d),Zn(e,()=>{e.removeEventListener("click",d),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function Ur(t,e,r,o,n,i){let a=Ee.sorts.get(e);Jn(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),a.column=r,a.direction=n):(a.column=null,a.direction=null);let s=Qn(e,i);if(s){let d=i.findContext(e),p=d?Nn(d,s.arrayPath):null;if(Array.isArray(p)){if(!n){let u=e._nojsOriginalOrder;if(u){let b=new Set(p),l=u.filter(c=>b.has(c));for(let c of p)u.includes(c)||l.push(c);Yr(d,s.arrayPath,l)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...p]);let f=[...p].sort((u,b)=>{let l=u!=null?u[r]:null,c=b!=null?b[r]:null,g=Kr(l,c,o);return n==="desc"?-g:g});Yr(d,s.arrayPath,f);return}}eo(e,t,r,o,n)}function eo(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let d=[...e.closest("tr").children].indexOf(e);if(d<0)return;let p=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...p]),!n){let u=document.createDocumentFragment();for(let b of t._nojsOriginalRows)u.appendChild(b);i.appendChild(u);return}p.sort((u,b)=>{let l=u.children[d]?.textContent?.trim()||"",c=b.children[d]?.textContent?.trim()||"",g=Kr(o==="number"?parseFloat(l.replace(/[^0-9.\-]/g,""))||0:l,o==="number"?parseFloat(c.replace(/[^0-9.\-]/g,""))||0:c,o);return n==="desc"?-g:g});let f=document.createDocumentFragment();for(let u of p)f.appendChild(u);i.appendChild(f)}function Qr(t){t.directive("fixed-header",{priority:10,init(e){fe(),e.classList.add("nojs-fixed-header")}})}function Nr(t){t.directive("fixed-col",{priority:10,init(e){fe(),e.classList.add("nojs-fixed-col")}})}function at(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Jr(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function en(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function tn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function rn(t){t.directive("table-reorder",{priority:15,init(e){if(fe(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",a=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,d=null,p=null;function f(){let m=r.querySelectorAll(":scope > tr");for(let v=0;v<m.length;v++){let h=m[v];if(h._nojsReorderSetup)continue;h._nojsReorderSetup=!0,h.draggable=!0,h.setAttribute("aria-grabbed","false");let _=!0;if(n){let L=D=>{_=!!D.target.closest(n)};h.addEventListener("mousedown",L),at(h,()=>h.removeEventListener("mousedown",L))}let x=L=>{if(n&&!_){L.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(h),d=h,L.dataTransfer&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(j=>h.classList.add(j)),h.setAttribute("aria-grabbed","true")},E=L=>{if(d==null)return;L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let D=h.getBoundingClientRect(),j=D.top+D.height/2,V=[...r.querySelectorAll(":scope > tr")].indexOf(h);u(),V!==s&&(L.clientY<j?h.classList.add("nojs-reorder-insert-before"):h.classList.add("nojs-reorder-insert-after"),p=h)},k=()=>{h.classList.remove("nojs-reorder-insert-before"),h.classList.remove("nojs-reorder-insert-after"),p===h&&(p=null)},A=L=>{if(L.preventDefault(),L.stopPropagation(),d==null||s==null)return;let D=[...r.querySelectorAll(":scope > tr")],j=h.getBoundingClientRect(),P=j.top+j.height/2,V=D.indexOf(h);L.clientY>=P&&V++;let U=s;if(U===V||U+1===V){b();return}let W=U<V?V-1:V,se=Jr(e);if(se&&o){let S=en(o,se.arrayPath);if(Array.isArray(S)){let B=[...S],[$]=B.splice(U,1);B.splice(W,0,$),tn(o,se.arrayPath,B),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...B]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:U,to:W,item:$}}))}}else{let S=d,B=D[W];S&&B&&(U<W?r.insertBefore(S,B.nextSibling):r.insertBefore(S,B),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:U,to:W,item:null}})))}b()},w=()=>{b()};h.addEventListener("dragstart",x),h.addEventListener("dragover",E),h.addEventListener("dragleave",k),h.addEventListener("drop",A),h.addEventListener("dragend",w),at(h,()=>{h.removeEventListener("dragstart",x),h.removeEventListener("dragover",E),h.removeEventListener("dragleave",k),h.removeEventListener("drop",A),h.removeEventListener("dragend",w),h._nojsReorderSetup=!1})}}function u(){p&&(p.classList.remove("nojs-reorder-insert-before"),p.classList.remove("nojs-reorder-insert-after"),p=null)}function b(){d&&(i.split(/\s+/).filter(Boolean).forEach(v=>d.classList.remove(v)),d.setAttribute("aria-grabbed","false")),u(),s=null,d=null;let m=r.querySelectorAll(":scope > tr");for(let v of m)v.classList.remove("nojs-reorder-insert-before"),v.classList.remove("nojs-reorder-insert-after"),a.split(/\s+/).filter(Boolean).forEach(h=>v.classList.remove(h))}let l=m=>{d!=null&&(m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move"))},c=m=>{if(d==null||m.target!==r)return;m.preventDefault(),m.stopPropagation();let v=s,_=[...r.querySelectorAll(":scope > tr")].length-1;if(v===_){b();return}let x=Jr(e);if(x&&o){let E=en(o,x.arrayPath);if(Array.isArray(E)){let k=[...E],[A]=k.splice(v,1);k.push(A),tn(o,x.arrayPath,k),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...k]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:v,to:k.length-1,item:A}}))}}b()};r.addEventListener("dragover",l),r.addEventListener("drop",c);let g=new MutationObserver(()=>{f()});g.observe(r,{childList:!0}),f(),at(e,()=>{g.disconnect(),r.removeEventListener("dragover",l),r.removeEventListener("drop",c),b()})}})}function nn(t,e={}){Xr(t),Zr(t),Qr(t),Nr(t),rn(t)}function on(){Gr()}var to="[validate],[drag],[drop],[drag-list],[drag-multiple]";function sn(t){if(typeof document>"u")return;let e=document.querySelectorAll(to);for(let r of e){if(!r.__declared)continue;let o=K(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var ro={name:"nojs-elements",install(t,e={}){ht(t,e),kt(t,e),It(t,e),$t(t,e),Gt(t,e),Jt(t,e),sr(t,e),gr(t,e),jr(t,e),Br(t,e),Pr(t,e),Vr(t,e),nn(t,e),sn(t)},init(t){sn(t)},dispose(t){vt(),Ct(),Bt(),Ht(),Yt(),er(),ar(),mr(),Lr(),Fr(),Wr(),on()}},dt=ro;typeof window<"u"&&(window.NoJSElements=dt,window.NoJS&&typeof window.NoJS.use=="function"&&window.NoJS.use(dt));})();
//# sourceMappingURL=nojs-elements.js.map
