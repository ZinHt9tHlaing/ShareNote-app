import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { toast } from "react-toastify";

const Notes = ({ note, getNotes }) => {
  const { _id, title, content, createdAt } = note;

  const deleteNote = async () => {
    const res = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
      method: "delete",
    });

    const customAlert = (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    if (res.status === 204) {
      customAlert("Post deleted");
      getNotes();
    }
  };

  return (
    <div className="w-2/5 h-fit border-t-4 border-t-teal-600 shadow-lg p-3">
      <h3 className="text-xl line-clamp-2 font-medium">{title}</h3>
      <p className="text-sm line-clamp-3 text-gray-500 mt-2">
        {content.slice(0, 120)}
      </p>
      <div className="flex items-center justify-between mt-3 border-t-2 pt-2">
        <p className="text-sm font-medium">
          {formatISO9075(createdAt, { representation: "date" })}
        </p>
        <div className="flex items-center justify-end gap-2">
          <TrashIcon
            width={20}
            className="text-red-600 cursor-pointer select-none active:scale-90 duration-200"
            onClick={deleteNote}
          />
          <Link to={`/edit/${_id}`}>
            <PencilSquareIcon
              width={20}
              className="text-teal-600 active:scale-90 duration-200"
            />
          </Link>
          <Link to={`/notes/${_id}`}>
            <EyeIcon width={20} className="active:scale-90 duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notes;
