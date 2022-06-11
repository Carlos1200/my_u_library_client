import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getAuth } from "../services/auth";
import { routes } from "./routes";
import { userState } from "../atoms/index";
import { Spinner } from "../components";
import { Page404 } from "../pages/Page404";

export const Navigation = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {routes.map(({ Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};
