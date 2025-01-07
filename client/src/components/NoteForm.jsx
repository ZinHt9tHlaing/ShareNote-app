import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";

import { Formik, Field, Form } from "formik";
import * as yup from "yup";

import { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { LoaderCircle, Upload } from "lucide-react";

// formik custom error message
import { StyledFormError } from "./index";
import { UserContext } from "../contexts/UserContext";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const fileRef = useRef();

  const { token } = useContext(UserContext);

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
    cover_image: isCreate ? null : oldNote.cover_image,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

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
    cover_image: yup
      .mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not support.",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreviewImg = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);
  };

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

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);

    const res = await fetch(API, {
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-teal-600">
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
        {({ errors, touched, values, setFieldValue }) => (
          <Form encType="multipart/form-data">
            {/* title */}
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

            {/* content */}
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

            {/* file */}
            <div className="my-5">
              <div className="flex justify-between items-center">
                <label htmlFor="cover_image" className="font-medium block">
                  Cover image
                  <span className="text-xs font-semibold ms-1 text-teal-600">
                    ( Optional )
                  </span>
                </label>
                {previewImg && (
                  <button
                    type="button"
                    onClick={() => clearPreviewImg(setFieldValue)}
                    className="text-base text-red-600 font-medium active:scale-95 duration-200"
                  >
                    Clear image
                  </button>
                )}
              </div>
              <input
                type="file"
                name="cover_image"
                id="cover_image"
                className="py-1"
                ref={fileRef}
                onChange={(e) => handleImageChange(e, setFieldValue)}
                hidden
              />
              <div
                onClick={() => fileRef.current.click()}
                className="relative border-2 border-dashed rounded-lg border-teal-600 mt-1 flex justify-center items-center cursor-pointer text-teal-600 h-60 active:scale-95 duration-200"
              >
                <Upload size={25} className="z-20" />
                {previewImg && (
                  <img
                    src={previewImg}
                    className="w-full absolute top-0 left-0 h-full rounded-lg object-cover overflow-hidden opacity-80 z-10"
                    alt="preview"
                  />
                )}
              </div>
              <StyledFormError name={"cover_image"} />
            </div>
            <button
              type="submit"
              className=" w-full bg-teal-600 rounded-lg text-white py-2 px-3 font-medium active:scale-95 duration-200"
            >
              <div className="flex justify-center items-center gap-2">
                {isLoading && (
                  <LoaderCircle className="animate-spin text-white" size={22} />
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
