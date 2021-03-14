export const getAndSetIfNotNull = (key, setter) => {
  let item = localStorage.getItem(key);
  if (item !== null) {
    setter(item);
  }
};
