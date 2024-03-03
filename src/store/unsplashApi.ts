import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateHistory } from "./historySlice";
import { parseData } from "../utils/parseData";
import { EQueryParams } from "../constants";

const API_KEY = import.meta.env.VITE_REACT_APP_API_ACCESS_KEY;

export const unsplashApi = createApi({
  reducerPath: "unsplashApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.unsplash.com/" }),
  endpoints: (builder) => ({
    getPopularImgs: builder.query({
      query: () =>
        `photos/?per_page=${EQueryParams.POP_IMG_PER_PAGE}&page=1&order_by=popular&client_id=${API_KEY}`,
    }),
    getImgStats: builder.query({
      query: (id: string) => `/photos/${id}/statistics/?client_id=${API_KEY}`,
    }),
    getImgBySearch: builder.query({
      query: ({ searchTerm, page }: { searchTerm: string; page: number }) => {
        return `/search/photos/?query=${searchTerm}&page=${page}&per_page=${EQueryParams.SEARCH_RESULT_PER_PAGE}&client_id=${API_KEY}`;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, meta) => {
        if (meta.arg.page == 1) {
          currentCache.results = newItems.results;
        } else currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      onQueryStarted: async (arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const { data } = await queryFulfilled;
        dispatch(
          updateHistory({ [arg.searchTerm]: parseData(data, arg.page) })
        );
      },
    }),
  }),
});

export const {
  useGetPopularImgsQuery,
  useGetImgStatsQuery,
  useGetImgBySearchQuery,
} = unsplashApi;
