import {PositionList} from "./positionList";

export interface PersonPositionEntity {
    id?: string;
    personId: string;
    position: PositionList;
    salary: number;
}

