import express, {request, Request, Response} from "express"
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const facade = InvoiceFacadeFactory.create()
    try {
        const dto =  {
            id: req.params.id
        }
        const output = await facade.findInvoice(dto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})
