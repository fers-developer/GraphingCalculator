// Function to add a SessionStorage item
const setItem = (name, content) => sessionStorage.setItem(name, JSON.stringify(content));

// Function to get a SessionStorage item
const getItem = name => JSON.parse(sessionStorage.getItem(name));

// Function to delete a SessionStorage item
const removeItem = name => sessionStorage.removeItem(name);

// Function to clear the SessionStorage
const clear = () => sessionStorage.clear();

// Function to validate a SessionStorage item
const exists = name => sessionStorage.hasOwnProperty(name);