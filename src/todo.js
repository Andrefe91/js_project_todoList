import { format, addDays } from 'date-fns';

export default class Todo {
    constructor(title, date, importance = 0, description = '') {
        this._title = title;
        this._date = format(addDays(new Date(date),1), "yyyy-MM-dd"); //No idea, the format function was substracting a day
        this._importance = importance;
        this._description = description;
        this.state = 0;
    }

    // Methods
    flip_state() {
        this.state = this.state === 0? 1 : 0;
    }

    // Getters
    get title() {
        return this._title;
    }

    get date() {
        return this._date;
    }

    get importance() {
        return this._importance;
    }

    get description() {
        return this._description;
    }

    set title(newTitle) {
        newTitle = newTitle.trim();
        if (newTitle.length > 0) {
            this._title = newTitle;
        } else {
            throw new Error('Title cannot be empty');
        }
    }

    // Setters
    set date(newDate) {
        // To do
    }

    set importance(newImportance) {
        if (newImportance < 6 && newImportance > 0) {
            this._importance = newImportance;
        } else {
            throw new Error('Invalid value for importance');
        }
    }

    set description(newDescription) {
        this._description = newDescription.trim();
    }
}


