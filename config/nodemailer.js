const nodemailer = require('nodemailer')

module.exports = async (userEmail, verifiedCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    })

    // email content
    const emailContent = {
      from: process.env.NODEMAILER_USER, // sender address
      to: userEmail, // list of receivers
      subject: '記帳本忘記密碼', // Subject line
      text: 'Hello world?', // plain text body
      html: `<b>驗證碼 ${verifiedCode}</b>`, // html body
    }

    // send mail with defined transport object
    await transporter.sendMail(emailContent)
  } catch (err) {
    console.log(err)
  }
}
