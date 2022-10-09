import {PositionList} from "../personPosition";


export interface NewPersonPosition {
    name: string;
    surName: string;
    position: PositionList | null;
    salary: number
}