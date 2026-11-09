const express = require('express')
var session = require('express-session')
const passport = require('passport')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs')
const mongoose = require('mongoose')
const path = require('path');
const config = require('./etc/config')
const Position = require('./models/Position'),
  VideoType = require('./models/VideoType')

const UserResource = require('./resources/UserResource'),
  VideoResource = require('./resources/VideoResource'),
  CategoryResource = require('./resources/CategoryResource'),
  NotificationResource = require('./resources/NotificationResource'),
  StarResource = require('./resources/StarResource')

const user = require('./routes/user'),
  video = require('./routes/video'),
  star = require('./routes/star')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/video', video);
app.use('/user', user);
app.use('/star', star)

var dir = path.join(__dirname, 'public');
app.use(express.static(dir));
AdminBro.registerAdapter(require('admin-bro-mongoose'))

const adminBro = new AdminBro({
  resources: [UserResource, Position, StarResource, VideoResource, CategoryResource, VideoType, NotificationResource],
  rootPath: config.adminUrl,
  branding: {
    companyName: config.companyName
  }
})

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (user, password) => {
    if (config.adminPassword === password && config.adminUser === user) return true
    return null
  },
  cookieName: 'adminbro',
  cookiePassword: 'somepassword',
})
app.use(adminBro.options.rootPath, router)

const run = async () => {
  await mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  await app.listen(8080, () => console.log(`Example app listening on port 8080!`))
}

run()