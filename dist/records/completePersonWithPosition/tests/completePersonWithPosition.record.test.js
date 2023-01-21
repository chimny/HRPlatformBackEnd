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
});
//# sourceMappingURL=completePersonWithPosition.record.test.js.map