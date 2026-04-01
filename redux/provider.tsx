"use client";
import { Provider } from "react-redux";
import { useMemo } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/redux/api/baseApi";
import { rootReducer } from "./rootReducer";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useMemo(() => {
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
