let todoTab;
let usersTab;
let aboutTab;

let todoDiv;
let usersDiv;
let aboutDiv;

let hamburger;

function getContextOfTabs () {
    todoTab = document.getElementById('todo-tab');
    usersTab = document.getElementById('users-tab');
    aboutTab = document.getElementById('about-tab');

    todoDiv = document.getElementById('todo-div');
    usersDiv = document.getElementById('users-div');
    aboutDiv = document.getElementById('about-div');

    hamburger = document.getElementById('hamburger');
}

function addListenersForTabs () {
    todoTab.addEventListener('click', () => {
        heading.innerText = "TODO LIST";

        todoDiv.style.display = "block";
        usersDiv.style.display = "none";
        aboutDiv.style.display = "none";
    });

    usersTab.addEventListener('click', () => {
        heading.innerText = "USERS";

        todoDiv.style.display = "none";
        usersDiv.style.display = "block";
        aboutDiv.style.display = "none";
    });

    aboutTab.addEventListener('click', () => {
        heading.innerText = "ABOUT";

        todoDiv.style.display = "none";
        usersDiv.style.display = "none";
        aboutDiv.style.display = "block";
    });

    hamburger.addEventListener('click', () => {
        if (document.getElementById('MenuBar').style.display === 'none')
            document.getElementById('MenuBar').style.display = 'block';
        else {
            document.getElementById('MenuBar').style.display = 'none';
        }
    });
}
