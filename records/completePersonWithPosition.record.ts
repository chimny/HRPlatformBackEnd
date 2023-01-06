import {PersonEntity} from "../types/person";
import {ValidationError} from "../utils/error";
import {v4 as uuid} from 'uuid';
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {PersonPositionDataInterface} from "../types/personPositionData";
import {PositionList} from "../types/personPosition";

type ComlpetePersonWithPositionResults = [CompletePersonWithPosition[], FieldPacket[]];

export class CompletePersonWithPosition implements PersonPositionDataInterface {
    public personId: string;
    public name: string;
    public surName: string;
    public position: PositionList | null;
    public salary: number

    constructor(obj: PersonPositionDataInterface) {
        //@todo add adtional validation
        // if (!obj.name || !obj.surName) {
        //     throw new ValidationError('Name or Surname cannot be empty!')
        // }

        const {personId, name, surName, salary, position} = obj
        this.personId = personId;
        this.name = name
        this.surName = surName;
        this.salary = salary;
        this.position = position;
    }


    static async listAll(): Promise<CompletePersonWithPosition[]> {



        const [results] =    (await  pool.execute( "SELECT peoplelist_positions.salary,peoplelist_positions.personId,peoplelist.name,peoplelist.surName,peoplelist_positions.position FROM `peoplelist` LEFT JOIN `peoplelist_positions` ON peoplelist_positions.personId = peoplelist.id ")) as ComlpetePersonWithPositionResults;


        // const [results] = (await pool.execute("SELECT * FROM `peoplelist` ORDER BY `surName` ")) as PersonRecordResults;

        return results.map(obj => new CompletePersonWithPosition(obj));
    }





}

/*
*
*         await pool.execute("UPDATE `peoplelist_positions` SET `position`=:position, `salary`=:salary WHERE `personId`=:personId", {
            position, salary, personId
        })
* */


