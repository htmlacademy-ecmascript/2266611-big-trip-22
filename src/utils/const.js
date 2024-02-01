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

export {
  END_POINT,
  FAILED_LOAD,
  AUTHORIZATION,
  MAX_DISPLAYED_DESTINATIONS,
  POINT_TYPES,
  DEFAULT_POINT
};
