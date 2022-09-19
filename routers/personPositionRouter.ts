import {Router} from "express";
import {PersonRecord} from "../records/person.record";
import {PersonPositionRecord} from "../records/personPosition.record";
import {sendDataType} from "../types/personPosition/personUpdatedList";
import {PersonPositionEntity, PositionList} from "../types/personPosition";
import {InsertedPersonRes} from "../types/person";


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

    .post('/addPerson/:personId/:position/:salary', async (req, res) => {

        let responseMessage: InsertedPersonRes;

        const {position, salary, personId} = req.params;

            //@todo review postion type
            const insertedData:any = {position, salary:Number(salary), personId}



        // if (await PersonRecord.getOne(personId)) {
            if (  insertedData.salary> 0) {
                const newPersonPosition = new PersonPositionRecord({personId:personId,position,salary:Number(salary)});
                await newPersonPosition.insert();
                responseMessage = {
                    message: `Person with id ${personId} has been added with position: ${position} and salary ${salary}`,
                    status: 'success'
                }

            }
        // }
        else {
            responseMessage = {
                message: 'unexpected error occured',
                status: 'error'
            }
        // }

        res.json(responseMessage)

    })

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
                await PersonRecord.updateOne(personID, personName, personSurName);
                await PersonPositionRecord.updateOne(personID, position, Number(salary))
                return res.json({
                    message: `person ${personID} has been updated!`
                })
            }

            return res.json({
                message: 'person has not been found'
            })


        }
    )



