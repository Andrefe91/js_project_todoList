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
        
    }

    getProjects() {
        return this.projects;
    }

    getProjectByName(name) {
        return this.projects[name];
    }
}
