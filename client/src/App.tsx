import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home.page";
import { BookShowcase } from "./pages/bookshowcase/books.page";
import Login from "./pages/authentication/login.page";
import Register from "./pages/authentication/register.page";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/books" element={<BookShowcase />} />
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
