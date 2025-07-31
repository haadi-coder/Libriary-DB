import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface GetMysqlRouteConfigParams {
  publisher: string | null;
  publishedYear: string | null;
  genere: string | null;
}

export const getMysqlRouteConfig = async ({
  publisher,
  publishedYear,
  genere,
}: GetMysqlRouteConfigParams) => {
  const where: Prisma.BookMWhereInput = {};

  if (publisher) where.publisher = publisher;
  if (publishedYear) where.publishedYear = parseInt(publishedYear);
  if (genere) where.genere = genere;

  const booksM = await prisma.bookM.findMany({
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

  return booksM;
};
