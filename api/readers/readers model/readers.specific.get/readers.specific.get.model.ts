import { pool } from '../../../../database'
  
  // Função: Listando de um único leitor
  export function getSpecReaders (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        conn.query('SELECT * FROM readers WHERE idReaders = ?', [params.idReaders],
          (error: any, results: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            if (results.length < 1) {
              reject({
                error: 'Usuário passado não foi encontrato'
              })
            }
  
            resolve({
              response: results
            })
          }
        )
      })
    })
  }