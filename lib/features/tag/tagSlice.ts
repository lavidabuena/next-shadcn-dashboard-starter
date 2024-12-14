import db from '@/app/src/firebase/client';
import { Tag, TagState } from '@/types/tag';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  Timestamp
} from 'firebase/firestore';

const initialState: TagState = {
  tags: [],
  status: 'idle',
  error: null
};

// タグを取得
export const fetchTags = createAsyncThunk(
  'tags/fetchTags',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Tags'));
      const tags: Tag[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          createAt: data.createAt instanceof Timestamp ? data.createAt : null,
          updateAt: data.updateAt instanceof Timestamp ? data.updateAt : null
        };
      });

      dispatch(setTags(tags));
      return tags;
    } catch (error) {
      return rejectWithValue('Failed to fetch tags');
    }
  }
);

// タグを追加
export const addTagAsync = createAsyncThunk(
  'tags/addTag',
  async (
    newTag: Omit<Tag, 'id' | 'createAt' | 'updateAt'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const docRef = doc(collection(db, 'Tags'));
      const id = docRef.id;
      const timestamp = Timestamp.now();
      const tagData = {
        id,
        ...newTag,
        createAt: timestamp,
        updateAt: timestamp
      };

      await setDoc(docRef, tagData);
      dispatch(fetchTags());
      return tagData;
    } catch (error) {
      return rejectWithValue('Failed to add tag');
    }
  }
);

// タグを編集
export const editTagAsync = createAsyncThunk(
  'tags/editTag',
  async (updatedTag: Omit<Tag, 'createAt'>, { rejectWithValue, dispatch }) => {
    try {
      const { id, ...rest } = updatedTag;
      const timestamp = Timestamp.now();

      const docRef = doc(db, 'Tags', id);
      await setDoc(docRef, { ...rest, updateAt: timestamp }, { merge: true });

      dispatch(fetchTags());
      return { id, ...rest, updateAt: timestamp };
    } catch (error) {
      return rejectWithValue('Failed to update tag');
    }
  }
);

// タグを削除
export const deleteTagAsync = createAsyncThunk(
  'tags/deleteTag',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteDoc(doc(db, 'Tags', id));
      dispatch(fetchTags());
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete tag');
    }
  }
);

// Slice の定義
export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    }
  },
  selectors: {
    selectTags: (state: TagState) => state.tags
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { selectTags } = tagSlice.selectors;
export const { setTags } = tagSlice.actions;
export default tagSlice.reducer;
