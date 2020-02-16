import * as express from 'express';
import {Profile} from "../entity/Profile";

export default class ProfileController {
    public path = '/profile';
    public router: express.Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        // UserController middleware
        this.router.use(this.validateInput);

        // Controller endpoints
        this.router.post(this.path, this.createProfile);
        this.router.get(this.path, this.getAllProfiles);
        this.router.get(this.path + '/:id', this.getProfile);

        this.router.put(this.path + '/:id', this.updateProfile);

        this.router.delete(this.path + '/:id', this.deleteProfile);
    }


    public validateInput(req: express.Request, res: express.Response, next: express.NextFunction) {
        const params = {id: req.url.split('/')[2]};
        switch (req.method) {
            case 'GET':
                break;
            case 'DELETE':
                if (!params.id) {
                    return res.status(400).send({message: 'Id is required'});
                }
                break;
            case 'PUT':
                if (!params.id) {
                    return res.status(400).send({message: 'Id is required'});
                }
                break;
        }
        next();
    }

    public async createProfile(req: express.Request, res: express.Response) {
        const profileData = req.body;
        const profile = new Profile();
        profile.name = profileData.name;
        profile.last_name = profileData.last_name; // This should be encrypted!
        profile.address = profileData.address;
        profile.phone = profileData.phone;
        profile.email = profileData.email;
        profile.employee_number = profileData.employee_number;
        profile.hiring_date = profileData.hiring_date;

        await profile.save();

        return res.send(profile);
    }

    public async getAllProfiles(req: express.Request, res: express.Response) {
        const profiles = await Profile.find();
        return res.send(profiles);
    }

    public async getProfile(req: express.Request, res: express.Response) {
        const profile = await Profile.findOne(req.params.id);
        return res.send(profile);
    }

    public async updateProfile(req: express.Request, res: express.Response) {
        const profile = await Profile.findOne(req.params.id);
        if (profile !== undefined) {
            await Profile.update(req.params.id, req.body);
            return res.status(200).send({message: 'Profile updated correctly'});
        }

        return res.status(404).send({message: 'Profile not found'});
    }

    public async deleteProfile(req: express.Request, res: express.Response) {
        await Profile.delete(req.params.id);
        return res.status(200).send({message: 'Profile deleted successfully'});
    }
}
