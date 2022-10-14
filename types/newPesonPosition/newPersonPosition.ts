import {PositionList} from "../personPosition";


export interface NewPersonPosition {
    personId:string;
    name: string;
    surName: string;
    position: PositionList | null;
    salary: number
}




