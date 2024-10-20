import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";
import { formatCurrency } from "../../utils/formatNumber";

const defaultCategories = {
  week: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
  month: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
};

const barChartOptions = (info, secondary, type, categories) => ({
  chart: {
    type: "bar",
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories,
    labels: {
      style: {
        colors: Array(categories.length).fill(secondary),
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: (value) => (type === "sale" ? formatCurrency(value) : value),
      style: {
        fontSize: "12px",
        colors: ["#777777"],
      },
    },
  },
  grid: {
    show: false,
  },
  tooltip: {
    y: {
      formatter: (val) => (type === "sale" ? formatCurrency(val) : val),
    },
    custom: ({ seriesIndex, dataPointIndex, w }) => {
      const value = w.config.series[seriesIndex].data[dataPointIndex];
      const category = w.config.xaxis.categories[dataPointIndex];
      const formattedValue = type === "sale" ? formatCurrency(value) : value;

      const typeNames = {
        user: "Người dùng",
        driver: "Tài xế",
        sale: "Doanh thu",
        move: "Chuyến đi",
      };

      const typeName = typeNames[type] || "Số liệu";

      return `
        <div style="padding: 8px; background: #fff; border: 1px solid #ddd; border-radius: 4px;">
          <div>${category}</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="margin-right: 5px;">${formattedValue}</div>
            <div style="font-size: 0.8rem; color: #888;">${typeName}</div>
          </div>
        </div>
      `;
    },
  },
});

export default function MonthlyBarChart2({
  data,
  format,
  type,
  customCategories,
}) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const categories =
    format === "week" || format === "month"
      ? defaultCategories[format]
      : customCategories;

  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState(
    barChartOptions(info, secondary, type, categories)
  );

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        categories,
        labels: {
          style: {
            colors: Array(categories.length).fill(secondary),
          },
        },
      },
      tooltip: {
        custom: ({ seriesIndex, dataPointIndex, w }) => {
          const value = w.config.series[seriesIndex].data[dataPointIndex];
          const category = w.config.xaxis.categories[dataPointIndex];
          const formattedValue =
            type === "sale" ? formatCurrency(value) : value;

          const typeNames = {
            user: "Người dùng",
            driver: "Tài xế",
            sale: "Doanh thu",
            move: "Chuyến đi",
          };

          const typeName = typeNames[type] || "Số liệu";

          return `
            <div style="padding: 8px; background: #fff; border: 1px solid #ddd; border-radius: 4px;">
              <div>${category}</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="margin-right: 5px;">${typeName}: ${formattedValue}</div>
              </div>
            </div>
          `;
        },
      },
    }));
  }, [categories, info, secondary, type]);

  useEffect(() => {
    const chartData = format === "week" ? Object.values(data) : data;
    setSeries([{ data: chartData }]);
  }, [data, format]);

  return (
    <Box id="chart" sx={{ bgcolor: "transparent" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={420}
      />
    </Box>
  );
}
