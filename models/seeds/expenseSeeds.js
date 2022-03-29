const Expense = require('../expense')
const expenses = require('./expenses.json').expenses

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const res = require('express/lib/response')

const CATEGORY = {
  //<i class="fa-solid fa-house"></i>
  家居物業: 'https://fontawesome.com/icons/home?style=solid',
  //<i class="fa-solid fa-van-shuttle"></i>
  交通出行: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  //<i class="fa-solid fa-face-grin-beam"></i>
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  //<i class="fa-solid fa-utensils"></i>
  餐飲食品: 'https://fontawesome.com/icons/utensils?style=solid',
  //<i class="fa-solid fa-pen"></i>
  其他: 'https://fontawesome.com/icons/pen?style=solid',
}

db.once('open', async () => {
  await Promise.all(
    expenses.map(async expense => {
      const { name, date, amount } = expense
      const expenses = await Expense.create({ name, date, amount })
    })
  )
  console.log('expenses created !')
  process.exit()
})
