import { Timestamp } from 'firebase/firestore';

// Reservationデータのインターフェース
export interface Reservation {
  id: string;
  customerName: string;
  staffName: string;
  email: string;
  menu_id: string;
  option_id: string[]; // OptionのIDの配列
  phone: string;
  totalPrice: number;
  start: Timestamp | null;
  end: Timestamp | null;
  createAt: Timestamp | null;
  updateAt: Timestamp | null;
}

export interface Reservationlist {
  staffName: string;
  start: Timestamp | null;
  end: Timestamp | null;
}

// Reduxで使用するReservationの状態管理用のインターフェース
export interface ReservationState {
  reservations: Reservation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
