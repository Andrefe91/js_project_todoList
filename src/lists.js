class List {
    constructor () {
        this._items = [];
    }

    addTodo(...items) {
        for (let item of items) {
            this._items.push(item);
        }
    }

    removeTodo(item) {
        this._items.splice(this._items.indexOf(item), 1);
    }

    totalTodos() {
        return this._items.length;
    }

    getTodos() {
        return this._items;
    }
}


export default class Project extends List {
    constructor(title) {
        super();
        this._title = title;
    }

    // Getters
    get title() {
        return this._title;
    }

    // Setters
    set title(newTitle) {
        this._title = newTitle;
    }
}
