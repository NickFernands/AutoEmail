//Importando Bibliotecas e Modulos
import { pool } from '../../../../database'

// Função: Posta um novo Autor
export function postAuthors (params: any) {
    return new Promise((resolve, reject) => {
      pool.getConnection((error: any, conn: any) => {
        if (error) { reject({ error: error }) }
  
        conn.query(
          'SELECT * FROM authors WHERE email = ?', [params.email],
          (error: any, results: any) => {
            conn.release()
  
            if (error) { reject(error) }
  
            if (results.length > 0) { reject({ menssagem: 'Usuário ja cadastrado' }) }
  
            conn.query(
              'INSERT INTO authors (idAuthors, name, email) VALUES (?, ?, ?)',
              [params.idAuthors, params.name, params.email],
  
              (error: any, resultado: any) => {
                conn.release()
  
                if (error) { reject({ error: error }) };
  
                resolve({ menssagem: 'Autor cadastrado com sucesso!' })
              }
  
            )
          }
        )
      })
    })
  }