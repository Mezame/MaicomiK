import { Timestamp } from '@angular/fire/firestore';

export interface Comic {
  coverUrl?: string;
  title: string;
  format: ComicFormat;
  status: ComicStatus;
  chapter: number;
  readers?: [{ name: string; url?: string }];
  notes?: string;
  metadata: {
    id: string;
    urlSegment: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  };
}

export type ComicFormat = 'manga' | 'manhwa' | 'manhua' | 'webtoon';

export type ComicStatus = 'reading' | 'completed' | 'planning' | 'paused';
