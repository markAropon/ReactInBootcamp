import { useEffect, useState } from "react";

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setTimeout>;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
    };
    
    const formatTime = () => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center justify-center border p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Stopwatch</h1>
            <p className="text-7xl mb-4">{formatTime()}</p>
            <div className="flex gap-4">
                <button 
                    id="toggle-button"
                    className={`border px-4 py-2 rounded ${
                        isRunning   
                        ? "border-green-800 text-white bg-green-800" 
                        : "border-green-800 text-green bg-white-800"
                    }`}
                    onClick={toggleTimer}
                >
                    {isRunning ? "Pause" : (time > 0 ? "Resume" : "Start")}
                </button>
                <button
                    className="border border-blue-800 px-4 py-2 rounded bg-blue-700 text-white"
                    onClick={resetTimer}
                    disabled={time === 0}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
export default Stopwatch;
