export interface Comics {
  imageUrl?: string;
  title: string;
  status: ComicStatus;
  chapter: number;
  format: ComicFormat;
  readers?: string[];
  url: string;
  metadata: {
    id?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

type ComicStatus = 'reading' | 'completed' | 'planning' | 'paused';

type ComicFormat = 'manga' | 'manhwa' | 'manhua' | 'webtoon';
