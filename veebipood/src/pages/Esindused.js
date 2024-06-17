import React, { useState } from 'react'

function Esindused() {
  //let keskus = "Narva";
  const [keskus, setKeskus] = useState("Pärnu");

  return (
    <div>
      <button className={keskus === "Tallinn" ? "keskus-aktiivne" : undefined} onClick={() => setKeskus("Tallinn")}>Tallinn</button>
      <button className={keskus === "Tartu" ? "keskus-aktiivne" : undefined} onClick={() => setKeskus("Tartu")}>Tartu</button>
      <button className={keskus === "Narva" ? "keskus-aktiivne" : undefined} onClick={() => setKeskus("Narva")}>Narva</button>
      <button className={keskus === "Pärnu" ? "keskus-aktiivne" : undefined} onClick={() => setKeskus("Pärnu")}>Pärnu</button>
      
      {keskus === "Tallinn" && 
        <div>
          <div>Ülemiste</div>
          <div>Rocca al Mare</div>
          <div>Magistrali</div>
          <div>Vesse</div>
          <div>Kristiine</div>
          <div>Järveotsa</div>  
        </div>}

      {
      keskus === "Tartu" &&
        <div>
          <div>Raatuse</div>
          <div>Lõunakeskus</div>
        </div>
      }

      {keskus === "Narva" && <div>Fama</div>}

      {keskus === "Pärnu" && <div>Port Artur 2</div>}
    </div>
  )
}

export default Esindused