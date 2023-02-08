import {mockValue} from "./mockValue";
import {PositionDescriptionRecord} from "../positionDescription.record";


jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation(() => Promise.resolve([mockValue,[]]))
        }
    };
});

describe('position description list all', () => {
    test('it should pass array of objects with records', async () => {
        const response = await PositionDescriptionRecord.listAll();
        expect(mockValue).toEqual(response);
    });



    afterEach(() => {
        jest.clearAllMocks()
    });

});




