import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from "@shopify/polaris";
import App from "./App";
import "@shopify/polaris/build/esm/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: "Sort by",
            defaultItemSingular: "item",
            defaultItemPlural: "items",
            showing: "Showing {itemsCount} {resource}",
            Item: {
              viewItem: "View details for {itemName}",
            },
          },
          Common: {
            checkbox: "checkbox",
          },
        },
      }}
    >
      <App />
    </AppProvider>
  </React.StrictMode>
);
