import {Router} from "express";
import {PositionDescriptionRecord} from "../records/positionDescription/positionDescription.record";



 const positionRouter = Router();


positionRouter
    .get('/', async (req, res) => {
        res.json(
            await PositionDescriptionRecord.listAll()
        )
    })

export default positionRouter;










