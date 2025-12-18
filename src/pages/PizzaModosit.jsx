import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Pizzak.css";

export const PizzaModosit = () => {
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [betolt, setBetolt] = useState(true);
  const [hiba, setHiba] = useState("");

  useEffect(() => {
    setBetolt(true);
    setHiba("");

    fetch(`https://pizza.sulla.hu/pizza/${pizzaId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Nem található pizza.")))
      .then((adat) => {
        setName(adat?.name ?? "");
        setImageUrl(adat?.image_url ?? "");
      })
      .catch((err) => setHiba(String(err)))
      .finally(() => setBetolt(false));
  }, [pizzaId]);

  const mentes = (event) => {
    event.preventDefault();
    setHiba("");

    fetch(`https://pizza.sulla.hu/pizza/${pizzaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image_url: imageUrl,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Sikertelen módosítás (PUT).");
        return res.json().catch(() => null);
      })
      .then(() => navigate(`/pizza/${pizzaId}`)) // vagy: navigate("/pizzak")
      .catch((err) => setHiba(err.message));
  };

  if (betolt) {
    return <div className="p-5 text-center">Betöltés...</div>;
  }

  return (
    <div className="p-5 content bg-whitesmoke text-center">
      <h2>Pizza módosítása</h2>

      {hiba && <div className="alert alert-danger">{hiba}</div>}

      <form onSubmit={mentes}>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Pizza név:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép URL-je:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="kepurl"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-warning">
          Mentés (PUT)
        </button>

        &nbsp;&nbsp;&nbsp;

        <Link to={`/pizza/${pizzaId}`} className="btn btn-secondary">
          Mégsem
        </Link>
      </form>

      <div className="mt-4">
        <div><b>Előnézet:</b></div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Pizza kép"
            style={{ width: "200px", height: "150px", objectFit: "cover", marginTop: "10px" }}
          />
        ) : null}
      </div>
    </div>
  );
};
