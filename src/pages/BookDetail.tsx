import { useParams } from "react-router-dom";
import { Layout, Spinner } from "../components";
import { useEffect, useState } from "react";
import { borrowBook, getBook } from "../services/books";
import { Book } from "../interfaces";
import image from "../assets/library.jpg";

export const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBooks = async () => {
    try {
      const { data } = await getBook(id as string);
      const book = {
        ...data.book,
        author: [...new Set(data.book.author)],
        genre: [...new Set(data.book.genre)],
      };
      setBook(book);
      setStock(data.book.stock || 0);
    } catch (error) {
      setError("Error getting book");
    } finally {
      setLoading(false);
    }
  };

  const checkout = () => {
    borrowBook(id as string)
      .then(() => {
        setStock((prev) => prev - 1);
      })
      .catch(() => {
        setError("Error borrowing book");
      });
  };

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center mt-5">
          <Spinner />
        </div>
      ) : error || !book ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-red-500 text-4xl font-serif">{error}</h1>
        </div>
      ) : (
        <div className="mt-5 flex justify-center">
          <div className=" w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 ">
            <img
              className=" object-cover rounded-md"
              src={image}
              alt="Library"
            />
            <h1 className="text-center text-4xl font-serif">{book.title}</h1>
            <div className="md:grid md:grid-flow-col text-center">
              {book.author.map((author) => (
                <p
                  key={author}
                  className="mx-2 my-1 block md:col-span-1 italic font-serif text-gray-500"
                >
                  {author}
                </p>
              ))}
            </div>
            <p className="mt-4 text-xl font-serif text-center font-bold">
              Genres:
            </p>
            <div className="md:grid md:grid-flow-col text-center">
              {book.genre.map((genre) => (
                <p
                  key={genre}
                  className="mx-2 my-1 block md:col-span-1 italic font-serif"
                >
                  {genre}
                </p>
              ))}
            </div>
            <p className="mt-4 text-xl font-serif text-center font-bold">
              Published:
            </p>
            <p className="mt-4 text-xl font-serif text-center">
              {book.published_year}
            </p>
            <div className="md:flex md:justify-center md:gap-5 mt-5 border-2 rounded-md p-3 mb-5">
              <div>
                <p className="text-xl font-serif text-center font-bold">
                  Stock:
                </p>
                <p className="text-xl font-serif text-center mb-2">{stock}</p>
              </div>
              <div className="w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto md:mx-0">
                <button
                  onClick={() => checkout()}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 shadow-md shadow-blue-700 px-4 rounded-md "
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
