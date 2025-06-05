'use client';

import { Button, Flex, Grid, Group, NumberInput, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import axios from 'axios';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';

import { BooksFormValues } from './types/BooksFormValues';
import { useBooksFilterQuery } from '@/app/search/books/useBooksFilterQuery';
import { SelectAsync } from '@/app/components/SelectAsync';
import { CurrentDbSchema, useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

const createBook = async (data: BooksFormValues, schema: CurrentDbSchema) => {
  const response = await axios.post(`/api/books`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: { schema },
  });
  return { status: response.status, data: response.data };
};

const CreateBook: FC = () => {
  const { currentDbSchema } = useCurrentDbSchema();
  const [selectedGenere, setSelectedGenere] = useState<Handbook | null>();
  const [selectedPublisher, setSelectedPublisher] = useState<Handbook | null>();
  const [isPublisherEditable, setIsPublisherEditable] = useToggle();
  const [isGenereEditable, setIsGenereEditable] = useToggle();

  const form = useForm<BooksFormValues>({
    mode: 'controlled',
    initialValues: {
      name: '',
      trackingNumber: 0,
      genere: '',
      pagesCount: 0,
      publicationCount: 0,
      publishedYear: 2000,
      publisher: '',
    },
    validate: {},
  });

  const handleSubmit = (formValues: BooksFormValues) => {
    createBook(formValues, currentDbSchema);
    setSelectedGenere(null);
    setSelectedPublisher(null);
    form.reset();
  };
  const { filterOptions: booksFilterOptions } = useBooksFilterQuery();
  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[64vh] mt-10 mx-100 p-10   bg-white rounded-lg"
    >
      <h1 className='text-2xl font-bold mb-4'> Добавление книги</h1>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Название"
            placeholder="Введите название книги..."
            {...form.getInputProps('name')}
          />
          <NumberInput
            className="w-full mt-5"
            label="Количество страниц"
            allowNegative={false}
            placeholder="Введите количество страниц..."
            {...form.getInputProps('pagesCount')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            className="w-full"
            label="Количество публикаций в наличии"
            allowNegative={false}
            placeholder="Введите количество публикаций..."
            {...form.getInputProps('publicationCount')}
          />
          <NumberInput
            className="w-full mt-5"
            label="Год издания(с 2000 года до 2025)"
            allowNegative={false}
            min={2000}
            max={2025}
            placeholder="Введите год издания"
            {...form.getInputProps('publishedYear')}
          />
        </Grid.Col>
        <Grid.Col>
          <div className="mt-5 flex items-center gap-3">
            {isGenereEditable ? (
              <TextInput
                className="w-full flex-9/12"
                placeholder="Введите жанр"
                onChange={e => form.setFieldValue('genere', e.currentTarget.value)}
              />
            ) : (
              <SelectAsync
                placeholder="Выберите жанр"
                className="w-full flex-7/12"
                options={booksFilterOptions.genereOptions}
                value={selectedGenere || null}
                onChange={payload => {
                  setSelectedGenere(payload);
                  form.setFieldValue('genere', payload?.label || '');
                }}
              />
            )}

            <Button
              variant="filled"
              color="black"
              onClick={() => setIsGenereEditable()}
              fz={12}
              px={7}
            >
              {isGenereEditable ? 'Выбрать' : 'Добавить'}
            </Button>
          </div>
          <div className="mt-5 flex items-center gap-3">
            {isPublisherEditable ? (
              <TextInput
                className="w-full flex-9/12"
                placeholder="Введите название издателя"
                onChange={e => form.setFieldValue('publisher', e.currentTarget.value)}
              />
            ) : (
              <SelectAsync
                placeholder="Выберите издателя"
                className="w-full flex-7/12"
                options={booksFilterOptions.publisherOptions}
                value={selectedPublisher || null}
                onChange={payload => {
                  setSelectedPublisher(payload);
                  form.setFieldValue('publisher', payload?.label || '');
                }}
              />
            )}

            <Button
              variant="filled"
              color="black"
              onClick={() => setIsPublisherEditable()}
              fz={12}
              px={7}
            >
              {isPublisherEditable ? 'Выбрать' : 'Добавить'}
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

export default CreateBook;
