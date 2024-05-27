import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home.page";
import { BookShowcase } from "./pages/bookshowcase/books.page";
import Auth from "./pages/authentication/auth.page";
import { useState } from "react";
import { IUser } from "./types/user.interface";
import { AuthProvider } from "./context/authContext";
import { AuthGuard } from "./components/authguard/authGuard";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider value={{ user, setUser }}>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/books"
              element={
                <AuthGuard>
                  <BookShowcase />
                </AuthGuard>
              }
            />
            <Route path="/auth">
              <Route
                path="login"
                element={
                  <AuthGuard>
                    <Auth page="LOGIN" />
                  </AuthGuard>
                }
              />
              <Route
                path="register"
                element={
                  <AuthGuard>
                    <Auth page="REG" />
                  </AuthGuard>
                }
              />
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
  );
}

export default App;
