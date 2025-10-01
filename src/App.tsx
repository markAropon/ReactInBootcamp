import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import TypingTest from './pages/TypingTest'
import Home from './pages/Home'
import PageAnimation from './common/PageAnimation'
import ToDo from './pages/ToDO'

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
        <Route path="/ToDo" element={
          <PageAnimation keyValue={location.pathname}>
            <ToDo />
          </PageAnimation>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen w-full">
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  )
}

export default App
