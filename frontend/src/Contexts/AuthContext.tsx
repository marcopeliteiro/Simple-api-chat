import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/Api";

interface Sender {
  id: number;
  username: string;
  name: string;
}

export interface AuthContextData {
  isSignedIn: boolean;
  sender: Sender | null;
  Login(username: string, password: string): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [sender, setSender] = useState<Sender | null>(null);
  useEffect(() => {
    const storagedUser = localStorage.getItem("sender");
    const storagedToken = localStorage.getItem("token");

    if (storagedToken && storagedUser) {
      setSender(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(username: string, password: string) {
    const response = await api.post("/auth/login", {
      username: username,
      password: password,
    });

    if (response.data.status === "ok") {
      setSender(response.data.user);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      localStorage.setItem("sender", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    }

    console.log(response);
  }

  function Logout() {
    setSender(null);
    localStorage.removeItem("sender");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ isSignedIn: Boolean(sender), sender, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
