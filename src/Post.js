import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//게시물 하나 + 댓글 보는 컴포넌트
function Post() {
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  //useLocation으로 데이터를 받는다.(id)
  const location = useLocation();
  const id = location.state.id;

  // 백엔드 API에 한개의 자세한 게시글 데이터 요청
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
        <h1>user {data.userId}'s post</h1>
        <h3>{data.title}</h3>
        {data.content}
        <br></br>
        <br></br>
        <br></br>
        <h4> comments</h4>
      </ul>
      {commentData.map((item) => (
        <ul key={item.id}>" {item.content} "</ul>
      ))}
    </div>
  );
}

export default Post;
