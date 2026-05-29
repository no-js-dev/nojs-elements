/**
 * NoJS Elements v1.12.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
var U=new Map,C=new Map;function yt(){for(let e of C.values())clearTimeout(e);C.clear();for(let e of U.values())e.remove();U.clear()}function xt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function $e(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var N=8;function Re(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,l=window.innerHeight,s,u;switch(r){case"bottom":s=i.bottom+N,u=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,u=i.left-o.width-N;break;case"right":s=i.top+(i.height-o.height)/2,u=i.right+N;break;default:s=i.top-o.height-N,u=i.left+(i.width-o.width)/2;break}u<4&&(u=4),u+o.width>n-4&&(u=n-o.width-4),s<4&&(s=4),s+o.height>l-4&&(s=l-o.height-4),e.style.top=`${s}px`,e.style.left=`${u}px`}var Oe=0;function Ge(e,t,r){document.body.appendChild(t),Re(t,e,r),t.setAttribute("aria-hidden","false")}function We(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function wt(e){e.directive("tooltip",{priority:20,init(t,r,i){xt();let o=i;if(!o){console.warn("[tooltip] attribute value (tooltip text) is required.");return}let n=t.getAttribute("tooltip-position")||"top",l=parseInt(t.getAttribute("tooltip-delay"),10)||300,s=t.getAttribute("tooltip-disabled"),u=s?e.findContext(t):null,f=`nojs-tooltip-${++Oe}`,p=document.createElement("div");p.className="nojs-tooltip",p.setAttribute("role","tooltip"),p.setAttribute("id",f),p.setAttribute("aria-hidden","true"),p.textContent=o,t.setAttribute("aria-describedby",f),U.set(t,p);let m=()=>{if(s&&u&&e.evaluate(s,u))return;C.has(t)&&clearTimeout(C.get(t));let y=setTimeout(()=>{C.delete(t),!(s&&u&&e.evaluate(s,u))&&Ge(t,p,n)},l);C.set(t,y)},g=()=>{C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),We(t,p)},d=()=>m(),a=()=>g(),c=()=>m(),b=()=>g(),h=y=>{y.key==="Escape"&&p.getAttribute("aria-hidden")==="false"&&g()};t.addEventListener("mouseenter",d),t.addEventListener("mouseleave",a),t.addEventListener("focusin",c),t.addEventListener("focusout",b),t.addEventListener("keydown",h),$e(t,()=>{t.removeEventListener("mouseenter",d),t.removeEventListener("mouseleave",a),t.removeEventListener("focusin",c),t.removeEventListener("focusout",b),t.removeEventListener("keydown",h),C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),p.remove(),U.delete(t)})}})}function At(e,t={}){wt(e)}function Et(){yt()}var _=new Map;function jt(){_.clear()}function Q(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function ct(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var B=8;function dt(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,l=window.innerHeight,s,u;switch(r){case"top":s=i.top-o.height-B,u=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,u=i.left-o.width-B;break;case"right":s=i.top+(i.height-o.height)/2,u=i.right+B;break;default:s=i.bottom+B,u=i.left+(i.width-o.width)/2;break}r==="bottom"&&s+o.height>l&&(s=i.top-o.height-B),r==="top"&&s<0&&(s=i.bottom+B),u<4&&(u=4),u+o.width>n-4&&(u=n-o.width-4),s<4&&(s=4),s+o.height>l-4&&(s=l-o.height-4),e.style.top=`${s}px`,e.style.left=`${u}px`}function kt(e){e.directive("popover",{priority:20,init(r,i,o){Q();let n=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",n),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let l=r.getAttribute("popover-position")||"bottom";if(!_.has(n))_.set(n,{popoverEl:r,triggerEls:new Set,position:l,open:!1});else{let u=_.get(n);u.popoverEl=r,u.position=l}let s=u=>{let f=_.get(n);if(!f)return;let p=u.newState==="open";f.open=p;for(let m of f.triggerEls)m.setAttribute("aria-expanded",String(p))};r.addEventListener("toggle",s),ct(r,()=>{r.removeEventListener("toggle",s),_.delete(n)})}}),e.directive("popover-trigger",{priority:20,init(r,i,o){Q();let n=o;if(!n){let f=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(f&&(n=f.getAttribute("data-popover-id")),!n){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",n),_.has(n)||_.set(n,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),_.get(n).triggerEls.add(r);let l=u=>{let f=_.get(n);if(!f||!f.popoverEl){console.warn(`[popover-trigger] no popover found with id "${n}".`);return}f.popoverEl.togglePopover(),requestAnimationFrame(()=>{f.popoverEl.matches(":popover-open")&&dt(f.popoverEl,r,f.position)})};r.addEventListener("click",l);let s=u=>{let f=_.get(n);u.key==="Escape"&&f?.open&&(f.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),ct(r,()=>{r.removeEventListener("click",l),document.removeEventListener("keydown",s);let u=_.get(n);u&&u.triggerEls.delete(r)})}}),e.directive("popover-dismiss",{priority:20,init(r){Q();let i=()=>{let o=r.closest(".nojs-popover");o&&o.hidePopover()};r.addEventListener("click",i),ct(r,()=>r.removeEventListener("click",i))}});let t=(r,i)=>t.open(r,i);t.open=(r,i)=>{let o=_.get(r);if(!o||!o.popoverEl)return!1;try{o.popoverEl.showPopover()}catch{return!1}let n=i||[...o.triggerEls][0];return n&&requestAnimationFrame(()=>dt(o.popoverEl,n,o.position)),!0},t.close=r=>{let i=_.get(r);if(!i||!i.popoverEl)return!1;try{i.popoverEl.hidePopover()}catch{}return!0},t.toggle=(r,i)=>{let o=_.get(r);if(!o||!o.popoverEl)return!1;o.popoverEl.togglePopover();let n=i||[...o.triggerEls][0];return n&&o.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>dt(o.popoverEl,n,o.position)),!0},e.popover=t}function _t(e,t={}){kt(e)}function St(){jt()}var L=[],T=new Map,Ve=1e4;function Lt(){return Ve+L.length}function Ct(){L.length=0,T.clear()}function H(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function Ue(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Dt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',lt=new WeakMap;function Ke(e){let t=r=>{if(r.key!=="Tab")return;let i=[...e.querySelectorAll(Dt)].filter(l=>l.offsetParent!==null);if(i.length===0){r.preventDefault();return}let o=i[0],n=i[i.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),n.focus()):document.activeElement===n&&(r.preventDefault(),o.focus())};e.addEventListener("keydown",t),lt.set(e,t)}function Tt(e){let t=lt.get(e);t&&(e.removeEventListener("keydown",t),lt.delete(e))}var K=new WeakMap;function It(e){e.directive("modal",{priority:10,init(r,i,o){H();let n=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${n}`,r.setAttribute("data-modal-id",n),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let l=r.querySelector("h1, h2, h3, h4, h5, h6");l&&(l.id||(l.id=`nojs-modal-heading-${n}`),r.setAttribute("aria-labelledby",l.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let u=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),p=g=>{g.target===r&&s!=="false"&&f!=="false"&&$(r,n)};r.addEventListener("click",p),T.set(n,r);let m=g=>{if(g.newState==="open"){if(r.style.zIndex=String(Lt()),u&&u.split(/\s+/).filter(Boolean).forEach(d=>r.classList.add(d)),requestAnimationFrame(()=>{let d=r.querySelector(Dt);d?d.focus():r.focus()}),Ke(r),f!=="false"){let d=a=>{a.key==="Escape"&&(a.stopPropagation(),$(r,n))};r.addEventListener("keydown",d),K.set(r,d)}}else if(g.newState==="closed"){u&&u.split(/\s+/).filter(Boolean).forEach(c=>r.classList.remove(c)),Tt(r);let d=K.get(r);d&&(r.removeEventListener("keydown",d),K.delete(r));let a=L.findIndex(c=>c.id===n);if(a!==-1){let c=L[a];L.splice(a,1),c.triggerEl&&requestAnimationFrame(()=>{c.triggerEl.focus()})}}};r.addEventListener("toggle",m),Ue(r,()=>{r.removeEventListener("click",p),r.removeEventListener("toggle",m),Tt(r);let g=K.get(r);g&&(r.removeEventListener("keydown",g),K.delete(r)),T.delete(n);let d=L.findIndex(a=>a.id===n);d!==-1&&L.splice(d,1)})}});let t=r=>t.open(r);t.open=r=>{let i=T.get(r);if(!i)return!1;L.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},t.close=r=>{let i=T.get(r);return i?($(i,r),!0):!1},t.closeAll=()=>{for(let r=L.length-1;r>=0;r--)$(L[r].el,L[r].id)},e.modal=t}function $(e,t){try{e.hidePopover()}catch{}}function Ye(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function zt(e){e.directive("modal-open",{priority:10,init(t,r,i){H();let o=i;if(!o){let m=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(m&&(o=m.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let n=()=>{let p=T.get(o)||document.querySelector(`[data-modal-id="${o}"]`);if(!p){console.warn(`[modal-open] modal "${o}" not found`);return}L.push({id:o,el:p,triggerEl:t}),t.setAttribute("aria-expanded","true"),p.id&&t.setAttribute("aria-controls",p.id);try{p.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`)}},l=()=>{t.setAttribute("aria-expanded","false")},s=null,u=null;requestAnimationFrame(()=>{let p=T.get(o);p&&(u=p,s=m=>{m.newState==="closed"&&t.setAttribute("aria-expanded","false")},p.addEventListener("toggle",s))}),t.addEventListener("click",n),Ye(t,()=>{t.removeEventListener("click",n),u&&s&&u.removeEventListener("toggle",s)})}})}function Xe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ft(e){e.directive("modal-close",{priority:10,init(t,r,i){H();let o=()=>{let n,l;if(i){if(l=i,n=T.get(l),!n){console.warn(`[modal-close] modal "${l}" not found`);return}}else{if(n=t.closest("[modal]"),!n){console.warn("[modal-close] no parent modal found");return}l=n.getAttribute("modal")}$(n,l)};t.addEventListener("click",o),Xe(t,()=>{t.removeEventListener("click",o)})}})}function Pt(e,t={}){It(e),zt(e),Ft(e)}function Mt(){Ct()}var Y={openMenus:new Map};function qt(){Y.openMenus.clear()}function R(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}function Ze(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Bt(e,t,r){let i=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let n=t.getBoundingClientRect(),l=e.getBoundingClientRect(),s=window.innerHeight,u=window.innerWidth,f,p;switch(i){case"top":f=n.top-l.height,p=n.left;break;case"left":f=n.top,p=n.left-l.width;break;case"right":f=n.top,p=n.right;break;default:f=n.bottom,p=n.left}i==="bottom"||i==="top"?o==="end"&&(p=n.right-l.width):o==="end"&&(f=n.bottom-l.height),i==="bottom"&&f+l.height>s&&n.top-l.height>0?f=n.top-l.height:i==="top"&&f<0&&n.bottom+l.height<=s&&(f=n.bottom),p<4&&(p=4),p+l.width>u-4&&(p=u-l.width-4),e.style.top=`${f}px`,e.style.left=`${p}px`}function ut(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function pt(e){let t=ut(e);t.length&&t[0].focus()}function Ht(e){let t=ut(e);t.length&&t[t.length-1].focus()}function $t(e){e.directive("dropdown",{priority:15,init(r){R()}}),e.directive("dropdown-toggle",{priority:15,init(r){R();let i=r.closest("[dropdown]");if(!i)return;let o=i.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${Math.random().toString(36).slice(2,7)}`),r.setAttribute("aria-controls",o.id);function n(){o.setAttribute("data-open",""),o.showPopover&&o.showPopover(),r.setAttribute("aria-expanded","true"),Bt(o,r,i),Y.openMenus.set(o,{toggle:r,wrapper:i})}function l(){o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),Y.openMenus.delete(o)}function s(){return r.getAttribute("aria-expanded")==="true"}let u=c=>{c.newState==="closed"&&s()&&l()};o.addEventListener("toggle",u);let f=c=>{c.preventDefault(),c.stopPropagation(),s()?l():n()};r.addEventListener("click",f);let p=c=>{s()&&!i.contains(c.target)&&l()};document.addEventListener("click",p,!0);let m=c=>{c.key==="Escape"&&s()&&(l(),r.focus())};document.addEventListener("keydown",m);let g=c=>{switch(c.key){case"Enter":case" ":c.preventDefault(),n(),pt(o);break;case"ArrowDown":c.preventDefault(),n(),pt(o);break;case"ArrowUp":c.preventDefault(),n(),Ht(o);break}};r.addEventListener("keydown",g);let d=c=>{if(!(!s()||ut(o).find(y=>y===document.activeElement)))switch(c.key){case"ArrowDown":c.preventDefault(),pt(o);break;case"ArrowUp":c.preventDefault(),Ht(o);break}};o.addEventListener("keydown",d);let a=()=>{s()&&Bt(o,r,i)};window.addEventListener("scroll",a,!0),window.addEventListener("resize",a),Ze(r,()=>{r.removeEventListener("click",f),r.removeEventListener("keydown",g),o.removeEventListener("keydown",d),o.removeEventListener("toggle",u),document.removeEventListener("click",p,!0),document.removeEventListener("keydown",m),window.removeEventListener("scroll",a,!0),window.removeEventListener("resize",a),Y.openMenus.delete(o)})}}),e.directive("dropdown-menu",{priority:15,init(r){R(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")==="true"?!1:(n.click(),!0)},t.close=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")!=="true"?!1:(n.click(),!0)},e.dropdown=t}function Rt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ne(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function Ot(e){e.directive("dropdown-item",{priority:15,init(t){R();let r=t.closest("[dropdown-menu]"),i=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let o=l=>{if(!r)return;let s=Ne(r),u=s.indexOf(t);switch(l.key){case"ArrowDown":{l.preventDefault(),(u+1<s.length?s[u+1]:s[0]).focus();break}case"ArrowUp":{l.preventDefault(),(u-1>=0?s[u-1]:s[s.length-1]).focus();break}case"Home":{l.preventDefault(),s.length&&s[0].focus();break}case"End":{l.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{l.preventDefault(),t.click();break}case"Escape":{if(l.preventDefault(),r)try{r.hidePopover()}catch{}if(i){let f=i.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{if(r)try{r.hidePopover()}catch{}break}}};t.addEventListener("keydown",o),Rt(t,()=>t.removeEventListener("keydown",o));let n=()=>{if(r)try{r.hidePopover()}catch{}if(i){let l=i.querySelector("[dropdown-toggle]");l&&l.focus()}};t.addEventListener("click",n),Rt(t,()=>t.removeEventListener("click",n))}})}function Gt(e,t={}){$t(e),Ot(e)}function Wt(){qt()}var D=new Map,O=new Set,Vt=0;function Ut(){return++Vt}function Kt(){for(let e of O)clearTimeout(e);O.clear();for(let e of D.values())e.remove();D.clear(),Vt=0}function Yt(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function ft(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Qe=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function mt(){return D.size>0?D.values().next().value:Je("top-right")}function Je(e){if(D.has(e))return D.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),D.set(e,t),t}function tr(e){return e.startsWith("top")}function bt(e,t,r,i,o){let n=Ut(),l=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",n),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let u=document.createElement("span");if(u.textContent=t,s.appendChild(u),o){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>J(s)),s.appendChild(f)}if(tr(l)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),i>0){let f=setTimeout(()=>{O.delete(f),J(s)},i);O.add(f),s._toastTimerId=f}return s}function J(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),O.delete(e._toastTimerId)),e.remove())}function Xt(e){Yt(),e.directive("toast-container",{priority:10,init(r,i,o){let n=o&&Qe.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",n),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),D.set(n,r),ft(r,()=>{D.get(n)===r&&D.delete(n)})}}),e.directive("toast",{priority:10,init(r,i,o){if(!o)return;let n=r.getAttribute("toast-type")||"info",l=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let d=()=>{let a=mt();bt(a,o,n,l,s)};r.addEventListener("click",d),ft(r,()=>r.removeEventListener("click",d));return}let f=e.findContext(r),p;function m(){let d=e.evaluate(o,f);if(d&&d!==p){let a=typeof d=="string"?d:String(d),c=mt();bt(c,a,n,l,s)}p=d}let g=f.$watch(m);ft(r,g)}});let t=(r,i="info",o=3e3)=>{if(typeof document>"u")return;let n=!0,l=mt();return bt(l,String(r),i,o,n)};t.dismiss=r=>{let i=document.querySelector(`[data-toast-id="${r}"]`);i&&J(i)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>J(r))},e.toast=t}function Zt(e,t={}){Xt(e)}function Nt(){Kt()}var P={containers:new Map};function Qt(){P.containers.clear()}function Jt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function er(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var rr=0;function te(e){return`${e}-${++rr}`}function gt(e,t){let r=P.containers.get(e);if(!r)return;let{tabs:i,panels:o}=r;if(!(t<0||t>=i.length)&&i[t].getAttribute("aria-disabled")!=="true"){for(let n=0;n<i.length;n++)i[n].setAttribute("aria-selected","false"),i[n].setAttribute("tabindex","-1"),o[n].setAttribute("aria-hidden","true"),o[n].inert=!0;i[t].setAttribute("aria-selected","true"),i[t].setAttribute("tabindex","0"),o[t].setAttribute("aria-hidden","false"),o[t].inert=!1,r.activeIndex=t}}function X(e,t,r){let i=e.length,o=t;for(let n=0;n<i;n++)if(o=(o+r+i)%i,e[o].getAttribute("aria-disabled")!=="true")return o;return t}function ee(e){e.directive("tabs",{priority:10,init(t,r,i){Jt();let o=[],n=[];for(let a of Array.from(t.children))a.hasAttribute("tab")?o.push(a):a.hasAttribute("panel")&&n.push(a);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==n.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+n.length+" panels.");let l=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",l),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let u=Math.min(o.length,n.length);for(let a=0;a<u;a++){let c=o[a],b=n[a],h=c.id||te("nojs-tab"),y=b.id||te("nojs-panel");c.id=h,b.id=y,c.setAttribute("role","tab"),c.setAttribute("aria-selected","false"),c.setAttribute("aria-controls",y),c.setAttribute("tabindex","-1"),c.classList.add("nojs-tab"),b.setAttribute("role","tabpanel"),b.setAttribute("aria-labelledby",h),b.setAttribute("tabindex","0"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel"),s.appendChild(c)}let f=n[0];f?t.insertBefore(s,f):t.appendChild(s),P.containers.set(t,{tabs:o.slice(0,u),panels:n.slice(0,u),activeIndex:-1});let p=e.findContext(t);for(let a=0;a<u;a++){let c=o[a].getAttribute("tab-disabled");c&&e.evaluate(c,p)&&o[a].setAttribute("aria-disabled","true")}let m=0;if(i&&i.trim()!==""){let a=parseInt(i,10);!isNaN(a)&&a>=0&&a<u&&(m=a)}o[m]?.getAttribute("aria-disabled")==="true"&&(m=X(o.slice(0,u),m,1)),gt(t,m);let g=a=>{let c=P.containers.get(t);if(!c)return;let b=a.target;if(b.getAttribute("role")!=="tab")return;let{tabs:h}=c,y=h.indexOf(b);if(y===-1)return;let w=-1;switch(a.key){case"ArrowRight":case"ArrowDown":w=X(h,y,1);break;case"ArrowLeft":case"ArrowUp":w=X(h,y,-1);break;case"Home":w=X(h,h.length-1,1);break;case"End":w=X(h,0,-1);break;case"Tab":return;default:return}w!==-1&&w!==y&&(a.preventDefault(),gt(t,w),h[w].focus())};s.addEventListener("keydown",g);let d=a=>{let c=a.target.closest("[role='tab']");if(!c)return;let b=P.containers.get(t);if(!b)return;let h=b.tabs.indexOf(c);h!==-1&&(gt(t,h),c.focus())};s.addEventListener("click",d),er(t,()=>{s.removeEventListener("keydown",g),s.removeEventListener("click",d),P.containers.delete(t)})}})}function re(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function oe(e){e.directive("panel",{priority:11,init(){}})}function ne(e,t={}){ee(e),re(e),oe(e)}function ie(){Qt()}var E={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function se(){E.branches.clear(),E.selectedItem=null,E.typeahead="",E.typeaheadTimer&&(clearTimeout(E.typeaheadTimer),E.typeaheadTimer=null)}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function ht(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ae(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)t.push(i);return t}function ce(e){return e.closest('[role="tree"]')}function or(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(t.textContent||"").trim().toLowerCase()}function de(e){e.directive("tree",{priority:15,init(t){tt(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function le(e){e.directive("branch",{priority:16,init(t,r,i){tt();let o=i==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(o));let n=ce(t);if(n){let d=n.querySelector('[role="treeitem"]');t.setAttribute("tabindex",d===t?"0":"-1")}else t.setAttribute("tabindex","0");let l=!1;queueMicrotask(()=>{if(l)return;let d=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);d?(E.branches.set(t,{expanded:o,subtreeEl:d}),d.setAttribute("aria-hidden",String(!o))):E.branches.set(t,{expanded:o,subtreeEl:null})});function s(d){let a=E.selectedItem;a&&a!==d&&(a.classList.remove("nojs-branch-selected"),a.setAttribute("aria-selected","false")),d.classList.add("nojs-branch-selected"),d.setAttribute("aria-selected","true"),E.selectedItem=d}function u(d){let a=E.branches.get(d);!a||!a.subtreeEl||(a.expanded=!a.expanded,d.setAttribute("aria-expanded",String(a.expanded)),a.subtreeEl.setAttribute("aria-hidden",String(!a.expanded)))}function f(d){let a=E.branches.get(d);!a||!a.subtreeEl||a.expanded||(a.expanded=!0,d.setAttribute("aria-expanded","true"),a.subtreeEl.setAttribute("aria-hidden","false"))}function p(d){let a=E.branches.get(d);!a||!a.subtreeEl||!a.expanded||(a.expanded=!1,d.setAttribute("aria-expanded","false"),a.subtreeEl.setAttribute("aria-hidden","true"))}let m=d=>{d.target!==t&&!t.contains(d.target)||(d.stopPropagation(),s(t),u(t))};t.addEventListener("click",m),ht(t,()=>t.removeEventListener("click",m));let g=d=>{let a=ce(t);if(!a)return;let c=ae(a),b=c.indexOf(t),h=E.branches.get(t),y=h&&h.subtreeEl;switch(d.key){case"ArrowRight":if(d.preventDefault(),y&&!h.expanded)f(t);else if(y&&h.expanded){let w=h.subtreeEl.querySelector('[role="treeitem"]');w&&M(w,c)}break;case"ArrowLeft":if(d.preventDefault(),y&&h.expanded)p(t);else{let w=t.parentElement?.closest('[role="treeitem"]');w&&M(w,ae(a))}break;case"ArrowDown":d.preventDefault(),b<c.length-1&&M(c[b+1],c);break;case"ArrowUp":d.preventDefault(),b>0&&M(c[b-1],c);break;case"Enter":case" ":d.preventDefault(),s(t),u(t);break;case"Home":d.preventDefault(),c.length>0&&M(c[0],c);break;case"End":d.preventDefault(),c.length>0&&M(c[c.length-1],c);break;default:if(d.key.length===1&&!d.ctrlKey&&!d.altKey&&!d.metaKey){d.preventDefault(),E.typeahead+=d.key.toLowerCase(),E.typeaheadTimer&&clearTimeout(E.typeaheadTimer),E.typeaheadTimer=setTimeout(()=>{E.typeahead="",E.typeaheadTimer=null},500);let w=b+1;for(let I=0;I<c.length;I++){let z=(w+I)%c.length;if(or(c[z]).startsWith(E.typeahead)){M(c[z],c);break}}}break}};t.addEventListener("keydown",g),ht(t,()=>t.removeEventListener("keydown",g)),ht(t,()=>{l=!0,E.branches.delete(t),E.selectedItem===t&&(E.selectedItem=null)})}})}function M(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function pe(e){e.directive("subtree",{priority:16,init(t){tt(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let i of t.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let i=E.branches.get(r);i?(t.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function ue(e,t={}){de(e),le(e),pe(e)}function fe(){se()}var et=new Map;function me(){et.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function nr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function be(e){e.directive("stepper",{priority:14,init(t,r,i){rt();let o=e.findContext(t),n=Array.from(t.querySelectorAll("[step]"));if(!n.length){console.warn("[stepper] No [step] children found.");return}let l=i&&parseInt(i,10)||0,s=t.getAttribute("stepper-mode")||"linear",u=t.getAttribute("stepper-indicator")!=="false",f=t.getAttribute("stepper-nav")!=="false",p=t.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(l,n.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",p),t.classList.add("nojs-stepper");let g=null,d=[];u&&(g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),n.forEach((x,A)=>{if(A>0){let at=document.createElement("div");at.className="nojs-stepper-separator",at.setAttribute("aria-hidden","true"),g.appendChild(at)}let j=document.createElement("button");j.type="button",j.className="nojs-stepper-indicator-item",j.setAttribute("role","tab"),j.setAttribute("aria-selected",A===m?"true":"false");let V=x.getAttribute("step-label")||`Step ${A+1}`,F=document.createElement("span");F.textContent=V,j.appendChild(F),j.setAttribute("aria-label",V);let He=`nojs-stepper-tab-${ir++}`;j.id=He,s==="free"?(j.setAttribute("data-clickable",""),j.addEventListener("click",()=>z(A))):j.setAttribute("tabindex","-1"),g.appendChild(j),d.push(j)}),g.addEventListener("keydown",x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let A=m;x.key==="ArrowRight"?A=Math.min(m+1,n.length-1):x.key==="ArrowLeft"?A=Math.max(m-1,0):x.key==="Home"?A=0:x.key==="End"&&(A=n.length-1),s==="free"&&z(A),d[A]?.focus()}),t.insertBefore(g,t.firstChild));let a=null,c=null,b=null;f&&(a=document.createElement("div"),a.className="nojs-stepper-nav",a.setAttribute("aria-hidden","true"),c=document.createElement("button"),c.type="button",c.className="nojs-stepper-prev",c.textContent="Previous",c.addEventListener("click",()=>I()),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-next",b.textContent="Next",b.addEventListener("click",()=>w()),a.appendChild(c),a.appendChild(b),t.appendChild(a));function h(x){let A=n[x];if(!A)return!0;let j=A.querySelectorAll("[required]");for(let F of j)if(typeof F.checkValidity=="function"&&!F.checkValidity())return F.reportValidity(),!1;let V=A.getAttribute("step-validate");if(V)try{if(!e.evaluate(V,o))return!1}catch(F){return console.warn(`[stepper] step-validate error: ${F.message}`),!1}return!0}function y(){n.forEach((x,A)=>{let j=A===m;x.setAttribute("aria-hidden",j?"false":"true"),j?(x.removeAttribute("inert"),x.setAttribute("aria-current","step")):(x.setAttribute("inert",""),x.removeAttribute("aria-current"))}),d.length&&d.forEach((x,A)=>{x.setAttribute("aria-selected",A===m?"true":"false"),A<m?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",A===m?"0":"-1");let j=n[A];j.id&&(x.setAttribute("aria-controls",j.id),j.setAttribute("aria-labelledby",x.id))}),c&&(c.disabled=m===0),b&&(b.textContent=m===n.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:m,total:n.length}}))}function w(){return m>=n.length-1||s==="linear"&&!h(m)?!1:(m++,y(),W(),!0)}function I(){return m<=0?!1:(m--,y(),W(),!0)}function z(x){if(x<0||x>=n.length||x===m)return!1;if(s==="linear"&&x>m){for(let A=m;A<x;A++)if(!h(A))return!1}return m=x,y(),W(),!0}let st={get current(){return m},get total(){return n.length},next:w,prev:I,goTo:z,get isFirst(){return m===0},get isLast(){return m===n.length-1}};function W(){o.$stepper=st}W(),et.set(t,{current:m,steps:n,mode:s,indicatorEl:g,navEl:a}),y(),nr(t,()=>{et.delete(t),g&&g.parentNode&&g.remove(),a&&a.parentNode&&a.remove(),delete o.$stepper})}})}var ir=0;var sr=0;function ge(e){e.directive("step",{priority:13,init(t,r,i){rt(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${sr++}`),t.setAttribute("tabindex","0")}})}function he(e,t={}){ge(e),be(e)}function ve(){me()}function ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function xe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function we(e){e.directive("skeleton",{priority:10,init(t,r,i){ye();let o=e.findContext(t),n=t.getAttribute("skeleton-type")||"text",l=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),u=[];function f(b){p();for(let h=0;h<b;h++){let y=document.createElement("div");y.className="nojs-skeleton-line",t.appendChild(y),u.push(y)}}function p(){for(let b of u)b.parentNode===t&&t.removeChild(b);u=[]}function m(){if(t.classList.add("nojs-skeleton"),n==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(n==="circle"||n==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");t.style.width=b,t.style.height=b}if(l){let b=parseInt(l,10);b>0&&f(b)}t.setAttribute("aria-busy","true")}function g(){t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),p(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let b=!1,h=()=>{b||(b=!0,t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",h))};t.addEventListener("transitionend",h),setTimeout(h,500)}let d=!1;function a(){let b=!!e.evaluate(i,o);b&&!d?(d=!0,m()):!b&&d&&(d=!1,g())}a();let c=o.$watch(a);xe(t,c),xe(t,()=>{d&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),p(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""))})}})}function Ae(e,t={}){we(e)}var q=new Map,k=new Map,v={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Ee(){q.clear(),k.clear(),v.active=!1,v.splitEl=null,v.gutterEl=null,v.prevPane=null,v.nextPane=null,v.direction=null,v.startPos=0,v.startPrevSize=0,v.startNextSize=0,v.containerSize=0}function ot(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function ar(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function je(e){return e==="horizontal"?"clientX":"clientY"}function S(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function cr(e,t){let i=(q.get(e)?.gutters||[]).reduce((o,n)=>o+S(n,t),0);return S(e,t)-i}function nt(e,t){let r=k.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function it(e,t,r,i){let o=S(t,i),n=S(r,i),l=k.get(t),s=k.get(r);e.setAttribute("aria-valuenow",Math.round(o)),e.setAttribute("aria-valuemin",l?.min||0),e.setAttribute("aria-valuemax",Math.round(o+n-(s?.min||0)))}function vt(e){let t=e.getAttribute("split-persist");if(!t)return;let r=q.get(e);if(!r)return;let i=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(i))}catch{}}function dr(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let i=JSON.parse(r),o=q.get(e);return!o||i.length!==o.panes.length?!1:(i.forEach((n,l)=>{n&&(o.panes[l].style.flexBasis=n,o.panes[l].style.flexGrow="0")}),!0)}catch{return!1}}function lr(e,t,r,i,o){let n=document.createElement("div");n.className="nojs-gutter",n.setAttribute("role","separator"),n.setAttribute("tabindex","0"),n.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),n.setAttribute("aria-label","Resize"),o!==6&&n.style.setProperty("--nojs-gutter-size",`${o}px`);let l=d=>{if(d.button!==0)return;d.preventDefault();let a=cr(e,t);v.active=!0,v.splitEl=e,v.gutterEl=n,v.prevPane=r,v.nextPane=i,v.direction=t,v.startPos=d[je(t)],v.startPrevSize=S(r,t),v.startNextSize=S(i,t),v.containerSize=a,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",n.setPointerCapture(d.pointerId)},s=d=>{if(!v.active||v.gutterEl!==n)return;let a=d[je(v.direction)]-v.startPos,c=nt(v.startPrevSize+a,v.prevPane),b=nt(v.startNextSize-a,v.nextPane),h=v.startPrevSize+v.startNextSize;c+b!==h&&(c!==v.startPrevSize+a?b=h-c:c=h-b),v.prevPane.style.flexBasis=`${c}px`,v.prevPane.style.flexGrow="0",v.nextPane.style.flexBasis=`${b}px`,v.nextPane.style.flexGrow="0",it(n,v.prevPane,v.nextPane,v.direction)},u=()=>{!v.active||v.gutterEl!==n||(v.active=!1,document.body.style.cursor="",document.body.style.userSelect="",vt(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};n.addEventListener("pointerdown",l),n.addEventListener("pointermove",s),n.addEventListener("pointerup",u),n.addEventListener("pointercancel",u);let f=10,p=d=>{let a=t==="horizontal",c=0;if(a&&d.key==="ArrowRight"||!a&&d.key==="ArrowDown")c=f;else if(a&&d.key==="ArrowLeft"||!a&&d.key==="ArrowUp")c=-f;else if(d.key==="Home")c=(k.get(r)?.min||0)-S(r,t);else if(d.key==="End"){let z=k.get(i);c=S(r,t)+S(i,t)-(z?.min||0)-S(r,t)}else return;d.preventDefault();let b=S(r,t),h=S(i,t),y=b+h,w=nt(b+c,r),I=nt(y-w,i);w=y-I,r.style.flexBasis=`${w}px`,r.style.flexGrow="0",i.style.flexBasis=`${I}px`,i.style.flexGrow="0",it(n,r,i,t),vt(e)};n.addEventListener("keydown",p);let m=()=>{let d=k.get(r),a=k.get(i),c=d?.collapsible?r:a?.collapsible?i:null;if(!c)return;let b=k.get(c);if(!b)return;let h=c===r?i:r,y=S(r,t)+S(i,t);if(b.collapsed){b.collapsed=!1,c.removeAttribute("data-collapsed");let w=b.preCollapseSize||`${Math.round(y/2)}px`;c.style.flexBasis=w,c.style.flexGrow="0",h.style.flexBasis=`${y-parseFloat(w)}px`,h.style.flexGrow="0"}else b.preCollapseSize=c.style.flexBasis||`${S(c,t)}px`,b.collapsed=!0,c.setAttribute("data-collapsed","true"),c.style.flexBasis="0px",c.style.flexGrow="0",h.style.flexBasis=`${y}px`,h.style.flexGrow="0";it(n,r,i,t),vt(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:c,collapsed:b.collapsed}}))};return n.addEventListener("dblclick",m),{gutter:n,cleanup:()=>{n.removeEventListener("pointerdown",l),n.removeEventListener("pointermove",s),n.removeEventListener("pointerup",u),n.removeEventListener("pointercancel",u),n.removeEventListener("keydown",p),n.removeEventListener("dblclick",m)}}}function ke(e){e.directive("split",{priority:14,init(t,r,i){ot();let o=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",n=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",o);let l=Array.from(t.children).filter(p=>p.hasAttribute("pane"));if(l.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${l.length}.`);return}l.forEach(p=>{k.get(p)||k.set(p,{size:p.getAttribute("pane")||null,min:parseInt(p.getAttribute("pane-min"),10)||0,max:parseInt(p.getAttribute("pane-max"),10)||1/0,collapsible:p.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],u=[];for(let p=0;p<l.length-1;p++){let{gutter:m,cleanup:g}=lr(t,o,l[p],l[p+1],n);l[p].after(m),s.push(m),u.push(g)}q.set(t,{direction:o,gutterSize:n,panes:l,gutters:s}),dr(t)||l.forEach(p=>{let g=k.get(p)?.size;g?(p.style.flexBasis=g,p.style.flexGrow="0"):(p.style.flexGrow="1",p.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((p,m)=>{it(p,l[m],l[m+1],o)})}),ar(t,()=>{u.forEach(p=>p()),s.forEach(p=>p.remove()),q.delete(t),l.forEach(p=>k.delete(p)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function pr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function _e(e){e.directive("pane",{priority:15,init(t,r,i){ot(),t.classList.add("nojs-pane"),k.has(t)||k.set(t,{size:i||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=k.get(t),n=t.closest("[data-direction='vertical']")?"height":"width";o.min&&(t.style[`min${n==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(t.style[`max${n==="width"?"Width":"Height"}`]=`${o.max}px`),pr(t,()=>{t.classList.remove("nojs-pane"),k.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function Se(e,t={}){ke(e),_e(e)}function Le(){Ee()}var G={sorts:new Map};function Ce(){G.sorts.clear()}function Z(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function ur(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function fr(e,t){let r=e.querySelector("tbody");if(!r)return null;let i=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?i=r:i=r.querySelector("[each]")||r.querySelector("[foreach]"),!i)return null;let o=i.getAttribute("each")||i.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim()}:null}function mr(e,t){let r=t.split("."),i=e;for(let o of r){if(i==null)return;i=i[o]}return i}function Te(e,t,r){let i=t.split("."),o=e;for(let n=0;n<i.length-1;n++){if(o[i[n]]==null)return;o=o[i[n]]}o[i[i.length-1]]=r}function Ie(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return Number(e)-Number(t);case"date":return new Date(e).getTime()-new Date(t).getTime();default:return String(e).localeCompare(String(t))}}function br(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function ze(e){e.directive("sortable",{priority:10,init(t){Z(),t.classList.add("nojs-sortable")}})}function Fe(e){e.directive("sort",{priority:11,init(t,r,i){Z();let o=i;if(!o)return;let n=t.getAttribute("sort-type")||"string",l=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;G.sorts.has(s)||G.sorts.set(s,{column:null,direction:null}),(l==="asc"||l==="desc")&&De(t,s,o,n,l,e);let u=()=>{let f=G.sorts.get(s),p;f.column!==o?p="asc":f.direction==="asc"?p="desc":f.direction==="desc"?p=null:p="asc",De(t,s,o,n,p,e)};t.addEventListener("click",u),ur(t,()=>{t.removeEventListener("click",u),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function De(e,t,r,i,o,n){let l=G.sorts.get(t);br(t),o?(e.setAttribute("data-sort-dir",o),e.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),l.column=r,l.direction=o):(l.column=null,l.direction=null);let s=fr(t,n);if(s){let u=n.findContext(t),f=u?mr(u,s.arrayPath):null;if(Array.isArray(f)){if(!o){let m=t._nojsOriginalOrder;if(m){let g=new Set(f),d=m.filter(a=>g.has(a));for(let a of f)m.includes(a)||d.push(a);Te(u,s.arrayPath,d)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...f]);let p=[...f].sort((m,g)=>{let d=m!=null?m[r]:null,a=g!=null?g[r]:null,c=Ie(d,a,i);return o==="desc"?-c:c});Te(u,s.arrayPath,p);return}}gr(t,e,r,i,o)}function gr(e,t,r,i,o){let n=e.querySelector("tbody");if(!n)return;let u=[...t.closest("tr").children].indexOf(t);if(u<0)return;let f=[...n.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...f]),!o){let m=document.createDocumentFragment();for(let g of e._nojsOriginalRows)m.appendChild(g);n.appendChild(m);return}f.sort((m,g)=>{let d=m.children[u]?.textContent?.trim()||"",a=g.children[u]?.textContent?.trim()||"",c=Ie(i==="number"?parseFloat(d.replace(/[^0-9.\-]/g,""))||0:d,i==="number"?parseFloat(a.replace(/[^0-9.\-]/g,""))||0:a,i);return o==="desc"?-c:c});let p=document.createDocumentFragment();for(let m of f)p.appendChild(m);n.appendChild(p)}function Pe(e){e.directive("fixed-header",{priority:10,init(t){Z(),t.classList.add("nojs-fixed-header")}})}function Me(e){e.directive("fixed-col",{priority:10,init(t){Z(),t.classList.add("nojs-fixed-col")}})}function qe(e,t={}){ze(e),Fe(e),Pe(e),Me(e)}function Be(){Ce()}var hr={name:"nojs-elements",install(e,t={}){At(e,t),_t(e,t),Pt(e,t),Gt(e,t),Zt(e,t),ne(e,t),ue(e,t),he(e,t),Ae(e,t),Se(e,t),qe(e,t)},dispose(e){Et(),St(),Mt(),Wt(),Nt(),ie(),fe(),ve(),Le(),Be()}},In=hr;export{In as default};
//# sourceMappingURL=nojs-elements.js.map
