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
  const projectsArrow = document.querySelector(".projects i");

  // UTILITY FUNCTIONS

  function renderEditNote(note, titleVal, descVal, dateVal, timeVal, priorityVal) {
    const editForm = document.createElement("form");
    note.appendChild(editForm);
    editForm.classList.add("edit-note-form");
    editForm.min = new Date().toISOString().split("T")[0];

    let formGroup = document.createElement("div");
    formGroup.classList.add("form-group");
    editForm.appendChild(formGroup);

    const title = document.createElement("input");
    formGroup.appendChild(title);
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("placeholder", "Title..")
    title.required = true;
    title.id = "edit-title";
    title.value = titleVal;
    title.classList.add("form-control");

    let formGroup1 = document.createElement("div");
    formGroup1.classList.add("form-group");
    editForm.appendChild(formGroup1);

    const desc = document.createElement("textarea");
    formGroup1.appendChild(desc);
    desc.setAttribute("name", "desc")
    desc.setAttribute("placeholder", "Description..")
    desc.required = true;
    desc.id = "edit-desc"
    desc.value = descVal;
    desc.classList.add("form-control");

    let formGroup2 = document.createElement("div");
    formGroup2.classList.add("form-group");
    editForm.appendChild(formGroup2);

    const date = document.createElement("input")
    formGroup2.appendChild(date);
    date.setAttribute("type", "date");
    date.setAttribute("name", "date");
    date.min = dateVal;
    date.id = "edit-date"
    date.value = dateVal;
    date.classList.add("form-control")

    let formGroup3 = document.createElement("div");
    formGroup3.classList.add("form-group");
    editForm.appendChild(formGroup3);
    
    const time = document.createElement("input")
    formGroup3.appendChild(time);
    time.setAttribute("type", "time");
    time.setAttribute("name", "name");
    time.id = "edit-time"
    time.value = timeVal;
    time.classList.add("form-control");

    let formGroup4 = document.createElement("div");
    formGroup4.classList.add("form-group");
    editForm.appendChild(formGroup4);

    const priority = document.createElement("input")
    formGroup4.appendChild(priority);
    priority.setAttribute("type", "number");
    priority.setAttribute("name", "priority")
    priority.min = 1;
    priority.max = 4;
    priority.id = "edit-priority";
    priority.value = priorityVal;
    priority.classList.add("form-control")

    // Submit button

    let formGroup5 = document.createElement("div");
    editForm.appendChild(formGroup5);
    formGroup5.classList.add("form-group");
    formGroup5.style.textAlign = "right";
    
    const submitBtn = document.createElement("button");
    formGroup5.appendChild(submitBtn);
    submitBtn.classList.add("submit-edit-note", "btn-sm", "btn-danger", "btn-outline-white", "btn");
    submitBtn.setAttribute("type", "submit");
    submitBtn.style.margin = "auto";
    submitBtn.innerHTML = "Save";
    

    // Add event listener to catch form
    console.log(editForm);
    editForm.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log(e)
      //e.preventDefault();

      const noteId = e.target.parentElement.getAttribute("data-id");
      const projectId = e.target.parentElement.parentElement.getAttribute("data-id");
      const userId = auth.currentUser.uid;

      const title = document.getElementById("edit-title").value
      const desc = document.getElementById("edit-desc").value
      const date = document.getElementById("edit-date").value
      const time = document.getElementById("edit-time").value
      const priority = document.getElementById("edit-priority").value

      db.collection("Users").doc(userId).collection("Projects").doc(projectId).collection("Notes").doc(noteId).update({
        title,
        desc,
        date,
        time,
        priority
      })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log(err.message);
      })

      return false;

    })
  }

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
    logoutBtn.classList.add("btn", "btn-outline-white", "btn-sm");
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
    newNoteBtn.classList.add("btn", "btn-sm", "btn-outline-white", "btn-danger", "new-note-btn")
    newNoteBtn.innerHTML = "Create Note";

    // Make newNoteBtn toggle between showing and hiding the note creation form
    newNoteBtn.addEventListener("click", () => {
      if(newNoteFormWrapper.style.display !== "block") {
        newNoteFormWrapper.style.opacity = 0;
        newNoteFormWrapper.style.display = "block";
        setTimeout(() => {
          newNoteFormWrapper.style.opacity = 1;
        }, 100)
      } else {
        newNoteFormWrapper.style.opacity = 0;
        setTimeout(() => {
          newNoteFormWrapper.style.display = "none";
        }, 500)
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

    // Hidden div containing rest of the info about this note
    const noteInfo = document.createElement("div");
    noteInfo.classList.add("note-info")
    noteInfo.style.display = "none";
    noteDiv.appendChild(noteInfo);

    // Description
    const noteDescDiv = document.createElement("div");
    noteDescDiv.classList.add("note-desc-div");
    const noteDesc = document.createElement("p");
    noteDescDiv.appendChild(noteDesc);
    noteDesc.classList.add("note-desc");
    noteDesc.innerHTML = desc;
    noteInfo.appendChild(noteDescDiv);

    // Date
    if(date !== "") {
      const notedate = document.createElement("p");
      notedate.classList.add("note-date");
      notedate.innerHTML = date;
      noteInfo.appendChild(notedate);
    }

    // Time
    if(time !== "") {
      const noteTime = document.createElement("p");
      noteTime.classList.add("note-time");
      noteTime.innerHTML = time;
      noteInfo.appendChild(noteTime);
    }

    // Edit button at the bottom
    const editBtn = document.createElement("btn")
    noteInfo.appendChild(editBtn);
    editBtn.classList.add("btn", "btn-sm", "btn-danger", "btn-outline-white")
    editBtn.innerHTML = "Edit Note";

    // Add event listener to that button

    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const noteDiv = e.target.parentElement.parentElement;
      // const noteId = noteDiv.getAttribute("data-id");

      // Remove note's child elements
      Array.from(noteDiv.children).forEach(child => {
        child.remove()
      })

      // And render edit form in place of it
      renderEditNote(noteDiv, title, desc, date, time, priority);

    })
    

    // Toggle between showing noteInfo when clicking on a note (WITH FADE ANIMATION)
    noteDiv.addEventListener("click", () => {
      if(noteInfo.style.display !== "block") {

        noteInfo.style.opacity = 0;
        noteInfo.style.display = "block";
        setTimeout(() => {
          noteInfo.style.opacity = 1;
        }, 100)
      } else {
        noteInfo.style.opacity = 0;
        setTimeout(() => {
          noteInfo.style.display = "none"; 
        }, 500)
      }
    })

    
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
    // Create project-div
    let li = document.createElement("li");
    li.style.opacity = 0;
    li.style.display = "block";
    setTimeout(() => {
      li.style.opacity = 1;
    }, 100)
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
      e.stopPropagation()
      const notesDiv = document.querySelector(".notes")
      
      if(!notesDiv) {
        li.firstElementChild.classList.add("clicked");
        // Create notes div associated with THIS project
        const notesDiv = document.createElement("div");
        notesDiv.style.opacity = 0;
        toDo.appendChild(notesDiv);
        setTimeout(() => {
          notesDiv.style.opacity = 1;
        }, 50)     
        notesDiv.classList.add("notes");
        notesDiv.setAttribute("data-id", project.title);

        // We add a paragraph with the title at the top of this div
        const para = document.createElement("p");
        notesDiv.appendChild(para);
        para.classList.add("project-title")
        para.innerHTML = project.title

        // First we render a Create Note button so that it stays at the top of the .notes container
        renderNewNoteButton(notesDiv);

        // Next we add a (hidden) new div that contains note form creation
        notesDiv.appendChild(newNoteFormWrapper);
        date.min = new Date().toISOString().split("T")[0];
        document.querySelector("#untoggle-new-note-form").addEventListener("click", () => {
          newNoteFormWrapper.style.opacity = 0;
        setTimeout(() => {
          newNoteFormWrapper.style.display = "none";
        }, 500)
        })
      
        // Append each note to this newly created div!
        project.notes.forEach(note => {
          renderNote(note, notesDiv);
        })
      } else {
        li.firstElementChild.classList.remove("clicked")
        notesDiv.style.opacity = 0;
        setTimeout(() => {
          notesDiv.remove()
        }, 500)
        
      }
    })

  }

  // Creates and appends a DOM element that helps create projects!
  const renderAddProjectDiv = () => {
    const addProject = document.createElement("li");
    addProject.classList.add("add-project");
    addProject.innerHTML = "Add Project";
    addProject.style.opacity = 0;
    addProject.style.display = "block";
    setTimeout(() => {
      addProject.style.opacity = 1;
    }, 100)

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

  // + Added a little fade-in and out animation here!
  const toggleLeftNav = (e) => {
    e.stopPropagation();
    if (fakeNav.style.display !== "none") {
      fakeNav.style.cssText = "opacity: 0;"; 
      setTimeout(() => {
        fakeNav.style.cssText += "display: none;";
      }, 500);
    } else {
      fakeNav.style.cssText = "display: block !important; opacity: 0;"
      setTimeout(() => {
        fakeNav.style.cssText += "opacity: 1;";
      }, 100);
    }
  };

  const toggleProjects = () => {
    const listedProjects = document.querySelectorAll("ul li");
    if(listedProjects.length === 0) {
      console.log(projectsArrow);
      projectsArrow.style.cssText = "transform: rotate(0deg);"
      myProjects.forEach(project => {
        renderProject(project)
      })
      renderAddProjectDiv();

    } else {
      listedProjects.forEach(project => {
        project.style.opacity = 0;
        projectsArrow.style.cssText = "transform: rotate(-90deg);"
        setTimeout(() => {
          project.remove();
        }, 500)
      })
    }
  }

  projectToggler.addEventListener("click", toggleProjects);
  navToggler.addEventListener("click", toggleLeftNav);

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
      priority,
      date,
      time,
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


  return {
    renderUserEmail,
    renderLogOutButton,
    renderLogInButton,
  };
};

const D = DOMController();

export { D };
