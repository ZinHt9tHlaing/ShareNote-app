import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NoteForm = ({ isCreate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="font-medium block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="font-medium block">
            Note description
          </label>
          <textarea
            rows={4}
            type="text"
            id="description"
            name="description"
            className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
          />
        </div>
        <button className=" w-full bg-teal-600 rounded-lg text-white py-2 px-3 font-medium active:scale-95 duration-200">
          Create
        </button>
      </form>
    </section>
  );
};

export default NoteForm;
