import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { normalizeTags } from "@/lib/helpers/generate-tag";

interface ExecuteCommonApiParams<T = any> {
  payload?: T;
  url: string;
  tags?: tagTypes | tagTypes[];
  params?: Record<string, any>;
  accessType?: string;
}

export const commonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Resource
    createResource: build.mutation({
      query: ({
        payload,
        url,
        params,
        accessType = "ACCESS",
      }: ExecuteCommonApiParams) => ({
        url,
        method: "POST",
        body: payload,
        params,
        headers: {
          "x-secret-type": accessType,
        },
      }),
      invalidatesTags: (_result, _error, { tags }: ExecuteCommonApiParams) => {
        return normalizeTags(tags);
      },
    }),

    // Update Resource
    updateResource: build.mutation({
      query: ({
        payload,
        url,
        params,
        accessType = "ACCESS",
      }: ExecuteCommonApiParams) => ({
        url,
        method: "PATCH",
        body: payload,
        params,
        headers: {
          "x-secret-type": accessType,
        },
      }),
      invalidatesTags: (_result, _error, { tags }: ExecuteCommonApiParams) => {
        return normalizeTags(tags);
      },
    }),

    // Delete Resource
    deleteResource: build.mutation({
      query: ({
        url,
        params,
        payload,
        accessType = "ACCESS",
      }: ExecuteCommonApiParams) => ({
        url,
        method: "DELETE",
        body: payload,
        params,
        headers: {
          "x-secret-type": accessType,
        },
      }),
      invalidatesTags: (_result, _error, { tags }: ExecuteCommonApiParams) => {
        return normalizeTags(tags);
      },
    }),

    // Fetch Resource
    fetchResource: build.query({
      query: ({
        url,
        params,
        accessType = "ACCESS",
      }: ExecuteCommonApiParams) => ({
        url,
        method: "GET",
        params,
        headers: {
          "x-secret-type": accessType,
        },
      }),
      providesTags: (_result, _error, { tags }: ExecuteCommonApiParams) => {
        return normalizeTags(tags);
      },
    }),
  }),
});

export const {
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
  useFetchResourceQuery,
} = commonApi;
