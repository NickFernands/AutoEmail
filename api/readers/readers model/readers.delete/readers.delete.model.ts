// Importando Bibliotecas e Modulos
import { pool } from '../../../../database'
  
  // Função: Removendo um Leitor Especifico
 export function removeReader (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
        conn.query(
          'DELETE FROM readers  WHERE idReaders = ?',
          [params.idReaders],
          (error: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            resolve({
              menssagem: 'Leitor Removido com Sucesso'
            })
          }
        )
      })
    })
  }