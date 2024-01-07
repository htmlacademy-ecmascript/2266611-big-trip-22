const getRandomInteger = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;

const updateItem = (items, update) => (items.map((item) => item.id === update.id ? update : item));

export {getRandomInteger, updateItem};
