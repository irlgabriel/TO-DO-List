import {myProjects, Project} from "../src/projects.js"; 
import { format } from 'date-fns'



const db = firebase.firestore()

const DOMController = () => {
  const topNav = document.querySelector("nav");
  const leftNav = document.querySelector(".left-nav");
  const fakeNav = document.querySelector(".fake-left-nav")
  const mainDiv = document.querySelector(".main");
  const toDo = document.querySelector(".todo");
  const navToggler = document.querySelector(".hamburger-button");
  const projectToggler = document.querySelector(".projects");
  const projectList = document.querySelector(".project-list");
  const submitForm = document.querySelector("#new-project-form")


  // UTILITY FUNCTIONS

  function getColorByPriority(priority) {
    
    switch(priority) {
      case 1:
        return "rgba(222,222,222,0.5)";
      case 2:
        return 'rgba(0, 191, 255,0.5)';
      case 3:
        return 'rgba(255, 128, 0, 0.5)';
      case 4:
        return 'rgb(255, 0, 64)';
    }
  }

  function convertNoteToDiv(doc) {
    const noteDiv = document.createElement("div");
    noteDiv.setAttribute("data-id", doc.id);
    noteDiv.classList.add("note")
        
    //retrieve data 

    const desc = doc.data().desc;
    console.log(doc.data().dueDate);
    
    const dueDate = doc.data().dueDate
    console.log(dueDate);
    const priority = doc.data().priority;

    //create DOM elements for data

    const noteDescDiv = document.createElement("div");
    noteDescDiv.classList.add("note-desc-div")
    const noteDesc = document.createElement("p");
    noteDescDiv.appendChild(noteDesc)
    noteDesc.classList.add("note-desc");
    noteDesc.innerHTML = desc;
    noteDiv.appendChild(noteDescDiv);
    
    const noteDueDate = document.createElement("p");
    noteDueDate.classList.add("note-date");
    noteDueDate.innerHTML = dueDate;
    noteDiv.appendChild(noteDueDate);
    
    const divColor = getColorByPriority(priority)

    console.log(priority)
    console.log(divColor, noteDiv)

    //set note's background color according to priority!
    noteDiv.style.cssText = `background-color: ${divColor}`;

    //add delete button for note!
    const deleteNote = document.createElement("div");
    deleteNote.classList.add("delete-note", "fas", "fa-times");
    noteDiv.appendChild(deleteNote);

    deleteNote.addEventListener("click", (e) => {
      if(confirm("Are you sure you want to delete this note? This action cannot be undone!")) {
        const note = e.target.parentElement;
        const notes = e.target.parentElement.parentElement;

        const noteName = note.getAttribute("data-id");
        const projectName = notes.getAttribute("data-id");

        console.log(noteName, projectName);

        db.collection(`projects${firebase.auth().currentUser.uid}`).doc(projectName).collection("notes").doc(noteName).delete().then(() => {
          note.remove().then(() => {
            location.reload()
          })
        })
      }
    })

    return noteDiv;
  }

  function convertProjectToList(project){
    //create project-div
    let li = document.createElement("li");

    let listDiv = document.createElement("div");
    listDiv.classList.add("project-div")
    li.appendChild(listDiv)

    let p = document.createElement("p");
    p.classList.add("m-0")
    p.innerHTML = project.title;
    listDiv.appendChild(p);

    let deleteBtn = document.createElement("div")
    deleteBtn.classList.add("fa", "fa-trash", "delete-project");
    listDiv.appendChild(deleteBtn);

    //add event listener to each project's delete btn
    deleteBtn.addEventListener("click", (e) => {
      
      e.stopPropagation()
      if(confirm("Are you sure you want to delete this project? All of the associated notes will be deleted too!")) {
        const projectName = e.target.parentElement.firstElementChild.innerHTML;
        //remove it from DOM
        e.target.parentElement.remove()
        //remove it from database!
        db.collection(`projects${firebase.auth().currentUser.uid}`).doc(projectName).delete();
      }
      
    })

    return li;

  }


  // EVENT LISTENER FUNCTIONS! 

  const createProject = () => {
    
  }

  const toggleLeftNav = () => {
    if(leftNav.style.display != "none") {
      fakeNav.style.display = "none";
      leftNav.style.display = "none";
    } else {
      fakeNav.style.display = "block";
      leftNav.style.display = "block";
    }
  }

  // returns an array consisting of <li> elements to append
  // to the projects ul

  const getProjectsList = () => {
    const projects = myProjects
    const projectsList = [];


    //console.log(projects)
    for(let project of projects) {

      let li = convertProjectToList(project)

      //add event listener to toggle notes when you press on project name 
      li.addEventListener("click", (e) => {
        const notesDiv = document.querySelector(".notes")
        const newNoteDiv = document.querySelector(".new-note-div");

        if(!notesDiv) {

          const projectName = li.firstElementChild.firstElementChild.innerHTML;
          const collectionName = `projects${firebase.auth().currentUser.uid}`

          //notes collection div!
          const notesDiv = document.createElement("div");
          notesDiv.setAttribute("data-id", projectName);
          notesDiv.classList.add("notes");
          toDo.appendChild(notesDiv);

          // path: "projects[userid]/projectName/notes"
          db.collection(collectionName).doc(projectName).collection("notes").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              
              const noteDiv = convertNoteToDiv(doc)
              notesDiv.appendChild(noteDiv);

            })
          })

          //create new button for notes creation!

          const newNoteBtn = document.createElement("btn");
          newNoteBtn.classList.add("new-note-button", "btn", "btn-outline-white", "btn-danger", "btn-sm");
          newNoteBtn.setAttribute("data-toggle", "collapse");
          newNoteBtn.setAttribute("data-target", ".new-note-div");
          newNoteBtn.innerHTML = "Add New Note";
          notesDiv.appendChild(newNoteBtn);
          notesDiv.appendChild(newNoteDiv);

          const newNoteForm = document.querySelector("#new-note-form")

          newNoteForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const desc = e.target.desc.value;
            console.log(e.target.dueDate.value)
            const dueDate = e.target.dueDate.value;
            const priority = (e.target.priority.value > 4) ? 4 : (e.target.priority.value < 1) ? 1 : e.target.priority.value

            db.collection(`projects${firebase.auth().currentUser.uid}`).doc(projectName).collection("notes").add({
              desc: desc,
              dueDate: format(new Date(dueDate), "Y MMM do, H:mm"),
              priority: priority,
            }).then(() => {
              location.reload();
            })

            return false;

          })

        } else {

          document.querySelector('body').appendChild(newNoteDiv);
          notesDiv.remove()
        }
        
      })
      
      projectsList.push(li);

    }
    //console.log(projectsList)
    return projectsList; //an array of li elements representing projects
    
  }

  //returns a div containing an Add-Project-button that toggles a modal for project creation
  const getAddProjectDiv = () => {
    //add "Add Project <li> element"
    const addProject = document.createElement("li");
    addProject.classList.add("add-project")
    addProject.innerHTML = "Add Project"
    

    addProject.setAttribute("data-toggle", "modal")
    addProject.setAttribute("data-target", "#new-project-modal")

    return addProject;

  }


  const toggleProjects = () => {

    const list = getProjectsList(); // to render on page
    const nowToggled = projectList.querySelectorAll("li");


    if(nowToggled.length !== 0) {
      // untoggle(aka remove) the li elements
      for(let item of nowToggled) {
        //console.log(item)
        item.remove()
      }
    } else {
      for(let item of list) {
        //console.log(item)
        projectList.appendChild(item);
      }

      //add "AddProject <li>"
      projectList.appendChild(getAddProjectDiv());

      //add event listener for addproject form
      submitForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const title = e.target.title.value;
        const newProject = new Project(title);
        myProjects.push(newProject);
        console.log(myProjects)
        
        // add new project with id = title to the user_projects collection
        db.collection(`projects${firebase.auth().currentUser.uid}`).doc(title).set({
        }).then(() =>{
          projectList.appendChild(convertProjectToList(newProject))
          location.reload()
        }).catch((err) => {
          console.log(err.message)
        })

        return false;

      })

    }

  }

  projectToggler.addEventListener("click", toggleProjects);
  navToggler.addEventListener("click", toggleLeftNav);

  return {
    form: submitForm,
    nav: topNav
  }

}

const D = DOMController();

export {D};