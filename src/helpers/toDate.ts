import { Moment } from "moment";

export function toDate(date: Moment) {
  return date.format("ddd DD MMM");
}
