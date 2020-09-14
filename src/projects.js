


const myProjects = []

function Project(title) {
  this.title = title;
  this.notes = [];
}

Project.prototype.addNote = function(note) {
  this.notes.push(note);
}

// seed myProjects with projects from database

const db = firebase.firestore();




export  {myProjects,
                 Project };