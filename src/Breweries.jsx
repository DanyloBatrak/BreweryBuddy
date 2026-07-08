import { useState, useEffect } from "react";

const Breweries = () => {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const totalCount = breweries.length;

  const uniqueTypes = [...new Set(breweries.map(b => b.brewery_type))];

  const typeCounts = breweries.reduce((accumulator, b) => {
    accumulator[b.brewery_type] = (accumulator[b.brewery_type] || 0) + 1;
    return accumulator;
  }, {});

  const mostPopular = Object.entries(typeCounts).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];

  const numOfRepStates = new Set(breweries.map(b => b.state)).size;

  const filteredBreweries = breweries
    .filter(place =>
      place.name?.toLowerCase().includes(searchItem.toLowerCase()),
    )
    .filter(place =>
      typeFilter === "all" ? true : place.brewery_type === typeFilter,
    );

  useEffect(() => {
    const getBreweries = async () => {
      try {
        const resource = await fetch(
          "https://api.openbrewerydb.org/v1/breweries?per_page=20",
        );
        if (!resource.ok) throw new Error("Failed to get breweries!");
        const data = await resource.json();
        console.log(data);
        setBreweries(data);
      } catch (er) {
        setError(er.message);
      } finally {
        setLoading(false);
      }
    };
    getBreweries();
  }, []);

  if (loading) return <p>Loading breweries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="App-row">
        <div className="Card">
          <h1 className="big-text">{totalCount}</h1>
          <p>Total Breweries</p>
        </div>
        <div className="Card">
          <h1 className="big-text">{mostPopular}</h1>
          <p>Most Popular Type</p>
        </div>
        <div className="Card">
          <h1 className="big-text">{numOfRepStates}</h1>
          <p>States Represented</p>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Brewery"
          value={searchItem}
          onChange={e => setSearchItem(e.target.value)}
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          {uniqueTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>Street</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {filteredBreweries.map(place => (
            <tr key={place.id}>
              <td>{place.name || "Unnamed Brewery"}</td>
              <td>{place.brewery_type}</td>
              <td>{place.city}</td>
              <td>{place.street}</td>
              <td>{place.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Breweries;
