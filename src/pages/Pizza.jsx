import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Pizzak.css'

const ListaKomponens = ({ elem }) => (
  <div>
    <div className="card" style={{ width: "400px" }}>
      <img className="card-img-top" src={elem.image_url} alt="Card image"
        style={{ width: "200px", height: "150px", display: "block", margin: "0 auto" }} />
      <div className="card-body">
        <h4 className="card-title">
          {elem.name}
          <br />
          <Link to={"/pizzak"}><i className="bi bi-paragraph">Főoldal</i></Link>
          <br />
          <Link to={`/pizza/${elem.id}/edit`}><i className="bi bi-pencil">Szerkesztés</i></Link>
        </h4>
      </div>
    </div>
  </div>
);

export const Pizza=()=> {
    const params = useParams();
    const id = params.pizzaId;
  const [adat, setAdat] = useState({});
console.log(params.pizzaId);
  useEffect(() => {
    fetch(`https://pizza.sulla.hu/pizza/${id}`)
    .then((res) => (res.ok? res.json() : []))
    .then((tartalom) => setAdat(tartalom));
  }, [id])

  return (
      <div className="row m-5 p-5 border">
        <ListaKomponens elem={adat} />
      </div>
  )
}
