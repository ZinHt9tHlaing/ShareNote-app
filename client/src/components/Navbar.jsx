import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { token } = useContext(UserContext);

  return (
    <nav className="bg-slate-200/70 py-4 px-6 mb-10 font-mono flex justify-between items-center">
      <Link to={"/"} className="text-teal-600 font-bold text-3xl">
        SHARENOTE.io
      </Link>
      <div className="flex items-center gap-3">
        {token ? (
          <Link
            to={"/create"}
            className="text-white bg-teal-600 me-3 px-2 py-1 rounded-md font-medium active:scale-95 duration-200"
          >
            Create Note
          </Link>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 text-lg font-semibold border-b-2 border-b-teal-600 active:scale-95 -transition-all duration-200"
                  : "text-teal-500 font-medium active:scale-95"
              }
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 text-lg font-semibold border-b-2 border-b-teal-600 -transition-all active:scale-95 duration-200"
                  : "text-teal-500 font-medium active:scale-95"
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
