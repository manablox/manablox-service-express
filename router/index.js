export default class Router {
    constructor(app, routes){
        this.app = app
        this.routes = []
        this.AddRoutes(routes)
    }

    AddRoutes(routes){
        this.routes = routes.map((route) => {
            let url = route.name
                .replace('.', '')
                .replace('/index.js', '')
                .replace('.js', '')
                .split('/')
                .map(urlPart => urlPart.startsWith('_') ? urlPart.replace('_', ':') : urlPart)
                .join('/')

            return {
                url: url || '/',
                method: route.route.method,
                handler: route.route.handler
            }
        })

        this.routes.map((route) => {
            if(route.method == 'get') this.app.Get(route.url, route.handler)
            if(route.method == 'post') this.app.Post(route.url, route.handler)
            if(route.method == 'put') this.app.Put(route.url, route.handler)
            if(route.method == 'delete') this.app.Delete(route.url, route.handler)
        })
    }
}