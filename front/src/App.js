import "./App.css";
import ListPage from "./pages/list";
import ItemPage from "./pages/item";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/item" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
