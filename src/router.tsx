import { Home } from "@pages/Home/Home";
import { MemberDetailsController } from "@pages/MemberDetails/MemberDetailsController";
import { NotFound } from "@pages/NotFound/NotFound";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/member/:email",
    element: <MemberDetailsController />,
  },
]);
