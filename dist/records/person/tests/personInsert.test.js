"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const person_record_1 = require("../person.record");
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
                }
                else {
                    return Promise.resolve(mockValue);
                }
            })
        }
    };
});
describe('person object test insert', () => {
    test('should insert new record and return id', () => __awaiter(void 0, void 0, void 0, function* () {
        const person = new person_record_1.PersonRecord({ name: 'Ludwig', surName: 'Beethoven' });
        const response = yield person.insert();
        expect(response).toEqual(person.id);
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=personInsert.test.js.map