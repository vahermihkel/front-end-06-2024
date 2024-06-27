import React, { useState } from 'react'
import tootedJSON from "../data/tooted.json";
import ostukorvJSON from "../data/ostukorv.json";
import { Link } from 'react-router-dom';

function Avaleht() {
  const [tooted, setTooted] = useState(tootedJSON.slice());

  const lisaOstukorvi = (toode) => {
    ostukorvJSON.push(toode);
  }

  const sorteeriAZ = () => {
    tooted.sort((a,b) => a.nimi.localeCompare(b.nimi));
    setTooted(tooted.slice());
  }

  const sorteeriZA = () => {
    tooted.sort((a,b) => b.nimi.localeCompare(a.nimi));
    setTooted(tooted.slice());
  }

  const sorteeriHindKasvavalt = () => {
    tooted.sort((a,b) => a.hind - b.hind);
    setTooted(tooted.slice());
  }

  const sorteeriHindKahanevalt = () => {
    tooted.sort((a,b) => b.hind - a.hind);
    setTooted(tooted.slice());
  }

  const sorteeriNimeKolmasTahtAZ = () => { // Tesla    [2]   .charAt(2)
    tooted.sort((a,b) => a.nimi[2].localeCompare(b.nimi[2]));
    setTooted(tooted.slice());
  }

  const filtreeriTgaAlgavad = () => {
    const vastus = tootedJSON.filter(t => t.nimi.startsWith("T"));
    setTooted(vastus);
  }

  const filtreeriAktiivsed = () => {
    const vastus = tootedJSON.filter(t => t.aktiivne === true);
    setTooted(vastus);
  }

  const filtreeriMaksumusVaiksemKui50k = () => {
    const vastus = tootedJSON.filter(t => t.hind < 50000);
    setTooted(vastus);
  }

  const filtreeriVahemalt4Tahte = () => {
    const vastus = tootedJSON.filter(t => t.nimi.length >= 4);
    setTooted(vastus);
  }

  const filtreeriTeineTahtO = () => {
    const vastus = tootedJSON.filter(t => t.nimi[1] === "o");
    setTooted(vastus);
  }

  return (
    <div>
      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={sorteeriHindKasvavalt}>Sorteeri hind kasvavalt</button>
      <button onClick={sorteeriHindKahanevalt}>Sorteeri hind kahanevalt</button>
      <button onClick={sorteeriNimeKolmasTahtAZ}>Sorteeri nime kolmas täht A-Z</button>
      <br /><br />
      <button onClick={filtreeriTgaAlgavad}>Filtreeri T'ga algavad</button>
      <button onClick={filtreeriAktiivsed}>Filtreeri aktiivsed</button>
      <button onClick={filtreeriMaksumusVaiksemKui50k}>Filtreeri odavamad kui 50 000</button>
      <button onClick={filtreeriVahemalt4Tahte}>Filtreeri kellel on vähemalt 4 tähemärki</button>
      <button onClick={filtreeriTeineTahtO}>Filtreeri kellel on teine täht O</button>


      {tooted.map(toode => 
        <div key={toode.nimi}>
          <Link to={"/toode/" + toode.nimi.toLowerCase().replaceAll(" ","-")}>
            <img className="pilt" src={toode.pilt} alt="" />
            <div>{toode.nimi}</div>
            <div>{toode.hind}</div>
          </Link>
          {toode.aktiivne && <button onClick={() => lisaOstukorvi(toode)}>Lisa ostukorvi</button>}
        </div>)}
    </div>
  )
}

export default Avaleht