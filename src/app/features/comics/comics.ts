export interface Comics {
  imageUrl?: string;
  title: string;
  status: string;
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

type ComicFormat = 'manga' | 'webtoon' | 'manhwa' | 'manhua'
