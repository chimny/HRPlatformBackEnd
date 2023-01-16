import { pool } from "../../../utils/db";
import {CompletePersonWithPosition} from "../completePersonWithPosition.record";


describe('CompletePersonWithPositionListAll', () => {
    beforeAll(() => {
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
    });

    test('listAll should return an array of complete person with position', async () => {
        const completePersonWithPositions = await CompletePersonWithPosition.listAll();
        expect(Array.isArray(completePersonWithPositions)).toBe(true);
        completePersonWithPositions.forEach(person => {
            expect(person).toHaveProperty('personId');
            expect(person).toHaveProperty('name');
            expect(person).toHaveProperty('surName');
            expect(person).toHaveProperty('salary');
            expect(person).toHaveProperty('position');
        });
    });

    afterAll(() => {
        pool.end()
    });
});
