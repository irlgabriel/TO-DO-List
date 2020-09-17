import { myProjects, Project } from "../src/projects";

const db = firebase.firestore();
const auth = firebase.auth();

const DOMController = () => {
  const topNav = document.querySelector("nav");
  const fakeNav = document.querySelector(".fake-left-nav");
  const toDo = document.querySelector(".todo");
  const navToggler = document.querySelector(".hamburger-button");
  const projectToggler = document.querySelector(".projects");
  const projectList = document.querySelector(".project-list");
  const newProjectForm = document.querySelector("#new-project");
  const newNoteForm = document.querySelector("#new-note")
  const newNoteFormWrapper = document.querySelector(".new-note-div")
  

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
  // Renders a new Note button that brings up a form for notes creation
  function renderNewNoteButton(notesDiv) {
    const newNoteBtn = document.createElement("div");
    notesDiv.appendChild(newNoteBtn);
    newNoteBtn.classList.add("btn", "btn-sm", "btn-outline-white", "btn-danger")
    newNoteBtn.innerHTML = "Create Note";

    // Make newNoteBtn toggle between showing and hiding the note creation form
    newNoteBtn.addEventListener("click", () => {
      if(newNoteFormWrapper.style.display !== "block") {
        newNoteFormWrapper.style.display = "block";
      } else {
        newNoteFormWrapper.style.display = "none";
      }
    })
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

  // Render Div associated with note object to the notesDiv DOM element
  function renderNote(note, notesDiv) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.setAttribute("data-id", note.id)
    notesDiv.appendChild(noteDiv);

    // Retrieve data
    const title = note.title;
    const desc = note.desc;
    const date = note.date;
    const time = note.time;
    const priority = note.priority;

    // Create DOM elements for data

    // Title
    const noteTitle = document.createElement("p");
    noteTitle.classList.add("note-title");
    noteTitle.innerHTML = title;
    noteDiv.appendChild(noteTitle);

    // Description
    const noteDescDiv = document.createElement("div");
    noteDescDiv.classList.add("note-desc-div");
    const noteDesc = document.createElement("p");
    noteDescDiv.appendChild(noteDesc);
    noteDesc.classList.add("note-desc");
    noteDesc.innerHTML = desc;
    noteDiv.appendChild(noteDescDiv);

    // Date
    if(date !== "") {
      const notedate = document.createElement("p");
      notedate.classList.add("note-date");
      notedate.innerHTML = date;
      noteDiv.appendChild(notedate);
    }

    // Time
    if(time !== "") {
      const noteTime = document.createElement("p");
      noteTime.classList.add("note-time");
      noteTime.innerHTML = time;
      noteDiv.appendChild(noteTime);
    }

    // Set note's background color according to priority!
    const divColor = getColorByPriority(priority);
    noteDiv.style.cssText = `background-color: ${divColor}`;

    // Add delete button for note!
    const deleteNote = document.createElement("div");
    deleteNote.classList.add("delete-note", "fas", "fa-times");
    noteDiv.appendChild(deleteNote);

    // Add event listener for the button!
    deleteNote.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this note? This action cannot be undone!")) {
        const note = e.target.parentElement;
        const notes = e.target.parentElement.parentElement;

        const projectId = notes.getAttribute("data-id");
        const noteId = note.getAttribute("data-id");


        db.collection('Users')
          .doc(auth.currentUser.uid)
          .collection("Projects")
          .doc(projectId)
          .collection("Notes")
          .doc(noteId)
          .delete()
          .then(() => {
            location.reload();
          });
          
      }
    });
    
  }

  // Render <li> associated with project
  function renderProject(project) {
    console.log(project)
    // Create project-div
    let li = document.createElement("li");
    projectList.appendChild(li)

    let listDiv = document.createElement("div");
    listDiv.classList.add("project-div");
    li.appendChild(listDiv);

    let p = document.createElement("p");
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
        const projectName = project.title;

        // Remove it from database!
        db.collection("Users")
          .doc(auth.currentUser.uid)
          .collection("Projects")
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

    // Add event listener to toggle project's notes!
    li.addEventListener("click", (e) => { 
      const notesDiv = document.querySelector(".notes")
      if(!notesDiv) {

        // Create notes div associated with THIS project
        const notesDiv = document.createElement("div");
        toDo.appendChild(notesDiv);
        notesDiv.classList.add("notes");
        notesDiv.setAttribute("data-id", project.title);

        // First we render a Create Note button so that it stays at the top of the .notes container
        renderNewNoteButton(notesDiv);

        // Next we add a (hidden) new div that contains note form creation
        notesDiv.appendChild(newNoteFormWrapper);
        date.min = new Date().toISOString().split("T")[0];
        document.querySelector("#untoggle-new-note-form").addEventListener("click", () => {
          newNoteFormWrapper.style.display = "none";
        })
      
        // Append each note to this newly created div!
        project.notes.forEach(note => {
          renderNote(note, notesDiv);
        })
      } else {
        notesDiv.remove();
      }
    })

  }

  // Creates and appends a DOM element that helps create projects!
  const renderAddProjectDiv = () => {
    const addProject = document.createElement("li");
    addProject.classList.add("add-project");
    addProject.innerHTML = "Add Project";

    addProject.setAttribute("data-toggle", "modal");
    addProject.setAttribute("data-target", "#new-project-wrapper");

    // Only available to signed-in users!
    addProject.addEventListener("click", (e) => {
      if (!firebase.auth().currentUser) {
        e.stopPropagation();
        alert("You need to be Signed In before creating projects!");
      }
    });

    projectList.appendChild(addProject);
  };


  // EVENT LISTENER FUNCTIONS!

  const toggleLeftNav = () => {
    if (fakeNav.style.display !== "none") {
      fakeNav.style.cssText = "display: none";
    } else {
      fakeNav.style.cssText = "display: block !important";
    }
  };

  const toggleProjects = () => {
    const listedProjects = document.querySelectorAll("ul li");
    if(listedProjects.length === 0) {
      myProjects.forEach(project => {
        renderProject(project)
      })
      renderAddProjectDiv();
    } else {
      listedProjects.forEach(project => {
        project.remove();
      })
    }
  }

  // EVENT LISTENER FOR THE TWO FORMS THAT I DO NOT DYNAMICALLY CREATE (NEW PROJECT AND NEW NOTE)

  // New Note Form
  newNoteForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const title = newNoteForm.title.value
    const desc = newNoteForm.desc.value
    const date = newNoteForm.date.value
    const time = newNoteForm.time.value
    const priority = newNoteForm.priority.value;
    const projectName = newNoteForm.parentElement.parentElement.getAttribute("data-id");

    
    db.collection("Users")
    .doc(auth.currentUser.uid)
    .collection("Projects")
    .doc(projectName)
    .collection("Notes")
    .add({
      title,
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
  })

  // New Project Form
  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title = newProjectForm.title.value;

    db.collection("Users")
    .doc(auth.currentUser.uid)
    .collection("Projects")
    .doc(title)
    .set({
      title
    })
    .then(() => {
      location.reload()
    })
    .catch((err) => {
      console.log(err.message)
    })
  })

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
