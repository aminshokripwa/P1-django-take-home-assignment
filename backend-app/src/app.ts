import express, { Application } from 'express';
import cors from 'cors';
import { createServer, Server } from 'http';
import routesUser from './routes/user.routes';
import routesAuth from './routes/auth.routes';
import routesTruck from './routes/truck.routes';

import { connect } from './database/connection';

export class App {

    private app: Application;
    private httpServer: Server;

    private apiRoutes = {
        user: '/api',
        auth: '/api',
        truck: '/api',
    }

    constructor(){
        this.app = express();

        this.httpServer = createServer(this.app);

        this.middlewares();
        this.routes();
    }

    private middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: false }) );
    }

    private routes(){
        this.app.use( this.apiRoutes.user, routesUser );
        this.app.use( this.apiRoutes.auth, routesAuth );
        this.app.use( this.apiRoutes.truck, routesTruck );
    }

    async listen(port: string): Promise<void> {

        await this.httpServer.listen( port );
        console.log(`SERVIDORs RUN ON PORT ${ port }`)
    }

}