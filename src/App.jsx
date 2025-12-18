import { Routes, Route, NavLink } from "react-router-dom"
import { Pizzak } from "./pages/Pizzak"
import { Pizza } from "./pages/Pizza"
import { UjPizza } from "./pages/UjPizza"
import { PizzaModosit } from "./pages/PizzaModosit";

import './App.css'

export const App = () => {

  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
       <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">PizzaApp</NavLink>

    {/* Hamburger gomb */}
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to={'/pizzak'} className={({isActive}) => 
            "nav-link" + (isActive ? "active" : "")}>
            <span className="nav-link"><i className="bi bi-safe2"></i>Pizzák</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/new-pizza'} className={({isActive}) => 
            "nav-link" + (isActive ? "active" : "")}>
            <span className="nav-link"><i className="bi bi-pencil-square"></i>Új pizza</span>
            </NavLink>
          </li>
        </ul>
      </div>
      </div>
    </nav>
      <h1>React Router Példa</h1>
      
        <Routes>
          <Route path="/pizzak" element={<Pizzak />} />
          <Route path="pizza/:pizzaId" element={<Pizza />} />
          <Route path="/pizza/:pizzaId/edit" element={<PizzaModosit />} />
          <Route path="/new-pizza" element={<UjPizza />} />
        </Routes>
    </>
  )
}

export default App
