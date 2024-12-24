import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

const Plus = () => {
  return (
    <Link
      to={"/create"}
      className="bg-teal-600 p-2 fixed text-white rounded-full bottom-28 right-32 active:scale-90 duration-200"
    >
      <PlusIcon width={30} height={30} />
    </Link>
  );
}

export default Plus;