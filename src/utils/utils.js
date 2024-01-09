const getRandomInteger = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;

const updateItem = (items, update) => (items.map((item) => item.id === update.id ? update : item));

const upFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

const sortByValue = (value) => (a, b) => b[value] - a[value];

export {getRandomInteger, updateItem, upFirstLetter, sortByValue};
