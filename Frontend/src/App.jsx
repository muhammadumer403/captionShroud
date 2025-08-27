import { Routes, Route } from "react-router-dom";
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
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Body />
          </PrivateRoute>
        }
      >
        <Route path="upload" element={<Upload />} />
        <Route path="preview/:id" element={<Preview />} />
        <Route path="editor/:id" element={<Editor />} />
        <Route path="export/:id" element={<Export />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}

export default App;
