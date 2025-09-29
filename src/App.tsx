import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import TypingTest from './pages/TypingTest'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <main className="mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/typing" element={<TypingTest />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
