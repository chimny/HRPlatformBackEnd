import {InsertedPersonRes} from "../types/person";
import {personIdPositionSalaryValidator} from "./functions/personIdPositionSalaryValidator";
import {PersonPositionRecord} from "../records/personPosition.record";
import {Router} from "express";
import {PersonRecord} from "../records/person.record";


export const addPersonRouter = Router();


addPersonRouter
    .post('/addPerson', async (req, res) => {

        let responseMessage: InsertedPersonRes;
        const {name, surName, position, salary} = req.body;

//        Validation for person record below
        if (!name || !surName || name.length === 0 || surName.length === 0) {
            responseMessage = {
                message: 'name and surName can\'t be empty!',
                status: 'error'
            }
            res.json(responseMessage);
            return
        }

        const newPerson = new PersonRecord({name, surName});
        await newPerson.insert();
        const personId = newPerson.id

        //        Validation for proper personId, if the position is in position list and salary is set in proper form
        if (await personIdPositionSalaryValidator(personId, position, salary)) {
            responseMessage = {
                message: String(await personIdPositionSalaryValidator(personId, position, salary)),
                status: 'error'
            };
            res.json(responseMessage);
            return
        }


        const newPersonPosition = new PersonPositionRecord({personId, position, salary});
        await newPersonPosition.insert();

        responseMessage = {
            message: `Person ${name} ${surName} with id ${personId} has been added with position: ${position} and salary ${salary}`,
            status: 'success'
        }
        res.json(responseMessage)

    })



