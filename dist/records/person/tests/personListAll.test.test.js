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
// describe('listAll', () => {
//     test('should return a list of all people', async () => {
//         const people = await PersonRecord.listAll();
//         expect(people).toEqual([
//             {id: '123', name: 'John', surName: 'Doe'},
//             {id: '456', name: 'Jane', surName: 'Doe'},
//         ]);
//     });
//
//     afterEach(() => {
//         jest.clearAllMocks()
//     });
// });
//# sourceMappingURL=personListAll.test.test.js.map