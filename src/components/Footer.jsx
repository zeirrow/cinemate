export default function Footer() {
  return (
    <footer className="bg-black/90 text-white py-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Cinemate</h2>
          <p className="text-sm text-white/60">
            Stream your favorite movies and shows. No ads. No interruptions.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Browse</h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li><a href="#" className="hover:text-white transition">Movies</a></li>
            <li><a href="#" className="hover:text-white transition">TV Shows</a></li>
            <li><a href="#" className="hover:text-white transition">Genres</a></li>
            <li><a href="#" className="hover:text-white transition">New & Popular</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Help</h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li><a href="#" className="hover:text-white transition">Support Center</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">Account</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Legal</h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Cinemate. All rights reserved.
      </div>
    </footer>
  );
}
