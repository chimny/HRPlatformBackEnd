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
const db_1 = require("../utils/db");
class CompletePersonWithPosition {
    constructor(obj) {
        //@todo add adtional validation
        // if (!obj.name || !obj.surName) {
        //     throw new ValidationError('Name or Surname cannot be empty!')
        // }
        const { personId, name, surName, salary, position } = obj;
        this.personId = personId;
        this.name = name;
        this.surName = surName;
        this.salary = salary;
        this.position = position;
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT peoplelist_positions.salary,peoplelist_positions.personId,peoplelist.name,peoplelist.surName,peoplelist_positions.position FROM `peoplelist` LEFT JOIN `peoplelist_positions` ON peoplelist_positions.personId = peoplelist.id "));
            // const [results] = (await pool.execute("SELECT * FROM `peoplelist` ORDER BY `surName` ")) as PersonRecordResults;
            return results.map(obj => new CompletePersonWithPosition(obj));
        });
    }
}
exports.CompletePersonWithPosition = CompletePersonWithPosition;
/*
*
*         await pool.execute("UPDATE `peoplelist_positions` SET `position`=:position, `salary`=:salary WHERE `personId`=:personId", {
            position, salary, personId
        })
* */
//# sourceMappingURL=completePersonWithPosition.record.js.map