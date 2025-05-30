export interface Book {
  id:string;
  name: string;
  trackingNumber: number;
  publicationCount: number;
  publisher: string;
  publishedYear: number;
  pagesCount: number;
  genere: string;
  extraditionId: string | null;
}
