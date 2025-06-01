'use client';
import { Button, Menu } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export const NavButtons: FC = () => {
  const currentPathname = usePathname();

  return (
    <div className="flex justify-center gap-4">
      <Button
        color={currentPathname !== '/' ? '#E6D4E6' : '#09381F'}
        variant={currentPathname === '/' ? 'filled' : 'subtle'}
      >
        <Link href="/">Статистика</Link>
      </Button>

      <Menu trigger="click">
        <Menu.Target>
          <Button
            color={!currentPathname.startsWith('/search') ? '#E6D4E6' : '#09381F'}
            variant={currentPathname.startsWith('/search') ? 'filled' : 'subtle'}
          >
            Поиск
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} href="/search/books">
            По двум атрибутам
          </Menu.Item>
          <Menu.Item component={Link} href="/search/extradition">
            По одному атрибуту
          </Menu.Item>

        </Menu.Dropdown>
      </Menu>

      <Menu trigger="click">
        <Menu.Target>
          <Button
            color={!currentPathname.startsWith('/create') ? '#E6D4E6' : '#09381F'}
            variant={currentPathname.startsWith('/create') ? 'filled' : 'subtle'}
          >
            Администрирование
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} href="/create/books">
            Добавить книгу
          </Menu.Item>
          <Menu.Item component={Link} href="/create/extraditions">
            Добавить выдачу
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};