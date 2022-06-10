import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getAuth } from "../services/auth";
import { routes } from "./routes";
import { userState } from "../atoms/index";

export const Navigation = () => {
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAuth = async () => {
    try {
      const { data } = await getAuth();
      setUser(data.user);
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
