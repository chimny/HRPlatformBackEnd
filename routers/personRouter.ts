import {Router} from "express";
import {PersonRecord} from "../records/person.record";
import {InsertedPersonRes} from "../types/person";


export const personRouter = Router();


personRouter

    .get('/', async (req, res) => {

        const peopleList = await PersonRecord.listAll();

        res.json({
            peopleList
        })
    })

    .get('/chosenPerson/:personID', async (req, res) => {

        const chosenPerson = await PersonRecord.getOne(req.params.personID);

        res.json({
            chosenPerson
        })
    })

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
        '/updatePerson/:personID/:personName/:personSurName', async (req, res) => {
            const {personID, personName, personSurName} = req.params;
            if (await PersonRecord.getOne(personID)) {
                const updatedPerson = await PersonRecord.updateOne(personID, personName, personSurName);
                return res.json({
                    updatedPerson
                })
            }

            return res.json({
                message: 'person has not been found'
            })


        }
    )


