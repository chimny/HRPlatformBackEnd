import { PersonPositionRecord } from "../personPosition.record";
import { mockValue } from "./mockValue";




// mock the `execute` method of the `pool` object
jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("INSERT")) {
                    return Promise.resolve([[mockValue[0]].concat([params]), []]);
                } else {
                    return Promise.resolve(mockValue);
                }
            })
        }
    };
});

describe('insert', () => {
    test('it should insert a record and return the id', async () => {
        const newRecord = new PersonPositionRecord({
            personId: '123',
            position: 'Manager',
            salary: 50000
        });

        const response = await newRecord.insert();
        expect(response).toEqual(newRecord.id);
    });


    afterEach(() => {
        jest.clearAllMocks()
    });

});
