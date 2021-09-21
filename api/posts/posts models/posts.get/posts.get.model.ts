// Importando Bibliotecas e Modulos
import { pool } from '../../../../database'

// Função: Ler todos os Posts
export function getPosts () {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        conn.query(
          'SELECT * FROM posts',
          (error: any, results: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            resolve({
              menssagem: 'Listando todas as postagens ',
              response: results
            })
          }
        )
      })
    })
  }