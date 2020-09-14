import {myProjects, Project} from "../src/projects.js"; 



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
      e.target.parentElement.remove()
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

        projectList.appendChild(convertProjectToList(newProject))

        //location.reload()

        return false;

      })

    }

  }

  projectToggler.addEventListener("click", toggleProjects);
  navToggler.addEventListener("click", toggleLeftNav);

  return {
    form: submitForm
  }

}

const D = DOMController();
console.log(D)

export {D};