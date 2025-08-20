import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getPostgresqlRouteConfig } from './config/get/postgresql-route-config';
import { getMysqlRouteConfig } from './config/get/mysql-route-config';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const schema = searchParams.get('schema') || 'postgresql';

  const firstName = searchParams.get('fn');
  const addressCity = searchParams.get('c');
  const registratedDate = searchParams.get('rd');
  const status = searchParams.get('s');
  const category = searchParams.get('cg');

  if (schema === 'postgresql') {
    const readers = await getPostgresqlRouteConfig({
      addressCity,
      category,
      firstName,
      registratedDate,
      status,
    });

    return NextResponse.json(readers, { status: 200 });
  }

  if (schema === 'mysql') {
    const readersM = await getMysqlRouteConfig({
      addressCity,
      category,
      firstName,
      registratedDate,
      status,
    });

    return NextResponse.json(readersM, { status: 200 });
  }
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
