import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { formatDistance } from "../utils/formatDistance";
import { formatCurrency } from "../utils/formatNumber";

const DataTable = ({ data, isLoading, onEditClick, labels }) => {
  const formatValue = (item) => {
    switch (item.type) {
      case "Khoảng cách":
        return formatDistance(item.value);
      case "Tiền tệ":
        return formatCurrency(item.value);
      case "Phần trăm":
        return `${item.value}%`;
      default:
        return item.value;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: "#444" }}>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}>Thông số</TableCell>
            <TableCell sx={{ color: "#fff" }}>Giá trị</TableCell>
            <TableCell sx={{ color: "#fff" }}>Mô tả</TableCell>
            <TableCell sx={{ color: "#fff" }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body1" color="textSecondary">
                  Đang tải dữ liệu...
                </Typography>
              </TableCell>
            </TableRow>
          ) : data?.length > 0 ? (
            data.map((item) => {
              const label =
                labels?.find((label) => label.key === item.key)?.label ||
                item.key;
              const formattedValue = formatValue
                ? formatValue(item)
                : item.value;

              return (
                <TableRow key={item._id}>
                  <TableCell
                    sx={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      minWidth: "170px",
                    }}
                  >
                    {label}
                  </TableCell>
                  <TableCell
                    sx={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      minWidth: "355px",
                    }}
                  >
                    {formattedValue}
                  </TableCell>
                  <TableCell
                    sx={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      minWidth: "355px",
                    }}
                  >
                    {item.desc}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="inherit"
                        aria-label="edit"
                        onClick={() => onEditClick(item)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body1" color="textSecondary">
                  Không có dữ liệu.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
