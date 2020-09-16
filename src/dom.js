import { myProjects, Project } from "../src/projects";
import { Note } from "../src/notes"

const db = firebase.firestore();
const auth = firebase.auth();



const DOMController = () => {
  const topNav = document.querySelector("nav");
  const fakeNav = document.querySelector(".fake-left-nav");
  const toDo = document.querySelector(".todo");
  const navToggler = document.querySelector(".hamburger-button");
  const projectToggler = document.querySelector(".projects");
  const projectList = document.querySelector(".project-list");
  const submitForm = document.querySelector("#new-project-form");

  // UTILITY FUNCTIONS

  function renderUserEmail(email) {

    // Create and display user's email in top nav
    const userEmail = document.createElement("p");
    userEmail.classList.add("user-email");
    userEmail.innerHTML = email;
    topNav.appendChild(userEmail);
  }
  function renderLogOutButton() {

    // Create and display logout button on top nav
    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "Logout";
    logoutBtn.classList.add("btn", "btn-outline-white");
    topNav.appendChild(logoutBtn);

    // Add event listener to the button
    logoutBtn.addEventListener("click", () => {
      auth.signOut().then(() => {
        location.reload();
      });
    });
  }

  function renderLogInButton() {

    // Create and display login button on top nav
    const loginBtn = document.createElement("button");
    loginBtn.innerHTML = "Login";
    loginBtn.classList.add("btn", "btn-outline-white");
    topNav.appendChild(loginBtn);

    // Add event listener to the button
    loginBtn.addEventListener("click", () => {
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function (result) {
          // This gives you a Google Access Token.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          location.reload();
        });
    });
  }

  function getColorByPriority(priority) {
    switch (priority) {
      case "1":
        return "rgba(222,222,222,0.25)";
      case "2":
        return "rgba(0, 191, 255,0.25)";
      case "3":
        return "rgba(255, 128, 0, 0.25)";
      default:
        return "rgba(255, 0, 64, 0.25)";
    }
  }

  // Render Note from database!
  function renderNote(doc) {
    const noteDiv = document.createElement("div");
    noteDiv.setAttribute("data-id", doc.id);
    noteDiv.classList.add("note");

    // Retrieve data
    const title = doc.data().title;
    const desc = doc.data().desc;
    const date = doc.data().date;
    const time = doc.data().time;
    const priority = doc.data().priority;

    // Create DOM elements for data

    const noteDescDiv = document.createElement("div");
    noteDescDiv.classList.add("note-desc-div");
    const noteDesc = document.createElement("p");
    noteDescDiv.appendChild(noteDesc);
    noteDesc.classList.add("note-desc");
    noteDesc.innerHTML = desc;
    noteDiv.appendChild(noteDescDiv);

    if(date !== "") {
      const notedate = document.createElement("p");
      notedate.classList.add("note-date");
      notedate.innerHTML = date;
      noteDiv.appendChild(notedate);
    }

    if(time !== "") {
      const noteTime = document.createElement("p");
      noteTime.classList.add("note-time");
      noteTime.innerHTML = time;
      noteDiv.appendChild(noteTime);
    }

    const divColor = getColorByPriority(priority);


    // Set note's background color according to priority!
    noteDiv.style.cssText = `background-color: ${divColor}`;

    // Add delete button for note!
    const deleteNote = document.createElement("div");
    deleteNote.classList.add("delete-note", "fas", "fa-times");
    noteDiv.appendChild(deleteNote);

    // Add event listener for the button!
    deleteNote.addEventListener("click", (e) => {
      e.stopPropagation();
      if (
        confirm(
          "Are you sure you want to delete this note? This action cannot be undone!"
        )
      ) {
        const note = e.target.parentElement;
        const notes = e.target.parentElement.parentElement;

        const noteName = note.getAttribute("data-id");
        const projectName = notes.getAttribute("data-id");

        console.log(noteName, projectName);

        db.collection(`projects${firebase.auth().currentUser.uid}`)
          .doc(projectName)
          .collection("notes")
          .doc(noteName)
          .delete()
          .then(() => {
            note.remove().then(() => {
              location.reload();
            });
          });
      }
    });
    notesDiv.appendChild(noteDiv);
  }

  // Render <li> associated with project(doc)
  function renderProject(doc) {

    // Create project-div
    let li = document.createElement("li");

    let listDiv = document.createElement("div");
    listDiv.classList.add("project-div");
    li.appendChild(listDiv);

    let p = document.createElement("p");
    p.classList.add("m-0");
    p.innerHTML = project.title;
    listDiv.appendChild(p);

    let deleteBtn = document.createElement("div");
    deleteBtn.classList.add("fa", "fa-trash", "delete-project");
    listDiv.appendChild(deleteBtn);

    // Add event listener to each project's delete btn
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (
        confirm(
          "Are you sure you want to delete this project? All of the associated notes will be deleted too!"
        )
      ) {
        const projectName = doc.id;

        //remove it from database!
        db.collection(`projects${firebase.auth().currentUser.uid}`)
          .doc(projectName)
          .delete()
          .then(() => {
            location.reload();
          })
          .catch((err) => {
            console.log(err.message)
          })
      }
    });
    
  }


  // EVENT LISTENER FUNCTIONS!

  const toggleLeftNav = () => {
    if (fakeNav.style.display !== "none") {
      fakeNav.style.cssText = "display: none";
    } else {
      fakeNav.style.cssText = "display: block !important";
    }
  };

  // returns an array consisting of <li> elements to append
  // to the projects ul

  const getProjectsList = () => {
    const projects = myProjects;
    const projectsList = [];

    //console.log(projects)
    for (let project of projects) {
      let li = convertProjectToList(project);

      //add event listener to toggle notes when you press on project name
      li.addEventListener("click", (e) => {
        const notesDiv = document.querySelector(".notes");
        const newNoteDiv = document.querySelector(".new-note-div");

        if (!notesDiv) {
          const projectName = li.firstElementChild.firstElementChild.innerHTML;
          const collectionName = `projects${firebase.auth().currentUser.uid}`;

          //notes collection div!
          const notesDiv = document.createElement("div");
          notesDiv.setAttribute("data-id", projectName);
          notesDiv.classList.add("notes");
          toDo.appendChild(notesDiv);

          //notes div title!

          const noteTitle = document.createElement("p");
          noteTitle.innerHTML = projectName;
          noteTitle.classList.add("project-title");
          notesDiv.appendChild(noteTitle);

          // path: "projects[userid]/projectName/notes"
          db.collection(collectionName)
            .doc(projectName)
            .collection("notes")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const noteDiv = convertNoteToDiv(doc);
                notesDiv.appendChild(noteDiv);

              });
            });

          //create new button for notes creation!

          const newNoteBtn = document.createElement("btn");
          newNoteBtn.classList.add(
            "new-note-button",
            "btn",
            "btn-outline-white",
            "btn-danger",
            "btn-sm"
          );
          newNoteBtn.setAttribute("data-toggle", "collapse");
          newNoteBtn.setAttribute("data-target", ".new-note-div");
          newNoteBtn.innerHTML = "Add New Note";
          notesDiv.appendChild(newNoteBtn);
          notesDiv.appendChild(newNoteDiv);

          const newNoteForm = document.querySelector("#new-note-form");

          newNoteForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const desc = e.target.desc.value;
            const date = e.target.date.value;
            const time = e.target.time.value;
            const priority =
              e.target.priority.value > 4
                ? 4
                : e.target.priority.value < 1
                ? 1
                : e.target.priority.value;

            db.collection(`projects${firebase.auth().currentUser.uid}`)
              .doc(projectName)
              .collection("notes")
              .add({
                desc,
                date,
                time,
                priority,
              })
              .then(() => {
                location.reload();
              })
              .catch((err) => {
                console.log(err.message);
              })

            return false;
          });
        } else {
          document.querySelector("body").appendChild(newNoteDiv);
          notesDiv.remove();
        }
      });

      projectsList.push(li);
    }
    //console.log(projectsList)
    return projectsList; //an array of li elements representing projects
  };

  //returns a div containing an Add-Project-button that toggles a modal for project creation
  const getAddProjectDiv = () => {

    //add "Add Project <li> element"
    const addProject = document.createElement("li");
    addProject.classList.add("add-project");
    addProject.innerHTML = "Add Project";

    addProject.setAttribute("data-toggle", "modal");
    addProject.setAttribute("data-target", "#new-project-modal");

    // Only available to signed-in users!

    addProject.addEventListener("click", (e) => {
      if (!firebase.auth().currentUser) {
        e.stopPropagation();
        alert("You need to be Signed In before creating projects!");
      }
    });

    return addProject;
  };

  const toggleProjects = () => {
    const list = getProjectsList(); // to render on page
    const nowToggled = projectList.querySelectorAll("li");

    if (nowToggled.length !== 0) {
      // untoggle(aka remove) the li elements
      for (let item of nowToggled) {

        item.remove();
      }
    } else {
      for (let item of list) {
        projectList.appendChild(item);
      }

      //add "AddProject <li>"
      projectList.appendChild(getAddProjectDiv());

      //add event listener for addproject form
      submitForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const newProject = Project(title);
        myProjects.push(newProject);
        //console.log(myProjects)

        // add new project with id = title to the user_projects collection
        db.collection(`projects${firebase.auth().currentUser.uid}`)
          .doc(title)
          .set({})
          .then(() => {
            projectList.appendChild(convertProjectToList(newProject));
            location.reload();
          })
          .catch((err) => {
            console.log(err.message);
          });

        return false;
      });
    }
  };

  projectToggler.addEventListener("click", toggleProjects);
  navToggler.addEventListener("click", toggleLeftNav);

  return {
    renderUserEmail,
    renderLogOutButton,
    renderLogInButton,
  };
};

const D = DOMController();

export { D };
