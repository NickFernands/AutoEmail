// Importando Bibliotecas e Modulos
import { pool } from '../../../../database'

// Função: Listando dados de todos os leitores
export function getReaders () {
  return new Promise((resolve, reject) => {
    pool.getConnection((error: any, conn: any) => {
      if (error) {
        return reject(error)
      }
      conn.query(

        'SELECT * FROM readers',
        (error: any, results: any) => {
          conn.release()

          if (error) {
            reject(error)
          }

          return resolve({
            menssagem: 'Listando todos os Usuários',
            response: results
          })
        }
      )
    })
  })
}
