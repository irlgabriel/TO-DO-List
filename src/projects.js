import {Note, myNotes} from "../src/notes.js"

const myProjects = []

function Project(title) {
  this.title = title;
  this.notes = [];
}

Project.prototype.addNote = function(note) {
  this.notes.push(note)
}


export default {myProjects,
                 Project };