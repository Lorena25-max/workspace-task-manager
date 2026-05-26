import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./routes/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* Redirect raíz */}

          <Route
            path="/"
            element={
              <Navigate
                to="/login"
              />
            }
          />

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* DASHBOARD PRIVADO */}

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>

                <Dashboard />

              </PrivateRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;