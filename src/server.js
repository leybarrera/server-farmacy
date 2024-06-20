import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import nodemailer from 'nodemailer'
import rootRouter from './routes/index.routes.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'nyellove1998@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
})

const server = express()

server.use(morgan('dev'))
server.use(express.json())
server.use(cors())

server.use('/', rootRouter)

server.post('/sendEmail', async (req, res) => {
  const { nombre, email, mensaje } = req.body
  console.log(nombre, email, mensaje)
  transporter.sendMail({
    from: 'nyellove1998@gmail.com',
    to: email,
    subject: 'BUENASALUD',
    text: `Hola, ${nombre} te saludamos de BUENASALUD hemos recibio tu mensaje: "${mensaje}". pronto responderemos a tu petición`,
  })

  res.send('Email enviado')
})

server.get('/', (req, res) => {
  res.send('Hola')
})

export default server
