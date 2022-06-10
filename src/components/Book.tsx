import { Book as BookInterface } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface BookProps {
  book: BookInterface;
}

export const Book = ({ book }: BookProps) => {
  const navigate = useNavigate();
  const { title, author, genre, published_year } = book;
  const authors = [...new Set(author)];
  const genres = [...new Set(genre)];
  return (
    <div className="bg-slate-300 max-w-md rounded-lg shadow-md p-4">
      <h3 className="text-2xl text-center">{title}</h3>
      <p className="mt-3 font-bold">Authors:</p>
      <div className="md:grid md:grid-cols-3">
        {authors.map((a) => (
          <span className="mx-2 my-1 block md:col-span-1 italic font-serif">
            {a}
          </span>
        ))}
      </div>

      <div className="md:grid md:grid-cols-4 gap-5 mt-3">
        {genres.map((g) => (
          <span className="text-center block md:col-span-1 my-1 bg-teal-300 rounded-xl px-1 font-semibold">
            {g}
          </span>
        ))}
      </div>
      <p className="mt-3 font-bold">Published:</p>
      <p className="mt-3">{published_year}</p>

      <div className="flex justify-center mt-5">
        <button
          onClick={() => navigate(`/books/${book.id}`)}
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 shadow-md shadow-blue-700 px-4 rounded-md  w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          Details
        </button>
      </div>
    </div>
  );
};
