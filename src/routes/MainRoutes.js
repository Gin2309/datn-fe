import { lazy } from "react";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import Guard from "./Guard";

import FormUsers from "../modules/Users/FormUser/FormUsers";
import FormClasses from "../modules/Classes/FormClasses";
import FormSubject from "../modules/Subject/FormSubject";

const UsersPage = Loadable(lazy(() => import("../pages/UsersPage")));
const TeacherPage = Loadable(lazy(() => import("../pages/TeacherPage")));
const ClassesPage = Loadable(lazy(() => import("../pages/ClassesPage")));
const SubjectPage = Loadable(lazy(() => import("../pages/SubjectPage")));
const UserDetail = Loadable(lazy(() => import("../pages/UserDetail")));

const MainRoutes = {
  path: "/admin",
  element: <MainLayout />,
  children: [
    // level 1
    {
      path: "users",
      element: (
        <Guard element={<UsersPage />} allowedRoles={["admin", "teacher"]} />
      ),
    },
    {
      path: "teachers",
      element: <Guard element={<TeacherPage />} allowedRoles={["admin"]} />,
    },
    {
      path: "classes",
      element: (
        <Guard element={<ClassesPage />} allowedRoles={["admin", "teacher"]} />
      ),
    },
    {
      path: "subject",
      element: (
        <Guard
          element={<SubjectPage />}
          allowedRoles={["admin", "teacher", "student"]}
        />
      ),
    },
    // level 2
    {
      path: "user-detail/:id",
      element: (
        <Guard element={<UserDetail />} allowedRoles={["admin", "teacher"]} />
      ),
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
        <Guard
          element={<FormSubject mode="add" />}
          allowedRoles={["admin", "teacher"]}
        />
      ),
    },
    {
      path: "edit-subject/:id",
      element: (
        <Guard
          element={<FormSubject mode="edit" />}
          allowedRoles={["admin", "teacher"]}
        />
      ),
    },
    {
      path: "add-classes",
      element: (
        <Guard
          element={<FormClasses mode="add" />}
          allowedRoles={["admin", "teacher"]}
        />
      ),
    },
    {
      path: "edit-classes/:id",
      element: (
        <Guard
          element={<FormClasses mode="edit" />}
          allowedRoles={["admin", "teacher"]}
        />
      ),
    },
  ],
};

export default MainRoutes;
