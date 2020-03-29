const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtTimeoutMs = process.env.JWT_TIMEOUT_MS;

const user = token => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded.user;
};

const create = async userId => {
  const payload = { user: { id: userId } };
  const token = await new Promise((res, rej) =>
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtTimeoutMs },
      (error, token) => {
        if (error) {
          rej(error.message);
        }
        res(token);
      }
    )
  );
  return token;
};

const get = req => req.header("x-auth-token");

module.exports = {
  user,
  create,
  get
};
