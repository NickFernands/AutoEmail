import { pool } from '../../../../database'
import { transport } from '../../../../nodemailer'

  // Função: Inserir Post
  export function postingPosts (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
  
        conn.query(
  
          'INSERT INTO posts (idPosts, title, content, authorsId) VALUES (?, ?, ?, ?)',
          [params.idPosts, params.title, params.content, params.authorsId],
  
          (error: any) => {
            conn.query('SELECT readers.email, authors.name FROM follows JOIN authors ON follows.idFollows = authors.idAuthors JOIN readers ON follows.idFollows = readers.idReaders  WHERE authorsId = ?',
              [params.authorsId],
              (error: any, results: any) => {
                conn.release()
  
                if (error) {
                  reject({
                    error: error
                  })
                }
  
                resolve({
                  messagem: 'Post Executado',
                  dados: results[0]
  
                })
  
                results.map((followers: { email: any; name: any }) => {
                  transport.sendMail({
                    from: 'Serviço de Email <mailservice@email.com',
                    to: followers.email,
                    subject: 'Novo Post',
                    text: `Olá ${followers.email} parece que o ${followers.name} acabou de fazer um post novo, que tal dar uma olhada.`
                  })
                  return console.log(`Done`)
                })
              })
          }
        )
      })
    })
  }