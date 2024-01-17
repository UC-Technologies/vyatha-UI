import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { ContextProvider } from "./Context/Provider.jsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
      refetchIntervalInBackground: false,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: 900000,
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        {" "}
        <App />
        {import.meta.env.MODE !== "production" && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        )}
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
