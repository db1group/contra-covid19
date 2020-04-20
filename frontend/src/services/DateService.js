import moment from 'moment';

export default {
  formatNowAsStringDateTime() {
    return moment().format('DD/MM/YYYY HH:mm');
  },
  parseZone(momentObject, fromFormat, toFormat) {
    return moment.parseZone(momentObject, fromFormat).format(toFormat);
  },
  changeFormat(momentObject, fromFormat, toFormat) {
    return moment(momentObject, fromFormat).format(toFormat);
  },
  toMomentObject(stringDate, format) {
    return moment(stringDate, format);
  },
  toMomentZoneObject(stringDate, format) {
    return moment.parseZone(stringDate, format);
  },
  isDateValid(stringDate, format) {
    return moment(stringDate, format).isValid();
  },
};
