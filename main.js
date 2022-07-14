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
let index = JSON.parse(localStorage.getItem("index")) || 0;

function init() {
  let project = [];
  if (arrayOfProjects.length == 0) {
    project = new Project("defaultProject");
    arrayOfProjects.push(project);
    addOption(project);
  } else {
    arrayOfProjects.forEach((project) => {
      addOption(project);
      project.tasks.forEach((task) => {
        addTaskToDOM(task, project);
      });
    });
  }
}
init();

function addOption(project) {
  let option = document.createElement("option");
  option.value = project.name;
  option.textContent = project.name;
  select.options.add(new Option(`${project.name}`, `${project.name}`));
  addProjectToDOM(project);
}

function addProjectToProjects(e) {
  e.preventDefault();
  let project = [];
  if (document.getElementById("project").value) {
    project = {
      name: document.getElementById("project").value,
      tasks: [],
    };
    arrayOfProjects.push(project);
    console.log(arrayOfProjects);
    let myObj = JSON.stringify(arrayOfProjects);
    localStorage.setItem("array", myObj);
    addOption(project);
    addTaskToProjects(project);
  } else {
    project.name = select.value;
    console.log(project);
    addTaskToProjects(project);
  }
}

function addProjectToDOM(project) {
  const div = document.createElement("div");
  div.classList.add(project.name);
  projects.appendChild(div);

  const h1 = document.createElement("h1");
  h1.textContent = `Current Tasks in ${project.name}`;
  div.appendChild(h1);

  const divWrapper = document.createElement("div");
  divWrapper.classList.add("wrapper-grid");
  div.appendChild(divWrapper);
}

function addTaskToProjects(project) {
  console.log(project.name);
  let task = {
    id: index,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    dueDate: document.getElementById("dueDate").value,
    priority: document.getElementById("priority").value,
    complete: false,
  };
  index += 1;
  let myIndex = JSON.stringify(index);
  localStorage.setItem("index", myIndex);
  arrayOfProjects[
    arrayOfProjects.findIndex((x) => x.name === project.name)
  ].tasks.push(task);
  console.log(arrayOfProjects);
  form.style.display = "none";
  form.reset();
  let myObj = JSON.stringify(arrayOfProjects);
  localStorage.setItem("array", myObj);
  addTaskToDOM(task, project);
}

function createTaskElement(el, content) {
  const elem = document.createElement(el);
  elem.textContent = content;
  return elem;
}

function createPriorityElement(task, div) {
  const showPriority = document.createElement("h4");
  div.appendChild(showPriority);
  showPriority.textContent = "priority:";

  const priorityValue = document.createElement("button");
  if (task.priority == "high") {
    priorityValue.textContent = "high";
  } else {
    priorityValue.textContent = "low";
  }
  div.appendChild(priorityValue);

  priorityValue.addEventListener("click", () => {
    if (task.priority == "high") {
      task.priority = "low";
      priorityValue.textContent = "low";
    } else {
      task.priority = "high";
      priorityValue.textContent = "high";
    }
    console.log(arrayOfProjects);
  });
}

function createCheckingElement(task, div) {
  const checkbox = document.createElement("button");
  if (task.complete) {
    checkbox.textContent = "complete";
  } else {
    checkbox.textContent = "not complete";
  }
  div.appendChild(checkbox);

  checkbox.addEventListener("click", () => {
    if (task.complete) {
      task.complete = false;
      checkbox.textContent = "not complete";
    } else {
      task.complete = true;
      checkbox.textContent = "complete";
    }
  });
}

function addTaskToDOM(task, project) {
  const divWrapper = document.querySelector(`.${project.name} .wrapper-grid`);
  const div = document.createElement("div");
  div.classList.add("container");
  divWrapper.appendChild(div);
  div.setAttribute("id", `${task.id}`);
  div.appendChild(createTaskElement("h4", `title: ${task.title}`));
  div.appendChild(createTaskElement("h4", `description: ${task.description}`));
  div.appendChild(createTaskElement("h4", `dueDate: ${task.dueDate}`));
  createPriorityElement(task, div);
  createCheckingElement(task, div);

  // create remove task btn and add class attribute for each array card
  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.classList.add("remove-task-btn");
  removeTaskBtn.textContent = "remove";

  // link the data attribute of the remove button to the array and card
  removeTaskBtn.dataset.linkedArray = task.id;
  const link = removeTaskBtn.dataset.linkedArray;
  div.appendChild(removeTaskBtn);

  // start event listener/remove array item from array and card from parent div via data link
  removeTaskBtn.addEventListener(
    "click",
    removeTaskFromProjects.bind(null, divWrapper, project, task, link, div)
  );
}

function removeTaskFromProjects(divWrapper, project, task, link, div) {
  let getTaskToRemove = link;

  function find(task) {
    return task.id == getTaskToRemove;
  }
  const taskId =
    arrayOfProjects[
      arrayOfProjects.findIndex((x) => x.name === project.name)
    ].tasks.findIndex(find);
  arrayOfProjects[
    arrayOfProjects.findIndex((x) => x.name === project.name)
  ].tasks.splice(parseInt(taskId), 1);
  let myObj = JSON.stringify(arrayOfProjects);
  localStorage.setItem("array", myObj);
  div.remove();
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
