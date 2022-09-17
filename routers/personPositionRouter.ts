import {Router} from "express";
import {PersonRecord} from "../records/person.record";
import {PersonPositionRecord} from "../records/personPosition.record";
import {sendDataType} from "../types/personPosition/personUpdatedList";


export const personPositionRouter = Router();


personPositionRouter

    .get('/', async (req, res) => {

        const peopleList = await PersonRecord.listAll();
        const personPositionList = await PersonPositionRecord.listAll()
        const personPositionData: sendDataType = [];


        for (const person of peopleList) {
            personPositionList.forEach(personPosition => {
                personPosition.personId === person.id ? personPositionData.push({
                    ...personPosition,
                    name: person.name,
                    surName: person.surName
                }) : null
            })
        }

        res.json({
            personPositionData
        })
    })


    //router from person positions


    .get('/chosenPerson/:personID', async (req, res) => {

        const {personID} = req.params
        const personsPositionAndSalaryData = await PersonPositionRecord.getOne(personID);
        const chosenPerson = await PersonRecord.getOne(personID);

        const chosenPersonData = {
            ...personsPositionAndSalaryData,
            name: chosenPerson.name,
            surName: chosenPerson.surName
        }

        res.json({
            chosenPersonData
        })
    })

    /*.post('/addPerson', async (req, res) => {

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

    })*/

    .delete('/deletePerson/:personID', async (req, res) => {

        const id = req.params.personID


        if (await PersonRecord.getOne(req.params.personID)) {
            const deletedPerson = await PersonRecord.deleteOne(id)
            return res.json({
                deletedPerson
            })
        }

        return res.json({
            message: 'person has not been found'
        })


    })

    .patch(
        '/updatePerson/:personID/:personName/:personSurName/:position/:salary', async (req, res) => {
            const {personID, personName, personSurName, position, salary} = req.params;
            if (await PersonRecord.getOne(personID)) {
                const updatedPerson = await PersonRecord.updateOne(personID, personName, personSurName);
                const updatedPersonPositionData = await PersonPositionRecord.updateOne(personID, position, Number(salary))
                return res.json({
                    message: 'person has been updated!'
                })
            }

            return res.json({
                message: 'person has not been found'
            })


        }
    )



