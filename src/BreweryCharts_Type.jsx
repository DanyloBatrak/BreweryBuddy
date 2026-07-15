import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = [
  "#2922a3",
  "#18b454",
  "#db9813",
  "#e23f04",
  "#428800",
  "#c9fb00",
  "#008dad",
  "#01163f",
];

const BreweryCharts_Type = ({ breweries }) => {
  const typeCounts = breweries.reduce((acc, b) => {
    const type = b.brewery_type || "unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(typeCounts).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  return (
    <div className="Chart-box">
      <h3 className="Chart-text">Brewery Types</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name} (${value})`}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreweryCharts_Type;
