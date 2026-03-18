'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PollutantChart({ data }: { data: any }) {
  // Extracting data safely (fallback to 0 if data is missing)
  const pm25 = data?.pm25?.aqicn || data?.aqius || 0; 
  const pm10 = data?.pm10?.aqicn || pm25 * 0.6; // Mocking if not available
  const o3 = data?.o3?.aqicn || pm25 * 0.4;
  const no2 = data?.no2?.aqicn || pm25 * 0.2;

  const chartData = {
    labels: ['PM2.5', 'PM10', 'O3', 'NO2'],
    datasets: [
      {
        label: 'Pollutant Level',
        data: [pm25, pm10, o3, no2],
        // 1. Neon Colors with transparency for the 3D glass effect
        backgroundColor: [
          'rgba(255, 0, 127, 0.6)',  // Neon Pink
          'rgba(0, 243, 255, 0.6)',  // Neon Cyan
          'rgba(184, 0, 255, 0.6)',  // Neon Purple
          'rgba(255, 183, 0, 0.6)',  // Neon Yellow
        ],
        // 2. Solid borders to create the glowing edge
        borderColor: [
          'rgba(255, 0, 127, 1)',
          'rgba(0, 243, 255, 1)',
          'rgba(184, 0, 255, 1)',
          'rgba(255, 183, 0, 1)',
        ],
        borderWidth: 2,
        // 3. Rounded corners for a 3D cylindrical feel
        borderRadius: 8,
        borderSkipped: false,
        // 4. Hover effects to make it pop
        hoverBackgroundColor: [
          'rgba(255, 0, 127, 0.9)',
          'rgba(0, 243, 255, 0.9)',
          'rgba(184, 0, 255, 0.9)',
          'rgba(255, 183, 0, 0.9)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    // CRITICAL: This allows the chart to shrink to our Tailwind container height
    maintainAspectRatio: false, 
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)', // Faint grid lines for dark mode
        },
        ticks: {
          color: '#8892b0', // Muted text color
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines for a cleaner look
        },
        ticks: {
          color: '#8892b0',
          font: {
            family: "'Space Grotesk', sans-serif",
            weight: 'bold' as const,
          }
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hiding legend to save space
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false, // Hides the little color box in the tooltip
      },
    },
  };

  return (
    // The h-72 class here restricts the chart to exactly 18rem (288px) tall. 
    // You can change this to h-64 (smaller) or h-80 (larger) to fit your design perfectly.
    <div className="w-full h-72 relative">
      <Bar data={chartData} options={options} />
    </div>
  );
}