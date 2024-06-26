class List {
    constructor () {
        this._items = [];
    }

    add(item) {
        this._items.push(item);
    }

    remove(item) {
        // Todo
        // this._items.splice(this._items.indexOf(item), 1);
    }

    length() {
        return this._items.length;
    }

    getList() {
        return this._items;
    }
}


class Project extends List {
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

export {List, Project};
