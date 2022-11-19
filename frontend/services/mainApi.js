import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import domain from "../domain";

const baseUrl = domain;

const createRequest = (url) => ({
  url,
  headers: { "Content-Type": "application/json" },
});

export const mainApi = createApi({
  reducerPath: "mainApi", // what is this reducer for
  baseQuery: fetchBaseQuery({ baseUrl }), // base query
  endpoints: (builder) => ({
    getOptions: builder.query({
      // count is a given parameter when calling the endpoint
      query: () => createRequest(`/api/movies/options/`),
    }),

    getPublicMovies: builder.query({
      query: () => createRequest(`/api/movies/public/`),
    }),
    
    getPrivateMovies: builder.query({
      query: (user_id) => createRequest(`/api/movies/private/${user_id}/`),
    }),



  }),
});

export const {
    useGetOptionsQuery,
    useGetPublicMoviesQuery,
    useGetPrivateMoviesQuery,


} = mainApi