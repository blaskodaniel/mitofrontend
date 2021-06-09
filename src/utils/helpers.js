export const getLocalStorage = () => {
  try {
    const storagename = process.env.REACT_APP_LOCSTORENAME;
    const jsonstring = localStorage.getItem(storagename);
    const json = JSON.parse(jsonstring);
    return json;
  } catch (e) {
    return null;
  }
};

export const setLocalStorage = (value) => {
  const storagename = process.env.REACT_APP_LOCSTORENAME;
  localStorage.setItem(storagename, JSON.stringify(value));
};
