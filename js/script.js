let availableTasks;
let idManager;

window.onload = () => {
    document.querySelector("nav.side-nav").classList.add('displayToggler');

    initializeVariables();

    display("");

    generateDummyTodo();
}

function initializeVariables() {
    availableTasks = [];
    idManager = new IdManager();
}

function displayAllTasks() {
    let list = document.querySelector('div#task-list ul');
    list.innerHTML = "";

    for (let task of availableTasks) {
        list.innerHTML += '<li>' + task.task + '<button class="edit-button">Edit</button> <button class="remove-button"><i class="fas fa-trash-alt"></i></button></li>';
    }
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

        displayAllTasks();
    };

}
