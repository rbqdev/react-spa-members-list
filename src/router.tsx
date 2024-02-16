import { Home } from "@pages/Home/Home";
import { MemberDetails } from "@pages/MemberDetails/MemberDetails";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/member/:email",
    element: <MemberDetails />,
  },
]);
