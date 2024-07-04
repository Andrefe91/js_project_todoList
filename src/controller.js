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

function updateUserDom(formId, user){
    switch (formId) {
        case "userForm":
            updateUserInfoInDom(user);
            break;
        case "projectForm":
            updateProjectInfoInDom(user);
            break;
        case "todoForm":
            updateTodoInfoInDom(user);
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

    for (let projectKey in user.projects) {
        try {
            // Create a new div to hold the project partial and its content
            const projectDiv = document.createElement('div');
            projectDiv.innerHTML = blueprintDiv.innerHTML

            // Get the project information from the user and assign to the HTML element
            let projectNameText = projectDiv.querySelector("#projectNameText");
            projectNameText.textContent = user.projects[projectKey].title // Append the title of the project

            let buttonProject = projectDiv.querySelector("button");
            buttonProject.setAttribute("projectId", projectKey); //Append the projectId to crossreference

            // Append only what's inside the <div> container of the partial
            projectContainer.appendChild(projectDiv.firstChild);
        } catch (error) {
            console.error('Error during load and process: ', error);
        }
    }
    callChange("Updated Project's Information");
}

function updateTodoInfoInDom(user) {
    callChange("Updated To-do's Information");
}



function callChange(callText) {
    console.log(callText);
}

function clearDiv(div) {
    div.textContent = '';
}

export { controller, callChange}

