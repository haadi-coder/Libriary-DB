import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const booksTotalCount = await prisma.book.count();
  const debtsTotalCount = await prisma.debt.count();
  const extraditionsTotalCount = await prisma.extradition.count();
  const readersTotalCount = await prisma.reader.count();

  const bookCountByGenere = await prisma.book.groupBy({
    by: ['genere'],
    _count: {
      _all: true,
    },
  });

  const formattedBooksCountByGenere = bookCountByGenere.map(item => ({
    genere: item.genere,
    count: item._count._all,
  })).sort((a, b) => b.count - a.count);;

  return NextResponse.json(
    {
      booksCountByGenere: formattedBooksCountByGenere,
      booksTotalCount,
      readersTotalCount,
      debtsTotalCount,
      extraditionsTotalCount

    },
    { status: 200 },
  );
};