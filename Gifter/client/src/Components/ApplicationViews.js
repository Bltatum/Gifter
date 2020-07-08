import React from "react";
import { Switch, Route , Redirect} from "react-router-dom";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostDetails from "./PostDetails";
import UserPost from "./UserPost";
import {useContext} from "react";
import {UserProfileContext} from "../Providers/UserProfileProvider"
import Login from "./Login";
import Register from "./Register";


const ApplicationViews = () => {

  const { isLoggedIn } = useContext(UserProfileContext);
  return (
    <main>
    <Switch>
      <Route path="/" exact>
      {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
      </Route>

      <Route path="/add">
      {isLoggedIn ? <PostForm/> : <Redirect to="/login" />}
      </Route>

      <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

      <Route path="/posts/:id">
        <PostDetails/>
      </Route>

      
      <Route path="/users/:id">
      {isLoggedIn ? <UserPost/> : <Redirect to="/login" />}
      </Route>
    </Switch>
    </main>
  );
};

export default ApplicationViews;