import moment from "moment";
import { publishDay } from "./constants";

export const publishDate = (createdAt = null) => {
  const currentDate = createdAt
    ? moment(createdAt)
        .utc()
        .add(1, "weeks")
    : moment().utc();
  const result = moment(currentDate)
    .isoWeekday(publishDay)
    .startOf("day");
  return result.diff(currentDate, "seconds") > 0
    ? result.add(-1, "weeks")
    : result;
};

export const nextPublishDate = () => {
  return publishDate().add(1, "week");
};

export const trimValues = obj => {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    }
  }
};

export const trimProtocol = url =>
  url.substring(url.indexOf("/") + 2, url.length);
