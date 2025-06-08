import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Concert from "./Pages/availableConcert";
import ConcertDetails from "./components/concertDetails";
import ArtistConcerts from "./Pages/ArtistConcerts";
import SignIn from "./auth/Signin";
import Register from "./auth/Register";
import SignOut from "./auth/SignOut";
import Profile from "./Pages/Profile";
import Checkout from "./Pages/checkout";
import Receipt from "./Pages/printReceipt";
import AdminRoutes from "./Admin/AdminRoutes";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Help from "./Pages/help"
import Contact from "./Pages/contact"
import Faq from "./Pages/faq"
import About from "./Pages/about"
import { useParams } from "react-router-dom";

function DetailWrapper() {
  const { concertId } = useParams();
  return <ConcertDetails concertId={concertId} />;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow px-4 sm:px-6 lg:px-10 py-6 bg-[#ECEFCA]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/concert" element={<Concert />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/printReceipt" element={<Receipt />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout/:concertId" element={<Checkout />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/concerts/:concertId" element={<DetailWrapper />} />
            <Route path="/concerts/artist/:artistName" element={<ArtistConcerts />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
