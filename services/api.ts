import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ethLagosApi = createApi({
  reducerPath: 'ethLagosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getTotalParticipants: builder.query({
      query: (page=1) => `participant/record-counts?page=${page}`, 
    }),
    // getCharacterDetails: builder.query({
    //   query: (id) => `/character/${id}`,
    // }),
  }),
});

export const {useGetTotalParticipantsQuery } =  ethLagosApi;