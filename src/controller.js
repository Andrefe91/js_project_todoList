import validate from './validate.js'
import {saveToDisk, loadFromDisk} from './saveAndLoad.js'
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
    let userString = loadFromDisk('user');
    let user = unserializeUser(userString); // Create the User object

    switch (formId) {
        case 'userForm':
            updateUser(user);
            break;
        case 'projectForm':
            updateProject(user);
            break;
        case 'todoForm':
            updateTodo(user);
            break;
    }

    // Update the user json in local storage
    saveToDisk("user", user);

    // Delete from the local storage
    deleteFromDisk(formId);
}


function deleteFromDisk(formId) {
    // Simulates deleting from server
    localStorage.removeItem(formId);
}

function updateUser(user) {
    let object = loadFromDisk('userForm');
    user.name = object['userName'];

    document.getElementById('userNameText').innerHTML = user.name;
    callChange("Updated User Name");
}


function updateProject(user) {
 //Todo: Let every method call the User object unserializer ?
}


function updateTodo(user) {

}

function callChange(callText) {
    console.log(callText);
}

export { controller, callChange}
