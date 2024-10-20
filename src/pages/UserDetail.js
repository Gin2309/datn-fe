import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getDetailsUser } from "../services/user.api";
import { getMoveHistory } from "../services/move.api";
import { getContact } from "../services/sos.api";
import { deleteUser } from "../services/user.api";

import {
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Tab,
  Paper,
  PaginationItem,
  TableHead,
  Pagination,
  FormControl,
  MenuItem,
  Select,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatCurrency } from "../utils/formatNumber";
import { convertUnixTimestampToISO } from "../utils/formatTime";
import { formatDistance } from "../utils/formatDistance";
import { formatNumber } from "../utils/formatNumber";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

import { DatePicker } from "antd";
import dayjs from "dayjs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserDetail = () => {
  const { RangePicker } = DatePicker;
  const { id } = useParams();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [formFilter, setFormFilter] = useState({
    user_id: "",
    user_name: "",
    driver_id: "",
    driver_name: "",
    from: "",
    to: "",
    page: 1,
    pageSize: 20,
  });
  const { data: detail, isLoading: isDetailLoading } = useQuery(
    ["USER_DETAIL", id],
    () => getDetailsUser(id),
    { refetchOnWindowFocus: false }
  );

  const { data, isLoading } = useQuery(
    ["HISTORY", id, formFilter],
    () =>
      getMoveHistory(
        id,
        formFilter.user_id,
        formFilter.user_name,
        formFilter.driver_id,
        formFilter.driver_name,
        formFilter.from,
        formFilter.to,
        formFilter.page,
        formFilter.pageSize
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: contact, isLoading: isContactLoading } = useQuery(
    ["CONTACT", id],
    () => getContact(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (isDetailLoading || !detail) {
    return <div>Đang tải...</div>;
  }

  const handleDateChange = (dates, dateStrings) => {
    setFormFilter({
      ...formFilter,
      from: dateStrings[0],
      to: dateStrings[1],
    });
  };

  const totalPages = Math.ceil(data?.totalCount / formFilter.pageSize);
  const currentPage = formFilter.page;
  const pageSize = formFilter.pageSize;
  const totalCount = data?.totalCount || 0;
  const currentCount = Math.min(currentPage * pageSize, totalCount);

  const statusMapping = {
    default: "Mặc định",
    pending: "Chờ xử lý",
    waiting_pick: "Chờ tài xế đón",
    move: "Đang di chuyển",
    done: "Đã hoàn thành",
    cancel: "Hủy chuyến",
  };

  const { firstname, phone, email, vehicles, avatar } = detail?.data;

  const personalInfoFields = [
    { label: "Họ và tên", value: firstname },
    { label: "Số điện thoại", value: phone },
    { label: "Email", value: email },
  ];

  const handleClickRow = (_id) => {
    navigate(`/admin/move-detail/${_id}`);
  };

  const handleReset = () => {
    setFormFilter({
      user_id: "",
      user_name: "",
      driver_id: "",
      driver_name: "",
      from: "",
      to: "",
      page: 1,
      pageSize: 20,
    });
  };

  const handleDeleteSubmit = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(id);
      toast.success("Xóa thành công");
      navigate("/admin/users");
      setOpenDialog(false);
    } catch (error) {
      toast.error(`Lỗi khi xóa: ${error.message || error}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box padding={3} paddingTop={0}>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{ mb: 4, mr: 1 }}
        >
          Quay lại
        </Button>
        <Box>
          <Tooltip title="Chỉnh sửa người dùng">
            <IconButton
              sx={{ color: "#757574" }}
              aria-label="Edit"
              onClick={() => navigate(`/admin/edit-user/${id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa người dùng">
            <IconButton
              color="#757574"
              aria-label="Delete"
              onClick={() => setOpenDialog(true)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            bgcolor="#fff"
            borderRadius={4}
            padding={3}
            textAlign="center"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
          >
            <Avatar
              alt={firstname}
              src={avatar}
              sx={{ width: 150, height: 150, mb: 2, mx: "auto" }}
            />
            <Typography variant="h5" sx={{ fontSize: "16px" }} gutterBottom>
              {firstname}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <Box
            bgcolor="#fff"
            borderRadius={4}
            padding={3}
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="h4" gutterBottom>
                Thông tin cá nhân
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableBody>
                  {personalInfoFields.map((field, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "& td": {
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        },
                        "&:first-of-type td": {
                          borderTop: "1px solid rgba(224, 224, 224, 1)",
                        },
                      }}
                    >
                      <TableCell sx={{ paddingcenter: 0 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ fontSize: "16px" }}
                        >
                          {field.label}:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontSize: "16px" }}>
                          {field.value}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            marginTop={1}
            bgcolor="#fff"
            borderRadius={4}
            padding={3}
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
          >
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Danh sách phương tiện" />
              <Tab label="Lịch sử chuyến đi" />
              <Tab label="Liên hệ khẩn cấp" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Danh sách phương tiện
              </Typography>
              <Grid container spacing={3}>
                {vehicles.map((vehicle, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box marginBottom={2}>
                      {vehicle.image && (
                        <img
                          src={vehicle.image}
                          alt={vehicle.vehicle_name}
                          style={{ maxWidth: "100%", maxHeight: "150px" }}
                        />
                      )}
                    </Box>
                    <Stack spacing={1}>
                      <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
                        Tên phương tiện:{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {vehicle.vehicle_name}
                        </span>
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
                        Loại phương tiện:{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {vehicle.vehicle_type}
                        </span>
                      </Typography>
                      {/* <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
                        Loại hộp số:{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {vehicle.vehicle_style}
                        </span>
                      </Typography>      */}
                      <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
                        Biển số phương tiện:{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {vehicle.license_plate}
                        </span>
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Lịch sử chuyến đi
              </Typography>
              <Accordion sx={{ mb: 4, mt: 4 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Tìm kiếm</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <form>
                      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Tìm kiếm theo tên tài xế"
                          fullWidth
                          variant="outlined"
                          value={formFilter.driver_name}
                          onChange={(event) =>
                            setFormFilter({
                              ...formFilter,
                              driver_name: event.target.value,
                            })
                          }
                        />
                        <TextField
                          id="standard-multiline-flexible"
                          label="Tìm kiếm theo ID tài xế"
                          fullWidth
                          variant="outlined"
                          value={formFilter.driver_id}
                          onChange={(event) =>
                            setFormFilter({
                              ...formFilter,
                              driver_id: event.target.value,
                            })
                          }
                        />
                      </Stack>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 2,
                          mt: 4,
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#0e9cff", fontWeight: "400" }}
                        >
                          Tìm kiếm
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ ml: 3 }}
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Box mb={3}>
                <RangePicker
                  onChange={handleDateChange}
                  size="large"
                  placeholder={["Từ ngày", "Đến ngày"]}
                  value={
                    formFilter.from && formFilter.to
                      ? [dayjs(formFilter.from), dayjs(formFilter.to)]
                      : []
                  }
                />
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{ background: "#444" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        STT
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Điểm đón
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Điểm đến
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Khoảng cách
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Loại phương tiện
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Số tiền
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Giảm giá
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Trạng thái
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Dịch vụ
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Đánh giá
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Thời gian
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="center">
                        Tài xế
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
                    ) : rows.length > 0 ? (
                      rows.map((row, index) => (
                        <TableRow
                          key={row?._id}
                          onClick={() => handleClickRow(row._id)}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": { backgroundColor: "#eee" },
                            cursor: "pointer",
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                              minWidth: "200px",
                            }}
                          >
                            {row?.start_location}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                              minWidth: "200px",
                            }}
                          >
                            {row?.end_location}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {formatDistance(row.distance)}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {row?.vehicle_type}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {formatCurrency(row?.amount)}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {formatCurrency(row?.discount_price)}
                          </TableCell>
                          <TableCell align="center">
                            {statusMapping[row?.status]}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                              minWidth: "130px",
                            }}
                          >
                            {row?.service_type === "current"
                              ? "Đặt xe trực tiếp"
                              : "Đặt xe sau"}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                              minWidth: "60px",
                            }}
                          >
                            {row?.rate ? `${row?.rate} sao` : null}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {row?.service_type === "current"
                              ? ""
                              : convertUnixTimestampToISO(row?.time)}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {row.driver_name
                              ? row.driver_name
                              : "Không có tài xế"}
                          </TableCell>
                          <TableCell align="center">
                            {convertUnixTimestampToISO(row?.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Stack
                  spacing={{ xs: 1, sm: 2, alignItems: "center" }}
                  direction="row"
                  useFlexGap
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Typography
                    variant="body"
                    component="h6"
                    sx={{ fontWeight: "400" }}
                  >
                    Số lượng dữ liệu/1 trang
                  </Typography>

                  <FormControl sx={{ width: "100px" }}>
                    <Select
                      labelId="items-per-page-label"
                      id="items-per-page"
                      pageSize="small"
                      value={formFilter.pageSize}
                      onChange={(event) =>
                        setFormFilter({
                          ...formFilter,
                          pageSize: event.target.value,
                          page: 1,
                        })
                      }
                    >
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ fontWeight: "400" }}
                  >
                    Hiển thị {currentCount} trên {totalCount}
                  </Typography>
                  <Pagination
                    count={totalPages}
                    shape="rounded"
                    color="primary"
                    page={currentPage}
                    onChange={(event, value) =>
                      setFormFilter({ ...formFilter, page: value })
                    }
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        disabled={
                          (item.type === "next" && currentPage >= totalPages) ||
                          (item.type === "previous" && currentPage === 1)
                        }
                      />
                    )}
                  />
                </Stack>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Liên hệ khẩn cấp
              </Typography>
              {contact?.data?.length ? (
                contact.data.map((item) => (
                  <Box key={item._id} mb={2}>
                    <div style={{ fontSize: "16px" }}>
                      Họ và tên: {item.name}
                    </div>
                    <div style={{ fontSize: "16px" }}>
                      Quan hệ: {item.relationship}
                    </div>
                    <div style={{ fontSize: "16px" }}>
                      Số điện thoại: {item.contact}
                    </div>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" color="textSecondary">
                  Người dùng chưa thiết lập liên hệ khẩn cấp.
                </Typography>
              )}
            </TabPanel>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openDialog}>
        <DialogTitle fontWeight="bold" variant="h4">
          Xác nhận xoá
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xoá người dùng {firstname} không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2} sx={{ mb: 2, mr: 2 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              color="error"
              disabled={isDeleting}
            >
              Hủy
            </Button>
            <Button
              onClick={handleDeleteSubmit}
              variant="contained"
              color="primary"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Xóa"
              )}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetail;
