import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {PersonPositionDataInterface} from "../types/personPositionData";
import {PositionList} from "../types/personPosition";
import {PersonPositionRecord} from "./personPosition.record";

type CompletePersonWithPositionResults = [CompletePersonWithPosition[], FieldPacket[]];

export class CompletePersonWithPosition implements PersonPositionDataInterface {
    public personId: string;
    public name: string;
    public surName: string;
    public position: PositionList | null;
    public salary: number

    constructor(obj: PersonPositionDataInterface) {

        const {personId, name, surName, salary, position} = obj

        if (!name || !surName) {
            throw new ValidationError('Name or Surname cannot be empty!')
        }

        if (!new PersonPositionRecord(obj)) {
            throw new ValidationError('something went wrong providing data regarding person position data')
        }


        this.personId = personId;
        this.name = name
        this.surName = surName;
        this.salary = salary;
        this.position = position;
    }


    static async listAll(): Promise<CompletePersonWithPosition[]> {

        const [results] = (await pool.execute("SELECT peoplelist_positions.salary,peoplelist_positions.personId,peoplelist.name,peoplelist.surName,peoplelist_positions.position FROM `peoplelist` LEFT JOIN `peoplelist_positions` ON peoplelist_positions.personId = peoplelist.id ")) as CompletePersonWithPositionResults;
        return results.map(obj => new CompletePersonWithPosition(obj));
    }


}


