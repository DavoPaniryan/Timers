import { useEffect, useState } from 'react';

export function Timer({ timer, onRemove }) {
  const [time, setTime] = useState({ ...timer });
  const [isPhaused,setIsPaused] = useState(false)
  let interval;

  useEffect(() => {
    if(!isPhaused) {
      interval = setInterval(() => {
      const updatedTime = { ...time };

      if (updatedTime.seconds > 0) {
        updatedTime.seconds -= 1;
      } else if (updatedTime.minutes > 0) {
        updatedTime.minutes -= 1;
        updatedTime.seconds = 59;
      } else {
        onRemove(timer.id); 
      }
      setTime(updatedTime); 
    }, 1000);
    } else {
     clearInterval(interval)
    }

    return () => clearInterval(interval); 
  }, [time,isPhaused]); 

  function handlePhause() {
    setIsPaused(!isPhaused)
  }
  function handleComplete() {
    setIsPaused(false)
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 text-gray-800 flex flex-col items-center space-y-2">
      <h1 className="text-xl font-bold">
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </h1>
      <div className="flex space-x-2">
      <button
        className={`px-4 py-2 rounded-md shadow focus:outline-none ${
        isPhaused? 'bg-gray-300 text-gray-500 cursor-not-allowed'
           : 'bg-yellow-500 text-white hover:bg-yellow-600'
           }`}disabled={isPhaused} onClick={handlePhause}>Pause</button>
        <button
          className={`px-4 py-2 rounded-md shadow focus:outline-none ${
          isPhaused
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}disabled={!isPhaused} onClick={handleComplete}>Continue</button>
        <button
          onClick={() => onRemove(timer.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
