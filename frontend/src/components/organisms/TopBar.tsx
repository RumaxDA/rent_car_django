const TopBar = () => {
  return (
    <nav className="flex justify-between px-6 py-1.5 bg-slate-900/50 items-center justify-end text-white/60 shadow-md border-down border-b-1 border-slate-800 border-solid">
      <ul className="flex items-center space-x-6 text-sm">
        <li>
          <a href="/FAQ" className="hover:text-blue-400 transition-colors">
            FAQ
          </a>
        </li>
        <li>
          <a href="/About" className="hover:text-blue-400 transition-colors">
            About us
          </a>
        </li>
        <li>
          <a href="/Login" className="hover:text-blue-400 transition-colors">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default TopBar;
