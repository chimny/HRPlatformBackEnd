import {ValidationError} from "../../utils/error";
import {pool} from "../../utils/db";
import {FieldPacket} from "mysql2";
import {PositionDescriptionEntity} from "../../types/positionDescription";
import {PositionList} from "../../types/personPosition";
import {positionList} from "../../utils/positionList";

type PositionDescriptionRecordResults = [PositionDescriptionRecord[], FieldPacket[]];

export class PositionDescriptionRecord implements PositionDescriptionEntity {
    public position: PositionList;
    public description: string;

    constructor(obj: PositionDescriptionEntity) {
        if (!obj.description) {
            throw new ValidationError('Description cannot be empty!')
        }

        if(!positionList.find(position => position === obj.position)) throw new ValidationError('position is not on the allowed list!');


        this.position = obj.position;
        this.description = obj.description
    }



    static async listAll(): Promise<PositionDescriptionRecord[]> {
        const [results] = (await pool.execute("SELECT `position`,`description`  FROM `position_description` ORDER BY `position level` ")) as PositionDescriptionRecordResults;
        return results.map(obj => new PositionDescriptionRecord(obj));
    }






}



