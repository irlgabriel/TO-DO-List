!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=[];function r(e){this.title=e,this.notes=[]}r.prototype.addNote=function(e){this.notes.push(e)};(()=>{document.querySelector("nav");const e=document.querySelector(".left-nav"),t=document.querySelector(".fake-left-nav"),n=(document.querySelector(".main"),document.querySelector(".todo"),document.querySelector(".hamburger-button")),r=document.querySelector(".projects"),l=document.querySelector(".project-list");r.addEventListener("click",()=>{const e=(()=>{const e=o,t=[];for(let n of e){let e=document.createElement("li");t.push(e);let o=document.createElement("div");o.classList.add("project-div"),e.appendChild(o);let r=document.createElement("p");r.classList.add("m-0"),r.innerHTML=n.title,o.appendChild(r);let l=document.createElement("div");l.classList.add("fa","fa-trash","delete-project"),o.appendChild(l),l.addEventListener("click",e=>{e.target.parentElement.remove()})}return t})(),t=l.querySelectorAll("li");if(0!==t.length)for(let e of t)e.remove();else{for(let t of e)l.appendChild(t);const t=document.createElement("li");t.classList.add("add-project"),t.innerHTML="Add Project",l.appendChild(t),t.setAttribute("data-toggle","modal"),t.setAttribute("data-target","#new-project-modal")}}),n.addEventListener("click",()=>{"none"!=e.style.display?(t.style.display="none",e.style.display="none"):(t.style.display="block",e.style.display="block")})})();const l=new r("default");o.push(l);const c=new function(e,t,n,o){this.title=e,this.desc=t,this.dueDate=n,this.priority=o}("Dentist appointment","Appointment with my dentist tomorrow","3:30 pm",4);l.addNote(c),console.log(o)}]);