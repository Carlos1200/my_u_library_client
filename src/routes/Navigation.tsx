import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
