// assets
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
};

const support = {
  id: "group-support",
  title: "Quản lý hỗ trợ",
  type: "group",
  children: [
    {
      id: "sos",
      title: "SOS",
      type: "item",
      url: "/admin/sos",
      icon: icons.ExclamationCircleOutlined,
      breadcrumbs: true,
    },
    {
      id: "support",
      title: "Đơn hỗ trợ",
      type: "item",
      url: "/admin/support",
      icon: icons.QuestionCircleOutlined,
      breadcrumbs: true,
    },
  ],
};

export default support;
