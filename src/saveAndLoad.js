function saveToDisk(item, object) {
    localStorage.setItem(item, JSON.stringify(object));
}

function loadFromDisk(item) {
    return JSON.parse(localStorage.getItem(item));
}

function deleteFromDisk(formId) {
    // Simulates deleting from server
    localStorage.removeItem(formId);
}

export {saveToDisk, loadFromDisk, deleteFromDisk}


