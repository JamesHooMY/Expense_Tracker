const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })

  passport.deserializeUser(async (_id, done) => {
    const user = await User.findById(_id).lean()
    if (user) return done(null, user)
  })

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, {
            type: 'warning_msg',
            message: `帳號 ${email} 還未注冊!`,
          })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return done(null, false, {
            type: 'warning_msg',
            message: `帳號 ${email} 或密碼錯誤！`,
          })
        }
        return done(null, user)
      }
    )
  )
}
