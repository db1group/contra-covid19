import moment from 'moment';

export default {
  formatNowAsStringDateTime() {
    return moment().format('DD/MM/YYYY HH:mm');
  },
  changeFormat(momentObject, fromFormat, toFormat) {
    return moment(momentObject, fromFormat).format(toFormat);
  },
  toMomentObject(stringDate, format) {
    return moment(stringDate, format);
  },
  isDateValid(stringDate, format) {
    return moment(stringDate, format).isValid();
  },
};
