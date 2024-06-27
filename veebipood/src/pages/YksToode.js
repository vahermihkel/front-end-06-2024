import React from 'react'
import { useParams } from 'react-router-dom'
import tootedJSON from "../data/tooted.json"

function YksToode() {
  const { nimi } = useParams(); 
  const toode = tootedJSON.find(t => t.nimi.toLowerCase().replaceAll(" ","-") === nimi);

  if (toode === undefined) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <div>Toote nimi: {toode.nimi}</div>
      <div>Toote hind: {toode.hind}</div>
      {toode.aktiivne ? 
        <div>Toode on aktiivne</div> : 
        <div>Toode pole aktiivne</div>}
      <img src={toode.pilt} alt="" />
    </div>
  )
}

export default YksToode