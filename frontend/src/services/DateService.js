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
  isDateValid(stringDate, format) {
    return moment(stringDate, format).isValid();
  },
  isLesserEqualsThanMaximumDate(stringInformedDate, stringMaximumDate) {
    const splitedInformedValue = stringInformedDate.split('/');
    const inputedInformedDate = new Date(`
      ${splitedInformedValue[2]}-${splitedInformedValue[1]}-${splitedInformedValue[0]}
    `);

    let maximumDate;
    if (stringMaximumDate) {
      const splitedMaximumValue = stringMaximumDate.split('/');
      maximumDate = new Date(`
        ${splitedMaximumValue[2]}-${splitedMaximumValue[1]}-${splitedMaximumValue[0]}
      `);
    } else {
      maximumDate = new Date();
    }

    return (inputedInformedDate <= maximumDate);
  },
  isGreaterEqualsThanMinimumDate(stringInformedDate, stringMinimumDate) {
    const splitedInformedValue = stringInformedDate.split('/');
    const inputedInformedDate = new Date(`
      ${splitedInformedValue[2]}-${splitedInformedValue[1]}-${splitedInformedValue[0]}
    `);

    let minimumDate;
    if (stringMinimumDate) {
      const splitedMinimumValue = stringMinimumDate.split('/');
      minimumDate = new Date(`
        ${splitedMinimumValue[2]}-${splitedMinimumValue[1]}-${splitedMinimumValue[0]}
      `);
    } else {
      minimumDate = new Date();
    }

    return (inputedInformedDate >= minimumDate);
  },
  isLesserEqualsThanMaximumDateWithMinutes(stringInformedDate, stringMaximumDate) {
    const splitedDateTime = stringInformedDate.split(' ');
    const splitedDateValue = splitedDateTime[0].split('/');
    const splitedTimeValue = splitedDateTime[1].split(':');
    const inputedInformedDate = new Date(splitedDateValue[2], (splitedDateValue[1] - 1), splitedDateValue[0],
      splitedTimeValue[0], splitedTimeValue[1], 0);

    let maximumDate;
    if (stringMaximumDate) {
      const splitedMaximumDateTime = stringMaximumDate.split(' ');
      const splitedMaximumDateValue = splitedMaximumDateTime[0].split('/');
      const splitedMaximumTimeValue = splitedMaximumDateTime[1].split(':');
      maximumDate = new Date(splitedMaximumDateValue[2], (splitedMaximumDateValue[1] - 1), splitedMaximumDateValue[0],
        splitedMaximumTimeValue[0], splitedMaximumTimeValue[1], 0);
    } else {
      maximumDate = new Date();
    }

    return (inputedInformedDate <= maximumDate);
  },
  isGreaterEqualsThanMinimumDateWithMinutes(stringInformedDate, stringMinimumDate) {
    const splitedDateTime = stringInformedDate.split(' ');
    const splitedDateValue = splitedDateTime[0].split('/');
    const splitedTimeValue = splitedDateTime[1].split(':');
    const inputedInformedDate = new Date(splitedDateValue[2], (splitedDateValue[1] - 1), splitedDateValue[0],
      splitedTimeValue[0], splitedTimeValue[1], 0);

    let minimumDate;
    if (stringMinimumDate) {
      const splitedMinimumDateTime = stringMinimumDate.split(' ');
      const splitedMinimumDateValue = splitedMinimumDateTime[0].split('/');
      const splitedMinimumTimeValue = splitedMinimumDateTime[1].split(':');
      minimumDate = new Date(splitedMinimumDateValue[2], (splitedMinimumDateValue[1] - 1), splitedMinimumDateValue[0],
        splitedMinimumTimeValue[0], splitedMinimumTimeValue[1], 0);
    } else {
      minimumDate = new Date();
    }

    return (inputedInformedDate >= minimumDate);
  },
};
