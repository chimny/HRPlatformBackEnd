import {PersonEntity} from "../types/person";
import {ValidationError} from "../utils/error";
import {v4 as uuid} from 'uuid';
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {PersonPositionEntity,PositionList} from "../types/personPosition";



//@todo - refactor peopllist position

// type PersonRecordResults = [PersonRecord[], FieldPacket[]];

export class PersonPosition implements PersonPositionEntity {

    id?: string;
    personId: string;
    position: PositionList;
    salary: number;


    constructor(obj: PersonPositionEntity) {
        if (!obj.personId || !obj.position) throw new ValidationError('Name or Surname cannot be empty!');
        if (obj.salary < 0) throw new ValidationError('Salary cannot be below 0!');


        this.id = obj.id;
        this.personId = obj.personId;
        this.position = obj.position;
        this.salary = obj.salary
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid()
        }

        await pool.execute("INSERT INTO `peoplelist_positions`(`id`, `personId`,`position`,`salary`) VALUES(:id, :personId,:position,:salary) ", {
            id: this.id,
            personId: this.personId,
            position: this.position,
            salary: this.salary
        });

        return this.id
    }

    //
    // static async listAll(): Promise<PersonRecord[]> {
    //     const [results] = (await pool.execute("SELECT * FROM `peoplelist` ORDER BY `surName` ")) as PersonRecordResults;
    //
    //     return results.map(obj => new PersonRecord(obj));
    // }
    //
    //
    // static async getOne(id: string): Promise<PersonRecord | null> {
    //
    //     const [results] = await pool.execute("SELECT * FROM `peoplelist` WHERE `id`=:id", {
    //         id
    //     }) as PersonRecordResults
    //
    //
    //     return results.length === 0 ? null : new PersonRecord(results[0]);
    //
    // }
    //
    //
    // static async deleteOne(id: string): Promise<string> {
    //
    //     await pool.execute("DELETE FROM `peoplelist` WHERE `id`=:id", {
    //         id
    //     })
    //
    //     return 'user has been deleted';
    // }
    //
    // static async updateOne(id: string, name: string, surName: string): Promise<string> {
    //
    //     await pool.execute("UPDATE `peoplelist` SET `surName`=:surName, `name`=:name WHERE `id`=:id", {
    //         name, surName, id
    //     })
    //
    //
    //     return id;
    //
    // }


}



