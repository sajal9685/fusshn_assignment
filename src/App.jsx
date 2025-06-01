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

import { useParams } from "react-router-dom";

function DetailWrapper() {
  const { concertId } = useParams();
  return <ConcertDetails concertId={concertId} />;
}
function App() {
  return (
    <Router>
      <Navbar />
     <Routes>
      <Route path="/" element={<Home/>} />
 <Route path="/admin/*" element={<AdminRoutes />} />  
        <Route path="/concert" element={<Concert />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/printReceipt" element={<Receipt />} />
        <Route path="/checkout/:concertId" element={<Checkout />} />
        <Route path="/profile/:uid" element={<Profile />} />
        <Route path="/concerts/:concertId" element={<DetailWrapper />} />

        <Route
          path="/concerts/artist/:artistName"
          element={<ArtistConcerts />}
        />
      </Routes>
    </Router>
  );
}

export default App;
