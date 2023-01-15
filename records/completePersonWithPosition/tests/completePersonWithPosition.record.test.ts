import { CompletePersonWithPosition } from "../completePersonWithPosition.record";
import {completePersonWithPositionMock} from "./completePersonWithPositionMock";
import {pool} from "../../../utils/db";



//@todo pracować dalej nad testem z importowanym mock'iem

jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation(() => Promise.resolve([[
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
            ], []]))
        }
    };
});

// completePersonWithPositionMock()

describe('CompletePersonWithPosition', () => {

    beforeAll(() => {
        completePersonWithPositionMock()
    });

    test('should return a list of all people with their positions and salaries', async () => {
        const people = await CompletePersonWithPosition.listAll();
        expect(people).toEqual([
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
        ]);
    });

    afterAll(() => {
        pool.end()
    });

});
