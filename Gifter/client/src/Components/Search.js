import React, { useState, useContext, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { PostContext } from "../Providers/PostProvider";
import Post from "./Post";

export const SearchResults = ({ searchTerms }) => {
  const { posts } = useContext(PostContext);

  const [filteredPost, setFiltered] = useState([]);
  const [selectedPost, setPost] = useState({
    post: {},
  });

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerms)
      );
      setFiltered(subset);
    } else {
      setFiltered([]);
    }
  }, [searchTerms, posts]);

  return (
    <div className="searchResults">
      <div className="postsSearch">
      <div className="cards-column">
          {filteredPost.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          </div>
      </div>
    </div>
  );
};