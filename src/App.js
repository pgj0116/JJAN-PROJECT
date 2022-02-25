import "./App.css";
import { useEffect, useState } from "react";
import ListPage from "./pages/list";
import ItemPage from "./pages/item";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const SERVER_URL = `http://localhost:8000`;

function App() {
  const [isList, setIsList] = useState(true);
  const [sel, setSel] = useState("");
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    axios.get(SERVER_URL).then((res) => {
      console.log(res);
      setVideoList(res.data.data.reverse());
    });
  }, []);

  const toList = () => {
    setIsList(true);
  };
  const toItem = (e) => {
    setIsList(false);
    setSel(e.target.value);
    console.log("You select ", sel);
  };
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
