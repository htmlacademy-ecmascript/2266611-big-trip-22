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
  Method,
  SortType,
  FilterType,
  FilterMessage,
  Mode,
  UserAction,
  UpdateType,
  TimeLimit
};
