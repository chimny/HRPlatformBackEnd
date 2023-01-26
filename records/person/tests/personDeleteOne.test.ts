import {PersonRecord} from "../person.record";
import {pool} from "../../../utils/db";
import {mockValue} from "./mockValue";



jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("DELETE")) {
                    return Promise.resolve([mockValue[0].filter(el => el.id === params.id), []]);
                } else {
                    return Promise.resolve(mockValue);
                }
            })
        }
    };
});


describe('deleteOne', () => {
    test('it should remove record from mock and return a message', async () => {
        const response = await PersonRecord.deleteOne('123');
        expect(response).toEqual('user has been deleted');
        expect(pool.execute).toBeCalledWith("DELETE FROM `peoplelist` WHERE `id`=:id", { id: '123' });
    });

    test('it should return an error if the id does not exist', async () => {
        try {
            await PersonRecord.deleteOne('11111111');
        } catch (error) {
            expect(error.message).toEqual('Record not found');
        }
    });

    afterEach(() => {
        jest.clearAllMocks()
    });
});
