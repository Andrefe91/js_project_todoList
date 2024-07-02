import validate from './validate.js'

export default function controller(formId, params) {
    saveToDisk(formId, params); //Simulates sending to server
    validate(formId, params); //Validate the form data
}

function saveToDisk(item, object) {
    localStorage.setItem(item, JSON.stringify(object));
}

function loadFromDisk(item) {
    return JSON.parse(localStorage.getItem(item));
}
