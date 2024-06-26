import './style.css';
import Todo from './todo.js';
import Project from './lists.js';
import User from './user.js';


if (process.env.NODE_ENV !== 'production') {
    console.log("We appear to be running in a development environment");
}

// Example of use
let user = new User("Jeff");

let project = new Project("Groceries List");
user.addProject(project);

let todo = new Todo('Buy Cookies', Date(), 2, 'Buy 100 cookies');
let todo2 = new Todo('Buy Milk', Date(), 3, 'Buy 2 galons of milk');
let todo3 = new Todo('Buy Eggs', Date(), 4, 'Buy 10 eggs');

project.addTodo(todo, todo2, todo3);

let project2 = new Project("Office List");

let officetodo1 = new Todo("Finish Project", Date(), 5, "Complete the calculations");
let officetodo2 = new Todo("Buy Supplies", Date(), 2, "Buy Paper and Calculator");
let officetodo3 = new Todo("Clean Desktop", Date(), 1, "Bring wet wipes to clean desktop");


project2.addTodo(officetodo1, officetodo2, officetodo3);
user.addProject(project2);

// console.log(user.getProjects()[0].getTodos());

// End of example
