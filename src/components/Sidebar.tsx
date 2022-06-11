import {
  faBook,
  faBookmark,
  faBookReader,
  faCirclePlus,
  faDoorClosed,
  faKey,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import { IconLink } from "./IconLink";

export const Sidebar = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="col-span-2 md:col-span-1">
      <div className="bg-teal-600 h-screen">
        <div className="mx-4 flex justify-center">
          <div className="pt-5 flex flex-col gap-y-3">
            <IconLink to="/" icon={faBook} />
            <IconLink to="/user/password" icon={faKey} />
            {user.role === "Librarian" && (
              <>
                <IconLink to="/books/new" icon={faCirclePlus} />
                <IconLink to="/books/borrowed" icon={faBookReader} />
                <IconLink to="/authors/new" icon={faUser} />
                <IconLink to="/genre/new" icon={faBookmark} />
                <IconLink to="/user/new" icon={faUsers} />
              </>
            )}
            <IconLink to="/login" icon={faDoorClosed} logout />
          </div>
        </div>
      </div>
    </div>
  );
};
