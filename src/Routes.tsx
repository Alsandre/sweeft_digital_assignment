import { Route, Routes } from "react-router-dom";
import { HistoryPage, HomePage } from "./pages";

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
};

export default Pages;
