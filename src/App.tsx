import './App.css'
import CounterPage from './Components/CounterPage'
import Stopwatch from './Components/Stopwatch'

function App() {

  return (
    <>
    <div style={{display: 'flex', justifyContent: 'space-around',gap:'50px'}}>
      <Stopwatch />
      <CounterPage />
      </div>
    </>
  )
}

export default App
