const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {
  res.redirect('/')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    await User.create({ name, email, password })
  }
  res.redirect('/users/login')
})

module.exports = router
