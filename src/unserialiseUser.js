import Todo from './todo.js';
import Project from './lists.js';
import User from './user.js';

export default function unserializeUser(object) {
    let user = new User()

    user.name = object["_name"];

    for (let key in object["projects"]) {
        //The Project Container
        let project = new Project(object["projects"][key]["_title"])

        //Populate the to-do's
        object["projects"][key]["_items"].forEach(element => {
            let title = element["_title"];
            let date = element["_date"];
            let importance = element["_importance"];
            let description = element["_description"];

            //The User Container
            let todo = new Todo(title, date, importance, description)
            todo.state = element["state"]; //State doesnt get constructed, rather assigned.

            project.addTodo(todo);
        });

        user.addProject(project);
    }
    return user;
}
