import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {PositionDescriptionEntity} from "../types/positionDescription";

type PositionDescriptionRecordResults = [PositionDescriptionRecord[], FieldPacket[]];

export class PositionDescriptionRecord implements PositionDescriptionEntity {
    public position: string;
    public description: string;

    constructor(obj: PositionDescriptionEntity) {
        if (!obj.position || !obj.description) {
            throw new ValidationError('Position and description cannot be empty!')
        }

        this.position = obj.position;
        this.description = obj.description
    }



    static async listAll(): Promise<PositionDescriptionRecord[]> {
        const [results] = (await pool.execute("SELECT `position`,`description`  FROM `position_description` ORDER BY `position level` ")) as PositionDescriptionRecordResults;
        return results.map(obj => new PositionDescriptionRecord(obj));
    }






}



