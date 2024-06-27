import React from 'react'
import { Link } from "react-router-dom"

function Menyy() {
  return (
    <div>
      <Link to="/avaleht">
        <img className="pilt" src="https://cimg0.ibsrv.net/ibimg/hgm/2000x1125-1/100/653/estonian-nobe-concept_100653636.jpg" alt="" />
      </Link>

      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>

      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>

      <Link to="/halda-tooteid">
        <button>Halda tooteid</button>
      </Link>

      <Link to="/esindused">
        <button>Esindused</button>
      </Link>

      <Link to="/kinkekaardid">
        <button>Kinkekaardid</button>
      </Link>

      <Link to="/poed">
        <button>Meie poed</button>
      </Link>

      <Link to="/kontakteeru-meiega">
        <button>Kontakteeru meiega</button>
      </Link>
    </div>
  )
}

export default Menyy