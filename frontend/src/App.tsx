import { Route, Routes } from "react-router-dom";
import Custom404 from "./pages/Custom404";
import Index from "./pages/Index";
import { MainLayout } from "./components/layout/MainLayout";
import ProfilePage from "./pages/ProfilePage";
import CreateTokenPage from "./pages/CreateTokenPage";
import MyAssetsPage from "./pages/MyAssetsPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<CreateTokenPage />} />
        <Route path="/my-assets" element={<MyAssetsPage />} />
      </Route>
      <Route path="*" element={<Custom404 />} />
    </Routes>
  );
}

export default App;
