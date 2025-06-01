import prisma from '@/lib/prisma';

interface PostPostgresqlRouteConfigParams {
  name: string;
  trackingNumber: number;
  genere: string | null;
  publisher: string | null;
  publishedYear: number | null;
  pagesCount: number | null;
  publicationCount: number | null;
}

export const postPostgresqlRouteConfig = async ({
  name,
  publisher,
  trackingNumber,
  publishedYear,
  genere,
  pagesCount,
  publicationCount,
}: PostPostgresqlRouteConfigParams) => {
  const newBookM = await prisma.book.create({
    data: {
      name: name,
      trackingNumber: trackingNumber,
      genere: genere,
      pagesCount: pagesCount,
      publicationCount: publicationCount,
      publishedYear: publishedYear,
      publisher: publisher,
    },
  });

  return newBookM;
};
