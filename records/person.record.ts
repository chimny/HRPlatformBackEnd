import {PersonEntity} from "../types/person";
import {ValidationError} from "../utils/error";
import {v4 as uuid} from 'uuid';
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type PersonRecordResults = [PersonRecord[], FieldPacket[]];

export class PersonRecord implements PersonEntity {
    public id?: string;
    public name: string;
    public surName: string;

    constructor(obj: PersonEntity) {
        if (!obj.name || !obj.surName) {
            throw new ValidationError('Name or Surname cannot be empty!')
        }

        this.id = obj.id;
        this.name = obj.name;
        this.surName = obj.surName
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid()
        }

        await pool.execute("INSERT INTO `peoplelist`(`id`, `name`,`surName`) VALUES(:id, :name,:surName) ", {
            id: this.id,
            name: this.name,
            surName: this.surName
        });

        return this.id
    }


    static async listAll(): Promise<PersonRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `peoplelist` ORDER BY `surName` ")) as PersonRecordResults;

        return results.map(obj => new PersonRecord(obj));
    }


    static async getOne(id: string): Promise<PersonRecord | null> {

        const [results] = await pool.execute("SELECT * FROM `peoplelist` WHERE `id`=:id", {
            id
        }) as PersonRecordResults


        return results.length === 0 ? null : new PersonRecord(results[0]);

    }

    static async exists(id: string): Promise<boolean | null> {

        const results = await pool.execute("SELECT * FROM `peoplelist` WHERE `id`=:id", {
            id
        }) as PersonRecordResults


        if (results) return true

    }


    static async deleteOne(id: string): Promise<string> {

        await pool.execute("DELETE FROM `peoplelist` WHERE `id`=:id", {
            id
        })

        return 'user has been deleted';
    }

    static async updateOne(id: string, name: string, surName: string): Promise<string> {

        await pool.execute("UPDATE `peoplelist` SET `surName`=:surName, `name`=:name WHERE `id`=:id", {
            name,surName, id
        })


        return id;

    }


}



