const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const FAILED_LOAD = 'Failed to load latest route information';

const AUTHORIZATION = 'Basic ca986cd8b872960';

const MAX_DISPLAYED_DESTINATIONS = 3;

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
  dateFrom: '',
  dateTo: '',
  destination: 0,
  isFavorite: false,
  offers: [],
  type: DEFAULT_POINT_TYPE
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
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
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
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
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export {
  END_POINT,
  FAILED_LOAD,
  AUTHORIZATION,
  MAX_DISPLAYED_DESTINATIONS,
  POINT_TYPES,
  DEFAULT_POINT,
  Method,
  SortType,
  FilterType,
  FilterMessage,
  Mode,
  UserAction,
  UpdateType,
  TimeLimit
};
