import express, {request, Request, Response} from "express"
import CheckoutFacadeFactory from "../../checkout/factory/checkout.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const facade = CheckoutFacadeFactory.create()
    try {
        const dto =  {
            clientId: req.body.clientId,
            products: req.body.products.map((p: { productId: any; }) => {
                return {
                    productId: p.productId
                }
            })
        }
        const output = await facade.generateOrder(dto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})
