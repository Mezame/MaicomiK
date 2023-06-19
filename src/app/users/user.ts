import { Timestamp } from '@angular/fire/firestore';

export interface User {
  account: {
    username: string;
    email: string;
    isEmailVerified?: boolean;
  };
  comics: string[];
  metadata: {
    id?: string;
    createdAt: Timestamp;
  };
}
