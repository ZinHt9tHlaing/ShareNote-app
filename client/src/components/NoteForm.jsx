import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { StyledFormError } from "./index";
import * as yup from "yup";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    title: "",
    content: "",
  };

  const NoteFormSchema = yup.object({
    title: yup
      .string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required."),
    content: yup
      .string()
      .min(5, "Content is too short!")
      .required("Content is required."),
  });

  // const validate = (values) => {
  //   const errors = {};

  //   if (values.title.trim().length < 10) {
  //     errors.title = "Title must have 10 length.";
  //   }
  //   if (values.content.trim().length < 10) {
  //     errors.content = "Content must have 10 length.";
  //   }
  //   return errors;
  // };

  const submitHandler = async (values) => {
    if (isCreate) {
      const res = await fetch(`${import.meta.env.VITE_API}/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.status === 201) {
        setRedirect(true);
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
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
      {/* Same as */}
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">
          {isCreate ? "Create a new note" : "Edit your note here"}
        </h1>
        <Link to={"/"}>
          <ArrowUturnLeftIcon
            width={25}
            className="text-teal-600 hover:scale-110 active:scale-95 duration-200"
          />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className="font-medium block">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
              />
              <StyledFormError name={"title"} />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="font-medium block">
                Note content
              </label>
              <Field
                as="textarea"
                rows={4}
                type="text"
                id="content"
                name="content"
                className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
              />
              <StyledFormError name={"content"} />
            </div>
            <button
              type="submit"
              className=" w-full bg-teal-600 rounded-lg text-white py-2 px-3 font-medium active:scale-95 duration-200"
            >
              {isCreate ? "Create" : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
