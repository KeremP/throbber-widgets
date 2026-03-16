import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as Throbbers from 'throbber-widgets';

type ThrobberComponent = React.FC<{
  pulse?: boolean;
  color?: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}>;

// Collect all throbber components (exclude non-components from the export)
const SKIP = new Set([
  'useThrobber', 'ThrobberBase', 'createThrobber',
  'DEFAULT_SPEED',
]);

const throbberEntries: [string, ThrobberComponent][] = [];
for (const [key, value] of Object.entries(Throbbers)) {
  if (SKIP.has(key)) continue;
  if (typeof value !== 'function') continue;
  // Frame constants are SCREAMING_SNAKE arrays, skip them
  if (key === key.toUpperCase()) continue;
  throbberEntries.push([key, value as ThrobberComponent]);
}

function App() {
  const [pulse, setPulse] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [color, setColor] = useState('#10b981');

  return (
    <>
      <h1>throbber-widgets</h1>

      <div className="controls">
        <label>
          <input type="checkbox" checked={pulse} onChange={(e) => setPulse(e.target.checked)} />
          pulse
        </label>
        <label>
          speed: {speed}ms
          <input type="range" min={50} max={500} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        </label>
        <label>
          color
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
      </div>

      <div className="grid">
        {throbberEntries.map(([name, Component]) => (
          <div key={name} className="card">
            <span className="spinner">
              <Component pulse={pulse} speed={speed} color={color} />
            </span>
            <span className="name">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
