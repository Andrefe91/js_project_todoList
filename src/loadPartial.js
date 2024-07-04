export default async function loadPartial(partialName) {
    const newDiv = document.createElement('div');
    try {
        const response = await fetch(`/src/${partialName}.html`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const text = await response.text();
        newDiv.innerHTML = text;
        return newDiv;
    } catch (error) {
        console.error('Error loading partial:', error);
        throw error;
    }
}
