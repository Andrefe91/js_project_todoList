export default class List {
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
