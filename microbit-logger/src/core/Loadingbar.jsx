import React, { useState, useEffect, useContext } from 'react';
import { MicrobitContext } from './Dashboard';

function Loadingbar({microbit}) {
  const [progress, setProgress] = useState(0);
  const {microbitManager} = useContext(MicrobitContext);

  useEffect(() => {
    if(progress < 100) {
      microbitManager.addEventListener('progress', (event) => {
        if(event.detail.device === microbit) {
          setProgress(event.detail.progress);
        }
      })
    }
  }, []);

  return (
    <div>
      {progress < 100 ? (
        <div className="loading-bar" style={{ width: '100%', height: '20px', backgroundColor: 'darkgray', position: 'relative' }}>
          <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'aqua', position: 'relative', transition: 'width .2s' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading data... - {progress}%</div>
        </div>
      ) : (
        <div>Data download finished </div>
      )}
    </div>
  );
}

export default Loadingbar;
