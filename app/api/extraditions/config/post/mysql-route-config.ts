import prisma from '@/lib/prisma';

interface PostMysqlRouteConfigParams {
  extraditionDate: string;
  refundDate: string;
  readerId: string;
  bookId: string;
}

export const postMysqlRouteConfig = async ({
  bookId,
  extraditionDate,
  readerId,
  refundDate,
}: PostMysqlRouteConfigParams) => {
  const newextraditionM = await prisma.extraditionM.create({
    data: {
      extraditionDate: extraditionDate,
      refundDate: refundDate,
      readerId: readerId,
      bookId: bookId,
    },
  });

  return newextraditionM;
};
