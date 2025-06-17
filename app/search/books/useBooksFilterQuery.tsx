import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Book } from './types/books';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

interface BooksFilterSearchParams {
  publisher: Handbook | null;
  genere: Handbook | null;
  name?: Handbook | null;
}

export const useBooksFilterQuery = (searchParams?: BooksFilterSearchParams) => {
  const { currentDbSchema } = useCurrentDbSchema();
  const { data, ...rest } = useQuery({
    queryKey: ['books', searchParams, currentDbSchema],
    queryFn: async () => {
      const response = await axios.get<unknown, AxiosResponse<Book[]>>('/api/books', {
        params: {
          schema: currentDbSchema,
          p: searchParams?.publisher?.label,
          g: searchParams?.genere?.label,
          n: searchParams?.name?.label,
        },
      });
      return response.data;
    },
  });
  const nameOptions: Handbook[] =
    data
      ?.map(books => ({ value: books.id, label: books.name }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];
  const publisherOptions: Handbook[] =
    data
      ?.map(books => ({ value: books.id, label: books.publisher }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
      .sort((a, b) => a.label.localeCompare(b.label)) ?? [];

  const genereOptions: Handbook[] =
    data
      ?.map(books => ({ value: books.genere, label: books.genere }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
      .sort((a, b) => a.label.localeCompare(b.label)) ?? [];

  const booksFilterOptions = {
    publisherOptions,
    genereOptions,
    nameOptions,
  };

  return { data, filterOptions: booksFilterOptions, ...rest };
};
