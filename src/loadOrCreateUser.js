import {saveToDisk, loadFromDisk} from './saveAndLoad.js'
import unserializeUser from "./unserialiseUser";
import User from "./user.js";
import Project from "./lists.js";
import { updateUserInfoInDom, updateProjectInfoInDom, updateTodoInfoInDom, updateTodoField} from "./controller"

export default async function loadOrCreateUser() {

    // Check if there is a user in the local storage, if not create a new user and save it to the local storage
    if (localStorage.getItem("user")) {
        let userJson = loadFromDisk("user");
        let user = unserializeUser(userJson);

        // Load User data to the Dom tree of the app
        updateUserInfoInDom(user);
        await updateProjectInfoInDom(user);

        //Select the first project
        document.querySelector(".projects_container").firstChild.classList.add("selected");

        // Update the todoForm with the first selected project Id
        let formProjectId = document.getElementsByName("projectId")[0];
        let projectIdValue = document.querySelector(".projects_container").firstChild.getAttribute("projectId")
        formProjectId.setAttribute("value", projectIdValue);

    } else {
        let user = new User("User");
        let project = new Project("Example");

        user.addProject(project);
        await updateProjectInfoInDom(user);

        document.querySelector(".projects_container").firstChild.classList.add("selected");
        saveToDisk('user', user);
    }

    updateTodoField();
}
