// Configurações de Bibliotecas / Modulos
import express from 'express'
import morgan from 'morgan'

// Rotas
import authorsRoute from './api/authors/authors controller/authors.controller'
import followsRoute from './api/follows/follows controller/follows.controller'
import postsRoute from './api/posts/posts controller/posts.controller'
import readersRoute from './api/readers/readers controller/readers.controller'

// Configurações de app
export class App {
    private express: express.Application;
    private port = process.env.PORT || 3000;

    constructor () {
      this.express = express()
      this.listen()
      this.middlewares()
      this.cors()
      this.morgan()
      this.routes()
      this.routesAccess()
    }

    public getApp (): express.Application {
      return this.express
    }

    private routes () {
      this.express.use(authorsRoute)
    }

    private middlewares (): void {
      // Configurações de Body
      this.express.use(express.urlencoded({ extended: false }))
      this.express.use(express.json())
    }

    private cors (): void {
      this.express.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Header',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )

        if (req.method === 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATH')
          return res.status(200).send({})
        }

        next()
      })
    }

    private morgan (): void {
      this.express.use(morgan('dev'))
    }

    private listen (): void {
      this.express.listen(this.port, () => {
        console.log(`Running in the ${this.port}'s`)
      })
    }

    public routesAccess (): void {
      this.express.use('/authors', authorsRoute)
      this.express.use('/follows', followsRoute)
      this.express.use('/posts', postsRoute)
      this.express.use('/readers', readersRoute)
    }
}
