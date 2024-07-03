import validate from './validate.js'
import {saveToDisk, loadFromDisk} from './saveAndLoad.js'

export default function controller(formId, params) {
    saveToDisk(formId, params); //Simulates sending to server
    validate(formId, params); //Validate the form data
}

