import { Timestamp } from 'firebase/firestore';

// 予約設定情報の型定義
export interface BusinessHours {
  start: string; // 営業開始時間 (例: "09:00")
  end: string; // 営業終了時間 (例: "17:00")
}

export interface ReservationSetting {
  id: string;
  businessHours: BusinessHours;
  maxReservationsPerHour: number; // 1時間あたりの最大予約数
  closedDays: number[]; // 定休日 (0: 日曜日, 6: 土曜日)
  createAt: Timestamp | null;
  updateAt: Timestamp | null;
}

export interface ReservationSettingState {
  settings: ReservationSetting | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
