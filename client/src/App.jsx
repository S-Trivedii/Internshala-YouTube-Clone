import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUser } from "./utils/context/UserContext";
import { useEffect } from "react";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  const { setUser, setIsLoggedIn } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
