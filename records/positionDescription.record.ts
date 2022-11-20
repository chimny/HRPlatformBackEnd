import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {PositionDescriptionEntity} from "../types/positionDescription";

type PositionDescriptionRecordResults = [PositionDescriptionRecord[], FieldPacket[]];

export class PositionDescriptionRecord implements PositionDescriptionEntity {
    public id?: string;
    public position: string;
    public description: string;

    constructor(obj: PositionDescriptionEntity) {
        if (!obj.position || !obj.description) {
            throw new ValidationError('Position and description cannot be empty!')
        }

        this.id = obj.id;
        this.position = obj.description;
        this.description = obj.description
    }



    static async listAll(): Promise<PositionDescriptionRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `position_description` ORDER BY `position` ")) as PositionDescriptionRecordResults;
        return results.map(obj => new PositionDescriptionRecord(obj));
    }






}



