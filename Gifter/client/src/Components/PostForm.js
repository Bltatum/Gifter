
import { PostContext } from "../Providers/PostProvider";
import React, { useRef, useContext } from "react";
import { Form } from "reactstrap";
import { useHistory } from "react-router-dom";

const cancelForm = () => { 
  document.getElementById("addPostForm").reset();
}

export default (props) => {
    const { addPost } = useContext(PostContext);

const title = useRef()
const imageUrl = useRef()
const caption = useRef()
const userProfileId = useRef()

const history = useHistory();

const newPost = ()=>{
addPost({
    title: title.current.value,
    imageUrl: imageUrl.current.value,
    caption: caption.current.value,
    userProfileId: parseInt(userProfileId.current.value),
    dateCreated: new Date()
    
}).then((p) => {
  // Navigate the user back to the home route
  history.push("/");
});
};

return (
  
    <Form className="addPostForm" id="addPostForm">
      <h2 className="addPost_header">Add Post</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          ref={title}
          required
          autoFocus
          className="form-control"
          placeholder="Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">ImageUrl</label>
        <input
          type="text"
          id="imageUrl"
          ref={imageUrl}
          required
          autoFocus
          className="form-control"
          placeholder="ImageUrl"
        />
      </div>
      <div className="form-group">
        <label htmlFor="caption">Caption</label>
        <input
          type="text"
          id="caption"
          ref={caption}
          required
          autoFocus
          className="form-control"
          placeholder="Caption"
        />
      </div>
      <div className="form-group">
        <label htmlFor="userProfileId">User Id</label>
        <input
          type="text"
          id="userrofileId"
          ref={userProfileId}
          required
          autoFocus
          className="form-control"
          placeholder="User Id"
        />
      </div>

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault(); 
          newPost();
          cancelForm();
        }}
        className="btn btn-primary">
        <b>Post</b>
      </button>
      </Form>
      )
};
