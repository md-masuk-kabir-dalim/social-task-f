/* eslint-disable */
import { envConfig } from "@/lib/helpers/envConfig";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { destroyCookie } from "nookies";

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseApi,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("x-api-key", envConfig.api_key);
    return headers;
  },
});

export const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401: unauthorized
  if (result.error?.status === 401 || result.error?.status === 403) {
    try {
      // Attempt refresh token
      const refreshResponse = await fetch(
        `${envConfig.baseApi}/api/v1/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": envConfig.api_key,
          },
          credentials: "include",
        }
      );

      const data = await refreshResponse.json();

      if (data?.success) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        cleanupAuth(api);
      }
    } catch (err) {
      cleanupAuth(api);
    }
  }

  // Customize network errors
  if (
    result.error?.status === "FETCH_ERROR" &&
    typeof result.error.error === "string" &&
    result.error.error.includes("NetworkError")
  ) {
    result.error.error =
      "Server connection failed. Please check your internet or try again later.";
  }

  return result;
};

// Cleanup function: remove cookies and Redux user
function cleanupAuth(api: { dispatch: any }) {
  destroyCookie(null, "accessToken");
  destroyCookie(null, "refreshToken");
  // if (typeof window !== "undefined") {
  //   window.location.href = "/login";
  // }
}
