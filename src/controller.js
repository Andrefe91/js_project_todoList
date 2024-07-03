import validate from './validate.js'
import {saveToDisk, loadFromDisk, deleteFromDisk} from './saveAndLoad.js'
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

    switch (formId) {
        case 'userForm':
            updateUserObject(user);
            break;
        case 'projectForm':
            updateProjectObject(user);
            break;
        case 'todoForm':
            updateTodoObject(user);
            break;
    }

    // Update the user json in local storage
    saveToDisk("user", user);

    // Delete from the local storage
    deleteFromDisk(formId);
}

function updateUserObject(user) {
    let object = loadFromDisk('userForm');
    user.name = object['userName'];

    document.getElementById('userNameText').innerHTML = user.name;
    callChange("Updated User Name");
}


function updateProjectObject(user) {
    //Todo: Let every method call the User object unserializer ?

    // Read from disk
    let projectObject = loadFromDisk('projectForm');
    let projectName = projectObject['projectName'];

    //Create project object and add to User
    let project = new Project(projectName);
    user.addProject(project);

    callChange(`${projectName} project created`);
}


function updateTodoObject(user) {
    
}

function callChange(callText) {
    console.log(callText);
}

export { controller, callChange}
