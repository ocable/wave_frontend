import api from "../store/api.js";

const spectralApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSpectralData: builder.query({
      query: () => "/spectraldata",
      provideTags: ["SpectralData"],
    }),
    getSignificantData: builder.query({
      query: () => "/significant",
    }),
    getSwellComponentData: builder.query({
      query: () => "/swellcomponents",
    }),
    getWindData: builder.query({
      query: () => "/wind",
    }),
    getGFSData: builder.query({
      query: () => "/GFS",
    }),
  }),
});

export const { useGetSpectralDataQuery, useGetSignificantDataQuery, useGetSwellComponentDataQuery, useGetWindDataQuery, useGetGFSDataQuery } = spectralApi;
