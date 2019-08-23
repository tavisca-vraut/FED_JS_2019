function sideNavToggleDisplay() {
    document.querySelector("nav.side-nav").classList.toggle('displayToggler');
}

function hideAutoPopulate() {
    document.querySelector('div#auto-fill-list').style.display = 'none';
}

function displayTab(item) {
    for (let div of document.querySelectorAll("div#content > div")){
        div.style.display = "none";
    };

    if (document.getElementById(item + '-Div'))
        document.getElementById(item + '-Div').style.display = "block";
}

function addTask() {
    document.querySelector('div#auto-fill-list').style.display = 'none';

    let task = document.getElementById('searchbar');
    if (task.value === "") {
        document.getElementById('task-not-added-message').style.display = "block";
        setTimeout(() => document.getElementById('task-not-added-message').style.display = "none", alertDisplayTime);
        return;
    }

    availableTasks.push({id: idManager.getId(), "task": task.value});

    task.value = "";

    paginator = new Pagination(availableTasks, numberOfTasksPerTab);
    displayBuffer = paginator.getFirst();

    document.getElementById('task-added-message').style.display = "block";
    setTimeout(() => document.getElementById('task-added-message').style.display = "none", alertDisplayTime);

    displayAllTasks();
}

function filterTasks() {
    hideAutoPopulate();

    let matchedTasks = availableTasks.filter(task => task.task.toLowerCase().startsWith(document.getElementById('searchbar').value.toLowerCase()));
    document.getElementById('searchbar').value = "";

    paginator = new Pagination(matchedTasks, numberOfTasksPerTab);
    displayBuffer = paginator.getFirst();

    displayAllTasks();
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

    idManager.addFreeId(guid);

    paginator = new Pagination(availableTasks, numberOfTasksPerTab);
    displayBuffer = paginator.getFirst();

    document.getElementById('task-removed-message').style.display = "block";
    setTimeout(() => document.getElementById('task-removed-message').style.display = "none", alertDisplayTime);

    displayAllTasks();
}

function editTask(element) {
    let parent = element.parentNode;

    let editableElement = parent.children[1];

    editableElement.contentEditable = "true";

    element.innerHTML = "Save";
    element.setAttribute('onclick', 'saveTask(this)')
}

function saveTask(element) {
    let parent = element.parentNode;

    let taskId = parent.children[1].id;
    let newTaskValue = parent.children[1].innerText;

    if (newTaskValue === "") {
        document.getElementById('task-not-added-message').style.display = "block";
        setTimeout(() => document.getElementById('task-not-added-message').style.display = "none", alertDisplayTime);
        parent.children[1].innerText = "*Please enter something*";
        return;
    }

    availableTasks.forEach(item => {
        if (item.id == taskId) {
            item.task = newTaskValue;

            document.getElementById('task-modified').style.display = "block";
            setTimeout(() => document.getElementById('task-modified').style.display = "none", alertDisplayTime);
        }
    });

    displayAllTasks();
}

function nextFrame() {
    let next = paginator.getNext();

    if (next === false) return;

    displayBuffer = next;
    displayAllTasks();
}

function previousFrame() {
    let prev = paginator.getPrevious();

    if (prev === false) return;

    displayBuffer = prev;
    displayAllTasks();
}

function handleFirstOrLastPage() {
    document.getElementById('previous').disabled = paginator.currentPage === paginator.startPage;
    document.getElementById('next').disabled = paginator.currentPage === paginator.endPage;
}
