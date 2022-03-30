const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')
const expense = require('../../models/expense')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.category
  const categories = await Category.find().lean()

  if (categoryId) {
    const category = categories.find(
      category => category._id.toString() === categoryId
    )
    const { name, icon } = category
    const expenses = await Expense.find({ userId, categoryId })
      .lean()
      .sort({ date: -1 })

    expenses.forEach(expense => {
      expense.categoryName = name
      expense.categoryIcon = icon
    })
    // console.log(expenses)
    res.render('index', { expenses, categories })
  } else {
    const expenses = await Expense.find({ userId }).lean().sort({ date: -1 })
    expenses.forEach(expense => {
      const category = categories.find(
        category =>
          // 切記這裏拿出來的 _id 還是 new ObjectId("6242b51ac976bdf52855e5f8") 的形態 !!!!!!!!!!!!! 要轉成文字才可以用 ！！！
          category._id.toString() === expense.categoryId
      )
      expense.categoryName = category.name
      expense.categoryIcon = category.icon
    })
    res.render('index', { expenses, categories })
  }
  // console.log(expenses)
  // res.render('index', { expenses, categories })
})

module.exports = router
