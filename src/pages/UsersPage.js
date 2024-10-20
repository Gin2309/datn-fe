import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import toast from "react-hot-toast";
import { convertUnixTimestampToISO } from "../utils/formatTime";

import {
  deleteUser,
  DisableUser,
  EnableUser,
  getAllUser,
} from "../services/user.api";

const UsersPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [itemDelete, setItemDelete] = useState(null);
  const [formFilter, setFormFilter] = useState({
    email: "",
    name: "",
    phone: "",
    rank: "",
    page: 1,
    pageSize: 20,
  });

  const { data: users, isLoading } = useQuery(
    ["USERS", formFilter],
    () =>
      getAllUser(
        formFilter.email,
        formFilter.name,
        formFilter.phone,
        formFilter.rank,
        formFilter.page,
        formFilter.pageSize
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteUserMutation = useMutation((_id) => deleteUser(_id), {
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries("USERS");
      setOpenDialog(false);
    },
  });

  const disableUserMutation = useMutation((_id) => DisableUser(_id), {
    onSuccess: () => {
      toast.success("Vô hiệu hóa người dùng thành công");
      queryClient.invalidateQueries("USERS");
    },
  });

  const enableUserMutation = useMutation((_id) => EnableUser(_id), {
    onSuccess: () => {
      toast.success("Kích hoạt người dùng thành công");
      queryClient.invalidateQueries("USERS");
    },
  });

  const handleSwitchChange = (_id, status) => {
    if (status) {
      enableUserMutation.mutate(_id);
    } else {
      disableUserMutation.mutate(_id);
    }
  };

  const DeleteClick = (event, row) => {
    event.stopPropagation();
    setItemDelete(row);
    setOpenDialog(true);
  };

  const handleDeleteSubmit = () => {
    deleteUserMutation.mutate(itemDelete._id);
  };

  const handleEdit = (event, _id) => {
    event.stopPropagation();
    const UserData = users?.data.find((item) => item._id === _id);
    navigate(`/admin/edit-user/${_id}`, { state: UserData });
  };

  const handleClickRow = (_id) => {
    const UserData = users?.data.find((item) => item._id === _id);
    navigate(`/admin/user-detail/${_id}`, { state: UserData });
  };

  const handleReset = () => {
    setFormFilter({
      email: "",
      name: "",
      phone: "",
      rank: "",
      page: 1,
      pageSize: 20,
    });
  };

  // phân trang
  const totalPages = Math.ceil(users?.totalCount / formFilter.pageSize);
  const currentPage = formFilter.page;
  const pageSize = formFilter.pageSize;
  const totalCount = users?.totalCount || 0;
  const currentCount = Math.min(currentPage * pageSize, totalCount);

  return (
    <Box>
      <Typography variant="h5">Quản lý người dùng</Typography>
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
                  label="Tìm kiếm theo tên"
                  fullWidth
                  variant="outlined"
                  value={formFilter.name}
                  onChange={(event) =>
                    setFormFilter({
                      ...formFilter,
                      name: event.target.value,
                    })
                  }
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Tìm kiếm theo Email"
                  fullWidth
                  variant="outlined"
                  value={formFilter.email}
                  onChange={(event) =>
                    setFormFilter({
                      ...formFilter,
                      email: event.target.value,
                    })
                  }
                />
              </Stack>
              <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                <TextField
                  id="standard-multiline-flexible"
                  label="Tìm kiếm theo số điện thoại"
                  fullWidth
                  variant="outlined"
                  value={formFilter.phone}
                  onChange={(event) =>
                    setFormFilter({
                      ...formFilter,
                      phone: event.target.value,
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ backgroundColor: "#0e9cff", fontWeight: "400" }}
          onClick={() => navigate("/admin/add-user")}
        >
          Thêm mới
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#444" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }} align="center">
                STT
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Họ và tên
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Số điện thoại
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Hạng
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Trạng thái
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Ngày tạo
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">
                Thao tác
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
            ) : users?.data?.length > 0 ? (
              users?.data?.map((row, index) => (
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
                  <TableCell component="th" scope="row">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        alt={row?.firstname}
                        src={row?.avatar}
                        sx={{ width: 48, height: 48, marginRight: 2 }}
                      />
                      <Typography variant="body1">{row?.firstname}</Typography>
                    </div>
                  </TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="center">{row?.phone}</TableCell>
                  <TableCell align="center">{row?.rank}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={row.status === "active"}
                      onChange={(event) =>
                        handleSwitchChange(row._id, event.target.checked)
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {convertUnixTimestampToISO(row?.createdAt)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Chỉnh sửa người dùng">
                      <IconButton
                        color="#757574"
                        aria-label="View"
                        onClick={(e) => handleEdit(e, row._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa người dùng">
                      <IconButton
                        color="#757574"
                        aria-label="View"
                        onClick={(e) => DeleteClick(e, row)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
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
          <Typography variant="body" component="h6" sx={{ fontWeight: "400" }}>
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
          <Typography variant="body2" component="p" sx={{ fontWeight: "400" }}>
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

      <Dialog open={openDialog}>
        <DialogTitle fontWeight="bold" variant="h4">
          Xác nhận xoá
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xoá người dùng {itemDelete?.firstname} không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2} sx={{ mb: 2, mr: 2 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              color="error"
            >
              Hủy
            </Button>
            <Button
              onClick={handleDeleteSubmit}
              variant="contained"
              color="primary"
            >
              Xoá
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
