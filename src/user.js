// Todo - User Class
export default class User {
    constructor(name) {
        this._name = name;
        this.projects = {};
        this.projectsNumber = 0;
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
        this.projects[this.projectsNumber] = project;
        this.projectsNumber++;
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

    getProjectById(id) {
        return this.projects[id];
    }
}
