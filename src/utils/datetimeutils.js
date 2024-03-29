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
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export function datetimeAsTimeString(date, language) {
  if (language === "fi") {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else {
    return date.toLocaleDateString(language);
  }
}

export function timestampToDate(timestamp) {
  return new Date(Date.parse(timestamp));
}

export function currentTime() {
  let d = new Date();
  let hours = d.getHours().toString().padStart(2, "0");
  let minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function datetimeToLocalISOString(datetime) {
  return new Date(datetime - new Date().getTimezoneOffset() * 60000).toISOString().replace("Z", "");
}

export function currentHours() {
  let d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}`;
}

export function currentMinutes() {
  let d = new Date();
  return `${d.getMinutes().toString().padStart(2, "0")}`;
}
