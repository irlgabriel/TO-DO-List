import {myProjects, Project} from "../src/projects.js"; 

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
        return 'white';
      case 2:
        return 'lightblue';
      case 3:
        return 'lightyellow';
      case 4:
        return 'lightsalmon';
    }
  }

  function convertNoteToDiv(doc) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note")
    
    
    //retrieve data 

    const title = doc.data().title;
    const desc = doc.data().desc;
    const dueDate = doc.data().dueDate.toDate()
    const priority = doc.data().priority;

    //create DOM elements for data

    const noteTitle = document.createElement("p");
    noteTitle.classList.add("note-title")
    noteTitle.innerHTML = title;
    noteDiv.appendChild(noteTitle);

    const noteDesc = document.createElement("p");
    noteDesc.classList.add("note-desc");
    noteDesc.innerHTML = desc;
    noteDiv.appendChild(noteDesc);

    
    const noteDueDate = document.createElement("p");
    noteDueDate.classList.add("note-date");
    noteDueDate.innerHTML = dueDate.toLocaleDateString("en-US");
    noteDiv.appendChild(noteDueDate);
    
    const divColor = getColorByPriority(priority)

    noteDiv.style.backgroundColor = divColor;

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
      //remove it from DOM
      e.stopPropagation()
      const projectName = e.target.parentElement.firstElementChild.innerHTML;
      e.target.parentElement.remove()
      //remove it from database!
      db.collection(`projects${firebase.auth().currentUser.uid}`).doc(projectName).delete();
      
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

    for(let project of projects) {

      let li = convertProjectToList(project)

      //add event listener to toggle notes when you press on project name 
      li.addEventListener("click", (e) => {
        const notesDiv = document.querySelector(".notes")

        if(!notesDiv) {
          const projectName = li.firstElementChild.firstElementChild.innerHTML;
          const collectionName = `projects${firebase.auth().currentUser.uid}`

          //notes collection div!
          const notesDiv = document.createElement("div");
          notesDiv.classList.add("notes");
          toDo.appendChild(notesDiv);

          // path: "projects[userid]/projectName/notes"
          db.collection(collectionName).doc(projectName).collection("notes").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              
              const noteDiv = convertNoteToDiv(doc)
              notesDiv.appendChild(noteDiv);

            })
          })
        } else {
          notesDiv.remove()
        }
        
      })
      
      projectsList.push(li);

    }

    return projectsList; //an array of li elements representing projects
    
  }

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
          location.reload()
        }).catch((err) => {
          console.log(err.message)
        })

        projectList.appendChild(convertProjectToList(newProject))



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