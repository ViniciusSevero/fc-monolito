import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe("Client Repository Unit testes", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should add and find a Client", async () => {
        const repository = new ClientRepository();

        const client = new Client({
            id: new Id("1"),
            name: "test",
            email: "test@test.com.br",
            document: "12345566789",
            address: {
                street: "street",
                number: "number",
                complement: "complement",
                city: "city",
                state: "state",
                zipCode: "zipCode"
            }
        })

        await repository.add(client)

        const foundClient = await repository.find(client.id.id)

        expect(foundClient).toBeDefined()
        expect(foundClient.id.id).toBe(client.id.id)
        expect(foundClient.name).toBe(client.name)
        expect(foundClient.email).toBe(client.email)
        expect(foundClient.address.street).toBe(client.address.street)
        expect(foundClient.address.number).toBe(client.address.number)
        expect(foundClient.address.complement).toBe(client.address.complement)
        expect(foundClient.address.city).toBe(client.address.city)
        expect(foundClient.address.state).toBe(client.address.state)
        expect(foundClient.address.zipCode).toBe(client.address.zipCode)
        expect(foundClient.createdAt).toBeDefined()
        expect(foundClient.updatedAt).toBeDefined()
    })

})
