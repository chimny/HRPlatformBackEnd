
import {NewPersonPosition} from "../newPesonPosition";

export interface PersonUpdatedList extends NewPersonPosition{
    personId: string;
}

export type sendDataType = PersonUpdatedList[];