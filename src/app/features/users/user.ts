import { Comic } from '../comics/comic';

export interface User {
  username: string;
  comics: Comic[];
  account: {
    email: string;
    isEmailVerified?: boolean;
  };
  metadata: {
    id?: string;
    createdAt: Date;
  };
}
