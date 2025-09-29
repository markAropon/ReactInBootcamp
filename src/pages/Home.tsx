import { Link } from 'react-router-dom'
import CounterPage from '../Components/CounterPage'
import Stopwatch from '../Components/Stopwatch'

function Home() {
  return (
    <div className="space-y-8">
      <Link to="/typing" className="block">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer">
          <h2 className="text-xl font-bold text-neutral-800 mb-2">Typing Test</h2>
          <p className="text-neutral-500">Test your typing speed and accuracy</p>
        </div>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">Counter</h2>
          <CounterPage />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">Stopwatch</h2>
          <Stopwatch />
        </div>
      </div>
    </div>
  )
}

export default Home