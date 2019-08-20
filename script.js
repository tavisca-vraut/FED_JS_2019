let guid;
let noTaskMessage;

let addTask;
let availableTasks;

let heading;

window.onload = () => {
    guid = new GUID();
    addTask = document.getElementById('add-new-item');
    noTaskMessage = document.getElementById('no-remaining-task');
    heading = document.getElementById('heading');

    getContextOfTabs();
    addListenersForTabs();

    addTask.addEventListener('click', () => {
        let searchbar = document.getElementById('searchbar');
        addNewTask(searchbar.value);
        searchbar.value = "";
    });

    availableTasks = [];
};

function inputTriggersSearch() {
    let value = document.getElementById('searchbar').value;
    buildList(value);
}

function addNewTask(item) {
    if (item === "") return;

    let li = document.createElement('li');

    let id = guid.getId();
    li.innerHTML = '<span>' + item + '</span> <button class="remove" onclick="removeTask('+ id +')"><i class="fas fa-trash-alt"></i></button>';

    availableTasks.push([id, li]);

    buildList("");
}

function removeTask(id) {
    let tempList = [];

    for (var task of availableTasks)
    {
        if (task[0] === id) continue;
        tempList.push(task);
    }

    guid.availableFreeIds.push(id);
    availableTasks = tempList;
    buildList("");
}

function buildList(value=undefined) {

    let temp = document.createElement('div');

    if (value !== undefined || value !== "") {
        for (var task of availableTasks)
            if (task[1].innerText.startsWith(value))
                temp.appendChild(task[1]);
    } else {
        for (var task of availableTasks)
            temp.appendChild(task[1]);
    }

    document.getElementById('list').innerHTML = temp.innerHTML;

    if (availableTasks.length !== 0) {
        noTaskMessage.style.display = 'none';
    } else {
        noTaskMessage.style.display = 'block';
    }
}
