import { Book } from '../../books/types/books';
import { Reader } from '../../readers/types/Reader';

export interface Extradition {
  id: string;
  extraditionDate: string;
  refundDate: string;
  book: Book;
  readerId: string | null;
  reader?: Reader;
}
