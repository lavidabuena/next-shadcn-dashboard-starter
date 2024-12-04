import db from '@/app/src/firebase/client';
import { OptionState, Option } from '@/types/option';
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
const initialState: OptionState = {
  options: [],
  status: 'idle',
  error: null
};

// オプションの取得
export const fetchOptions = createAsyncThunk(
  'options/fetchOptions',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Options'));
      const options: Option[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          optionName: data.optionName,
          workingHours: data.workingHours,
          description: data.description,
          price: data.price,
          createAt: data.createAt instanceof Timestamp ? data.createAt : null,
          updateAt: data.updateAt instanceof Timestamp ? data.updateAt : null
        };
      });

      // Firestoreから取得したデータを Redux state に保存
      dispatch(setOptions(options));

      return options;
    } catch (error) {
      return rejectWithValue('Failed to fetch options');
    }
  }
);

// 新しいオプションの追加
export const addOptionAsync = createAsyncThunk(
  'options/addOption',
  async (
    newOption: Omit<Option, 'id' | 'createAt' | 'updateAt'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const docRef = doc(collection(db, 'Options'));
      const id = docRef.id;
      const timestamp = Timestamp.now();
      const optionData = {
        id,
        ...newOption,
        createAt: timestamp,
        updateAt: timestamp
      };

      // Firestoreにオプションを追加
      await setDoc(docRef, optionData);

      // オプション追加後に再取得
      dispatch(fetchOptions());
      return optionData;
    } catch (error) {
      return rejectWithValue('Failed to add option');
    }
  }
);

// オプションの編集
export const editOptionAsync = createAsyncThunk(
  'options/editOption',
  async (
    updatedOption: Omit<Option, 'createAt'>, // createAtは変更しないので除外
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { id, ...rest } = updatedOption;
      const timestamp = Timestamp.now();

      // Firestoreでオプションを更新
      const docRef = doc(db, 'Options', id);
      await setDoc(docRef, { ...rest, updateAt: timestamp }, { merge: true });

      // 更新後に再取得
      dispatch(fetchOptions());
      return { id, ...rest, updateAt: timestamp };
    } catch (error) {
      return rejectWithValue('Failed to update option');
    }
  }
);

// オプションの削除
export const deleteOptionAsync = createAsyncThunk(
  'options/deleteOption',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      // Firestoreからオプションを削除
      await deleteDoc(doc(db, 'Options', id));

      // 削除後に再取得
      dispatch(fetchOptions());
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete option');
    }
  }
);

// Sliceの定義
export const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    // Reduxのstateにオプションをセット
    setOptions: (state, action) => {
      state.options = action.payload;
    }
  },
  selectors: {
    selectOptions: (options) => options
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOptions.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchOptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

// セレクターとアクションのエクスポート
export const { selectOptions } = optionSlice.selectors;
export const { setOptions } = optionSlice.actions;
export default optionSlice.reducer;
