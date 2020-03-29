const mailgun = require("mailgun-js");
const { publishDate } = require("../utils/");

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mail = mailgun({ apiKey, domain });
const listAddress = `newedition@${domain}`;

const sendToList = async html => {
  const data = {
    from: `Net Periodic <${listAddress}>`,
    to: listAddress,
    subject: `Net Periodic - ${publishDate().format("MMM D")}`,
    html
  };
  const result = await new Promise((res, rej) =>
    mail.messages().send(data, (error, body) => {
      if (error) {
        rej(error);
      }
      res(body);
    })
  );
  return result;
};

const add = async (username, address, subscribed) => {
  const member = {
    subscribed,
    address,
    name: username
  };
  await new Promise((res, rej) =>
    mail
      .lists(listAddress)
      .members()
      .create(member, error => {
        if (error) {
          rej(error);
        }
        res();
      })
  );
};

const remove = async address => {
  await new Promise((res, rej) =>
    mail
      .lists(listAddress)
      .members(address)
      .delete(error => {
        if (error) {
          rej(error);
        }
        res();
      })
  );
};

const exists = async address => {
  const data = await new Promise((res, rej) => {
    mail
      .lists(listAddress)
      .members()
      .list((error, data) => {
        if (error) {
          rej(error);
        }
        res(data);
      });
  });
  for (let i = 0; i < data.items.length; i++) {
    if (data.items[i].address === address) {
      return data.items[i];
    }
  }
  return null;
};

const isSubscribed = async address => {
  if (!address) {
    return false;
  }
  const response = await new Promise((res, rej) =>
    mail.get(
      `/lists/${listAddress}/members/${address}`,
      {},
      (error, response) => {
        if (error) {
          rej(error);
        }
        res(response);
      }
    )
  );
  return !!(response && response.member && response.member.subscribed);
};

const subscription = async (address, subscribed) => {
  await new Promise((res, rej) =>
    mail
      .lists(listAddress)
      .members(address)
      .update({ subscribed }, error => {
        if (error) {
          rej(error);
        }
        res();
      })
  );
};

const update = async (user, email, mailSub) => {
  if (email && email === user.email) {
    await subscription(email, mailSub);
    return;
  }
  if (user.email) {
    await remove(user.email);
  }
  if (email) {
    await add(user.username, email, mailSub);
  }
};

module.exports = {
  add,
  remove,
  subscription,
  sendToList,
  update,
  exists,
  isSubscribed
};
