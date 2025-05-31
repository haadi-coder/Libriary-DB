'use client';

import { Button, Flex, Grid, Group, NumberInput, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import { useListState, useToggle } from '@mantine/hooks';
import axios from 'axios';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';

import { ExtraditionsFormValues } from './types/ExtraditionsFormValues';
import { useBooksFilterQuery } from '@/app/search/books/useBooksFilterQuery';
import { SelectAsync } from '@/app/components/SelectAsync';
import { DateInput } from '@mantine/dates';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';
import { useReadersFilterQuery } from '@/app/search/readers/useReadersFilterQuery';

const createExtradition = async (data: ExtraditionsFormValues) => {
  const response = await axios.post(`/api/extraditions`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateExtradition: FC = () => {
  const [selectedReader, setSelectedReader] = useState<Handbook | null>();
  const [selectedBooks, booksHandlers] = useListState<Handbook>([]);


  const form = useForm<ExtraditionsFormValues>({
    mode: 'controlled',
    initialValues: {
      extraditionDate: '',
      refundDate: '',
      books: [],
      readerId: '',
    },
    validate: {},
  });

  const handleSubmit = (formValues: ExtraditionsFormValues) => {
    createExtradition(formValues);
    setSelectedReader(null);
    form.reset();
  };
  const { data: books, filterOptions: booksFilterOptions } = useBooksFilterQuery();
  const { filterOptions: readersFilterOptions } = useReadersFilterQuery();
  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[64vh] mt-10 mx-100 p-10   bg-white rounded-lg"
    >
      <Grid>
        <Grid.Col span={12}>
           <DateInput
            className="w-full mt-5"
            label="Дата выдачи"
            placeholder="Введите дату выдачи..."
            {...form.getInputProps('extraditionDate')}
          />
          <DateInput
            className="w-full mt-5"
            label="Дата возврата"
            placeholder="Введите дату возврата..."
            {...form.getInputProps('refundDate')}
          />
        </Grid.Col>
        <Grid.Col>
          <div className="mt-5 flex items-center gap-3">
              <MultiSelectAsync
                placeholder="Выберите книги"
                className="w-full flex-7/12"
                options={booksFilterOptions.nameOptions}
                value={selectedBooks || null}
                onChange={payload => {
                    booksHandlers.setState(payload);
                const result = books
                ?.filter(item => payload.find(value => value.value === item.id))
                .map(item => ({ id: item.id }));

            form.setFieldValue('books', result || []);
                }}
              />

          </div>
          <div className="mt-5 flex items-center gap-3">
            <SelectAsync
                placeholder="Выберите читателя"
                className="w-full flex-7/12"
                options={readersFilterOptions.readerNameOptions}
                value={selectedReader || null}
                onChange={payload => {
                    setSelectedReader(payload);
                    form.setFieldValue('readerId', payload?.label || '');
                }}
            />
          </div>
        </Grid.Col>
      </Grid>

      <Flex justify="end">
        <Group className="mt-8">
          <Button variant="filled" color="black" disabled={!form.isValid()} type="submit">
            Добавить <IconPlus size={16} className="ml-3" />
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default CreateExtradition;
