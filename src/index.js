import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {QueryClient, QueryClientProvider} from 'react-query';

const client = new QueryClient()
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
  </BrowserRouter>
);

serviceWorker.unregister();