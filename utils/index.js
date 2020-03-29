const moment = require("moment");
const axios = require("axios");
const { publishDay } = require("./constants");

const DEFAULT_ERROR_MSG = "Internal server error";

const errorMsg = msg => {
  return msg ? { error: msg } : { error: DEFAULT_ERROR_MSG };
};

const successMsg = msg => ({ success: msg });

const publishDate = (createdAt = null) => {
  const currentDate = createdAt ? moment(createdAt).utc() : moment().utc();
  const result = moment(currentDate)
    .isoWeekday(publishDay)
    .startOf("day");
  return result.diff(currentDate, "seconds") > 0
    ? result.add(-1, "weeks")
    : result;
};

const nextPublishDate = () => {
  return publishDate().add(1, "week");
};

const prevPublishDate = () => {
  return publishDate().add(-1, "week");
};

const isPublishDay = () => {
  return (
    moment()
      .utc()
      .day() === publishDay
  );
};

const generateUserImg = async name => {
  const response = await axios.get(
    `https://ui-avatars.com/api/?name=${name}&background=eeeeee&color=aaaaaa&size=128`,
    {
      responseType: "arraybuffer"
    }
  );
  return Buffer.from(response.data);
};

module.exports = {
  errorMsg,
  successMsg,
  publishDate,
  nextPublishDate,
  prevPublishDate,
  generateUserImg,
  isPublishDay
};
