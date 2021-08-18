//Configurações
const express = require('express');
const router = express.Router();
const mysql = require('../../database').pool;
const {body, validationResult} = require('express-validator');

//Controller
const readersRoute = require('../controllers/readersController');

//Listando dados de todos os Leitores
router.get('/', readersRoute.getReaders);

//Listando dados de um leitor especifico
router.get('/:idReaders', readersRoute.getSpecificReaders);

//Cadastrando Leitores
router.post('/', readersRoute.postReaders);

//Atualizando Leitores
router.put('/', readersRoute.putReaders);

//Removendo um Leitor Específico
router.delete('/:idReaders', readersRoute.deleteSpecificReader);

//Removendo todos os Leitores
router.delete('/', readersRoute.deleteReaders);

module.exports = router;