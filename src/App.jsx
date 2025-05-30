import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './Admin/dashboard'
import Concert from './Pages/availableConcert'
import ConcertDetails from './components/concertDetails'
import ArtistConcerts from './Pages/ArtistConcerts'
import SignIn from './auth/Signin'
import Register from './auth/Register'
import SignOut from './auth/SignOut'
import Profile from './Pages/Profile'

import { useParams } from 'react-router-dom'

function DetailWrapper() {
  const { concertId } = useParams()
  return <ConcertDetails concertId={concertId} />
}
function App() {
  return (
      <Router>
      <Navbar />
       <div className="text-2xl font-bold text-blue-600">
      Welcome to the Booking App!
    </div>
    <Routes>

       <Route path="/" element={""} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/concert" element={<Concert />} />
       <Route path="/signIn" element={<SignIn />} />
       <Route path="/register" element={<Register />} />
       <Route path="/signout" element={<SignOut />} />
       <Route path="/profile/:uid" element={<Profile />} />
      <Route path="/concerts/:concertId" element={<DetailWrapper />} />
       <Route path="/concerts/artist/:artistName" element={<ArtistConcerts />} />

    </Routes>

    </Router>
  )
}

export default App
