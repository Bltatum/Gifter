import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../Providers/PostProvider";
import {SearchBar} from "./SearchBar";
import {SearchResults} from "./Search";
import Post from "./Post";


const PostList = () => {
  const { posts, getAllPosts } = useContext(PostContext);
 
  const [searchTerms, setTerms] = useState(null);

 useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="postList">
      <SearchBar setTerms={setTerms} />
        <SearchResults searchTerms={searchTerms} />
        <div className="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;