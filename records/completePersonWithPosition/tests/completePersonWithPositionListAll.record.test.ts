import {CompletePersonWithPosition} from "../completePersonWithPosition.record";
import {mockValue} from "./mockValue";


jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation(() => Promise.resolve([mockValue,[]]))
        }
    };
});



describe('CompletePersonWithPositionListAll', () => {


    test('listAll should return an array of complete person with position', async () => {
        const completePersonWithPositions = await CompletePersonWithPosition.listAll();
        expect(completePersonWithPositions).toEqual(mockValue)

    });


    afterEach(() => {
        jest.clearAllMocks()
    });
});
