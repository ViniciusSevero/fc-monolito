import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import clientEntity from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository  implements ClientGateway{
    async add(client: clientEntity): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipCode: client.address.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        })
    }
    async find(id: string): Promise<clientEntity> {
        const result = await ClientModel.findOne({where: {id: id}})

        return new Client({
            id: new Id(result.id),
            name: result.name,
            email: result.email,
            document: result.document,
            address: {
                street: result.street,
                number: result.number,
                complement: result.complement,
                city: result.city,
                state: result.state,
                zipCode: result.zipCode
            },
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        })
    }

}