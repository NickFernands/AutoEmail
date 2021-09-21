// Importando Bibliotecas e Modulos
import { pool } from '../../../../database'
  
  // :Função Removendo Posts
 export function deletePost (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
        conn.query(
          'DELETE FROM posts  WHERE authorsId = ?',
          [params.authorsId],
          (error: any, resultado: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            resolve({
              menssagem: 'Posts Removidos com Sucesso'
            })
          }
        )
      })
    })
  }