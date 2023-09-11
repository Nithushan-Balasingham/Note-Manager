import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'; // thunk middleware

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});