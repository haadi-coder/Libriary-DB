'use client';

import { Button, Flex, Grid, Group, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import axios from 'axios';
import { Handbook } from '@/app/types/Handbook';
import { useForm } from '@mantine/form';

import { SelectAsync } from '@/app/components/SelectAsync';
import { CurrentDbSchema, useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';
import { useQueryClient } from '@tanstack/react-query';
import { ReadersFormValues } from './types/ReadersFormValues';
import { useReadersFilterQuery } from '@/app/search/readers/useReadersFilterQuery';
import { DateInput } from '@mantine/dates';

const createReader = async (data: ReadersFormValues, schema: CurrentDbSchema) => {
  const response = await axios.post(`/api/readers`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: { schema },
  });
  return { status: response.status, data: response.data };
};

export const CreateReader: FC = () => {
  const { currentDbSchema } = useCurrentDbSchema();
  const [selectedStatus, setSelectedStatus] = useState<Handbook | null>();
  const [isStatusEditable, setIsStatusEditable] = useToggle();
  const { filterOptions: readersFilterOptions } = useReadersFilterQuery();

  const queryClient = useQueryClient();

  const form = useForm<ReadersFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastname: '',
      patronomic: '',
      registratedDate:'',
      category:'', 
    },
    validate: {},
  });

  const handleSubmit = async (formValues: ReadersFormValues) => {
    try {
      const { status } = await createReader(formValues, currentDbSchema);

      if (status === 201 || status || 200) {
        queryClient.invalidateQueries({ queryKey: ['reader'] });
        setSelectedStatus(null);
        form.reset();
        alert('Добавление читателя произошло успешно');
      }
    } catch {
      alert('Произошла ошибка при добавлении читателя');
    }
  };

  return (
    <form
      // onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[64vh] mt-10 mx-100 p-10   bg-white rounded-lg"
    >
      <h1 className="text-2xl font-bold mb-4"> Добавление читателя</h1>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Имя"
            placeholder="Введите имя читателя..."
            {...form.getInputProps('firstName')}
          />
          <TextInput
            className="w-full mt-5"
            label="Фамилия"
            placeholder="Введите фамилию читателя..."
            {...form.getInputProps('lastname')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Отчество"
            placeholder="Введите отчество читателя..."
            {...form.getInputProps('patronomic')}
          />
          <DateInput
            className="w-full mt-5"
            label="Дата регистрации"
            placeholder="Выберите дату регистрации"
            {...form.getInputProps('registratedDate')}
          />
        </Grid.Col>
        <Grid.Col>
          <div className="mt-5 flex items-center gap-3">
            {isStatusEditable ? (
              <TextInput
                className="w-full flex-9/12"
                placeholder="Введите статус читателя"
                onChange={e => form.setFieldValue('category', e.currentTarget.value)}
              />
            ) : (
              <SelectAsync
                placeholder="Выберите статус"
                className="w-full flex-7/12"
                options={readersFilterOptions.readerCategoryOptions}
                value={selectedStatus || null}
                onChange={payload => {
                  setSelectedStatus(payload);
                  form.setFieldValue('category', payload?.label || '');
                }}
              />
            )}
            
            <Button
              variant="filled"
              color="black"
              onClick={() => setIsStatusEditable()}
              fz={12}
              px={7}
            >
              {isStatusEditable ? 'Выбрать' : 'Добавить'}
            </Button>
          </div>
        </Grid.Col>
      </Grid>

      <Flex justify="end">
        <Group className="mt-8">
          <Button variant="filled" color="black" disabled={!form.isValid()} onClick={() => handleSubmit(form.values)}>
            Добавить <IconPlus size={16} className="ml-3" />
          </Button>
        </Group>
      </Flex>
    </form>
  );
};
