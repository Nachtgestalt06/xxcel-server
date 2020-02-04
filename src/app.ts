import express from 'express';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import * as socket from './sockets/socket';
import {SERVER_PORT} from "./environments/environment";
import {Connection, createConnection} from "typeorm";
import UserController from "./controller/UserController";

const controllers = [new UserController()];


export default class App {
    private static _instance: App;
    public app: express.Application;
    public port: number;
    public connection: Connection | undefined;

    public io: socketIO.Server;
    private readonly httpServer: http.Server;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.initializeModels();
        this.initializeMiddlewares();
        this.initializeControllers();
        this.listenSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private async initializeModels() {
        const connection = await createConnection();
        if (connection === undefined) { throw new Error('Error connecting to database'); } // In case the connection failed, the app stops.
        await connection.synchronize(); // this updates the database schema to match the models' definitions
        this.connection = connection; // Store the connection object in the class instance.
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

        this.app.use(cors({origin: true, credentials: true}))
    }

    private initializeControllers() {
        controllers.forEach((controller: any) => {
            this.app.use('/', controller.router);
        });
    }

    listenSockets() {
        console.log('Listen sockets');
        this.io.on('connection', client => {
            console.log('New client connected');

            // Desconectar
            socket.disconnect( client );
        });
    }

    start( callback: any ) {
        this.httpServer.listen( this.port, callback );
    }
}
