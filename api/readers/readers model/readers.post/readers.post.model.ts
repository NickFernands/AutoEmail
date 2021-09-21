import { pool } from '../../../../database'
  
  // Função: Cadastrando Leitores
  export function postReaders (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
  
        conn.query(
          'INSERT INTO readers (idReaders, name, email) VALUES (?, ?, ?)',
          [params.idReaders, params.name, params.email],
          (error: any, results: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            if (results[0] != undefined) {
              reject({
                error: 'Email Ja Cadastrado'
              })
            }
  
            resolve({
              messagem: 'Cadastro Executado',
              dados: results[0]
  
            })
          }
        )
      })
    })
  }