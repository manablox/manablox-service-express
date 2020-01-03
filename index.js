import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'

class ExpressService {
    constructor(config){
        this.config = config
        this.server = null
        this.app = null

        this.Initialize()
    }

    Initialize(){
        this.app = express()

        this.app.use(helmet(this.config.helmet))
        this.app.use(cors(this.config.cors))
        this.app.use(compression(this.config.compression))
        this.app.use(bodyParser.json(this.config.bodyParser.json))
        this.app.use(bodyParser.urlencoded(this.config.bodyParser.urlencoded))
    }

    Start(){
        this.server = http.createServer(this.app)
        this.server.listen(this.config.port, this.config.ip, () => {
            console.log(`An express server is listening on ${ this.config.ip }:${ this.config.port }`)
        })
    }

    Use(...params){
        return this.app.use(...params)
    }

    AutoRoute(folder){

    }
}

export default ExpressService
