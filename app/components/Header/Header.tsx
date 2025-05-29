'use client';
import { Group, Switch, Text } from '@mantine/core';
import { IconBookFilled } from '@tabler/icons-react';
import React from 'react';
import { NavButtons } from './NavButtons';
import { useToggle } from '@mantine/hooks';

const Header = () => {
  const [value, toggle] = useToggle(['Postgresql', 'Mysql']);
  return (
    <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-[#09381F] sticky top-0 z-10">
      <Group gap="14px" align="center">
        <IconBookFilled color="white" size="2.5rem" />
        <Text c="#F3FFB6" fw={700} fz="1.5rem">
          Library DB
        </Text>
      </Group>

      <Group>
        <Switch
          ml={50}
          size="lg"
          checked={value === 'Postgresql'}
          color='#09381F'
          onChange={() => toggle()}
          onLabel={<Text p={10} fz={12}>Postgresql</Text>}
          offLabel={<Text p={10} fz={12}>MySql</Text>}
        />
        <NavButtons />
      </Group>
    </header>
  );
};

export default Header;