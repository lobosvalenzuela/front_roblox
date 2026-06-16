import ApexCharts from "apexcharts";

const chart02 = async () => {
  const chartElement = document.querySelector("#chartTwo");
  if (!chartElement) return;

  // 1. Fetch data from your API
  let seriesValue = [0]; // Default value
  try {
    const response = await fetch('/api/donaciones/count'); // Adjust endpoint as needed
    const data = await response.json();
    
    if (data && data.count !== undefined) {
      seriesValue = [data.count];
    }
  } catch (error) {
    console.error("Error fetching chart data:", error);
  }

  const chartTwoOptions = {
    series: seriesValue, // Dynamically set series data
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: "80%" },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: 60,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };


  const chartFour = new ApexCharts(chartElement, chartTwoOptions);
  chartFour.render();
};

export default chart02;