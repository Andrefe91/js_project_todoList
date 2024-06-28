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
        console.log(`Form id: ${formId}`);

        params = getParamsValues(parameters);

        if (parameters.length != 0) {
            saveParamsToDisk(formId, params);
            console.log(params);
        }
    });
}

function saveParamsToDisk(formId, params) {
    localStorage.setItem(formId, JSON.stringify(params));
}

function getParamsValues(parameters) {
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
