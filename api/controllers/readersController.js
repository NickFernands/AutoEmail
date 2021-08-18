//Configurações
const express = require('express');
const router = express.Router();
const mysql = require('../../database').pool;
const {body, validationResult} = require('express-validator');


//Listando dados de todos os leitores
exports.getReaders = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM readers',
            (error, results, fields) => {
                conn.release();

                if(error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                return res.status(200).send({
                    menssagem: "Listando todos os Usuários",
                    response: results
                });
            }
        )
    });
};

//Listando dados de um leitor especifico
exports.getSpecificReaders = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query('SELECT * FROM readers WHERE idReaders = ?', [req.params.idReaders],
            (error, results, fields) => {
                conn.release();

                if(error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if(results.length < 1) {
                    return res.status(404).send({
                        error: "Usuário passado não foi encontrato"
                    })
                }

                return res.status(200).send({
                    response: results
                });
        }
        )
    });
};

//Cadastrando Leitores
exports.postReaders =  [body("name").notEmpty().withMessage("Campo Name Obrigatório"),
                  body("email").notEmpty().withMessage("Campo Email Obrigatório"),
                  body("email").isEmail().withMessage("Insira um Email Válido")],
                  (req, res) => {
                        const errors = validationResult(req);
                        if(!errors.isEmpty()) {
                            return res.status(400).send({errors: errors.array()});
                        };

                        mysql.getConnection((error, conn) => {
                            if(error) {return res.status(500).send({error: error})}
                            conn.query(
                                'INSERT INTO readers (idReaders, name, email) VALUES (?, ?, ?)',
                                [req.body.idReaders, req.body.name, req.body.email],
                                (error, results, fields) => {
                                    conn.release();

                                    if(error) {
                                        return res.status(500).send({
                                            error: error
                                        });
                                    }

                                    if(results[0] != undefined) {
                                        return res.status(400).send({
                                            error: "Email Ja Cadastrado"
                                        })
                                    }
                                    
                                    res.status(201).send({
                                        messagem: "Cadastro Executado",
                                        dados: results[0]
                                        
                                    });
                                } 
                            );
                        });
                  };



//Atualizando Leitores
exports.putReaders = [body("name").notEmpty().withMessage("Campo Name Obrigatório")],
    (req, res, next) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        };

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
        'UPDATE readers SET name = ? WHERE idReaders = ?',
        [req.body.name, req.body.idReaders],
        (error, resultado, fields) => {
            conn.release();
                                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }
                
                res.status(200).send({
                    menssagem: 'Usuário Atualizado',
                });
            }
        )
     });
                
};

//Removendo um Leitor Especifico
exports.deleteSpecificReader = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM readers  WHERE idReaders = ?',
            [req.params.idReaders],
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(204).send({
                    menssagem: 'Leitor Removido com Sucesso',
                });
            }
        )
    });

};

//Deletando todos os Leitores
exports.deleteReaders =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
            'DELETE FROM readers',
            (error, resultado, fields) => {
                conn.release();
                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }

                res.status(204).send({
                    menssagem: 'Lista de Leitores Limpa',
                });
            }
        )
    });

};