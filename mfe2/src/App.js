import "regenerator-runtime/runtime";

import React from 'react';
import ReactShim from './ReactShim';
import VueShim from './VueShim';

function App() {
  const [loadReact, setLoadReact] = React.useState(false);
  const [loadVue, setLoadVue] = React.useState(false);

  return (
    <div>
      <h1>
        Dynamically Resolving Micro-Frontend Host
      </h1>

      <div
        style={{
          margin: '10px',
          padding: '10px',
          width: '60%',
          border:
            '4px solid black',
        }}>
        <h3>
          Button from MFE1 (React)
        </h3>
        <button onClick={() => setLoadReact(true)} disabled={loadReact}>Load MFE1 (React) Button</button><br />
        {loadReact && <ReactShim url="http://localhost:8083/remoteEntry.js" scope="MFE1" module="Button" onClick={() => alert('React button clicked!')} />}
        <h3>
          Button from MFE3 (Vue)
        </h3>
        <button onClick={() => setLoadVue(true)} disabled={loadVue}>Load MFE3 (Vue) Button</button>
        {loadVue && <VueShim url="http://localhost:8084/remoteEntry.js" scope="MFE3" module="VueFeature" />}
      </div>
    </div>
  );
}

export default App;
