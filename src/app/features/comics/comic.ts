import { Timestamp } from '@angular/fire/firestore';

export interface Comic {
  coverUrl?: string;
  title: string;
  format: ComicFormat;
  status: ComicStatus;
  chapter: number;
  readers?: [{ name: string; url?: string }];
  metadata: {
    urlSegment: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  };
}

type ComicStatus = 'reading' | 'completed' | 'planning' | 'paused';

type ComicFormat = 'manga' | 'manhwa' | 'manhua' | 'webtoon';
