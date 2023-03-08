import { Comic } from '@features/comics/comic';

export const comicsMock: Comic[] = [
  {
    coverUrl:
      'https://mangadex.org/covers/3c30229a-e6a3-44fa-a1ac-61a208c2ebad/fe738549-4abf-4fa3-8f63-4382ecf70364.jpg',
    title: 'Yaotome x 2',
    format: 'manga',
    status: 'reading',
    chapter: 5,
    readers: [
      {
        name: 'mangadex',
        url: 'https://mangadex.org/title/3c30229a-e6a3-44fa-a1ac-61a208c2ebad/yaotome-x-2',
      },
    ],
    url: 'yaotome-x-2',
    metadata: {
      createdAt: new Date('9/15/2022, 12:00:00 AM'),
      updatedAt: new Date('9/15/2022, 12:00:00 AM'),
    },
  },
  {
    coverUrl:
      'https://locuramangaline.com/wp-content/uploads/2022/10/Rosen-Garten-Saga-448x557.jpg',
    title: 'Rosengarten Saga',
    format: 'manga',
    status: 'paused',
    chapter: 27,
    readers: [
      {
        name: 'mangadex',
        url: 'https://mangadex.org/title/461f0cfa-cd72-4d70-bf26-a0279e0aa8fc/rosen-garten-saga',
      },
    ],
    url: 'rosengarten-saga',
    metadata: {
      createdAt: new Date('9/5/2022, 12:00:00 AM'),
      updatedAt: new Date('9/5/2022, 12:00:00 AM'),
    },
  },
  {
    coverUrl: 'https://mangadex.org/covers/e4631dc7-87b9-4d6a-8b3b-5594664ecc27/beea9cba-f1ff-40b5-a96e-9ab7b3eb5057.jpg',
    title: 'Fate/kaleid liner Prisma☆Illya 3rei!!',
    format: 'manga',
    status: 'paused',
    chapter: 70,
    readers: [
      {
        name: 'mangadex',
        url: 'https://mangadex.org/title/e4631dc7-87b9-4d6a-8b3b-5594664ecc27/fate-kaleid-liner-prisma-illya-3rei',
      },
    ],
    url: 'fate-kaleid-liner-prisma-illya-3rei',
    metadata: {
      createdAt: new Date('9/2/2022, 12:00:00 AM'),
      updatedAt: new Date('9/2/2022, 12:00:00 AM'),
    },
  },
];
