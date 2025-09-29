import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import TypingTest from './pages/TypingTest'
import Home from './pages/Home'
import PageAnimation from './common/PageAnimation'

// AnimationRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageAnimation keyValue={location.pathname}>
            <Home />
          </PageAnimation>
        } />
        <Route path="/typing" element={
          <PageAnimation keyValue={location.pathname}>
            <TypingTest />
          </PageAnimation>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="mx-auto py-6 px-4">
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  )
}

export default App
