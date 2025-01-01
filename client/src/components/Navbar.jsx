import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-200/70 py-4 px-6 mb-10 font-mono flex justify-between items-center">
      <Link to={"/"} className="text-teal-600 font-bold text-3xl">
        SHARENOTE.io
      </Link>
      <div>
        <Link to={"/create"} className="text-teal-600 font-medium">
          Share
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
