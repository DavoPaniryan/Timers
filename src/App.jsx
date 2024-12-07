import { useState } from 'react';
import './App.css';
import { Timer } from './components/timer';

function App() {
  const [timers, setTimers] = useState([
    { id: 123, minutes: 0, seconds: 10 },
    { id: 124, minutes: 1, seconds: 15 },
    { id: 125, minutes: 2, seconds: 20 },
  ]);

  function addTimer() {
    const time = Date.now();
    const date = new Date(time);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    setTimers([...timers, { id: time,minutes: Number(minutes), seconds: Number(seconds) }]);
  }

  function onRemove(id) {
    setTimers(timers.filter((timer) => timer.id !== id));
  }


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <button
        onClick={addTimer}
        className="bg-purple-500 text-white px-4 py-2 rounded-md shadow hover:bg-purple-600 focus:outline-none"
      >
        Create
      </button>
      <div className="mt-6 space-y-4">
        {timers.map((timer) => (
          <Timer
            key={timer.id}
            timer={timer}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
