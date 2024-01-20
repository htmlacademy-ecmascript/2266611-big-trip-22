const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const DEFAULT_POINT_TYPE = 'flight';

const DEFAULT_POINT = {
  id: 0,
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: DEFAULT_POINT_TYPE
};

const SortType = {
  DAY: {
    name: 'day',
    disabled: false
  },
  EVENT: {
    name: 'event',
    disabled: true
  },
  TIME: {
    name: 'time',
    disabled: false
  },
  PRICE: {
    name: 'price',
    disabled: false
  },
  OFFERS: {
    name: 'offers',
    disabled: true
  }
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const FilterMessage = {
  [FilterType.EVERYTHING]: 'Click "New Event" to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now'
};

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export {
  POINT_TYPES,
  DEFAULT_POINT,
  SortType,
  FilterType,
  FilterMessage,
  Mode,
  UserAction,
  UpdateType
};
