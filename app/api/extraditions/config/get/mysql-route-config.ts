import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface GetMysqlRouteConfigParams {
  refundDate: string | null;
  readerId: string | null;
  bookId: string | null;
}

export const getMysqlRouteConfig = async ({
  bookId,
  readerId,
  refundDate,
}: GetMysqlRouteConfigParams) => {
  const where: Prisma.ExtraditionMWhereInput = {};

  if (refundDate) where.refundDate = refundDate;
  if (readerId) where.readerId = readerId;
  if (bookId) {
    where.book = {
      id: bookId,
    };
  }

  const extraditionsM = await prisma.extraditionM.findMany({
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

  return extraditionsM;
};
