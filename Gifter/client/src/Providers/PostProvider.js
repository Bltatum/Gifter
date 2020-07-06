import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    return fetch("/api/post")
      .then((res) => res.json())
      .then(setPosts);
  };

  const addPost = (post) => {
    return fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getAllPosts);
  };

  const searchPosts = (search) => {
    return fetch(`api/post/search?q=${search}`)
  .then(res => res.json())
  .then(setPosts)
  };

  const getPost = (id) => {
    return fetch(`/api/post/${id}`).then((res) => res.json());
};

const getUserPost = (id) => {
  return fetch(`/api/post/getbyuser/${id}`).then((res) => res.json());
};

  return (
    <PostContext.Provider value={{ posts, getAllPosts, addPost, searchPosts, getPost, getUserPost }}>
      {props.children}
    </PostContext.Provider>
  );
};