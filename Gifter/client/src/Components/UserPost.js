import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../Providers/PostProvider";
import { useParams } from "react-router-dom";
import Post from "./Post";

const UserPost = () => {
  const [post, setPost] = useState();
  const { getUserPost } = useContext(PostContext);
  const { posts, getAllPosts } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    getUserPost(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
        {post.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
          {/* <ListGroup>
            {post.comment.map((c) => (
              <ListGroupItem>{c.message}</ListGroupItem>
            ))}
          </ListGroup> */}
        </div>
      </div>
    </div>
  );
};

export default UserPost;