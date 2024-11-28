// menuSlice.ts
import db from '@/app/src/firebase/client';
import { Menu, MenuState } from '@/types/menu';
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
const initialState: MenuState = {
  menus: [],
  status: 'idle',
  error: null
};

// メニューを取得
export const fetchMenus = createAsyncThunk(
  'menus/fetchMenus',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Menus'));
      const menus: Menu[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          productName: data.productName,
          workingHours: data.workingHours,
          description: data.description,
          category: data.category,
          tags: data.tags,
          price: data.price,
          createAt: data.createAt instanceof Timestamp ? data.createAt : null,
          updateAt: data.updateAt instanceof Timestamp ? data.updateAt : null
        };
      });

      dispatch(setMenus(menus));
      return menus;
    } catch (error) {
      return rejectWithValue('Failed to fetch menus');
    }
  }
);

// Firestoreに新しいメニューを追加
export const addMenuAsync = createAsyncThunk(
  'menus/addMenu',
  async (
    newMenu: Omit<Menu, 'id' | 'createAt' | 'updateAt'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const docRef = doc(collection(db, 'Menus'));
      const id = docRef.id;
      const timestamp = Timestamp.now();
      const menuData = {
        id,
        ...newMenu,
        createAt: timestamp,
        updateAt: timestamp
      };

      await setDoc(docRef, menuData);

      dispatch(fetchMenus()); // 再取得
      return menuData;
    } catch (error) {
      return rejectWithValue('Failed to add menu');
    }
  }
);

// Firestoreのメニューを編集する
export const editMenuAsync = createAsyncThunk(
  'menus/editMenu',
  async (
    updatedMenu: Omit<Menu, 'createAt'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { id, ...rest } = updatedMenu;
      const timestamp = Timestamp.now();

      const docRef = doc(db, 'Menus', id);
      await setDoc(docRef, { ...rest, updateAt: timestamp }, { merge: true });

      dispatch(fetchMenus());

      return { id, ...rest, updateAt: timestamp };
    } catch (error) {
      return rejectWithValue('Failed to update menu');
    }
  }
);

// Firestoreからメニューを削除
export const deleteMenuAsync = createAsyncThunk(
  'menus/deleteMenu',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteDoc(doc(db, 'Menus', id));
      dispatch(fetchMenus());
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete menu');
    }
  }
);

// Slice の定義
export const menuSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.menus = action.payload;
    }
  },
  selectors: {
    selectMenus: (menus) => menus
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenus.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { selectMenus } = menuSlice.selectors;
export const { setMenus } = menuSlice.actions;
export default menuSlice.reducer;
