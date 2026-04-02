"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persister } from "./store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <PersistGate
      persistor={persister}
      onBeforeLift={() => console.log("🔥 Persisted state rehydrated")}
    >
      {children}
    </PersistGate>
  </Provider>
);

export default ReduxProvider;
