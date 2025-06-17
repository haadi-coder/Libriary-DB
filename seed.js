import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Массивы данных для генерации
const lastNames = [
  'Иванов',
  'Петров',
  'Сидоров',
  'Смирнов',
  'Кузнецов',
  'Попов',
  'Васильев',
  'Соколов',
  'Михайлов',
  'Новиков',
  'Федоров',
  'Морозов',
  'Волков',
  'Алексеев',
  'Лебедев',
  'Семенов',
  'Егоров',
  'Павлов',
  'Козлов',
  'Степанов',
  'Николаев',
  'Орлов',
  'Андреев',
  'Макаров',
  'Никитин',
  'Захаров',
  'Зайцев',
  'Соловьев',
  'Борисов',
  'Яковлев',
  'Григорьев',
  'Романов',
];

const firstNames = [
  'Александр',
  'Алексей',
  'Андрей',
  'Антон',
  'Артем',
  'Борис',
  'Вадим',
  'Валентин',
  'Василий',
  'Виктор',
  'Владимир',
  'Вячеслав',
  'Георгий',
  'Дмитрий',
  'Евгений',
  'Иван',
  'Игорь',
  'Максим',
  'Михаил',
  'Николай',
  'Олег',
  'Павел',
  'Петр',
  'Роман',
  'Сергей',
  'Анна',
  'Елена',
  'Мария',
  'Наталья',
  'Ольга',
  'Светлана',
  'Татьяна',
  'Юлия',
];

const bookNames = [
  'Война и мир',
  'Преступление и наказание',
  'Анна Каренина',
  'Мастер и Маргарита',
  'Евгений Онегин',
  'Мертвые души',
  'Отцы и дети',
  'Герой нашего времени',
  'Идиот',
  'Братья Карамазовы',
  'Доктор Живаго',
  'Тихий Дон',
  'Собачье сердце',
  'Белая гвардия',
  'Двенадцать стульев',
  'Золотой теленок',
  'Человек-амфибия',
  'Алые паруса',
  'Дети капитана Гранта',
  'Граф Монте-Кристо',
  'Три мушкетера',
  'Гарри Поттер и философский камень',
  'Властелин колец',
  'Хоббит',
  'Дюна',
  'Автостопом по галактике',
  '1984',
  'О дивный новый мир',
  'Над пропастью во ржи',
  'Убить пересмешника',
  'Великий Гэтсби',
  'Гордость и предубеждение',
  'Джейн Эйр',
  'Грозовой перевал',
  'Граф Дракула',
  'Франкенштейн',
  'Остров сокровищ',
  'Алиса в стране чудес',
  'Шерлок Холмс',
  'Агата Кристи',
  'Код да Винчи',
  'Основы программирования',
  'JavaScript для начинающих',
  'Python в действии',
  'Изучаем React',
  'Node.js руководство',
  'Базы данных MySQL',
  'Linux системы',
  'Веб-дизайн основы',
  'Машинное обучение',
  'Искусственный интеллект',
];

const publishers = [
  'АСТ',
  'Эксмо',
  'Росмэн',
  'Дрофа',
  'Просвещение',
  'Азбука',
  'Питер',
  'БХВ-Петербург',
  "О'Рейли",
  'Вильямс',
  'ДМК Пресс',
  'Альпина Паблишер',
];

const genres = [
  'Художественная литература',
  'Классика',
  'Детективы',
  'Фантастика',
  'Фэнтези',
  'Романы',
  'Поэзия',
  'Драматургия',
  'Техническая литература',
  'Программирование',
  'Научная литература',
  'Учебники',
  'Справочники',
  'Биографии',
  'История',
];

const streets = [
  'ул. Ленина',
  'ул. Пушкина',
  'ул. Гагарина',
  'ул. Советская',
  'ул. Мира',
  'ул. Центральная',
  'ул. Школьная',
  'ул. Садовая',
  'пр. Победы',
  'ул. Молодежная',
];

const cities = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Нижний Новгород',
  'Екатеринбург',
  'Самара',
  'Омск',
  'Челябинск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск',
  'Воронеж',
];

