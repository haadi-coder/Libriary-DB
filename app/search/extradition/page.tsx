'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Handbook } from '@/app/types/Handbook';
import { Center, Loader, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import { useExtraditionsFilterQuery } from './useExtraditionFilterQuery';
import BooksTable from '@/app/components/BooksTable/BooksTable';
import { useExtraditionDelete } from './useExtraditionDelete';
import ExtraditionTable from '@/app/components/ExtraditionTable/ExtraditionTable';

interface SelectedFilters {
  name: Handbook | null;
}

const Extraditions: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    name: null,
  });

  const { data, filterOptions, isFetching } = useExtraditionsFilterQuery(selectedFilters);
  const { mutateAsync: deleteExtraditions, isPending } = useExtraditionDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Название книги"
              options={filterOptions.extraditionsOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, name: null }));
              }}
              value={selectedFilters.name}
              onChange={item => setSelectedFilters(prev => ({ ...prev, name: item }))}
            />
          </div>
        </div>

        {isFetching || isPending ? (
          <Center h="60vh">
            <Loader color="blue" />
          </Center>
        ) : data?.length === 0 || !data ? (
          <Center h="30vh">
            <Text fz={20}>Ничего не найдено</Text>{' '}
          </Center>
        ) : (
          <ExtraditionTable withDelete deleteRows={deleteExtraditions} data={data} />
        )}
      </div>
    </div>
  );
};

export default Extraditions;