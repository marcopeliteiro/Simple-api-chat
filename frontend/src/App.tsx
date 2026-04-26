import { BrowserRouter, Route, Routes } from "react-router";
import MessagesSidebar from "./Components/MessagesSidebar/MessagesSidebar";
import "./index.css";
import MessageChat from "./Components/MessageChat/MessageChat";
import ChatPage from "./Pages/ChatPage/ChatPage";
import SearchUsersBar from "./Components/SearchUsersBar/SearchUsersBar";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MainRoutes from "./Routes.tsx/MainRoutes";
import AuthProvider from "./Contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
      <MainRoutes></MainRoutes>
    </AuthProvider>
  );
}

export default App;
