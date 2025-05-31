'use client';
import { Box, Center, Flex, Loader, Text } from '@mantine/core';
import { useStatistics } from './useStatistics';
import {
  IconBookDownload,
  IconBooks,
  IconBookUpload,
  IconManFilled,
  
} from '@tabler/icons-react';
import BooksCountByGenereTable from './components/BooksCountByGenereTable/BooksCountByGenereTable';

export default function Home() {
  const { data: statistics, isFetching } = useStatistics();

  return (
    <main className="mx-20">
      <div className="flex gap-10  mt-10">

        <Box className="w-full px-10 py-6 bg-white rounded-xl h-fit">
          <Text fw="bold" fz={18}>
            Количество книг по жанрам
          </Text>
          {isFetching ? (
            <Center h="20vh">
              <Loader color="black" />
            </Center>
          ) : (
            <BooksCountByGenereTable data={statistics?.booksCountByGenere || []} />
          )}
        </Box>
      </div>

      <Flex mt={40} justify="space-around">
        <Box className="p-5 bg-white  rounded-xl">
          <Flex gap={30} align="center">
            <Text fw={700} fz={24}>
              Всего книг
            </Text>
            <IconBooks color="#262628" size={32} />
          </Flex>

          {isFetching ? (
            <Center h="20vh">
              <Loader color="black" />
            </Center>
          ) : (
            <Text c="black" fw={700} fz={34}>
              {statistics?.booksTotalCount} шт.
            </Text>
          )}
        </Box>

        <Box className="p-5 bg-white  rounded-xl">
          <Flex gap={30} align="center">
            <Text fw={700} fz={24}>
              Всего выдач
            </Text>
            <IconBookUpload color="#262628" size={32} />
          </Flex>

          {isFetching ? (
            <Center h="20vh">
              <Loader color="black" />
            </Center>
          ) : (
            <Text c="black" fw={700} fz={34}>
              {statistics?.extraditionsTotalCount} шт.
            </Text>
          )}
        </Box>

        <Box className="p-5 bg-white  rounded-xl">
          <Flex gap={30} align="center">
            <Text fw={700} fz={24}>
              Всего задолженностей
            </Text>
            <IconBookDownload color="#262628" size={32} />
          </Flex>

          {isFetching ? (
            <Center h="20vh">
              <Loader color="black" />
            </Center>
          ) : (
            <Text c="black" fw={700} fz={34}>
              {statistics?.debtsTotalCount} шт.
            </Text>
          )}
        </Box>

        <Box className="p-5 bg-white  rounded-xl">
          <Flex gap={30} align="center">
            <Text fw={700} fz={24}>
              Всего читателей
            </Text>
            <IconManFilled color="#262628" size={32} />
          </Flex>

          {isFetching ? (
            <Center h="20vh">
              <Loader color="black" />
            </Center>
          ) : (
            <Text c="black" fw={700} fz={34}>
              {statistics?.readersTotalCount} шт.
            </Text>
          )}
        </Box>
      </Flex>
    </main>
  );
}