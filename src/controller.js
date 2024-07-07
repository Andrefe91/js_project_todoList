import validate from './validate.js'
import {saveToDisk, loadFromDisk, deleteFromDisk} from './saveAndLoad.js'
import loadPartial from './loadPartial.js';
import Todo from './todo.js';
import Project from './lists.js';
import unserializeUser from './unserialiseUser.js';

function controller(formId, params) {
    // Validate the form data and execute update actions
    if (validate(formId, params)) {
        saveToDisk(formId, params); // Simulates sending to server
        updateUserAndDom(formId);
    }
}


function updateUserAndDom(formId) {
    let userString = loadFromDisk('user'); // Read from disk
    let user = unserializeUser(userString); // Create the User object

    // Update the User object
    updateUserObject(formId, user);
    updateUserDom(formId, user);
    // Update the user json in local storage
    saveToDisk("user", user);

    // Delete from the local storage the form information to avoid repetition
    deleteFromDisk(formId);
}

function updateUserObject(formId, user) {
    switch (formId) {
        case "userForm":
            editInfoInUser(user);
            break;
        case "projectForm":
            addProjectInUser(user);
            break;
        case "todoForm":
            addTodoInUser(user);
            break;
    }
}

async function updateUserDom(formId, user){
    switch (formId) {
        case "userForm":
            updateUserInfoInDom(user);
            break;
        case "projectForm":
            await updateProjectInfoInDom(user);

            // Select the recently created project
            document.querySelector(".projects_container").lastElementChild.classList.add("selected");
            updateTodoField();
            break;
        case "todoForm":
            updateTodoField();
            break;
    }
}

// User Object Manipulation

function editInfoInUser(user) {
    let object = loadFromDisk('userForm');
    user.name = object['userName'];
}

function addProjectInUser(user) {
    // Read from disk
    let projectObject = loadFromDisk('projectForm');
    let projectName = projectObject['projectName'];

    //Create project object and add to User
    let project = new Project(projectName);
    user.addProject(project);

    console.log(`${projectName} project created`);
}

function addTodoInUser(user) {
    //Read from disk
    let todoObject = loadFromDisk('todoForm');

    // Load the parameters into variables
    let projectId = todoObject['projectId'];
    let todoTitle = todoObject['todoTitle'];
    let todoDueDate = todoObject['todoDueDate'];
    let todoImportance = todoObject['todoImportance'];
    let todoDescription = todoObject['todoDescription'];

    // Create todo object and add to User
    let todo = new Todo(todoTitle, new Date(todoDueDate), todoImportance, todoDescription);

    // Find the project by its id
    let project = user.getProjectById(projectId);

    // Add to-do to project object
    project.addTodo(todo);

    // Update the user json in local storage
    saveToDisk("user", user);

    console.log(`${todoTitle} todo created`);
}

//Dom Manipulation

function updateUserInfoInDom(user) {
    document.getElementById('userNameText').innerHTML = user.name;
    callChange("Updated User Name");
}

async function updateProjectInfoInDom(user) {
    let projectContainer = document.querySelector('.projects_container');
    clearDiv(projectContainer);

    // Load the partial
    const blueprintDiv = await loadPartial('projectPartial');

    // Iterate over each project in the user and load its partial into the DOM
    for (let projectKey in user.projects) {
        try {
            // Create a new div to hold the project partial and its content
            const projectDiv = document.createElement('div');
            projectDiv.innerHTML = blueprintDiv.innerHTML

            // Get the project information from the user and assign to the HTML element
            let projectNameText = projectDiv.querySelector("#projectNameText");
            projectNameText.textContent = user.projects[projectKey].title // Append the title of the project

            let buttonProject = projectDiv.querySelector("button");
            buttonProject.setAttribute("projectid", projectKey); //Append the projectId to crossreference

            // Add event listener to the button
            buttonProject.addEventListener('click', selectProyect);


            // Append only what's inside the <div> container of the partial
            projectContainer.appendChild(projectDiv.firstChild);

            // Append only what's inside the <div> container of the partial
            projectContainer.appendChild(projectDiv.firstChild);
        } catch (error) {
            console.error('Error during load and process: ', error);
        }
    }
    callChange("Updated Project's Information");
}

