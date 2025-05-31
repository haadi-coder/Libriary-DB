import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

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
    where.books = {
      some: {
        id: bookId,
      },
    };
  }

  if (readerId) {
    where.readerId = readerId;
  }

  const extraditions = await prisma.extradition.findMany({
    where,
    select: {
      id: true,
      extraditionDate: true,
      refundDate: true,
      debt: true,
      books: true,
      reader: true,
      readerId: true,
    },
  });

  return NextResponse.json(extraditions, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newExtradition = await prisma.extradition.create({
    data: {
      extraditionDate: requestData.extraditionDate,
      refundDate: requestData.refundDate,
      readerId: requestData.readerId,
      books: {connect: requestData.books},
    },
  });

  return NextResponse.json(newExtradition, { status: 200 });
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
