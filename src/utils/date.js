import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(duration);
dayjs.extend(minMax);

const Millisecond = {
  HOUR: 3600000,
  DAY: 86400000
};

const DateFormat = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM D',
  TIME: 'HH:mm',
  EDIT_DATE: 'DD/MM/YY HH:mm',
  H_M_DURATION: 'HH[H] mm[M]',
  M_DURATION: 'mm[M]',
  DATE_PICKED: 'd/m/y H:i'
};

const commonConfigOptions = {
  enableTime: true,
  'time_24hr': true,
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

const convertDuration = (start, end) => {
  const value = dayjs(end).diff(dayjs(start));
  const days = Math.floor(dayjs.duration(value).asDays());
  const hours = dayjs.duration(value).format(DateFormat.H_M_DURATION);
  const minutes = dayjs.duration(value).format(DateFormat.M_DURATION);

  switch (true) {
    case value < Millisecond.HOUR:
      return minutes;
    case value >= Millisecond.HOUR && value < Millisecond.DAY:
      return hours;
    case value >= Millisecond.DAY:
      return days < 10 ? `0${days}D ${hours}` : `${days}D ${hours}`;
  }
};

const sortByDate = (start) => (first, second) => dayjs(first[start]).diff(dayjs(second[start]));

const sortByDuration = (start, end) => (first, second) => {
  const firstDuration = calculateDuration(first[start], first[end]);
  const secondDuration = calculateDuration(second[start], second[end]);

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
  convertDuration,
  sortByDate,
  sortByDuration
};
