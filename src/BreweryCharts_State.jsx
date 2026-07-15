import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BreweryStateChart = ({ breweries }) => {
  const stateCounts = breweries.reduce((acc, b) => {
    const state = b.state || "Unknown";
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(stateCounts)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // top 10 states, otherwise it gets cramped

  return (
    <div className="Chart-box">
      <h3>Breweries by State (Top 10)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" angle={-45} textAnchor="end" height={70} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreweryStateChart;
