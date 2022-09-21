import {InsertedPersonRes} from "../../types/person";
import {PersonRecord} from "../../records/person.record";
import {PositionList} from "../../types/personPosition";

export async function postValidationPositionSalary(personId:string,position:string,salary:string):Promise<InsertedPersonRes[]>{
    const errors:InsertedPersonRes[] = [];
    const peopleList = await PersonRecord.listAll();
    if( !peopleList.find(el => el.id === personId) )  {
        console.log('person not found')
        errors.push({
            message:'person not found',
            status:'error'
        })
    }
    if(Number(salary)<0){
        console.log('salary below 0')
        errors.push({message:'salary must be a number above 0!',status:'error'})
    }
    //@todo it should be from sql data list
    const positionList:PositionList[]=['Assistant','Manager',"Specialist",'Junior Specialist','Trainee']

    if(!positionList.find(el => el === position)){
        console.log('position is not on the list!')
        errors.push({message:'post position is not int the allowed list!',status:'error'})
    }


    return errors
}