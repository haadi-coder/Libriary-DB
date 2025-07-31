import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Reader } from './types/Reader';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

interface ReadersFilterSearchParams {
  firstName: Handbook | null;
}

export const useReadersFilterQuery = (searchParams?: ReadersFilterSearchParams) => {
  const { currentDbSchema } = useCurrentDbSchema();
  const { data, ...rest } = useQuery({
    queryKey: ['reader', searchParams, currentDbSchema],
    queryFn: async () => {
      const response = await axios.get<unknown, AxiosResponse<Reader[]>>('/api/readers', {
        params: {
          fn: searchParams?.firstName?.value,
          schema: currentDbSchema,
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
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
      .sort((a, b) => a.label.localeCompare(b.label)) ?? [];

  const readersFilterOptions = {
    readerNameOptions,
  };

  return { data, filterOptions: readersFilterOptions, ...rest };
};
