import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [email, setEmail] = useState("demo@bank.com");
  const [password, setPassword] = useState("Password123!");
  const [token, setToken] = useState("");
  const [dashboard, setDashboard] = useState(null);

  const login = async () => {
    const res = await axios.post(\`\${API}/auth/login\`, { email, password });
    setToken(res.data.token);
  };

  const getDashboard = async () => {
    const res = await axios.get(\`\${API}/accounts\`, {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    setDashboard(res.data);
  };

  return (
    <div>
      <h2>Online Banking Demo</h2>
      <button onClick={login}>Login</button>
      <button onClick={getDashboard}>Get Dashboard</button>
      {dashboard && (
        <pre>{JSON.stringify(dashboard, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;