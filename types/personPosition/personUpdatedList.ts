import {PositionList} from "./positionList";

export interface PersonUpdatedList {
    name: string;
    surName: string;
    personId: string;
    position: PositionList;
    salary: number
}

export type sendDataType = PersonUpdatedList[];