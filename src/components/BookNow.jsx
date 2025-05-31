// ✅ BookNow.jsx
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export const BookButton = ({ concertId }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const user = auth.currentUser;
    if (user) {
      navigate(`/checkout/${concertId}`);
    } else {
      navigate(`/SignIn?redirectTo=/checkout/${concertId}`);
    }
  };

  return (
    <button
      onClick={handleBookNow}
      className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
    >
      Book Now
    </button>
  );
};
