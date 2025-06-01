import { useQuery } from '@tanstack/react-query';
import { BooksCountByGenere } from './components/BooksCountByGenereTable';
import { useCurrentDbSchema } from './hooks/useCurrentDbSchema';

interface Statistics {
  booksCountByGenere: BooksCountByGenere[];
  booksTotalCount: number;
  extraditionsTotalCount: number;
  readersTotalCount: number;
  debtsTotalCount: number;
}

export const useStatistics = () => {
  const { currentDbSchema } = useCurrentDbSchema();
  return useQuery<Statistics>({
    queryKey: ['statistics', currentDbSchema],
    queryFn: async () => (await fetch(`/api/statistics?schema=${currentDbSchema}`)).json(),
  });
};
