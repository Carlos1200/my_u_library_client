import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Layout, MyTextInput, Spinner } from "../components";
import { BookSchema } from "../schemas";
import { getAuthors } from "../services/authors";
import { getGenres } from "../services/genres";
import { createBook } from "../services/books";
import { BookFormProp } from "../interfaces";

const animatedComponents = makeAnimated();

export const BookForm = () => {
  const [error, setError] = useState<null | string>(null);
  const {
    data: authors,
    isError: isErrorAuthors,
    isLoading: isLoadingAuthors,
  } = useQuery("authors", getAuthors);
  const {
    data: genres,
    isError: isErrorGenres,
    isLoading: isLoadingGenres,
  } = useQuery("genres", getGenres);

  const {
    mutate,
    isSuccess,
    isError,
    error: errorMutation,
  } = useMutation((values: BookFormProp) => {
    return createBook(values);
  });

  const navigate = useNavigate();

  if (isErrorAuthors || isErrorGenres) {
    setError("Error loading authors or genres");
    setTimeout(() => {
      setError(null);
    }, 1500);
  }

  if (isLoadingAuthors || isLoadingGenres) return <div>Loading</div>;

  if (isSuccess) {
    navigate("/");
  }

  if (isError) {
    setError((errorMutation as any).message);
    setTimeout(() => {
      setError(null);
    }, 1500);
  }

  return (
    <Layout>
      <div className="mx-5 mt-7">
        <h1 className="text-center text-4xl font-serif">New Book</h1>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <div>
          {isLoadingAuthors || isLoadingGenres ? (
            <Spinner />
          ) : (
            <div className="mt-5 bg-teal-300 px-4 py-5 rounded-md w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-md mx-auto">
              <Formik
                initialValues={{
                  title: "",
                  authorId: [] as { value: string; label: string }[],
                  genreId: [] as { value: string; label: string }[],
                  published_year: "",
                  stock: "",
                }}
                validationSchema={BookSchema}
                onSubmit={({
                  title,
                  stock,
                  authorId,
                  genreId,
                  published_year,
                }) => {
                  const authorIds = authorId.map((author) => author.value);
                  const genreIds = genreId.map((genre) => genre.value);
                  mutate({
                    title,
                    stock: Number(stock),
                    authorId: authorIds,
                    genreId: genreIds,
                    published_year: Number(published_year),
                  });
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  values: { authorId, genreId },
                }) => (
                  <Form className="w-full">
                    <MyTextInput
                      label="Title"
                      name="title"
                      type="text"
                      placeholder="Enter book title"
                    />
                    <MyTextInput
                      label="Published Year"
                      name="published_year"
                      type="text"
                      placeholder="Enter published year"
                    />
                    <MyTextInput
                      label="Stock"
                      name="stock"
                      type="text"
                      placeholder="Enter stock"
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Author
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      name="authorId"
                      onBlur={handleBlur}
                      onChange={(value) =>
                        handleChange({ target: { name: "authorId", value } })
                      }
                      value={authorId}
                      options={authors?.map((author) => ({
                        label: author.name,
                        value: author.id,
                      }))}
                      placeholder="Select author"
                      className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="authorId"
                      component="span"
                      className="text-red-500 text-sm "
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Genre
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      onBlur={handleBlur}
                      onChange={(value) =>
                        handleChange({ target: { name: "genreId", value } })
                      }
                      name="genreId"
                      value={genreId}
                      options={genres?.map((genre) => ({
                        label: genre.name,
                        value: genre.id,
                      }))}
                      placeholder="Select genre"
                      className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="genreId"
                      component="span"
                      className="text-red-500 text-sm "
                    />
                    <div className="flex justify-center mt-5">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-md shadow-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
