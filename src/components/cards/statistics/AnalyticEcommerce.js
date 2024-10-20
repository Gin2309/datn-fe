import PropTypes from "prop-types";

// material-ui
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project import
import MainCard from "../../MainCard";

// assets
import RiseOutlined from "@ant-design/icons/RiseOutlined";
import FallOutlined from "@ant-design/icons/FallOutlined";

const iconSX = {
  fontSize: "0.75rem",
  color: "inherit",
  marginLeft: 0,
  marginRight: 0,
};

const getRateColor = (rate) => {
  if (rate > 70) return "primary";
  if (rate < 50) return "error";
  return "warning";
};

export default function AnalyticEcommerce({
  color = "primary",
  title,
  count,
  percentage,
  isLoss,
  change,
  moveSuccessRate,
}) {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={
                  isLoss ? (
                    <FallOutlined style={iconSX} />
                  ) : (
                    <RiseOutlined style={iconSX} />
                  )
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
        {moveSuccessRate !== undefined && (
          <Box sx={{ pt: 0.25 }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="caption" color="text.secondary">
                  Tỉ lệ thành công:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="combined"
                  color={getRateColor(moveSuccessRate)}
                  label={`${moveSuccessRate}%`}
                  sx={{ ml: 1.25 }}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="text.secondary">
          {change?.isIncrease ? "Tăng" : "Giảm"}{" "}
          <Typography
            variant="caption"
            sx={{ color: `${color || "primary"}.main` }}
          >
            {change?.value}
          </Typography>{" "}
          so với tháng trước
        </Typography>
      </Box>
    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  change: PropTypes.shape({
    isIncrease: PropTypes.bool,
    value: PropTypes.string,
  }),
};
