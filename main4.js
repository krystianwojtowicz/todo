const form = document.querySelector("form");
const addTaskBtn = document.querySelector(".add-task");
const close = document.querySelector(".close");
const submit = document.querySelector(".submit");
const remove = document.querySelectorAll(".remove");
const select = document.getElementById("projects");
const projects = document.querySelector(".projects");
const clear = document.querySelector(".clear");

class Task {
  constructor(title, description, dueDate, priority, id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}
const arrayOfProjects = JSON.parse(localStorage.getItem("array")) || [];

(function () {
  let newArr;
  let project= [];
  if (arrayOfProjects.length == 0) {
    project = new Project("defaultProject");
    arrayOfProjects.push(project);
    console.log(arrayOfProjects);
    console.log(JSON.parse(localStorage.getItem("arrayOfProjects")));
    addOption(project);
  }
  console.log(arrayOfProjects);
})();

function addOption(project) {
  let option = document.createElement("option");
  option.value = project.name;
  option.textContent = project.name;
  select.options.add(
    new Option(`${project.name}`, `${project.name}`)
  );
  console.log(arrayOfProjects);
}

function addProjectToProjects(e) {
    e.preventDefault();
    let project = [];
    if (document.getElementById("project").value) {
      project = {
        name: document.getElementById("project").value,
        tasks: [],
      };
    } else {
      project = {
        name: select.value,
        tasks: [],
      };
    }
      arrayOfProjects.push(project);
      console.log(arrayOfProjects)
      form.style.display = "none";
      form.reset();
      const myObj = JSON.stringify(arrayOfProjects);
      localStorage.setItem('array', myObj);
      addOption(project);
}

clear.addEventListener("click", function () {
  localStorage.clear();
});

close.addEventListener("click", () => {
  form.style.display = "none";
});

addTaskBtn.addEventListener("click", () => {
  form.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  submit.addEventListener("click", addProjectToProjects);
});