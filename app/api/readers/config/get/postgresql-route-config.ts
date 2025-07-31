import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface GetPostgresqlRouteConfigParams {
  firstName: string | null;
  addressCity: string | null;
  category: string | null;
  registratedDate: string | null;
  status: string | null;
}

export const getPostgresqlRouteConfig = async ({
  addressCity,
  category,
  firstName,
  registratedDate,
  status,
}: GetPostgresqlRouteConfigParams) => {
  const where: Prisma.ReaderWhereInput = {};

  if (firstName) where.firstName = firstName;
  if (addressCity) where.adressCity = addressCity;
  if (registratedDate) where.registratedDate = registratedDate;
  if (status) where.status = status;
  if (category) where.category = category;

  const readers = await prisma.reader.findMany({
    where,
    select: {
      id: true,
      patronomic: true,
      firstName: true,
      lastName: true,
      addressStreet: true,
      adressCity: true,
      category: true,
      phoneNumber: true,
      registratedDate: true,
      status: true,
      extraditions: true,
    },
  });

  return readers;
};
