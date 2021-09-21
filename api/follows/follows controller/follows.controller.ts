// Importando Bibliotecas e Modulos
import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { postFollow } from '../follows models/follow.put/follow.put.model'
import { removeFollow } from '../follows models/follow.delete/follow.delete.model'
const router = Router()

// Rota: Configurando Follow
router.post('/',
  [body('idFollows').notEmpty().withMessage('Campo Obrigatório'),
    body('readersEmail').notEmpty().withMessage('Campo Email Obrigatório'),
    body('readersEmail').isEmail().withMessage('Insira um Email Válido'),
    body('authorsId').notEmpty().withMessage('Campo Obrigatório')],
  async (req: Request, res: Response) => {
    const { body } = req
  
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    };

    try {
      const resultFollow = await postFollow(body)
      res.status(201).send(resultFollow)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error })
    } finally { console.log('Done') }
  })

// Rota: Removendo Follow
router.delete('/', async (req: Request, res: Response) => {
  const { body } = req

  try {
    const deleteFollow = await removeFollow(body)
    res.status(202).send(deleteFollow)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  } finally { console.log('Done') }
})

export default router
