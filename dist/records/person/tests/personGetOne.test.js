// import {PersonRecord} from "../person.record";
// import {mockValue} from "./mockValue";
//
//
//
// // mock the `execute` method of the `pool` object
// jest.mock('../../../utils/db', () => {
//     return {
//         pool: {
//             execute: jest.fn().mockImplementation(() => Promise.resolve(mockValue))
//         }
//     };
// });
//
// describe('get one', () => {
//     test('should return single object with passed id', async () => {
//         const people = await PersonRecord.getOne('123');
//         expect(people).toEqual(
//             {id: '123', name: 'John', surName: 'Doe'},
//         );
//     });
//
//     afterEach(() => {
//         jest.clearAllMocks()
//     });
// });
//# sourceMappingURL=personGetOne.test.js.map