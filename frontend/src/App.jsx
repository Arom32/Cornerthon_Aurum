import { Routes, Route } from "react-router-dom";
// App.jsx는 src 폴더에 있고, 컴포넌트들은 상위의 signup 폴더에 있으므로 ../ 를 써야 합니다.
import LoginForm from "../login/login"; 
import SignupForm from "../signup/signup"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}

export default App;