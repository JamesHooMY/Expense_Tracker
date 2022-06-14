const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { authenticator } = require('../../middleware/auth')
const nodemailer = require('../../config/nodemailer')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true, // connect-flash
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不符 !' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    }

    const user = await User.findOne({ email })
    if (user) {
      errors.push({ message: '這個 email 已經被注冊過了 !' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      const hash = bcrypt.hashSync(password, 10)
      await User.create({ name, email, password: hash })
    }
    res.redirect('/users/login')
  } catch (err) {
    console.error(err)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

router.get('/changePassword', authenticator, (req, res) => {
  res.render('changePassword')
})

router.put('/changePassword', authenticator, async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body
    const errors = []
    if (oldPassword === newPassword) {
      errors.push({ message: '新密碼不能與舊密碼相同 !' })
      return res.render('changePassword', {
        errors,
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
    }
    if (newPassword !== confirmNewPassword) {
      errors.push({ message: '新密碼與與新確認密碼不符 !' })
      return res.render('changePassword', {
        errors,
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
    }

    const userId = req.user._id
    const user = await User.findOne({ _id: userId })
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      errors.push({ message: '舊密碼不正確 !' })
      return res.render('changePassword', {
        errors,
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
    }

    const hash = bcrypt.hashSync(newPassword, 10)
    await User.findOneAndUpdate({ _id: userId }, { password: hash }) // update password
    req.logout()
    req.flash('success_msg', '密碼更換成功，請重新登入後再使用！')
    res.redirect('/users/login')
  } catch (err) {
    console.error(err)
  }
})

router.get('/forgetPassword', (req, res) => {
  res.render('forgetPassword')
})

router.post('/forgetPassword', async (req, res) => {
  try {
    const { email } = req.body
    let emailMatch = await User.findOne({ email }).lean()
    let verifiedCode = ''
    if (emailMatch) {
      emailMatch = emailMatch.email
      const genRanHex = (size) =>
        [...Array(size)]
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join('')
      verifiedCode = genRanHex(8)
      nodemailer(email, verifiedCode)
    }
    const warning_msg =
      '密碼更改鏈接已寄送！請確認 “信箱收件夾” 或 “垃圾郵件” 内是否有相關郵件！'

    res.render('resetPassword', { emailMatch, verifiedCode, warning_msg })
  } catch (err) {
    console.error(err)
  }
})

router.post('/resetPassword', async (req, res) => {
  try {
    const { password, confirmPassword, emailMatch, verifiedCode, verifyCode } =
      req.body
    const errors = []
    if (password !== confirmPassword) {
      errors.push({ message: '新密碼與確認新密碼不相符 !' })
      return res.render('resetPassword', {
        errors,
        password,
        confirmPassword,
        emailMatch,
        verifiedCode,
      })
    } else if (emailMatch && verifiedCode) {
      if (verifyCode !== verifiedCode) {
        errors.push({ message: '驗證碼輸入錯誤 !' })
        return res.render('resetPassword', {
          errors,
          password,
          confirmPassword,
          emailMatch,
          verifiedCode,
        })
      }
      const hash = bcrypt.hashSync(password, 10)
      await User.findOneAndUpdate({ email: emailMatch }, { password: hash })
    }

    req.flash('success_msg', '密碼更換成功，請重新登入後再使用！')
    res.redirect('/users/login')
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
