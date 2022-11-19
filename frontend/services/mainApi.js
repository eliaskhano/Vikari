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
  }),
});

export const {
    useGetOptionsQuery,
} = mainApi