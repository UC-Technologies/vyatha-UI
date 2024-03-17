/* eslint-disable import/no-mutable-exports */
export function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

let formattedDate;

function updateFormattedDate() {
  const currentDate = new Date();
  formattedDate = formatDate(currentDate);
  setTimeout(updateFormattedDate, 60000);
}
updateFormattedDate();

export { formattedDate };
