import { createHashRouter, RouterProvider  } from "react-router-dom";
import Home from "./screen/Home";
import Layout from "./screen/Layout";
import Graph from "./screen/Graph";


function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "graph", element: <Graph /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;