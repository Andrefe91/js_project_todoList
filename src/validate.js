export default function validate(formId, params) {
    //This function just check that all the required parameters for the form are in the Params object
    let required = {
        "userForm" : ["userName"],
        "projectForm" : ["projectName"],
        "todoForm" : ["todoName", "todoDescription"]
    };

    let keysRequired = required[formId];
    let keysParams = Object.keys(params);

    for (let index in keysRequired) {
        if (!keysParams.includes(keysRequired[index])) {
            return false;
        }
    }
    return true;
}

