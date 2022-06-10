import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <Sidebar />
      <div className="col-span-11">{children}</div>
    </div>
  );
};
