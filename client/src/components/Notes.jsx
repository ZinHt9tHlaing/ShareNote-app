import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Notes = () => {
  return (
    <div className="w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3">
      <h3 className="text-xl font-medium">Lorem ipsum dolor sit amet.</h3>
      <p className="text-sm line-clamp-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi ullam
        recusandae autem accusantium dicta assumenda, alias molestiae laboriosam
        tempore asperiores quam, aliquam voluptatem. Odit expedita quos
        accusamus, suscipit tempore magni.
      </p>
      <div className="flex items-center justify-end gap-2 mt-3">
        <TrashIcon
          width={20}
          className="text-red-600 cursor-pointer select-none active:scale-90 duration-200"
        />
        <Link to={"/edit/1"}>
          <PencilSquareIcon
            width={20}
            className="text-teal-600 active:scale-90 duration-200"
          />
        </Link>
        <Link to={"/notes/1"}>
          <EyeIcon width={20} className="active:scale-90 duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default Notes;
