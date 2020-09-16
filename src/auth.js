import { D } from "../src/dom";
import { Project, myProjects } from "../src/projects";
import { Note } from "../src/notes"
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    // User is signed in.
    const userId = user.uid;
    const collectionName = `projects${userId}`;

    D.renderUserEmail(user.email);
    D.renderLogOutButton();

    // Get projects and notes from database
    db.collection(collectionName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          
          // Create project 
          const project = Project(doc.id);
          myProjects.push(project);
          console.log(project)
          // Get projects' notes
          db.collection(collectionName)
          .doc(doc.id)
          .collection("notes")
          .get()
          .then(snapShot => {
            snapShot.forEach((docRef) => {
              project.notes.push(
                Note(
                  docRef.data().title,
                  docRef.data().desc,
                  docRef.data().date ? "" : docRef.data().date,
                  docRef.data().time ? "" : docRef.data().time,
                  docRef.data().priority
                )
              )
            })
          })
        });
      });
      
  } else {
    // User not logged in!
    const collectionName = "projects";

    D.renderLogInButton();

    
  }
});
