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
const db_1 = require("../../../utils/db");
const mockValue_1 = require("./mockValue");
jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation(() => Promise.resolve(mockValue_1.mockValue))
        }
    };
});
describe('person object test insert', () => {
    test('should insert new record and return id', () => __awaiter(void 0, void 0, void 0, function* () {
        const person = new person_record_1.PersonRecord({ name: 'Joseph', surName: 'Draw' });
        yield person.insert();
        expect(db_1.pool.execute).toHaveBeenCalledWith("INSERT INTO `peoplelist`(`id`, `name`,`surName`) VALUES(:id, :name,:surName) ", {
            id: person.id,
            name: person.name,
            surName: person.surName
        });
    }));
});
//# sourceMappingURL=personInsert.test.js.map