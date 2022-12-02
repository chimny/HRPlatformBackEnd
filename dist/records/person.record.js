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
exports.PersonRecord = void 0;
const error_1 = require("../utils/error");
const uuid_1 = require("uuid");
const db_1 = require("../utils/db");
class PersonRecord {
    constructor(obj) {
        if (!obj.name || !obj.surName) {
            throw new error_1.ValidationError('Name or Surname cannot be empty!');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.surName = obj.surName;
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = (0, uuid_1.v4)();
            }
            yield db_1.pool.execute("INSERT INTO `peoplelist`(`id`, `name`,`surName`) VALUES(:id, :name,:surName) ", {
                id: this.id,
                name: this.name,
                surName: this.surName
            });
            return this.id;
        });
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `peoplelist` ORDER BY `surName` "));
            return results.map(obj => new PersonRecord(obj));
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute("SELECT * FROM `peoplelist` WHERE `id`=:id", {
                id
            });
            return results.length === 0 ? null : new PersonRecord(results[0]);
        });
    }
    static exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.pool.execute("SELECT * FROM `peoplelist` WHERE `id`=:id", {
                id
            });
            if (results)
                return true;
        });
    }
    static deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("DELETE FROM `peoplelist` WHERE `id`=:id", {
                id
            });
            return 'user has been deleted';
        });
    }
    static updateOne(id, name, surName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("UPDATE `peoplelist` SET `surName`=:surName, `name`=:name WHERE `id`=:id", {
                name, surName, id
            });
            return id;
        });
    }
}
exports.PersonRecord = PersonRecord;
//# sourceMappingURL=person.record.js.map