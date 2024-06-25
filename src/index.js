import './style.css';
import Todo from './todo.js';
import List from './lists.js';
import User from './user.js';
import { format, compareAsc } from 'date-fns';

if (process.env.NODE_ENV !== 'production') {
    console.log("We appear to be running in a development environment");
}

let todo = new Todo('Buy Cookies', Date(), 2, 'Buy 100 cookies');

let list = new List();
list.add(todo);

console.log(list);
console.log(list.getList());

