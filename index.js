import cors from 'cors'
import http from 'http'
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

        if(!this.config.helmet.disabled) this.app.use(helmet(this.config.helmet.options))
        if(!this.config.cors.disabled) this.app.use(cors(this.config.cors.options))
        if(!this.config.compression.disabled) this.app.use(compression(this.config.compression.options))
        if(!this.config.bodyParser.disabled) this.app.use(bodyParser.json(this.config.bodyParser.options.json))
        if(!this.config.bodyParser.disabled) this.app.use(bodyParser.urlencoded(this.config.bodyParser.options.urlencoded))
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

    Get(...params){
        return this.app.get(...params)
    }

    Post(...params){
        return this.app.post(...params)
    }

    Put(...params){
        return this.app.put(...params)
    }

    Delete(...params){
        return this.app.delete(...params)
    }

    async AutoRoute(folder){

    }
}

export default ExpressService
