const Expense = require('../expense')
const expenses = require('./expenses.json').expenses

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const CATEGORY = {
  家居物業: 'https://fontawesome.com/icons/home?style=solid',
  交通出行: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  餐飲食品: 'https://fontawesome.com/icons/utensils?style=solid',
  其他: 'https://fontawesome.com/icons/pen?style=solid',
}

db.once('open', async () => {
  await Promise.all(
    expenses.map(expense => {
      const { name, date, amount } = expense
      Expense.create({ name, date, amount })
    })
  )
  console.log('expenses created !')
  process.exit()
})
