import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Loadingbar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

 
  useEffect(() => {
  setLoading(true);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 2;
        } else {
          setLoading(false);
          return prevProgress;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-bar" style={{ width: '100%', height: '20px', backgroundColor: 'darkgray', position: 'relative' }}>
          <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'aqua', position: 'relative' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{progress}%</div>
        </div>
      ) : (
        <div>Data download finished </div>
      )}
    </div>
  );
}

export default Loadingbar;
