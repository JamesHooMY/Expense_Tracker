const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const expense = req.body
  Expense.create(expense)
  res.redirect('/')
})

module.exports = router
