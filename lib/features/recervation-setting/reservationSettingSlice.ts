import db from '@/app/src/firebase/client';
import {
  ReservationSetting,
  ReservationSettingState
} from '@/types/reservation-setting';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';

// 初期状態
const initialState: ReservationSettingState = {
  settings: null,
  status: 'idle',
  error: null
};

// Firestoreから予約設定を取得
export const fetchReservationSetting = createAsyncThunk(
  'reservationSetting/fetchReservationSetting',
  async (_, { rejectWithValue }) => {
    try {
      const docRef = doc(collection(db, 'ReservationSettings'), 'default');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          businessHours: data.businessHours,
          maxReservationsPerHour: data.maxReservationsPerHour,
          closedDays: data.closedDays,
          createAt: data.createAt instanceof Timestamp ? data.createAt : null,
          updateAt: data.updateAt instanceof Timestamp ? data.updateAt : null
        } as ReservationSetting;
      } else {
        return rejectWithValue('No reservation settings found.');
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch reservation settings.');
    }
  }
);

// Firestoreに予約設定を保存または更新
export const saveReservationSetting = createAsyncThunk(
  'reservationSetting/saveReservationSetting',
  async (
    settings: Omit<ReservationSetting, 'id' | 'createAt' | 'updateAt'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const docRef = doc(collection(db, 'ReservationSettings'), 'default');
      const timestamp = Timestamp.now();
      const newSettings = {
        ...settings,
        createAt: (await getDoc(docRef)).exists() ? null : timestamp,
        updateAt: timestamp
      };

      await setDoc(docRef, newSettings, { merge: true });

      // 更新後に最新データを再取得
      dispatch(fetchReservationSetting());
      return newSettings;
    } catch (error) {
      return rejectWithValue('Failed to save reservation settings.');
    }
  }
);

// Firestoreから予約設定を削除
export const deleteReservationSetting = createAsyncThunk(
  'reservationSetting/deleteReservationSetting',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const docRef = doc(collection(db, 'ReservationSettings'), 'default');
      await deleteDoc(docRef);

      // 削除後、状態を初期化
      dispatch(clearReservationSetting());
      return null;
    } catch (error) {
      return rejectWithValue('Failed to delete reservation settings.');
    }
  }
);

// Slice定義
export const reservationSettingSlice = createSlice({
  name: 'reservationSetting',
  initialState,
  reducers: {
    setReservationSetting: (state, action) => {
      state.settings = action.payload;
    },
    clearReservationSetting: (state) => {
      state.settings = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  selectors: {
    selectReservationSetting: (ReservationSetting) => ReservationSetting
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationSetting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservationSetting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.settings = action.payload;
      })
      .addCase(fetchReservationSetting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(saveReservationSetting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveReservationSetting.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(saveReservationSetting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteReservationSetting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReservationSetting.fulfilled, (state) => {
        state.status = 'succeeded';
        state.settings = null;
      })
      .addCase(deleteReservationSetting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

// Selectors
export const { setReservationSetting, clearReservationSetting } =
  reservationSettingSlice.actions;
export const selectReservationSetting = reservationSettingSlice.selectors;

export default reservationSettingSlice.reducer;
