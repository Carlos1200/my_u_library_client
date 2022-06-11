import { Layout } from "../components";
import { getBorrowBooks, returnBook } from "../services/books";
import { useEffect, useState } from "react";
import { Borrowed } from "../interfaces";

export const BorrowBook = () => {
  const [books, setBooks] = useState<Borrowed[]>();
  const [error, setError] = useState<null | string>(null);
  const getBooks = async () => {
    const {
      data: { borrowed },
    } = await getBorrowBooks();
    setBooks(borrowed);
  };
  useEffect(() => {
    getBooks();
  }, []);

  const returnBookHandler = async (idBook: string, idUser: string) => {
    try {
      await returnBook(idBook, idUser);
      await getBooks();
    } catch (error) {
      setError("Error while returning book");
      setTimeout(() => {
        setError(null);
      }, 1500);
    }
  };

  return (
    <Layout>
      <div className="mx-5 mt-7">
        <h1 className="text-center text-4xl font-serif">Borrowed Books</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <div>
          <div className="mt-10">
            <table className="w-full shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="text-left p-3">Title</th>
                  <th className="text-left p-3">Published Year</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700 border border-gray-200">
                {books &&
                  books.map((book, index) => (
                    <tr
                      key={index}
                      className={
                        book.status === "Inactive"
                          ? "bg-green-200"
                          : "bg-red-200"
                      }
                    >
                      <td className="text-left p-3">{book.title}</td>
                      <td className="text-left p-3">{book.published_year}</td>
                      <td className="text-left p-3">{book.email}</td>
                      <td className="text-left p-3">{book.status}</td>
                      <td className="text-left p-3">
                        <button
                          disabled={book.status === "Inactive"}
                          onClick={() =>
                            returnBookHandler(book.idbook, book.iduser)
                          }
                          className="bg-green-500 hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-500 shadow-md shadow-green-300 text-white font-bold py-2 px-4 rounded"
                        >
                          Returned
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};
