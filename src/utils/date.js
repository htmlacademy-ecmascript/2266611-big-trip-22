import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DateFormat = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  EDIT_DATE: 'DD/MM/YY HH:mm',
  D_H_M_DURATION: 'DD[D] HH[H] mm[M]',
  H_M_DURATION: 'HH[H] mm[M]',
  M_DURATION: 'mm[M]',
  DATE_PICKED: 'd/m/y H:i'
};

const isDateFuture = (start) => dayjs().isBefore(start);

const isDatePresent = (start, end) => dayjs().isAfter(start) && dayjs().isBefore(end);

const isDatePast = (end) => dayjs().isAfter(end);

const convertDate = (date, format) => date ? dayjs(date).format(format) : '';

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
  isDateFuture,
  isDatePresent,
  isDatePast,
  DateFormat,
  convertDate,
  calculateDuration,
  convertDuration,
  sortByDate,
  sortByDuration
};
