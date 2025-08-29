import { Button, Flex, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { FC } from 'react';
import { ReaderFormValues } from './types/ReaderFormValues';
import { CurrentDbSchema, useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { IconPlus } from '@tabler/icons-react';

const createReader = async (data: ReaderFormValues, schema: CurrentDbSchema) => {
  const response = await axios.post(`/api/readers`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: { schema },
  });
  return { status: response.status, data: response.data };
};

export const CreateReader: FC = () => {
  const queryClient = useQueryClient();
  const { currentDbSchema } = useCurrentDbSchema();
  const form = useForm<ReaderFormValues>({
    mode: 'controlled',
    initialValues: {
      lastName: '',
      firstName: '',
      patronomic: '',
      registratedDate: new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      phoneNumber: '',
      status: 'active',
      addressStreet: '',
      adressCity: '',
    },
  });

  const handleSubmit = async (formValues: ReaderFormValues) => {
    try {
      const { status } = await createReader(formValues, currentDbSchema);

      if (status === 201 || status || 200) {
        queryClient.invalidateQueries({ queryKey: ['reader'] });
        form.reset();

        alert('Добавление читателя произошло успешно');
      }
    } catch {
      alert('Произошла ошибка при добавлении читателя');
    }
  };

  return (
    <div className="h-[64vh] mt-10 mx-100 p-10 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4"> Добавление читателя</h1>

      <TextInput
        className="w-full"
        label="Фамилия"
        placeholder="Введите фамилию..."
        {...form.getInputProps('lastName')}
      />
      <TextInput
        className="w-full"
        label="Имя"
        placeholder="Введите имя..."
        {...form.getInputProps('firstName')}
      />
      <TextInput
        className="w-full"
        label="Отчество"
        placeholder="Введите отчество..."
        {...form.getInputProps('patronomic')}
      />
      <TextInput
        className="w-full"
        label="Номер телефона"
        placeholder="Введите телефон без +7"
        {...form.getInputProps('phoneNumber')}
      />

      <Flex justify="end">
        <Group className="mt-8">
          <Button
            variant="filled"
            color="black"
            disabled={!form.isValid()}
            onClick={() => handleSubmit(form.values)}
          >
            Добавить <IconPlus size={16} className="ml-3" />
          </Button>
        </Group>
      </Flex>
    </div>
  );
};
