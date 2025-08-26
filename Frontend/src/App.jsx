import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./componets/Body";
import PrivateRoute from "./componets/auth/PrivateRoute";
import Upload from "./Pages/Upload";
import Preview from "./Pages/Preview";
import Editor from "./Pages/Editor";
import Export from "./Pages/Export";
import History from "./Pages/History";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
          <Route
            path="preview/:id"
            element={
              <PrivateRoute>
                <Preview />
              </PrivateRoute>
            }
          />
          <Route
            path="editor/:id"
            element={
              <PrivateRoute>
                <Editor />
              </PrivateRoute>
            }
          />
          <Route
            path="export/:id"
            element={
              <PrivateRoute>
                <Export />
              </PrivateRoute>
            }
          />
          <Route
            path="history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
