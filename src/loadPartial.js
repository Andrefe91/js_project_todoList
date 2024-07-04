export default function loadPartial(partialName) {
    const newDiv = document.createElement('div');
    return fetch(`/src/${partialName}.html`).then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok.');
    }).then(text => {
        newDiv.innerHTML = text;
        return newDiv;
    });
}
