const myProjects = [];

const Project = (title, notes = []) => {
  return {
    title,
    notes,
    addNote(note){
      this.notes.push(note);
    },
  }
}



export { myProjects, Project };
