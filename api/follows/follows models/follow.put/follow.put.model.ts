import { pool } from '../../../../database'

// Função: Configurando Follow
export function postFollow (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
  
        conn.query(
  
          'INSERT INTO follows (idFollows, readersEmail, authorsId) VALUES (?, ?, ?)',
          [params.idFollows, params.readersEmail, params.authorsId],
          (error: any, resultado: any) => {
            conn.release()
  
            if (error) {
              reject({ error: error })
            }
  
            resolve({
              menssagem: 'Follow bem sucedido!',
              id_ticket: resultado
            })
          }
        )
      })
    })
  }