// assets
import {
  WalletOutlined,
  SettingOutlined,
  DollarOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

// icons
const icons = {
  WalletOutlined,
  SettingOutlined,
  DollarOutlined,
  FundProjectionScreenOutlined,
  SwapHorizIcon,
};

const price = {
  id: "group-price",
  title: "Quản lý giá/khuyến mãi",
  type: "group",
  children: [
    {
      id: "price",
      title: "Giá",
      type: "item",
      url: "/admin/price",
      icon: icons.DollarOutlined,
      breadcrumbs: true,
    },
    {
      id: "discount",
      title: "Khuyến mãi",
      type: "item",
      url: "/admin/discount",
      icon: icons.FundProjectionScreenOutlined,
      breadcrumbs: true,
    },
    // {
    //   id: "kpi",
    //   title: "KPI",
    //   type: "item",
    //   url: "/admin/kpi",
    //   icon: icons.WalletOutlined,
    //   breadcrumbs: true,
    // },
    // {
    //   id: "transaction",
    //   title: "Quản lý giao dịch",
    //   type: "item",
    //   url: "/admin/transaction",
    //   icon: icons.SwapHorizIcon,
    //   breadcrumbs: true,
    // },
  ],
};

export default price;
