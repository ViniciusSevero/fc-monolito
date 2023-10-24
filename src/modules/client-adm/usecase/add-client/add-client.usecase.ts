import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddclientInputDto, AddclientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUsecase {

    constructor(private _clientRepository: ClientGateway) {}

    async execute(input: AddclientInputDto): Promise<AddclientOutputDto> {
        const client = new Client({
            id: new Id(input.id),
            name: input.name,
            email: input.email,
            address: input.address
        })
        await this._clientRepository.add(client);
        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }

}