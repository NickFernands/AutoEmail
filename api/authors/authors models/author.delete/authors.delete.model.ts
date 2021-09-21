//Importando Bibliotecas e Modulos
import { pool } from '../../../../database'
import { transport } from '../../../../nodemailer'

  // Função: Remover um Autor
  export function removeAuthor (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
  
        conn.query(
  
          'SELECT readers.email, authors.name FROM follows JOIN authors ON follows.idFollows = authors.idAuthors JOIN readers ON follows.idFollows = readers.idReaders  WHERE authorsId = ?',
          [params.idAuthors],
          (error: any, results: any) => {
            if (error) {
              reject({ error: error })
            }
  
            results.map((followers: { email: any; name: any }) => {
              transport.sendMail({
                from: 'Serviço de Email <mailservice@email.com>',
                to: followers.email,
                subject: 'Autor Removido',
                text: `Olá ${followers.email} parece que o ${followers.name} acabou de nos deixar, sua inscrição foi removida automaticamente.`
              })
              return console.log('Done')
            })
  
            conn.query('SET FOREIGN_KEY_CHECKS=0;'),
  
            conn.query('DELETE FROM authors WHERE idAuthors = ?',
              [params.idAuthors],
              (error: any) => {
                conn.release()
  
                if (error) {
                  reject({ error: error })
                }
  
                resolve({ menssagem: 'Autor Removido com Sucesso' })
              })
          }
        )
      })
    })
  }