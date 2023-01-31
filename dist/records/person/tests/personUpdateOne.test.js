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
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("UPDATE")) {
                    if (query.id === '123') {
                        return Promise.resolve([[{ id: '123', name: params.name, surName: params.surName }], []]);
                    }
                    else {
                        return Promise.reject(new Error('Record not found'));
                    }
                }
                else {
                    return Promise.resolve(mockValue_1.mockValue);
                }
            })
        }
    };
});
describe('updateOne', () => {
    test('it should update record and return the updated record', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedRecord = { id: '123', name: 'Jacob', surName: 'Smith' };
        const response = yield person_record_1.PersonRecord.updateOne(updatedRecord.id, updatedRecord.name, updatedRecord.surName);
        expect(response).toEqual(updatedRecord);
        expect(db_1.pool.execute).toBeCalledWith("UPDATE `peoplelist` SET `surName`=:surName, `name`=:name WHERE `id`=:id", updatedRecord);
    }));
    test('it should return an error if the id does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield person_record_1.PersonRecord.updateOne('invalidId', 'Jane', 'Doe');
        }
        catch (error) {
            expect(error.message).toEqual('Record not found');
        }
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=personUpdateOne.test.js.map