/**
 * NoJS Elements v1.12.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
(()=>{var K=new Map,C=new Map;function wt(){for(let e of C.values())clearTimeout(e);C.clear();for(let e of K.values())e.remove();K.clear()}function At(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function Oe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Z=8;function Ge(e,t,r){let n=t.getBoundingClientRect(),o=e.getBoundingClientRect(),i=window.innerWidth,d=window.innerHeight,s,l;switch(r){case"bottom":s=n.bottom+Z,l=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,l=n.left-o.width-Z;break;case"right":s=n.top+(n.height-o.height)/2,l=n.right+Z;break;default:s=n.top-o.height-Z,l=n.left+(n.width-o.width)/2;break}l<4&&(l=4),l+o.width>i-4&&(l=i-o.width-4),s<4&&(s=4),s+o.height>d-4&&(s=d-o.height-4),e.style.top=`${s}px`,e.style.left=`${l}px`}var We=0;function Ve(e,t,r){document.body.appendChild(t),Ge(t,e,r),t.setAttribute("aria-hidden","false")}function Ue(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function Et(e){e.directive("tooltip",{priority:20,init(t,r,n){At();let o=n;if(!o){console.warn("[tooltip] attribute value (tooltip text) is required.");return}let i=t.getAttribute("tooltip-position")||"top",d=parseInt(t.getAttribute("tooltip-delay"),10)||300,s=t.getAttribute("tooltip-disabled"),l=s?e.findContext(t):null,f=`nojs-tooltip-${++We}`,p=document.createElement("div");p.className="nojs-tooltip",p.setAttribute("role","tooltip"),p.setAttribute("id",f),p.setAttribute("aria-hidden","true"),p.textContent=o,t.setAttribute("aria-describedby",f),K.set(t,p);let m=()=>{if(s&&l&&e.evaluate(s,l))return;C.has(t)&&clearTimeout(C.get(t));let y=setTimeout(()=>{C.delete(t),!(s&&l&&e.evaluate(s,l))&&Ve(t,p,i)},d);C.set(t,y)},g=()=>{C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),Ue(t,p)},c=()=>m(),a=()=>g(),u=()=>m(),h=()=>g(),b=y=>{y.key==="Escape"&&p.getAttribute("aria-hidden")==="false"&&g()};t.addEventListener("mouseenter",c),t.addEventListener("mouseleave",a),t.addEventListener("focusin",u),t.addEventListener("focusout",h),t.addEventListener("keydown",b),Oe(t,()=>{t.removeEventListener("mouseenter",c),t.removeEventListener("mouseleave",a),t.removeEventListener("focusin",u),t.removeEventListener("focusout",h),t.removeEventListener("keydown",b),C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),p.remove(),K.delete(t)})}})}function _t(e,t={}){Et(e)}function jt(){wt()}var k=new Map;function kt(){k.clear()}function Q(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function ct(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var H=8;function dt(e,t,r){let n=t.getBoundingClientRect(),o=e.getBoundingClientRect(),i=window.innerWidth,d=window.innerHeight,s,l;switch(r){case"top":s=n.top-o.height-H,l=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,l=n.left-o.width-H;break;case"right":s=n.top+(n.height-o.height)/2,l=n.right+H;break;default:s=n.bottom+H,l=n.left+(n.width-o.width)/2;break}r==="bottom"&&s+o.height>d&&(s=n.top-o.height-H),r==="top"&&s<0&&(s=n.bottom+H),l<4&&(l=4),l+o.width>i-4&&(l=i-o.width-4),s<4&&(s=4),s+o.height>d-4&&(s=d-o.height-4),e.style.top=`${s}px`,e.style.left=`${l}px`}function St(e){e.directive("popover",{priority:20,init(r,n,o){Q();let i=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let d=r.getAttribute("popover-position")||"bottom";if(!k.has(i))k.set(i,{popoverEl:r,triggerEls:new Set,position:d,open:!1});else{let l=k.get(i);l.popoverEl=r,l.position=d}let s=l=>{let f=k.get(i);if(!f)return;let p=l.newState==="open";f.open=p;for(let m of f.triggerEls)m.setAttribute("aria-expanded",String(p))};r.addEventListener("toggle",s),ct(r,()=>{r.removeEventListener("toggle",s),k.delete(i)})}}),e.directive("popover-trigger",{priority:20,init(r,n,o){Q();let i=o;if(!i){let f=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(f&&(i=f.getAttribute("data-popover-id")),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),k.has(i)||k.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),k.get(i).triggerEls.add(r);let d=l=>{let f=k.get(i);if(!f||!f.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}f.popoverEl.togglePopover(),requestAnimationFrame(()=>{f.popoverEl.matches(":popover-open")&&dt(f.popoverEl,r,f.position)})};r.addEventListener("click",d);let s=l=>{let f=k.get(i);l.key==="Escape"&&f?.open&&(f.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),ct(r,()=>{r.removeEventListener("click",d),document.removeEventListener("keydown",s);let l=k.get(i);l&&l.triggerEls.delete(r)})}}),e.directive("popover-dismiss",{priority:20,init(r){Q();let n=()=>{let o=r.closest(".nojs-popover");o&&o.hidePopover()};r.addEventListener("click",n),ct(r,()=>r.removeEventListener("click",n))}});let t=(r,n)=>t.open(r,n);t.open=(r,n)=>{let o=k.get(r);if(!o||!o.popoverEl)return!1;try{o.popoverEl.showPopover()}catch{return!1}let i=n||[...o.triggerEls][0];return i&&requestAnimationFrame(()=>dt(o.popoverEl,i,o.position)),!0},t.close=r=>{let n=k.get(r);if(!n||!n.popoverEl)return!1;try{n.popoverEl.hidePopover()}catch{}return!0},t.toggle=(r,n)=>{let o=k.get(r);if(!o||!o.popoverEl)return!1;o.popoverEl.togglePopover();let i=n||[...o.triggerEls][0];return i&&o.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>dt(o.popoverEl,i,o.position)),!0},e.popover=t}function Lt(e,t={}){St(e)}function Ct(){kt()}var L=[],D=new Map,Ke=1e4;function Tt(){return Ke+L.length}function Dt(){L.length=0,D.clear()}function $(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function Ne(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var zt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',lt=new WeakMap;function Xe(e){let t=r=>{if(r.key!=="Tab")return;let n=[...e.querySelectorAll(zt)].filter(d=>d.offsetParent!==null);if(n.length===0){r.preventDefault();return}let o=n[0],i=n[n.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),o.focus())};e.addEventListener("keydown",t),lt.set(e,t)}function It(e){let t=lt.get(e);t&&(e.removeEventListener("keydown",t),lt.delete(e))}var N=new WeakMap;function Ft(e){e.directive("modal",{priority:10,init(r,n,o){$();let i=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let d=r.querySelector("h1, h2, h3, h4, h5, h6");d&&(d.id||(d.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",d.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let l=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),p=g=>{g.target===r&&s!=="false"&&f!=="false"&&R(r,i)};r.addEventListener("click",p),D.set(i,r);let m=g=>{if(g.newState==="open"){if(r.style.zIndex=String(Tt()),l&&l.split(/\s+/).filter(Boolean).forEach(c=>r.classList.add(c)),requestAnimationFrame(()=>{let c=r.querySelector(zt);c?c.focus():r.focus()}),Xe(r),f!=="false"){let c=a=>{a.key==="Escape"&&(a.stopPropagation(),R(r,i))};r.addEventListener("keydown",c),N.set(r,c)}}else if(g.newState==="closed"){l&&l.split(/\s+/).filter(Boolean).forEach(u=>r.classList.remove(u)),It(r);let c=N.get(r);c&&(r.removeEventListener("keydown",c),N.delete(r));let a=L.findIndex(u=>u.id===i);if(a!==-1){let u=L[a];L.splice(a,1),u.triggerEl&&requestAnimationFrame(()=>{u.triggerEl.focus()})}}};r.addEventListener("toggle",m),Ne(r,()=>{r.removeEventListener("click",p),r.removeEventListener("toggle",m),It(r);let g=N.get(r);g&&(r.removeEventListener("keydown",g),N.delete(r)),D.delete(i);let c=L.findIndex(a=>a.id===i);c!==-1&&L.splice(c,1)})}});let t=r=>t.open(r);t.open=r=>{let n=D.get(r);if(!n)return!1;L.push({id:r,el:n,triggerEl:null});try{n.showPopover()}catch{return!1}return!0},t.close=r=>{let n=D.get(r);return n?(R(n,r),!0):!1},t.closeAll=()=>{for(let r=L.length-1;r>=0;r--)R(L[r].el,L[r].id)},e.modal=t}function R(e,t){try{e.hidePopover()}catch{}}function Ye(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Mt(e){e.directive("modal-open",{priority:10,init(t,r,n){$();let o=n;if(!o){let m=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(m&&(o=m.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let i=()=>{let p=D.get(o)||document.querySelector(`[data-modal-id="${o}"]`);if(!p){console.warn(`[modal-open] modal "${o}" not found`);return}L.push({id:o,el:p,triggerEl:t}),t.setAttribute("aria-expanded","true"),p.id&&t.setAttribute("aria-controls",p.id);try{p.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`)}},d=()=>{t.setAttribute("aria-expanded","false")},s=null,l=null;requestAnimationFrame(()=>{let p=D.get(o);p&&(l=p,s=m=>{m.newState==="closed"&&t.setAttribute("aria-expanded","false")},p.addEventListener("toggle",s))}),t.addEventListener("click",i),Ye(t,()=>{t.removeEventListener("click",i),l&&s&&l.removeEventListener("toggle",s)})}})}function Ze(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Pt(e){e.directive("modal-close",{priority:10,init(t,r,n){$();let o=()=>{let i,d;if(n){if(d=n,i=D.get(d),!i){console.warn(`[modal-close] modal "${d}" not found`);return}}else{if(i=t.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}d=i.getAttribute("modal")}R(i,d)};t.addEventListener("click",o),Ze(t,()=>{t.removeEventListener("click",o)})}})}function qt(e,t={}){Ft(e),Mt(e),Pt(e)}function Bt(){Dt()}var M={openMenus:new Map};function Ht(){M.openMenus.clear()}function O(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}var Qe=0;function Je(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function $t(e,t,r){let n=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let i=t.getBoundingClientRect(),d=e.getBoundingClientRect(),s=window.innerHeight,l=window.innerWidth,f,p;switch(n){case"top":f=i.top-d.height,p=i.left;break;case"left":f=i.top,p=i.left-d.width;break;case"right":f=i.top,p=i.right;break;default:f=i.bottom,p=i.left}n==="bottom"||n==="top"?o==="end"&&(p=i.right-d.width):o==="end"&&(f=i.bottom-d.height),n==="bottom"&&f+d.height>s&&i.top-d.height>0?f=i.top-d.height:n==="top"&&f<0&&i.bottom+d.height<=s&&(f=i.bottom),p<4&&(p=4),p+d.width>l-4&&(p=l-d.width-4),e.style.top=`${f}px`,e.style.left=`${p}px`}function ut(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function pt(e){let t=ut(e);t.length&&t[0].focus()}function Rt(e){let t=ut(e);t.length&&t[t.length-1].focus()}function Ot(e){e.directive("dropdown",{priority:15,init(r){O()}}),e.directive("dropdown-toggle",{priority:15,init(r){O();let n=r.closest("[dropdown]");if(!n)return;let o=n.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${Qe++}`),r.setAttribute("aria-controls",o.id);let i=!1,d=typeof o.showPopover=="function"&&typeof o.hidePopover=="function";function s(){if(o.setAttribute("data-open",""),d&&!i)try{o.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),$t(o,r,n),M.openMenus.set(o,{toggle:r,wrapper:n})}function l(){if(d&&i){i=!1;try{o.hidePopover()}catch{}}o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),M.openMenus.delete(o)}function f(){return r.getAttribute("aria-expanded")==="true"}let p=b=>{b.newState==="closed"&&f()&&l()};o.addEventListener("toggle",p);let m=b=>{b.preventDefault(),b.stopPropagation(),f()?l():s()};r.addEventListener("click",m);let g=b=>{f()&&!n.contains(b.target)&&l()};document.addEventListener("click",g,!0);let c=b=>{b.key==="Escape"&&f()&&(l(),r.focus())};document.addEventListener("keydown",c);let a=b=>{switch(b.key){case"Enter":case" ":b.preventDefault(),s(),pt(o);break;case"ArrowDown":b.preventDefault(),s(),pt(o);break;case"ArrowUp":b.preventDefault(),s(),Rt(o);break}};r.addEventListener("keydown",a);let u=b=>{if(!(!f()||ut(o).find(T=>T===document.activeElement)))switch(b.key){case"ArrowDown":b.preventDefault(),pt(o);break;case"ArrowUp":b.preventDefault(),Rt(o);break}};o.addEventListener("keydown",u);let h=()=>{f()&&$t(o,r,n)};window.addEventListener("scroll",h,!0),window.addEventListener("resize",h),Je(r,()=>{r.removeEventListener("click",m),r.removeEventListener("keydown",a),o.removeEventListener("keydown",u),o.removeEventListener("toggle",p),document.removeEventListener("click",g,!0),document.removeEventListener("keydown",c),window.removeEventListener("scroll",h,!0),window.removeEventListener("resize",h),M.openMenus.delete(o)})}}),e.directive("dropdown-menu",{priority:15,init(r){O(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},t.close=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},e.dropdown=t}function Gt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function tr(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function ft(e,t){if(!e)return;if(typeof e.hidePopover=="function")try{e.hidePopover()}catch{}e.removeAttribute("data-open");let r=t&&t.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),M.openMenus.has(e)&&M.openMenus.delete(e)}function Wt(e){e.directive("dropdown-item",{priority:15,init(t){O();let r=t.closest("[dropdown-menu]"),n=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let o=d=>{if(!r)return;let s=tr(r),l=s.indexOf(t);switch(d.key){case"ArrowDown":{d.preventDefault(),(l+1<s.length?s[l+1]:s[0]).focus();break}case"ArrowUp":{d.preventDefault(),(l-1>=0?s[l-1]:s[s.length-1]).focus();break}case"Home":{d.preventDefault(),s.length&&s[0].focus();break}case"End":{d.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{d.preventDefault(),t.click();break}case"Escape":{if(d.preventDefault(),ft(r,n),n){let f=n.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{ft(r,n);break}}};t.addEventListener("keydown",o),Gt(t,()=>t.removeEventListener("keydown",o));let i=()=>{if(ft(r,n),n){let d=n.querySelector("[dropdown-toggle]");d&&d.focus()}};t.addEventListener("click",i),Gt(t,()=>t.removeEventListener("click",i))}})}function Vt(e,t={}){Ot(e),Wt(e)}function Ut(){Ht()}var I=new Map,G=new Set,Kt=0;function Nt(){return++Kt}function Xt(){for(let e of G)clearTimeout(e);G.clear();for(let e of I.values())e.remove();I.clear(),Kt=0}function Yt(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function mt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var er=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function bt(){return I.size>0?I.values().next().value:rr("top-right")}function rr(e){if(I.has(e))return I.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),I.set(e,t),t}function or(e){return e.startsWith("top")}function gt(e,t,r,n,o){let i=Nt(),d=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let l=document.createElement("span");if(l.textContent=t,s.appendChild(l),o){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>J(s)),s.appendChild(f)}if(or(d)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),n>0){let f=setTimeout(()=>{G.delete(f),J(s)},n);G.add(f),s._toastTimerId=f}return s}function J(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),G.delete(e._toastTimerId)),e.remove())}function Zt(e){Yt(),e.directive("toast-container",{priority:10,init(r,n,o){let i=o&&er.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),I.set(i,r),mt(r,()=>{I.get(i)===r&&I.delete(i)})}}),e.directive("toast",{priority:10,init(r,n,o){if(!o)return;let i=r.getAttribute("toast-type")||"info",d=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let c=()=>{let a=bt();gt(a,o,i,d,s)};r.addEventListener("click",c),mt(r,()=>r.removeEventListener("click",c));return}let f=e.findContext(r),p;function m(){let c=e.evaluate(o,f);if(c&&c!==p){let a=typeof c=="string"?c:String(c),u=bt();gt(u,a,i,d,s)}p=c}let g=f.$watch(m);mt(r,g)}});let t=(r,n="info",o=3e3)=>{if(typeof document>"u")return;let i=!0,d=bt();return gt(d,String(r),n,o,i)};t.dismiss=r=>{let n=document.querySelector(`[data-toast-id="${r}"]`);n&&J(n)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>J(r))},e.toast=t}function Qt(e,t={}){Zt(e)}function Jt(){Xt()}var P={containers:new Map};function te(){P.containers.clear()}function ee(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function nr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var ir=0;function re(e){return`${e}-${++ir}`}function ht(e,t){let r=P.containers.get(e);if(!r)return;let{tabs:n,panels:o}=r;if(!(t<0||t>=n.length)&&n[t].getAttribute("aria-disabled")!=="true"){for(let i=0;i<n.length;i++)n[i].setAttribute("aria-selected","false"),n[i].setAttribute("tabindex","-1"),o[i].setAttribute("aria-hidden","true"),o[i].inert=!0;n[t].setAttribute("aria-selected","true"),n[t].setAttribute("tabindex","0"),o[t].setAttribute("aria-hidden","false"),o[t].inert=!1,r.activeIndex=t}}function X(e,t,r){let n=e.length,o=t;for(let i=0;i<n;i++)if(o=(o+r+n)%n,e[o].getAttribute("aria-disabled")!=="true")return o;return t}function oe(e){e.directive("tabs",{priority:10,init(t,r,n){ee();let o=[],i=[];for(let a of Array.from(t.children))a.hasAttribute("tab")?o.push(a):a.hasAttribute("panel")&&i.push(a);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==i.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+i.length+" panels.");let d=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",d),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let l=Math.min(o.length,i.length);for(let a=0;a<l;a++){let u=o[a],h=i[a],b=u.id||re("nojs-tab"),y=h.id||re("nojs-panel");u.id=b,h.id=y,u.setAttribute("role","tab"),u.setAttribute("aria-selected","false"),u.setAttribute("aria-controls",y),u.setAttribute("tabindex","-1"),u.classList.add("nojs-tab"),h.setAttribute("role","tabpanel"),h.setAttribute("aria-labelledby",b),h.setAttribute("tabindex","0"),h.setAttribute("aria-hidden","true"),h.inert=!0,h.classList.add("nojs-panel"),s.appendChild(u)}let f=i[0];f?t.insertBefore(s,f):t.appendChild(s),P.containers.set(t,{tabs:o.slice(0,l),panels:i.slice(0,l),activeIndex:-1});let p=e.findContext(t);for(let a=0;a<l;a++){let u=o[a].getAttribute("tab-disabled");u&&e.evaluate(u,p)&&o[a].setAttribute("aria-disabled","true")}let m=0;if(n&&n.trim()!==""){let a=parseInt(n,10);!isNaN(a)&&a>=0&&a<l&&(m=a)}o[m]?.getAttribute("aria-disabled")==="true"&&(m=X(o.slice(0,l),m,1)),ht(t,m);let g=a=>{let u=P.containers.get(t);if(!u)return;let h=a.target;if(h.getAttribute("role")!=="tab")return;let{tabs:b}=u,y=b.indexOf(h);if(y===-1)return;let x=-1;switch(a.key){case"ArrowRight":case"ArrowDown":x=X(b,y,1);break;case"ArrowLeft":case"ArrowUp":x=X(b,y,-1);break;case"Home":x=X(b,b.length-1,1);break;case"End":x=X(b,0,-1);break;case"Tab":return;default:return}x!==-1&&x!==y&&(a.preventDefault(),ht(t,x),b[x].focus())};s.addEventListener("keydown",g);let c=a=>{let u=a.target.closest("[role='tab']");if(!u)return;let h=P.containers.get(t);if(!h)return;let b=h.tabs.indexOf(u);b!==-1&&(ht(t,b),u.focus())};s.addEventListener("click",c),nr(t,()=>{s.removeEventListener("keydown",g),s.removeEventListener("click",c),P.containers.delete(t)})}})}function ne(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function ie(e){e.directive("panel",{priority:11,init(){}})}function se(e,t={}){oe(e),ne(e),ie(e)}function ae(){te()}var E={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function ce(){E.branches.clear(),E.selectedItem=null,E.typeahead="",E.typeaheadTimer&&(clearTimeout(E.typeaheadTimer),E.typeaheadTimer=null)}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function vt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function de(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n;for(;n=r.nextNode();)t.push(n);return t}function le(e){return e.closest('[role="tree"]')}function sr(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(n=>n.remove()),(t.textContent||"").trim().toLowerCase()}function pe(e){e.directive("tree",{priority:15,init(t){tt(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function ue(e){e.directive("branch",{priority:16,init(t,r,n){tt();let o=n==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(o));let i=le(t);if(i){let c=i.querySelector('[role="treeitem"]');t.setAttribute("tabindex",c===t?"0":"-1")}else t.setAttribute("tabindex","0");let d=!1;queueMicrotask(()=>{if(d)return;let c=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);c?(E.branches.set(t,{expanded:o,subtreeEl:c}),c.setAttribute("aria-hidden",String(!o))):E.branches.set(t,{expanded:o,subtreeEl:null})});function s(c){let a=E.selectedItem;a&&a!==c&&(a.classList.remove("nojs-branch-selected"),a.setAttribute("aria-selected","false")),c.classList.add("nojs-branch-selected"),c.setAttribute("aria-selected","true"),E.selectedItem=c}function l(c){let a=E.branches.get(c);!a||!a.subtreeEl||(a.expanded=!a.expanded,c.setAttribute("aria-expanded",String(a.expanded)),a.subtreeEl.setAttribute("aria-hidden",String(!a.expanded)))}function f(c){let a=E.branches.get(c);!a||!a.subtreeEl||a.expanded||(a.expanded=!0,c.setAttribute("aria-expanded","true"),a.subtreeEl.setAttribute("aria-hidden","false"))}function p(c){let a=E.branches.get(c);!a||!a.subtreeEl||!a.expanded||(a.expanded=!1,c.setAttribute("aria-expanded","false"),a.subtreeEl.setAttribute("aria-hidden","true"))}let m=c=>{c.target!==t&&!t.contains(c.target)||(c.stopPropagation(),s(t),l(t))};t.addEventListener("click",m),vt(t,()=>t.removeEventListener("click",m));let g=c=>{let a=le(t);if(!a)return;let u=de(a),h=u.indexOf(t),b=E.branches.get(t),y=b&&b.subtreeEl;switch(c.key){case"ArrowRight":if(c.preventDefault(),y&&!b.expanded)f(t);else if(y&&b.expanded){let x=b.subtreeEl.querySelector('[role="treeitem"]');x&&q(x,u)}break;case"ArrowLeft":if(c.preventDefault(),y&&b.expanded)p(t);else{let x=t.parentElement?.closest('[role="treeitem"]');x&&q(x,de(a))}break;case"ArrowDown":c.preventDefault(),h<u.length-1&&q(u[h+1],u);break;case"ArrowUp":c.preventDefault(),h>0&&q(u[h-1],u);break;case"Enter":case" ":c.preventDefault(),s(t),l(t);break;case"Home":c.preventDefault(),u.length>0&&q(u[0],u);break;case"End":c.preventDefault(),u.length>0&&q(u[u.length-1],u);break;default:if(c.key.length===1&&!c.ctrlKey&&!c.altKey&&!c.metaKey){c.preventDefault(),E.typeahead+=c.key.toLowerCase(),E.typeaheadTimer&&clearTimeout(E.typeaheadTimer),E.typeaheadTimer=setTimeout(()=>{E.typeahead="",E.typeaheadTimer=null},500);let x=h+1;for(let T=0;T<u.length;T++){let z=(x+T)%u.length;if(sr(u[z]).startsWith(E.typeahead)){q(u[z],u);break}}}break}};t.addEventListener("keydown",g),vt(t,()=>t.removeEventListener("keydown",g)),vt(t,()=>{d=!0,E.branches.delete(t),E.selectedItem===t&&(E.selectedItem=null)})}})}function q(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function fe(e){e.directive("subtree",{priority:16,init(t){tt(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let n of t.children)n.tagName==="LI"&&!n.querySelector("[branch], .nojs-branch")&&(n.setAttribute("role","treeitem"),n.setAttribute("tabindex","-1"),n.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let n=E.branches.get(r);n?(t.setAttribute("aria-hidden",String(!n.expanded)),n.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function me(e,t={}){pe(e),ue(e),fe(e)}function be(){ce()}var et=new Map;function ge(){et.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function ar(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function he(e){e.directive("stepper",{priority:14,init(t,r,n){rt();let o=e.findContext(t),i=Array.from(t.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let d=n&&parseInt(n,10)||0,s=t.getAttribute("stepper-mode")||"linear",l=t.getAttribute("stepper-indicator")!=="false",f=t.getAttribute("stepper-nav")!=="false",p=t.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(d,i.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",p),t.classList.add("nojs-stepper");let g=null,c=[];l&&(g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),i.forEach((w,A)=>{if(A>0){let at=document.createElement("div");at.className="nojs-stepper-separator",at.setAttribute("aria-hidden","true"),g.appendChild(at)}let _=document.createElement("button");_.type="button",_.className="nojs-stepper-indicator-item",_.setAttribute("role","tab"),_.setAttribute("aria-selected",A===m?"true":"false");let U=w.getAttribute("step-label")||`Step ${A+1}`,F=document.createElement("span");F.textContent=U,_.appendChild(F),_.setAttribute("aria-label",U);let Re=`nojs-stepper-tab-${cr++}`;_.id=Re,s==="free"?(_.setAttribute("data-clickable",""),_.addEventListener("click",()=>z(A))):_.setAttribute("tabindex","-1"),g.appendChild(_),c.push(_)}),g.addEventListener("keydown",w=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(w.key))return;w.preventDefault();let A=m;w.key==="ArrowRight"?A=Math.min(m+1,i.length-1):w.key==="ArrowLeft"?A=Math.max(m-1,0):w.key==="Home"?A=0:w.key==="End"&&(A=i.length-1),s==="free"&&z(A),c[A]?.focus()}),t.insertBefore(g,t.firstChild));let a=null,u=null,h=null;f&&(a=document.createElement("div"),a.className="nojs-stepper-nav",a.setAttribute("aria-hidden","true"),u=document.createElement("button"),u.type="button",u.className="nojs-stepper-prev",u.textContent="Previous",u.addEventListener("click",()=>T()),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-next",h.textContent="Next",h.addEventListener("click",()=>x()),a.appendChild(u),a.appendChild(h),t.appendChild(a));function b(w){let A=i[w];if(!A)return!0;let _=A.querySelectorAll("[required]");for(let F of _)if(typeof F.checkValidity=="function"&&!F.checkValidity())return F.reportValidity(),!1;let U=A.getAttribute("step-validate");if(U)try{if(!e.evaluate(U,o))return!1}catch(F){return console.warn(`[stepper] step-validate error: ${F.message}`),!1}return!0}function y(){i.forEach((w,A)=>{let _=A===m;w.setAttribute("aria-hidden",_?"false":"true"),_?(w.removeAttribute("inert"),w.setAttribute("aria-current","step")):(w.setAttribute("inert",""),w.removeAttribute("aria-current"))}),c.length&&c.forEach((w,A)=>{w.setAttribute("aria-selected",A===m?"true":"false"),A<m?w.setAttribute("data-completed",""):w.removeAttribute("data-completed"),w.setAttribute("tabindex",A===m?"0":"-1");let _=i[A];_.id&&(w.setAttribute("aria-controls",_.id),_.setAttribute("aria-labelledby",w.id))}),u&&(u.disabled=m===0),h&&(h.textContent=m===i.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:m,total:i.length}}))}function x(){return m>=i.length-1||s==="linear"&&!b(m)?!1:(m++,y(),V(),!0)}function T(){return m<=0?!1:(m--,y(),V(),!0)}function z(w){if(w<0||w>=i.length||w===m)return!1;if(s==="linear"&&w>m){for(let A=m;A<w;A++)if(!b(A))return!1}return m=w,y(),V(),!0}let st={get current(){return m},get total(){return i.length},next:x,prev:T,goTo:z,get isFirst(){return m===0},get isLast(){return m===i.length-1}};function V(){o.$stepper=st}V(),et.set(t,{current:m,steps:i,mode:s,indicatorEl:g,navEl:a}),y(),ar(t,()=>{et.delete(t),g&&g.parentNode&&g.remove(),a&&a.parentNode&&a.remove(),delete o.$stepper})}})}var cr=0;var dr=0;function ve(e){e.directive("step",{priority:13,init(t,r,n){rt(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${dr++}`),t.setAttribute("tabindex","0")}})}function ye(e,t={}){ve(e),he(e)}function xe(){ge()}function we(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function Ae(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ee(e){e.directive("skeleton",{priority:10,init(t,r,n){we();let o=e.findContext(t),i=t.getAttribute("skeleton-type")||"text",d=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),l=[];function f(b){p();for(let y=0;y<b;y++){let x=document.createElement("div");x.className="nojs-skeleton-line",t.appendChild(x),l.push(x)}}function p(){for(let b of l)b.parentNode===t&&t.removeChild(b);l=[]}function m(){if(t.classList.add("nojs-skeleton"),i==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");t.style.width=b,t.style.height=b}if(d){let b=parseInt(d,10);b>0&&f(b)}t.setAttribute("aria-busy","true")}let g=null;function c(){g&&g(),t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),p(),s&&(i==="circle"||i==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let b=!1,y=null,x=()=>{b||(b=!0,t.isConnected&&t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",x),y!==null&&clearTimeout(y),g=null)};t.addEventListener("transitionend",x),y=setTimeout(x,0),g=()=>{t.removeEventListener("transitionend",x),y!==null&&clearTimeout(y),b=!0,g=null}}let a=!1;function u(){let b=!!e.evaluate(n,o);b&&!a?(a=!0,m()):!b&&a&&(a=!1,c())}u();let h=o.$watch(u);Ae(t,h),Ae(t,()=>{g&&g(),a&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),p(),s&&(i==="circle"||i==="rect")&&(t.style.width="",t.style.height=""))})}})}function _e(e,t={}){Ee(e)}var B=new Map,j=new Map,v={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function je(){B.clear(),j.clear(),v.active=!1,v.splitEl=null,v.gutterEl=null,v.prevPane=null,v.nextPane=null,v.direction=null,v.startPos=0,v.startPrevSize=0,v.startNextSize=0,v.containerSize=0}function ot(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function lr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ke(e){return e==="horizontal"?"clientX":"clientY"}function S(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function pr(e,t){let n=(B.get(e)?.gutters||[]).reduce((o,i)=>o+S(i,t),0);return S(e,t)-n}function nt(e,t){let r=j.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function it(e,t,r,n){let o=S(t,n),i=S(r,n),d=j.get(t),s=j.get(r);e.setAttribute("aria-valuenow",Math.round(o)),e.setAttribute("aria-valuemin",d?.min||0),e.setAttribute("aria-valuemax",Math.round(o+i-(s?.min||0)))}function yt(e){let t=e.getAttribute("split-persist");if(!t)return;let r=B.get(e);if(!r)return;let n=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(n))}catch{}}function ur(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let n=JSON.parse(r),o=B.get(e);return!o||n.length!==o.panes.length?!1:(n.forEach((i,d)=>{i&&(o.panes[d].style.flexBasis=i,o.panes[d].style.flexGrow="0")}),!0)}catch{return!1}}function fr(e,t,r,n,o){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),o!==6&&i.style.setProperty("--nojs-gutter-size",`${o}px`);let d=c=>{if(c.button!==0)return;c.preventDefault();let a=pr(e,t);v.active=!0,v.splitEl=e,v.gutterEl=i,v.prevPane=r,v.nextPane=n,v.direction=t,v.startPos=c[ke(t)],v.startPrevSize=S(r,t),v.startNextSize=S(n,t),v.containerSize=a,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(c.pointerId)},s=c=>{if(!v.active||v.gutterEl!==i)return;let a=c[ke(v.direction)]-v.startPos,u=nt(v.startPrevSize+a,v.prevPane),h=nt(v.startNextSize-a,v.nextPane),b=v.startPrevSize+v.startNextSize;u+h!==b&&(u!==v.startPrevSize+a?h=b-u:u=b-h),v.prevPane.style.flexBasis=`${u}px`,v.prevPane.style.flexGrow="0",v.nextPane.style.flexBasis=`${h}px`,v.nextPane.style.flexGrow="0",it(i,v.prevPane,v.nextPane,v.direction)},l=()=>{!v.active||v.gutterEl!==i||(v.active=!1,document.body.style.cursor="",document.body.style.userSelect="",yt(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:n}})))};i.addEventListener("pointerdown",d),i.addEventListener("pointermove",s),i.addEventListener("pointerup",l),i.addEventListener("pointercancel",l);let f=10,p=c=>{let a=t==="horizontal",u=0;if(a&&c.key==="ArrowRight"||!a&&c.key==="ArrowDown")u=f;else if(a&&c.key==="ArrowLeft"||!a&&c.key==="ArrowUp")u=-f;else if(c.key==="Home")u=(j.get(r)?.min||0)-S(r,t);else if(c.key==="End"){let z=j.get(n);u=S(r,t)+S(n,t)-(z?.min||0)-S(r,t)}else return;c.preventDefault();let h=S(r,t),b=S(n,t),y=h+b,x=nt(h+u,r),T=nt(y-x,n);x=y-T,r.style.flexBasis=`${x}px`,r.style.flexGrow="0",n.style.flexBasis=`${T}px`,n.style.flexGrow="0",it(i,r,n,t),yt(e)};i.addEventListener("keydown",p);let m=()=>{let c=j.get(r),a=j.get(n),u=c?.collapsible?r:a?.collapsible?n:null;if(!u)return;let h=j.get(u);if(!h)return;let b=u===r?n:r,y=S(r,t)+S(n,t);if(h.collapsed){h.collapsed=!1,u.removeAttribute("data-collapsed");let x=h.preCollapseSize||`${Math.round(y/2)}px`;u.style.flexBasis=x,u.style.flexGrow="0",b.style.flexBasis=`${y-parseFloat(x)}px`,b.style.flexGrow="0"}else h.preCollapseSize=u.style.flexBasis||`${S(u,t)}px`,h.collapsed=!0,u.setAttribute("data-collapsed","true"),u.style.flexBasis="0px",u.style.flexGrow="0",b.style.flexBasis=`${y}px`,b.style.flexGrow="0";it(i,r,n,t),yt(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:u,collapsed:h.collapsed}}))};return i.addEventListener("dblclick",m),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",d),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",l),i.removeEventListener("pointercancel",l),i.removeEventListener("keydown",p),i.removeEventListener("dblclick",m)}}}function Se(e){e.directive("split",{priority:14,init(t,r,n){ot();let o=(n||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",o);let d=Array.from(t.children).filter(p=>p.hasAttribute("pane"));if(d.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${d.length}.`);return}d.forEach(p=>{j.get(p)||j.set(p,{size:p.getAttribute("pane")||null,min:parseInt(p.getAttribute("pane-min"),10)||0,max:parseInt(p.getAttribute("pane-max"),10)||1/0,collapsible:p.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],l=[];for(let p=0;p<d.length-1;p++){let{gutter:m,cleanup:g}=fr(t,o,d[p],d[p+1],i);d[p].after(m),s.push(m),l.push(g)}B.set(t,{direction:o,gutterSize:i,panes:d,gutters:s}),ur(t)||d.forEach(p=>{let g=j.get(p)?.size;g?(p.style.flexBasis=g,p.style.flexGrow="0"):(p.style.flexGrow="1",p.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((p,m)=>{it(p,d[m],d[m+1],o)})}),lr(t,()=>{l.forEach(p=>p()),s.forEach(p=>p.remove()),B.delete(t),d.forEach(p=>j.delete(p)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function mr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Le(e){e.directive("pane",{priority:15,init(t,r,n){ot(),t.classList.add("nojs-pane"),j.has(t)||j.set(t,{size:n||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=j.get(t),i=t.closest("[data-direction='vertical']")?"height":"width";o.min&&(t.style[`min${i==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(t.style[`max${i==="width"?"Width":"Height"}`]=`${o.max}px`),mr(t,()=>{t.classList.remove("nojs-pane"),j.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function Ce(e,t={}){Se(e),Le(e)}function Te(){je()}var W={sorts:new Map};function De(){W.sorts.clear()}function Y(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function br(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function gr(e,t){let r=e.querySelector("tbody");if(!r)return null;let n=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?n=r:n=r.querySelector("[each]")||r.querySelector("[foreach]"),!n)return null;let o=n.getAttribute("each")||n.getAttribute("foreach");if(!o)return null;let i=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function hr(e,t){let r=t.split("."),n=e;for(let o of r){if(n==null)return;n=n[o]}return n}function Ie(e,t,r){let n=t.split("."),o=e;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function Fe(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return Number(e)-Number(t);case"date":return new Date(e).getTime()-new Date(t).getTime();default:return String(e).localeCompare(String(t))}}function vr(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Me(e){e.directive("sortable",{priority:10,init(t){Y(),t.classList.add("nojs-sortable")}})}function Pe(e){e.directive("sort",{priority:11,init(t,r,n){Y();let o=n;if(!o)return;let i=t.getAttribute("sort-type")||"string",d=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;W.sorts.has(s)||W.sorts.set(s,{column:null,direction:null}),(d==="asc"||d==="desc")&&ze(t,s,o,i,d,e);let l=()=>{let f=W.sorts.get(s),p;f.column!==o?p="asc":f.direction==="asc"?p="desc":f.direction==="desc"?p=null:p="asc",ze(t,s,o,i,p,e)};t.addEventListener("click",l),br(t,()=>{t.removeEventListener("click",l),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function ze(e,t,r,n,o,i){let d=W.sorts.get(t);vr(t),o?(e.setAttribute("data-sort-dir",o),e.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),d.column=r,d.direction=o):(d.column=null,d.direction=null);let s=gr(t,i);if(s){let l=i.findContext(t),f=l?hr(l,s.arrayPath):null;if(Array.isArray(f)){if(!o){let m=t._nojsOriginalOrder;if(m){let g=new Set(f),c=m.filter(a=>g.has(a));for(let a of f)m.includes(a)||c.push(a);Ie(l,s.arrayPath,c)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...f]);let p=[...f].sort((m,g)=>{let c=m!=null?m[r]:null,a=g!=null?g[r]:null,u=Fe(c,a,n);return o==="desc"?-u:u});Ie(l,s.arrayPath,p);return}}yr(t,e,r,n,o)}function yr(e,t,r,n,o){let i=e.querySelector("tbody");if(!i)return;let l=[...t.closest("tr").children].indexOf(t);if(l<0)return;let f=[...i.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...f]),!o){let m=document.createDocumentFragment();for(let g of e._nojsOriginalRows)m.appendChild(g);i.appendChild(m);return}f.sort((m,g)=>{let c=m.children[l]?.textContent?.trim()||"",a=g.children[l]?.textContent?.trim()||"",u=Fe(n==="number"?parseFloat(c.replace(/[^0-9.\-]/g,""))||0:c,n==="number"?parseFloat(a.replace(/[^0-9.\-]/g,""))||0:a,n);return o==="desc"?-u:u});let p=document.createDocumentFragment();for(let m of f)p.appendChild(m);i.appendChild(p)}function qe(e){e.directive("fixed-header",{priority:10,init(t){Y(),t.classList.add("nojs-fixed-header")}})}function Be(e){e.directive("fixed-col",{priority:10,init(t){Y(),t.classList.add("nojs-fixed-col")}})}function He(e,t={}){Me(e),Pe(e),qe(e),Be(e)}function $e(){De()}var xr=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col"],wr={name:"nojs-elements",install(e,t={}){_t(e,t),Lt(e,t),qt(e,t),Vt(e,t),Qt(e,t),se(e,t),me(e,t),ye(e,t),_e(e,t),Ce(e,t),He(e,t)},init(e){if(typeof document>"u"||!document.body)return;let t=xr.map(n=>`[${n}]`).join(","),r;try{r=document.body.querySelectorAll(t)}catch{return}for(let n of r)n.__declared&&!n.__disposers&&!n.__ctx&&(n.__declared=!1);try{e.processTree(document.body)}catch(n){e.internals?.warn?.("nojs-elements init re-process error:",n.message)}},dispose(e){jt(),Ct(),Bt(),Ut(),Jt(),ae(),be(),xe(),Te(),$e()}},xt=wr;if(typeof window<"u"){let t=function(){return e?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(xt),e=!0,!0):!1};window.NoJSElements=xt;let e=!1;if(!t()){let r=0,n=100,o=setInterval(()=>{(t()||++r>=n)&&clearInterval(o)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{t()&&clearInterval(o)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
