import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NetworkBackground from './components/NetworkBackground'
import SidePanels from './components/SidePanels'
import InitPage from './pages/InitPage'
import AboutPage from './pages/AboutPage'
import DeploymentsPage from './pages/DeploymentsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import NetworkPage from './pages/NetworkPage'

function App() {
  const location = useLocation()

  return (
    <div className="app-container">
      <NetworkBackground />
      <SidePanels />
      <Navbar />
      <div className="page-wrapper">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<InitPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/deployments" element={<DeploymentsPage />} />
          <Route path="/deployments/:slug" element={<ProjectDetailPage />} />
          <Route path="/network" element={<NetworkPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
