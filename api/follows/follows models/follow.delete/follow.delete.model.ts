// Importando Bibliotecas e Modulos
import { pool } from '../../../../database'
  
  // Função: Removendo Follow
 export function removeFollow (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
  
        conn.query(
  
          'DELETE FROM follows  WHERE idFollows = ?',
          [params.idFollows],
          (error: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            resolve({
              menssagem: 'Unfollow Bem Sucedido'
            })
          }
        )
      })
    })
  }