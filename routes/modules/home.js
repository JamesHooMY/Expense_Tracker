const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const { categoryId } = req.query
  const categories = await Category.find().lean()
  let totalAmount = 0
  let expenses = []

  if (categoryId) {
    const category = categories.find(category => {
      if (category._id.toString() === categoryId) {
        category.selected = 'selected'
        return category
      }
    })
    const { name, icon } = category
    expenses = await Expense.find({ userId, categoryId })
      .lean()
      .sort({ date: -1 })

    expenses.forEach((expense, expenseIndex) => {
      totalAmount += Number(expense.amount)
      expense.categoryName = name
      expense.categoryIcon = icon
      expense.bgColor = expenseIndex % 2 === 0 ? '#adb5bd' : ''
    })
  } else {
    expenses = await Expense.find({ userId }).lean().sort({ date: -1 })
    expenses.forEach((expense, expenseIndex) => {
      totalAmount += Number(expense.amount)
      const category = categories.find(
        category => category._id.toString() === expense.categoryId
      )
      const { name, icon } = category
      expense.categoryName = name
      expense.categoryIcon = icon
      expense.bgColor = expenseIndex % 2 === 0 ? '#adb5bd' : ''
    })
  }
  res.render('index', { expenses, categories, totalAmount })
})

module.exports = router
