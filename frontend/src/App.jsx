// src/App.jsx
import { Routes, Route } from "react-router-dom";
import SignupForm from "../signup/signup"; // 경로 확인!

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}
export default App;