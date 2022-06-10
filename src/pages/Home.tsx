import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { booksState } from "../atoms";
import { Book, Layout, SearchInput, Spinner } from "../components";
import { getBooks } from "../services/books";

export const Home = () => {
  const [books, setBooks] = useRecoilState(booksState);
  const [loading, setLoading] = useState(true);
  const fetchBooks = async () => {
    try {
      const { data } = await getBooks();
      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="mx-5 mt-7">
        <h1 className="text-center text-4xl font-serif">Reserve your books</h1>
        <SearchInput />
      </div>
      <div>
        <h2 className="text-center text-2xl font-serif mt-5">
          Search for a book to reserve
        </h2>
        <div>
          {loading ? (
            <div className="flex justify-center mt-5">
              <Spinner />
            </div>
          ) : (
            <div className="text-center">
              <div className="grid-books">
                {books.map((book) => (
                  <Book key={book.id} book={book} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
