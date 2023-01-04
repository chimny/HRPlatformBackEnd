export interface PersonEntity{
    id?: string ;
    name: string;
    surName: string;
}



export interface InsertedPersonRes{
    message: string;
    status: 'success' | 'error';
}