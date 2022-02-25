import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ItemPage() {
  const SERVER_URL = `http://localhost:80`;
  const [selData, setSelData] = useState({});
  const [data, setData] = useState("");
  const [subTitle, setSubTitle] = useState([]);
  let selected = window.localStorage.getItem("selected");

  useEffect(() => {
    axios.get(SERVER_URL + `/${selected}`).then((res) => {
      setSelData(res.data.data);
      setSubTitle([...subTitle, selData.sub]);
    });
  }, []);

  const handleSave = () => {
    let new_data = data.slice(0, 29);
    axios.post(SERVER_URL + `/${selected}`, new_data);
    setSubTitle([...subTitle, new_data]);
    setData("");
  };
  const handleCancel = () => {
    if (subTitle.length <= 1) {
      axios.delete(SERVER_URL + `/${selected}`);
    } else {
      console.log(subTitle.pop());
      console.log(subTitle);
      setSubTitle([...subTitle]);
      axios.post(SERVER_URL + `/${selected}`, subTitle.slice(-1));
    }

    setData("");
  };
  const handleInputValue = (e) => setData(e.target.value);

  return (
    <>
      <div className="Item">
        <br></br>
        <Link to="/">[목록]</Link>
        <br></br>
        <br></br>
        <div>제목: {selData.title}</div>
        <br></br>
        <div className="InputForm">
          <div>부제목:</div>
          <input
            onChange={handleInputValue}
            type="text"
            value={data}
            placeholder={subTitle.slice(-1)}
          />
          <button onClick={handleSave}> 저장 </button>
          <button onClick={handleCancel}> 취소 </button>
        </div>
        <br></br>
        <hr></hr>
        <iframe
          width="862"
          height="485"
          src={selData.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default ItemPage;
