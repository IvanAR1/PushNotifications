const webPush = require("web-push")

webPush.setVapidDetails('mailto:daniloivan.alanis@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

module.exports = webPush;