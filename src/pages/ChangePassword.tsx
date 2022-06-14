import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { Layout, MyTextInput } from "../components";
import { changePassword } from "../services/user";
import { ChangePasswordProps } from "../interfaces";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<null | string>(null);
  const {
    mutate,
    isSuccess,
    isError,
    error: errorMutation,
  } = useMutation((values: ChangePasswordProps) => {
    return changePassword(values);
  });

  if (isSuccess) {
    navigate("/");
  }

  if (isError) {
    setError((errorMutation as any).message);
  }

  return (
    <Layout>
      <div className="mx-5 mt-7">
        <h1 className="text-center text-4xl font-serif">Change Password</h1>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <div>
          <div className="mt-5 bg-teal-300 px-4 py-5 rounded-md w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-md mx-auto">
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
              }}
              validationSchema={Yup.object({
                oldPassword: Yup.string().required("Old password is required"),
                newPassword: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("New password is required"),
              })}
              onSubmit={(values) => {
                mutate(values);
              }}
            >
              {() => (
                <Form className="w-full">
                  <MyTextInput
                    label="Old Password"
                    name="oldPassword"
                    type="password"
                    placeholder="Enter old password"
                  />
                  <MyTextInput
                    label="New Password"
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
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
