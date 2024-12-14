import db from '@/app/src/firebase/client';
import { Category, CategoryState } from '@/types/category';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  Timestamp
} from 'firebase/firestore';

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null
};

// カテゴリーを取得
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Categories'));
      const categories: Category[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          createAt: data.createAt instanceof Timestamp ? data.createAt : null,
          updateAt: data.updateAt instanceof Timestamp ? data.updateAt : null
        };
      });

      dispatch(setCategories(categories));
      return categories;
    } catch (error) {
      return rejectWithValue('Failed to fetch categories');
    }
  }
);

// カテゴリーを追加
export const addCategoryAsync = createAsyncThunk(
  'categories/addCategory',
  async (
    newCategory: Omit<Category, 'id' | 'createAt' | 'updateAt'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const docRef = doc(collection(db, 'Categories'));
      const id = docRef.id;
      const timestamp = Timestamp.now();
      const categoryData = {
        id,
        ...newCategory,
        createAt: timestamp,
        updateAt: timestamp
      };

      await setDoc(docRef, categoryData);
      dispatch(fetchCategories());
      return categoryData;
    } catch (error) {
      return rejectWithValue('Failed to add category');
    }
  }
);

// カテゴリーを編集
export const editCategoryAsync = createAsyncThunk(
  'categories/editCategory',
  async (
    updatedCategory: Omit<Category, 'createAt'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { id, ...rest } = updatedCategory;
      const timestamp = Timestamp.now();

      const docRef = doc(db, 'Categories', id);
      await setDoc(docRef, { ...rest, updateAt: timestamp }, { merge: true });

      dispatch(fetchCategories());
      return { id, ...rest, updateAt: timestamp };
    } catch (error) {
      return rejectWithValue('Failed to update category');
    }
  }
);

// カテゴリーを削除
export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteDoc(doc(db, 'Categories', id));
      dispatch(fetchCategories());
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete category');
    }
  }
);

// Slice の定義
export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  },
  selectors: {
    selectCategories: (state: CategoryState) => state.categories
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { selectCategories } = categorySlice.selectors;
export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
