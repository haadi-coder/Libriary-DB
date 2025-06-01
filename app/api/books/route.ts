import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getPostgresqlRouteConfig } from './config/get/postgresql-route-config';
import { getMysqlRouteConfig } from './config/get/mysql-route-config';
import { postMysqlRouteConfig } from './config/post/mysql-route-config';
import { postPostgresqlRouteConfig } from './config/post/postgresql-route-config';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema') || 'postgresql';

  const publisher = searchParams.get('p');
  const publishedYear = searchParams.get('py');
  const genere = searchParams.get('g');

  const where: Prisma.BookWhereInput = {};

  if (publisher) where.publisher = publisher;
  if (publishedYear) where.publishedYear = parseInt(publishedYear);
  if (genere) where.genere = genere;

  if (schema === 'postgresql') {
    const books = await getPostgresqlRouteConfig({ publisher, genere, publishedYear });

    return NextResponse.json(books, { status: 200 });
  }

  if (schema === 'mysql') {
    const booksM = await getMysqlRouteConfig({ publisher, genere, publishedYear });

    return NextResponse.json(booksM, { status: 200 });
  }
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema') || 'postgresql';

  if (schema === 'mysql') {
    const newBook = await postMysqlRouteConfig(requestData);
    return NextResponse.json(newBook, { status: 200 });
  }

  if (schema === 'postgresql') {
    const newBook = await postPostgresqlRouteConfig(requestData);
    return NextResponse.json(newBook, { status: 200 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get('id');

  await prisma.book.delete({
    where: {
      id: id || '',
    },
  });

  return NextResponse.json({ message: 'Запись о книге была успешно удалена' }, { status: 200 });
};
