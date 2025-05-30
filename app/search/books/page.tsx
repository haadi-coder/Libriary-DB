'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Handbook } from '@/app/types/Handbook';
import { Center, Loader, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import { useBooksFilterQuery } from './useBooksFilterQuery';
import BooksTable from '@/app/components/BooksTable/BooksTable';
import { useBooksDelete } from './useBooksDelete';

interface SelectedFilters {
  publisher: Handbook | null;
  genere: Handbook | null;
}

const Books: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    publisher: null,
    genere: null,
  });

  const { data, filterOptions, isFetching } = useBooksFilterQuery(selectedFilters);
  const { mutateAsync: deleteBooks, isPending } = useBooksDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Издатель"
              options={filterOptions.publisherOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, publisher: null }));
              }}
              value={selectedFilters.publisher}
              onChange={item => setSelectedFilters(prev => ({ ...prev, publisher: item }))}
            />

            <SelectAsync
              className="w-full"
              placeholder="Жанр"
              options={filterOptions.genereOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, genere: null }));
              }}
              value={selectedFilters.genere}
              onChange={async item => {
                setSelectedFilters(prev => ({ ...prev, genere: item }));
              }}
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
          <BooksTable withDelete deleteRows={deleteBooks} data={data} />
        )}
      </div>
    </div>
  );
};

export default Books;
