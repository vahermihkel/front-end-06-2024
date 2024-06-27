import React from 'react'
import esindusedJSON from "../data/tallinn.json"
import { useParams } from 'react-router-dom';

function YksEsindus() {
  const { index } = useParams();
  const nimi = esindusedJSON[index];

  if (nimi === undefined) {
    return <div>Esindust ei leitud</div>
  }

  return (
    <div>
      <div>Poe aadress: </div>
      <div>Telefoninumber: </div>
      <div>Poe nimi: {nimi}</div>
    </div>
  )
}

export default YksEsindus