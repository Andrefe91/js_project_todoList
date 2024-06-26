// Todo - User Class
export default class User {
    constructor(name) {
        this._name = name;
        this.projects = {};
    }

    // Getters
    get name() {
        return this._name;
    }

    // Setters
    set name(newName) {
        this._name = newName;
    }

    // Methods
    addProject(project) {
        this.projects[Object.keys(this.projects).length] = project;
    }

    deleteProject(projectID) {
        delete this.projects[projectID];
    }

    getProjects() {
        let array = [];

        for (let project in this.projects) {
            array.push(this.projects[project]);
        }
        return array;
    }

    getProjectByName(name) {
        for (let project in this.projects) {
            if (this.projects[project].title === name) {
                return this.projects[project];
            }
        }
    }
}
