import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Team from './pages/Team'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import FAQ from './pages/Faq'
import VitMasBlogs2 from './pages/Blogs2'
import Projects from './pages/Projects'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blogs" element={<VitMasBlogs2 />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

