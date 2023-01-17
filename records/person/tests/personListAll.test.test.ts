
import {PersonRecord} from "../person.record";
import {mockValue} from "./mockValue";


/*
*
* It seems that the problem is that the import statement for the 'pool' object is located outside of the scope of the mocked 'pool' object. The mock implementation of the 'execute' function is only being applied to the 'pool' object within the test file, but the 'pool' object being used in the 'listAll' method is the one imported from the 'utils/db' file. To fix this, you should move the import statement for 'pool' within the mocked implementation of the 'utils/db' module, so that it references the mocked 'pool' object instead of the real one.




*
*
* */


describe('listAll', () => {
    beforeAll(() => {


        jest.mock('../../../utils/db', () => {
            return {
                pool: {
                    execute: jest.fn().mockImplementation(() => Promise.resolve( [[
                        {
                            id: '123',
                            name: 'John',
                            surName: 'Doe',
                        },
                        {
                            id: '456',
                            name: 'Jane',
                            surName: 'Doe',
                        }
                    ], []]))
                }
            };
        });

    });

    test('should return a list of all people', async () => {
        const people = await PersonRecord.listAll();
        expect(people).toEqual([
            {id: '1', name: 'John', surName: 'Doe'},
            {id: '2', name: 'Jane', surName: 'Doe'},
        ]);
    });

    afterAll(() => {
        jest.clearAllMocks()
    });
});


