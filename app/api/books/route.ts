import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const publisher = searchParams.get('p');
  const publishedYear = searchParams.get('py');
  const genere = searchParams.get('g');
  const name = searchParams.get('n')

  const where: Prisma.BookWhereInput = {};

  if (publisher) where.publisher = publisher;
  if (publishedYear) where.publishedYear = parseInt(publishedYear);
  if (genere) where.genere = genere;
  if (name) where.name = name;

  const books = await prisma.book.findMany({
    where,
    select: {
      id: true,
      name: true,
      publisher: true,
      publishedYear: true,
      publicationCount: true,
      pagesCount: true,
      genere: true,
      trackingNumber: true,
    },
  });

  return NextResponse.json(books, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newBook = await prisma.book.create({
    data: {
      name: requestData.name,
      trackingNumber: requestData.trackingNumber,
      genere: requestData.genere,
      pagesCount: requestData.pagesCount,
      publicationCount: requestData.publicationCount,
      publishedYear: requestData.publishedYear,
      publisher: requestData.publisher,
    },
  });

  return NextResponse.json(newBook, { status: 200 });
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
