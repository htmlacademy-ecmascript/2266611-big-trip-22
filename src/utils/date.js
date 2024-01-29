import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(duration);
dayjs.extend(minMax);

const DateFormat = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM D',
  TIME: 'HH:mm',
  EDIT_DATE: 'DD/MM/YY HH:mm',
  D_H_M_DURATION: 'DD[D] HH[H] mm[M]',
  H_M_DURATION: 'HH[H] mm[M]',
  M_DURATION: 'mm[M]',
  DATE_PICKED: 'd/m/y H:i'
};

const commonConfigOptions = {
  enableTime: true,
  'time_24hr': true,
  allowInput: true,
  dateFormat: DateFormat.DATE_PICKED,
  disableMobile: 'true'
};

const convertDate = (date, format) => date ? dayjs(date).format(format) : '';

const getMinDate = (items) => convertDate(dayjs.min(items.map((item) => dayjs(item))), DateFormat.DAY_MONTH);

const getMaxDate = (items) => convertDate(dayjs.max(items.map((item) => dayjs(item))), DateFormat.DAY_MONTH);

const isDateFuture = (start) => dayjs().isBefore(start);

const isDatePresent = (start, end) => dayjs().isAfter(start) && dayjs().isBefore(end);

const isDatePast = (end) => dayjs().isAfter(end);

const calculateDuration = (start, end) => dayjs.duration(dayjs(end).diff(dayjs(start)));

const convertDuration = (value) => {
  if (value.get('day')) {
    return value.format(DateFormat.D_H_M_DURATION);
  }

  if (!value.get('day') && value.get('hour')) {
    return value.format(DateFormat.H_M_DURATION);
  }

  return value.format(DateFormat.M_DURATION);
};

const sortByDate = (start) => (a, b) => dayjs(a[start]).diff(dayjs(b[start]));

const sortByDuration = (start, end) => (a, b) => {
  const firstDuration = calculateDuration(a[start], a[end]);
  const secondDuration = calculateDuration(b[start], b[end]);

  return secondDuration.asMilliseconds() - firstDuration.asMilliseconds();
};

export {
  DateFormat,
  commonConfigOptions,
  convertDate,
  getMinDate,
  getMaxDate,
  isDateFuture,
  isDatePresent,
  isDatePast,
  calculateDuration,
  convertDuration,
  sortByDate,
  sortByDuration
};
