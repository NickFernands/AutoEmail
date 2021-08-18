//Configurações
const mysql = require('../../database').pool;
const nodemailer = require('nodemailer');
const {body, validationResult} = require('express-validator');

//Transporter dos Email's
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d35067edfd0263",
      pass: "9462b5174697ac"
    }
});

//Inserindo Autores
exports.postAuthors =  [body("name").notEmpty().withMessage("Campo Obrigatório"),
                  body("email").isEmail().withMessage("E-mail Inválido, Insira um e-mal valido(com @, um domínio e com um endereço antes do @)"),
                  body("email").notEmpty().withMessage("Campo Obrigatório")], 
                  (req, res) => {
                    const errors = validationResult(req);
                    if(!errors.isEmpty()) {
                        return res.status(400).send({errors: errors.array()});
                    };
                    mysql.getConnection((error, conn) => {
                        if(error) {return res.status(500).send({ error: error })}
                        conn.query(
                            'SELECT * FROM authors WHERE email = ?', 
                            [req.body.email], 
                            (error, results) => {
                                conn.release();
                                if(error) {return res.status(500).send({ error: error })}
                                if(results.length > 0) {
                                    res.status(401).send({menssagem: 'Usuário ja cadastrado'})
                                } 
                                    conn.query(
                                        'INSERT INTO authors (idAuthors, name, email) VALUES (?, ?, ?)',
                                        [req.body.idAuthors, req.body.name, req.body.email],
                                        (error, resultado, fields) => {
                                            conn.release();
                                    
                                            if(error) {
                                                return res.status(500).send({
                                                    error: error
                                                });
                                            };

                                            res.status(201).send({
                                                menssagem: "Autor cadastrado com sucesso!"
                                            })
                                        }
                                    );
                            }
                        );        
                    });
};

//Atualizando Autores
exports.updateAuthors = [body("name").notEmpty().withMessage("Campo Name Obrigatório")],
    (req, res, next) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        };

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
        'UPDATE authors SET name = ? WHERE idAuthors = ?',
        [req.body.name, req.body.idAuthors],
        (error, resultado, fields) => {
            conn.release();
                                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }
                
                res.status(200).send({
                    menssagem: 'Autor Atualizado',
                });
            }
        )
     });
                
};

//Removendo Autores
exports.deleteAuthor =  (req, res) => {
    const body = req.body;
    const {authorsId} = body;
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            "SELECT readers.email, authors.name FROM follows JOIN authors ON follows.idFollows = authors.idAuthors JOIN readers ON follows.idFollows = readers.idReaders  WHERE authorsId = ?", 
            [authorsId],
            (error, results) => {

                if(error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                results.map(followers => {
                    transport.sendMail({
                      from: 'Serviço de Email <mailservice@email.com>',
                      to: followers.email,
                      subject:'Autor Removido',
                      text: `Olá ${followers.email} parece que o ${followers.name} acabou de nos deixar, sua inscrição foi removida automaticamente.`
                    })
                });

                conn.query("SET FOREIGN_KEY_CHECKS=0;"),
                conn.query("DELETE FROM authors WHERE idAuthors = ?", 
                [authorsId], 
                (error) => {
                    
                    conn.release();

                    if(error) {
                        return res.status(500).send({
                            error: error
                        });
                    }

                });
                
            
            } 
        );
    });
};