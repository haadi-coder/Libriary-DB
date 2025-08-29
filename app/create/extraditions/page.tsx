'use client';

import { Button, Flex, Grid, Group, Modal, Text } from '@mantine/core';
import { IconBookFilled, IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import axios from 'axios';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';
import { ExtraditionsFormValues } from './types/ExtraditionsFormValues';
import { useBooksFilterQuery } from '@/app/search/books/useBooksFilterQuery';
import { SelectAsync } from '@/app/components/SelectAsync';
import { DateInput } from '@mantine/dates';
import { useReadersFilterQuery } from '@/app/search/readers/useReadersFilterQuery';
import { CreateBook } from '../books/CreateBook';
import { useToggle } from '@mantine/hooks';
import { CurrentDbSchema, useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';
import { CreateReader } from '../reader/CreateReader';
import { NavButtons } from '@/app/components/Header/NavButtons';

const createExtradition = async (data: ExtraditionsFormValues, schema: CurrentDbSchema) => {
  const response = await axios.post(`/api/extraditions`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: { schema },
  });
  return { status: response.status, data: response.data };
};

const CreateExtradition: FC = () => {
  const { currentDbSchema } = useCurrentDbSchema();
  const [selectedReader, setSelectedReader] = useState<Handbook | null>();
  const [selectedBook, setSelectedBook] = useState<Handbook | null>(null);
  const [bookCreateOpened, toggleBookCreate] = useToggle();
  const [readerCreateOpened, toggleReaderCreate] = useToggle();

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
      const { status } = await createExtradition(formValues, currentDbSchema);

      if (status === 201 || status === 200) {
        setSelectedReader(null);
        setSelectedBook(null);
        form.reset();

        alert('Добавление выдачи произошло успешно');
      }
    } catch {
      alert('Произошла ошибка при добавлении выдачи');
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
            maxDate={new Date()}
            className="w-full mt-5"
            label="Дата выдачи"
            placeholder="Введите дату выдачи..."
            {...form.getInputProps('extraditionDate')}
          />
          <DateInput
            minDate={
              form.values.extraditionDate &&
              new Date(new Date(form.values.extraditionDate).getTime() + 86400000)
            }
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
            <Button color="black" onClick={() => toggleReaderCreate(true)}>
              Добавить читателя
            </Button>
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
              options={booksFilterOptions.nameOptions}
              value={selectedBook}
              onChange={payload => {
                setSelectedBook(payload);
                form.setFieldValue('bookId', payload?.value || '');
              }}
            />
            <Button color="black" onClick={() => toggleBookCreate(true)}>
              Добавить книгу
            </Button>
          </div>
        </Grid.Col>
      </Grid>

      <Modal
        fullScreen
        opened={bookCreateOpened}
        onClose={() => toggleBookCreate(false)}
        withCloseButton={false}
      >
        <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-[#262628] sticky top-0 z-10">
          <Group gap="14px" align="center">
            <IconBookFilled color="white" size="2.5rem" />
            <Text c="#ffffff" fw={700} fz="1.5rem">
              Library DB
            </Text>
          </Group>

          <NavButtons inModal onModalClose={() => toggleBookCreate(false)} />
        </header>

        <CreateBook />
      </Modal>

      <Modal
        fullScreen
        opened={readerCreateOpened}
        onClose={() => toggleReaderCreate(false)}
        withCloseButton={false}
      >
        <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-[#262628] sticky top-0 z-10">
          <Group gap="14px" align="center">
            <IconBookFilled color="white" size="2.5rem" />
            <Text c="#ffffff" fw={700} fz="1.5rem">
              Library DB
            </Text>
          </Group>

          <NavButtons inModal onModalClose={() => toggleReaderCreate(false)} />
        </header>

        <CreateReader />
      </Modal>

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
