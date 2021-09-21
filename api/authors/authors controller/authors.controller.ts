// Importando Bibliotecas e Modulos
import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { postAuthors } from '../authors models/authors.post/authors.post.model'
import { putAuthors } from '../authors models/author.put/author.put.model'
import { removeAuthor } from '../authors models/author.delete/authors.delete.model'
const router = Router()

// Rota: Posta um novo Autor
router.post('/', [body('name').notEmpty().withMessage('Campo Obrigatório'),
  body('email').isEmail().withMessage('E-mail Inválido, Insira um e-mal valido(com @, um domínio e com um endereço antes do @)'),
  body('email').notEmpty().withMessage('Campo Obrigatório')],

async (req: Request, res: Response) => {
  const { body } = req

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  };

  try {
    const resultPost = await postAuthors(body)
    res.status(201).send(resultPost)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  } finally { console.log('Done') }
})

// Rota: Atualiza um Autor
router.put('/', [body('name').notEmpty().withMessage('Campo Name Obrigatório')],

  async (req: Request, res: Response) => {
    const { body } = req
   
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    };

    try {
      const resultPut = await putAuthors(body)
      res.status(201).send(resultPut)
    } catch (error) {
      res.status(500).send({ error })
    } finally { console.log('Donne') }
  })

// Rota: Remover um Autor
router.delete('/:idAuthors', async (req: Request, res: Response) => {
  const { params } = req
  
  try {
    const resultDelete = await removeAuthor(params)
    res.status(201).send(resultDelete)
  } catch (error) {
    res.status(500).send({ error })
  } finally { console.log('Done') }
})

export default router
