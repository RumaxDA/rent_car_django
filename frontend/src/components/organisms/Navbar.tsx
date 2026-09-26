const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 grid grid-cols-3 items-center px-15 py-4 bg-slate-900/50 backdrop-blur-md text-white shadow-md">
      <div className="justify-self-start font-bold text-2xl tracking-wide text-blue-400">
        <a href="/">RENT CAR</a>
      </div>
      <ul className="justify-self-center flex items-center space-x-6 text-lg">
        <li>
          <a href="/offer" className="hover:text-blue-400 transition-colors">
            Offer
          </a>
        </li>
        <li>
          <a href="/fleet" className="hover:text-blue-400 transition-colors">
            Fleet
          </a>
        </li>
        <li>
          <a
            href="/promotions"
            className="hover:text-blue-400 transition-colors"
          >
            Promo
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-blue-400 transition-colors">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
