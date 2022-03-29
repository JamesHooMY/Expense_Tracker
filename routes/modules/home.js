const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/', async (req, res) => {
  const expenses = await Expense.find().lean()
  console.log(expenses)
  res.render('index', { expenses })
})

module.exports = router
