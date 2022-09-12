export interface PersonEntity{
    id?: string ;
    name: string;
    surName: string;
}


type resStatus = 'success' | 'error'

export interface InsertedPersonRes{
    message: string;
    status: resStatus;
}