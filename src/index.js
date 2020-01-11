"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const server = app_1.default.instance;
// createConnection().then(async connection => {
// BodyParser
// server.app.use(bodyParser.urlencoded({extended: true}));
// server.app.use(bodyParser.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.start(() => {
    console.log(`Server running in port ${server.port}`);
});
// }).catch(error => console.log(error));
//# sourceMappingURL=index.js.map