export function datetimeAsDateAndTimeString(date, language) {
  let d = new Date(Date.parse(date));
  return d.toLocaleString(language);
}

export function datetimeAsDateString(date, language) {
  return date.toLocaleDateString(language);
}

export function datetimeAsDateISOString(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day}`;
}

export function datetimeAsTimeString(date, language) {
  return date.toLocaleTimeString(language);
}

export function timestampToDate(timestamp) {
  return new Date(Date.parse(timestamp));
}

export function currentTime() {
  let d = new Date();
  return `${d.getHours()}:${d.getMinutes()}`;
}

export function datetimeToLocalISOString(datetime) {
  return new Date(datetime - new Date().getTimezoneOffset() * 60000).toISOString().replace("Z", "");
}
