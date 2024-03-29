import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    constructor(
        private _addClientUsecase: AddClientUsecase,
        private _findClientUsecase: FindClientUsecase
    ) {

    }

    async addClient(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
        const result = await this._addClientUsecase.execute({
            id: input.id,
            name: input.name,
            email: input.email,
            document: input.document,
            address: input.address
        })

        return {
            id: result.id,
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
            updatedAt: result.updatedAt
        }
    }
    async findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        const result = await this._findClientUsecase.execute({
            id: input.id
        })

        return {
            id: result.id,
            name: result.name,
            email: result.email,
            document: result.document,
            address: result.address,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    }

}