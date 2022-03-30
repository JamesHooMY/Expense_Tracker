const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符 !' })
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  }

  const user = await User.findOne({ email })
  if (user) {
    errors.push({ message: '這個 email 已經被注冊過了 !' })
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  } else {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
  }
  res.redirect('/users/login')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
