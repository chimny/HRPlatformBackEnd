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
exports.CompletePersonWithPosition = void 0;
const error_1 = require("../../utils/error");
const db_1 = require("../../utils/db");
const personPosition_record_1 = require("../personPosition/personPosition.record");
class CompletePersonWithPosition {
    constructor(obj) {
        const { personId, name, surName, salary, position } = obj;
        if (!name || !surName) {
            throw new error_1.ValidationError('Name or Surname cannot be empty!');
        }
        if (!new personPosition_record_1.PersonPositionRecord(obj)) {
            throw new error_1.ValidationError('something went wrong providing data regarding person position data');
        }
        this.personId = personId;
        this.name = name;
        this.surName = surName;
        this.salary = salary;
        this.position = position;
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [results] = (yield db_1.pool.execute("SELECT peoplelist_positions.salary,peoplelist_positions.personId,peoplelist.name,peoplelist.surName,peoplelist_positions.position FROM `peoplelist` LEFT JOIN `peoplelist_positions` ON peoplelist_positions.personId = peoplelist.id "));
                return results.map(obj => new CompletePersonWithPosition(obj));
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.CompletePersonWithPosition = CompletePersonWithPosition;
//# sourceMappingURL=completePersonWithPosition.record.js.map