
const ProjectsHandler = () => {
  let projects = [];

  const addProject = (project) => {
    projects.push(project)
  }

  const removeProject = (project) => {
    // to be continued
  }

  return {projects,
          addProject,
          removeProject,}
          
}
const p = ProjectsHandler()
p.addProject({name: "gabi"})
console.log(p.projects)

const P = ProjectsHandler();

export default P;