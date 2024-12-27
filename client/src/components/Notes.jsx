import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const Notes = ({ note }) => {
  const { _id, title, content, createdAt } = note;

  return (
    <div className="w-2/5 h-fit border-t-4 border-t-teal-600 shadow-lg p-3">
      <h3 className="text-xl font-medium">{title}</h3>
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
