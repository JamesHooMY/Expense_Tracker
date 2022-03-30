const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

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
            message: 'That email is not registered!',
          })
        }
        if (user.password !== password) {
          return done(null, false, {
            type: 'warning_msg',
            message: 'Email or Password incorrect.',
          })
        }
        return done(null, user)
      }
    )
  )
}
