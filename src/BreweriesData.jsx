import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BreweryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getBrewery = async () => {
      setLoading(true);
      setError(false);
      try {
        const resource = await fetch(
          `https://api.openbrewerydb.org/v1/breweries/${id}`,
        );
        if (!resource.ok) throw new Error("Failed to get brewery!");
        const data = await resource.json();
        setBrewery(data);
      } catch (er) {
        setError(er.message);
      } finally {
        setLoading(false);
      }
    };
    getBrewery();
  }, [id]);

  if (loading) return <p>Loading brewery...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!brewery) return null;

  return (
    <div className="detail-window">
      <button className="info_button" onClick={() => navigate(-1)}>
        Back
      </button>

      <h1 className="brewery_data_name">{brewery.name}</h1>
      <p className="detail-type">Brewery type: {brewery.brewery_type}</p>

      <div className="detail-box">
        <div>
          <h2>Address</h2>
          <p>{brewery.address_1}</p>
          <p>{brewery.address_2}</p>
          <p>{brewery.address_3}</p>
          <p>City: {brewery.city}</p>
          <p>State: {brewery.state}</p>
          <p>Country: {brewery.country}</p>
          <p>Postal Code: {brewery.postal_code}</p>
        </div>
        <div>
          <h2>Contacts</h2>
          <p>Phone: {brewery.phone || "No Phone Listed"}</p>
          <p>
            Website:{" "}
            {brewery.website_url ? (
              <a href={brewery.website_url} target="_blank" rel="noreferrer">
                {brewery.website_url}
              </a>
            ) : (
              "No Website Listed"
            )}
          </p>
        </div>
        <div>
          <h2>Brewery Location</h2>
          <p>Longitude: {brewery.longitude}</p>
          <p>Latitude: {brewery.latitude}</p>
        </div>
      </div>
    </div>
  );
};

export default BreweryDetail;
