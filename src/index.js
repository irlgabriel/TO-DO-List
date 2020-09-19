import { userId } from "../src/auth.js";
import { D } from "../src/dom.js";
import { myProjects, Project } from "../src/projects.js";
import { Note } from "../src/notes.js";
import './styles.css'



/*
db.collection(`projects${userId}`).get().then((snapshot) => {

  snapshot.forEach((doc) => {
    const project = new Project(doc.data().title);
    console.log(project)
    myProjects.push(project);
  })
})

*/

/*
const df = new Project("default");
myProjects.push(df);
const newNote = new Note("Dentist appointment", "Appointment with my dentist tomorrow", "3:30 pm", 4);
df.addNote(newNote);


console.log(myProjects)

*/

// Get projects and notes from database
/*
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
        project.addNote(
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
*/