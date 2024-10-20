import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { convertUnixTimestampToISO } from "../utils/formatTime";
import { formatCurrency } from "../utils/formatNumber";

const CustomTable = ({ data, isLoading, role }) => {
  const getAmountColor = (type) =>
    type === "credit" || type === "deposit" ? "#05A660" : "#E50A3E";
  const getAmountSign = (type) =>
    type === "credit" || type === "deposit" ? "+" : "-";

  const isAdmin = role === "admin";

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#444" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }} align="center">
                STT
              </TableCell>
              {!isAdmin && (
                <TableCell sx={{ color: "#fff" }} align="center">
                  Họ và tên
                </TableCell>
              )}
              <TableCell sx={{ color: "#fff" }} align="center">
                Phương thức giao dịch
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Số tiền
              </TableCell>
              {!isAdmin && (
                <TableCell sx={{ color: "#fff" }} align="center">
                  Số dư hiện tại
                </TableCell>
              )}
              <TableCell sx={{ color: "#fff" }} align="center">
                Nội dung giao dịch
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Ngày tạo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Đang tải dữ liệu...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : data?.data?.length > 0 ? (
              data?.data?.map((row, index) => {
                const amountColor = getAmountColor(row?.type);
                const amountSign = getAmountSign(row?.type);
                return (
                  <TableRow
                    key={row?._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "#eee" },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    {!isAdmin && <TableCell>{row?.name}</TableCell>}
                    <TableCell align="center"> {row?.method}</TableCell>
                    <TableCell align="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        style={{ color: amountColor }}
                      >
                        <span style={{ color: amountColor }}>{amountSign}</span>
                        {formatCurrency(row?.balance)}
                      </Box>
                    </TableCell>
                    {!isAdmin && (
                      <TableCell align="center">
                        {formatCurrency(row?.balanceAfter)}
                      </TableCell>
                    )}
                    <TableCell>{row?.description}</TableCell>
                    <TableCell align="center">
                      {convertUnixTimestampToISO(row?.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Không có dữ liệu.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
