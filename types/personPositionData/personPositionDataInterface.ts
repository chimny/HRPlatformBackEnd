import {PositionList} from "../personPosition";


export interface PersonPositionDataInterface {
    personId:string;
    name: string;
    surName: string;
    position: PositionList | null;
    salary: number
}




