import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const extraditionId = searchParams.get('eId');
  const date = searchParams.get('d');

  const where: Prisma.DebtWhereInput = {};

  if (extraditionId) where.extraditionId = extraditionId;
  if (date) where.date = date;

  const debts = await prisma.debt.findMany({
    where,
    select: {
      id: true,
      date: true,
      extradition: true,
    },
  });

  return NextResponse.json(debts, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newDebt = await prisma.debt.create({
    data: {
      date: requestData.date,
      extradition: requestData.extraditionId
        ? { connect: { id: requestData.extraditionId } }
        : { create: { extraditionDate: requestData.extradition.extraditionDate } },
    },
  });

  return NextResponse.json(newDebt, { status: 200 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get('id');

  await prisma.debt.delete({
    where: { id: id || '' },
  });

  return NextResponse.json(
    { message: 'Запись о задолжности была успешно удалена' },
    { status: 200 },
  );
};
