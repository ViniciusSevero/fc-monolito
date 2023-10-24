import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItem from "../domain/invoice-item";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway{
    async save(model: Invoice): Promise<Invoice> {
        const invoice = await InvoiceModel.create({
            id: model.id.id,
            name: model.name,
            document: model.document,
            street: model.address.street,
            number: model.address.number,
            complement: model.address.complement,
            city: model.address.city,
            state: model.address.state,
            zipCode: model.address.zipCode,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        })

        let promises: Promise<InvoiceItem>[] = await model.items.map(async item => {
            const invoiceItemDb = await InvoiceItemModel.create({
                id: item.id.id,
                invoiceId: invoice.id,
                name: item.name,
                price: item.price,
                createdAt: model.createdAt,
                updatedAt: model.updatedAt,
            })

            return new InvoiceItem({
                id: new Id(invoiceItemDb.id),
                name: invoiceItemDb.name,
                price: invoiceItemDb.price,
                createdAt: invoiceItemDb.createdAt,
                updatedAt: invoiceItemDb.updatedAt,
            })
        });

        const items: InvoiceItem[] = await Promise.all(promises)

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
            }),
            items: items,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({where: {id: id}})
        const invoiceItems = await InvoiceItemModel.findAll({where: {invoiceId: id}})

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
            }),
            items: invoiceItems.map(item => new InvoiceItem({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });

    }
}