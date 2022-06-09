import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};
