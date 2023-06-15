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
exports.PositionDescriptionRecord = void 0;
const error_1 = require("../../utils/error");
const db_1 = require("../../utils/db");
const positionList_1 = require("../../utils/positionList");
class PositionDescriptionRecord {
    constructor(obj) {
        if (!obj.description) {
            throw new error_1.ValidationError('Description cannot be empty!');
        }
        if (!positionList_1.positionList.find(position => position === obj.position))
            throw new error_1.ValidationError('position is not on the allowed list!');
        this.position = obj.position;
        this.description = obj.description;
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT `position`,`description`  FROM `position_description` ORDER BY `position level` "));
            return results.map(obj => new PositionDescriptionRecord(obj));
        });
    }
}
exports.PositionDescriptionRecord = PositionDescriptionRecord;
//# sourceMappingURL=positionDescription.record.js.map