import { Timestamp } from '@angular/fire/firestore';

export interface Comic {
  coverUrl?: string | null;
  title: string;
  format: ComicFormat;
  status: ComicStatus;
  chapter: number;
  readers?: [{ name: string; url?: string | null }] | null;
  notes?: string | null;
  metadata: {
    id: string;
    urlSegment: string;
    createdAt: Timestamp | null;
    updatedAt: Timestamp | null;
  };
}

export type ComicFormat = 'manga' | 'manhwa' | 'manhua' | 'webtoon';

export type ComicStatus = 'reading' | 'completed' | 'planning' | 'paused';
