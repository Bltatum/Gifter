import React from "react";
import "./App.css";
import { PostProvider } from "./Providers/PostProvider";
import ApplicationViews from "./Components/ApplicationViews"
import Header from "./Components/Header"
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./Providers/UserProfileProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
      <PostProvider>
        <Header/>
        <ApplicationViews/>
      </PostProvider>
      </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;