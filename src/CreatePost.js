import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//새로운 개시물 쓰는 컴포넌트
function CreatePost() {
  const [postData, setPostData] = useState({
    data: {
      // id: 22,
      userId: null,
      title: "",
      content: "",
    },
  });
  const [errorText, setErrorText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  //게시물 생성하기
  const sendPostRequest = () => {
    //실제로 fetch하는 부분
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
          // POST 요청이 성공한 경우(상태코드 200)
          console.log(postData);
          console.log("게시물이 성공적으로 생성되었습니다.");
          // <redirect to="/posts"></redirect>
          navigate("/posts");
        } else {
          // POST 요청이 실패한 경우(만약에 서버에서 validation이나 예외처리에 걸리면 400 등의 코드를 보낼 것임)
          console.error("게시물 생성에 실패했습니다.");
        }
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

  // 입력 폼에서 데이터를 업데이트하는 함수 - number전용
  const handleInputIntChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    //숫자로 변환 후 해당 value가 올바르면(숫자) 그냥 두고
    //만약 value가 숫자가 아니라면 오류메시지와 함께 제출을 막음
    const numericValue = Number(value);
    //올바름(숫자)
    if (!isNaN(numericValue)) {
      setPostData((prevData) => ({
        data: {
          ...prevData.data,
          [name]: numericValue,
        },
      }));
      setErrorText("");
      setIsDisabled(false);
    }
    //올바르지않음(숫자 외)
    else {
      console.log("입력한 id는 숫자로 해주세요");
      setErrorText("숫자를 입력해주세요");
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form>
        <div>
          <label>userId:</label>
          <input name="userId" onChange={handleInputIntChange} />
          {errorText}
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={postData.data.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={postData.data.content}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={sendPostRequest} disabled={isDisabled}>
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
