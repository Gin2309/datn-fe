import React from "react";
import {
  Stack,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  PaginationItem,
} from "@mui/material";

const CustomPagination = ({
  size,
  formFilter,
  setFormFilter,
  page,
  total,
  totalPage,
  current,
}) => {
  return (
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
            value={size}
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
          Hiển thị {current} trên {total}
        </Typography>
        <Pagination
          count={totalPage}
          shape="rounded"
          color="primary"
          page={page}
          onChange={(event, value) =>
            setFormFilter({ ...formFilter, page: value })
          }
          renderItem={(item) => (
            <PaginationItem
              {...item}
              disabled={
                (item.type === "next" && page >= total) ||
                (item.type === "previous" && page === 1)
              }
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export default CustomPagination;
