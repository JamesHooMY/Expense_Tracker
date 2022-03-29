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

router.get('/:expense_id/edit', async (req, res) => {
  const expense_id = req.params.expense_id
  const expense = await Expense.findById({ _id: expense_id }).lean()
  // console.log(expense)
  res.render('edit', { expense })
})

router.post('/:expense_id/delete', async (req, res) => {
  const expense_id = req.params.expense_id
  await Expense.findOneAndDelete({ _id: expense_id })
  // console.log(expense)
  res.redirect('/')
})

module.exports = router
