import { pool } from '../../../../database'
  
  // Função: Atualizando Posts
 export function putPosts (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
  
        conn.query(
  
          'UPDATE posts SET title = ?, content = ? WHERE authorsId = ?',
          [params.title, params.content, params.authorsId],
          (error: any, resultado: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            resolve({
              menssagem: 'Post Atualizado'
            })
          }
        )
      })
    })
  }