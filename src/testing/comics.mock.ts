import { Comic } from '@features/comics/comic';
import { Timestamp } from '@angular/fire/firestore';

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
    metadata: {
      urlSegment: 'yaotome-x-2',
      createdAt: Timestamp.fromDate(new Date('3/8/2022, 12:00:00 AM')),
      updatedAt: Timestamp.fromDate(new Date('3/8/2022, 12:00:00 AM')),
    },
  },
  {
    coverUrl:
      'https://mangadex.org/covers/d2b02bb0-a8ec-405f-9c2d-d63df7cff785/496bd7d9-750d-461a-a7a4-f932848b2461.jpg',
    title: 'Bijutsubu Girl',
    format: 'manga',
    status: 'paused',
    chapter: 199,
    readers: [
      {
        name: 'mangadex',
        url: 'https://mangadex.org/title/d2b02bb0-a8ec-405f-9c2d-d63df7cff785/bijutsubu-girl',
      },
    ],
    metadata: {
      urlSegment: 'bijutsubu-girl',
      createdAt: Timestamp.fromDate(new Date('3/8/2022, 12:00:00 AM')),
      updatedAt: Timestamp.fromDate(new Date('3/8/2022, 12:00:00 AM')),
    },
  },
  {
    coverUrl:
      'https://mangadex.org/covers/e4631dc7-87b9-4d6a-8b3b-5594664ecc27/beea9cba-f1ff-40b5-a96e-9ab7b3eb5057.jpg',
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
    metadata: {
      urlSegment: 'fate-kaleid-liner-prisma-illya-3rei',
      createdAt: Timestamp.fromDate(new Date('3/8/2022, 12:00:00 AM')),
      updatedAt: Timestamp.fromDate(new Date('3/8/2022, 12:00:00 AM')),
    },
  },
  {
    coverUrl:
      'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx114542-3fUNOX8DqS5e.jpg',
    title: 'Haruman Nega Doego Sipeo',
    format: 'manhwa',
    status: 'reading',
    chapter: 126,
    readers: [
      {
        name: 'webtoons app',
      },
    ],
    metadata: {
      urlSegment: 'haruman-nega-doego-sipeo',
      createdAt: Timestamp.fromDate(new Date('3/10/2023, 12:00:00 AM')),
      updatedAt: Timestamp.fromDate(new Date('3/10/2023, 12:00:00 AM')),
    },
  },
  {
    coverUrl:
      'https://static.wixstatic.com/media/6abcba_17e9ad8ea2bd4ef3a88c13f04f92b2cc~mv2.jpg/v1/fill/w_480,h_694,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_7496%202_JPG.jpg',
    title: 'The Kiss Bet',
    format: 'webtoon',
    status: 'paused',
    chapter: 137,
    readers: [
      {
        name: 'webtoons app',
      },
    ],
    metadata: {
      urlSegment: 'the-kiss-bet',
      createdAt: Timestamp.fromDate(new Date('3/10/2023, 12:00:00 AM')),
      updatedAt: Timestamp.fromDate(new Date('3/10/2023, 12:00:00 AM')),
    },
  },
];
