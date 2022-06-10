import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconLinkProps {
  to: string;
  icon: IconProp;
}

export const IconLink = ({ to, icon }: IconLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-4xl text-white hover:text-gray-400 transition-colors duration-200 ease-in-out ${
          isActive && "text-gray-400"
        }`
      }
    >
      <FontAwesomeIcon icon={icon} className="" />
    </NavLink>
  );
};
