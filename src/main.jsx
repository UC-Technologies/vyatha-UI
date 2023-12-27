import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { ContextProvider } from "./Context/Provider.jsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
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
