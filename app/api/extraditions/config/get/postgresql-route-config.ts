import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface GetPostgresqlRouteConfigParams {
  refundDate: string | null;
  readerId: string | null;
  bookId: string | null;
}

export const getPostgresqlRouteConfig = async ({
  bookId,
  readerId,
  refundDate,
}: GetPostgresqlRouteConfigParams) => {
  const where: Prisma.ExtraditionWhereInput = {};

  if (refundDate) where.refundDate = refundDate;
  if (readerId) where.readerId = readerId;
  if (bookId) {
    where.book = {
      id: bookId,
    };
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

  return extraditions;
};
