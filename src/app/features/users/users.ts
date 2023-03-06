import { Comics } from '../comics/comics';

export interface Users {
  username: string;
  comics: Comics[];
  account: {
    email: string;
    isEmailVerified?: boolean;
  };
}
