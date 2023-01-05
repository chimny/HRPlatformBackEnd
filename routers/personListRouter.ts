import {Router} from "express";
import {PersonRecord} from "../records/person.record";
import {PersonPositionRecord} from "../records/personPosition.record";
import {PersonPositionDataInterface} from "../types/personPositionData";


export const personListRouter = Router();


personListRouter


    .get('/', async (req, res) => {

        const peopleList = await PersonRecord.listAll();
        const personPositionList = await PersonPositionRecord.listAll()
        const personPositionCombinedData: PersonPositionDataInterface[] = [];


        /*
        * instead of looping two objects create combined record using folllowing sql query
        *
        *
        *
 SELECT peoplelist.name, peoplelist.surName, peoplelist_positions.position FROM peoplelist
LEFT JOIN peoplelist_positions
ON peoplelist_positions.personId = peoplelist.id
        *
        * */

        for (const person of peopleList) {
            personPositionList.forEach(personPosition => {
                personPosition.personId === person.id ? personPositionCombinedData.push({
                    ...personPosition,
                    name: person.name,
                    surName: person.surName
                }) : null
            })
        }

        res.json({
            personPositionData: personPositionCombinedData
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


