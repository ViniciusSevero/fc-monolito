import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(
        private _generateInvoiceUsecase: GenerateInvoiceUsecase,
        private _findInvoiceUsecase: FindInvoiceUsecase
    ) {

    }
    async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        const result = await this._generateInvoiceUsecase.execute({
            name: input.name,
            document: input.document,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
            items: input.items.map(i => {
                return {
                    id: i.id,
                    name: i.name,
                    price: i.price,
                }
            })
        })
        
        return {
            id: result.id,
            name: result.name,
            document: result.document,
            street: result.street,
            number: result.number,
            complement: result.complement,
            city: result.city,
            state: result.state,
            zipCode: result.zipCode,
            items: result.items.map(i => {
                return {
                    id: i.id,
                    name: i.name,
                    price: i.price,
                }
            }),
            total: result.total
        }
    }
    async findInvoice(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        const result = await this._findInvoiceUsecase.execute({
            id: input.id
        })
        
        return {
            id: result.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode
            },
            items: result.items.map(i => {
                return {
                    id: i.id,
                    name: i.name,
                    price: i.price,
                }
            }),
            total: result.total,
            createdAt: result.createdAt
        }
    }


}