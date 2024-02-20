import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import ErrorCard from "components/ErrorPanels/ErrorCard"
import "styles/globals.scss"

const queryClient = new QueryClient()

function onReset() {
  window.location.reload()
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <ErrorBoundary FallbackComponent={ErrorCard} onReset={onReset}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ErrorBoundary>,
)
