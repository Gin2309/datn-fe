// assets
import {
  UserOutlined,
  FileDoneOutlined,
  TagsOutlined,
  AlignLeftOutlined,
  FormOutlined,
  CrownOutlined,
} from "@ant-design/icons";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";

// icons
const icons = {
  UserOutlined,
  FileDoneOutlined,
  TagsOutlined,
  AlignLeftOutlined,
  FormOutlined,
  CrownOutlined,
  SchoolOutlinedIcon,
  ClassOutlinedIcon,
  PermContactCalendarOutlinedIcon,
};

const account = {
  id: "group-account",
  title: "Quản lý tài khoản",
  type: "group",
  children: [
    {
      id: "users",
      title: "Quản lý người dùng",
      type: "item",
      url: "/admin/users",
      icon: icons.UserOutlined,
      breadcrumbs: true,
    },
    {
      id: "teachers",
      title: "Quản lý giáo viên",
      type: "item",
      url: "/admin/teachers",
      icon: icons.PermContactCalendarOutlinedIcon,
      breadcrumbs: true,
    },
    {
      id: "classes",
      title: "Quản lý lớp học",
      type: "item",
      url: "/admin/classes",
      icon: icons.SchoolOutlinedIcon,
      breadcrumbs: true,
    },
    {
      id: "subject",
      title: "Quản lý môn học",
      type: "item",
      url: "/admin/subject",
      icon: icons.ClassOutlinedIcon,
      breadcrumbs: true,
    },
  ],
};

export default account;
