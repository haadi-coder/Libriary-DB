'use client';

import { ActionIcon, Pagination, Table } from '@mantine/core';
import { IconChecks, IconEdit, IconTrash } from '@tabler/icons-react';
import classes from './ExtraditionTable.module.css';
import React, { FC } from 'react';
import { useToggle } from '@mantine/hooks';
import { usePagination } from '@/app/hooks/usePagination';
import { Extradition } from '@/app/search/extradition/types/extradition';

interface ExtraditionTableProps {
  data: Extradition[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const ExtraditionTable: FC<ExtraditionTableProps> = ({ data, withDelete, deleteRows }) => {
  const { currentItems, page, total, setPage } = usePagination<Extradition>(data);
  const [isEditable, setIsEditable] = useToggle();

  const rows = currentItems.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.book.name}</Table.Td>
      <Table.Td>{item.extraditionDate}</Table.Td>
      <Table.Td>{item.refundDate ?? '---'}</Table.Td>
      <Table.Td>
        {`${item.reader?.lastName} 
        ${item.reader?.firstName} 
        ${item.reader?.patronomic}`}
      </Table.Td>
      {withDelete && isEditable && (
        <Table.Td p={10}>
          <ActionIcon color="red" variant="subtle" onClick={() => deleteRows?.(item.id)}>
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table
      horizontalSpacing="20px"
      verticalSpacing="16px"
      highlightOnHover
      className=" mt-8 rounded-md"
      highlightOnHoverColor="#4169ee16"
      bg="#ffffff"
      withRowBorders
    >
      <Table.Thead bg="#262628">
        <Table.Tr>
          <Table.Th className="text-[16px] text-white ">Выданные книги</Table.Th>
          <Table.Th className="text-[16px] text-white ">Дата выдачи</Table.Th>
          <Table.Th className="text-[16px] text-white ">Дата возврата</Table.Th>
          <Table.Th className="text-[16px] text-white ">ФИО читателя</Table.Th>
          <Table.Th px={10} className="w-[40px]">
            <ActionIcon onClick={() => setIsEditable()} variant="subtle" color="white">
              {!isEditable ? <IconEdit /> : <IconChecks />}
            </ActionIcon>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>
        <div className="flex justify-center">
          <Pagination
            size="md"
            classNames={{ control: classes.paginationControls }}
            color="#E6D4E6"
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

export default ExtraditionTable;
