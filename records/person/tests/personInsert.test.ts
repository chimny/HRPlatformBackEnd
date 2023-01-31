import {PersonRecord} from "../person.record";
// import { mockValue } from "./mockValue";



//@todo why it connects to real database!!!!!

//
// export const mockValue = [[
//     {
//         id: '123',
//         name: 'John',
//         surName: 'Doe',
//     },
//     {
//         id: '456',
//         name: 'Jane',
//         surName: 'Doe',
//     }
// ], []];
//
//
//
//
// jest.mock('../../../utils/db', () => {
//     return {
//         pool: {
//             execute: jest.fn().mockImplementation((query, params) => {
//                 if (query.includes("INSERT")) {
//                     return Promise.resolve([mockValue[0].concat([params]), []]);
//                 } else {
//                     return Promise.resolve(mockValue);
//                 }
//             })
//         }
//     };
// });
//
//
//
//
//
// describe('person object test insert', () => {
//     test('should insert new record and return id', async () => {
//         const person = new PersonRecord({name: 'Roman', surName: 'Test'});
//       const response =   await person.insert();
//         expect(response).toEqual(person.id);
//     });
//
//
//     afterEach(() => {
//         jest.clearAllMocks()
//     });
// });




const mockValue = [
    [
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
    ], []
];

jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("INSERT")) {
                    return Promise.resolve([mockValue[0].concat([params]), []]);
                } else {
                    return Promise.resolve(mockValue);
                }
            })
        }
    };
});

describe('person object test insert', () => {
    test('should insert new record and return id', async () => {
        const person = new PersonRecord({ name: 'Ludwig', surName: 'Beethoven' });
        const response = await person.insert();
        expect(response).toEqual(person.id);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
