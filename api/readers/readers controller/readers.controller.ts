// Importando Bibliotecas e Modulos
import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { getReaders } from '../readers model/readers.get/readers.get.model'
import { getSpecReaders } from '../readers model/readers.specific.get/readers.specific.get.model'
import { postReaders } from '../readers model/readers.post/readers.post.model'
import { putReaders } from '../readers model/readers.put/readers.put.model'
import { removeReader } from '../readers model/readers.delete/readers.delete.model'
const router = Router()

// Rota: Listando dados de todos os leitores
router.get('/', async (req: Request, res: Response) => {
  try {
    const getReader = await getReaders()
    res.status(200).send(getReader)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  } finally { console.log('Done') }
})

// Rota: Listando de um único leitor
router.get('/:idReaders', async (req: Request, res: Response) => {
  const { params } = req

  try {
    const getSpecReader = await getSpecReaders(params)
    res.status(200).send(getSpecReader)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  } finally { console.log('Done') }
})

// Rota: Cadastrando Leitores
router.post('/',
  [body('name').notEmpty().withMessage('Campo Name Obrigatório'),
    body('email').notEmpty().withMessage('Campo Email Obrigatório'),
    body('email').isEmail().withMessage('Insira um Email Válido')],

  async (req: Request, res: Response) => {
    const { body } = req

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    };

    try {
      const postingReaders = await postReaders(body)
      res.status(201).send(postingReaders)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    } finally { console.log('Done') }
  })

// Rota: Atualizando Leitores
router.put('/',
  [body('name').notEmpty().withMessage('Campo Name Obrigatório')],
  async (req: Request, res: Response) => {
    const { body } = req

    try {
      const puttingReaders = await putReaders(body)
      res.status(200).send(puttingReaders)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    } finally { console.log('Done') }
  })

// Rota: Removendo um Leitor Especifico
router.delete('/', async (req: Request, res: Response) => {
  const { params } = req

  try {
    const delReader = await removeReader(params)
    res.status(204).send(delReader)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  } finally { console.log('Done') }
})

export default router
