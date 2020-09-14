!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=[];function r(e){this.title=e,this.notes=[]}r.prototype.addNote=function(e){this.notes.push(e)};firebase.firestore();const c=firebase.firestore(),l=(()=>{const e=document.querySelector("nav"),t=document.querySelector(".left-nav"),n=document.querySelector(".fake-left-nav"),l=(document.querySelector(".main"),document.querySelector(".todo")),a=document.querySelector(".hamburger-button"),i=document.querySelector(".projects"),d=document.querySelector(".project-list"),s=document.querySelector("#new-project-form");function u(e){const t=document.createElement("div");t.classList.add("note");const n=e.data().title,o=e.data().desc,r=e.data().dueDate.toDate(),c=e.data().priority,l=document.createElement("p");l.classList.add("note-title"),l.innerHTML=n,t.appendChild(l);const a=document.createElement("p");a.classList.add("note-desc"),a.innerHTML=o,t.appendChild(a);const i=document.createElement("p");i.classList.add("note-date"),i.innerHTML=r.toLocaleDateString("en-US"),t.appendChild(i);const d=function(e){switch(e){case 1:return"white";case 2:return"lightblue";case 3:return"lightyellow";case 4:return"lightsalmon"}}(c);return t.style.backgroundColor=d,t}function p(e){let t=document.createElement("li"),n=document.createElement("div");n.classList.add("project-div"),t.appendChild(n);let o=document.createElement("p");o.classList.add("m-0"),o.innerHTML=e.title,n.appendChild(o);let r=document.createElement("div");return r.classList.add("fa","fa-trash","delete-project"),n.appendChild(r),r.addEventListener("click",e=>{e.stopPropagation();const t=e.target.parentElement.firstElementChild.innerHTML;e.target.parentElement.remove(),c.collection("projects"+firebase.auth().currentUser.uid).doc(t).delete()}),t}return i.addEventListener("click",()=>{const e=(()=>{const e=o,t=[];for(let n of e){let e=p(n);e.addEventListener("click",()=>{const t=document.querySelector(".notes");if(t)t.remove();else{e.firstElementChild.firstElementChild.innerHTML;const t="projects"+firebase.auth().currentUser.uid,n=document.createElement("div");n.classList.add("notes"),l.appendChild(n),c.collection(t).doc("default").collection("notes").get().then(e=>{e.forEach(e=>{const t=u(e);n.appendChild(t)})})}}),t.push(e)}return t})(),t=d.querySelectorAll("li");if(0!==t.length)for(let e of t)e.remove();else{for(let t of e)d.appendChild(t);d.appendChild((()=>{const e=document.createElement("li");return e.classList.add("add-project"),e.innerHTML="Add Project",e.addEventListener("click",()=>{c.collection("project")}),e.setAttribute("data-toggle","modal"),e.setAttribute("data-target","#new-project-modal"),e})()),s.addEventListener("submit",e=>{e.preventDefault();const t=e.target.title.value,n=new r(t);return o.push(n),console.log(o),c.collection("projects"+firebase.auth().currentUser.uid).doc(t).set({}).then(()=>{location.reload()}).catch(e=>{console.log(e.message)}),d.appendChild(p(n)),!1})}}),a.addEventListener("click",()=>{"none"!=t.style.display?(n.style.display="none",t.style.display="none"):(n.style.display="block",t.style.display="block")}),{form:s,nav:e}})(),a=firebase.auth(),i=firebase.firestore();firebase.auth().onAuthStateChanged((function(e){if(e){const t="projects"+e.uid,n=document.createElement("p");n.classList.add("user-email"),n.innerHTML=e.email,l.nav.appendChild(n);const c=document.createElement("button");c.innerHTML="Logout",c.classList.add("btn","btn-outline-white"),l.nav.appendChild(c),c.addEventListener("click",()=>{a.signOut().then(()=>{location.reload()})}),i.collection(t).get().then(e=>{e.forEach(e=>{const t=new r(e.id);o.push(t)})})}else{const e=document.createElement("button");e.innerHTML="Login",e.classList.add("btn","btn-outline-white"),l.nav.appendChild(e),e.addEventListener("click",()=>{var e=new firebase.auth.GoogleAuthProvider;e.addScope("profile"),e.addScope("email"),firebase.auth().signInWithPopup(e).then((function(e){e.credential.accessToken,e.user;location.reload()}))})}}))}]);