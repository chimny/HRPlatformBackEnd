import {PersonRecord} from "../../records/person.record";
import {PositionList} from "../../types/personPosition";

export async function postErrorValidationPositionSalary(personId:string, position:string, salary:string):Promise<string|boolean>{
    const errors:string[] = [];
    const peopleList = await PersonRecord.listAll();
    const positionList:PositionList[]=['Assistant','Manager',"Specialist",'Junior Specialist','Trainee'];

    if( !peopleList.find(el => el.id === personId) )  {
        errors.push('person not found');
    }
    if(Number(salary)<0){
        errors.push('salary below 0')
    }
    if(isNaN(Number(salary))){
        errors.push('sent salary is not a number!')
    }
    if(!positionList.find(el => el === position)){
        errors.push('position is not on the list!')
    }

    if (errors.length===0){
        return false
    }

    const joinedErrors = errors.join(', ')

    return joinedErrors
}