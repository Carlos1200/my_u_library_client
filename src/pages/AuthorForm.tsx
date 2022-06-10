import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Layout, MyTextInput } from "../components";
import { postAuthor } from "../services/authors";

export const AuthorForm = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="mx-5 mt-7">
        <h1 className="text-center text-4xl font-serif">New Book</h1>
        <div>
          <div className="mt-5 bg-teal-300 px-4 py-5 rounded-md w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-md mx-auto">
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
              })}
              onSubmit={({ name }) => {
                try {
                  postAuthor(name);
                  navigate("/");
                } catch (error) {
                  console.log({ error });
                }
              }}
            >
              {() => (
                <Form className="w-full">
                  <MyTextInput
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Enter author name"
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
        </div>
      </div>
    </Layout>
  );
};
