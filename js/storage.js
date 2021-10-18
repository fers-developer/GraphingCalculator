const setItem = (name, content) => sessionStorage.setItem(name, JSON.stringify(content));

const getItem = name => JSON.parse(sessionStorage.getItem(name));

const removeItem = name => sessionStorage.removeItem(name);

const clear = () => sessionStorage.clear();

const exists = name => sessionStorage.hasOwnProperty(name);