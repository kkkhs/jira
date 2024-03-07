import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { AnthenticatedApp } from "./anthenticated-app";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <UnauthenticatedApp /> : <AnthenticatedApp />}
    </div>
  );
}

export default App;
