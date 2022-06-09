import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyTextInput } from "../components";
import { LoginSchema } from "../schemas";
import { authenticate } from "../services/auth";

export const Login = () => {
  const [message, setMessage] = useState<null | string>(null);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-teal-600">
      <div className="flex items-center h-full w-full">
        <div>
          <h1 className="text-3xl font-semibold font-serif text-center">
            Login
          </h1>
          <p className="text-center text-white font-semibold">{message}</p>
          <div className="w-screen">
            <div className="mt-5 bg-white px-4 py-5 rounded-md w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-md mx-auto">
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                  try {
                    const {
                      data: { message, token },
                    } = await authenticate(values);
                    if (token) {
                      localStorage.setItem("token", token);
                      setMessage(message);

                      setTimeout(() => {
                        setMessage(null);
                      }, 1500);

                      navigate("/");
                    }
                  } catch (error: any) {
                    setMessage(error.response.data.message);
                    setTimeout(() => {
                      setMessage(null);
                    }, 1500);
                  }
                }}
                validationSchema={LoginSchema}
              >
                {() => (
                  <Form className="w-full">
                    <MyTextInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <MyTextInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      labelClassName="mt-5"
                    />
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4"
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
