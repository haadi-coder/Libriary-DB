export interface ExtraditionsFormValues{
  extraditionDate: string;
  refundDate : string;
  books: {id:string}[];
  readerId : string | null;
}