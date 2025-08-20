import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { postMysqlRouteConfig } from './config/post/mysql-route-config';
import { postPostgresqlRouteConfig } from './config/post/postgresql-route-config';
import { getPostgresqlRouteConfig } from './config/get/postgresql-route-config';
import { getMysqlRouteConfig } from './config/get/mysql-route-config';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema') || 'postgresql';

  const refundDate = searchParams.get('rf');
  const bookId = searchParams.get('b');
  const readerId = searchParams.get('r');

  if (schema === 'postgresql') {
    const extraditions = await getPostgresqlRouteConfig({
      bookId,
      readerId,
      refundDate,
    });

    return NextResponse.json(extraditions, { status: 200 });
  }

  if (schema === 'mysql') {
    const extraditionsM = await getMysqlRouteConfig({
      bookId,
      readerId,
      refundDate,
    });

    return NextResponse.json(extraditionsM, { status: 200 });
  }
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema');

  if (schema === 'mysql') {
    const newBook = await postMysqlRouteConfig({
      extraditionDate: requestData.extraditionDate,
      refundDate: requestData.refundDate,
      readerId: requestData.readerId,
      bookId: requestData.bookId,
    });
    return NextResponse.json(newBook, { status: 200 });
  }

  if (schema === 'postgresql') {
    const newBook = await postPostgresqlRouteConfig({
      extraditionDate: requestData.extraditionDate,
      refundDate: requestData.refundDate,
      readerId: requestData.readerId,
      bookId: requestData.bookId,
    });
    return NextResponse.json(newBook, { status: 200 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get('id');

  await prisma.extradition.delete({
    where: {
      id: id || '',
    },
  });

  return NextResponse.json({ message: 'Запись о выдаче усешно удалена' }, { status: 200 });
};
