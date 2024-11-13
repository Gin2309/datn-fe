import { lazy } from "react";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import FormUsers from "../modules/Users/FormUser/FormUsers";

const UsersPage = Loadable(lazy(() => import("../pages/UsersPage")));
const TeacherPage = Loadable(lazy(() => import("../pages/TeacherPage")));
const UserDetail = Loadable(lazy(() => import("../pages/UserDetail")));
const MainRoutes = {
  path: "/admin",
  element: <MainLayout />,
  children: [
    // level1
    {
      path: "users",
      element: <UsersPage />,
    },
    {
      path: "teachers",
      element: <TeacherPage />,
    },
    // level 2
    {
      path: "user-detail/:id",
      element: <UserDetail />,
    },
    // level 3
    {
      path: "add-user",
      element: <FormUsers mode="add" />,
    },
    {
      path: "edit-user/:id",
      element: <FormUsers mode="edit" />,
    },
  ],
};

export default MainRoutes;
