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
exports.PersonPositionRecord = void 0;
const error_1 = require("../../utils/error");
const uuid_1 = require("uuid");
const db_1 = require("../../utils/db");
const positionList_1 = require("../../utils/positionList");
class PersonPositionRecord {
    constructor(obj) {
        if (!obj.personId || !obj.position)
            throw new error_1.ValidationError('Person ID and position must be added!');
        if (obj.salary < 0)
            throw new error_1.ValidationError('Salary cannot be below 0!');
        //@todo validation regarding position list
        if (!positionList_1.positionList.find(position => position === obj.position))
            throw new error_1.ValidationError('position is not on the allowed list!');
        this.personId = obj.personId;
        this.position = obj.position;
        this.salary = obj.salary;
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT `salary`,`personId`,`position` FROM `peoplelist_positions` "));
            return results.map(obj => new PersonPositionRecord(obj));
        });
    }
    static updateOne(personId, position, salary) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!personId || !position)
                throw new error_1.ValidationError('Person ID and position must be added!');
            if (salary < 0)
                throw new error_1.ValidationError('Salary cannot be below 0!');
            if (!positionList_1.positionList.find(position => position === position))
                throw new error_1.ValidationError('position is not on the allowed list!');
            try {
                yield db_1.pool.execute("UPDATE `peoplelist_positions` SET `position`=:position, `salary`=:salary WHERE `personId`=:personId", {
                    position, salary, personId
                });
                return { position, salary, personId };
            }
            catch (e) {
                throw new error_1.ValidationError(`unexpected error occurred, ${e}`);
            }
        });
    }
    static getOne(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute("SELECT * FROM `peoplelist_positions` WHERE `personId`=:personId", {
                personId
            });
            return results.length === 0 ? null : new PersonPositionRecord(results[0]);
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = (0, uuid_1.v4)();
            }
            yield db_1.pool.execute("INSERT INTO `peoplelist_positions`(`id`, `personId`,`position`,`salary`) VALUES(:id, :personId,:position,:salary) ", {
                id: this.id,
                personId: this.personId,
                position: this.position,
                salary: this.salary
            });
            return this.id;
        });
    }
}
exports.PersonPositionRecord = PersonPositionRecord;
//# sourceMappingURL=personPosition.record.js.map