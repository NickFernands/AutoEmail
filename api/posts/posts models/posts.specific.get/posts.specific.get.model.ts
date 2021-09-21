import { pool } from '../../../../database'

  // Função: Ler todos os Posts de um autor Específico
  export function getSpecPosts (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        conn.query(
          'SELECT * FROM posts WHERE authorsId = ',
          [params.authorsId],
          (error: any, results: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            resolve({
              menssagem: `Listando todas as Postagens de ${results.authorsId}`,
              response: results
            })
          }
        )
      })
    })
  }