// types.ts
import { Timestamp } from 'firebase/firestore';

export interface Menu {
  id: string;
  productName: string;
  workingHours: number;
  description: string;
  tags: string[];
  price: number;
  createAt: Timestamp | null;
  updateAt: Timestamp | null;
}

export interface MenuState {
  menus: Menu[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
