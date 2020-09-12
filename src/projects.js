
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
const P = ProjectsHandler();

P.addProject({name: "gabi"});

export default P;