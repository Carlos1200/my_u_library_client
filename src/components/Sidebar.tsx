import {
  faBook,
  faBookmark,
  faCirclePlus,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import { IconLink } from "./IconLink";

export const Sidebar = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="col-span-1">
      <div className="bg-teal-600 h-screen">
        <div className="mx-4 flex justify-center">
          <div className="pt-5 flex flex-col gap-y-3">
            <IconLink to="/" icon={faBook} />
            {user.role === "Librarian" && (
              <>
                <IconLink to="/books/new" icon={faCirclePlus} />
                <IconLink to="/authors/new" icon={faUser} />
                <IconLink to="/genre/new" icon={faBookmark} />
                <IconLink to="/user/new" icon={faUsers} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
