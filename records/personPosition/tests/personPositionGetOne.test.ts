import {PersonPositionRecord} from "../personPosition.record";
import {record} from "./mockValue";


jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (params.personId === '123') {
                    return Promise.resolve([[record], []]);
                } else {
                    return Promise.resolve([[], []]);
                }
            })
        }
    };
});


describe('personPositionGetOne', () => {
    test('it should insert a record and return the id', async () => {

        const foundRecord = await PersonPositionRecord.getOne('123')
        expect(foundRecord).toEqual(record);
    });


    test('it should return null if record wasn\'t found', async () => {

        const foundRecord = await PersonPositionRecord.getOne('ss ssss')
        expect(foundRecord).toEqual(null);
    });


    afterEach(() => {
        jest.clearAllMocks()
    });

});
