import { apiSlice } from "./apiSlice";

const NOTES_URL = '/api/notes';

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNote: builder.mutation({
      query: (data) => ({
        url: `${NOTES_URL}/addNote`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAddNoteMutation } = notesApiSlice;
