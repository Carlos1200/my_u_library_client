import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconLinkProps {
  to: string;
  icon: IconProp;
  logout?: boolean;
}

export const IconLink = ({ to, icon, logout }: IconLinkProps) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <NavLink
      to={to}
      onClick={logout ? handleLogout : undefined}
      className={({ isActive }) =>
        `text-4xl mx-auto text-white hover:text-gray-400 transition-colors duration-200 ease-in-out ${
          isActive && "text-gray-400"
        }`
      }
    >
      <FontAwesomeIcon icon={icon} />
    </NavLink>
  );
};
