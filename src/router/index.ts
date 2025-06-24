import Home from "@/page/Home";
import { createBrowserRouter } from "react-router";
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: Home }],
  },
]);

export default router;
