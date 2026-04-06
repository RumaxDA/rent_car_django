import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg">
      <ul className="flex items-center justify-center gap-8 list-none font-roboto text-lg">
        <li>
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            Contact
          </Link>
        </li>

        <li>
          <Link
            to="/Login"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};
