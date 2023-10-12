import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//새로운 개시물 쓰는 컴포넌트
function CreatePost() {
  const [postData, setPostData] = useState({
    data: {
      id: 15,
      userId: 0,
      title: "",
      content: "",
    },
  });
  const navigate = useNavigate();

  const sendPostRequest = () => {
    //실제로 보내는 부분
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터를 전송
      },
      body: JSON.stringify(postData), // JSON 데이터로 변환
    })
      //후처리
      .then((response) => {
        if (response.ok) {
          // POST 요청이 성공한 경우
          console.log(postData);
          console.log("게시물이 성공적으로 생성되었습니다.");
          // <redirect to="/posts"></redirect>
          navigate("/posts");
        } else {
          // POST 요청이 실패한 경우
          console.error("게시물 생성에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  };

  // 입력 폼에서 데이터를 업데이트하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      data: {
        ...prevData.data,
        [name]: value,
      },
    }));
  };

  // 입력 폼에서 데이터를 업데이트하는 함수
  const handleInputIntChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10); // 숫자로 변환
    setPostData((prevData) => ({
      data: {
        ...prevData.data,
        [name]: numericValue,
      },
    }));
  };

  return (
    <div>
      {/* {postData.id} */}

      <h2>Create Post</h2>
      <form>
        <div>
          <label>userId:</label>
          <input
            name="userId"
            type="number"
            // value={postData.data.userId}
            onChange={handleInputIntChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            // value={postData.data.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            // value={postData.data.content}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={sendPostRequest}>
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
