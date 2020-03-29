const AWS = require("aws-sdk");

process.env.AWS_ACCESS_KEY_ID = process.env.BUCKETEER_AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION = "us-east-1";

const bucketName = process.env.BUCKETEER_BUCKET_NAME;
const s3 = new AWS.S3();

const upload = async (fileBuffer, fileName, contentType) => {
  const params = {
    Key: fileName,
    Bucket: bucketName,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: "public-read"
  };
  await new Promise((res, rej) =>
    s3.putObject(params, error => {
      if (error) {
        rej(error.message);
      }
      res();
    })
  );
};

const remove = async fileName => {
  var params = {
    Key: fileName,
    Bucket: bucketName
  };
  await new Promise((res, rej) =>
    s3.deleteObject(params, error => {
      if (error) {
        rej(error.message);
      }
      res();
    })
  );
};

module.exports = {
  upload,
  remove
};
