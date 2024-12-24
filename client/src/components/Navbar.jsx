import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-200/70 py-4 px-6 mb-10">
      <Link to={"/"} className="text-teal-600 font-bold text-3xl">
        Dnote.io
      </Link>
    </nav>
  );
};

export default Navbar;
