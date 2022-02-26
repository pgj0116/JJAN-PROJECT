import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ListPage() {
  const SERVER_URL = `http://localhost:80`;
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    axios.get(SERVER_URL).then((res) => {
      console.log(res);
      setVideoList(res.data.data.reverse());
    });
  }, []);

  const handleClick = (e) => {
    window.localStorage.setItem("selected", e.target.getAttribute("value"));
  };
  return (
    <div className="App">
      <hr></hr>
      <div className="Label">
        <div className="Id">번호.</div>
        <div className="Title">| 영상 제목</div>
        <div className="Sub">| 부제목</div>
        <div className="Date">| 날짜</div>
      </div>
      <hr></hr>
      {videoList.map((el, idx) => {
        // console.log(el.id, el.title, el.sub, el.publishedAt);
        return (
          <div className="Entry" key={idx}>
            <div className="Id">{el.id}</div>
            <Link
              to="/item"
              className="Title"
              onClick={handleClick}
              value={el.id}
            >
              {el.title}
            </Link>
            <div className="Sub">{el.sub}</div>
            <div className="Date">{el.publishedAt}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ListPage;
