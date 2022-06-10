import { IconLink } from "./IconLink";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export const Sidebar = () => {
  return (
    <div className="col-span-1">
      <div className="bg-teal-600 h-screen">
        <div className="mx-4 flex justify-center">
          <div className="pt-5">
            <IconLink to="/" icon={faBook} />
          </div>
        </div>
      </div>
    </div>
  );
};
