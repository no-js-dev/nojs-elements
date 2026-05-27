/**
 * NoJS Elements v1.11.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
(()=>{var U=new Map,C=new Map;function vt(){for(let e of C.values())clearTimeout(e);C.clear();for(let e of U.values())e.remove();U.clear()}function yt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function $e(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Q=8;function Re(e,t,r){let i=t.getBoundingClientRect(),n=e.getBoundingClientRect(),o=window.innerWidth,d=window.innerHeight,s,p;switch(r){case"bottom":s=i.bottom+Q,p=i.left+(i.width-n.width)/2;break;case"left":s=i.top+(i.height-n.height)/2,p=i.left-n.width-Q;break;case"right":s=i.top+(i.height-n.height)/2,p=i.right+Q;break;default:s=i.top-n.height-Q,p=i.left+(i.width-n.width)/2;break}p<4&&(p=4),p+n.width>o-4&&(p=o-n.width-4),s<4&&(s=4),s+n.height>d-4&&(s=d-n.height-4),e.style.top=`${s}px`,e.style.left=`${p}px`}var Oe=0;function Ge(e,t,r){document.body.appendChild(t),Re(t,e,r),t.setAttribute("aria-hidden","false")}function We(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function xt(e){e.directive("tooltip",{priority:20,init(t,r,i){yt();let n=i;if(!n){e._warn("[tooltip] attribute value (tooltip text) is required.");return}let o=t.getAttribute("tooltip-position")||"top",d=parseInt(t.getAttribute("tooltip-delay"),10)||300,s=t.getAttribute("tooltip-disabled"),p=s?e.findContext(t):null,f=`nojs-tooltip-${++Oe}`,l=document.createElement("div");l.className="nojs-tooltip",l.setAttribute("role","tooltip"),l.setAttribute("id",f),l.setAttribute("aria-hidden","true"),l.textContent=n,t.setAttribute("aria-describedby",f),U.set(t,l);let m=()=>{if(s&&p&&e.evaluate(s,p))return;C.has(t)&&clearTimeout(C.get(t));let y=setTimeout(()=>{C.delete(t),!(s&&p&&e.evaluate(s,p))&&Ge(t,l,o)},d);C.set(t,y)},g=()=>{C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),We(t,l)},c=()=>m(),a=()=>g(),u=()=>m(),b=()=>g(),v=y=>{y.key==="Escape"&&l.getAttribute("aria-hidden")==="false"&&g()};t.addEventListener("mouseenter",c),t.addEventListener("mouseleave",a),t.addEventListener("focusin",u),t.addEventListener("focusout",b),t.addEventListener("keydown",v),$e(t,()=>{t.removeEventListener("mouseenter",c),t.removeEventListener("mouseleave",a),t.removeEventListener("focusin",u),t.removeEventListener("focusout",b),t.removeEventListener("keydown",v),C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),l.remove(),U.delete(t)})}})}function wt(e,t={}){xt(e)}function At(){vt()}var k=new Map;function Et(){k.clear()}function N(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function ct(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var B=8;function dt(e,t,r){let i=t.getBoundingClientRect(),n=e.getBoundingClientRect(),o=window.innerWidth,d=window.innerHeight,s,p;switch(r){case"top":s=i.top-n.height-B,p=i.left+(i.width-n.width)/2;break;case"left":s=i.top+(i.height-n.height)/2,p=i.left-n.width-B;break;case"right":s=i.top+(i.height-n.height)/2,p=i.right+B;break;default:s=i.bottom+B,p=i.left+(i.width-n.width)/2;break}r==="bottom"&&s+n.height>d&&(s=i.top-n.height-B),r==="top"&&s<0&&(s=i.bottom+B),p<4&&(p=4),p+n.width>o-4&&(p=o-n.width-4),s<4&&(s=4),s+n.height>d-4&&(s=d-n.height-4),e.style.top=`${s}px`,e.style.left=`${p}px`}function _t(e){e.directive("popover",{priority:20,init(r,i,n){N();let o=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",o),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let d=r.getAttribute("popover-position")||"bottom";if(!k.has(o))k.set(o,{popoverEl:r,triggerEls:new Set,position:d,open:!1});else{let p=k.get(o);p.popoverEl=r,p.position=d}let s=p=>{let f=k.get(o);if(!f)return;let l=p.newState==="open";f.open=l;for(let m of f.triggerEls)m.setAttribute("aria-expanded",String(l))};r.addEventListener("toggle",s),ct(r,()=>{r.removeEventListener("toggle",s),k.delete(o)})}}),e.directive("popover-trigger",{priority:20,init(r,i,n){N();let o=n;if(!o){let f=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(f&&(o=f.getAttribute("data-popover-id")),!o){e._warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",o),k.has(o)||k.set(o,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),k.get(o).triggerEls.add(r);let d=p=>{let f=k.get(o);if(!f||!f.popoverEl){e._warn(`[popover-trigger] no popover found with id "${o}".`);return}f.popoverEl.togglePopover(),requestAnimationFrame(()=>{f.popoverEl.matches(":popover-open")&&dt(f.popoverEl,r,f.position)})};r.addEventListener("click",d);let s=p=>{let f=k.get(o);p.key==="Escape"&&f?.open&&(f.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),ct(r,()=>{r.removeEventListener("click",d),document.removeEventListener("keydown",s);let p=k.get(o);p&&p.triggerEls.delete(r)})}}),e.directive("popover-dismiss",{priority:20,init(r){N();let i=()=>{let n=r.closest(".nojs-popover");n&&n.hidePopover()};r.addEventListener("click",i),ct(r,()=>r.removeEventListener("click",i))}});let t=(r,i)=>t.open(r,i);t.open=(r,i)=>{let n=k.get(r);if(!n||!n.popoverEl)return!1;try{n.popoverEl.showPopover()}catch{return!1}let o=i||[...n.triggerEls][0];return o&&requestAnimationFrame(()=>dt(n.popoverEl,o,n.position)),!0},t.close=r=>{let i=k.get(r);if(!i||!i.popoverEl)return!1;try{i.popoverEl.hidePopover()}catch{}return!0},t.toggle=(r,i)=>{let n=k.get(r);if(!n||!n.popoverEl)return!1;n.popoverEl.togglePopover();let o=i||[...n.triggerEls][0];return o&&n.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>dt(n.popoverEl,o,n.position)),!0},e.popover=t}function jt(e,t={}){_t(e)}function kt(){Et()}var L=[],T=new Map,Ve=1e4;function St(){return Ve+L.length}function Lt(){L.length=0,T.clear()}function H(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function Ue(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Tt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',lt=new WeakMap;function Ke(e){let t=r=>{if(r.key!=="Tab")return;let i=[...e.querySelectorAll(Tt)].filter(d=>d.offsetParent!==null);if(i.length===0){r.preventDefault();return}let n=i[0],o=i[i.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),o.focus()):document.activeElement===o&&(r.preventDefault(),n.focus())};e.addEventListener("keydown",t),lt.set(e,t)}function Ct(e){let t=lt.get(e);t&&(e.removeEventListener("keydown",t),lt.delete(e))}var K=new WeakMap;function Dt(e){e.directive("modal",{priority:10,init(r,i,n){H();let o=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${o}`,r.setAttribute("data-modal-id",o),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let d=r.querySelector("h1, h2, h3, h4, h5, h6");d&&(d.id||(d.id=`nojs-modal-heading-${o}`),r.setAttribute("aria-labelledby",d.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let p=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),l=g=>{g.target===r&&s!=="false"&&f!=="false"&&$(r,o)};r.addEventListener("click",l),T.set(o,r);let m=g=>{if(g.newState==="open"){if(r.style.zIndex=String(St()),p&&p.split(/\s+/).filter(Boolean).forEach(c=>r.classList.add(c)),requestAnimationFrame(()=>{let c=r.querySelector(Tt);c?c.focus():r.focus()}),Ke(r),f!=="false"){let c=a=>{a.key==="Escape"&&(a.stopPropagation(),$(r,o))};r.addEventListener("keydown",c),K.set(r,c)}}else if(g.newState==="closed"){p&&p.split(/\s+/).filter(Boolean).forEach(u=>r.classList.remove(u)),Ct(r);let c=K.get(r);c&&(r.removeEventListener("keydown",c),K.delete(r));let a=L.findIndex(u=>u.id===o);if(a!==-1){let u=L[a];L.splice(a,1),u.triggerEl&&requestAnimationFrame(()=>{u.triggerEl.focus()})}}};r.addEventListener("toggle",m),Ue(r,()=>{r.removeEventListener("click",l),r.removeEventListener("toggle",m),Ct(r);let g=K.get(r);g&&(r.removeEventListener("keydown",g),K.delete(r)),T.delete(o);let c=L.findIndex(a=>a.id===o);c!==-1&&L.splice(c,1)})}});let t=r=>t.open(r);t.open=r=>{let i=T.get(r);if(!i)return!1;L.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},t.close=r=>{let i=T.get(r);return i?($(i,r),!0):!1},t.closeAll=()=>{for(let r=L.length-1;r>=0;r--)$(L[r].el,L[r].id)},e.modal=t}function $(e,t){try{e.hidePopover()}catch{}}function Ye(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function It(e){e.directive("modal-open",{priority:10,init(t,r,i){H();let n=i;if(!n){let m=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(m&&(n=m.getAttribute("data-modal-id")),!n){e._warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let o=()=>{let l=T.get(n)||document.querySelector(`[data-modal-id="${n}"]`);if(!l){e._warn(`[modal-open] modal "${n}" not found`);return}L.push({id:n,el:l,triggerEl:t}),t.setAttribute("aria-expanded","true"),l.id&&t.setAttribute("aria-controls",l.id);try{l.showPopover()}catch{e._warn(`[modal-open] failed to open modal "${n}"`)}},d=()=>{t.setAttribute("aria-expanded","false")},s=null,p=null;requestAnimationFrame(()=>{let l=T.get(n);l&&(p=l,s=m=>{m.newState==="closed"&&t.setAttribute("aria-expanded","false")},l.addEventListener("toggle",s))}),t.addEventListener("click",o),Ye(t,()=>{t.removeEventListener("click",o),p&&s&&p.removeEventListener("toggle",s)})}})}function Xe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function zt(e){e.directive("modal-close",{priority:10,init(t,r,i){H();let n=()=>{let o,d;if(i){if(d=i,o=T.get(d),!o){e._warn(`[modal-close] modal "${d}" not found`);return}}else{if(o=t.closest("[modal]"),!o){e._warn("[modal-close] no parent modal found");return}d=o.getAttribute("modal")}$(o,d)};t.addEventListener("click",n),Xe(t,()=>{t.removeEventListener("click",n)})}})}function Ft(e,t={}){Dt(e),It(e),zt(e)}function Pt(){Lt()}var Y={openMenus:new Map};function Mt(){Y.openMenus.clear()}function R(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}function Ze(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function qt(e,t,r){let i=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let o=t.getBoundingClientRect(),d=e.getBoundingClientRect(),s=window.innerHeight,p=window.innerWidth,f,l;switch(i){case"top":f=o.top-d.height,l=o.left;break;case"left":f=o.top,l=o.left-d.width;break;case"right":f=o.top,l=o.right;break;default:f=o.bottom,l=o.left}i==="bottom"||i==="top"?n==="end"&&(l=o.right-d.width):n==="end"&&(f=o.bottom-d.height),i==="bottom"&&f+d.height>s&&o.top-d.height>0?f=o.top-d.height:i==="top"&&f<0&&o.bottom+d.height<=s&&(f=o.bottom),l<4&&(l=4),l+d.width>p-4&&(l=p-d.width-4),e.style.top=`${f}px`,e.style.left=`${l}px`}function Ht(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function Bt(e){let t=Ht(e);t.length&&t[0].focus()}function Qe(e){let t=Ht(e);t.length&&t[t.length-1].focus()}function $t(e){e.directive("dropdown",{priority:15,init(r){R()}}),e.directive("dropdown-toggle",{priority:15,init(r){R();let i=r.closest("[dropdown]");if(!i)return;let n=i.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Math.random().toString(36).slice(2,7)}`),r.setAttribute("aria-controls",n.id);function o(){n.setAttribute("data-open",""),n.showPopover&&n.showPopover(),r.setAttribute("aria-expanded","true"),qt(n,r,i),Y.openMenus.set(n,{toggle:r,wrapper:i})}function d(){n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),Y.openMenus.delete(n)}function s(){return r.getAttribute("aria-expanded")==="true"}let p=a=>{a.newState==="closed"&&s()&&d()};n.addEventListener("toggle",p);let f=a=>{a.preventDefault(),a.stopPropagation(),s()?d():o()};r.addEventListener("click",f);let l=a=>{s()&&!i.contains(a.target)&&d()};document.addEventListener("click",l,!0);let m=a=>{a.key==="Escape"&&s()&&(d(),r.focus())};document.addEventListener("keydown",m);let g=a=>{switch(a.key){case"Enter":case" ":a.preventDefault(),o(),Bt(n);break;case"ArrowDown":a.preventDefault(),o(),Bt(n);break;case"ArrowUp":a.preventDefault(),o(),Qe(n);break}};r.addEventListener("keydown",g);let c=()=>{s()&&qt(n,r,i)};window.addEventListener("scroll",c,!0),window.addEventListener("resize",c),Ze(r,()=>{r.removeEventListener("click",f),r.removeEventListener("keydown",g),n.removeEventListener("toggle",p),document.removeEventListener("click",l,!0),document.removeEventListener("keydown",m),window.removeEventListener("scroll",c,!0),window.removeEventListener("resize",c),Y.openMenus.delete(n)})}}),e.directive("dropdown-menu",{priority:15,init(r){R(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let i=document.getElementById(r);if(!i)return!1;let o=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!o||o.getAttribute("aria-expanded")==="true"?!1:(o.click(),!0)},t.close=r=>{let i=document.getElementById(r);if(!i)return!1;let o=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!o||o.getAttribute("aria-expanded")!=="true"?!1:(o.click(),!0)},e.dropdown=t}function Rt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ne(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function Ot(e){e.directive("dropdown-item",{priority:15,init(t){R();let r=t.closest("[dropdown-menu]"),i=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let n=d=>{if(!r)return;let s=Ne(r),p=s.indexOf(t);switch(d.key){case"ArrowDown":{d.preventDefault(),(p+1<s.length?s[p+1]:s[0]).focus();break}case"ArrowUp":{d.preventDefault(),(p-1>=0?s[p-1]:s[s.length-1]).focus();break}case"Home":{d.preventDefault(),s.length&&s[0].focus();break}case"End":{d.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{d.preventDefault(),t.click();break}case"Escape":{if(d.preventDefault(),r)try{r.hidePopover()}catch{}if(i){let f=i.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{if(r)try{r.hidePopover()}catch{}break}}};t.addEventListener("keydown",n),Rt(t,()=>t.removeEventListener("keydown",n));let o=()=>{if(r)try{r.hidePopover()}catch{}if(i){let d=i.querySelector("[dropdown-toggle]");d&&d.focus()}};t.addEventListener("click",o),Rt(t,()=>t.removeEventListener("click",o))}})}function Gt(e,t={}){$t(e),Ot(e)}function Wt(){Mt()}var D=new Map,O=new Set,Vt=0;function Ut(){return++Vt}function Kt(){for(let e of O)clearTimeout(e);O.clear();for(let e of D.values())e.remove();D.clear(),Vt=0}function Yt(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function pt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Je=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function ut(){return D.size>0?D.values().next().value:tr("top-right")}function tr(e){if(D.has(e))return D.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),D.set(e,t),t}function er(e){return e.startsWith("top")}function ft(e,t,r,i,n){let o=Ut(),d=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",o),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let p=document.createElement("span");if(p.textContent=t,s.appendChild(p),n){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>J(s)),s.appendChild(f)}if(er(d)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),i>0){let f=setTimeout(()=>{O.delete(f),J(s)},i);O.add(f),s._toastTimerId=f}return s}function J(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),O.delete(e._toastTimerId)),e.remove())}function Xt(e){Yt(),e.directive("toast-container",{priority:10,init(r,i,n){let o=n&&Je.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",o),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),D.set(o,r),pt(r,()=>{D.get(o)===r&&D.delete(o)})}}),e.directive("toast",{priority:10,init(r,i,n){if(!n)return;let o=r.getAttribute("toast-type")||"info",d=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let c=()=>{let a=ut();ft(a,n,o,d,s)};r.addEventListener("click",c),pt(r,()=>r.removeEventListener("click",c));return}let f=e.findContext(r),l;function m(){let c=e.evaluate(n,f);if(c&&c!==l){let a=typeof c=="string"?c:String(c),u=ut();ft(u,a,o,d,s)}l=c}let g=f.$watch(m);pt(r,g)}});let t=(r,i="info",n=3e3)=>{if(typeof document>"u")return;let o=!0,d=ut();return ft(d,String(r),i,n,o)};t.dismiss=r=>{let i=document.querySelector(`[data-toast-id="${r}"]`);i&&J(i)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>J(r))},e.toast=t}function Zt(e,t={}){Xt(e)}function Qt(){Kt()}var P={containers:new Map};function Nt(){P.containers.clear()}function Jt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function rr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var or=0;function te(e){return`${e}-${++or}`}function mt(e,t){let r=P.containers.get(e);if(!r)return;let{tabs:i,panels:n}=r;if(!(t<0||t>=i.length)&&i[t].getAttribute("aria-disabled")!=="true"){for(let o=0;o<i.length;o++)i[o].setAttribute("aria-selected","false"),i[o].setAttribute("tabindex","-1"),n[o].setAttribute("aria-hidden","true"),n[o].inert=!0;i[t].setAttribute("aria-selected","true"),i[t].setAttribute("tabindex","0"),n[t].setAttribute("aria-hidden","false"),n[t].inert=!1,r.activeIndex=t}}function X(e,t,r){let i=e.length,n=t;for(let o=0;o<i;o++)if(n=(n+r+i)%i,e[n].getAttribute("aria-disabled")!=="true")return n;return t}function ee(e){e.directive("tabs",{priority:10,init(t,r,i){Jt();let n=[],o=[];for(let a of Array.from(t.children))a.hasAttribute("tab")?n.push(a):a.hasAttribute("panel")&&o.push(a);if(n.length===0){e._warn("[tabs] No child [tab] elements found.");return}n.length!==o.length&&e._warn("[tabs] Mismatch: "+n.length+" tabs but "+o.length+" panels.");let d=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",d),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let p=Math.min(n.length,o.length);for(let a=0;a<p;a++){let u=n[a],b=o[a],v=u.id||te("nojs-tab"),y=b.id||te("nojs-panel");u.id=v,b.id=y,u.setAttribute("role","tab"),u.setAttribute("aria-selected","false"),u.setAttribute("aria-controls",y),u.setAttribute("tabindex","-1"),u.classList.add("nojs-tab"),b.setAttribute("role","tabpanel"),b.setAttribute("aria-labelledby",v),b.setAttribute("tabindex","0"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel"),s.appendChild(u)}let f=o[0];f?t.insertBefore(s,f):t.appendChild(s),P.containers.set(t,{tabs:n.slice(0,p),panels:o.slice(0,p),activeIndex:-1});let l=e.findContext(t);for(let a=0;a<p;a++){let u=n[a].getAttribute("tab-disabled");u&&e.evaluate(u,l)&&n[a].setAttribute("aria-disabled","true")}let m=0;if(i&&i.trim()!==""){let a=parseInt(i,10);!isNaN(a)&&a>=0&&a<p&&(m=a)}n[m]?.getAttribute("aria-disabled")==="true"&&(m=X(n.slice(0,p),m,1)),mt(t,m);let g=a=>{let u=P.containers.get(t);if(!u)return;let b=a.target;if(b.getAttribute("role")!=="tab")return;let{tabs:v}=u,y=v.indexOf(b);if(y===-1)return;let w=-1;switch(a.key){case"ArrowRight":case"ArrowDown":w=X(v,y,1);break;case"ArrowLeft":case"ArrowUp":w=X(v,y,-1);break;case"Home":w=X(v,v.length-1,1);break;case"End":w=X(v,0,-1);break;case"Tab":return;default:return}w!==-1&&w!==y&&(a.preventDefault(),mt(t,w),v[w].focus())};s.addEventListener("keydown",g);let c=a=>{let u=a.target.closest("[role='tab']");if(!u)return;let b=P.containers.get(t);if(!b)return;let v=b.tabs.indexOf(u);v!==-1&&(mt(t,v),u.focus())};s.addEventListener("click",c),rr(t,()=>{s.removeEventListener("keydown",g),s.removeEventListener("click",c),P.containers.delete(t)})}})}function re(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function oe(e){e.directive("panel",{priority:11,init(){}})}function ne(e,t={}){ee(e),re(e),oe(e)}function ie(){Nt()}var E={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function se(){E.branches.clear(),E.selectedItem=null,E.typeahead="",E.typeaheadTimer&&(clearTimeout(E.typeaheadTimer),E.typeaheadTimer=null)}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function bt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ae(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)t.push(i);return t}function ce(e){return e.closest('[role="tree"]')}function nr(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(t.textContent||"").trim().toLowerCase()}function de(e){e.directive("tree",{priority:15,init(t){tt(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function le(e){e.directive("branch",{priority:16,init(t,r,i){tt();let n=i==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(n));let o=ce(t);if(o){let c=o.querySelector('[role="treeitem"]');t.setAttribute("tabindex",c===t?"0":"-1")}else t.setAttribute("tabindex","0");let d=!1;queueMicrotask(()=>{if(d)return;let c=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);c?(E.branches.set(t,{expanded:n,subtreeEl:c}),c.setAttribute("aria-hidden",String(!n))):E.branches.set(t,{expanded:n,subtreeEl:null})});function s(c){let a=E.selectedItem;a&&a!==c&&(a.classList.remove("nojs-branch-selected"),a.setAttribute("aria-selected","false")),c.classList.add("nojs-branch-selected"),c.setAttribute("aria-selected","true"),E.selectedItem=c}function p(c){let a=E.branches.get(c);!a||!a.subtreeEl||(a.expanded=!a.expanded,c.setAttribute("aria-expanded",String(a.expanded)),a.subtreeEl.setAttribute("aria-hidden",String(!a.expanded)))}function f(c){let a=E.branches.get(c);!a||!a.subtreeEl||a.expanded||(a.expanded=!0,c.setAttribute("aria-expanded","true"),a.subtreeEl.setAttribute("aria-hidden","false"))}function l(c){let a=E.branches.get(c);!a||!a.subtreeEl||!a.expanded||(a.expanded=!1,c.setAttribute("aria-expanded","false"),a.subtreeEl.setAttribute("aria-hidden","true"))}let m=c=>{c.target!==t&&!t.contains(c.target)||(c.stopPropagation(),s(t),p(t))};t.addEventListener("click",m),bt(t,()=>t.removeEventListener("click",m));let g=c=>{let a=ce(t);if(!a)return;let u=ae(a),b=u.indexOf(t),v=E.branches.get(t),y=v&&v.subtreeEl;switch(c.key){case"ArrowRight":if(c.preventDefault(),y&&!v.expanded)f(t);else if(y&&v.expanded){let w=v.subtreeEl.querySelector('[role="treeitem"]');w&&M(w,u)}break;case"ArrowLeft":if(c.preventDefault(),y&&v.expanded)l(t);else{let w=t.parentElement?.closest('[role="treeitem"]');w&&M(w,ae(a))}break;case"ArrowDown":c.preventDefault(),b<u.length-1&&M(u[b+1],u);break;case"ArrowUp":c.preventDefault(),b>0&&M(u[b-1],u);break;case"Enter":case" ":c.preventDefault(),s(t),p(t);break;case"Home":c.preventDefault(),u.length>0&&M(u[0],u);break;case"End":c.preventDefault(),u.length>0&&M(u[u.length-1],u);break;default:if(c.key.length===1&&!c.ctrlKey&&!c.altKey&&!c.metaKey){c.preventDefault(),E.typeahead+=c.key.toLowerCase(),E.typeaheadTimer&&clearTimeout(E.typeaheadTimer),E.typeaheadTimer=setTimeout(()=>{E.typeahead="",E.typeaheadTimer=null},500);let w=b+1;for(let I=0;I<u.length;I++){let z=(w+I)%u.length;if(nr(u[z]).startsWith(E.typeahead)){M(u[z],u);break}}}break}};t.addEventListener("keydown",g),bt(t,()=>t.removeEventListener("keydown",g)),bt(t,()=>{d=!0,E.branches.delete(t),E.selectedItem===t&&(E.selectedItem=null)})}})}function M(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function pe(e){e.directive("subtree",{priority:16,init(t){tt(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let i of t.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let i=E.branches.get(r);i?(t.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function ue(e,t={}){de(e),le(e),pe(e)}function fe(){se()}var et=new Map;function me(){et.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function ir(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function be(e){e.directive("stepper",{priority:14,init(t,r,i){rt();let n=e.findContext(t),o=Array.from(t.querySelectorAll("[step]"));if(!o.length){e._warn("[stepper] No [step] children found.");return}let d=i&&parseInt(i,10)||0,s=t.getAttribute("stepper-mode")||"linear",p=t.getAttribute("stepper-indicator")!=="false",f=t.getAttribute("stepper-nav")!=="false",l=t.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(d,o.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",l),t.classList.add("nojs-stepper");let g=null,c=[];p&&(g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),o.forEach((x,A)=>{if(A>0){let at=document.createElement("div");at.className="nojs-stepper-separator",at.setAttribute("aria-hidden","true"),g.appendChild(at)}let _=document.createElement("button");_.type="button",_.className="nojs-stepper-indicator-item",_.setAttribute("role","tab"),_.setAttribute("aria-selected",A===m?"true":"false");let V=x.getAttribute("step-label")||`Step ${A+1}`,F=document.createElement("span");F.textContent=V,_.appendChild(F),_.setAttribute("aria-label",V);let He=`nojs-stepper-tab-${sr++}`;_.id=He,s==="free"?(_.setAttribute("data-clickable",""),_.addEventListener("click",()=>z(A))):_.setAttribute("tabindex","-1"),g.appendChild(_),c.push(_)}),g.addEventListener("keydown",x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let A=m;x.key==="ArrowRight"?A=Math.min(m+1,o.length-1):x.key==="ArrowLeft"?A=Math.max(m-1,0):x.key==="Home"?A=0:x.key==="End"&&(A=o.length-1),s==="free"&&z(A),c[A]?.focus()}),t.insertBefore(g,t.firstChild));let a=null,u=null,b=null;f&&(a=document.createElement("div"),a.className="nojs-stepper-nav",a.setAttribute("aria-hidden","true"),u=document.createElement("button"),u.type="button",u.className="nojs-stepper-prev",u.textContent="Previous",u.addEventListener("click",()=>I()),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-next",b.textContent="Next",b.addEventListener("click",()=>w()),a.appendChild(u),a.appendChild(b),t.appendChild(a));function v(x){let A=o[x];if(!A)return!0;let _=A.querySelectorAll("[required]");for(let F of _)if(typeof F.checkValidity=="function"&&!F.checkValidity())return F.reportValidity(),!1;let V=A.getAttribute("step-validate");if(V)try{if(!e.evaluate(V,n))return!1}catch(F){return e._warn(`[stepper] step-validate error: ${F.message}`),!1}return!0}function y(){o.forEach((x,A)=>{let _=A===m;x.setAttribute("aria-hidden",_?"false":"true"),_?x.removeAttribute("inert"):x.setAttribute("inert","")}),c.length&&c.forEach((x,A)=>{x.setAttribute("aria-selected",A===m?"true":"false"),A<m?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",A===m?"0":"-1");let _=o[A];_.id&&(x.setAttribute("aria-controls",_.id),_.setAttribute("aria-labelledby",x.id))}),u&&(u.disabled=m===0),b&&(b.textContent=m===o.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:m,total:o.length}}))}function w(){return m>=o.length-1||s==="linear"&&!v(m)?!1:(m++,y(),W(),!0)}function I(){return m<=0?!1:(m--,y(),W(),!0)}function z(x){if(x<0||x>=o.length||x===m)return!1;if(s==="linear"&&x>m){for(let A=m;A<x;A++)if(!v(A))return!1}return m=x,y(),W(),!0}let st={get current(){return m},get total(){return o.length},next:w,prev:I,goTo:z,get isFirst(){return m===0},get isLast(){return m===o.length-1}};function W(){n.$stepper=st}W(),et.set(t,{current:m,steps:o,mode:s,indicatorEl:g,navEl:a}),y(),ir(t,()=>{et.delete(t),g&&g.parentNode&&g.remove(),a&&a.parentNode&&a.remove(),delete n.$stepper})}})}var sr=0;var ar=0;function ge(e){e.directive("step",{priority:13,init(t,r,i){rt(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${ar++}`),t.setAttribute("tabindex","0")}})}function he(e,t={}){ge(e),be(e)}function ve(){me()}function ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function xe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function we(e){e.directive("skeleton",{priority:10,init(t,r,i){ye();let n=e.findContext(t),o=t.getAttribute("skeleton-type")||"text",d=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),p=[];function f(b){l();for(let v=0;v<b;v++){let y=document.createElement("div");y.className="nojs-skeleton-line",t.appendChild(y),p.push(y)}}function l(){for(let b of p)b.parentNode===t&&t.removeChild(b);p=[]}function m(){if(t.classList.add("nojs-skeleton"),o==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(o==="circle"||o==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");t.style.width=b,t.style.height=b}if(d){let b=parseInt(d,10);b>0&&f(b)}t.setAttribute("aria-busy","true")}function g(){t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),l(),s&&(o==="circle"||o==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let b=()=>{t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",b)};t.addEventListener("transitionend",b)}let c=!1;function a(){let b=!!e.evaluate(i,n);b&&!c?(c=!0,m()):!b&&c&&(c=!1,g())}a();let u=n.$watch(a);xe(t,u),xe(t,()=>{c&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),l(),s&&(o==="circle"||o==="rect")&&(t.style.width="",t.style.height=""))})}})}function Ae(e,t={}){we(e)}var q=new Map,j=new Map,h={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Ee(){q.clear(),j.clear(),h.active=!1,h.splitEl=null,h.gutterEl=null,h.prevPane=null,h.nextPane=null,h.direction=null,h.startPos=0,h.startPrevSize=0,h.startNextSize=0,h.containerSize=0}function ot(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function cr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function _e(e){return e==="horizontal"?"clientX":"clientY"}function S(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function dr(e,t){let i=(q.get(e)?.gutters||[]).reduce((n,o)=>n+S(o,t),0);return S(e,t)-i}function nt(e,t){let r=j.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function it(e,t,r,i){let n=S(t,i),o=S(r,i),d=j.get(t),s=j.get(r);e.setAttribute("aria-valuenow",Math.round(n)),e.setAttribute("aria-valuemin",d?.min||0),e.setAttribute("aria-valuemax",Math.round(n+o-(s?.min||0)))}function gt(e){let t=e.getAttribute("split-persist");if(!t)return;let r=q.get(e);if(!r)return;let i=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(i))}catch{}}function lr(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let i=JSON.parse(r),n=q.get(e);return!n||i.length!==n.panes.length?!1:(i.forEach((o,d)=>{o&&(n.panes[d].style.flexBasis=o,n.panes[d].style.flexGrow="0")}),!0)}catch{return!1}}function pr(e,t,r,i,n){let o=document.createElement("div");o.className="nojs-gutter",o.setAttribute("role","separator"),o.setAttribute("tabindex","0"),o.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),o.setAttribute("aria-label","Resize"),n!==6&&o.style.setProperty("--nojs-gutter-size",`${n}px`);let d=c=>{if(c.button!==0)return;c.preventDefault();let a=dr(e,t);h.active=!0,h.splitEl=e,h.gutterEl=o,h.prevPane=r,h.nextPane=i,h.direction=t,h.startPos=c[_e(t)],h.startPrevSize=S(r,t),h.startNextSize=S(i,t),h.containerSize=a,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",o.setPointerCapture(c.pointerId)},s=c=>{if(!h.active||h.gutterEl!==o)return;let a=c[_e(h.direction)]-h.startPos,u=nt(h.startPrevSize+a,h.prevPane),b=nt(h.startNextSize-a,h.nextPane),v=h.startPrevSize+h.startNextSize;u+b!==v&&(u!==h.startPrevSize+a?b=v-u:u=v-b),h.prevPane.style.flexBasis=`${u}px`,h.prevPane.style.flexGrow="0",h.nextPane.style.flexBasis=`${b}px`,h.nextPane.style.flexGrow="0",it(o,h.prevPane,h.nextPane,h.direction)},p=()=>{!h.active||h.gutterEl!==o||(h.active=!1,document.body.style.cursor="",document.body.style.userSelect="",gt(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};o.addEventListener("pointerdown",d),o.addEventListener("pointermove",s),o.addEventListener("pointerup",p),o.addEventListener("pointercancel",p);let f=10,l=c=>{let a=t==="horizontal",u=0;if(a&&c.key==="ArrowRight"||!a&&c.key==="ArrowDown")u=f;else if(a&&c.key==="ArrowLeft"||!a&&c.key==="ArrowUp")u=-f;else if(c.key==="Home")u=(j.get(r)?.min||0)-S(r,t);else if(c.key==="End"){let z=j.get(i);u=S(r,t)+S(i,t)-(z?.min||0)-S(r,t)}else return;c.preventDefault();let b=S(r,t),v=S(i,t),y=b+v,w=nt(b+u,r),I=nt(y-w,i);w=y-I,r.style.flexBasis=`${w}px`,r.style.flexGrow="0",i.style.flexBasis=`${I}px`,i.style.flexGrow="0",it(o,r,i,t),gt(e)};o.addEventListener("keydown",l);let m=()=>{let c=j.get(r),a=j.get(i),u=c?.collapsible?r:a?.collapsible?i:null;if(!u)return;let b=j.get(u);if(!b)return;let v=u===r?i:r,y=S(r,t)+S(i,t);if(b.collapsed){b.collapsed=!1,u.removeAttribute("data-collapsed");let w=b.preCollapseSize||`${Math.round(y/2)}px`;u.style.flexBasis=w,u.style.flexGrow="0",v.style.flexBasis=`${y-parseFloat(w)}px`,v.style.flexGrow="0"}else b.preCollapseSize=u.style.flexBasis||`${S(u,t)}px`,b.collapsed=!0,u.setAttribute("data-collapsed","true"),u.style.flexBasis="0px",u.style.flexGrow="0",v.style.flexBasis=`${y}px`,v.style.flexGrow="0";it(o,r,i,t),gt(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:u,collapsed:b.collapsed}}))};return o.addEventListener("dblclick",m),{gutter:o,cleanup:()=>{o.removeEventListener("pointerdown",d),o.removeEventListener("pointermove",s),o.removeEventListener("pointerup",p),o.removeEventListener("pointercancel",p),o.removeEventListener("keydown",l),o.removeEventListener("dblclick",m)}}}function je(e){e.directive("split",{priority:14,init(t,r,i){ot();let n=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",o=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",n);let d=Array.from(t.children).filter(l=>l.hasAttribute("pane"));if(d.length<2){e._warn(`[split] Container requires at least 2 [pane] children, found ${d.length}.`);return}d.forEach(l=>{j.get(l)||j.set(l,{size:l.getAttribute("pane")||null,min:parseInt(l.getAttribute("pane-min"),10)||0,max:parseInt(l.getAttribute("pane-max"),10)||1/0,collapsible:l.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],p=[];for(let l=0;l<d.length-1;l++){let{gutter:m,cleanup:g}=pr(t,n,d[l],d[l+1],o);d[l].after(m),s.push(m),p.push(g)}q.set(t,{direction:n,gutterSize:o,panes:d,gutters:s}),lr(t)||d.forEach(l=>{let g=j.get(l)?.size;g?(l.style.flexBasis=g,l.style.flexGrow="0"):(l.style.flexGrow="1",l.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((l,m)=>{it(l,d[m],d[m+1],n)})}),cr(t,()=>{p.forEach(l=>l()),s.forEach(l=>l.remove()),q.delete(t),d.forEach(l=>j.delete(l)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function ur(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ke(e){e.directive("pane",{priority:15,init(t,r,i){ot(),t.classList.add("nojs-pane"),j.has(t)||j.set(t,{size:i||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=j.get(t),o=t.closest("[data-direction='vertical']")?"height":"width";n.min&&(t.style[`min${o==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(t.style[`max${o==="width"?"Width":"Height"}`]=`${n.max}px`),ur(t,()=>{t.classList.remove("nojs-pane"),j.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function Se(e,t={}){je(e),ke(e)}function Le(){Ee()}var G={sorts:new Map};function Ce(){G.sorts.clear()}function Z(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function fr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function mr(e,t){let r=e.querySelector("tbody");if(!r)return null;let i=r.querySelector("[each]")||r.querySelector("[foreach]");if(!i)return null;let n=i.getAttribute("each")||i.getAttribute("foreach");if(!n)return null;let o=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return o?{iteratorVar:o[1],arrayPath:o[2].trim()}:null}function br(e,t){let r=t.split("."),i=e;for(let n of r){if(i==null)return;i=i[n]}return i}function Te(e,t,r){let i=t.split("."),n=e;for(let o=0;o<i.length-1;o++){if(n[i[o]]==null)return;n=n[i[o]]}n[i[i.length-1]]=r}function Ie(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return Number(e)-Number(t);case"date":return new Date(e).getTime()-new Date(t).getTime();default:return String(e).localeCompare(String(t))}}function gr(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function ze(e){e.directive("sortable",{priority:10,init(t){Z(),t.classList.add("nojs-sortable")}})}function Fe(e){e.directive("sort",{priority:11,init(t,r,i){Z();let n=i;if(!n)return;let o=t.getAttribute("sort-type")||"string",d=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;G.sorts.has(s)||G.sorts.set(s,{column:null,direction:null}),(d==="asc"||d==="desc")&&De(t,s,n,o,d,e);let p=()=>{let f=G.sorts.get(s),l;f.column!==n?l="asc":f.direction==="asc"?l="desc":f.direction==="desc"?l=null:l="asc",De(t,s,n,o,l,e)};t.addEventListener("click",p),fr(t,()=>{t.removeEventListener("click",p),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function De(e,t,r,i,n,o){let d=G.sorts.get(t);gr(t),n?(e.setAttribute("data-sort-dir",n),e.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),d.column=r,d.direction=n):(d.column=null,d.direction=null);let s=mr(t,o);if(s){let p=o.findContext(t),f=p?br(p,s.arrayPath):null;if(Array.isArray(f)){if(!n){let m=t._nojsOriginalOrder;if(m){let g=new Set(f),c=m.filter(a=>g.has(a));for(let a of f)m.includes(a)||c.push(a);Te(p,s.arrayPath,c)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...f]);let l=[...f].sort((m,g)=>{let c=m!=null?m[r]:null,a=g!=null?g[r]:null,u=Ie(c,a,i);return n==="desc"?-u:u});Te(p,s.arrayPath,l);return}}hr(t,e,r,i,n)}function hr(e,t,r,i,n){let o=e.querySelector("tbody");if(!o)return;let p=[...t.closest("tr").children].indexOf(t);if(p<0)return;let f=[...o.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...f]),!n){let m=document.createDocumentFragment();for(let g of e._nojsOriginalRows)m.appendChild(g);o.appendChild(m);return}f.sort((m,g)=>{let c=m.children[p]?.textContent?.trim()||"",a=g.children[p]?.textContent?.trim()||"",u=Ie(i==="number"?parseFloat(c.replace(/[^0-9.\-]/g,""))||0:c,i==="number"?parseFloat(a.replace(/[^0-9.\-]/g,""))||0:a,i);return n==="desc"?-u:u});let l=document.createDocumentFragment();for(let m of f)l.appendChild(m);o.appendChild(l)}function Pe(e){e.directive("fixed-header",{priority:10,init(t){Z(),t.classList.add("nojs-fixed-header")}})}function Me(e){e.directive("fixed-col",{priority:10,init(t){Z(),t.classList.add("nojs-fixed-col")}})}function qe(e,t={}){ze(e),Fe(e),Pe(e),Me(e)}function Be(){Ce()}var vr={name:"nojs-elements",install(e,t={}){wt(e,t),jt(e,t),Ft(e,t),Gt(e,t),Zt(e,t),ne(e,t),ue(e,t),he(e,t),Ae(e,t),Se(e,t),qe(e,t)},dispose(e){At(),kt(),Pt(),Wt(),Qt(),ie(),fe(),ve(),Le(),Be()}},ht=vr;typeof window<"u"&&(window.NoJSElements=ht,window.NoJS&&typeof window.NoJS.use=="function"&&window.NoJS.use(ht));})();
//# sourceMappingURL=nojs-elements.js.map
