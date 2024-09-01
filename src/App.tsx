import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/mainPage";
import ManagePage from "./pages/manage/managePage";
import RoomPage from "./pages/room/roomPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/register/RegiserPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/manage" element={<ManagePage />}/>
        <Route path="/room/:roomId" element={<RoomPage />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}