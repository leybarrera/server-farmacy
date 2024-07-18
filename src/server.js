import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import rootRouter from './routes/index.routes.js';
import { NODEMAILER_CONFIG } from './config/config.js';

const transporter = nodemailer.createTransport(NODEMAILER_CONFIG);

const server = express();

server.use(morgan('dev'));
server.use(
  express.json({
    limit: '500mb',
  })
);
server.use(cors());

server.use('/', rootRouter);

server.post('/sendEmail', async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  transporter.sendMail({
    from: 'nyellove1998@gmail.com',
    to: email,
    subject: 'BUENASALUD',
    text: `Hola, ${nombre} te saludamos de BUENASALUD hemos recibio tu mensaje: "${mensaje}". pronto responderemos a tu petición`,
  });

  res.send('Email enviado');
});

server.get('/', (req, res) => {
  res.send('Hola');
});

export default server;
