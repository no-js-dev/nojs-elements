/**
 * NoJS Elements v1.12.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
var Y=new Map,C=new Map;function At(){for(let e of C.values())clearTimeout(e);C.clear();for(let e of Y.values())e.remove();Y.clear()}function Et(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function Ge(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var J=8;function We(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,l=window.innerHeight,s,a;switch(r){case"bottom":s=i.bottom+J,a=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,a=i.left-o.width-J;break;case"right":s=i.top+(i.height-o.height)/2,a=i.right+J;break;default:s=i.top-o.height-J,a=i.left+(i.width-o.width)/2;break}a<4&&(a=4),a+o.width>n-4&&(a=n-o.width-4),s<4&&(s=4),s+o.height>l-4&&(s=l-o.height-4),e.style.top=`${s}px`,e.style.left=`${a}px`}var Ve=0;function Ue(e,t,r){document.body.appendChild(t),We(t,e,r),t.setAttribute("aria-hidden","false")}function Ke(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function kt(e){e.directive("tooltip",{priority:20,init(t,r,i){Et();let o=i;if(!o){console.warn("[tooltip] attribute value (tooltip text) is required.");return}let n=t.getAttribute("tooltip-position")||"top",l=parseInt(t.getAttribute("tooltip-delay"),10)||300,s=t.getAttribute("tooltip-disabled"),a=s?e.findContext(t):null,f=`nojs-tooltip-${++Ve}`,u=document.createElement("div");u.className="nojs-tooltip",u.setAttribute("role","tooltip"),u.setAttribute("id",f),u.setAttribute("aria-hidden","true"),u.textContent=o,t.setAttribute("aria-describedby",f),Y.set(t,u);let m=()=>{if(s&&a&&e.evaluate(s,a))return;C.has(t)&&clearTimeout(C.get(t));let y=setTimeout(()=>{C.delete(t),!(s&&a&&e.evaluate(s,a))&&Ue(t,u,n)},l);C.set(t,y)},g=()=>{C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),Ke(t,u)},p=()=>m(),c=()=>g(),d=()=>m(),b=()=>g(),h=y=>{y.key==="Escape"&&u.getAttribute("aria-hidden")==="false"&&g()};t.addEventListener("mouseenter",p),t.addEventListener("mouseleave",c),t.addEventListener("focusin",d),t.addEventListener("focusout",b),t.addEventListener("keydown",h),Ge(t,()=>{t.removeEventListener("mouseenter",p),t.removeEventListener("mouseleave",c),t.removeEventListener("focusin",d),t.removeEventListener("focusout",b),t.removeEventListener("keydown",h),C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),u.remove(),Y.delete(t)})}})}function _t(e,t={}){kt(e)}function jt(){At()}var j=new Map;function St(){j.clear()}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function pt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function $(e,t="togglePopover"){return!!e&&typeof e[t]=="function"}var P=8;function et(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,l=window.innerHeight,s,a;switch(r){case"top":s=i.top-o.height-P,a=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,a=i.left-o.width-P;break;case"right":s=i.top+(i.height-o.height)/2,a=i.right+P;break;default:s=i.bottom+P,a=i.left+(i.width-o.width)/2;break}r==="bottom"&&s+o.height>l&&(s=i.top-o.height-P),r==="top"&&s<0&&(s=i.bottom+P),r==="right"&&a+o.width>n&&(a=i.left-o.width-P),r==="left"&&a<0&&(a=i.right+P),a<4&&(a=4),a+o.width>n-4&&(a=n-o.width-4),s<4&&(s=4),s+o.height>l-4&&(s=l-o.height-4),e.style.top=`${s}px`,e.style.left=`${a}px`}function ut(e,t){e._untrack&&e._untrack();let r=0,i=()=>{r=0;let l=e.popoverEl;if(!l||!l.isConnected){n();return}if(typeof l.matches=="function"&&!l.matches(":popover-open")){n();return}et(l,t,e.position)},o=()=>{r||(r=requestAnimationFrame(i))},n=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o),e._untrack=null};return window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),e._untrack=n,n}function M(e){e&&e._untrack&&e._untrack()}function Lt(e){e.directive("popover",{priority:20,init(r,i,o){tt();let n=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",n),r.id||(r.id=n),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let l=r.getAttribute("popover-position")||"bottom";if(!j.has(n))j.set(n,{popoverEl:r,triggerEls:new Set,position:l,open:!1,_untrack:null});else{let a=j.get(n);a.popoverEl=r,a.position=l}let s=a=>{let f=j.get(n);if(!f)return;let u=a.newState==="open";f.open=u;for(let m of f.triggerEls)m.setAttribute("aria-expanded",String(u));u||M(f)};r.addEventListener("toggle",s),pt(r,()=>{r.removeEventListener("toggle",s);let a=j.get(n);a&&(M(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&j.delete(n))})}}),e.directive("popover-trigger",{priority:20,init(r,i,o){tt();let n=o;if(!n){let a=r.closest("[use]")||r.parentElement,f=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(f&&(n=f.getAttribute("data-popover-id")||f.id),!n){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",n),j.has(n)||j.set(n,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),j.get(n).triggerEls.add(r);let l=a=>{let f=j.get(n);if(!f||!f.popoverEl){console.warn(`[popover-trigger] no popover found with id "${n}".`);return}$(f.popoverEl)&&(f.popoverEl.togglePopover(),requestAnimationFrame(()=>{f.popoverEl.matches(":popover-open")?(et(f.popoverEl,r,f.position),ut(f,r)):M(f)}))};r.addEventListener("click",l);let s=a=>{let f=j.get(n);a.key==="Escape"&&f?.open&&($(f.popoverEl,"hidePopover")&&f.popoverEl.hidePopover(),M(f),r.focus())};document.addEventListener("keydown",s),pt(r,()=>{r.removeEventListener("click",l),document.removeEventListener("keydown",s);let a=j.get(n);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(M(a),j.delete(n)))})}}),e.directive("popover-dismiss",{priority:20,init(r){tt();let i=()=>{let o=r.closest(".nojs-popover");!o||!$(o,"hidePopover")||o.hidePopover()};r.addEventListener("click",i),pt(r,()=>r.removeEventListener("click",i))}});let t=(r,i)=>t.open(r,i);t.open=(r,i)=>{let o=j.get(r);if(!o||!o.popoverEl||!$(o.popoverEl,"showPopover"))return!1;try{o.popoverEl.showPopover()}catch{return!1}let n=i||[...o.triggerEls][0];return n&&requestAnimationFrame(()=>{et(o.popoverEl,n,o.position),ut(o,n)}),!0},t.close=r=>{let i=j.get(r);if(!i||!i.popoverEl||!$(i.popoverEl,"hidePopover"))return!1;try{i.popoverEl.hidePopover()}catch{}return M(i),!0},t.toggle=(r,i)=>{let o=j.get(r);if(!o||!o.popoverEl||!$(o.popoverEl))return!1;o.popoverEl.togglePopover();let n=i||[...o.triggerEls][0];return n&&o.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{et(o.popoverEl,n,o.position),ut(o,n)}):M(o),!0},e.popover=t}function Ct(e,t={}){Lt(e)}function Tt(){St()}var L=[],T=new Map,Ye=1e4;function Dt(){return Ye+L.length}function It(){L.length=0,T.clear()}function R(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function Xe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Ft='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',ft=new WeakMap;function Ze(e){let t=r=>{if(r.key!=="Tab")return;let i=[...e.querySelectorAll(Ft)].filter(l=>l.offsetParent!==null);if(i.length===0){r.preventDefault();return}let o=i[0],n=i[i.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),n.focus()):document.activeElement===n&&(r.preventDefault(),o.focus())};e.addEventListener("keydown",t),ft.set(e,t)}function zt(e){let t=ft.get(e);t&&(e.removeEventListener("keydown",t),ft.delete(e))}var X=new WeakMap;function Pt(e){e.directive("modal",{priority:10,init(r,i,o){R();let n=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${n}`,r.setAttribute("data-modal-id",n),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let l=r.querySelector("h1, h2, h3, h4, h5, h6");l&&(l.id||(l.id=`nojs-modal-heading-${n}`),r.setAttribute("aria-labelledby",l.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),u=g=>{g.target===r&&s!=="false"&&f!=="false"&&O(r,n)};r.addEventListener("click",u),T.set(n,r);let m=g=>{if(g.newState==="open"){if(r.style.zIndex=String(Dt()),a&&a.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{let p=r.querySelector(Ft);p?p.focus():r.focus()}),Ze(r),f!=="false"){let p=c=>{c.key==="Escape"&&(c.stopPropagation(),O(r,n))};r.addEventListener("keydown",p),X.set(r,p)}}else if(g.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(d=>r.classList.remove(d)),zt(r);let p=X.get(r);p&&(r.removeEventListener("keydown",p),X.delete(r));let c=L.findIndex(d=>d.id===n);if(c!==-1){let d=L[c];L.splice(c,1),d.triggerEl&&requestAnimationFrame(()=>{d.triggerEl.focus()})}}};r.addEventListener("toggle",m),Xe(r,()=>{r.removeEventListener("click",u),r.removeEventListener("toggle",m),zt(r);let g=X.get(r);g&&(r.removeEventListener("keydown",g),X.delete(r)),T.delete(n);let p=L.findIndex(c=>c.id===n);p!==-1&&L.splice(p,1)})}});let t=r=>t.open(r);t.open=r=>{let i=T.get(r);if(!i)return!1;L.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},t.close=r=>{let i=T.get(r);return i?(O(i,r),!0):!1},t.closeAll=()=>{for(let r=L.length-1;r>=0;r--)O(L[r].el,L[r].id)},e.modal=t}function O(e,t){try{e.hidePopover()}catch{}}function Ne(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Mt(e){e.directive("modal-open",{priority:10,init(t,r,i){R();let o=i;if(!o){let m=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(m&&(o=m.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let n=()=>{let u=T.get(o)||document.querySelector(`[data-modal-id="${o}"]`);if(!u){console.warn(`[modal-open] modal "${o}" not found`);return}L.push({id:o,el:u,triggerEl:t}),t.setAttribute("aria-expanded","true"),u.id&&t.setAttribute("aria-controls",u.id);try{u.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`)}},l=()=>{t.setAttribute("aria-expanded","false")},s=null,a=null;requestAnimationFrame(()=>{let u=T.get(o);u&&(a=u,s=m=>{m.newState==="closed"&&t.setAttribute("aria-expanded","false")},u.addEventListener("toggle",s))}),t.addEventListener("click",n),Ne(t,()=>{t.removeEventListener("click",n),a&&s&&a.removeEventListener("toggle",s)})}})}function Qe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function qt(e){e.directive("modal-close",{priority:10,init(t,r,i){R();let o=()=>{let n,l;if(i){if(l=i,n=T.get(l),!n){console.warn(`[modal-close] modal "${l}" not found`);return}}else{if(n=t.closest("[modal]"),!n){console.warn("[modal-close] no parent modal found");return}l=n.getAttribute("modal")}O(n,l)};t.addEventListener("click",o),Qe(t,()=>{t.removeEventListener("click",o)})}})}function Bt(e,t={}){Pt(e),Mt(e),qt(e)}function Ht(){It()}var Z={openMenus:new Map};function $t(){Z.openMenus.clear()}function G(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}function Je(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Rt(e,t,r){let i=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let n=t.getBoundingClientRect(),l=e.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,f,u;switch(i){case"top":f=n.top-l.height,u=n.left;break;case"left":f=n.top,u=n.left-l.width;break;case"right":f=n.top,u=n.right;break;default:f=n.bottom,u=n.left}i==="bottom"||i==="top"?o==="end"&&(u=n.right-l.width):o==="end"&&(f=n.bottom-l.height),i==="bottom"&&f+l.height>s&&n.top-l.height>0?f=n.top-l.height:i==="top"&&f<0&&n.bottom+l.height<=s&&(f=n.bottom),u<4&&(u=4),u+l.width>a-4&&(u=a-l.width-4),e.style.top=`${f}px`,e.style.left=`${u}px`}function bt(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function mt(e){let t=bt(e);t.length&&t[0].focus()}function Ot(e){let t=bt(e);t.length&&t[t.length-1].focus()}function Gt(e){e.directive("dropdown",{priority:15,init(r){G()}}),e.directive("dropdown-toggle",{priority:15,init(r){G();let i=r.closest("[dropdown]");if(!i)return;let o=i.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${Math.random().toString(36).slice(2,7)}`),r.setAttribute("aria-controls",o.id);function n(){o.setAttribute("data-open",""),o.showPopover&&o.showPopover(),r.setAttribute("aria-expanded","true"),Rt(o,r,i),Z.openMenus.set(o,{toggle:r,wrapper:i})}function l(){o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),Z.openMenus.delete(o)}function s(){return r.getAttribute("aria-expanded")==="true"}let a=d=>{d.newState==="closed"&&s()&&l()};o.addEventListener("toggle",a);let f=d=>{d.preventDefault(),d.stopPropagation(),s()?l():n()};r.addEventListener("click",f);let u=d=>{s()&&!i.contains(d.target)&&l()};document.addEventListener("click",u,!0);let m=d=>{d.key==="Escape"&&s()&&(l(),r.focus())};document.addEventListener("keydown",m);let g=d=>{switch(d.key){case"Enter":case" ":d.preventDefault(),n(),mt(o);break;case"ArrowDown":d.preventDefault(),n(),mt(o);break;case"ArrowUp":d.preventDefault(),n(),Ot(o);break}};r.addEventListener("keydown",g);let p=d=>{if(!(!s()||bt(o).find(y=>y===document.activeElement)))switch(d.key){case"ArrowDown":d.preventDefault(),mt(o);break;case"ArrowUp":d.preventDefault(),Ot(o);break}};o.addEventListener("keydown",p);let c=()=>{s()&&Rt(o,r,i)};window.addEventListener("scroll",c,!0),window.addEventListener("resize",c),Je(r,()=>{r.removeEventListener("click",f),r.removeEventListener("keydown",g),o.removeEventListener("keydown",p),o.removeEventListener("toggle",a),document.removeEventListener("click",u,!0),document.removeEventListener("keydown",m),window.removeEventListener("scroll",c,!0),window.removeEventListener("resize",c),Z.openMenus.delete(o)})}}),e.directive("dropdown-menu",{priority:15,init(r){G(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")==="true"?!1:(n.click(),!0)},t.close=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")!=="true"?!1:(n.click(),!0)},e.dropdown=t}function Wt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function tr(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function Vt(e){e.directive("dropdown-item",{priority:15,init(t){G();let r=t.closest("[dropdown-menu]"),i=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let o=l=>{if(!r)return;let s=tr(r),a=s.indexOf(t);switch(l.key){case"ArrowDown":{l.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{l.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{l.preventDefault(),s.length&&s[0].focus();break}case"End":{l.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{l.preventDefault(),t.click();break}case"Escape":{if(l.preventDefault(),r)try{r.hidePopover()}catch{}if(i){let f=i.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{if(r)try{r.hidePopover()}catch{}break}}};t.addEventListener("keydown",o),Wt(t,()=>t.removeEventListener("keydown",o));let n=()=>{if(r)try{r.hidePopover()}catch{}if(i){let l=i.querySelector("[dropdown-toggle]");l&&l.focus()}};t.addEventListener("click",n),Wt(t,()=>t.removeEventListener("click",n))}})}function Ut(e,t={}){Gt(e),Vt(e)}function Kt(){$t()}var D=new Map,W=new Set,Yt=0;function Xt(){return++Yt}function Zt(){for(let e of W)clearTimeout(e);W.clear();for(let e of D.values())e.remove();D.clear(),Yt=0}function Nt(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function gt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var er=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function ht(){return D.size>0?D.values().next().value:rr("top-right")}function rr(e){if(D.has(e))return D.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),D.set(e,t),t}function or(e){return e.startsWith("top")}function vt(e,t,r,i,o){let n=Xt(),l=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",n),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=t,s.appendChild(a),o){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>rt(s)),s.appendChild(f)}if(or(l)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),i>0){let f=setTimeout(()=>{W.delete(f),rt(s)},i);W.add(f),s._toastTimerId=f}return s}function rt(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),W.delete(e._toastTimerId)),e.remove())}function Qt(e){Nt(),e.directive("toast-container",{priority:10,init(r,i,o){let n=o&&er.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",n),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),D.set(n,r),gt(r,()=>{D.get(n)===r&&D.delete(n)})}}),e.directive("toast",{priority:10,init(r,i,o){if(!o)return;let n=r.getAttribute("toast-type")||"info",l=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let p=()=>{let c=ht();vt(c,o,n,l,s)};r.addEventListener("click",p),gt(r,()=>r.removeEventListener("click",p));return}let f=e.findContext(r),u;function m(){let p=e.evaluate(o,f);if(p&&p!==u){let c=typeof p=="string"?p:String(p),d=ht();vt(d,c,n,l,s)}u=p}let g=f.$watch(m);gt(r,g)}});let t=(r,i="info",o=3e3)=>{if(typeof document>"u")return;let n=!0,l=ht();return vt(l,String(r),i,o,n)};t.dismiss=r=>{let i=document.querySelector(`[data-toast-id="${r}"]`);i&&rt(i)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>rt(r))},e.toast=t}function Jt(e,t={}){Qt(e)}function te(){Zt()}var q={containers:new Map};function ee(){q.containers.clear()}function re(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function nr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var ir=0;function oe(e){return`${e}-${++ir}`}function yt(e,t){let r=q.containers.get(e);if(!r)return;let{tabs:i,panels:o}=r;if(!(t<0||t>=i.length)&&i[t].getAttribute("aria-disabled")!=="true"){for(let n=0;n<i.length;n++)i[n].setAttribute("aria-selected","false"),i[n].setAttribute("tabindex","-1"),o[n].setAttribute("aria-hidden","true"),o[n].inert=!0;i[t].setAttribute("aria-selected","true"),i[t].setAttribute("tabindex","0"),o[t].setAttribute("aria-hidden","false"),o[t].inert=!1,r.activeIndex=t}}function N(e,t,r){let i=e.length,o=t;for(let n=0;n<i;n++)if(o=(o+r+i)%i,e[o].getAttribute("aria-disabled")!=="true")return o;return t}function ne(e){e.directive("tabs",{priority:10,init(t,r,i){re();let o=[],n=[];for(let c of Array.from(t.children))c.hasAttribute("tab")?o.push(c):c.hasAttribute("panel")&&n.push(c);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==n.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+n.length+" panels.");let l=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",l),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(o.length,n.length);for(let c=0;c<a;c++){let d=o[c],b=n[c],h=d.id||oe("nojs-tab"),y=b.id||oe("nojs-panel");d.id=h,b.id=y,d.setAttribute("role","tab"),d.setAttribute("aria-selected","false"),d.setAttribute("aria-controls",y),d.setAttribute("tabindex","-1"),d.classList.add("nojs-tab"),b.setAttribute("role","tabpanel"),b.setAttribute("aria-labelledby",h),b.setAttribute("tabindex","0"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel"),s.appendChild(d)}let f=n[0];f?t.insertBefore(s,f):t.appendChild(s),q.containers.set(t,{tabs:o.slice(0,a),panels:n.slice(0,a),activeIndex:-1});let u=e.findContext(t);for(let c=0;c<a;c++){let d=o[c].getAttribute("tab-disabled");d&&e.evaluate(d,u)&&o[c].setAttribute("aria-disabled","true")}let m=0;if(i&&i.trim()!==""){let c=parseInt(i,10);!isNaN(c)&&c>=0&&c<a&&(m=c)}o[m]?.getAttribute("aria-disabled")==="true"&&(m=N(o.slice(0,a),m,1)),yt(t,m);let g=c=>{let d=q.containers.get(t);if(!d)return;let b=c.target;if(b.getAttribute("role")!=="tab")return;let{tabs:h}=d,y=h.indexOf(b);if(y===-1)return;let w=-1;switch(c.key){case"ArrowRight":case"ArrowDown":w=N(h,y,1);break;case"ArrowLeft":case"ArrowUp":w=N(h,y,-1);break;case"Home":w=N(h,h.length-1,1);break;case"End":w=N(h,0,-1);break;case"Tab":return;default:return}w!==-1&&w!==y&&(c.preventDefault(),yt(t,w),h[w].focus())};s.addEventListener("keydown",g);let p=c=>{let d=c.target.closest("[role='tab']");if(!d)return;let b=q.containers.get(t);if(!b)return;let h=b.tabs.indexOf(d);h!==-1&&(yt(t,h),d.focus())};s.addEventListener("click",p),nr(t,()=>{s.removeEventListener("keydown",g),s.removeEventListener("click",p),q.containers.delete(t)})}})}function ie(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function se(e){e.directive("panel",{priority:11,init(){}})}function ae(e,t={}){ne(e),ie(e),se(e)}function ce(){ee()}var E={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function de(){E.branches.clear(),E.selectedItem=null,E.typeahead="",E.typeaheadTimer&&(clearTimeout(E.typeaheadTimer),E.typeaheadTimer=null)}function ot(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function xt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function le(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)t.push(i);return t}function pe(e){return e.closest('[role="tree"]')}function sr(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(t.textContent||"").trim().toLowerCase()}function ue(e){e.directive("tree",{priority:15,init(t){ot(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function fe(e){e.directive("branch",{priority:16,init(t,r,i){ot();let o=i==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(o));let n=pe(t);if(n){let p=n.querySelector('[role="treeitem"]');t.setAttribute("tabindex",p===t?"0":"-1")}else t.setAttribute("tabindex","0");let l=!1;queueMicrotask(()=>{if(l)return;let p=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);p?(E.branches.set(t,{expanded:o,subtreeEl:p}),p.setAttribute("aria-hidden",String(!o))):E.branches.set(t,{expanded:o,subtreeEl:null})});function s(p){let c=E.selectedItem;c&&c!==p&&(c.classList.remove("nojs-branch-selected"),c.setAttribute("aria-selected","false")),p.classList.add("nojs-branch-selected"),p.setAttribute("aria-selected","true"),E.selectedItem=p}function a(p){let c=E.branches.get(p);!c||!c.subtreeEl||(c.expanded=!c.expanded,p.setAttribute("aria-expanded",String(c.expanded)),c.subtreeEl.setAttribute("aria-hidden",String(!c.expanded)))}function f(p){let c=E.branches.get(p);!c||!c.subtreeEl||c.expanded||(c.expanded=!0,p.setAttribute("aria-expanded","true"),c.subtreeEl.setAttribute("aria-hidden","false"))}function u(p){let c=E.branches.get(p);!c||!c.subtreeEl||!c.expanded||(c.expanded=!1,p.setAttribute("aria-expanded","false"),c.subtreeEl.setAttribute("aria-hidden","true"))}let m=p=>{p.target!==t&&!t.contains(p.target)||(p.stopPropagation(),s(t),a(t))};t.addEventListener("click",m),xt(t,()=>t.removeEventListener("click",m));let g=p=>{let c=pe(t);if(!c)return;let d=le(c),b=d.indexOf(t),h=E.branches.get(t),y=h&&h.subtreeEl;switch(p.key){case"ArrowRight":if(p.preventDefault(),y&&!h.expanded)f(t);else if(y&&h.expanded){let w=h.subtreeEl.querySelector('[role="treeitem"]');w&&B(w,d)}break;case"ArrowLeft":if(p.preventDefault(),y&&h.expanded)u(t);else{let w=t.parentElement?.closest('[role="treeitem"]');w&&B(w,le(c))}break;case"ArrowDown":p.preventDefault(),b<d.length-1&&B(d[b+1],d);break;case"ArrowUp":p.preventDefault(),b>0&&B(d[b-1],d);break;case"Enter":case" ":p.preventDefault(),s(t),a(t);break;case"Home":p.preventDefault(),d.length>0&&B(d[0],d);break;case"End":p.preventDefault(),d.length>0&&B(d[d.length-1],d);break;default:if(p.key.length===1&&!p.ctrlKey&&!p.altKey&&!p.metaKey){p.preventDefault(),E.typeahead+=p.key.toLowerCase(),E.typeaheadTimer&&clearTimeout(E.typeaheadTimer),E.typeaheadTimer=setTimeout(()=>{E.typeahead="",E.typeaheadTimer=null},500);let w=b+1;for(let I=0;I<d.length;I++){let z=(w+I)%d.length;if(sr(d[z]).startsWith(E.typeahead)){B(d[z],d);break}}}break}};t.addEventListener("keydown",g),xt(t,()=>t.removeEventListener("keydown",g)),xt(t,()=>{l=!0,E.branches.delete(t),E.selectedItem===t&&(E.selectedItem=null)})}})}function B(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function me(e){e.directive("subtree",{priority:16,init(t){ot(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let i of t.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let i=E.branches.get(r);i?(t.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function be(e,t={}){ue(e),fe(e),me(e)}function ge(){de()}var nt=new Map;function he(){nt.clear()}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function ar(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ve(e){e.directive("stepper",{priority:14,init(t,r,i){it();let o=e.findContext(t),n=Array.from(t.querySelectorAll("[step]"));if(!n.length){console.warn("[stepper] No [step] children found.");return}let l=i&&parseInt(i,10)||0,s=t.getAttribute("stepper-mode")||"linear",a=t.getAttribute("stepper-indicator")!=="false",f=t.getAttribute("stepper-nav")!=="false",u=t.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(l,n.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",u),t.classList.add("nojs-stepper");let g=null,p=[];a&&(g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),n.forEach((x,A)=>{if(A>0){let lt=document.createElement("div");lt.className="nojs-stepper-separator",lt.setAttribute("aria-hidden","true"),g.appendChild(lt)}let k=document.createElement("button");k.type="button",k.className="nojs-stepper-indicator-item",k.setAttribute("role","tab"),k.setAttribute("aria-selected",A===m?"true":"false");let K=x.getAttribute("step-label")||`Step ${A+1}`,F=document.createElement("span");F.textContent=K,k.appendChild(F),k.setAttribute("aria-label",K);let Oe=`nojs-stepper-tab-${cr++}`;k.id=Oe,s==="free"?(k.setAttribute("data-clickable",""),k.addEventListener("click",()=>z(A))):k.setAttribute("tabindex","-1"),g.appendChild(k),p.push(k)}),g.addEventListener("keydown",x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let A=m;x.key==="ArrowRight"?A=Math.min(m+1,n.length-1):x.key==="ArrowLeft"?A=Math.max(m-1,0):x.key==="Home"?A=0:x.key==="End"&&(A=n.length-1),s==="free"&&z(A),p[A]?.focus()}),t.insertBefore(g,t.firstChild));let c=null,d=null,b=null;f&&(c=document.createElement("div"),c.className="nojs-stepper-nav",c.setAttribute("aria-hidden","true"),d=document.createElement("button"),d.type="button",d.className="nojs-stepper-prev",d.textContent="Previous",d.addEventListener("click",()=>I()),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-next",b.textContent="Next",b.addEventListener("click",()=>w()),c.appendChild(d),c.appendChild(b),t.appendChild(c));function h(x){let A=n[x];if(!A)return!0;let k=A.querySelectorAll("[required]");for(let F of k)if(typeof F.checkValidity=="function"&&!F.checkValidity())return F.reportValidity(),!1;let K=A.getAttribute("step-validate");if(K)try{if(!e.evaluate(K,o))return!1}catch(F){return console.warn(`[stepper] step-validate error: ${F.message}`),!1}return!0}function y(){n.forEach((x,A)=>{let k=A===m;x.setAttribute("aria-hidden",k?"false":"true"),k?(x.removeAttribute("inert"),x.setAttribute("aria-current","step")):(x.setAttribute("inert",""),x.removeAttribute("aria-current"))}),p.length&&p.forEach((x,A)=>{x.setAttribute("aria-selected",A===m?"true":"false"),A<m?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",A===m?"0":"-1");let k=n[A];k.id&&(x.setAttribute("aria-controls",k.id),k.setAttribute("aria-labelledby",x.id))}),d&&(d.disabled=m===0),b&&(b.textContent=m===n.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:m,total:n.length}}))}function w(){return m>=n.length-1||s==="linear"&&!h(m)?!1:(m++,y(),U(),!0)}function I(){return m<=0?!1:(m--,y(),U(),!0)}function z(x){if(x<0||x>=n.length||x===m)return!1;if(s==="linear"&&x>m){for(let A=m;A<x;A++)if(!h(A))return!1}return m=x,y(),U(),!0}let dt={get current(){return m},get total(){return n.length},next:w,prev:I,goTo:z,get isFirst(){return m===0},get isLast(){return m===n.length-1}};function U(){o.$stepper=dt}U(),nt.set(t,{current:m,steps:n,mode:s,indicatorEl:g,navEl:c}),y(),ar(t,()=>{nt.delete(t),g&&g.parentNode&&g.remove(),c&&c.parentNode&&c.remove(),delete o.$stepper})}})}var cr=0;var dr=0;function ye(e){e.directive("step",{priority:13,init(t,r,i){it(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${dr++}`),t.setAttribute("tabindex","0")}})}function xe(e,t={}){ye(e),ve(e)}function we(){he()}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function Ee(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ke(e){e.directive("skeleton",{priority:10,init(t,r,i){Ae();let o=e.findContext(t),n=t.getAttribute("skeleton-type")||"text",l=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),a=[];function f(b){u();for(let h=0;h<b;h++){let y=document.createElement("div");y.className="nojs-skeleton-line",t.appendChild(y),a.push(y)}}function u(){for(let b of a)b.parentNode===t&&t.removeChild(b);a=[]}function m(){if(t.classList.add("nojs-skeleton"),n==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(n==="circle"||n==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");t.style.width=b,t.style.height=b}if(l){let b=parseInt(l,10);b>0&&f(b)}t.setAttribute("aria-busy","true")}function g(){t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),u(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let b=!1,h=()=>{b||(b=!0,t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",h))};t.addEventListener("transitionend",h),setTimeout(h,500)}let p=!1;function c(){let b=!!e.evaluate(i,o);b&&!p?(p=!0,m()):!b&&p&&(p=!1,g())}c();let d=o.$watch(c);Ee(t,d),Ee(t,()=>{p&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),u(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""))})}})}function _e(e,t={}){ke(e)}var H=new Map,_=new Map,v={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function je(){H.clear(),_.clear(),v.active=!1,v.splitEl=null,v.gutterEl=null,v.prevPane=null,v.nextPane=null,v.direction=null,v.startPos=0,v.startPrevSize=0,v.startNextSize=0,v.containerSize=0}function st(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function lr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Se(e){return e==="horizontal"?"clientX":"clientY"}function S(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function pr(e,t){let i=(H.get(e)?.gutters||[]).reduce((o,n)=>o+S(n,t),0);return S(e,t)-i}function at(e,t){let r=_.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function ct(e,t,r,i){let o=S(t,i),n=S(r,i),l=_.get(t),s=_.get(r);e.setAttribute("aria-valuenow",Math.round(o)),e.setAttribute("aria-valuemin",l?.min||0),e.setAttribute("aria-valuemax",Math.round(o+n-(s?.min||0)))}function wt(e){let t=e.getAttribute("split-persist");if(!t)return;let r=H.get(e);if(!r)return;let i=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(i))}catch{}}function ur(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let i=JSON.parse(r),o=H.get(e);return!o||i.length!==o.panes.length?!1:(i.forEach((n,l)=>{n&&(o.panes[l].style.flexBasis=n,o.panes[l].style.flexGrow="0")}),!0)}catch{return!1}}function fr(e,t,r,i,o){let n=document.createElement("div");n.className="nojs-gutter",n.setAttribute("role","separator"),n.setAttribute("tabindex","0"),n.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),n.setAttribute("aria-label","Resize"),o!==6&&n.style.setProperty("--nojs-gutter-size",`${o}px`);let l=p=>{if(p.button!==0)return;p.preventDefault();let c=pr(e,t);v.active=!0,v.splitEl=e,v.gutterEl=n,v.prevPane=r,v.nextPane=i,v.direction=t,v.startPos=p[Se(t)],v.startPrevSize=S(r,t),v.startNextSize=S(i,t),v.containerSize=c,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",n.setPointerCapture(p.pointerId)},s=p=>{if(!v.active||v.gutterEl!==n)return;let c=p[Se(v.direction)]-v.startPos,d=at(v.startPrevSize+c,v.prevPane),b=at(v.startNextSize-c,v.nextPane),h=v.startPrevSize+v.startNextSize;d+b!==h&&(d!==v.startPrevSize+c?b=h-d:d=h-b),v.prevPane.style.flexBasis=`${d}px`,v.prevPane.style.flexGrow="0",v.nextPane.style.flexBasis=`${b}px`,v.nextPane.style.flexGrow="0",ct(n,v.prevPane,v.nextPane,v.direction)},a=()=>{!v.active||v.gutterEl!==n||(v.active=!1,document.body.style.cursor="",document.body.style.userSelect="",wt(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};n.addEventListener("pointerdown",l),n.addEventListener("pointermove",s),n.addEventListener("pointerup",a),n.addEventListener("pointercancel",a);let f=10,u=p=>{let c=t==="horizontal",d=0;if(c&&p.key==="ArrowRight"||!c&&p.key==="ArrowDown")d=f;else if(c&&p.key==="ArrowLeft"||!c&&p.key==="ArrowUp")d=-f;else if(p.key==="Home")d=(_.get(r)?.min||0)-S(r,t);else if(p.key==="End"){let z=_.get(i);d=S(r,t)+S(i,t)-(z?.min||0)-S(r,t)}else return;p.preventDefault();let b=S(r,t),h=S(i,t),y=b+h,w=at(b+d,r),I=at(y-w,i);w=y-I,r.style.flexBasis=`${w}px`,r.style.flexGrow="0",i.style.flexBasis=`${I}px`,i.style.flexGrow="0",ct(n,r,i,t),wt(e)};n.addEventListener("keydown",u);let m=()=>{let p=_.get(r),c=_.get(i),d=p?.collapsible?r:c?.collapsible?i:null;if(!d)return;let b=_.get(d);if(!b)return;let h=d===r?i:r,y=S(r,t)+S(i,t);if(b.collapsed){b.collapsed=!1,d.removeAttribute("data-collapsed");let w=b.preCollapseSize||`${Math.round(y/2)}px`;d.style.flexBasis=w,d.style.flexGrow="0",h.style.flexBasis=`${y-parseFloat(w)}px`,h.style.flexGrow="0"}else b.preCollapseSize=d.style.flexBasis||`${S(d,t)}px`,b.collapsed=!0,d.setAttribute("data-collapsed","true"),d.style.flexBasis="0px",d.style.flexGrow="0",h.style.flexBasis=`${y}px`,h.style.flexGrow="0";ct(n,r,i,t),wt(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:d,collapsed:b.collapsed}}))};return n.addEventListener("dblclick",m),{gutter:n,cleanup:()=>{n.removeEventListener("pointerdown",l),n.removeEventListener("pointermove",s),n.removeEventListener("pointerup",a),n.removeEventListener("pointercancel",a),n.removeEventListener("keydown",u),n.removeEventListener("dblclick",m)}}}function Le(e){e.directive("split",{priority:14,init(t,r,i){st();let o=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",n=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",o);let l=Array.from(t.children).filter(u=>u.hasAttribute("pane"));if(l.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${l.length}.`);return}l.forEach(u=>{_.get(u)||_.set(u,{size:u.getAttribute("pane")||null,min:parseInt(u.getAttribute("pane-min"),10)||0,max:parseInt(u.getAttribute("pane-max"),10)||1/0,collapsible:u.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let u=0;u<l.length-1;u++){let{gutter:m,cleanup:g}=fr(t,o,l[u],l[u+1],n);l[u].after(m),s.push(m),a.push(g)}H.set(t,{direction:o,gutterSize:n,panes:l,gutters:s}),ur(t)||l.forEach(u=>{let g=_.get(u)?.size;g?(u.style.flexBasis=g,u.style.flexGrow="0"):(u.style.flexGrow="1",u.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((u,m)=>{ct(u,l[m],l[m+1],o)})}),lr(t,()=>{a.forEach(u=>u()),s.forEach(u=>u.remove()),H.delete(t),l.forEach(u=>_.delete(u)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function mr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ce(e){e.directive("pane",{priority:15,init(t,r,i){st(),t.classList.add("nojs-pane"),_.has(t)||_.set(t,{size:i||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=_.get(t),n=t.closest("[data-direction='vertical']")?"height":"width";o.min&&(t.style[`min${n==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(t.style[`max${n==="width"?"Width":"Height"}`]=`${o.max}px`),mr(t,()=>{t.classList.remove("nojs-pane"),_.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function Te(e,t={}){Le(e),Ce(e)}function De(){je()}var V={sorts:new Map};function Ie(){V.sorts.clear()}function Q(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function br(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function gr(e,t){let r=e.querySelector("tbody");if(!r)return null;let i=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?i=r:i=r.querySelector("[each]")||r.querySelector("[foreach]"),!i)return null;let o=i.getAttribute("each")||i.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim()}:null}function hr(e,t){let r=t.split("."),i=e;for(let o of r){if(i==null)return;i=i[o]}return i}function ze(e,t,r){let i=t.split("."),o=e;for(let n=0;n<i.length-1;n++){if(o[i[n]]==null)return;o=o[i[n]]}o[i[i.length-1]]=r}function Pe(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return Number(e)-Number(t);case"date":return new Date(e).getTime()-new Date(t).getTime();default:return String(e).localeCompare(String(t))}}function vr(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Me(e){e.directive("sortable",{priority:10,init(t){Q(),t.classList.add("nojs-sortable")}})}function qe(e){e.directive("sort",{priority:11,init(t,r,i){Q();let o=i;if(!o)return;let n=t.getAttribute("sort-type")||"string",l=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;V.sorts.has(s)||V.sorts.set(s,{column:null,direction:null}),(l==="asc"||l==="desc")&&Fe(t,s,o,n,l,e);let a=()=>{let f=V.sorts.get(s),u;f.column!==o?u="asc":f.direction==="asc"?u="desc":f.direction==="desc"?u=null:u="asc",Fe(t,s,o,n,u,e)};t.addEventListener("click",a),br(t,()=>{t.removeEventListener("click",a),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function Fe(e,t,r,i,o,n){let l=V.sorts.get(t);vr(t),o?(e.setAttribute("data-sort-dir",o),e.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),l.column=r,l.direction=o):(l.column=null,l.direction=null);let s=gr(t,n);if(s){let a=n.findContext(t),f=a?hr(a,s.arrayPath):null;if(Array.isArray(f)){if(!o){let m=t._nojsOriginalOrder;if(m){let g=new Set(f),p=m.filter(c=>g.has(c));for(let c of f)m.includes(c)||p.push(c);ze(a,s.arrayPath,p)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...f]);let u=[...f].sort((m,g)=>{let p=m!=null?m[r]:null,c=g!=null?g[r]:null,d=Pe(p,c,i);return o==="desc"?-d:d});ze(a,s.arrayPath,u);return}}yr(t,e,r,i,o)}function yr(e,t,r,i,o){let n=e.querySelector("tbody");if(!n)return;let a=[...t.closest("tr").children].indexOf(t);if(a<0)return;let f=[...n.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...f]),!o){let m=document.createDocumentFragment();for(let g of e._nojsOriginalRows)m.appendChild(g);n.appendChild(m);return}f.sort((m,g)=>{let p=m.children[a]?.textContent?.trim()||"",c=g.children[a]?.textContent?.trim()||"",d=Pe(i==="number"?parseFloat(p.replace(/[^0-9.\-]/g,""))||0:p,i==="number"?parseFloat(c.replace(/[^0-9.\-]/g,""))||0:c,i);return o==="desc"?-d:d});let u=document.createDocumentFragment();for(let m of f)u.appendChild(m);n.appendChild(u)}function Be(e){e.directive("fixed-header",{priority:10,init(t){Q(),t.classList.add("nojs-fixed-header")}})}function He(e){e.directive("fixed-col",{priority:10,init(t){Q(),t.classList.add("nojs-fixed-col")}})}function $e(e,t={}){Me(e),qe(e),Be(e),He(e)}function Re(){Ie()}var xr={name:"nojs-elements",install(e,t={}){_t(e,t),Ct(e,t),Bt(e,t),Ut(e,t),Jt(e,t),ae(e,t),be(e,t),xe(e,t),_e(e,t),Te(e,t),$e(e,t)},dispose(e){jt(),Tt(),Ht(),Kt(),te(),ce(),ge(),we(),De(),Re()}},Pn=xr;export{Pn as default};
//# sourceMappingURL=nojs-elements.js.map
