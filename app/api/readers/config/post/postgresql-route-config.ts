import prisma from '@/lib/prisma';

interface PostPostgresqlRouteConfigParams {
  firstName: string;
  lastName: string;
  status: string;
  addressStreet: string;
  adressCity: string;
  category: string;
  phoneNumber: string;
  registratedDate: string;
}

export const postPostgresqlRouteConfig = async (data: PostPostgresqlRouteConfigParams) => {
  const newReader = await prisma.reader.create({
    data: data,
  });

  return newReader;
};
