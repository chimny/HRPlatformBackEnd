import {PositionList} from "../personPosition";


export interface NewPersonPosition {
    name: string;
    surName: string;
    position: PositionList;
    salary: number
}