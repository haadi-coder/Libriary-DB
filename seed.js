import { bookBaseData, debts, extraditions, readers } from '@/dumb-data';

// Создаем книги с привязкой к выдачам
const books = [];
// Распределяем 30 книг по 50 выдачам
for (let i = 0; i < 50; i++) {
  const extraditionId = `clr1extradition${(i + 1).toString().padStart(3, '0')}`;
  const bookIndex = i % 30; // Используем книги по кругу

  // Копируем базовые данные книги
  const bookData = { ...bookBaseData[bookIndex] };

  // Добавляем связь с выдачей
  bookData.extraditionId = extraditionId;

  // Добавляем книгу в массив
  books.push(bookData);

  // Для первых 20 выдач добавляем еще по одной книге
  if (i < 20) {
    const secondBookIndex = (i + 1) % 30; // Следующая книга по кругу
    const secondBookData = { ...bookBaseData[secondBookIndex] };

    // Изменяем ID книги, чтобы избежать дублирования
    secondBookData.id = `clr1book${(secondBookIndex + 1).toString().padStart(3, '0')}_extra`;
    secondBookData.trackingNumber = secondBookData.trackingNumber + 1000; // Изменяем номер отслеживания

    // Добавляем связь с той же выдачей
    secondBookData.extraditionId = extraditionId;

    // Добавляем вторую книгу в массив
    books.push(secondBookData);
  }
}

// Функция для очистки данных перед загрузкой
async function cleanupDatabase(prisma) {
  console.log('Очистка базы данных перед загрузкой seed-данных...');

  // Очищаем таблицы в правильном порядке с учетом зависимостей
  // Сначала удаляем записи из таблиц, которые ссылаются на другие таблицы
  await prisma.debt.deleteMany({});

  // Удаляем записи из таблицы книг
  await prisma.book.deleteMany({});

  // Удаляем записи из таблицы выдач
  await prisma.extradition.deleteMany({});

  // Удаляем записи из таблицы читателей
  await prisma.reader.deleteMany({});

  console.log('База данных очищена.');
}

// Функция для создания seed-данных
async function main(prisma) {
  // Очищаем базу данных перед загрузкой новых данных
  await cleanupDatabase(prisma);

  console.log('Начало загрузки seed-данных...');

  // Создаем читателей
  console.log('Создание читателей...');
  await prisma.reader.createMany({
    data: readers,
  });

  // Создаем выдачи
  console.log('Создание выдач...');
  await prisma.extradition.createMany({
    data: extraditions,
  });

  // Создаем книги с уже установленными связями с выдачами
  console.log('Создание книг с привязкой к выдачам...');
  await prisma.book.createMany({
    data: books,
  });

  // Создаем долги
  console.log('Создание долгов...');
  await prisma.debt.createMany({
    data: debts,
  });

  console.log('Загрузка seed-данных завершена успешно.');
}

import { bookBaseData, readers } from '@/dumb-data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

main(prisma)
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
