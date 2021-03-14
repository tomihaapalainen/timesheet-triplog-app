import moment from "moment";

export function datetimeAsDateAndTimeString(date, dateFormat, timeFormat) {
  return moment(date).format(`${dateFormat} ${timeFormat}`);
}

export function datetimeAsDateString(date, dateFormat) {
  return moment(date).format(`${dateFormat}`);
}

export function datetimeAsTimeString(date, timeFormat) {
  return moment(date).format(`${timeFormat}`);
}

export function timestampToDate(timestamp) {
  return new Date(Date.parse(timestamp));
}

export function currentTime(timeFormat) {
  return moment(new Date()).format(timeFormat);
}

export function datetimeToLocalISOString(datetime) {
  return new Date(datetime - new Date().getTimezoneOffset() * 60000).toISOString().replace("Z", "");
}
