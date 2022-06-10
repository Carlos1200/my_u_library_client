import { Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Layout, MyTextInput } from "../components";
import { UserSchema } from "../schemas";
import { newUser } from "../services/user";

export const UserForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<null | string>(null);
  return (
    <Layout>
      <div className="mx-5 mt-7">
        <h1 className="text-center text-4xl font-serif">New User</h1>
        <p className="text-center text-gray-600 text-sm">
          The default password is "password"
        </p>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <div>
          <div className="mt-5 bg-teal-300 px-4 py-5 rounded-md w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-md mx-auto">
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                role: "",
              }}
              validationSchema={UserSchema}
              onSubmit={(values) => {
                newUser(values)
                  .then(() => {
                    navigate("/");
                  })
                  .catch((error) => {
                    setError("Error creating user");
                    setTimeout(() => {
                      setError(null);
                    }, 1500);
                  });
              }}
            >
              {({ setFieldValue }) => (
                <Form className="w-full">
                  <MyTextInput
                    label="First Name"
                    name="first_name"
                    type="text"
                    placeholder="Enter first name"
                  />
                  <MyTextInput
                    label="Last Name"
                    name="last_name"
                    type="text"
                    placeholder="Enter last name"
                  />
                  <MyTextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <Select
                    name="role"
                    options={[
                      { value: "Librarian", label: "Librarian" },
                      { value: "Student", label: "Student" },
                    ]}
                    onChange={(value) => setFieldValue("role", value?.value)}
                    className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="role"
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
        </div>
      </div>
    </Layout>
  );
};
