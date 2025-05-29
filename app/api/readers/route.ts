import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const addressCity = searchParams.get('c');
  const registratedDate = searchParams.get('rd');
  const status = searchParams.get('s');
  const category = searchParams.get('cg');

  const where: Prisma.ReaderWhereInput = {};

  if (addressCity) where.adressCity = addressCity;
  if (registratedDate) where.registratedDate = registratedDate;
  if (status) where.status = status;
  if (category) where.category = category;

  const readers = await prisma.reader.findMany({
    where,
    select: {
      id: true,
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

  return NextResponse.json(readers, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newReader = await prisma.reader.create({
    data: {
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      status: requestData.status,
      addressStreet: requestData.addressStreet,
      adressCity: requestData.addressCity,
      category: requestData.category,
      phoneNumber: requestData.phoneNumber,
      registratedDate: requestData.registratedDate,
    },
  });

  return NextResponse.json(newReader, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get('id');

  await prisma.reader.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Запись о читателе успешно удалена' }, { status: 200 });
};
