import {Router} from "express";
import {PositionDescriptionRecord} from "../records/positionDescription/positionDescription.record";



export const positionRouter = Router();


positionRouter
    .get('/', async (req, res) => {
        res.json(
            await PositionDescriptionRecord.listAll()
        )
    })










