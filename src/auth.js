import D from "../src/dom.js"

const auth = firebase.auth()




firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

  } else {
    console.log(D.form);
  }
});