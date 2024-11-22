import { Timestamp } from 'firebase/firestore';

// Optionデータのインターフェース
export interface Option {
  id: string;
  optionName: string;
  workingHours: number;
  description: string;
  price: number;
  createAt: Timestamp | null;
  updateAt: Timestamp | null;
}

// Reduxで使用する状態管理用のインターフェース
export interface OptionState {
  options: Option[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
