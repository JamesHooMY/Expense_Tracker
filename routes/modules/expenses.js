const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  res.render('new', { categories })
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  // 這裏的 userId 為 object 但不需要用 .toString() 因爲後續沒有要做邏輯判斷，只要放入 DB 或在 DB 找資料的話，可以直接使用 object
  // console.log(userId)
  const expense = req.body
  expense.userId = userId
  Expense.create(expense)
  res.redirect('/')
})

router.get('/:expense_id/edit', async (req, res) => {
  const userId = req.user._id
  const expense_id = req.params.expense_id
  const expense = await Expense.findOne({ _id: expense_id, userId }).lean()
  const categories = await Category.find().lean()
  const { categoryId } = expense
  categories.forEach(category => {
    if (category._id.toString() === categoryId) {
      category.selected = 'selected'
    }
  })
  // console.log(expense)
  res.render('edit', { expense, categories })
})

// here
router.post('/:expense_id/edit', async (req, res) => {
  const userId = req.user._id
  const expense_id = req.params.expense_id
  const expense = req.body
  await Expense.findOneAndUpdate({ _id: expense_id, userId }, expense)
  res.redirect('/')
})

router.post('/:expense_id/delete', async (req, res) => {
  const userId = req.user._id
  const expense_id = req.params.expense_id
  await Expense.findOneAndDelete({ _id: expense_id, userId })
  // console.log(expense)
  res.redirect('/')
})

module.exports = router
