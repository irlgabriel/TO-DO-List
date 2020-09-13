
import D from "../src/dom.js";
import {myProjects, Project} from "../src/projects.js";
import {Note} from "../src/notes.js"

console.log(myProjects)


const df = new Project("default");
console.log(df)
const newNote = new Note("Dentist appointment", "Appointment with my dentist tomorrow", "3:30 pm", 4);
console.log(newNote);
df.addNote(newNote);
console.log(df)

console.log(myProjects)


