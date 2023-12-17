import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DateFormat = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  EDIT_DATE: 'DD/MM/YY HH:mm',
  D_H_M_DURATION: 'DD[D] HH[H] mm[M]',
  H_M_DURATION: 'HH[H] mm[M]',
  M_DURATION: 'mm[M]'
};

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

export {DateFormat, convertDate, calculateDuration, convertDuration};
