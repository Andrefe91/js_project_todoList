function saveToDisk(item, object) {
    localStorage.setItem(item, JSON.stringify(object));
}

function loadFromDisk(item) {
    return JSON.parse(localStorage.getItem(item));
}

export {saveToDisk, loadFromDisk}
