import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Reader } from './types/Reader';

interface ReadersFilterSearchParams {
  firstName: Handbook | null;
}

export const useReadersFilterQuery = (searchParams?: ReadersFilterSearchParams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['reader', searchParams],
    queryFn: async () => {
      const response = await axios.get<unknown, AxiosResponse<Reader[]>>('/api/readers', {
        params: {
          fn: searchParams?.firstName?.value,
        },
      });
      return response.data;
    },
  });

  const readerNameOptions: Handbook[] =
    data
      ?.map(reader => ({
        value: reader.id,
        label: `${reader.lastName} ${reader.firstName} ${reader.patronomic}`,
      }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label)) ?? [];

  const readersFilterOptions = {
    readerNameOptions,
  };

  return { data, filterOptions: readersFilterOptions, ...rest };
};
