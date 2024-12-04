import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
// import { counterSlice } from './counter/counterSlice';
import { quotesApiSlice } from './quotes/quotesApiSlice';
// import { memberSlice } from './member/memberSlice';
// import { businessHoursSlice } from './businessHours/businessHoursSlice';
// import { productSlice } from './product/productSlice';
import { reservationSlice } from './reservation/reservationSlice';

import { optionSlice } from './option/optionSlice';
import { menuSlice } from './menu/menuSlice';

// `combineSlices` は、それぞれのスライスが持つ `reducerPath` を使用して
// リデューサーを自動的に結合します。そのため、`combineReducers` を
// 呼び出す必要がなくなります。
const rootReducer = combineSlices(
  // memberSlice,
  // counterSlice,
  quotesApiSlice,
  // businessHoursSlice,
  // productSlice,
  optionSlice,
  reservationSlice,
  menuSlice
);
// ルートリデューサーから `RootState` 型を推論
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` は、ストアの設定をカプセル化しており、
// サーバーサイドレンダリング（SSR）のシナリオで特に重要です。
// SSRでは、リクエストごとにユニークなストアインスタンスを作成する必要があり、
// リクエスト間の状態汚染を防ぐために必要です。
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // APIミドルウェアを追加することで、キャッシング、無効化、ポーリング、
    // そして他の `rtk-query` の便利な機能が利用できるようになります。
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false // シリアライズチェックを完全に無効化
      }).concat(quotesApiSlice.middleware);
    }
  });
};

// `makeStore` の戻り値の型を推論
export type AppStore = ReturnType<typeof makeStore>;
// ストア自体から `AppDispatch` 型を推論
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
