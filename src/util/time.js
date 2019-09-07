import strings from "@/data/strings.json";
import { pad } from "@/util/number";

export function longDate(time) {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}, ${
    strings.months.long[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

export function shortDate(time) {
  const date = new Date(time);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}
