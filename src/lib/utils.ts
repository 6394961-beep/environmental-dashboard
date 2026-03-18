export const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "bg-green-500", text: "text-green-900" };
  if (aqi <= 100) return { label: "Moderate", color: "bg-yellow-400", text: "text-yellow-900" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "bg-orange-500", text: "text-white" };
  return { label: "Unhealthy", color: "bg-red-600", text: "text-white" };
};