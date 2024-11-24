import {
  UserOutlined,
  FileDoneOutlined,
  TagsOutlined,
  AlignLeftOutlined,
  FormOutlined,
  CrownOutlined,
  SendOutlined,
} from "@ant-design/icons";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

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
  AccountCircleOutlinedIcon,
  SendOutlined,
  NotificationsNoneOutlinedIcon,
};

const account = {
  id: "group-account",
  title: "Quản lý",
  type: "group",
  children: [
    {
      id: "profile",
      title: "Profile",
      type: "item",
      url: "/admin/profile",
      icon: icons.AccountCircleOutlinedIcon,
      breadcrumbs: true,
    },
    {
      id: "users",
      title: "Quản lý người dùng",
      type: "item",
      url: "/admin/users",
      icon: icons.UserOutlined,
      breadcrumbs: true,
      allowedRoles: ["admin"],
    },
    {
      id: "teachers",
      title: "Quản lý điểm",
      type: "item",
      url: "/admin/grade",
      icon: icons.PermContactCalendarOutlinedIcon,
      breadcrumbs: true,
      allowedRoles: ["admin", "teacher"],
    },
    {
      id: "classes",
      title: "Quản lý lớp học",
      type: "item",
      url: "/admin/classes",
      icon: icons.SchoolOutlinedIcon,
      breadcrumbs: true,
      allowedRoles: ["admin", "teacher"],
    },
    {
      id: "subject",
      title: "Quản lý môn học",
      type: "item",
      url: "/admin/subject",
      icon: icons.ClassOutlinedIcon,
      breadcrumbs: true,
      allowedRoles: ["admin"],
    },
    {
      id: "send-noti",
      title: "Gửi thông báo",
      type: "item",
      url: "/admin/send-noti",
      icon: icons.SendOutlined,
      breadcrumbs: true,
      allowedRoles: ["admin"],
    },
    {
      id: "notification",
      title: "Thông báo",
      type: "item",
      url: "/admin/notification",
      icon: icons.NotificationsNoneOutlinedIcon,
      breadcrumbs: true,
    },
  ],
};

export default account;
