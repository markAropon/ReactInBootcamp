import { useState, useEffect } from "react";
import Button from "./Button";

function CounterPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  const Add = () => {
    setCount(count + 1);
  };

  const Subtract = () => {
    setCount(count - 1);
  };

  const Reset = () => {
    setCount(0);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center border p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">Counter Page</h1>
        <p className="text-7xl mb-4">{count}</p>
        <div className="flex gap-5 mb-4">
          <Button color="green" label="+" onClick={Add} />
          <Button color="red" label="Reset" onClick={Reset} />
          <Button color="blue" label="-" onClick={Subtract} />
        </div>
      </div>
    </>
  );
}
export default CounterPage;
