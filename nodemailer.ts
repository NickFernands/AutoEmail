import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// Transporter dos Email's
const transport = nodemailer.createTransport({
  host: process.env.HOST_LOCAL,
  port: Number(process.env.PORT_LOCAL),
  auth: {
    user: process.env.USER_LOCAL,
    pass: process.env.PASS_LOCAL
  }
})

export { transport }
