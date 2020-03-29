require("dotenv").config();
const express = require("express");
const path = require("path");
const sslRedirect = require("heroku-ssl-redirect");
const connectDb = require("./services/dbConnect");
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 5000;
const nodeEnv = process.env.NODE_ENV;
const app = express();

connectDb();

app.use(express.json({ extended: false }));
app.use(sslRedirect());
app.use(fileUpload());
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/topics", require("./routes/api/topics"));

if (nodeEnv === "production") {
  app.use(express.static("client/build"));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => console.log(`Server started on port ${port}`));
