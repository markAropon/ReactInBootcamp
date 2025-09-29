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
        <div className="flex flex-col items-center justify-center">
            <p className="text-5xl font-mono mb-4">{formatTime()}</p>
            <div className="flex gap-3">
                <button 
                    id="toggle-button"
                    className={`border px-4 py-2 rounded-md ${
                        isRunning   
                        ? "border-green-800 text-white bg-green-800" 
                        : "border-green-800 text-green-800 bg-white"
                    }`}
                    onClick={toggleTimer}
                >
                    {isRunning ? "Pause" : (time > 0 ? "Resume" : "Start")}
                </button>
                <button
                    className="border border-blue-800 px-4 py-2 rounded-md bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
