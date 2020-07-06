import React from "react";
import "./App.css";
import { PostProvider } from "./Providers/PostProvider";
import ApplicationViews from "./Components/ApplicationViews"
import Header from "./Components/Header"
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <PostProvider>
        <Header/>
        <ApplicationViews/>
      </PostProvider>
      </Router>
    </div>
  );
}

export default App;