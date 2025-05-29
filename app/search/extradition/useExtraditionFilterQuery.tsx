import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Extradition } from './types/extradition';

interface ExtraditionsFilterSearchParams {
  name: Handbook | null;
}

export const useExtraditionsFilterQuery = (searchParams?: ExtraditionsFilterSearchParams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['extradition', searchParams],
    queryFn: async () => {
      const response = await axios.get<unknown, AxiosResponse<Extradition[]>>('/api/extraditions', {
        params: {
          b: searchParams?.name?.value,
        },
      });
      return response.data;
    },
  });

  const extraditionsOptions: Handbook[] =
    data
      ?.flatMap(extradition => extradition.books)
      .map(books => ({ value: books.id, label: books.name }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const extraditionsFilterOptions = {
    extraditionsOptions,
  };

  return { data, filterOptions: extraditionsFilterOptions, ...rest };
};