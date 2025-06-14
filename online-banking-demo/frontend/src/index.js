import React from 'react';
import ReactDOM from 'react-dom/client';

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Online Banking Demo</h1>
      <p>Backend API URL: <code>{apiUrl}</code></p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);