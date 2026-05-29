/**
 * NoJS Elements v1.12.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
(()=>{var V=new Map,C=new Map;function xt(){for(let e of C.values())clearTimeout(e);C.clear();for(let e of V.values())e.remove();V.clear()}function wt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function Re(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Z=8;function Oe(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,d=window.innerHeight,s,l;switch(r){case"bottom":s=i.bottom+Z,l=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,l=i.left-o.width-Z;break;case"right":s=i.top+(i.height-o.height)/2,l=i.right+Z;break;default:s=i.top-o.height-Z,l=i.left+(i.width-o.width)/2;break}l<4&&(l=4),l+o.width>n-4&&(l=n-o.width-4),s<4&&(s=4),s+o.height>d-4&&(s=d-o.height-4),e.style.top=`${s}px`,e.style.left=`${l}px`}var Ge=0;function We(e,t,r){document.body.appendChild(t),Oe(t,e,r),t.setAttribute("aria-hidden","false")}function Ne(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function At(e){e.directive("tooltip",{priority:20,init(t,r,i){wt();let o=i;if(!o){console.warn("[tooltip] attribute value (tooltip text) is required.");return}let n=t.getAttribute("tooltip-position")||"top",d=parseInt(t.getAttribute("tooltip-delay"),10)||300,s=t.getAttribute("tooltip-disabled"),l=s?e.findContext(t):null,f=`nojs-tooltip-${++Ge}`,u=document.createElement("div");u.className="nojs-tooltip",u.setAttribute("role","tooltip"),u.setAttribute("id",f),u.setAttribute("aria-hidden","true"),u.textContent=o,t.setAttribute("aria-describedby",f),V.set(t,u);let m=()=>{if(s&&l&&e.evaluate(s,l))return;C.has(t)&&clearTimeout(C.get(t));let y=setTimeout(()=>{C.delete(t),!(s&&l&&e.evaluate(s,l))&&We(t,u,n)},d);C.set(t,y)},g=()=>{C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),Ne(t,u)},p=()=>m(),a=()=>g(),c=()=>m(),b=()=>g(),h=y=>{y.key==="Escape"&&u.getAttribute("aria-hidden")==="false"&&g()};t.addEventListener("mouseenter",p),t.addEventListener("mouseleave",a),t.addEventListener("focusin",c),t.addEventListener("focusout",b),t.addEventListener("keydown",h),Re(t,()=>{t.removeEventListener("mouseenter",p),t.removeEventListener("mouseleave",a),t.removeEventListener("focusin",c),t.removeEventListener("focusout",b),t.removeEventListener("keydown",h),C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),u.remove(),V.delete(t)})}})}function Et(e,t={}){At(e)}function jt(){xt()}var _=new Map;function kt(){_.clear()}function Q(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function ct(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var q=8;function dt(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,d=window.innerHeight,s,l;switch(r){case"top":s=i.top-o.height-q,l=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,l=i.left-o.width-q;break;case"right":s=i.top+(i.height-o.height)/2,l=i.right+q;break;default:s=i.bottom+q,l=i.left+(i.width-o.width)/2;break}r==="bottom"&&s+o.height>d&&(s=i.top-o.height-q),r==="top"&&s<0&&(s=i.bottom+q),l<4&&(l=4),l+o.width>n-4&&(l=n-o.width-4),s<4&&(s=4),s+o.height>d-4&&(s=d-o.height-4),e.style.top=`${s}px`,e.style.left=`${l}px`}function _t(e){e.directive("popover",{priority:20,init(r,i,o){Q();let n=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",n),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let d=r.getAttribute("popover-position")||"bottom";if(!_.has(n))_.set(n,{popoverEl:r,triggerEls:new Set,position:d,open:!1});else{let l=_.get(n);l.popoverEl=r,l.position=d}let s=l=>{let f=_.get(n);if(!f)return;let u=l.newState==="open";f.open=u;for(let m of f.triggerEls)m.setAttribute("aria-expanded",String(u))};r.addEventListener("toggle",s),ct(r,()=>{r.removeEventListener("toggle",s),_.delete(n)})}}),e.directive("popover-trigger",{priority:20,init(r,i,o){Q();let n=o;if(!n){let f=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(f&&(n=f.getAttribute("data-popover-id")),!n){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",n),_.has(n)||_.set(n,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),_.get(n).triggerEls.add(r);let d=l=>{let f=_.get(n);if(!f||!f.popoverEl){console.warn(`[popover-trigger] no popover found with id "${n}".`);return}f.popoverEl.togglePopover(),requestAnimationFrame(()=>{f.popoverEl.matches(":popover-open")&&dt(f.popoverEl,r,f.position)})};r.addEventListener("click",d);let s=l=>{let f=_.get(n);l.key==="Escape"&&f?.open&&(f.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),ct(r,()=>{r.removeEventListener("click",d),document.removeEventListener("keydown",s);let l=_.get(n);l&&l.triggerEls.delete(r)})}}),e.directive("popover-dismiss",{priority:20,init(r){Q();let i=()=>{let o=r.closest(".nojs-popover");o&&o.hidePopover()};r.addEventListener("click",i),ct(r,()=>r.removeEventListener("click",i))}});let t=(r,i)=>t.open(r,i);t.open=(r,i)=>{let o=_.get(r);if(!o||!o.popoverEl)return!1;try{o.popoverEl.showPopover()}catch{return!1}let n=i||[...o.triggerEls][0];return n&&requestAnimationFrame(()=>dt(o.popoverEl,n,o.position)),!0},t.close=r=>{let i=_.get(r);if(!i||!i.popoverEl)return!1;try{i.popoverEl.hidePopover()}catch{}return!0},t.toggle=(r,i)=>{let o=_.get(r);if(!o||!o.popoverEl)return!1;o.popoverEl.togglePopover();let n=i||[...o.triggerEls][0];return n&&o.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>dt(o.popoverEl,n,o.position)),!0},e.popover=t}function St(e,t={}){_t(e)}function Lt(){kt()}var L=[],T=new Map,Ve=1e4;function Ct(){return Ve+L.length}function Tt(){L.length=0,T.clear()}function H(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function Ue(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var It='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',lt=new WeakMap;function Ke(e){let t=r=>{if(r.key!=="Tab")return;let i=[...e.querySelectorAll(It)].filter(d=>d.offsetParent!==null);if(i.length===0){r.preventDefault();return}let o=i[0],n=i[i.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),n.focus()):document.activeElement===n&&(r.preventDefault(),o.focus())};e.addEventListener("keydown",t),lt.set(e,t)}function Dt(e){let t=lt.get(e);t&&(e.removeEventListener("keydown",t),lt.delete(e))}var U=new WeakMap;function zt(e){e.directive("modal",{priority:10,init(r,i,o){H();let n=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${n}`,r.setAttribute("data-modal-id",n),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let d=r.querySelector("h1, h2, h3, h4, h5, h6");d&&(d.id||(d.id=`nojs-modal-heading-${n}`),r.setAttribute("aria-labelledby",d.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let l=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),u=g=>{g.target===r&&s!=="false"&&f!=="false"&&$(r,n)};r.addEventListener("click",u),T.set(n,r);let m=g=>{if(g.newState==="open"){if(r.style.zIndex=String(Ct()),l&&l.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{let p=r.querySelector(It);p?p.focus():r.focus()}),Ke(r),f!=="false"){let p=a=>{a.key==="Escape"&&(a.stopPropagation(),$(r,n))};r.addEventListener("keydown",p),U.set(r,p)}}else if(g.newState==="closed"){l&&l.split(/\s+/).filter(Boolean).forEach(c=>r.classList.remove(c)),Dt(r);let p=U.get(r);p&&(r.removeEventListener("keydown",p),U.delete(r));let a=L.findIndex(c=>c.id===n);if(a!==-1){let c=L[a];L.splice(a,1),c.triggerEl&&requestAnimationFrame(()=>{c.triggerEl.focus()})}}};r.addEventListener("toggle",m),Ue(r,()=>{r.removeEventListener("click",u),r.removeEventListener("toggle",m),Dt(r);let g=U.get(r);g&&(r.removeEventListener("keydown",g),U.delete(r)),T.delete(n);let p=L.findIndex(a=>a.id===n);p!==-1&&L.splice(p,1)})}});let t=r=>t.open(r);t.open=r=>{let i=T.get(r);if(!i)return!1;L.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},t.close=r=>{let i=T.get(r);return i?($(i,r),!0):!1},t.closeAll=()=>{for(let r=L.length-1;r>=0;r--)$(L[r].el,L[r].id)},e.modal=t}function $(e,t){try{e.hidePopover()}catch{}}function Ye(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ft(e){e.directive("modal-open",{priority:10,init(t,r,i){H();let o=i;if(!o){let m=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(m&&(o=m.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let n=()=>{let u=T.get(o)||document.querySelector(`[data-modal-id="${o}"]`);if(!u){console.warn(`[modal-open] modal "${o}" not found`);return}L.push({id:o,el:u,triggerEl:t}),t.setAttribute("aria-expanded","true"),u.id&&t.setAttribute("aria-controls",u.id);try{u.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`)}},d=()=>{t.setAttribute("aria-expanded","false")},s=null,l=null;requestAnimationFrame(()=>{let u=T.get(o);u&&(l=u,s=m=>{m.newState==="closed"&&t.setAttribute("aria-expanded","false")},u.addEventListener("toggle",s))}),t.addEventListener("click",n),Ye(t,()=>{t.removeEventListener("click",n),l&&s&&l.removeEventListener("toggle",s)})}})}function Xe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Pt(e){e.directive("modal-close",{priority:10,init(t,r,i){H();let o=()=>{let n,d;if(i){if(d=i,n=T.get(d),!n){console.warn(`[modal-close] modal "${d}" not found`);return}}else{if(n=t.closest("[modal]"),!n){console.warn("[modal-close] no parent modal found");return}d=n.getAttribute("modal")}$(n,d)};t.addEventListener("click",o),Xe(t,()=>{t.removeEventListener("click",o)})}})}function Mt(e,t={}){zt(e),Ft(e),Pt(e)}function Bt(){Tt()}var K={openMenus:new Map};function qt(){K.openMenus.clear()}function R(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}function Ze(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ht(e,t,r){let i=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let n=t.getBoundingClientRect(),d=e.getBoundingClientRect(),s=window.innerHeight,l=window.innerWidth,f,u;switch(i){case"top":f=n.top-d.height,u=n.left;break;case"left":f=n.top,u=n.left-d.width;break;case"right":f=n.top,u=n.right;break;default:f=n.bottom,u=n.left}i==="bottom"||i==="top"?o==="end"&&(u=n.right-d.width):o==="end"&&(f=n.bottom-d.height),i==="bottom"&&f+d.height>s&&n.top-d.height>0?f=n.top-d.height:i==="top"&&f<0&&n.bottom+d.height<=s&&(f=n.bottom),u<4&&(u=4),u+d.width>l-4&&(u=l-d.width-4),e.style.top=`${f}px`,e.style.left=`${u}px`}function ut(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function pt(e){let t=ut(e);t.length&&t[0].focus()}function $t(e){let t=ut(e);t.length&&t[t.length-1].focus()}function Rt(e){e.directive("dropdown",{priority:15,init(r){R()}}),e.directive("dropdown-toggle",{priority:15,init(r){R();let i=r.closest("[dropdown]");if(!i)return;let o=i.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${Math.random().toString(36).slice(2,7)}`),r.setAttribute("aria-controls",o.id);function n(){o.setAttribute("data-open",""),o.showPopover&&o.showPopover(),r.setAttribute("aria-expanded","true"),Ht(o,r,i),K.openMenus.set(o,{toggle:r,wrapper:i})}function d(){o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),K.openMenus.delete(o)}function s(){return r.getAttribute("aria-expanded")==="true"}let l=c=>{c.newState==="closed"&&s()&&d()};o.addEventListener("toggle",l);let f=c=>{c.preventDefault(),c.stopPropagation(),s()?d():n()};r.addEventListener("click",f);let u=c=>{s()&&!i.contains(c.target)&&d()};document.addEventListener("click",u,!0);let m=c=>{c.key==="Escape"&&s()&&(d(),r.focus())};document.addEventListener("keydown",m);let g=c=>{switch(c.key){case"Enter":case" ":c.preventDefault(),n(),pt(o);break;case"ArrowDown":c.preventDefault(),n(),pt(o);break;case"ArrowUp":c.preventDefault(),n(),$t(o);break}};r.addEventListener("keydown",g);let p=c=>{if(!(!s()||ut(o).find(y=>y===document.activeElement)))switch(c.key){case"ArrowDown":c.preventDefault(),pt(o);break;case"ArrowUp":c.preventDefault(),$t(o);break}};o.addEventListener("keydown",p);let a=()=>{s()&&Ht(o,r,i)};window.addEventListener("scroll",a,!0),window.addEventListener("resize",a),Ze(r,()=>{r.removeEventListener("click",f),r.removeEventListener("keydown",g),o.removeEventListener("keydown",p),o.removeEventListener("toggle",l),document.removeEventListener("click",u,!0),document.removeEventListener("keydown",m),window.removeEventListener("scroll",a,!0),window.removeEventListener("resize",a),K.openMenus.delete(o)})}}),e.directive("dropdown-menu",{priority:15,init(r){R(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")==="true"?!1:(n.click(),!0)},t.close=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")!=="true"?!1:(n.click(),!0)},e.dropdown=t}function Ot(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Qe(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function Gt(e){e.directive("dropdown-item",{priority:15,init(t){R();let r=t.closest("[dropdown-menu]"),i=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let o=d=>{if(!r)return;let s=Qe(r),l=s.indexOf(t);switch(d.key){case"ArrowDown":{d.preventDefault(),(l+1<s.length?s[l+1]:s[0]).focus();break}case"ArrowUp":{d.preventDefault(),(l-1>=0?s[l-1]:s[s.length-1]).focus();break}case"Home":{d.preventDefault(),s.length&&s[0].focus();break}case"End":{d.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{d.preventDefault(),t.click();break}case"Escape":{if(d.preventDefault(),r)try{r.hidePopover()}catch{}if(i){let f=i.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{if(r)try{r.hidePopover()}catch{}break}}};t.addEventListener("keydown",o),Ot(t,()=>t.removeEventListener("keydown",o));let n=()=>{if(r)try{r.hidePopover()}catch{}if(i){let d=i.querySelector("[dropdown-toggle]");d&&d.focus()}};t.addEventListener("click",n),Ot(t,()=>t.removeEventListener("click",n))}})}function Wt(e,t={}){Rt(e),Gt(e)}function Nt(){qt()}var D=new Map,O=new Set,Vt=0;function Ut(){return++Vt}function Kt(){for(let e of O)clearTimeout(e);O.clear();for(let e of D.values())e.remove();D.clear(),Vt=0}function Yt(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function ft(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Je=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function mt(){return D.size>0?D.values().next().value:tr("top-right")}function tr(e){if(D.has(e))return D.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),D.set(e,t),t}function er(e){return e.startsWith("top")}function bt(e,t,r,i,o){let n=Ut(),d=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",n),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let l=document.createElement("span");if(l.textContent=t,s.appendChild(l),o){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>J(s)),s.appendChild(f)}if(er(d)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),i>0){let f=setTimeout(()=>{O.delete(f),s.isConnected&&J(s)},i);O.add(f),s._toastTimerId=f}return s}function J(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),O.delete(e._toastTimerId)),e.remove())}function Xt(e){Yt(),e.directive("toast-container",{priority:10,init(r,i,o){let n=o&&Je.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",n),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),D.set(n,r),ft(r,()=>{D.get(n)===r&&D.delete(n)})}}),e.directive("toast",{priority:10,init(r,i,o){if(!o)return;let n=r.getAttribute("toast-type")||"info",d=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(d)?3e3:d,l=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let a=()=>{let c=mt();bt(c,o,n,s,l)};r.addEventListener("click",a),ft(r,()=>r.removeEventListener("click",a));return}let u=e.findContext(r),m;function g(){let a=e.evaluate(o,u);if(a&&a!==m){let c=typeof a=="string"?a:String(a),b=mt();bt(b,c,n,s,l),m=void 0}else m=a}let p=u.$watch(g);ft(r,p)}});let t=(r,i="info",o=3e3)=>{if(typeof document>"u")return;let n=!0,d=mt();return bt(d,String(r),i,o,n)};t.dismiss=r=>{let i=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),o=document.querySelector(`[data-toast-id="${i}"]`);o&&J(o)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>J(r))},e.toast=t}function Zt(e,t={}){Xt(e)}function Qt(){Kt()}var P={containers:new Map};function Jt(){P.containers.clear()}function te(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function rr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var or=0;function ee(e){return`${e}-${++or}`}function gt(e,t){let r=P.containers.get(e);if(!r)return;let{tabs:i,panels:o}=r;if(!(t<0||t>=i.length)&&i[t].getAttribute("aria-disabled")!=="true"){for(let n=0;n<i.length;n++)i[n].setAttribute("aria-selected","false"),i[n].setAttribute("tabindex","-1"),o[n].setAttribute("aria-hidden","true"),o[n].inert=!0;i[t].setAttribute("aria-selected","true"),i[t].setAttribute("tabindex","0"),o[t].setAttribute("aria-hidden","false"),o[t].inert=!1,r.activeIndex=t}}function Y(e,t,r){let i=e.length,o=t;for(let n=0;n<i;n++)if(o=(o+r+i)%i,e[o].getAttribute("aria-disabled")!=="true")return o;return t}function re(e){e.directive("tabs",{priority:10,init(t,r,i){te();let o=[],n=[];for(let a of Array.from(t.children))a.hasAttribute("tab")?o.push(a):a.hasAttribute("panel")&&n.push(a);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==n.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+n.length+" panels.");let d=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",d),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let l=Math.min(o.length,n.length);for(let a=0;a<l;a++){let c=o[a],b=n[a],h=c.id||ee("nojs-tab"),y=b.id||ee("nojs-panel");c.id=h,b.id=y,c.setAttribute("role","tab"),c.setAttribute("aria-selected","false"),c.setAttribute("aria-controls",y),c.setAttribute("tabindex","-1"),c.classList.add("nojs-tab"),b.setAttribute("role","tabpanel"),b.setAttribute("aria-labelledby",h),b.setAttribute("tabindex","0"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel"),s.appendChild(c)}let f=n[0];f?t.insertBefore(s,f):t.appendChild(s),P.containers.set(t,{tabs:o.slice(0,l),panels:n.slice(0,l),activeIndex:-1});let u=e.findContext(t);for(let a=0;a<l;a++){let c=o[a].getAttribute("tab-disabled");c&&e.evaluate(c,u)&&o[a].setAttribute("aria-disabled","true")}let m=0;if(i&&i.trim()!==""){let a=parseInt(i,10);!isNaN(a)&&a>=0&&a<l&&(m=a)}o[m]?.getAttribute("aria-disabled")==="true"&&(m=Y(o.slice(0,l),m,1)),gt(t,m);let g=a=>{let c=P.containers.get(t);if(!c)return;let b=a.target;if(b.getAttribute("role")!=="tab")return;let{tabs:h}=c,y=h.indexOf(b);if(y===-1)return;let A=-1;switch(a.key){case"ArrowRight":case"ArrowDown":A=Y(h,y,1);break;case"ArrowLeft":case"ArrowUp":A=Y(h,y,-1);break;case"Home":A=Y(h,h.length-1,1);break;case"End":A=Y(h,0,-1);break;case"Tab":return;default:return}A!==-1&&A!==y&&(a.preventDefault(),gt(t,A),h[A].focus())};s.addEventListener("keydown",g);let p=a=>{let c=a.target.closest("[role='tab']");if(!c)return;let b=P.containers.get(t);if(!b)return;let h=b.tabs.indexOf(c);h!==-1&&(gt(t,h),c.focus())};s.addEventListener("click",p),rr(t,()=>{s.removeEventListener("keydown",g),s.removeEventListener("click",p),P.containers.delete(t)})}})}function oe(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function ne(e){e.directive("panel",{priority:11,init(){}})}function ie(e,t={}){re(e),oe(e),ne(e)}function se(){Jt()}var w={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function ae(){w.branches.clear(),w.selectedItem=null,w.typeahead="",w.typeaheadTimer&&(clearTimeout(w.typeaheadTimer),w.typeaheadTimer=null)}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function ht(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ce(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)t.push(i);return t}function de(e){return e.closest('[role="tree"]')}function nr(e){let t=e.parentElement?.closest('[role="group"], .nojs-subtree');if(t){let r=t.parentElement?.closest('[role="treeitem"]');if(r)return r;let i=t.previousElementSibling;if(i?.matches?.('[role="treeitem"]'))return i}return e.parentElement?.closest('[role="treeitem"]')||null}function ir(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(t.textContent||"").trim().toLowerCase()}function le(e){e.directive("tree",{priority:15,init(t){tt(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function pe(e){e.directive("branch",{priority:16,init(t,r,i){tt();let o=i==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(o));let n=de(t);if(n){let p=n.querySelector('[role="treeitem"][tabindex="0"]');t.setAttribute("tabindex",p?"-1":"0")}else t.setAttribute("tabindex","0");let d=!1;queueMicrotask(()=>{if(d)return;let p=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);p?(w.branches.set(t,{expanded:o,subtreeEl:p}),p.setAttribute("aria-hidden",String(!o))):w.branches.set(t,{expanded:o,subtreeEl:null})});function s(p){let a=w.selectedItem;a&&a!==p&&(a.classList.remove("nojs-branch-selected"),a.setAttribute("aria-selected","false")),p.classList.add("nojs-branch-selected"),p.setAttribute("aria-selected","true"),w.selectedItem=p}function l(p){let a=w.branches.get(p);!a||!a.subtreeEl||(a.expanded=!a.expanded,p.setAttribute("aria-expanded",String(a.expanded)),a.subtreeEl.setAttribute("aria-hidden",String(!a.expanded)))}function f(p){let a=w.branches.get(p);!a||!a.subtreeEl||a.expanded||(a.expanded=!0,p.setAttribute("aria-expanded","true"),a.subtreeEl.setAttribute("aria-hidden","false"))}function u(p){let a=w.branches.get(p);!a||!a.subtreeEl||!a.expanded||(a.expanded=!1,p.setAttribute("aria-expanded","false"),a.subtreeEl.setAttribute("aria-hidden","true"))}let m=p=>{p.target.closest?.('[role="treeitem"]')===t&&(p.stopPropagation(),s(t),l(t))};t.addEventListener("click",m),ht(t,()=>t.removeEventListener("click",m));let g=p=>{let a=de(t);if(!a)return;let c=ce(a),b=c.indexOf(t),h=w.branches.get(t),y=h&&h.subtreeEl;switch(p.key){case"ArrowRight":if(p.preventDefault(),y&&!h.expanded)f(t);else if(y&&h.expanded){let A=h.subtreeEl.querySelector('[role="treeitem"]');A&&M(A,c)}break;case"ArrowLeft":if(p.preventDefault(),y&&h.expanded)u(t);else{let A=nr(t);A&&M(A,ce(a))}break;case"ArrowDown":p.preventDefault(),b<c.length-1&&M(c[b+1],c);break;case"ArrowUp":p.preventDefault(),b>0&&M(c[b-1],c);break;case"Enter":case" ":p.preventDefault(),s(t),l(t);break;case"Home":p.preventDefault(),c.length>0&&M(c[0],c);break;case"End":p.preventDefault(),c.length>0&&M(c[c.length-1],c);break;default:if(p.key.length===1&&!p.ctrlKey&&!p.altKey&&!p.metaKey){p.preventDefault(),w.typeahead+=p.key.toLowerCase(),w.typeaheadTimer&&clearTimeout(w.typeaheadTimer),w.typeaheadTimer=setTimeout(()=>{w.typeahead="",w.typeaheadTimer=null},500);let A=b+1;for(let I=0;I<c.length;I++){let z=(A+I)%c.length;if(ir(c[z]).startsWith(w.typeahead)){M(c[z],c);break}}}break}};t.addEventListener("keydown",g),ht(t,()=>t.removeEventListener("keydown",g)),ht(t,()=>{d=!0,w.branches.delete(t),w.selectedItem===t&&(w.selectedItem=null),w.typeaheadTimer&&(clearTimeout(w.typeaheadTimer),w.typeaheadTimer=null,w.typeahead="")})}})}function M(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function ue(e){e.directive("subtree",{priority:16,init(t){tt(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let i of t.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let i=w.branches.get(r);i?(t.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function fe(e,t={}){le(e),pe(e),ue(e)}function me(){ae()}var et=new Map;function be(){et.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
.nojs-step[aria-hidden="true"] {
  display: none;
}
.nojs-stepper-nav {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function sr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ge(e){e.directive("stepper",{priority:14,init(t,r,i){rt();let o=e.findContext(t),n=Array.from(t.querySelectorAll("[step]"));if(!n.length){console.warn("[stepper] No [step] children found.");return}let d=i&&parseInt(i,10)||0,s=t.getAttribute("stepper-mode")||"linear",l=t.getAttribute("stepper-indicator")!=="false",f=t.getAttribute("stepper-nav")!=="false",u=t.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(d,n.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",u),t.classList.add("nojs-stepper");let g=null,p=[];l&&(g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),n.forEach((x,E)=>{if(E>0){let at=document.createElement("div");at.className="nojs-stepper-separator",at.setAttribute("aria-hidden","true"),g.appendChild(at)}let j=document.createElement("button");j.type="button",j.className="nojs-stepper-indicator-item",j.setAttribute("role","tab"),j.setAttribute("aria-selected",E===m?"true":"false");let N=x.getAttribute("step-label")||`Step ${E+1}`,F=document.createElement("span");F.textContent=N,j.appendChild(F),j.setAttribute("aria-label",N);let $e=`nojs-stepper-tab-${ar++}`;j.id=$e,s==="free"?(j.setAttribute("data-clickable",""),j.addEventListener("click",()=>z(E))):j.setAttribute("tabindex","-1"),g.appendChild(j),p.push(j)}),g.addEventListener("keydown",x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let E=m;x.key==="ArrowRight"?E=Math.min(m+1,n.length-1):x.key==="ArrowLeft"?E=Math.max(m-1,0):x.key==="Home"?E=0:x.key==="End"&&(E=n.length-1),s==="free"&&z(E),p[E]?.focus()}),t.insertBefore(g,t.firstChild));let a=null,c=null,b=null;f&&(a=document.createElement("div"),a.className="nojs-stepper-nav",a.setAttribute("aria-hidden","true"),c=document.createElement("button"),c.type="button",c.className="nojs-stepper-prev",c.textContent="Previous",c.addEventListener("click",()=>I()),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-next",b.textContent="Next",b.addEventListener("click",()=>A()),a.appendChild(c),a.appendChild(b),t.appendChild(a));function h(x){let E=n[x];if(!E)return!0;let j=E.querySelectorAll("[required]");for(let F of j)if(typeof F.checkValidity=="function"&&!F.checkValidity())return F.reportValidity(),!1;let N=E.getAttribute("step-validate");if(N)try{if(!e.evaluate(N,o))return!1}catch(F){return console.warn(`[stepper] step-validate error: ${F.message}`),!1}return!0}function y(){n.forEach((x,E)=>{let j=E===m;x.setAttribute("aria-hidden",j?"false":"true"),j?(x.removeAttribute("inert"),x.setAttribute("aria-current","step")):(x.setAttribute("inert",""),x.removeAttribute("aria-current"))}),p.length&&p.forEach((x,E)=>{x.setAttribute("aria-selected",E===m?"true":"false"),E<m?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",E===m?"0":"-1");let j=n[E];j.id&&(x.setAttribute("aria-controls",j.id),j.setAttribute("aria-labelledby",x.id))}),c&&(c.disabled=m===0),b&&(b.textContent=m===n.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:m,total:n.length}}))}function A(){return m>=n.length-1||s==="linear"&&!h(m)?!1:(m++,y(),W(),!0)}function I(){return m<=0?!1:(m--,y(),W(),!0)}function z(x){if(x<0||x>=n.length||x===m)return!1;if(s==="linear"&&x>m){for(let E=m;E<x;E++)if(!h(E))return!1}return m=x,y(),W(),!0}let st={get current(){return m},get total(){return n.length},next:A,prev:I,goTo:z,get isFirst(){return m===0},get isLast(){return m===n.length-1}};function W(){o.$stepper=st}W(),et.set(t,{current:m,steps:n,mode:s,indicatorEl:g,navEl:a}),y(),sr(t,()=>{et.delete(t),g&&g.parentNode&&g.remove(),a&&a.parentNode&&a.remove(),delete o.$stepper})}})}var ar=0;var cr=0;function he(e){e.directive("step",{priority:13,init(t,r,i){rt(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${cr++}`),t.setAttribute("tabindex","0")}})}function ve(e,t={}){he(e),ge(e)}function ye(){be()}function xe(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function we(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ae(e){e.directive("skeleton",{priority:10,init(t,r,i){xe();let o=e.findContext(t),n=t.getAttribute("skeleton-type")||"text",d=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),l=[];function f(b){u();for(let h=0;h<b;h++){let y=document.createElement("div");y.className="nojs-skeleton-line",t.appendChild(y),l.push(y)}}function u(){for(let b of l)b.parentNode===t&&t.removeChild(b);l=[]}function m(){if(t.classList.add("nojs-skeleton"),n==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(n==="circle"||n==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");t.style.width=b,t.style.height=b}if(d){let b=parseInt(d,10);b>0&&f(b)}t.setAttribute("aria-busy","true")}function g(){t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),u(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let b=!1,h=()=>{b||(b=!0,t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",h))};t.addEventListener("transitionend",h),setTimeout(h,500)}let p=!1;function a(){let b=!!e.evaluate(i,o);b&&!p?(p=!0,m()):!b&&p&&(p=!1,g())}a();let c=o.$watch(a);we(t,c),we(t,()=>{p&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),u(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""))})}})}function Ee(e,t={}){Ae(e)}var B=new Map,k=new Map,v={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function je(){B.clear(),k.clear(),v.active=!1,v.splitEl=null,v.gutterEl=null,v.prevPane=null,v.nextPane=null,v.direction=null,v.startPos=0,v.startPrevSize=0,v.startNextSize=0,v.containerSize=0}function ot(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function dr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ke(e){return e==="horizontal"?"clientX":"clientY"}function S(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function lr(e,t){let i=(B.get(e)?.gutters||[]).reduce((o,n)=>o+S(n,t),0);return S(e,t)-i}function nt(e,t){let r=k.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function it(e,t,r,i){let o=S(t,i),n=S(r,i),d=k.get(t),s=k.get(r);e.setAttribute("aria-valuenow",Math.round(o)),e.setAttribute("aria-valuemin",d?.min||0),e.setAttribute("aria-valuemax",Math.round(o+n-(s?.min||0)))}function vt(e){let t=e.getAttribute("split-persist");if(!t)return;let r=B.get(e);if(!r)return;let i=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(i))}catch{}}function pr(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let i=JSON.parse(r),o=B.get(e);return!o||i.length!==o.panes.length?!1:(i.forEach((n,d)=>{n&&(o.panes[d].style.flexBasis=n,o.panes[d].style.flexGrow="0")}),!0)}catch{return!1}}function ur(e,t,r,i,o){let n=document.createElement("div");n.className="nojs-gutter",n.setAttribute("role","separator"),n.setAttribute("tabindex","0"),n.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),n.setAttribute("aria-label","Resize"),o!==6&&n.style.setProperty("--nojs-gutter-size",`${o}px`);let d=p=>{if(p.button!==0)return;p.preventDefault();let a=lr(e,t);v.active=!0,v.splitEl=e,v.gutterEl=n,v.prevPane=r,v.nextPane=i,v.direction=t,v.startPos=p[ke(t)],v.startPrevSize=S(r,t),v.startNextSize=S(i,t),v.containerSize=a,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",n.setPointerCapture(p.pointerId)},s=p=>{if(!v.active||v.gutterEl!==n)return;let a=p[ke(v.direction)]-v.startPos,c=nt(v.startPrevSize+a,v.prevPane),b=nt(v.startNextSize-a,v.nextPane),h=v.startPrevSize+v.startNextSize;c+b!==h&&(c!==v.startPrevSize+a?b=h-c:c=h-b),v.prevPane.style.flexBasis=`${c}px`,v.prevPane.style.flexGrow="0",v.nextPane.style.flexBasis=`${b}px`,v.nextPane.style.flexGrow="0",it(n,v.prevPane,v.nextPane,v.direction)},l=()=>{!v.active||v.gutterEl!==n||(v.active=!1,document.body.style.cursor="",document.body.style.userSelect="",vt(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};n.addEventListener("pointerdown",d),n.addEventListener("pointermove",s),n.addEventListener("pointerup",l),n.addEventListener("pointercancel",l);let f=10,u=p=>{let a=t==="horizontal",c=0;if(a&&p.key==="ArrowRight"||!a&&p.key==="ArrowDown")c=f;else if(a&&p.key==="ArrowLeft"||!a&&p.key==="ArrowUp")c=-f;else if(p.key==="Home")c=(k.get(r)?.min||0)-S(r,t);else if(p.key==="End"){let z=k.get(i);c=S(r,t)+S(i,t)-(z?.min||0)-S(r,t)}else return;p.preventDefault();let b=S(r,t),h=S(i,t),y=b+h,A=nt(b+c,r),I=nt(y-A,i);A=y-I,r.style.flexBasis=`${A}px`,r.style.flexGrow="0",i.style.flexBasis=`${I}px`,i.style.flexGrow="0",it(n,r,i,t),vt(e)};n.addEventListener("keydown",u);let m=()=>{let p=k.get(r),a=k.get(i),c=p?.collapsible?r:a?.collapsible?i:null;if(!c)return;let b=k.get(c);if(!b)return;let h=c===r?i:r,y=S(r,t)+S(i,t);if(b.collapsed){b.collapsed=!1,c.removeAttribute("data-collapsed");let A=b.preCollapseSize||`${Math.round(y/2)}px`;c.style.flexBasis=A,c.style.flexGrow="0",h.style.flexBasis=`${y-parseFloat(A)}px`,h.style.flexGrow="0"}else b.preCollapseSize=c.style.flexBasis||`${S(c,t)}px`,b.collapsed=!0,c.setAttribute("data-collapsed","true"),c.style.flexBasis="0px",c.style.flexGrow="0",h.style.flexBasis=`${y}px`,h.style.flexGrow="0";it(n,r,i,t),vt(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:c,collapsed:b.collapsed}}))};return n.addEventListener("dblclick",m),{gutter:n,cleanup:()=>{n.removeEventListener("pointerdown",d),n.removeEventListener("pointermove",s),n.removeEventListener("pointerup",l),n.removeEventListener("pointercancel",l),n.removeEventListener("keydown",u),n.removeEventListener("dblclick",m)}}}function _e(e){e.directive("split",{priority:14,init(t,r,i){ot();let o=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",n=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",o);let d=Array.from(t.children).filter(u=>u.hasAttribute("pane"));if(d.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${d.length}.`);return}d.forEach(u=>{k.get(u)||k.set(u,{size:u.getAttribute("pane")||null,min:parseInt(u.getAttribute("pane-min"),10)||0,max:parseInt(u.getAttribute("pane-max"),10)||1/0,collapsible:u.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],l=[];for(let u=0;u<d.length-1;u++){let{gutter:m,cleanup:g}=ur(t,o,d[u],d[u+1],n);d[u].after(m),s.push(m),l.push(g)}B.set(t,{direction:o,gutterSize:n,panes:d,gutters:s}),pr(t)||d.forEach(u=>{let g=k.get(u)?.size;g?(u.style.flexBasis=g,u.style.flexGrow="0"):(u.style.flexGrow="1",u.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((u,m)=>{it(u,d[m],d[m+1],o)})}),dr(t,()=>{l.forEach(u=>u()),s.forEach(u=>u.remove()),B.delete(t),d.forEach(u=>k.delete(u)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function fr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Se(e){e.directive("pane",{priority:15,init(t,r,i){ot(),t.classList.add("nojs-pane"),k.has(t)||k.set(t,{size:i||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=k.get(t),n=t.closest("[data-direction='vertical']")?"height":"width";o.min&&(t.style[`min${n==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(t.style[`max${n==="width"?"Width":"Height"}`]=`${o.max}px`),fr(t,()=>{t.classList.remove("nojs-pane"),k.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function Le(e,t={}){_e(e),Se(e)}function Ce(){je()}var G={sorts:new Map};function Te(){G.sorts.clear()}function X(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function mr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function br(e,t){let r=e.querySelector("tbody");if(!r)return null;let i=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?i=r:i=r.querySelector("[each]")||r.querySelector("[foreach]"),!i)return null;let o=i.getAttribute("each")||i.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim()}:null}function gr(e,t){let r=t.split("."),i=e;for(let o of r){if(i==null)return;i=i[o]}return i}function De(e,t,r){let i=t.split("."),o=e;for(let n=0;n<i.length-1;n++){if(o[i[n]]==null)return;o=o[i[n]]}o[i[i.length-1]]=r}function ze(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return Number(e)-Number(t);case"date":return new Date(e).getTime()-new Date(t).getTime();default:return String(e).localeCompare(String(t))}}function hr(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Fe(e){e.directive("sortable",{priority:10,init(t){X(),t.classList.add("nojs-sortable")}})}function Pe(e){e.directive("sort",{priority:11,init(t,r,i){X();let o=i;if(!o)return;let n=t.getAttribute("sort-type")||"string",d=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;G.sorts.has(s)||G.sorts.set(s,{column:null,direction:null}),(d==="asc"||d==="desc")&&Ie(t,s,o,n,d,e);let l=()=>{let f=G.sorts.get(s),u;f.column!==o?u="asc":f.direction==="asc"?u="desc":f.direction==="desc"?u=null:u="asc",Ie(t,s,o,n,u,e)};t.addEventListener("click",l),mr(t,()=>{t.removeEventListener("click",l),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function Ie(e,t,r,i,o,n){let d=G.sorts.get(t);hr(t),o?(e.setAttribute("data-sort-dir",o),e.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),d.column=r,d.direction=o):(d.column=null,d.direction=null);let s=br(t,n);if(s){let l=n.findContext(t),f=l?gr(l,s.arrayPath):null;if(Array.isArray(f)){if(!o){let m=t._nojsOriginalOrder;if(m){let g=new Set(f),p=m.filter(a=>g.has(a));for(let a of f)m.includes(a)||p.push(a);De(l,s.arrayPath,p)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...f]);let u=[...f].sort((m,g)=>{let p=m!=null?m[r]:null,a=g!=null?g[r]:null,c=ze(p,a,i);return o==="desc"?-c:c});De(l,s.arrayPath,u);return}}vr(t,e,r,i,o)}function vr(e,t,r,i,o){let n=e.querySelector("tbody");if(!n)return;let l=[...t.closest("tr").children].indexOf(t);if(l<0)return;let f=[...n.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...f]),!o){let m=document.createDocumentFragment();for(let g of e._nojsOriginalRows)m.appendChild(g);n.appendChild(m);return}f.sort((m,g)=>{let p=m.children[l]?.textContent?.trim()||"",a=g.children[l]?.textContent?.trim()||"",c=ze(i==="number"?parseFloat(p.replace(/[^0-9.\-]/g,""))||0:p,i==="number"?parseFloat(a.replace(/[^0-9.\-]/g,""))||0:a,i);return o==="desc"?-c:c});let u=document.createDocumentFragment();for(let m of f)u.appendChild(m);n.appendChild(u)}function Me(e){e.directive("fixed-header",{priority:10,init(t){X(),t.classList.add("nojs-fixed-header")}})}function Be(e){e.directive("fixed-col",{priority:10,init(t){X(),t.classList.add("nojs-fixed-col")}})}function qe(e,t={}){Fe(e),Pe(e),Me(e),Be(e)}function He(){Te()}var yr={name:"nojs-elements",install(e,t={}){Et(e,t),St(e,t),Mt(e,t),Wt(e,t),Zt(e,t),ie(e,t),fe(e,t),ve(e,t),Ee(e,t),Le(e,t),qe(e,t)},dispose(e){jt(),Lt(),Bt(),Nt(),Qt(),se(),me(),ye(),Ce(),He()}},yt=yr;typeof window<"u"&&(window.NoJSElements=yt,window.NoJS&&typeof window.NoJS.use=="function"&&window.NoJS.use(yt));})();
//# sourceMappingURL=nojs-elements.js.map
