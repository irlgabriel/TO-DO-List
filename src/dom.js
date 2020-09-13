import {myProjects, Project} from "../src/projects"; 



const DOMController = () => {
  const topNav = document.querySelector("nav");
  const leftNav = document.querySelector(".left-nav");
  const fakeNav = document.querySelector(".fake-left-nav")
  const mainDiv = document.querySelector(".main");
  const toDo = document.querySelector(".todo");
  const navToggler = document.querySelector(".hamburger-button");
  const projectToggler = document.querySelector(".projects");
  const projectList = document.querySelector(".project-list");

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
      //create list element
      let li = document.createElement("li");
      projectsList.push(li);

      //create project-div
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
    }

    return projectsList; //an array of li elements representing projects
    
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
      //add "Add Project <li> element"
      const addProject = document.createElement("li");
      addProject.classList.add("add-project")
      addProject.innerHTML = "Add Project"
      projectList.appendChild(addProject)

      addProject.setAttribute("data-toggle", "modal")
      addProject.setAttribute("data-target", "#new-project-modal")

    }

  }

  projectToggler.addEventListener("click", toggleProjects);
  navToggler.addEventListener("click", toggleLeftNav);


}

const D = DOMController();

export {D};