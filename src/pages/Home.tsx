import { useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { booksState } from "../atoms";
import { Layout, SearchInput, Spinner, Table } from "../components";
import { filterBooks } from "../services/books";

export const Home = () => {
  const [books, setBooks] = useRecoilState(booksState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [searchValue, setSearchValue] = useState({
    value: "",
    type: "title",
  });

  const searchBooks = async (value: string, type: string) => {
    const { data } = await filterBooks(
      type === "title" ? value : null,
      type === "author" ? value : null,
      type === "genre" ? value : null
    );
    return data.books;
  };

  useQuery(
    ["books", searchValue],
    () => searchBooks(searchValue.value, searchValue.type),
    {
      onSuccess: (data) => {
        setBooks(data);
        setLoading(false);
      },
      onError: (error) => {
        setError((error as any).message);
        setLoading(false);
      },
    }
  );

  if (error) {
    return <span>Error: {(error as any).message}</span>;
  }

  return (
    <Layout>
      <div className="mx-5 mt-7">
        <h1 className="text-center text-4xl font-serif">Reserve your books</h1>
        <SearchInput callback={searchBooks} state={setSearchValue} />
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
            <div className="text-center mx-4">
              <Table
                data={books as any}
                columns={[
                  {
                    id: "id",
                    name: "Id",
                    hidden: true,
                  },
                  {
                    name: "Title",
                    id: "title",
                  },
                  {
                    name: "Author",
                    id: "author",
                    data: (row) =>
                      (row as any).author
                        .map((author: any) => author)
                        .join(", "),
                  },
                  {
                    name: "Genre",
                    id: "genre",
                    data: (row) =>
                      (row as any).genre.map((genre: any) => genre).join(", "),
                  },
                  {
                    name: "Publication Date",
                    id: "published_year",
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
