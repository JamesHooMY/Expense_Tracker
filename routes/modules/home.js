const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.category
  const categories = await Category.find().lean()
  let totalAmount = 0

  if (categoryId) {
    const category = categories.find(category => {
      if (category._id.toString() === categoryId) {
        category.selected = 'selected'
        return category
      }
    })
    const { name, icon } = category
    const expenses = await Expense.find({ userId, categoryId })
      .lean()
      .sort({ date: -1 })

    expenses.forEach((expense, expenseIndex) => {
      totalAmount += Number(expense.amount)
      expense.categoryName = name
      expense.categoryIcon = icon
      expense.bgColor = expenseIndex % 2 === 0 ? '#adb5bd' : ''
    })
    res.render('index', { expenses, categories })
  } else {
    const expenses = await Expense.find({ userId }).lean().sort({ date: -1 })
    expenses.forEach((expense, expenseIndex) => {
      totalAmount += Number(expense.amount)
      const category = categories.find(
        category =>
          // 切記這裏拿出來的 _id 還是 new ObjectId("6242b51ac976bdf52855e5f8") 的形態 !!!!!!!!!!!!! 要轉成文字才可以用 ！！！
          category._id.toString() === expense.categoryId
      )
      const { name, icon } = category
      expense.categoryName = name
      expense.categoryIcon = icon
      expense.bgColor = expenseIndex % 2 === 0 ? '#adb5bd' : ''
    })
    res.render('index', { expenses, categories, totalAmount })
  }
  // console.log(expenses)
  // res.render('index', { expenses, categories })
})

module.exports = router
