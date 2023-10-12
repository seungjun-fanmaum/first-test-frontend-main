import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Post from "./Post";
import CreatePost from "./CreatePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/new" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
