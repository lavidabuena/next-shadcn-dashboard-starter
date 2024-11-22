import db from '@/app/src/firebase/client';
import { Reservation, ReservationState } from '@/types/reservation';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  Timestamp
} from 'firebase/firestore';

// 初期状態
const initialState: ReservationState = {
  reservations: [],
  status: 'idle',
  error: null
};

// Firestoreから予約一覧を取得
export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Reservations'));
      const reservations: Reservation[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          customerName: data.customerName,
          staffName: data.staffName,
          email: data.email,
          menu_id: data.menu_id,
          option_id: data.option_id,
          phone: data.phone,
          totalPrice: data.totalPrice,
          start: data.start instanceof Timestamp ? data.start : null,
          end: data.end instanceof Timestamp ? data.end : null,
          createAt: data.createAt instanceof Timestamp ? data.createAt : null,
          updateAt: data.updateAt instanceof Timestamp ? data.updateAt : null
        };
      });

      // データをReduxステートにセット
      dispatch(setReservations(reservations));
      return reservations;
    } catch (error) {
      return rejectWithValue('Failed to fetch reservations');
    }
  }
);

// Firestoreに新しい予約を追加
export const addReservationAsync = createAsyncThunk(
  'reservations/addReservation',
  async (
    newReservation: Omit<Reservation, 'id' | 'createAt' | 'updateAt'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const docRef = doc(collection(db, 'Reservations'));
      const id = docRef.id;
      const timestamp = Timestamp.now();
      const reservationData = {
        id,
        ...newReservation,
        createAt: timestamp,
        updateAt: timestamp
      };

      // Firestoreにデータを追加
      await setDoc(docRef, reservationData);

      // Reduxステートを更新するために再取得
      dispatch(fetchReservations());
      return reservationData;
    } catch (error) {
      return rejectWithValue('Failed to add reservation');
    }
  }
);

// Firestoreの予約データを更新
export const editReservationAsync = createAsyncThunk(
  'reservations/editReservation',
  async (
    updatedReservation: Omit<Reservation, 'createAt'>, // createAtは変更しない
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { id, ...rest } = updatedReservation;
      const timestamp = Timestamp.now();

      // Firestoreで予約データを更新
      const docRef = doc(db, 'Reservations', id);
      await setDoc(docRef, { ...rest, updateAt: timestamp }, { merge: true });

      // Reduxステートを更新するために再取得
      dispatch(fetchReservations());
      return { id, ...rest, updateAt: timestamp };
    } catch (error) {
      return rejectWithValue('Failed to update reservation');
    }
  }
);

// Firestoreから予約データを削除
export const deleteReservationAsync = createAsyncThunk(
  'reservations/deleteReservation',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      // Firestoreから削除
      await deleteDoc(doc(db, 'Reservations', id));

      // Reduxステートを更新するために再取得
      dispatch(fetchReservations());
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete reservation');
    }
  }
);

// Slice の定義
export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    }
  },
  selectors: {
    selectReservations: (reservations) => reservations
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addReservationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReservationAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addReservationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(editReservationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editReservationAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(editReservationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteReservationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReservationAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteReservationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { setReservations } = reservationSlice.actions;
export const { selectReservations } = reservationSlice.selectors;
export default reservationSlice.reducer;
