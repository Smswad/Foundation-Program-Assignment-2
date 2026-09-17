import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MovieListing from './pages/MovieListing'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-on-surface">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieListing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
