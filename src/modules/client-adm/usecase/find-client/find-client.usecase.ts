import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUsecase {
    constructor(private _repository: ClientGateway) {}

    async execute(input: FindClientInputDto) : Promise<FindClientOutputDto> {
        const result = await this._repository.find(input.id);

        return {
            id: result.id.id,
            name: result.name, 
            email: result.email, 
            document: result.document, 
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode,
            }, 
            createdAt: result.createdAt, 
            updatedAt: result.updatedAt, 
        }
    }
}