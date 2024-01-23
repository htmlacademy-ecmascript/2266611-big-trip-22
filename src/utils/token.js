import {nanoid} from 'nanoid';

const generateTokenId = () => `Basic ${nanoid()}`;

export {generateTokenId};
