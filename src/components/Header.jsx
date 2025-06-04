import { useState } from "react";
import { BiMenu, BiSearch, BiX } from "react-icons/bi";
import { Link } from "react-router-dom"; // If you're using React Router
import { useAppContext } from "../contexts/AppContext";
import { useOutsideClick } from "../hooks/useOutsideClick";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setSearchOpen } = useAppContext();
  const ref = useOutsideClick(() => setMobileMenuOpen(false));
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0e0e10]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-white text-xl font-bold tracking-wide">
            🎬 Cinemate
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center text-white text-sm">
            <Link to="/">Home</Link>
            <Link to="/bookmarks">Bookmarks</Link>
            <Link to="/rated">Rated</Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1"
            >
              <BiSearch size={16} />
              <span>Search</span>
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div ref={ref} className="md:hidden bg-[#0e0e10] border-t border-white/10">
            <div className="flex flex-col px-6 py-4 text-white gap-4 text-base">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/bookmarks" onClick={() => setMobileMenuOpen(false)}>
                Bookmarks
              </Link>
              <Link to="/rated" onClick={() => setMobileMenuOpen(false)}>
                Rated
              </Link>
              <button className="text-left" onClick={() => setSearchOpen(true)}>Search</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
