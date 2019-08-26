let availableTasks;
let displayBuffer;
let paginator;
let idManager;

let numberOfTasksPerTab = 8;
let alertDisplayTime = 3000; // 3 seconds

window.onload = () => {
    document.querySelector("nav.side-nav").classList.add('displayToggler');

    availableTasks = [];
    displayBuffer = [];
    idManager = new IdManager();

    displayTab("");

    generateDummyTodo();
}

function displayAllTasks() {
    let list = document.querySelector('div#task-list ul');
    list.innerHTML = "";

    for (let task of displayBuffer) {
        list.appendChild(constructLi(task));
    }
    handleFirstOrLastPage();
}

function generateDummyTodo() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos");
    xhttp.send();

    xhttp.onload = () => {
        let dummyTasks = JSON.parse(xhttp.response);

        for (var task of dummyTasks) {
            availableTasks.push({id: idManager.getId(), "task": task.title});
        }

        paginator = new Pagination(availableTasks, numberOfTasksPerTab);
        displayBuffer = paginator.getFirst();

        displayAllTasks();
    };
}

function constructLi(task) {
    const li = document.createElement('li');

    const guid = document.createElement('guid');
    guid.innerText = task.id;
    li.appendChild(guid);

    const taskName = document.createElement('taskName');
    taskName.id = task.id;
    taskName.contentEditable = false;
    taskName.innerText = task.task;
    li.appendChild(taskName);

    const editButton = document.createElement('button');
    editButton.setAttribute('onclick', 'editTask(this)');
    editButton.classList.add('edit-button');
    editButton.innerText = "Edit"
    li.appendChild(editButton);

    const removeTaskButton = document.createElement('button');
    removeTaskButton.setAttribute('onclick', 'removeTask(this)');
    removeTaskButton.classList.add('remove-button');

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas');
    deleteIcon.classList.add('fa-trash-alt');
    removeTaskButton.appendChild(deleteIcon);

    li.appendChild(removeTaskButton);

    return li;
}
