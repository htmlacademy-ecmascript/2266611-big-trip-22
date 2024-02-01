const capitalizeFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

const sortByValue = (value) => (first, second) => second[value] - first[value];

const updateItem = (items, update) => (items.map((item) => item.id === update.id ? update : item));

export {capitalizeFirstLetter, sortByValue, updateItem};
