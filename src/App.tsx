import React, { useState } from "react";
import "./App.css";

type TPoint = {
  x: number;
  y: number;
};

/**
 * offsetX 與元素邊緣差
 * clientX 與瀏覽器邊緣差
 * pageX   與頁面邊緣差
 * screenX 與電腦螢幕邊緣差
 */

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [popped, setPopped] = useState<TPoint[]>([]);

  const handlePlaceCircle: React.MouseEventHandler = (e) => {
    const { clientX, clientY } = e;
    setPoints((prev) => [...prev, { x: clientX, y: clientY }]);
  };

  const handleUndo: React.MouseEventHandler = (e) => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;

    setPopped((prev) => [...prev, poppedPoint]);
    setPoints(() => [...newPoints]);
  };

  const handleRedo: React.MouseEventHandler = (e) => {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;

    setPoints((prev) => [...prev, poppedPoint]);
    setPopped(() => [...newPopped]);
  };

  return (
    <>
      <button onClick={handleUndo}>Undo</button>
      <button disabled={popped.length === 0} onClick={handleRedo}>
        Redo
      </button>

      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, i) => (
          <div
            className="point"
            style={{
              left: `${point.x - 5}px`,
              top: `${point.y - 5}px`,
            }}
            key={i}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
