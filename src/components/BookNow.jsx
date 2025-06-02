import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"

export const BookButton = ({ concertId }) => {
  const navigate = useNavigate()

  const handleBookNow = () => {
    const user = auth.currentUser
    if (user) {
      navigate(`/checkout/${concertId}`)
    } else {
      navigate(`/SignIn?redirectTo=/checkout/${concertId}`)
    }
  }

  return (
    <button
      onClick={handleBookNow}
      className="w-full rounded-full bg-primary px-6 py-3 text-light font-semibold text-base sm:text-lg shadow-md hover:bg-secondary transition duration-300"
    >
      Book Now
    </button>
  )
}
