// assets
import {
  UserOutlined,
  FileDoneOutlined,
  TagsOutlined,
  AlignLeftOutlined,
  UsergroupAddOutlined,
  FormOutlined,
  CarOutlined,
  CrownOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  UserOutlined,
  FileDoneOutlined,
  TagsOutlined,
  AlignLeftOutlined,
  UsergroupAddOutlined,
  FormOutlined,
  CarOutlined,
  CrownOutlined,
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
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: true,
    },
  ],
};

export default account;
