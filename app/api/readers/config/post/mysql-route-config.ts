import prisma from '@/lib/prisma';

interface PostMysqlRouteConfigParams {
  firstName: string;
  lastName: string;
  status: string;
  addressStreet: string;
  adressCity: string;
  category: string;
  phoneNumber: string;
  registratedDate: string;
}

export const postMysqlRouteConfig = async (data: PostMysqlRouteConfigParams) => {
  const newReaderM = await prisma.readerM.create({
    data: data,
  });

  return newReaderM;
};
