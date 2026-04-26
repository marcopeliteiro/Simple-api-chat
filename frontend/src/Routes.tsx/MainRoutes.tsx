import { BrowserRouter, Route, Routes } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ChatPage from "../Pages/ChatPage/ChatPage";

function MainRoutes() {
  const { isSignedIn } = useAuth();

  return (
    <BrowserRouter>
      {!isSignedIn ? (
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<ChatPage></ChatPage>}></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default MainRoutes;
