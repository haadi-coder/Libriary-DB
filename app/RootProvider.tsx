'use client';

import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { useState } from 'react';
import 'dayjs/locale/ru';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const RootProvider = ({ children }) => {
  const [client] = useState(new QueryClient());

  return (
    <>
      <MantineProvider
        theme={{
          components: {
            TextInput: {
              styles: () => ({
                input: {
                  backgroundColor: 'white',
                  color: '#000',
                },
              }),
            },
            NumberInput: {
              styles: () => ({
                input: {
                  backgroundColor: 'white',
                  color: '#000',
                },
              }),
            },
            Combobox: {
              styles: () => ({
                dropdown: { backgroundColor: 'white', color: '#000' },
              }),
            },
          },
        }}
      >
        <QueryClientProvider client={client}>
          <DatesProvider settings={{ locale: 'ru' }}>
            <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
          </DatesProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
};
