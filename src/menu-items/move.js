// assets
import { CarOutlined, FormOutlined } from "@ant-design/icons";

// icons
const icons = {
  CarOutlined,
  FormOutlined,
};

const move = {
  id: "move-dashboard",
  title: "Quản lý chuyến đi",
  type: "group",
  children: [
    {
      id: "move",
      title: "Chuyến đi",
      type: "item",
      url: "/admin/move",
      icon: icons.CarOutlined,
      breadcrumbs: true,
    },
    {
      id: "move-form",
      title: "Đơn đặt xe",
      type: "item",
      url: "/admin/move-form",
      icon: icons.FormOutlined,
      breadcrumbs: true,
    },
  ],
};

export default move;
