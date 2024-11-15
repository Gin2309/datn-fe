// assets
import {
  BarChartOutlined,
  FileDoneOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  BarChartOutlined,
  FileDoneOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
};

const overview = {
  id: "group-overview",
  title: "Tổng quan",
  type: "group",
  children: [
    {
      id: "analysis",
      title: "Thống kê, phân tích",
      type: "item",
      url: "/admin/analysis",
      icon: icons.BarChartOutlined,
      breadcrumbs: true,
    },
    {
      id: "notification",
      title: "Thông báo",
      type: "item",
      url: "/admin/notification",
      icon: icons.SendOutlined,
      breadcrumbs: true,
    },
  ],
};

export default overview;
