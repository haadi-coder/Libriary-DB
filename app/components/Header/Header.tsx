'use client';
import { Group, Switch, Text } from '@mantine/core';
import { IconBookFilled } from '@tabler/icons-react';
import React from 'react';
import { NavButtons } from './NavButtons';
import { useCurrentDbSchema } from '@/app/hooks/useCurrentDbSchema';

const Header = () => {
  const { currentDbSchema, setCurrentDbSchema } = useCurrentDbSchema();

  return (
    <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-[#262628] sticky top-0 z-10">
      <Group gap="14px" align="center">
        <IconBookFilled color="white" size="2.5rem" />
        <Text c="#ffffff" fw={700} fz="1.5rem">
          Library DB
        </Text>
      </Group>

      <Group>
        <Switch
          ml={50}
          size="lg"
          checked={currentDbSchema === 'postgresql'}
          color="#262628"
          onChange={e => setCurrentDbSchema(e.target.checked ? 'postgresql' : 'mysql')}
          onLabel={
            <Text p={10} fz={12}>
              Postgresql
            </Text>
          }
          offLabel={
            <Text p={10} fz={12}>
              MySql
            </Text>
          }
        />
        <NavButtons />
      </Group>
    </header>
  );
};

export default Header;
