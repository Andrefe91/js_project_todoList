import  {controller} from './controller';

// The main function, "addEventsToDialog" handle the task of creating the add event listeners
//for all the actions inside the form dialogs. The "getParamsValues" and is a
// utility functions to handle the information and save to disk.

function addEventsToDialog(dialogId, openButtonId, closeButtonId, formId, parameters = []) {
    let params;

    // Query Selectors
    const dialog = document.getElementById(dialogId);
    const openButton = document.getElementById(openButtonId);
    const closeButton = document.getElementById(closeButtonId);
    const form = document.getElementById(formId);

    //Assign click event listeners
    openButton.addEventListener('click', () => {
        dialog.showModal();
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        dialog.close();

        params = getParamsValues(parameters);
        if (parameters.length != 0) {
            controller(formId, params); //In a MVC, this is sending information to the controller
        }
    });
}

function getParamsValues(parameters) { //Allows getting n number of parameters from dialogs
    let params = {};

    if (parameters.length == 0)  {
        return;
    }


    for (let index in parameters) {
        params[parameters[index]] = document.getElementById(parameters[index]).value;
    }
    return params;

}

export {addEventsToDialog}
