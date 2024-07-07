import './style.css';
import { format } from 'date-fns';
import {addEventsToDialog} from './formHandler.js'
import loadOrCreateUser from './loadOrCreateUser.js';

if (process.env.NODE_ENV !== 'production') {
    console.log("We appear to be running in a development environment");
}

// Load or create a user for the Application
loadOrCreateUser();

// Query Selectors
let date = document.getElementById('date');

// Assignements to variables
date.innerHTML = format(Date(), "EEEE - MMMM d, yyyy"); // Part of the UI

// Assign Click Event Listeners


// Function Calls
    //Manage Dialogs -> This section manage the creation of the events for the dialogs in the page

addEventsToDialog("userDialog", "editUserButton", "closeUserDialog", "userForm", ["userName"]);
addEventsToDialog("projectDialog", "addProjectButton", "closeProjectDialog", "projectForm", ["projectName"]);
addEventsToDialog("todoDialog", "addTodoButton", "closeTodoDialog", "todoForm", ["projectId", "todoTitle", "todoDueDate", "todoImportance", "todoDescription"]);
addEventsToDialog("deleteDialogProject", "deleteProjectButton", "closeProjectDeleteDialog", "deleteProjectForm", ["projectDeleteId"]);


