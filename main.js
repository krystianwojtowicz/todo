const form = document.querySelector("form");
const addTaskBtn = document.querySelector(".add-task");
const close = document.querySelector(".close");
const submit = document.querySelector(".submit");
const projects = document.querySelector(".wrapper-grid");
const remove = document.querySelectorAll(".remove");

class Task {
  constructor(title, author, pages, read) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}
let arrayOfProjects = [];
// let project = new Project('defaultProject');

close.addEventListener("click", () => {
  form.style.display = "none";
});

addTaskBtn.addEventListener("click", () => {
  form.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  submit.addEventListener("click", addTaskToProjects);
});

const addTaskToProjects = (e) => {
  e.preventDefault();
  let task = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    dueDate: document.getElementById("dueDate").value,
    priority: document.getElementById("priority").value,
  };
  let project = {name: document.getElementById('project').value, tasks: []};

  
//   if(arrayOfProjects.project) {
//   if(arrayOfProjects.project[0].indexOf(document.getElementById('project').value)) {
//     console.log('2')
//   }
// }

  // if(arrayOfProjects.forEach((project) => {
  //   project.name == document.getElementById('project').value
  // })) {
  //   console.log('2')
  // }
  arrayOfProjects.push(project);
  arrayOfProjects[0].tasks.push(task);
  form.style.display = "none";
  form.reset();
  display();
}

function display() {

  projects.textContent = '';
  let index = 0;
  arrayOfProjects[0].tasks.forEach((task) => {
    function createTaskElement(el, name, content) {
      const elem = document.createElement(el);
      div.appendChild(elem);
      elem.textContent = name;
      const elem2 = document.createElement(el);
      elem2.textContent = content;
      div.appendChild(elem2);
    }

    const div = document.createElement("div");
    div.classList.add("container");
    projects.appendChild(div);

    createTaskElement('h4', 'title:', `${task.title}`);
    createTaskElement('h4', 'description:', `${task.description}`);
    createTaskElement('h4', 'dueDate:', `${task.dueDate}`);
    createTaskElement('h4', 'priority:', `${task.priority}`);


    // if (book.read) {
    //   checkbox.textContent = 'read';
    // } else {
    //   checkbox.textContent = 'not read';
    // }
    // checkbox.textContent = book.read ? 'read' : 'not read';

    // create remove task btn and add class attribute for each array card
    const removeTaskBtn = document.createElement('button');
    removeTaskBtn.classList.add('remove-task-btn');
    removeTaskBtn.textContent = "remove";

    // link the data attribute of the remove button to the array and card
    removeTaskBtn.dataset.linkedArray = index;
    index++;
    div.appendChild(removeTaskBtn);

    // start event listener/remove array item from array and card from parent div via data link
    removeTaskBtn.addEventListener('click', removeTaskFromLibrary);

    function removeTaskFromLibrary() {
      let getTaskToRemove = removeTaskBtn.dataset.linkedArray;
      arrayOfProjects[0].tasks.splice(parseInt(getTaskToRemove), 1);
      div.remove();
      display();
    }
  })
}