"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

import ThemeContextProvider from "@contexts/ThemeContext";
import AlertContextProvider from "@contexts/AlertContext";
import FigureDisplayContextProvider from "@contexts/FigureDisplayContext";
import NetworkStatusContextProvider from "@contexts/NetworkStatusContext";

import AppBody from "@components/layout/AppBody";

import { store } from "@services/store";

import "@styles/globals.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <SessionProvider>
          <AlertContextProvider>
            <NetworkStatusContextProvider>
              <FigureDisplayContextProvider>
                <AppBody>
                  {children}
                  <div id="modal"></div>
                  <div id="loader"></div>
                </AppBody>
              </FigureDisplayContextProvider>
            </NetworkStatusContextProvider>
          </AlertContextProvider>
        </SessionProvider>
      </ThemeContextProvider>
    </Provider>
  );
}
