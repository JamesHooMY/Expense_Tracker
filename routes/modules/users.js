const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', async (req, res) => {
  // const expenses = await Expense.find().lean()
  // console.log(expenses)
  res.render('login')
})

router.get('/register', async (req, res) => {
  // const expenses = await Expense.find().lean()
  // console.log(expenses)
  res.render('register')
})

module.exports = router
