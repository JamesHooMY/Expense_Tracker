const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    let today = new Date()
    let day = today.getDate().toString()
    day = day < 10 ? '0' + day.toString() : day.toString()
    let month = today.getMonth() + 1
    month = month < 10 ? '0' + month.toString() : month.toString()
    const year = today.getFullYear().toString()
    const date = year.concat('-', month, '-', day)
    res.render('new', { categories, date })
  } catch (err) {
    console.error(err)
  }
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const expense = req.body
  expense.userId = userId
  Expense.create(expense)
  res.redirect('/')
})

router.get('/:expense_id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const expense_id = req.params.expense_id
    const [expense, categories] = await Promise.all([
      Expense.findOne({ _id: expense_id, userId }).lean(),
      Category.find().lean(),
    ])
    const { categoryId } = expense
    categories.forEach((category) => {
      if (category._id.toString() === categoryId.toString()) {
        category.selected = 'selected'
      }
    })
    res.render('edit', { expense, categories })
  } catch (err) {
    console.error(err)
  }
})

router.put('/:expense_id', async (req, res) => {
  try {
    const userId = req.user._id
    const expense_id = req.params.expense_id
    const expense = req.body
    await Expense.findOneAndUpdate({ _id: expense_id, userId }, expense)
    res.redirect('/')
  } catch (err) {
    console.error(err)
  }
})

router.delete('/:expense_id', async (req, res) => {
  try {
    const userId = req.user._id
    const expense_id = req.params.expense_id
    await Expense.findOneAndDelete({ _id: expense_id, userId })
    res.redirect('/')
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
