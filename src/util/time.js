import strings from "../data/strings.json";

export function longDate(time) {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}, ${
    strings.months.long[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}
