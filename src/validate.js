import { callChange } from "./controller";

export default function validate(formId, params) {
    //This function just check that all the required parameters for the form are in the Params object
    let required = {
        "userForm" : ["userName"],
        "projectForm" : ["projectName"],
        "todoForm" : ["todoTitle","todoDueDate", "todoImportance"],
        "deleteToDo" : ["todoKey", "projectId"],
        "deleteProjectForm" : ["projectDeleteId"],
    };

    let keysRequired = required[formId];
    let keysParams = Object.keys(params);

    for (let index in keysRequired) {
        if (!keysParams.includes(keysRequired[index]) || params[keysRequired[index]].length == 0) {
            callChange(`${keysRequired[index]} cant be empty`);
            return false;
        }
    }
    return true;
}

