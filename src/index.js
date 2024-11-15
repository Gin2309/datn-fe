import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global.css";

// scroll bar
import "simplebar/src/simplebar.css";

// third-party
import { Provider as ReduxProvider } from "react-redux";

import "./assets/third-party/apex-chart.css";
import App from "./App";
import { store } from "./store";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <BrowserRouter basename="/">
          <App />
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "green",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "red",
                  color: "#fff",
                },
              },
            }}
          />
        </BrowserRouter>
      </ReduxProvider>
    </QueryClientProvider>
  </StrictMode>
);

reportWebVitals();
