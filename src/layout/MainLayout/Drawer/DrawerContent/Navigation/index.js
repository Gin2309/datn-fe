import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import NavGroup from "./NavGroup";
import menuItem from "../../../../../menu-items";

const Navigation = () => {
  const user = useSelector((state) => state?.auth?.user);
  const role = user?.role;

  const filteredNavGroups = menuItem.items.map((item) => {
    if (item?.children && Array.isArray(item.children)) {
      const filteredChildren = item.children.filter((child) => {
        if (
          !child.allowedRoles ||
          (Array.isArray(child.allowedRoles) &&
            child.allowedRoles.includes(role))
        ) {
          return true;
        }
        return false;
      });

      if (filteredChildren.length > 0) {
        return (
          <NavGroup
            key={item.id}
            item={{ ...item, children: filteredChildren }}
          />
        );
      }

      return null;
    }

    return null;
  });

  return <Box sx={{ pt: 2 }}>{filteredNavGroups}</Box>;
};

export default Navigation;
