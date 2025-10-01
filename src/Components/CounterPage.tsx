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
    <div className="flex flex-col items-center justify-center">
      <p className="text-6xl mb-4">{count}</p>
      <div className="flex gap-4 mb-2">
        <Button color="green" label="-" onClick={Subtract} />
        <Button color="red" label="Reset" onClick={Reset} />
        <Button color="blue" label="+" onClick={Add} />


      </div>
    </div>
  );
}
export default CounterPage;
