//Configurações
const express = require('express');
const router = express.Router();
const mysql = require('../../database').pool;
const nodemailer = require('nodemailer');
const {body, validationResult} = require('express-validator');

//Controller
const authorsController = require('../controllers/authorsController')

//Transporter dos Email's
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d35067edfd0263",
      pass: "9462b5174697ac"
    }
});

//Inserir Autor
router.post('/', authorsController.postAuthors);

//Atualizar Autor
router.put('/', authorsController.updateAuthors);

//Remover Autor
router.delete('/', authorsController.deleteAuthor);

module.exports = router;