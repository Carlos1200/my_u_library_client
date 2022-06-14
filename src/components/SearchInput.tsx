import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import {
  faBook,
  faBookmark,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  callback: (value: string, type: string) => void;
  state: Dispatch<
    SetStateAction<{
      value: string;
      type: string;
    }>
  >;
}

export const SearchInput = ({ state }: Props) => {
  const [textValue, setTextValue] = useState("");
  const [type, setType] = useState("title");

  const debounceValue = useDebouncedValue(textValue);

  useEffect(() => {
    state({
      value: debounceValue,
      type,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <>
      <div className="flex justify-center mt-5">
        <input
          type="text"
          className="w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 border border-gray-300 rounded-lg"
          placeholder="Search for a book..."
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-5 gap-3">
        <div>
          <FontAwesomeIcon icon={faBook} className="text-2xl" />
          <input
            type="checkbox"
            id="type"
            name="type"
            value="title"
            checked={type === "title"}
            onChange={(e) => setType(e.target.value)}
            className="block mx-auto"
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faPerson} className="text-2xl" />
          <input
            type="checkbox"
            id="type"
            name="type"
            value="author"
            checked={type === "author"}
            onChange={(e) => setType(e.target.value)}
            className="block mx-auto"
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faBookmark} className="text-2xl" />
          <input
            type="checkbox"
            id="type"
            name="type"
            value="genre"
            checked={type === "genre"}
            onChange={(e) => setType(e.target.value)}
            className="block mx-auto"
          />
        </div>
      </div>
    </>
  );
};
