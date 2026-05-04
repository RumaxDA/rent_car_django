import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/templates/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Fleet from "./pages/Fleet";
import Rentals from "./pages/Rentals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [{ path: "/fleet", element: <Fleet /> }],
  },
  {
    element: <MainLayout />,
    children: [{ path: "/rentals", element: <Rentals /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
