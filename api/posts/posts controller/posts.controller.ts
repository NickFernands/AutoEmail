// Importando Bibliotecas e Modulos
import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { getPosts } from '../posts models/posts.get/posts.get.model'
import { getSpecPosts } from '../posts models/posts.specific.get/posts.specific.get.model'
import { postingPosts } from '../posts models/posts.post/posts.post.model'
import { putPosts } from '../posts models/posts.put/posts.put.model'
import { deletePost } from '../posts models/posts.delete/posts.delete.model'
const router = Router()

// Rota: Ler todos os Posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const getPost = await getPosts()
    res.status(200).send(getPost)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  } finally { console.log('Done') }
})

// Rota: Ler todos os Posts de um autor Específico
router.get('/:idAuthors', async (req: Request, res: Response) => {
  const { params } = req

  try {
    const getSpecPost = await getSpecPosts(params)
    res.status(200).send(getSpecPost)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  } finally { console.log('Done') }
})

// Rota: Inserir Post
router.post('/',
  [body('title').notEmpty().withMessage('Campo title Obrigatório'),
    body('content').notEmpty().withMessage('Campo content Obrigatório'),
    body('authorsId').notEmpty().withMessage('Id do author Obrigatório')],
  async (req: Request, res: Response) => {
    const { body } = req

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    };

    try {
      const posting = await postingPosts(body)
      res.status(201).send(posting)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error })
    } finally { console.log('Done') }
  })

// Rota: Atualizando Posts
router.put('/',
  [body('title').notEmpty().withMessage('Campo title Obrigatório'),
    body('content').notEmpty().withMessage('Campo content Obrigatório'),
    body('authorsId').notEmpty().withMessage('Id do author Obrigatório')],
  async (req: Request, res: Response) => {
    const { body } = req

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    };

    try {
      const putting = await putPosts(body)
      res.status(200).send(putting)
    } catch (error) {
      console.log(error)
      res.status(500).send({ error })
    } finally { console.log('Done') }
  })

// Rota: Removendo Posts
router.delete('/:authorsId', async (req: Request, res: Response) => {
  const { params } = req

  try {
    const deletePosts = await deletePost(params)
    res.status(204).send(deletePosts)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  } finally { console.log('Done') }
})

export default router
