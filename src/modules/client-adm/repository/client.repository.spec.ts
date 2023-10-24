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
            address: "test's address"
        })

        await repository.add(client)

        const foundClient = await repository.find(client.id.id)

        expect(foundClient).toBeDefined()
        expect(foundClient.id.id).toBe(client.id.id)
        expect(foundClient.name).toBe(client.name)
        expect(foundClient.email).toBe(client.email)
        expect(foundClient.address).toBe(client.address)
        expect(foundClient.createdAt).toBeDefined()
        expect(foundClient.updatedAt).toBeDefined()
    })

})
