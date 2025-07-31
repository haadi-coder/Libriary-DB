import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface GetPostgresqlRouteConfigParams {
  publisher: string | null;
  publishedYear: string | null;
  genere: string | null;
}

export const getPostgresqlRouteConfig = async ({
  publisher,
  publishedYear,
  genere,
}: GetPostgresqlRouteConfigParams) => {
  const where: Prisma.BookWhereInput = {};

  if (publisher) where.publisher = publisher;
  if (publishedYear) where.publishedYear = parseInt(publishedYear);
  if (genere) where.genere = genere;

  const books = await prisma.book.findMany({
    where,
    orderBy: {
      id: 'desc',
    },
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

  return books;
};
