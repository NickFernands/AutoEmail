//Configurações
const express = require('express');
const router = express.Router();


//Controller
const followsController = require('../controllers/followsController')

//Configurando Follow
router.post('/', followsController.postFollow);

router.delete('/:idFollows', followsController.deleteFollow);

module.exports = router;