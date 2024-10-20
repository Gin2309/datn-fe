// assets
import {} from "@ant-design/icons";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HistoryIcon from "@mui/icons-material/History";

// icons
const icons = {
  SwapHorizIcon,
  HistoryIcon,
};

const transaction = {
  id: "group-transaction",
  title: "Quản lý giao dịch",
  type: "group",
  children: [
    {
      id: "transaction",
      title: "Quản lý giao dịch",
      type: "item",
      url: "/admin/transaction",
      icon: icons.SwapHorizIcon,
      breadcrumbs: true,
    },
    {
      id: "history-transaction",
      title: "Lịch sử giao dịch",
      type: "item",
      url: "/admin/history-transaction",
      icon: icons.HistoryIcon,
      breadcrumbs: true,
    },
  ],
};

export default transaction;
