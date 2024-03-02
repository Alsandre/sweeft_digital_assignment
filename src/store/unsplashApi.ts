import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const POP_IMG_PER_PAGE = 20;
const SEARCH_RESULT_PER_PAGE = 20;
const API_KEY = import.meta.env.VITE_REACT_APP_CLIENT_ID;

export const unsplashApi = createApi({
  reducerPath: "unsplashApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.unsplash.com/" }),
  endpoints: (builder) => ({
    getPopularImgs: builder.query({
      query: () =>
        `photos/?per_page=${POP_IMG_PER_PAGE}&page=1&order_by=popular&client_id=${API_KEY}`,
    }),
    getImgStats: builder.query({
      query: (id: string) => `/photos/${id}/statistics/?client_id=${API_KEY}`,
    }),
    getImgBySearch: builder.query({
      query: ({ searchTerm, page }: { [key: string]: string | number }) => {
        console.log("query");
        return `/search/photos/?query=${searchTerm}&page=${page}&per_page=${SEARCH_RESULT_PER_PAGE}&client_id=${API_KEY}`;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {
  useGetPopularImgsQuery,
  useGetImgStatsQuery,
  useGetImgBySearchQuery,
} = unsplashApi;
