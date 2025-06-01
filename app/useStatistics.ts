import { useQuery } from '@tanstack/react-query';
import { BooksCountByGenere } from './components/BooksCountByGenereTable';

interface Statistics {
  booksCountByGenere: BooksCountByGenere[];
  booksTotalCount: number;
  extraditionsTotalCount: number;
  readersTotalCount: number;
  debtsTotalCount: number;
}

export const useStatistics = () => {
  return useQuery<Statistics>({
    queryKey: ['statistics'],
    queryFn: async () => (await fetch('/api/statistics')).json(),
  });
};