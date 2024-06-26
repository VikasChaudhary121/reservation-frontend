import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homeComp/home";
import Hotel from "./pages/hotel/hotel";
import List from "./pages/listComp/List";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
