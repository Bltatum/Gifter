import React from "react";
import "./App.css";
import { PostProvider } from "./Providers/PostProvider";
import PostList from "./Components/PostList";
import PostForm from "./Components/PostForm";
import { SearchPosts } from "./Components/SearchPost";
import { SearchBar } from "./Components/SearchBar";

function App() {
  return (
    <div className="App">
      <PostProvider>
        <PostForm/>
        <PostList />
      </PostProvider>
    </div>
  );
}

export default App;