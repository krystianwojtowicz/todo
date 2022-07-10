const form = document.querySelector("form");
const addTaskBtn = document.querySelector(".add-task");
const close = document.querySelector(".close");
const submit = document.querySelector(".submit");
// const defaultProjects = document.querySelector(".defaultProject .wrapper-grid");
const remove = document.querySelectorAll(".remove");
const select = document.getElementById('projects');
const projects = document.querySelector('.projects');


class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    // this.id = new Date().valueOf();
    this.id = id;

  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}
const arrayOfProjects = [];
// let task;
// let newArr = [];
// let project = [];
// let divWrapper;

let projectDefault = new Project('defaultProject');
arrayOfProjects.push(projectDefault);
console.log(arrayOfProjects);
let option = document.createElement('option');
option.value = arrayOfProjects[0].name;
option.textContent = arrayOfProjects[0].name;
select.options.add(new Option(`${arrayOfProjects[0].name}`, `${arrayOfProjects[0].name}`));

// const arrayOfProjects = [];

// let project = new Project('defaultProject');

close.addEventListener("click", () => {
  form.style.display = "none";
});

addTaskBtn.addEventListener("click", () => {
  form.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  submit.addEventListener("click", addProjectToProjects);
});

function addProjectToProjects(e) {
  let project = [];
  let divWrapper;
  e.preventDefault();
  let newArr = arrayOfProjects.map(project => project[Object.keys(project)[0]]);
  if (document.getElementById("project").value) {
    project = {
      name: document.getElementById("project").value,
      tasks: []
    }
  } else {
    project = {
      name: select.value,
      tasks: []
    }
  }

  if (newArr.indexOf(project.name) > -1) {
    // arrayOfProjects[newArr.indexOf(project.name)].tasks.push(task);
    divWrapper = document.querySelector(`.${arrayOfProjects[newArr.indexOf(project.name)].name} .wrapper-grid`);
  } else {
    arrayOfProjects.push(project);
    // arrayOfProjects[arrayOfProjects.length - 1].tasks.push(task);
    // console.log(arrayOfProjects);

    const div = document.createElement('div');
    div.classList.add(project.name);
    projects.appendChild(div);

    const h1 = document.createElement('h1');
    h1.textContent = `Current Tasks in ${project.name}`;
    div.appendChild(h1);

    divWrapper = document.createElement('div');
    divWrapper.classList.add('wrapper-grid');
    div.appendChild(divWrapper);

    option.value = arrayOfProjects[arrayOfProjects.length - 1].name;
    option.textContent = arrayOfProjects[arrayOfProjects.length - 1].name;
    select.options.add(new Option(`${ arrayOfProjects[arrayOfProjects.length-1].name}`, `${ arrayOfProjects[arrayOfProjects.length-1].name}`));


  }
  newArr = arrayOfProjects.map(project => project[Object.keys(project)[0]]);
  // console.log(arrayOfProjects[newArr.indexOf(project.name)]);
  addTaskToProjects(newArr, divWrapper, project);
}

function addTaskToProjects(newArr, divWrapper, project) {
  let index2=0;
  let task = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    dueDate: document.getElementById("dueDate").value,
    priority: document.getElementById("priority").value,
    complete: false,
    // id: new Date().valueOf(),
    id: index2,

  };
  index2++;
  console.log(arrayOfProjects);
  console.log(arrayOfProjects[0].tasks)
  arrayOfProjects[newArr.indexOf(project.name)].tasks.push(task);
  form.style.display = "none";
  form.reset();
  display(newArr, divWrapper, project);
}

function display(newArr, divWrapper, project) {

  document.querySelector(`.${arrayOfProjects[newArr.indexOf(project.name)].name} .wrapper-grid`).textContent = '';
  let index = 0;
  // console.log(newArr);
  // console.log(arrayOfProjects[newArr.indexOf(project.name)]);
  arrayOfProjects[newArr.indexOf(project.name)].tasks.forEach((task) => {
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
    divWrapper.appendChild(div);
    div.setAttribute("id", `${task.id}`);
    createTaskElement('h4', 'title:', `${task.title}`);
    createTaskElement('h4', 'description:', `${task.description}`);
    createTaskElement('h4', 'dueDate:', `${task.dueDate}`);

    const showPriority = document.createElement('h4');
    div.appendChild(showPriority);
    showPriority.textContent = 'priority:';

    const priorityValue = document.createElement('button');
    if (task.priority == 'high') {
      priorityValue.textContent = 'high';
    } else {
      priorityValue.textContent = 'low';
    }
    div.appendChild(priorityValue);

    priorityValue.addEventListener('click', () => {
      if (task.priority == 'high') {
        task.priority = 'low';
        priorityValue.textContent = 'low';
      } else {
        task.priority = 'high';
        priorityValue.textContent = 'high';
      }
      console.log(arrayOfProjects)
    });

    const checkbox = document.createElement("button");
    if (task.complete) {
      checkbox.textContent = 'complete';
    } else {
      checkbox.textContent = 'not complete';
    }
    div.appendChild(checkbox);

    checkbox.addEventListener('click', () => {
      if (task.complete) {
        task.complete = false;
        checkbox.textContent = 'not complete';
      } else {
        task.complete = true;
        checkbox.textContent = 'complete';
      }
    });
    // checkbox.textContent = book.read ? 'read' : 'not read';

    // create remove task btn and add class attribute for each array card
    const removeTaskBtn = document.createElement('button');
    removeTaskBtn.classList.add('remove-task-btn');
    removeTaskBtn.textContent = "remove";

    // link the data attribute of the remove button to the array and card
    removeTaskBtn.dataset.linkedArray = task.id;
    index++;
    div.appendChild(removeTaskBtn);

    // start event listener/remove array item from array and card from parent div via data link
    removeTaskBtn.addEventListener('click', removeTaskFromProjects);

    function removeTaskFromProjects(newArr, divWrapper, project) {
      let getTaskToRemove = removeTaskBtn.dataset.linkedArray;
      console.log(arrayOfProjects[0].tasks)
      // for (let i = 0; i < arrayOfProjects.length ; i++) {
      //   for (let j = 0; j < arrayOfProjects[i][1].length; j++) {
      //   if(arrayOfProjects[i][tasks].title.textContent = 'a') {
      //     console.log(2)
      //   } else {
      //     console.log(3)
      //   }
      // }
      // }
      arrayOfProjects[newArr.indexOf(project.name)].tasks.splice(parseInt(getTaskToRemove), 1);
      div.remove();
      display();
    }
  })
}