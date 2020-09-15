import {userId} from "../src/auth.js"
import {D} from "../src/dom.js";
import {myProjects, Project} from "../src/projects.js";
import {Note} from "../src/notes.js"





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
