import { D } from "../src/dom";
import { Project, myProjects } from "../src/projects";
import { Note } from "../src/notes"

const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    // User is signed in.
    const userId = user.uid;    
    D.renderUserEmail(user.email);
    D.renderLogOutButton();

    // Populate user's myProjects array
    const projects = db.collection("Users").doc(userId).collection("Projects");
    projects.get().then(querySnapshot => {
      querySnapshot.forEach((docRef) => {
        const project = Project(docRef.id)
        myProjects.push(project)

        // Add the project to user's myProjects array
        projects.doc(docRef.id).collection("Notes").get().then(querySnapshot => {
          querySnapshot.forEach((docRef) => {

            // Add each note to the project object!
            project.addNote(
              Note(
                docRef.data().title,
                docRef.data().desc,
                docRef.data().date ? "" : docRef.data().date,
                docRef.data().time ? "" : docRef.data().time,
                docRef.data().priority,
                docRef.id
              )
            )
          })
        })
      })
    })
  } else {
    // User not logged in!
    D.renderLogInButton();
  }
});
