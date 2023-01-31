// import {PersonRecord} from "../person.record";
// import {mockValue} from "./mockValue";
//
//
//
// // mock the `execute` method of the `pool` object
// jest.mock('../../../utils/db', () => {
//     return {
//         pool: {
//             execute: jest.fn().mockImplementation((query, params) => {
//                 if (params.id === '123') {
//                     return Promise.resolve([[{ id: '123', name: 'John', surName: 'Doe' }], []]);
//                 } else {
//                     return Promise.resolve([[], []]);
//                 }
//             })
//         }
//     };
// });
//
//
// describe('get one', () => {
//     test('should return single object with passed id', async () => {
//         const person = await PersonRecord.exists('123');
//         expect(person).toEqual(
//             true,
//         );
//     });
//
//     test('shoudl return false because id does not exists', async () => {
//         const people = await PersonRecord.exists('test');
//         expect(people).toEqual(
//             false,
//         );
//     });
//
//     afterEach(() => {
//         jest.clearAllMocks()
//     });
// });
//# sourceMappingURL=personExists.test.js.map