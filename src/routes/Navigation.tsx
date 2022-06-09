import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getAuth } from "../services/auth";
import { routes } from "./routes";

export const Navigation = () => {
  const navigate = useNavigate();
  useEffect(() => {
    verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAuth = async () => {
    try {
      await getAuth();
    } catch (error) {
      navigate("/login");
    }
  };

  return (
    <>
      <Routes>
        {routes.map(({ Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
};
