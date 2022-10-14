import {PersonRecord} from "../../records/person.record";
import {PositionList} from "../../types/personPosition";

export async function personIdPositionSalaryValidator(personId: string, position: string, salary: string): Promise<string | boolean> {
    const errors: string[] = [];
    const peopleList = await PersonRecord.listAll();
    const positionList: PositionList[] = ['Assistant', 'Manager', "Specialist", 'Junior Specialist', 'Trainee','Senior Specialist'];

    if (!peopleList.find(el => el.id === personId)) {
        errors.push('person not found')
    }

    if (Number(salary) < 0) {
        errors.push('salary below 0')
    }

    if (isNaN(Number(salary))) {
        errors.push('sent salary is not a number!')
    }

    if (!positionList.find(el => el === position)) {
        errors.push('position is not on the list!')
    }


    //if validation went successful return boolean to proceed further in post process
    if (errors.length === 0) {
        return false
    }

    //detailed errors
    return errors.join(', ');
}