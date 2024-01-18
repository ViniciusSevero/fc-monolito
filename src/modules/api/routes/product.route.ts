import express, {request, Request, Response} from "express"
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const facade = ProductAdmFacadeFactory.create()
    try {
        const dto =  {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            salesPrice: req.body.salesPrice,
            stock: req.body.stock,
        }
        await facade.addProduct(dto)
        res.send()
    } catch (err) {
        res.status(500).send(err)
    }
})
