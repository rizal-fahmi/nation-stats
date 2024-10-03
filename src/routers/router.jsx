import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home.jsx";
import News from "../pages/News.jsx";
import Navbar from "../components/header/Navbar.jsx";
import Compare from "../pages/Compare.jsx";
import RestCompare from "../components/content/RestCompare.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/compare',
        element: <Compare />,
      },
      {
        path: '/compare/:country1/n/:country2',
        element: <RestCompare />,
      },
      {
        path: '/news',
        element: <News />,
      },
    ],
  },
]);

export default router;