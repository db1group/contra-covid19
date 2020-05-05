import moment from 'moment';

const toMomentObject = (stringDate, format) => moment(stringDate, format);

export default {
  formatNowAsStringDateTime() {
    return moment().format('DD/MM/YYYY HH:mm');
  },
  parseZone(momentObject, fromFormat, toFormat) {
    return moment.parseZone(momentObject, fromFormat).format(toFormat);
  },
  changeFormat(stringDate, fromFormat, toFormat) {
    if (!stringDate) return null;
    return moment(stringDate, fromFormat).format(toFormat);
  },
  changeISOFormat(isoFormatted, toFormat) {
    if (!isoFormatted) return null;
    return moment(isoFormatted).format(toFormat);
  },
  toMomentObject(stringDate, format) {
    return toMomentObject(stringDate, format);
  },
  formatStringTypeToDateTypeWithMinutes(stringDate) {
    const splitedDateTime = stringDate.split(' ');
    const splitedDate = splitedDateTime[0].split('/');
    const splitedTime = splitedDateTime[1].split(':');

    const inputedDateTime = new Date(splitedDate[2], (splitedDate[1] - 1), splitedDate[0],
      splitedTime[0], splitedTime[1], 0);

    return inputedDateTime;
  },
  formatDateTypeToStringTypeWithMinutes(date) {
    return moment(date).format('DD/MM/YYYY HH:mm');
  },
  formatDateTypeToString(date) {
    return moment(date).format('YYYY-MM-DD');
  },
  isDateValid(stringDate, format) {
    return moment(stringDate, format).isValid();
  },
  isLesserEqualsThanMaximumDate(stringInformedDate, stringMaximumDate) {
    const informedDate = toMomentObject(stringInformedDate, 'DD/MM/YYYY');
    const maximumDate = stringMaximumDate
      ? toMomentObject(stringMaximumDate, 'DD/MM/YYYY')
      : moment();

    return informedDate.isSame(maximumDate, 'day') || informedDate.isBefore(maximumDate);
  },
  isGreaterEqualsThanMinimumDate(stringInformedDate, stringMinimumDate) {
    const informedDate = toMomentObject(stringInformedDate, 'DD/MM/YYYY');
    const minimumDate = stringMinimumDate
      ? toMomentObject(stringMinimumDate, 'DD/MM/YYYY')
      : moment();

    return informedDate.isSame(minimumDate, 'day') || informedDate.isAfter(minimumDate);
  },
  isLesserEqualsThanMaximumDateWithMinutes(stringInformedDate, stringMaximumDate) {
    const informedDate = toMomentObject(stringInformedDate, 'DD/MM/YYYY HH:mm');
    const maximumDate = stringMaximumDate
      ? toMomentObject(stringMaximumDate, 'DD/MM/YYYY HH:mm')
      : moment();

    return informedDate.isSame(maximumDate) || informedDate.isBefore(maximumDate);
  },
  isGreaterEqualsThanMinimumDateWithMinutes(stringInformedDate, stringMinimumDate) {
    const informedDate = toMomentObject(stringInformedDate, 'DD/MM/YYYY HH:mm');
    const minimumDate = stringMinimumDate
      ? toMomentObject(stringMinimumDate, 'DD/MM/YYYY HH:mm')
      : moment();

    return informedDate.isSame(minimumDate) || informedDate.isAfter(minimumDate);
  },
};
