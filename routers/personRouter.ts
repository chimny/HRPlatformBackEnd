import {Router} from "express";
import {PersonRecord} from "../records/person.record";
import {InsertedPersonRes} from "../types/person";


export const personRouter = Router();


personRouter





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


