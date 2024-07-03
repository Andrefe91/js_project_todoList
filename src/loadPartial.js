export default function loadPartial(partialName) {
    const newDiv = document.createElement('div');
    fetch(`/src/${partialName}.html`).then(function (response) {
        if (response.ok) {
            return response.text();
        }
        throw response;
    }).then(function (text) {
        newDiv.innerHTML = text;
        return newDiv;
    });
}
