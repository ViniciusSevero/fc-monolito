import express, {request, Request, Response} from "express"
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const facade = ClientAdmFacadeFactory.create()
    try {
        const dto =  {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                complement: req.body.address.complement,
                city: req.body.address.city,
                state: req.body.address.state,
                zipCode: req.body.address.zipCode,
            }
        }
        const output = await facade.addClient(dto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})
