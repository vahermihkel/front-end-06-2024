import React, { useState } from 'react'
import tootedJSON from "../data/tooted.json"
import { Link } from 'react-router-dom';

function HaldaTooteid() {
  const [tooted, setTooted] = useState(tootedJSON.slice());

  const kustuta = (index) => {
    tootedJSON.splice(index,1);
    setTooted(tootedJSON.slice());
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pilt</th>
            <th>Nimi</th>
            <th>Hind</th>
            <th>Tegevused</th>
          </tr>
        </thead>
        <tbody>
          {tooted.map((t, index) => 
            <tr key={t.nimi}>
              <td> <img className="pilt" src={t.pilt} alt="" /> </td>
              <td>{t.nimi}</td>
              <td>{t.hind}</td>
              <td> 
                <button onClick={() => kustuta(index)}>Kustuta</button>
                <Link to={"/muuda-toode/" + index}>
                  <button>Muuda</button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default HaldaTooteid