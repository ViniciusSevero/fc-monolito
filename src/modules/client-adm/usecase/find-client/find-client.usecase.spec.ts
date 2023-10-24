import Id from "../../../@shared/domain/value-object/id.value-object"
import FindClientUsecase from "./find-client.usecase"

describe("Find client usecase Unit tests", () => {

    const mockedClient = {
        id: new Id("123"),
        name: "test",
        email: "string",
        address: "test@test.com.br",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(mockedClient))
        }
    }

    it("Should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUsecase(repository);
        
        const result = await usecase.execute({id: "123"})
        console.log(result);
        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(mockedClient.name);
        expect(result.email).toBe(mockedClient.email);
        expect(result.address).toBe(mockedClient.address);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();

    })
})