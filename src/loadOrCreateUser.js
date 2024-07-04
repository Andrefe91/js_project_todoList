import {saveToDisk, loadFromDisk} from './saveAndLoad.js'
import unserializeUser from "./unserialiseUser";
import User from "./user.js";
import { updateUserInfoInDom, updateProjectInfoInDom, updateTodoInfoInDom} from "./controller"

export default function loadOrCreateUser() {

    // Check if there is a user in the local storage, if not create a new user and save it to the local storage
    if (localStorage.getItem("user")) {
        let userJson = loadFromDisk("user");
        let user = unserializeUser(userJson);

        // Load User data to the Dom tree of the app
        updateUserInfoInDom(user);
        updateProjectInfoInDom(user);
        // updateTodoInfoInDom(user);
    } else {
        let user = new User("User");
        saveToDisk('user', user);
    }
}
