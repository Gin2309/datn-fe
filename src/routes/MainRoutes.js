import { lazy } from "react";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import Guard from "./Guard";

import FormUsers from "../modules/Users/FormUser/FormUsers";
import FormClasses from "../modules/Classes/FormClasses";
import FormSubject from "../modules/Subject/FormSubject";

const UsersPage = Loadable(lazy(() => import("../pages/UsersPage")));
const GradePage = Loadable(lazy(() => import("../pages/GradePage")));
const ClassesPage = Loadable(lazy(() => import("../pages/ClassesPage")));
const SubjectPage = Loadable(lazy(() => import("../pages/SubjectPage")));
const ProfilePage = Loadable(lazy(() => import("../pages/ProfilePage")));
const UserDetail = Loadable(lazy(() => import("../pages/UserDetail")));
const SendNoti = Loadable(lazy(() => import("../pages/SendNoti")));
const Noti = Loadable(lazy(() => import("../pages/Noti")));

const MainRoutes = {
  path: "/admin",
  element: <MainLayout />,
  children: [
    // level 1
    {
      path: "users",
      element: <Guard element={<UsersPage />} allowedRoles={["admin"]} />,
    },
    {
      path: "grade",
      element: <Guard element={<GradePage />} allowedRoles={["teacher"]} />,
    },
    {
      path: "classes",
      element: <Guard element={<ClassesPage />} allowedRoles={["admin"]} />,
    },
    {
      path: "subject",
      element: <Guard element={<SubjectPage />} allowedRoles={["admin"]} />,
    },
    {
      path: "profile",
      element: (
        <Guard
          element={<ProfilePage />}
          allowedRoles={["admin", "teacher", "student"]}
        />
      ),
    },
    {
      path: "send-noti",
      element: <Guard element={<SendNoti />} allowedRoles={["admin"]} />,
    },
    {
      path: "notification",
      element: (
        <Guard element={<Noti />} allowedRoles={["teacher", "student"]} />
      ),
    },
    // level 2
    {
      path: "user-detail/:id",
      element: <Guard element={<UserDetail />} allowedRoles={["admin"]} />,
    },
    // level 3
    {
      path: "add-user",
      element: (
        <Guard element={<FormUsers mode="add" />} allowedRoles={["admin"]} />
      ),
    },
    {
      path: "edit-user/:id",
      element: (
        <Guard element={<FormUsers mode="edit" />} allowedRoles={["admin"]} />
      ),
    },
    {
      path: "add-subject",
      element: (
        <Guard element={<FormSubject mode="add" />} allowedRoles={["admin"]} />
      ),
    },
    {
      path: "edit-subject/:id",
      element: (
        <Guard element={<FormSubject mode="edit" />} allowedRoles={["admin"]} />
      ),
    },
    {
      path: "add-classes",
      element: (
        <Guard element={<FormClasses mode="add" />} allowedRoles={["admin"]} />
      ),
    },
    {
      path: "edit-classes/:id",
      element: (
        <Guard element={<FormClasses mode="edit" />} allowedRoles={["admin"]} />
      ),
    },
  ],
};

export default MainRoutes;
