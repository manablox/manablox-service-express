import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'

export default (config) => {
    const app = express()

    app.use(helmet.hsts(config.helmet))
    app.use(cors(config.cors))
    app.use(compression())

    app.use(bodyParser.json(config.bodyParser.json))
    app.use(bodyParser.urlencoded(config.bodyParser.urlencoded))

    return app
}
