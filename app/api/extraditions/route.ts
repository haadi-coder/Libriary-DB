import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { postMysqlRouteConfig } from './config/post/mysql-route-config';
import { postPostgresqlRouteConfig } from './config/post/postgresql-route-config';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const refundDate = searchParams.get('rf');
  const bookId = searchParams.get('b');
  const readerId = searchParams.get('r');

  const where: Prisma.ExtraditionWhereInput = {};

  if (refundDate) {
    where.refundDate = refundDate;
  }

  if (bookId) {
    where.book = {
      id: bookId,
    };
  }

  if (readerId) {
    where.readerId = readerId;
  }

  const extraditions = await prisma.extradition.findMany({
    orderBy: {
      id: 'desc',
    },
    where,
    select: {
      id: true,
      extraditionDate: true,
      refundDate: true,
      debt: true,
      book: true,
      reader: true,
      readerId: true,
    },
  });

  return NextResponse.json(extraditions, { status: 200 });
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
