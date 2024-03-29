import {Router} from "express";
import {PersonRecord} from "../records/person/person.record";
import {PersonPositionRecord} from "../records/personPosition/personPosition.record";
import {PersonPositionDataInterface} from "../types/personPositionData";
import {CompletePersonWithPosition} from "../records/completePersonWithPosition/completePersonWithPosition.record";


 const personListRouter = Router();


personListRouter


    .get('/', async (req, res) => {

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


    const personPositionCombinedData: PersonPositionDataInterface[] =  await CompletePersonWithPosition.listAll();

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

export default personListRouter;

