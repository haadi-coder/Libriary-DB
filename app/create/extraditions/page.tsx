'use client';

import { Button, Flex, Grid, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import axios from 'axios';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';

import { ExtraditionsFormValues } from './types/ExtraditionsFormValues';
import { useBooksFilterQuery } from '@/app/search/books/useBooksFilterQuery';
import { SelectAsync } from '@/app/components/SelectAsync';
import { DateInput } from '@mantine/dates';
import { useReadersFilterQuery } from '@/app/search/readers/useReadersFilterQuery';
import Link from 'next/link';


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
  const [selectedBook, setSelectedBook] = useState<Handbook | null>(null);

  const form = useForm<ExtraditionsFormValues>({
    mode: 'controlled',
    initialValues: {
      extraditionDate: '',
      refundDate: '',
      bookId: '',
      readerId: '',
    },
    validate: {},
  });

  const handleSubmit = async (formValues: ExtraditionsFormValues) => {
    try {
      const { status } = await createExtradition(formValues);

      if (status === 201 || status === 200) {
        setSelectedReader(null);
        form.reset();

        alert("Добавление выдачи произошло успешно");
      }
    } catch {
      alert("Произошла ошибка при добавлении выдачи")
    }
  };
  const { filterOptions: booksFilterOptions } = useBooksFilterQuery();
  const { filterOptions: readersFilterOptions } = useReadersFilterQuery();
  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[64vh] mt-10 mx-100 p-10   bg-white rounded-lg"
    >
      <h1 className="text-2xl font-bold mb-4"> Добавление выдачи</h1>
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
          <div className="mt-5 flex items-center gap-3">
            <SelectAsync
              placeholder="Выберите читателя"
              className="w-full flex-7/12"
              options={readersFilterOptions.readerNameOptions}
              value={selectedReader || null}
              onChange={payload => {
                setSelectedReader(payload);
                form.setFieldValue('readerId', payload?.value || '');
              }}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <div className="mt-5 flex items-center gap-3">
            {/* <MultiSelectAsync
              placeholder="Выберите книги"
              className="w-full flex-7/12"
              options={booksFilterOptions.nameOptions.reverse()}
              value={selectedBooks || null}
              onChange={payload => {
                booksHandlers.setState(payload);
                const result = books
                  ?.filter(item => payload.find(value => value.value === item.id))
                  .map(item => ({ id: item.id }));

                form.setFieldValue('books', result || []);
              }}
            /> */}
            <SelectAsync
              placeholder="Выберите книги"
              className="w-full flex-7/12"
              options={booksFilterOptions.nameOptions.reverse()}
              value={selectedBook}
              onChange={payload => {
                setSelectedBook(payload);
                form.setFieldValue('bookId', payload?.value || '');
              }}
            />
            <Button color="black" component={Link} href="/create/books">
              Добавить книгу
            </Button>
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
