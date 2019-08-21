function sideNavToggleDisplay() {
    document.querySelector("nav.side-nav").classList.toggle('displayToggler');
}

function display(item) {
    for (let div of document.querySelectorAll("div#content > div")){
        div.style.display = "none";
    };

    if (document.getElementById(item + '-Div'))
        document.getElementById(item + '-Div').style.display = "block";
}

function addTask() {
    document.querySelector('div#auto-fill-list').style.display = 'none';

    let task = document.getElementById('searchbar');
    if (task.value === "") return;

    availableTasks.push({id: idManager.getId(), "task": task.value});

    task.value = "";

    displayAllTasks();
}

function filterTasks() {
    document.querySelector('div#auto-fill-list').style.display = 'none';

    let list = document.querySelector('div#task-list ul');
    list.innerHTML = "";

    for (let task of availableTasks) {
        if (task.task.startsWith(document.getElementById('searchbar').value))
            list.innerHTML += `<li><guid>${task.id}</guid><taskName>${task.task}</taskName><button class="edit-button">Edit</button> <button onclick="removeTask(this)" class="remove-button"><i class="fas fa-trash-alt"></i></button></li>`;
    }
}

function autoPopulate(element) {
    let matchedTasks = availableTasks.filter(task => task.task.startsWith(element.value));

    let list = document.querySelector('div#auto-fill-list ul');
    list.innerHTML = "";

    for (let task of matchedTasks) {
        list.innerHTML += '<li onclick="fillSearchBar(this)">' + task.task + '</li>';
    }

    document.querySelector('div#auto-fill-list').style.display = "block";
}

function fillSearchBar(element) {
    document.querySelector('div#auto-fill-list').style.display = 'none';
    document.getElementById('searchbar').value = element.innerText;
}

function removeTask(element){
    // [guid, taskName, button.edit, button.remove]
    let children = element.parentNode.children;
    let guid = parseInt(children[0].innerText);

    availableTasks = availableTasks.filter(task => task.id != guid);
    displayAllTasks();
}
