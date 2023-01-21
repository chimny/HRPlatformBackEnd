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
const express_1 = require("express");
const person_record_1 = require("../records/person/person.record");
const personPosition_record_1 = require("../records/personPosition/personPosition.record");
const completePersonWithPosition_record_1 = require("../records/completePersonWithPosition/completePersonWithPosition.record");
const personListRouter = (0, express_1.Router)();
personListRouter
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //       const peopleList = await PersonRecord.listAll();
    //       const personPositionList = await PersonPositionRecord.listAll()
    //        const personPositionCombinedData: PersonPositionDataInterface[] = [];
    //
    //        for (const person of peopleList) {
    //     personPositionList.forEach(personPosition => {
    //         personPosition.personId === person.id ? personPositionCombinedData.push({
    //             ...personPosition,
    //             name: person.name,
    //             surName: person.surName
    //         }) : null
    //     })
    // }
    //
    //       res.json({
    //           personPositionData: personPositionCombinedData
    //       })
    const personPositionCombinedData = yield completePersonWithPosition_record_1.CompletePersonWithPosition.listAll();
    res.json({
        personPositionData: personPositionCombinedData
    });
}))
    .get('/chosenPerson/:personID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personID } = req.params;
    const personsPositionAndSalaryData = yield personPosition_record_1.PersonPositionRecord.getOne(personID);
    const chosenPerson = yield person_record_1.PersonRecord.getOne(personID);
    const chosenPersonData = Object.assign(Object.assign({}, personsPositionAndSalaryData), { name: chosenPerson.name, surName: chosenPerson.surName });
    res.json({
        chosenPersonData
    });
}))
    .delete('/deletePerson/:personID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.personID;
    if (yield person_record_1.PersonRecord.getOne(req.params.personID)) {
        const deletedPerson = yield person_record_1.PersonRecord.deleteOne(id);
        return res.json({
            deletedPerson
        });
    }
    return res.json({
        message: 'person has not been found'
    });
}))
    .patch('/updatePerson/:personID/:personName/:personSurName/:position/:salary', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personID, personName, personSurName, position, salary } = req.params;
    if (yield person_record_1.PersonRecord.getOne(personID)) {
        yield person_record_1.PersonRecord.updateOne(personID, personName, personSurName);
        yield personPosition_record_1.PersonPositionRecord.updateOne(personID, position, Number(salary));
        return res.json({
            message: `person ${personID} has been updated!`
        });
    }
    return res.json({
        message: 'person has not been found'
    });
}));
exports.default = personListRouter;
//# sourceMappingURL=personListRouter.js.map