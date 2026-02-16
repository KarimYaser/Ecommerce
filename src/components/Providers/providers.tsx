"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import createStore from "@/store/store";
import { ToastContainer } from "react-toastify";
import type { AppStore, preloadedState } from "@/store/store";

type ProvidersProps = {
  children: React.ReactNode;
  preloadedState: preloadedState;
};

export default function Providers({
  children,
  preloadedState,
}: ProvidersProps) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore(preloadedState);
  }

  return (
    <>
      <Provider store={storeRef.current}>{children}</Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
