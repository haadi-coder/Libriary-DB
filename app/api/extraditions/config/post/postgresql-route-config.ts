import prisma from '@/lib/prisma';

interface PostPostgresqlRouteConfigParams {
  extraditionDate: string;
  refundDate: string;
  readerId: string;
  bookId: string;
}

export const postPostgresqlRouteConfig = async ({
  bookId,
  extraditionDate,
  readerId,
  refundDate,
}: PostPostgresqlRouteConfigParams) => {
  const newextradition = await prisma.extradition.create({
    data: {
      extraditionDate: extraditionDate,
      refundDate: refundDate,
      readerId: readerId,
      bookId: bookId,
    },
  });

  return newextradition;
};
