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

function updateProjectInfoInDom(user) {
    let projectContainer = document.querySelector('.projects_container');
    clearDiv(projectContainer);


    for (let projectKey in user.projects) {

        // This is required as fetching HTML content from an external source (like a file)
        // is inherently an asynchronous operation. This mean the content is not inmediately available
        // when the fetch call is made, and we need to wait for the content to be fetched and processed before
        // we can perform any operation on it.
        loadPartial('projectPartial').then(projectDiv => {
            console.log(user.projects[projectKey].title);
            let projectNameText = projectDiv.querySelector("#projectNameText");
            projectNameText.textContent = user.projects[projectKey].title

            projectContainer.appendChild(projectDiv);
        }).catch(error => {
            console.error('Error loading the partial: ', error);
        });
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

