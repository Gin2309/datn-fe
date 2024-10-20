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
      id: "drivers",
      title: "Quản lý tài xế",
      type: "item",
      url: "/admin/drivers",
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: true,
    },
    {
      id: "vip",
      title: "VIP",
      type: "item",
      url: "/admin/vip",
      icon: icons.CrownOutlined,
      breadcrumbs: true,
    },
    {
      id: "drivers-form",
      title: "Đơn đăng ký tài xế",
      type: "item",
      url: "/admin/drivers-form",
      icon: icons.FormOutlined,
      breadcrumbs: true,
    },
  ],
};

export default account;
