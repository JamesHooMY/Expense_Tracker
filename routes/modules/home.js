const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const { categoryId, month } = req.query
    const categories = await Category.find().lean()
    let expenses = []
    let totalAmount = 0

    if (categoryId || month) {
      if (categoryId && month) {
        categories.find((category) => {
          if (category._id.toString() === categoryId) {
            category.selected = 'selected'
          }
        })
        expenses = await Expense.aggregate([
          {
            $match: {
              userId,
              categoryId: mongoose.Types.ObjectId(categoryId),
              date: { $regex: month },
            },
          },
          {
            $sort: {
              amount: -1,
            },
          },
          {
            $lookup: {
              from: 'categories',
              localField: 'categoryId',
              foreignField: '_id',
              as: 'categoryId',
            },
          },
          { $unwind: '$categoryId' },
        ])
      } else if (categoryId) {
        categories.find((category) => {
          if (category._id.toString() === categoryId) {
            category.selected = 'selected'
          }
        })
        expenses = await Expense.find({ userId, categoryId })
          .populate('categoryId', { icon: 1, name: 1 })
          .lean()
          .sort({ date: -1 })
      } else if (month) {
        expenses = await Expense.aggregate([
          {
            $match: {
              userId,
              date: { $regex: month },
            },
          },
          {
            $sort: {
              amount: -1,
            },
          },
          {
            $lookup: {
              from: 'categories',
              localField: 'categoryId',
              foreignField: '_id',
              as: 'categoryId',
            },
          },
          { $unwind: '$categoryId' },
        ])
      }
    } else {
      expenses = await Expense.find({ userId })
        .populate('categoryId', { icon: 1, name: 1 })
        .lean()
        .sort({ date: -1 })
    }
    expenses.forEach((expense, expenseIndex) => {
      totalAmount += Number(expense.amount)
      expense.bgColor = expenseIndex % 2 === 0 ? '#adb5bd' : ''
    })

    res.render('index', { expenses, categories, totalAmount, month })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
