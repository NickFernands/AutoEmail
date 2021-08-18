//Configurações
const mysql = require('../../database').pool;
const {body, validationResult} = require('express-validator');

//Configurando Follow
exports.postFollow = [body("idFollows").notEmpty().withMessage("Campo Obrigatório"),
    body("readersEmail").notEmpty().withMessage("Campo Email Obrigatório"),
    body("readersEmail").isEmail().withMessage("Insira um Email Válido"),
    body("authorsId").notEmpty().withMessage("Campo Obrigatório")],
    (req, res, next) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        };

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'INSERT INTO follows (idFollows, readersEmail, authorsId) VALUES (?, ?, ?)',
            [req.body.idFollows, req.body.readersEmail, req.body.authorsId],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(201).send({
                    menssagem: 'Follow bem sucedido!',
                    id_ticket: resultado
                });
            }
        )
    });

};

//Remover Follow
exports.deleteFollow = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM follows  WHERE idFollows = ?',
            [req.params.idFollows],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(202).send({
                    menssagem: 'Unfollow Bem Sucedido',
                });
            }
        )
    });

};