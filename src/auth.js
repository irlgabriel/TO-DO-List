import { D } from "../src/dom.js";
import { Project, myProjects } from "./projects.js";

const auth = firebase.auth();
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    const userId = user.uid;
    const collectionName = `projects${userId}`;
    //create and display user's email in top nav
    const userEmail = document.createElement("p");
    userEmail.classList.add("user-email");
    userEmail.innerHTML = user.email;
    D.nav.appendChild(userEmail);

    //create and display login button on top nav
    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "Logout";
    logoutBtn.classList.add("btn", "btn-outline-white");
    D.nav.appendChild(logoutBtn);

    //add event listener to the button
    logoutBtn.addEventListener("click", () => {
      auth.signOut().then(() => {
        location.reload();
      });
    });

    //get projects and notes from database and render them
    db.collection(collectionName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const project = new Project(doc.id);
          myProjects.push(project);
        });
      });
  } else {
    const loginBtn = document.createElement("button");
    loginBtn.innerHTML = "Login";
    loginBtn.classList.add("btn", "btn-outline-white");
    D.nav.appendChild(loginBtn);

    //add event listener to the button
    loginBtn.addEventListener("click", () => {
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function (result) {
          // This gives you a Google Access Token.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          location.reload();
        });
    });
  }
});