const statuses = ['Активный', 'Заблокирован', 'Временно отключен'];
const categories = ['Студент', 'Преподаватель', 'Пенсионер', 'Обычный читатель', 'VIP'];

// Вспомогательные функции
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function generatePhoneNumber() {
  return `+7${getRandomInt(100, 999)}${getRandomInt(100, 999)}${getRandomInt(10, 99)}${getRandomInt(
    10,
    99,
  )}`;
}

async function main() {
  console.log('Процесс удаления...');

  // Очищаем существующие данные
  await prisma.debtM.deleteMany();
  await prisma.bookM.deleteMany();
  await prisma.extraditionM.deleteMany();
  await prisma.readerM.deleteMany();

  console.log('Начало заполнения базы данных...');

  // Создание читателей (60 записей)
  console.log('Создание читателей...');
  const readers = [];
  for (let i = 0; i < 60; i++) {
    const reader = await prisma.readerM.create({
      data: {
        lastName: getRandomElement(lastNames),
        firstName: getRandomElement(firstNames),
        addressStreet: `${getRandomElement(streets)}, д. ${getRandomInt(1, 100)}`,
        adressCity: getRandomElement(cities),
        phoneNumber: generatePhoneNumber(),
        registratedDate: getRandomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
        status: getRandomElement(statuses),
        category: getRandomElement(categories),
      },
    });
    readers.push(reader);
  }

  // Создание книг (80 записей)
  console.log('Создание книг...');
  const books = [];
  for (let i = 0; i < 80; i++) {
    const book = await prisma.bookM.create({
      data: {
        name: getRandomElement(bookNames),
        trackingNumber: 1000 + i,
        publicationCount: getRandomInt(1000, 50000),
        publisher: getRandomElement(publishers),
        publishedYear: getRandomInt(1950, 2024),
        pagesCount: getRandomInt(50, 800),
        genere: getRandomElement(genres),
      },
    });
    books.push(book);
  }

  // Создание выдач (50 записей)
  console.log('Создание выдач...');
  const extraditions = [];
  const usedBooks = new Set();

  for (let i = 0; i < 50; i++) {
    // Выбираем книгу, которая еще не была выдана
    let book;
    do {
      book = getRandomElement(books);
    } while (usedBooks.has(book.id));

    usedBooks.add(book.id);

    const extraditionDate = getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31));
    const shouldHaveRefund = Math.random() > 0.3; // 70% книг возвращены

    const extradition = await prisma.extraditionM.create({
      data: {
        extraditionDate: extraditionDate,
        refundDate: shouldHaveRefund
          ? getRandomDate(new Date(extraditionDate), new Date(2025, 5, 17))
          : null,
        bookId: book.id,
        readerId: getRandomElement(readers).id,
      },
    });
    extraditions.push(extradition);
  }

  // Создание долгов (15 записей для невозвращенных книг)
  console.log('Создание долгов...');
  const overdue = extraditions.filter(ext => !ext.refundDate);

  for (let i = 0; i < Math.min(15, overdue.length); i++) {
    const extradition = overdue[i];
    const debtDate = getRandomDate(new Date(extradition.extraditionDate), new Date(2025, 5, 17));

    await prisma.debtM.create({
      data: {
        date: debtDate,
        extraditionId: extradition.id,
      },
    });
  }

  console.log('Заполнение базы данных завершено!');

  // Выводим статистику
  const readerCount = await prisma.readerM.count();
  const bookCount = await prisma.bookM.count();
  const extraditionCount = await prisma.extraditionM.count();
  const debtCount = await prisma.debtM.count();

  console.log(`Создано:`);
  console.log(`- Читателей: ${readerCount}`);
  console.log(`- Книг: ${bookCount}`);
  console.log(`- Выдач: ${extraditionCount}`);
  console.log(`- Долгов: ${debtCount}`);
  console.log(
    `Общее количество записей: ${readerCount + bookCount + extraditionCount + debtCount}`,
  );
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
