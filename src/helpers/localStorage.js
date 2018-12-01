export function getLocalStorageItems() {
  return Object.keys(localStorage).reduce((obj, key) => {
    let item = localStorage.getItem(key);
    obj[key] = JSON.parse(item);

    return obj;
  }, {});
}

export function setLocalStorageItems(items) {
  for (const key of Object.keys(items)) {
    let strJSON = JSON.stringify(items[key]);
    localStorage.setItem(key, strJSON);
  }
}
