import { Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SearchOverlay from "../components/SearchOverlay";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
  const { searchOpen, setSearchOpen } = useAppContext();

  return (
    <>
      <Header />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <main className="mt-15">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
