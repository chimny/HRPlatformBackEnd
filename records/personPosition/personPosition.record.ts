import {ValidationError} from "../../utils/error";
import {v4 as uuid} from 'uuid';
import {pool} from "../../utils/db";
import {FieldPacket} from "mysql2";
import {PersonPositionEntity,PositionList} from "../../types/personPosition";




type PersonPositionRecordResults = [PersonPositionEntity[], FieldPacket[]];

const positionList : PositionList[] = ['Assistant','Trainee','Manager','Specialist','Senior Specialist','Junior Specialist']


export class PersonPositionRecord implements PersonPositionEntity {

    id?: string;
    personId: string;
    position: PositionList;
    salary: number;


    constructor(obj: PersonPositionEntity) {
        if (!obj.personId || !obj.position) throw new ValidationError('Person ID and position must be added!');
        if (obj.salary < 0) throw new ValidationError('Salary cannot be below 0!');
        //@todo validation regarding position list
        if(!positionList.find(position => position === obj.position)) throw new ValidationError('position is not on the allowed list!');

        this.personId = obj.personId;
        this.position = obj.position;
        this.salary = obj.salary
    }


    static async listAll(): Promise<PersonPositionEntity[]> {
        const [results] = (await pool.execute("SELECT `salary`,`personId`,`position` FROM `peoplelist_positions` ")) as PersonPositionRecordResults;

        return results.map(obj => new PersonPositionRecord(obj));
    }


    static async updateOne(personId: string, position: string, salary: number): Promise<object> {

        if (!personId || !position) throw new ValidationError('Person ID and position must be added!');
        if (salary < 0) throw new ValidationError('Salary cannot be below 0!');
        if(!positionList.find(position => position === position)) throw new ValidationError('position is not on the allowed list!');


        try{
            await pool.execute("UPDATE `peoplelist_positions` SET `position`=:position, `salary`=:salary WHERE `personId`=:personId", {
                position, salary, personId
            })


            return { position, salary, personId};
        }

        catch(e) {
            throw new ValidationError(`unexpected error occurred, ${e}`)
        }


    }


    static async getOne(personId: string): Promise<PersonPositionRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `peoplelist_positions` WHERE `personId`=:personId", {
            personId
        }) as PersonPositionRecordResults


        return results.length === 0 ? null : new PersonPositionRecord(results[0]);

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




}



