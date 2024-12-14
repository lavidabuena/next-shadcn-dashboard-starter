import { Timestamp } from 'firebase/firestore';

export interface Category {
  id: string;
  name: string;
  createAt: Timestamp | null;
  updateAt: Timestamp | null;
}

export interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
