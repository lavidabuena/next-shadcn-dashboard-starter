import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface QuotesApiResponse {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}

// ベースURLと予想されるエンドポイントを使用してサービスを定義する
export const quotesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/quotes' }),
  reducerPath: 'quotesApi',
  // タグタイプはキャッシュと無効化のために使用される
  tagTypes: ['Quotes'],
  endpoints: (build) => ({
    // 戻り値の型（この場合は `QuotesApiResponse`）と
    // 予想されるクエリ引数にジェネリクスを指定する。
    // 引数がない場合は、引数の型として `void` を使用する。
    getQuotes: build.query<QuotesApiResponse, number>({
      query: (limit = 10) => `?limit=${limit}`,
      // `providesTags` は、クエリによって返されるキャッシュデータに
      // どの「タグ」が付けられるかを決定する。
      providesTags: (result, error, id) => [{ type: 'Quotes', id }]
    })
  })
});

// フックはRTK-Queryによって自動生成される
// `quotesApiSlice.endpoints.getQuotes.useQuery` と同じ
export const { useGetQuotesQuery } = quotesApiSlice;
