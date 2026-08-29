import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Team from './pages/Team'
import Gallery from './pages/Gallery'
import Gallery2 from './pages/Gallery2'
import Contact from './pages/Contact'
import FAQ from './pages/Faq'
import VitMasBlogs2 from './pages/Blogs2'
import Projects from './pages/Projects'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
    <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery2" element={<Gallery2 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blogs" element={<VitMasBlogs2 />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

