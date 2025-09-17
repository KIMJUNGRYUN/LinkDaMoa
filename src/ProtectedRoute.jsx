// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "./api";


export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await getMe();
        setIsAuth(data.authenticated);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (!isAuth) return <Navigate to="/admin/login" replace />;
  return children;
}
