import { Field, Form, Formik } from "formik";
import { LoaderCircle } from "lucide-react";
import * as yup from "yup";

import { Navigate } from "react-router-dom";

// formik custom error message
import StyledFormError from "./StyledFormError";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AuthForm = ({ isLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const authFormSchema = yup.object({
    username: isLogin
      ? null
      : yup
          .string()
          .min(3, "Username is too short!")
          .max(10, "Username is too long!")
          .required("Username is required!"),
    email: yup
      .string()
      .required("Email is required!")
      .email("Please enter an vaild email!"),
    password: yup
      .string()
      .min(4, "Password is too short!")
      .required("Password is required!"),
  });

  const submitHandler = async (values) => {
    setIsLoading(true);

    const { email, password, username } = values;
    let END_POINT = `${import.meta.env.VITE_API}/register`;

    if (isLogin) {
      END_POINT = `${import.meta.env.VITE_API}/login`;
    }
    const response = await fetch(END_POINT, {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const toastFire = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    const responseData = await response.json();
    if (response.status === 201 || response.status === 200) {
      setRedirect(true);
    } else if (response.status === 400) {
      const pickedMessage = responseData.errorMessages[0].msg;
      toastFire(pickedMessage);
    } else if (response.status === 401) {
      toastFire(responseData.message);
    }

    setIsLoading(false);
  };

  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }

  return (
    <section className="w-2/3 md:w-1/2 mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="text-center text-teal-600 font-semibold text-3xl my-4">
        {isLogin ? "Login" : "Register"}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={authFormSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form>
            {/* username */}
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="username" className="font-medium block">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
                />
                <StyledFormError name={"username"} />
              </div>
            )}

            {/* email */}
            <div className="mb-3">
              <label htmlFor="email" className="font-medium block">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
              />
              <StyledFormError name={"email"} />
            </div>

            {/* password */}
            <div className="mb-3">
              <label htmlFor="password" className="font-medium block">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
              />
              <StyledFormError name={"password"} />
            </div>
            <button
              type="submit"
              className=" w-full bg-teal-600 rounded-lg text-white py-2 px-3 font-medium active:scale-95 duration-200"
            >
              <div className="flex justify-center items-center gap-2">
                {isLoading && (
                  <LoaderCircle className="animate-spin text-white" size={22} />
                )}
                {isLogin ? "Login" : "Register"}
              </div>
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AuthForm;
