import * as express from 'express';
import {Product} from "../entity/Product";

export default class ProductController {
    public path = '/product';
    public router: express.Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        // UserController middleware
        this.router.use(this.validateInput);

        // Controller endpoints
        this.router.post(this.path, this.createProduct);
        this.router.get(this.path, this.getAllProducts);
        this.router.get(this.path + '/:id', this.getProduct);

        this.router.put(this.path + '/:id', this.updateProduct);

        this.router.delete(this.path + '/:id', this.deleteProduct);
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
            case 'POST':
                if (Object.keys(req.body).length === 0) {
                    return res.status(400).send({message: "Request body can't be empty"});
                }
                break;
            case 'PUT':
                if (!params.id) {
                    return res.status(400).send({message: 'Id is required'});
                }
                if (Object.keys(req.body).length === 0) {
                    return res.status(400).send({message: "Request body can't be empty"});
                }
                break;
        }
        next();
    }

    public async createProduct(req: express.Request, res: express.Response) {
        const productData = req.body;
        const product = new Product();

        product.barcode = productData.barcode; // This should be encrypted!
        product.model = productData.model;
        product.type = productData.type;
        product.brand = productData.brand;
        product.description = productData.description;
        product.cost = productData.cost;
        product.wholesale_price = productData.wholesale_price;
        product.distributor_price = productData.distributor_price;
        product.public_price = productData.public_price;
        product.url_image = productData.url_image;
        product.active = productData.active;
        product.created_at = productData.created_at;
        product.updated_at = productData.updated_at;

        await product.save();

        return res.send(product);
    }

    public async getAllProducts(req: express.Request, res: express.Response) {
        const products = await Product.find();
        return res.send(products);
    }

    public async getProduct(req: express.Request, res: express.Response) {
        const product = await Product.findOne(req.params.id);
        return res.send(product);
    }

    public async updateProduct(req: express.Request, res: express.Response) {
        const product = await Product.findOne(req.params.id);
        if (product !== undefined) {
            await Product.update(req.params.id, req.body);
            return res.status(200).send({message: 'Product updated correctly'});
        }

        return res.status(404).send({message: 'Product not found'});
    }

    public async deleteProduct(req: express.Request, res: express.Response) {
        await Product.delete(req.params.id);
        return res.status(200).send({message: 'Product deleted successfully'});
    }
}
