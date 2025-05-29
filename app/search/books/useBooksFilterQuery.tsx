import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Books } from './types/books';

interface BooksFilterSearchParams {
  publisher: Handbook | null;
  genere: Handbook | null;

}

export const useBooksFilterQuery = (searchParams?: BooksFilterSearchParams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['books', searchParams],
    queryFn: async () => {
      const response = await axios.get<unknown, AxiosResponse<Books[]>>('/api/books', {
        params: {
          p: searchParams?.publisher?.label,
          g: searchParams?.genere?.label,
        },
      });
      return response.data;
    },
  });

  const publisherOptions: Handbook[] =
    data
      ?.map(books => ({ value: books.id, label: books.publisher }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const genereOptions: Handbook[] =
    data
       ?.map(books => ({ value: books.genere, label: books.genere }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const booksFilterOptions = {
    publisherOptions,
    genereOptions
  };

  return { data, filterOptions: booksFilterOptions, ...rest };
};