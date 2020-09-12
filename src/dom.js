import P from "../src/projects";


const DOMController = () => {
  const topNav = document.querySelector("nav");
  const leftNav = document.querySelector(".left-nav");
  const fakeNav = document.querySelector(".fake-left-nav")
  const mainDiv = document.querySelector(".main");
  const toDo = document.querySelector(".todo");
  const navToggler = document.querySelector(".hamburger-button");
  const projectsUL = document.querySelector("projects");

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
    const projects = P.projects
    const projectsList = [];

    for(let project of projects) {
      let li = document.createElement("li");
      li.innerHTML = project.name;
      projectsList.push(li);
    }
    
    return projectsList;
    
  }

  const toggleProjects = () => {
    const list = getProjectsList();
    
    if(projectsUL.children > 0) {
      // untoggle(aka remove) the li elements
      for(let item of Array.from(projectsUL.children)) {
        item.remove()
      }
    } else {
      for(let item of list) {
        projectsUL.appendChild(item);
      }
    }

  }

  projectsUL.addEventListener("click", toggleProjects)
  navToggler.addEventListener("click", toggleLeftNav);


}

const D = DOMController();

export default D;