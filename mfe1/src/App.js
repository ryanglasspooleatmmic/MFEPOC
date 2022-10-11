import React from 'react';
import Button from './Button';
function App() {
  return (
    <div>
      <h1>MFE1</h1>
      <Button onClick={() => alert('In test harness!')}>
        {' '}
        MFE1 Button
      </Button>
    </div>
  );
}

export default App;
