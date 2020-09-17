!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(t,n,o){"use strict";o.r(n);const c=[],i=(e,t=[])=>({title:e,notes:t,addNote(e){this.notes.push(e)}}),r=firebase.firestore(),a=firebase.auth(),d=(()=>{const t=document.querySelector("nav"),n=document.querySelector(".fake-left-nav"),o=document.querySelector(".todo"),i=document.querySelector(".hamburger-button"),d=document.querySelector(".projects"),l=document.querySelector(".project-list"),s=document.querySelector("#new-project"),u=document.querySelector("#new-note"),p=document.querySelector(".new-note-div");function m(e){console.log(e);let t=document.createElement("li");t.style.opacity=0,t.style.display="block",setTimeout(()=>{t.style.opacity=1},100),l.appendChild(t);let n=document.createElement("div");n.classList.add("project-div"),t.appendChild(n);let c=document.createElement("p");c.innerHTML=e.title,n.appendChild(c);let i=document.createElement("div");i.classList.add("fa","fa-trash","delete-project"),n.appendChild(i),i.addEventListener("click",t=>{if(t.stopPropagation(),confirm("Are you sure you want to delete this project? All of the associated notes will be deleted too!")){const t=e.title;r.collection("Users").doc(a.currentUser.uid).collection("Projects").doc(t).delete().then(()=>{location.reload()}).catch(e=>{console.log(e.message)})}}),t.addEventListener("click",t=>{t.stopPropagation();const n=document.querySelector(".notes");if(n)n.style.opacity=0,setTimeout(()=>{n.remove()},500);else{const t=document.createElement("div");t.style.opacity=0,o.appendChild(t),setTimeout(()=>{t.style.opacity=1},50),t.classList.add("notes"),t.setAttribute("data-id",e.title);const n=document.createElement("p");t.appendChild(n),n.classList.add("project-title"),n.innerHTML=e.title,function(e){const t=document.createElement("div");e.appendChild(t),t.classList.add("btn","btn-sm","btn-outline-white","btn-danger"),t.innerHTML="Create Note",t.addEventListener("click",()=>{"block"!==p.style.display?p.style.display="block":p.style.display="none"})}(t),t.appendChild(p),date.min=(new Date).toISOString().split("T")[0],document.querySelector("#untoggle-new-note-form").addEventListener("click",()=>{p.style.display="none"}),e.notes.forEach(e=>{!function(e,t){const n=document.createElement("div");n.classList.add("note"),n.setAttribute("data-id",e.id),t.appendChild(n),console.log(e);const o=e.title,c=e.desc,i=e.date,d=e.time,l=e.priority,s=document.createElement("p");s.classList.add("note-title"),s.innerHTML=o,n.appendChild(s);const u=document.createElement("div");u.classList.add("note-desc-div");const p=document.createElement("p");if(u.appendChild(p),p.classList.add("note-desc"),p.innerHTML=c,n.appendChild(u),""!==i){const e=document.createElement("p");e.classList.add("note-date"),e.innerHTML=i,n.appendChild(e)}if(""!==d){const e=document.createElement("p");e.classList.add("note-time"),e.innerHTML=d,n.appendChild(e)}const m=function(e){switch(e){case"1":return"rgba(222,222,222,0.25)";case"2":return"rgba(0, 191, 255,0.25)";case"3":return"rgba(255, 128, 0, 0.25)";default:return"rgba(255, 0, 64, 0.25)"}}(l);n.style.cssText="background-color: "+m;const y=document.createElement("div");y.classList.add("delete-note","fas","fa-times"),n.appendChild(y),y.addEventListener("click",e=>{if(e.stopPropagation(),confirm("Are you sure you want to delete this note? This action cannot be undone!")){const t=e.target.parentElement,n=e.target.parentElement.parentElement.getAttribute("data-id"),o=t.getAttribute("data-id");r.collection("Users").doc(a.currentUser.uid).collection("Projects").doc(n).collection("Notes").doc(o).delete().then(()=>{location.reload()})}})}(e,t)})}})}return d.addEventListener("click",()=>{const e=document.querySelectorAll("ul li");0===e.length?(c.forEach(e=>{m(e)}),(()=>{const e=document.createElement("li");e.classList.add("add-project"),e.innerHTML="Add Project",e.style.opacity=0,e.style.display="block",setTimeout(()=>{e.style.opacity=1},100),e.setAttribute("data-toggle","modal"),e.setAttribute("data-target","#new-project-wrapper"),e.addEventListener("click",e=>{firebase.auth().currentUser||(e.stopPropagation(),alert("You need to be Signed In before creating projects!"))}),l.appendChild(e)})()):e.forEach(e=>{e.style.opacity=0,setTimeout(()=>{e.remove()},500)})}),i.addEventListener("click",()=>{e.stopPropagation(),"none"!==n.style.display?(n.style.cssText="opacity: 0;",setTimeout(()=>{n.style.cssText+="display: none;"},500)):(n.style.cssText="display: block !important; opacity: 0;",setTimeout(()=>{n.style.cssText+="opacity: 1;"},100))}),u.addEventListener("submit",e=>{e.preventDefault();const t=u.title.value,n=u.desc.value,o=u.date.value,c=u.time.value,i=u.priority.value,d=u.parentElement.parentElement.getAttribute("data-id");return r.collection("Users").doc(a.currentUser.uid).collection("Projects").doc(d).collection("Notes").add({title:t,desc:n,priority:i,date:o,time:c}).then(()=>{location.reload()}).catch(e=>{console.log(e.message)}),!1}),s.addEventListener("submit",e=>{e.preventDefault();const t=s.title.value;r.collection("Users").doc(a.currentUser.uid).collection("Projects").doc(t).set({title:t}).then(()=>{location.reload()}).catch(e=>{console.log(e.message)})}),{renderUserEmail:function(e){const n=document.createElement("p");n.classList.add("user-email"),n.innerHTML=e,t.appendChild(n)},renderLogOutButton:function(){const e=document.createElement("button");e.innerHTML="Logout",e.classList.add("btn","btn-outline-white"),t.appendChild(e),e.addEventListener("click",()=>{a.signOut().then(()=>{location.reload()})})},renderLogInButton:function(){const e=document.createElement("button");e.innerHTML="Login",e.classList.add("btn","btn-outline-white"),t.appendChild(e),e.addEventListener("click",()=>{var e=new firebase.auth.GoogleAuthProvider;e.addScope("profile"),e.addScope("email"),firebase.auth().signInWithRedirect(e).then((function(e){e.credential.accessToken,e.user;location.reload()}))})}}})(),l=firebase.firestore();firebase.auth().onAuthStateChanged((function(e){if(e){const t=e.uid;d.renderUserEmail(e.email),d.renderLogOutButton();const n=l.collection("Users").doc(t).collection("Projects");n.get().then(e=>{e.forEach(e=>{const t=i(e.id);c.push(t),n.doc(e.id).collection("Notes").get().then(e=>{e.forEach(e=>{t.addNote(((e,t,n,o,c,i)=>({title:e,desc:t,date:n,time:o,priority:c,id:i}))(e.data().title,e.data().desc,e.data().date?e.data().date:"",e.data().time?e.data().time:"",e.data().priority,e.id))})})})})}else d.renderLogInButton()}))}]);