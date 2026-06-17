import ApexCharts from "apexcharts";

const chart02 = async () => {
  const chartElement = document.querySelector("#chartTwo");
  if (!chartElement) return;

  // Default value if the fetch fails
  let seriesValue = [0]; 
  
  try {
    // FIX: Swapped relative path for the explicit microservice URL on port 8084
    const response = await fetch('http://localhost:8084/api/donaciones/count'); 
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    
    if (data && data.count !== undefined) {
      // Note: RadialBars usually expect a percentage (0-100). 
      // If data.count is a raw total (like 10), it will render as 10%.
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
              // ApexCharts defaults to formatting raw numbers here if that's what's passed
              return val.toLocaleString('es-CL'); 
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
    labels: ["Donaciones"],
  };

  const chartFour = new ApexCharts(chartElement, chartTwoOptions);
  chartFour.render();
};

export default chart02;