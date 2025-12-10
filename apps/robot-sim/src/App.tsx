import React from 'react';
import { RobotSimulator } from '@cognitolab/robotics';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <h1 style={{ marginBottom: '20px' }}>CognitoLab - Simulateur Robotique</h1>
      <RobotSimulator />
    </div>
  );
}

export default App;

