import {CompletePersonWithPosition} from "../completePersonWithPosition.record";
import {mockValue} from "./mockValue";


jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation(() => Promise.resolve(mockValue))
        }
    };
});


describe('CompletePersonWithPositionListAll', () => {


    test('listAll should return an array of complete person with position', async () => {
        const completePersonWithPositions = await CompletePersonWithPosition.listAll();

        expect(completePersonWithPositions).toEqual([
            {
                personId: '123',
                name: 'John',
                surName: 'Doe',
                position: 'Manager',
                salary: 5000
            },
            {
                personId: '456',
                name: 'Jane',
                surName: 'Doe',
                position: 'Assistant',
                salary: 4000
            }
        ])
    });

    afterEach(() => {
        jest.clearAllMocks()
    });
});
