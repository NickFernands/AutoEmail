//Configurações
const mysql = require('../../database').pool;
const {body, validationResult} = require('express-validator');
const nodemailer = require('nodemailer');

//Transporter dos Email's
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d35067edfd0263",
    pass: "9462b5174697ac"
  }
});

//Ler todos os Posts
exports.getPosts = (req, res) => {
  mysql.getConnection((error, conn) => {
      conn.query(
          'SELECT * FROM posts',
          (error, results, fields) => {
              conn.release();

              if(error) {
                  return res.status(500).send({
                      error: error
                  });
              }

              return res.status(200).send({
                  menssagem: "Listando todas as postagens ",
                  response: results
              });
          }
      )
  });
};

//Ler todos os posts de um autor específico
exports.getSpecificPost = (req, res) => {
  mysql.getConnection((error, conn) => {
      conn.query(
          'SELECT * FROM posts WHERE authorsId = ',
          [req.params.authorsId],
          (error, results, fields) => {
              conn.release();

              if(error) {
                  return res.status(500).send({
                      error: error
                  });
              }

              return res.status(200).send({
                  menssagem: `Listando todas as Postagens de ${results.authorsId}`,
                  response: results
              });
          }
      )
  });
};

//Inserindo Posts
exports.postingPost = [body("title").notEmpty().withMessage("Campo title Obrigatório"),
                  body("content").notEmpty().withMessage("Campo content Obrigatório"),
                  body("authorsId").notEmpty().withMessage("Id do author Obrigatório")],
                  (req, res) => {
                    const body = req.body;
                    const {idPosts, title, content, authorsId} = body;
                    const errors = validationResult(req);
                      if(!errors.isEmpty()) {
                          return res.status(400).send({errors: errors.array()});
                      };

                      mysql.getConnection((error, conn) => {
                        if(error) {return res.status(500).send({error: error})}
                        conn.query(
                            "INSERT INTO posts (idPosts, title, content, authorsId) VALUES (?, ?, ?, ?)", 
                            [idPosts, title, content, authorsId],
                            (error) => {
                                conn.query("SELECT readers.email, authors.name FROM follows JOIN authors ON follows.idFollows = authors.idAuthors JOIN readers ON follows.idFollows = readers.idReaders  WHERE authorsId = ?", 
                                [authorsId], 
                                (error, results, fields) => {
                                    
                                    conn.release();

                                    if(error) {
                                        return res.status(500).send({
                                            error: error
                                        });
                                    }
                                    
                                    res.status(201).send({
                                        messagem: "Post Executado",
                                        dados: results[0]
                                        
                                    });

                                    results.map(followers => {
                                        transport.sendMail({
                                          from: 'Serviço de Email <mailservice@email.com',
                                          to: followers.email,
                                          subject:'Novo Post',
                                          text: `Olá ${followers.email} parece que o ${followers.name} acabou de fazer um post novo, que tal dar uma olhada.`
                                        })
                                    });
 
                                });
                                
                            
                            } 
                        );
                    });

};

//Atualizando Posts
exports.putPosts = [body("title").notEmpty().withMessage("Campo title Obrigatório"),
    body("content").notEmpty().withMessage("Campo content Obrigatório"),
    body("authorsId").notEmpty().withMessage("Id do author Obrigatório")],
    (req, res, next) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        };

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error })}
        conn.query (
        'UPDATE posts SET title = ?, content = ? WHERE authorsId = ?',
        [req.body.title, req.body.content, req.body.authorsId],
        (error, resultado, fields) => {
            conn.release();
                                
                if(error) {
                    return res.status(500).send({
                        error: error 
                    });
                }
                
                res.status(200).send({
                    menssagem: 'Post Atualizado',
                });
            }
        )
     });
                
};

//Deletando Posts de um autor especifíco
exports.deleteSpecificPost = (req, res, next) => {
  mysql.getConnection((error, conn) => {
      if(error) {return res.status(500).send({ error: error })}
      conn.query (
          'DELETE FROM posts  WHERE authorsId = ?',
          [req.params.authorsId],
          (error, resultado, fields) => {
              conn.release();
              
              if(error) {
                  return res.status(500).send({
                      error: error 
                  });
              }

              res.status(204).send({
                  menssagem: 'Posts Removidos com Sucesso',
              });
          }
      )
  });

};

//Deletando todos os Posts
exports.deletePosts = (req, res, next) => {
  mysql.getConnection((error, conn) => {
      if(error) {return res.status(500).send({ error: error })}
      conn.query (
          'DELETE FROM posts',
          (error, resultado, fields) => {
              conn.release();
              
              if(error) {
                  return res.status(500).send({
                      error: error 
                  });
              }

              res.status(204).send({
                  menssagem: 'Todos os posts foram deletados com sucesso!',
              });
          }
      )
  });

};