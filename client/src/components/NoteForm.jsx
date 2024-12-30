import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { StyledFormError } from "./index";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const getOldNote = async () => {
    const res = await fetch(`${import.meta.env.VITE_API}/edit/${id}`);
    if (res.status === 200) {
      const noteData = await res.json();
      setOldNote(noteData);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      getOldNote();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    note_id: isCreate ? "" : oldNote._id,
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

  const submitHandler = async (values) => {
    setIsLoading(true);
    let API = `${import.meta.env.VITE_API}/create`;
    let method;

    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
      method = "post";
    } else {
      API = `${import.meta.env.VITE_API}/edit`;
      method = "put";
    }

    const res = await fetch(API, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 201 || res.status === 200) {
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

    setIsLoading(false);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="w-[95%] md:w-[65%] mx-auto">
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
        enableReinitialize={true}
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
            <Field type="text" name="note_id" id="note_id" hidden />
            <button
              type="submit"
              className=" w-full bg-teal-600 rounded-lg text-white py-2 px-3 font-medium active:scale-95 duration-200"
            >
              <div className="flex justify-center items-center gap-2">
                {isLoading && (
                  <LoaderCircle className="animate-spin text-white" size={25} />
                )}
                {isCreate ? "Create Note" : "Update Note"}
              </div>
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
