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
    console.log(projects)
    const projectsList = [];

    for(let project of projects) {
      let li = document.createElement("li");
      li.innerHTML = project.title;
      projectsList.push(li);
    }

    return projectsList; //an array of li elements representing projects
    
  }

  const toggleProjects = () => {

    const list = getProjectsList(); // to render on page
    const nowToggled = projectList.querySelectorAll("li");


    if(nowToggled.length !== 0) {
      // untoggle(aka remove) the li elements
      for(let item of nowToggled) {
        item.remove()
      }
    } else {
      for(let item of list) {
        console.log(item)
        projectList.appendChild(item);
      }
    }

  }

  projectToggler.addEventListener("click", toggleProjects);
  navToggler.addEventListener("click", toggleLeftNav);


}

const D = DOMController();

export default D;