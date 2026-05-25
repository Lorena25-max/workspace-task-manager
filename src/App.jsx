import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./routes/PrivateRoute.jsx";

import { AuthProvider } from "./context/AuthContext";

function HomeRedirect() {
  const user = localStorage.getItem("user");

  return user ? (
    <Navigate to="/tablero" />
  ) : (
    <Navigate to="/login" />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* REDIRECCIÓN INICIAL */}
          <Route path="/" element={<HomeRedirect />} />

          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* DASHBOARD PRIVADO */}
          <Route
            path="/tablero"
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