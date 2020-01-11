"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const environment_1 = require("./environments/environment");
const typeorm_1 = require("typeorm");
const UserController_1 = __importDefault(require("./controller/UserController"));
const controllers = [new UserController_1.default()];
class App {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.initializeModels();
        this.initializeMiddlewares();
        this.initializeControllers();
        this.listenSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    initializeModels() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield typeorm_1.createConnection();
            if (connection === undefined) {
                throw new Error('Error connecting to database');
            } // In case the connection failed, the app stops.
            connection.synchronize(); // this updates the database schema to match the models' definitions
            this.connection = connection; // Store the connection object in the class instance.
        });
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
    }
    initializeControllers() {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    listenSockets() {
        console.log('Listen sockets');
        this.io.on('connection', client => {
            console.log('New client connected');
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map