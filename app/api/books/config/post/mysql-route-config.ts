import prisma from '@/lib/prisma';

interface PostMysqlRouteConfigParams {
  name: string;
  trackingNumber: number;
  genere: string | null;
  publisher: string | null;
  publishedYear: number | null;
  pagesCount: number | null;
  publicationCount: number | null;
}

export const postMysqlRouteConfig = async ({
  name,
  publisher,
  trackingNumber,
  publishedYear,
  genere,
  pagesCount,
  publicationCount,
}: PostMysqlRouteConfigParams) => {
  const newBookM = await prisma.bookM.create({
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
