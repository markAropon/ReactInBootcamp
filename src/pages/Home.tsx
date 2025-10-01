import { Link } from "react-router-dom"
import CounterPage from "../Components/CounterPage"
import Stopwatch from "../Components/Stopwatch"
import AgeSetter, { AgeProvider } from "@/Components/AgeSetter"
import DogAxios from "./dogAxios"

function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-y-auto">
      <div className="container mx-auto px-6 py-12 space-y-12">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 ">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            React Playground 🚀
          </h1>
          <p className="text-neutral-600 text-lg">
            React in BootCamp - A collection of React projects and components activities.
          </p>
        </header>
        {/* Feature Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/typing" className="group">
            <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-indigo-600">
                Typing Test
              </h2>
              <p className="text-neutral-500">Test your typing speed and accuracy</p>
            </div>
          </Link>

          <Link to="/ToDo" className="group">
            <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-purple-600">
                To-Do List
              </h2>
              <p className="text-neutral-500">Manage your tasks efficiently</p>
            </div>
          </Link>
        </div>

        {/* Widgets Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition flex flex-col h-[280px]">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">Counter</h2>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <CounterPage />
            </div>
          </div>

          <AgeProvider>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition flex flex-col h-[280px]">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-neutral-800 mb-2">
                  Age Setter <br />
                  <span className="text-sm text-neutral-500">(useReducer + Context)</span>
                </h2>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <AgeSetter />
              </div>
            </div>
          </AgeProvider>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition flex flex-col h-[280px]">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">Stopwatch</h2>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <Stopwatch />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition flex flex-col h-[280px]">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">Dog Image</h2>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <DogAxios />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
