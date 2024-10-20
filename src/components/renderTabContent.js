import {
  Grid,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  Paper,
  Divider,
} from "@mui/material";
import { formatCurrency } from "../utils/formatNumber";

const renderTabContent = (
  title,
  isLoading,
  isLoadingReport,
  report,
  formFilter,
  renderChart,
  formattedFrom,
  formattedTo
) => (
  <div>
    <Typography variant="h3" mb={4} fontWeight="bold" align="center">
      {title.toUpperCase()}
    </Typography>
    <Typography variant="body1" mb={4} mt={2} align="center">
      {formFilter.from !== "" &&
        `Từ ngày ${formattedFrom} đến ngày ${formattedTo}`}
    </Typography>

    {!isLoading && renderChart()}

    {isLoading || isLoadingReport ? (
      <Typography align="center">Đang tải dữ liệu...</Typography>
    ) : (
      <div>
        <Grid container spacing={3} mt={3}>
          {Object.entries(report?.data ?? {}).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Paper
                elevation={3}
                sx={{ p: 3, textAlign: "center", borderRadius: 2 }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  {key}
                </Typography>
                <Typography variant="h5" sx={{ color: "primary.main" }}>
                  {formFilter.type === "sale"
                    ? formatCurrency(value)
                    : value.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    )}
  </div>
);

export default renderTabContent;
