import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { AnthenticatedApp } from "./anthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallback } from "./components/lib";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AnthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