function updateTodoField() {
    let user = returnUser(); // Create the User object

    let selectedProjectId = document.querySelector(".project.selected").getAttribute("projectid"); // Get the project Id
    let project = user.getProjectById(selectedProjectId); // Get the project from the User object

    //Query Selector
    let projectTitle = document.getElementById("projectTitle");

    //Assign Project Title from Project Object Information
    projectTitle.innerHTML = project.title;

    updateTodoList();
}

async function updateTodoList() {
    let user = returnUser(); // Create the User object

    let selectedProjectId = document.querySelector(".project.selected").getAttribute("projectid"); // Get the project Id
    let project = user.getProjectById(selectedProjectId); // Get the project from the User object

    //Query Selector and clear the container
    let todoListDiv = document.getElementById("todoList");
    clearDiv(todoListDiv);

    // Obtain the todoList
    let todoList = project.getTodos();

    // Iterate over each to-do in the project and load its information into the DOM

        // Load the partial
    const blueprintDiv = await loadPartial('todoPartial');

    for (let todoKey in todoList) {
        try {

            // Create a new div to hold the todo partial and its content
            const todoDiv = document.createElement('div');
            todoDiv.innerHTML = blueprintDiv.innerHTML

            // Get the todo information from the Proyect Object and assign to the HTML element
            let todo = todoList[todoKey]
            let todoInformation = {
                todoTitle : todo.title,
                todoDueDate : todo.date,
                todoImportance : todo.importance,
                todoDescription : todo.description,
            }
            // Assign each property to the HTML elements
            for (let property in todoInformation) {
                let todoElement = todoDiv.querySelector(`#${property}Text`);
                todoElement.textContent = todoInformation[property]; // Append the value of the property to the HTML element
            }

            // Check if To-Do is done and assign "done" class if so
            if (todo.state == 1) {
                todoDiv.firstChild.classList.add("done");
            }

            //Functionality assignments
            let todoDoneButton = todoDiv.querySelector('#doneTodoButton')
            todoDoneButton.setAttribute('todokey', todoKey);

            let deleteTodoButton = todoDiv.querySelector('#deleteTodoButton')
            deleteTodoButton.setAttribute('todokey', todoKey);

            // Even Listeners
                //To toggle the "Done" status of a To-Do
            todoDoneButton.addEventListener('click', (event) => {
                let selectedTodoKey = event.target.getAttribute('todokey');
                let selectedProjectId = document.querySelector(".project.selected").getAttribute('projectid');

                toggleDone(selectedTodoKey, selectedProjectId); //Change State of the To-Do on User File
                document.querySelectorAll(".to-do")[selectedTodoKey].classList.toggle("done"); // Update Class in Dom for project
            });

            //Secundary assignments
            todoDiv.firstChild.classList.add(`${todoInformation["todoImportance"]}`);

            //End of assignment, appending the Todo Partial to the Dom tree
            todoListDiv.appendChild(todoDiv.firstChild);
        } catch (error) {
            console.error('Error during load and process: ', error);
        }
    }
}

function returnUser() {
    let userString = loadFromDisk('user'); // Read from disk
    let user = unserializeUser(userString); // Create the User object
    return user;
}

function toggleDone(todoKey, projectId) {
    let user = returnUser(); // Create the User object
    let todo = user.getProjectById(projectId).getTodos()[todoKey]; //Get the todo object

    todo.toggleState();
    callChange(`Todo: ${todo.title} Status Updated`);
    saveToDisk("user", user);
}

function callChange(callText) {
    console.log(callText);
}

function clearDiv(div) {
    div.textContent = '';
}

// Event handlers

function selectProyect(event) {
    removeSelectedProyect(); //To deselect any active proyect from the list
    let selectedProyect = event.target;
    selectedProyect.classList.add('selected');

    // Get the project id from the button and assign it to the form
    let projectIdValue = selectedProyect.getAttribute("projectid");
    let formProjectId = document.getElementsByName("projectId")[0];

    formProjectId.setAttribute("value", projectIdValue);
    updateTodoField()
}



function removeSelectedProyect() {
    let selectedProject = document.querySelector(".project.selected");

    if (selectedProject) {
        selectedProject.classList.remove('selected');
    }
}

export { controller, updateUserInfoInDom, updateProjectInfoInDom, updateTodoField, callChange}

