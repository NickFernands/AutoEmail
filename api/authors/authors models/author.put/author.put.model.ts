//Importando Bibliotecas e Modulos
import { pool } from '../../../../database'

  // Função: Atualiza um Autor
 export function putAuthors (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
  
        conn.query(
  
          'UPDATE authors SET name = ? WHERE idAuthors = ?',
  
          [params.name, params.idAuthors],
  
          (error: any) => {
            conn.release()
  
            if (error) {
              reject({ error: error })
            }
  
            resolve({ menssagem: 'Autor Atualizado' })
          }
        )
      })
    })
  }