import {InsertedPersonRes} from "../types/person";
import {postErrorValidationPositionSalary} from "./functions/postErrorValidationPositionSalary";
import {PersonPositionRecord} from "../records/personPosition.record";
import {PositionList} from "../types/personPosition";
import {Router} from "express";
import {PersonRecord} from "../records/person.record";


export const addPersonRouter = Router();


addPersonRouter

    .post('/addPerson', async (req, res) => {

        let responseMessage: InsertedPersonRes;

        const {name, surName} = req.body;
        if (name.length > 0 && surName.length > 0) {
            const newPerson = new PersonRecord(req.body);
            await newPerson.insert();
            responseMessage = {
                message: `Person ${newPerson.name} ${newPerson.surName} has been added`,
                status: 'success'
            }

        } else {
            responseMessage = {
                message: 'name and surName can\'t be empty!',
                status: 'error'
            }
        }

        res.json(responseMessage)

    })


.post('/addPerson/:personId/:position/:salary', async (req, res) => {

    let responseMessage: InsertedPersonRes;
    const {position, salary, personId} = req.params;

    if (await postErrorValidationPositionSalary(personId, position, salary)) {
        responseMessage = {message: String(await postErrorValidationPositionSalary(personId, position, salary)),
            status:'error'};
    } else {
        const newPersonPosition = new PersonPositionRecord({
            personId: personId,
            position: position as PositionList,
            salary: Number(salary)
        });
        await newPersonPosition.insert();
        responseMessage = {
            message: `Person with id ${personId} has been added with position: ${position} and salary ${salary}`,
            status: 'success'
        }
    }

    res.json(responseMessage)

})

