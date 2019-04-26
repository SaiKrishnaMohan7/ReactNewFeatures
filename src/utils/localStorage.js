const getObject = key => {
  const savedJson = localStorage.getItem(key);

  if (savedJson) {
    try {
      const resultObject = JSON.parse(savedJson);
      return resultObject;
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }

  return null;
};

const setObject = (key, objectToStore) => {
  localStorage.setItem(key, JSON.stringify(objectToStore));
};

export { getObject, setObject };