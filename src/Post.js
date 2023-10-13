import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//게시물 한 개와 댓글들 보는 컴포넌트
function Post() {
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  //useLocation으로 전 페이지에서 post의 id를 받는다.
  const location = useLocation();
  const id = location.state.id;

  // 백엔드 API에 post 한개 데이터 요청
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // 받은 데이터를 상태에 저장
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //벡엔드 API에 comment 데이터 요청.
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        // 받은 데이터를 상태에 저장
        setCommentData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <ul>
        {/* post */}
        <h1>user {data.userId}'s post</h1>
        <h3>{data.title}</h3>
        {data.content}

        <br></br>
        <br></br>
        <br></br>

        <h4> comments</h4>
      </ul>
      {/* comment */}
      {commentData.map((item) => (
        <ul key={item.id}>" {item.content} "</ul>
      ))}
    </div>
  );
}

export default Post;
