import App from "./app";
import "reflect-metadata";
import {createConnection} from "typeorm";
import bodyParser from "body-parser";
import cors from 'cors';

const server = App.instance;

// createConnection().then(async connection => {

    // BodyParser
    // server.app.use(bodyParser.urlencoded({extended: true}));
    // server.app.use(bodyParser.json());

    // CORS
    server.app.use(cors({origin: true, credentials: true}));

    server.start(() => {
        console.log(`Server running in port ${server.port}`);
    });

// }).catch(error => console.log(error));
