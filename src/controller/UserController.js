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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const User_1 = require("../entity/User");
class UserController {
    constructor() {
        this.path = '/user';
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // UserController middleware
        this.router.use(this.validateInput);
        // Controller endpoints
        this.router.post(this.path + '/login', this.login);
        this.router.post(this.path, this.createUser);
        this.router.get(this.path, this.getAllUsers);
        this.router.get(this.path + '/:id', this.getUser);
        this.router.put(this.path + '/:id', this.updateUser);
        this.router.delete(this.path + '/:id', this.deleteUser);
    }
    validateInput(req, res, next) {
        const params = { id: req.url.split('/')[2] };
        switch (req.method) {
            case 'GET':
                break;
            case 'DELETE':
                if (!params.id) {
                    return res.status(400).send({ message: 'Id is required' });
                }
                break;
            case 'POST':
                if (Object.keys(req.body).length === 0) {
                    return res.status(400).send({ message: "Request body can't be empty" });
                }
                break;
            case 'PUT':
                if (!params.id) {
                    return res.status(400).send({ message: 'Id is required' });
                }
                if (Object.keys(req.body).length === 0) {
                    return res.status(400).send({ message: "Request body can't be empty" });
                }
                break;
        }
        next();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginData = req.body;
            const user = yield User_1.User.findOne({
                NAME: loginData.name,
                EMAIL: loginData.email,
            });
            if (user && user.PASSWORD == loginData.password) {
                return res.send('login');
            }
            else {
                return res.send('wrong credentials');
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const user = new User_1.User();
            user.EMAIL = userData.email;
            user.NAME = userData.name;
            user.PASSWORD = userData.password; // This should be encrypted!
            user.save();
            return res.send(user);
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield User_1.User.find();
            return res.send(clients);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield User_1.User.findOne(req.params.id);
            return res.send(client);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(req.params.id);
            if (user !== undefined) {
                yield User_1.User.update(req.params.id, req.body);
                return res.status(200).send({ message: 'User updated correctly' });
            }
            return res.status(404).send({ message: 'User not found' });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            User_1.User.delete(req.params.id);
            return res.status(200).send({ message: 'User deleted successfully' });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map