import { Timestamp } from 'firebase/firestore';

export interface Tag {
  id: string;
  name: string;
  createAt: Timestamp | null;
  updateAt: Timestamp | null;
}

export interface TagState {
  tags: Tag[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
