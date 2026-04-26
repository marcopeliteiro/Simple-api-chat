import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";

function LoginPage() {
  const { Login } = useAuth();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleLogin() {
    Login(username, password);
  }

  return (
    <div className="login">
      <h4>Login</h4>
      <div>
        <label>Username </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" onClick={() => handleLogin()} />
    </div>
  );
}

export default LoginPage;
