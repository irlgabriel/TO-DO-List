!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=[];function o(e){this.title=e,this.notes=[]}o.prototype.addNote=function(e){this.notes.push(e)};const l=(()=>{document.querySelector("nav");const e=document.querySelector(".left-nav"),t=document.querySelector(".fake-left-nav"),n=(document.querySelector(".main"),document.querySelector(".todo"),document.querySelector(".hamburger-button")),l=document.querySelector(".projects"),c=document.querySelector(".project-list"),u=document.querySelector("#new-project-form");function d(e){let t=document.createElement("li"),n=document.createElement("div");n.classList.add("project-div"),t.appendChild(n);let r=document.createElement("p");r.classList.add("m-0"),r.innerHTML=e.title,n.appendChild(r);let o=document.createElement("div");return o.classList.add("fa","fa-trash","delete-project"),n.appendChild(o),o.addEventListener("click",e=>{e.target.parentElement.remove()}),t}return l.addEventListener("click",()=>{const e=(()=>{const e=r,t=[];for(let n of e){let e=d(n);t.push(e)}return t})(),t=c.querySelectorAll("li");if(0!==t.length)for(let e of t)e.remove();else{for(let t of e)c.appendChild(t);c.appendChild((()=>{const e=document.createElement("li");return e.classList.add("add-project"),e.innerHTML="Add Project",e.setAttribute("data-toggle","modal"),e.setAttribute("data-target","#new-project-modal"),e})()),u.addEventListener("submit",e=>{e.preventDefault();const t=new o(e.target.title.value);return r.push(t),console.log(r),c.appendChild(d(t)),!1})}}),n.addEventListener("click",()=>{"none"!=e.style.display?(t.style.display="none",e.style.display="none"):(t.style.display="block",e.style.display="block")}),{form:u}})();console.log(l);firebase.auth();firebase.auth().onAuthStateChanged((function(e){e||console.log((void 0).form)}))}]);