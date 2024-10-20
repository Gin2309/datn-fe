// assets
import { SettingOutlined } from "@ant-design/icons";
import PaymentOutlined from "@mui/icons-material/PaymentOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// icons
const icons = {
  SettingOutlined,
  PaymentOutlined,
  DirectionsCarIcon,
};

const config = {
  id: "group-config",
  title: "Cấu hình",
  type: "group",
  children: [
    {
      id: "config",
      title: "Cấu hình",
      type: "item",
      url: "/admin/config",
      icon: icons.SettingOutlined,
      breadcrumbs: true,
    },
    {
      id: "config-payment",
      title: "Cấu hình thanh toán",
      type: "item",
      url: "/admin/config-payment",
      icon: icons.PaymentOutlined,
      breadcrumbs: true,
    },
  ],
};

export default config;
