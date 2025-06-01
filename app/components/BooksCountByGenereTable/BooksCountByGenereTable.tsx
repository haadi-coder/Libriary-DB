'use client';

import { Pagination, Table } from '@mantine/core';
import classes from './BooksCountByGenereTable.module.css';

import React, { FC } from 'react';
import { usePagination } from '@/app/hooks/usePagination';

export interface BooksCountByGenere {
  genere: string;
  count: number;
}

interface BooksCountByGenereProps {
  data: BooksCountByGenere[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const BooksCountByGenereTable: FC<BooksCountByGenereProps> = ({ data }) => {
  const { currentItems, page, total, setPage } = usePagination<BooksCountByGenere>(data);

  const rows = currentItems.map(item => (
    <Table.Tr key={item.genere}>
      <Table.Td>{item.genere}</Table.Td>
      <Table.Td>{item.count}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table
      width="100%"
      horizontalSpacing="20px"
      verticalSpacing="5px"
      highlightOnHover
      className=" mt-3 rounded-md"
      highlightOnHoverColor="#4169ee16"
      bg="white"
      withRowBorders
    >
      <Table.Thead bg="#262628">
        <Table.Tr>
          <Table.Th className="text-[16px] text-white ">Жанр</Table.Th>
          <Table.Th className="text-[16px] text-white ">Количество книг</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>
        <div className="flex justify-center">
          <Pagination
            size="sm"
            classNames={{ control: classes.paginationControls }}
            total={total}
            value={page}
            onChange={setPage}
            mt="sm"
          />
        </div>
      </Table.Caption>
    </Table>
  );
};

export default BooksCountByGenereTable;