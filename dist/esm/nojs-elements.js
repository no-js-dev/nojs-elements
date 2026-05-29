/**
 * NoJS Elements v1.12.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
var O=new Map,z=new Map;function xt(){let e=Array.from(O.keys());for(let t of e){let r=t&&t.__disposers;if(r){for(let i of r)try{i()}catch{}t.__disposers=[]}}for(let t of z.values())clearTimeout(t);z.clear();for(let t of O.values())t.remove();O.clear()}function wt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function Ge(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var J=8;function Et(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,c=window.innerHeight,s,d;switch(r){case"bottom":s=i.bottom+J,d=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,d=i.left-o.width-J;break;case"right":s=i.top+(i.height-o.height)/2,d=i.right+J;break;default:s=i.top-o.height-J,d=i.left+(i.width-o.width)/2;break}d<4&&(d=4),d+o.width>n-4&&(d=n-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),e.style.top=`${s}px`,e.style.left=`${d}px`}var We=0;function Ue(e,t,r){document.body.appendChild(t),Et(t,e,r),t.setAttribute("aria-hidden","false")}function At(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function Ve(e,t){e&&typeof e._warn=="function"?e._warn(t):console.warn(t)}function _t(e){e.directive("tooltip",{priority:20,init(t,r,i){wt();let o=i;if(!o){Ve(e,"[tooltip] attribute value (tooltip text) is required.");return}let n=t.getAttribute("tooltip-position")||"top",c=parseInt(t.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,d=t.getAttribute("tooltip-disabled"),p=d?e.findContext(t):null,l=()=>{if(!d||!p)return!1;try{return!!e.evaluate(d,p)}catch{return!1}},b=`nojs-tooltip-${++We}`,g=document.createElement("div");g.className="nojs-tooltip",g.setAttribute("role","tooltip"),g.setAttribute("id",b),g.setAttribute("aria-hidden","true"),g.textContent=o,t.setAttribute("aria-describedby",b),O.set(t,g);let a=!1,u=0,m=()=>{!a||!t.isConnected||u||(u=requestAnimationFrame(()=>{u=0,!(!a||!t.isConnected)&&Et(g,t,n)}))},h=()=>{window.addEventListener("scroll",m,!0),window.addEventListener("resize",m)},f=()=>{window.removeEventListener("scroll",m,!0),window.removeEventListener("resize",m),u&&(cancelAnimationFrame(u),u=0)},v=()=>{a||(Ue(t,g,n),a=!0,h())},y=()=>{if(!a){At(t,g);return}f(),At(t,g),a=!1},A=()=>{if(l())return;z.has(t)&&clearTimeout(z.get(t));let L=setTimeout(()=>{z.delete(t),!l()&&t.isConnected&&v()},s);z.set(t,L)},k=()=>{z.has(t)&&(clearTimeout(z.get(t)),z.delete(t)),y()},T=()=>A(),q=()=>k(),w=()=>A(),E=()=>k(),j=L=>{L.key==="Escape"&&g.getAttribute("aria-hidden")==="false"&&k()};t.addEventListener("mouseenter",T),t.addEventListener("mouseleave",q),t.addEventListener("focusin",w),t.addEventListener("focusout",E),t.addEventListener("keydown",j);let M=null;if(d&&p&&typeof p.$watch=="function"){let L=()=>{a&&l()&&y()};M=p.$watch(L)}Ge(t,()=>{t.removeEventListener("mouseenter",T),t.removeEventListener("mouseleave",q),t.removeEventListener("focusin",w),t.removeEventListener("focusout",E),t.removeEventListener("keydown",j),M&&(M(),M=null),f(),z.has(t)&&(clearTimeout(z.get(t)),z.delete(t)),a=!1,g.remove(),O.delete(t)})}})}function jt(e,t={}){_t(e)}function kt(){xt()}var C=new Map;function St(){C.clear()}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function dt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var G=8;function lt(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,c=window.innerHeight,s,d;switch(r){case"top":s=i.top-o.height-G,d=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,d=i.left-o.width-G;break;case"right":s=i.top+(i.height-o.height)/2,d=i.right+G;break;default:s=i.bottom+G,d=i.left+(i.width-o.width)/2;break}r==="bottom"&&s+o.height>c&&(s=i.top-o.height-G),r==="top"&&s<0&&(s=i.bottom+G),d<4&&(d=4),d+o.width>n-4&&(d=n-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),e.style.top=`${s}px`,e.style.left=`${d}px`}function Lt(e){e.directive("popover",{priority:20,init(r,i,o){tt();let n=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",n),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!C.has(n))C.set(n,{popoverEl:r,triggerEls:new Set,position:c,open:!1});else{let d=C.get(n);d.popoverEl=r,d.position=c}let s=d=>{let p=C.get(n);if(!p)return;let l=d.newState==="open";p.open=l;for(let b of p.triggerEls)b.setAttribute("aria-expanded",String(l))};r.addEventListener("toggle",s),dt(r,()=>{r.removeEventListener("toggle",s),C.delete(n)})}}),e.directive("popover-trigger",{priority:20,init(r,i,o){tt();let n=o;if(!n){let p=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(p&&(n=p.getAttribute("data-popover-id")),!n){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",n),C.has(n)||C.set(n,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),C.get(n).triggerEls.add(r);let c=d=>{let p=C.get(n);if(!p||!p.popoverEl){console.warn(`[popover-trigger] no popover found with id "${n}".`);return}p.popoverEl.togglePopover(),requestAnimationFrame(()=>{p.popoverEl.matches(":popover-open")&&lt(p.popoverEl,r,p.position)})};r.addEventListener("click",c);let s=d=>{let p=C.get(n);d.key==="Escape"&&p?.open&&(p.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),dt(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let d=C.get(n);d&&d.triggerEls.delete(r)})}}),e.directive("popover-dismiss",{priority:20,init(r){tt();let i=()=>{let o=r.closest(".nojs-popover");o&&o.hidePopover()};r.addEventListener("click",i),dt(r,()=>r.removeEventListener("click",i))}});let t=(r,i)=>t.open(r,i);t.open=(r,i)=>{let o=C.get(r);if(!o||!o.popoverEl)return!1;try{o.popoverEl.showPopover()}catch{return!1}let n=i||[...o.triggerEls][0];return n&&requestAnimationFrame(()=>lt(o.popoverEl,n,o.position)),!0},t.close=r=>{let i=C.get(r);if(!i||!i.popoverEl)return!1;try{i.popoverEl.hidePopover()}catch{}return!0},t.toggle=(r,i)=>{let o=C.get(r);if(!o||!o.popoverEl)return!1;o.popoverEl.togglePopover();let n=i||[...o.triggerEls][0];return n&&o.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>lt(o.popoverEl,n,o.position)),!0},e.popover=t}function Ct(e,t={}){Lt(e)}function Tt(){St()}var I=[],F=new Map,Ke=1e4;function Dt(){return Ke+I.length}function It(){I.length=0,F.clear()}function W(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function Ye(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Ft='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',pt=new WeakMap;function Xe(e){let t=r=>{if(r.key!=="Tab")return;let i=[...e.querySelectorAll(Ft)].filter(c=>c.offsetParent!==null);if(i.length===0){r.preventDefault();return}let o=i[0],n=i[i.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),n.focus()):document.activeElement===n&&(r.preventDefault(),o.focus())};e.addEventListener("keydown",t),pt.set(e,t)}function zt(e){let t=pt.get(e);t&&(e.removeEventListener("keydown",t),pt.delete(e))}var X=new WeakMap;function Pt(e){e.directive("modal",{priority:10,init(r,i,o){W();let n=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${n}`,r.setAttribute("data-modal-id",n),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${n}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let d=r.getAttribute("modal-class"),p=r.getAttribute("modal-escape"),l=g=>{g.target===r&&s!=="false"&&p!=="false"&&U(r,n)};r.addEventListener("click",l),F.set(n,r);let b=g=>{if(g.newState==="open"){if(r.style.zIndex=String(Dt()),d&&d.split(/\s+/).filter(Boolean).forEach(a=>r.classList.add(a)),requestAnimationFrame(()=>{let a=r.querySelector(Ft);a?a.focus():r.focus()}),Xe(r),p!=="false"){let a=u=>{u.key==="Escape"&&(u.stopPropagation(),U(r,n))};r.addEventListener("keydown",a),X.set(r,a)}}else if(g.newState==="closed"){d&&d.split(/\s+/).filter(Boolean).forEach(m=>r.classList.remove(m)),zt(r);let a=X.get(r);a&&(r.removeEventListener("keydown",a),X.delete(r));let u=I.findIndex(m=>m.id===n);if(u!==-1){let m=I[u];I.splice(u,1),m.triggerEl&&requestAnimationFrame(()=>{m.triggerEl.focus()})}}};r.addEventListener("toggle",b),Ye(r,()=>{r.removeEventListener("click",l),r.removeEventListener("toggle",b),zt(r);let g=X.get(r);g&&(r.removeEventListener("keydown",g),X.delete(r)),F.delete(n);let a=I.findIndex(u=>u.id===n);a!==-1&&I.splice(a,1)})}});let t=r=>t.open(r);t.open=r=>{let i=F.get(r);if(!i)return!1;I.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},t.close=r=>{let i=F.get(r);return i?(U(i,r),!0):!1},t.closeAll=()=>{for(let r=I.length-1;r>=0;r--)U(I[r].el,I[r].id)},e.modal=t}function U(e,t){try{e.hidePopover()}catch{}}function Ne(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Mt(e){e.directive("modal-open",{priority:10,init(t,r,i){W();let o=i;if(!o){let b=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(b&&(o=b.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let n=()=>{let l=F.get(o)||document.querySelector(`[data-modal-id="${o}"]`);if(!l){console.warn(`[modal-open] modal "${o}" not found`);return}I.push({id:o,el:l,triggerEl:t}),t.setAttribute("aria-expanded","true"),l.id&&t.setAttribute("aria-controls",l.id);try{l.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`)}},c=()=>{t.setAttribute("aria-expanded","false")},s=null,d=null;requestAnimationFrame(()=>{let l=F.get(o);l&&(d=l,s=b=>{b.newState==="closed"&&t.setAttribute("aria-expanded","false")},l.addEventListener("toggle",s))}),t.addEventListener("click",n),Ne(t,()=>{t.removeEventListener("click",n),d&&s&&d.removeEventListener("toggle",s)})}})}function Ze(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function qt(e){e.directive("modal-close",{priority:10,init(t,r,i){W();let o=()=>{let n,c;if(i){if(c=i,n=F.get(c),!n){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(n=t.closest("[modal]"),!n){console.warn("[modal-close] no parent modal found");return}c=n.getAttribute("modal")}U(n,c)};t.addEventListener("click",o),Ze(t,()=>{t.removeEventListener("click",o)})}})}function $t(e,t={}){Pt(e),Mt(e),qt(e)}function Bt(){It()}var $={openMenus:new Map};function Ht(){$.openMenus.clear()}function V(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}var Qe=0;function Je(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Rt(e,t,r){let i=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let n=t.getBoundingClientRect(),c=e.getBoundingClientRect(),s=window.innerHeight,d=window.innerWidth,p,l;switch(i){case"top":p=n.top-c.height,l=n.left;break;case"left":p=n.top,l=n.left-c.width;break;case"right":p=n.top,l=n.right;break;default:p=n.bottom,l=n.left}i==="bottom"||i==="top"?o==="end"&&(l=n.right-c.width):o==="end"&&(p=n.bottom-c.height),i==="bottom"&&p+c.height>s&&n.top-c.height>0?p=n.top-c.height:i==="top"&&p<0&&n.bottom+c.height<=s&&(p=n.bottom),l<4&&(l=4),l+c.width>d-4&&(l=d-c.width-4),e.style.top=`${p}px`,e.style.left=`${l}px`}function ft(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function ut(e){let t=ft(e);t.length&&t[0].focus()}function Ot(e){let t=ft(e);t.length&&t[t.length-1].focus()}function Gt(e){e.directive("dropdown",{priority:15,init(r){V()}}),e.directive("dropdown-toggle",{priority:15,init(r){V();let i=r.closest("[dropdown]");if(!i)return;let o=i.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${Qe++}`),r.setAttribute("aria-controls",o.id);let n=!1,c=typeof o.showPopover=="function"&&typeof o.hidePopover=="function";function s(){if(o.setAttribute("data-open",""),c&&!n)try{o.showPopover(),n=!0}catch{n=!1}r.setAttribute("aria-expanded","true"),Rt(o,r,i),$.openMenus.set(o,{toggle:r,wrapper:i})}function d(){if(c&&n){n=!1;try{o.hidePopover()}catch{}}o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),$.openMenus.delete(o)}function p(){return r.getAttribute("aria-expanded")==="true"}let l=f=>{f.newState==="closed"&&p()&&d()};o.addEventListener("toggle",l);let b=f=>{f.preventDefault(),f.stopPropagation(),p()?d():s()};r.addEventListener("click",b);let g=f=>{p()&&!i.contains(f.target)&&d()};document.addEventListener("click",g,!0);let a=f=>{f.key==="Escape"&&p()&&(d(),r.focus())};document.addEventListener("keydown",a);let u=f=>{switch(f.key){case"Enter":case" ":f.preventDefault(),s(),ut(o);break;case"ArrowDown":f.preventDefault(),s(),ut(o);break;case"ArrowUp":f.preventDefault(),s(),Ot(o);break}};r.addEventListener("keydown",u);let m=f=>{if(!(!p()||ft(o).find(A=>A===document.activeElement)))switch(f.key){case"ArrowDown":f.preventDefault(),ut(o);break;case"ArrowUp":f.preventDefault(),Ot(o);break}};o.addEventListener("keydown",m);let h=()=>{p()&&Rt(o,r,i)};window.addEventListener("scroll",h,!0),window.addEventListener("resize",h),Je(r,()=>{r.removeEventListener("click",b),r.removeEventListener("keydown",u),o.removeEventListener("keydown",m),o.removeEventListener("toggle",l),document.removeEventListener("click",g,!0),document.removeEventListener("keydown",a),window.removeEventListener("scroll",h,!0),window.removeEventListener("resize",h),$.openMenus.delete(o)})}}),e.directive("dropdown-menu",{priority:15,init(r){V(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")==="true"?!1:(n.click(),!0)},t.close=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")!=="true"?!1:(n.click(),!0)},e.dropdown=t}function Wt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function tr(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function mt(e,t){if(!e)return;if(typeof e.hidePopover=="function")try{e.hidePopover()}catch{}e.removeAttribute("data-open");let r=t&&t.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),$.openMenus.has(e)&&$.openMenus.delete(e)}function Ut(e){e.directive("dropdown-item",{priority:15,init(t){V();let r=t.closest("[dropdown-menu]"),i=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let o=c=>{if(!r)return;let s=tr(r),d=s.indexOf(t);switch(c.key){case"ArrowDown":{c.preventDefault(),(d+1<s.length?s[d+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(d-1>=0?s[d-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),t.click();break}case"Escape":{if(c.preventDefault(),mt(r,i),i){let p=i.querySelector("[dropdown-toggle]");p&&p.focus()}break}case"Tab":{mt(r,i);break}}};t.addEventListener("keydown",o),Wt(t,()=>t.removeEventListener("keydown",o));let n=()=>{if(mt(r,i),i){let c=i.querySelector("[dropdown-toggle]");c&&c.focus()}};t.addEventListener("click",n),Wt(t,()=>t.removeEventListener("click",n))}})}function Vt(e,t={}){Gt(e),Ut(e)}function Kt(){Ht()}var P=new Map,K=new Set,Yt=0;function Xt(){return++Yt}function Nt(){for(let e of K)clearTimeout(e);K.clear();for(let e of P.values())e.remove();P.clear(),Yt=0}function Zt(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function bt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var er=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function gt(){return P.size>0?P.values().next().value:rr("top-right")}function rr(e){if(P.has(e))return P.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),P.set(e,t),t}function or(e){return e.startsWith("top")}function ht(e,t,r,i,o){let n=Xt(),c=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",n),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let d=document.createElement("span");if(d.textContent=t,s.appendChild(d),o){let p=document.createElement("button");p.type="button",p.classList.add("nojs-toast-dismiss"),p.setAttribute("aria-label","Dismiss"),p.textContent="\xD7",p.addEventListener("click",()=>et(s)),s.appendChild(p)}if(or(c)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),i>0){let p=setTimeout(()=>{K.delete(p),et(s)},i);K.add(p),s._toastTimerId=p}return s}function et(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),K.delete(e._toastTimerId)),e.remove())}function Qt(e){Zt(),e.directive("toast-container",{priority:10,init(r,i,o){let n=o&&er.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",n),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),P.set(n,r),bt(r,()=>{P.get(n)===r&&P.delete(n)})}}),e.directive("toast",{priority:10,init(r,i,o){if(!o)return;let n=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let a=()=>{let u=gt();ht(u,o,n,c,s)};r.addEventListener("click",a),bt(r,()=>r.removeEventListener("click",a));return}let p=e.findContext(r),l;function b(){let a=e.evaluate(o,p);if(a&&a!==l){let u=typeof a=="string"?a:String(a),m=gt();ht(m,u,n,c,s)}l=a}let g=p.$watch(b);bt(r,g)}});let t=(r,i="info",o=3e3)=>{if(typeof document>"u")return;let n=!0,c=gt();return ht(c,String(r),i,o,n)};t.dismiss=r=>{let i=document.querySelector(`[data-toast-id="${r}"]`);i&&et(i)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>et(r))},e.toast=t}function Jt(e,t={}){Qt(e)}function te(){Nt()}var B={containers:new Map};function ee(){B.containers.clear()}function re(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function nr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var ir=0;function oe(e){return`${e}-${++ir}`}function N(e,t,r=!1){let i=B.containers.get(e);if(!i)return;let{tabs:o,panels:n}=i;if(!(t<0||t>=o.length)&&!(!r&&o[t].getAttribute("aria-disabled")==="true")){for(let c=0;c<o.length;c++)o[c].setAttribute("aria-selected","false"),o[c].setAttribute("tabindex","-1"),n[c].setAttribute("aria-hidden","true"),n[c].inert=!0;o[t].setAttribute("aria-selected","true"),o[t].setAttribute("tabindex","0"),n[t].setAttribute("aria-hidden","false"),n[t].inert=!1,i.activeIndex=t}}function Z(e,t,r){let i=e.length,o=t;for(let n=0;n<i;n++)if(o=(o+r+i)%i,e[o].getAttribute("aria-disabled")!=="true")return o;return e[t]&&e[t].getAttribute("aria-disabled")!=="true"?t:-1}function ne(e){e.directive("tabs",{priority:10,init(t,r,i){re();let o=[],n=[];for(let f of Array.from(t.children))f.hasAttribute("tab")?o.push(f):f.hasAttribute("panel")&&n.push(f);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==n.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+n.length+" panels.");let c=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",c),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let d=Math.min(o.length,n.length);for(let f=0;f<d;f++){let v=o[f],y=n[f],A=v.id||oe("nojs-tab"),k=y.id||oe("nojs-panel");v.id=A,y.id=k,v.setAttribute("role","tab"),v.setAttribute("aria-selected","false"),v.setAttribute("aria-controls",k),v.setAttribute("tabindex","-1"),v.classList.add("nojs-tab"),y.setAttribute("role","tabpanel"),y.setAttribute("aria-labelledby",A),y.setAttribute("tabindex","0"),y.setAttribute("aria-hidden","true"),y.inert=!0,y.classList.add("nojs-panel"),s.appendChild(v)}for(let f=d;f<n.length;f++){let v=n[f];v.setAttribute("role","tabpanel"),v.setAttribute("aria-hidden","true"),v.inert=!0,v.classList.add("nojs-panel")}let p=n[0];p?t.insertBefore(s,p):t.appendChild(s),B.containers.set(t,{tabs:o.slice(0,d),panels:n.slice(0,d),activeIndex:-1});let l=e.findContext(t),b=[],g=(f,v)=>{let y=!1;try{y=!!e.evaluate(v,l)}catch{y=!1}y?f.setAttribute("aria-disabled","true"):f.removeAttribute("aria-disabled")};for(let f=0;f<d;f++){let v=o[f],y=v.getAttribute("tab-disabled");if(y&&(g(v,y),l&&typeof l.$watch=="function")){let A=l.$watch(()=>g(v,y));b.push(A)}}let a=0;if(i&&i.trim()!==""){let f=parseInt(i,10);!isNaN(f)&&f>=0&&f<d&&(a=f)}let u=o.slice(0,d);if(o[a]?.getAttribute("aria-disabled")==="true"){let f=Z(u,a,1);f!==-1?(a=f,N(t,a)):N(t,a,!0)}else N(t,a);let m=f=>{let v=B.containers.get(t);if(!v)return;let y=f.target;if(y.getAttribute("role")!=="tab")return;let{tabs:A}=v,k=A.indexOf(y);if(k===-1)return;let T=-1;switch(f.key){case"ArrowRight":case"ArrowDown":T=Z(A,k,1);break;case"ArrowLeft":case"ArrowUp":T=Z(A,k,-1);break;case"Home":T=Z(A,A.length-1,1);break;case"End":T=Z(A,0,-1);break;case"Tab":return;default:return}T!==-1&&T!==k&&(f.preventDefault(),N(t,T),A[T].focus())};s.addEventListener("keydown",m);let h=f=>{let v=f.target.closest("[role='tab']");if(!v)return;let y=B.containers.get(t);if(!y)return;let A=y.tabs.indexOf(v);A!==-1&&v.getAttribute("aria-disabled")!=="true"&&(N(t,A),v.focus())};s.addEventListener("click",h),nr(t,()=>{s.removeEventListener("keydown",m),s.removeEventListener("click",h);for(let f of b)f&&f();b.length=0,B.containers.delete(t)})}})}function ie(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function se(e){e.directive("panel",{priority:11,init(){}})}function ae(e,t={}){ne(e),ie(e),se(e)}function ce(){ee()}var _={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function de(){_.branches.clear(),_.selectedItem=null,_.typeahead="",_.typeaheadTimer&&(clearTimeout(_.typeaheadTimer),_.typeaheadTimer=null)}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function vt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function le(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)t.push(i);return t}function pe(e){return e.closest('[role="tree"]')}function sr(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(t.textContent||"").trim().toLowerCase()}function ue(e){e.directive("tree",{priority:15,init(t){rt(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function fe(e){e.directive("branch",{priority:16,init(t,r,i){rt();let o=i==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(o));let n=pe(t);if(n){let a=n.querySelector('[role="treeitem"]');t.setAttribute("tabindex",a===t?"0":"-1")}else t.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let a=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);a?(_.branches.set(t,{expanded:o,subtreeEl:a}),a.setAttribute("aria-hidden",String(!o))):_.branches.set(t,{expanded:o,subtreeEl:null})});function s(a){let u=_.selectedItem;u&&u!==a&&(u.classList.remove("nojs-branch-selected"),u.setAttribute("aria-selected","false")),a.classList.add("nojs-branch-selected"),a.setAttribute("aria-selected","true"),_.selectedItem=a}function d(a){let u=_.branches.get(a);!u||!u.subtreeEl||(u.expanded=!u.expanded,a.setAttribute("aria-expanded",String(u.expanded)),u.subtreeEl.setAttribute("aria-hidden",String(!u.expanded)))}function p(a){let u=_.branches.get(a);!u||!u.subtreeEl||u.expanded||(u.expanded=!0,a.setAttribute("aria-expanded","true"),u.subtreeEl.setAttribute("aria-hidden","false"))}function l(a){let u=_.branches.get(a);!u||!u.subtreeEl||!u.expanded||(u.expanded=!1,a.setAttribute("aria-expanded","false"),u.subtreeEl.setAttribute("aria-hidden","true"))}let b=a=>{a.target!==t&&!t.contains(a.target)||(a.stopPropagation(),s(t),d(t))};t.addEventListener("click",b),vt(t,()=>t.removeEventListener("click",b));let g=a=>{let u=pe(t);if(!u)return;let m=le(u),h=m.indexOf(t),f=_.branches.get(t),v=f&&f.subtreeEl;switch(a.key){case"ArrowRight":if(a.preventDefault(),v&&!f.expanded)p(t);else if(v&&f.expanded){let y=f.subtreeEl.querySelector('[role="treeitem"]');y&&H(y,m)}break;case"ArrowLeft":if(a.preventDefault(),v&&f.expanded)l(t);else{let y=t.parentElement?.closest('[role="treeitem"]');y&&H(y,le(u))}break;case"ArrowDown":a.preventDefault(),h<m.length-1&&H(m[h+1],m);break;case"ArrowUp":a.preventDefault(),h>0&&H(m[h-1],m);break;case"Enter":case" ":a.preventDefault(),s(t),d(t);break;case"Home":a.preventDefault(),m.length>0&&H(m[0],m);break;case"End":a.preventDefault(),m.length>0&&H(m[m.length-1],m);break;default:if(a.key.length===1&&!a.ctrlKey&&!a.altKey&&!a.metaKey){a.preventDefault(),_.typeahead+=a.key.toLowerCase(),_.typeaheadTimer&&clearTimeout(_.typeaheadTimer),_.typeaheadTimer=setTimeout(()=>{_.typeahead="",_.typeaheadTimer=null},500);let y=h+1;for(let A=0;A<m.length;A++){let k=(y+A)%m.length;if(sr(m[k]).startsWith(_.typeahead)){H(m[k],m);break}}}break}};t.addEventListener("keydown",g),vt(t,()=>t.removeEventListener("keydown",g)),vt(t,()=>{c=!0,_.branches.delete(t),_.selectedItem===t&&(_.selectedItem=null)})}})}function H(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function me(e){e.directive("subtree",{priority:16,init(t){rt(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let i of t.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let i=_.branches.get(r);i?(t.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function be(e,t={}){ue(e),fe(e),me(e)}function ge(){de()}var ot=new Map;function he(){ot.clear()}function nt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function ar(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ve(e){e.directive("stepper",{priority:14,init(t,r,i){nt();let o=e.findContext(t),n=Array.from(t.querySelectorAll("[step]"));if(!n.length){console.warn("[stepper] No [step] children found.");return}let c=i&&parseInt(i,10)||0,s=t.getAttribute("stepper-mode")||"linear",d=t.getAttribute("stepper-indicator")!=="false",p=t.getAttribute("stepper-nav")!=="false",l=t.getAttribute("aria-label")||"Stepper",b=Math.max(0,Math.min(c,n.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",l),t.classList.add("nojs-stepper");let g=null,a=[];d&&(g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),n.forEach((w,E)=>{if(E>0){let ct=document.createElement("div");ct.className="nojs-stepper-separator",ct.setAttribute("aria-hidden","true"),g.appendChild(ct)}let j=document.createElement("button");j.type="button",j.className="nojs-stepper-indicator-item",j.setAttribute("role","tab"),j.setAttribute("aria-selected",E===b?"true":"false");let M=w.getAttribute("step-label")||`Step ${E+1}`,L=document.createElement("span");L.textContent=M,j.appendChild(L),j.setAttribute("aria-label",M);let Oe=`nojs-stepper-tab-${cr++}`;j.id=Oe,s==="free"?(j.setAttribute("data-clickable",""),j.addEventListener("click",()=>k(E))):j.setAttribute("tabindex","-1"),g.appendChild(j),a.push(j)}),g.addEventListener("keydown",w=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(w.key))return;w.preventDefault();let E=b;w.key==="ArrowRight"?E=Math.min(b+1,n.length-1):w.key==="ArrowLeft"?E=Math.max(b-1,0):w.key==="Home"?E=0:w.key==="End"&&(E=n.length-1),s==="free"&&k(E),a[E]?.focus()}),t.insertBefore(g,t.firstChild));let u=null,m=null,h=null;p&&(u=document.createElement("div"),u.className="nojs-stepper-nav",u.setAttribute("aria-hidden","true"),m=document.createElement("button"),m.type="button",m.className="nojs-stepper-prev",m.textContent="Previous",m.addEventListener("click",()=>A()),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-next",h.textContent="Next",h.addEventListener("click",()=>y()),u.appendChild(m),u.appendChild(h),t.appendChild(u));function f(w){let E=n[w];if(!E)return!0;let j=E.querySelectorAll("[required]");for(let L of j)if(typeof L.checkValidity=="function"&&!L.checkValidity())return L.reportValidity(),!1;let M=E.getAttribute("step-validate");if(M)try{if(!e.evaluate(M,o))return!1}catch(L){return console.warn(`[stepper] step-validate error: ${L.message}`),!1}return!0}function v(){n.forEach((w,E)=>{let j=E===b;w.setAttribute("aria-hidden",j?"false":"true"),j?(w.removeAttribute("inert"),w.setAttribute("aria-current","step")):(w.setAttribute("inert",""),w.removeAttribute("aria-current"))}),a.length&&a.forEach((w,E)=>{w.setAttribute("aria-selected",E===b?"true":"false"),E<b?w.setAttribute("data-completed",""):w.removeAttribute("data-completed"),w.setAttribute("tabindex",E===b?"0":"-1");let j=n[E];j.id&&(w.setAttribute("aria-controls",j.id),j.setAttribute("aria-labelledby",w.id))}),m&&(m.disabled=b===0),h&&(h.textContent=b===n.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:b,total:n.length}}))}function y(){return b>=n.length-1||s==="linear"&&!f(b)?!1:(b++,v(),q(),!0)}function A(){return b<=0?!1:(b--,v(),q(),!0)}function k(w){if(w<0||w>=n.length||w===b)return!1;if(s==="linear"&&w>b){for(let E=b;E<w;E++)if(!f(E))return!1}return b=w,v(),q(),!0}let T={get current(){return b},get total(){return n.length},next:y,prev:A,goTo:k,get isFirst(){return b===0},get isLast(){return b===n.length-1}};function q(){o.$stepper=T}q(),ot.set(t,{current:b,steps:n,mode:s,indicatorEl:g,navEl:u}),v(),ar(t,()=>{ot.delete(t),g&&g.parentNode&&g.remove(),u&&u.parentNode&&u.remove(),delete o.$stepper})}})}var cr=0;var dr=0;function ye(e){e.directive("step",{priority:13,init(t,r,i){nt(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${dr++}`),t.setAttribute("tabindex","0")}})}function xe(e,t={}){ye(e),ve(e)}function we(){he()}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function Ee(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function _e(e){e.directive("skeleton",{priority:10,init(t,r,i){Ae();let o=e.findContext(t),n=t.getAttribute("skeleton-type")||"text",c=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),d=[];function p(h){l();for(let f=0;f<h;f++){let v=document.createElement("div");v.className="nojs-skeleton-line",t.appendChild(v),d.push(v)}}function l(){for(let h of d)h.parentNode===t&&t.removeChild(h);d=[]}function b(){if(t.classList.add("nojs-skeleton"),n==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(n==="circle"||n==="rect")){let h=s+(String(s).match(/\d$/)?"px":"");t.style.width=h,t.style.height=h}if(c){let h=parseInt(c,10);h>0&&p(h)}t.setAttribute("aria-busy","true")}function g(){t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),l(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let h=!1,f=()=>{h||(h=!0,t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",f))};t.addEventListener("transitionend",f),setTimeout(f,500)}let a=!1;function u(){let h=!!e.evaluate(i,o);h&&!a?(a=!0,b()):!h&&a&&(a=!1,g())}u();let m=o.$watch(u);Ee(t,m),Ee(t,()=>{a&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),l(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""))})}})}function je(e,t={}){_e(e)}var R=new Map,S=new Map,x={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function ke(){R.clear(),S.clear(),x.active=!1,x.splitEl=null,x.gutterEl=null,x.prevPane=null,x.nextPane=null,x.direction=null,x.startPos=0,x.startPrevSize=0,x.startNextSize=0,x.containerSize=0}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function lr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Se(e){return e==="horizontal"?"clientX":"clientY"}function D(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function pr(e,t){let i=(R.get(e)?.gutters||[]).reduce((o,n)=>o+D(n,t),0);return D(e,t)-i}function st(e,t){let r=S.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function at(e,t,r,i){let o=D(t,i),n=D(r,i),c=S.get(t),s=S.get(r);e.setAttribute("aria-valuenow",Math.round(o)),e.setAttribute("aria-valuemin",c?.min||0),e.setAttribute("aria-valuemax",Math.round(o+n-(s?.min||0)))}function yt(e){let t=e.getAttribute("split-persist");if(!t)return;let r=R.get(e);if(!r)return;let i=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(i))}catch{}}function ur(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let i=JSON.parse(r),o=R.get(e);return!o||i.length!==o.panes.length?!1:(i.forEach((n,c)=>{n&&(o.panes[c].style.flexBasis=n,o.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function fr(e,t,r,i,o){let n=document.createElement("div");n.className="nojs-gutter",n.setAttribute("role","separator"),n.setAttribute("tabindex","0"),n.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),n.setAttribute("aria-label","Resize"),o!==6&&n.style.setProperty("--nojs-gutter-size",`${o}px`);let c=a=>{if(a.button!==0)return;a.preventDefault();let u=pr(e,t);x.active=!0,x.splitEl=e,x.gutterEl=n,x.prevPane=r,x.nextPane=i,x.direction=t,x.startPos=a[Se(t)],x.startPrevSize=D(r,t),x.startNextSize=D(i,t),x.containerSize=u,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",n.setPointerCapture(a.pointerId)},s=a=>{if(!x.active||x.gutterEl!==n)return;let u=a[Se(x.direction)]-x.startPos,m=st(x.startPrevSize+u,x.prevPane),h=st(x.startNextSize-u,x.nextPane),f=x.startPrevSize+x.startNextSize;m+h!==f&&(m!==x.startPrevSize+u?h=f-m:m=f-h),x.prevPane.style.flexBasis=`${m}px`,x.prevPane.style.flexGrow="0",x.nextPane.style.flexBasis=`${h}px`,x.nextPane.style.flexGrow="0",at(n,x.prevPane,x.nextPane,x.direction)},d=()=>{!x.active||x.gutterEl!==n||(x.active=!1,document.body.style.cursor="",document.body.style.userSelect="",yt(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};n.addEventListener("pointerdown",c),n.addEventListener("pointermove",s),n.addEventListener("pointerup",d),n.addEventListener("pointercancel",d);let p=10,l=a=>{let u=t==="horizontal",m=0;if(u&&a.key==="ArrowRight"||!u&&a.key==="ArrowDown")m=p;else if(u&&a.key==="ArrowLeft"||!u&&a.key==="ArrowUp")m=-p;else if(a.key==="Home")m=(S.get(r)?.min||0)-D(r,t);else if(a.key==="End"){let k=S.get(i);m=D(r,t)+D(i,t)-(k?.min||0)-D(r,t)}else return;a.preventDefault();let h=D(r,t),f=D(i,t),v=h+f,y=st(h+m,r),A=st(v-y,i);y=v-A,r.style.flexBasis=`${y}px`,r.style.flexGrow="0",i.style.flexBasis=`${A}px`,i.style.flexGrow="0",at(n,r,i,t),yt(e)};n.addEventListener("keydown",l);let b=()=>{let a=S.get(r),u=S.get(i),m=a?.collapsible?r:u?.collapsible?i:null;if(!m)return;let h=S.get(m);if(!h)return;let f=m===r?i:r,v=D(r,t)+D(i,t);if(h.collapsed){h.collapsed=!1,m.removeAttribute("data-collapsed");let y=h.preCollapseSize||`${Math.round(v/2)}px`;m.style.flexBasis=y,m.style.flexGrow="0",f.style.flexBasis=`${v-parseFloat(y)}px`,f.style.flexGrow="0"}else h.preCollapseSize=m.style.flexBasis||`${D(m,t)}px`,h.collapsed=!0,m.setAttribute("data-collapsed","true"),m.style.flexBasis="0px",m.style.flexGrow="0",f.style.flexBasis=`${v}px`,f.style.flexGrow="0";at(n,r,i,t),yt(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:m,collapsed:h.collapsed}}))};return n.addEventListener("dblclick",b),{gutter:n,cleanup:()=>{n.removeEventListener("pointerdown",c),n.removeEventListener("pointermove",s),n.removeEventListener("pointerup",d),n.removeEventListener("pointercancel",d),n.removeEventListener("keydown",l),n.removeEventListener("dblclick",b)}}}function Le(e){e.directive("split",{priority:14,init(t,r,i){it();let o=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",n=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",o);let c=Array.from(t.children).filter(l=>l.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(l=>{S.get(l)||S.set(l,{size:l.getAttribute("pane")||null,min:parseInt(l.getAttribute("pane-min"),10)||0,max:parseInt(l.getAttribute("pane-max"),10)||1/0,collapsible:l.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],d=[];for(let l=0;l<c.length-1;l++){let{gutter:b,cleanup:g}=fr(t,o,c[l],c[l+1],n);c[l].after(b),s.push(b),d.push(g)}R.set(t,{direction:o,gutterSize:n,panes:c,gutters:s}),ur(t)||c.forEach(l=>{let g=S.get(l)?.size;g?(l.style.flexBasis=g,l.style.flexGrow="0"):(l.style.flexGrow="1",l.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((l,b)=>{at(l,c[b],c[b+1],o)})}),lr(t,()=>{d.forEach(l=>l()),s.forEach(l=>l.remove()),R.delete(t),c.forEach(l=>S.delete(l)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function mr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ce(e){e.directive("pane",{priority:15,init(t,r,i){it(),t.classList.add("nojs-pane"),S.has(t)||S.set(t,{size:i||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=S.get(t),n=t.closest("[data-direction='vertical']")?"height":"width";o.min&&(t.style[`min${n==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(t.style[`max${n==="width"?"Width":"Height"}`]=`${o.max}px`),mr(t,()=>{t.classList.remove("nojs-pane"),S.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function Te(e,t={}){Le(e),Ce(e)}function De(){ke()}var Y={sorts:new Map};function Ie(){Y.sorts.clear()}function Q(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function br(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function gr(e,t){let r=e.querySelector("tbody");if(!r)return null;let i=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?i=r:i=r.querySelector("[each]")||r.querySelector("[foreach]"),!i)return null;let o=i.getAttribute("each")||i.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim()}:null}function hr(e,t){let r=t.split("."),i=e;for(let o of r){if(i==null)return;i=i[o]}return i}function ze(e,t,r){let i=t.split("."),o=e;for(let n=0;n<i.length-1;n++){if(o[i[n]]==null)return;o=o[i[n]]}o[i[i.length-1]]=r}function Pe(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return Number(e)-Number(t);case"date":return new Date(e).getTime()-new Date(t).getTime();default:return String(e).localeCompare(String(t))}}function vr(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Me(e){e.directive("sortable",{priority:10,init(t){Q(),t.classList.add("nojs-sortable")}})}function qe(e){e.directive("sort",{priority:11,init(t,r,i){Q();let o=i;if(!o)return;let n=t.getAttribute("sort-type")||"string",c=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;Y.sorts.has(s)||Y.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&Fe(t,s,o,n,c,e);let d=()=>{let p=Y.sorts.get(s),l;p.column!==o?l="asc":p.direction==="asc"?l="desc":p.direction==="desc"?l=null:l="asc",Fe(t,s,o,n,l,e)};t.addEventListener("click",d),br(t,()=>{t.removeEventListener("click",d),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function Fe(e,t,r,i,o,n){let c=Y.sorts.get(t);vr(t),o?(e.setAttribute("data-sort-dir",o),e.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),c.column=r,c.direction=o):(c.column=null,c.direction=null);let s=gr(t,n);if(s){let d=n.findContext(t),p=d?hr(d,s.arrayPath):null;if(Array.isArray(p)){if(!o){let b=t._nojsOriginalOrder;if(b){let g=new Set(p),a=b.filter(u=>g.has(u));for(let u of p)b.includes(u)||a.push(u);ze(d,s.arrayPath,a)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...p]);let l=[...p].sort((b,g)=>{let a=b!=null?b[r]:null,u=g!=null?g[r]:null,m=Pe(a,u,i);return o==="desc"?-m:m});ze(d,s.arrayPath,l);return}}yr(t,e,r,i,o)}function yr(e,t,r,i,o){let n=e.querySelector("tbody");if(!n)return;let d=[...t.closest("tr").children].indexOf(t);if(d<0)return;let p=[...n.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...p]),!o){let b=document.createDocumentFragment();for(let g of e._nojsOriginalRows)b.appendChild(g);n.appendChild(b);return}p.sort((b,g)=>{let a=b.children[d]?.textContent?.trim()||"",u=g.children[d]?.textContent?.trim()||"",m=Pe(i==="number"?parseFloat(a.replace(/[^0-9.\-]/g,""))||0:a,i==="number"?parseFloat(u.replace(/[^0-9.\-]/g,""))||0:u,i);return o==="desc"?-m:m});let l=document.createDocumentFragment();for(let b of p)l.appendChild(b);n.appendChild(l)}function $e(e){e.directive("fixed-header",{priority:10,init(t){Q(),t.classList.add("nojs-fixed-header")}})}function Be(e){e.directive("fixed-col",{priority:10,init(t){Q(),t.classList.add("nojs-fixed-col")}})}function He(e,t={}){Me(e),qe(e),$e(e),Be(e)}function Re(){Ie()}var xr={name:"nojs-elements",install(e,t={}){jt(e,t),Ct(e,t),$t(e,t),Vt(e,t),Jt(e,t),ae(e,t),be(e,t),xe(e,t),je(e,t),Te(e,t),He(e,t)},dispose(e){kt(),Tt(),Bt(),Kt(),te(),ce(),ge(),we(),De(),Re()}},Fn=xr;export{Fn as default};
//# sourceMappingURL=nojs-elements.js.map
