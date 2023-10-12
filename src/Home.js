import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//기본 홈. 게시물 리스트 나열되있는 컴포넌트
function Home() {
  const [data, setData] = useState([]);
  const [pagee, setPagee] = useState(1);
  const [lastPage, setLastPage] = useState();

  const navigate = useNavigate();

  // 백엔드 API에 게시물 데이터 요청
  useEffect(() => {
    fetch("http://localhost:3000/posts", {
      headers: new Headers({
        pageNumber: `${pagee}`,
      }),
    }) // 백엔드 API 엔드포인트
      .then((response) => response.json())
      .then((data) => {
        // 받은 데이터를 상태에 저장
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [pagee]);

  // 백엔드 API에 게시물 데이터 갯수 요청(패이지 관련)
  useEffect(() => {
    fetch("http://localhost:3000/posts/pagenum")
      .then((response) => response.json())
      .then((data) => {
        // 받은 데이터를 상태에 저장
        console.log("포스팅수는 : " + data);
        console.log(typeof data);
        setLastPage(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //전페이지로 돌아가는 함수
  function prevPage() {
    if (pagee > 1) {
      console.log("page is : " + pagee - 1);
      setPagee(pagee - 1);
    }
  }

  //다음페이지로 넘어가는 함수
  //lastPage는 그냥 요청 한 번 더 보내서 받아옴.
  function nextPage() {
    if (pagee < lastPage) {
      setPagee(pagee + 1);
    }
  }

  return (
    <div>
      <h1>Welcome to Fanmaum community</h1>
      <ul>
        <br></br>
        {data.map((item) => (
          <li key={item.id}>
            <h3>
              user {item.userId} : {item.title}
              <button
                onClick={() =>
                  navigate(`/posts/${item.id}`, { state: { id: item.id } })
                }
              >
                Go to Post detail
              </button>
            </h3>
          </li>
        ))}
        <button onClick={prevPage}>prev</button>
        <button onClick={nextPage}>next</button>
        <Link to="/posts/new">post new content</Link>
      </ul>
    </div>
  );
}

export default Home;
