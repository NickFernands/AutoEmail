//Configuração
const express = require('express');
const router = express.Router();

//Controller
const postsController = require('../controllers/postsController');

//Configuração

//Ler todos os Posts
router.get('/', postsController.getPosts);

//Ler todos os posts de um autor específico
router.get('/:authorsId', postsController.getSpecificPost);

//Inserindo Posts
router.post('/', postsController.postingPost);

//Atualizando Posts
router.put('/', postsController.putPosts);

//Deletando posts de um autor específico
router.delete('/:authorsId', postsController.deleteSpecificPost);

//Deletando todos os Posts
router.delete('/', postsController.deletePosts);

module.exports = router;