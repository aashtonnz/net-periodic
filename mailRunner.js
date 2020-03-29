require("dotenv").config();
const mailService = require("./services/mail");
const connectDb = require("./services/dbConnect");
const { prevPublishDate, publishDate, isPublishDay } = require("./utils");

const HOSTNAME = "https://www.netperiodic.com";
const FILE_HOST =
  "https://bucketeer-e584479d-577c-49c1-a15f-1b74c836eb5a.s3.amazonaws.com";
const MAX_ALL_POSTS = 10;

const postsToHtml = posts => `
<html>
  <body style="text-align:center;margin:0 auto;font-size:0.8rem;line-height:1.5;font-family:Arial,Helvetica,san-serif;background:#fff;color:#333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 0">
          <div>
            <img src="${HOSTNAME}/logo64.png" style="height:2rem;margin-right:0.3rem">
          </div>
          <div style="font-weight: 400;font-size: 1.3rem;text-decoration:none;color:#333;">
            Net Periodic
          </div>
          <div style="font-size: 0.7rem;color: #777;text-decoration:none;">
            ${publishDate().format("MMM D")}
          </div>
        </td>
      </tr>
    </table>
    <p style="margin:1rem 0;">
      <a href="${HOSTNAME}" target="_blank" style="text-decoration: none;color:#d66b2b">See this week's edition</a>
    </p>
    <div style="border-bottom:1px solid #ddd;width:100%;margin:1.5rem auto;" />
    <h1 style="font-weight:400;font-size:1rem;margin:0;">Leading</h1>
    ${posts
      .map(
        post => `
        <div style="padding: 1rem 0;">
          <div>
            <a href="${HOSTNAME}/user/${
          post.profile.user.username
        }" target="_blank">
              <img src="${FILE_HOST}/${
          post.profile.imgPath
        }" style="height:2rem;width:2rem;border-radius:1.8rem;margin-top:0.5rem;margin-bottom:-0.2rem;border:1px solid #eee;">
            </a>
          </div>
          <div><a class="postTitle" href="${
            post.link
          }" target="_blank" style="font-size:1.2rem;font-weight:400;color:#333;text-decoration:none;">
            ${post.title}
          </a></div>
          <div><a class="postLink" href="${
            post.link
          }" target="_blank" style="text-decoration:none;color:#777;font-size:0.7rem;">
            ${new URL(post.link).hostname}
          </a></div>
          <div><a class="userLink" href="${HOSTNAME}/user/${
          post.profile.user.username
        }" target="_blank" style="text-decoration: none;color:#333;">
            ${post.profile.user.name} @${post.profile.user.username}
          </a></div>
          <div>
            ${post.topics
              .map(
                topic =>
                  `<a class="topicLink" href="${HOSTNAME}/topic/${topic}" target="_blank" style="text-decoration:none;color:#d66b2b;margin:0 0.2rem">
                    ${topic}
                  </a>`
              )
              .join("")}
          </div>
        </div>`
      )
      .join("")}
    <div style="border-bottom:1px solid #ddd;width:100%;margin:0.5rem auto 1.5rem auto;" />
    <div><a href="%mailing_list_unsubscribe_url%" style="text-decoration: none;font-size:0.7rem;color:#777;">Unsubscribe</a></div>
  </body>
</html>`;

(async () => {
  if (!isPublishDay()) {
    process.exit(0);
  }
  try {
    await connectDb();
    require("./models/Profile");
    require("./models/Topic");
    require("./models/User");
    const Post = require("./models/Post");
    const posts = await Post.find({
      createdAt: { $gt: prevPublishDate(), $lte: publishDate() }
    })
      .populate({
        path: "profile",
        select: "imgPath user numSubscribed",
        populate: ["user", "name username"]
      })
      .sort({ numSubscribed: "desc" })
      .limit(MAX_ALL_POSTS);
    const html = postsToHtml(posts);
    const result = await mailService.sendToList(html);
    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
