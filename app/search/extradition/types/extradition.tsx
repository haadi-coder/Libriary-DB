import { Books } from "../../books/types/books";

export interface Extradition {
  id:string;
  extraditionDate:string;
  refundDate:string;
  books: Books[];
  readerId: string | null;
   reader?: {
    firstName: string;
  };
}
