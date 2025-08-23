// components/SalesChart.js
"use client"; // Marks this as a Client Component (executes in the browser in Next.js)

import {
  Chart as ChartJS,
  CategoryScale, // Used for X-axis categorical data
  LinearScale,  // Used for Y-axis numerical data
  PointElement, // Renders points on the chart
  LineElement,  // Renders connecting lines between points
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2"; // React wrapper for Chart.js Line charts

// Register chart components so Chart.js knows which features to use
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SalesChart() {
  // Chart dataset and labels
  const data = {
    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"], // Persian month names
    datasets: [
      {
        label: "فروش (میلیون تومان)", // Sales (million Toman)
        data: [12, 9, 14, 7, 15, 10], // Values for each month
        borderColor: "rgb(59, 130, 246)", // Line color (blue)
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Fill color under the line
        tension: 0.3, // Curve tension (0 = straight lines, 1 = very curved)
        fill: true,  // Enables filled area under the chart line
      },
    ],
  };

  // Chart display options
  const options = {
    responsive: true, // Makes the chart adjust to container size
    maintainAspectRatio: false, // Allow height adjustments (useful for mobile)
    plugins: {
      legend: {
        labels: {
          color: "#ccc", // Text color for legend labels (light gray, suits dark mode)
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ccc" }, // X-axis label color
      },
      y: {
        ticks: { color: "#ccc" }, // Y-axis label color
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      {/* Chart title */}
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
        آمار فروش {/* Sales statistics */}
      </h3>

      {/* Chart container with fixed height for consistency */}
      <div className="h-[300px] sm:h-[400px]">
        <Line data={data} options={options} /> {/* Render the line chart */}
      </div>
    </div>
  );
}
