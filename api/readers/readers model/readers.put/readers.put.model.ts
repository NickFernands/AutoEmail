import { pool } from '../../../../database'
  
  // Função: Atualizando Leitores
  export function putReaders (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
        conn.query(
          'UPDATE readers SET name = ? WHERE idReaders = ?',
          [params.name, params.idReaders],
          (error: any) => {
            conn.release()
  
            if (error) {
              reject({
                error: error
              })
            }
  
            resolve({
              menssagem: 'Usuário Atualizado'
            })
          }
        )
      })
    })
  }