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
  if (arrayOfProjects.length == 0) {
    let projectDefault = new Project("defaultProject");
    arrayOfProjects.push(projectDefault);
    console.log(arrayOfProjects);
    console.log(JSON.parse(localStorage.getItem("arrayOfProjects")));
    addOption();
  } else {
    // newArr = arrayOfProjects.map((project) => project[Object.keys(project)[0]]);
    // newArr.foreach;

  }
  console.log(arrayOfProjects);
})();

function addOption() {
  let option = document.createElement("option");
  option.value = arrayOfProjects[0].name;
  option.textContent = arrayOfProjects[0].name;
  select.options.add(
    new Option(`${arrayOfProjects[0].name}`, `${arrayOfProjects[0].name}`)
  );
  console.log(arrayOfProjects);
}

function addProjectToProjects(e) {
    e.preventDefault();
    let project = [];
    project = {
        name: select.value,
        tasks: [],
      };
      arrayOfProjects.push(project);
      console.log(arrayOfProjects)
      form.style.display = "none";
      form.reset();
      const myObj = JSON.stringify(arrayOfProjects);
      localStorage.setItem('array', myObj);
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
