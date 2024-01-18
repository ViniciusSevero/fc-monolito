import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import ClientModel from "../repository/client.model";

describe("Client ADM Facade integration tests", () => {
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

    it("Should add a client using facade",  async () => {
        const facade = ClientAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "test 1",
            email: "teste@teste.com.br",
            document: "123456789",
            address: {
                street: "street",
                number: "number",
                complement: "complement",
                city: "city",
                state: "state",
                zipCode: "zipCode",
            }
        }


        await facade.addClient(input);

        const output = await facade.findClient({
            id: input.id
        })

        expect(output.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.email).toBe(input.email)
        expect(output.address).toStrictEqual(input.address)
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
    })
})