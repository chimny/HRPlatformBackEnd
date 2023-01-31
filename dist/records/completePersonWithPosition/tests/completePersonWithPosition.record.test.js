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
const completePersonWithPosition_record_1 = require("../completePersonWithPosition.record");
/*
*
* It seems like you are using jest.mock to mock the db module, but the mock function for pool.execute is not returning the expected object for CompletePersonWithPosition.listAll().

The issue could be that you are not providing the correct object in the mock function for pool.execute().

For example, in the mock function, you are returning an array of arrays, which contains the people objects, and an empty array. But it is unclear what structure is expected for the return value of CompletePersonWithPosition.listAll(). You should either change the mock function to return the expected object or modify CompletePersonWithPosition.listAll() to handle the return value of pool.execute() correctly.





*
* */
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
describe('CompletePersonWithPosition', () => {
    test('should return a list of all people with their positions and salaries', () => __awaiter(void 0, void 0, void 0, function* () {
        const people = yield completePersonWithPosition_record_1.CompletePersonWithPosition.listAll();
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
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=completePersonWithPosition.record.test.js.map