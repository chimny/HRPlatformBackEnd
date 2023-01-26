import { PersonRecord } from "../person.record";
import { pool } from "../../../utils/db";
import { mockValue } from "./mockValue";

jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("UPDATE")) {
                    if (query.id === '123') {
                        return Promise.resolve([[{ id: '123', name: params.name, surName: params.surName }], []]);
                    } else {
                        return Promise.reject(new Error('Record not found'));
                    }
                } else {
                    return Promise.resolve(mockValue);
                }
            })
        }
    };
});

describe('updateOne', () => {
    test('it should update record and return the updated record', async () => {
        const updatedRecord = { id: '123', name: 'Jacob', surName: 'Smith' }

        const response = await PersonRecord.updateOne(updatedRecord.id, updatedRecord.name, updatedRecord.surName);
        expect(response).toEqual(updatedRecord);
        expect(pool.execute).toBeCalledWith("UPDATE `peoplelist` SET `surName`=:surName, `name`=:name WHERE `id`=:id", updatedRecord);
    });

    test('it should return an error if the id does not exist', async () => {
        try {
            await PersonRecord.updateOne('invalidId', 'Jane', 'Doe');
        } catch (error) {
            expect(error.message).toEqual('Record not found');
        }
    });

    afterEach(() => {
        jest.clearAllMocks()
    });
});